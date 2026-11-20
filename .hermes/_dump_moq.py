# -*- coding: utf-8 -*-
import io
s = io.open(r"F:\zprintpro-nextjs\src\data\category-seo-content.ts", encoding="utf-8", newline="").read()
lines = s.split("\n")
for ln in [216, 258, 275, 276]:
    print("L%d FULL: %s" % (ln, lines[ln - 1].strip()))
print()
# ja counterparts: search 個 forms with 30/50
for i, l in enumerate(lines):
    if ("30" in l or "50" in l) and ("個" in l or "枚" in l) and ("箱" in l or "パッケージ" in l):
        if "100" not in l[:60]:
            print("JA-SUSPECT L%d: %s" % (i + 1, l.strip()[:180]))
