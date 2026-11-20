# -*- coding: utf-8 -*-
# 双方法: DISPLAY_ANCHOR_OVERRIDES (pricing.ts) vs products.ts price_range/basePrice
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
pricing = open(r'F:\zprintpro-nextjs\src\lib\pricing.ts', encoding='utf-8').read()
prod = open(r'F:\zprintpro-nextjs\src\data\products.ts', encoding='utf-8').read()

# parse OVERRIDES block
m = re.search(r'DISPLAY_ANCHOR_OVERRIDES[^{]*\{([\s\S]*?)\n\};', pricing)
block = m.group(1)
overs = []
for line in block.splitlines():
    mm = re.match(r"\s*'([^']+)':\s*\{\s*low:\s*([\d.]+),\s*high:\s*([\d.]+),\s*unit:\s*'([^']+)'", line)
    if mm:
        slug, lo, hi, unit = mm.groups()
        overs.append((slug, float(lo), float(hi), unit))
print(f'OVERRIDE 共 {len(overs)} 项')
for slug, lo, hi, unit in overs:
    i = prod.find("slug: '" + slug + "'")
    if i < 0:
        print(f'  {slug}: SKU NOT FOUND in products.ts'); continue
    seg = prod[i:i+2500]
    pr = re.search(r"price_range:\s*'((?:[^'\\]|\\.)*)'", seg)
    bp = re.search(r"basePrice:\s*([\d.]+)", seg)
    bp_en = re.search(r"basePrice_en:\s*([\d.]+)", seg)
    bpx = re.search(r"basePrice_ja:\s*([\d.]+)", seg)
    mq = re.search(r"minQuantity:\s*(\d+)", seg)
    pr_s = pr.group(1) if pr else '?'
    # extract numeric low from price_range
    nums = [float(x) for x in re.findall(r'([\d.]+)', pr_s)]
    pr_lo = min(nums) if nums else None
    pr_hi = max(nums) if nums else None
    flag = ''
    if pr_lo is not None and (lo < pr_lo * 0.5 or hi > pr_hi * 2 if pr_hi else False):
        flag = ' <<< CHECK'
    elif pr_lo is not None and lo < pr_lo and hi > pr_hi:
        flag = ' <<< WIDE'
    elif pr_lo is not None and lo < pr_lo * 0.9:
        flag = ' <<< LOW?'
    print(f'  {slug} [{unit}]: override {lo}-{hi} | price_range {pr_s} | basePrice {bp.group(1) if bp else "?"} (en {bp_en.group(1) if bp_en else "?"}/ja {bpx.group(1) if bpx else "?"}) | minQ {mq.group(1) if mq else "?"}{flag}')
