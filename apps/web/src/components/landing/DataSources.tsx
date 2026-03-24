import React from "react";

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
        <section id="sources" className="relative z-10 mx-auto max-w-7xl px-6 py-32 border-t border-zinc-900/50">
            <div className="flex flex-col items-center text-center">
                <h2 className="text-3xl font-bold text-white md:text-5xl tracking-tight">The Ecosystem.</h2>
                <p className="mt-8 text-lg text-zinc-400 max-w-3xl font-medium tracking-tight">
                    We ingestion directly from the sources where technical history is being
                    written. CSRadrX acts as a gateway to the global dev ecosystem.
                </p>
            </div>

            <div className="mt-24 grid grid-cols-2 sm:grid-cols-4 gap-6">
                {SOURCES.map((source) => (
                    <div
                        key={source.name}
                        className="group relative flex flex-col items-center justify-center rounded-2xl border border-zinc-900 bg-zinc-950 p-10 transition-all hover:scale-105 hover:bg-zinc-900/40"
                    >
                        {/* Glow effect on hover */}
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity blur-2xl rounded-2xl"
                            style={{ backgroundColor: source.accent }}
                        />

                        <div
                            className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-zinc-900 text-2xl font-bold text-white transition-all group-hover:bg-zinc-800"
                            style={{ border: `1px solid ${source.accent}20` }}
                        >
                            {source.image ? (
                                <img
                                    src={source.image}
                                    alt={source.name}
                                    className="h-full w-full rounded-xl object-cover"
                                />
                            ) : (
                                source.logo
                            )}
                        </div>

                        <span className="text-sm font-bold text-zinc-500 tracking-tight transition-colors group-hover:text-white uppercase tracking-wider">{source.name}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
