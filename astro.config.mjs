import { defineConfig } from 'astro/config';

// The Boiler Doctor — production site config
// Deployed to Cloudflare Pages (see file 10, Phase Two decision).
// site URL updated once the real domain is confirmed for launch/staging.
export default defineConfig({
  site: 'https://www.the-boiler-doctor.co.uk',
  output: 'static',
  build: {
    format: 'directory',
  },
  compressHTML: true,
});
