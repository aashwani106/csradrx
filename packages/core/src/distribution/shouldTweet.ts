type TweetDecisionInput = {
  category: string;
  tweeted: boolean;
  tweetsToday: number;
  score: number;
  summary?: string | null;
  impact?: string | null;
};

const DAILY_TWEET_LIMIT = 10;
const AI_THRESHOLD = 68;
const GITHUB_THRESHOLD = 85;

export function shouldTweet(input: TweetDecisionInput) {
  if (input.tweeted) {
    return { shouldTweet: false, reason: "already_tweeted" };
  }

  if (input.tweetsToday >= DAILY_TWEET_LIMIT) {
    return { shouldTweet: false, reason: "daily_limit_reached" };
  }

  if (!input.summary || !input.impact) {
    return { shouldTweet: false, reason: "missing_analysis" };
  }

  if (input.category === "ai") {
    return {
      shouldTweet: input.score >= AI_THRESHOLD,
      reason: input.score >= AI_THRESHOLD ? "tweet_ai" : "score_too_low",
    };
  }

  return {
    shouldTweet: input.score >= GITHUB_THRESHOLD,
    reason: input.score >= GITHUB_THRESHOLD ? "tweet_github" : "score_too_low",
  };
}

export default shouldTweet;
