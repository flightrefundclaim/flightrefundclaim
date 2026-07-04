# GitHub + Netlify Setup Next Step

## Why This Matters

Right now, deployment still depends on manual ZIP uploads. A GitHub + Netlify workflow would let future website improvements move like this:

1. Update website files.
2. Commit to GitHub.
3. Netlify deploys the UK and US sites automatically.
4. Search Console/Analytics checks continue from the weekly scheduled task.

## Netlify Projects Already Identified

- UK / EU site:
  - Netlify project: `dashing-gumption-f9acdb`
  - Live domain: `https://flightrefundclaim.co.uk`
  - Publish folder: `outputs/flightrefundclaim-domain-package/uk-site`

- US site:
  - Netlify project: `gleeful-cupcake-5438e3`
  - Live domain: `https://flightrefundclaim.com`
  - Publish folder: `outputs/flightrefundclaim-domain-package/us-site`

## Recommended Setup

Create one GitHub repository for this workspace, for example:

- `flightrefundclaim-website`

Then connect both Netlify projects to the same repository, with different publish folders:

- `.co.uk`: `outputs/flightrefundclaim-domain-package/uk-site`
- `.com`: `outputs/flightrefundclaim-domain-package/us-site`

For now, use no build command and commit the generated static files. That is simpler and safer than relying on Netlify to reproduce the local generator environment.

## Useful Command-Line/API Options For Later

- Google Analytics can be automated through the official Google Analytics Data API.
- Search Console can be automated through the official Search Console API, including sitemap and URL inspection reads.
- Meta/Facebook can be automated through Meta APIs, but permissions are usually more restrictive and may require app review or business tokens.

The easiest immediate automation win is GitHub + Netlify deployment. Analytics/Search Console command-line reporting can come after the Google API authentication is set up properly.
