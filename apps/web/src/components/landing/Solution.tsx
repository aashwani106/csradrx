import React from "react";
import Image from "next/image";

export default function Solution() {
    return (
        <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-20 sm:py-24 lg:py-32 overflow-hidden">
            <div className="flex flex-col items-center text-center">
                <div className="mb-4 inline-flex items-center rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent">
                    The Solution
                </div>
                <h2 className="max-w-5xl text-4xl font-bold tracking-tight text-white md:text-6xl">
                    {/* One System. <br /> */}
                    <span className="bg-gradient-to-r from-accent to-indigo-400 bg-clip-text text-transparent">
                        {/* Clean Signal. */}
                        Your Tech Intelligence Layer
                    </span>
                </h2>
                <p className="mt-8 max-w-2xl text-lg text-zinc-400">
                    CSRadrX doesn&apos;t just show you what&apos;s happening. It processes the chaos
                    of the tech ecosystem into a single, high-fidelity intelligence stream.
                </p>
            </div>
             
            {/* mt-24 grid gap-8 md:grid-cols-3 */}
            <div className="mt-24 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:gap-10">
                {[
                    {
                        title: "Smart Aggregation",
                        // desc: "Unified ingestion from 50+ authoritative sources across the AI and software engineering landscape.",
                        desc :"Continuously tracks signals from AI labs, GitHub, engineering blogs, and dev communities ; all in one stream.",
                        image: "/smartag.jpeg"
                    },
                    {
                        title: "LLM Analysis",
                        // desc: "Every event is summarized and analyzed for technical impact by our specialized AI worker nodes.",
                        desc :"Every update is analyzed for technical impact, not just summarized , so you understand what actually changed.",
                        image: "/llm-a.jpg"
                    },
                    {
                        title: "Dynamic Scoring",
                        desc: "Each signal is ranked based on relevance, freshness, and real-world importance , filtering out noise automatically.",
                        image: "/dynamic-scoring.jpg"
                    },
                    {
                        title: "Distribution",
                        desc: "Important signals are instantly pushed to Discord, Slack, and other channels — where your workflow already lives.",
                        image: "/d.jpg"
                    }
                ].map((feature, i) => (
                    <div
                        key={i}
                        className="group rounded-2xl border border-zinc-800 bg-zinc-950/40 p-10 transition-all hover:border-zinc-700 hover:bg-zinc-900/60"
                    >
                        <div className="mb-6 h-16 w-16 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 group-hover:scale-110 transition-transform">
                            <Image
                                src={feature.image}
                                alt={feature.title}
                                width={64}
                                height={64}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <h3 className="text-xl font-bold text-white tracking-tight">{feature.title}</h3>
                        <p className="mt-4 text-sm leading-relaxed text-zinc-500 font-medium">
                            {feature.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
