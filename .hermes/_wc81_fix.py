# -*- coding: utf-8 -*-
"""white-card-boxes CSV row 81 surgical fix: title filler + 8-15d fake turnaround + ? MOQ placeholders.
Truths (products.ts @HEAD): minQuantity=500, turnaround='5-7 working days'. Line-scoped edit."""
import io, os, shutil, sys

ROOT = r"F:\zprintpro-nextjs"
CSV = os.path.join(ROOT, "zprintpro-sku-seo-data.csv")
BAK = os.path.join(ROOT, ".hermes", "_bak-csv-wc81-20261019.csv.bak")
MODE = "apply" if "--apply" in sys.argv else "verify"

RULES = [
    ("白卡彩盒印刷訂製 化妝品盒 500個起 免費送貨 | 智印港", "白卡彩盒印刷訂製 化妝品盒 500個起 5-7天交貨 | 智印港", 2),
    ("白卡彩盒印刷訂製 化妝品盒 500個起 免費送貨\t", "白卡彩盒印刷訂製 化妝品盒 500個起 5-7天交貨\t", 1),
    ("8-15 day turnaround", "5-7 day turnaround", 1),
    ("8-15日納品", "5-7日納品", 1),
    ("8-15 個工作天交貨", "5-7 個工作天交貨", 1),
    ("8-15 day production", "5-7 day production", 1),
    ("8-15営業日", "5-7営業日", 1),
    ("化妝品盒 ?個起印", "化妝品盒 500 個起印", 1),
    ("from ? units", "from 500 units", 1),
    ("は?個から", "は500個から", 1),
    ("?個起印。1,000 個以上單價明顯下降", "500 個起印。1,000 個以上單價明顯下降", 1),
]

lines = io.open(CSV, encoding="utf-8", newline="").read().split("\n")
row = lines[80]
assert "white-card-boxes" in row, "row 81 is not white-card-boxes"
errors = []
n_applied = 0
for old, new, expected in RULES:
    c = row.count(old)
    ok = c == expected
    print(("  OK  " if ok else "  FAIL ") + "(count=%d expect %d) %s" % (c, expected, old[:40]))
    if not ok:
        errors.append(old[:30])
    else:
        row = row.replace(old, new)
        n_applied += c

check_resid = ("免費送貨" not in row) and ("8-15" not in row) and ("?個起印" not in row) and ("? units" not in row) and ("?個から" not in row)
print(("  OK  " if check_resid else "  FAIL ") + "row-81 residual clean")
if not check_resid:
    errors.append("residual")

if MODE == "apply":
    if errors:
        print("ASSERTIONS FAILED — no write."); sys.exit(2)
    shutil.copy2(CSV, BAK)
    lines[80] = row
    io.open(CSV, "w", encoding="utf-8", newline="").write("\n".join(lines))
    print("WROTE row 81 (%d replacements)" % n_applied)
print("ERRORS: %d" % len(errors))
sys.exit(2 if errors else 0)
