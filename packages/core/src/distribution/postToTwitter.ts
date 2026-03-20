type TweetEvent = {
  category: string;
  title: string;
  url: string;
  repoName: string;
  stars: number | null;
};

type TweetAnalysis = {
  summary: string;
  impact: string;
};

function trim(text: string, limit: number) {
  if (text.length <= limit) return text;
  return `${text.slice(0, limit - 1)}...`;
}

export function formatTweet(event: TweetEvent, analysis: TweetAnalysis) {
  if (event.category === "ai") {
    return trim(
      `⚡ ${event.title}\n\n${analysis.summary}\n\nWhy it matters:\n${analysis.impact}\n\n🔗 ${event.url}`,
      280
    );
  }

  return trim(
    `🔥 ${event.repoName}\n\n${analysis.summary}\n\n⭐ ${event.stars ?? 0}\n\n🔗 ${event.url}`,
    280
  );
}

export async function postToTwitter(event: TweetEvent, analysis: TweetAnalysis) {
  const token = process.env.TWITTER_BEARER_TOKEN;
  const dryRun = process.env.DRY_RUN === "true";
  const tweet = formatTweet(event, analysis);

  if (dryRun) {
    console.log("TWEET:\n", tweet);

    return {
      success: true,
      skipped: false,
      dryRun: true,
      tweet,
    };
  }

  if (!token) {
    return {
      success: false,
      skipped: true,
      reason: "missing_twitter_token",
      tweet,
    };
  }

  const response = await fetch("https://api.twitter.com/2/tweets", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: tweet }),
  });

  if (!response.ok) {
    const body = await response.text();
    return {
      success: false,
      skipped: false,
      reason: `twitter_error_${response.status}`,
      tweet,
      body,
    };
  }

  const body = await response.json();

  return {
    success: true,
    skipped: false,
    tweet,
    body,
  };
}

export default postToTwitter;
