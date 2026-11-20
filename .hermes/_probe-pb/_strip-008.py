# -*- coding: utf-8 -*-
"""清除 3 locale 案例段中的 GSC 后台代号 '008' (门童 #16 gsc-leak), 保留段6所需 '待校准' 语义"""
import json, io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

repls = {
    'zh-hk': ('待 008 案例庫校準', '待案例庫校準'),
    'en': ('pending 008 case-library calibration', 'pending case-library calibration'),
    'ja': ('008 ケースライブラリ校正待ち', 'ケースライブラリ校正待ち'),
}
for loc, (old, new) in repls.items():
    path = 'src/data/blog-data/%s.json' % loc
    raw = open(path, encoding='utf-8').read()
    has_nl = raw.endswith('\n')
    base = raw[:-1] if has_nl else raw
    obj = json.loads(raw)
    assert base == json.dumps(obj, ensure_ascii=False, indent=2), 'fidelity mismatch %s' % loc
    c = obj['roll-up-banner-printing-guide']['content']
    if old not in c:
        print('NOT FOUND %s: %s' % (loc, old))
        sys.exit(1)
    c = c.replace(old, new)
    obj['roll-up-banner-printing-guide']['content'] = c
    out = json.dumps(obj, ensure_ascii=False, indent=2) + ('\n' if has_nl else '')
    with open(path, 'w', encoding='utf-8', newline='\n') as f:
        f.write(out)
    print('%s: 008 代号已清除' % loc)
