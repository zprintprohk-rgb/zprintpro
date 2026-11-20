# -*- coding: utf-8 -*-
import io, sys, re, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
B = r'F:\zprintpro-nextjs\src\data\blog-data'
d = json.load(open(rf'{B}\zh-hk.json', encoding='utf-8'))
c = d['poster-printing-guide']['content']
print('=== zh poster-printing-guide 加 80% ===')
for m in re.finditer('加 80%', c):
    s = max(0, m.start()-100)
    print('...', c[s:m.end()+80].replace('\n', ' '), '...')
    print()
for loc in ['zh-hk', 'en', 'ja']:
    d = json.load(open(rf'{B}\{loc}.json', encoding='utf-8'))
    c = d['poster-size-guide']['content']
    print(f'=== {loc} poster-size-guide HK$0.30/0.50/0.95 ===')
    for tok in ['HK$0.30', 'HK$0.50', 'HK$0.95']:
        for m in re.finditer(re.escape(tok), c):
            s = max(0, m.start()-90)
            print(f'[{tok}] ...{c[s:m.end()+60].replace(chr(10)," ")[:150]}...')
    print()
