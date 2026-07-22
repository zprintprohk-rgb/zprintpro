#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
M3 v6 任务 3 续: packaging.json 删 gift-boxes 报价档 + 更新 _meta.note
"""
import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

FILE = r'F:\zprintpro-nextjs\src\data\price-tables\packaging.json'

with open(FILE, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. 改 _meta.note (gift-boxes / food-boxes 未动 → 删 gift-boxes 引用, 因为 v6 gift-boxes 已合并入 rigid-boxes)
old_note = '"note": "2026-07-18 校准: mailer-boxes 用 intuan 微坑盒实询价, kraft-paper-packaging-box 用 intuan 双插卡盒实询价 (均 5 档, 替换 modeled; mailer-boxes 原 300 档与校准价倒挂, 移除)。gift-boxes / food-boxes 未动。"'
new_note = '"note": "2026-07-22 校准: gift-boxes 合并入 rigid-boxes (M3 v6, 13→12 SKU)。mailer-boxes / kraft-paper-packaging-box / food-boxes 未动。"'
if old_note in content:
    content = content.replace(old_note, new_note)
    print('_meta.note updated')
else:
    print('WARNING: _meta.note not found')

# 2. 删 gift-boxes product 对象 (从 "{ "sku": "gift-boxes"," 到下一个 "}, ")
# 简单方法: 用正则找到 gift-boxes 整块
import re
# Match 从 "{ "sku": "gift-boxes"," 开始到 "  }," 结束 (包含 trailing comma)
# 因为这是 JSON, gift-boxes 不是最后一个 (food-boxes 之后还有), 所以会有 ","
pattern = re.compile(r'\s*\{\s*"sku":\s*"gift-boxes",.*?},\n', re.DOTALL)
m = pattern.search(content)
if m:
    print(f'Found gift-boxes block, {m.end() - m.start()} chars, removing')
    content = content[:m.start()] + content[m.end():]
else:
    print('WARNING: gift-boxes block not found')

# 3. 写回
with open(FILE, 'w', encoding='utf-8') as f:
    f.write(content)
print('Done.')

# 验证
import json
data = json.loads(content)
skus = [p['sku'] for p in data['products']]
print(f'Remaining SKUs ({len(skus)}):', skus)
