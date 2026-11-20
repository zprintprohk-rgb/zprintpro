# -*- coding: utf-8 -*-
"""Codepoint-level diff: CSV large-red-packets SEO标题(ZH) vs ts title value."""
import io, re

ROOT = r"F:\zprintpro-nextjs"

csv_raw = io.open(ROOT + r"\zprintpro-sku-seo-data.csv", encoding="utf-8", newline="").read()
lines = csv_raw.split("\n")
hdr = lines[0].split("\t")
COL = {n: i for i, n in enumerate(hdr)}
csv_val = None
for ln in lines:
    c = ln.split("\t")
    if len(c) > COL["Slug"] and c[COL["Slug"]] == "large-red-packets":
        csv_val = c[COL["SEO标题(ZH)"]]
        break

ts = io.open(ROOT + r"\src\data\sku-seo-data.ts", encoding="utf-8", newline="").read()
i = ts.find('"large-red-packets": {')
j = ts.find('"title": ', i)
k1 = ts.find('"', j + 9)
k2 = ts.find('"', k1 + 1)
ts_val = ts[k1 + 1:k2]

print("CSV len", len(csv_val), "TS len", len(ts_val))
print("equal:", csv_val == ts_val)
for idx, (a, b) in enumerate(zip(csv_val, ts_val)):
    if a != b:
        print("first diff at", idx, "CSV:", hex(ord(a)), repr(a), "TS:", hex(ord(b)), repr(b))
        print("context CSV:", repr(csv_val[max(0, idx-12):idx+12]))
        print("context TS :", repr(ts_val[max(0, idx-12):idx+12]))
        break
else:
    if len(csv_val) != len(ts_val):
        longer = csv_val if len(csv_val) > len(ts_val) else ts_val
        print("prefix equal; extra tail in longer:", repr(longer[min(len(csv_val), len(ts_val)):]))
