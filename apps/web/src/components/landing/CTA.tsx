import React from "react";

export default function CTA() {
    return (
        <section className="relative z-10 mx-auto max-w-7xl px-6 py-32 border-t border-zinc-900/50">
            <div className="relative rounded-3xl border border-zinc-800 bg-zinc-950/50 p-12 shadow-2xl backdrop-blur-sm lg:p-24 overflow-hidden text-center flex flex-col items-center">
                {/* Background atmospheric glow */}
                <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 h-full w-[800px] bg-accent/5 blur-[120px] pointer-events-none" />

                <div className="relative z-10">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        Live Now
                    </div>
                    <h2 className="text-4xl font-bold text-white md:text-6xl tracking-tight">
                        Ready to see the <br />
                        <span className="text-accent">clean signal?</span>
                    </h2>
                    <p className="mt-8 text-lg text-zinc-400 max-w-2xl font-medium tracking-tight">
                        {/* Stop scrolling and start knowing. Join the next generation of
                        computer science intelligence today. */}

                        Track everything happening in AI and tech ,
                        without opening 10 tabs.
                    </p>

                    <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <a
                            href="/dashboard"
                             target="_blank"
                            className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-white px-10 text-base font-bold text-black transition-all hover:bg-zinc-200"
                        >
                            Explore Live Feed
                            <svg
                                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M6 12L10 8L6 4"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </a>
                        <a
                            href="https://x.com/csradrx"
                            target="_blank"
                            className="inline-flex h-14 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950/50 px-10 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-zinc-900"
                        >
                            Get updates on
                            <svg
                                className="ml-2 h-4 w-4"
                                viewBox="0 0 1200 1227"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                            >
                                <path d="M714.163 519.284 1160.89 0H1055.17L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.728l409.665-476.152 327.279 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.403-67.894L144.011 79.694h162.604l304.797 436.204 47.403 67.894 396.198 566.721H892.409L569.165 687.854v-.026Z" />
                            </svg>
                        </a>
                    </div>

                    <div className="mt-10 text-xs text-zinc-600 font-bold uppercase tracking-widest">
                        No account required to view public feed.
                        {/* No signup required • Live data • Updates every few minutes */}
                    </div>
                </div>
            </div>
        </section>
    );
}
