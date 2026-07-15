import type { City } from "../../src/data/cities";
import type { Service } from "../../src/data/services";

/**
 * Prompt templates for content generation. The doorway-page defense lives
 * here: every prompt injects real, structured local facts and hard rules
 * that force a unique answer per page.
 */

export const BANNED_PHRASES = [
  "look no further",
  "we've got you covered",
  "we have got you covered",
  "top-notch",
  "nestled in",
  "hassle-free",
  "state-of-the-art",
  "unparalleled",
  "one-stop shop",
  "look-no-further",
  "in the heart of",
  "vibrant community",
  "peace of mind knowing",
  "your trusted partner",
  "we pride ourselves",
];

export const SYSTEM_PROMPT = `You are the copywriter for a premium, family-owned garage door repair company in Chicagoland. Voice: plain, confident, specific American English. Short sentences. Concrete facts over adjectives. Never use hype phrases — these are BANNED: ${BANNED_PHRASES.join(
  "; ",
)}. Write like a sharp local tradesperson who respects the reader's time, not like an ad. Company facts you may use: family-owned; open 24 hours Monday–Saturday; upfront flat-rate quotes before work starts; 10% discount for online booking; trucks stocked with common parts; balance and safety-reverse test after every job. Output strictly valid JSON matching the requested shape — no markdown, no commentary.`;

const jsonShape = (fields: string) => `Return ONLY a JSON object with exactly these fields:\n${fields}`;

export function spokePrompt(service: Service, city: City): string {
  return `Write the content for a landing page: "${service.name} in ${city.name}, IL".

SERVICE FACTS (use them):
- Common symptoms: ${service.symptoms.join("; ")}
- Parts we install: ${service.parts.join("; ")}
- Typical price: ${service.priceRange}
- Emergency-eligible: ${service.isEmergency ? "yes (24h Mon–Sat dispatch)" : "no"}

CITY FACTS (these make the page unique — use them concretely):
- City: ${city.name}, ${city.county} County, IL (population ~${city.population.toLocaleString()})
- Real neighborhoods: ${city.neighborhoods.join(", ")}
- Housing/garage stock: ${city.housingNotes}
- Local angle: ${city.localAngle}

HARD RULES:
1. Mention at least 3 of the named neighborhoods naturally in the copy.
2. Tie this specific service's failure modes to this city's housing stock and Chicago-area weather. Do not write copy that could be pasted onto another city's page.
3. The FAQs must only make sense for ${service.shortName} in ${city.name} — city-specific pricing context, response-time, housing-stock questions. Never generic.
4. meta.title: HARD LIMIT 60 characters including spaces — count them. Must contain "${service.shortName}" and "${city.name}". Keyword first, no business name, keep any "| tagline" suffix to one or two short words. Example shape: "${service.shortName} in ${city.name}, IL | Same-Day". meta.description: max 155 characters, benefit-led.
5. intro: 120–180 words. localContext: 100–160 words explaining why ${city.name} garages fail this way.
6. No banned phrases. No exclamation marks except at most one.

${jsonShape(`{
  "meta": { "title": string, "description": string },
  "hero": { "headline": string, "subheadline": string },
  "intro": string,
  "localContext": string,
  "problemSigns": [{ "sign": string, "detail": string } x4-6],
  "process": [{ "step": string, "description": string } x4],
  "whyUs": [string x4-5],
  "neighborhoodsServed": [string x3+ — real ${city.name} neighborhoods],
  "faqs": [{ "q": string, "a": string } x4-5],
  "ctaLine": string
}`)}`;
}

export function serviceHubPrompt(service: Service): string {
  return `Write the content for a metro-wide pillar page: "${service.name} in Chicago & Chicagoland".

SERVICE FACTS:
- Common symptoms: ${service.symptoms.join("; ")}
- Parts we install: ${service.parts.join("; ")}
- Typical price: ${service.priceRange}
- Emergency-eligible: ${service.isEmergency ? "yes (24h Mon–Sat dispatch)" : "no"}

CONTEXT: This is the authoritative hub page for this service across the whole Chicago metro — the city's bungalow/two-flat alley garages AND suburban attached garages. It links out to 25 city-specific pages, so keep the copy metro-level (contrast city vs. suburbs where useful) and deeper on the technical service itself: what fails, why, what a proper repair includes, what determines price within ${service.priceRange}.

HARD RULES:
1. intro: 150–220 words. whatWeDo: 120–180 words of genuinely technical substance.
2. FAQs must be service-specific (technical, pricing, lifespan questions) — never "what areas do you serve".
3. meta.title max 60 chars containing "${service.shortName}" and "Chicago". meta.description max 155 chars.
4. No banned phrases. At most one exclamation mark.

${jsonShape(`{
  "meta": { "title": string, "description": string },
  "hero": { "headline": string, "subheadline": string },
  "intro": string,
  "whatWeDo": string,
  "problemSigns": [{ "sign": string, "detail": string } x4-6],
  "process": [{ "step": string, "description": string } x4],
  "whyUs": [string x4-5],
  "faqs": [{ "q": string, "a": string } x4-6],
  "ctaLine": string
}`)}`;
}

export function cityHubPrompt(city: City): string {
  return `Write the content for a city hub page: "Garage Door Repair in ${city.name}, IL" — the overview page linking to all 11 services we offer in ${city.name}.

CITY FACTS (use them concretely):
- City: ${city.name}, ${city.county} County, IL (population ~${city.population.toLocaleString()})
- Real neighborhoods: ${city.neighborhoods.join(", ")}
- Housing/garage stock: ${city.housingNotes}
- Local angle: ${city.localAngle}

HARD RULES:
1. Mention at least 3 named neighborhoods naturally.
2. localContext (120–180 words) must explain what's distinctive about ${city.name}'s garages and doors — housing stock, weather exposure, age — so it could not describe another suburb.
3. intro: 150–220 words covering the breadth of services (springs, cables, openers, tracks, installs, commercial) as delivered locally in ${city.name}.
4. Write 6-7 FAQs, all ${city.name}-specific: coverage, response times, local housing quirks, pricing context, specific services. Each answer 2-3 full sentences.
5. meta.title max 60 chars containing "${city.name}". meta.description max 155 chars.
6. No banned phrases. At most one exclamation mark.

${jsonShape(`{
  "meta": { "title": string, "description": string },
  "hero": { "headline": string, "subheadline": string },
  "intro": string,
  "localContext": string,
  "neighborhoodsServed": [string x3+ — real ${city.name} neighborhoods],
  "faqs": [{ "q": string, "a": string } x6-7],
  "ctaLine": string
}`)}`;
}
