# -*- coding: utf-8 -*-
"""ja 段3修复: 将 2 个陈述式 H2 转问句 (后加工/纳期), 关键词保留"""
import json, io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

path = 'src/data/blog-data/ja.json'
raw = open(path, encoding='utf-8').read()
has_nl = raw.endswith('\n')
base = raw[:-1] if has_nl else raw
obj = json.loads(raw)
redump = json.dumps(obj, ensure_ascii=False, indent=2)
assert base == redump, 'fidelity mismatch'
c = obj['roll-up-banner-printing-guide']['content']

repls = [
    ('<h2>後加工と付属品：必要な場面</h2>', '<h2>後加工と付属品はどんな場面で必要？</h2>'),
    ('<h2>ご発注の流れと納期</h2>', '<h2>ご発注の流れと納期は？</h2>'),
]
for old, new in repls:
    if old not in c:
        print('NOT FOUND: %s' % old)
        sys.exit(1)
    c = c.replace(old, new)

obj['roll-up-banner-printing-guide']['content'] = c
out = json.dumps(obj, ensure_ascii=False, indent=2) + ('\n' if has_nl else '')
with open(path, 'w', encoding='utf-8', newline='\n') as f:
    f.write(out)
print('ja H2 问句化完成')
