# -*- coding: utf-8 -*-
"""flyer zh: 移除数据来源行中的 GSC 后台表述 (§0.23.1)"""
import json, io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

path = 'src/data/blog-data/zh-hk.json'
raw = open(path, encoding='utf-8').read()
has_nl = raw.endswith('\n')
obj = json.loads(raw)
assert (raw[:-1] if has_nl else raw) == json.dumps(obj, ensure_ascii=False, indent=2), 'fid'
e = obj['flyer-printing-guide']
c = e['content']
old = '；查詢基線 per GSC 28d 2026-10-30 檔（宣傳單張／宣傳單張印刷）。</p>'
new = '。</p>'
assert old in c, 'GSC segment not found'
c = c.replace(old, new, 1)
e['content'] = c
out = json.dumps(obj, ensure_ascii=False, indent=2) + ('\n' if has_nl else '')
open(path, 'w', encoding='utf-8', newline='\n').write(out)
print('GSC mention removed, len=%d' % len(c))
