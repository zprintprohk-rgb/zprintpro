# -*- coding: utf-8 -*-
import io, sys, json, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
base = r'F:\zprintpro-nextjs\src\data\blog-data'
targets = {
    'zh-hk': ['paper-bag-printing-guide', 'poster-size-guide', 'sticker-guide'],
    'ja': ['paper-bag-printing-guide', 'poster-size-guide', 'sticker-guide', 'textbook-printing-guide', 'school-exercise-book-printing-guide', 'zine-small-batch-booklet-printing-guide', 'same-day-flyers-printing-hong-kong-guide', 'packaging-box-pricing-2026'],
}
for loc in ['zh-hk', 'ja']:
    data = json.load(open(base + '\\' + ('zh-hk.json' if loc == 'zh-hk' else 'ja.json'), encoding='utf-8'))
    print(f'\n########## {loc} ##########')
    for slug in targets[loc]:
        if slug not in data:
            continue
        content = data[slug].get('content', '')
        text = re.sub(r'<[^>]+>', ' ', content)
        text = re.sub(r'\s+', ' ', text)
        for m in re.finditer(r'(US\$\s?[\d.,]+|HK\$\s?[\d.,]+|¥\s?[\d.,]+)', text):
            i = m.start()
            ctx = text[max(0, i-40):i+45]
            print(f'  [{slug[:30]:30s}] {m.group(1)} :: ...{ctx}...')
