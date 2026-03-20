type HookEvent = {
  category: string;
  type?: string | null;
  title: string;
  repoName?: string | null;
};

function hookFromAiTitle(title: string): string {
  const lowerTitle = title.toLowerCase();

  if (lowerTitle.includes("gpt-5.4 mini and nano")) {
    return "OpenAI just made GPT cheaper to run";
  }

  if (lowerTitle.includes("prompt injection")) {
    return "AI agents just got a clearer security playbook";
  }

  if (lowerTitle.includes("progress toward agi")) {
    return "AI progress just got a clearer benchmark";
  }

  if (lowerTitle.includes("introducing")) {
    return "A major AI release just landed";
  }

  if (lowerTitle.includes("security") || lowerTitle.includes("safety")) {
    return "AI safety just became more actionable";
  }

  if (lowerTitle.includes("benchmark") || lowerTitle.includes("system card")) {
    return "AI evaluation just got more concrete";
  }

  if (lowerTitle.includes("agent")) {
    return "Agent workflows just got more practical";
  }

  if (lowerTitle.includes("api")) {
    return "Developer integration just got easier";
  }

  return "A meaningful AI update just dropped";
}

function hookFromGithubRepo(repoName: string | null | undefined): string {
  if (!repoName) {
    return "A trending GitHub project is picking up steam";
  }

  return `${repoName} is gaining serious developer attention`;
}

export function generateHook(event: HookEvent): string {
  if (event.category === "ai") {
    return hookFromAiTitle(event.title);
  }

  return hookFromGithubRepo(event.repoName);
}

export default generateHook;
