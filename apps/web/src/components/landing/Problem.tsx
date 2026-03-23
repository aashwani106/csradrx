import React from "react";

export default function Problem() {
    return (
        <section id="features" className="relative z-10 mx-auto max-w-7xl px-6 py-32 border-t border-zinc-900/50">
            <div className="grid gap-20 lg:grid-cols-2 lg:items-center">
                <div className="flex flex-col gap-8">
                    <div className="inline-flex items-center rounded-full border border-red-500/20 bg-red-500/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-red-500 self-start">
                        The Context
                    </div>
                    <h2 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
                        Information is <br />
                        <span className="text-zinc-600 font-medium tracking-tighter">no longer scarce.</span>
                    </h2>

                    <p className="max-w-xl text-lg text-zinc-400 font-medium leading-relaxed tracking-tight">
                        Staying updated means constantly switching between blogs, GitHub, newsletters, and feeds  and still missing what actually matters.
                    </p>
                    {/* <p className="max-w-xl text-lg text-zinc-400 font-medium leading-relaxed tracking-tight">
                        Developers don’t lack information , they’re overwhelmed by it.
                        AI, frameworks, open-source, and infra evolve across hundreds of sources every day.
                    </p> */}

                    <div className="grid gap-8 mt-4 sm:grid-cols-2">
                        {[
                            { title: "Fragmentation", desc: "Updates scattered across Newsletters, Twitter, GitHub, and 100+ blogs." },
                            { title: "High Noise", desc: "Most data is marketing fluff or low-impact incremental updates. Staying informed means subscribing to everything  most of it irrelevant." },
                            { title: "Latency", desc: "Manual research means you are always days behind the curve." },
                            { title: "Context loss", desc: "Hard to track long-term technical impact across disjointed posts." }
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col gap-3">
                                <div className="h-px w-8 bg-zinc-800" />
                                <h4 className="text-sm font-bold text-zinc-200 uppercase tracking-wider">{item.title}</h4>
                                <p className="text-xs text-zinc-500 leading-relaxed font-medium">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative group">
                    {/* Decorative Blur */}
                    <div className="absolute inset-0 bg-red-500/5 blur-3xl opacity-0 group-hover:opacity-40 transition-opacity" />

                    <div className="relative rounded-3xl border border-zinc-900 bg-zinc-950/50 p-10 shadow-2xl backdrop-blur-sm lg:p-16">
                        <div className="flex items-center gap-2 mb-10 border-b border-zinc-900 pb-6 uppercase font-mono text-[9px] text-zinc-600 tracking-[0.3em]">
                            Status: Monitoring Inefficiency
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-center gap-4 text-zinc-500 text-sm font-bold line-through group-hover:text-zinc-700 transition-colors">
                                <span className="h-1.5 w-1.5 rounded-full bg-zinc-800" />
                                Manually checking 10+ sources just to stay updated.
                            </div>
                            <div className="flex items-center gap-4 text-zinc-500 text-sm font-bold line-through group-hover:text-zinc-700 transition-colors">
                                <span className="h-1.5 w-1.5 rounded-full bg-zinc-800" />
                                Subscribing to 40+ engineering blogs.
                            </div>
                            <div className="flex items-center gap-4 text-zinc-500 text-sm font-bold line-through group-hover:text-zinc-700 transition-colors opacity-50">
                                <span className="h-1.5 w-1.5 rounded-full bg-zinc-800" />
                                Ignoring GitHub Trending until it's too late.
                            </div>
                        </div>

                        <div className="mt-16 text-center text-[10px] font-bold text-red-500 uppercase tracking-[0.2em] animate-pulse">
                            Inefficient Ingestion Process
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
