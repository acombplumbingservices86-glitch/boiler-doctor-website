import { defineConfig } from 'astro/config';

// The Boiler Doctor — production site config
// Deployed to AWS Amplify Hosting (migrated from Cloudflare Pages, Sep 2026).
// NOTE: Amplify's own "Rewrites and redirects" console setting is what actually
// serves redirects in production — it does NOT read public/_redirects at deploy
// time. See infra/README.md for how the two are kept in sync.
// site URL updated once the real domain is confirmed for launch/staging.
export default defineConfig({
  site: 'https://www.the-boiler-doctor.co.uk',
  output: 'static',
  build: {
    format: 'directory',
  },
  compressHTML: true,
});
