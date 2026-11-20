# -*- coding: utf-8 -*-
"""probe doujin/mtr/cmyk blog 实际 body tail"""
import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

for locale, slug in [('zh-hk', 'doujin-circle-printing-guide'), ('zh-hk', 'mtr-advertising-specs'), ('zh-hk', 'cmyk-guide')]:
    fpath = f'F:\\zprintpro-nextjs\\src\\data\\blog-data\\{locale}.json'
    with io.open(fpath, 'r', encoding='utf-8') as f:
        data = json.load(f) if False else __import__('json').load(f)
    if slug in data:
        content = data[slug].get('content', '')
        print(f'=== {locale}/{slug} content len {len(content)} ===')
        # 检查 "border-t" marker
        if 'border-t border-gray-200' in content:
            print('  marker "border-t border-gray-200" FOUND in content')
            # find positions
            pos = content.find('border-t border-gray-200')
            print(f'  context: ...{content[pos-100:pos+500]}...')
        else:
            print('  marker NOT found - tail:')
            print(f'  ...{content[-500:]}')
        print()
