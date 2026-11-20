# -*- coding: utf-8 -*-
"""
8/7 5 SKU P2 R1 全新 (修正 v2) - 撤回 working tree + 正确 append + 加 optimizedAt/R1.
先 git checkout HEAD~1 已经撤回了错的 5 行 (greeting-cards).
现在 5 SKU P2 已经被 apply-5sku-p2-r1-correct-8-7.py append 3 locale 7 行业,
但 optimizedAt + R1 没加 (因为 group(2) 切掉了 slug 行).

这个脚本: 用 re.sub 在整个 content 找 slug: 'X', 后面插 optimizedAt + R1.
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

products_path = base / "src" / "data" / "products.ts"
with open(products_path, 'r', encoding='utf-8') as f:
    content = f.read()

for sku in p2_skus:
    # 直接对整个 content 找 slug: 'X', 后面插入 optimizedAt + R1
    # 跳过如果已加 (有 R1 = 1)
    pattern_opt = re.compile(
        r"(slug:\s*['\"]" + re.escape(sku) + r"['\"],)(\s*\n\s*optimizedAt:)",
        re.MULTILINE
    )
    if pattern_opt.search(content):
        print(f"SKIP: {sku} optimizedAt 已存在")
        continue

    # 找 slug 行 + 插入 optimizedAt + R1 之后
    pattern_insert = re.compile(
        r"(slug:\s*['\"]" + re.escape(sku) + r"['\"],)"
        r"(?!\s*\n\s*optimizedAt)",
        re.MULTILINE
    )

    new_content = pattern_insert.sub(
        r"\1\n      optimizedAt: '2026-08-07',\n      optimizationRound: 1,",
        content,
        count=1
    )

    if new_content != content:
        content = new_content
        print(f"OK: {sku} 加 optimizedAt 8/7 + R1")
    else:
        print(f"WARN: {sku} slug 行没找到")

with open(products_path, 'w', encoding='utf-8', newline='\n') as f:
    f.write(content)

print("\nDONE")
