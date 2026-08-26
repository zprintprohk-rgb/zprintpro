# -*- coding: utf-8 -*-
"""
fix-88fd338-residual-v3-2026-07-31.py

88fd338 只修了 en 翻译块 L141 多余 '},' (跟 Vercel log 报的位置一致)
但 漏修 3 处:
  1. about L85 - zh-hk 翻译块结尾多余 '},' (跟 en L141 同样错)
  2. about L114 - en 翻译块 statsLabels: { ... },    processTitle: 'Our Production Process', 缺换行
  3. about L169 - ja 翻译块 statsLabels: { ... },    processTitle: '印刷の流れ', 缺换行
  4. products.ts L1898 - ST-WP waterproof-stickers description_zh 字段被 markdown '**' 污染

[fix1-2-3-4 全做]
"""
import io
import sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

ABOUT = r'F:\zprintpro-nextjs\src\app\[locale]\about\page.tsx'
with io.open(ABOUT, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# 打印 130-200 看现状
print('=== before fix 1-2-3 ===')
for i in range(80, 200):
    if i < len(lines):
        sys.stdout.write('  L{0:3}: {1}\n'.format(i+1, lines[i].rstrip()))

# === fix 1: about L85 - zh-hk 翻译块多余 '},' ===
# L83 = }, 关闭 zh-hk 块
# L84 = 空行
# L85 = }, ← 多余
# L86 = en: {
# 删除 L85
assert lines[82].strip() == '},', f'L83 expected "}}," got {lines[82]!r}'
assert lines[84].strip() == '},', f'L85 expected "}}," got {lines[84]!r}'
assert lines[85].strip() == 'en: {', f'L86 expected "en: {{" got {lines[85]!r}'
del lines[84]
print('[fix1] about L85 (zh-hk block extra "},") DELETED')

# 现在行号偏移 -1, 原 L114 -> L113, 原 L169 -> L168

# === fix 2: about L113 - en 翻译块缺换行 ===
# en 翻译块 statsLabels 跟 processTitle 在同一行
en_line_idx = 113 - 1  # 0-indexed
en_line = lines[en_line_idx]
print(f'[fix2] before L{en_line_idx+1}: {en_line.rstrip()[:120]}')
# 在 'processTitle:' 前加换行
if 'statsLabels' in en_line and 'processTitle' in en_line and '\n' not in en_line[en_line.index('processTitle'):]:
    # 找到 '    processTitle:' 位置
    pt_pos = en_line.find('processTitle:')
    # 在 '    processTitle' 前插入换行
    fixed = en_line[:pt_pos] + '\n' + en_line[pt_pos:]
    lines[en_line_idx] = fixed
    print(f'[fix2] AFTER L{en_line_idx+1}: {lines[en_line_idx].rstrip()[:120]}')

# === fix 3: about ja 块缺换行 (位置因 fix 1 偏移 -1, 原 L169 -> L168) ===
# 但 fix 2 又插了换行, 后面行号 +1, 所以 ja 块 L168 实际 + 1 = L169
ja_line_idx = 168 - 1  # 0-indexed (因为 fix 1 减了 1)
# 但 fix 2 在 L113 插了换行, ja 块 = L168 + 1 = L169 → 0-indexed 168
ja_line_idx = 168  # 0-indexed
ja_line = lines[ja_line_idx]
print(f'[fix3] before L{ja_line_idx+1}: {ja_line.rstrip()[:120]}')
if 'statsLabels' in ja_line and 'processTitle' in ja_line and '\n' not in ja_line[ja_line.index('processTitle'):]:
    pt_pos = ja_line.find('processTitle:')
    fixed = ja_line[:pt_pos] + '\n' + ja_line[pt_pos:]
    lines[ja_line_idx] = fixed
    print(f'[fix3] AFTER L{ja_line_idx+1}: {lines[ja_line_idx].rstrip()[:120]}')

with io.open(ABOUT, 'w', encoding='utf-8', newline='\n') as f:
    f.writelines(lines)
print('[fix1-2-3] saved about/page.tsx')

# === fix 4: products.ts L1898 ST-WP waterproof-stickers description_zh 字段 ===
PROD = r'F:\zprintpro-nextjs\src\data\products.ts'
with io.open(PROD, 'r', encoding='utf-8') as f:
    plines = f.readlines()

# 找 waterproof-stickers block
wp_idx = None
for i, line in enumerate(plines):
    if "slug: 'waterproof-stickers'" in line:
        wp_idx = i
        break
assert wp_idx is not None
desc_zh_line = plines[wp_idx+4]
print(f'[fix4] before L{wp_idx+5}: {desc_zh_line.rstrip()[-100:]}')
if '**適配行業**' in desc_zh_line:
    import re
    new_line = re.sub(
        r"' \*\*適配行業\*\*: ([^']+)\.',",
        r"' 适配行业: \1。',",
        desc_zh_line
    )
    if new_line != desc_zh_line:
        plines[wp_idx+4] = new_line
        print(f'[fix4] AFTER L{wp_idx+5}: {plines[wp_idx+4].rstrip()[-100:]}')
        with io.open(PROD, 'w', encoding='utf-8', newline='\n') as f:
            f.writelines(plines)
        print('[fix4] saved products.ts')

print('')
print('=== after fix 1-2-3 verify ===')
with io.open(ABOUT, 'r', encoding='utf-8') as f:
    lines2 = f.readlines()
for i in range(80, 200):
    if i < len(lines2):
        sys.stdout.write('  L{0:3}: {1}\n'.format(i+1, lines2[i].rstrip()))

print('')
print('[done] 4 fixes applied')
