import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { business } from "@/config/business";
import { services, getService } from "@/data/services";
import { cities } from "@/data/cities";
import { routes } from "@/lib/routes";
import { buildPageMetadata } from "@/lib/seo";
import { loadServiceHubContent } from "@/lib/content";
import { fallbackServiceHub } from "@/lib/fallback";
import { serviceSchema, faqPageSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionTag, CtaBand, FaqAccordion } from "@/components/Sections";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ service: s.slug }));
}

interface Props {
  params: Promise<{ service: string }>;
}

async function getContent(params: Props["params"]) {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const content = loadServiceHubContent(slug) ?? fallbackServiceHub(service);
  return { service, content };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service, content } = await getContent(params);
  return buildPageMetadata({
    title: content.meta.title,
    description: content.meta.description,
    path: routes.service(service.slug),
  });
}

export default async function ServiceHubPage({ params }: Props) {
  const { service, content } = await getContent(params);
  const crumbs = [
    { name: "Home", path: routes.home() },
    { name: "Services", path: routes.services() },
    { name: service.name, path: routes.service(service.slug) },
  ];

  return (
    <>
      <JsonLd data={serviceSchema(service)} />
      <JsonLd data={faqPageSchema(content.faqs)} />
      <Breadcrumbs crumbs={crumbs} />

      {/* Hero */}
      <section className="blueprint-faint border-b border-steel">
        <div className="mx-auto max-w-7xl px-4 pb-14 pt-8 sm:px-6">
          <SectionTag>
            {service.isEmergency ? "24/6 emergency service" : "Same-day service"}
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

      {/* Intro + what we do */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="display text-4xl text-bone">The service</h2>
          <p className="mt-4 leading-relaxed text-bone-dim">{content.intro}</p>
        </div>
        <div>
          <h2 className="display text-4xl text-bone">What we do</h2>
          <p className="mt-4 leading-relaxed text-bone-dim">{content.whatWeDo}</p>
          <p className="display mt-6 inline-block border border-ember px-4 py-2 text-xl text-ember">
            {service.priceRange}
          </p>
        </div>
      </section>

      {/* Problem signs */}
      <section className="border-y border-steel bg-charcoal-2">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <SectionTag>Warning signs</SectionTag>
          <h2 className="display mt-3 text-4xl text-bone sm:text-5xl">
            Sound familiar?
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
            <p className="display text-2xl text-bone">Why us</p>
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

      {/* FAQs */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <SectionTag>Questions</SectionTag>
        <div className="mt-6 max-w-4xl">
          <FaqAccordion faqs={content.faqs} />
        </div>
      </section>

      {/* Spoke index — the hub's links to all 25 city pages */}
      <section className="blueprint-faint border-y border-steel">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <SectionTag>Where we do it</SectionTag>
          <h2 className="display mt-3 text-4xl text-bone sm:text-5xl">
            {service.shortName} near you
          </h2>
          <div className="mt-8 flex flex-wrap gap-2">
            {cities.map((c) => (
              <Link
                key={c.slug}
                href={routes.spoke(service.slug, c.slug)}
                className="lift display border border-steel bg-charcoal px-4 py-2 text-lg text-bone hover:text-ember"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand line={content.ctaLine} />
    </>
  );
}
