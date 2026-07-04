# FlightRefundClaim Separate Domain Package

Use this package to keep the UK and US-facing domains separate without creating duplicate SEO signals.

Recommended deployment:

1. Deploy `uk-site/` to the Netlify site connected to `flightrefundclaim.co.uk`.
2. Deploy `us-site/` to a separate Netlify site connected to `flightrefundclaim.com`.
3. Submit each sitemap in Google Search Console:
   - `https://flightrefundclaim.co.uk/sitemap.xml`
   - `https://flightrefundclaim.com/sitemap.xml`
4. Verify that each homepage shows its own canonical tag.
5. Use the promotion files in `promotion/` for SEO pages, Google Ads, and trust-building copy.

If both domains stay attached to the same Netlify site, they will keep sharing the same HTML unless you add host-based rewrites or split the deploys.
