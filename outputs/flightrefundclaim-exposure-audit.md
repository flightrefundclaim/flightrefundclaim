# FlightRefundClaim Exposure And Quality Audit

Date: 2026-07-03

Domains checked:

- https://flightrefundclaim.co.uk/
- https://www.flightrefundclaim.co.uk/
- https://flightrefundclaim.com/
- https://www.flightrefundclaim.com/

## Quick Findings

1. The .co.uk site is live. `www.flightrefundclaim.co.uk` redirects to `https://flightrefundclaim.co.uk/`, then returns HTTP 200.
2. The .com domain returns HTTP 200 with the same HTML as the .co.uk site. Because you want `.com` for US travellers and `.co.uk` for UK users, do not redirect `.com` into `.co.uk`. Instead, publish a separate `.com` page with US-traveller copy, its own canonical tag, and its own sitemap.
3. The `.co.uk` page has a canonical tag pointing to `https://flightrefundclaim.co.uk`, which is good. The `.com` page should have its own canonical tag pointing to `https://flightrefundclaim.com/`.
4. `/robots.txt` returns a Netlify 404 page. Add a simple robots file.
5. `/sitemap.xml` returns a Netlify 404 page. Add a sitemap.
6. The Open Graph image referenced by the page, `https://flightrefundclaim.co.uk/og-image.png`, returns 404. This weakens sharing on Facebook, WhatsApp, LinkedIn, and X.
7. The homepage has a solid core offer: no win no fee, UK261/EC261, free eligibility check, GBP/EUR/USD framing, WhatsApp, and lead form.
8. The site is currently a single-page site. For SEO growth, it needs separate crawlable pages targeting specific search intent.
9. The form currently shows success even if the webhook request fails. This risks lost claims while the user thinks the claim was submitted.
10. Google Analytics and Meta Pixel are present, but the cookie/consent setup should be tightened so non-essential tracking does not run before consent.

## Priority Fixes

### 1. Keep The Two Domains Separate

Recommendation: use `https://flightrefundclaim.co.uk/` for UK/EU passenger claims and `https://flightrefundclaim.com/` for US travellers affected by UK/EU flight disruption.

Redirect only host variants within each domain:

- `https://www.flightrefundclaim.co.uk/*`
- `http://flightrefundclaim.co.uk/*`
- `http://www.flightrefundclaim.co.uk/*`
- `https://www.flightrefundclaim.com/*`
- `http://flightrefundclaim.com/*`
- `http://www.flightrefundclaim.com/*`

Use the separate package in `outputs/flightrefundclaim-domain-package/`: deploy `uk-site/` to `.co.uk` and `us-site/` to `.com`.

### 2. Add Crawl Files

Add:

- `robots.txt`
- `sitemap.xml`

Files are included in this output folder.

After deployment, submit the sitemap in Google Search Console and Bing Webmaster Tools.

### 3. Fix Social Sharing Image

Create and upload:

- `/og-image.png`
- Recommended size: 1200 x 630 px
- Text: "Delayed Flight? Claim up to GBP 520 / EUR 600"
- Include brand name, aircraft/airport visual, no tiny text

Then verify the preview using:

- Facebook Sharing Debugger
- LinkedIn Post Inspector
- X Card Validator

### 4. Build SEO Landing Pages

Create separate pages instead of relying only on homepage sections:

- `/flight-delay-compensation/`
- `/cancelled-flight-compensation/`
- `/denied-boarding-compensation/`
- `/missed-connection-compensation/`
- `/uk261-compensation/`
- `/ec261-compensation/`
- `/ryanair-delay-compensation/`
- `/easyjet-delay-compensation/`
- `/wizz-air-delay-compensation/`
- `/british-airways-delay-compensation/`
- `/gatwick-flight-delay-compensation/`
- `/heathrow-flight-delay-compensation/`
- `/stansted-flight-delay-compensation/`
- `/luton-flight-delay-compensation/`

Each page should have:

- One clear H1
- 700-1,200 words of useful, specific content
- Eligibility explanation
- Compensation table
- Examples
- FAQ section
- CTA to the claim checker
- Internal links to related pages
- Schema: FAQPage where appropriate

### 5. Strengthen Trust Signals

Add a visible "About / Trust" section or page with:

- Who operates FlightRefundClaim
- Registered business name
- Company number or sole trader details, if applicable
- Registered address or service address
- Data controller details
- Complaints process
- Clear statement that you are not a law firm
- Exact success fee, VAT treatment, and when it is charged
- Whether compensation is received by you first or directly by the customer
- How customer documents and signatures are stored

Avoid unverifiable testimonials. If reviews are real, link them to the review platform or add dates and permission-backed details.

### 6. Improve Conversion Tracking

Track these events in GA4 and Meta:

- `claim_checker_start`
- `eligibility_step_completed`
- `eligible_result`
- `not_eligible_result`
- `claim_submit_attempt`
- `claim_submit_success`
- `claim_submit_error`
- `contact_submit_success`
- `whatsapp_click`
- `phone_click`

Capture and pass through:

- UTM source, medium, campaign, term, content
- Landing page URL
- Referrer
- Consent state
- Claim reference

Important: only show "Claim Submitted" after the webhook confirms success. If it fails, show a friendly retry message and preserve the user's entered data.

### 7. Fix Cookie Consent

Recommended:

- Set Google Consent Mode default to denied before loading analytics.
- Do not fire Meta Pixel until consent is accepted.
- Add "Manage preferences" after acceptance/decline.
- List Google Analytics and Meta Pixel in the privacy/cookie notice.
- Keep a record of consent state and date.

### 8. Promotion Plan

Search ads:

- Start with exact and phrase match high-intent keywords.
- Build campaigns around delay, cancellation, denied boarding, and airline-specific terms.
- Use landing pages by intent, not only the homepage.
- Add negative keywords such as "free template", "jobs", "regulation text", "customer service number", "baggage", "seat refund".

Useful ad groups:

- delayed flight compensation uk
- claim flight delay compensation
- cancelled flight compensation
- uk261 claim
- ec261 claim
- ryanair delay compensation
- easyjet compensation claim
- wizz air compensation
- british airways compensation

Social:

- Use short real-world scenarios: "Delayed 4 hours from Gatwick?", "Cancelled less than 14 days before travel?", "Airline blamed weather?"
- Run retargeting for claim-checker starters who did not submit.
- Use WhatsApp click campaigns for people who prefer messaging before submitting documents.

Partnerships:

- Travel agents
- Airport transfer companies
- Expat groups
- Polish and Filipino community groups in the UK
- Student travel groups
- Travel bloggers
- Local Facebook groups around UK airports

Content:

- Publish simple guides after major disruption news.
- Create airline-specific explainers.
- Create airport-specific pages.
- Build a downloadable "What to save when your flight is delayed" checklist.

## 30-Day Action Plan

Week 1:

- Deploy redirects, robots.txt, sitemap.xml, and og-image.png.
- Set up Google Search Console and Bing Webmaster Tools.
- Fix form submission success/error handling.
- Fix consent mode before running paid ads.

Week 2:

- Publish 4 pages: flight delay, cancellation, UK261, EC261.
- Add FAQ schema and better organization/legal schema.
- Add About/Trust page.

Week 3:

- Publish 4 airline pages: Ryanair, easyJet, Wizz Air, British Airways.
- Launch small Google Ads test.
- Create retargeting audiences.

Week 4:

- Publish 4 airport pages.
- Start partner outreach.
- Review Search Console impressions, ad conversion cost, and form completion rate.

## Recommended KPIs

- Indexed pages
- Organic impressions
- Organic clicks
- Claim checker start rate
- Claim submission rate
- Webhook failure rate
- Cost per submitted claim
- Cost per qualified claim
- WhatsApp click to claim rate
- Form abandonment by step
