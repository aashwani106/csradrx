import React from "react";

// const MOCK_INSIGHTS = [
//     {
//         source: "OpenAI",
//         title: "o3-mini for reasoning",
//         summary: "New frontier model optimized for complex STEM reasoning and code generation with lower latency.",
//         impact: "Reduces inference cost by 40% for multi-step reasoning.",
//         score: 9.8,
//         type: "release",
//         time: "2h ago"
//     },
//     {
//         source: "DeepSeek",
//         title: "DeepSeek-V3 Open Model",
//         summary: "671B parameter Mixture-of-Experts model rivaling top-tier proprietary models in coding/math.",
//         impact: "Democratizes state-of-the-art weights for enterprise scaling.",
//         score: 9.6,
//         type: "repo",
//         time: "4h ago"
//     },
//     {
//         source: "Hacker News",
//         title: "The case for local LLMs",
//         summary: "Deep-dive into run-times, memory constraints, and privacy benefits of self-hosted inference.",
//         impact: "Reflects a growing developer shift toward local-first AI development.",
//         score: 8.5,
//         type: "article",
//         time: "8h ago"
//     }
// ];
const MOCK_INSIGHTS = [
    {
      source: "OpenAI",
      title: "GPT-5.4 mini & nano released",
      summary:
        "New lightweight models optimized for fast inference and lower cost across production workloads.",
      impact:
        "Makes high-quality AI accessible for real-time apps and edge use-cases.",
      score: 9.7,
      type: "release",
      time: "1h ago",
    },
 
    {
      source: "GitHub",
      title: "AI-native code search trending",
      summary:
        "New open-source tools integrating semantic search directly into developer workflows.",
      impact:
        "Shifts how developers navigate and understand large codebases.",
      score: 9.1,
      type: "repo",
      time: "2h ago",
    },
  
    {
      source: "Vercel",
      title: "Edge compute latency improvements",
      summary:
        "Global edge network optimizations reduce cold start and response times.",
      impact:
        "Enables faster AI-powered frontend and real-time apps.",
      score: 8.9,
      type: "infra",
      time: "6h ago",
    },
    {
      source: "Hacker News",
      title: "Rise of local-first AI workflows",
      summary:
        "Developers increasingly adopting local LLMs for privacy and cost control.",
      impact:
        "Signals shift toward decentralized AI development patterns.",
      score: 8.6,
      type: "article",
      time: "7h ago",
    },
  ];
export default function Showcase() {
    return (
        <section id="showcase" className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-20 sm:py-24 lg:py-32 border-t border-zinc-900/50 overflow-x-hidden">
            <div className="flex flex-col items-center text-center">
                <div className="mb-4 inline-flex items-center rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Our Dashboard 
                </div>
                <h2 className="text-3xl font-bold text-white md:text-5xl tracking-tight">Intelligence at scale.</h2>
                <p className="mt-8 text-lg text-zinc-400 max-w-2xl font-medium">
                    Our dashboard surfaces the signal from the noise, providing
                    structured context for every major tech milestone.
                </p>
            </div>

            <div className="mt-16 relative max-w-5xl mx-auto">
                {/* Decorative elements */}
                <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-indigo-500/20 to-accent/20 rounded-3xl blur-2xl opacity-20 -z-10" />

                <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-4 md:p-8 shadow-2xl relative overflow-hidden">
                    {/* Mock Dashboard Header */}
                    <div className="flex items-center justify-between mb-10 pb-6 border-b border-zinc-900">
                        <div className="flex items-center gap-6">
                            <div className="text-sm font-bold text-white tracking-tight">Intelligence Feed</div>
                            <div className="hidden sm:flex gap-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                                <span className="text-zinc-300">Trending</span>
                                <span>Recent</span>
                                <span>Analyzed</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Live Updates</span>
                        </div>
                    </div>

                    {/* Mock Insight Cards */}
                    <div className="grid gap-6">
                        {MOCK_INSIGHTS.map((insight, i) => (
                            <div
                                key={i}
                                className="group relative flex flex-col md:flex-row items-start md:items-center gap-6 rounded-2xl border border-zinc-900 bg-zinc-900/40 p-6 transition-all hover:border-zinc-800 hover:bg-zinc-900/80"
                            >
                                <div className="flex flex-col gap-2 w-24 shrink-0">
                                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{insight.source}</span>
                                    <span className="text-[9px] font-bold text-zinc-700 uppercase">{insight.time}</span>
                                </div>

                                <div className="flex-1">
                                    <h4 className="text-base font-bold text-white tracking-tight mb-2 group-hover:text-accent font-sans">{insight.title}</h4>
                                    <p className="text-sm text-zinc-500 leading-relaxed max-w-xl">{insight.summary}</p>
                                </div>

                                <div className="hidden lg:flex flex-col items-end gap-2 shrink-0 border-l border-zinc-900 pl-8">
                                    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Signal Score</span>
                                    <div className="text-xl font-bold text-white tracking-tighter">{insight.score}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center text-[10px] font-bold text-zinc-700 uppercase tracking-[0.2em]">
                        + 14 more high-signal updates analyzed today
                    </div>
                </div>
            </div>
        </section>
    );
}
