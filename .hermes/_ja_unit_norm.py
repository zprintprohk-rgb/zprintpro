# -*- coding: utf-8 -*-
"""5 包装 SKU ja 段: 100 枚から -> 100 個から (箱/袋用個)"""
import io, os, re, shutil

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(REPO, "src", "data", "sku-seo-data.ts")
t = io.open(P, encoding="utf-8", newline="").read()
SKUS = ['rigid-boxes', 'cosmetic-boxes', 'mailer-boxes', 'white-card-bags', 'kraft-paper-bags']
total = 0
for slug in SKUS:
    mk = [(m.group(1), m.start()) for m in re.finditer(r'^  "([a-z0-9-]+)": \{', t, re.M)]
    idx = next(i for i, (k, o) in enumerate(mk) if k == slug)
    off = mk[idx][1]
    end = mk[idx + 1][1] if idx + 1 < len(mk) else len(t)
    blk = t[off:end]
    ja_i = blk.find('"ja": {')
    ja = blk[ja_i:]
    n = len(re.findall(r'100\s*枚から', ja))
    ja2 = re.sub(r'100\s*枚から', '100 個から', ja)
    if n:
        t = t[:off] + blk[:ja_i] + ja2 + t[end:]
        total += n
        print(f"[OK] {slug}: {n}")
bp = os.path.join(REPO, ".hermes", "_bak-enja-direct-20261021", "sku-seo-data.ts.before2")
if not os.path.exists(bp):
    shutil.copy2(P, bp)
io.open(P, "w", encoding="utf-8", newline="").write(t)
print("[PASS] total", total)
