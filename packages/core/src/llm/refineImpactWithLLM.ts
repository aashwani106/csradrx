type RefineImpactInput = {
  summary: string;
  impact: string;
};

type RefineImpactOutput = {
  summary: string;
  impact: string;
};

const MODEL_NAME = "gemini-2.0-flash";

function parseRefinedText(text: string, fallback: RefineImpactInput): RefineImpactOutput {
  const cleaned = text.trim();
  const lines = cleaned
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const bigPictureLine = lines.find((line) => /^big picture\s*:/i.test(line)) ?? "";
  const forDevelopersLine =
    lines.find((line) => /^for developers\s*:/i.test(line)) ?? "";

  if (!bigPictureLine || !forDevelopersLine) {
    console.error("Gemini response format invalid:", text);
    return fallback;
  }

  const summary = bigPictureLine.replace(/^big picture\s*:/i, "").trim();
  const impact = forDevelopersLine.replace(/^for developers\s*:/i, "").trim();

  return {
    summary: summary || fallback.summary,
    impact: impact || fallback.impact,
  };
}

export async function refineImpactWithLLM(
  input: RefineImpactInput
): Promise<RefineImpactOutput> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("Gemini refine skipped: missing GEMINI_API_KEY");
    return input;
  }

  const prompt = [
    "Rewrite this into TWO DIFFERENT lines.",
    "",
    "DO NOT reuse original sentences.",
    "DO NOT repeat wording.",
    "Make it sharper and more specific.",
    "",
    "Format EXACTLY:",
    "Big picture: ...",
    "For developers: ...",
    "",
    "Keep each line under 15 words.",
    "",
    "Input:",
    `Summary: ${input.summary}`,
    `Impact: ${input.impact}`,
  ].join("\n");

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/${MODEL_NAME}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 80,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini refine failed:", response.status, errorText);
      return input;
    }

    const data = await response.json();
    const text =
      data?.candidates?.[0]?.content?.parts
        ?.map((part: { text?: string }) => part.text ?? "")
        .join("")
        .trim() ?? "";

    if (!text) {
      console.error("Gemini returned an empty response.", JSON.stringify(data));
      return input;
    }

    console.log("Gemini raw:", text);

    return parseRefinedText(text, input);
  } catch (error) {
    console.error("Gemini refine failed:", error);
    return input;
  }
}

export default refineImpactWithLLM;
