# -*- coding: utf-8 -*-
"""把 4 个 TS 侧真值修正回写 CSV 源头（SOP-5），避免 regen 回退"""
import io, os, re, shutil, json, subprocess

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
B = os.path.join(REPO, ".hermes", "_bak-foodboxdesc-20261022")
os.makedirs(B, exist_ok=True)
CSV = os.path.join(REPO, "zprintpro-sku-seo-data.csv")
TS = os.path.join(REPO, "src", "data", "sku-seo-data.ts")

ts = io.open(TS, encoding="utf-8", newline="").read()

def seo_desc(blk, loc):
    si = blk.find('"seo": {')
    if si < 0: return None
    seg0 = blk[si:]
    i = seg0.find('"%s": {' % loc)
    if i < 0: return None
    seg = seg0[i:i + 2200]
    m = re.search(r'"description": "((?:[^"\\]|\\.)*)"', seg)
    return m.group(1).replace('\\"', '"') if m else None

TARGETS = [
    ("mailer-boxes", 11, "zh-hk"),
    ("kraft-paper-bags", 13, "ja"),
    ("gift-bags", 11, "zh-hk"),
    ("rigid-boxes", 11, "zh-hk"),
]
# TS 侧值
vals = {}
for slug, col, loc in TARGETS:
    i = ts.find('"%s": {' % slug)
    assert i > 0, slug
    j = ts.find('\n  "', i + 5)
    blk = ts[i:j if j > 0 else len(ts)]
    v = seo_desc(blk, loc)
    assert v, f"{slug}/{loc} empty"
    vals[(slug, col)] = v
    print(f"TS {slug}/{loc}: {v[:70]}...")

raw = io.open(CSV, encoding="utf-8", newline="").read()
lines = raw.split("\n")
changed = 0
for (slug, col), v in vals.items():
    idx = None
    for k, l in enumerate(lines):
        if not l.strip(): continue
        c = l.rstrip("\r").split("\t")
        if len(c) > 3 and c[3] == slug:
            idx = k; break
    assert idx is not None, slug
    cols = lines[idx].rstrip("\r").split("\t")
    assert len(cols) == 31
    if cols[col] == v:
        continue
    assert "\t" not in v and "\n" not in v
    old = cols[col]
    cols[col] = v
    lines[idx] = "\t".join(cols) + ("\r" if lines[idx].endswith("\r") else "")
    changed += 1
    print(f"CSV {slug} col{col}: {len(old)} -> {len(v)}")

assert len(lines) == len(raw.split("\n"))
out = "\n".join(lines)
bp = os.path.join(B, "zprintpro-sku-seo-data.csv.before2")
if not os.path.exists(bp):
    shutil.copy2(CSV, bp)
io.open(CSV, "w", encoding="utf-8", newline="").write(out)
print(f"[OK] CSV updated cells: {changed}")
