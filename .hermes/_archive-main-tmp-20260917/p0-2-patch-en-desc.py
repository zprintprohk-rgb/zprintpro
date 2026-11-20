#!/usr/bin/env python3
"""
P0.2: 批量改 14 个 en category description 加 3 个 trust hooks
- Free Proof in 4 hours
- 100% satisfaction guarantee
- 5-7 day door-to-door delivery to USA

只改 en description 字段 (zh-hk + ja 不动), 不动 title + keywords
"""
import re
import sys
from pathlib import Path

FILE = Path(r'F:\zprintpro-nextjs\src\lib\seo.ts')

# 3 个 trust hooks (中英文逗号 + 0xFF0C 全角逗号 全兼容)
HOOK_SUFFIX = ' Free proof in 4 hours · 100% satisfaction guarantee · 5-7 day door-to-door delivery to USA.'

src = FILE.read_text(encoding='utf-8')

# 匹配 14 个 en description 字段 (在 categorySeoData 块里)
# 模式: en: '... description 内容 ...'
# 但要避开 keywords/title 块的 en

# 更精准: 在 'descriptions: {' 块内的 en: '...' 行
desc_pattern = re.compile(
    r"(descriptions:\s*\{[^}]*?en:\s*')([^']*?)(')",
    re.DOTALL
)

count = 0
def repl(m):
    global count
    prefix, content, suffix = m.group(1), m.group(2), m.group(3)
    # 跳过 "在 description 之外" 的 en (e.g. keywords 块, title 块)
    # 检查 content 是不是描述 (含 "Custom" / "from" / "MOQ" + 含 "USA" 或 "DHL" / "ISO" / "Free shipping")
    desc_indicators = ['MOQ', 'Custom ', 'Free shipping', 'DHL', 'ISO 9001', 'FedEx', 'paper', 'vinyl', 'sticker', 'flyer', 'box', 'bag', 'poster', 'banner', 'menu', 'book', 'envelope', 'calendar', 'red packet', 'doujinshi', 'education']
    is_description = any(ind in content for ind in desc_indicators)
    if not is_description:
        return m.group(0)
    # 检查是否已含 hooks (避免重复)
    if 'Free proof in 4 hours' in content:
        return m.group(0)
    # 在 description 末尾 '. ' 之前插 suffix
    new_content = content.rstrip()
    if new_content.endswith('.'):
        new_content = new_content[:-1] + '.' + HOOK_SUFFIX
    else:
        new_content = new_content + HOOK_SUFFIX
    count += 1
    return prefix + new_content + suffix

new_src = desc_pattern.sub(repl, src)
FILE.write_text(new_src, encoding='utf-8')
print(f'P0.2 patched: {count} en description(s) updated')
print(f'file size: {len(src)} -> {len(new_src)} bytes (delta {len(new_src)-len(src):+d})')
