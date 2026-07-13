import fs from "node:fs";
import path from "node:path";
import { z } from "zod";

/**
 * Zod schemas for generated content files. The Gemini generation script
 * (scripts/generate-content.ts) writes JSON validated against these shapes;
 * pages read them at build time. A file that fails to parse fails the build
 * (prebuild runs scripts/validate-content.ts).
 */

export const faqSchema = z.object({
  q: z.string().min(10),
  a: z.string().min(40),
});

export const metaSchema = z.object({
  title: z.string().min(20).max(60),
  description: z.string().min(70).max(155),
});

/** Service × city spoke page (e.g. spring repair in Naperville) */
export const spokeContentSchema = z.object({
  service: z.string(),
  city: z.string(),
  generatedAt: z.string(),
  model: z.string(),
  meta: metaSchema,
  hero: z.object({
    headline: z.string().min(20),
    subheadline: z.string().min(40),
  }),
  intro: z.string().min(400), // ~120–180 words
  localContext: z.string().min(350), // ~100–160 words
  problemSigns: z.array(z.object({ sign: z.string(), detail: z.string() })).min(4).max(6),
  process: z.array(z.object({ step: z.string(), description: z.string() })).length(4),
  whyUs: z.array(z.string()).min(4).max(5),
  neighborhoodsServed: z.array(z.string()).min(3),
  faqs: z.array(faqSchema).min(4).max(5),
  ctaLine: z.string().min(20),
});

/** Service hub page (e.g. spring repair across Chicagoland) */
export const serviceHubContentSchema = z.object({
  service: z.string(),
  generatedAt: z.string(),
  model: z.string(),
  meta: metaSchema,
  hero: z.object({
    headline: z.string().min(20),
    subheadline: z.string().min(40),
  }),
  intro: z.string().min(500),
  whatWeDo: z.string().min(400),
  problemSigns: z.array(z.object({ sign: z.string(), detail: z.string() })).min(4).max(6),
  process: z.array(z.object({ step: z.string(), description: z.string() })).length(4),
  whyUs: z.array(z.string()).min(4).max(5),
  faqs: z.array(faqSchema).min(4).max(6),
  ctaLine: z.string().min(20),
});

/** City hub page (garage door repair in {city}) */
export const cityHubContentSchema = z.object({
  city: z.string(),
  generatedAt: z.string(),
  model: z.string(),
  meta: metaSchema,
  hero: z.object({
    headline: z.string().min(20),
    subheadline: z.string().min(40),
  }),
  intro: z.string().min(500),
  localContext: z.string().min(400),
  neighborhoodsServed: z.array(z.string()).min(3),
  faqs: z.array(faqSchema).min(4).max(6),
  ctaLine: z.string().min(20),
});

export type SpokeContent = z.infer<typeof spokeContentSchema>;
export type ServiceHubContent = z.infer<typeof serviceHubContentSchema>;
export type CityHubContent = z.infer<typeof cityHubContentSchema>;

const CONTENT_DIR = path.join(process.cwd(), "src", "content");

function readJson(relPath: string): unknown | null {
  const file = path.join(CONTENT_DIR, relPath);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

export function spokeContentPath(service: string, city: string): string {
  return path.join("service-city", `${service}--${city}.json`);
}

export function loadSpokeContent(service: string, city: string): SpokeContent | null {
  const raw = readJson(spokeContentPath(service, city));
  return raw ? spokeContentSchema.parse(raw) : null;
}

export function loadServiceHubContent(service: string): ServiceHubContent | null {
  const raw = readJson(path.join("service-hub", `${service}.json`));
  return raw ? serviceHubContentSchema.parse(raw) : null;
}

export function loadCityHubContent(city: string): CityHubContent | null {
  const raw = readJson(path.join("city-hub", `${city}.json`));
  return raw ? cityHubContentSchema.parse(raw) : null;
}

/** Slugs that have generated spoke content on disk (drives generateStaticParams) */
export function existingSpokes(): { service: string; city: string }[] {
  const dir = path.join(CONTENT_DIR, "service-city");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const [service, city] = f.replace(/\.json$/, "").split("--");
      return { service, city };
    });
}
