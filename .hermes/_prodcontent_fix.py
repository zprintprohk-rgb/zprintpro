# -*- coding: utf-8 -*-
"""products-content.ts: 通用句「100 個起印，深圳平湖廠房直送」-> 无数值冲突表述"""
import io, os, re, shutil

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(REPO, "src", "data", "products-content.ts")
with io.open(P, "r", encoding="utf-8", newline="") as f:
    t = f.read()
n0 = len(t)
OLD = "100 個起印，深圳平湖廠房直送"
NEW = "小批量起印（按盒型而定），深圳平湖廠房直送"
cnt = t.count(OLD)
print("occurrences:", cnt)
if cnt:
    t = t.replace(OLD, NEW)
    assert t.count(OLD) == 0
    bp = os.path.join(REPO, ".hermes", "_bak-prodcontent-20261020", "products-content.ts.before")
    os.makedirs(os.path.dirname(bp), exist_ok=True)
    if not os.path.exists(bp):
        shutil.copy2(P, bp)
    with io.open(P, "w", encoding="utf-8", newline="") as f:
        f.write(t)
    print("[OK] replaced %d, %d -> %d chars" % (cnt, n0, len(t)))
