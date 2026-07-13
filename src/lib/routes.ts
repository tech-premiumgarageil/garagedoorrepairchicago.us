import { business } from "@/config/business";

/** Canonical URL builders — every internal link and canonical goes through these. */
export const routes = {
  home: () => "/",
  services: () => "/services/",
  service: (service: string) => `/services/${service}/`,
  spoke: (service: string, city: string) => `/services/${service}/${city}/`,
  serviceAreas: () => "/service-areas/",
  city: (city: string) => `/service-areas/${city}/`,
  booking: () => "/booking/",
  faq: () => "/faq/",
  about: () => "/about/",
  contact: () => "/contact/",
} as const;

export const absoluteUrl = (path: string): string =>
  new URL(path, business.url).toString();
