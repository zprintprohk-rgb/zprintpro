#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
2026-08-19 P0-A: PIL re-encode 14 张 4:3 低质图 (q=85 → 180-220 KB)
K3 拍板: 11 张 AR 非 4:3 + 14 张 4:3 但 KB 偏低 (< 120KB)
目标: 质量提升但保持 4:3 比例, 适合 about 页 B2B 信任视觉
"""
import os
import sys
from PIL import Image

FACTORY_DIR = r"F:\zprintpro-nextjs\public\images\factory"

# 14 张 4:3 低质图 (K3 8/19 拍板清单)
TARGETS = [
    "craft-triangular-special-shape-handmade-gift-box-panel.webp",
    "factory-folding-machine-line.webp",
    "factory-heidelberg-speedmaster-with-boxes.webp",
    "factory-production-floor-pano.webp",  # 122KB 略超 120KB 临界
    "showcase-black-collapsible-fold-flat-premium-gift-box.webp",
    "showcase-international-textbook-printing-sample.webp",
    "showcase-red-conjoined-box-interior-gold-lining.webp",
    "showcase-red-conjoined-flip-lid-gift-box-gold-foil.webp",
    "showcase-red-hot-foil-tian-di-gift-box-lunar-new-year.webp",
    "showcase-red-tactile-paper-book-style-gift-box-gold-foil.webp",
    "showcase-rigid-box-cabinet.webp",
    "showcase-rigid-box-interior-expanded-hot-stamping.webp",
    "showcase-rigid-box-palletized.webp",
    "showcase-vending-machine-slim-packaging-box.webp",
]


def reencode(src_path, q_start=85, q_min=80, target_min=180*1024, target_max=240*1024):
    """Re-encode webp with quality tuning to hit 180-240 KB target range."""
    name = os.path.basename(src_path)
    try:
        img = Image.open(src_path)
        orig_w, orig_h = img.size
        ar = orig_w / orig_h
        orig_size = os.path.getsize(src_path)

        # Skip if not 4:3-ish (AR 1.25-1.40)
        if not (1.25 <= ar <= 1.40):
            return f"SKIP {name}: AR={ar:.3f} not 4:3"

        # Try q=85 first
        q = q_start
        out = src_path + ".tmp"
        while q >= q_min:
            img.save(out, "WEBP", quality=q, method=6)
            sz = os.path.getsize(out)
            if target_min <= sz <= target_max:
                # In target range
                os.replace(out, src_path)
                return f"OK   {name}: {orig_size//1024}KB → {sz//1024}KB q={q} AR={ar:.2f}"
            if sz > target_max:
                # Too big, lower quality
                q -= 2
                continue
            # Too small, raise quality
            q += 2
            if q > 95:
                # Already at max, accept
                os.replace(out, src_path)
                return f"OK   {name}: {orig_size//1024}KB → {sz//1024}KB q=95 (small) AR={ar:.2f}"

        # Out of quality range, accept last
        if os.path.exists(out):
            os.replace(out, src_path)
            sz = os.path.getsize(src_path)
            return f"WARN {name}: {orig_size//1024}KB → {sz//1024}KB q={q_min} (out of range) AR={ar:.2f}"
        return f"FAIL {name}: no output"
    except Exception as e:
        if os.path.exists(src_path + ".tmp"):
            os.remove(src_path + ".tmp")
        return f"ERR  {name}: {e}"


def main():
    results = []
    for name in TARGETS:
        path = os.path.join(FACTORY_DIR, name)
        if not os.path.exists(path):
            results.append(f"MISS {name}")
            continue
        r = reencode(path)
        results.append(r)
        print(r, flush=True)

    print("\n=== Summary ===")
    for r in results:
        print(r)


if __name__ == "__main__":
    main()
