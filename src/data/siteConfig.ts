// Single source of truth for business facts used across the site.
// Every value here is traceable to "01 Facts Register.md" in the project's
// Drive folder — do not hand-edit a value here without updating that file too.

export const siteConfig = {
  businessName: "The Boiler Doctor",
  legalName: "The Boiler Doctor York Limited",
  companyNumber: "13104837",
  vatNumber: "366 8000 94",

  phoneDisplay: "01904 206190",
  phoneHref: "tel:01904206190",

  emailDisplay: "office@the-boiler-doctor.co.uk",
  emailHref: "mailto:office@the-boiler-doctor.co.uk",

  // WhatsApp number confirmed in GHL — 07414 291034. Still pending verification
  // in GHL as of the last audit (file 08) — do not surface this link publicly
  // until Steve confirms it's live and verified.
  whatsappDisplay: "07414 291034",
  whatsappNumberIntl: "447414291034",
  whatsappReady: false, // flip to true once verified + templates/flow built in GHL

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

  yearsTrading: 17,
  founded: {
    original: "Acomb Plumbing & Heating, 2013",
    rebrand: "The Boiler Doctor, 2020",
  },

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
