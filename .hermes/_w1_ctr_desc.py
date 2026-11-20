# -*- coding: utf-8 -*-
import io, re
s = io.open(r'F:\zprintpro-nextjs\src\lib\seo.ts', encoding='utf-8').read()
i = s.index("'packaging': {")
seg = s[i:i + 3200]
# descriptions 块
di = seg.index('descriptions:')
dseg = seg[di:]
for loc in ("'zh-hk'", 'en:', 'ja:'):
    m = re.search(re.escape(loc) + r" '([^']+)'", dseg)
    if m:
        v = m.group(1)
        print('packaging', loc, 'desc (%d):' % len(v), v[:110])
i2 = s.index("'menus': {")
seg2 = s[i2:i2 + 2600]
di2 = seg2.index('descriptions:')
for loc in ("'zh-hk'", 'en:', 'ja:'):
    m = re.search(re.escape(loc) + r" '([^']+)'", seg2[di2:])
    if m:
        v = m.group(1)
        print('menus', loc, 'desc (%d):' % len(v), v[:110])
for cat in ('paper-bags', 'packaging', 'menus'):
    i3 = s.index("'%s': {" % cat)
    seg3 = s[i3:i3 + 3200]
    d3 = seg3[seg3.index('descriptions:'):]
    m = re.search(r"'zh-hk': '([^']+)'", d3)
    if m:
        v = m.group(1)
        print(cat, 'zh desc (%d):' % len(v), v[:130])
