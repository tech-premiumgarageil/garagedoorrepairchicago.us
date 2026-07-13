import type { Metadata } from "next";
import { faqs } from "@/data/faqs";
import { routes } from "@/lib/routes";
import { buildPageMetadata } from "@/lib/seo";
import { faqPageSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionTag, CtaBand, FaqAccordion } from "@/components/Sections";

export const metadata: Metadata = buildPageMetadata({
  title: "Garage Door Repair FAQ | Chicago & Chicagoland",
  description:
    "Answers about emergency garage door service, spring and opener repair, online booking discounts, commercial doors, and our Chicagoland service area.",
  path: routes.faq(),
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqPageSchema([...faqs])} />
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: routes.home() },
          { name: "FAQ", path: routes.faq() },
        ]}
      />
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6">
        <SectionTag>Straight answers</SectionTag>
        <h1 className="display mt-3 max-w-3xl text-6xl text-bone sm:text-7xl">
          Frequently Asked <span className="text-ember">Questions</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-bone-dim">
          Everything Chicagoland homeowners and businesses ask us most — from
          emergency dispatch to online booking discounts.
        </p>
        <div className="mt-12 max-w-4xl">
          <FaqAccordion faqs={[...faqs]} />
        </div>
      </section>
      <CtaBand line="Still have a question? A live dispatcher has the answer." />
    </>
  );
}
