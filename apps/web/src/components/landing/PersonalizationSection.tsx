"use client";

import React, { useState } from "react";

const TECHNOLOGIES = [
    "AI",
    "React",
    "Next.js",
    "Rust",
    "Web3",
    "TypeScript",
    "Node.js",
    "DevOps",
    "Cloud",
    "LLMs",
];

export default function PersonalizationSection() {
    const [selected, setSelected] = useState<string[]>(["AI", "React", "TypeScript"]);

    const toggleTech = (tech: string) => {
        setSelected((current) =>
            current.includes(tech)
                ? current.filter((item) => item !== tech)
                : [...current, tech]
        );
    };

    return (
        <section className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 md:px-8 py-20 sm:py-24 lg:py-32 border-t border-zinc-900/50">
            <div className="absolute inset-x-1/2 top-1/2 -z-10 h-64 w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/8 blur-3xl" />

            <div className="mx-auto max-w-5xl rounded-2xl border border-zinc-800 bg-zinc-950/50 px-8 py-16 text-center shadow-[0_0_40px_rgba(0,0,0,0.15)] backdrop-blur-sm md:px-12">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                    Personalization
                </div>

                <h2 className="mt-5 text-4xl font-bold tracking-tight text-white md:text-6xl">
                    Your signal, your stack
                </h2>

                <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-zinc-400 md:text-lg">
                    Follow only the technologies you care about — from AI and Web3 to React,
                    Rust, and beyond.
                </p>

                <div className="mt-12 flex flex-wrap justify-center gap-3">
                    {TECHNOLOGIES.map((tech) => {
                        const active = selected.includes(tech);

                        return (
                            <button
                                key={tech}
                                type="button"
                                onClick={() => toggleTech(tech)}
                                className={`rounded-full px-4 py-2 text-sm transition-all duration-200 ${
                                    active
                                        ? "scale-[1.02] border border-indigo-500 bg-indigo-500/10 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.25)]"
                                        : "border border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-600 hover:text-white"
                                }`}
                            >
                                {tech}
                            </button>
                        );
                    })}
                </div>

                <p className="mt-6 text-center text-sm text-zinc-500">
                    No noise from things you don’t care about.
                </p>
            </div>
        </section>
    );
}
