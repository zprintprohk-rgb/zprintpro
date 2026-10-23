# -*- coding: utf-8 -*-
# list ALL record-level keys in skuMoneyFAQs with line numbers + check for lookalikes
import io, sys, re, unicodedata
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
txt = open(r'F:\zprintpro-nextjs\src\data\product-faqs.ts', encoding='utf-8').read()
lines = txt.split('\n')
start = next(i for i, l in enumerate(lines) if 'export const skuMoneyFAQs' in l)
print('record starts L' + str(start + 1))
keys = []
for i in range(start, len(lines)):
    m = re.match(r"^  '([a-z0-9-]+)': \[", lines[i])
    if m:
        keys.append((i + 1, m.group(1)))
for ln, k in keys:
    print(f'L{ln}: {k}')
print('total 2-space keys:', len(keys))
dups = [k for k in set(k for _, k in keys) if sum(1 for _, x in keys if x == k) > 1]
print('DUPLICATES:', dups)
# scan for non-ASCII lookalike quotes around textbooks/certificates
for i, l in enumerate(lines):
    if 'textbooks' in l or 'certificates' in l:
        print(f'raw L{i+1}:', repr(l[:60]))
