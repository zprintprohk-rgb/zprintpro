# -*- coding: utf-8 -*-
"""hub featuredSnippet 交期加限定: 8-15 天交期 -> 拼版 8-15 天交期"""
import io, os, shutil

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(REPO, "src", "data", "category-seo-content.ts")
t = io.open(P, encoding="utf-8", newline="").read()
a = t.index("const packagingContent"); b = t.index("const bannersContent")
blk = t[a:b]
OLD, NEW = "8-15 天交期", "拼版 8-15 天交期"
c = blk.count(OLD)
print("match", c)
if c == 1:
    blk = blk.replace(OLD, NEW)
    t = t[:a] + blk + t[b:]
    bp = os.path.join(REPO, ".hermes", "_bak-hub-links-20261020", "category-seo-content.ts.before4")
    os.makedirs(os.path.dirname(bp), exist_ok=True)
    if not os.path.exists(bp):
        shutil.copy2(P, bp)
    io.open(P, "w", encoding="utf-8", newline="").write(t)
    print("[OK] qualified")
else:
    print("[SKIP]")
