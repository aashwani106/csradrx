"use client";

import React, { useState, useMemo } from "react";

const CATEGORIES = ["All", "AI", "Frontend", "Backend", "Infra", "Language", "Web3"];

const CATEGORY_STYLES: Record<string, { dot: string; bg: string; text: string }> = {
    AI: { dot: "#10a37f", bg: "rgba(16, 163, 127, 0.1)", text: "#10a37f" },
    FRONTEND: { dot: "#2196f3", bg: "rgba(33, 150, 243, 0.1)", text: "#2196f3" },
    BACKEND: { dot: "#9c27b0", bg: "rgba(156, 39, 176, 0.1)", text: "#9c27b0" },
    INFRA: { dot: "#ff9800", bg: "rgba(255, 152, 0, 0.1)", text: "#ff9800" },
    LANGUAGE: { dot: "#673ab7", bg: "rgba(103, 58, 183, 0.1)", text: "#673ab7" },
    WEB3: { dot: "#00bcd4", bg: "rgba(0, 188, 212, 0.1)", text: "#00bcd4" },
    DEVTOOLS: { dot: "#607d8b", bg: "rgba(96, 125, 139, 0.1)", text: "#607d8b" }
};

const LIVE_EVENTS = [
    {
        source: "OpenAI",
        time: "2m ago",
        title: "o3-mini stabilizing",
        insight: "→ Improves stability for production AI agents",
        score: "9.8 Signal",
        category: "AI"
    },
    {
        source: "GitHub",
        time: "12m ago",
        title: "React 20 Partial Hydration",
        insight: "→ Faster page loads and better SSR performance",
        score: "9.2 Signal",
        category: "FRONTEND"
    },
    {
        source: "AWS",
        time: "1h ago",
        title: "Serverless GPU Support",
        insight: "→ Enables scalable AI workloads without infra overhead",
        score: "9.5 Signal",
        category: "INFRA"
    },
    {
        source: "Anthropic",
        time: "14m ago",
        title: "Claude 3.7 Reasoning",
        insight: "→ Better reasoning performance in real-world tasks",
        score: "9.4 Signal",
        category: "AI"
    },
    {
        source: "Ethereum",
        time: "2h ago",
        title: "EIP Transaction Efficiency",
        insight: "→ Lower fees and faster L2 confirmations",
        score: "8.7 Signal",
        category: "WEB3"
    },
    {
        source: "Vercel",
        time: "45m ago",
        title: "Edge Functions Latency Update",
        insight: "→ Faster response times for global apps",
        score: "9.0 Signal",
        category: "INFRA"
    },
    {
        source: "Next.js",
        time: "1h ago",
        title: "Dynamic IO optimizations",
        insight: "→ Reduced TTFB for data-heavy routes",
        score: "9.1 Signal",
        category: "FRONTEND"
    },
    {
        source: "Bun",
        time: "3h ago",
        title: "Bun 1.2 Shell API",
        insight: "→ Streamlined devops scripting in JavaScript",
        score: "8.5 Signal",
        category: "BACKEND"
    },
    {
        source: "Node.js",
        time: "25m ago",
        title: "Node 22 Performance Boost",
        insight: "→ Faster startup time and improved V8 memory handling",
        score: "9.1 Signal",
        category: "BACKEND"
    },
    {
        source: "PostgreSQL",
        time: "50m ago",
        title: "Async IO Improvements",
        insight: "→ Better throughput for high-concurrency workloads",
        score: "8.8 Signal",
        category: "BACKEND"
    },
    {
        source: "Prisma",
        time: "1h ago",
        title: "Edge Client Stable",
        insight: "→ Enables DB queries directly from edge runtimes",
        score: "9.3 Signal",
        category: "DEVTOOLS"
    },
    {
        source: "Docker",
        time: "2h ago",
        title: "Slim Container Layers",
        insight: "→ Reduces image size and speeds up deployments",
        score: "8.9 Signal",
        category: "INFRA"
    },
    {
        source: "Kubernetes",
        time: "3h ago",
        title: "Auto-scaling v2 Enhancements",
        insight: "→ Smarter scaling based on real-time workload signals",
        score: "9.2 Signal",
        category: "INFRA"
    },
    {
        source: "Cloudflare",
        time: "35m ago",
        title: "Workers AI Expansion",
        insight: "→ Run AI models directly at the edge with lower latency",
        score: "9.4 Signal",
        category: "INFRA"
    },
    {
        source: "Solana",
        time: "1h ago",
        title: "Validator Performance Upgrade",
        insight: "→ Improves network throughput and reduces latency",
        score: "8.7 Signal",
        category: "WEB3"
    },
    {
        source: "Polygon",
        time: "2h ago",
        title: "zkEVM Scaling Update",
        insight: "→ Faster finality and cheaper transactions",
        score: "8.9 Signal",
        category: "WEB3"
    },
    {
        source: "TypeScript",
        time: "40m ago",
        title: "Type Narrowing Improvements",
        insight: "→ More accurate type inference in complex codebases",
        score: "9.0 Signal",
        category: "LANGUAGE"
    },
    {
        source: "Go",
        time: "2h ago",
        title: "Scheduler Optimization",
        insight: "→ Better performance for concurrent services",
        score: "8.8 Signal",
        category: "LANGUAGE"
    },
    {
        source: "Rust",
        time: "3h ago",
        title: "Async Trait Stabilization",
        insight: "→ Cleaner async patterns for production systems",
        score: "9.1 Signal",
        category: "LANGUAGE"
    },
    {
        source: "Turborepo",
        time: "20m ago",
        title: "Remote Cache v2",
        insight: "→ Faster CI/CD pipelines with smarter caching",
        score: "9.2 Signal",
        category: "DEVTOOLS"
    },
    {
        source: "Vite",
        time: "55m ago",
        title: "Build Pipeline Rewrite",
        insight: "→ Faster builds and improved plugin ecosystem",
        score: "9.0 Signal",
        category: "DEVTOOLS"
    },
    {
        source: "GitHub",
        time: "1h ago",
        title: "Actions GPU Runners",
        insight: "→ Run ML workloads directly in CI pipelines",
        score: "9.5 Signal",
        category: "DEVTOOLS"
    },
    {
        source: "Supabase",
        time: "1h ago",
        title: "Realtime v3",
        insight: "→ More scalable pub/sub for live applications",
        score: "8.9 Signal",
        category: "BACKEND"
    },
    {
        source: "Node.js",
        time: "22m ago",
        title: "Node runtime performance trending upward",
        insight: "→ Faster execution in real-world backend workloads",
        score: "9.1 Signal",
        category: "BACKEND"
    },
    {
        source: "PostgreSQL",
        time: "48m ago",
        title: "High-concurrency query optimization discussion",
        insight: "→ Better scaling under heavy production load",
        score: "8.8 Signal",
        category: "BACKEND"
    },
    {
        source: "Cloudflare",
        time: "35m ago",
        title: "Edge AI workloads gaining adoption",
        insight: "→ Running inference closer to users reduces latency",
        score: "9.4 Signal",
        category: "INFRA"
    },
    {
        source: "Kubernetes",
        time: "1h ago",
        title: "Autoscaling improvements gaining traction",
        insight: "→ More efficient resource usage in dynamic workloads",
        score: "9.2 Signal",
        category: "INFRA"
    },
    {
        source: "TypeScript",
        time: "40m ago",
        title: "Type system improvements discussed",
        insight: "→ Better developer experience in large codebases",
        score: "9.0 Signal",
        category: "LANGUAGE"
    },
    {
        source: "Rust",
        time: "1h ago",
        title: "Memory safety patterns evolving in ecosystem",
        insight: "→ Safer systems programming with modern abstractions",
        score: "9.1 Signal",
        category: "LANGUAGE"
    },
    {
        source: "Solana",
        time: "1h ago",
        title: "Network throughput improvements observed",
        insight: "→ Faster transaction processing across the network",
        score: "8.7 Signal",
        category: "WEB3"
    },
    {
        source: "Ethereum",
        time: "2h ago",
        title: "Layer 2 adoption accelerating",
        insight: "→ Lower fees and improved scalability for dApps",
        score: "8.9 Signal",
        category: "WEB3"
    },
    {
        source: "GitHub",
        time: "50m ago",
        title: "AI-assisted development workflows increasing",
        insight: "→ Developers shipping faster with AI tooling",
        score: "9.3 Signal",
        category: "DEVTOOLS"
    },
    {
        source: "Vite",
        time: "30m ago",
        title: "Build performance optimizations trending",
        insight: "→ Faster dev cycles and improved DX",
        score: "9.0 Signal",
        category: "DEVTOOLS"
    }
];

export default function LiveFeed() {
    const [activeFilter, setActiveFilter] = useState("All");

    const filteredEvents = useMemo(() => {
        if (activeFilter === "All") return LIVE_EVENTS;
        return LIVE_EVENTS.filter(e => e.category.toLowerCase() === activeFilter.toLowerCase());
    }, [activeFilter]);

    const marqueeItems = useMemo(() => {
        if (filteredEvents.length === 0) return [];
        let items = [...filteredEvents];

        while (items.length < 8) {
            items = [...items, ...filteredEvents];
        }
        return [...items, ...items];
    }, [filteredEvents]);

    return (
        <section id="feed" className="relative overflow-hidden border-y border-white/5 bg-black/20 py-20 sm:py-24 backdrop-blur-3xl">
            <div className="container mx-auto mb-10 px-4 text-center sm:mb-12 sm:px-6 md:px-8">
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">
                    Live Intelligence Feed
                </h3>
                <p className="text-zinc-400 text-sm font-medium max-w-2xl mx-auto">
                    CSRadrX tracks everything happening across the tech ecosystem

                    {/* not just AI — and surfaces what matters. */}
                </p>

                {/* Filter Bar */}
                <div className="mt-10 flex flex-wrap items-center justify-center gap-2 ">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={`px-5 py-2 rounded-full text-xs font-bold cursor-pointer transition-all border ${activeFilter === cat
                                ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                : "bg-white/5 text-zinc-500 border-white/5 hover:bg-white/10 hover:border-white/10"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="relative flex overflow-hidden group min-h-[220px]">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-40 z-20 bg-gradient-to-r from-background to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-40 z-20 bg-gradient-to-l from-background to-transparent pointer-events-none" />

                {filteredEvents.length > 0 ? (
                    <div
                        key={activeFilter} // Reset animation on filter change for immediate feedback
                        className="flex animate-marquee whitespace-nowrap py-4 px-4 hover:[animation-play-state:paused]"
                        style={{ animationDuration: activeFilter === "All" ? "80s" : "40s" }}
                    >
                        {marqueeItems.map((event, i) => {
                            const style = CATEGORY_STYLES[event.category] || CATEGORY_STYLES.AI;
                            return (
                                <div
                                    key={`${activeFilter}-${i}`}
                                    className="inline-block w-[320px] mx-4 rounded-2xl border border-white/5 bg-white/[0.02] p-6 shadow-2xl backdrop-blur-xl transition-all hover:scale-[1.02] hover:border-white/10 hover:bg-white/[0.04] group/card"
                                >
                                    <div className="mb-4 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="h-2 w-2 rounded-full"
                                                style={{ backgroundColor: style.dot, boxShadow: `0 0 8px ${style.dot}` }}
                                            />
                                            <span className="text-[11px] font-bold text-zinc-300">
                                                {event.source}
                                            </span>
                                            <span className="text-[11px] text-zinc-600">•</span>
                                            <span className="text-[11px] font-medium text-zinc-500">
                                                {event.time}
                                            </span>
                                        </div>
                                        <span
                                            className="text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded"
                                            style={{ backgroundColor: style.bg, color: style.text }}
                                        >
                                            {event.category}
                                        </span>
                                    </div>

                                    <h4 className="text-base font-bold text-white mb-2 leading-tight">
                                        {event.title}
                                    </h4>

                                    <p className="text-[13px] font-medium text-zinc-400 mb-6 whitespace-normal leading-relaxed">
                                        {event.insight}
                                    </p>

                                    <div className="flex items-center justify-between border-t border-white/5 pt-4">
                                        <div className="flex gap-1">
                                            {[1, 2, 3].map(j => (
                                                <div key={j} className="h-1.5 w-1.5 rounded-full bg-zinc-800" />
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-[11px] font-black text-white px-2 py-0.5 rounded bg-white/5 border border-white/10">
                                                {event.score}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="w-full flex items-center justify-center text-zinc-600 text-sm font-medium italic">
                        Checking for new {activeFilter} updates...
                    </div>
                )}
            </div>
        </section>
    );
}
