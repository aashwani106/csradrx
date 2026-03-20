type RankedEvent = {
  category: string;
  owner?: string | null;
  publishedAt: Date | string;
  score?: {
    score?: number | null;
  } | null;
};

type EventWithRanking<T> = T & {
  ranking: {
    finalScore: number;
    recencyWeight: number;
    sourceWeight: number;
    baseScore: number;
  };
};

function getRecencyWeight(publishedAt: Date | string): number {
  const ageMs = Date.now() - new Date(publishedAt).getTime();
  const ageHours = ageMs / (60 * 60 * 1000);

  if (ageHours < 1) return 1.0;
  if (ageHours < 6) return 0.8;
  if (ageHours < 24) return 0.6;
  return 0.3;
}

function getSourceWeight(event: RankedEvent): number {
  if (event.category === "github") return 0.6;

  const owner = (event.owner ?? "").toLowerCase();

  if (owner === "openai") return 1.0;
  if (owner === "deepmind") return 0.9;
  if (owner === "anthropic") return 0.9;
  if (owner === "huggingface") return 0.7;

  return 0.6;
}

export function rankEvents<T extends RankedEvent>(events: T[]): EventWithRanking<T>[] {
  return [...events]
    .map((event) => {
      const baseScore = event.score?.score ?? 0;
      const recencyWeight = getRecencyWeight(event.publishedAt);
      const sourceWeight = getSourceWeight(event);
      const finalScore =
        baseScore * 0.6 + recencyWeight * 100 * 0.3 + sourceWeight * 100 * 0.1;

      return {
        ...event,
        ranking: {
          finalScore: Number(finalScore.toFixed(2)),
          recencyWeight,
          sourceWeight,
          baseScore,
        },
      };
    })
    .sort((a, b) => b.ranking.finalScore - a.ranking.finalScore);
}

export default rankEvents;
