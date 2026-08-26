# -*- coding: utf-8 -*-
"""
fix-88fd338-residual-2026-07-31.py v2

88fd338 修了 2 处 syntax, 但漏修 2 处:
  1. src/app/[locale]/about/page.tsx L196 - ja 翻译块多余 '},' (跟 L138 en 同样的错)
  2. src/data/products.ts L1898 - ST-WP waterproof-stickers description_zh 字段被 markdown '**' 污染

[fix1 已 DONE - about L196 删 '},' ]
[fix2 - products.ts L1898 修 description_zh 字段]
"""
import io
import sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

# === fix 2: products.ts L1898 ST-WP waterproof-stickers description_zh 字段 ===
PROD = r'F:\zprintpro-nextjs\src\data\products.ts'
with io.open(PROD, 'r', encoding='utf-8') as f:
    plines = f.readlines()

# 找 waterproof-stickers block
wp_idx = None
for i, line in enumerate(plines):
    if "slug: 'waterproof-stickers'" in line:
        wp_idx = i
        break
assert wp_idx is not None, 'waterproof-stickers block not found'
print(f'[fix2] waterproof-stickers at L{wp_idx+1}')

# description_zh 字段在 wp_idx+4 行
desc_zh_line = plines[wp_idx+4]
print(f'[fix2] description_zh line L{wp_idx+5}:')
print(f'  HEAD: {desc_zh_line.rstrip()[:120]}')
print(f'  TAIL: {desc_zh_line.rstrip()[-100:]}')

# 实际错乱结尾 (从 7/31 10:36 Read 看到):
# '...車身貼紙等場景。' **適配行業**: 餐飲外賣/零售精品/跨境電商/美妝護膚/教育培訓/婚慶/品牌活動.',
# 期望结尾: ' 适配行业: 餐飲外賣/零售精品/跨境電商/美妝護膚/教育培訓/婚慶/品牌活動。',
#
# 简化策略: 不依赖完整字符串匹配, 用 regex 找 '**適配行業**' 块, 替换成 '适配行业'

import re
# pattern: ' **適配行業**: AAAA.',  替换为 ' 适配行业: AAAA。',
# 简化字 适配 后面 + 行业 (繁体的也行) - 但只针对这一行
new_line = re.sub(
    r"' \*\*適配行業\*\*: ([^']+)\.',",
    r"' 适配行业: \1。',",
    desc_zh_line
)
if new_line != desc_zh_line:
    plines[wp_idx+4] = new_line
    print(f'[fix2] FIXED description_zh line L{wp_idx+5}:')
    print(f'  HEAD: {plines[wp_idx+4].rstrip()[:120]}')
    print(f'  TAIL: {plines[wp_idx+4].rstrip()[-100:]}')
    with io.open(PROD, 'w', encoding='utf-8', newline='\n') as f:
        f.writelines(plines)
    print('[fix2] saved')
else:
    print('[fix2] FAIL: regex did not match, need manual fix')
    sys.exit(1)

print('')
print('[done] fix2 applied')
