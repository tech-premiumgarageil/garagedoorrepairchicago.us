import Link from "next/link";
import { business } from "@/config/business";
import { services } from "@/data/services";
import { routes } from "@/lib/routes";

export default function NotFound() {
  return (
    <section className="blueprint-faint">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <p className="index-num text-8xl">404</p>
        <h1 className="display mt-4 max-w-2xl text-6xl text-bone">
          This door won&apos;t open — <span className="text-ember">but yours will.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-bone-dim">
          The page you&apos;re looking for doesn&apos;t exist. If your garage
          door is the real problem, we can fix that today.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={business.phoneHref}
            className="display bg-ember px-6 py-4 text-center text-2xl text-charcoal hover:bg-ember-deep"
          >
            Call {business.phone}
          </a>
          <Link
            href={routes.home()}
            className="display border border-bone px-6 py-4 text-center text-2xl text-bone hover:border-ember hover:text-ember"
          >
            Back Home
          </Link>
        </div>
        <div className="mt-14">
          <p className="display text-lg text-bone-dim">Popular services</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link
                  href={routes.service(s.slug)}
                  className="display inline-block border border-steel px-4 py-2 text-lg text-bone hover:text-ember"
                >
                  {s.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
