# -*- coding: utf-8 -*-
import io, sys, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
p = 'F:/zprintpro-nextjs/src/data/blog-data/en.json'
raw = open(p, encoding='utf-8').read()
old = 'campaigns and small-batch restocking for cross-border sellers.'
# 字面反斜杠+引号: Python 源内写 \\\" (2 backslash + quote) -> 字面 \"
new = 'campaigns and <a href=\\\"/en/product/small-batch-stickers/\\\">small-batch restocking for cross-border sellers</a>.'
print('new 原始 repr:', repr(new))
assert raw.count(old) == 1, 'old 出现次数 != 1'
raw2 = raw.replace(old, new)
data = json.loads(raw2)
c = data['sticker-guide']['content']
print('JSON 有效 OK | 锚存在:', '/en/product/small-batch-stickers/' in c)
i = c.find('small-batch restocking')
print('落位片段:', c[i-30:i+70])
