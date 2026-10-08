"""Create the lightbox preview for a new certificate and print its assets entry.

Optional helper — the site itself has no Python dependency.

    pip install pymupdf pillow
    python scripts/certificate_preview.py public/certificates/my-new-cert.pdf

Writes public/certificates/previews/<name>.webp (longest side 1600px) and
prints the line to add to `certificateAssets` in src/lib/data/assets.ts.
Works with .pdf, .jpg, .jpeg and .png files placed in public/certificates/.
"""
import io
import sys
from pathlib import Path

from PIL import Image

MAX_SIDE = 1600


def render(path: Path) -> tuple[Image.Image, int]:
    if path.suffix.lower() == ".pdf":
        import pymupdf

        doc = pymupdf.open(path)
        page = doc[0]
        zoom = MAX_SIDE / max(page.rect.width, page.rect.height)
        pix = page.get_pixmap(matrix=pymupdf.Matrix(zoom, zoom), alpha=False)
        return Image.open(io.BytesIO(pix.tobytes("png"))), doc.page_count
    return Image.open(path), 1


def main() -> None:
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    src = Path(sys.argv[1])
    if src.parent.name != "certificates":
        sys.exit("Place the file in public/certificates/ first.")
    img, pages = render(src)
    scale = min(1.0, MAX_SIDE / max(img.size))
    if scale < 1.0:
        img = img.resize((round(img.width * scale), round(img.height * scale)), Image.LANCZOS)
    img = img.convert("RGB")
    out = src.parent / "previews" / f"{src.stem}.webp"
    out.parent.mkdir(exist_ok=True)
    img.save(out, "WEBP", quality=80, method=6)
    print(f'  "{src.stem}": {{ file: "/certificates/{src.name}", preview: "/certificates/previews/{out.name}", '
          f"width: {img.width}, height: {img.height}, pages: {pages}, bytes: {src.stat().st_size} }},")


if __name__ == "__main__":
    main()
