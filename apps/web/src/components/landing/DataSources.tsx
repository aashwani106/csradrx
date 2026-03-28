import React from "react";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";

const SOURCES = [
    { name: "OpenAI", logo: "⚡", image: "/logo/open_ai.webp", accent: "#10a37f" },
    { name: "DeepMind", logo: "D", image: "/logo/Deepmind.jpeg", accent: "#4285f4" },
    { name: "GitHub", logo: "H", image: "https://cdn.simpleicons.org/github/ffffff", accent: "#24292f" },
    { name: "Hacker News", logo: "Y", image: "https://cdn.simpleicons.org/ycombinator/ff6600", accent: "#ff6600" },
    { name: "arXiv", logo: "A", image: "https://cdn.simpleicons.org/arxiv/b31b1b", accent: "#b31b1b" },
    { name: "Anthropic", logo: "A", image: "https://cdn.simpleicons.org/anthropic/d97757", accent: "#d97757" },
    { name: "Meta AI", logo: "M", image: "https://cdn.simpleicons.org/meta/0668e1", accent: "#0668e1" },
    { name: "Mistral", logo: "M", image: "/logo/logopview.png", accent: "#f3d149" }
];

export default function DataSources() {
    return (
        <section id="sources" className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-20 sm:py-24 lg:py-32 border-t border-zinc-900/50">
            <Reveal className="flex flex-col items-center text-center" distance={18}>
                <h2 className="text-3xl font-bold text-white md:text-5xl tracking-tight">The Ecosystem.</h2>
                <p className="mt-8 text-lg text-zinc-400 max-w-3xl font-medium tracking-tight">
                    We ingestion directly from the sources where technical history is being
                    written. CSRadrX acts as a gateway to the global dev ecosystem.
                </p>
            </Reveal>

            <div className="mt-24 grid grid-cols-2 sm:grid-cols-4 gap-6">
                {SOURCES.map((source, i) => (
                    <Reveal
                        key={source.name}
                        delay={i * 0.05}
                        distance={22}
                        className="group relative flex min-h-[210px] flex-col items-center justify-center overflow-hidden rounded-[26px] border border-zinc-800/80 bg-zinc-950/75 px-6 py-8 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-zinc-700 hover:bg-zinc-900/70 sm:px-8 sm:py-10"
                    >
                        <div className="pointer-events-none absolute inset-0 rounded-[26px] border border-white/[0.035]" />
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/[0.045] to-transparent" />
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        <div
                            className="pointer-events-none absolute left-1/2 top-10 h-24 w-24 -translate-x-1/2 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                            style={{ backgroundColor: source.accent }}
                        />
                        <div
                            className="pointer-events-none absolute inset-x-8 bottom-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            style={{
                                background: `linear-gradient(90deg, transparent, ${source.accent}55, transparent)`,
                            }}
                        />

                        <div
                            className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center overflow-hidden rounded-[22px] border bg-zinc-900/95 text-2xl font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_10px_26px_rgba(0,0,0,0.22)] transition-all duration-300 group-hover:scale-105 group-hover:border-white/10 group-hover:bg-zinc-800"
                            style={{ border: `1px solid ${source.accent}20` }}
                        >
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent" />
                            {source.image ? (
                                <Image
                                    src={source.image}
                                    alt={source.name}
                                    width={56}
                                    height={56}
                                    className="relative h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-110"
                                    unoptimized={source.image.startsWith("https://")}
                                />
                            ) : (
                                source.logo
                            )}
                        </div>
 
                        <span className="mt-2 block text-sm font-bold uppercase tracking-[0.16em] text-zinc-400 transition-colors group-hover:text-white">
                            {source.name}
                        </span>
                        
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
