# -*- coding: utf-8 -*-
"""Write zh-hk version of print-specifications-reference-guide-2026 to zh-hk.json."""

import json
from pathlib import Path

ZHHK_PATH = Path('src/data/blog-data/zh-hk.json')

ZHHK_SLUG = 'print-specifications-reference-guide-2026'

# Re-use the ZHHK_CONTENT from _build_specs_blog.py
import importlib.util
spec = importlib.util.spec_from_file_location("build_specs", "F:/zprintpro-nextjs/_build_specs_blog.py")
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)
ZHHK_CONTENT = mod.ZHHK_CONTENT
ZHHK_TITLE = mod.ZHHK_TITLE
ZHHK_META = mod.ZHHK_META
ZHHK_AUTHOR = mod.ZHHK_AUTHOR

# Stats (sanity check)
print(f'zh-hk chars: {len(ZHHK_CONTENT)}')
print(f'zh-hk alert: {ZHHK_CONTENT.count("<div class="+chr(34)+"bg-")}')
print(f'zh-hk schema: {ZHHK_CONTENT.count(chr(34)+"@type"+chr(34))}')

zh_data = json.load(open(ZHHK_PATH, encoding='utf-8'))
print(f'Before: zh-hk has {len(zh_data)} slugs')
zh_data[ZHHK_SLUG] = {
    'slug': ZHHK_SLUG,
    'title': ZHHK_TITLE,
    'metaDescription': ZHHK_META,
    'content': ZHHK_CONTENT,
    'author': ZHHK_AUTHOR,
    'datePublished': '2026-09-06',
    'dateModified': '2026-09-06',
    'imageAlt': f'{ZHHK_TITLE[:60]} - 智印港 ZprintPro 印刷規格指南',
}
print(f'After: zh-hk has {len(zh_data)} slugs')

with open(ZHHK_PATH, 'w', encoding='utf-8') as f:
    json.dump(zh_data, f, ensure_ascii=False, indent=2)
print(f'zh-hk.json saved: {ZHHK_PATH}')
