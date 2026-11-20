# -*- coding: utf-8 -*-
import io, os, shutil
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(REPO, "src", "data", "sku-seo-data.ts")
BAK = os.path.join(REPO, ".hermes", "_bak-b1c7-20261016")
OLD = "下單後7-10 個工作天交貨，港九新界免費速遞。"
NEW = "數碼 3-5 個工作天、柯式 5-7 天交貨，港九新界免費速遞。"
with io.open(P, "r", encoding="utf-8", newline="") as fh:
    t = fh.read()
c = t.count(OLD)
if c != 2:
    print(f"FAIL: OLD x{c} (期望 2: desk+custom)"); raise SystemExit(2)
shutil.copy2(P, os.path.join(BAK, "sku-seo-data.ts.before-bodyfix"))
t = t.replace(OLD, NEW)
if "7-10 個工作天" in t.split("wall-calendars")[1] if False else False:
    pass
with io.open(P, "w", encoding="utf-8", newline="") as fh:
    fh.write(t)
# 全文件复扫: 六日历块内不得再有 7-10
src = io.open(P, encoding="utf-8").read()
SL = ["wall-calendars", "desk-calendars", "custom-calendars", "mini-calendars", "photo-frame-calendars", "magnetic-calendars"]
resid = []
for s in SL:
    i = src.index('"%s": {' % s)
    seg = src[i:src.index("\n  },", i)]
    if "7-10" in seg:
        resid.append(s)
print("PASS: 2 句替换; 六块 7-10 残留:", resid if resid else "0")