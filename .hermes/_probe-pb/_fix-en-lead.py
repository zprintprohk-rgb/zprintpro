# -*- coding: utf-8 -*-
"""en 段1 收窄: 207 -> <=200 字 (保留 2026 + HK$ 价格锚点 + MOQ)"""
import json, io, re, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

NEW_LEAD = ('<p>Hong Kong printing prices 2026: flyers from <strong>HK$0.25/sheet</strong>, '
            'wall calendars from <strong>HK$3/book</strong>, kraft bags from <strong>HK$3/bag</strong> '
            '— every figure is a real HKD quote from the ZprintPro order system with its MOQ.</p>')

path = 'src/data/blog-data/en.json'
raw = open(path, encoding='utf-8').read()
has_nl = raw.endswith('\n')
obj = json.loads(raw)
assert (raw[:-1] if has_nl else raw) == json.dumps(obj, ensure_ascii=False, indent=2), 'fidelity mismatch'
c = obj['hong-kong-printing-cost-baseline-2026']['content']

# 找当前首段 <p>...</p> (内容最开头或紧随内容前部)
m = re.search(r'<p[^>]*>([\s\S]*?)</p>', c)
old_p = m.group(0)
stripped_len = len(re.sub(r'<[^>]+>', '', old_p))
print('old lead len=%d' % stripped_len)
c = c[:m.start()] + NEW_LEAD + c[m.end():]
new_len = len(re.sub(r'<[^>]+>', '', NEW_LEAD))
print('new lead len=%d' % new_len)
assert new_len <= 200, 'still >200!'
obj['hong-kong-printing-cost-baseline-2026']['content'] = c
out = json.dumps(obj, ensure_ascii=False, indent=2) + ('\n' if has_nl else '')
open(path, 'w', encoding='utf-8', newline='\n').write(out)
# 复验
c2 = json.load(open(path, encoding='utf-8'))['hong-kong-printing-cost-baseline-2026']['content']
assert len(c2) == len(c), 'redump mismatch'
print('en lead fixed, len=%d -> %d' % (len(c) - (len(c) - len(c2)), len(c2)))
