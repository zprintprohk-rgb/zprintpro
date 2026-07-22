#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
M3 v6 任务 3: products.ts 修改
1. 删 gift-boxes 对象 (L8778-8981, 含 6 SKU 注释)
2. 改 6 SKU 注释为 5 SKU
3. 扩 rigid-boxes title/description 吸收 gift-boxes 关键词
4. 同时把 rigid-boxes 内的 智印雲 改 智印港 (zh-hk 品牌)
"""
import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

FILE = r'F:\zprintpro-nextjs\src\data\products.ts'

with open(FILE, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# 1. 找 gift-boxes 对象范围
# gift-boxes start: 行 8778 (1-indexed) = 0-indexed 8777 = '  {\n' 后跟 id: 'PK-001'
# 找对象起始 (往前找最近的 '{' 行)
gift_start = -1
for i in range(8770, 8800):
    if i < len(lines) and lines[i].strip() == '{' and i+1 < len(lines) and 'PK-001' in lines[i+1]:
        gift_start = i
        break
print(f'gift-boxes object starts at L{gift_start+1}')

# 找对象结束 (从 gift_start 开始数 {} 嵌套, 跳过 backtick)
gift_end = -1
depth = 0
in_backtick = False
for i in range(gift_start, len(lines)):
    line = lines[i]
    j = 0
    while j < len(line):
        ch = line[j]
        if ch == '`':
            in_backtick = not in_backtick
        elif not in_backtick:
            if ch == '{':
                depth += 1
            elif ch == '}':
                depth -= 1
                if depth == 0:
                    gift_end = i
                    break
        j += 1
    if gift_end != -1:
        break
print(f'gift-boxes object ends at L{gift_end+1}')
print(f'Total lines to delete: {gift_end - gift_start + 1}')

# 2. 修改注释 (上一行)
# gift-boxes 上方 1 行 = L8777 = "// 包裝盒定製 (6 SKU)"
comment_line_idx = gift_start - 1
print(f'Comment line: L{comment_line_idx+1}: {lines[comment_line_idx].rstrip()}')
assert '6 SKU' in lines[comment_line_idx], 'Expected 6 SKU comment'
lines[comment_line_idx] = lines[comment_line_idx].replace('(6 SKU)', '(5 SKU)')

# 3. 扩 rigid-boxes (PK-006, slug=rigid-boxes)
# 找 rigid-boxes 行号
rigid_line_idx = -1
for i in range(len(lines)):
    if 'slug: \'rigid-boxes\'' in lines[i]:
        rigid_line_idx = i
        break
print(f'rigid-boxes slug at L{rigid_line_idx+1}')

# 找 rigid-boxes 的 name/title_zh/description 行 (在 rigid_line_idx 附近几行)
# 通常在 rigid_line_idx + 1 或 + 2 行
# name 行包含 'name: \'精裝盒 |'
# title_zh 在同一行 (长 inline field)
for i in range(rigid_line_idx, min(rigid_line_idx + 5, len(lines))):
    if 'title_zh:' in lines[i]:
        # 修改 title_zh: '精品盒訂製印刷 100個起印 HK$8起/個 高端禮盒 | 智印雲'
        # → '精品盒/禮品盒訂製印刷 100個起印 HK$4.5起/個 高端定製 | 智印港'
        old_title = '精品盒訂製印刷 100個起印 HK$8起/個 高端禮盒 | 智印雲'
        new_title = '精品盒/禮品盒訂製印刷 100個起印 HK$4.5起/個 高端定製 | 智印港'
        if old_title in lines[i]:
            lines[i] = lines[i].replace(old_title, new_title)
            print(f'L{i+1}: title_zh updated to include 禮品盒 + 智印港 + HK$4.5')
        else:
            print(f'WARNING: title_zh pattern not found at L{i+1}')
            print(f'  actual: {lines[i][:200]}')

# 找 description 行 (在 rigid_line_idx + 1 或 + 2 行, 通常含 'description: \'精品盒訂製印刷')
for i in range(rigid_line_idx, min(rigid_line_idx + 5, len(lines))):
    if 'description:' in lines[i] and '精品盒' in lines[i]:
        # 原 description: '精品盒訂製印刷，100個起印，HK$8起/個。硬殼天地盒磁吸盒，灰板裱藝術紙，燙金UV壓凹工藝。適合化妝品珠寶首飾高端品牌，5-7天交貨，全球配送。'
        # 加 禮品盒 / 婚慶 / 週年慶 / 品牌活動 等 gift-boxes 关键词
        old_desc_zh = '精品盒訂製印刷，100個起印，HK$8起/個。硬殼天地盒磁吸盒，灰板裱藝術紙，燙金UV壓凹工藝。適合化妝品珠寶首飾高端品牌，5-7天交貨，全球配送。'
        new_desc_zh = '精品盒/禮品盒訂製印刷，100個起印，HK$4.5起/個。硬殼天地盒磁吸盒抽屜盒，灰板裱藝術紙，燙金UV壓凹工藝。適合化妝品珠寶首飾婚慶禮盒週年慶品牌活動贈品，3-7天交貨，全球配送。'
        if old_desc_zh in lines[i]:
            lines[i] = lines[i].replace(old_desc_zh, new_desc_zh)
            print(f'L{i+1}: description updated (吸收 禮品盒/婚慶/週年慶/品牌活動 关键词)')
        else:
            print(f'WARNING: description pattern not found at L{i+1}')
            print(f'  actual: {lines[i][:300]}')

# 找 description_zh 行 (rigid-boxes 末尾短描述)
for i in range(rigid_line_idx, min(rigid_line_idx + 5, len(lines))):
    if 'description_zh:' in lines[i]:
        old_short = '硬殼精裝，高檔奢華。適合高端產品、限量版商品。'
        new_short = '硬殼精裝/禮品盒，高檔奢華。適合高端產品、限量版、婚慶/週年慶贈品。'
        if old_short in lines[i]:
            lines[i] = lines[i].replace(old_short, new_short)
            print(f'L{i+1}: description_zh updated')

# 4. 删除 gift-boxes 对象
print(f'\nDeleting lines {gift_start+1} to {gift_end+1} (inclusive, {gift_end - gift_start + 1} lines)')
del lines[gift_start:gift_end + 1]
print(f'New file line count: {len(lines)}')

# 5. 写回
with open(FILE, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print('Done.')
