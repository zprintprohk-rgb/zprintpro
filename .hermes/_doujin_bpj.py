# -*- coding: utf-8 -*-
"""doujinshi-printing: add basePrice_ja=7500 (JPY-denominated truth per K3-1 record + live ja page ¥7,500).
Fixes feed ja fallback ¥146,250 (7500 treated as HKD x19.5) -> real ¥7,500."""
import io, os, shutil, sys

P = r"F:\zprintpro-nextjs\src\data\products.ts"
BAK = r"F:\zprintpro-nextjs\.hermes\_bak-doujin-bpj-20261028.ts.bak"
APPLY = "--apply" in sys.argv

s = io.open(P, encoding="utf-8", newline="").read()
errs = []
def chk(c, m):
    print(("  OK  " if c else "  FAIL ") + m)
    if not c: errs.append(m)

# locate the doujinshi-printing object precisely (slug anchor to next slug)
import re
i = s.find("slug: 'doujinshi-printing'")
chk(i > 0, "doujinshi-printing slug found")
nxt = s.find("slug: '", i + 10)
blk = s[i:nxt if nxt > 0 else i + 6000]
chk("basePrice_ja" not in blk, "basePrice_ja currently absent")
chk("basePrice: 7500" in blk or "basePrice:  7500" in blk or re.search(r"basePrice:\s*7500\b", blk), "basePrice=7500 (JPY) confirmed")
m = re.search(r"(basePrice_en:\s*[\d.]+,)", blk)
chk(m is not None, "basePrice_en anchor found: %s" % (m.group(1) if m else "-"))

if m:
    new_blk_line = m.group(1) + "\n    basePrice_ja: 7500,"
    s2 = s[:i] + blk.replace(m.group(1), new_blk_line, 1) + s[nxt:]
    chk(s2.count("basePrice_ja: 7500,") == 1, "exactly one basePrice_ja added")
else:
    s2 = s

if APPLY:
    if errs:
        print("ASSERTIONS FAILED — no write."); sys.exit(2)
    shutil.copy2(P, BAK)
    io.open(P, "w", encoding="utf-8", newline="").write(s2)
    chk(open(P, "rb").read(2)[0] != 0xFF, "no BOM")
    print("WROTE basePrice_ja: 7500 for doujinshi-printing")
print("ERRORS: %d" % len(errs))
sys.exit(2 if errs else 0)
