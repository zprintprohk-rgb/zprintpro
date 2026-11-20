# -*- coding: utf-8 -*-
import io, re
s = io.open(r"F:\zprintpro-nextjs\src\lib\seo.ts", encoding="utf-8", newline="").read().split("\n")
start = None
for i in range(395, 731):
    if re.search(r"['\"]packaging['\"]", s[i]):
        start = i
        break
print("packaging entry at line", (start + 1) if start is not None else "NOT FOUND")
if start:
    for j in range(start, min(start + 16, len(s))):
        print(j + 1, s[j][:135])
