import type { Metadata } from "next";
import Link from "next/link";
import { citiesByCounty, cities } from "@/data/cities";
import { routes } from "@/lib/routes";
import { buildPageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionTag, CtaBand } from "@/components/Sections";

export const metadata: Metadata = buildPageMetadata({
  title: "Service Areas | Garage Door Repair Across Chicagoland",
  description:
    "Garage door repair in 25 Chicagoland cities across Cook, DuPage, Will & Kane counties — Chicago, Naperville, Schaumburg, Joliet, Evanston & more.",
  path: routes.serviceAreas(),
});

export default function ServiceAreasPage() {
  const grouped = citiesByCounty();
  return (
    <>
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: routes.home() },
          { name: "Service Areas", path: routes.serviceAreas() },
        ]}
      />
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6">
        <SectionTag>Coverage map</SectionTag>
        <h1 className="display mt-3 max-w-3xl text-6xl text-bone sm:text-7xl">
          {cities.length} cities, <span className="text-ember">zero excuses.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-bone-dim">
          Same family-owned crew, same upfront pricing, same 24/6 dispatch —
          across Cook, DuPage, Will, and Kane counties. Find your city below.
        </p>
        <div className="mt-12 space-y-12">
          {Object.entries(grouped).map(([county, members]) => (
            <div key={county}>
              <h2 className="display flex items-center gap-4 text-3xl text-bone">
                {county} County
                <span
                  aria-hidden="true"
                  className="inline-block h-px flex-1 bg-steel"
                />
              </h2>
              <div className="mt-5 grid gap-px bg-steel sm:grid-cols-2 lg:grid-cols-3">
                {members.map((c) => (
                  <Link
                    key={c.slug}
                    href={routes.city(c.slug)}
                    className="lift group border border-transparent bg-charcoal p-6"
                  >
                    <h3 className="display text-3xl text-bone group-hover:text-ember">
                      {c.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-bone-dim">
                      {c.neighborhoods.slice(0, 3).join(" · ")}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
