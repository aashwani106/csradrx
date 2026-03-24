import React from "react";
import Image from "next/image";

export default function Distribution() {
    return (
        <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-20 sm:py-24 lg:py-32 border-t border-zinc-900/50">
            <div className="flex flex-col md:flex-row gap-16 items-center">
                <div className="flex-1">
                    <h2 className="text-3xl font-bold text-white md:text-5xl tracking-tight">
                        Intelligence where <br />
                        <span className="text-zinc-500 font-medium">you already work.</span>
                    </h2>
                    <p className="mt-8 text-lg text-zinc-400">
                        CSRadrX integrates seamlessly into your existing stack, delivering
                        prioritized updates to the channels your team uses most.
                    </p>

                    <div className="mt-12 space-y-10">
                        {[
                            { name: "Discord", status: "Active", desc: "Real-time alerts and high-signal ranking in your community channels.", image: "/logo/discord2.png" },
                            { name: "Twitter / X", status: "Active", desc: "Automated high-quality summaries for the public dev ecosystem.", image: "https://cdn.simpleicons.org/x/ffffff" },
                            { name: "Slack", status: "Coming Soon", desc: "Production-ready enterprise integrations for engineering teams.", image: "/logo/slack3.png" },
                            { name: "Telegram", status: "Coming Soon", desc: "Fast channel delivery for high-priority updates and lightweight team broadcasts.", image: "https://cdn.simpleicons.org/telegram/ffffff" },
                            { name: "WhatsApp", status: "Coming Soon", desc: "Direct operational alerts for distributed teams and mobile-first workflows.", image: "https://cdn.simpleicons.org/whatsapp/ffffff" },
                            // { name: "More", status: "Planned", desc: "Additional outbound channels for teams that want intelligence inside every workflow.", image: "https://cdn.simpleicons.org/rss/ffffff" }
                        ].map((target) => (
                            <div key={target.name} className="flex gap-6 group">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 text-xl shadow-lg transition-all group-hover:scale-110 group-hover:border-accent group-hover:shadow-accent/5">
                                    <Image
                                        src={target.image}
                                        alt={target.name}
                                        width={24}
                                        height={24}
                                        className="h-6 w-6 object-contain"
                                        unoptimized={target.image.startsWith("https://")}
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h4 className="font-bold text-white tracking-tight">{target.name}</h4>
                                        <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${target.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-zinc-800 text-zinc-500'}`}>
                                            {target.status}
                                        </span>
                                    </div>
                                    <p className="mt-2 text-sm text-zinc-500 font-medium leading-relaxed">{target.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-1 relative">
                    <div className="absolute inset-0 bg-accent/5 blur-3xl rounded-full"></div>
                    <div className="relative rounded-2xl border border-zinc-800 bg-zinc-950/80 p-8 shadow-2xl backdrop-blur-xl">
                        <div className="flex items-center gap-2 mb-6 border-b border-zinc-900 pb-4">
                            <div className="h-3 w-3 rounded-full bg-red-500/20" />
                            <div className="h-3 w-3 rounded-full bg-yellow-500/20" />
                            <div className="h-3 w-3 rounded-full bg-green-500/20" />
                            <span className="ml-2 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Incoming Intelligence</span>
                        </div>

                        <div className="space-y-4">
                            <div className="rounded-lg border border-accent/20 bg-accent/5 p-4 animate-in fade-in slide-in-from-left-4 duration-700">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[10px] font-bold text-accent uppercase tracking-widest">OpenAI</span>
                                    <span className="text-[10px] text-zinc-600">2m ago</span>
                                </div>
                                <p className="text-xs text-white font-medium">o3-mini-reasoning just stabilized for production endpoints.</p>
                            </div>

                            <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 opacity-60">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">GitHub</span>
                                    <span className="text-[10px] text-zinc-600">14m ago</span>
                                </div>
                                <p className="text-xs text-zinc-300 font-medium">New breakout repository: agent-framework-x (2.4k stars)</p>
                            </div>

                            <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 opacity-30">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Hacker News</span>
                                    <span className="text-[10px] text-zinc-600">1h ago</span>
                                </div>
                                <p className="text-xs text-zinc-300 font-medium">Why we are moving back to bare metal.</p>
                            </div>

                            <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 opacity-30">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Vercel</span>
                                    <span className="text-[10px] text-zinc-600">18h ago</span>
                                </div>
                                <p className="text-xs text-zinc-300 font-medium">Global edge network optimizations reduce cold start and response times.</p>
                            </div>

                            <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 opacity-30">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Hacker News</span>
                                    <span className="text-[10px] text-zinc-600">1h ago</span>
                                </div>
                                <p className="text-xs text-zinc-300 font-medium">Developers increasingly adopting local LLMs for privacy and cost control.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
