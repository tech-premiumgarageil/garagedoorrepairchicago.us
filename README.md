# garagedoorrepairchicago.us

Programmatic local-SEO site for a garage door repair company serving Chicago +
24 Chicagoland suburbs. Next.js App Router, fully static (~320 prerendered
pages), "Chicago Steel" dark industrial design.

## Architecture

- `/services/[service]/` — 11 service hub pages
- `/services/[service]/[city]/` — 275 service×city spoke pages
- `/service-areas/[city]/` — 25 city hub pages
- `/booking` — CRM booking widget (only page that loads third-party JS)
- `/faq` — verbatim FAQ content + FAQPage schema

Page copy comes from JSON files in `src/content/` (committed to git). Pages
without a JSON file render deterministic fallback copy from
`src/lib/fallback.ts` — serviceable, but run the Gemini generator before
seriously submitting the sitemap so every page is unique.

## Commands

```bash
npm run dev                # local dev
npm run build              # validates content, then builds ~320 static pages
npm run validate:content   # content QA: schema, word counts, banned phrases, near-dupes
GEMINI_API_KEY=... npm run generate:content   # generate missing page content
```

Generator flags (after `--`): `--force` regenerate all, `--limit=5` first N,
`--only=garage-door-spring-repair:naperville` one page (`hub:slug`,
`city:slug` for hubs), `--model=gemini-2.5-pro`.

**Recommended first run:** `--limit=5`, read the output JSONs for doorway-page
smell, tune `scripts/lib/prompt.ts` if needed, then run the full batch
(~10–15 min, ~310 calls).

## Swapping in real business details

Everything NAP-related (name, phone, address, hours, booking widget, email)
lives in **`src/config/business.ts`** — one file, then rebuild. Placeholder
phone/address ship until then. Keep the site's NAP identical to the Google
Business Profile once it exists.

## Launch checklist

1. Generate all content (`npm run generate:content`), review a sample, commit.
2. Real NAP in `src/config/business.ts`.
3. `npm run build` — expect ~320 static routes, zero build errors.
4. Deploy to Vercel, attach the domain (www → apex redirect).
5. Google Search Console: verify property, submit `/sitemap.xml`.
6. Rich Results Test on `/`, `/faq/`, one spoke page.
7. Set up Google Business Profile with the same NAP.
8. Replace `PLACEHOLDER_REVIEWS` in `src/app/page.tsx` with real reviews
   (only then consider AggregateRating schema — see note in `src/lib/schema.ts`).
