import type { FieldUpdateItem } from "@/lib/field-updates/types";

function decodeBasicHtmlEntities(text: string): string {
  return text
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#8211;/g, "–")
    .replace(/&#8217;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function extractTagContent(block: string, tag: string): string {
  const cdataMatch = block.match(
    new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`, "i"),
  );
  if (cdataMatch?.[1]) {
    return cdataMatch[1].trim();
  }

  const plainMatch = block.match(
    new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"),
  );
  return plainMatch?.[1]?.trim() ?? "";
}

function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanExcerpt(rawDescription: string): string | undefined {
  let text = stripHtml(rawDescription);
  text = text.replace(/The post .+ appeared first on .+$/i, "").trim();
  text = decodeBasicHtmlEntities(text);

  if (!text || text.length < 12) {
    return undefined;
  }

  if (text.length > 160) {
    return `${text.slice(0, 157).trim()}…`;
  }

  return text;
}

function formatHebrewDate(pubDate: string): { dateLabel: string; dateIso: string } {
  const parsed = new Date(pubDate);
  if (Number.isNaN(parsed.getTime())) {
    return { dateLabel: pubDate, dateIso: pubDate };
  }

  return {
    dateLabel: new Intl.DateTimeFormat("he-IL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(parsed),
    dateIso: parsed.toISOString(),
  };
}

export function parseParksNewsflashRss(
  xml: string,
  maxItems: number,
): FieldUpdateItem[] {
  const itemBlocks = xml.split(/<item[\s>]/i).slice(1);
  const items: FieldUpdateItem[] = [];

  for (const rawBlock of itemBlocks) {
    if (items.length >= maxItems) {
      break;
    }

    const block = `<item ${rawBlock}`;
    const title = decodeBasicHtmlEntities(stripHtml(extractTagContent(block, "title")));
    const url = extractTagContent(block, "link");
    const pubDate = extractTagContent(block, "pubDate");
    const description = extractTagContent(block, "description");

    if (!title || !url) {
      continue;
    }

    const { dateLabel, dateIso } = formatHebrewDate(pubDate);
    const excerpt = cleanExcerpt(description);

    items.push({
      title,
      url,
      dateLabel,
      dateIso,
      excerpt,
    });
  }

  return items;
}
