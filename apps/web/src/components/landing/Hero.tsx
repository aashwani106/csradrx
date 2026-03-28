import React from "react";
import { Exo_2 } from "next/font/google";

const exo2 = Exo_2({
    subsets: ["latin"],
    weight: ["600", "700", "800"],
});

export default function Hero() {
    return (
        <section className="relative overflow-hidden px-2 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 md:px-8 md:pb-24 md:pt-22 lg:min-h-screen lg:pb-20 lg:pt-20">
            <div className="absolute inset-0 -z-10">
                <div className="absolute left-[12%] top-[18%] h-40 w-40 rounded-full bg-[color:var(--accent)]/8 blur-3xl" />
                <div className="absolute right-[14%] top-[24%] h-72 w-72 rounded-full bg-white/[0.03] blur-3xl" />
                <div className="absolute inset-y-0 right-0 hidden w-[58%] lg:block">
                    <svg
                        viewBox="0 0 760 700"
                        className="h-full w-full opacity-45"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path d="M130 480C255 482 314 442 376 378C430 322 491 229 760 171" stroke="rgba(255,255,255,0.07)" strokeWidth="2" />
                        <path d="M170 528C319 518 399 461 468 389C535 320 612 227 760 182" stroke="rgba(255,255,255,0.06)" strokeWidth="1.7" />
                        <path d="M82 557C242 562 351 531 449 455C565 364 627 242 760 216" stroke="rgba(255,255,255,0.05)" strokeWidth="1.4" />
                        <path d="M226 624C370 592 465 531 557 434C624 364 685 286 760 249" stroke="rgba(143,214,194,0.12)" strokeWidth="1.4" />
                    </svg>
                </div>
            </div>

            <div className="mx-auto grid max-w-7xl items-center gap-14 lg:min-h-[78vh] lg:grid-cols-[1.05fr_0.95fr]">
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 text-left">
                    <div className="mb-7 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                        <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] shadow-[0_0_10px_rgba(143,214,194,0.4)]" />
                        {/* Digital Intelligence Protocol V4.0 */}
                        Live: High-Signal Tech Updates
                    </div>

                    <h1 className={`${exo2.className} max-w-4xl text-5xl font-bold leading-[0.92] tracking-[-0.06em] text-white sm:text-6xl md:text-7xl lg:text-[7.25rem]`}>
                        <span className="block">STAY AHEAD IN</span>
                        <span className="block">AI &amp; TECH.</span>
                        {/* <span className="mt-1 block text-zinc-500">WITHOUT THE NOISE.</span> */}
                    </h1>

                    <p className="mt-8 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
                        {/* From AI labs to GitHub trends, CSRadrX tracks, analyzes, and ranks
                        updates across the ecosystem into clear, high-fidelity intelligence. */}

                        From AI labs to GitHub trends, CSRadrX tracks, analyzes, and ranks updates across the ecosystem , so you get only the signal, not the noise.
                    </p>

                    <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                        <a
                            href="/dashboard"
                            className="group inline-flex h-14 items-center justify-center rounded-xl border border-white/15 bg-gradient-to-r from-[#f1f2ff] via-[#d8dcff] to-[#b9c7ff] px-7 text-sm font-semibold uppercase tracking-[0.14em] text-[#0d1020] shadow-[0_12px_32px_rgba(125,140,255,0.18)] transition-all duration-300 hover:translate-y-[-1px] hover:from-[#f5f6ff] hover:via-[#e2e5ff] hover:to-[#c7d1ff] hover:shadow-[0_16px_40px_rgba(125,140,255,0.24)]"
                        >
                            Explore Live Feed
                        </a>
                        {/* <a
                            href="#showcase"
                            className="inline-flex h-14 items-center justify-center text-sm font-semibold text-zinc-300 transition-colors hover:text-white"
                        >
                            Explore Methodology
                            <svg
                                className="ml-2 h-4 w-4"
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
                        </a> */}
                    </div>
                </div>

                {/* <div className="relative hidden h-full min-h-[520px] lg:block">
                    <div className="absolute inset-y-[10%] right-[2%] w-[78%] rounded-[40px] border border-white/6 bg-white/[0.02] backdrop-blur-[2px]" />
                    <div className="absolute right-[8%] top-[18%] h-[52%] w-[56%] rounded-[32px] border border-white/7 bg-black/20" />
                    <div className="absolute inset-y-[16%] right-[8%] w-[56%] bg-gradient-to-b from-white/[0.03] to-transparent blur-3xl" />
                </div> */}
            </div>
        </section>
    );
}
