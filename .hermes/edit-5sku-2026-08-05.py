"""2026-08-05 daily B: Optimize 5 SKUs (4 P0 R1 new + 1 P0 R2 upgrade)
Standard 7-words 繁體 **適配行業** per v7.1 pattern:
  zh-hk: 餐飲外賣、零售精品、跨境電商、美妝護膚、教育培訓、婚慶、品牌活動
  en:    Food & Beverage, Retail, Cross-border E-commerce, Beauty & Skincare, Education & Training, Wedding, Brand Activations
  ja:    飲食・ケータリング、小売・ブティック、越境EC、美容・スキンケア、教育・研修、婚礼・冠婚葬祭、ブランドイベント
"""
import re

path = r'F:\zprintpro-nextjs\src\data\products.ts'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 5 SKU 配置
# 4 R1 new + 1 R2 upgrade
# (slug, optimizedAt, optimizationRound, is_new, append_zh, append_en, append_ja)
SKU_CONFIGS = [
    {
        'slug': 'removable-stickers',
        'opt_at': '2026-08-05',
        'round': 1,
        'is_new': True,
        'append_zh': ' **適配行業**：餐飲外賣、零售精品、跨境電商、美妝護膚、教育培訓、婚慶、品牌活動。',
        'append_en': ' **Best for**: Food & Beverage, Retail, Cross-border E-commerce, Beauty & Skincare, Education & Training, Wedding, Brand Activations.',
        'append_ja': ' **適用業界**：飲食・ケータリング、小売・ブティック、越境EC、美容・スキンケア、教育・研修、婚礼・冠婚葬祭、ブランドイベント。',
    },
    {
        'slug': 'folded-leaflets',
        'opt_at': '2026-08-05',
        'round': 1,
        'is_new': True,
        'append_zh': ' **適配行業**：餐飲外賣、零售精品、跨境電商、美妝護膚、教育培訓、婚慶、品牌活動。',
        'append_en': ' **Best for**: Food & Beverage, Retail, Cross-border E-commerce, Beauty & Skincare, Education & Training, Wedding, Brand Activations.',
        'append_ja': ' **適用業界**：飲食・ケータリング、小売・ブティック、越境EC、美容・スキンケア、教育・研修、婚礼・冠婚葬祭、ブランドイベント。',
    },
    {
        'slug': 'same-day-flyers',
        'opt_at': '2026-08-05',
        'round': 1,
        'is_new': True,
        'append_zh': ' **適配行業**：餐飲外賣、零售精品、跨境電商、美妝護膚、教育培訓、婚慶、品牌活動。',
        'append_en': ' **Best for**: Food & Beverage, Retail, Cross-border E-commerce, Beauty & Skincare, Education & Training, Wedding, Brand Activations.',
        'append_ja': ' **適用業界**：飲食・ケータリング、小売・ブティック、越境EC、美容・スキンケア、教育・研修、婚礼・冠婚葬祭、ブランドイベント。',
    },
    {
        'slug': 'electronics-packaging-box',
        'opt_at': '2026-08-05',
        'round': 1,
        'is_new': True,
        'append_zh': ' **適配行業**：餐飲外賣、零售精品、跨境電商、美妝護膚、教育培訓、婚慶、品牌活動。',
        'append_en': ' **Best for**: Food & Beverage, Retail, Cross-border E-commerce, Beauty & Skincare, Education & Training, Wedding, Brand Activations.',
        'append_ja': ' **適用業界**：飲食・ケータリング、小売・ブティック、越境EC、美容・スキンケア、教育・研修、婚礼・冠婚葬祭、ブランドイベント。',
    },
    {
        'slug': 'a4-flyers',
        'opt_at': '2026-08-05',
        'round': 2,
        'is_new': False,  # R2 upgrade (was R1 2026-07-28)
        'append_zh': ' **適配行業**：餐飲外賣、零售精品、跨境電商、美妝護膚、教育培訓、婚慶、品牌活動。',
        'append_en': ' **Best for**: Food & Beverage, Retail, Cross-border E-commerce, Beauty & Skincare, Education & Training, Wedding, Brand Activations.',
        'append_ja': ' **適用業界**：飲食・ケータリング、小売・ブティック、越境EC、美容・スキンケア、教育・研修、婚礼・冠婚葬祭、ブランドイベント。',
    },
]

for cfg in SKU_CONFIGS:
    slug = cfg['slug']
    # 找 slug 位置
    m = re.search(rf"(slug:\s*['\"]" + re.escape(slug) + r"['\"])(,?\s*\n)", content)
    if not m:
        print(f'WARN: {slug} slug not found')
        continue

    # 1. Insert/update optimizedAt + optimizationRound right after slug
    if cfg['is_new']:
        # R1 new: insert lines after slug
        new_block = f"slug: '{slug}',\n    optimizedAt: '{cfg['opt_at']}',\n    optimizationRound: {cfg['round']},\n"
        old_block = m.group(0)
        content = content.replace(old_block, new_block, 1)
    else:
        # R2 upgrade: find and replace existing optimizedAt + optimizationRound
        # Find positions of optimizedAt and optimizationRound for this SKU
        # Search after the slug
        slug_pos = content.find(f"slug: '{slug}',")
        # Find next slug or end of this block
        next_slug = re.search(r"\n\s*slug:\s*['\"]", content[slug_pos+10:])
        block_end = slug_pos + 10 + next_slug.start() if next_slug else len(content)
        block = content[slug_pos:block_end]

        # Replace optimizedAt
        new_block = re.sub(
            r"optimizedAt:\s*['\"][^'\"]*['\"]",
            f"optimizedAt: '{cfg['opt_at']}'",
            block, count=1
        )
        # Replace optimizationRound
        new_block = re.sub(
            r"optimizationRound:\s*\d+",
            f"optimizationRound: {cfg['round']}",
            new_block, count=1
        )
        if new_block == block:
            print(f'WARN: {slug} R2 upgrade - no optimizedAt found in block, will insert')
            # Insert after slug
            new_block = re.sub(
                r"(slug:\s*['\"]" + re.escape(slug) + r"['\"],?\s*\n)",
                rf"\1    optimizedAt: '{cfg['opt_at']}',\n    optimizationRound: {cfg['round']},\n",
                block, count=1
            )
        content = content[:slug_pos] + new_block + content[block_end:]

    # 2. Append 7-word 適配行業 to 3 locale descriptions
    # The 3 descriptions are description, descriptionEn, descriptionJa
    # Each ends with the current string + closing quote
    # We append BEFORE the closing quote
    for desc_field, append in [
        ('description', cfg['append_zh']),
        ('descriptionEn', cfg['append_en']),
        ('descriptionJa', cfg['append_ja']),
    ]:
        # Find the field for THIS SKU (use updated slug position)
        slug_pos_now = content.find(f"slug: '{slug}',")
        if slug_pos_now < 0:
            print(f'WARN: {slug} position not found for {desc_field}')
            continue
        next_slug_m = re.search(r"\n\s*slug:\s*['\"]", content[slug_pos_now+10:])
        block_end = slug_pos_now + 10 + next_slug_m.start() if next_slug_m else len(content)
        block = content[slug_pos_now:block_end]

        # Match description: 'current text' (single-quote, multi-line possible)
        # Use non-greedy match
        pattern = rf"({desc_field}:\s*')(.+?)('[\s,]*\n)"
        m2 = re.search(pattern, block, re.DOTALL)
        if not m2:
            print(f'WARN: {slug} {desc_field} not found')
            continue
        current_text = m2.group(2)
        new_text = current_text + append
        new_field = m2.group(1) + new_text + m2.group(3)
        new_block = block.replace(m2.group(0), new_field, 1)
        content = content[:slug_pos_now] + new_block + content[block_end:]

    print(f'OK: {slug} (R{cfg["round"]} {"new" if cfg["is_new"] else "upgrade"}, optAt={cfg["opt_at"]})')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print(f'\nSaved. Total file size: {len(content)} chars')
