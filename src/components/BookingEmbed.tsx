"use client";

import { useEffect, useRef } from "react";
import { business } from "@/config/business";

/**
 * Third-party CRM booking widget (FormBook).
 *
 * The vendor's embed.js locates its target with `script.previousElementSibling`
 * and requires that sibling to be a div WITH an id — it then appends the form
 * iframe into it. Next.js's <Script> component hoists the tag away from where
 * it's written (to <head>/end of <body>), so the container is never the
 * script's previous sibling and the form gets injected detached at the bottom
 * of the page. To satisfy the vendor contract we build the container + script
 * as adjacent siblings by hand, on mount, so the script only loads on this
 * route (protecting Core Web Vitals elsewhere). The reserved min-height limits
 * layout shift while the iframe loads.
 */
export function BookingEmbed() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || mount.dataset.loaded) return;
    mount.dataset.loaded = "true";

    const container = document.createElement("div");
    container.id = business.booking.containerId;
    mount.appendChild(container);

    const script = document.createElement("script");
    script.src = business.booking.scriptSrc;
    script.async = true;
    script.setAttribute("data-form-id", business.booking.formId);
    // Appended after the container so embed.js sees it as previousElementSibling.
    mount.appendChild(script);
  }, []);

  return (
    <div
      ref={mountRef}
      className="border border-steel bg-bone p-2"
      style={{ minHeight: 720 }}
    />
  );
}
