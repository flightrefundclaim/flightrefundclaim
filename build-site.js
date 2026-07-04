const fs = require('fs');
const path = require('path');

const siteKey = (process.env.SITE || 'uk').toLowerCase();
const isUs = siteKey === 'us';

const site = isUs ? {
  key: 'us',
  lang: 'en-US',
  base: 'https://flightrefundclaim.com',
  badge: 'US travellers on UK and EU flights',
  title: 'Flight Compensation for Americans in Europe | FlightRefundClaim',
  desc: 'US travellers delayed or cancelled on UK and EU flights may be owed compensation under EC261 or UK261. Free eligibility check. No win, no fee.',
  h1: 'US Traveller? Claim UK and EU Flight Compensation',
  lead: 'If your Europe flight was delayed, cancelled, overbooked, or missed through airline disruption, you may be owed up to about $650 per passenger.',
  amount: 'Up to about $650',
  area: ['US', 'GB', 'EU'],
  other: 'https://flightrefundclaim.co.uk/',
  guides: [
    ['eu261-compensation-for-us-passengers', 'EU261 Compensation For US Passengers', 'US passengers can be covered by EU261 when the flight route is protected.'],
    ['delayed-flight-from-europe-to-usa', 'Delayed Flight From Europe To USA', 'Check compensation for late arrivals from Europe to America.'],
    ['london-to-new-york-flight-delay-compensation', 'London To New York Flight Delay Compensation', 'A popular route where UK261 or EC261 may apply.'],
    ['british-airways-compensation-for-us-passengers', 'British Airways Compensation For US Passengers', 'Claim support for BA disruption affecting US travellers.'],
    ['virgin-atlantic-uk-flight-delay-compensation', 'Virgin Atlantic UK Flight Delay Compensation', 'Check delayed or cancelled Virgin Atlantic flights.'],
    ['delta-eu-flight-delay-compensation', 'Delta EU Flight Delay Compensation', 'US airlines can still be covered on departures from Europe.'],
    ['united-eu-flight-delay-compensation', 'United EU Flight Delay Compensation', 'Check if your United Europe route qualifies.'],
    ['american-airlines-eu-flight-delay', 'American Airlines EU Flight Delay', 'Passenger rights may apply when departing the EU or UK.'],
    ['paris-to-usa-flight-delay-compensation', 'Paris To USA Flight Delay Compensation', 'Flights from Paris to America can be protected by EU261.'],
    ['amsterdam-to-usa-flight-delay-compensation', 'Amsterdam To USA Flight Delay Compensation', 'Check Amsterdam to USA delay and cancellation claims.'],
    ['rome-to-usa-flight-delay-compensation', 'Rome To USA Flight Delay Compensation', 'Italy to USA flights may qualify under EU261.']
  ]
} : {
  key: 'uk',
  lang: 'en-GB',
  base: 'https://flightrefundclaim.co.uk',
  badge: 'UK and EU flight claims',
  title: 'Flight Compensation UK and EU | FlightRefundClaim',
  desc: 'Claim compensation for delayed, cancelled, overbooked, or missed UK and EU flights. Free eligibility check. No win, no fee.',
  h1: 'Flight Compensation For UK and EU Passengers',
  lead: 'Delayed, cancelled, overbooked, or missed a connection? Check if you can claim under UK261 or EC261 with no upfront cost.',
  amount: 'Up to GBP520 / EUR600',
  area: ['GB', 'EU'],
  other: 'https://flightrefundclaim.com/',
  guides: [
    ['flight-delay-compensation-uk', 'Flight Delay Compensation UK', 'Claim for UK flight delays arriving 3 hours late or more.'],
    ['eu261-compensation-claim', 'EU261 Compensation Claim', 'Passenger rights for EU flight delays, cancellations and denied boarding.'],
    ['uk261-compensation-claim', 'UK261 Compensation Claim', 'UK passenger rights after Brexit explained clearly.'],
    ['british-airways-flight-delay-compensation', 'British Airways Flight Delay Compensation', 'Check BA disruption claims.'],
    ['easyjet-flight-delay-compensation', 'easyJet Flight Delay Compensation', 'Claim support for easyJet delays and cancellations.'],
    ['ryanair-flight-delay-compensation', 'Ryanair Flight Delay Compensation', 'Check Ryanair passenger rights.'],
    ['wizz-air-flight-delay-compensation', 'Wizz Air Flight Delay Compensation', 'Claim support for Wizz Air disruption.'],
    ['jet2-flight-delay-compensation', 'Jet2 Flight Delay Compensation', 'Check Jet2 delays and cancellations.'],
    ['tui-flight-delay-compensation', 'TUI Flight Delay Compensation', 'Holiday flight disruption claims.'],
    ['heathrow-flight-delay-compensation', 'Heathrow Flight Delay Compensation', 'Claims for flights from or to Heathrow.'],
    ['gatwick-flight-delay-compensation', 'Gatwick Flight Delay Compensation', 'Claims for Gatwick disruption.'],
    ['stansted-flight-delay-compensation', 'Stansted Flight Delay Compensation', 'Claims for Stansted flight problems.'],
    ['manchester-flight-delay-compensation', 'Manchester Flight Delay Compensation', 'Claims for Manchester Airport disruption.']
  ]
};

const dist = path.join(__dirname, 'dist');
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

const css = `
:root{--ink:#101827;--muted:#64748b;--line:#e5e7eb;--gold:#d4af37;--gold2:#b49138;--soft:#f8fafc;--dark:#0f172a}
*{box-sizing:border-box}body{margin:0;font-family:Inter,Arial,sans-serif;color:var(--ink);line-height:1.65;background:white}a{color:inherit}
.nav{position:sticky;top:0;z-index:20;background:rgba(255,255,255,.94);backdrop-filter:blur(14px);border-bottom:1px solid var(--line);display:flex;justify-content:space-between;align-items:center;padding:14px 38px}
.logo{font-family:Georgia,serif;font-size:25px;font-weight:700;text-decoration:none}.logo span{color:var(--gold)}
.links{display:flex;gap:24px;align-items:center}.links a{font-weight:700;font-size:14px;color:var(--muted);text-decoration:none}.pill{background:var(--gold);color:white!important;border-radius:999px;padding:11px 20px}
.hero{padding:96px 22px 72px;background:radial-gradient(circle at 85% 10%,#fef9c3 0,#fff 38%,#f8fafc 100%);text-align:center}.wrap{max-width:1120px;margin:auto}
.badge{display:inline-flex;border:1px solid rgba(212,175,55,.45);background:rgba(212,175,55,.08);border-radius:999px;padding:7px 15px;color:var(--gold2);font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}
h1{font-family:Georgia,serif;font-size:clamp(42px,6vw,72px);line-height:1.04;margin:22px auto;max-width:960px}.lead{font-size:20px;color:var(--muted);max-width:780px;margin:0 auto 30px}
.cta{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}.btn{border-radius:999px;padding:15px 26px;text-decoration:none;font-weight:800}.primary{background:var(--gold);color:white;box-shadow:0 14px 30px rgba(212,175,55,.3)}.secondary{background:white;border:1px solid var(--line)}
.trust{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:32px}.trust div,.card{background:white;border:1px solid var(--line);border-radius:16px;padding:22px;box-shadow:0 12px 28px rgba(15,23,42,.06)}
section{padding:72px 22px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(245px,1fr));gap:20px}.card h2,.card h3{font-family:Georgia,serif;margin-top:0}.amount{font-family:Georgia,serif;color:var(--gold2);font-size:50px;font-weight:800}
.soft{background:var(--soft);border-top:1px solid var(--line);border-bottom:1px solid var(--line)}.content{max-width:880px;margin:auto}.content h2{font-family:Georgia,serif;font-size:40px}.guides a{display:block;text-decoration:none}
.faq{max-width:880px;margin:auto}.faq div{border-bottom:1px solid var(--line);padding:20px 0}.final{background:var(--dark);color:white;text-align:center}.final p{color:#cbd5e1}
.wa{position:fixed;right:22px;bottom:96px;z-index:35;width:58px;height:58px;border-radius:50%;background:#25d366;color:white;display:flex;align-items:center;justify-content:center;text-decoration:none;font-weight:900;box-shadow:0 12px 26px rgba(0,0,0,.25)}
.cookie{position:fixed;left:18px;right:18px;bottom:18px;z-index:30;background:white;border:1px solid var(--line);border-radius:14px;padding:14px 16px;box-shadow:0 18px 40px rgba(15,23,42,.18);display:flex;justify-content:space-between;gap:16px;align-items:center}.cookie button{border:0;border-radius:999px;padding:10px 16px;font-weight:800;background:var(--gold);color:white}
@media(max-width:760px){.nav{padding:12px 18px}.links{display:none}.trust{grid-template-columns:1fr}.cookie{display:block}.cookie button{margin-top:10px}.wa{bottom:118px}}
`;

function htmlEscape(s) {
  return String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
}

function layout({ title, desc, canonical, body, type = 'website' }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'FlightRefundClaim',
    url: site.base + '/',
    telephone: '+44 7359 669342',
    email: 'contact@flightrefundclaim.co.uk',
    areaServed: site.area,
    priceRange: 'No win, no fee',
    description: site.desc
  };
  return `<!doctype html><html lang="${site.lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><meta name="description" content="${desc}"><link rel="canonical" href="${canonical}"><link rel="alternate" hreflang="en-gb" href="https://flightrefundclaim.co.uk/"><link rel="alternate" hreflang="en-us" href="https://flightrefundclaim.com/"><link rel="alternate" hreflang="x-default" href="https://flightrefundclaim.co.uk/"><meta property="og:title" content="${title}"><meta property="og:description" content="${desc}"><meta property="og:url" content="${canonical}"><meta property="og:type" content="${type}"><meta name="twitter:card" content="summary_large_image"><script type="application/ld+json">${JSON.stringify(schema)}</script><style>${css}</style></head><body><nav class="nav"><a class="logo" href="/"><span>Flight</span>RefundClaim</a><div class="links"><a href="/#how">How it works</a><a href="/#claims">Claims</a><a href="/#faq">FAQ</a><a class="pill" href="/#check">Check claim</a></div></nav>${body}<a class="wa" href="https://wa.me/447359669342?text=Hi%20FlightRefundClaim,%20can%20you%20check%20my%20flight%20claim?" aria-label="Chat on WhatsApp">WA</a><div class="cookie" id="cookie"><span>We use cookies for analytics and advertising only when you accept.</span><button onclick="localStorage.cookieConsent='accepted';document.getElementById('cookie').remove()">Accept</button></div><script>if(localStorage.cookieConsent)document.getElementById('cookie').remove()</script></body></html>`;
}

function home() {
  const guideCards = site.guides.map(([slug, title, desc]) => `<a class="card" href="/${slug}/"><h3>${title}</h3><p>${desc}</p></a>`).join('');
  const body = `<header class="hero"><div class="wrap"><div class="badge">${site.badge}</div><h1>${site.h1}</h1><p class="lead">${site.lead}</p><div class="cta"><a class="btn primary" href="#check">Check my claim free</a><a class="btn secondary" href="https://wa.me/447359669342">Ask on WhatsApp</a></div><div class="trust"><div><strong>No win, no fee</strong><br>Only pay if compensation is recovered.</div><div><strong>${site.amount}</strong><br>Fixed compensation may apply per passenger.</div><div><strong>Free check</strong><br>Tell us the flight and we review eligibility.</div></div></div></header><section id="claims"><div class="wrap grid"><div class="card"><h2 class="amount">${site.amount}</h2><p>Compensation depends on route, distance, delay length, cancellation notice and airline responsibility.</p></div><div class="card"><h3>Delayed flights</h3><p>Arrival delays of 3 hours or more can qualify when the airline was responsible.</p></div><div class="card"><h3>Cancelled flights</h3><p>Late notice cancellations can qualify even if the airline gave a refund or replacement flight.</p></div><div class="card"><h3>Overbooking</h3><p>Denied boarding can trigger compensation rights when you were not allowed to fly.</p></div></div></section><section id="how" class="soft"><div class="content"><div class="badge">How it works</div><h2>Simple claim support from first check to airline response</h2><p>Send the flight details, route, date, disruption reason and contact information. We check the law, prepare the claim, contact the airline and keep you updated. The service is no win, no fee.</p><ul><li>Free eligibility review</li><li>UK261 and EC261 route checks</li><li>Airline correspondence handled for you</li><li>Clear success fee only when money is recovered</li></ul></div></section><section class="guides"><div class="wrap"><div class="badge">Claim guides</div><h2 style="font-family:Georgia,serif;font-size:40px">Popular flight compensation searches</h2><div class="grid">${guideCards}</div></div></section><section id="check" class="soft"><div class="content"><div class="badge">Free check</div><h2>Send your flight details</h2><form name="claim-check" method="POST" data-netlify="true"><input type="hidden" name="form-name" value="claim-check"><p><input name="name" placeholder="Your name" required style="width:100%;padding:14px;border:1px solid #ddd;border-radius:10px"></p><p><input name="email" type="email" placeholder="Email" required style="width:100%;padding:14px;border:1px solid #ddd;border-radius:10px"></p><p><input name="flight" placeholder="Flight number or route" style="width:100%;padding:14px;border:1px solid #ddd;border-radius:10px"></p><p><textarea name="details" placeholder="What happened?" rows="5" style="width:100%;padding:14px;border:1px solid #ddd;border-radius:10px"></textarea></p><button class="btn primary" type="submit" style="border:0">Submit free check</button></form></div></section><section id="faq"><div class="faq"><div class="badge">FAQ</div><h2 style="font-family:Georgia,serif;font-size:40px">Common questions</h2><div><h3>Do I pay upfront?</h3><p>No. The service is no win, no fee.</p></div><div><h3>Does nationality matter?</h3><p>Usually the flight route and airline matter more than nationality. That is why the US site focuses on American travellers on UK and EU flights.</p></div><div><h3>Can I claim if I accepted food, vouchers or a replacement flight?</h3><p>Often yes. Care and replacement travel are separate from statutory compensation.</p></div></div></section><section class="final"><h2 style="font-family:Georgia,serif;font-size:42px">Check your flight now</h2><p>It takes a few minutes to find out whether the claim is worth pursuing.</p><a class="btn primary" href="#check">Start free check</a></section><footer style="padding:38px 20px;text-align:center;background:#020617;color:#cbd5e1">FlightRefundClaim | <a href="${site.other}" style="color:white">Switch site</a> | No win, no fee claim support</footer>`;
  return layout({ title: site.title, desc: site.desc, canonical: site.base + '/', body });
}

function guide(slug, title, summary) {
  const body = `<header class="hero"><div class="wrap"><div class="badge">Flight compensation guide</div><h1>${htmlEscape(title)}</h1><p class="lead">${htmlEscape(summary)} FlightRefundClaim checks eligibility and handles airline correspondence on a no win, no fee basis.</p><div class="cta"><a class="btn primary" href="/#check">Check this claim</a><a class="btn secondary" href="https://wa.me/447359669342">Ask on WhatsApp</a></div></div></header><section><div class="content"><h2>When this claim can qualify</h2><p>You may have a claim when the flight arrived 3 or more hours late, was cancelled at short notice, or you were denied boarding because of overbooking. The airline normally needs to be responsible for the disruption.</p><h2>What we check</h2><ul><li>The departure and arrival airports</li><li>The operating airline</li><li>The final arrival delay</li><li>The disruption reason given by the airline</li><li>Whether the claim is still within time</li></ul><h2>Why start with a free check?</h2><p>Airlines often reject claims by blaming weather, air traffic control or operational disruption. A proper review helps separate weak claims from claims worth pursuing.</p><p><a class="btn primary" href="/#check">Start free eligibility check</a></p></div></section><section class="final"><h2 style="font-family:Georgia,serif;font-size:42px">Need help with this flight?</h2><p>Send the details and we will tell you if it looks worth claiming.</p><a class="btn primary" href="/#check">Check now</a></section>`;
  return layout({ title: title + ' | FlightRefundClaim', desc: summary + ' Free eligibility check. No win, no fee.', canonical: `${site.base}/${slug}/`, body, type: 'article' });
}

function write(file, content) {
  const target = path.join(dist, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
}

write('index.html', home());
site.guides.forEach(([slug, title, summary]) => write(`${slug}/index.html`, guide(slug, title, summary)));
const urls = ['/', ...site.guides.map(g => `/${g[0]}/`)];
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(u => `<url><loc>${site.base}${u}</loc><lastmod>2026-07-05</lastmod></url>`).join('')}</urlset>`);
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${site.base}/sitemap.xml\n`);
write('_redirects', `https://www.${new URL(site.base).hostname}/* ${site.base}/:splat 301!\n`);
write('_headers', `/*\n  X-Frame-Options: DENY\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n`);
console.log(`Built ${site.key} site with ${urls.length} URLs in dist`);
