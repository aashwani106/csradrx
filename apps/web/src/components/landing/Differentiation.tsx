import React from "react";

export default function Differentiation() {
    return (
        <section className="relative z-10 mx-auto max-w-7xl px-6 py-32 border-t border-zinc-900/50">
            <div className="flex flex-col items-center text-center">
                <h2 className="text-3xl font-bold text-white md:text-5xl tracking-tight">
                    Why CSRadrX?
                </h2>
                <p className="mt-8 text-lg text-zinc-400 max-w-2xl font-medium">
                    We don't just aggregate data. We build intelligence.
                </p>
            </div>

            <div className="mt-24 grid gap-8 md:grid-cols-2">
                <div className="rounded-3xl border border-zinc-900 bg-zinc-950 p-12">
                    <h3 className="text-xl font-bold text-zinc-500 line-through tracking-tight">The Old Way</h3>
                    <p className="mt-4 text-sm text-zinc-600 font-medium">RSS feeds, random tweets, and endless scrolling.</p>

                    <ul className="mt-10 space-y-6">
                        {["Information overload", "Zero prioritization", "Manual research required", "High context-switching cost"].map((text, i) => (
                            <li key={i} className="flex items-center gap-4 text-zinc-700 text-sm font-semibold italic">
                                <span className="h-1.5 w-1.5 rounded-full bg-zinc-800" />
                                {text}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="rounded-3xl border border-accent/20 bg-accent/5 p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10 blur-2xl">
                        <div className="h-32 w-32 rounded-full bg-accent" />
                    </div>

                    <h3 className="text-xl font-bold text-white tracking-tight">The CSRadrX Way</h3>
                    <p className="mt-4 text-sm text-zinc-400 font-medium leading-relaxed">Intelligence + Prioritization + Context.</p>

                    <ul className="mt-10 space-y-6">
                        {["Automated signal ranking", "AI-summarized impact", "One unified intelligence stream", "Real-time automated alerts"].map((text, i) => (
                            <li key={i} className="flex items-center gap-4 text-zinc-200 text-sm font-bold">
                                <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {text}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
