# -*- coding: utf-8 -*-
"""W3.2: inspect japanDoujin hub featuredSnippet/faq/links + doujinshi-printing PDP state."""
import io, re

ROOT = r"F:\zprintpro-nextjs"
cat = io.open(ROOT + r"\src\data\category-seo-content.ts", encoding="utf-8", newline="").read()
i = cat.find("japanDoujinContent")
seg = cat[i:i + 30000]
for loc in ("ja", "en", "zh-hk"):
    li = seg.find("'" + loc + "'")
    lseg = seg[li:li + 9500]
    fs = re.search(r"featuredSnippet:\s*([^\n]{10,240})", lseg)
    faq_n = lseg.count("question:")
    links = re.findall(r"\]\((/[a-z-]+/(?:blog|category|product)/[a-z0-9-]+/?)\)", lseg)
    print("---", loc, "| faq_n:", faq_n, "| blog links:", [l for l in links if "/blog/" in l])
    if fs:
        print("   featuredSnippet:", fs.group(1)[:200])

ts = io.open(ROOT + r"\src\data\sku-seo-data.ts", encoding="utf-8", newline="").read()
bi = ts.find('"doujinshi-printing": {')
bseg = ts[bi:bi + 16000]
print("\n=== doujinshi-printing PDP ===")
for loc in ("zh-hk", "en", "ja"):
    li = bseg.find('"' + loc + '"')
    b = re.search(r'"body":\s*"((?:[^"\\]|\\.)*)"', bseg[li:li + 9500])
    body = b.group(1) if b else ""
    print(loc, "body len:", len(body), "| C107:", body.count("C107"),
          "| komike:", body.count("コミケ") + body.count("Comiket"),
          "| blog links:", len(re.findall(r"\]\(/[^)]+/blog/", body)))
