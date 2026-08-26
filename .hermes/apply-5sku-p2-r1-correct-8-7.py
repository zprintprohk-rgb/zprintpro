# -*- coding: utf-8 -*-
"""
8/7 5 SKU P2 R1 全新 (修正版) - 用 re.sub 把 industries 插入 description 字符串 INTERNAL,
不复用 apply-5sku-pdp-matrix-8-7.py 的 rstrip+append 错误 pattern。

B 任务: 5 SKU P2 japan-doujin 优化 (3 locale 7 行业 standard 繁體 + optimizedAt 8/7 + R1)
- doujinshi-printing
- acrylic-keychain
- can-badge
- postcard-set
- eco-tote-bag

修法: 每个 description 字段用 re.sub 直接在字符串内部 append (不破坏 ' 和 ,)
"""

import re
from pathlib import Path

base = Path(r"F:\zprintpro-nextjs")

p2_skus = [
    'doujinshi-printing',
    'acrylic-keychain',
    'can-badge',
    'postcard-set',
    'eco-tote-bag',
]

# 7 行业 standard 繁體 3 locale
industries_zh = "**適配行業**：餐飲外賣、零售精品、跨境電商、美妝護膚、教育培訓、婚慶、品牌活動。"
industries_en = "**Best for**: Food & Beverage, Retail, Cross-border E-commerce, Beauty & Skincare, Education & Training, Wedding, Brand Activations."
industries_ja = "**適用業界**：飲食・ケータリング、小売・ブティック、越境EC、美容・スキンケア、教育・研修、婚礼・冠婚葬祭、ブランドイベント。"

# 找 products.ts 中 5 SKU block
products_path = base / "src" / "data" / "products.ts"
with open(products_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. 改 greeting-cards 那 5 个错的 line (撤回 + 重新插入到内部)
# 但实际上 git checkout HEAD~1 已经撤回了 working tree 的 products.ts
# 所以 greeting-cards 5 个已经是正确的, 不需要再改

# 2. append 5 SKU P2 (用 re.sub 在字符串内部)
for sku in p2_skus:
    # 找 slug 行, 然后到 longDescription 之前的所有内容 (含 4 个 description fields)
    # 用 lookahead 找 longDescription: 之前
    pattern_block = re.compile(
        r"(slug:\s*['\"]" + re.escape(sku) + r"['\"],)"
        r"([\s\S]*?)"
        r"(?=\n\s*longDescription:)",
        re.MULTILINE
    )
    m = pattern_block.search(content)
    if not m:
        print(f"WARN: {sku} block not found")
        continue

    slug_line = m.group(1)
    block = m.group(2)
    original_block = block

    # 2.1 加 optimizedAt 2026-08-07 + optimizationRound 1 (slug 之后)
    if 'optimizedAt' not in block:
        block = re.sub(
            r"(slug:\s*['\"]" + re.escape(sku) + r"['\"],)",
            r"\1\n      optimizedAt: '2026-08-07',\n      optimizationRound: 1,",
            block,
            count=1
        )

    # 2.2 3 locale append 7 行业 standard 繁體 (用 re.sub 在字符串内部)
    # description (zh): '...XXX', -> '...XXX。**適配行業**：...',
    block = re.sub(
        r"(description:\s*')([^']*)(')",  # match description: 'XXX'
        lambda mo: (
            mo.group(1) + mo.group(2) +
            ('。' if not mo.group(2).rstrip().endswith('。') and not mo.group(2).rstrip().endswith('.') else ' ') +
            industries_zh + mo.group(3)
        ),
        block,
        count=1
    )
    # descriptionEn: 'XXX' -> 'XXX. **Best for**: ...,'
    block = re.sub(
        r"(descriptionEn:\s*')([^']*)(')",
        lambda mo: (
            mo.group(1) + mo.group(2) +
            ('. ' if not mo.group(2).rstrip().endswith('.') else ' ') +
            industries_en + mo.group(3)
        ),
        block,
        count=1
    )
    # descriptionJa: 'XXX' -> 'XXX。**適用業界**：...,'
    block = re.sub(
        r"(descriptionJa:\s*')([^']*)(')",
        lambda mo: (
            mo.group(1) + mo.group(2) +
            ('。' if not mo.group(2).rstrip().endswith('。') and not mo.group(2).rstrip().endswith('.') else ' ') +
            industries_ja + mo.group(3)
        ),
        block,
        count=1
    )
    # description_zh: 跟 description 重复, 跳过

    if block != original_block:
        # 用原始 block 替换 (with re.sub 完整 string match)
        # 需要 match 整个 block 区段
        content = content.replace(slug_line + original_block, slug_line + block, 1)
        print(f"OK: products.ts {sku} 3 locale 7 行业 standard 繁體 + optimizedAt 8/7 R1 追加 (内部字符串)")
    else:
        print(f"SKIP: {sku} 已有 optimizedAt + 7 行业 standard 繁體")

with open(products_path, 'w', encoding='utf-8', newline='\n') as f:
    f.write(content)

print("\n=== 完成. 备份 -> products.ts.bak-8-7-r1 ===")
import shutil
shutil.copy(products_path, base / "src" / "data" / "products.ts.bak-8-7-r1")
print("DONE")
