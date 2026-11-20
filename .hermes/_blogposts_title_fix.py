# -*- coding: utf-8 -*-
# blog-posts.ts 同步 5 个 title (与 blog-data JSON 对齐)
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
p = r'F:\zprintpro-nextjs\src\data\blog-posts.ts'
t = open(p, encoding='utf-8').read()

REPL = [
    # (slug, locale, 旧 title 串, 新 title 串)
    ('cny-2027-red-packet-printing-guide', 'ja',
     'ja: "2027年 ポチ袋印刷：箔押し 100 枚から HK$1.1 起 | ZprintPro"',
     'ja: "2027年 ポチ袋印刷：箔押し 100枚から ¥64 起 | ZprintPro"'),
    ('saddle-stitch-booklet-printing-guide', 'ja', None, None),  # 需先定位
    ('graduation-yearbook-printing-guide', 'zh-hk', None, None),
    ('poster-printing-guide', 'zh-hk', None, None),
    ('poster-printing-price-guide', 'zh-hk', None, None),
]
# 定位未知的 slug 块
for slug, loc, old, new in REPL:
    if old is not None:
        n = t.count(old)
        if n == 1:
            t = t.replace(old, new)
            print(f'OK {slug} {loc}: -> {new[:50]}')
        else:
            print(f'FAIL count={n} {slug} {loc}')
        continue
    # 定位 slug 块并打印 title 行
    m = re.search(r'(const \w+: BlogPostMeta = \{\n  slug: \'' + slug + r'\'[\s\S]*?\n  title: \{[\s\S]*?\n  \},)', t)
    if not m:
        print(f'BLOCK NOT FOUND {slug}')
        continue
    block = m.group(0)
    tm = re.search(r'\n\s+' + loc + r': "((?:[^"\\]|\\.)*)"', block)
    if tm:
        print(f'{slug} [{loc}] current: {tm.group(1)[:70]}')
open(p, 'w', encoding='utf-8').write(t)
