import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/config/business";
import { routes } from "@/lib/routes";
import { buildPageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionTag, CtaBand } from "@/components/Sections";

export const metadata: Metadata = buildPageMetadata({
  title: "About Us | Family-Owned Garage Door Repair in Chicago",
  description:
    "A family-owned Chicago garage door company: same-day repairs, upfront quotes, and technicians who treat your bungalow, two-flat, or business like their own.",
  path: routes.about(),
});

const values = [
  {
    title: "Transparency first",
    body: "Every job starts with a flat, upfront quote and an online estimate if you want one — you know the number before we start.",
  },
  {
    title: "Fix, don't upsell",
    body: "If a $20 hinge solves it, that's what we recommend. New doors are for when repair genuinely stops making sense.",
  },
  {
    title: "Around the clock",
    body: `A stuck door is a security problem, not a Monday-morning problem. That's why dispatch runs ${business.hoursLabel.toLowerCase()}.`,
  },
  {
    title: "Local for real",
    body: "Our technicians work the same alleys, bungalow blocks, and subdivisions they grew up around — from the South Side to the northwest suburbs.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: routes.home() },
          { name: "About", path: routes.about() },
        ]}
      />
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6">
        <SectionTag>Who we are</SectionTag>
        <h1 className="display mt-3 max-w-3xl text-6xl text-bone sm:text-7xl">
          A family crew with <span className="text-ember">Chicago-sized</span>{" "}
          standards
        </h1>
        <div className="mt-8 max-w-3xl space-y-5 text-lg leading-relaxed text-bone-dim">
          <p>
            {business.name} is a family-owned repair and installation company
            serving Chicago and all of Chicagoland. We built this business on
            the belief that a garage door call should be boring: you book, we
            show up on time, quote a fair flat price, fix it right, and leave
            your garage cleaner than we found it.
          </p>
          <p>
            Our technicians handle everything from century-old detached garages
            behind Berwyn bungalows to three-car smart-opener setups in
            Naperville — plus rolling steel and dock doors for commercial
            clients across Cook, DuPage, Will, and Kane counties.
          </p>
        </div>

        <div className="mt-14 grid gap-px bg-steel sm:grid-cols-2">
          {values.map((v, i) => (
            <div key={v.title} className="bg-charcoal p-8">
              <span className="index-num text-5xl">{`0${i + 1}`}</span>
              <h2 className="display mt-3 text-3xl text-bone">{v.title}</h2>
              <p className="mt-3 leading-relaxed text-bone-dim">{v.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-12 max-w-2xl text-bone-dim">
          Want the details on what we fix?{" "}
          <Link href={routes.services()} className="u-ember text-bone">
            See all services
          </Link>{" "}
          or{" "}
          <Link href={routes.serviceAreas()} className="u-ember text-bone">
            check your city
          </Link>
          .
        </p>
      </section>
      <CtaBand />
    </>
  );
}
