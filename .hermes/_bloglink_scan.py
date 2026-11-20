# -*- coding: utf-8 -*-
"""Scan blog-data JSONs: packaging-cluster posts + existing food-boxes PDP links (dual-method)."""
import io, json, re

root = r"F:\zprintpro-nextjs\src\data\blog-data"
out = io.open(r"F:\zprintpro-nextjs\.hermes\_bloglink_scan.txt", "w", encoding="utf-8", newline="")

for loc in ["zh-hk", "en", "ja"]:
    p = root + "\\" + loc + ".json"
    s = io.open(p, encoding="utf-8", newline="").read()
    data = json.loads(s)
    posts = list(data.values()) if isinstance(data, dict) else data
    out.write("=== %s : %d posts (top-level type %s) ===\n" % (loc, len(posts), type(data).__name__))
    for post in posts:
        slug = post.get("slug", "?")
        blob = json.dumps(post, ensure_ascii=False)
        # packaging-cluster relevance: title/keywords/content mentions
        kw_hit = bool(re.search(r"食品包裝|食品包装|food[- ]packaging|食品パッケージ|包裝盒|packaging box|パッケージ箱|月餅|mooncake|月餅盒", blob, re.I))
        link_hit = re.findall(r"/product/food-boxes/", blob)
        title = post.get("title", post.get("titleZh", post.get("title_zh", "?")))
        if kw_hit:
            out.write("  [%s] %s | food-boxes links: %d | len: %d\n" % (slug, title[:60], len(link_hit), len(blob)))
out.close()
print("scan done")
