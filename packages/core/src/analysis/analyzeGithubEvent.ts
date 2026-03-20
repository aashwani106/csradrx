type GithubRepoInput = {
  description?: string | null;
  language: string | null;
  stargazers_count: number;
  created_at: string;
  full_name: string;
};

function formatAge(createdAt: string): string {
  const ageInDays = Math.max(
    0,
    Math.floor((Date.now() - new Date(createdAt).getTime()) / (24 * 60 * 60 * 1000))
  );

  if (ageInDays === 0) return "today";
  if (ageInDays === 1) return "1 day ago";
  return `${ageInDays} days ago`;
}

export function analyzeGithubEvent(repo: GithubRepoInput) {
  const summary = `${repo.full_name} is a ${repo.language ?? "software"} repository with ${
    repo.stargazers_count
  } stars, created ${formatAge(repo.created_at)}.${repo.description ? ` ${repo.description}` : ""}`;

  const keyPoints = [
    `Language: ${repo.language ?? "Unknown"}`,
    `Stars: ${repo.stargazers_count}`,
    `Created: ${formatAge(repo.created_at)}`,
  ];

  const impact = `High GitHub traction suggests potential developer interest in ${repo.language ?? "this project"} tooling.`;

  return {
    summary,
    keyPoints,
    impact,
  };
}

export default analyzeGithubEvent;
