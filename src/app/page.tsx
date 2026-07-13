import Link from "next/link";
import type { Metadata } from "next";
import { business } from "@/config/business";
import { services } from "@/data/services";
import { citiesByCounty, cities } from "@/data/cities";
import { faqs } from "@/data/faqs";
import { routes } from "@/lib/routes";
import { buildPageMetadata } from "@/lib/seo";
import { SectionTag, CtaBand, CityMarquee, FaqAccordion } from "@/components/Sections";

export const metadata: Metadata = buildPageMetadata({
  title: "Garage Door Repair Chicago, IL | 24/6 Same-Day Service",
  description:
    "Family-owned garage door repair serving Chicago & all of Chicagoland. Springs, cables, openers & installation — open 24 hours Mon–Sat. Book online, save 10%.",
  path: routes.home(),
});

/**
 * PLACEHOLDER_REVIEWS — replace with real customer reviews before adding any
 * review schema. Do NOT add AggregateRating markup while these are in use.
 */
const PLACEHOLDER_REVIEWS = [
  {
    quote:
      "Spring snapped at 6am. Technician was in my driveway in Portage Park by 8, door running by 9. Fair price, zero drama.",
    name: "M. R., Chicago",
  },
  {
    quote:
      "Booked online at midnight, picked my slot, got the 10% off. New belt-drive opener is so quiet we don't hear it over the TV.",
    name: "S. K., Naperville",
  },
  {
    quote:
      "They replaced every hinge and roller on our 1920s garage door instead of pushing a new door on us. That's why we call them.",
    name: "J. D., Berwyn",
  },
];

const steps = [
  {
    step: "Call or book online",
    description: `Talk to a live dispatcher any hour, Monday–Saturday — or pick your own slot online and save ${business.onlineBookingDiscount}.`,
  },
  {
    step: "Flat, upfront quote",
    description:
      "The technician inspects the full system and quotes the complete price before touching a wrench.",
  },
  {
    step: "Repaired same day",
    description:
      "Trucks stocked with springs, cables, rollers, and openers — most repairs finish in one visit.",
  },
  {
    step: "Tested & guaranteed",
    description:
      "Balance test, safety-reverse check, and full lubrication before we leave. Parts and labor guaranteed.",
  },
];

export default function HomePage() {
  const grouped = citiesByCounty();
  return (
    <>
      {/* ————— Hero ————— */}
      <section className="blueprint-faint relative overflow-hidden border-b border-steel">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:pb-24 lg:pt-20">
          <div>
            <p className="rise rise-1 display text-lg text-ember">
              Chicago &amp; All of Chicagoland · {business.hoursLabel}
            </p>
            <h1 className="rise rise-2 display mt-4 text-6xl text-bone sm:text-7xl lg:text-8xl">
              Garage Door
              <br />
              Repair, Built
              <br />
              <span className="text-ember">Chicago Tough.</span>
            </h1>
            <p className="rise rise-3 mt-6 max-w-xl text-lg leading-relaxed text-bone-dim">
              Broken springs, snapped cables, dead openers — fixed the same day
              by a family-owned local crew. Serving every neighborhood from
              Beverly to Evanston, Berwyn to Naperville.
            </p>
            <div className="rise rise-4 mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={business.phoneHref}
                className="display bg-ember px-8 py-4 text-center text-2xl text-charcoal transition-colors hover:bg-ember-deep"
              >
                Call {business.phone}
              </a>
              <Link
                href={routes.booking()}
                className="display border border-bone px-8 py-4 text-center text-2xl text-bone transition-colors hover:border-ember hover:text-ember"
              >
                Book Online −10%
              </Link>
            </div>
          </div>

          {/* Quote card */}
          <aside className="rise rise-4 h-fit border border-steel bg-charcoal-2 p-6 lg:mt-10">
            <p className="display text-3xl text-bone">Same-Day Service</p>
            <ul className="mt-4 space-y-3 text-sm text-bone-dim">
              {[
                "Live dispatch 24 hours, Mon–Sat",
                "Upfront flat-rate quotes — no surprises",
                "Springs, cables & openers stocked on-truck",
                `${business.onlineBookingDiscount} off every online booking`,
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-ember"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href={routes.booking()}
              className="display mt-6 block bg-bone py-3 text-center text-xl text-charcoal transition-colors hover:bg-ember"
            >
              Pick Your Time Slot →
            </Link>
          </aside>
        </div>
      </section>

      <CityMarquee />

      {/* ————— Services ————— */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionTag>What we fix</SectionTag>
        <h2 className="display mt-3 max-w-2xl text-5xl text-bone sm:text-6xl">
          Every part of the door. <span className="text-ember">Every day.</span>
        </h2>
        <div className="mt-12 grid gap-px bg-steel sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Link
              key={s.slug}
              href={routes.service(s.slug)}
              className="lift group relative flex min-h-56 flex-col justify-between border border-transparent bg-charcoal p-6"
            >
              <span className="index-num text-6xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="display text-3xl text-bone group-hover:text-ember">
                  {s.shortName}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-bone-dim">
                  {s.blurb}
                </p>
              </div>
              {s.isEmergency && (
                <span className="display absolute right-4 top-4 border border-ember px-2 py-0.5 text-xs text-ember">
                  24/6
                </span>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* ————— Process ————— */}
      <section className="border-y border-steel bg-charcoal-2">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <SectionTag>How it works</SectionTag>
          <h2 className="display mt-3 text-5xl text-bone sm:text-6xl">
            Broken this morning.
            <br />
            <span className="text-ember">Fixed this afternoon.</span>
          </h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.step} className="border-t-2 border-ember pt-4">
                <span className="index-num text-5xl">{`0${i + 1}`}</span>
                <h3 className="display mt-2 text-2xl text-bone">{s.step}</h3>
                <p className="mt-2 text-sm leading-relaxed text-bone-dim">
                  {s.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ————— Reviews ————— */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionTag>Word on the block</SectionTag>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {PLACEHOLDER_REVIEWS.map((r) => (
            <figure key={r.name} className="border-l-2 border-ember pl-6">
              <blockquote className="text-lg leading-relaxed text-bone">
                “{r.quote}”
              </blockquote>
              <figcaption className="display mt-4 text-lg text-bone-dim">
                — {r.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ————— Coverage ————— */}
      <section className="blueprint-faint border-y border-steel">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <SectionTag>Service area</SectionTag>
          <h2 className="display mt-3 text-5xl text-bone sm:text-6xl">
            {cities.length} cities. <span className="text-ember">One call.</span>
          </h2>
          <div className="mt-12 space-y-10">
            {Object.entries(grouped).map(([county, members]) => (
              <div key={county}>
                <p className="display text-xl text-bone-dim">{county} County</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {members.map((c) => (
                    <Link
                      key={c.slug}
                      href={routes.city(c.slug)}
                      className="lift display border border-steel bg-charcoal px-4 py-2 text-xl text-bone hover:text-ember"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ————— FAQ teaser ————— */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionTag>Questions</SectionTag>
        <h2 className="display mt-3 text-5xl text-bone">Before you call</h2>
        <div className="mt-8">
          <FaqAccordion faqs={faqs.slice(0, 3)} />
        </div>
        <Link
          href={routes.faq()}
          className="display mt-6 inline-block text-2xl text-ember hover:text-bone"
        >
          All questions →
        </Link>
      </section>

      <CtaBand />
    </>
  );
}
