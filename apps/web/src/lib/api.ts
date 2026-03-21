import { Event } from "@/types/event";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getDashboardEvents({ cursor, limit }: { cursor?: string; limit?: number } = {}): Promise<Event[]> {
  if (!BASE_URL) {
    throw new Error("Missing NEXT_PUBLIC_API_URL");
  }

  const params = new URLSearchParams();
  if (cursor) params.append("cursor", cursor);
  if (limit) params.append("limit", limit.toString());

  const res = await fetch(`${BASE_URL}/dashboard/events?${params.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard events");
  }

  return res.json();
}
