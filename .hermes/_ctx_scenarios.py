# -*- coding: utf-8 -*-
import io
for f, lines_want in [
    (r"F:\zprintpro-nextjs\src\components\category\CategorySharpHooks.tsx", [57]),
    (r"F:\zprintpro-nextjs\src\components\category\CategoryIndustries.tsx", [97, 182, 471]),
]:
    s = io.open(f, encoding="utf-8", newline="").read()
    lines = s.split("\n")
    for ln in lines_want:
        print("===== %s around L%d =====" % (f.split("\\")[-1], ln))
        for j in range(max(0, ln - 5), min(len(lines), ln + 3)):
            print("L%d: %s" % (j + 1, lines[j].strip()[:150]))
        print()
