# -*- coding: utf-8 -*-
# ja 份 x2 fix: catalog-printing-china-supplier-guide measure word 份 -> 部 (pure MT residue)
import json, shutil, io, sys, os
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
SRC = r'F:\zprintpro-nextjs\src\data\blog-data\ja.json'
BAK = r'F:\zprintpro-nextjs\.hermes\_bak-blogdata-ja-before-bunfix-20261023.json'
shutil.copyfile(SRC, BAK)
d = json.load(open(SRC, encoding='utf-8'))
post = d['catalog-printing-china-supplier-guide']
raw_before = json.dumps(d, ensure_ascii=False)
n_before = raw_before.count('1 份')
print('before: 1 份 =', n_before)

def walk(o):
    if isinstance(o, dict):
        for v in o.values(): walk(v)
    elif isinstance(o, list):
        for v in o: walk(v)
    elif isinstance(o, str) and '1 份' in o:
        idx = id(o)
        # rebuild: find parent is complex; instead use json round-trip below
walk(post)

# simplest robust method: textual replace on serialized JSON with assertion of exact count
s = open(SRC, encoding='utf-8').read()
assert s.count('1 份') == 2, s.count('1 份')
s2 = s.replace('1 份', '1 部')
open(SRC, 'w', encoding='utf-8', newline='\n').write(s2)

# verify parse + counts
d2 = json.load(open(SRC, encoding='utf-8'))
raw_after = json.dumps(d2, ensure_ascii=False)
print('after: 1 份 =', raw_after.count('1 份'), '| 1 部 =', raw_after.count('1 部'))
assert raw_after.count('1 份') == 0 and raw_after.count('1 部') == 2
assert len(d2) == len(d) == 102
print('BUN FIX OK (backup at ' + BAK + ')')
