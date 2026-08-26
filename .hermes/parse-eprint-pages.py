import re, json

for name in ['products_brochure_booklet_leaflet_printing', 'products_Saddle_Stitching_Booklet']:
    h = open(f'.hermes/tmp-eprint-{name}.html', encoding='utf-8', errors='ignore').read()
    t = re.search(r'<title>(.*?)</title>', h, re.S)
    print('=====', name, '| TITLE:', t.group(1).strip() if t else None, '| len', len(h))
    # 价表痕迹
    hits = re.findall(r'\$[\d,]+(?:\.\d+)?(?:\s*/\s*[\d,]+\s*[張本個])?', h)
    print('price-like:', hits[:20])
    # 数量档痕迹
    qtys = re.findall(r'[\d,]{3,}\s*[張本]', h)[:15]
    print('qty-like:', qtys)
    # nuxt data?
    m = re.search(r'__NUXT__|application/json', h)
    print('nuxt/json:', bool(m))
