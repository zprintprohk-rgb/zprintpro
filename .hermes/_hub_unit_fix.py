# -*- coding: utf-8 -*-
"""hub featuredSnippet 单位修正: 盒用「本」→「個」 (zh)"""
import io, os, shutil, sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(REPO, "src", "data", "category-seo-content.ts")
with io.open(P, "r", encoding="utf-8", newline="") as f:
    s = f.read()
n0 = len(s)
a = s.index("const packagingContent"); b = s.index("const bannersContent")
blk = s[a:b]
old = "100-10,000 本彈性 MOQ"
new = "100-10,000 個彈性 MOQ"
c = blk.count(old)
print("match", c)
if c == 1:
    blk2 = blk.replace(old, new)
    s = s[:a] + blk2 + s[b:]
    assert s.count(old) == 0
    bp = os.path.join(REPO, ".hermes", "_bak-hub-links-20261020", "category-seo-content.ts.before3")
    os.makedirs(os.path.dirname(bp), exist_ok=True)
    if not os.path.exists(bp):
        shutil.copy2(P, bp)
    with io.open(P, "w", encoding="utf-8", newline="") as f:
        f.write(s)
    print("[OK] unit fixed, +%d chars" % (len(s) - n0))
else:
    print("[SKIP] no unique match")
