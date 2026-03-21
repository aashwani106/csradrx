import { getDashboardEvents } from "@/lib/api";
import Feed from "@/components/dashboard/Feed";

export default async function DashboardPage() {
  let events = null;
  let message: string | null = null;

  try {
    events = await getDashboardEvents({ limit: 40 });
  } catch (error) {
    message = error instanceof Error ? error.message : "Failed to load dashboard";
  }

  if (!events) {
    return (
      <div className="min-h-screen bg-black p-6 text-white">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-6 text-2xl font-bold">🔥 Trending Now</h1>
          <div className="rounded-xl border border-red-900 bg-red-950/30 p-4 text-sm text-red-200">
            {message ?? "Failed to load dashboard"}. Make sure the API server is running
            on <span className="font-mono">http://localhost:3000</span>.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6 text-white pb-32">
      <Feed initialEvents={events} />
    </div>
  );
}
