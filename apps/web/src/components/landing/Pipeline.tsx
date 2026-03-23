import React from "react";

const STEPS = [
    { id: 1, name: "GitHub Actions", desc: "Cron-based triggers", icon: "⚙️" },
    { id: 2, name: "Fetcher", desc: "RSS, GH & HN Ingest", icon: "🌐" },
    { id: 3, name: "Redis Queue", desc: "Distributed Tasks", icon: "📬" },
    { id: 4, name: "Worker", desc: "LLM Analysis & Scoring", icon: "🧠" },
    { id: 5, name: "Supabase DB", desc: "Structured Storage", icon: "💾" },
    { id: 6, name: "Dist. Queue", desc: "Final Processing", icon: "📦" },
    { id: 7, name: "Outbound", desc: "Discord, Slack, X", icon: "🚀" },
];

export default function Pipeline() {
    return (
        <section id="pipeline" className="mx-auto max-w-7xl px-6 py-32 border-t border-zinc-900/50">
            <div className="flex flex-col items-center text-center">
                <div className="mb-4 inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-500">
                    The Architecture
                </div>
                <h2 className="text-3xl font-bold text-white md:text-5xl tracking-tight">Engineered for Signal</h2>
                <p className="mt-8 text-lg text-zinc-400 max-w-2xl font-medium">
                    Our multi-stage pipeline is built on a distributed layer that summarizes,
                    scores, and ranks every update in miliseconds.
                </p>
            </div>

            <div className="mt-24 relative">
                {/* Connector line (desktop) */}
                <div className="absolute top-12 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent hidden lg:block" />

                <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
                    {STEPS.map((step, i) => (
                        <div key={step.id} className="relative z-10 flex flex-col items-center text-center group">
                            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl transition-all group-hover:scale-110 group-hover:border-accent group-hover:shadow-accent/5">
                                <div className="text-2xl">{step.icon}</div>
                            </div>
                            <h3 className="text-sm font-bold text-white tracking-tight leading-tight">{step.name}</h3>
                            <p className="mt-2 text-[10px] text-zinc-500 font-bold uppercase tracking-wider leading-relaxed">
                                {step.desc}
                            </p>

                            {/* Arrow (desktop, between nodes) */}
                            {i < STEPS.length - 1 && (
                                <div className="absolute top-10 -right-6 hidden lg:block opacity-20">
                                    <svg className="h-4 w-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
