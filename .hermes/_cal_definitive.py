# -*- coding: utf-8 -*-
"""Definitive: which Records contain 'en'/'ja' top-level locale keys?"""
import io, re

cat = io.open(r"F:\zprintpro-nextjs\src\data\category-seo-content.ts", encoding="utf-8", newline="").read()
lines = cat.split("\n")
record_at = {}
for i, ln in enumerate(lines):
    m = re.match(r"const (\w+Content): Record", ln.strip())
    if m:
        record_at[i] = m.group(1)

records = sorted(record_at.items())
def owner(i):
    cur = None
    for start, name in records:
        if start <= i:
            cur = name
        else:
            break
    return cur

found = {}
for i, ln in enumerate(lines):
    if re.match(r"^\s*'(en|ja)': \{", ln):
        found.setdefault((owner(i), ln.strip()[:6]), []).append(i + 1)

for (rec, loc), lns in sorted(found.items()):
    print("%-26s %-9s lines: %s" % (rec, loc, lns[:8]))
print("\nRecords WITHOUT en/ja:", [n for _, n in records if not any(k[0] == n for k in found)])
