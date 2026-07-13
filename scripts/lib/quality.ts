import { BANNED_PHRASES } from "./prompt";

/** Character-trigram Jaccard similarity — cheap near-duplicate detector. */
export function trigramSimilarity(a: string, b: string): number {
  const grams = (s: string): Set<string> => {
    const clean = s.toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ");
    const set = new Set<string>();
    for (let i = 0; i < clean.length - 2; i++) set.add(clean.slice(i, i + 3));
    return set;
  };
  const ga = grams(a);
  const gb = grams(b);
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

export const SIMILARITY_THRESHOLD = 0.4;
export const MIN_SPOKE_WORDS = 650;
export const MIN_HUB_WORDS = 700;
