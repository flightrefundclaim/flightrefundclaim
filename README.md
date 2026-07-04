# FlightRefundClaim Website Workspace

This workspace contains the generated static websites and promotion files for:

- `flightrefundclaim.co.uk` - UK & EU passenger audience
- `flightrefundclaim.com` - US travellers affected by UK/EU flights

## Current Live Sites

| Domain | Netlify project | Publish folder |
| --- | --- | --- |
| `flightrefundclaim.co.uk` | `dashing-gumption-f9acdb` | `outputs/flightrefundclaim-domain-package/uk-site` |
| `flightrefundclaim.com` | `gleeful-cupcake-5438e3` | `outputs/flightrefundclaim-domain-package/us-site` |

## Important Files

- `work/build_flightrefundclaim_package.py` builds the base UK and US site folders.
- `work/generate_seo_pages.mjs` adds SEO landing pages and updates the homepage guide links/sitemaps.
- `outputs/flightrefundclaim-domain-package/uk-site/` is the deployable UK/EU site.
- `outputs/flightrefundclaim-domain-package/us-site/` is the deployable US site.
- `outputs/flightrefundclaim-uk-site.zip` and `outputs/flightrefundclaim-us-site.zip` are manual upload packages.
- `outputs/seo-page-promotion-map-2026-07-05.csv` maps social post topics to the best landing page.

## Build Order

Run the base package first, then SEO pages:

```bash
/Users/pawelwydmuch/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 work/build_flightrefundclaim_package.py
/Users/pawelwydmuch/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node work/generate_seo_pages.mjs
```

Then refresh the manual upload zips from each deploy folder.

## Recommended GitHub + Netlify Setup

Use one GitHub repository for this workspace and connect both Netlify projects to it.

Recommended Netlify settings:

- UK project publish directory: `outputs/flightrefundclaim-domain-package/uk-site`
- US project publish directory: `outputs/flightrefundclaim-domain-package/us-site`
- Build command: leave empty if committing generated files directly

This makes future edits easier because a GitHub commit can update the live sites through Netlify instead of requiring manual ZIP uploads.
