# -*- coding: utf-8 -*-
"""9/3 Pillar 升级批修正: poster/packaging date+lastUpdated -> 2026-09-03
+ poster en 案例段补 ~100 字 (length 目标 12000)"""
import json, io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

REQ = '2026-09-03'
EXTRA = ' Rush 24h is available when the proof is approved before 18:00, and free HK delivery applies to orders over HK$500.'

for loc in ['en', 'zh-hk', 'ja']:
    path = 'src/data/blog-data/%s.json' % loc
    raw = open(path, encoding='utf-8').read()
    has_nl = raw.endswith('\n')
    obj = json.loads(raw)
    assert (raw[:-1] if has_nl else raw) == json.dumps(obj, ensure_ascii=False, indent=2), 'fid %s' % loc
    for slug in ['poster-printing-guide', 'packaging-box-pricing-2026']:
        e = obj[slug]
        e['lastUpdated'] = REQ
        if slug in ('poster-printing-guide', 'packaging-box-pricing-2026'):
            e['date'] = REQ
    # poster en 补字
    if loc == 'en':
        pe = obj['poster-printing-guide']
        c = pe['content']
        anchor = 'keep the proof rounds down to one: 300 DPI, 3mm bleed and a safe zone.</p>'
        if anchor in c:
            c = c.replace(anchor, anchor[:-4] + EXTRA + '</p>')
            pe['content'] = c
            print('poster/en 补字 OK')
        else:
            print('poster/en anchor NOT FOUND')
    out = json.dumps(obj, ensure_ascii=False, indent=2) + ('\n' if has_nl else '')
    open(path, 'w', encoding='utf-8', newline='\n').write(out)
    print('%s: date/lastUpdated -> %s' % (loc, REQ))
