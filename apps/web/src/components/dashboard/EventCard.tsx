import { Event } from "@/types/event";

export default function EventCard({
  event,
  compact = false,
}: {
  event: Event;
  compact?: boolean;
}) {
  return (
    <a
      href={event.url}
      target="_blank"
      rel="noreferrer"
      className={`block rounded-xl border border-zinc-800 transition hover:border-zinc-600 ${
        compact ? "p-3" : "p-4"
      }`}
    >
      <div className={`mb-2 text-zinc-400 ${compact ? "text-xs" : "text-sm"}`}>
        ⚡ {event.source.toUpperCase()} UPDATE
      </div>

      <div className={`mb-2 font-semibold ${compact ? "text-base" : "text-lg"}`}>
        {event.hook}
      </div>

      <div className={`mb-2 text-zinc-300 ${compact ? "text-sm" : ""}`}>
        {event.title}
      </div>

      <div className={`mb-3 text-zinc-400 ${compact ? "text-xs" : "text-sm"}`}>
        {event.impact}
      </div>

      <div className="text-xs text-zinc-500">
        {new Date(event.publishedAt).toLocaleString()}
      </div>
    </a>
  );
}
