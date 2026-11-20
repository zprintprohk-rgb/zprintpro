# -*- coding: utf-8 -*-
"""3 SKU MOQ 欠承诺对齐 (body+FAQ -> products.ts 真值; desc 双证一致)"""
import io, os, re, shutil, sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(REPO, "src", "data", "sku-seo-data.ts")
with io.open(P, "r", encoding="utf-8", newline="") as f:
    t = f.read()
n0 = len(t)

marks = [(m.group(1), m.start()) for m in re.finditer(r'^  "([a-z0-9-]+)": \{', t, re.M)]
def bounds(slug):
    for i, (s, off) in enumerate(marks):
        if s == slug:
            return off, (marks[i + 1][1] if i + 1 < len(marks) else len(t))
    return None

FIX = {
    "certificates": [("10 張起印", "100 張起印")],
    "electronics-packaging-box": [
        ("100 張起印", "200 個起印"),
        ("100 個起印（標準尺寸無開版費", "200 個起印（標準尺寸無開版費"),
    ],
    "kraft-paper-packaging-box": [
        ("100 張起印", "300 個起印"),
        ("100 個起印（標準尺寸無開版費", "300 個起印（標準尺寸無開版費"),
    ],
}

total = 0
for slug, pairs in FIX.items():
    b = bounds(slug)
    if not b:
        print("[FAIL] no block", slug); sys.exit(2)
    s0, s1 = b
    blk = t[s0:s1]
    for old, new in pairs:
        c = blk.count(old)
        if c != 1:
            print("[FAIL] %s match=%d for %s" % (slug, c, old)); sys.exit(2)
        blk = blk.replace(old, new)
        total += 1
    t = t[:s0] + blk + t[s1:]

bp = os.path.join(REPO, ".hermes", "_bak-moq-align-20261020", "sku-seo-data.ts.before")
os.makedirs(os.path.dirname(bp), exist_ok=True)
if not os.path.exists(bp):
    shutil.copy2(P, bp)
with io.open(P, "w", encoding="utf-8", newline="") as f:
    f.write(t)
print("[OK] %d replacements, %d -> %d chars" % (total, n0, len(t)))
