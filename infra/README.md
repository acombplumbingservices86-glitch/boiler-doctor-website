# Keeping redirects in sync with AWS Amplify

The site is served from **AWS Amplify Hosting** (Amplify app `boiler-doctor-website`,
app id `d3qbxz7y9otuc4`). Amplify has its own "Rewrites and redirects" setting —
a JSON list you edit in the AWS console — and it is **separate from this repo**.
It does not read `public/_redirects` at deploy time. Before Sep 2026 the site was
on Cloudflare Pages, which *did* read `public/_redirects` directly; that file is
kept for readability and history, but on Amplify it's just documentation unless
you also update the console.

If the two drift apart, redirects that look correct in the code quietly stop
working in production (this happened — see the git history around the
`/bathroom-renovation` and `/prices` fixes from Sep 2026, and
`the-boiler-doctor.co.uk`'s AWS Amplify migration).

## The workflow

1. Edit `public/_redirects` as normal (Cloudflare/Netlify-style syntax:
   `/source  /target  status`, one rule per line, `#` for comments).
2. Regenerate the Amplify-format mirror:

   ```
   npm run amplify:redirects
   ```

   This writes `infra/amplify-redirects.json` (Amplify's JSON format, with
   `*` wildcards converted to Amplify's `<*>` token).
3. Commit both files together.
4. **A CI check (`.github/workflows/check-amplify-redirects.yml`) will fail
   the build if `public/_redirects` changes but `infra/amplify-redirects.json`
   wasn't regenerated to match** — so step 2 can't be silently skipped.
5. Copy the full contents of `infra/amplify-redirects.json` and paste it into:

   AWS Amplify console → app `boiler-doctor-website` → **App settings → Hosting
   → Rewrites and redirects → Manage redirects** → select all → paste → **Save**.

   This last step is manual — the Amplify build container doesn't have
   permission to modify the app's own settings by default, so there's no way
   to push it automatically from a normal build step.

You can check whether the two files are currently in sync at any time with:

```
npm run amplify:redirects:check
```

## Fully automating step 5 (optional, needs your decision)

It's possible to make step 5 automatic too, by having a deploy step call the
Amplify API directly:

```
aws amplify update-app --app-id d3qbxz7y9otuc4 --custom-rules file://infra/amplify-redirects.json
```

Doing this from GitHub Actions needs an AWS IAM user or role with
`amplify:UpdateApp` permission on this one app, with its access key stored as
a GitHub Actions secret. That's a real credential with production-modifying
power, so it's a decision only you should make and set up yourself (in the
AWS IAM console + the repo's GitHub Actions secrets) — it's not something to
hand to an AI assistant. If you want this, the two pieces are: (1) an IAM
policy scoped to just `amplify:UpdateApp` on this app's ARN, and (2) a
workflow step added to a deploy job that runs the command above using that
secret. Happy to draft the exact IAM policy JSON and workflow YAML if/when
you're ready to wire it up yourself.
