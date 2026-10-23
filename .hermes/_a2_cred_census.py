# -*- coding: utf-8 -*-
# A2 CRED census: context attribution for flagged families in blog-data (3 locales)
import re, json, io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

BASE = r'F:\zprintpro-nextjs\src\data\blog-data'

def slug_for(raw, pos):
    pre = raw[:pos]
    ms = re.findall(r'"slug":\s*"([^"]+)"', pre)
    return ms[-1] if ms else '?'

FAMS = ['ISO 9001', '50,000+', '多個', '15年', '15 年']
for loc in ['ja', 'zh-hk', 'en']:
    raw = open(rf'{BASE}\{loc}.json', encoding='utf-8').read()
    print(f'########## {loc} ##########')
    for fam in FAMS:
        hits = [m for m in re.finditer(re.escape(fam), raw)]
        if not hits:
            continue
        print(f'--- {fam}: {len(hits)} hit(s) ---')
        seen = set()
        for m in hits:
            slug = slug_for(raw, m.start())
            s = max(0, m.start()-110); e = min(len(raw), m.end()+70)
            ctx = raw[s:e].replace('\n', ' ')
            key = (slug, ctx[:60])
            if fam in ('15年', '15 年', '多個') and key in seen:
                continue
            seen.add(key)
            print(f'  [{slug}] {ctx}')
        print()
