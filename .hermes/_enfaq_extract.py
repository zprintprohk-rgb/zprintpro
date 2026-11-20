# -*- coding: utf-8 -*-
import io, re
cat = io.open(r"F:\zprintpro-nextjs\src\data\category-seo-content.ts", encoding="utf-8", newline="").read()
i = cat.find("packagingContent:")
j = cat.find("{", i)
d = 0; k = j; end = None
while k < len(cat):
    if cat[k] == "{": d += 1
    elif cat[k] == "}":
        d -= 1
        if d == 0: end = k; break
    k += 1
span = cat[i:end]
for key in ["What is the minimum order for packaging boxes?", "How long does packaging printing take?"]:
    m = re.search(re.escape(key) + r"', a: '([^']+)'", span)
    print("=== " + key)
    print(repr(m.group(1)) if m else "NOT FOUND")
