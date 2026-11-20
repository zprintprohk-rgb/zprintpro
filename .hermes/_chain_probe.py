# -*- coding: utf-8 -*-
# 终局核验: ① 产品数组内真条目名单 ② Tier1 八条 301 链端到端终态
import io, json, re, requests
from pathlib import Path
ROOT = Path(r'F:\zprintpro-nextjs')
lines = io.open(ROOT / 'src/data/products.ts', encoding='utf-8').read().split('\n')

# 产品数组区 (L145 后) 内, 花括号配对切条目取 slug — 字符串感知
start = next(i for i, ln in enumerate(lines) if ln.startswith('export const products'))
prod_slugs = []
i = start + 1
while i < len(lines):
    ln = lines[i]
    if ln.strip() == '{' and (ln.startswith('  {') or ln.startswith('    {')):
        depth = 0; in_str = None; esc = False; buf = []
        j = i
        while j < len(lines):
            for c in lines[j]:
                if in_str:
                    if esc: esc = False
                    elif c == '\\': esc = True
                    elif c == in_str: in_str = None
                else:
                    if c in ('"', "'", '`'): in_str = c
                    elif c == '{': depth += 1
                    elif c == '}':
                        depth -= 1
                        if depth == 0: break
            if depth == 0: break
            j += 1
        blk = '\n'.join(lines[i:j+1])
        m = re.search(r"(?<!_)slug: '([a-z0-9-]+)'", blk)
        if m: prod_slugs.append(m.group(1))
        i = j + 1
    else:
        i += 1
print('product entries:', len(prod_slugs))
for s in ('place-cards', 'wedding-invitations', 'greeting-cards', 'paper-bags', 'kraft-paper-bags',
          'foil-wedding-invitations', 'wedding-thank-you-cards', 'roll-stickers'):
    print('  %-28s in-products=%s' % (s, s in prod_slugs))

print('\n--- Tier1 301 链端到端 ---')
UA = {'User-Agent': 'Mozilla/5.0 (probe)'}
chains = [
 ('/zh-hk/product/drink-tokens/',), ('/zh-hk/product/cafe-table-cards/',), ('/zh-hk/product/wedding-place-cards/',),
 ('/en/product/save-the-date-cards/',), ('/ja/product/wedding-seating-charts/',), ('/en/product/wedding-suite-bundle/',),
 ('/ja/product/eco-tote-bag/',), ('/en/product/postcard-set/',),
]
for (p,) in chains:
    r = requests.get('https://zprintpro.com' + p, headers=UA, timeout=30, allow_redirects=False)
    loc = r.headers.get('Location', '')
    final = ''
    if r.is_redirect and loc:
        url = loc if loc.startswith('http') else 'https://zprintpro.com' + loc
        hops = 0
        while hops < 5:
            r2 = requests.get(url, headers=UA, timeout=30, allow_redirects=False)
            if r2.is_redirect and r2.headers.get('Location'):
                url = r2.headers['Location'] if r2.headers['Location'].startswith('http') else 'https://zprintpro.com' + r2.headers['Location']
                hops += 1
                continue
            final = 'final %d %s' % (r2.status_code, url.replace('https://zprintpro.com', ''))
            break
    print('%-40s %d -> %s %s' % (p, r.status_code, loc.replace('https://zprintpro.com', ''), final))
