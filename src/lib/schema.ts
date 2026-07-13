import type {
  BreadcrumbList,
  FAQPage,
  HomeAndConstructionBusiness,
  Service as ServiceSchema,
  WebSite,
  WithContext,
} from "schema-dts";
import { business } from "@/config/business";
import { cities, type City } from "@/data/cities";
import type { Service } from "@/data/services";
import type { Faq } from "@/data/faqs";
import { absoluteUrl } from "@/lib/routes";

const BUSINESS_ID = `${business.url}/#business`;

/**
 * Sitewide LocalBusiness node, rendered once in the root layout.
 * HomeAndConstructionBusiness is the closest schema.org type for a
 * garage door repair company.
 *
 * AggregateRating / Review markup is deliberately omitted: adding
 * self-serving review schema without real, third-party-verifiable reviews
 * violates Google's structured data guidelines and risks a manual action.
 * When real Google/Yelp reviews exist, add them here.
 */
export function localBusinessSchema(): WithContext<HomeAndConstructionBusiness> {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": BUSINESS_ID,
    name: business.name,
    url: business.url,
    telephone: business.phone,
    email: business.email,
    priceRange: business.priceRange,
    image: absoluteUrl("/opengraph-image"),
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...business.hours.days],
      opens: business.hours.opens,
      closes: business.hours.closes,
    },
    areaServed: cities.map((c) => ({
      "@type": "City" as const,
      name: `${c.name}, IL`,
    })),
  };
}

export function webSiteSchema(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: business.name,
    url: business.url,
  };
}

/** Service schema for hubs (metro-wide) and spokes (single city). */
export function serviceSchema(service: Service, city?: City): WithContext<ServiceSchema> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: city
      ? service.h1Pattern.replace("{city}", city.name)
      : `${service.name} in Chicago, IL`,
    serviceType: service.name,
    description: service.blurb,
    provider: { "@id": BUSINESS_ID },
    areaServed: city
      ? { "@type": "City", name: `${city.name}, IL` }
      : { "@type": "AdministrativeArea", name: "Chicagoland, IL" },
  };
}

export function faqPageSchema(faqs: Faq[]): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question" as const,
      name: f.q,
      acceptedAnswer: { "@type": "Answer" as const, text: f.a },
    })),
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(crumbs: Crumb[]): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem" as const,
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}
