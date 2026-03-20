type DiscordEvent = {
  category: string;
  title: string;
  url: string;
  repoName: string;
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

export function formatDiscordMessage(
  event: DiscordEvent,
  analysis: DiscordAnalysis
) {
  if (event.category === "ai") {
    return trim(
      `⚡ OpenAI Update\n\n${analysis.summary}\n\nWhy it matters:\n${analysis.impact}\n\n🔗 ${event.url}`,
      1800
    );
  }

  return trim(
    `🔥 ${event.repoName}\n\n${analysis.summary}\n\n⭐ ${event.stars ?? 0}\n\n🔗 ${event.url}`,
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
