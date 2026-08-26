#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""K3 8/17 06:44 67-B: 4 金矿词 title/meta CTR 收割
- 即日印刷 (zh-hk) → rush-printing-delivery 服务页 (zh-hk 1 个)
- 餐牌印刷 (zh-hk) → categorySeoData['menus'] (zh-hk 1 个)
- 両面カラー印刷 (ja) → categorySeoData['flyers'].titles.ja (1 个)
- 月曆印刷 (zh-hk) → categorySeoData['calendars'] (zh-hk 1 个)

K3 战略: 数字 + 卖点前置 + CTA + 50-60 字符 title
"""
import re
from pathlib import Path

ROOT = Path(__file__).parent.parent
SEO_TS = ROOT / 'src' / 'lib' / 'seo.ts'

# 4 new titles/descriptions (K3 战略模板)
TARGETS = {
    # 即日印刷 → rush-printing-delivery 服务页 (zh-hk)
    'rush-printing-delivery-zh-hk': {
        'title': '即日印刷 24 小时出货 | 香港最快 4 小时 | 智印港',
        'description': '2026 香港即日印刷服务, 100+ 客户验证, 30 秒 AI 报价, 最快 4 小时出货. 顺豐本地派送 + DHL 全球 2-4 日. 100 张起印, 立即 Get Quote.'
    },
    # 餐牌印刷 → categorySeoData['menus'] (zh-hk)
    'menus-zh-hk': {
        'title': '餐牌印刷 防水耐用 | 多尺寸 + 免费设计 | 智印港',
        'description': '餐牌印刷服务, 防水覆膜 + 多种纸张. A4 / A5 / 三折页, 30 秒 AI 报价, 100 张起印, 顺豐本地 1-2 工作天. 100+ 餐厅验证, 立即 Get Quote.'
    },
    # 両面カラー印刷 → categorySeoData['flyers'] (ja)
    'flyers-ja': {
        'title': '両面カラー印刷 | 小ロット100枚〜 | 短納期2-4日 | ZprintPro',
        'description': '両面フルカラー印刷サービス, 100枚から小ロット対応. 短納期 2-4日, 日本全国送料込み. 30秒 AI見積もり, ISO 9001 認証品質. 飲食店・小売・サロン多数実績.'
    },
    # 月曆印刷 → categorySeoData['calendars'] (zh-hk)
    'calendars-zh-hk': {
        'title': '月曆印刷 2027 | 台曆 + 掛曆 | 30 秒报价 | 智印港',
        'description': '月曆印刷服务, 2027 台曆 / 掛曆 / 座曆多款. 30 秒 AI 报价, 50 件起印, ISO 9001 认证. 顺豐本地派送. 立即 Get Quote.'
    }
}

with open(SEO_TS, 'r', encoding='utf-8') as f:
    content = f.read()

changes_made = []

# 1. 即日印刷 → rush-printing-delivery page.tsx (NOT in seo.ts, need to find)
# Search for rush-printing-delivery in page.tsx
rush_page = ROOT / 'src' / 'app' / '[locale]' / 'services' / 'rush-printing-delivery' / 'page.tsx'
if rush_page.exists():
    rush_content = rush_page.read_text(encoding='utf-8')
    # Find generateMetadata
    # ... This page has its own metadata, not via seo.ts
    # We need to update it directly
    print('rush-printing-delivery page.tsx exists, will update via separate script')

# 2-4. 餐牌/両面/月曆 → categorySeoData in seo.ts
# Find each slug's titles block
for key, t in TARGETS.items():
    if key == 'rush-printing-delivery-zh-hk':
        continue
    slug = key.split('-')[0]
    locale = key.split('-')[1]
    # Find slug block in seo.ts
    # Pattern: 'slug': { ... titles: { ... locale: 'old title' ... } ... }
    # Use locale-specific replace
    if locale == 'zh-hk':
        new_title = t['title']
        # Find existing title in titles
        pattern = rf"({slug}.*?titles.*?'zh-hk':\s*)'[^']*'"
        # Simpler: find slug block + 'zh-hk' line
        m = re.search(rf"'{slug}':\s*\{{(.*?)\}}", content, re.DOTALL)
        if m:
            block = m.group(0)
            # Replace titles.zh-hk
            new_block = re.sub(
                r"(titles:\s*\{[^}]*?'zh-hk':\s*)'[^']*'",
                lambda mm: mm.group(1) + "'" + new_title + "'",
                block, count=1
            )
            if new_block != block:
                content = content.replace(block, new_block)
                changes_made.append(slug + '.titles.zh-hk')
    elif locale == 'ja':
        new_title = t['title']
        m = re.search(rf"'{slug}':\s*\{{(.*?)\}}", content, re.DOTALL)
        if m:
            block = m.group(0)
            new_block = re.sub(
                r"(titles:\s*\{[^}]*?ja:\s*)'[^']*'",
                lambda mm: mm.group(1) + "'" + new_title + "'",
                block, count=1
            )
            if new_block != block:
                content = content.replace(block, new_block)
                changes_made.append(slug + '.titles.ja')

# Write
if changes_made:
    SEO_TS.write_text(content, encoding='utf-8')
    print('Changes made:')
    for c in changes_made:
        print('  ' + c)
else:
    print('No changes made - pattern not found, need manual review')
