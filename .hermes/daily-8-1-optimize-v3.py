#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
8/1 daily cron v7.1 - 5 SKU optimization + 1 PDP review + matrix tracking.

v3 fix: Insert optimizedAt/optimizationRound RIGHT AFTER slug and BEFORE category
(per the existing tuck-end-boxes pattern at line 18285-18293).
"""
import re
import json

# === Standard 7 行业 (繁體) ===
INDUSTRIES_ZH = "餐飲外賣/零售精品/跨境電商/美妝護膚/教育培訓/婚慶/品牌活動"
INDUSTRIES_EN = "Restaurants & Catering, Retail & Boutique, Cross-border E-commerce, Beauty & Skincare, Education & Training, Wedding & Events, Brand Activations"
INDUSTRIES_JA = "飲食・ケータリング、小売・ブティック、越境EC、美容・スキンケア、教育・研修、婚礼・冠婚葬祭、ブランドイベント"

SKU_PLAN = [
    {'slug': 'security-stickers', 'category': 'stickers', 'round': 1, 'note': '2026-08-01 v7 daily cron Tier A 7 行业 (R1 全新, P0 stickers 雷射/易碎紙/防偽)'},
    {'slug': 'fluorescent-stickers', 'category': 'stickers', 'round': 1, 'note': '2026-08-01 v7 daily cron Tier A 7 行业 (R1 全新, P0 stickers 螢光色彩/促銷/安全標識)'},
    {'slug': 'thick-paper-flyers', 'category': 'flyers', 'round': 1, 'note': '2026-08-01 v7 daily cron Tier A 7 行业 (R1 全新, P0 flyers 200g+ 厚紙/高端產品)'},
    {'slug': 'gang-run-card-boxes', 'category': 'packaging', 'round': 1, 'note': '2026-08-01 v7 daily cron Tier A 7 行业 (R1 全新, P0 packaging 拼版白卡彩盒)'},
    {'slug': 'tuck-end-boxes', 'category': 'packaging', 'round': 2, 'note': '2026-08-01 v7 daily cron Tier A 7 行业 (R2 append, 跟 2026-07-21 R1 化妝品小樣/訂閱盒/烘焙連鎖/文創周邊 7 词并存)'},
]

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()
original_content = content


def append_to_description_field(content_text, slug, field_name, append_text):
    """Find `slug: 'xxx',\n` then within the same product, find `field_name: '...'`
    and insert append_text before the closing quote.

    Uses anchored search: locate the slug first, then within a reasonable window
    after the slug (up to next slug or end of file), find the field.
    """
    sm = re.search(r"(\n\s*slug:\s*['\"]" + re.escape(slug) + r"['\"]\s*,\n)", content_text)
    if not sm:
        return content_text, 0, 'slug_not_found'
    after_slug_pos = sm.end()

    # Within the next 2000 chars, find field_name: '...',
    # Use a windowed approach: find `field_name:` within the same product block
    # (the product ends with `},` or `}\n` before the next slug or end)
    window = content_text[after_slug_pos:after_slug_pos + 3000]
    # Find field pattern
    pattern = r"(" + re.escape(field_name) + r":\s*['\"])([^'\"]*?)(['\"]\s*,)"
    field_match = re.search(pattern, window)
    if not field_match:
        return content_text, 0, 'field_not_found'

    # Apply replacement within window
    new_window = window[:field_match.start()] + field_match.group(1) + field_match.group(2) + append_text + field_match.group(3) + window[field_match.end():]
    return content_text[:after_slug_pos] + new_window + content_text[after_slug_pos + len(window):], 1, 'ok'


def insert_optimized_after_slug(content_text, slug, optimized_at, round_num):
    """Insert `optimizedAt` and `optimizationRound` after `slug: 'xxx',` and before `category:`."""
    # Find: slug: 'xxx',\n  (followed by 2 spaces, then category:)
    pattern = r"(\n\s*slug:\s*['\"]" + re.escape(slug) + r"['\"]\s*,\n)(\s*category:)"
    new_text = r"\1" + f"    optimizedAt: '{optimized_at}',\n    optimizationRound: {round_num},\n" + r"\2"
    new_content, n = re.subn(pattern, new_text, content_text, count=1)
    return new_content, n


def update_optimization_round(content_text, slug, new_round):
    """Update existing optimizationRound 1 -> 2 in place (R2 mode)."""
    pattern = r"(slug:\s*['\"]" + re.escape(slug) + r"['\"]\s*,\n\s*optimizedAt:\s*['\"][^'\"]*['\"]\s*,\n\s*optimizationRound:\s*)1(\s*,)"
    new_content, n = re.subn(pattern, r"\g<1>" + str(new_round) + r"\g<2>", content_text, count=1)
    return new_content, n


# Process each SKU
for plan in SKU_PLAN:
    slug = plan['slug']
    rnd = plan['round']

    if rnd == 1:
        # R1: insert optimizedAt + optimizationRound after slug
        content, n = insert_optimized_after_slug(content, slug, '2026-08-01', 1)
        if n != 1:
            print(f'  {slug} R1: insert FAILED (n={n})')
            continue
    else:
        # R2: update optimizationRound 1 -> 2
        content, n = update_optimization_round(content, slug, 2)
        if n != 1:
            print(f'  {slug} R2: update FAILED (n={n})')
            continue

    # Append industries to description (zh, en, ja)
    content, n1, s1 = append_to_description_field(content, slug, 'description', ' **適配行業**: ' + INDUSTRIES_ZH)
    content, n2, s2 = append_to_description_field(content, slug, 'descriptionEn', ' **Best for**: ' + INDUSTRIES_EN)
    content, n3, s3 = append_to_description_field(content, slug, 'descriptionJa', ' **適合業種**: ' + INDUSTRIES_JA)

    has_opt = 'optimizedAt' in content
    has_round = 'optimizationRound' in content
    print(f'  {slug} R{rnd}: ind_zh={n1} ({s1}) | ind_en={n2} ({s2}) | ind_ja={n3} ({s3})')

# Write back
if content != original_content:
    with open('src/data/products.ts', 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'\n  products.ts updated ({len(original_content)} -> {len(content)} bytes)')
else:
    print('\n  No changes made!')
