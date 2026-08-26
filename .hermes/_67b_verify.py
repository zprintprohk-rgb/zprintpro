#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""验证 6 slug 改后 zh-hk title + en title + ja title."""
import re, sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

with open(r'F:\zprintpro-nextjs\src\lib\seo.ts', encoding='utf-8') as f:
    content = f.read()

slugs = ['stickers', 'flyers', 'posters', 'books', 'packaging', 'banners']
for slug in slugs:
    print(f'\n--- {slug} ---')
    # 找 slug 块
    m = re.search(rf"^(\s*)'{re.escape(slug)}':\s*\{{", content, re.MULTILINE)
    if not m:
        print('  ⚠ slug 段未找到')
        continue
    start = m.start()
    base_indent = len(m.group(1))
    # 找 titles 段
    tm = re.search(rf"\n\s{{0,{base_indent+4}}}{{[^}}]*?titles:\s*\{{", content[start:start+5000], re.DOTALL)
    if not tm:
        # 简化: 找 slug 段后第一个 titles: { 起始
        idx = content.find('titles: {', start)
        if idx == -1 or idx > start + 300:
            print('  ⚠ titles 段未找到')
            continue
        titles_start = idx + len('titles: {')
    else:
        titles_start = start + tm.end()
    # 在 titles 段内找 zh-hk / en / ja
    titles_end = content.find('},', titles_start)
    titles_block = content[titles_start:titles_end]
    for loc in ['zh-hk', 'en', 'ja']:
        # 同时支持 'loc': 和 loc: 两种 key 格式
        m2 = re.search(rf"['\"]?{re.escape(loc)}['\"]?:\s*'([^']+)'", titles_block)
        if m2:
            print(f'  {loc}: {m2.group(1)}')
        else:
            print(f'  ⚠ {loc} 缺失')
