import type { APIRoute } from "astro";

// Static XML sitemap for the 21 core pages. Kept as a hand-built route rather
// than @astrojs/sitemap for now, since the whole site is small and static —
// swap to the official integration if/when the Advice Centre articles grow
// this past a size where hand-maintaining it stops making sense.
const pages = [
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
  "/service-areas/",
  "/book-online/",
  "/contact/",
  "/privacy-policy/",
  "/terms-conditions/",
  "/accessibility/",
];

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
