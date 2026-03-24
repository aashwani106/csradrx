import { getDashboardEvents } from "@/lib/api";
import Feed from "@/components/dashboard/Feed";
import Atmosphere from "@/components/dashboard/Atmosphere";

const DASHBOARD_LOCKED = true;

function DashboardHoldingScreen() {
  return (
    <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-16 sm:px-6 md:px-8">
      <div className="w-full max-w-2xl rounded-3xl border border-zinc-800 bg-zinc-950/70 p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:p-10 md:p-12">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
          <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.35)]" />
          In Progress
        </div>

        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
          Please wait.
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base md:text-lg">
          The dashboard is being refined right now. Good things take time,
          and this experience is coming soon.
        </p>

        <div className="mt-8 border-t border-zinc-800/70 pt-6 text-xs uppercase tracking-[0.18em] text-zinc-500">
          Coming soon
        </div>
      </div>
    </main>
  );
}

export default async function DashboardPage() {
  let events = null;
  let message: string | null = null;

  if (!DASHBOARD_LOCKED) {
    try {
      events = await getDashboardEvents({ limit: 40 });
    } catch (error) {
      message = error instanceof Error ? error.message : "Failed to load dashboard";
    }
  }

  if (DASHBOARD_LOCKED) {
    return (
      <>
        <div className="bg-atmosphere" />
        <div className="bg-noise" />
        <div className="bg-grid" />
        <Atmosphere />
        <DashboardHoldingScreen />
      </>
    );
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
      <div className="bg-atmosphere" />
      <div className="bg-noise" />
      <div className="bg-grid" />
      <Atmosphere />

      <main className="relative z-10 min-h-screen pb-32">
        <div className="mx-auto max-w-6xl px-4 pt-12 md:px-6">
          <Feed initialEvents={events} />
        </div>
      </main>
    </>
  );
}
