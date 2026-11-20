# -*- coding: utf-8 -*-
"""doujinshi-printing (DJ-001): insert basePrice_ja: 7500 after basePrice_en: 1245.0 (unique anchors verified).
Truth: K3-1 record 'basePrice=7500(JPY)' + live ja page ¥7,500. Kills feed ja fallback ¥146,250."""
import io, shutil, sys

P = r"F:\zprintpro-nextjs\src\data\products.ts"
BAK = r"F:\zprintpro-nextjs\.hermes\_bak-doujin-bpj-20261028.ts.bak"
APPLY = "--apply" in sys.argv

s = io.open(P, encoding="utf-8", newline="").read()
errs = []
def chk(c, m):
    print(("  OK  " if c else "  FAIL ") + m)
    if not c: errs.append(m)

a = "basePrice_en: 1245.0,"
chk(s.count(a) == 1, "anchor unique (%d)" % s.count(a))
chk("basePrice_ja: 7500" not in s, "basePrice_ja:7500 absent pre-edit")
new = a + "\n      basePrice_ja: 7500,"
s2 = s.replace(a, new, 1)
chk(s2.count("basePrice_ja: 7500") == 1, "exactly one insertion")
# sanity: insertion sits inside DJ-001 object window (id anchor)
i = s2.find("id: 'DJ-001'")
nxt = s2.find("id: '", i + 10)
chk(i >= 0 and i < s2.find("basePrice_ja: 7500") < nxt, "insertion inside DJ-001 window")

if APPLY:
    if errs:
        print("ASSERTIONS FAILED — no write."); sys.exit(2)
    shutil.copy2(P, BAK)
    io.open(P, "w", encoding="utf-8", newline="").write(s2)
    chk(open(P, "rb").read(2)[0] != 0xFF, "no BOM")
    print("WROTE basePrice_ja: 7500 (DJ-001)")
print("ERRORS: %d" % len(errs))
sys.exit(2 if errs else 0)
