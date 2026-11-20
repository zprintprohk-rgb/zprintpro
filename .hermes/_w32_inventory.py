# -*- coding: utf-8 -*-
"""W3.2 Comiket: inventory existing doujin assets (SKUs, category hub block, blogs)."""
import io, re, json

ROOT = r"F:\zprintpro-nextjs"

ts = io.open(ROOT + r"\src\data\sku-seo-data.ts", encoding="utf-8", newline="").read()
print("=== doujin SKUs in sku-seo ===")
for m in re.finditer(r'"([a-z0-9-]*(?:doujin|doujinshi|comiket|同人)[a-z0-9-]*)": \{', ts):
    print(" ", m.group(1))
# also search ja-flavored doujin slugs
for s in ("japan-doujin", "doujin-printing", "doujinshi-printing", "comiket"):
    if ('"%s": {' % s) in ts:
        print("  FOUND", s)

cat = io.open(ROOT + r"\src\data\category-seo-content.ts", encoding="utf-8", newline="").read()
print("\n=== category content keys (doujin/posters related) ===")
for m in re.finditer(r'(\w*[Dd]oujin\w*|\w*[Cc]omic\w*|\w*[Cc]omiket\w*)Content', cat):
    print(" ", m.group(0))
print("has japan-doujin category content:", "japan-doujin" in cat)

# blogs mentioning doujin/comiket
for loc in ("zh-hk", "en", "ja"):
    try:
        d = json.load(io.open(ROOT + r"\src\data\blog-data\%s.json" % loc, encoding="utf-8"))
        slugs = [k for k in (d.keys() if isinstance(d, dict) else [x.get('slug') for x in d]) ]
        hits = [s for s in slugs if s and any(k in s for k in ("doujin", "comiket", "comic", "doujinshi"))]
        print("\nblog-data/%s doujin-ish slugs (%d/%d):" % (loc, len(hits), len(slugs)))
        for s in hits:
            print("  ", s)
    except Exception as ex:
        print(loc, "ERR", ex)

# category page existence
import os
for c in ("japan-doujin", "doujin-goods", "doujinshi"):
    p = ROOT + r"\src\app\[locale]\category\_category-config.ts"
cfg = io.open(ROOT + r"\src\data\category-config.ts", encoding="utf-8", newline="").read() if os.path.exists(ROOT + r"\src\data\category-config.ts") else ""
print("\ncategory-config.ts has doujin:", "doujin" in cfg.lower())
