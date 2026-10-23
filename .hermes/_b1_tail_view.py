# -*- coding: utf-8 -*-
# locate end of skuMoneyFAQs record for insertion
import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
pf = open(r'F:\zprintpro-nextjs\src\data\product-faqs.ts', encoding='utf-8').read()
start = pf.find('export const skuMoneyFAQs')
end = pf.find('\n};', start)
print('record span:', start, '->', end)
print('---- last 800 chars before close ----')
print(pf[end-800:end+8])
# also next export after end
nxt = pf.find('export const', end)
print('---- next export ----')
print(pf[end:nxt][:300])
