"""Verify 5 SKU optimization"""
import re

with open(r'F:\zprintpro-nextjs\src\data\products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

target_slugs = ['removable-stickers', 'folded-leaflets', 'same-day-flyers', 'electronics-packaging-box', 'a4-flyers']

for slug in target_slugs:
    m = re.search(rf"slug:\s*['\"]" + re.escape(slug) + r"['\"]", content)
    if not m:
        print(f'❌ {slug}: not found')
        continue
    # Find block
    next_slug = re.search(r"\n\s*slug:\s*['\"]", content[m.end():])
    block_end = m.end() + next_slug.start() if next_slug else len(content)
    block = content[m.start():block_end]

    opt_m = re.search(r"optimizedAt:\s*['\"]([^'\"]+)['\"]", block)
    round_m = re.search(r"optimizationRound:\s*(\d+)", block)
    # Find new 繁體 適配行業
    new_match = re.search(r'\*\*適配行業\*\*[：:]\s*([^。.]+)', block)
    new_word = new_match.group(1) if new_match else 'NOT FOUND'

    # Check if new_append is in 3 descriptions
    for desc in ['description', 'descriptionEn', 'descriptionJa']:
        m2 = re.search(rf"{desc}:\s*'(.+?)'", block, re.DOTALL)
        if m2:
            has_new = '餐飲外賣' in m2.group(1) or 'Food & Beverage' in m2.group(1) or '飲食・ケータリング' in m2.group(1)
        else:
            has_new = False

    print(f'== {slug} ==')
    print(f'  optimizedAt: {opt_m.group(1) if opt_m else "?"}')
    print(f'  optimizationRound: {round_m.group(1) if round_m else "?"}')
    print(f'  7-word 繁體 適配行業: {new_word[:80]}')
    print(f'  Has 7-word in 3 locale descriptions: ?')
    # Quick check
    desc_zh = re.search(r"description:\s*'([^']+)'", block, re.DOTALL)
    if desc_zh and '餐飲外賣' in desc_zh.group(1):
        print(f'  zh-hk: ✓ 餐飲外賣 found')
    desc_en = re.search(r"descriptionEn:\s*'([^']+)'", block, re.DOTALL)
    if desc_en and 'Food & Beverage' in desc_en.group(1):
        print(f'  en: ✓ Food & Beverage found')
    desc_ja = re.search(r"descriptionJa:\s*'([^']+)'", block, re.DOTALL)
    if desc_ja and '飲食・ケータリング' in desc_ja.group(1):
        print(f'  ja: ✓ 飲食・ケータリング found')
    print()
