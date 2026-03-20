import { Event } from "@/types/event";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getTrendingEvents(): Promise<Event[]> {
  if (!BASE_URL) {
    throw new Error("Missing NEXT_PUBLIC_API_URL");
  }

  const res = await fetch(`${BASE_URL}/dashboard/trending`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch trending events");
  }

  return res.json();
}

export async function getFeedEvents(): Promise<Event[]> {
  if (!BASE_URL) {
    throw new Error("Missing NEXT_PUBLIC_API_URL");
  }

  const res = await fetch(`${BASE_URL}/dashboard/feed`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch live feed events");
  }

  return res.json();
}
