import type { Metadata } from "next";
import { business } from "@/config/business";
import { routes } from "@/lib/routes";
import { buildPageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionTag } from "@/components/Sections";
import { BookingEmbed } from "@/components/BookingEmbed";

export const metadata: Metadata = buildPageMetadata({
  title: "Book Garage Door Service Online — Save 10% | Chicago",
  description:
    "Pick your own appointment slot on our visual calendar and save 10% automatically. Same-day garage door repair across Chicago & Chicagoland, 24h Mon–Sat.",
  path: routes.booking(),
});

export default function BookingPage() {
  return (
    <>
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: routes.home() },
          { name: "Book Online", path: routes.booking() },
        ]}
      />
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6">
        <SectionTag>No phone tag</SectionTag>
        <h1 className="display mt-3 max-w-3xl text-6xl text-bone sm:text-7xl">
          Book online. <span className="text-ember">Save 10%.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-bone-dim">
          Pick the exact slot that fits your day on the visual calendar below —
          the {business.onlineBookingDiscount} discount is applied automatically
          to every online booking. Prefer to talk?{" "}
          <a href={business.phoneHref} className="u-ember text-bone">
            Call {business.phone}
          </a>{" "}
          any hour, Monday–Saturday.
        </p>
        <div className="mt-12 max-w-4xl">
          <BookingEmbed />
        </div>
      </section>
    </>
  );
}
