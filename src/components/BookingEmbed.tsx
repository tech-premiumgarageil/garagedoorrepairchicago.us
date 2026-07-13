import Script from "next/script";
import { business } from "@/config/business";

/**
 * Third-party CRM booking widget. Rendered ONLY on /booking so the external
 * script never affects Core Web Vitals on content pages. The min-height
 * reserves space to limit CLS while the widget hydrates.
 */
export function BookingEmbed() {
  return (
    <div className="border border-steel bg-bone p-2" style={{ minHeight: 720 }}>
      <div id={business.booking.containerId} />
      <Script
        src={business.booking.scriptSrc}
        data-form-id={business.booking.formId}
        strategy="afterInteractive"
      />
    </div>
  );
}
