# -*- coding: utf-8 -*-
"""量词修正: 纸袋/精装盒 100 張起印 -> 100 個起印 (含无空格变体)"""
import io, os, re, shutil, sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(REPO, "src", "data", "sku-seo-data.ts")
t = io.open(P, encoding="utf-8", newline="").read()
n0 = len(t)
marks = [(m.group(1), m.start()) for m in re.finditer(r'^  "([a-z0-9-]+)": \{', t, re.M)]
def bounds(slug):
    for i, (s, off) in enumerate(marks):
        if s == slug:
            return off, (marks[i + 1][1] if i + 1 < len(marks) else len(t))
    return None

TARGETS = ['gift-bags', 'handle-bags', 'large-bags', 'rigid-boxes']
total = 0
for slug in TARGETS:
    b = bounds(slug)
    if not b:
        print('[FAIL] no block', slug); sys.exit(2)
    s0, s1 = b
    blk = t[s0:s1]
    n1 = len(re.findall(r'100\s*張\s*起(?:印)?', blk))
    if not n1:
        print(f'[skip] {slug} 无 100 張起印'); continue
    blk2 = re.sub(r'100\s*張\s*起(?:印)?', '100 個起印', blk)
    left = len(re.findall(r'100\s*張\s*起', blk2))
    assert left == 0, slug
    t = t[:s0] + blk2 + t[s1:]
    total += n1
    print(f'[OK] {slug}: {n1} 处')

bp = os.path.join(REPO, ".hermes", "_bak-faqans-20261021", "sku-seo-data.ts.before3")
if not os.path.exists(bp):
    shutil.copy2(P, bp)
io.open(P, "w", encoding="utf-8", newline="").write(t)
print(f'[PASS] total {total}, {n0} -> {len(t)}')
