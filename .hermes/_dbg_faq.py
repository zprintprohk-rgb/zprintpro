# -*- coding: utf-8 -*-
import io, re
src = io.open('.hermes/_faq7_add.py', encoding='utf-8').read()
# 截取 DATA 定义并 exec
i = src.index('DATA = {')
j = src.index('\ndef ts_entry')
ns = {}
exec(src[i:j], ns)
DATA = ns['DATA']
for slug, rows in DATA.items():
    r = rows[0]
    print(slug, 'len(rows)=', len(rows), 'tuple len', len(r))
    print('  r[3]:', r[3][:60])
    print('  has HK$ in r[3]:', 'HK$' in r[3])
    break
