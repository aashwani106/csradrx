import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { QueueEvents, Worker } from "bullmq";
import {
  ChannelType,
  Client,
  GatewayIntentBits,
  PermissionFlagsBits,
  SlashCommandBuilder,
  TextChannel,
} from "discord.js";
import dotenv from "dotenv";
import { Redis } from "ioredis";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as discordModule from "../../../packages/core/src/distribution/postToDiscord";
import express from "express";



const app = express();

app.get("/", (req, res) => {
  res.send("Discord bot running ...");
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Dummy server running on port ${PORT}`);
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../../../packages/db/.env"),
});

const databaseUrl = process.env.DATABASE_URL;
const redisUrl = process.env.REDIS_URL ?? "redis://127.0.0.1:6379";
const discordToken = process.env.DISCORD_BOT_TOKEN;
const dryRun = process.env.DRY_RUN === "true";
const DAILY_SERVER_LIMIT = 10;

if (!databaseUrl) {
  throw new Error("Missing DATABASE_URL. Add it to packages/db/.env");
}

if (!discordToken) {
  throw new Error("Missing DISCORD_BOT_TOKEN. Add it to packages/db/.env");
}

function resolveModuleFunction(
  mod: Record<string, any>,
  exportName: string
): ((...args: any[]) => any) | undefined {
  if (typeof mod[exportName] === "function") return mod[exportName];
  if (typeof mod.default === "function") return mod.default;
  if (mod.default && typeof mod.default[exportName] === "function") {
    return mod.default[exportName];
  }
  if (mod.default && typeof mod.default.default === "function") {
    return mod.default.default;
  }
  return undefined;
}

const postToDiscord = resolveModuleFunction(discordModule, "postToDiscord");

if (typeof postToDiscord !== "function") {
  throw new Error("Failed to load postToDiscord");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: databaseUrl }),
});

const connection = new Redis(redisUrl, {
  maxRetriesPerRequest: null,
});

const queueEvents = new QueueEvents("distribution-events", { connection });

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

const commands = [
  new SlashCommandBuilder()
    .setName("set-feed-channel")
    .setDescription("Set the current or selected channel as the CSRadrX feed")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Channel to use for the feed")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
  new SlashCommandBuilder()
    .setName("feed-status")
    .setDescription("Show the current CSRadrX feed configuration")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
  new SlashCommandBuilder()
    .setName("disable-feed")
    .setDescription("Disable CSRadrX posting in this server")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
].map((command) => command.toJSON());

async function registerGuildCommands() {
  const guilds = await client.guilds.fetch();

  for (const guildRef of guilds.values()) {
    const guild = await guildRef.fetch();
    await guild.commands.set(commands);
  }
}

async function sendDiscordMessage(channelId: string, message: string) {
  if (dryRun) {
    console.log(`DISCORD MESSAGE [${channelId}]:\n`, message);
    return;
  }

  const channel = await client.channels.fetch(channelId);

  if (!(channel instanceof TextChannel)) {
    throw new Error(`Configured channel ${channelId} is not a text channel`);
  }

  await channel.send(message);
}

client.once("clientReady", async () => {
  console.log(`Discord bot logged in as ${client.user?.tag}`);
  await registerGuildCommands();
});

client.on("guildCreate", async (guild) => {
  await guild.commands.set(commands);
});

client.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isChatInputCommand() || !interaction.guildId) {
      return;
    }

    if (interaction.commandName === "set-feed-channel") {
      const selectedChannel =
        interaction.options.getChannel("channel") ?? interaction.channel;

      if (!selectedChannel || selectedChannel.type !== ChannelType.GuildText) {
        await interaction.reply({
          content: "Choose a text channel for the feed.",
          ephemeral: true,
        });
        return;
      }

      await prisma.serverConfig.upsert({
        where: { guildId: interaction.guildId },
        create: {
          guildId: interaction.guildId,
          channelId: selectedChannel.id,
        },
        update: {
          channelId: selectedChannel.id,
        },
      });

      await interaction.reply({
        content: `CSRadrX feed set to <#${selectedChannel.id}>`,
        ephemeral: true,
      });
      return;
    }

    if (interaction.commandName === "feed-status") {
      const config = await prisma.serverConfig.findUnique({
        where: { guildId: interaction.guildId },
      });

      await interaction.reply({
        content: config
          ? `Feed channel: <#${config.channelId}>\nGitHub: ${
              config.enabledGithub ? "on" : "off"
            }\nAI: ${config.enabledAi ? "on" : "off"}`
          : "No feed channel configured yet. Use /set-feed-channel.",
        ephemeral: true,
      });
      return;
    }

    if (interaction.commandName === "disable-feed") {
      await prisma.serverConfig.deleteMany({
        where: { guildId: interaction.guildId },
      });

      await interaction.reply({
        content: "CSRadrX feed disabled for this server.",
        ephemeral: true,
      });
    }
  } catch (error) {
    console.error("Discord interaction failed:", error);

    if (interaction.isRepliable()) {
      const payload = {
        content:
          "Feed setup failed. Make sure the latest database schema is applied, then retry.",
        ephemeral: true as const,
      };

      if (interaction.deferred || interaction.replied) {
        await interaction.followUp(payload).catch(() => {});
      } else {
        await interaction.reply(payload).catch(() => {});
      }
    }
  }
});

const worker = new Worker(
  "distribution-events",
  async (job) => {
    console.log(`Distribution job ${job.id}: ${job.data.title}`);

    const eventCategory = job.data.event.category;
    const serverConfigs = await prisma.serverConfig.findMany({
      where:
        eventCategory === "ai"
          ? { enabledAi: true }
          : { enabledGithub: true },
    });

    if (serverConfigs.length === 0) {
      console.log("No server configs enabled for distribution");
      return { delivered: 0 };
    }

    let delivered = 0;

    for (const config of serverConfigs) {
      const existingDelivery = await prisma.discordDelivery.findUnique({
        where: {
          eventId_serverConfigId: {
            eventId: job.data.eventId,
            serverConfigId: config.id,
          },
        },
      });

      if (existingDelivery) {
        continue;
      }

      const deliveriesToday = await prisma.discordDelivery.count({
        where: {
          serverConfigId: config.id,
          deliveredAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
          },
        },
      });

      if (deliveriesToday >= DAILY_SERVER_LIMIT) {
        console.log(`Daily Discord limit reached for guild ${config.guildId}`);
        continue;
      }

      const result = await postToDiscord(
        (message: string) => sendDiscordMessage(config.channelId, message),
        job.data.event,
        job.data.analysis
      );

      if (result.success) {
        await prisma.discordDelivery.create({
          data: {
            eventId: job.data.eventId,
            serverConfigId: config.id,
          },
        });

        await prisma.event.update({
          where: { id: job.data.eventId },
          data: {
            tweeted: true,
            tweetedAt: new Date(),
          },
        });

        delivered += 1;
      }
    }

    return {
      eventId: job.data.eventId,
      title: job.data.title,
      delivered,
    };
  },
  { connection }
);

worker.on("ready", () => {
  console.log("Discord bot worker ready");
});

worker.on("completed", (job, result) => {
  console.log(`Discord delivered: ${job.data.title} (${result.delivered})`);
});

worker.on("failed", (job, err) => {
  console.error(`Discord delivery failed: ${job?.data?.title}`, err);
});

worker.on("error", (err) => {
  console.error("Discord worker error:", err);
});

queueEvents.on("waiting", ({ jobId }) => {
  console.log(`Distribution waiting: ${jobId}`);
});

queueEvents.on("completed", ({ jobId }) => {
  console.log(`Distribution completed: ${jobId}`);
});

await client.login(discordToken);
console.log(`Discord bot listening on ${redisUrl}`);

