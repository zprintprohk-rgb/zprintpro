# -*- coding: utf-8 -*-
# 无图 SKU 审计: products.ts 每个条目引用的图片文件存在性 (images + imagesByLocale ×3语)
import re, io, json
from pathlib import Path

ROOT = Path(r'F:\zprintpro-nextjs')
t = io.open(ROOT / 'src/data/products.ts', encoding='utf-8').read()

# 条目边界: 复用已验证的缩进感知切分
lines = t.split('\n')
entries = []
cur = None
for i, ln in enumerate(lines):
    s = ln.strip()
    if re.match(r'^  \{\s*$', ln) or re.match(r'^    \{\s*$', ln):
        cur = {'start': i, 'buf': [ln]}
        continue
    if cur is not None:
        cur['buf'].append(ln)
        ind = len(ln) - len(ln.lstrip())
        if s in ('},', '}, ') and ind <= (len(cur['buf'][0]) - len(cur['buf'][0].lstrip())):
            entries.append('\n'.join(cur['buf']))
            cur = None
print('entries parsed:', len(entries))

VIEW_BY_SUFFIX = {'': 'hero', '-1': 'hero', '-2': 'detail', '-3': 'multi-angle', '-4': 'variety'}
report = []
for e in entries:
    mslug = re.search(r"slug: '([a-z0-9-]+)'", e)
    msku = re.search(r"sku: '([A-Z]+-\d+)'", e)
    if not mslug:
        continue
    slug, sku = mslug.group(1), (msku.group(1) if msku else None)
    missing = []
    # imagesByLocale
    mibl = re.search(r"imagesByLocale: \{(.*?)\n  \}", e, re.DOTALL)
    if mibl:
        for m in re.finditer(r"'(zh-hk|en|ja)': \[(.*?)\]", mibl.group(1), re.DOTALL):
            loc, arr = m.group(1), m.group(2)
            for p in re.findall(r"'(/images/[^']+)'", arr):
                rel = p.lstrip('/')
                if not (ROOT / 'public' / rel).exists():
                    base = Path(rel).stem  # e.g. zprintpro-...-en-2
                    suffix = re.search(r'-(zh-hk|en|ja)(-\d+)?$', base)
                    view = VIEW_BY_SUFFIX.get(suffix.group(2) if suffix else '', None) if suffix else None
                    missing.append({'loc': loc, 'path': rel, 'view': view, 'base': base})
    # legacy images
    for p in re.findall(r"images: \['(/images/[^']+)'\]", e):
        rel = p.lstrip('/')
        if not (ROOT / 'public' / rel).exists():
            missing.append({'loc': 'legacy', 'path': rel, 'view': None, 'base': Path(rel).stem})
    if missing:
        report.append({'slug': slug, 'sku': sku, 'n_missing': len(missing), 'missing': missing})

print('products with missing image files:', len(report))
tot = sum(r['n_missing'] for r in report)
print('total missing files:', tot)
for r in report:
    print('%-28s %s  missing %d' % (r['slug'], r['sku'], r['n_missing']))
    for mm in r['missing']:
        print('    [%s] %s (view=%s)' % (mm['loc'], mm['path'].split('/')[-1], mm['view']))
io.open(ROOT / '.hermes/_img_audit.json', 'w', encoding='utf-8').write(json.dumps(report, ensure_ascii=False, indent=1))
