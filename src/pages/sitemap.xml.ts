import type { APIRoute } from "astro";
import { siteConfig } from "../data/siteConfig";

// Static XML sitemap for the site's pages. Kept as a hand-built route rather
// than @astrojs/sitemap for now, since the whole site is small and static —
// swap to the official integration if/when the Advice Centre articles grow
// this past a size where hand-maintaining it stops making sense.
const areaSlugs = siteConfig.serviceAreas.map((a) => a.toLowerCase());

const staticPages = [
  "/",
  "/about/",
  "/boiler-repairs-breakdowns/",
  "/boiler-servicing/",
  "/new-boiler-installation/",
  "/boiler-care-plans/",
  "/air-conditioning/",
  "/central-heating-radiators/",
  "/power-flushing/",
  "/controls-smart-thermostats/",
  "/gas-safety-landlords/",
  "/reviews/",
  "/real-work/",
  "/advice-centre/",
  "/advice-centre/new-boiler-cost/",
  "/advice-centre/combi-vs-system-boiler/",
  "/advice-centre/why-is-my-boiler-losing-pressure/",
  "/advice-centre/do-i-need-annual-service/",
  "/advice-centre/cp12-landlord-certificate/",
  "/advice-centre/signs-you-need-power-flush/",
  "/service-areas/",
  "/book-online/",
  "/contact/",
  "/privacy-policy/",
  "/terms-conditions/",
  "/accessibility/",
  "/guides/boiler-price-estimate/",
  "/guides/emergency-boiler-checklist/",
  "/guides/service-reminder/",
  "/guides/ac-sizing-guide/",
  "/guides/ac-business-health-check/",
  "/guides/cp12-reminder/",
];

const areaPages = areaSlugs.flatMap((slug) => [
  `/new-boiler-installation-${slug}/`,
  `/boiler-repairs-${slug}/`,
  `/boiler-servicing-${slug}/`,
  `/air-conditioning-domestic-${slug}/`,
  `/air-conditioning-split-systems-${slug}/`,
  `/air-conditioning-commercial-${slug}/`,
  `/advice-centre/boiler-advice-${slug}/`,
  `/advice-centre/air-conditioning-advice-${slug}/`,
]);

const pages = [...staticPages, ...areaPages];

export const GET: APIRoute = ({ site }) => {
  const base = site?.toString().replace(/\/$/, "") ?? "https://www.the-boiler-doctor.co.uk";
  const urls = pages
    .map((path) => `  <url><loc>${base}${path}</loc></url>`)
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
};
