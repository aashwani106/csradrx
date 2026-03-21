import { getDashboardEvents } from "@/lib/api";
import Feed from "@/components/dashboard/Feed";
import Atmosphere from "@/components/dashboard/Atmosphere";

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
      <div className="flex min-h-screen items-center justify-center">
        <div className="max-w-md text-center">
          <div className="mb-4 text-4xl">⚠️</div>
          <h1 className="mb-2 text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
            Unable to connect
          </h1>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            {message ?? "Failed to load dashboard"}. Make sure the API is running on{" "}
            <code className="rounded px-1.5 py-0.5 text-xs" style={{ background: "var(--surface-2)" }}>
              localhost:3000
            </code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Atmospheric background layers */}
      <div className="bg-atmosphere" />
      <div className="bg-noise" />
      <div className="bg-grid" />
      <Atmosphere />

      {/* Content */}
      <main className="relative z-10 min-h-screen pb-32">
        <div className="mx-auto max-w-[720px] px-4 pt-12 md:px-0">
          <Feed initialEvents={events} />
        </div>
      </main>
    </>
  );
}
