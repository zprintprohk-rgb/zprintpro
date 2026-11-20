# -*- coding: utf-8 -*-
import io, re
files = [
    r"src\components\category\CategoryIndustries.tsx",
    r"src\app\[locale]\category\[slug]\v9\TrustBadgeBlock.tsx",
    r"src\data\category-conversion-blocks.ts",
    r"src\app\[locale]\product\[slug]\v9\ProductPageV9.tsx",
]
pats = ["30 個起", "3 天出貨", "50 個起", "30 units"]
for f in files:
    try:
        s = io.open(r"F:\zprintpro-nextjs" + "\\" + f, encoding="utf-8", newline="").read()
    except Exception as e:
        print(f, "ERR", e); continue
    for n in pats:
        idx = 0
        while True:
            idx = s.find(n, idx)
            if idx < 0: break
            ln = s[:idx].count("\n") + 1
            print("[%s|%s] L%d: ...%s..." % (f.split("\\")[-1], n, ln, s[max(0, idx-100):idx+100].replace("\n", " ")))
            idx += 1
