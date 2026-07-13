import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { business } from "@/config/business";
import { services, getService } from "@/data/services";
import { getCity } from "@/data/cities";
import { routes } from "@/lib/routes";
import { buildPageMetadata } from "@/lib/seo";
import { loadSpokeContent } from "@/lib/content";
import { fallbackSpoke } from "@/lib/fallback";
import { serviceSchema, faqPageSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionTag, CtaBand, FaqAccordion } from "@/components/Sections";
import { cities } from "@/data/cities";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.flatMap((s) =>
    cities.map((c) => ({ service: s.slug, city: c.slug })),
  );
}

interface Props {
  params: Promise<{ service: string; city: string }>;
}

async function getContent(params: Props["params"]) {
  const { service: serviceSlug, city: citySlug } = await params;
  const service = getService(serviceSlug);
  const city = getCity(citySlug);
  if (!service || !city) notFound();
  const content = loadSpokeContent(serviceSlug, citySlug) ?? fallbackSpoke(service, city);
  return { service, city, content };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service, city, content } = await getContent(params);
  return buildPageMetadata({
    title: content.meta.title,
    description: content.meta.description,
    path: routes.spoke(service.slug, city.slug),
  });
}

export default async function SpokePage({ params }: Props) {
  const { service, city, content } = await getContent(params);

  const nearbyCities = city.nearby
    .map((slug) => getCity(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const siblingServices = services
    .filter((s) => s.slug !== service.slug)
    .slice(0, 6);

  const crumbs = [
    { name: "Home", path: routes.home() },
    { name: "Services", path: routes.services() },
    { name: service.name, path: routes.service(service.slug) },
    { name: city.name, path: routes.spoke(service.slug, city.slug) },
  ];

  return (
    <>
      <JsonLd data={serviceSchema(service, city)} />
      <JsonLd data={faqPageSchema(content.faqs)} />
      <Breadcrumbs crumbs={crumbs} />

      {/* Hero */}
      <section className="blueprint-faint border-b border-steel">
        <div className="mx-auto max-w-7xl px-4 pb-14 pt-8 sm:px-6">
          <SectionTag>
            {city.name} · {city.county} County · {business.hoursLabel}
          </SectionTag>
          <h1 className="display mt-3 max-w-4xl text-5xl text-bone sm:text-6xl lg:text-7xl">
            {content.hero.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-bone-dim">
            {content.hero.subheadline}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={business.phoneHref}
              className="display bg-ember px-8 py-4 text-center text-2xl text-charcoal hover:bg-ember-deep"
            >
              Call {business.phone}
            </a>
            <Link
              href={routes.booking()}
              className="display border border-bone px-8 py-4 text-center text-2xl text-bone hover:border-ember hover:text-ember"
            >
              Book Online −10%
            </Link>
          </div>
        </div>
      </section>

      {/* Intro + local context */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="display text-4xl text-bone">
            {service.shortName} in {city.name}
          </h2>
          <p className="mt-4 leading-relaxed text-bone-dim">{content.intro}</p>
        </div>
        <div className="border border-steel bg-charcoal-2 p-8">
          <h2 className="display text-3xl text-bone">
            Why {city.name} doors fail{" "}
            <span className="text-ember">differently</span>
          </h2>
          <p className="mt-4 leading-relaxed text-bone-dim">
            {content.localContext}
          </p>
        </div>
      </section>

      {/* Problem signs */}
      <section className="border-y border-steel bg-charcoal-2">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <SectionTag>Warning signs</SectionTag>
          <h2 className="display mt-3 text-4xl text-bone sm:text-5xl">
            Spot the problem early
          </h2>
          <div className="mt-10 grid gap-px bg-steel md:grid-cols-2">
            {content.problemSigns.map((p, i) => (
              <div key={p.sign} className="bg-charcoal-2 p-6">
                <span className="index-num text-4xl">{`0${i + 1}`}</span>
                <h3 className="display mt-2 text-2xl text-bone">{p.sign}</h3>
                <p className="mt-2 text-sm leading-relaxed text-bone-dim">
                  {p.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process + why us */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          <div>
            <SectionTag>How it works</SectionTag>
            <ol className="mt-8 space-y-6">
              {content.process.map((s, i) => (
                <li key={s.step} className="flex gap-5 border-l-2 border-ember pl-5">
                  <span className="index-num text-4xl">{`0${i + 1}`}</span>
                  <div>
                    <h3 className="display text-2xl text-bone">{s.step}</h3>
                    <p className="mt-1 text-sm text-bone-dim">{s.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <aside className="h-fit border border-steel bg-charcoal-2 p-6">
            <p className="display text-2xl text-bone">Why us in {city.name}</p>
            <ul className="mt-4 space-y-3 text-sm text-bone-dim">
              {content.whyUs.map((w) => (
                <li key={w} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-ember"
                  />
                  {w}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <SectionTag>Neighborhoods we cover</SectionTag>
        <div className="mt-4 flex flex-wrap gap-2">
          {content.neighborhoodsServed.map((n) => (
            <span
              key={n}
              className="display border border-steel px-3 py-1.5 text-lg text-bone-dim"
            >
              {n}
            </span>
          ))}
        </div>
      </section>

      {/* FAQs — unique per page */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <SectionTag>
          {city.name} {service.shortName.toLowerCase()} questions
        </SectionTag>
        <div className="mt-6 max-w-4xl">
          <FaqAccordion faqs={content.faqs} />
        </div>
      </section>

      {/* Internal links: nearby cities + sibling services + hubs */}
      <section className="blueprint-faint border-y border-steel">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2">
          <nav aria-label={`${service.shortName} in nearby cities`}>
            <p className="display text-xl text-bone-dim">
              {service.shortName} nearby
            </p>
            <ul className="mt-3 space-y-2">
              {nearbyCities.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={routes.spoke(service.slug, c.slug)}
                    className="text-sm text-bone-dim hover:text-bone"
                  >
                    {service.shortName} in {c.name}, IL →
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={routes.service(service.slug)}
                  className="text-sm text-ember"
                >
                  All {service.shortName.toLowerCase()} areas →
                </Link>
              </li>
            </ul>
          </nav>
          <nav aria-label={`Other services in ${city.name}`}>
            <p className="display text-xl text-bone-dim">
              More in {city.name}
            </p>
            <ul className="mt-3 space-y-2">
              {siblingServices.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={routes.spoke(s.slug, city.slug)}
                    className="text-sm text-bone-dim hover:text-bone"
                  >
                    {s.name} in {city.name} →
                  </Link>
                </li>
              ))}
              <li>
                <Link href={routes.city(city.slug)} className="text-sm text-ember">
                  All {city.name} services →
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </section>

      <CtaBand line={content.ctaLine} />
    </>
  );
}
