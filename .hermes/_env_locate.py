# -*- coding: utf-8 -*-
import io, re
P = r"F:\zprintpro-nextjs\src\data\category-seo-content.ts"
s = io.open(P, encoding="utf-8", newline="").read()
lines = s.split("\n")

# find block key enclosing line 2640
for i in range(2639, 2400, -1):
    m = re.match(r"^  '?([a-z-]+)'?: \{", lines[i])
    if m:
        print("BLOCK KEY near L2640 -> L%d: %s" % (i + 1, m.group(1)))
        break

print("--- '500 個起訂' occurrences ---")
for m in re.finditer(r"500 個起訂", s):
    ln = s[:m.start()].count("\n") + 1
    print("L%d: %s" % (ln, s[max(0, m.start() - 150):m.start() + 150].replace("\n", " ")))

print("--- envelope featuredSnippet / techSpecs ---")
i = s.find("envelope")
for key in ["大信封 C4/C5", "{ label: '起訂量'"]:
    idx = s.find(key)
    print("%s -> %s" % (key, s[idx:idx + 220].replace("\n", " ") if idx > 0 else "NF"))
