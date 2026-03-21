"use client";

import { useEffect, useRef } from "react";

export default function Atmosphere() {
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const glow = glowRef.current;
        if (!glow) return;

        let animFrame: number;
        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;

        const handleMove = (e: MouseEvent) => {
            targetX = e.clientX;
            targetY = e.clientY;
        };

        const animate = () => {
            currentX += (targetX - currentX) * 0.06;
            currentY += (targetY - currentY) * 0.06;
            glow.style.transform = `translate(${currentX - 200}px, ${currentY - 200}px)`;
            animFrame = requestAnimationFrame(animate);
        };

        window.addEventListener("mousemove", handleMove);
        animFrame = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", handleMove);
            cancelAnimationFrame(animFrame);
        };
    }, []);

    return (
        <>
            {/* Cursor-following glow */}
            <div
                ref={glowRef}
                className="fixed pointer-events-none z-0"
                style={{
                    width: "400px",
                    height: "400px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(99, 102, 241, 0.04) 0%, transparent 70%)",
                    filter: "blur(40px)",
                    willChange: "transform",
                }}
            />

            {/* Vertical guide lines */}
            <div className="fixed inset-0 pointer-events-none z-0 flex justify-center">
                <div
                    className="h-full"
                    style={{
                        width: "720px",
                        borderLeft: "1px solid rgba(255, 255, 255, 0.02)",
                        borderRight: "1px solid rgba(255, 255, 255, 0.02)",
                    }}
                />
            </div>
        </>
    );
}
