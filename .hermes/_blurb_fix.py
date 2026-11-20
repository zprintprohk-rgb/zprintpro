# -*- coding: utf-8 -*-
# verify flyers en/ja desc really cross-wired? + patch poster-size-guide blurbs (3 locales)
import io, sys, re, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
seo = open(r'F:\zprintpro-nextjs\src\lib\seo.ts', encoding='utf-8').read()
i = seo.find("'flyers': {")
j = seo.find('descriptions:', i)
k = seo.find('{', j)
d = 1; p = k
while p < len(seo):
    c = seo[p]
    if c == '{': d += 1
    elif c == '}':
        d -= 1
        if d == 0: break
    p += 1
block = seo[k:p]
print('=== flyers descriptions block (real) ===')
print(block[:1500])
print()
# patch poster-size-guide blurbs
B = r'F:\zprintpro-nextjs\src\data\blog-data'
fixes = {
    'zh-hk': [
        ('傳單印刷</a> — 128-200gsm 銅版紙, HK$0.30-0.80/張', '傳單印刷</a> — 128-200gsm 銅版紙, HK$0.25 起/張'),
        ('喜帖印刷</a> — A5 騎馬釘 + 燙金, HK$0.50-1.20/個', '喜帖印刷</a> — A5 騎馬釘 + 燙金, HK$1.00 起/個'),
        ('三摺單張</a> — 4 摺 6 摺 8 摺自訂, HK$0.95-2.50/張', '三摺單張</a> — 4 摺 6 摺 8 摺自訂, HK$0.70-1.95/張'),
    ],
    'en': [
        ('Flyer Printing</a> — 128-200gsm coated, HK$0.30-0.80/pc', 'Flyer Printing</a> — 128-200gsm coated, from HK$0.25/pc'),
        ('Wedding Invitation</a> — A5 saddle + hot foil, HK$0.50-1.20/pc', 'Wedding Invitation</a> — A5 saddle + hot foil, from HK$1.00/pc'),
        ('Tri-fold Leaflet</a> — 4/6/8-fold custom, HK$0.95-2.50/pc', 'Tri-fold Leaflet</a> — 4/6/8-fold custom, HK$0.70-1.95/pc'),
    ],
    'ja': [
        ('フライヤー印刷</a> — 128-200gsm コート, HK$0.30-0.80/枚', 'フライヤー印刷</a> — 128-200gsm コート, HK$0.25 起/枚'),
        ('結婚招待状</a> — A5 中綴じ + 箔押し, HK$0.50-1.20/個', '結婚招待状</a> — A5 中綴じ + 箔押し, HK$1.00 起/個'),
        ('三つ折りリーフレット</a> — 4/6/8 つ折りカスタム, HK$0.95-2.50/枚', '三つ折りリーフレット</a> — 4/6/8 つ折りカスタム, HK$0.70-1.95/枚'),
    ],
}
for loc, repls in fixes.items():
    d = json.load(open(rf'{B}\{loc}.json', encoding='utf-8'))
    c = d['poster-size-guide']['content']
    for old, new in repls:
        n = c.count(old)
        print(loc, 'count', n, ':', old[:50])
        if n != 1:
            sys.exit(1)
    for old, new in repls:
        c = c.replace(old, new)
    d['poster-size-guide']['content'] = c
    json.dump(d, open(rf'{B}\{loc}.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
print('poster-size-guide blurbs patched (3 locales)')
