type AiBlogInput = {
  owner: string;
  title: string;
  summaryText?: string | null;
  publishedAt: string;
};

type ImpactRule = {
  keywords: string[];
  change: string;
  meaning: string;
};

const impactRules: ImpactRule[] = [
  {
    keywords: ["introducing", "launch", "announcing", "release"],
    change: "Ships a new model or product",
    meaning: "expands capabilities, pricing options, or deployment choices",
  },
  {
    keywords: ["mini", "nano", "small"],
    change: "Adds smaller model variants",
    meaning: "reduces inference cost and supports lighter deployments",
  },
  {
    keywords: ["security", "safe", "safety", "prompt injection", "misalignment"],
    change: "Strengthens AI safety and security",
    meaning: "reduces risk in autonomous agents and tool-using systems",
  },
  {
    keywords: ["agent", "agents", "codex", "tool use", "tooling"],
    change: "Advances agent workflows",
    meaning: "improves automation for coding and multi-step task execution",
  },
  {
    keywords: ["benchmark", "evaluate", "evaluating", "measure", "system card"],
    change: "Introduces evaluation signals",
    meaning: "changes how model capability and risk are assessed",
  },
  {
    keywords: ["api", "sdk", "developer", "integration", "responses api"],
    change: "Expands developer integration",
    meaning: "makes it easier to build products on the platform",
  },
  {
    keywords: ["reasoning", "thinking"],
    change: "Improves reasoning behavior",
    meaning: "affects complex task performance and reliability",
  },
  {
    keywords: ["benchmark", "agi"],
    change: "Defines capability benchmarks",
    meaning: "shifts how frontier progress is measured",
  },
];

function formatAge(publishedAt: string): string {
  const ageInDays = Math.max(
    0,
    Math.floor((Date.now() - new Date(publishedAt).getTime()) / (24 * 60 * 60 * 1000))
  );

  if (ageInDays === 0) return "today";
  if (ageInDays === 1) return "1 day ago";
  return `${ageInDays} days ago`;
}

function deriveImpactFromTitle(title: string): string {
  const lowerTitle = title.toLowerCase();

  if (lowerTitle.includes("gpt-5.4 mini and nano")) {
    return "Adds smaller GPT-5.4 variants -> cheaper inference and lighter deployment.";
  }

  if (lowerTitle.includes("prompt injection")) {
    return "Improves agent security -> safer tool usage in autonomous systems.";
  }

  if (lowerTitle.includes("progress toward agi")) {
    return "Defines capability benchmarks -> changes how frontier AI progress is evaluated.";
  }

  const matchedRule = impactRules.find((rule) =>
    rule.keywords.some((keyword) => lowerTitle.includes(keyword))
  );

  if (matchedRule) {
    return `${matchedRule.change} -> ${matchedRule.meaning}.`;
  }

  return "Introduces a notable AI update -> may change capabilities, tooling, or deployment decisions.";
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

  const impact = deriveImpactFromTitle(article.title);

  return {
    summary,
    keyPoints,
    impact,
  };
}

export default analyzeAiBlogEvent;
