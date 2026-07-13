import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { business } from "@/config/business";
import { services } from "@/data/services";
import { cities, getCity } from "@/data/cities";
import { routes } from "@/lib/routes";
import { buildPageMetadata } from "@/lib/seo";
import { loadCityHubContent } from "@/lib/content";
import { fallbackCityHub } from "@/lib/fallback";
import { faqPageSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionTag, CtaBand, FaqAccordion } from "@/components/Sections";

export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

interface Props {
  params: Promise<{ city: string }>;
}

async function getContent(params: Props["params"]) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();
  const content = loadCityHubContent(slug) ?? fallbackCityHub(city);
  return { city, content };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, content } = await getContent(params);
  return buildPageMetadata({
    title: content.meta.title,
    description: content.meta.description,
    path: routes.city(city.slug),
  });
}

export default async function CityHubPage({ params }: Props) {
  const { city, content } = await getContent(params);

  const nearbyCities = city.nearby
    .map((slug) => getCity(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const crumbs = [
    { name: "Home", path: routes.home() },
    { name: "Service Areas", path: routes.serviceAreas() },
    { name: city.name, path: routes.city(city.slug) },
  ];

  return (
    <>
      <JsonLd data={faqPageSchema(content.faqs)} />
      <Breadcrumbs crumbs={crumbs} />

      {/* Hero */}
      <section className="blueprint-faint border-b border-steel">
        <div className="mx-auto max-w-7xl px-4 pb-14 pt-8 sm:px-6">
          <SectionTag>
            {city.county} County · {business.hoursLabel}
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
            Your {city.name} garage door crew
          </h2>
          <p className="mt-4 leading-relaxed text-bone-dim">{content.intro}</p>
        </div>
        <div className="border border-steel bg-charcoal-2 p-8">
          <h2 className="display text-3xl text-bone">
            We know <span className="text-ember">{city.name}</span> garages
          </h2>
          <p className="mt-4 leading-relaxed text-bone-dim">
            {content.localContext}
          </p>
        </div>
      </section>

      {/* All services in this city */}
      <section className="border-y border-steel bg-charcoal-2">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <SectionTag>Everything we do in {city.name}</SectionTag>
          <h2 className="display mt-3 text-4xl text-bone sm:text-5xl">
            All {services.length} services, local
          </h2>
          <div className="mt-10 grid gap-px bg-steel sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Link
                key={s.slug}
                href={routes.spoke(s.slug, city.slug)}
                className="lift group relative bg-charcoal-2 p-6"
              >
                <span className="index-num text-4xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display mt-2 text-2xl text-bone group-hover:text-ember">
                  {s.shortName}
                </h3>
                <p className="mt-1 text-xs text-bone-dim">
                  in {city.name}, IL →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
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

      {/* FAQs */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <SectionTag>{city.name} questions</SectionTag>
        <div className="mt-6 max-w-4xl">
          <FaqAccordion faqs={content.faqs} />
        </div>
      </section>

      {/* Nearby cities */}
      <section className="blueprint-faint border-y border-steel">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <p className="display text-xl text-bone-dim">Also serving nearby</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {nearbyCities.map((c) => (
              <Link
                key={c.slug}
                href={routes.city(c.slug)}
                className="lift display border border-steel bg-charcoal px-4 py-2 text-lg text-bone hover:text-ember"
              >
                {c.name} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand line={content.ctaLine} />
    </>
  );
}
