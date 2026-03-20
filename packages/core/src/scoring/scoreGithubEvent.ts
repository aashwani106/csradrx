type GithubRepoInput = {
  created_at: string;
  language: string | null;
  stargazers_count: number;
};

const languageWeights: Record<string, number> = {
  JavaScript: 10,
  TypeScript: 12,
  Python: 10,
  Go: 9,
  Rust: 11,
};

export default function scoreGithubEvent(repo: GithubRepoInput): number {
  const starsScore = Math.min(repo.stargazers_count / 50, 40);

  const ageInDays = Math.max(
    0,
    (Date.now() - new Date(repo.created_at).getTime()) / (24 * 60 * 60 * 1000)
  );
  const recencyScore = Math.max(0, 40 - ageInDays * 5);

  const languageScore = repo.language ? (languageWeights[repo.language] ?? 0) : 0;

  return Math.min(100, Math.round(starsScore + recencyScore + languageScore));
}
