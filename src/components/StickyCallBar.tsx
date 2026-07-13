import Link from "next/link";
import { business } from "@/config/business";
import { routes } from "@/lib/routes";

/** Mobile-only fixed bottom bar: the two actions that matter. */
export function StickyCallBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-steel bg-charcoal-2 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href={business.phoneHref}
        className="display flex items-center justify-center gap-2 py-4 text-xl text-bone"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5 fill-ember"
        >
          <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" />
        </svg>
        Call Now
      </a>
      <Link
        href={routes.booking()}
        className="display flex items-center justify-center bg-ember py-4 text-xl text-charcoal"
      >
        Book Online −10%
      </Link>
    </div>
  );
}
