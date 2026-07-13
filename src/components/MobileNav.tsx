"use client";

import { useState } from "react";
import Link from "next/link";
import { business } from "@/config/business";
import { routes } from "@/lib/routes";

const links = [
  { href: routes.services(), label: "Services" },
  { href: routes.serviceAreas(), label: "Service Areas" },
  { href: routes.faq(), label: "FAQ" },
  { href: routes.about(), label: "About" },
  { href: routes.contact(), label: "Contact" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
        className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 border border-steel"
      >
        <span
          className={`block h-0.5 w-5 bg-bone transition-transform ${open ? "translate-y-1 rotate-45" : ""}`}
        />
        <span
          className={`block h-0.5 w-5 bg-bone transition-transform ${open ? "-translate-y-1 -rotate-45" : ""}`}
        />
      </button>
      {open && (
        <nav
          aria-label="Mobile"
          className="absolute left-0 right-0 top-full border-b border-steel bg-charcoal-2 px-6 pb-8 pt-4"
        >
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="display block py-3 text-3xl text-bone hover:text-ember"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="mt-4">
              <a
                href={business.phoneHref}
                className="display block bg-ember px-5 py-4 text-center text-2xl text-charcoal"
              >
                Call {business.phone}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
