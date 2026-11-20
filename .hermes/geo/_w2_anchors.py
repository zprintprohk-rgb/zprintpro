# -*- coding: utf-8 -*-
# 提取 small-batch en/ja longDescription 首行锚点 + 计数（只读）
import io, re

t = io.open('src/data/products-content.ts', encoding='utf-8').read()
i = t.find("'small-batch-stickers': {")
nxt = re.search(r"\n  'die-cut-stickers': \{", t[i:])
entry = t[i:i + nxt.start()]

for k in ['longDescription', 'longDescriptionEn', 'longDescriptionJa']:
    m = re.search(r'\b' + k + r':\s*`', entry)
    if m:
        line_start = entry.rfind('\n', 0, m.start()) + 1
        print('---', k, 'anchor line:')
        print(entry[line_start:line_start + 160])
        # 块内前 200 字符（看现有结构开头）
        body = entry[m.end():m.end() + 200]
        print('>>> opens with:', body.replace('\n', ' ')[:180])
        print()

# 食品指南 FAQ 现状（blog 渲染 FAQ 从哪来）
b = io.open('src/data/blog-posts.ts', encoding='utf-8').read()
j = b.find("'food-packaging-printing-guide'")
print('blog-posts entry found:', j > 0)
if j > 0:
    print(b[j:j + 700])
