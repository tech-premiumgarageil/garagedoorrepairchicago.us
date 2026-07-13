import type { Metadata } from "next";
import { business } from "@/config/business";
import { absoluteUrl } from "@/lib/routes";

interface PageMeta {
  title: string;
  description: string;
  /** Route path with trailing slash, e.g. "/services/garage-door-spring-repair/" */
  path: string;
}

/**
 * Central metadata factory — every page builds its Metadata through this
 * so titles, descriptions, canonicals, and OG tags never drift.
 */
export function buildPageMetadata({ title, description, path }: PageMeta): Metadata {
  const canonical = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: business.name,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
