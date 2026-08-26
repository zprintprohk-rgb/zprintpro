#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Fix brand term residues (4fix leftover):
- page.tsx: zh-hk blocks (translations zh-hk + posts zh-hk) 智印雲 -> 智印港; ja block 智印雲 -> ZprintPro
- blog-posts.ts: ja entries 智印雲 -> ZprintPro (zh-hk already fixed by 4fix)
- ja.json: 智印雲 -> ZprintPro
"""
import re

# ============ page.tsx ============
PATH = 'src/app/[locale]/blog/[slug]/page.tsx'
with open(PATH, encoding='utf-8') as f:
    content = f.read()

# region boundaries:
# translations: line 39 `const translations = {` ... zh-hk block, en block, ja block
# posts: line 73 `const posts: Record<` ... zh-hk, en, ja
posts_decl = content.find('const posts: Record<')
translations_decl = content.find('const translations = {')

# Find ja blocks: first is translations ja (quoted 'ja'), second is posts ja (unquoted)
# We'll do ordered replacements:
# Strategy: split into zones
# Zone A: from start to posts_decl (translations object) — contains zh-hk (智印港), en, ja (ZprintPro)
#   In translations, zh-hk block: 智印雲->智印港; ja block: 智印雲->ZprintPro
# Zone B: posts object zh-hk block: 智印雲->智印港
# Zone C: posts ja block: 智印雲->ZprintPro
# Zone D: rest (comments/schema code with zh examples) -> 智印港

# --- locate translations ja block (quoted) ---
t_zh_start = content.find("  'zh-hk': {\n", translations_decl)
t_zh_end = content.find('\n  },\n', t_zh_start)  # close of translations zh-hk
t_ja_start = content.find("  'ja': {\n", translations_decl)
t_ja_end = content.find('\n  },\n', t_ja_start)

# --- locate posts zh-hk block ---
p_zh_start = content.find("  'zh-hk': {\n", posts_decl)
p_zh_end = content.find('\n  },\n', p_zh_start)
# --- locate posts ja block ---
p_ja_start = content.find('\n  ja: {\n', posts_decl)
p_ja_end = content.find('\n  }\n};', p_ja_start)

def replace_zone(start, end, old, new):
    return content[:start] + content[start:end].replace(old, new) + content[end:]

# 1. translations zh-hk: 智印雲 -> 智印港
content = replace_zone(t_zh_start, t_zh_end, '智印雲', '智印港')
# 2. translations ja: 智印雲 -> ZprintPro
content = replace_zone(t_ja_start, t_ja_end, '智印雲', 'ZprintPro')
# 3. posts zh-hk block: 智印雲 -> 智印港
content = replace_zone(p_zh_start, p_zh_end, '智印雲', '智印港')
# 4. posts ja block: 智印雲 -> ZprintPro
content = replace_zone(p_ja_start, p_ja_end, '智印雲', 'ZprintPro')
# 5. remaining zones (comments with zh examples): 智印雲 -> 智印港
content = content.replace('智印雲', '智印港')

with open(PATH, 'w', encoding='utf-8', newline='\n') as f:
    f.write(content)
print('page.tsx 智印雲 remaining:', content.count('智印雲'))

# ============ blog-posts.ts ============
PATH2 = 'src/data/blog-posts.ts'
with open(PATH2, encoding='utf-8') as f:
    c2 = f.read()
c2 = c2.replace('智印雲', 'ZprintPro')
with open(PATH2, 'w', encoding='utf-8', newline='\n') as f:
    f.write(c2)
print('blog-posts.ts 智印雲 remaining:', c2.count('智印雲'))

# ============ ja.json ============
import json
PATH3 = 'src/data/blog-data/ja.json'
with open(PATH3, encoding='utf-8') as f:
    data = json.load(f)
raw = json.dumps(data, ensure_ascii=False, indent=2)
raw = raw.replace('智印雲', 'ZprintPro')
data2 = json.loads(raw)
with open(PATH3, 'w', encoding='utf-8', newline='\n') as f:
    json.dump(data2, f, ensure_ascii=False, indent=2)
    f.write('\n')
with open(PATH3, encoding='utf-8') as f:
    c3 = f.read()
print('ja.json 智印雲 remaining:', c3.count('智印雲'))
