import React from "react";

export default function CTA() {
    return (
        <section className="relative z-10 mx-auto max-w-7xl px-6 py-32 border-t border-zinc-900/50">
            <div className="relative rounded-3xl border border-zinc-800 bg-zinc-950/50 p-12 shadow-2xl backdrop-blur-sm lg:p-24 overflow-hidden text-center flex flex-col items-center">
                {/* Background atmospheric glow */}
                <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 h-full w-[800px] bg-accent/5 blur-[120px] pointer-events-none" />

                <div className="relative z-10">
                    <h2 className="text-4xl font-bold text-white md:text-6xl tracking-tight">
                        Ready to see the <br />
                        <span className="text-accent">clean signal?</span>
                    </h2>
                    <p className="mt-8 text-lg text-zinc-400 max-w-2xl font-medium tracking-tight">
                        Stop scrolling and start knowing. Join the next generation of
                        computer science intelligence today.
                    </p>

                    <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <a
                            href="/dashboard"
                            className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-white px-10 text-base font-bold text-black transition-all hover:bg-zinc-200"
                        >
                            Open Live Dashboard
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
                            href="https://discord.gg"
                            target="_blank"
                            className="inline-flex h-14 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950/50 px-10 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-zinc-900"
                        >
                            Join Discord Community
                        </a>
                    </div>

                    <div className="mt-10 text-xs text-zinc-600 font-bold uppercase tracking-widest">
                        No account required to view public feed.
                    </div>
                </div>
            </div>
        </section>
    );
}
