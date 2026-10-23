# -*- coding: utf-8 -*-
# guard-word zero-hit scan on newly added money-FAQ segment
import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
raw = open(r'F:\zprintpro-nextjs\src\data\product-faqs.ts', encoding='utf-8').read()
i = raw.find("'exercise-books': [")
new_seg = raw[i:]
words = ['業界最安', '激安', '最安値', 'ISO 9001', '15+ 年', '自設廠房', '國際頂級',
         '智印印港', 'Founded', '50,000+', 'SGS', '保證', '确保']
hits = 0
for w in words:
    c = new_seg.count(w)
    if c:
        print('HIT', w, c)
        hits += 1
print('guard-word scan: %d hit-family(ies), segment %d chars' % (hits, len(new_seg)))
print('PASS' if hits == 0 else 'FAIL')
