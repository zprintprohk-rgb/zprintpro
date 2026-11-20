# -*- coding: utf-8 -*-
"""Packaging block FULL truth sweep: 16 rules (zh 10 + en 6). MOQ -> 100 family (die 500); turnaround 3-5d digital / 5-7d offset."""
import io, os, shutil, sys

P = r"F:\zprintpro-nextjs\src\data\category-seo-content.ts"
BAK = r"F:\zprintpro-nextjs\.hermes\_bak-pkg-sweep2-20261024.ts.bak"
MODE = "apply" if "--apply" in sys.argv else "verify"

RULES = [
    # ZH
    ("最低 30–50 個起印（婚禮／彩盒款），100 個起（常規款），適合初創品牌試產",
     "全盒型 100 個起（異形刀模 500 個起），適合初創品牌試產"),
    ("3 天出貨（常規），2 天快印（緊急訂單），深圳工廠直發 | 全港順豐速遞，無需海運等待",
     "3-5 天出貨（常規），2-3 天快印（緊急訂單），深圳工廠直發 | 全港順豐速遞，無需海運等待"),
    ("30 個起（婚禮喜糖盒）、50 個起（彩盒）、100–200 個起（常規／工業款）",
     "100 個起（全盒型）；異形刀模 500 個起"),
    ("常規 3 天出貨；快印款 2 天交付；打樣當日完成",
     "常規 3-5 天出貨（數碼）／5-7 天（柯式）；快印 2-3 天交付；打樣當日完成"),
    ("彩盒 50 個起、常規款 100 個起，3 天出貨，免費刀模設計。",
     "全盒型 100 個起、異形刀模 500 個起，3-5 天出貨，免費刀模設計。"),
    ("婚禮喜糖用天地蓋細盒 30 個起", "婚禮喜糖用天地蓋細盒 100 個起"),
    ("→ 免費刀模同打樣 → 3 天出貨。", "→ 免費刀模同打樣 → 3-5 天出貨。"),
    ("白卡彩盒 100 個起，婚禮喜糖盒 30 個起，常規工業款 100–200 個起。",
     "全盒型 100 個起（婚禮喜糖盒、彩盒、常規工業款同一門檻）。"),
    ("常規訂單 3 天出貨；快印服務 2 天交付；打樣當日完成。",
     "常規訂單 3-5 天出貨（數碼）／5-7 天（柯式）；快印服務 2-3 天交付；打樣當日完成。"),
    ("婚禮喜糖盒 30 個起，彩盒 50 個起，常規工業款 100–200 個起。",
     "全盒型 100 個起（婚禮喜糖、彩盒、常規工業款一致）；異形刀模 500 個起。"),
    # EN
    ("Minimum order from just 30–50 units (wedding/favor boxes), 100 units for standard sizes — perfect for startup brands to test the market.",
     "Minimum order from 100 units across all box styles, with custom sizes and shaped die-cuts from 500 — low enough for startup brands to test the market."),
    ("30 units (wedding favor boxes), 50 units (color boxes), 100–200 units (standard/industrial).",
     "100 units for all box styles; custom sizes and shaped die-cuts from 500 units."),
    ("Standard: 3 days. Rush: 2 days. Prototyping: same day.",
     "Standard: 3-5 days (digital) / 5-7 days (offset). Rush: 2-3 days. Prototyping: same day."),
    ("Color boxes start at 50 units, standard styles at 100, with free dieline design and 3-day production.",
     "All box styles start at 100 units, with free dieline design and 3-5 day production."),
    ("small two-piece favor boxes start at just 30 units for weddings",
     "two-piece favor boxes start at 100 units for weddings"),
    ("Wedding favor boxes from 30 units, color boxes from 50 units, standard industrial from 100–200 units. Far below traditional factory minimums of 500–1,000.",
     "From 100 units across all box styles — wedding favor, color and industrial alike; custom sizes and shaped die-cuts from 500 units. Far below traditional factory minimums of 500–1,000."),
]

s = io.open(P, encoding="utf-8", newline="").read()
errors = []
def check(cond, msg):
    print(("  OK  " if cond else "  FAIL ") + msg)
    if not cond: errors.append(msg)

def span(txt):
    a = txt.find("packagingContent:")
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
hits = 0
for old, new in RULES:
    n = s.count(old)
    if n < 1:
        check(False, "rule count=%d (expect >=1): %s..." % (n, old[:44]))
        continue
    if n > 1:
        print("  info: applying to %d occurrences: %s" % (n, old[:40]))
    s = s.replace(old, new)
    hits += 1
check(hits == len(RULES), "all %d rules applied (got %d)" % (len(RULES), hits))

a, e = span(s)
pkg = s[a:e]
for bad in ["30 個", "50 個", "30 units", "50 units", "100–200", "100-200", "3 天出貨", "Standard: 3 days", "3-day production", "30–50 個"]:
    check(bad not in pkg, "residual '%s' = 0 in packaging block" % bad)
check(s.count("SGS") == sgs_before, "SGS invariant %d->%d" % (sgs_before, s.count("SGS")))

if MODE == "apply":
    if errors:
        print("ASSERTIONS FAILED — no write."); sys.exit(2)
    shutil.copy2(P, BAK)
    io.open(P, "w", encoding="utf-8", newline="").write(s)
    check(open(P, "rb").read(2)[0] != 0xFF, "no BOM")
    print("WROTE full packaging sweep (%d rules)" % hits)
print("ERRORS: %d" % len(errors))
sys.exit(2 if errors else 0)
