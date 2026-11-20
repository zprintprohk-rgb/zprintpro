# -*- coding: utf-8 -*-
# full price paragraphs of poster-printing-guide + paper-bag-printing-guide (3 locales)
import io, sys, re, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
price_re = re.compile(r'(HK\$|US\$|¥|USD|\$)\s*[0-9][0-9,\.]*')
for loc in ['zh-hk', 'en', 'ja']:
    d = json.load(open(rf'F:\zprintpro-nextjs\src\data\blog-data\{loc}.json', encoding='utf-8'))
    for slug in ['poster-printing-guide', 'paper-bag-printing-guide']:
        post = d.get(slug)
        if not post:
            continue
        s = json.dumps(post, ensure_ascii=False)
        # split by <p> tags to get paragraphs, keep those with prices
        paras = re.split(r'</p>|<h\d[^>]*>|</h\d>|<li>|</li>', s)
        print(f'===== {loc} / {slug} =====')
        for para in paras:
            if price_re.search(para) and len(para) < 600:
                clean = re.sub(r'\\"', '"', para).strip()
                if clean:
                    print('  ¶', clean[:260])
        print()
