type AiBlogInput = {
  owner: string;
  title: string;
  summaryText?: string | null;
  publishedAt: string;
};

function formatAge(publishedAt: string): string {
  const ageInDays = Math.max(
    0,
    Math.floor((Date.now() - new Date(publishedAt).getTime()) / (24 * 60 * 60 * 1000))
  );

  if (ageInDays === 0) return "today";
  if (ageInDays === 1) return "1 day ago";
  return `${ageInDays} days ago`;
}

export function analyzeAiBlogEvent(article: AiBlogInput) {
  const summary = `${article.owner} published "${article.title}" ${formatAge(
    article.publishedAt
  )}.${article.summaryText ? ` ${article.summaryText}` : ""}`;

  const keyPoints = [
    `Source: ${article.owner}`,
    `Published: ${formatAge(article.publishedAt)}`,
    `Topic: ${article.title}`,
  ];

  const impact = `This update may affect AI tooling, model usage, or developer workflows built around ${article.owner}.`;

  return {
    summary,
    keyPoints,
    impact,
  };
}

export default analyzeAiBlogEvent;
