# -*- coding: utf-8 -*-
"""Category render-layer truth fix: packaging industry scenarios (CategoryIndustries + CategorySharpHooks).
MOQ 30/50 -> 100 (products.ts family truth); FDA 級安全/対応 -> FDA 標準紙可選 (aligned with PDP wording)."""
import io, os, shutil, sys

ROOT = r"F:\zprintpro-nextjs"
BAK = os.path.join(ROOT, ".hermes", "_bak-cat-industries-20261024")
MODE = "apply" if "--apply" in sys.argv else "verify"

FILES = {
    os.path.join("src", "components", "category", "CategoryIndustries.tsx"): [
        ("30 個起印 · FDA 級安全", "100 個起印 · FDA 標準紙可選"),
        ("From 30 units · FDA-grade", "From 100 units · FDA-standard paper optional"),
        ("30個から・FDA基準", "100個から・FDA基準紙は選択可"),
        ("節日限定款 50 個起", "節日限定款 100 個起"),
        ("Seasonal edition from 50", "Seasonal edition from 100"),
        ("季節限定50個から", "季節限定100個から"),
        ("無線膠裝 · 50 本起 · 7 天交貨", "無線膠裝 · 100 本起 · 7 天交貨"),
        ("Perfect bound · from 50 · 7-day", "Perfect bound · from 100 · 7-day"),
        ("無線綴じ・50冊から・7日納品", "無線綴じ・100冊から・7日納品"),
        ("A4 尺寸 · 50 張起", "A4 尺寸 · 100 張起"),
        ("A4 size · from 50", "A4 size · from 100"),
        ("A4サイズ・50枚から", "A4サイズ・100枚から"),
    ],
    os.path.join("src", "components", "category", "CategorySharpHooks.tsx"): [
        ("100 個起 · FDA 級安全", "100 個起 · FDA 標準紙可選"),
        ("100個から・FDA対応", "100個から・FDA基準紙は選択可"),
    ],
}

errors = []
def check(cond, msg):
    print(("  OK  " if cond else "  FAIL ") + msg)
    if not cond: errors.append(msg)

news = {}
for rel, rules in FILES.items():
    p = os.path.join(ROOT, rel)
    s = io.open(p, encoding="utf-8", newline="").read()
    for old, new in rules:
        n = s.count(old)
        check(n == 1, "%s unique (count=%d): %s" % (os.path.basename(rel), n, old[:34]))
        if n == 1:
            s = s.replace(old, new, 1)
    news[rel] = s

# residuals in packaging components
ind = news[os.path.join("src", "components", "category", "CategoryIndustries.tsx")]
# 只针对 packaging: [ ... ] 段做断言 (其他类目拥自己的 MOQ 体制)
pi = ind.find("packaging: [")
pj = ind.find("paper-bags: [", pi)
if pj < 0:
    pj = ind.find("];", pi)
pkgseg = ind[pi:pj if pj > 0 else len(ind)]
import re as _re
for bad in ["30 個起", "30 units", "30個から", "50 個起", "50個から"]:
    check(bad not in pkgseg, "Industries packaging-segment residual '%s' = 0" % bad)
check(_re.search(r"from 50(?!\d)", pkgseg) is None, "Industries packaging-segment residual 'from 50' (not 500) = 0")

if MODE == "apply":
    if errors:
        print("ASSERTIONS FAILED — no write."); sys.exit(2)
    os.makedirs(BAK, exist_ok=True)
    for rel, s in news.items():
        p = os.path.join(ROOT, rel)
        shutil.copy2(p, os.path.join(BAK, os.path.basename(rel) + ".bak"))
        io.open(p, "w", encoding="utf-8", newline="").write(s)
        check(open(p, "rb").read(2)[0] != 0xFF, os.path.basename(rel) + " no BOM")
    print("WROTE 2 component files (8 rules)")
print("ERRORS: %d" % len(errors))
sys.exit(2 if errors else 0)
