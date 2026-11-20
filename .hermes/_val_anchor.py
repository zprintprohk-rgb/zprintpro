import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
src = open(r'F:\zprintpro-nextjs\src\data\sku-seo-data.ts', encoding='utf-8').read()
# 三页 en body 提取
bodies = {}
for slug in ['saddle-stitch-booklets','exercise-books','catalog-printing']:
    m = re.search(r'\"' + slug + r'\"\s*:.*?\"en\":\s*\{.*?\"body\":\s*\"(.*?)\"\s*\}', src, re.S)
    if m:
        bodies[slug] = m.group(1)
# 检查 6 条内链 markdown 是否在 body 原文
checks = [
    ('saddle-stitch-booklets', '[perfect binding](/en/product/perfect-bound-books/)'),
    ('exercise-books', '[custom textbooks](/en/product/textbooks/)'),
    ('exercise-books', '[saddle stitch](/en/product/saddle-stitch-booklets/)'),
    ('catalog-printing', '[saddle stitch booklet](/en/product/saddle-stitch-booklets/)'),
    ('catalog-printing', '[perfect binding](/en/product/perfect-bound-books/)'),
    ('catalog-printing', '[china catalog printing](/en/blog/catalog-printing-china-supplier-guide/)'),
]
for slug, link in checks:
    ok = link in bodies.get(slug, '')
    print(('✅' if ok else '❌'), slug, '|', link[:50])
