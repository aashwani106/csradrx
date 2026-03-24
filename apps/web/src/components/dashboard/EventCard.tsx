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

type EventCardProps = {
  event: Event;
  onClick?: () => void;
  emphasized?: boolean;
};

export default function EventCard({
  event,
  onClick,
  emphasized = false,
}: EventCardProps) {
  const title = event.hook || event.title;
  const summary = event.hook && event.hook !== event.title ? event.title : event.impact;
  const score = Math.round(event.finalScore ?? 0);

  return (
    <button
      onClick={onClick}
      className={`w-full rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 text-left transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/60 md:p-6 ${
        emphasized ? "shadow-[0_0_0_1px_rgba(255,255,255,0.02)]" : ""
      }`}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-6">
        <div className="shrink-0 text-xs uppercase tracking-[0.18em] text-zinc-500 md:w-[88px]">
          <div className="font-semibold text-zinc-400">{event.source}</div>
          <div className="mt-1 text-[11px] tracking-[0.14em]" suppressHydrationWarning>
            {timeAgo(event.publishedAt)}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold leading-snug text-white">
            {title}
          </h3>

          {summary && (
            <p className="mt-1 text-sm leading-relaxed text-zinc-400">
              {summary}
            </p>
          )}
        </div>

        <div className="shrink-0 md:min-w-[92px] md:text-right">
          <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
            Signal Score
          </div>
          <div className="mt-1 text-xl font-semibold text-white">
            {score}
          </div>
        </div>
      </div>
    </button>
  );
}
