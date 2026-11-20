# -*- coding: utf-8 -*-
"""campus: lastUpdated 回退 2026-09-03 (9/3 Pillar 升级批冻结规则)"""
import json, io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

SLUG = 'campus-education-printing-pillar-guide'
for loc in ['en', 'zh-hk', 'ja']:
    path = 'src/data/blog-data/%s.json' % loc
    raw = open(path, encoding='utf-8').read()
    has_nl = raw.endswith('\n')
    obj = json.loads(raw)
    assert (raw[:-1] if has_nl else raw) == json.dumps(obj, ensure_ascii=False, indent=2), 'fid %s' % loc
    e = obj[SLUG]
    e['lastUpdated'] = '2026-09-03'
    out = json.dumps(obj, ensure_ascii=False, indent=2) + ('\n' if has_nl else '')
    open(path, 'w', encoding='utf-8', newline='\n').write(out)
    print('%s: lastUpdated=%s' % (loc, obj[SLUG]['lastUpdated']))
