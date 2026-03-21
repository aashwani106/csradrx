"use client";

import { useState, useEffect, useCallback } from "react";
import EventCard from "./EventCard";
import { Event } from "@/types/event";
import { getDashboardEvents } from "@/lib/api";

export default function Feed({ initialEvents }: { initialEvents: Event[] }) {
    const [events, setEvents] = useState<Event[]>(initialEvents);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [newCount, setNewCount] = useState(0);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const trending = events.slice(0, 8);
    const feed = events.slice(8);

    useEffect(() => {
        if (!events.length) return;
        const interval = setInterval(async () => {
            try {
                const latest = await getDashboardEvents({ limit: 10 });
                const count = latest.filter(
                    (e) => !events.some((existing) => existing.id === e.id)
                ).length;
                if (count > 0) setNewCount(count);
            } catch { }
        }, 30000);
        return () => clearInterval(interval);
    }, [events]);

    const handleRefresh = async () => {
        try {
            const freshEvents = await getDashboardEvents({ limit: 40 });
            setEvents(freshEvents);
            setNewCount(0);
            setHasMore(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (error) {
            console.error(error);
        }
    };

    const loadMore = useCallback(async () => {
        if (loading || !hasMore || events.length === 0) return;
        setLoading(true);
        const cursor = events[events.length - 1].id;
        try {
            const moreEvents = await getDashboardEvents({ cursor, limit: 30 });
            if (moreEvents.length === 0) {
                setHasMore(false);
            } else {
                setEvents((prev) => {
                    const newEvents = moreEvents.filter(
                        (e) => !prev.some((p) => p.id === e.id)
                    );
                    return [...prev, ...newEvents];
                });
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, [loading, hasMore, events]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 800
            ) {
                loadMore();
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loadMore]);

    return (
        <>
            {/* New events indicator */}
            {newCount > 0 && (
                <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
                    <button
                        onClick={handleRefresh}
                        className="flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium backdrop-blur-xl transition-all duration-300 hover:scale-[1.02]"
                        style={{
                            background: "var(--accent-dim)",
                            color: "var(--accent-text)",
                            border: "1px solid rgba(99, 102, 241, 0.2)",
                            boxShadow: "0 8px 32px rgba(99, 102, 241, 0.15)",
                        }}
                    >
                        <span className="relative flex h-1.5 w-1.5">
                            <span
                                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                                style={{ background: "var(--accent)" }}
                            />
                            <span
                                className="relative inline-flex h-1.5 w-1.5 rounded-full"
                                style={{ background: "var(--accent)" }}
                            />
                        </span>
                        {newCount} new update{newCount > 1 ? "s" : ""}
                    </button>
                </div>
            )}

            {/* Header */}
            <header className="mb-10">
                <h1
                    className="text-[22px] font-semibold tracking-tight"
                    style={{ color: "var(--text-primary)" }}
                >
                    Dashboard
                </h1>
                <p
                    className="mt-1 text-[13px]"
                    style={{ color: "var(--text-tertiary)" }}
                >
                    Latest signals across AI, open-source, and developer tools
                </p>
            </header>

            {/* Trending */}
            <section className="mb-10">
                <h2
                    className="mb-4 text-[11px] font-semibold uppercase tracking-widest"
                    style={{ color: "var(--text-tertiary)" }}
                >
                    Trending
                </h2>
                <div className="grid gap-3 md:grid-cols-2">
                    {trending.map((event) => (
                        <EventCard
                            key={`trend-${event.id}`}
                            event={event}
                            onClick={() => setSelectedEvent(event)}
                        />
                    ))}
                </div>
            </section>

            {/* Separator */}
            <div
                className="mb-8"
                style={{
                    height: "1px",
                    background:
                        "linear-gradient(to right, transparent, var(--border), transparent)",
                }}
            />

            {/* Feed */}
            <section>
                <h2
                    className="mb-3 text-[11px] font-semibold uppercase tracking-widest"
                    style={{ color: "var(--text-tertiary)" }}
                >
                    Feed
                </h2>
                <div className="flex flex-col">
                    {feed.map((event) => (
                        <EventCard
                            key={`feed-${event.id}`}
                            event={event}
                            compact
                            onClick={() => setSelectedEvent(event)}
                        />
                    ))}

                    {loading && (
                        <div className="flex items-center justify-center py-8">
                            <div
                                className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"
                                style={{ borderColor: "var(--text-tertiary)", borderTopColor: "transparent" }}
                            />
                        </div>
                    )}

                    {!hasMore && feed.length > 0 && (
                        <div
                            className="py-8 text-center text-[12px]"
                            style={{ color: "var(--text-tertiary)" }}
                        >
                            You&apos;re all caught up
                        </div>
                    )}
                </div>
            </section>

            {/* Detail Modal */}
            {selectedEvent && (
                <div
                    className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto pt-[10vh] pb-10 px-4"
                    style={{ background: "rgba(0, 0, 0, 0.7)", backdropFilter: "blur(8px)" }}
                    onClick={() => setSelectedEvent(null)}
                >
                    <div
                        className="relative w-full max-w-xl rounded-xl p-6 md:p-8 animate-in"
                        style={{
                            background: "var(--surface-1)",
                            border: "1px solid var(--border)",
                            boxShadow: "0 24px 80px rgba(0, 0, 0, 0.5)",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close */}
                        <button
                            onClick={() => setSelectedEvent(null)}
                            className="absolute right-4 top-4 rounded-md p-1.5 transition-colors"
                            style={{ color: "var(--text-tertiary)" }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "var(--surface-3)";
                                e.currentTarget.style.color = "var(--text-primary)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "transparent";
                                e.currentTarget.style.color = "var(--text-tertiary)";
                            }}
                        >
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M1 1l12 12M13 1L1 13" />
                            </svg>
                        </button>

                        {/* Meta */}
                        <div className="flex items-center gap-2.5 mb-5">
                            <span
                                className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                                style={{
                                    color: "var(--accent-text)",
                                    background: "var(--accent-dim)",
                                }}
                            >
                                {selectedEvent.source}
                            </span>
                            <span
                                className="text-[12px]"
                                style={{ color: "var(--text-tertiary)" }}
                                suppressHydrationWarning
                            >
                                {new Date(selectedEvent.publishedAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </span>
                        </div>

                        {/* Title */}
                        <h2
                            className="text-[20px] font-semibold leading-snug tracking-tight mb-4"
                            style={{ color: "var(--text-primary)" }}
                        >
                            {selectedEvent.title}
                        </h2>

                        {/* Summary */}
                        <div
                            className="text-[14px] leading-[1.7] mb-5"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            {selectedEvent.summary || selectedEvent.title}
                        </div>

                        {/* Impact */}
                        {selectedEvent.impact && (
                            <div
                                className="rounded-lg p-4 mb-6"
                                style={{
                                    background: "var(--surface-2)",
                                    borderLeft: "2px solid var(--accent)",
                                }}
                            >
                                <div
                                    className="text-[10px] font-semibold uppercase tracking-widest mb-2"
                                    style={{ color: "var(--accent-text)" }}
                                >
                                    Impact
                                </div>
                                <p
                                    className="text-[13px] leading-relaxed"
                                    style={{ color: "var(--text-secondary)" }}
                                >
                                    {selectedEvent.impact}
                                </p>
                            </div>
                        )}

                        {/* CTA */}
                        <div
                            className="pt-4 flex justify-end"
                            style={{
                                borderTop: "1px solid var(--border)",
                            }}
                        >
                            <a
                                href={selectedEvent.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-medium transition-all duration-200"
                                style={{
                                    background: "var(--accent-dim)",
                                    color: "var(--accent-text)",
                                    border: "1px solid rgba(99, 102, 241, 0.2)",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "var(--accent)";
                                    e.currentTarget.style.color = "#ffffff";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "var(--accent-dim)";
                                    e.currentTarget.style.color = "var(--accent-text)";
                                }}
                            >
                                Read source
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M2 10L10 2M10 2H4M10 2v6" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
