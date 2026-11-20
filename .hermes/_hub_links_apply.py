# -*- coding: utf-8 -*-
"""hub 簇双向内链: packaging hub 三语块 append 深入链接 (6-7 条/语)"""
import io, os, shutil, sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(REPO, "src", "data", "category-seo-content.ts")
with io.open(P, "r", encoding="utf-8", newline="") as f:
    s = f.read()
n0 = len(s)

EDITS = [
    # zh: 8 盒型全表尾接深入链接
    ("⑧ 磁吸禮盒 — 香水護膚品重複使用。",
     "⑧ 磁吸禮盒 — 香水護膚品重複使用。想深入比較，可睇[食品包裝印刷完全指南](/zh-hk/blog/food-packaging-printing-guide/)、"
     "[牛皮紙盒 vs 坑盒 8 大盒型對比](/zh-hk/blog/kraft-paper-box-types-comparison-2026/) 同"
     "[包裝盒印刷價格 2026](/zh-hk/blog/packaging-box-pricing-2026/)；規格可先睇"
     "[食品包裝盒](/zh-hk/product/food-boxes/)同[磁吸禮盒](/zh-hk/product/magnetic-closure-gift-box/)。"),
    # en: product series 句尾接深入链接
    ("covering all your packaging printing needs.",
     "covering all your packaging printing needs. For deeper detail, read the "
     "[food packaging printing guide](/en/blog/food-packaging-printing-guide/), the "
     "[kraft vs corrugated box comparison](/en/blog/kraft-paper-box-types-comparison-2026/) and "
     "[2026 packaging box pricing](/en/blog/packaging-box-pricing-2026/); specs are on the "
     "[food packaging boxes](/en/product/food-boxes/) and [magnetic gift boxes](/en/product/magnetic-closure-gift-box/) pages."),
    # ja: 箱型句尾接深入链接
    ("20種以上の定型＋完全カスタムに対応します。",
     "20種以上の定型＋完全カスタムに対応します。詳しくは"
     "[食品包装印刷ガイド](/ja/blog/food-packaging-printing-guide/)、"
     "[クラフト紙箱と段ボールの比較](/ja/blog/kraft-paper-box-types-comparison-2026/)、"
     "[2026 年パッケージ価格](/ja/blog/packaging-box-pricing-2026/)をご覧ください。"),
]

before = {k: s.count(k) for k in ["/zh-hk/blog/food-packaging-printing-guide/", "/en/blog/food-packaging-printing-guide/", "/ja/blog/food-packaging-printing-guide/"]}

for old, new in EDITS:
    c = s.count(old)
    if c != 1:
        print("[FAIL] match %d: %s" % (c, old[:24]))
        sys.exit(2)
    s = s.replace(old, new)

assert s.count("](／)") == 0
for k, v in before.items():
    now = s.count(k)
    assert now == v + 1, "link count %s = %d (was %d)" % (k, now, v)

bp = os.path.join(REPO, ".hermes", "_bak-hub-links-20261020", "category-seo-content.ts.before")
os.makedirs(os.path.dirname(bp), exist_ok=True)
if not os.path.exists(bp):
    shutil.copy2(P, bp)
with io.open(P, "w", encoding="utf-8", newline="") as f:
    f.write(s)
print("[OK] hub links +%d chars (%d -> %d)" % (len(s) - n0, n0, len(s)))
