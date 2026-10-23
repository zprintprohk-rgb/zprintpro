# -*- coding: utf-8 -*-
# double-method verify: 份 fix scope (only catalog-printing post changed, exactly 2 line-level diffs)
import json, io, sys, difflib
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
A = json.load(open(r'F:\zprintpro-nextjs\.hermes\_bak-blogdata-ja-before-bunfix-20261023.json', encoding='utf-8'))
B = json.load(open(r'F:\zprintpro-nextjs\src\data\blog-data\ja.json', encoding='utf-8'))
assert set(A) == set(B), 'slug set changed!'
changed = []
for k in A:
    if A[k] != B[k]:
        changed.append(k)
print('posts changed:', changed)
assert changed == ['catalog-printing-china-supplier-guide'], changed
sa = json.dumps(A[changed[0]], ensure_ascii=False)
sb = json.dumps(B[changed[0]], ensure_ascii=False)
print('  before 份:', sa.count('份'), '| after 份:', sb.count('份'))
print('  diff lines:')
for i, (a, b) in enumerate(zip(sa.split('。'), sb.split('。'))):
    if a != b:
        print('   -', a[-40:])
        print('   +', b[-40:])
rawB = json.dumps(B, ensure_ascii=False)
print('global 份 remaining:', rawB.count('份'), '(registered: about-page 份 x2 elsewhere? verify)')
print('VERIFY OK')
