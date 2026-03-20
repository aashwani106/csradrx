type AiBlogInput = {
  owner: string;
  publishedAt: string;
};

const sourceWeights: Record<string, number> = {
  openai: 35,
  deepmind: 35,
  "google-ai": 35,
  anthropic: 30,
  huggingface: 25,
  "microsoft-ai": 22,
};

export default function scoreAiBlogEvent(article: AiBlogInput): number {
  const ageInDays = Math.max(
    0,
    (Date.now() - new Date(article.publishedAt).getTime()) / (24 * 60 * 60 * 1000)
  );

  const recencyScore = Math.max(0, 50 - ageInDays * 6);
  const sourceScore = sourceWeights[article.owner] ?? 15;

  return Math.min(100, Math.round(sourceScore + recencyScore));
}
