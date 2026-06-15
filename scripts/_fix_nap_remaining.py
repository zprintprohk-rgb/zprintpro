#!/usr/bin/env python3
import re
from pathlib import Path
PROD_FILE = Path("F:/zprintpro-nextjs/src/data/products.ts")
prod = PROD_FILE.read_text(encoding="utf-8")

# 10 个剩余缺 NAP 防御的 SKU
REMAINING_NO_NAP = [
    "thick-business-cards-400g", "removable-stickers", "fluorescent-stickers",
    "large-bags", "a5-flyers", "cosmetic-boxes",
    "electronics-packaging-box", "kraft-paper-packaging-box",
    "drawer-slide-gift-box", "fruit-food-label-stickers",
]
NAP_TAIL = "**智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。"

new_prod = prod
added = 0
for slug in REMAINING_NO_NAP:
    pat = re.compile(r"slug:\s*'" + re.escape(slug) + r"'\s*,\s*", re.MULTILINE)
    m = pat.search(new_prod)
    if not m:
        print(f'  [skip] {slug}: not found')
        continue
    # 找 longDescription: `...`
    next_slug = re.search(r"^\s*slug:\s*'", new_prod[m.end():], re.MULTILINE)
    if next_slug:
        end = m.end() + next_slug.start()
    else:
        end = new_prod.find("\n];", m.end())
        if end == -1:
            end = len(new_prod)
    block = new_prod[m.start():end]
    ld_pat = re.compile(r"longDescription:\s*`([^`]+)`", re.DOTALL)
    ld_m = ld_pat.search(block)
    if not ld_m:
        print(f'  [skip] {slug}: no longDescription')
        continue
    long_desc = ld_m.group(1)
    if "非智印港" in long_desc:
        print(f'  [skip] {slug}: already has NAP')
        continue
    new_long_desc = long_desc.rstrip() + "\n\n" + NAP_TAIL
    abs_pos = m.start() + ld_m.start(1)
    new_prod = new_prod[:abs_pos] + new_long_desc + new_prod[abs_pos+len(long_desc):]
    added += 1
    print(f'  [OK] {slug}')

PROD_FILE.write_text(new_prod, encoding="utf-8")
print(f'\nAdded: {added}/{len(REMAINING_NO_NAP)}')
print(f'bytes: {len(prod):,} -> {len(new_prod):,}')
