import Link from "next/link";
import { business } from "@/config/business";
import { routes } from "@/lib/routes";
import { MobileNav } from "@/components/MobileNav";

const nav = [
  { href: routes.services(), label: "Services" },
  { href: routes.serviceAreas(), label: "Service Areas" },
  { href: routes.faq(), label: "FAQ" },
  { href: routes.about(), label: "About" },
  { href: routes.contact(), label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-steel bg-charcoal/95 backdrop-blur-sm">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href={routes.home()} className="flex items-baseline gap-2">
          <span className="display text-2xl text-bone">
            Garage Door Repair
          </span>
          <span className="display text-2xl text-ember">Chicago</span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {nav.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm font-medium text-bone-dim transition-colors hover:text-bone"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={business.phoneHref}
            className="display text-xl text-bone transition-colors hover:text-ember"
          >
            {business.phone}
          </a>
          <Link
            href={routes.booking()}
            className="display bg-ember px-4 py-2 text-lg text-charcoal transition-colors hover:bg-ember-deep"
          >
            Book Online −10%
          </Link>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
