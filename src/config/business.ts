/**
 * Single source of truth for business identity (NAP).
 * All placeholder values — swap here once real business details exist,
 * then rebuild. Nothing else in the codebase hardcodes NAP data.
 */
export const business = {
  name: "Garage Door Repair Chicago",
  legalName: "Garage Door Repair Chicago", // placeholder
  phone: "(312) 555-0199", // placeholder
  phoneHref: "tel:+13125550199",
  email: "info@garagedoorrepairchicago.us", // placeholder
  url: "https://garagedoorrepairchicago.us",
  address: {
    street: "123 W Madison St", // placeholder
    city: "Chicago",
    state: "IL",
    zip: "60602",
  },
  geo: { lat: 41.8781, lng: -87.6298 },
  /** 24 hours, Monday through Saturday (closed Sunday) */
  hours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "00:00",
    closes: "23:59",
  },
  hoursLabel: "Open 24 Hours · Monday–Saturday",
  yearFounded: 2008, // placeholder
  onlineBookingDiscount: "10%",
  booking: {
    containerId: "crm-form-a28r8iuno7vnms90ppu464ug",
    scriptSrc: "https://crm-form-appointment.vercel.app/embed.js",
    formId: "a28r8iuno7vnms90ppu464ug",
  },
  social: [] as string[], // GBP / Yelp / Facebook URLs when available
  priceRange: "$$",
} as const;

export type Business = typeof business;
