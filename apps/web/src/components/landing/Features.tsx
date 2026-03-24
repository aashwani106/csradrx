import React from "react";

function ActivityIcon() {
    return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 7-4-14-3 7H2" />
        </svg>
    );
}

function SparklesIcon() {
    return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3l1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7L12 3Z" />
            <path d="M5 16l.8 2.2L8 19l-2.2.8L5 22l-.8-2.2L2 19l2.2-.8L5 16Z" />
            <path d="M19 14l.9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14Z" />
        </svg>
    );
}

function ZapIcon() {
    return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
        </svg>
    );
}

function CodeIcon() {
    return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="m16 18 6-6-6-6" />
            <path d="m8 6-6 6 6 6" />
            <path d="m14.5 4-5 16" />
        </svg>
    );
}

function BarChartIcon() {
    return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v18h18" />
            <path d="M18 17V9" />
            <path d="M13 17V5" />
            <path d="M8 17v-3" />
        </svg>
    );
}

function TrendingUpIcon() {
    return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="m22 7-8.5 8.5-5-5L2 17" />
            <path d="M16 7h6v6" />
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

export default function Features() {
    const coreIntelligence = [
        { title: "Signal Analysis", desc: "Understands what actually matters across noisy updates — not just what’s trending.", icon: ActivityIcon },
        { title: "AI Summaries", desc: "Breaks down complex updates into clear, high-density insights you can grasp in seconds.", icon: SparklesIcon },
        { title: "Auto-Scoring", desc: "Ranks every update by real-world impact, so you focus on what deserves attention.", icon: BarChartIcon },
        { title: "Trend Detection", desc: "Surfaces emerging patterns early — before they become obvious to everyone else.", icon: TrendingUpIcon }
    ];

    const deliveryPlatform = [
        { title: "Real-time Feed", desc: "Delivers high-signal updates instantly as they happen — no lag, no refresh.", icon: ZapIcon },
        { title: "Dev-first API", desc: "Plug structured intelligence directly into your tools, workflows, or internal systems.", icon: CodeIcon },
        { title: "Edge Processing", desc: "Processes data closer to the source for faster ingestion and low-latency insights.", icon: CpuIcon },
        { title: "Archive Depth", desc: "Search and explore a growing history of high-impact updates across the ecosystem.", icon: DatabaseIcon }
    ];

    return (
        <section className="relative z-10 mx-auto max-w-7xl px-6 py-32 border-t border-zinc-900/50">
            <div className="flex flex-col items-center text-center">
                {/* <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                    Everything you need to stay ahead — without the noise
                </div> */}
                <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">The CSRadrX Stack</h2>
                <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400">
                    Built for high-performance intelligence, our architecture is optimized for
                    latency, accuracy, and technical depth.
                </p>
            </div>

            <div className="mt-24 space-y-16">
                <div>
                    <div className="mb-8 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                        Core Intelligence
                    </div>
                    <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
                        {coreIntelligence.map((feature, i) => (
                            <div key={i} className="group flex flex-col rounded-2xl border border-transparent p-4 text-left transition-all hover:border-zinc-700 hover:bg-zinc-900/60">
                                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-300 transition-all group-hover:scale-110 group-hover:border-accent group-hover:text-indigo-400">
                                    <feature.icon />
                                </div>
                                <h4 className="text-lg font-bold text-white tracking-tight">{feature.title}</h4>
                                <p className="mt-3 text-sm font-medium leading-relaxed text-zinc-400">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="mb-8 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                        Delivery &amp; Platform
                    </div>
                    <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
                        {deliveryPlatform.map((feature, i) => (
                            <div key={i} className="group flex flex-col rounded-2xl border border-transparent p-4 text-left transition-all hover:border-zinc-700 hover:bg-zinc-900/60">
                                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-300 transition-all group-hover:scale-110 group-hover:border-accent group-hover:text-indigo-400">
                                    <feature.icon />
                                </div>
                                <h4 className="text-lg font-bold text-white tracking-tight">{feature.title}</h4>
                                <p className="mt-3 text-sm font-medium leading-relaxed text-zinc-400">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
