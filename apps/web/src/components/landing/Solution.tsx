import React from "react";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";

export default function Solution() {
    return (
        <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-20 sm:py-24 lg:py-32 overflow-hidden">
            <Reveal className="flex flex-col items-center text-center" distance={18}>
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
            </Reveal>
             
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
                    <Reveal
                        key={i}
                        delay={i * 0.06}
                        distance={24}
                        className="group relative overflow-hidden rounded-[26px] border border-zinc-800/90 bg-zinc-950/55 p-8 shadow-[0_18px_50px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900/65 sm:p-10"
                    >
                        <div className="pointer-events-none absolute inset-0 rounded-[26px] border border-white/[0.035]" />
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/[0.045] to-transparent" />
                        <div className="pointer-events-none absolute -right-8 top-10 h-24 w-24 rounded-full bg-indigo-500/8 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

                        <div className="relative mb-7 h-20 overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <Image
                                src={feature.image}
                                alt={feature.title}
                                fill
                                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                            />
                        </div>

                        <div className="relative">
                            {/* <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-600">
                                Core Capability
                            </div> */}
                            <h3 className="text-xl font-bold tracking-tight text-white">{feature.title}</h3>
                        </div>

                        <p className="relative mt-4 text-sm font-medium leading-relaxed text-zinc-400">
                            {feature.desc}
                        </p>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
