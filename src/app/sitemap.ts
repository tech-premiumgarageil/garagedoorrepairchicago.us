import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { cities } from "@/data/cities";
import { routes, absoluteUrl } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const statics: MetadataRoute.Sitemap = [
    { url: absoluteUrl(routes.home()), lastModified: now, priority: 1.0 },
    { url: absoluteUrl(routes.services()), lastModified: now, priority: 0.9 },
    { url: absoluteUrl(routes.serviceAreas()), lastModified: now, priority: 0.8 },
    { url: absoluteUrl(routes.booking()), lastModified: now, priority: 0.9 },
    { url: absoluteUrl(routes.faq()), lastModified: now, priority: 0.7 },
    { url: absoluteUrl(routes.about()), lastModified: now, priority: 0.6 },
    { url: absoluteUrl(routes.contact()), lastModified: now, priority: 0.6 },
  ];

  const serviceHubs: MetadataRoute.Sitemap = services.map((s) => ({
    url: absoluteUrl(routes.service(s.slug)),
    lastModified: now,
    priority: 0.9,
  }));

  const cityHubs: MetadataRoute.Sitemap = cities.map((c) => ({
    url: absoluteUrl(routes.city(c.slug)),
    lastModified: now,
    priority: 0.8,
  }));

  const spokes: MetadataRoute.Sitemap = services.flatMap((s) =>
    cities.map((c) => ({
      url: absoluteUrl(routes.spoke(s.slug, c.slug)),
      lastModified: now,
      priority: 0.7,
    })),
  );

  return [...statics, ...serviceHubs, ...cityHubs, ...spokes];
}
