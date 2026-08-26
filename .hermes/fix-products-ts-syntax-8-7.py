# -*- coding: utf-8 -*-
"""
8/7 02:50 紧急修复: 5 SKU 改动 (doujinshi-printing/acrylic-keychain/can-badge/postcard-set/eco-tote-bag) array 项之间漏 ',' 修复。
检查每个 SKU 块:
- 块开始 '{' 之前需要 ','
- 块结束 '},' 之后需要 ','
"""

import re
from pathlib import Path

p = Path(r"F:\zprintpro-nextjs\src\data\products.ts")
content = p.read_text(encoding='utf-8')

# 5 SKU 名称
skus = ['doujinshi-printing', 'acrylic-keychain', 'can-badge', 'postcard-set', 'eco-tote-bag']

for sku in skus:
    # 找 SKU 块的开始 'slug: 'sku',' 之前的 '{' 位置
    # pattern: r"}\n\{\n\s*id:\s*['\"][A-Z]+-\d+['\"]\s*,\s*sku_code:.*?slug:\s*['\"]" + re.escape(sku) + r"['\"]"
    # 即 '},\n{\n  id: ...\n  slug: sku' 之前漏 ','
    pattern = r"(\})(\s*)\{(\s*id:\s*['\"][A-Z]+-\d+['\"]\s*,\s*sku_code:\s*['\"][A-Z]+-\d+['\"]\s*,\s*slug:\s*['\"]" + re.escape(sku) + r"['\"])"
    new_content, count = re.subn(pattern, r"\1,\2{\3", content, count=1)
    if count > 0:
        content = new_content
        print(f"OK: products.ts {sku} 块开始加 ','")
    else:
        # 检查是否已经有 ','
        pattern2 = r"\},\s*\{\s*id:\s*['\"][A-Z]+-\d+['\"]\s*,\s*sku_code:\s*['\"][A-Z]+-\d+['\"]\s*,\s*slug:\s*['\"]" + re.escape(sku) + r"['\"]"
        if re.search(pattern2, content):
            print(f"SKIP: {sku} 已经有 ',', 不需要改")
        else:
            print(f"WARN: {sku} 块开始 pattern 未找到")

# 写回
p.write_text(content, encoding='utf-8')
print('OK: products.ts 修复落盘')
