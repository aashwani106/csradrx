type HookEvent = {
  category: string;
  type?: string | null;
  title: string;
  repoName?: string | null;
};

function hookFromAiTitle(title: string): string {
  const lowerTitle = title.toLowerCase();

  if (lowerTitle.includes("gpt-5.4 mini and nano")) {
    return "GPT just became drastically cheaper for production";
  }

  if (lowerTitle.includes("prompt injection")) {
    return "The security blueprint for AI agents is finally here";
  }

  if (lowerTitle.includes("progress toward agi")) {
    return "A major breakthrough in measuring AGI";
  }

  if (lowerTitle.includes("introducing")) {
    return "A massive AI release just dropped that changes the landscape";
  }

  if (lowerTitle.includes("security") || lowerTitle.includes("safety")) {
    return "New essential guardrails for deploying AI safely";
  }

  if (lowerTitle.includes("benchmark") || lowerTitle.includes("system card")) {
    return "The definitive benchmark for AI models just dropped";
  }

  if (lowerTitle.includes("agent")) {
    return "AI agents are becoming production-ready";
  }

  if (lowerTitle.includes("api")) {
    return "A new API is fundamentally changing how developers build with AI";
  }

  return "A meaningful AI update just dropped — ignore the noise";
}

function hookFromGithubRepo(repoName: string | null | undefined): string {
  if (!repoName) {
    return "A trending open-source project is picking up massive steam";
  }

  return `${repoName} is gaining serious developer momentum right now`;
}

export function generateHook(event: HookEvent): string {
  if (event.category === "ai") {
    return hookFromAiTitle(event.title);
  }

  return hookFromGithubRepo(event.repoName);
}

export default generateHook;
