import React from "react";

export default function Features() {
    return (
        <section className="relative z-10 mx-auto max-w-7xl px-6 py-32 border-t border-zinc-900/50">
            <div className="flex flex-col items-center text-center">
                <h2 className="text-3xl font-bold text-white md:text-5xl tracking-tight">The CSRadrX Stack</h2>
                <p className="mt-8 text-lg text-zinc-400 max-w-2xl">
                    Built for high-performance intelligence, our architecture is optimized for
                    latency, accuracy, and technical depth.
                </p>
            </div>

            <div className="mt-24 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
                {[
                    { title: "Signal Analysis", desc: "Automated scoring based on source authority and technical novelty.", icon: "📡" },
                    { title: "AI Summaries", desc: "Structured, high-density summaries for rapid information ingestion.", icon: "📟" },
                    { title: "Real-time Feed", desc: "Zero-latency distribution as soon as an event is analyzed.", icon: "⚡" },
                    { title: "Dev-first API", desc: "Clean endpoints for custom integration into your internal tools.", icon: "🛠️" },
                    { title: "Auto-Scoring", desc: "Dynamic ranking that prioritizes impact over popularity.", icon: "📊" },
                    { title: "Trend Detection", desc: "Identify emerging patterns in the ecosystem before they go viral.", icon: "📈" },
                    { title: "Edge Processing", desc: "Distributed worker nodes for low-latency ingest and data processing.", icon: "☁️" },
                    { title: "Archive Depth", desc: "Searchable database of every major AI milestone and release.", icon: "🗄️" }
                ].map((feature, i) => (
                    <div key={i} className="flex flex-col text-left group">
                        <div className="mb-6 h-10 w-10 flex items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 text-xl transition-all group-hover:scale-110 group-hover:border-accent">
                            {feature.icon}
                        </div>
                        <h4 className="text-lg font-bold text-white tracking-tight">{feature.title}</h4>
                        <p className="mt-3 text-sm text-zinc-500 font-medium leading-relaxed">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
