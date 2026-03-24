import React from "react";

export default function Hero() {
    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 sm:px-6 md:px-8 pt-28 sm:pt-32 md:pt-36 lg:pt-32 pb-16 sm:pb-20 md:pb-24 lg:pb-20 text-center">
            <div
                className="absolute left-1/2 top-1/2 -z-10 h-[800px] w-[1000px] -translate-x-1/2 -translate-y-1/2 opacity-30"
                style={{
                    background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
                    filter: "blur(140px)",
                }}
            />

            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 mx-auto w-full max-w-6xl">
                <div className="mb-8 inline-flex items-center rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-bold text-accent backdrop-blur-sm self-center">
                    <span className="mr-2 flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.45)]"></span>
                    Now live: Next-Gen Tech Intelligence
                </div>

                <h1
                    className="mx-auto max-w-xl px-4 text-4xl font-bold tracking-tight leading-tight text-white sm:max-w-2xl sm:text-5xl sm:leading-tight md:max-w-3xl md:text-6xl md:leading-[1.1] lg:max-w-6xl lg:px-0 lg:text-8xl lg:leading-[1.05]"
                    style={{ fontFamily: '"Sora", "Inter", sans-serif' }}
                >
                    Stay Ahead of AI & Tech <br />
                    <span className="bg-gradient-to-b from-white to-zinc-600 bg-clip-text text-transparent">
                        Without the Noise
                    </span>
                </h1>

                <p className="mx-auto mt-8 max-w-xl px-4 text-sm font-medium leading-relaxed tracking-tight text-zinc-400 sm:mt-10 sm:max-w-2xl sm:px-0 sm:text-base md:max-w-3xl md:text-lg lg:max-w-2xl lg:text-xl">
                    From AI labs to GitHub trends, CSRadrX tracks, analyzes, and ranks updates across the ecosystem — so you get only the signal, not the noise.
                </p>

                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:mt-14 sm:flex-row sm:gap-4">
                    <a
                        href="/dashboard"
                        className="group relative inline-flex h-14 w-full items-center justify-center overflow-hidden rounded-full bg-white px-10 text-base font-bold text-black transition-all hover:bg-zinc-200 sm:w-auto"
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
                    {/* <a
                        href="https://discord.gg"
                        target="_blank"
                        className="inline-flex h-14 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950/50 px-10 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-zinc-900"
                    >
                        Add To Discord
                    </a> */}
                </div>
            </div>

        </section>
    );
}
