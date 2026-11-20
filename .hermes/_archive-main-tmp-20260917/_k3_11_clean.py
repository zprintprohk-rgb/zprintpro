#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
§11 名片禁区激进清 (v3.2 §六 #2, K3 8/17 21:40 拍板, 8/18 第 2 push).

清 132 hits (咭片 58 + 名片 69 + business card 5):
- 咭片 (HK 印刷) → 贴纸 / 小冊 / 紙卡
- 名片 (简中) → 贴纸 / 标签 / 样品 / 宣傳單張
- business card (en) → sticker / sample / label / small card

保留 99 hits 名刺 (ja 行业术语 + 客户案例, v3.2 §三 战略定位 "包装盒/紙袋/貼紙 30秒AI报价" 需要 ja B2B 案例库, §11 字面禁词误算 ja 行业术语).

不替换 (上下文判断):
- "咭片" 行业术语 (FSC 咭片 = 纸卡) → 改 "紙卡"
- "business card" 客製化卡片 → 改 "sample card" / "label" / 主营业务
"""
import os
import re
import sys
import subprocess

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

ROOT = r'F:\zprintpro-nextjs'

# 替换规则 (按 §11 原文 "立即替换为 貼紙/宣傳單張/包裝盒")
# 注意保留 Raksul ラクスル 等竞品品牌词 (这些不是 §11 禁词)
REPLACEMENTS = [
    # 咭片 (HK 印刷) → 紙卡 / 貼紙 (主营品类)
    (r'咭片厚度', '貼紙厚度'),
    (r'FSC 咭片', 'FSC 紙卡'),
    (r'FSC咭片', 'FSC紙卡'),
    (r'咭片類', '紙卡類'),
    (r'咭片盒', '貼紙盒'),
    (r'咭片\s*\+', '貼紙 +'),
    (r'\b咭片\b', '紙卡'),
    # 名片 (简中误用 + zh-hk 残留) → 主营品类
    (r'名片知識', '貼紙知識'),
    (r'名片印刷', '貼紙印刷'),
    (r'最低\s*50\s*盒起訂.*?名片', '最低 50 張起訂'),
    (r'部分產品如名片', '部分產品如貼紙'),
    (r'核心產品.*?名片.*?傳單', '核心產品：傳單、貼紙、包裝盒'),
    (r'中小企品牌建設.*?名片.*?包裝盒', '中小企品牌建設：包裝盒、傳單'),
    (r'名片、傳單、貼紙', '傳單、貼紙、包裝盒'),
    (r'印刷品（名片.*?包裝盒', '印刷品（貼紙、包裝盒'),
    (r'高品質\s*名片', '高品質貼紙'),
    (r'\b名片\b', '貼紙'),
    # business card (en) → sticker / sample (主营)
    (r"key:\s*'card',\s*label:\s*'名片知識'", "key: 'card', label: '貼紙知識'"),
    (r"'business-cards':\s*'[^']*名片[^']*'", "'business-cards': '名片（已 deprecated, 主营贴纸/包装盒）'"),
    (r'Premium packaging and business cards', 'Premium packaging and stickers'),
    (r'400g thick business cards and corporate catalog', '400g thick sticker sheets and corporate catalog'),
    (r'Business card retention up 60%', 'Sticker retention up 60%'),
    (r"articleSlugs = \[[^\]]*'business-card-design'[^\]]*\]", "articleSlugs = ['company-intro', 'hong-kong-printing-guide', 'design-file-specs', 'brand-materials-checklist', 'mtr-advertising-specs', 'sticker-guide', 'sticker-design-10-golden-rules', 'packaging-trends', 'cmyk-guide', 'paper-materials', 'eco-printing', 'flyer-printing-guide', 'food-packaging-printing-guide', 'paper-bag-printing-guide', 'poster-printing-guide', 'restaurant-opening-flyer-printing-guide', 'packaging-box-custom-guide', 'pet-food-sticker-printing-guide', 'apparel-shopping-bag-printing-guide', 'cross-border-ecommerce-shipping-box-guide', 'real-estate-brochure-box-printing-guide', 'pharmaceutical-label-printing-guide', 'jewellery-shopping-bag-printing-guide', 'cosmetics-packaging-box-printing-guide', 'tea-beverage-gift-box-printing-guide', 'wedding-favor-bag-printing-guide', 'retail-shop-poster-printing-guide', 'restaurant-menu-printing-guide', 'wedding-red-packet-printing-guide', 'product-label-printing-guide', 'graduation-yearbook-printing-guide', 'ip-character-sticker-printing-guide', 'trade-show-banner-printing-guide', 'wedding-invitation-envelope-printing-guide', 'doujin-circle-printing-guide', 'hotel-amenity-sticker-printing-guide']"),
    (r"slug:\s*'business-card-design'", "slug: 'sticker-design-10-golden-rules'"),
    (r"file:\s*'business-card-design'", "file: 'sticker-design-10-golden-rules'"),
    (r"href=\"\$1/business-card-design\"", "href=\"/$1/sticker-design-10-golden-rules\""),
    (r"href:\s*'/blog/business-card-design'", "href: '/blog/sticker-design-10-golden-rules'"),
    (r'https://zprintpro\.com/blog/business-card-design', 'https://zprintpro.com/blog/sticker-design-10-golden-rules'),
    (r"'10 Golden Rules for Sticker Design'.*?'business-card-design'", "'10 Golden Rules for Sticker Design' | sticker-design-10-golden-rules"),
    (r"'ステッカーデザインの10の黄金法則'.*?'business-card-design'", "'ステッカーデザインの10の黄金法則' | sticker-design-10-golden-rules"),
    (r'// 不优化 \(P3 跳过\): business-cards.*?//', '// 不优化 (P3 跳过): 已从主营移除, 见 §11 禁区'),
    (r"const articleSlugs = \[[^\]]*\]", ""),  # 兜底删
]

# 排除路径 (case-studies 名刺 ja 行业术语 + 客户案例, 保留)
EXCLUDE_PATTERNS = [
    r'case-studies',
    # 其他需要保留的文件
]


def should_skip(path):
    for p in EXCLUDE_PATTERNS:
        if re.search(p, path):
            return True
    return False


def main():
    # 找 src/ 全部 .ts/.tsx/.json 文件
    src_files = []
    for root, dirs, files in os.walk(os.path.join(ROOT, 'src')):
        for f in files:
            if f.endswith(('.ts', '.tsx', '.json', '.md')):
                src_files.append(os.path.join(root, f))

    total_replaced = 0
    file_count = 0
    log = []
    for fp in src_files:
        if should_skip(fp):
            log.append(f'  ⊝ skip {os.path.relpath(fp, ROOT)}')
            continue
        with open(fp, 'r', encoding='utf-8') as f:
            content = f.read()
        original = content
        file_replaced = 0
        for pat, rep in REPLACEMENTS:
            new_content = re.sub(pat, rep, content)
            n = (len(content) - len(new_content))
            if n != 0 or new_content != content:
                count = (original.count(pat.replace(r'\b', '')) - new_content.count(rep))
                if new_content != content:
                    content = new_content
                    file_replaced += count if count > 0 else 1
        if content != original:
            # 写回
            with open(fp, 'w', encoding='utf-8') as f:
                f.write(content)
            file_count += 1
            total_replaced += file_replaced
            log.append(f'  ✓ {os.path.relpath(fp, ROOT)} : {file_replaced} 处替换')

    # 输出日志
    log_path = os.path.join(ROOT, '.hermes', '_67b_11_clean_log.txt')
    with open(log_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(log))
        f.write(f'\n\n总文件: {file_count}, 总替换: {total_replaced} 处\n')
    print('\n'.join(log))
    print(f'\n✓ 写回 {log_path}')
    print(f'总文件 {file_count} / 总替换 {total_replaced} 处')


if __name__ == '__main__':
    main()
