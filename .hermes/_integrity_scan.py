# -*- coding: utf-8 -*-
"""Integrity scan over category-seo-content.ts en/ja blocks: unverifiable claims & MOQ conflicts.
Sources: products.ts truths (folding/food 100 MOQ; HK$2.5-15/2.5-18; 3-5d digital), K3 pending #7 SGS."""
import io, re

p = r"F:\zprintpro-nextjs\src\data\category-seo-content.ts"
s = io.open(p, encoding="utf-8", newline="").read()
lines = s.split("\n")

patterns = [
    ("SGS (K3 #7 pending)", r"SGS"),
    ("soy ink (unverifiable claim)", r"大豆油|大豆インク|soy[- ]ink|Soy Ink"),
    ("3-Day Delivery (vs 3-5d truth)", r"3-Day Delivery|3日納品"),
    ("N-series count (source?)", r"\d+\s*(professional series|大シリーズ|大系列)"),
    ("ISO 9001", r"ISO\s*9001"),
    ("wedding 30 / color 50 MOQ", r"30個から|50個から|30 个|50 个"),
    ("moisture-proof absolute", r"防湿加工"),
]
out = io.open(r"F:\zprintpro-nextjs\.hermes\_integrity_scan.txt", "w", encoding="utf-8", newline="")
for label, pat in patterns:
    hits = [(i + 1, lines[i].strip()[:120]) for i in range(len(lines)) if re.search(pat, lines[i], re.I)]
    out.write("=== %s : %d hits ===\n" % (label, len(hits)))
    for ln, txt in hits[:12]:
        out.write("  L%d: %s\n" % (ln, txt))
    if len(hits) > 12:
        out.write("  ... +%d more\n" % (len(hits) - 12))
out.close()
print("scan done")
