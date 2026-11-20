# -*- coding: utf-8 -*-
# FULL paragraph-level dump of poster-printing-guide (3 locales) + paper-bag-printing-guide en/ja price lines
import io, sys, re, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
price_re = re.compile(r'(HK\$|US\$|¥|USD|\$)\s*[0-9]')
for loc in ['zh-hk', 'en', 'ja']:
    d = json.load(open(rf'F:\zprintpro-nextjs\src\data\blog-data\{loc}.json', encoding='utf-8'))
    for slug in ['poster-printing-guide', 'paper-bag-printing-guide']:
        post = d.get(slug)
        if not post:
            print(f'===== {loc}/{slug} MISSING ====='); continue
        content = post.get('content', '')
        print(f'===== {loc} / {slug} (content len {len(content)}) =====')
        # split on paragraph-ish boundaries, index each
        parts = re.split(r'(?=<h\d|<p|<li|<td|<tr)', content)
        pi = 0
        for part in parts:
            if price_re.search(part):
                clean = re.sub(r'\s+', ' ', part).strip()
                pi += 1
                print(f'  [{pi}] {clean[:420]}')
        print()
