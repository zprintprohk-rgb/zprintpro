# -*- coding: utf-8 -*-
import io
s = io.open(r"F:\zprintpro-nextjs\src\data\category-seo-content.ts", encoding="utf-8", newline="").read()
lines = s.split("\n")
for ln in [102, 144, 167, 183, 185, 187]:
    print("ZH L%d: %s" % (ln, lines[ln - 1].strip()))
print()
# en turnaround line (search Turnaround label inside packaging span)
a = s.find("packagingContent:")
seg = s[a:a + 40000]
i = seg.find("{ label: 'Turnaround'")
print("EN TURNAROUND:", seg[i:i + 130] if i > 0 else "NOT FOUND")
print()
print("EN FAQ299:", seg[seg.find("Wedding favor boxes from 30 units"):seg.find("Wedding favor boxes from 30 units") + 260])
