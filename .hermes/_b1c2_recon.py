# -*- coding: utf-8 -*-
# B1c 簇2 现场调查: SKU 实况 / category 内容 / body 格式 / FAQ 系统 / 价格真值 / leadTime / 锁
import io, re, json
from pathlib import Path
ROOT = Path(r'F:\zprintpro-nextjs')

# 0) b1c 队列进度
for p in (ROOT/'.hermes').glob('*b1c*'):
    print('queue file:', p.name, p.stat().st_size)
q = ROOT/'.hermes/b1c-queue-progress.json'
if q.exists():
    d = json.loads(q.read_text(encoding='utf-8'))
    print('b1c keys:', list(d)[:12])
    print(json.dumps(d, ensure_ascii=False)[:600])

# 1) products.ts 6 SKU 实况 (name/minQ/leadTime/price_range)
t = io.open(ROOT/'src/data/products.ts', encoding='utf-8').read()
base = t.index('export const products')
for slug in ('foil-red-packets','embossed-red-packets','custom-red-packets','cartoon-red-packets','eco-red-packets','large-red-packets'):
    i = t.index("slug: '%s'" % slug, base)
    seg = t[i:i+2600]
    def g(k):
        m = re.search(k + r": '([^']+)'", seg)
        return m.group(1) if m else '?'
    mq = re.search(r'minQuantity: (\d+)', seg)
    lt = re.search(r'leadTime[^,]{0,40}",?\s*([^\n]{0,60})",?\n', seg)
    pr = re.search(r"price_range: '([^']+)'", seg)
    nm = g('name'); nmj = re.search(r"nameJa: '([^']+)'", seg)
    print('\n==', slug, '| zh=%s | ja=%s' % (nm.split('|')[0], nmj.group(1) if nmj else '?'))
    print('  minQ=%s price_range=%s' % (mq.group(1) if mq else '?', pr.group(1) if pr else '?'))
    m2 = re.search(r'leadTime[^,]*,?\s*([^\n]{0,70})', seg)
    print('  leadTime raw:', (m2.group(1).strip()[:60] if m2 else '?'))

# 2) category-seo-content red-packets 现状
cs = io.open(ROOT/'src/data/category-seo-content.ts', encoding='utf-8').read()
print('\ncategory-seo-content has red-packets key:', "'red-packets'" in cs)
i = cs.find("'red-packets'")
if i > -1:
    print(cs[i:i+500])

# 3) sku-seo body 格式采样 (foil body 长度/结构)
s = io.open(ROOT/'src/data/sku-seo-data.ts', encoding='utf-8').read()
i = s.index('"foil-red-packets":')
seg = s[i:i+20000]
b = re.search(r'"body": "(.*?)",\n\s+"faqs"', seg, re.DOTALL)
if b:
    body = b.group(1)
    print('\nfoil body len=%d, first 240:' % len(body))
    print(body[:240].encode().decode('unicode_escape')[:240] if '\\u' in body[:50] else body[:240])
f = re.search(r'"faqs": (\[.*?\])\n', seg, re.DOTALL)
print('foil faqs:', f.group(1)[:120] if f else '?')

# 4) product-faqs red-packets 现状
pf = io.open(ROOT/'src/data/product-faqs.ts', encoding='utf-8').read()
print('\nproduct-faqs red-packets hits:', len(re.findall(r'red-packet', pf)))
for slug in ('foil-red-packets','custom-red-packets'):
    print('  %s in product-faqs:' % slug, slug in pf)

# 5) 锁状态
lk = ROOT/'.hermes/locks/lane.lock'
print('\nlane.lock exists:', lk.exists(), lk.read_text()[:120] if lk.exists() else '')
sk = io.open(ROOT/'SESSION_LOCK.md', encoding='utf-8').read()
print('SESSION_LOCK head:', sk[:200].replace('\n',' | '))
