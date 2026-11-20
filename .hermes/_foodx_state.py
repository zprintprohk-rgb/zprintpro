# -*- coding: utf-8 -*-
"""food-boxes zh/en/ja body current state: phrases, links, append anchors."""
import io, re

ts = io.open(r"F:\zprintpro-nextjs\src\data\sku-seo-data.ts", encoding="utf-8", newline="").read()
bi = ts.find('"food-boxes": {')
ei = ts.find('\n  "', bi + 4)
blk = ts[bi:ei if ei > 0 else len(ts)]
lines = blk.split("\n")

for loc in ("zh-hk", "en", "ja"):
    loc_line = next(k for k, ln in enumerate(lines) if ln.strip().startswith('"%s": {' % loc))
    loc_end = next((k for k in range(loc_line + 1, len(lines)) if re.match(r'\s*"(zh-hk|en|ja)": \{', lines[k])), len(lines))
    bl = [ln for ln in lines[loc_line:loc_end] if ln.strip().startswith('"body": "')]
    m = re.search(r'"body":\s*"((?:[^"\\]|\\.)*)"', bl[0])
    body = m.group(1)
    print("=== %s body len %d ===" % (loc, len(body)))
    print("  食品包裝訂製:", body.count("食品包裝訂製"), "| 訂製:", body.count("訂製"), "| 裡印:", body.count("裡印"),
          "| 內印:", body.count("內印") + body.count("内印"), "| 食品包裝印刷:", body.count("食品包裝印刷"))
    print("  links:", re.findall(r"\]\((/[^)]+)\)", body))
    print("  tail-160:", body[-160:])
    print()
