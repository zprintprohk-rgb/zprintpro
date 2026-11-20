# -*- coding: utf-8 -*-
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
t = open(r'F:\zprintpro-nextjs\src\data\category-seo-content.ts', encoding='utf-8').read()

# 找 flyers 类目块
i = t.find("'flyers':")
print('flyers block at', i)
if i > 0:
    seg = t[i:i+6000]
    # 提取 locale 块的 description
    for loc in ['zh-hk', 'en', 'ja']:
        m = re.search(r"'%s':\s*\{(?P<b>[\s\S]*?)\n\s*\},\n" % loc, seg)
        if m:
            b = m.group('b')
            print(f'--- {loc} ---')
            for f in ['seoTitle', 'description', 'featuredSnippet']:
                mm = re.search(re.escape(f) + r":\s*'((?:[^'\\]|\\.)*)'", b)
                if mm:
                    v = mm.group(1)
                    print(f'  {f}: {v[:200]}')
        else:
            print(f'--- {loc}: block not found ---')

# 全文件搜 flyers 类目的价格串 (0.18 / 0.06 / 10 等可疑)
print('\n=== flyers 块内价格 token ===')
if i > 0:
    seg = t[i:i+8000]
    for m in re.finditer(r"(HK\$\s?[\d.]+|US\$\s?[\d.]+|¥\s?[\d.,]+|\$\s?[\d.]+)", seg):
        ctx = seg[max(0, m.start()-30):m.end()+20].replace('\n', ' ')
        print(f'  {m.group(1)} :: ...{ctx}...')
