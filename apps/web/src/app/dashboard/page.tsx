import EventCard from "@/components/dashboard/EventCard";
import { getFeedEvents, getTrendingEvents } from "@/lib/api";

export default async function DashboardPage() {
  let trendingEvents = null;
  let feedEvents = null;
  let message: string | null = null;

  try {
    [trendingEvents, feedEvents] = await Promise.all([
      getTrendingEvents(),
      getFeedEvents(),
    ]);
  } catch (error) {
    message = error instanceof Error ? error.message : "Failed to load dashboard";
  }

  if (!trendingEvents || !feedEvents) {
    return (
      <div className="min-h-screen bg-black p-6 text-white">
        <h1 className="mb-6 text-2xl font-bold">🔥 Trending Now</h1>
        <div className="rounded-xl border border-red-900 bg-red-950/30 p-4 text-sm text-red-200">
          {message ?? "Failed to load dashboard"}. Make sure the API server is running
          on <span className="font-mono">http://localhost:3000</span>.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <h1 className="mb-6 text-2xl font-bold">🔥 Trending Now</h1>

      <div className="grid gap-4 md:grid-cols-2">
        {trendingEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      <div className="my-10 border-t border-zinc-900" />

      <h2 className="mb-4 text-xl font-semibold">🌊 Live Feed</h2>

      <div className="grid gap-3">
        {feedEvents.map((event) => (
          <EventCard key={event.id} event={event} compact />
        ))}
      </div>
    </div>
  );
}
