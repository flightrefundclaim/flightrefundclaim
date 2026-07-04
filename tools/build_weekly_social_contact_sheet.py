from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
PACK = ROOT / "outputs" / "weekly-social-pack-2026-07-05"
ASSETS = sorted((PACK / "assets").glob("*.png"))
OUT = PACK / "contact-sheet.png"
FONT = "/System/Library/Fonts/Supplemental/Verdana Bold.ttf"


def main() -> None:
    thumb_size = 320
    margin = 28
    label_h = 42
    cols = 4
    rows = 2
    sheet = Image.new("RGB", (cols * thumb_size + (cols + 1) * margin, rows * (thumb_size + label_h) + (rows + 1) * margin), "#f2f4f7")
    draw = ImageDraw.Draw(sheet)
    font = ImageFont.truetype(FONT, 18)
    for idx, path in enumerate(ASSETS):
        row = idx // cols
        col = idx % cols
        x = margin + col * (thumb_size + margin)
        y = margin + row * (thumb_size + label_h + margin)
        img = Image.open(path).convert("RGB").resize((thumb_size, thumb_size))
        sheet.paste(img, (x, y))
        draw.text((x, y + thumb_size + 10), path.name[:32], fill="#111827", font=font)
    sheet.save(OUT, quality=95)


if __name__ == "__main__":
    main()
