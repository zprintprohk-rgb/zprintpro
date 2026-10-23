# -*- coding: utf-8 -*-
# cross-locale sample: do zh-hk/en siblings carry clean numbers where ja has 多個?
import json, io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def load(loc):
    d = json.load(open(rf'F:\zprintpro-nextjs\src\data\blog-data\{loc}.json', encoding='utf-8'))
    return d

zh = load('zh-hk'); en = load('en'); ja = load('ja')

def find_text(post, needle):
    """search all string fields for needle, return first 3 contexts"""
    hits = []
    def walk(o):
        if isinstance(o, dict):
            for v in o.values(): walk(v)
        elif isinstance(o, list):
            for v in o: walk(v)
        elif isinstance(o, str) and needle in o:
            for m in re.finditer(re.escape(needle), o):
                s = max(0, m.start()-30); hits.append(o[s:m.end()+30])
    walk(post)
    return hits[:3]

samples = [
    ('packaging-box-price-2026', 'discount-tier', ['500 個 -10%', '500 个', '500 pcs']),
    ('industrial-nameplate-printing-guide', 'price-table', ['100 個 $24', '100个', '100 pcs $']),
    ('cosmetics-packaging-box-printing-guide', 'moq-tier', ['500-多個 MOQ', '500-', '500-']),
]
for slug, tag, needles in samples:
    print(f'######## {slug} ({tag}) ########')
    for loc, d in [('zh-hk', zh), ('en', en), ('ja', ja)]:
        post = d.get(slug)
        if not post:
            print(f'  [{loc}] POST MISSING'); continue
        n_multi = json.dumps(post, ensure_ascii=False).count('多個')
        print(f'  [{loc}] 多個 count: {n_multi}')
        for nd in needles:
            for h in find_text(post, nd):
                print(f'    needle {nd!r}: ...{h}...')
                break
