// Single source of truth for business facts used across the site.
// Every value here is traceable to "01 Facts Register.md" in the project's
// Drive folder — do not hand-edit a value here without updating that file too.

export const siteConfig = {
  businessName: "The Boiler Doctor",
  gaMeasurementId: "G-SHP5WPXQ3E", // GA4 property, added 2026-08-29

  // Lead-magnet form submissions POST here as JSON. Empty until Steve wires
  // up a GHL inbound webhook (or a 2-minute Zapier "Catch Hook" as a
  // stopgap) — until then, the forms still work and show a result, they
  // just aren't captured anywhere. Fill in and every lead-magnet page picks
  // it up automatically, no other changes needed.
  leadWebhookUrl: "",
  legalName: "The Boiler Doctor York Limited",
  companyNumber: "13104837",
  vatNumber: "366 8000 94",

  phoneDisplay: "01904 206190",
  phoneHref: "tel:01904206190",

  emailDisplay: "office@the-boiler-doctor.co.uk",
  emailHref: "mailto:office@the-boiler-doctor.co.uk",

  // WhatsApp number confirmed in GHL — 07414 291034. Verified and connected
  // in GHL as of 30 Aug 2026 (Steve completed the number verification himself).
  // Open to all visitors, not gated to Care Plan members.
  whatsappDisplay: "07414 291034",
  whatsappNumberIntl: "447414291034",
  whatsappReady: true,

  address: {
    line1: "2 Sanderson Court",
    line2: "Chapelfields, Acomb",
    city: "York",
    postcode: "YO26 5DX",
    // Home + business address — legal/footer only, never a hero/trust element (Steve's instruction)
  },

  reviews: {
    rating: 5.0,
    count: 384,
    // Pull fresh again right before launch — this figure moves daily.
    asOf: "2026-08-28",
  },

  yearsTrading: 18, // Steve started plumbing in 2008 — confirmed directly by Steve, 29 Aug 2026
  founded: {
    original: "Acomb Plumbing & Heating, 2013",
    rebrand: "The Boiler Doctor, 2020",
  },

  gasSafeNumber: "570248",
  // F-Gas: Steve is F-Gas registered, but the number is deliberately NEVER shown publicly —
  // publishing it would let someone else use it to order restricted refrigerant units in his
  // name. Show the "F-Gas registered" badge/claim only. Do not add a number field for this.

  acBrands: ["Bosch", "Daikin", "Haier"],

  thermostatBrand: "Hive",
  standardControlsBrand: "EPH", // fitted as standard — time/temperature control with a remote stat, not "smart" but a solid standard option

  officeHours: "8:00am – 5:00pm", // confirmed directly by Steve, 29 Aug

  minCallOutFee: "£100 + VAT",
  warranty: "12 months from invoice date",

  socials: {
    facebook: "https://www.facebook.com/theboilerdoctor.york",
    youtube: "https://www.youtube.com/channel/UC0wXZNqGd02o_QrISh7Ot3g",
  },

  bookingUrl:
    "https://book.servicem8.com/request_service_online_booking?strVendorUUID=507d1fa8-ca7a-4df9-834f-1dfacd6e748b",

  serviceAreas: [
    "Acomb", "Bishopthorpe", "Clifton", "Copmanthorpe", "Dringhouses", "Fulford",
    "Haxby", "Holgate", "Huntington", "Knapton", "Poppleton", "Rawcliffe",
    "Rufforth", "Selby", "Skelton", "Strensall", "Tockwith", "Wigginton",
    "Woodthorpe", "York",
  ],
} as const;

export type ServiceNavItem = { label: string; href: string };

export const primaryNav: ServiceNavItem[] = [
  { label: "Boiler Repairs", href: "/boiler-repairs-breakdowns/" },
  { label: "Boiler Servicing", href: "/boiler-servicing/" },
  { label: "New Boilers", href: "/new-boiler-installation/" },
  { label: "Care Plans", href: "/boiler-care-plans/" },
  { label: "Air Conditioning", href: "/air-conditioning/" },
  { label: "Reviews", href: "/reviews/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

export const serviceTiles = [
  { label: "Boiler Repairs & Breakdowns", href: "/boiler-repairs-breakdowns/", blurb: "Fast, honest fixes when your heating packs in." },
  { label: "Boiler Servicing", href: "/boiler-servicing/", blurb: "Annual servicing to protect your warranty and stay safe." },
  { label: "New Boiler Installation", href: "/new-boiler-installation/", blurb: "Worcester Bosch and Ideal accredited installs." },
  { label: "Air Conditioning", href: "/air-conditioning/", blurb: "Domestic AC installed and serviced properly." },
  { label: "Central Heating & Radiators", href: "/central-heating-radiators/", blurb: "From a single cold radiator to a full upgrade." },
  { label: "Boiler Care Plans", href: "/boiler-care-plans/", blurb: "Cover from £12.99/month, never get caught out." },
];
