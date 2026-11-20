# -*- coding: utf-8 -*-
"""magnetic-closure-gift-box: 100 張起印 -> 100 個起印"""
import io, os, re, shutil

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(REPO, "src", "data", "sku-seo-data.ts")
t = io.open(P, encoding="utf-8", newline="").read()
marks = [(m.group(1), m.start()) for m in re.finditer(r'^  "([a-z0-9-]+)": \{', t, re.M)]
def bounds(s):
    for i, (k, o) in enumerate(marks):
        if k == s:
            return o, (marks[i + 1][1] if i + 1 < len(marks) else len(t))
s0, s1 = bounds('magnetic-closure-gift-box')
blk = t[s0:s1]
n = len(re.findall(r'100\s*張\s*起(?:印)?', blk))
if n:
    blk = re.sub(r'100\s*張\s*起(?:印)?', '100 個起印', blk)
    t = t[:s0] + blk + t[s1:]
    bp = os.path.join(REPO, ".hermes", "_bak-faqans-20261021", "sku-seo-data.ts.before4")
    if not os.path.exists(bp):
        shutil.copy2(P, bp)
    io.open(P, "w", encoding="utf-8", newline="").write(t)
print("fixed", n)
