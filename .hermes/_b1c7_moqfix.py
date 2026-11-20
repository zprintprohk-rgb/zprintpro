# -*- coding: utf-8 -*-
import io, os, shutil
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(REPO, "src", "data", "products.ts")
OLD = "Single-copy MOQ from HK$3 per copy; offset becomes economical from around 300 copies upward."
NEW = "Single-copy MOQ from HK$3 per copy; offset becomes economical at larger volumes."
with io.open(P, "r", encoding="utf-8", newline="") as fh:
    t = fh.read()
c = t.count(OLD)
if c != 1:
    print(f"FAIL x{c}"); raise SystemExit(2)
shutil.copy2(P, os.path.join(REPO, ".hermes", "_bak-b1c7-20261016", "products.ts.before-moqfix"))
with io.open(P, "w", encoding="utf-8", newline="") as fh:
    fh.write(t.replace(OLD, NEW))
print("PASS")