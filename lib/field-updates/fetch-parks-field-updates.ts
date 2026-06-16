import {
  FIELD_UPDATES_FETCH_TIMEOUT_MS,
  FIELD_UPDATES_MAX_ITEMS,
  FIELD_UPDATES_REVALIDATE_SECONDS,
  FIELD_UPDATES_USER_AGENT,
  PARKS_NEWSFLASH_FEED_URL,
} from "@/lib/field-updates/constants";
import { parseParksNewsflashRss } from "@/lib/field-updates/parse-rss";
import type { FieldUpdatesData } from "@/lib/field-updates/types";

export async function fetchParksFieldUpdates(): Promise<FieldUpdatesData> {
  const fetchedAt = new Date().toISOString();

  try {
    const response = await fetch(PARKS_NEWSFLASH_FEED_URL, {
      headers: {
        Accept: "application/rss+xml, application/xml, text/xml, */*",
        "Accept-Language": "he-IL,he;q=0.9",
        "User-Agent": FIELD_UPDATES_USER_AGENT,
      },
      next: { revalidate: FIELD_UPDATES_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(FIELD_UPDATES_FETCH_TIMEOUT_MS),
    });

    if (!response.ok) {
      return { status: "unavailable", fetchedAt };
    }

    const xml = await response.text();
    const items = parseParksNewsflashRss(xml, FIELD_UPDATES_MAX_ITEMS);

    if (items.length === 0) {
      return { status: "unavailable", fetchedAt };
    }

    return {
      status: "ok",
      items,
      fetchedAt,
    };
  } catch {
    return { status: "unavailable", fetchedAt };
  }
}
