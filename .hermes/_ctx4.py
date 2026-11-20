# -*- coding: utf-8 -*-
import io, os
files = [
    r"src\components\category\CategoryIndustries.tsx",
    r"src\components\category\CategorySharpHooks.tsx",
    r"src\app\[locale]\category\[slug]\v9\TrustBadgeBlock.tsx",
    r"src\data\category-conversion-blocks.ts",
]
needles = ["30 個起", "30 units", "30個から", "50 個起", "50 units", "50個から", "FDA 級安全", "FDA-grade", "3 天出貨"]
for f in files:
    s = io.open(r"F:\zprintpro-nextjs" + "\\" + f, encoding="utf-8", newline="").read()
    print("=====", f)
    for n in needles:
        idx = 0
        while True:
            idx = s.find(n, idx)
            if idx < 0: break
            ln = s[:idx].count("\n") + 1
            print("  [%s] L%d: %s" % (n, ln, s[max(0, idx-120):idx+120].replace("\n", " ")[:240]))
            idx += 1
