import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/data/services";
import { routes } from "@/lib/routes";
import { buildPageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionTag, CtaBand } from "@/components/Sections";

export const metadata: Metadata = buildPageMetadata({
  title: "Garage Door Services in Chicago | Repair & Install",
  description:
    "All 11 garage door services — springs, cables, openers, rollers, tracks, panels, tune-ups, new doors, commercial & 24/6 emergency — across Chicagoland.",
  path: routes.services(),
});

export default function ServicesIndexPage() {
  return (
    <>
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: routes.home() },
          { name: "Services", path: routes.services() },
        ]}
      />
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6">
        <SectionTag>Full catalog</SectionTag>
        <h1 className="display mt-3 max-w-3xl text-6xl text-bone sm:text-7xl">
          Every garage door service.{" "}
          <span className="text-ember">One crew.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-bone-dim">
          From a single snapped spring to a full commercial installation —
          upfront flat-rate quotes, same-day service, and dispatch 24 hours a
          day, Monday through Saturday.
        </p>
        <div className="mt-12 grid gap-px bg-steel sm:grid-cols-2">
          {services.map((s, i) => (
            <Link
              key={s.slug}
              href={routes.service(s.slug)}
              className="lift group relative flex flex-col border border-transparent bg-charcoal p-8"
            >
              <div className="flex items-start justify-between">
                <span className="index-num text-7xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.isEmergency && (
                  <span className="display border border-ember px-2 py-0.5 text-xs text-ember">
                    24/6
                  </span>
                )}
              </div>
              <h2 className="display mt-4 text-4xl text-bone group-hover:text-ember">
                {s.name}
              </h2>
              <p className="mt-3 leading-relaxed text-bone-dim">{s.blurb}</p>
              <p className="display mt-4 text-lg text-ember">
                {s.priceRange} →
              </p>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
