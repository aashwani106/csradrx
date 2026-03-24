"use client";

import React from "react";
import Image from "next/image";

// const LOGOS = [
//     // AI Labs
//     { name: "OpenAI", icon: "⚡" },
//     { name: "Google AI", icon: "G" },
//     { name: "DeepMind", icon: "D" },
//     { name: "Anthropic", icon: "A" },
//     { name: "Meta AI", icon: "M" },

//     // Dev / Open Source
//     { name: "GitHub", icon: "H" },
//     { name: "GitLab", icon: "GL" },
//     { name: "Stack Overflow", icon: "S" },

//     // Tech News / Communities
//     { name: "Hacker News", icon: "Y" },
//     { name: "Product Hunt", icon: "P" },
//     { name: "Reddit Dev", icon: "R" },

//     // Infra / Cloud
//     { name: "AWS", icon: "☁️" },
//     { name: "Cloudflare", icon: "CF" },
//     { name: "Vercel", icon: "V" },

//     // Frameworks / Ecosystem
//     { name: "React", icon: "⚛️" },
//     { name: "Next.js", icon: "N" },
//     { name: "Angular", icon: "NG" },

//     // Languages
//     { name: "Rust", icon: "🦀" },
//     { name: "TypeScript", icon: "TS" },
//     { name: "Go", icon: "Go" },

//     // Web3
//     { name: "Ethereum", icon: "Ξ" },
//     { name: "Solana", icon: "S◎" },

//     // YC / Startups / Signals (important add)
//     { name: "Y Combinator", icon: "YC" }
// ];


const LOGOS = [
    // AI Labs
    { name: "OpenAI", icon: "https://cdn.simpleicons.org/openai" },
    { name: "Google AI", icon: "https://cdn.simpleicons.org/google" },
    { name: "DeepMind", icon: "https://cdn.simpleicons.org/googledeepmind" },
    { name: "Anthropic", icon: "https://cdn.simpleicons.org/anthropic" },
    { name: "Meta AI", icon: "https://cdn.simpleicons.org/meta" },

    // Dev / Open Source
    { name: "GitHub", icon: "https://cdn.simpleicons.org/github" },
    { name: "GitLab", icon: "https://cdn.simpleicons.org/gitlab" },
    { name: "Stack Overflow", icon: "https://cdn.simpleicons.org/stackoverflow" },

    // Tech News / Communities
    { name: "Hacker News", icon: "https://cdn.simpleicons.org/ycombinator" },
    { name: "Product Hunt", icon: "https://cdn.simpleicons.org/producthunt" },
    { name: "Reddit", icon: "https://cdn.simpleicons.org/reddit" },

    // Infra / Cloud
    { name: "AWS", icon: "https://cdn.simpleicons.org/amazonaws" },
    { name: "Cloudflare", icon: "https://cdn.simpleicons.org/cloudflare" },
    { name: "Vercel", icon: "https://cdn.simpleicons.org/vercel" },

    // Frameworks
    { name: "React", icon: "https://cdn.simpleicons.org/react" },
    { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs" },
    { name: "Angular", icon: "https://cdn.simpleicons.org/angular" },

    // Languages
    { name: "Rust", icon: "https://cdn.simpleicons.org/rust" },
    { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript" },
    { name: "Go", icon: "https://cdn.simpleicons.org/go" },

    // Web3
    { name: "Ethereum", icon: "https://cdn.simpleicons.org/ethereum" },
    { name: "Solana", icon: "https://cdn.simpleicons.org/solana" },

    // YC
    { name: "Y Combinator", icon: "https://cdn.simpleicons.org/ycombinator" }
];
export default function SocialProof() {
    // Duplicate for seamless scroll
    const marqueeLogos = [...LOGOS, ...LOGOS, ...LOGOS];

    return (
        <section className="relative z-10 border-y border-white/5 bg-black/20 py-8 overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
                    {/* Static Label */}
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 whitespace-nowrap">
                        Intelligence sourced from
                    </span>

                    {/* Marquee Content */}
                    <div className="relative flex flex-1 overflow-hidden group">
                        {/* Side Gradients for fading edges */}
                        <div className="absolute left-0 top-0 bottom-0 w-16 z-20 bg-gradient-to-r from-[#030303] to-transparent pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-16 z-20 bg-gradient-to-l from-[#030303] to-transparent pointer-events-none" />

                        <div className="flex animate-marquee whitespace-nowrap py-2 hover:[animation-play-state:paused]">
                            {marqueeLogos.map((logo, i) => (
                                <div
                                    key={`${logo.name}-${i}`}
                                    className="flex items-center gap-3 px-6 md:px-8 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default group"
                                >
                                    {/* <span className="text-lg font-bold text-zinc-300 group-hover:text-white transition-colors">
                                        {logo.icon}
                                    </span> */}
                                    <Image
                                        src={logo.icon}
                                        alt={logo.name}
                                        width={24}
                                        height={24}
                                        className="h-6 w-6 opacity-60 hover:opacity-100 transition"
                                        unoptimized
                                    />
                                    <span className="text-[10px] font-semibold text-zinc-500 group-hover:text-zinc-200 transition-colors uppercase tracking-widest leading-none">
                                        {logo.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
