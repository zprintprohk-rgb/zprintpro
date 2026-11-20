# -*- coding: utf-8 -*-
# residue scan: fabricated families must be 0 in patched guides
import io, sys, re, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
B = r'F:\zprintpro-nextjs\src\data\blog-data'
tokens = ['HK$8-120', 'HK$15-120', 'HK$15-30', 'HK$60-120', 'HK$30-60', 'HK$8-15', 'HK$20-40',
          'HK$0.30', 'HK$0.50', 'HK$0.80', 'HK$1.20', 'HK$2.00', 'HK$3.50', 'HK$0.45', 'HK$0.95',
          'US$0.19', 'US$0.18', 'US$0.11', '¥22 から', '¥200-300', '¥300-600', '¥600-1,200', '¥1,200-2,300', '¥400-800',
          '+80% 附加費', '+50% 附加費', 'HK$108-216', '加 80%', '0.19/pc', '0.19/枚', '0.19/張', '1,000 張含', '1,000 枚',
          '10 張起印，可以同一週出貨', '10-piece MOQ with same-week', '10 枚から MOQ']
for loc in ['zh-hk', 'en', 'ja']:
    d = json.load(open(rf'{B}\{loc}.json', encoding='utf-8'))
    bad = []
    for slug in ['poster-printing-guide', 'poster-size-guide', 'paper-bag-printing-guide']:
        c = d[slug]['content']
        for tok in tokens:
            if tok in c:
                bad.append((slug, tok))
    print(loc, 'residue:', bad if bad else 'CLEAN')
# verify JSON parse + spot-check anchors
print()
for loc in ['zh-hk', 'en', 'ja']:
    d = json.load(open(rf'{B}\{loc}.json', encoding='utf-8'))
    c = d['poster-printing-guide']['content']
    anchors = ['HK$9 起/張', 'HK$45 起/張', 'HK$144 起/張'] if loc == 'zh-hk' else (['US$2.30', 'US$4.60', 'US$14.70'] if loc == 'en' else ['¥300〜', '¥600〜', '¥1,920〜'])
    print(loc, 'anchors present:', {a: c.count(a) for a in anchors})
