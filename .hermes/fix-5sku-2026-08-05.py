"""Fix 4 affected SKUs: 7-word went into description_zh (wrong), need to move to description/descriptionEn/descriptionJa
Also re-add to a4-flyers: the R2 upgrade worked but let me verify
"""
import re

path = r'F:\zprintpro-nextjs\src\data\products.ts'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Affected SKUs: 7-word went into description_zh
AFFECTED = [
    'removable-stickers',
    'folded-leaflets',
    'same-day-flyers',
    'electronics-packaging-box',
]

# 7-word suffixes to strip from description_zh (these are what I wrongly appended)
ZH_7WORD = ' **適配行業**：餐飲外賣、零售精品、跨境電商、美妝護膚、教育培訓、婚慶、品牌活動。'
EN_7WORD = ' **Best for**: Food & Beverage, Retail, Cross-border E-commerce, Beauty & Skincare, Education & Training, Wedding, Brand Activations.'
JA_7WORD = ' **適用業界**：飲食・ケータリング、小売・ブティック、越境EC、美容・スキンケア、教育・研修、婚礼・冠婚葬祭、ブランドイベント。'

# 1) Strip the wrongly-appended 3-suffix combo from description_zh
for slug in AFFECTED:
    m = re.search(rf"slug:\s*['\"]" + re.escape(slug) + r"['\"]", content)
    if not m:
        print(f'WARN: {slug} not found')
        continue
    next_slug = re.search(r"\n\s*slug:\s*['\"]", content[m.end():])
    block_end = m.end() + next_slug.start() if next_slug else len(content)
    block = content[m.start():block_end]

    # Strip the 3-suffix combo from description_zh (only if it exists with the 7-word)
    pattern = rf"(description_zh:\s*')((?:(?!')(?:.|\n))+?)(\s*{re.escape(ZH_7WORD)}\s*{re.escape(EN_7WORD)}\s*{re.escape(JA_7WORD)})(')"
    m2 = re.search(pattern, block)
    if m2:
        new_text = m2.group(2).rstrip()
        # Re-construct: original + close quote
        # If original was empty, we leave just the close quote
        new_block = block.replace(m2.group(0), m2.group(1) + new_text + m2.group(4), 1)
        content = content[:m.start()] + new_block + content[block_end:]
        print(f'✓ {slug}: stripped wrongly-appended 7-word combo from description_zh')
    else:
        # Try simpler: just strip the 3-suffix from any field
        m3 = re.search(rf"(description_zh:\s*'[^']*?)({re.escape(ZH_7WORD)}|{re.escape(EN_7WORD)}|{re.escape(JA_7WORD)})", block)
        if m3:
            # Multi-pass strip
            for sfx in [ZH_7WORD, EN_7WORD, JA_7WORD]:
                content_chunk = content
                m_start = re.search(rf"slug:\s*['\"]" + re.escape(slug) + r"['\"]", content_chunk)
                next_slug2 = re.search(r"\n\s*slug:\s*['\"]", content_chunk[m_start.end():])
                block_end2 = m_start.end() + next_slug2.start() if next_slug2 else len(content_chunk)
                block2 = content_chunk[m_start.start():block_end2]
                if sfx in block2:
                    block2_new = block2.replace(sfx, '', 1)
                    content = content[:m_start.start()] + block2_new + content[block_end2:]
                    print(f'  ✓ {slug}: stripped "{sfx[:30]}..."')
        else:
            print(f'  ? {slug}: 7-word combo not found in description_zh (might already be clean)')

# 2) Properly add 7-word to description / descriptionEn / descriptionJa for the 4 affected SKUs
print('\n=== Step 2: Add 7-word to short description/descriptionEn/descriptionJa ===')
for slug in AFFECTED:
    m = re.search(rf"slug:\s*['\"]" + re.escape(slug) + r"['\"]", content)
    if not m:
        print(f'WARN: {slug} not found')
        continue
    next_slug = re.search(r"\n\s*slug:\s*['\"]", content[m.end():])
    block_end = m.end() + next_slug.start() if next_slug else len(content)
    block = content[m.start():block_end]

    for desc_field, append in [
        ('description', ZH_7WORD),
        ('descriptionEn', EN_7WORD),
        ('descriptionJa', JA_7WORD),
    ]:
        # Match `description: '...'` or `descriptionEn: '...'` on a single line (terminated by `',` or `'\n`)
        # We want to find this SPECIFIC field, not the description_zh
        # Use word boundary: \bdescription\b
        pattern = rf"(\b{desc_field}:\s*')([^'\n]+?)(')"
        m2 = re.search(pattern, block)
        if m2:
            current = m2.group(2)
            if '餐飲外賣' not in current and 'Food & Beverage' not in current and '飲食・ケータリング' not in current:
                new_text = current + append
                old = m2.group(0)
                new = m2.group(1) + new_text + m2.group(3)
                new_block = block.replace(old, new, 1)
                content = content[:m.start()] + new_block + content[block_end:]
                # Re-fetch block
                m = re.search(rf"slug:\s*['\"]" + re.escape(slug) + r"['\"]", content)
                next_slug = re.search(r"\n\s*slug:\s*['\"]", content[m.end():])
                block_end = m.end() + next_slug.start() if next_slug else len(content)
                block = content[m.start():block_end]
                print(f'  ✓ {slug}.{desc_field}: added 7-word (tail 80: ...{append[-80:]})')
            else:
                print(f'  - {slug}.{desc_field}: 7-word already present, skip')
        else:
            print(f'  ? {slug}.{desc_field}: pattern not found')

# Save
with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print(f'\nSaved. Total file size: {len(content)} chars')
