"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed left-0 right-0 top-0 z-50 px-4 transition-all duration-300 sm:px-6 md:px-8 ${scrolled ? "pt-4" : "pt-5"
                }`}
        >
            <div className={`mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full border px-4 sm:px-6 transition-all duration-300 ${scrolled ? "border-white/8 bg-black/55 shadow-[0_12px_50px_rgba(0,0,0,0.22)] backdrop-blur-2xl" : "border-white/6 bg-black/30 backdrop-blur-xl"
                }`}>
            <div className="flex items-center gap-2.5">
                <Link href="/" className="flex items-center">
                    <Image
                        src="/FinalLogo.png"
                        alt="CSRadrX"
                        width={108}
                        height={48}
                        className="h-11 w-auto transition-opacity hover:opacity-80"
                    />
                </Link>
            </div>

            <div className="hidden items-center gap-8 lg:flex">
                <a href="#features" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 transition-colors hover:text-zinc-100">Problem</a>
                <a href="#pipeline" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 transition-colors hover:text-zinc-100">Pipeline</a>
                <a href="#showcase" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 transition-colors hover:text-zinc-100">Showcase</a>
                <a href="#sources" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 transition-colors hover:text-zinc-100">Ecosystem</a>
            </div>

            <div className="flex items-center gap-4">
                <Link
                    href="/dashboard"
                    className="group inline-flex h-11 items-center justify-center rounded-full border border-[color:var(--accent)]/25 bg-[color:var(--accent)]/10 px-6 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--accent-text)] transition-all hover:border-[color:var(--accent)]/40 hover:bg-[color:var(--accent)]/14"
                >
                    View Feed
                </Link>
            </div>
            </div>
        </nav>
    );
}
