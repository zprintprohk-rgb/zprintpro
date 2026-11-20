# -*- coding: utf-8 -*-
"""Category page content resolution: how does [locale]/category/[slug] consume category-seo-content?"""
import io, re, json

ROOT = r"F:\zprintpro-nextjs"
p = ROOT + r"\src\app\[locale]\category\[slug]\page.tsx"
s = io.open(p, encoding="utf-8", newline="").read()
for pat in ("categoryContentMap", "contentMap", "calendarsContent", "zh-hk", "fallback", "locale"):
    hits = [m.start() for m in re.finditer(pat, s)]
    print(pat, "->", len(hits), "hits")
# print the resolution lines
for m in re.finditer(r".*(categoryContentMap|Content\?)\[?[^\n]*", s):
    ln = m.group(0).strip()
    if len(ln) > 12 and ("content" in ln.lower() or "Content" in ln):
        print("  ", ln[:170])
# wall-calendars truth
prod = io.open(ROOT + r"\src\data\products.ts", encoding="utf-8", newline="").read()
i = prod.find("slug: 'wall-calendars'")
seg = prod[i:i + 2600]
for pat in (r"minQuantity: (\d+)", r"basePrice(?:_en|_ja)?: ([\d.]+)", r"price_range: '([^']+)'"):
    m = re.search(pat, seg)
    print("wall-calendars", pat.split(":")[0], "->", m.group(0) if m else None)
