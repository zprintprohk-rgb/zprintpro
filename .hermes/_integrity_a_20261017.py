# -*- coding: utf-8 -*-
"""Integrity cleanup Plan A-prime (SGS frozen, K3 #7 pending): remove factually-wrong absolutes only.
Invariants: SGS count unchanged; all soy/3day/series/MOQ absolutes -> 0 after.
Source of truth: products.ts (packaging SKU count=12 via rg; MOQ 100 family; 3-5d digital / 5-7d offset)."""
import io, os, shutil, sys

ROOT = r"F:\zprintpro-nextjs"
TARGET = os.path.join(ROOT, "src", "data", "category-seo-content.ts")
BAK = os.path.join(ROOT, ".hermes", "_bak-integrity-a-20261017.ts.bak")
MODE = "apply" if "--apply" in sys.argv else "verify"

RULES = [
    # soy ink absolute claims (SGS co-phrases preserved verbatim)
    ("無毒大豆油墨", "環保油墨選項（落單時註明）"),
    ("無毒の大豆インクは必須で", "環境配慮インク（ご注文時に指定）も選択でき"),
    ("無毒大豆油インクを使用", "環境配慮インク（ご注文時に指定）を使用"),
    ("non-toxic soy inks are non-negotiable", "eco-friendly ink options are available"),
    ("non-toxic soy-based inks", "eco-friendly ink options (specify at order)"),
    # chemical-safety absolutes in education blocks (soy/FSC facts kept as options)
    ("使用大豆油墨和 FSC 認證環保紙張，無毒無害，符合兒童產品安全標準", "可選大豆油墨和 FSC 認證環保紙張（環保選項，落單時註明）"),
    ("FSC 認證環保紙張、大豆油墨、無毒無害，符合教育產品安全標準", "FSC 認證環保紙張、大豆油墨選項（落單時註明）"),
    ("使用 FSC 認證環保紙張和大豆油墨，無毒無害，符合教育產品安全標準。", "可選 FSC 認證環保紙張和大豆油墨（環保選項，落單時註明）。"),
    ("大豆インクとFSC認証エコ紙を使用。無毒無害で、子供用品安全基準に準拠。", "大豆インクとFSC認証エコ紙のオプションあり（ご注文時に指定）。"),
    ("FSC認証エコ紙、大豆インク、無毒無害。教育製品安全基準に準拠。", "FSC認証エコ紙、大豆インクのオプション（ご注文時に指定）。"),
    ("FSC認証エコ紙と大豆インクを使用。無毒無害で、子供用品安全基準に準拠しています。", "FSC認証エコ紙と大豆インクのオプションがあります（ご注文時に指定）。"),
    # fake turnaround
    ("3-Day Delivery", "3-5 Day Production"),
    ("3日納品", "3-5日納品"),
    ("3日生産の短納期", "デジタル3-5日・オフセット5-7日の短納期"),
    # fake series count (12 = rg count of category:'packaging')
    ("10 professional series", "12 professional series"),
    ("10大シリーズ", "12大シリーズ"),
    # fake MOQ (no SKU supports 30/50; family = 100, custom die 500)
    ("最小30–50個から（ウエディング／カラーボックス）、通常100個から", "全箱型100個から"),
    ("30個から（ウエディングボックス）、50個から（カラーボックス）、100–200個から（標準／工業用）。", "100個から（全箱型共通、カスタム型抜きは500個から）。"),
    ("カラーボックスは50個から、標準タイプは100個からの小ロット対応", "全箱型100個からの小ロット対応"),
    ("ウエディングボックス30個から、カラーボックス50個から、標準工業用100–200個から。", "全箱型100個から（カスタム型抜きは500個から）。"),
]

s = io.open(TARGET, encoding="utf-8", newline="").read()
sgs_before = s.count("SGS")
errors = []
def check(cond, msg):
    print(("  OK  " if cond else "  FAIL ") + msg)
    if not cond: errors.append(msg)

total = 0
for old, new in RULES:
    n = s.count(old)
    print("  [%d] %s" % (n, old[:44]))
    if n:
        s = s.replace(old, new)
        total += n

print("\n--- post-state assertions ---")
check(s.count("SGS") == sgs_before, "SGS invariant %d -> %d" % (sgs_before, s.count("SGS")))
for bad in ["無毒", "non-toxic soy", "3-Day Delivery", "3日納品", "10 professional series", "10大シリーズ", "30個から", "50個から"]:
    check(bad not in s, "residual '%s' = 0" % bad)
resid_soy = s.count("soy")
print("  info: remaining lowercase 'soy' mentions (eco-SKU truths, KEEP): %d" % resid_soy)

if MODE == "apply":
    if errors:
        print("\nASSERTIONS FAILED — no write."); sys.exit(2)
    os.makedirs(os.path.dirname(BAK), exist_ok=True)
    shutil.copy2(TARGET, BAK)
    io.open(TARGET, "w", encoding="utf-8", newline="").write(s)
    check(open(TARGET, "rb").read(2)[0] != 0xFF, "no BOM")
    print("\nWROTE: %d replacements" % total)
print("TOTAL: %d replacements, ERRORS: %d" % (total, len(errors)))
sys.exit(2 if errors else 0)
