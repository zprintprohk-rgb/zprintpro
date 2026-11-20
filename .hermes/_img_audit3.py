# -*- coding: utf-8 -*-
# 终版审计: 字符串感知的花括号配对切分条目 → sku/slug/images/imagesByLocale → 逐文件存在性
import io, json
from pathlib import Path

ROOT = Path(r'F:\zprintpro-nextjs')
t = io.open(ROOT / 'src/data/products.ts', encoding='utf-8').read()
lines = t.split('\n')

# 1) 找条目起始行: 行内容去掉空白后 == '{' 且缩进为 2 或 4
starts = [i for i, ln in enumerate(lines)
          if ln.strip() == '{' and (ln.startswith('  {') or ln.startswith('    {'))]
print('entry openers:', len(starts))

# 2) 字符串感知花括号配对
def match_close(si):
    depth = 0
    in_str = None
    esc = False
    for i in range(si, len(lines)):
        ln = lines[i]
        j = 0
        while j < len(ln):
            c = ln[j]
            if in_str:
                if esc:
                    esc = False
                elif c == '\\':
                    esc = True
                elif c == in_str:
                    in_str = None
            else:
                if c in ('"', "'", '`'):
                    in_str = c
                elif c == '{':
                    depth += 1
                elif c == '}':
                    depth -= 1
                    if depth == 0:
                        return i
            j += 1
    return None

entries = []
for si in starts:
    ei = match_close(si)
    if ei is None:
        print('NO CLOSE for line', si + 1)
        continue
    entries.append('\n'.join(lines[si:ei + 1]))
print('entries closed:', len(entries))

import re
report = []
for e in entries:
    mslug = re.search(r"(?<!_)slug: '([a-z0-9-]+)'", e)
    msku = re.search(r"sku: '([A-Z]+-\d+)'", e)
    if not mslug:
        continue
    slug, sku = mslug.group(1), (msku.group(1) if msku else None)
    slots = []  # (loc, path, exists)
    mibl = re.search(r'imagesByLocale: \{(.*?)\n  \}', e, re.DOTALL)
    if mibl:
        for m in re.finditer(r"'(zh-hk|en|ja)': \[(.*?)\]", mibl.group(1), re.DOTALL):
            loc, arr = m.group(1), m.group(2)
            for p in re.findall(r"'(/images/[^']+)'", arr):
                slots.append((loc, p, (ROOT / 'public' / p.lstrip('/')).exists()))
    for p in re.findall(r"images: \['(/images/[^']+)'\]", e):
        slots.append(('legacy', p, (ROOT / 'public' / p.lstrip('/')).exists()))
    miss = [(loc, p) for loc, p, ok in slots if not ok]
    hit = [(loc, p) for loc, p, ok in slots if ok]
    report.append({'slug': slug, 'sku': sku, 'n_hit': len(hit), 'n_miss': len(miss),
                   'miss': [{'loc': l, 'file': Path(p).name} for l, p in miss]})

print('products:', len(report))
zero = [r for r in report if r['n_hit'] == 0]
print('ZERO-image products:', [(r['slug'], r['sku']) for r in zero])
partial = [r for r in report if 0 < r['n_miss']]
print('partial-missing products:', len(partial), ' total missing files:', sum(r['n_miss'] for r in partial))
for r in partial:
    print('  %-30s %s  miss %d: %s' % (r['slug'], r['sku'], r['n_miss'],
          ', '.join('%s:%s' % (m['loc'], m['file'].split('-')[-1]) for m in r['miss'])))
io.open(ROOT / '.hermes/_img_audit3.json', 'w', encoding='utf-8').write(json.dumps(report, ensure_ascii=False, indent=1))
