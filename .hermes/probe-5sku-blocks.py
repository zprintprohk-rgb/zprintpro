"""Find SKU blocks for the 5 B-task SKUs and check their current description tail"""
import re

with open(r'F:\zprintpro-nextjs\src\data\products.ts', 'r', encoding='utf-8') as f:
    products_ts = f.read()

sku_blocks = re.split(r'(?=^\s*slug:\s*[\'"])', products_ts, flags=re.MULTILINE)
target_slugs = ['removable-stickers', 'folded-leaflets', 'same-day-flyers', 'electronics-packaging-box', 'a4-flyers']

for slug in target_slugs:
    for block in sku_blocks:
        if re.match(rf"\s*slug:\s*['\"]" + re.escape(slug) + r"['\"]", block):
            # Find the block end (next slug or array close)
            # Show description 3 locales
            desc_zh_m = re.search(r"description:\s*['\"](.{0,300})", block)
            desc_en_m = re.search(r"descriptionEn:\s*['\"](.{0,300})", block)
            desc_ja_m = re.search(r"descriptionJa:\s*['\"](.{0,300})", block)
            opt_m = re.search(r"optimizedAt:\s*['\"]([^'\"]+)['\"]", block)
            round_m = re.search(r"optimizationRound:\s*(\d+)", block)
            print(f'== {slug} ==')
            print(f'  optimizedAt: {opt_m.group(1) if opt_m else "(none)"}, round: {round_m.group(1) if round_m else "(none)"}')
            if desc_zh_m: print(f'  description[zh]: {desc_zh_m.group(1)[:200]}...')
            if desc_en_m: print(f'  descriptionEn: {desc_en_m.group(1)[:200]}...')
            if desc_ja_m: print(f'  descriptionJa: {desc_ja_m.group(1)[:200]}...')
            # Show existing 適配行業
            for k in ['適配行業', '适配行业']:
                m = re.search(r'\*\*' + k + r'\*\*[：:]\s*([^\n]+)', block)
                if m: print(f'  {k}: {m.group(1)[:200]}')
            print()
            break
