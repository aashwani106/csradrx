import { Event } from "@/types/event";

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}s`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d`;
}

const SOURCE_COLORS: Record<string, string> = {
  openai: "#10b981",
  github: "#8b5cf6",
  anthropic: "#f59e0b",
  deepmind: "#3b82f6",
  google: "#3b82f6",
  microsoft: "#06b6d4",
  huggingface: "#eab308",
  meta: "#6366f1",
  default: "#6366f1",
};

function getSourceColor(source: string): string {
  return SOURCE_COLORS[source.toLowerCase()] ?? SOURCE_COLORS.default;
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
  const color = getSourceColor(event.source);

  if (compact) {
    return (
      <button
        onClick={onClick}
        className="group block w-full text-left rounded-lg px-3 py-3 -mx-3 transition-all duration-200"
        style={{
          background: "transparent",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "var(--surface-2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
        }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span
            className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
            style={{
              color: color,
              background: `${color}15`,
            }}
          >
            {event.source}
          </span>
          <span
            className="text-[11px] font-medium"
            style={{ color: "var(--text-tertiary)" }}
            suppressHydrationWarning
          >
            {timeAgo(event.publishedAt)}
          </span>
        </div>

        <div
          className="text-[14px] font-medium leading-snug mb-0.5"
          style={{ color: "var(--text-primary)" }}
        >
          {event.title}
        </div>

        {event.impact && (
          <div
            className="text-[12.5px] leading-relaxed mt-1"
            style={{ color: "var(--text-secondary)" }}
          >
            {event.impact}
          </div>
        )}
      </button>
    );
  }

  // Trending card
  return (
    <button
      onClick={onClick}
      className="group block w-full text-left rounded-xl px-5 py-5 transition-all duration-200 border"
      style={{
        background: "var(--surface-1)",
        borderColor: "var(--border)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--surface-2)";
        e.currentTarget.style.borderColor = "var(--border-hover)";
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "var(--surface-1)";
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div className="flex items-center gap-2.5 mb-3">
        <span
          className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
          style={{
            color: color,
            background: `${color}15`,
          }}
        >
          {event.source}
        </span>
        <span
          className="text-[11px] font-medium"
          style={{ color: "var(--text-tertiary)" }}
          suppressHydrationWarning
        >
          {timeAgo(event.publishedAt)}
        </span>
      </div>

      <div
        className="text-[17px] font-semibold leading-snug tracking-tight mb-1.5"
        style={{ color: "var(--text-primary)" }}
      >
        {event.hook || event.title}
      </div>

      {event.title !== event.hook && (
        <div
          className="text-[13px] leading-relaxed mb-2"
          style={{ color: "var(--text-secondary)" }}
        >
          {event.title}
        </div>
      )}

      {event.impact && (
        <div
          className="text-[12.5px] leading-relaxed mt-2"
          style={{ color: "var(--text-tertiary)" }}
        >
          {event.impact}
        </div>
      )}
    </button>
  );
}
