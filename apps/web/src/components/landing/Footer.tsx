import React from "react";

export default function Footer() {
    return (
        <footer className="relative z-10 mx-auto max-w-7xl px-6 py-24 pb-12 border-t border-zinc-900">
            <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
                <div className="flex flex-col items-center md:items-start gap-6">
                    <div className="flex items-center gap-3">
                        <img
                            src="/FinalLogo.png"
                            alt="CSRadrX"
                            className="h-16 w-auto"
                        />
                    </div>
                    <p className="max-w-xs text-sm text-zinc-600 font-medium leading-relaxed text-center md:text-left">
                        The intelligent layer for the modern tech ecosystem.
                        Automated analysis, high-signal scoring.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-16 sm:grid-cols-3">
                    <div className="flex flex-col gap-4">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Platform</h4>
                        <nav className="flex flex-col gap-3 text-sm font-bold text-zinc-600">
                            <a href="#features" className="hover:text-white transition-colors">Problem</a>
                            <a href="#pipeline" className="hover:text-white transition-colors">Pipeline</a>
                            <a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a>
                        </nav>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Community</h4>
                        <nav className="flex flex-col gap-3 text-sm font-bold text-zinc-600">
                            <a href="https://discord.gg" target="_blank" className="hover:text-white transition-colors">Discord</a>
                            <a href="https://github.com" target="_blank" className="hover:text-white transition-colors">GitHub</a>
                            <a href="https://x.com/csradrx" className="hover:text-white transition-colors">Twitter / X</a>
                        </nav>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Legal</h4>
                        <nav className="flex flex-col gap-3 text-sm font-bold text-zinc-600">
                            <a href="#" className="hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms</a>
                        </nav>
                    </div>
                </div>
            </div>

            <div className="mt-24 pt-12 border-t border-zinc-900/50 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest">
                    © {new Date().getFullYear()} CSRadrX. Built for the future of tech.
                </div>
                <div className="flex gap-8">
                    <div className="text-[10px] font-bold text-zinc-800 uppercase tracking-widest">System Status: Optimal</div>
                </div>
            </div>
        </footer>
    );
}
