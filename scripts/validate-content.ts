/**
 * Standalone content validator — runs as `prebuild`, so a bad content file
 * (hand-edited or badly generated) fails the build instead of shipping.
 *
 * Existing files must: parse against their zod schema, respect meta length
 * limits (enforced by schema), contain no banned phrases, meet word-count
 * minimums, and not be near-duplicates of another page.
 * Missing files are reported as a summary (pages fall back to template copy)
 * but do not fail the build.
 */
import fs from "node:fs";
import path from "node:path";
import { services } from "../src/data/services";
import { cities } from "../src/data/cities";
import {
  spokeContentSchema,
  serviceHubContentSchema,
  cityHubContentSchema,
} from "../src/lib/content";
import {
  trigramSimilarity,
  findBannedPhrases,
  wordCount,
  flattenText,
  SIMILARITY_THRESHOLD,
  MIN_SPOKE_WORDS,
  MIN_SERVICE_HUB_WORDS,
  MIN_CITY_HUB_WORDS,
} from "./lib/quality";
import type { ZodType } from "zod";

const CONTENT_DIR = path.join(process.cwd(), "src", "content");

interface Target {
  id: string;
  file: string;
  schema: ZodType;
  minWords: number;
  uniquenessKey: (parsed: Record<string, unknown>) => string;
}

const targets: Target[] = [
  ...services.flatMap((s) =>
    cities.map((c) => ({
      id: `${s.slug}:${c.slug}`,
      file: path.join(CONTENT_DIR, "service-city", `${s.slug}--${c.slug}.json`),
      schema: spokeContentSchema as ZodType,
      minWords: MIN_SPOKE_WORDS,
      uniquenessKey: (p: Record<string, unknown>) => `${p.intro} ${p.localContext}`,
    })),
  ),
  ...services.map((s) => ({
    id: `hub:${s.slug}`,
    file: path.join(CONTENT_DIR, "service-hub", `${s.slug}.json`),
    schema: serviceHubContentSchema as ZodType,
    minWords: MIN_SERVICE_HUB_WORDS,
    uniquenessKey: (p: Record<string, unknown>) => `${p.intro} ${p.whatWeDo}`,
  })),
  ...cities.map((c) => ({
    id: `city:${c.slug}`,
    file: path.join(CONTENT_DIR, "city-hub", `${c.slug}.json`),
    schema: cityHubContentSchema as ZodType,
    minWords: MIN_CITY_HUB_WORDS,
    uniquenessKey: (p: Record<string, unknown>) => `${p.intro} ${p.localContext}`,
  })),
];

let missing = 0;
const errors: string[] = [];
const accepted: { id: string; key: string }[] = [];

for (const t of targets) {
  if (!fs.existsSync(t.file)) {
    missing++;
    continue;
  }
  try {
    const parsed = t.schema.parse(JSON.parse(fs.readFileSync(t.file, "utf-8"))) as Record<string, unknown>;

    const words = wordCount(flattenText(parsed));
    if (words < t.minWords) {
      errors.push(`${t.id}: ${words} words < minimum ${t.minWords}`);
    }
    const banned = findBannedPhrases(flattenText(parsed));
    if (banned.length) {
      errors.push(`${t.id}: banned phrases: ${banned.join(", ")}`);
    }
    accepted.push({ id: t.id, key: t.uniquenessKey(parsed) });
  } catch (err) {
    errors.push(`${t.id}: ${err instanceof Error ? err.message.split("\n")[0] : String(err)}`);
  }
}

// Pairwise near-duplicate check across accepted files
for (let i = 0; i < accepted.length; i++) {
  for (let j = i + 1; j < accepted.length; j++) {
    const sim = trigramSimilarity(accepted[i].key, accepted[j].key);
    if (sim > SIMILARITY_THRESHOLD) {
      errors.push(
        `near-duplicate content: ${accepted[i].id} vs ${accepted[j].id} (similarity ${sim.toFixed(2)})`,
      );
    }
  }
}

console.log(
  `Content: ${accepted.length} valid, ${missing} missing (will use fallback copy), ${errors.length} errors.`,
);
if (missing > 0 && accepted.length < targets.length) {
  console.log(
    `→ Run \`GEMINI_API_KEY=... npm run generate:content\` to generate the ${missing} missing page(s) before launch.`,
  );
}
if (errors.length) {
  console.error("\nContent validation FAILED:");
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}
