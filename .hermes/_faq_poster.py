# -*- coding: utf-8 -*-
# 1. skuMoneyFAQs coverage for a2/a1 posters + paper-bag SKUs
# 2. poster-size blog price mentions
import io, sys, re, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

f = open(r'F:\zprintpro-nextjs\src\data\product-faqs.ts', encoding='utf-8').read()
# find skuMoneyFAQs dict structure
i = f.find('skuMoneyFAQs')
print('skuMoneyFAQs at', i)
# print keys: search for slug-key pattern near it
keys = re.findall(r'^\s{2,8}([a-z0-9-]+):\s*\{', f[i:i+40000], re.M)
print('skuMoneyFAQs keys sample:', sorted(set(keys))[:60])
print('count:', len(set(keys)))
for target in ['a2-posters', 'a1-posters', 'kraft-paper-bags', 'white-card-bags', 'gift-bags']:
    j = f.find(target + ': {')
    print('==', target, 'covered:', j >= 0)
    if j >= 0:
        seg = f[j:j+1500]
        for m in re.finditer(r"(q|a):\s*'((?:[^'\\]|\\.)*)'", seg):
            print('   ', m.group(1), ':', m.group(2)[:110])
        print()
print('=== blog poster prices ===')
for loc in ['zh-hk', 'en', 'ja']:
    try:
        d = json.load(open(rf'F:\zprintpro-nextjs\src\data\blog-data\{loc}.json', encoding='utf-8'))
        for slug, post in d.items():
            if 'poster' in slug:
                s = json.dumps(post, ensure_ascii=False)
                prices = re.findall(r'(HK\$|US\$|¥|\$)[0-9][0-9,\.]*', s)
                print(loc, slug, 'price-tokens:', prices[:12])
    except Exception as e:
        print(loc, 'err', e)
