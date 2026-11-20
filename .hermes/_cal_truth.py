# -*- coding: utf-8 -*-
"""zh calendars techSpecs truth + calendar blog availability in en/ja."""
import io, re, json

cat = io.open(r"F:\zprintpro-nextjs\src\data\category-seo-content.ts", encoding="utf-8", newline="").read()
i = cat.find("calendarsContent:")
m = re.search(r"\n[a-zA-Z]+Content:", cat[i + 10:])
blk = cat[i:i + 10 + m.start()] if m else cat[i:i + 60000]
zi = blk.find("'zh-hk'")
zseg = blk[zi:]
c = 0
for ln in zseg.split("\n"):
    if ("label:" in ln or "value:" in ln) and c < 16:
        print(ln.strip()[:180])
        c += 1

print("\n--- blog availability ---")
for loc in ("en", "ja", "zh-hk"):
    d = json.load(io.open(r"F:\zprintpro-nextjs\src\data\blog-data\%s.json" % loc, encoding="utf-8"))
    ks = list(d.keys()) if isinstance(d, dict) else [x.get("slug") for x in d]
    hit = [k for k in ks if k and "calendar" in k]
    print(loc, "calendar blogs:", hit)
