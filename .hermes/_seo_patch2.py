# -*- coding: utf-8 -*-
# seo.ts patch: posters desc MOQ truth (A2 10張起印 / A1 1張起印) + ja descs 校正 2時間->4時間
import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
P = r'F:\zprintpro-nextjs\src\lib\seo.ts'
t = open(P, encoding='utf-8').read()

# 1) ja descs 校正 time alignment (design proof: zh canonical 4小時)
old_ja = '無料デザイン校正 2 時間'
n_ja = t.count(old_ja)
print('ja 2時間 occurrences:', n_ja)
if n_ja >= 1:
    t = t.replace(old_ja, '無料デザイン校正 4 時間')
    print('-> aligned to 4 時間')

# 2) posters desc MOQ
zh_old = '海報印刷 1 張起印，A2 HK$9 起/張、A1 HK$45 起/張。'
zh_new = '海報印刷 A2 10 張起印 HK$9 起/張、A1 1 張起印 HK$45 起/張。'
n = t.count(zh_old)
print('zh posters desc:', n)
assert n == 1
t = t.replace(zh_old, zh_new)

en_old = 'Poster printing from $2.30 (A2 157g), 1 MOQ; A1 from $4.60. Waterproof + mounting for exhibitions & events. DHL 2-4 day USA delivery, free shipping $99+.'
en_new = 'Poster printing: A2 157g from $2.30 (10 MOQ), A1 PP from $4.60 (1 MOQ). Waterproof + mounting for events. DHL 2-4 day USA delivery, free shipping $99+.'
n = t.count(en_old)
print('en posters desc:', n, 'len new:', len(en_new))
assert n == 1 and len(en_new) <= 158
t = t.replace(en_old, en_new)

ja_old = 'ポスター印刷 1 枚から、A2 ¥300〜、A1 ¥600〜。'
ja_new = 'ポスター印刷 A2 10 枚〜 ¥300〜、A1 1 枚〜 ¥600〜。'
n = t.count(ja_old)
print('ja posters desc:', n)
assert n == 1
t = t.replace(ja_old, ja_new)

open(P, 'w', encoding='utf-8', newline='\n').write(t)
print('seo.ts patched')
# verify zh new desc length (for META_DESC_MAX)
import re
i = t.find("'posters': {")
j = t.find('descriptions:', i)
k = t.find('{', j)
d = 1; p = k
while p < len(t):
    c = t[p]
    if c == '{': d += 1
    elif c == '}':
        d -= 1
        if d == 0: break
    p += 1
block = t[k:p]
for loc in ["'zh-hk'", 'en', 'ja']:
    m = re.search(re.escape(loc) + r":\s*'((?:[^'\\]|\\.)*)'", block)
    if m:
        print(f'[{loc}] final len={len(m.group(1))}')
