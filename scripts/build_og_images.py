"""Build 1200x630 OpenGraph cards from the approved primal diagrams.

    py -3.11 scripts/build_og_images.py            # writes public/images/og/*.jpg
    py -3.11 scripts/build_og_images.py --check    # verifies without writing

Why this exists. The cut and temperature pages were serving the primal diagram
itself as og:image. Those files are 1.25 to 2.25 aspect (measured, not
assumed), and a share card is 1.91. Facebook, X, Slack, iMessage and LinkedIn
all centre-crop to their own ratio, so the chicken diagram lost about a third
of its width, and what sits at the edges of a labelled diagram is the labels.
A cut chart with the cut names cropped off is worse than no image.

This is production, not design. It does not redraw, recolour, restyle or add
anything: it scales the approved diagram down to fit inside the card and fills
the remaining space with that diagram's own dominant background colour, so the
seam is invisible and no pixel of the original is lost. The page title and
description already carry the words, so the card needs no text of its own.

Re-run it whenever a diagram in public/images/cuts/ changes.
"""

from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "images" / "cuts"
OUT = ROOT / "public" / "images" / "og"

# The share-card frame every major platform crops toward.
CARD = (1200, 630)
# Breathing room so the diagram never touches the card edge.
PAD = 28
ANIMALS = ["beef", "pork", "lamb", "goat", "chicken", "salmon"]


def dominant_bg(im: Image.Image) -> tuple[int, int, int]:
    """The diagram's own paper colour, so the fill reads as more of the sheet."""
    small = im.resize((64, 64)).convert("RGB")
    counts = small.getcolors(64 * 64) or []
    return max(counts)[1] if counts else (247, 239, 226)


def build(animal: str, check: bool) -> str:
    src = SRC / f"{animal}-primal-diagram.png"
    if not src.exists():
        return f"MISSING  {src.relative_to(ROOT)}"
    im = Image.open(src).convert("RGB")
    bg = dominant_bg(im)

    box = (CARD[0] - PAD * 2, CARD[1] - PAD * 2)
    scale = min(box[0] / im.width, box[1] / im.height)
    # Never upscale: a 1080px-wide master blown up would just look soft.
    scale = min(scale, 1.0)
    size = (round(im.width * scale), round(im.height * scale))
    card = Image.new("RGB", CARD, bg)
    card.paste(im.resize(size, Image.LANCZOS), ((CARD[0] - size[0]) // 2, (CARD[1] - size[1]) // 2))

    dst = OUT / f"{animal}.jpg"
    if check:
        if not dst.exists():
            return f"ABSENT   {dst.relative_to(ROOT)}"
        have = Image.open(dst)
        ok = have.size == CARD
        return f"{'OK      ' if ok else 'WRONG   '} {dst.relative_to(ROOT)} {have.size[0]}x{have.size[1]}"

    OUT.mkdir(parents=True, exist_ok=True)
    card.save(dst, "JPEG", quality=88, optimize=True, progressive=True)
    kb = dst.stat().st_size // 1024
    return f"WROTE    {dst.relative_to(ROOT)}  {CARD[0]}x{CARD[1]}  {kb} KB  (from {im.width}x{im.height}, fill {bg})"


def main() -> int:
    check = "--check" in sys.argv
    lines = [build(a, check) for a in ANIMALS]
    print("\n".join(lines))
    bad = [ln for ln in lines if ln.startswith(("MISSING", "ABSENT", "WRONG"))]
    print()
    print(f"{len(ANIMALS) - len(bad)}/{len(ANIMALS)} share cards {'verified' if check else 'built'}.")
    return 1 if bad else 0


if __name__ == "__main__":
    raise SystemExit(main())
