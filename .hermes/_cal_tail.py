# -*- coding: utf-8 -*-
import io, re

cat = io.open(r"F:\zprintpro-nextjs\src\data\category-seo-content.ts", encoding="utf-8", newline="").read()
i = cat.find("calendarsContent:")
j = cat.find("{", i)
depth = 0
k = j
end = None
while k < len(cat):
    if cat[k] == "{":
        depth += 1
    elif cat[k] == "}":
        depth -= 1
        if depth == 0:
            end = k
            break
    k += 1
print("Record ends at", end, "| tail after:")
print(cat[end:end + 400])
print("\n--- all Record names in file ---")
for m in re.finditer(r"(\w+Content): Record", cat):
    # find its locales
    jj = m.end()
    seg = cat[jj:jj + 900]
    locs = re.findall(r"'(zh-hk|en|ja)': \{", seg)
    print("%-26s first-locale-markers within 900ch: %s" % (m.group(1), locs))
