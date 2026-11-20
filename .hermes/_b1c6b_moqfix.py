# -*- coding: utf-8 -*-
import io, os, shutil, sys
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
edits = {
 "src/data/products.ts": [
  ("typical gallery editions of 10-50 copies run digitally with no plate cost.",
   "typical gallery editions run as small digital batches with no plate cost."),
 ],
 "src/data/sku-seo-data.ts": [
  ("typical editions of 10-50 run digitally with no plate cost.",
   "typical small editions run digitally with no plate cost."),
  ("版畫常見的 10-50 張小版數用數碼微噴即可，免開版。",
   "版畫常見的小版數用數碼微噴即可，免開版。"),
  ("一般的な10-50部の版数はデジタル微噴で版代不要。",
   "一般的な小部数の版はデジタル微噴で版代不要。"),
 ],
}
BAK = os.path.join(REPO, ".hermes", "_bak-b1c6b-20261016")
for rel, pairs in edits.items():
    p = os.path.join(REPO, rel)
    with io.open(p, "r", encoding="utf-8", newline="") as fh:
        t = fh.read()
    for old, new in pairs:
        c = t.count(old)
        if c != 1:
            print(f"FAIL {rel}: {old[:30]!r} x{c}"); sys.exit(2)
        t = t.replace(old, new)
    if not os.path.exists(os.path.join(BAK, os.path.basename(p) + ".before-moqfix")):
        shutil.copy2(p, os.path.join(BAK, os.path.basename(p) + ".before-moqfix"))
    with io.open(p, "w", encoding="utf-8", newline="") as fh:
        fh.write(t)
    print("OK", rel)
print("PASS")