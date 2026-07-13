import Link from "next/link";
import { business } from "@/config/business";
import { cities } from "@/data/cities";
import { routes } from "@/lib/routes";
import type { Faq } from "@/data/faqs";

/** Small uppercase section label with ember tick */
export function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <p className="display flex items-center gap-3 text-lg text-ember">
      <span aria-hidden="true" className="inline-block h-px w-8 bg-ember" />
      {children}
    </p>
  );
}

/** Full-width call-to-action band used near the bottom of most pages */
export function CtaBand({ line }: { line?: string }) {
  return (
    <section className="blueprint-faint border-y border-steel bg-charcoal-2">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-4 py-16 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="display max-w-2xl text-4xl text-bone sm:text-5xl">
            {line ?? "Your door fixed today — not next week."}
          </h2>
          <p className="mt-3 max-w-xl text-bone-dim">
            {business.hoursLabel}. Book online in two minutes and save{" "}
            {business.onlineBookingDiscount} automatically.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <a
            href={business.phoneHref}
            className="display border border-bone px-6 py-4 text-center text-2xl text-bone transition-colors hover:border-ember hover:text-ember"
          >
            {business.phone}
          </a>
          <Link
            href={routes.booking()}
            className="display bg-ember px-6 py-4 text-center text-2xl text-charcoal transition-colors hover:bg-ember-deep"
          >
            Book Online −10%
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Scrolling strip of city names — section divider that doubles as coverage teaser */
export function CityMarquee() {
  const names = cities.map((c) => c.name);
  const strip = (key: string) => (
    <div key={key} aria-hidden={key === "b"} className="flex items-center">
      {names.map((n) => (
        <span
          key={`${key}-${n}`}
          className="display flex items-center gap-6 px-6 text-3xl text-steel-light"
        >
          {n}
          <span className="inline-block h-1.5 w-1.5 rotate-45 bg-ember" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="overflow-hidden border-y border-steel bg-charcoal py-4">
      <div className="marquee-track">
        {strip("a")}
        {strip("b")}
      </div>
    </div>
  );
}

/** CSS-only FAQ accordion using native <details> */
export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-steel border-y border-steel">
      {faqs.map((f) => (
        <details key={f.q} className="faq-item group py-5">
          <summary className="flex items-start justify-between gap-6">
            <span className="display text-2xl text-bone group-hover:text-ember">
              {f.q}
            </span>
            <span
              aria-hidden="true"
              className="faq-marker display mt-1 shrink-0 text-2xl text-ember"
            >
              +
            </span>
          </summary>
          <p className="mt-4 max-w-3xl leading-relaxed text-bone-dim">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
