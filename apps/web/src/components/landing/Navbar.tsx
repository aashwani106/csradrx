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
            className={`fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between px-4 transition-all duration-300 sm:px-6 md:px-12 ${scrolled ? "bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-900" : "bg-transparent"
                }`}
        >
            <div className="flex items-center gap-2.5">
                <Link href="/" className="flex items-center">
                    <Image
                        src="/FinalLogo.png"
                        alt="CSRadrX"
                        width={108}
                        height={48}
                        className="h-12 w-auto hover:opacity-80 transition-opacity"
                    />
                </Link>
            </div>

            <div className="hidden lg:flex items-center gap-10">
                <a href="#features" className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors">Problem</a>
                <a href="#pipeline" className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors">Pipeline</a>
                <a href="#showcase" className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors">Showcase</a>
                <a href="#sources" className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors">Ecosystem</a>
                {/* <a href="/dashboard" className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent hover:text-accent/80 transition-colors">Dashboard</a> */}
            </div>

            <div className="flex items-center gap-4">
                <Link
                    href="/dashboard"
                    className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full bg-white px-6 text-xs font-bold text-black transition-all hover:bg-zinc-200"
                >
                    View Feed
                </Link>
            </div>
        </nav>
    );
}