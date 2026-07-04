from pathlib import Path
import json
import re
from textwrap import dedent

from PIL import Image, ImageDraw, ImageFont


ROOT = Path("/Users/pawelwydmuch/Documents/Codex/2026-07-03/i-h")
SOURCE = Path("/Users/pawelwydmuch/Downloads/flightrefundclaim.html")
OUT = ROOT / "outputs" / "flightrefundclaim-domain-package"


CONSENT_SCRIPT = dedent(
    """\
    <!-- Consent-aware analytics -->
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      const GA_MEASUREMENT_ID = 'G-C219QX5J6Z';
      const META_PIXEL_ID = '1493146032528274';

      gtag('consent', 'default', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied'
      });

      function hasMarketingConsent(){
        return localStorage.getItem('cookieConsent') === 'accepted';
      }

      function loadGoogleAnalytics(){
        if(window.__gaLoaded) return;
        window.__gaLoaded = true;
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
        document.head.appendChild(script);
        gtag('js', new Date());
        gtag('config', GA_MEASUREMENT_ID, { send_page_view: true });
      }

      function loadMetaPixel(){
        if(window.__metaLoaded) return;
        window.__metaLoaded = true;
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', META_PIXEL_ID);
        fbq('track', 'PageView');
      }

      function enableMarketingTracking(){
        gtag('consent', 'update', {
          ad_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted',
          analytics_storage: 'granted'
        });
        loadGoogleAnalytics();
        loadMetaPixel();
      }

      function trackEvent(name, params){
        if(!hasMarketingConsent()) return;
        const data = Object.assign({ event_category: 'lead_funnel' }, params || {});
        if(typeof gtag === 'function') gtag('event', name, data);
        if(typeof fbq === 'function'){
          const metaMap = {
            claim_submit_success: 'Lead',
            contact_submit_success: 'Contact',
            whatsapp_click: 'Contact'
          };
          if(metaMap[name]) fbq('track', metaMap[name], data);
          else fbq('trackCustom', name, data);
        }
      }

      function getAttributionData(){
        const params = new URLSearchParams(window.location.search);
        return {
          site_domain: window.location.hostname || 'unknown',
          landing_page: window.location.href,
          referrer: document.referrer || 'Direct',
          consent_state: localStorage.getItem('cookieConsent') || 'unset',
          utm_source: params.get('utm_source') || '',
          utm_medium: params.get('utm_medium') || '',
          utm_campaign: params.get('utm_campaign') || '',
          utm_term: params.get('utm_term') || '',
          utm_content: params.get('utm_content') || ''
        };
      }

      if(hasMarketingConsent()) enableMarketingTracking();
    </script>
    """
)


def replace_analytics(html: str) -> str:
    pattern = re.compile(r"<!-- Google tag \(gtag\.js\) -->.*?<!-- End Meta Pixel Code -->", re.S)
    return pattern.sub(CONSENT_SCRIPT.rstrip(), html)


def schema_for(domain: str, variant: str) -> str:
    if variant == "uk":
        data = {
            "@context": "https://schema.org",
            "@type": "LegalService",
            "name": "FlightRefundClaim",
            "url": f"https://{domain}/",
            "description": "Flight compensation claims service for UK and EU passengers under UK261 and EC261/2004. No win, no fee.",
            "telephone": "+44 7359 669342",
            "email": "contact@flightrefundclaim.co.uk",
            "areaServed": ["GB", "EU"],
            "priceRange": "30% success fee only",
            "sameAs": ["https://flightrefundclaim.com/"],
        }
    else:
        data = {
            "@context": "https://schema.org",
            "@type": "LegalService",
            "name": "FlightRefundClaim",
            "url": f"https://{domain}/",
            "description": "Flight compensation claims service for US travellers delayed or cancelled on UK and EU flights under EC261/2004 and UK261. No win, no fee.",
            "telephone": "+44 7359 669342",
            "email": "contact@flightrefundclaim.co.uk",
            "areaServed": ["US", "GB", "EU"],
            "priceRange": "30% success fee only",
            "sameAs": ["https://flightrefundclaim.co.uk/"],
        }
    return '<script type="application/ld+json">\n' + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + "\n</script>"


def update_head(html: str, *, domain: str, variant: str) -> str:
    if variant == "uk":
        title = "Flight Compensation UK & EU | Up to £520/€600 | No Win No Fee"
        desc = "Claim flight compensation for delayed, cancelled or overbooked UK and EU flights. No win, no fee. Free eligibility check in 2 minutes."
        og_title = "Flight Compensation UK & EU | Up to £520/€600"
        og_desc = "Delayed or cancelled flight? Check if you can claim under UK261 or EC261. No win, no fee."
        lang = "en-GB"
        x_default = "https://flightrefundclaim.co.uk/"
    else:
        title = "Flight Compensation for Americans in Europe | Claim Up to $650"
        desc = "US travellers delayed on UK or EU flights may be owed compensation under passenger rights law. Free eligibility check. No win, no fee."
        og_title = "US Traveller? Claim UK & EU Flight Compensation"
        og_desc = "Your Europe trip was delayed or cancelled? You may be owed up to about $650 per passenger."
        lang = "en-US"
        x_default = "https://flightrefundclaim.com/"

    canonical = f"""<link rel="canonical" href="https://{domain}/">
<link rel="alternate" hreflang="en-gb" href="https://flightrefundclaim.co.uk/">
<link rel="alternate" hreflang="en-us" href="https://flightrefundclaim.com/">
<link rel="alternate" hreflang="x-default" href="{x_default}">"""

    html = re.sub(r'<html lang="[^"]*">', f'<html lang="{lang}">', html, count=1)
    html = re.sub(r'<link rel="canonical" href="[^"]*">', canonical, html, count=1)
    html = re.sub(r'<meta property="og:title" content="[^"]*">', f'<meta property="og:title" content="{og_title}">', html, count=1)
    html = re.sub(r'<meta property="og:description" content="[^"]*">', f'<meta property="og:description" content="{og_desc}">', html, count=1)
    html = re.sub(r'<meta property="og:url" content="[^"]*">', f'<meta property="og:url" content="https://{domain}/">', html, count=1)
    html = re.sub(r'<meta property="og:image" content="[^"]*">', f'<meta property="og:image" content="https://{domain}/og-image.png">', html, count=1)
    html = re.sub(r'<meta name="twitter:title" content="[^"]*">', f'<meta name="twitter:title" content="{og_title}">', html, count=1)
    html = re.sub(r'<meta name="twitter:description" content="[^"]*">', f'<meta name="twitter:description" content="{og_desc}">', html, count=1)
    html = re.sub(r"<title>.*?</title>", f"<title>{title}</title>", html, count=1, flags=re.S)
    html = re.sub(r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{desc}">', html, count=1)
    html = re.sub(r'<script type="application/ld\+json">\s*.*?\s*</script>', schema_for(domain, variant), html, count=1, flags=re.S)
    return html


def improve_common_js(html: str, *, domain: str) -> str:
    html = html.replace(
        "function showUSVersion(){\n  // Swap hero content\n  document.getElementById('heroDefault').style.display='none';\n  document.getElementById('heroUS').style.display='block';\n  // Swap trust bar\n  document.getElementById('trustDefault').style.display='none';\n  document.getElementById('trustUS').style.display='flex';",
        "function showUSVersion(){\n  // Swap hero content when the alternate block exists on this build\n  const heroDefault=document.getElementById('heroDefault');\n  const heroUS=document.getElementById('heroUS');\n  if(heroDefault&&heroUS){heroDefault.style.display='none';heroUS.style.display='block';}\n  // Swap trust bar when the alternate block exists on this build\n  const trustDefault=document.getElementById('trustDefault');\n  const trustUS=document.getElementById('trustUS');\n  if(trustDefault&&trustUS){trustDefault.style.display='none';trustUS.style.display='flex';}",
    )
    html = html.replace(
        "  localStorage.setItem('cookieConsent','accepted');\n  if(typeof gtag!=='undefined')gtag('consent','update',{'analytics_storage':'granted'});\n  if(typeof fbq!=='undefined')fbq('consent','grant');",
        "  localStorage.setItem('cookieConsent','accepted');\n  enableMarketingTracking();\n  trackEvent('cookie_accept');",
    )
    html = html.replace(
        "  localStorage.setItem('cookieConsent','declined');",
        "  localStorage.setItem('cookieConsent','declined');\n  gtag('consent','update',{'ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','analytics_storage':'denied'});",
    )
    html = html.replace(
        "if(localStorage.getItem('cookieConsent'))document.getElementById('cookieBanner').style.display='none';",
        "if(localStorage.getItem('cookieConsent'))document.getElementById('cookieBanner').style.display='none';\nif(localStorage.getItem('cookieConsent')==='accepted')enableMarketingTracking();",
    )
    html = re.sub(
        r"function copyLink\(\)\{.*?\n\}",
        dedent(
            """\
            function copyLink(){
              const link = window.location.hostname ? window.location.origin : 'https://%s';
              navigator.clipboard.writeText(link).then(()=>{
                const btn=document.getElementById('copyBtn');btn.textContent='Copied! ✓';setTimeout(()=>btn.textContent='Copy Link',2000);
              });
            }"""
            % domain
        ).rstrip(),
        html,
        count=1,
        flags=re.S,
    )
    html = html.replace(
        "  answers[key]=val;\n  if(key==='region')setFocusMode(true);",
        "  answers[key]=val;\n  trackEvent('eligibility_step_completed',{step:currentStep,field:key,value:val});\n  if(key==='region')setFocusMode(true);",
    )
    html = html.replace(
        "  goStep(4);\n}",
        "  trackEvent('eligibility_step_completed',{step:3,field:'flight_details'});\n  goStep(4);\n}",
        1,
    )
    html = html.replace(
        "    box.innerHTML='<div class=\"result-icon\">🤔</div><div class=\"result-title\">Complex Case</div><p class=\"result-sub\">Separate bookings make this more complex. However there may still be grounds for a claim. Submit your details for a personal review.</p>';\n    proceed.textContent='Submit For Assessment →';return;",
        "    box.innerHTML='<div class=\"result-icon\">🤔</div><div class=\"result-title\">Complex Case</div><p class=\"result-sub\">Separate bookings make this more complex. However there may still be grounds for a claim. Submit your details for a personal review.</p>';\n    trackEvent('complex_case_result',{issue:issue,booking:booking});\n    proceed.textContent='Submit For Assessment →';return;",
    )
    html = html.replace(
        "    box.innerHTML='<div class=\"result-icon\">😔</div><div class=\"result-title\">May Not Qualify</div><p class=\"result-sub\">Compensation typically requires a 3+ hour delay. However — contact us anyway as there may be additional factors.</p>';\n    proceed.textContent='Contact Us Anyway →';return;",
        "    box.innerHTML='<div class=\"result-icon\">😔</div><div class=\"result-title\">May Not Qualify</div><p class=\"result-sub\">Compensation typically requires a 3+ hour delay. However — contact us anyway as there may be additional factors.</p>';\n    trackEvent('not_eligible_result',{issue:issue,delay:delay,region:region});\n    proceed.textContent='Contact Us Anyway →';return;",
    )
    html = html.replace(
        "  box.innerHTML=`<div class=\"result-icon\">🎉</div><div class=\"result-title\">Great News!</div><div style=\"font-size:16px;color:var(--text-muted);margin-bottom:8px;font-weight:500\">You are likely entitled to</div><div class=\"result-amount\">${symbol}${amount}</div><p class=\"result-sub\">Based on your answers, your flight qualifies for compensation. Proceed to confirm your details.</p>`;",
        "  box.innerHTML=`<div class=\"result-icon\">🎉</div><div class=\"result-title\">Great News!</div><div style=\"font-size:16px;color:var(--text-muted);margin-bottom:8px;font-weight:500\">You are likely entitled to</div><div class=\"result-amount\">${symbol}${amount}</div><p class=\"result-sub\">Based on your answers, your flight qualifies for compensation. Proceed to confirm your details.</p>`;\n  trackEvent('eligible_result',{region:region,issue:issue,amount:amount,currency:symbol});",
    )
    html = html.replace(
        "    loa_signed:'Yes'\n  };",
        "    loa_signed:'Yes',\n    ...getAttributionData()\n  };",
    )
    html = html.replace(
        "  try{\n    await fetch('https://hook.eu1.make.com/usmsr6loudf5u8w8x0l0wubi481rq7i5',{",
        "  trackEvent('claim_submit_attempt',{claim_reference:ref});\n\n  try{\n    const response = await fetch('https://hook.eu1.make.com/usmsr6loudf5u8w8x0l0wubi481rq7i5',{",
        1,
    )
    html = html.replace(
        "      body:JSON.stringify(payload)\n    });\n  }catch(e){console.log('Webhook:',e);}\n\n  document.getElementById('claimRef').textContent=ref;",
        "      body:JSON.stringify(payload)\n    });\n    if(!response.ok) throw new Error('Webhook returned '+response.status);\n    trackEvent('claim_submit_success',{claim_reference:ref,region:payload.region,issue_type:payload.issue_type});\n  }catch(e){\n    console.log('Webhook:',e);\n    trackEvent('claim_submit_error',{claim_reference:ref,error:String(e)});\n    alert('Sorry, we could not submit your claim right now. Please try again, or contact us on WhatsApp and quote your flight details.');\n    submitBtn.textContent='Submit My Claim →';\n    submitBtn.disabled=false;\n    return;\n  }\n\n  document.getElementById('claimRef').textContent=ref;",
        1,
    )
    html = html.replace(
        "      body:JSON.stringify({type:'CONTACT_FORM',full_name:name,email:email,message:msg,date_submitted:new Date().toLocaleString('en-GB')})\n    });\n  }catch(e){}\n  btn.textContent='Send Message →';btn.disabled=false;",
        "      body:JSON.stringify({type:'CONTACT_FORM',full_name:name,email:email,message:msg,date_submitted:new Date().toLocaleString('en-GB'),...getAttributionData()})\n    });\n    if(!response.ok) throw new Error('Webhook returned '+response.status);\n    trackEvent('contact_submit_success');\n  }catch(e){\n    console.log('Contact webhook:',e);\n    trackEvent('contact_submit_error',{error:String(e)});\n    showToast('Sorry, we could not send your message. Please try WhatsApp or email us directly.');\n    btn.textContent='Send Message →';btn.disabled=false;\n    return;\n  }\n  btn.textContent='Send Message →';btn.disabled=false;",
    )
    html = html.replace(
        "  try{\n    await fetch('https://hook.eu1.make.com/usmsr6loudf5u8w8x0l0wubi481rq7i5',{",
        "  try{\n    const response = await fetch('https://hook.eu1.make.com/usmsr6loudf5u8w8x0l0wubi481rq7i5',{",
        1,
    )
    html = html.replace(
        "</script>\n</body>",
        dedent(
            """\
              document.addEventListener('click',function(e){
                const wa=e.target.closest('a[href*="wa.me"]');
                if(wa)trackEvent('whatsapp_click',{destination:wa.href});
                const checker=e.target.closest('a[href="#checker"]');
                if(checker)trackEvent('claim_checker_start',{source_text:checker.textContent.trim()});
              });
            </script>
            </body>"""
        ),
        1,
    )
    return html


def improve_conversion_surface(html: str, *, variant: str) -> str:
    html = html.replace(
        ".wa-btn{position:fixed;bottom:32px;right:32px;z-index:980;width:64px;height:64px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 25px rgba(37,211,102,0.4);text-decoration:none;font-size:32px;transition:all 0.3s cubic-bezier(0.175,0.885,0.32,1.275);}",
        ".wa-btn{position:fixed;bottom:32px;right:32px;z-index:980;width:64px;height:64px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 25px rgba(37,211,102,0.4);text-decoration:none;font-size:32px;transition:bottom 0.3s ease,transform 0.3s cubic-bezier(0.175,0.885,0.32,1.275),box-shadow 0.3s;}",
    )
    if ".cookie-banner-visible .wa-btn" not in html:
        html = html.replace(
            ".wa-btn:hover{transform:scale(1.1) translateY(-4px);box-shadow:0 15px 35px rgba(37,211,102,0.5);color:#fff;}",
            ".wa-btn:hover{transform:scale(1.1) translateY(-4px);box-shadow:0 15px 35px rgba(37,211,102,0.5);color:#fff;}\n.cookie-banner-visible .wa-btn{bottom:156px;}",
        )
    else:
        html = html.replace(".cookie-banner-visible .wa-btn{bottom:132px;}", ".cookie-banner-visible .wa-btn{bottom:156px;}")

    html = html.replace(
        "@media(max-width:768px){nav{padding:16px 24px;}.nav-links{display:none;}.options-grid{grid-template-columns:1fr;}.contact-grid{grid-template-columns:1fr;gap:48px;}.checker-box{padding:32px 20px;}section{padding:80px 20px;}.cookie-banner{padding:20px;flex-direction:column;text-align:center;}.modal-inner{padding:40px 24px;}.hero-title,.hero-title-gold{font-size:40px;}}",
        "@media(max-width:768px){nav{padding:16px 24px;}.nav-links{display:none;}.options-grid{grid-template-columns:1fr;}.contact-grid{grid-template-columns:1fr;gap:48px;}.checker-box{padding:32px 20px;}section{padding:80px 20px;}.cookie-banner{padding:20px;flex-direction:column;text-align:center;}.cookie-banner-visible .wa-btn{bottom:236px;right:20px;width:58px;height:58px;}.modal-inner{padding:40px 24px;}.hero-title,.hero-title-gold{font-size:40px;}}",
    )
    html = html.replace(
        "@media(max-width:768px){nav{padding:16px 24px;}.nav-links{display:none;}.options-grid{grid-template-columns:1fr;}.contact-grid{grid-template-columns:1fr;gap:48px;}.checker-box{padding:32px 20px;}section{padding:80px 20px;}.cookie-banner{padding:20px;flex-direction:column;text-align:center;}.cookie-banner-visible .wa-btn{bottom:214px;right:20px;width:58px;height:58px;}.modal-inner{padding:40px 24px;}.hero-title,.hero-title-gold{font-size:40px;}}",
        "@media(max-width:768px){nav{padding:16px 24px;}.nav-links{display:none;}.options-grid{grid-template-columns:1fr;}.contact-grid{grid-template-columns:1fr;gap:48px;}.checker-box{padding:32px 20px;}section{padding:80px 20px;}.cookie-banner{padding:20px;flex-direction:column;text-align:center;}.cookie-banner-visible .wa-btn{bottom:236px;right:20px;width:58px;height:58px;}.modal-inner{padding:40px 24px;}.hero-title,.hero-title-gold{font-size:40px;}}",
    )

    html = html.replace(
        "  document.getElementById('cookieBanner').style.display='none';\n  localStorage.setItem('cookieConsent','accepted');\n  enableMarketingTracking();",
        "  document.getElementById('cookieBanner').style.display='none';\n  localStorage.setItem('cookieConsent','accepted');\n  syncFloatingLeadButtons();\n  enableMarketingTracking();",
    )
    html = html.replace(
        "  document.getElementById('cookieBanner').style.display='none';\n  localStorage.setItem('cookieConsent','declined');\n  gtag('consent','update'",
        "  document.getElementById('cookieBanner').style.display='none';\n  localStorage.setItem('cookieConsent','declined');\n  syncFloatingLeadButtons();\n  gtag('consent','update'",
    )
    if "function syncFloatingLeadButtons()" not in html:
        html = html.replace(
            "if(localStorage.getItem('cookieConsent'))document.getElementById('cookieBanner').style.display='none';\nif(localStorage.getItem('cookieConsent')==='accepted')enableMarketingTracking();",
            "function syncFloatingLeadButtons(){\n  const banner=document.getElementById('cookieBanner');\n  const bannerVisible=banner && banner.style.display !== 'none' && !localStorage.getItem('cookieConsent');\n  document.body.classList.toggle('cookie-banner-visible', !!bannerVisible);\n}\nif(localStorage.getItem('cookieConsent'))document.getElementById('cookieBanner').style.display='none';\nsyncFloatingLeadButtons();\nif(localStorage.getItem('cookieConsent')==='accepted')enableMarketingTracking();",
        )

    if variant == "uk":
        html = html.replace("EC261 & UK261 Specialists", "UK & EU Passenger Rights Specialists")
        html = html.replace("Your Flight Was Delayed.", "UK & EU Flight Delayed?")
        html = html.replace(
            "Our passenger rights experts handle your claim from start to finish — at no cost to you unless we win. Covering UK, EU and transatlantic routes worldwide.",
            "For passengers in the UK and across Europe. We handle delayed, cancelled and overbooked flight claims from start to finish — no win, no fee.",
        )
        html = html.replace("Check My Claim Free →", "Check My UK & EU Claim Free →", 1)
        html = html.replace("UK & EU Flights Covered", "UK & EU Passengers Covered")
    return html


def remove_div_by_id(html: str, element_id: str) -> str:
    id_pos = html.find(f'id="{element_id}"')
    if id_pos == -1:
        return html
    start = html.rfind("<div", 0, id_pos)
    if start == -1:
        return html

    depth = 0
    tag_pattern = re.compile(r"<(/?)div\b[^>]*>", re.I)
    for match in tag_pattern.finditer(html, start):
        is_close = bool(match.group(1))
        if is_close:
            depth -= 1
            if depth == 0:
                return html[:start] + html[match.end():]
        else:
            depth += 1
    return html


def make_variant(raw: str, *, domain: str, variant: str) -> str:
    html = replace_analytics(raw)
    html = update_head(html, domain=domain, variant=variant)
    html = improve_common_js(html, domain=domain)
    html = improve_conversion_surface(html, variant=variant)

    if variant == "uk":
        html = remove_div_by_id(html, "heroUS")
        html = remove_div_by_id(html, "trustUS")
        html = html.replace("Airlines Owe You Up To £600.", "Airlines Owe You Up To £520/€600.")
        html = html.replace("<div class=\"stat-val\">£600</div><div class=\"stat-label\">Max Compensation</div>", "<div class=\"stat-val\">£520</div><div class=\"stat-label\">UK Max / €600 EU</div>")
    else:
        html = html.replace('<div id="heroDefault">', '<div id="heroDefault" style="display:none">', 1)
        html = html.replace('<h1 class="hero-title">Your Flight Was Delayed.</h1>', '<h2 class="hero-title">Your Flight Was Delayed.</h2>', 1)
        html = html.replace('<div id="heroUS" style="display:none">', '<div id="heroUS">', 1)
        html = html.replace('<h2 class="hero-title">Your Europe Trip Was Delayed?</h2>', '<h1 class="hero-title">Your Europe Trip Was Delayed?</h1>', 1)
        html = html.replace('<div class="trust-bar" id="trustDefault">', '<div class="trust-bar" id="trustDefault" style="display:none">', 1)
        html = html.replace('<div class="trust-bar" id="trustUS" style="display:none">', '<div class="trust-bar" id="trustUS" style="display:flex">', 1)
        html = remove_div_by_id(html, "heroDefault")
        html = remove_div_by_id(html, "trustDefault")
        html = html.replace("https%3A%2F%2Fflightrefundclaim.co.uk", "https%3A%2F%2Fflightrefundclaim.com")
        html = html.replace("%C2%A3600", "%24650")
        html = html.replace("you%20could%20be%20owed%20up%20to%20%C2%A3600", "you%20could%20be%20owed%20up%20to%20%24650")
        html = html.replace("https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fflightrefundclaim.co.uk", "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fflightrefundclaim.com")
        html = html.replace(
            "function switchToPolish(){",
            "if(location.hostname.includes('flightrefundclaim.com'))showUSVersion();\n\nfunction switchToPolish(){",
            1,
        )
    return html


def write_text(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")


def robots(domain: str) -> str:
    return f"User-agent: *\nAllow: /\n\nSitemap: https://{domain}/sitemap.xml\n"


def sitemap(domain: str, pages: list[str]) -> str:
    urls = []
    for loc, priority in pages:
        urls.append(
            f"  <url>\n    <loc>https://{domain}{loc}</loc>\n    <lastmod>2026-07-03</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>{priority}</priority>\n  </url>"
        )
    return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + "\n".join(urls) + "\n</urlset>\n"


def redirects(domain: str) -> str:
    return dedent(
        f"""\
        https://www.{domain}/* https://{domain}/:splat 301!
        http://{domain}/* https://{domain}/:splat 301!
        http://www.{domain}/* https://{domain}/:splat 301!
        """
    )


def headers() -> str:
    return dedent(
        """\
        /*
          X-Frame-Options: DENY
          X-Content-Type-Options: nosniff
          Referrer-Policy: strict-origin-when-cross-origin
          Permissions-Policy: geolocation=(), camera=(), microphone=()
        """
    )


def font(size: int, bold: bool = False):
    candidates = [
        "/System/Library/Fonts/SFNS.ttf",
        "/System/Library/Fonts/SFNSMono.ttf",
        "/Library/Fonts/Arial.ttf",
    ]
    for candidate in candidates:
        try:
            return ImageFont.truetype(candidate, size=size)
        except Exception:
            pass
    return ImageFont.load_default()


def draw_wrapped(draw, text, xy, fnt, fill, max_width, line_gap=10):
    x, y = xy
    words = text.split()
    lines = []
    line = ""
    for word in words:
        test = (line + " " + word).strip()
        if draw.textbbox((0, 0), test, font=fnt)[2] <= max_width:
            line = test
        else:
            lines.append(line)
            line = word
    if line:
        lines.append(line)
    for line in lines:
        draw.text((x, y), line, font=fnt, fill=fill)
        y += draw.textbbox((0, 0), line, font=fnt)[3] + line_gap
    return y


def make_og(path: Path, *, variant: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    img = Image.new("RGB", (1200, 630), "#f8fafc")
    draw = ImageDraw.Draw(img)
    navy = "#0f172a"
    gold = "#d4af37"
    muted = "#64748b"

    for i in range(630):
        ratio = i / 630
        r = int(248 * (1 - ratio) + 255 * ratio)
        g = int(250 * (1 - ratio) + 251 * ratio)
        b = int(252 * (1 - ratio) + 235 * ratio)
        draw.line((0, i, 1200, i), fill=(r, g, b))

    draw.rounded_rectangle((70, 70, 1130, 560), radius=36, fill="#ffffff", outline="#e2e8f0", width=3)
    draw.ellipse((840, 80, 1110, 350), fill="#fef3c7")
    draw.polygon([(875, 260), (1080, 190), (1040, 230), (970, 260), (1060, 330), (1010, 350), (930, 285)], fill=gold)
    draw.rectangle((70, 70, 1130, 142), fill=navy)
    draw.text((105, 92), "FlightRefundClaim", font=font(34, True), fill="#ffffff")
    draw.text((1010, 94), "No Win, No Fee", font=font(24, True), fill="#ffffff", anchor="ra")

    if variant == "uk":
        eyebrow = "UK261 & EC261 COMPENSATION"
        headline = "Delayed or Cancelled Flight?"
        sub = "Claim up to £520 / €600 per passenger"
        cta = "Free 2-minute eligibility check"
    else:
        eyebrow = "FOR US TRAVELLERS IN EUROPE"
        headline = "Europe Trip Delayed?"
        sub = "You may be owed up to about $650"
        cta = "UK and EU passenger rights apply to visitors too"

    draw.text((110, 190), eyebrow, font=font(24, True), fill=gold)
    y = draw_wrapped(draw, headline, (110, 238), font(62, True), navy, 680, 8)
    y = draw_wrapped(draw, sub, (110, y + 14), font(34, True), navy, 760, 8)
    cta_top = max(y + 18, 474)
    cta_top = min(cta_top, 496)
    draw.rounded_rectangle((110, cta_top, 560, cta_top + 54), radius=27, fill=gold)
    draw.text((335, cta_top + 15), cta, font=font(20, True), fill="#ffffff", anchor="ma")
    draw.text((110, 536), "flightrefundclaim.co.uk" if variant == "uk" else "flightrefundclaim.com", font=font(22), fill=muted)
    img.save(path, "PNG")


def write_supporting_docs() -> None:
    write_text(
        OUT / "README.md",
        dedent(
            """\
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
            """
        ),
    )

    write_text(
        OUT / "promotion" / "seo-page-roadmap.md",
        dedent(
            """\
            # SEO Page Roadmap

            ## UK domain pages

            Publish these first on `flightrefundclaim.co.uk`:

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
            - `/heathrow-flight-delay-compensation/`
            - `/gatwick-flight-delay-compensation/`
            - `/stansted-flight-delay-compensation/`
            - `/luton-flight-delay-compensation/`

            ## US domain pages

            Publish these first on `flightrefundclaim.com`:

            - `/europe-flight-delay-compensation-for-americans/`
            - `/uk-flight-delay-compensation-for-us-travellers/`
            - `/eu261-compensation-for-americans/`
            - `/american-airlines-europe-delay-compensation/`
            - `/delta-europe-delay-compensation/`
            - `/united-europe-delay-compensation/`
            - `/what-us-passengers-should-do-after-a-europe-flight-delay/`

            ## Page structure

            Each page should include:

            - One specific H1 matching the search intent.
            - 700 to 1,200 useful words.
            - Eligibility rules in plain English.
            - Compensation amount table.
            - Airline or airport-specific examples.
            - FAQ section.
            - Claim checker CTA.
            - Internal links to related pages.
            - FAQPage schema where the FAQ is visible on the page.
            """
        ),
    )

    write_text(
        OUT / "promotion" / "google-ads-keywords.csv",
        dedent(
            """\
            Campaign,Ad Group,Keyword,Match Type,Intent
            UK Claims,Flight Delay,"flight delay compensation uk",Phrase,High
            UK Claims,Flight Delay,"claim flight delay compensation",Phrase,High
            UK Claims,Flight Delay,"delayed flight compensation",Phrase,High
            UK Claims,Cancellations,"cancelled flight compensation uk",Phrase,High
            UK Claims,Cancellations,"flight cancelled compensation",Phrase,High
            UK Claims,UK261,"uk261 compensation",Exact,High
            UK Claims,EC261,"ec261 compensation claim",Phrase,High
            Airline Claims,Ryanair,"ryanair delay compensation",Phrase,High
            Airline Claims,easyJet,"easyjet compensation claim",Phrase,High
            Airline Claims,Wizz Air,"wizz air compensation",Phrase,High
            Airline Claims,British Airways,"british airways delay compensation",Phrase,High
            US Travellers,Europe Delay,"europe flight delay compensation for americans",Phrase,High
            US Travellers,UK/EU Rights,"eu flight compensation us passenger",Phrase,High
            US Travellers,Airlines,"american airlines europe delay compensation",Phrase,Medium
            US Travellers,Airlines,"delta europe flight delay compensation",Phrase,Medium
            US Travellers,Airlines,"united europe flight delay compensation",Phrase,Medium
            Negative,General,"jobs",Negative,Low
            Negative,General,"baggage",Negative,Low
            Negative,General,"seat refund",Negative,Low
            Negative,General,"customer service number",Negative,Low
            Negative,General,"free template",Negative,Low
            """
        ),
    )

    write_text(
        OUT / "promotion" / "ad-copy.md",
        dedent(
            """\
            # Ad Copy

            ## UK search ads

            Headlines:

            - Flight Delayed? Claim Today
            - UK & EU Compensation Claims
            - No Win, No Fee Flight Claims
            - Claim Up To £520 / €600
            - Free 2-Minute Eligibility Check

            Descriptions:

            - Delayed, cancelled or denied boarding? Check your claim in 2 minutes. No win, no fee.
            - We handle UK261 and EC261 claims from start to finish. Pay only if we recover compensation.
            - Airline rejected your claim? Let our team review it and escalate where possible.

            ## US traveller search ads

            Headlines:

            - Europe Trip Delayed?
            - US Travellers Can Claim
            - UK & EU Flight Compensation
            - Claim Up To About $650
            - Free Eligibility Check

            Descriptions:

            - US passengers can be protected by UK and EU flight rules when departing Europe. Check free.
            - Delayed from London, Paris, Rome or another UK/EU airport? You may be owed compensation.
            - No win, no fee support for American travellers affected by UK and EU flight disruption.

            ## Social hooks

            - Delayed 4 hours from Gatwick? You may be owed compensation.
            - Airline blamed a technical fault? That may still qualify.
            - Flying home from Europe to the US? UK/EU passenger rights may protect you.
            - Cancelled less than 14 days before departure? Check your claim.
            """
        ),
    )

    write_text(
        OUT / "promotion" / "trust-page-copy.md",
        dedent(
            """\
            # About And Trust Page Copy

            ## Draft copy

            FlightRefundClaim helps passengers recover compensation for delayed, cancelled and overbooked flights under UK261 and EC261/2004.

            We are a passenger-rights claims service, not a law firm. We review each claim honestly, prepare the airline submission, handle follow-up correspondence and escalate eligible cases where appropriate.

            Our fee is 30% of recovered compensation and is charged only after a successful recovery. If we do not recover compensation for you, you do not pay us a service fee.

            ## Add before publishing

            - Registered business name.
            - Company number or sole trader details.
            - Registered or service address.
            - Data controller name.
            - Complaint handling process.
            - Exact fee wording, including whether VAT applies.
            - How and when customers receive recovered compensation.
            - How long documents and signatures are stored.
            """
        ),
    )


def main() -> None:
    raw = SOURCE.read_text(encoding="utf-8")

    uk = make_variant(raw, domain="flightrefundclaim.co.uk", variant="uk")
    us = make_variant(raw, domain="flightrefundclaim.com", variant="us")

    uk_pages = [
        ("/", "1.0"),
        ("/flight-delay-compensation-uk/", "0.9"),
        ("/uk261-compensation-claim/", "0.9"),
        ("/eu261-compensation-claim/", "0.9"),
        ("/ryanair-flight-delay-compensation/", "0.8"),
        ("/easyjet-flight-delay-compensation/", "0.8"),
        ("/wizz-air-flight-delay-compensation/", "0.8"),
    ]
    us_pages = [
        ("/", "1.0"),
        ("/eu-flight-delay-compensation/", "0.9"),
        ("/eu261-compensation-for-us-passengers/", "0.9"),
        ("/delayed-flight-from-europe-to-usa/", "0.9"),
        ("/american-airlines-eu-flight-delay/", "0.8"),
        ("/delta-eu-flight-delay-compensation/", "0.8"),
        ("/united-eu-flight-delay-compensation/", "0.8"),
    ]

    for folder, domain, html, pages, variant in [
        ("uk-site", "flightrefundclaim.co.uk", uk, uk_pages, "uk"),
        ("us-site", "flightrefundclaim.com", us, us_pages, "us"),
    ]:
        base = OUT / folder
        write_text(base / "index.html", html)
        write_text(base / "robots.txt", robots(domain))
        write_text(base / "sitemap.xml", sitemap(domain, pages))
        write_text(base / "_redirects", redirects(domain))
        write_text(base / "_headers", headers())
        make_og(base / "og-image.png", variant=variant)

    write_supporting_docs()


if __name__ == "__main__":
    main()
