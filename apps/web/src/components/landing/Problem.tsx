import React from "react";

export default function Problem() {
    return (
        <section id="features" className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-20 sm:py-24 lg:py-32 border-t border-zinc-900/50 overflow-x-hidden">
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:gap-12 lg:gap-20 lg:grid-cols-2 lg:items-center">
                <div className="flex flex-col gap-6 sm:gap-8">
                    <div className="inline-flex items-center rounded-full border border-red-500/20 bg-red-500/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-red-500 self-start">
                        The Context
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                        Information is <br />
                        <span className="text-zinc-600 font-medium tracking-tighter">no longer scarce.</span>
                    </h2>

                    <p className="max-w-xl break-words text-sm font-medium leading-relaxed tracking-tight text-zinc-400 sm:text-base md:text-lg">
                        Staying updated means constantly switching between blogs, GitHub, newsletters, and feeds  and still missing what actually matters.
                    </p>
                    {/* <p className="max-w-xl text-lg text-zinc-400 font-medium leading-relaxed tracking-tight">
                        Developers don’t lack information , they’re overwhelmed by it.
                        AI, frameworks, open-source, and infra evolve across hundreds of sources every day.
                    </p> */}

                    <div className="mt-2 grid gap-6 sm:mt-4 sm:gap-8 sm:grid-cols-2">
                        {[
                            { title: "Fragmentation", desc: "Updates scattered across Newsletters, Twitter, GitHub, and 100+ blogs." },
                            { title: "High Noise", desc: "Most data is marketing fluff or low-impact incremental updates. Staying informed means subscribing to everything  most of it irrelevant." },
                            { title: "Latency", desc: "Manual research means you are always days behind the curve." },
                            { title: "Context loss", desc: "Hard to track long-term technical impact across disjointed posts." }
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col gap-3">
                                <div className="h-px w-8 bg-zinc-800" />
                                <h4 className="text-sm font-bold text-zinc-200 uppercase tracking-wider">{item.title}</h4>
                                <p className="break-words text-xs text-zinc-500 leading-relaxed font-medium">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative group">
                    {/* Decorative Blur */}
                    <div className="absolute inset-0 bg-red-500/5 blur-3xl opacity-0 group-hover:opacity-40 transition-opacity" />

                    <div className="relative rounded-3xl border border-zinc-900 bg-zinc-950/50 p-5 sm:p-6 md:p-8 lg:p-16 shadow-2xl backdrop-blur-sm">
                        <div className="mb-6 flex items-center gap-2 border-b border-zinc-900 pb-4 uppercase font-mono text-[9px] text-zinc-600 tracking-[0.3em] sm:mb-8 sm:pb-5 md:mb-10 md:pb-6">
                            Status: Monitoring Inefficiency
                        </div>

                        <div className="space-y-6 sm:space-y-8">
                            <div className="flex items-center gap-4 break-words text-sm font-bold text-zinc-500 line-through transition-colors group-hover:text-zinc-700">
                                <span className="h-1.5 w-1.5 rounded-full bg-zinc-800" />
                                Manually checking 10+ sources just to stay updated.
                            </div>
                            <div className="flex items-center gap-4 break-words text-sm font-bold text-zinc-500 line-through transition-colors group-hover:text-zinc-700">
                                <span className="h-1.5 w-1.5 rounded-full bg-zinc-800" />
                                Subscribing to 40+ engineering blogs.
                            </div>
                            <div className="flex items-center gap-4 break-words text-sm font-bold text-zinc-500 line-through transition-colors group-hover:text-zinc-700 opacity-50">
                                <span className="h-1.5 w-1.5 rounded-full bg-zinc-800" />
                                Ignoring GitHub Trending until it&apos;s too late.
                            </div>
                        </div>

                        <div className="mt-10 text-center text-[10px] font-bold text-red-500 uppercase tracking-[0.2em] animate-pulse sm:mt-12 md:mt-16">
                            Inefficient Ingestion Process
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
