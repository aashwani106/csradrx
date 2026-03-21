import { Event } from "@/types/event";

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
}

export default function EventCard({
  event,
  compact = false,
  onClick,
}: {
  event: Event;
  compact?: boolean;
  onClick?: () => void;
}) {
  const tags = Array.from(new Set([event.source, event.category, event.type])).filter(Boolean);

  if (compact) {
    return (
      <button
        onClick={onClick}
        className="block text-left w-full rounded-lg border border-zinc-800/80 bg-zinc-900/30 p-3 transition hover:border-zinc-700 hover:bg-zinc-800/50"
      >
        <div className="mb-1.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium tracking-wide text-emerald-400">
              ⚡ {event.source}
            </span>
            <span className="text-xs text-zinc-500" suppressHydrationWarning>{timeAgo(event.publishedAt)}</span>
          </div>
        </div>

        <div className="mb-1 text-[15px] font-medium leading-snug text-zinc-100">
          {event.title}
        </div>

        {event.impact && (
          <div className="mb-2 text-[13px] text-zinc-400">
            <span className="mr-1 text-zinc-500">→</span>
            {event.impact}
          </div>
        )}

        <div className="mt-2 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span key={tag} className="rounded-md bg-zinc-800/60 px-2 py-0.5 text-[11px] font-medium capitalize text-zinc-400">
              {tag}
            </span>
          ))}
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="flex w-full text-left flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-900/20 p-5 transition hover:border-zinc-600 hover:bg-zinc-800/40"
    >
      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded bg-zinc-200 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-zinc-900">
            🔥 {event.source}
          </span>
          <span className="text-sm font-medium text-zinc-500" suppressHydrationWarning>{timeAgo(event.publishedAt)}</span>
        </div>
        <div className="mb-2 text-xl font-semibold leading-snug text-white">
          {event.hook || event.title}
        </div>
        {event.title !== event.hook && (
          <div className="mb-4 text-sm text-zinc-400">
            {event.title}
          </div>
        )}
        {event.impact && (
          <div className="text-sm text-zinc-300">
            <span className="mr-2 border-l-2 border-zinc-600 pl-3 italic text-zinc-400">
              {event.impact}
            </span>
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="rounded-full border border-zinc-700 bg-zinc-800/50 px-3 py-1 text-xs font-medium capitalize text-zinc-300">
            #{tag}
          </span>
        ))}
      </div>
    </button>
  );
}
