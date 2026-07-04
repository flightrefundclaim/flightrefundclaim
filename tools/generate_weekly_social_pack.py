from __future__ import annotations

import csv
from datetime import date
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "outputs" / "weekly-social-pack-2026-07-05"
ASSETS = OUT / "assets"
BASE_IMAGE = ROOT / "outputs" / "social-assets" / "flightrefundclaim-airport-delay-ad.png"
FONT_BOLD = "/System/Library/Fonts/Supplemental/Verdana Bold.ttf"
FONT_REGULAR = "/System/Library/Fonts/Supplemental/Verdana.ttf"


POSTS = [
    {
        "day": "Sunday",
        "date": date(2026, 7, 5),
        "time": "18:30",
        "angle": "Weekend travel disruption",
        "headline": "WEEKEND FLIGHT DELAY?",
        "subhead": "You may be able to claim up to £520 / €600",
        "badge": "FREE ELIGIBILITY CHECK",
        "cta": "NO WIN, NO FEE",
        "utm": "week1_sun_delay",
        "path": "",
        "caption": "Weekend flight delayed or cancelled from the UK or EU?\n\nYou may be able to claim up to £520 / €600 per passenger under UK/EU passenger rights rules.\n\nFlightRefundClaim offers a free eligibility check and works on a no win, no fee basis.\n\nCheck your claim here:\n{link}\n\n#FlightDelay #FlightCompensation #UK261 #EU261 #TravelHelp",
    },
    {
        "day": "Monday",
        "date": date(2026, 7, 6),
        "time": "09:15",
        "angle": "Back-to-work airport delays",
        "headline": "DELAYED ON BUSINESS?",
        "subhead": "UK & EU passengers may have compensation rights",
        "badge": "CHECK IN 2 MINUTES",
        "cta": "CLAIM SUPPORT",
        "utm": "week1_mon_business",
        "path": "flight-delay-compensation-uk/",
        "caption": "Delayed on a work trip or while travelling from a UK/EU airport?\n\nIf your flight arrived more than 3 hours late, you may have a claim under UK261 or EU261 rules.\n\nStart with a free eligibility check:\n{link}\n\n#BusinessTravel #FlightDelay #UK261 #EU261 #FlightCompensation",
    },
    {
        "day": "Tuesday",
        "date": date(2026, 7, 7),
        "time": "12:45",
        "angle": "Rights education",
        "headline": "3+ HOURS LATE?",
        "subhead": "That delay may be worth checking",
        "badge": "UK261 / EU261",
        "cta": "FREE CLAIM CHECK",
        "utm": "week1_tue_three_hours",
        "path": "uk261-compensation-claim/",
        "caption": "Was your flight 3+ hours late arriving?\n\nUnder UK261/EU261 rules, some passengers can claim compensation when the airline was responsible for the disruption.\n\nCheck your eligibility here:\n{link}\n\n#KnowYourRights #FlightDelay #UK261 #EU261 #TravelTips",
    },
    {
        "day": "Wednesday",
        "date": date(2026, 7, 8),
        "time": "19:00",
        "angle": "Cancelled flights",
        "headline": "FLIGHT CANCELLED?",
        "subhead": "If it was short notice, check your rights",
        "badge": "NO UPFRONT COST",
        "cta": "SEE IF YOU QUALIFY",
        "utm": "week1_wed_cancelled",
        "path": "eu261-compensation-claim/",
        "caption": "Flight cancelled at short notice?\n\nDepending on the route, timing, and reason, UK/EU passengers may be entitled to compensation.\n\nFlightRefundClaim can review it on a no win, no fee basis:\n{link}\n\n#CancelledFlight #EU261 #UK261 #PassengerRights #TravelHelp",
    },
    {
        "day": "Thursday",
        "date": date(2026, 7, 9),
        "time": "08:30",
        "angle": "Family holiday protection",
        "headline": "FAMILY HOLIDAY DELAY?",
        "subhead": "Compensation can apply per passenger",
        "badge": "UP TO £520 / €600 EACH",
        "cta": "CHECK THE BOOKING",
        "utm": "week1_thu_family",
        "path": "",
        "caption": "Family holiday delayed from the UK or EU?\n\nCompensation may apply per passenger, not just per booking, when the flight qualifies under UK/EU rules.\n\nCheck your claim here:\n{link}\n\n#FamilyTravel #FlightDelay #HolidayTravel #UK261 #EU261",
    },
    {
        "day": "Friday",
        "date": date(2026, 7, 10),
        "time": "16:30",
        "angle": "Airline rejection review",
        "headline": "AIRLINE SAID NO?",
        "subhead": "A rejected claim may still be worth reviewing",
        "badge": "FREE REVIEW",
        "cta": "NO WIN, NO FEE",
        "utm": "week1_fri_rejected",
        "path": "",
        "caption": "Did the airline reject your delay or cancellation claim?\n\nSome rejected claims are still worth reviewing, especially if the reason was unclear or disputed.\n\nAsk FlightRefundClaim to check it:\n{link}\n\n#FlightClaim #AirlineCompensation #TravelRights #UK261 #EU261",
    },
    {
        "day": "Saturday",
        "date": date(2026, 7, 11),
        "time": "11:00",
        "angle": "Easy weekend explainer",
        "headline": "KEEP YOUR BOARDING PASS",
        "subhead": "It can help support a flight delay claim",
        "badge": "TRAVEL TIP",
        "cta": "SAVE YOUR DETAILS",
        "utm": "week1_sat_boarding_pass",
        "path": "",
        "caption": "Travel tip: if your flight is delayed or cancelled, keep your boarding pass, booking reference, and airline messages.\n\nThose details can help when checking a compensation claim.\n\nFree eligibility check:\n{link}\n\n#TravelTip #FlightDelay #PassengerRights #UKTravel #EUTravel",
    },
]


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size=size)


def draw_wrapped(draw: ImageDraw.ImageDraw, text: str, xy: tuple[int, int], width: int, fnt, fill: str, spacing: int = 8) -> int:
    words = text.split()
    lines: list[str] = []
    line = ""
    for word in words:
        trial = f"{line} {word}".strip()
        if draw.textbbox((0, 0), trial, font=fnt)[2] <= width:
            line = trial
        else:
            if line:
                lines.append(line)
            line = word
    if line:
        lines.append(line)
    y = xy[1]
    for line in lines:
        draw.text((xy[0], y), line, font=fnt, fill=fill)
        y += draw.textbbox((0, 0), line, font=fnt)[3] + spacing
    return y


def make_card(post: dict, index: int) -> str:
    base = Image.open(BASE_IMAGE).convert("RGB").resize((1080, 1080))
    overlay = Image.new("RGBA", base.size, (4, 18, 35, 0))
    draw_o = ImageDraw.Draw(overlay)
    draw_o.rectangle((0, 0, 1080, 1080), fill=(4, 18, 35, 70))
    draw_o.rectangle((0, 0, 615, 1080), fill=(4, 18, 35, 230))
    draw_o.rectangle((42, 42, 1038, 1038), outline=(223, 178, 84, 185), width=4)
    base = Image.alpha_composite(base.convert("RGBA"), overlay)
    draw = ImageDraw.Draw(base)

    gold = "#d6aa4c"
    white = "#ffffff"
    pale = "#d8e6f3"
    navy = "#041223"

    draw.text((74, 78), "FlightRefundClaim", font=font(FONT_BOLD, 38), fill=gold)
    draw.text((74, 132), "UK & EU passenger rights", font=font(FONT_REGULAR, 26), fill=pale)
    draw.line((74, 180, 540, 180), fill=gold, width=3)

    y = 235
    y = draw_wrapped(draw, post["headline"], (74, y), 490, font(FONT_BOLD, 64), white, 8)
    y += 24
    y = draw_wrapped(draw, post["subhead"], (74, y), 475, font(FONT_BOLD, 34), gold, 8)

    badge_y = 750
    draw.rounded_rectangle((74, badge_y, 550, badge_y + 82), radius=8, fill=gold)
    draw_wrapped(draw, post["badge"], (100, badge_y + 22), 425, font(FONT_BOLD, 26), navy, 4)

    draw.rounded_rectangle((74, 858, 550, 946), radius=8, outline=white, width=3)
    draw_wrapped(draw, post["cta"], (100, 883), 420, font(FONT_BOLD, 28), white, 4)

    draw.text((74, 984), "Free check • No win, no fee", font=font(FONT_REGULAR, 26), fill=pale)

    filename = f"{index:02d}-{post['date'].isoformat()}-{post['utm']}.png"
    base.convert("RGB").save(ASSETS / filename, quality=95)
    return f"assets/{filename}"


def make_markdown(posts: list[dict]) -> str:
    lines = [
        "# FlightRefundClaim Weekly Social Pack",
        "",
        "Week: Sunday 5 July 2026 to Saturday 11 July 2026",
        "",
        "Focus: UK and European flight passengers. Use these as organic Facebook and Instagram posts. Do not boost or schedule paid ads unless Pawel explicitly approves a paid campaign.",
        "",
        "## Posting Plan",
        "",
    ]
    for i, post in enumerate(posts, 1):
        facebook_caption = post["caption"].format(link=post["facebook_link"])
        instagram_caption = post["caption"].format(link=post["instagram_link"]).replace(
            "Check your claim here:", "Use the link to check your claim:"
        )
        lines.extend(
            [
                f"### {i}. {post['day']} {post['date'].strftime('%d %b')} at {post['time']} - {post['angle']}",
                "",
                f"Image: `{post['asset']}`",
                "",
                f"Facebook tracked link: {post['facebook_link']}",
                "",
                f"Instagram tracked link: {post['instagram_link']}",
                "",
                "Facebook caption:",
                "",
                facebook_caption,
                "",
                "Instagram caption:",
                "",
                instagram_caption,
                "",
            ]
        )
    return "\n".join(lines)


def main() -> None:
    ASSETS.mkdir(parents=True, exist_ok=True)
    for index, post in enumerate(POSTS, 1):
        base = f"https://flightrefundclaim.co.uk/{post['path']}"
        post["facebook_link"] = f"{base}?utm_source=facebook&utm_medium=social&utm_campaign=uk_weekly_visibility&utm_content={post['utm']}"
        post["instagram_link"] = f"{base}?utm_source=instagram&utm_medium=social&utm_campaign=uk_weekly_visibility&utm_content={post['utm']}"
        post["asset"] = make_card(post, index)

    (OUT / "weekly-social-planner.md").write_text(make_markdown(POSTS), encoding="utf-8")

    with (OUT / "weekly-social-planner.csv").open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(
            handle,
            fieldnames=[
                "day",
                "date",
                "time",
                "angle",
                "asset",
                "facebook_tracked_link",
                "instagram_tracked_link",
                "facebook_caption",
                "instagram_caption",
            ],
        )
        writer.writeheader()
        for post in POSTS:
            facebook_caption = post["caption"].format(link=post["facebook_link"])
            instagram_caption = post["caption"].format(link=post["instagram_link"]).replace(
                "Check your claim here:", "Use the link to check your claim:"
            )
            writer.writerow(
                {
                    "day": post["day"],
                    "date": post["date"].isoformat(),
                    "time": post["time"],
                    "angle": post["angle"],
                    "asset": post["asset"],
                    "facebook_tracked_link": post["facebook_link"],
                    "instagram_tracked_link": post["instagram_link"],
                    "facebook_caption": facebook_caption,
                    "instagram_caption": instagram_caption,
                }
            )


if __name__ == "__main__":
    main()
