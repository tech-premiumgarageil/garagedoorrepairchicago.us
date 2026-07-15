/**
 * Gemini content generation for all programmatic pages.
 *
 *   GEMINI_API_KEY=... npm run generate:content            # all missing files
 *   ... -- --force                                         # regenerate everything
 *   ... -- --only=garage-door-spring-repair:naperville     # one spoke
 *   ... -- --only=hub:garage-door-spring-repair            # one service hub
 *   ... -- --only=city:naperville                          # one city hub
 *   ... -- --limit=5                                       # first N jobs (prompt tuning)
 *   ... -- --model=gemini-2.5-pro                          # switch model
 *
 * Files that exist and validate are skipped, so rerunning resumes after any
 * interruption. Output is committed to git — the site builds without the API.
 */
import fs from "node:fs";
import path from "node:path";
import { GoogleGenAI } from "@google/genai";
import { services, type Service } from "../src/data/services";
import { cities, type City } from "../src/data/cities";
import {
  spokeContentSchema,
  serviceHubContentSchema,
  cityHubContentSchema,
} from "../src/lib/content";
import { SYSTEM_PROMPT, spokePrompt, serviceHubPrompt, cityHubPrompt } from "./lib/prompt";
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

const CONTENT_DIR = path.join(process.cwd(), "src", "content");
const DELAY_MS = 1500;
const MAX_ATTEMPTS = 3;

const args = process.argv.slice(2);
const flag = (name: string): string | undefined =>
  args.find((a) => a.startsWith(`--${name}=`))?.split("=").slice(1).join("=");
const FORCE = args.includes("--force");
const ONLY = flag("only");
const LIMIT = flag("limit") ? Number(flag("limit")) : Infinity;
const MODEL = flag("model") ?? "gemini-2.5-flash";

interface Job {
  id: string;
  file: string;
  prompt: string;
  minWords: number;
  /** Text used for cross-page uniqueness checks (intro + localContext) */
  uniquenessKey: (parsed: Record<string, unknown>) => string;
  validate: (raw: unknown) => Record<string, unknown>;
  /** Extra fields merged into the model output before writing */
  identity: Record<string, string>;
}

function buildJobs(): Job[] {
  const jobs: Job[] = [];
  for (const s of services) {
    for (const c of cities) {
      jobs.push(spokeJob(s, c));
    }
  }
  for (const s of services) jobs.push(hubJob(s));
  for (const c of cities) jobs.push(cityJob(c));
  return jobs;
}

const spokeJob = (s: Service, c: City): Job => ({
  id: `${s.slug}:${c.slug}`,
  file: path.join(CONTENT_DIR, "service-city", `${s.slug}--${c.slug}.json`),
  prompt: spokePrompt(s, c),
  minWords: MIN_SPOKE_WORDS,
  uniquenessKey: (p) => `${p.intro} ${p.localContext}`,
  validate: (raw) => spokeContentSchema.parse(raw) as unknown as Record<string, unknown>,
  identity: { service: s.slug, city: c.slug },
});

const hubJob = (s: Service): Job => ({
  id: `hub:${s.slug}`,
  file: path.join(CONTENT_DIR, "service-hub", `${s.slug}.json`),
  prompt: serviceHubPrompt(s),
  minWords: MIN_SERVICE_HUB_WORDS,
  uniquenessKey: (p) => `${p.intro} ${p.whatWeDo}`,
  validate: (raw) => serviceHubContentSchema.parse(raw) as unknown as Record<string, unknown>,
  identity: { service: s.slug },
});

const cityJob = (c: City): Job => ({
  id: `city:${c.slug}`,
  file: path.join(CONTENT_DIR, "city-hub", `${c.slug}.json`),
  prompt: cityHubPrompt(c),
  minWords: MIN_CITY_HUB_WORDS,
  uniquenessKey: (p) => `${p.intro} ${p.localContext}`,
  validate: (raw) => cityHubContentSchema.parse(raw) as unknown as Record<string, unknown>,
  identity: { city: c.slug },
});

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Guarantee SEO-correct meta lengths without failing a page over a few
 * stray characters. Titles: keep as-is if ≤60; otherwise drop trailing
 * "| tagline" segments, then word-boundary truncate. Descriptions: keep
 * if ≤155; otherwise word-boundary truncate.
 */
function clampTitle(title: string): string {
  let t = title.trim();
  while (t.length > 60 && t.includes("|")) {
    t = t.slice(0, t.lastIndexOf("|")).trim();
  }
  return t.length <= 60 ? t : t.slice(0, 60).replace(/\s+\S*$/, "").trim();
}

function clampDescription(desc: string): string {
  const d = desc.trim();
  return d.length <= 155 ? d : d.slice(0, 155).replace(/\s+\S*$/, "").trim();
}

function fileIsValid(job: Job): boolean {
  if (!fs.existsSync(job.file)) return false;
  try {
    job.validate(JSON.parse(fs.readFileSync(job.file, "utf-8")));
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set. Aborting.");
    process.exit(1);
  }
  const ai = new GoogleGenAI({ apiKey });

  let jobs = buildJobs();
  if (ONLY) {
    jobs = jobs.filter((j) => j.id === ONLY);
    if (jobs.length === 0) {
      console.error(`--only=${ONLY} matched no job. Examples: garage-door-spring-repair:naperville, hub:garage-door-tune-up, city:berwyn`);
      process.exit(1);
    }
  }

  const pending = jobs.filter((j) => FORCE || !fileIsValid(j)).slice(0, LIMIT);
  console.log(`Model ${MODEL} — ${pending.length} of ${jobs.length} pages to generate.`);

  // Uniqueness corpus: keys of all already-accepted files
  const corpus: string[] = [];
  for (const j of jobs) {
    if (!pending.includes(j) && fileIsValid(j)) {
      const parsed = JSON.parse(fs.readFileSync(j.file, "utf-8"));
      corpus.push(j.uniquenessKey(parsed));
    }
  }

  let done = 0;
  let failed = 0;

  for (const job of pending) {
    let lastError = "";
    let success = false;

    for (let attempt = 1; attempt <= MAX_ATTEMPTS && !success; attempt++) {
      try {
        const nudge = lastError
          ? `\n\nYour previous attempt was rejected: ${lastError}. Fix exactly that and return the full JSON again.`
          : "";
        const res = await ai.models.generateContent({
          model: MODEL,
          contents: job.prompt + nudge,
          config: {
            systemInstruction: SYSTEM_PROMPT,
            responseMimeType: "application/json",
            temperature: 0.9,
          },
        });
        const text = res.text ?? "";
        const raw = JSON.parse(text);
        const merged = {
          ...raw,
          ...job.identity,
          generatedAt: new Date().toISOString(),
          model: MODEL,
        };
        if (merged.meta && typeof merged.meta === "object") {
          merged.meta.title = clampTitle(String(merged.meta.title ?? ""));
          merged.meta.description = clampDescription(String(merged.meta.description ?? ""));
        }
        const parsed = job.validate(merged);

        const words = wordCount(flattenText(parsed));
        if (words < job.minWords) {
          throw new Error(`only ${words} words rendered; minimum is ${job.minWords} — expand intro, localContext/whatWeDo, and FAQ answers`);
        }
        const banned = findBannedPhrases(flattenText(parsed));
        if (banned.length) {
          throw new Error(`contains banned phrases: ${banned.join(", ")}`);
        }
        const key = job.uniquenessKey(parsed);
        const worst = Math.max(0, ...corpus.map((c) => trigramSimilarity(key, c)));
        if (worst > SIMILARITY_THRESHOLD) {
          throw new Error(`too similar to an existing page (similarity ${worst.toFixed(2)} > ${SIMILARITY_THRESHOLD}) — be far more specific to this exact city and service`);
        }

        fs.mkdirSync(path.dirname(job.file), { recursive: true });
        fs.writeFileSync(job.file, JSON.stringify(parsed, null, 2) + "\n");
        corpus.push(key);
        done++;
        console.log(`✓ [${done}/${pending.length}] ${job.id} (${words} words)`);
        success = true;
      } catch (err) {
        lastError = err instanceof Error ? err.message : String(err);
        const isRate = /429|500|503|rate|overloaded/i.test(lastError);
        console.warn(`  ↻ ${job.id} attempt ${attempt}/${MAX_ATTEMPTS}: ${lastError.slice(0, 140)}`);
        if (isRate) await sleep(DELAY_MS * 2 ** attempt * 2);
      }
    }

    if (!success) {
      failed++;
      console.error(`✗ ${job.id} failed after ${MAX_ATTEMPTS} attempts`);
    }
    await sleep(DELAY_MS);
  }

  console.log(`\nDone: ${done} generated, ${failed} failed, ${jobs.length - pending.length} already valid.`);
  if (failed > 0) process.exit(1);
}

main();
