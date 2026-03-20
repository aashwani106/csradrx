export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="max-w-xl rounded-2xl border border-zinc-800 bg-zinc-950/80 p-8 text-center">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-zinc-500">
          CSRadrX
        </p>
        <h1 className="mb-4 text-3xl font-semibold">Technology intelligence, not a news feed.</h1>
        <p className="mb-6 text-zinc-400">
          Open the dashboard to see the highest-signal events ranked by freshness,
          source quality, and impact.
        </p>
        <a
          href="/dashboard"
          className="inline-flex rounded-full border border-zinc-700 px-5 py-3 text-sm font-medium transition hover:border-zinc-500 hover:bg-zinc-900"
        >
          Open Dashboard
        </a>
      </div>
    </main>
  );
}
