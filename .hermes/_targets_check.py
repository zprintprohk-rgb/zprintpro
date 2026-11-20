# -*- coding: utf-8 -*-
import io, re
pt = io.open('src/data/products.ts', encoding='utf-8').read()
for s in ['wedding-invitations','place-cards','paper-bags','greeting-cards','fruit-food-label-stickers']:
    print(s, '->', 'PRODUCT' if re.search(r"slug: '%s'[,\n]" % s, pt) else 'MISSING')
# variables 消费者
for f in ['src/lib/price-injector.ts','src/components/quote/QuoteCalculator.tsx','src/components/quote/QuantityTierInteractive.tsx']:
    try:
        c = io.open(f, encoding='utf-8').read()
        uses = [l.strip()[:90] for l in c.split('\n') if 'variables' in l][:4]
        print(f, '=>', uses if uses else 'no variables ref')
    except FileNotFoundError:
        print(f, 'MISSING FILE')
