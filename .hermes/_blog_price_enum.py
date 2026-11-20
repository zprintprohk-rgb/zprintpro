# -*- coding: utf-8 -*-
# enumerate ALL price claims in paper-bag + poster blog guides (3 locales) vs SSoT
import io, sys, re, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
price_re = re.compile(r'(HK\$|US\$|¥|USD|\$)\s*[0-9][0-9,\.]*')
targets = {
    'paper-bag': ['paper-bag', '纸袋', '紙袋', 'kraft'],
    'poster': ['poster', '海报', '海報', 'ポスター'],
}
for loc in ['zh-hk', 'en', 'ja']:
    try:
        d = json.load(open(rf'F:\zprintpro-nextjs\src\data\blog-data\{loc}.json', encoding='utf-8'))
    except Exception as e:
        print(loc, 'ERR', e); continue
    print(f'########## {loc} ##########')
    for slug, post in d.items():
        hit = any(k in slug for k in targets['paper-bag']) or any(k in slug for k in targets['poster'])
        if not hit:
            continue
        s = json.dumps(post, ensure_ascii=False)
        prices = []
        for m in price_re.finditer(s):
            ctx = s[max(0, m.start()-50):m.end()+40]
            prices.append((m.group(0), ctx.replace('\\n', ' ')[:110]))
        print(f'--- {slug} ---')
        seen = set()
        for p, c in prices:
            key = c[:60]
            if key in seen: continue
            seen.add(key)
            print(f'   [{p}] ...{c}...')
        print()
