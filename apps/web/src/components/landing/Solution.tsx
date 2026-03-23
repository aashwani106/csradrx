import React from "react";

export default function Solution() {
    return (
        <section className="relative z-10 mx-auto max-w-7xl px-6 py-32 overflow-hidden">
            <div className="flex flex-col items-center text-center">
                <div className="mb-4 inline-flex items-center rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent">
                    The Solution
                </div>
                <h2 className="max-w-3xl text-4xl font-bold tracking-tight text-white md:text-6xl">
                    One System. <br />
                    <span className="bg-gradient-to-r from-accent to-indigo-400 bg-clip-text text-transparent">
                        Clean Signal.
                    </span>
                </h2>
                <p className="mt-8 max-w-2xl text-lg text-zinc-400">
                    CSRadrX doesn't just show you what's happening. It processes the chaos
                    of the tech ecosystem into a single, high-fidelity intelligence stream.
                </p>
            </div>

            <div className="mt-24 grid gap-8 md:grid-cols-3">
                {[
                    {
                        title: "Smart Aggregation",
                        desc: "Unified ingestion from 50+ authoritative sources across the AI and software engineering landscape.",
                        icon: "🏗️"
                    },
                    {
                        title: "LLM Analysis",
                        desc: "Every event is summarized and analyzed for technical impact by our specialized AI worker nodes.",
                        icon: "🧪"
                    },
                    {
                        title: "Dynamic Scoring",
                        desc: "Ranked by freshness, source quality, and real-world utility so you only see what actually matters.",
                        icon: "📈"
                    }
                ].map((feature, i) => (
                    <div
                        key={i}
                        className="group rounded-2xl border border-zinc-800 bg-zinc-950/40 p-10 transition-all hover:border-zinc-700 hover:bg-zinc-900/60"
                    >
                        <div className="mb-6 h-12 w-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                            {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white tracking-tight">{feature.title}</h3>
                        <p className="mt-4 text-sm leading-relaxed text-zinc-500 font-medium">
                            {feature.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
