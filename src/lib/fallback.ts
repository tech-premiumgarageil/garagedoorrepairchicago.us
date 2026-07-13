import type { City } from "@/data/cities";
import type { Service } from "@/data/services";
import { business } from "@/config/business";
import type { CityHubContent, ServiceHubContent, SpokeContent } from "@/lib/content";

/**
 * Deterministic fallback content composed from the structured data files.
 * Used only while a page's Gemini-generated JSON doesn't exist yet, so the
 * site can build and deploy before/while content generation runs.
 *
 * NOTE: fallback pages are intentionally serviceable but templated — run
 * `npm run generate:content` (Gemini) before submitting the sitemap to
 * Search Console so every spoke has genuinely unique copy.
 */

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function fallbackSpoke(service: Service, city: City): SpokeContent {
  const hoods = city.neighborhoods.slice(0, 4);
  return {
    service: service.slug,
    city: city.slug,
    generatedAt: new Date(0).toISOString(),
    model: "fallback-template",
    meta: {
      title: `${service.shortName} in ${city.name}, IL | Same-Day`.slice(0, 60),
      description:
        `${service.shortName} in ${city.name}, IL — same-day service, upfront pricing, 24h dispatch Mon–Sat. Serving ${hoods[0]} to ${hoods[1] ?? "every neighborhood"}. Book online, save 10%.`.slice(
          0,
          155,
        ),
    },
    hero: {
      headline: service.h1Pattern.replace("{city}", city.name),
      subheadline: `Same-day ${service.name.toLowerCase()} across ${city.name} — upfront flat-rate quotes and dispatch 24 hours a day, Monday through Saturday.`,
    },
    intro: `When you need ${service.name.toLowerCase()} in ${city.name}, waiting isn't really an option. ${cap(
      service.symptoms[0],
    )} usually means the door is done moving until a technician arrives — and in ${city.name}, ${
      city.county
    } County, our trucks are already nearby. ${business.name} is a family-owned crew serving ${hoods
      .slice(0, 3)
      .join(", ")} and every other corner of ${
      city.name
    }. We quote the full price upfront, carry the parts on the truck, and finish most jobs in a single same-day visit. Book online and the ${
      business.onlineBookingDiscount
    } discount is applied automatically.`,
    localContext: `${city.housingNotes} ${city.localAngle} That's exactly the kind of wear our technicians see every week in ${city.name} — and why we stock the truck for it before we pull out of the shop.`,
    problemSigns: service.symptoms.slice(0, 5).map((sign) => ({
      sign: cap(sign),
      detail: `If you're seeing this in ${city.name}, stop operating the door and give us a call — continuing to run it usually turns a small repair into a bigger one.`,
    })),
    process: [
      {
        step: "Call or book online",
        description: `Live dispatch 24 hours Mon–Sat, or pick your own slot online and save ${business.onlineBookingDiscount}.`,
      },
      {
        step: "Upfront quote",
        description: "The technician inspects the whole system and quotes the complete flat price before starting.",
      },
      {
        step: "Same-day repair",
        description: `${cap(service.parts[0])} and the rest of the hardware ride on every truck, so most ${city.name} jobs finish in one visit.`,
      },
      {
        step: "Test & guarantee",
        description: "Balance test, safety-reverse check, and lubrication before we leave — parts and labor guaranteed.",
      },
    ],
    whyUs: [
      `Local techs who work ${city.name} daily`,
      "Upfront flat-rate pricing — no surprises",
      `Typical range: ${service.priceRange}`,
      `Open 24 hours, Monday–Saturday`,
      `${business.onlineBookingDiscount} off online bookings`,
    ],
    neighborhoodsServed: [...city.neighborhoods],
    faqs: [
      {
        q: `How fast can you get to ${city.name} for ${service.shortName.toLowerCase()}?`,
        a: `We dispatch 24 hours a day Monday–Saturday, and most ${city.name} calls get a same-day slot. Emergency calls are prioritized.`,
      },
      {
        q: `What does ${service.shortName.toLowerCase()} cost in ${city.name}?`,
        a: `Most jobs land in the ${service.priceRange} range. You get the exact flat price after inspection, before any work starts — and online bookings save ${business.onlineBookingDiscount}.`,
      },
      {
        q: `Do you carry parts for older ${city.name} garages?`,
        a: `Yes. ${city.housingNotes.split(";")[0]}. Our trucks stock hardware for both older doors and current models.`,
      },
      {
        q: "Is the work guaranteed?",
        a: "Yes — parts and labor are guaranteed, and every repair ends with a balance and safety-reverse test.",
      },
    ],
    ctaLine: `${service.shortName} in ${city.name} — fixed today.`,
  };
}

export function fallbackServiceHub(service: Service): ServiceHubContent {
  return {
    service: service.slug,
    generatedAt: new Date(0).toISOString(),
    model: "fallback-template",
    meta: {
      title: `${service.name} in Chicago, IL | 24/6 Service`.slice(0, 60),
      description:
        `${service.name} across Chicago & all Chicagoland suburbs. Same-day service, upfront flat-rate quotes, 24h dispatch Mon–Sat. Book online and save 10%.`.slice(
          0,
          155,
        ),
    },
    hero: {
      headline: `${service.name} in Chicago & Chicagoland`,
      subheadline: `${service.blurb} Dispatch runs 24 hours a day, Monday through Saturday.`,
    },
    intro: `${service.blurb} ${business.name} handles ${service.name.toLowerCase()} across the city and every major suburb — same technicians, same upfront flat-rate pricing, whether you're in a Chicago bungalow or a Naperville subdivision. Typical jobs run ${service.priceRange}, quoted in full before work begins. Book online any time and save ${business.onlineBookingDiscount} automatically.`,
    whatWeDo: `Every ${service.name.toLowerCase()} visit starts with a full-system inspection — ${service.parts
      .slice(0, 3)
      .join(", ")} and the surrounding hardware — because fixing the symptom without the cause just books a second failure. Our trucks carry ${
      service.parts[0]
    } and the supporting hardware, so nearly all jobs finish in one same-day visit.`,
    problemSigns: service.symptoms.slice(0, 5).map((sign) => ({
      sign: cap(sign),
      detail: "One of the most common calls we get — and one of the fastest for our technicians to diagnose and fix.",
    })),
    process: [
      {
        step: "Call or book online",
        description: `Live dispatch 24 hours Mon–Sat, or book online and save ${business.onlineBookingDiscount}.`,
      },
      {
        step: "Upfront quote",
        description: "Full-system inspection, then a complete flat price before any work starts.",
      },
      {
        step: "Same-day repair",
        description: "Parts on the truck; most jobs finish in a single visit.",
      },
      {
        step: "Test & guarantee",
        description: "Balance test, safety-reverse check, lubrication — parts and labor guaranteed.",
      },
    ],
    whyUs: [
      "Family-owned, Chicago-based crew",
      "Upfront flat-rate pricing",
      `Typical range: ${service.priceRange}`,
      "Open 24 hours, Monday–Saturday",
      `${business.onlineBookingDiscount} off online bookings`,
    ],
    faqs: [
      {
        q: `How quickly can you handle ${service.shortName.toLowerCase()}?`,
        a: "Most calls get a same-day appointment — dispatch runs 24 hours a day, Monday through Saturday, across all of Chicagoland.",
      },
      {
        q: `What does ${service.shortName.toLowerCase()} cost?`,
        a: `Typical jobs run ${service.priceRange}. You always get the exact flat price after inspection, before work begins.`,
      },
      {
        q: "Which areas do you cover?",
        a: "Chicago and 24 surrounding suburbs across Cook, DuPage, Will, and Kane counties — see the city list on this page.",
      },
      {
        q: "Is the repair guaranteed?",
        a: "Yes. Parts and labor are guaranteed, and every job ends with a full balance and safety test.",
      },
    ],
    ctaLine: `${service.shortName} — handled today, anywhere in Chicagoland.`,
  };
}

export function fallbackCityHub(city: City): CityHubContent {
  const hoods = city.neighborhoods.slice(0, 4);
  return {
    city: city.slug,
    generatedAt: new Date(0).toISOString(),
    model: "fallback-template",
    meta: {
      title: `Garage Door Repair in ${city.name}, IL | 24/6`.slice(0, 60),
      description:
        `Garage door repair in ${city.name}, IL — springs, cables, openers & installs. Same-day service from ${hoods[0]} to ${hoods[1] ?? "every neighborhood"}. Save 10% online.`.slice(
          0,
          155,
        ),
    },
    hero: {
      headline: `Garage Door Repair in ${city.name}, IL`,
      subheadline: `Every service we offer — springs, cables, openers, tracks, and full installations — delivered same-day across ${city.name}.`,
    },
    intro: `${business.name} covers all of ${city.name} — ${hoods.join(", ")} and beyond — with the same family-owned crew that serves the rest of ${city.county} County. Springs, cables, openers, rollers, tracks, panels, tune-ups, new doors, and commercial systems: one call, one upfront flat-rate quote, and in most cases one same-day visit. Dispatch runs 24 hours a day, Monday through Saturday, and booking online saves ${business.onlineBookingDiscount} automatically.`,
    localContext: `${city.housingNotes} ${city.localAngle} Our ${city.name} technicians see that pattern every week, and the trucks are stocked for it.`,
    neighborhoodsServed: [...city.neighborhoods],
    faqs: [
      {
        q: `Do you really cover all of ${city.name}?`,
        a: `Yes — ${city.neighborhoods.join(", ")} and every street in between. If you're in ${city.name}, you're in the service area.`,
      },
      {
        q: `How fast can a technician reach ${city.name}?`,
        a: "Most calls get same-day service, and emergencies are prioritized — dispatch runs 24 hours a day, Monday through Saturday.",
      },
      {
        q: "Which services are available here?",
        a: `Everything we do: spring and cable repair, opener repair and installation, roller and track work, panel replacement, tune-ups, new door installation, and commercial doors.`,
      },
      {
        q: "Can I get a price before you start?",
        a: `Always. You get a complete flat-rate quote after inspection and before any work begins — and ${business.onlineBookingDiscount} off when you book online.`,
      },
    ],
    ctaLine: `${city.name}'s garage doors, fixed today.`,
  };
}
