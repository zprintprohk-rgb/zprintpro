# -*- coding: utf-8 -*-
"""Integrity cleanup A-double-prime: chemical-safety absolutes in rendered data files (SGS/FDA/FSC co-phrases frozen).
Files: category-conversion-blocks.ts (category-page live source), products-content.ts (ja eco para x12), product-faqs.ts (x2).
Blog-data 無毒 hits + textbooks.html template -> docket (not rendered on category pages)."""
import io, os, shutil, sys

ROOT = r"F:\zprintpro-nextjs"
BAK = os.path.join(ROOT, ".hermes", "_bak-integrity-aa-20261018")
MODE = "apply" if "--apply" in sys.argv else "verify"

FILES = {
    os.path.join("src", "data", "category-conversion-blocks.ts"): [
        ("必須用食品級紙材加無毒大豆油墨，FDA認可（間接食品接觸）加FSC認證紙",
         "必須用食品級紙材加環保油墨選項（落單時註明），FDA認可（間接食品接觸）加FSC認證紙"),
        ("食品グレード紙と無毒の大豆インクを使用し、SGS検査済み、日本の食品衛生基準に準拠しています。",
         "食品グレード紙と環境配慮インク（ご注文時に指定）を使用し、SGS検査済み、日本の食品衛生基準に準拠しています。"),
        ("無毒大豆インク、防湿加工、QRコード対応", "環境配慮インク（ご注文時に指定）、防湿加工、QRコード対応"),
        # (L1369 长句已由上一条前缀规则覆盖, 不再单列)
        ("食品グレード紙と無毒の大豆インクを使用し、SGS検査済み。ベーカリーや茶葉、サプリメント用の箱には防湿加工を推奨しており、QRコードによるロット追跡も追加できます。",
         "食品グレード紙と環境配慮インク（ご注文時に指定）を使用し、SGS検査済み。ベーカリーや茶葉、サプリメント用の箱には防湿加工を推奨しており、QRコードによるロット追跡も追加できます。"),
    ],
    os.path.join("src", "data", "products-content.ts"): [
        ("完全分解可能で無毒無臭", "完全分解可能な環境配慮仕様"),
        ("環保系列額外採用再生紙與大豆油墨，可完全降解，無毒無味，符合教育局紙張規範。", "環保系列額外採用再生紙與大豆油墨（環保選項，落單時註明），可完全降解。"),
        ("エコシリーズは再生紙・大豆インクを採用、完全生分解性・無毒無臭で日本の教育委員会指導要項にも準拠。", "エコシリーズは再生紙・大豆インクを採用（環境配慮オプション、ご注文時に指定）、完全生分解性。"),
    ],
    os.path.join("src", "data", "product-faqs.ts"): [
        ("環保系列額外採用再生紙 / 大豆油墨，可完全降解，無毒無味。", "環保系列額外採用再生紙 / 大豆油墨（環保選項，落單時註明），可完全降解。"),
        ("完全生分解性・無毒無臭。", "完全生分解性の環境配慮仕様。"),
    ],
}

errors = []
def check(cond, msg):
    print(("  OK  " if cond else "  FAIL ") + msg)
    if not cond: errors.append(msg)

newfiles = {}
for rel, rules in FILES.items():
    p = os.path.join(ROOT, rel)
    s = io.open(p, encoding="utf-8", newline="").read()
    sgs_before = s.count("SGS")
    total = 0
    for old, new in rules:
        n = s.count(old)
        print("  info %s rule (count=%d) %s..." % (os.path.basename(rel), n, old[:30]))
        s = s.replace(old, new)
        total += n
    check(s.count("SGS") == sgs_before, "%s SGS invariant %d->%d" % (os.path.basename(rel), sgs_before, s.count("SGS")))
    check("無毒" not in s, "%s residual 無毒=0" % os.path.basename(rel))
    print("  -> %s: %d replacements" % (os.path.basename(rel), total))
    newfiles[rel] = s

if MODE == "apply":
    if errors:
        print("\nASSERTIONS FAILED — no write."); sys.exit(2)
    os.makedirs(BAK, exist_ok=True)
    for rel, s in newfiles.items():
        p = os.path.join(ROOT, rel)
        shutil.copy2(p, os.path.join(BAK, os.path.basename(rel) + ".bak"))
        io.open(p, "w", encoding="utf-8", newline="").write(s)
        check(open(p, "rb").read(2)[0] != 0xFF, os.path.basename(rel) + " no BOM")
    print("\nWROTE 3 files")
print("ERRORS: %d" % len(errors))
sys.exit(2 if errors else 0)
