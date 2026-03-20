import generateHook from "./generateHook";

type DiscordEvent = {
  category: string;
  title: string;
  url: string;
  repoName: string;
  owner?: string | null;
  stars: number | null;
};

type DiscordAnalysis = {
  summary: string;
  impact: string;
};

function trim(text: string, limit: number) {
  if (text.length <= limit) return text;
  return `${text.slice(0, limit - 1)}...`;
}

function formatSource(event: DiscordEvent): string {
  if (event.category !== "ai") {
    return "GitHub";
  }

  const owner = (event.owner ?? "").toLowerCase();

  if (owner === "openai") return "OpenAI";
  if (owner === "huggingface") return "Hugging Face";
  if (owner === "anthropic") return "Anthropic";
  if (owner === "deepmind") return "DeepMind";
  if (owner === "google-ai") return "Google AI";
  if (owner === "microsoft-ai") return "Microsoft Research";

  return event.repoName || "AI";
}

export function formatDiscordMessage(
  event: DiscordEvent,
  analysis: DiscordAnalysis
) {
  const hook = generateHook(event);
  const source = formatSource(event);

  if (event.category === "ai") {
    return trim(
      `⚡ ${source} Update\n\n${hook}\n\n${source} published: ${event.title}\n\n${analysis.impact}\n\n🔗 ${event.url}`,
      1800
    );
  }

  return trim(
    `⚡ GitHub Update\n\n${hook}\n\nGitHub published: ${event.title}\n\n${analysis.impact}\n\n🔗 ${event.url}`,
    1800
  );
}

export async function postToDiscord(
  send: (message: string) => Promise<unknown>,
  event: DiscordEvent,
  analysis: DiscordAnalysis
) {
  const message = formatDiscordMessage(event, analysis);
  await send(message);

  return {
    success: true,
    message,
  };
}

export default postToDiscord;
