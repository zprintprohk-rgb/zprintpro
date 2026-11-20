# -*- coding: utf-8 -*-
"""Packaging block truth sweep (all locales): false MOQ 30/50/100-200 -> 100 family (die 500); fake '3 days' -> 3-5d.
Truths: products.ts packaging family minQuantity=100 (white-card 500), custom die 500; turnaround 3-5d digital / 5-7d offset."""
import io, os, shutil, sys

P = r"F:\zprintpro-nextjs\src\data\category-seo-content.ts"
BAK = r"F:\zprintpro-nextjs\.hermes\_bak-pkgmoq-sweep-20261024.ts.bak"
MODE = "apply" if "--apply" in sys.argv else "verify"

RULES = [
    # zh-hk
    ("彩盒 50 個起、常規款 100 個起，3 天出貨，免費刀模設計。",
     "全盒型 100 個起、異形刀模 500 個起，3-5 天出貨，免費刀模設計。"),
    ("婚禮喜糖用天地蓋細盒 30 個起",
     "婚禮喜糖用天地蓋細盒 100 個起"),
    # en
    ("Minimum order from just 30–50 units (wedding/favor boxes), 100 units for standard sizes — perfect for startup brands to test the market.",
     "Minimum order from 100 units across all box styles, with custom sizes and shaped die-cuts from 500 — low enough for startup brands to test the market."),
    ("30 units (wedding favor boxes), 50 units (color boxes), 100–200 units (standard/industrial).",
     "100 units for all box styles; custom sizes and shaped die-cuts from 500 units."),
    ("Color boxes start at 50 units, standard styles at 100, with free dieline design and 3-day production.",
     "All box styles start at 100 units, with free dieline design and 3-5 day production."),
    ("small two-piece favor boxes start at just 30 units for weddings",
     "two-piece favor boxes start at 100 units for weddings"),
]

s = io.open(P, encoding="utf-8", newline="").read()
errors = []
def check(cond, msg):
    print(("  OK  " if cond else "  FAIL ") + msg)
    if not cond: errors.append(msg)

def span_of(txt, key):
    a = txt.find(key)
    b = txt.find("{", a)
    d = 0; k = b; e = None
    while k < len(txt):
        if txt[k] == "{": d += 1
        elif txt[k] == "}":
            d -= 1
            if d == 0: e = k; break
        k += 1
    return a, e

sgs_before = s.count("SGS")
for old, new in RULES:
    n = s.count(old)
    check(n == 1, "rule unique (count=%d) %s..." % (n, old[:44]))
    if n == 1:
        s = s.replace(old, new, 1)

a, e = span_of(s, "packagingContent:")
pkg = s[a:e]
check("30 個" not in pkg and "50 個" not in pkg, "zh false MOQ gone in packaging block")
check("30 units" not in pkg and "50 units" not in pkg, "en false MOQ gone in packaging block")
check("100–200 units" not in pkg, "en 100-200 range gone")
check("3 天出貨" not in pkg, "zh fake 3-day gone")
check("3-day production" not in pkg, "en fake 3-day gone")
check("Standard orders: 3 days" not in pkg, "en FAQ 3-day gone")
check(s.count("SGS") == sgs_before, "SGS invariant %d->%d" % (sgs_before, s.count("SGS")))

if MODE == "apply":
    if errors:
        print("ASSERTIONS FAILED — no write."); sys.exit(2)
    shutil.copy2(P, BAK)
    io.open(P, "w", encoding="utf-8", newline="").write(s)
    check(open(P, "rb").read(2)[0] != 0xFF, "no BOM")
    print("WROTE packaging truth sweep (%d rules)" % len(RULES))
print("ERRORS: %d" % len(errors))
sys.exit(2 if errors else 0)
