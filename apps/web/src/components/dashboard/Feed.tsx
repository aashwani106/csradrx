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

    const trending = events.slice(0, 10);
    const feed = events.slice(10);

    useEffect(() => {
        if (!events.length) return;
        const interval = setInterval(async () => {
            try {
                const latest = await getDashboardEvents({ limit: 10 });
                const newEventsCount = latest.filter((e) => !events.some((existing) => existing.id === e.id)).length;
                if (newEventsCount > 0) {
                    setNewCount(newEventsCount);
                }
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
                    const newEvents = moreEvents.filter((e) => !prev.some((p) => p.id === e.id));
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
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 800) {
                loadMore();
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loadMore]);

    return (
        <>
            {newCount > 0 && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
                    <button
                        onClick={handleRefresh}
                        className="flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/90 px-4 py-2 text-sm font-medium text-red-200 shadow-xl shadow-red-900/20 backdrop-blur-md transition hover:bg-red-900/80"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                        </span>
                        {newCount} new update{newCount > 1 ? "s" : ""}
                    </button>
                </div>
            )}

            <div className="mx-auto max-w-5xl relative">
                <h1 className="mb-6 text-2xl font-bold">🔥 Trending Now</h1>

                <div className="grid gap-4 md:grid-cols-2">
                    {trending.map((event) => (
                        <EventCard key={`trend-${event.id}`} event={event} onClick={() => setSelectedEvent(event)} />
                    ))}
                </div>

                <div className="my-10 border-t border-zinc-900" />

                <h2 className="mb-4 text-xl font-semibold">🌊 Live Feed</h2>

                <div className="grid gap-3 max-w-3xl">
                    {feed.map((event) => (
                        <EventCard key={`feed-${event.id}`} event={event} compact onClick={() => setSelectedEvent(event)} />
                    ))}
                    {loading && (
                        <div className="py-4 text-center text-sm text-zinc-500">
                            Loading more events...
                        </div>
                    )}
                </div>
            </div>

            {selectedEvent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm" onClick={() => setSelectedEvent(null)}>
                    <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl md:p-8" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setSelectedEvent(null)}
                            className="absolute right-4 top-4 rounded-full bg-zinc-900 p-2 text-zinc-400 hover:text-white"
                        >
                            ✕
                        </button>
                        <div className="mb-4 flex items-center gap-3">
                            <span className="rounded bg-zinc-800 px-3 py-1 text-xs font-bold uppercase tracking-wider text-zinc-300">
                                {selectedEvent.source}
                            </span>
                            <span className="text-sm text-zinc-500">{new Date(selectedEvent.publishedAt).toLocaleDateString()}</span>
                        </div>
                        <h2 className="mb-4 text-2xl font-bold leading-tight text-white md:text-3xl">
                            {selectedEvent.title}
                        </h2>
                        <div className="prose prose-invert mb-6 max-w-none text-zinc-300 text-[15px] leading-relaxed">
                            <p>{selectedEvent.summary || selectedEvent.title}</p>
                        </div>
                        {selectedEvent.impact && (
                            <div className="mb-8 rounded-lg border border-emerald-900/30 bg-emerald-950/20 p-4">
                                <h3 className="mb-2 text-xs font-semibold text-emerald-500 uppercase tracking-widest">Impact</h3>
                                <p className="text-zinc-200 text-sm">{selectedEvent.impact}</p>
                            </div>
                        )}
                        <div className="flex justify-end pt-2 border-t border-zinc-800/60">
                            <a
                                href={selectedEvent.url}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
                            >
                                Read Original Source →
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
