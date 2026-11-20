# -*- coding: utf-8 -*-
"""en 表格 CJK 清除 (I18N_POLLUTION_EN red x3) — 安全重写 + 校验"""
import json, io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

path = 'src/data/blog-data/en.json'
raw = open(path, encoding='utf-8').read()
has_nl = raw.endswith('\n')
obj = json.loads(raw)   # 先验证可解析
assert (raw[:-1] if has_nl else raw) == json.dumps(obj, ensure_ascii=False, indent=2), 'fidelity mismatch'
e = obj['school-exercise-book-printing-guide']
c = e['content']
c2 = c.replace('Wood-free (道林紙)', 'Wood-free').replace('道林紙', 'wood-free')
assert '道林紙' not in c2
e['content'] = c2
out = json.dumps(obj, ensure_ascii=False, indent=2) + ('\n' if has_nl else '')
open(path, 'w', encoding='utf-8', newline='\n').write(out)
c3 = json.load(open(path, encoding='utf-8'))['school-exercise-book-printing-guide']['content']
cjk = re.findall(r'[\u4e00-\u9fff]+', c3)
print('en content CJK residue:', cjk[:5], 'count=', len(cjk))
