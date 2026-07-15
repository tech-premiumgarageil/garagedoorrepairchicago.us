import { BANNED_PHRASES } from "./prompt";

/**
 * Word-trigram (3-word shingle) Jaccard similarity — the standard near-
 * duplicate detector. This measures shared *phrasing*, not shared vocabulary:
 * two genuinely distinct pages on the same topic (e.g. spring repair in
 * different cities) share technical words but almost no 3-word sequences, so
 * they score near 0. Templated/boilerplate copy reuses phrase sequences and
 * scores high. (Character trigrams were rejected here: they conflate shared
 * domain vocabulary with duplication — two distinct pages scored ~0.37.)
 */
export function trigramSimilarity(a: string, b: string): number {
  const shingles = (s: string): Set<string> => {
    const words = s.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(Boolean);
    const set = new Set<string>();
    for (let i = 0; i < words.length - 2; i++) set.add(words.slice(i, i + 3).join(" "));
    return set;
  };
  const ga = shingles(a);
  const gb = shingles(b);
  if (ga.size === 0 || gb.size === 0) return 0;
  let inter = 0;
  for (const g of ga) if (gb.has(g)) inter++;
  return inter / (ga.size + gb.size - inter);
}

export function findBannedPhrases(text: string): string[] {
  const lower = text.toLowerCase();
  return BANNED_PHRASES.filter((p) => lower.includes(p));
}

export function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/** All human-visible text of a content object, for word counts / uniqueness. */
export function flattenText(obj: unknown): string {
  if (typeof obj === "string") return obj;
  if (Array.isArray(obj)) return obj.map(flattenText).join(" ");
  if (obj && typeof obj === "object") {
    return Object.entries(obj)
      .filter(([k]) => !["generatedAt", "model", "service", "city"].includes(k))
      .map(([, v]) => flattenText(v))
      .join(" ");
  }
  return "";
}

// Word-trigram scale: genuinely distinct pages score < 0.01; this catches
// real templating (heavy shared phrasing) while never flagging legitimate
// same-topic pages.
export const SIMILARITY_THRESHOLD = 0.2;
export const MIN_SPOKE_WORDS = 650;
export const MIN_SERVICE_HUB_WORDS = 700;
// City hubs have fewer content sections than spokes/service hubs (no
// problem-signs/process/why-us), so a realistic substantial bar is lower.
export const MIN_CITY_HUB_WORDS = 600;
