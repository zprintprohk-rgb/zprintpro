"""Find the 4 unoptimized P0 SKU details + 1 R2 candidate for daily B"""
import re

with open(r'F:\zprintpro-nextjs\src\data\products.ts', 'r', encoding='utf-8') as f:
    products_ts = f.read()

# 找每个 SKU 块的 content
sku_blocks = re.split(r'(?=^\s*slug:\s*[\'"])', products_ts, flags=re.MULTILINE)
target_slugs = ['removable-stickers', 'folded-leaflets', 'same-day-flyers', 'electronics-packaging-box',
                'a4-flyers', 'small-batch-stickers', 'die-cut-stickers', 'foil-stickers', 'a5-flyers',
                'handle-bags', 'white-card-bags', 'gift-bags', 'mailer-boxes', 'corrugated-boxes',
                'pvc-menu', 'a2-poster', 'lai-see-packets', 'graduation-yearbook', 'exercise-books']

for slug in target_slugs:
    for block in sku_blocks:
        if re.match(rf"\s*slug:\s*['\"]" + re.escape(slug) + r"['\"]", block):
            # Find category
            cat_m = re.search(r"category:\s*['\"]([^'\"]+)['\"]", block)
            opt_m = re.search(r"optimizedAt:\s*['\"]([^'\"]+)['\"]", block)
            round_m = re.search(r"optimizationRound:\s*(\d+)", block)
            name_m = re.search(r"name:\s*['\"]([^'\"]+)['\"]", block)
            nameEn_m = re.search(r"nameEn:\s*['\"]([^'\"]+)['\"]", block)
            nameJa_m = re.search(r"nameJa:\s*['\"]([^'\"]+)['\"]", block)
            print(f'== {slug} ==')
            print(f'  category: {cat_m.group(1) if cat_m else "?"}')
            print(f'  name: {name_m.group(1) if name_m else "?"}')
            print(f'  nameEn: {nameEn_m.group(1) if nameEn_m else "?"}')
            print(f'  nameJa: {nameJa_m.group(1) if nameJa_m else "?"}')
            print(f'  optimizedAt: {opt_m.group(1) if opt_m else "(none)"}')
            print(f'  round: {round_m.group(1) if round_m else "(none)"}')
            # Find existing 適配行業 / 适配行业
            if '適配行業' in block:
                zh_m = re.search(r'\*\*適配行業\*\*[：:]\s*([^\n*]+)', block)
                print(f'  適配行業: {zh_m.group(1) if zh_m else "?"}')
            elif '适配行业' in block:
                zh_m = re.search(r'\*\*适配行业\*\*[：:]\s*([^\n*]+)', block)
                print(f'  适配行业: {zh_m.group(1) if zh_m else "?"}')
            else:
                print(f'  適配行業: (none)')
            print()
            break
