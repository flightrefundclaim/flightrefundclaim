import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = '/Users/pawelwydmuch/Documents/Codex/2026-07-03/i-h/outputs/flightrefundclaim-domain-package';
const lastmod = '2026-07-04';

const sharedCss = `
:root{--bg-main:#ffffff;--bg-surface:#f8fafc;--bg-surface-alt:#f1f5f9;--text-main:#0f172a;--text-muted:#64748b;--text-light:#94a3b8;--gold:#d4af37;--gold-dark:#b49138;--border:#e2e8f0;--shadow-md:0 10px 25px -5px rgba(15,23,42,.08),0 8px 10px -6px rgba(15,23,42,.04);--shadow-lg:0 20px 40px -10px rgba(15,23,42,.12);--radius-lg:24px;--radius-md:16px;--radius-sm:12px}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'DM Sans',Arial,sans-serif;color:var(--text-main);background:#fff;line-height:1.7;-webkit-font-smoothing:antialiased}
a{color:inherit}
nav{position:sticky;top:0;z-index:20;display:flex;justify-content:space-between;align-items:center;padding:16px 48px;background:rgba(255,255,255,.9);backdrop-filter:blur(16px);border-bottom:1px solid rgba(15,23,42,.06)}
.logo{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:700;color:var(--text-main);text-decoration:none}
.logo span{color:var(--gold)}
.nav-links{display:flex;gap:28px;align-items:center}
.nav-links a{font-size:14px;font-weight:600;color:var(--text-muted);text-decoration:none}
.nav-cta{background:var(--gold);color:#fff!important;padding:12px 24px;border-radius:999px;box-shadow:0 4px 14px rgba(212,175,55,.28)}
.hero{background:radial-gradient(circle at top right,#fefce8 0%,#fff 42%,#f8fafc 100%);padding:110px 24px 80px;text-align:center}
.hero-inner,.wrap{max-width:1120px;margin:0 auto}
.badge{display:inline-block;padding:7px 16px;border-radius:999px;border:1px solid rgba(212,175,55,.35);background:rgba(212,175,55,.07);color:var(--gold-dark);font-size:12px;letter-spacing:.1em;text-transform:uppercase;font-weight:700;margin-bottom:22px}
h1{font-family:'Cormorant Garamond',serif;font-size:clamp(42px,6vw,72px);line-height:1.04;margin-bottom:22px;letter-spacing:-.02em}
.lead{font-size:19px;color:var(--text-muted);max-width:760px;margin:0 auto 34px}
.cta-row{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.btn{display:inline-block;padding:16px 30px;border-radius:999px;text-decoration:none;font-size:15px;font-weight:700}
.btn-primary{background:var(--gold);color:white;box-shadow:0 10px 28px rgba(212,175,55,.3)}
.btn-secondary{background:white;border:1px solid var(--border);color:var(--text-main)}
.trust{display:flex;justify-content:center;gap:20px;flex-wrap:wrap;margin-top:34px}
.trust span{background:rgba(255,255,255,.82);border:1px solid var(--border);border-radius:var(--radius-md);padding:14px 20px;color:var(--text-muted);font-weight:600;font-size:14px}
section{padding:82px 24px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
.card{background:#fff;border:1px solid var(--border);border-radius:var(--radius-lg);padding:30px;box-shadow:var(--shadow-md)}
.card h2,.card h3{font-family:'Cormorant Garamond',serif;line-height:1.15}
.card h2{font-size:36px;margin-bottom:14px}
.card h3{font-size:26px;margin-bottom:10px}
.card p,.content p,.content li{color:var(--text-muted);font-size:16px}
.content{max-width:880px;margin:0 auto}
.content h2{font-family:'Cormorant Garamond',serif;font-size:42px;margin:34px 0 12px}
.content h3{font-size:22px;margin:24px 0 8px}
.content ul{padding-left:22px;margin:16px 0}
.highlight{background:var(--bg-surface);border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
.amount{font-family:'Cormorant Garamond',serif;font-size:56px;color:var(--gold-dark);font-weight:700;line-height:1}
.faq{max-width:880px;margin:0 auto}
.faq-item{border-bottom:1px solid var(--border);padding:24px 0}
.faq-item h3{font-size:19px;margin-bottom:8px}
.final-cta{background:var(--text-main);color:#fff;text-align:center}
.final-cta h2{font-family:'Cormorant Garamond',serif;font-size:46px;margin-bottom:14px}
.final-cta p{color:#cbd5e1;max-width:720px;margin:0 auto 26px}
footer{background:#0f172a;color:#cbd5e1;text-align:center;padding:44px 24px;font-size:13px}
footer a{color:#fff;text-decoration:none}
@media(max-width:768px){nav{padding:14px 20px}.nav-links{display:none}.hero{padding-top:82px}.grid{grid-template-columns:1fr}section{padding:62px 20px}}
`;

const guideCss = `
.seo-guides{background:var(--bg-surface);border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
.seo-guide-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px}
.seo-guide-card{display:block;background:#fff;border:1px solid var(--border);border-radius:var(--radius-md);padding:24px;text-decoration:none;box-shadow:var(--shadow-sm);transition:all .25s}
.seo-guide-card:hover{transform:translateY(-3px);box-shadow:var(--shadow-md);border-color:rgba(212,175,55,.4)}
.seo-guide-card strong{display:block;color:var(--text-main);font-size:17px;margin-bottom:8px}
.seo-guide-card span{display:block;color:var(--text-muted);font-size:14px;line-height:1.6}
`;

function escapeText(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderPage(site, page) {
  const canonical = `${site.base}/${page.slug}/`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LegalService',
        name: 'FlightRefundClaim',
        url: site.base + '/',
        areaServed: site.areaServed,
        telephone: '+44 7359 669342',
        email: 'contact@flightrefundclaim.co.uk',
        priceRange: '30% success fee only',
        description: site.schemaDescription
      },
      {
        '@type': 'FAQPage',
        mainEntity: page.faq.map(([q, a]) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: {'@type': 'Answer', text: a}
        }))
      }
    ]
  };
  return `<!DOCTYPE html>
<html lang="${site.lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${page.title}</title>
<meta name="description" content="${page.description}">
<link rel="canonical" href="${canonical}">
<meta property="og:title" content="${page.ogTitle || page.title}">
<meta property="og:description" content="${page.description}">
<meta property="og:url" content="${canonical}">
<meta property="og:type" content="article">
<meta property="og:image" content="${site.base}/og-image.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<script type="application/ld+json">${JSON.stringify(schema)}</script>
<style>${sharedCss}</style>
</head>
<body>
<nav>
  <a class="logo" href="/"><span>✈</span> FlightRefundClaim</a>
  <div class="nav-links">
    <a href="/#how">How It Works</a>
    <a href="/#compensation">Compensation</a>
    <a href="/#faq">FAQ</a>
    <a href="/#contact">Contact</a>
    <a class="nav-cta" href="/#checker">Check My Claim</a>
  </div>
</nav>
<header class="hero">
  <div class="hero-inner">
    <div class="badge">${page.badge}</div>
    <h1>${page.h1}</h1>
    <p class="lead">${page.lead}</p>
    <div class="cta-row">
      <a class="btn btn-primary" href="/#checker">Check Your Claim Free</a>
      <a class="btn btn-secondary" href="/#contact">Ask A Question</a>
    </div>
    <div class="trust">
      <span>No win, no fee</span><span>${site.maxComp}</span><span>Free eligibility check</span>
    </div>
  </div>
</header>
<section>
  <div class="grid wrap">
    ${page.cards.map(card => `<div class="card"><h3>${card.title}</h3><p>${card.text}</p></div>`).join('\n    ')}
  </div>
</section>
<section class="highlight">
  <div class="content">
    ${page.sections.map(section => `<h2>${section.heading}</h2>\n${section.body}`).join('\n')}
  </div>
</section>
<section>
  <div class="faq">
    <div class="badge">FAQ</div>
    <h2 style="font-family:'Cormorant Garamond',serif;font-size:42px;margin-bottom:12px">Common Questions</h2>
    ${page.faq.map(([q, a]) => `<div class="faq-item"><h3>${q}</h3><p>${a}</p></div>`).join('\n    ')}
  </div>
</section>
<section class="final-cta">
  <h2>${page.ctaHeading}</h2>
  <p>${page.ctaText}</p>
  <a class="btn btn-primary" href="/#checker">Start Free Eligibility Check</a>
</section>
<footer>
  <p><a href="/">FlightRefundClaim</a> · <a href="/#contact">Contact</a> · No win, no fee flight compensation support.</p>
</footer>
</body>
</html>
`;
}

const ukPages = [
  {
    slug: 'flight-delay-compensation-uk',
    title: 'Flight Delay Compensation UK | Claim Up to £520 | FlightRefundClaim',
    description: 'Delayed by 3 hours or more on a UK or EU flight? Check if you can claim up to £520 per passenger with FlightRefundClaim. No win, no fee.',
    badge: 'UK Flight Delay Claims',
    h1: 'Flight Delay Compensation In The UK',
    lead: 'If your flight arrived 3 or more hours late, UK261 or EC261 rules may give you a right to fixed compensation. We check the route, delay length and airline reason for free.',
    cards: [
      {title: '3+ Hour Arrival Delay', text: 'Compensation is usually based on arrival delay at your final destination, not just departure delay.'},
      {title: 'Up To £520 Per Passenger', text: 'Long-haul eligible claims can be worth £520 per passenger under UK261.'},
      {title: 'No Win, No Fee', text: 'You only pay our success fee when compensation is recovered.'}
    ],
    sections: [
      {heading: 'When can you claim?', body: '<p>You may be eligible when your flight departed from a UK airport, arrived in the UK on a UK or EU airline, or is otherwise covered by UK261 or EC261. The delay normally needs to be at least 3 hours at the final destination.</p><ul><li>Flight arrived 3+ hours late</li><li>The airline was responsible for the delay</li><li>The claim is still within the relevant time limit</li></ul>'},
      {heading: 'What counts as airline responsibility?', body: '<p>Technical faults, operational problems, crew shortages and some missed rotations can support a claim. Severe weather, air traffic control restrictions and airport security disruption may reduce eligibility, but every case is worth checking.</p>'}
    ],
    faq: [
      ['How much can I claim for a delayed UK flight?', 'Eligible UK261 claims can be worth £220, £350 or £520 per passenger, depending on flight distance.'],
      ['Does the airline have to pay if the delay was technical?', 'Often yes. Technical or mechanical issues are commonly treated as within the airline’s control.'],
      ['Can I claim if I already accepted food vouchers?', 'Usually yes. Care such as meals or hotel accommodation is separate from statutory compensation.']
    ],
    ctaHeading: 'Check Your UK Delay Claim',
    ctaText: 'Answer a few questions and we will tell you whether your delay may qualify.'
  },
  {
    slug: 'eu261-compensation-claim',
    title: 'EU261 Compensation Claim | Delayed or Cancelled Flight | FlightRefundClaim',
    description: 'Claim EU261 compensation for delayed, cancelled or overbooked flights. Free eligibility check and no win, no fee support.',
    badge: 'EU261 Claims',
    h1: 'EU261 Compensation Claim Help',
    lead: 'EU Regulation 261/2004 protects passengers on many flights from EU airports and some flights into the EU. We help you check eligibility and pursue the airline.',
    cards: [
      {title: 'Delays', text: '3+ hour arrival delays can qualify when the airline is responsible.'},
      {title: 'Cancellations', text: 'Late-notice cancellations may qualify, especially under 14 days before departure.'},
      {title: 'Denied Boarding', text: 'Overbooking and involuntary denied boarding can trigger compensation rights.'}
    ],
    sections: [
      {heading: 'What is EU261?', body: '<p>EU261 is the passenger rights law that sets fixed compensation for eligible disruption. It can apply regardless of your nationality when the flight itself is covered.</p>'},
      {heading: 'Why use FlightRefundClaim?', body: '<p>Airlines often reject valid claims or ask for repeated evidence. We prepare the claim, handle correspondence and escalate where appropriate.</p>'}
    ],
    faq: [
      ['Who is covered by EU261?', 'Passengers departing from an EU airport are usually covered, and some flights into the EU on EU airlines are also covered.'],
      ['How much is EU261 compensation?', 'Compensation is commonly EUR250, EUR400 or EUR600 per passenger depending on flight distance.'],
      ['Is EU261 only for EU citizens?', 'No. Coverage is based mainly on the flight route and airline, not the passenger’s nationality.']
    ],
    ctaHeading: 'Start An EU261 Check',
    ctaText: 'Use the free checker and see whether your flight looks eligible.'
  },
  {
    slug: 'uk261-compensation-claim',
    title: 'UK261 Compensation Claim | UK Flight Delay Rights | FlightRefundClaim',
    description: 'UK261 compensation support for delayed, cancelled or overbooked UK flights. Check your claim for free.',
    badge: 'UK261 Passenger Rights',
    h1: 'UK261 Compensation Claim Support',
    lead: 'UK261 gives passengers fixed compensation rights after many UK flight delays, cancellations and denied boarding cases.',
    cards: [
      {title: 'UK Departures', text: 'Flights departing from UK airports are commonly covered by UK261.'},
      {title: 'UK Airline Arrivals', text: 'Some flights into the UK can also qualify when operated by a UK or EU carrier.'},
      {title: 'CAA Escalation', text: 'If an airline refuses unfairly, the matter may be escalated to the relevant body.'}
    ],
    sections: [
      {heading: 'What UK261 covers', body: '<p>UK261 replaced the EU regime for many UK-connected journeys after Brexit. It keeps similar compensation bands and protects passengers affected by airline-controlled disruption.</p>'},
      {heading: 'Documents that help', body: '<p>Booking references, boarding passes, airline emails and screenshots of delay notices can all support a claim. You can still start with limited information.</p>'}
    ],
    faq: [
      ['Is UK261 different from EU261?', 'It is a UK passenger rights regime with very similar compensation principles and fixed payment bands.'],
      ['Can I claim for a cancelled UK flight?', 'You may qualify if cancellation notice was short and the airline did not provide a valid alternative or defence.'],
      ['How long does a UK261 claim take?', 'Many claims take weeks, though disputed claims can take longer if escalation is required.']
    ],
    ctaHeading: 'Check Your UK261 Claim',
    ctaText: 'Tell us what happened and we will assess whether UK261 may apply.'
  },
  {
    slug: 'ryanair-flight-delay-compensation',
    title: 'Ryanair Flight Delay Compensation | Claim Help | FlightRefundClaim',
    description: 'Delayed on Ryanair? Check if your Ryanair flight may qualify for compensation under UK261 or EU261. No win, no fee.',
    badge: 'Ryanair Claims',
    h1: 'Ryanair Flight Delay Compensation',
    lead: 'Ryanair passengers may be able to claim when a covered flight arrives 3+ hours late, is cancelled at short notice, or is overbooked.',
    cards: [
      {title: 'EU Airline Coverage', text: 'Ryanair routes from EU and UK airports are often within passenger rights rules.'},
      {title: 'Route-Based Rights', text: 'Eligibility depends on the route, delay length and airline reason.'},
      {title: 'Evidence Support', text: 'We help organise the information needed to challenge the airline.'}
    ],
    sections: [
      {heading: 'Common Ryanair claim situations', body: '<p>Eligible disruption may include technical faults, operational delays, aircraft rotation problems and some staffing issues. Weather and air traffic control issues need closer review.</p>'},
      {heading: 'How to start', body: '<p>Use the checker with your departure airport, arrival airport, date, flight number and delay length. If you do not know every detail, submit what you have.</p>'}
    ],
    faq: [
      ['Can I claim against Ryanair for a 3 hour delay?', 'Possibly, if the arrival delay was at least 3 hours and Ryanair was responsible.'],
      ['What if Ryanair says extraordinary circumstances?', 'That defence is not always final. We review the airline’s stated reason against the route and disruption.'],
      ['Do I need my boarding pass?', 'It helps, but a booking reference and flight details may be enough to begin.']
    ],
    ctaHeading: 'Check Your Ryanair Claim',
    ctaText: 'Start with a free eligibility check and see whether your Ryanair disruption may qualify.'
  },
  {
    slug: 'wizz-air-flight-delay-compensation',
    title: 'Wizz Air Flight Delay Compensation | Claim Up to €600 | FlightRefundClaim',
    description: 'Delayed or cancelled Wizz Air flight? Check if you can claim compensation under EU261 or UK261. No win, no fee.',
    badge: 'Wizz Air Claims',
    h1: 'Wizz Air Flight Delay Compensation',
    lead: 'If your Wizz Air flight was delayed, cancelled or overbooked, passenger rights law may entitle you to compensation.',
    cards: [
      {title: 'EU Routes', text: 'Many Wizz Air flights from EU airports are covered by EU261.'},
      {title: 'UK Routes', text: 'UK airport disruption may fall under UK261, depending on the route.'},
      {title: 'Up To €600', text: 'Longer routes under EU261 can be worth up to EUR600 per passenger.'}
    ],
    sections: [
      {heading: 'Wizz Air eligibility basics', body: '<p>Compensation depends on arrival delay, the route, and whether Wizz Air can prove extraordinary circumstances. We review the facts before submitting.</p>'},
      {heading: 'No win, no fee process', body: '<p>You can submit the claim details for free. Our success fee applies only if compensation is recovered.</p>'}
    ],
    faq: [
      ['Can I claim for a cancelled Wizz Air flight?', 'You may qualify if the cancellation was late-notice and not caused by extraordinary circumstances.'],
      ['Can I claim for Wizz Air from Poland to the UK?', 'Often yes, because EU and UK passenger rights can cover those routes.'],
      ['What if Wizz Air already rejected me?', 'A rejection is not always the end. We can review the reason and evidence.']
    ],
    ctaHeading: 'Check Your Wizz Air Claim',
    ctaText: 'Use the checker and get a quick view of your possible eligibility.'
  },
  {
    slug: 'easyjet-flight-delay-compensation',
    title: 'easyJet Flight Delay Compensation | UK & EU Claim Help',
    description: 'Delayed or cancelled easyJet flight? Check if your case may qualify for UK261 or EU261 compensation. No win, no fee.',
    badge: 'easyJet Claims',
    h1: 'easyJet Flight Delay Compensation',
    lead: 'easyJet passengers can often claim fixed compensation after qualifying UK or EU flight disruption.',
    cards: [
      {title: 'UK And EU Coverage', text: 'easyJet routes often fall within UK261 or EU261 passenger protection.'},
      {title: '3+ Hour Rule', text: 'For delays, the key timing is usually arrival at your final destination.'},
      {title: 'Free Review', text: 'We check the route, delay and airline reason before pursuing the claim.'}
    ],
    sections: [
      {heading: 'When easyJet claims qualify', body: '<p>Claims may qualify after long arrival delays, late cancellations or denied boarding. Airline-controlled operational and technical issues are often worth pursuing.</p>'},
      {heading: 'What you need', body: '<p>Start with your booking reference, route, date and delay length. Extra documents can be added later if needed.</p>'}
    ],
    faq: [
      ['Can I claim for easyJet cancellations?', 'Yes, if the cancellation was short-notice and the airline cannot rely on a valid defence.'],
      ['How much can easyJet passengers receive?', 'Eligible compensation can be £220, £350 or £520 under UK261, or EUR250, EUR400 or EUR600 under EU261.'],
      ['Does accepting a replacement flight stop a claim?', 'Not necessarily. It depends on the timing and arrival delay of the replacement journey.']
    ],
    ctaHeading: 'Check Your easyJet Claim',
    ctaText: 'Find out whether your easyJet disruption may be worth pursuing.'
  },
  {
    slug: 'british-airways-flight-delay-compensation',
    title: 'British Airways Flight Delay Compensation | BA Claim Help',
    description: 'Delayed or cancelled British Airways flight? Check if you can claim compensation under UK261 or EU261. No win, no fee.',
    badge: 'British Airways Claims',
    h1: 'British Airways Flight Delay Compensation',
    lead: 'British Airways passengers may be entitled to fixed compensation when a covered flight arrives 3 or more hours late, is cancelled at short notice, or is overbooked.',
    cards: [
      {title: 'UK261 Coverage', text: 'Many British Airways flights departing UK airports are covered by UK261 passenger rights.'},
      {title: 'EU261 Routes', text: 'BA flights from EU airports can also be covered by EU261 rules.'},
      {title: 'Long-Haul Claims', text: 'Long-haul eligible claims can fall into the highest compensation band.'}
    ],
    sections: [
      {heading: 'When BA passengers can claim', body: '<p>British Airways claims may qualify after technical faults, operational disruption, crew issues or aircraft rotation problems. The key test is whether the final arrival delay reached 3 hours and whether BA can prove extraordinary circumstances.</p>'},
      {heading: 'What to send us', body: '<p>Your booking reference, route, flight date, flight number and delay length are enough to begin. Screenshots, emails and boarding passes can help later.</p>'}
    ],
    faq: [
      ['Can I claim from British Airways for a technical fault?', 'Often yes. Technical faults are commonly treated as within the airline’s control.'],
      ['Does UK261 cover BA flights from Heathrow?', 'Yes, many BA flights departing Heathrow are covered by UK261.'],
      ['What if BA offered a replacement flight?', 'You may still qualify depending on cancellation notice and final arrival time.']
    ],
    ctaHeading: 'Check Your British Airways Claim',
    ctaText: 'Use the free checker and see whether your BA disruption may qualify.'
  },
  {
    slug: 'jet2-flight-delay-compensation',
    title: 'Jet2 Flight Delay Compensation | Claim Up to £520',
    description: 'Jet2 flight delayed or cancelled? Check whether UK261 compensation may apply. Free eligibility check. No win, no fee.',
    badge: 'Jet2 Claims',
    h1: 'Jet2 Flight Delay Compensation',
    lead: 'If your Jet2 flight was delayed, cancelled or overbooked, you may have a UK261 compensation claim.',
    cards: [
      {title: 'Holiday Routes', text: 'Many Jet2 disruption cases involve UK departures to European holiday destinations.'},
      {title: '3+ Hour Arrival Delay', text: 'For delays, arrival time at the final destination is usually what matters.'},
      {title: 'Free Review', text: 'We check the reason, route and timing before pursuing the airline.'}
    ],
    sections: [
      {heading: 'Common Jet2 claim situations', body: '<p>Technical problems, operational delays and staffing issues can support a claim. Weather, airport restrictions and air traffic control disruption need a closer look.</p>'},
      {heading: 'Claim value', body: '<p>Eligible UK261 compensation can be £220, £350 or £520 per passenger depending on flight distance.</p>'}
    ],
    faq: [
      ['Can I claim for a Jet2 holiday flight delay?', 'Possibly, if the flight meets the delay, route and airline responsibility rules.'],
      ['Can a family claim together?', 'Yes. Each passenger on the booking may have their own compensation entitlement.'],
      ['Do package holidays change the claim?', 'The flight compensation right is separate from many package holiday issues.']
    ],
    ctaHeading: 'Check Your Jet2 Claim',
    ctaText: 'Tell us what happened and we will check whether Jet2 compensation may apply.'
  },
  {
    slug: 'tui-flight-delay-compensation',
    title: 'TUI Flight Delay Compensation | UK Holiday Flight Claim Help',
    description: 'TUI flight delayed by 3 hours or cancelled? Check if you can claim UK261 compensation. No win, no fee.',
    badge: 'TUI Claims',
    h1: 'TUI Flight Delay Compensation',
    lead: 'TUI passengers may be able to claim compensation after qualifying holiday flight delays, cancellations and denied boarding.',
    cards: [
      {title: 'Package Holiday Flights', text: 'TUI disruption can still create flight compensation rights for each passenger.'},
      {title: 'UK Departures', text: 'Many TUI flights leaving UK airports are covered by UK261.'},
      {title: 'No Win, No Fee', text: 'You pay only if compensation is recovered.'}
    ],
    sections: [
      {heading: 'TUI compensation rules', body: '<p>The claim depends on the route, delay length and the airline’s reason for disruption. Long arrival delays and late cancellations are the most common starting points.</p>'},
      {heading: 'What if the whole holiday was affected?', body: '<p>Flight compensation is separate from wider holiday complaints. We focus on the passenger rights claim connected to the flight disruption.</p>'}
    ],
    faq: [
      ['Can I claim for a delayed TUI package holiday flight?', 'Yes, if the flight itself qualifies under UK261 or EU261 rules.'],
      ['Does every passenger claim separately?', 'Compensation is usually per passenger, not per booking.'],
      ['What if TUI says it was weather?', 'Weather can be a defence, but the actual cause should be reviewed.']
    ],
    ctaHeading: 'Check Your TUI Claim',
    ctaText: 'Start a free check for your TUI delay or cancellation.'
  },
  {
    slug: 'heathrow-flight-delay-compensation',
    title: 'Heathrow Flight Delay Compensation | UK261 Claim Check',
    description: 'Delayed from Heathrow Airport? Check if your flight may qualify for UK261 or EU261 compensation. Free claim check.',
    badge: 'Heathrow Claims',
    h1: 'Heathrow Flight Delay Compensation',
    lead: 'Flights departing London Heathrow can be covered by UK261 passenger rights when disruption is the airline’s responsibility.',
    cards: [
      {title: 'Major UK Hub', text: 'Heathrow delays can affect domestic, European and long-haul routes.'},
      {title: 'Final Arrival Counts', text: 'For delay claims, the arrival time at your final destination is usually key.'},
      {title: 'Up To £520', text: 'Long-haul eligible UK261 claims can be worth £520 per passenger.'}
    ],
    sections: [
      {heading: 'Heathrow delay claim basics', body: '<p>Departures from Heathrow are commonly covered by UK261. Claims are strongest when the airline caused the delay through operational, technical or staffing problems.</p>'},
      {heading: 'Connection delays', body: '<p>If Heathrow was part of a connecting journey on one booking, the final destination arrival delay may matter more than the first leg alone.</p>'}
    ],
    faq: [
      ['Can I claim for a Heathrow departure delay?', 'Possibly, if the arrival delay reached 3 hours and the airline was responsible.'],
      ['Does Heathrow airport disruption qualify?', 'Airport-wide or air traffic control disruption may be harder, but it is worth checking.'],
      ['Can long-haul Heathrow flights claim £520?', 'Eligible long-haul UK261 claims can reach £520 per passenger.']
    ],
    ctaHeading: 'Check Your Heathrow Claim',
    ctaText: 'Use the free checker to review your Heathrow flight disruption.'
  },
  {
    slug: 'gatwick-flight-delay-compensation',
    title: 'Gatwick Flight Delay Compensation | Claim Help',
    description: 'Delayed from Gatwick Airport? Check whether UK261 or EU261 compensation may apply. No win, no fee.',
    badge: 'Gatwick Claims',
    h1: 'Gatwick Flight Delay Compensation',
    lead: 'Passengers delayed from London Gatwick may qualify for compensation when the airline is responsible and the arrival delay is 3+ hours.',
    cards: [
      {title: 'Short-Haul And Long-Haul', text: 'Gatwick routes include European and long-haul flights with different compensation bands.'},
      {title: 'Airline Responsibility', text: 'The airline’s reason for the disruption is central to eligibility.'},
      {title: 'Free Claim Check', text: 'We review your route, timing and reason before submitting.'}
    ],
    sections: [
      {heading: 'Common Gatwick claim examples', body: '<p>Technical faults, late inbound aircraft and airline operational issues can support a claim. Weather and air traffic control restrictions require closer review.</p>'},
      {heading: 'Start with basic details', body: '<p>Departure airport, arrival airport, airline, flight number and delay length are enough to start the assessment.</p>'}
    ],
    faq: [
      ['Can I claim for an easyJet delay from Gatwick?', 'Often yes, if the route and delay meet UK261 or EU261 requirements.'],
      ['Can Gatwick cancellations qualify?', 'Late-notice cancellations can qualify unless the airline has a valid defence.'],
      ['How much could I receive?', 'Eligible claims may be £220, £350 or £520 under UK261 depending on distance.']
    ],
    ctaHeading: 'Check Your Gatwick Claim',
    ctaText: 'Find out whether your Gatwick disruption may qualify.'
  },
  {
    slug: 'manchester-flight-delay-compensation',
    title: 'Manchester Airport Flight Delay Compensation | Claim Check',
    description: 'Delayed from Manchester Airport? Check if your flight qualifies for compensation under UK261 or EU261. Free review.',
    badge: 'Manchester Airport Claims',
    h1: 'Manchester Airport Flight Delay Compensation',
    lead: 'Flights from Manchester Airport can qualify for compensation after airline-controlled delays, cancellations or denied boarding.',
    cards: [
      {title: 'UK261 Departures', text: 'Manchester departures are commonly covered by UK261.'},
      {title: 'Holiday And Long-Haul Routes', text: 'European holiday routes and long-haul flights can both qualify.'},
      {title: 'Per Passenger Claims', text: 'Each passenger may be entitled to compensation if the claim succeeds.'}
    ],
    sections: [
      {heading: 'Manchester delay claims', body: '<p>The strongest cases usually involve a 3+ hour final arrival delay and an airline-controlled cause. We review the explanation before pursuing the airline.</p>'},
      {heading: 'Family bookings', body: '<p>If several passengers travelled together, compensation can apply to each eligible passenger, including children with paid tickets.</p>'}
    ],
    faq: [
      ['Can I claim from Manchester to Spain or Turkey?', 'Often yes if the flight departed Manchester and met the delay and responsibility rules.'],
      ['Can children claim compensation?', 'Usually yes if they had a paid ticket and were passengers on the disrupted flight.'],
      ['What if the airline blamed airport queues?', 'That may be harder, but the actual cause should still be checked.']
    ],
    ctaHeading: 'Check Your Manchester Claim',
    ctaText: 'Run your Manchester Airport delay through the free checker.'
  },
  {
    slug: 'stansted-flight-delay-compensation',
    title: 'Stansted Flight Delay Compensation | Ryanair and UK261 Claim Help',
    description: 'Delayed from Stansted Airport? Check if you can claim flight compensation under UK261 or EU261. No win, no fee.',
    badge: 'Stansted Claims',
    h1: 'Stansted Flight Delay Compensation',
    lead: 'London Stansted passengers may qualify for compensation after covered delays, cancellations or denied boarding.',
    cards: [
      {title: 'Ryanair And More', text: 'Stansted is a major base for low-cost European routes that may be covered.'},
      {title: '3+ Hour Delay Rule', text: 'Delay compensation usually depends on final arrival time.'},
      {title: 'Evidence Review', text: 'We check the airline reason and route before taking the case forward.'}
    ],
    sections: [
      {heading: 'Stansted claim situations', body: '<p>Eligible cases can include technical faults, late aircraft rotations and airline operational disruption. The route and delay length determine the compensation band.</p>'},
      {heading: 'Ryanair from Stansted', body: '<p>Many Ryanair departures from Stansted can be checked under UK261. A rejection from the airline is not always the final answer.</p>'}
    ],
    faq: [
      ['Can I claim for Ryanair from Stansted?', 'Possibly, if the arrival delay was 3+ hours and Ryanair was responsible.'],
      ['Can cancelled Stansted flights qualify?', 'Yes, late-notice cancellations can qualify if no valid extraordinary circumstance applies.'],
      ['How do I start?', 'Use the free checker with your route, date and delay details.']
    ],
    ctaHeading: 'Check Your Stansted Claim',
    ctaText: 'Start a free Stansted flight compensation check.'
  }
];

const usPages = [
  {
    slug: 'eu-flight-delay-compensation',
    title: 'EU Flight Delay Compensation for US Travelers | Claim Up to $650',
    description: 'Americans delayed on Europe flights may qualify for EU or UK flight compensation. Check your claim for free. No win, no fee.',
    badge: 'For US Travelers',
    h1: 'EU Flight Delay Compensation For US Travelers',
    lead: 'American passengers can be protected by European passenger rights when the flight departs from a UK or EU airport, even if the airline is American.',
    cards: [
      {title: 'Nationality Does Not Block You', text: 'EU261 and UK261 are usually based on the flight route, not your passport.'},
      {title: 'Up To About $650', text: 'Eligible long-haul European claims can be worth up to EUR600, roughly about $650.'},
      {title: 'No Win, No Fee', text: 'We review and pursue the claim with a success fee only if recovery is made.'}
    ],
    sections: [
      {heading: 'Can Americans claim EU flight compensation?', body: '<p>Yes. If your flight departed from an EU airport, or your UK-connected flight is covered by UK261, you may have compensation rights even as a US citizen or resident.</p>'},
      {heading: 'Example covered trips', body: '<ul><li>Paris to New York delayed by 5 hours</li><li>London to Chicago cancelled with short notice</li><li>Rome to Boston overbooked</li></ul>'}
    ],
    faq: [
      ['Can US citizens claim EU261?', 'Yes. EU261 is not limited to EU citizens. Route and airline rules matter most.'],
      ['Does this cover American Airlines, Delta or United?', 'Flights departing from UK or EU airports can be covered even when operated by US airlines.'],
      ['How do I receive payment in the US?', 'Successful compensation can usually be paid by bank transfer, Wise or PayPal depending on the case.']
    ],
    ctaHeading: 'Check Your Europe Trip',
    ctaText: 'Use the free checker to see whether your European flight delay may qualify.'
  },
  {
    slug: 'eu261-compensation-for-us-passengers',
    title: 'EU261 Compensation for US Passengers | FlightRefundClaim',
    description: 'US passengers may be eligible for EU261 compensation after delays, cancellations or denied boarding on covered Europe flights.',
    badge: 'EU261 For Americans',
    h1: 'EU261 Compensation For US Passengers',
    lead: 'EU261 can protect passengers flying from Europe to the United States, including tourists, business travelers and families.',
    cards: [
      {title: 'Departing Europe', text: 'Flights leaving EU airports are a core category of EU261 coverage.'},
      {title: 'Fixed Compensation', text: 'The payment is set by law and does not depend on ticket price.'},
      {title: 'Free Case Check', text: 'Submit the route and delay information and we will assess the claim.'}
    ],
    sections: [
      {heading: 'What EU261 means for US passengers', body: '<p>For covered routes, EU261 gives passengers rights to care and fixed compensation after qualifying disruption. The fact that you live in the United States does not remove those rights.</p>'},
      {heading: 'Strong claim signs', body: '<p>A 3+ hour arrival delay, technical airline issue, or short-notice cancellation can be a strong starting point. Weather, air traffic control and security disruption require more review.</p>'}
    ],
    faq: [
      ['Is EU261 compensation paid in dollars?', 'The legal amount is set in euros, but US passengers may receive the converted value depending on payment method.'],
      ['Can I claim after returning home?', 'Yes. You do not need to still be in Europe to start a claim.'],
      ['How old can the flight be?', 'Time limits vary by country and route. The checker asks for the flight date so we can review it.']
    ],
    ctaHeading: 'Start A Free EU261 Check',
    ctaText: 'Tell us your route, date and delay length and we will review the basics.'
  },
  {
    slug: 'delayed-flight-from-europe-to-usa',
    title: 'Delayed Flight from Europe to USA? Check Compensation Rights',
    description: 'Flying from Europe to the USA and arrived late? You may be owed compensation under EU261 or UK261. Free eligibility check.',
    badge: 'Europe To USA Delays',
    h1: 'Delayed Flight From Europe To The USA?',
    lead: 'If your flight from Europe to America arrived 3 or more hours late, you may be able to claim fixed compensation.',
    cards: [
      {title: 'Paris, Rome, Madrid, Dublin', text: 'Many Europe-to-USA departures can be covered by passenger rights law.'},
      {title: 'Final Arrival Matters', text: 'The key delay is usually arrival at your final destination, not departure delay alone.'},
      {title: 'Long-Haul Claims', text: 'Europe-to-US routes are usually long-haul and can fall into the highest band.'}
    ],
    sections: [
      {heading: 'Why Europe-to-USA flights can qualify', body: '<p>Flights leaving Europe are often covered by EU261, while flights leaving the UK may be covered by UK261. These laws can apply even when your final destination is in the United States.</p>'},
      {heading: 'What to prepare', body: '<p>Have your booking reference, airline, flight number, departure airport, arrival airport and delay estimate ready. If you do not know the airline reason, select “not sure”.</p>'}
    ],
    faq: [
      ['Does New York, Boston or Chicago arrival count?', 'Yes. The law looks at covered routes and final arrival delay, including US destination airports.'],
      ['What if I had a connection?', 'Connections can still qualify, especially if the journey was on one booking.'],
      ['Can I claim if the airline gave hotel or meal vouchers?', 'Usually yes. Care and compensation are separate rights.']
    ],
    ctaHeading: 'Check Your Europe To USA Delay',
    ctaText: 'Run the route through the checker and see if it looks eligible.'
  },
  {
    slug: 'american-airlines-eu-flight-delay',
    title: 'American Airlines EU Flight Delay Compensation | US Passenger Help',
    description: 'Delayed on American Airlines from Europe or the UK? US passengers may qualify for EU261 or UK261 compensation.',
    badge: 'American Airlines Claims',
    h1: 'American Airlines EU Flight Delay Compensation',
    lead: 'American Airlines flights departing from the UK or EU may be covered by passenger rights law when they arrive 3+ hours late.',
    cards: [
      {title: 'European Departures', text: 'Flights from EU airports can fall under EU261 even on American Airlines.'},
      {title: 'UK Departures', text: 'Flights from UK airports can fall under UK261.'},
      {title: 'Long-Haul Value', text: 'Transatlantic delays may be in the highest compensation band.'}
    ],
    sections: [
      {heading: 'When American Airlines flights qualify', body: '<p>Coverage is strongest when the disruption affected a flight departing Europe or the UK and the airline cannot prove extraordinary circumstances.</p>'},
      {heading: 'How we help', body: '<p>We prepare the claim, submit it to the airline and help respond if the airline rejects or asks for more information.</p>'}
    ],
    faq: [
      ['Can I claim against an American airline under EU261?', 'Yes, for many flights departing from EU airports. The airline does not have to be European for departures from the EU.'],
      ['Does Dallas or New York destination matter?', 'The destination can be in the United States; the European departure is often the key.'],
      ['What if the airline says weather?', 'Weather can be a valid defence, but the details should still be reviewed.']
    ],
    ctaHeading: 'Check Your American Airlines Claim',
    ctaText: 'Use the free checker and see whether your route may qualify.'
  },
  {
    slug: 'delta-eu-flight-delay-compensation',
    title: 'Delta EU Flight Delay Compensation | Europe to USA Claim Help',
    description: 'Delta flight delayed from Europe to the US? You may qualify for EU261 or UK261 compensation. Free claim check.',
    badge: 'Delta Claims',
    h1: 'Delta EU Flight Delay Compensation',
    lead: 'Delta passengers departing from Europe or the UK may have compensation rights after qualifying delays and cancellations.',
    cards: [
      {title: 'US Passengers Covered', text: 'Passenger rights can apply even if you are a US resident flying home.'},
      {title: 'Route-Based Eligibility', text: 'Departure airport, airline reason and final arrival delay determine the case.'},
      {title: 'Free Assessment', text: 'We review the details before pursuing Delta for compensation.'}
    ],
    sections: [
      {heading: 'Delta flights from Europe', body: '<p>Flights such as Amsterdam to Atlanta, Paris to New York, or Rome to Boston may be covered when the journey departs an EU airport and disruption meets the legal test.</p>'},
      {heading: 'Claim amount', body: '<p>Long-haul Europe-to-US flights can fall into the top compensation band under EU261. Exact value depends on the regulation and currency conversion.</p>'}
    ],
    faq: [
      ['Can Delta passengers claim EU261?', 'Yes, many Delta flights departing EU airports are covered.'],
      ['Can I claim after a missed connection?', 'Possibly, especially when flights were on one booking and the final arrival delay was 3+ hours.'],
      ['Do I need to contact Delta first?', 'No. You can start with our checker and we can handle the claim route.']
    ],
    ctaHeading: 'Check Your Delta Claim',
    ctaText: 'Start with your flight route and delay length.'
  },
  {
    slug: 'united-eu-flight-delay-compensation',
    title: 'United Airlines EU Flight Delay Compensation | Claim Check',
    description: 'United flight delayed from Europe or the UK? Check whether EU261 or UK261 compensation may apply. No win, no fee.',
    badge: 'United Claims',
    h1: 'United Airlines EU Flight Delay Compensation',
    lead: 'United Airlines passengers may qualify for compensation when a covered Europe or UK departure arrives significantly late.',
    cards: [
      {title: 'EU Departures', text: 'United flights leaving EU airports can be covered by EU261.'},
      {title: 'UK Departures', text: 'United flights leaving the UK may be covered by UK261.'},
      {title: 'Simple Start', text: 'Submit your route, date and delay details to begin.'}
    ],
    sections: [
      {heading: 'Covered United routes', body: '<p>Examples may include Frankfurt to Newark, Paris to Chicago, or London to San Francisco when the delay and airline reason meet the rules.</p>'},
      {heading: 'Why claims get rejected', body: '<p>Airlines may cite extraordinary circumstances or incomplete documentation. We help organise the evidence and challenge weak rejections.</p>'}
    ],
    faq: [
      ['Can I claim for United from Europe to the US?', 'Yes, many EU departures on United can be covered by EU261.'],
      ['What delay length is needed?', 'For delay compensation, the arrival delay usually needs to be at least 3 hours.'],
      ['Can FlightRefundClaim help US residents?', 'Yes. The .com site is built specifically for US passengers affected by UK or EU flights.']
    ],
    ctaHeading: 'Check Your United Claim',
    ctaText: 'See whether your delayed United flight may qualify.'
  },
  {
    slug: 'british-airways-compensation-for-us-passengers',
    title: 'British Airways Compensation for US Passengers | UK & EU Claims',
    description: 'US passenger delayed or cancelled on British Airways from Europe or the UK? Check whether UK261 or EU261 compensation may apply.',
    badge: 'BA Claims For Americans',
    h1: 'British Airways Compensation For US Passengers',
    lead: 'American passengers on British Airways flights from the UK or EU may have fixed compensation rights after qualifying disruption.',
    cards: [
      {title: 'UK Departures', text: 'BA flights leaving London or another UK airport are often covered by UK261.'},
      {title: 'EU Departures', text: 'BA flights departing EU airports can also be covered by EU261.'},
      {title: 'US Passengers Protected', text: 'Your nationality does not usually remove route-based passenger rights.'}
    ],
    sections: [
      {heading: 'British Airways flights to the US', body: '<p>Flights such as London to New York, London to Chicago, or Paris to the US via London may be worth checking when the final arrival delay reached 3 hours.</p>'},
      {heading: 'Common airline reasons', body: '<p>Technical faults and operational issues can support a claim. Weather, air traffic control restrictions and airport disruption require closer review.</p>'}
    ],
    faq: [
      ['Can US passengers claim against British Airways?', 'Yes, many UK or EU departures can qualify when the legal tests are met.'],
      ['Can I claim after flying home to America?', 'Yes. You can start a claim after returning to the United States.'],
      ['How much can BA passengers receive?', 'Eligible long-haul claims can reach £520 or EUR600 depending on the route and regulation.']
    ],
    ctaHeading: 'Check Your BA Claim',
    ctaText: 'Use the free checker to review your British Airways disruption.'
  },
  {
    slug: 'virgin-atlantic-uk-flight-delay-compensation',
    title: 'Virgin Atlantic UK Flight Delay Compensation | US Passenger Help',
    description: 'Virgin Atlantic flight from the UK delayed or cancelled? US passengers may qualify for UK261 compensation. Free claim check.',
    badge: 'Virgin Atlantic Claims',
    h1: 'Virgin Atlantic UK Flight Delay Compensation',
    lead: 'Virgin Atlantic passengers flying from the UK to the United States may have UK261 rights after qualifying delays and cancellations.',
    cards: [
      {title: 'UK To USA Routes', text: 'Flights from London or Manchester to US cities may be covered by UK261.'},
      {title: 'Long-Haul Band', text: 'Eligible UK-to-US claims can fall into the highest compensation band.'},
      {title: 'No Win, No Fee', text: 'You pay only if compensation is recovered.'}
    ],
    sections: [
      {heading: 'When Virgin Atlantic claims qualify', body: '<p>Claims may qualify when arrival delay reaches 3+ hours and the airline is responsible. Technical and operational disruption are common review points.</p>'},
      {heading: 'What US travelers need', body: '<p>Your booking reference, flight number, route, date and delay length are enough to begin a free assessment.</p>'}
    ],
    faq: [
      ['Can Americans claim UK261 against Virgin Atlantic?', 'Yes, if the flight route and disruption meet UK261 requirements.'],
      ['Does the US destination matter?', 'The destination can be in the United States; UK departure is often the key factor.'],
      ['Can I claim if I accepted a replacement flight?', 'Possibly, depending on cancellation notice and final arrival time.']
    ],
    ctaHeading: 'Check Your Virgin Atlantic Claim',
    ctaText: 'Start a free review for your Virgin Atlantic delay or cancellation.'
  },
  {
    slug: 'london-to-new-york-flight-delay-compensation',
    title: 'London to New York Flight Delay Compensation | UK261 Claim Check',
    description: 'London to New York flight delayed? US passengers may qualify for UK261 compensation. Free eligibility check.',
    badge: 'London To New York Claims',
    h1: 'London To New York Flight Delay Compensation',
    lead: 'Flights from London to New York are usually long-haul UK departures, so eligible delays can fall into the highest compensation band.',
    cards: [
      {title: 'Heathrow, Gatwick, London City', text: 'London departures are commonly covered by UK261.'},
      {title: '3+ Hour Arrival Delay', text: 'Arrival time in New York is usually the key delay measurement.'},
      {title: 'Long-Haul Value', text: 'Eligible claims may reach £520 per passenger under UK261.'}
    ],
    sections: [
      {heading: 'London to NYC disruption', body: '<p>Claims may apply to flights to JFK, Newark or other New York-area airports when the airline caused the delay or cancellation.</p>'},
      {heading: 'Covered airlines', body: '<p>British Airways, Virgin Atlantic, American Airlines, Delta and United flights can all be checked depending on the route and disruption reason.</p>'}
    ],
    faq: [
      ['Can a US passenger claim for London to New York?', 'Yes, many London departures are covered by UK261 regardless of passenger nationality.'],
      ['What if the delay happened after boarding?', 'The final arrival delay is normally the most important timing for delay compensation.'],
      ['Can Newark flights qualify too?', 'Yes, New York-area destination airports can qualify if the legal conditions are met.']
    ],
    ctaHeading: 'Check Your London To New York Claim',
    ctaText: 'Use the checker with your flight route and arrival delay.'
  },
  {
    slug: 'paris-to-usa-flight-delay-compensation',
    title: 'Paris to USA Flight Delay Compensation | EU261 Claim Help',
    description: 'Delayed from Paris to the USA? You may qualify for EU261 compensation even as a US passenger. Free claim check.',
    badge: 'Paris To USA Claims',
    h1: 'Paris To USA Flight Delay Compensation',
    lead: 'Flights departing Paris for the United States can be covered by EU261 when the disruption meets the rules.',
    cards: [
      {title: 'EU Departure', text: 'Paris departures are a strong EU261 starting point.'},
      {title: 'US Citizens Covered', text: 'EU261 is not limited to EU citizens.'},
      {title: 'Up To EUR600', text: 'Long-haul eligible claims can reach EUR600 per passenger.'}
    ],
    sections: [
      {heading: 'Paris departure rights', body: '<p>Whether you flew from Charles de Gaulle or Orly, EU261 may apply when your final arrival in the US was 3+ hours late and the airline was responsible.</p>'},
      {heading: 'Airline examples', body: '<p>Air France, Delta, American Airlines and United flights can all be checked when departing from Paris.</p>'}
    ],
    faq: [
      ['Can Americans claim for flights from Paris?', 'Yes, route-based EU261 rights can protect US passengers.'],
      ['Does it matter if the airline is American?', 'For EU departures, US airlines can still be covered.'],
      ['How much is EUR600 in dollars?', 'The dollar value changes with exchange rates, but EUR600 is roughly around the top long-haul band.']
    ],
    ctaHeading: 'Check Your Paris To USA Claim',
    ctaText: 'Run your Paris departure through the free checker.'
  },
  {
    slug: 'rome-to-usa-flight-delay-compensation',
    title: 'Rome to USA Flight Delay Compensation | EU261 for Americans',
    description: 'Flight from Rome to the USA delayed or cancelled? US passengers may qualify for EU261 compensation. Free check.',
    badge: 'Rome To USA Claims',
    h1: 'Rome To USA Flight Delay Compensation',
    lead: 'Flights departing Rome for the United States can fall under EU261 passenger rights after qualifying delays and cancellations.',
    cards: [
      {title: 'Italy Departure', text: 'Flights leaving Rome are usually within EU261 route coverage.'},
      {title: 'Tourists Protected', text: 'US tourists and residents can still have EU passenger rights.'},
      {title: 'Long-Haul Compensation', text: 'Rome-to-US flights may be in the top compensation band.'}
    ],
    sections: [
      {heading: 'Rome to US claims', body: '<p>Eligible claims may involve late arrival, short-notice cancellation or denied boarding. The airline’s reason is central to the case.</p>'},
      {heading: 'Connecting journeys', body: '<p>If your Rome flight was part of a single booking with connections, the final destination arrival time may decide eligibility.</p>'}
    ],
    faq: [
      ['Can I claim after returning from Italy?', 'Yes. You can begin the claim after you are back in the United States.'],
      ['Do US airlines from Rome qualify?', 'Many flights departing Rome can be covered even when operated by US airlines.'],
      ['What if I missed a connection?', 'You may qualify if the whole booking arrived 3+ hours late at the final destination.']
    ],
    ctaHeading: 'Check Your Rome To USA Claim',
    ctaText: 'Tell us your route and delay length for a free assessment.'
  },
  {
    slug: 'amsterdam-to-usa-flight-delay-compensation',
    title: 'Amsterdam to USA Flight Delay Compensation | EU261 Claim Check',
    description: 'Delayed from Amsterdam to the USA? Check if EU261 compensation may apply. Free review for US passengers.',
    badge: 'Amsterdam To USA Claims',
    h1: 'Amsterdam To USA Flight Delay Compensation',
    lead: 'Amsterdam departures to the United States can qualify for EU261 compensation when the airline is responsible for major disruption.',
    cards: [
      {title: 'Schiphol Departures', text: 'Flights leaving Amsterdam Schiphol are usually EU departures.'},
      {title: 'Delta, KLM, United And More', text: 'Both European and US airlines can be checked on EU departures.'},
      {title: 'Free Review', text: 'We assess route, timing and airline reason before submitting.'}
    ],
    sections: [
      {heading: 'Amsterdam flight delay claims', body: '<p>Arrival delays of 3+ hours, late cancellations and denied boarding can all create potential EU261 claims.</p>'},
      {heading: 'Why US passengers often miss this right', body: '<p>Many Americans assume US rules apply only. In reality, European passenger rights can protect the trip when the flight departs Europe.</p>'}
    ],
    faq: [
      ['Can Delta from Amsterdam qualify?', 'Yes, many Delta flights departing Amsterdam can be checked under EU261.'],
      ['Can KLM flights to the US qualify?', 'Yes, KLM flights from Amsterdam may qualify if the disruption meets the rules.'],
      ['Do I need to be in Europe to claim?', 'No. You can start after returning home.']
    ],
    ctaHeading: 'Check Your Amsterdam To USA Claim',
    ctaText: 'Use the free checker to see whether your Amsterdam disruption may qualify.'
  }
];

const sites = [
  {
    dir: join(root, 'uk-site'),
    base: 'https://flightrefundclaim.co.uk',
    lang: 'en-GB',
    maxComp: 'Up to £520/€600',
    areaServed: ['GB', 'EU'],
    schemaDescription: 'Flight compensation claims service for UK and EU passengers under UK261 and EC261.',
    pages: ukPages
  },
  {
    dir: join(root, 'us-site'),
    base: 'https://flightrefundclaim.com',
    lang: 'en-US',
    maxComp: 'Up to about $650',
    areaServed: ['US', 'GB', 'EU'],
    schemaDescription: 'Flight compensation claims service for US travellers delayed or cancelled on UK and EU flights.',
    pages: usPages
  }
];

function updateSitemap(site) {
  const urls = [
    {loc: site.base + '/', priority: '1.0'},
    ...site.pages.map(page => ({loc: `${site.base}/${page.slug}/`, priority: '0.8'}))
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;
  writeFileSync(join(site.dir, 'sitemap.xml'), xml);
}

function updateIndex(site) {
  const indexPath = join(site.dir, 'index.html');
  let html = readFileSync(indexPath, 'utf8');
  if (!html.includes('.seo-guides{')) {
    html = html.replace('</style>', `${guideCss}\n</style>`);
  }
  const guideSection = `<section class="seo-guides" id="guides">
  <div class="section-inner">
    <div class="section-badge">Claim Guides</div>
    <h2 class="section-title">Popular <strong>Flight Compensation Guides</strong></h2>
    <p class="section-sub">Helpful pages for the routes, airlines and passenger rights searches people use before starting a claim.</p>
    <div class="seo-guide-grid">
${site.pages.map(page => `      <a class="seo-guide-card" href="/${page.slug}/"><strong>${escapeText(page.h1)}</strong><span>${escapeText(page.description)}</span></a>`).join('\n')}
    </div>
  </div>
</section>
`;
  if (!html.includes('id="guides"')) {
    html = html.replace('<section id="faq">', guideSection + '<section id="faq">');
  }
  if (!html.includes('<a href="#guides">Guides</a>')) {
    html = html.replace('<a href="#faq">FAQ</a>', '<a href="#guides">Guides</a>\n      <a href="#faq">FAQ</a>');
  }
  writeFileSync(indexPath, html);
}

for (const site of sites) {
  for (const page of site.pages) {
    const pageDir = join(site.dir, page.slug);
    mkdirSync(pageDir, {recursive: true});
    writeFileSync(join(pageDir, 'index.html'), renderPage(site, page));
  }
  updateSitemap(site);
  updateIndex(site);
}

console.log('Generated SEO pages for UK and US sites.');
