# -*- coding: utf-8 -*-
# 定位: ① 第 83 个条目在哪 ② sku 字段真名 ③ premium-greeting-cards 条目全文
import io, re
from pathlib import Path
ROOT = Path(r'F:\zprintpro-nextjs')
t = io.open(ROOT / 'src/data/products.ts', encoding='utf-8').read()
lines = t.split('\n')

# ① 所有可能的条目开口 (含 0 缩进/其他形态)
for i, ln in enumerate(lines):
    if ln.rstrip().endswith('{') and ln.strip() == '{':
        pass
opens = [i for i, ln in enumerate(lines) if ln.strip() == '{']
print('all bare-{ lines:', len(opens))

# ② 字段名采样: 含 BC-/ST-/WP- 样式的行
for m in re.finditer(r"^\s*(\w+): '(?:BC|BK|ST|WP|PN|LB|CT|BX|HD|RB|PT|FL|EN|CL|JP|DJ|WI|PC|GB|TK|GD|CS|SC)-", t, re.MULTILINE):
    print('code field:', m.group(1), '->', m.group(0).strip()[:60])
    if m.start() > 200000:
        break

# ③ premium entry 全文
i = t.index("slug: 'premium-greeting-cards'")
seg = t[i-2000:i+3000]
j = seg.index('imagesByLocale')
print('--- premium imagesByLocale block ---')
print(seg[j:j+1400])
