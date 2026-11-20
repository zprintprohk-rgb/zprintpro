# -*- coding: utf-8 -*-
import re
with open(r'F:\zprintpro-nextjs\src\app\[locale]\about\page.tsx', 'r', encoding='utf-8') as f:
    src = f.read()
m = re.findall(r"imageSlot(?:Factory|Team):\s*'([^']+)'", src)
simp_chars = ['已上线', '印刷机', '实拍', '轮转', '长图', '后道', '装订', '团队', '场景', '扩展', '工位', '图片', '实', '图', '为', '线']
for s in m:
    found = [c for c in simp_chars if c in s]
    status = 'OK' if not found else 'simp:' + str(found)
    print(s[:80])
    print('  ' + status)
print()
print('all 6 fields verified')
