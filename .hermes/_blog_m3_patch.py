# -*- coding: utf-8 -*-
# Stage B2: blog-m3-images.ts 扩展 (per-locale SKU hero) + getBlogImage helper
import io, json
from pathlib import Path
ROOT = Path(r'F:\zprintpro-nextjs')
mpath = ROOT / 'src/data/blog-m3-images.ts'
t = io.open(mpath, encoding='utf-8').read()
m = json.load(io.open(ROOT / '.hermes/_blog_img_map.json', encoding='utf-8'))

# 第 19 条: apparel-clothing-tag → premium-greeting-cards (place-cards 非产品, K3 方案①口径)
t2 = io.open(ROOT / 'src/data/products.ts', encoding='utf-8').read()
base = t2.index('export const products')
i = t2.index("slug: 'premium-greeting-cards'", base)
j = t2.index('imagesByLocale', i)
blk = t2[j:j+4000]
locs = {}
import re
for mm in re.finditer(r"'(zh-hk|en|ja)': \[(.*?)\]", blk, re.DOTALL):
    p = re.findall(r"'(/images/[^']+)'", mm.group(2))[0]
    assert (ROOT / 'public' / p.lstrip('/')).exists(), p
    locs[mm.group(1)] = p
m['apparel-clothing-tag-printing-guide'] = {'product': 'premium-greeting-cards', 'locs': locs}
assert len(m) == 19, len(m)

entries = []
for slug in sorted(m.keys()):
    L = m[slug]['locs']
    entries.append("  '%s': { 'zh-hk': '%s', en: '%s', ja: '%s' }," % (slug, L['zh-hk'], L['en'], L['ja']))
block = '\n  // 2026-10-12 Batch B: 19 篇无 M3 图 blog → 最近 SKU per-locale 首图 (K3 拍板; 消费点经 getBlogImage 按 locale 解析)\n' + '\n'.join(entries) + '\n'

# 改类型 + 插条目 + 加 helper
old_sig = "export const blogM3Images: Record<string, string> = {"
new_sig = "export const blogM3Images: Record<string, string | Record<string, string>> = {"
assert t.count(old_sig) == 1
t = t.replace(old_sig, new_sig)
old_tail = "  'print-specifications-reference-guide-2026': '/images/blog-m3/print-specifications-reference-guide-2026.webp',\n};"
assert t.count(old_tail) == 1
t = t.replace(old_tail, "  'print-specifications-reference-guide-2026': '/images/blog-m3/print-specifications-reference-guide-2026.webp',\n" + block + "};")

helper = """
/**
 * 2026-10-12 Batch B: 统一解析 (K3「最接近 SKU 首图」拍板落地)
 * 值 = string → 三语同图 (M3 旧 89 条); 值 = Record<locale,string> → 按 locale 取 SKU 首图, 缺省回落 zh-hk。
 * 全部 6 消费点 (Header 下拉 / blog 列表 / 详情 hero / 首页印刷知識 / nav / JSON-LD / og) 必经此口。
 */
export function getBlogImage(slug: string, locale: string): string {
  const v = blogM3Images[slug];
  if (!v) return '';
  if (typeof v === 'string') return v;
  return v[locale] || v['zh-hk'] || '';
}
"""
t = t.rstrip() + '\n' + helper
io.open(mpath, 'w', encoding='utf-8', newline='\n').write(t)
print('blog-m3-images.ts: 19 entries + helper written; total keys =', t.count("': '/images/blog-m3/") + 19)
