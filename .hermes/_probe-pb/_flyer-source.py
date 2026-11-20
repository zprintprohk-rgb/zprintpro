# -*- coding: utf-8 -*-
"""flyer zh: 补 数据来源 行 (段5 WARN -> PASS)"""
import json, io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

path = 'src/data/blog-data/zh-hk.json'
raw = open(path, encoding='utf-8').read()
has_nl = raw.endswith('\n')
obj = json.loads(raw)
assert (raw[:-1] if has_nl else raw) == json.dumps(obj, ensure_ascii=False, indent=2), 'fid'
e = obj['flyer-printing-guide']
c = e['content']
line = ('<p class="text-sm text-gray-500 mt-6">📊 數據來源：智印港 A4／A5 傳單產品頁（products.ts SKU：'
        'a5-flyers／a4-flyers／double-sided-flyers）價格、數量階梯與加工參數口徑 2026-08；'
        '查詢基線 per GSC 28d 2026-10-30 檔（宣傳單張／宣傳單張印刷）。</p>')
if '數據來源' in c:
    print('already has source marker')
else:
    c = c.rstrip() + '\n' + line
    e['content'] = c
    out = json.dumps(obj, ensure_ascii=False, indent=2) + ('\n' if has_nl else '')
    open(path, 'w', encoding='utf-8', newline='\n').write(out)
    print('source line added, len=%d' % len(c))
