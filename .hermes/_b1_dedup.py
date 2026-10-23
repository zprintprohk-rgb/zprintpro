# -*- coding: utf-8 -*-
# B1 dedup: remove my duplicate 'textbooks' + 'certificates' blocks (pre-existing unquoted versions win)
import re, io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
SRC = r'F:\zprintpro-nextjs\src\data\product-faqs.ts'
raw = open(SRC, encoding='utf-8', newline='').read()

blocks = {
 'textbooks': raw[raw.find("  'textbooks': ["):raw.find("  'exercise-books': [")],
 'certificates': raw[raw.find("  'certificates': ["):raw.find("  'perfect-bound-books': [")],
}
for k, b in blocks.items():
    n = raw.count(b)
    assert n == 1, f'{k} block count {n}'
    raw = raw.replace(b, '')
    print(f'removed my duplicate {k}: {len(b)} chars')

open(SRC, 'w', encoding='utf-8', newline='').write(raw)

# verify
after = open(SRC, encoding='utf-8').read()
assert after.count("  'textbooks': [") == 0 and after.count('  textbooks: [') == 1
assert after.count("  'certificates': [") == 0 and after.count('  certificates: [') == 1
for k in ['exercise-books','perfect-bound-books','foil-greeting-cards','roll-up-banners','business-envelopes']:
    assert after.count(f"  '{k}': [") == 1, k
keys = re.findall(r"^  (?:'([a-z0-9-]+)'|([a-z0-9-]+)): \[", after[after.find('export const skuMoneyFAQs'):], re.M)
names = [a or b for a, b in keys]
print('total keys now:', len(names), '| unique:', len(set(names)))
assert len(names) == len(set(names)) == 36
print('DEDUP OK')
