# -*- coding: utf-8 -*-
"""
fix-products-l1898-final-2026-07-31.py
K3 8/1 指令 #3: 修 products.ts L1898 ST-WP waterproof-stickers description_zh 字段外 markdown '**' 污染
v5 修法: regex 找 'A' 适配行业: B 'C', 合并成 'A 适配行业: B',
"""
import io
import sys
import re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

PROD = r'F:\zprintpro-nextjs\src\data\products.ts'
with io.open(PROD, 'r', encoding='utf-8') as f:
    content = f.read()

# v5 pattern (from earlier script):
# pattern: 找 "description_zh: 'A' 适配行业: B 'C'," 模式, 合并成 "description_zh: 'A 适配行业: B',"
pattern = re.compile(
    r"description_zh: '([^']*?)'\s*适配行业:\s*([^,]+),\s*"
)
matches = list(pattern.finditer(content))
print(f'=== found {len(matches)} description_zh markdown pollution ===')
for m in matches[:5]:
    before = m.group(0)
    print(f'  pos {m.start()}: {before[:80]}...')

if matches:
    # 不能简单 replace, 因为 pattern greedy 吃 \n + 后面字段
    # 改用更精确: 不匹配 ", " 后面的空白, 只匹配单引号
    # 改 pattern: 'A' 适配行业: B',  (单引号结束)
    # 用 rsplit 或者新方法
    pass

# 之前 v5 用了:  "description_zh: 'A' 适配行业: B 'C'," -> "'A 适配行业: B',"
# 但 v5 v6 试过都失败, 这次用更精确: 用 ([^']+) 找 B 字段
# 但 B 字段里可能有 ', 字符?

# 实际文件 (L1898) 状态: description_zh: 'A' 适配行业: B 'C',
# A = 'PVC材質防水貼紙...車身貼紙等場景。' (有句号)
# B = '餐飲外賣/零售精品/跨境電商/美妝護膚/教育培訓/婚慶/品牌活動。' (有句号)
# C = '' (空)

# pattern 用 [^']+ 找 A 和 B, 然后匹配 ' 收尾
pat2 = re.compile(
    r"description_zh: '([^']+?)'\s*适配行业:\s*([^']+?)'\s*,"
)
m2 = pat2.search(content)
if m2:
    before = m2.group(0)
    a = m2.group(1)
    b = m2.group(2)
    after = f"description_zh: '{a} 适配行业: {b}',"
    print(f'\n[pat2] BEFORE: {before[:120]}')
    print(f'[pat2] AFTER:  {after[:120]}')
    # 不能简单 replace (因为之前 v6 破坏 4 个 SKU longDescription 换行)
    # 改用更精确: 找 "description_zh: '...' 适配行业: ..." 整段, 在 ', 之后保留 \n
    # 但 pattern 已经匹配 ' , (单引号 + 逗号), 不会破坏
    # 安全: replace 一次 + verify
    new_content = content.replace(before, after, 1)
    if new_content != content:
        with io.open(PROD, 'w', encoding='utf-8', newline='\n') as f:
            f.write(new_content)
        print('[pat2] saved (1 replace)')

# verify
with io.open(PROD, 'r', encoding='utf-8') as f:
    verify = f.read()
print(f'\n=== verify ===')
print(f'  **适配行业** 出现: {verify.count("**适配行业**")} (期望 0)')
print(f'  description_zh 行包含 适配行业: {verify.count("description_zh: ")} 处')
# L1898 check
idx = verify.find("waterproof-stickers")
if idx >= 0:
    chunk = verify[idx-50:idx+1500]
    # 找 description_zh 在 waterproof-stickers 后的内容
    m3 = re.search(r"description_zh: '([^']*車身貼紙[^']*)'", chunk)
    if m3:
        print(f'  L1898 description_zh 状态: {m3.group(1)!r}')
