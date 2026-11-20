import io, sys, re, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
t = open(r'F:\zprintpro-nextjs\src\data\sku-seo-data.ts', encoding='utf-8').read()
# 定位 saddle-stitch-booklets 块
i = t.find('saddle-stitch-booklets')
if i < 0:
    print('saddle slug 未找到')
else:
    seg = t[i:i+6000]
    for loc in ['en', 'ja', 'zh-hk']:
        j = seg.find(f'"{loc}":')
        if j >= 0:
            # 在该 locale 块里找 h1
            h1m = re.search(r'"h1":\s*"((?:[^"\\]|\\.)*)"', seg[j:j+1500])
            print(f'saddle {loc} h1 = {h1m.group(1)[:70] if h1m else "?"}')
