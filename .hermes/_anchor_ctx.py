# -*- coding: utf-8 -*-
"""Dump anchor-context sentences from the 3 target blogs x3 locales for link insertion."""
import io, json, re

root = r"F:\zprintpro-nextjs\src\data\blog-data"
targets = ["packaging-box-pricing-2026", "packaging-box-price-2026", "packaging-trends"]
out = io.open(r"F:\zprintpro-nextjs\.hermes\_anchor_ctx.txt", "w", encoding="utf-8", newline="")

for loc in ["zh-hk", "en", "ja"]:
    data = json.loads(io.open(root + "\\" + loc + ".json", encoding="utf-8", newline="").read())
    for t in targets:
        post = data.get(t)
        if not post:
            out.write("### %s/%s: MISSING\n" % (loc, t)); continue
        c = post.get("content", "")
        out.write("### %s/%s (len %d)\n" % (loc, t, len(c)))
        # sentences mentioning packaging/food to host the anchor
        pats = [r"[^<>]{0,80}(食品包裝|食品級|包裝盒材質|食品接觸)[^<>]{0,100}"] if loc == "zh-hk" else \
               ([r"[^<>]{0,80}(food[- ]grade|food packaging|packaging material)[^<>]{0,100}"] if loc == "en" else
                [r"[^<>]{0,80}(食品グレード|食品パッケージ|パッケージ素材)[^<>]{0,100}"])
        found = 0
        for pat in pats:
            for m in re.finditer(pat, c):
                out.write("  ANCHOR@%d: ...%s...\n" % (m.start(), m.group(0)[:170]))
                found += 1
                if found >= 3: break
            if found >= 3: break
        if not found:
            out.write("  (no keyword sentence — dump first 400 chars)\n  %s\n" % re.sub(r"<[^>]+>", " ", c)[:400])
out.close()
print("done")
