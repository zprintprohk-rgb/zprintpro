# -*- coding: utf-8 -*-
# B1c 簇2 侦察 round2: 目标结构取证
import io, re, json
from pathlib import Path
ROOT = Path(r'F:\zprintpro-nextjs')

# 1) foil/custom 当前 body 原文 (前 300 字) + 是否含内链格式
s = io.open(ROOT/'src/data/sku-seo-data.ts', encoding='utf-8').read()
for slug in ('foil-red-packets', 'custom-red-packets'):
    i = s.index('"%s":' % slug)
    seg = s[i:i+30000]
    b = re.search(r'"body":\s*"(.*?)",\s*\n\s*"faqs"', seg, re.DOTALL)
    if b:
        raw = b.group(1)
        try:
            body = json.loads('"' + raw + '"')
        except Exception:
            body = raw.encode().decode('unicode_escape', 'ignore')
        print('== %s body len=%d links=%d' % (slug, len(body), body.count('](')))
        print(body[:200].replace('\n', ' | '))
    else:
        print('== %s body NOT FOUND by regex' % slug)

# 2) roll-stickers body 内链格式采样 (f9935e4b 说接入了 parseInlineLinks)
i = s.index('"roll-stickers":')
seg = s[i:i+30000]
b = re.search(r'"body":\s*"(.*?)",\s*\n\s*"faqs"', seg, re.DOTALL)
if b:
    raw = b.group(1)
    try:
        body = json.loads('"' + raw + '"')
    except Exception:
        body = raw
    links = re.findall(r'\[[^\]]+\]\([^)]+\)', body)
    print('\nroll links sample:', links[:4])

# 3) product-faqs 结构 + red-packets 现状 + 现有 key 样例
pf = io.open(ROOT/'src/data/product-faqs.ts', encoding='utf-8').read()
print('\nproduct-faqs head keys:', re.findall(r"'([a-z0-9-]+)':\s*\{", pf)[:12])
print('red-packet hits context:', [pf[m.start()-40:m.start()+60].replace('\n',' ') for m in re.finditer(r'red-packet', pf)][:2])

# 4) ProductPageV9 FAQ 数据源
v9 = io.open(ROOT/'src/app/[locale]/product/[slug]/v9/ProductPageV9.tsx', encoding='utf-8').read()
m = re.search(r"import \{[^}]*faq[^}]*\} from '([^']+)'", v9, re.IGNORECASE)
print('\nPDP v9 FAQ import:', m.group(1) if m else '?')
mm = re.search(r'coreProductFAQMap\[([^\]]+)\]', v9)
print('FAQ map access:', mm.group(0) if mm else '?')

# 5) category-seo-content red-packets 专属块?
cs = io.open(ROOT/'src/data/category-seo-content.ts', encoding='utf-8').read()
# 找 red-packets 的完整内容块 ( buyingGuide / paragraphs / faq )
for key in ("'red-packets':", '"red-packets":'):
    i = cs.find(key)
    if i > -1:
        print('\ncategory red-packets block @%d:' % i)
        print(cs[i:i+1500])
        break
else:
    print('\ncategory red-packets: 无专属块 (走通用模板)')

# 6) 品类清单 (跨簇内链真实性核查)
t = io.open(ROOT/'src/data/products.ts', encoding='utf-8').read()
base = t.index('export const products')
cats = re.findall(r"slug: '([a-z0-9-]+)'", t[:base])
print('\ncategories:', cats)
for slug in ('foil-stickers', 'greeting-cards', 'catalogs', 'paper-bags'):
    print('SKU/category exists %s:' % slug, ("'%s'" % slug) in t)

# 7) leadTime 真值 (red-packets 家族)
i = t.index("slug: 'foil-red-packets'", base)
seg = t[i:i+3000]
for m in re.finditer(r'(leadTime|turnaround|productionTime)[^\n]{0,80}', seg):
    print('leadTime:', m.group(0)[:80])
# 8) title-v5 guard 存在
print('\ntitle-v5 guard:', (ROOT/'scripts/guards/title-v5-guard.js').exists())
