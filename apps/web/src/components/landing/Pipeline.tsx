import React from "react";

function SettingsIcon() {
    return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-.4-1.1 1.7 1.7 0 0 0-1-.6 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H2.9a2 2 0 1 1 0-4H3a1.7 1.7 0 0 0 1.1-.4 1.7 1.7 0 0 0 .6-1 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V2.9a2 2 0 1 1 4 0V3a1.7 1.7 0 0 0 .4 1.1 1.7 1.7 0 0 0 1 .6 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.25.32.5.68.6 1 .12.36.18.74.18 1.12s-.06.76-.18 1.12c-.1.32-.35.68-.6 1Z" />
        </svg>
    );
}

function GlobeIcon() {
    return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18" />
            <path d="M12 3a14 14 0 0 1 4 9 14 14 0 0 1-4 9 14 14 0 0 1-4-9 14 14 0 0 1 4-9Z" />
        </svg>
    );
}

function LayersIcon() {
    return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3 3 8l9 5 9-5-9-5Z" />
            <path d="m3 12 9 5 9-5" />
            <path d="m3 16 9 5 9-5" />
        </svg>
    );
}

function CpuIcon() {
    return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="7" y="7" width="10" height="10" rx="2" />
            <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
        </svg>
    );
}

function DatabaseIcon() {
    return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="7" ry="3" />
            <path d="M5 5v6c0 1.66 3.13 3 7 3s7-1.34 7-3V5" />
            <path d="M5 11v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" />
        </svg>
    );
}

function PackageIcon() {
    return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" />
            <path d="M4 7.5V16.5L12 21l8-4.5V7.5" />
            <path d="M12 12v9" />
        </svg>
    );
}

function SendIcon() {
    return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 2 11 13" />
            <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
        </svg>
    );
}

const STEPS = [
    { id: 1, name: "GitHub Actions", desc: "Cron-based triggers", icon: SettingsIcon },
    { id: 2, name: "Fetcher", desc: "RSS, GH & HN Ingest", icon: GlobeIcon },
    { id: 3, name: "Redis Queue", desc: "Distributed Tasks", icon: LayersIcon },
    { id: 4, name: "Worker", desc: "LLM Analysis & Scoring", icon: CpuIcon },
    { id: 5, name: "Supabase DB", desc: "Structured Storage", icon: DatabaseIcon },
    { id: 6, name: "Dist. Queue", desc: "Final Processing", icon: PackageIcon },
    { id: 7, name: "Outbound", desc: "Discord, Slack, X", icon: SendIcon },
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
                            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl transition-all group-hover:scale-105 group-hover:border-accent group-hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50 text-zinc-300 transition-all group-hover:border-accent/40 group-hover:text-indigo-400">
                                    <step.icon />
                                </div>
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
