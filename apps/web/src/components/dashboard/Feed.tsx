"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import EventCard from "./EventCard";
import { Event } from "@/types/event";
import { getDashboardEvents } from "@/lib/api";

const TABS = ["TRENDING", "RECENT", "ANALYZED"] as const;
type FeedTab = (typeof TABS)[number];

export default function Feed({ initialEvents }: { initialEvents: Event[] }) {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [newCount, setNewCount] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [activeTab, setActiveTab] = useState<FeedTab>("TRENDING");

  const trending = useMemo(() => events.slice(0, 10), [events]);
  const analyzed = useMemo(
    () => events.filter((event) => Boolean(event.impact)).slice(0, 24),
    [events]
  );
  const recent = useMemo(() => events, [events]);

  const visibleItems = useMemo(() => {
    if (activeTab === "RECENT") return recent;
    if (activeTab === "ANALYZED") return analyzed;
    return trending;
  }, [activeTab, analyzed, recent, trending]);

  const footerCount = Math.max(events.length - visibleItems.length, 0);

  useEffect(() => {
    if (!events.length) return;
    const interval = setInterval(async () => {
      try {
        const latest = await getDashboardEvents({ limit: 10 });
        const count = latest.filter(
          (event) => !events.some((existing) => existing.id === event.id)
        ).length;

        if (count > 0) setNewCount(count);
      } catch {
        // Keep polling silent; UI already handles unavailable states upstream.
      }
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
            (event) => !prev.some((existing) => existing.id === event.id)
          );

          return [...prev, ...newEvents];
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [events, hasMore, loading]);

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
      {newCount > 0 && (
        <div className="fixed left-1/2 top-5 z-50 -translate-x-1/2">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-zinc-950/90 px-4 py-2 text-[13px] font-medium text-zinc-200 shadow-[0_12px_30px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-300 hover:scale-[1.02]"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            {newCount} new update{newCount > 1 ? "s" : ""}
          </button>
        </div>
      )}

      <section className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
            <h1 className="text-xl font-semibold tracking-tight text-white">
              Intelligence Feed
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`transition-colors ${
                    activeTab === tab ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-400 md:justify-end">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.35)]" />
            Live Updates
          </div>
        </div>

        <div className="mt-6 border-t border-zinc-800/60" />

        <div className="mt-6 space-y-4">
          {visibleItems.map((event, index) => (
            <EventCard
              key={`${activeTab.toLowerCase()}-${event.id}`}
              event={event}
              emphasized={activeTab === "TRENDING" && index < 3}
              onClick={() => setSelectedEvent(event)}
            />
          ))}

          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-600 border-t-transparent" />
            </div>
          )}

          {!hasMore && activeTab === "RECENT" && recent.length > 0 && (
            <div className="py-4 text-center text-xs text-zinc-500">
              You&apos;re all caught up
            </div>
          )}
        </div>

        <div className="mt-6 border-t border-zinc-800/50 pt-6 text-center text-xs text-zinc-500">
          + {footerCount} more high-signal updates analyzed today
        </div>
      </section>

      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 px-4 pb-10 pt-[10vh] backdrop-blur-md"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-950/95 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.5)] md:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute right-4 top-4 rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-zinc-900 hover:text-zinc-200"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 1l12 12M13 1L1 13" />
              </svg>
            </button>

            <div className="mb-5 flex items-center gap-2.5">
              <span className="rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-300">
                {selectedEvent.source}
              </span>
              <span
                className="text-[12px] text-zinc-500"
                suppressHydrationWarning
              >
                {new Date(selectedEvent.publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <h2 className="mb-4 text-[20px] font-semibold leading-snug tracking-tight text-white">
              {selectedEvent.title}
            </h2>

            {selectedEvent.hook && selectedEvent.hook !== selectedEvent.title && (
              <p className="mb-3 text-sm leading-relaxed text-zinc-300">
                {selectedEvent.hook}
              </p>
            )}

            {selectedEvent.impact && (
              <p className="text-sm leading-relaxed text-zinc-400">
                {selectedEvent.impact}
              </p>
            )}

            <div className="mt-6 flex items-center justify-between border-t border-zinc-800 pt-5">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                  Signal Score
                </div>
                <div className="mt-1 text-lg font-semibold text-white">
                  {Math.round(selectedEvent.finalScore ?? 0)}
                </div>
              </div>

              <a
                href={selectedEvent.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/70 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-zinc-700 hover:bg-zinc-900"
              >
                Open source
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
