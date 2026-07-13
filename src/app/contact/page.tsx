import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/config/business";
import { routes } from "@/lib/routes";
import { buildPageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionTag } from "@/components/Sections";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Us | Garage Door Repair Chicago",
  description:
    "Reach our live dispatch 24 hours a day, Monday–Saturday. Call, email, or book your garage door service online and save 10% — Chicago & all suburbs.",
  path: routes.contact(),
});

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: routes.home() },
          { name: "Contact", path: routes.contact() },
        ]}
      />
      <section className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6">
        <SectionTag>Talk to a human</SectionTag>
        <h1 className="display mt-3 max-w-3xl text-6xl text-bone sm:text-7xl">
          Live dispatch, <span className="text-ember">24 hours</span>,
          Mon–Sat
        </h1>

        <div className="mt-12 grid gap-px bg-steel md:grid-cols-3">
          <a href={business.phoneHref} className="lift group border border-transparent bg-charcoal p-8">
            <p className="display text-lg text-bone-dim">Call or text</p>
            <p className="display mt-2 text-4xl text-bone group-hover:text-ember">
              {business.phone}
            </p>
            <p className="mt-3 text-sm text-bone-dim">
              Fastest for emergencies — a dispatcher answers around the clock,
              Monday through Saturday.
            </p>
          </a>
          <Link href={routes.booking()} className="lift group border border-transparent bg-charcoal p-8">
            <p className="display text-lg text-bone-dim">Book online</p>
            <p className="display mt-2 text-4xl text-bone group-hover:text-ember">
              Save {business.onlineBookingDiscount}
            </p>
            <p className="mt-3 text-sm text-bone-dim">
              Pick your slot on the visual calendar — the discount applies
              automatically.
            </p>
          </Link>
          <a href={`mailto:${business.email}`} className="lift group border border-transparent bg-charcoal p-8">
            <p className="display text-lg text-bone-dim">Email</p>
            <p className="display mt-2 break-all text-2xl text-bone group-hover:text-ember">
              {business.email}
            </p>
            <p className="mt-3 text-sm text-bone-dim">
              Good for photos of the damage, estimate requests, and commercial
              inquiries.
            </p>
          </a>
        </div>

        <div className="mt-12 border border-steel bg-charcoal-2 p-8">
          <p className="display text-2xl text-bone">Service area</p>
          <p className="mt-3 max-w-2xl leading-relaxed text-bone-dim">
            Chicago and {`all of Chicagoland`} — including Naperville,
            Schaumburg, Joliet, Orland Park, Evanston, and communities
            throughout Cook, DuPage, Will, and Kane counties.{" "}
            <Link href={routes.serviceAreas()} className="u-ember text-bone">
              Find your city
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
