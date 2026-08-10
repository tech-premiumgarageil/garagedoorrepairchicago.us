import Image from "next/image";
import Link from "next/link";
import { business } from "@/config/business";
import { services } from "@/data/services";
import { cities } from "@/data/cities";
import { routes } from "@/lib/routes";

/** Curated footer: top services + top cities only — not a 300-link dump. */
const topServices = services.slice(0, 6);
const topCities = cities.slice(0, 8);

export function Footer() {
  return (
    <footer className="border-t border-steel bg-charcoal-2">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <Link href={routes.home()} className="inline-flex items-center">
            <Image
              src="/logo-transparent.png"
              alt={business.name}
              width={160}
              height={160}
              className="h-16 w-auto"
            />
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-bone-dim">
            Family-owned garage door repair and installation serving Chicago
            and all of Chicagoland. {business.hoursLabel}.
          </p>
          <a
            href={business.phoneHref}
            className="display mt-4 inline-block text-2xl text-ember"
          >
            {business.phone}
          </a>
        </div>

        <nav aria-label="Footer services">
          <p className="display text-lg text-bone-dim">Services</p>
          <ul className="mt-3 space-y-2">
            {topServices.map((s) => (
              <li key={s.slug}>
                <Link
                  href={routes.service(s.slug)}
                  className="text-sm text-bone-dim transition-colors hover:text-bone"
                >
                  {s.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href={routes.services()} className="text-sm text-ember">
                All services →
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Footer service areas">
          <p className="display text-lg text-bone-dim">Service Areas</p>
          <ul className="mt-3 space-y-2">
            {topCities.map((c) => (
              <li key={c.slug}>
                <Link
                  href={routes.city(c.slug)}
                  className="text-sm text-bone-dim transition-colors hover:text-bone"
                >
                  {c.name}, IL
                </Link>
              </li>
            ))}
            <li>
              <Link href={routes.serviceAreas()} className="text-sm text-ember">
                All {cities.length} cities →
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Footer company">
          <p className="display text-lg text-bone-dim">Company</p>
          <ul className="mt-3 space-y-2">
            <li>
              <Link href={routes.booking()} className="text-sm text-bone-dim hover:text-bone">
                Book Online (save {business.onlineBookingDiscount})
              </Link>
            </li>
            <li>
              <Link href={routes.faq()} className="text-sm text-bone-dim hover:text-bone">
                FAQ
              </Link>
            </li>
            <li>
              <Link href={routes.about()} className="text-sm text-bone-dim hover:text-bone">
                About Us
              </Link>
            </li>
            <li>
              <Link href={routes.contact()} className="text-sm text-bone-dim hover:text-bone">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-steel">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-5 sm:px-6">
          <p className="text-xs text-bone-dim">
            © {new Date().getFullYear()} {business.name}. Serving Cook, DuPage,
            Will &amp; Kane Counties.
          </p>
          <p className="text-xs text-bone-dim">{business.hoursLabel}</p>
        </div>
      </div>
    </footer>
  );
}
