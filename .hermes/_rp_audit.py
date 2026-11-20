# -*- coding: utf-8 -*-
# red-packets 六 SKU 现状审计: 当前 images/seoImages/alt + 磁盘文件 + sku-seo imageAlt 对照
import io, re
from pathlib import Path
ROOT = Path(r'F:\zprintpro-nextjs')
t = io.open(ROOT / 'src/data/products.ts', encoding='utf-8').read()
base = t.index('export const products')

SLUGS = ['foil-red-packets', 'embossed-red-packets', 'custom-red-packets',
         'cartoon-red-packets', 'eco-red-packets', 'large-red-packets']

def entry_of(slug):
    i = t.index("slug: '%s'" % slug, base)
    j = None
    for k in range(i, base, -1):
        ls = t.rfind('\n', 0, k) + 1
        if t[ls:k + 1] in ('  {', '    {'):
            j = ls
            break
    depth = 0; instr = None; esc = False
    for k in range(j, len(t)):
        c = t[k]
        if instr:
            if esc: esc = False
            elif c == '\\': esc = True
            elif c == instr: instr = None
        else:
            if c in ('"', "'", '`'): instr = c
            elif c == '{': depth += 1
            elif c == '}':
                depth -= 1
                if depth == 0: return t[j:k + 1]
    return None

report = {}
for s in SLUGS:
    blk = entry_of(s)
    d = {'len': len(blk)}
    m = re.search(r"images: \[([^\]]*)\]", blk)
    d['legacy'] = m.group(1).strip()[:120] if m else None
    m = re.search(r"imagesByLocale: \{(.*?)\n\s*\}", blk, re.DOTALL)
    if m:
        locs = {}
        for mm in re.finditer(r"'(zh-hk|en|ja)': \[(.*?)\]", m.group(1), re.DOTALL):
            paths = re.findall(r"'(/images/[^']+)'", mm.group(2))
            missing = [p for p in paths if not (ROOT / 'public' / p.lstrip('/')).exists()]
            locs[mm.group(1)] = {'n': len(paths), 'first': paths[0] if paths else '', 'missing': missing}
        d['ibl'] = locs
    else:
        d['ibl'] = None
    m = re.search(r"seoImages: \{(.*?)\n  \}", blk, re.DOTALL)
    if m:
        alts = re.findall(r"'(zh-hk|en|ja)': '([^']{0,90})", m.group(1))
        d['seoalt'] = alts
    else:
        d['seoalt'] = None
    report[s] = d

for s, d in report.items():
    print('=== %s ===' % s)
    print('  legacy:', d['legacy'])
    if d['ibl']:
        for loc, v in d['ibl'].items():
            print('  ibl %s n=%d miss=%d first=%s' % (loc, v['n'], len(v['missing']), v['first'].split('/')[-1]))
    else:
        print('  ibl: NONE')
    print('  seoalt:', d['seoalt'])
