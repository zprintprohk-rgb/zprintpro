# -*- coding: utf-8 -*-
import io, re
t = io.open('src/data/category-seo-content.ts', encoding='utf-8').read()
j = t.find('const redPacketsContent')
# 字符串感知的括号配对找块尾
depth = 0
i = t.index('{', j)
instr = False
esc = False
k = i
while k < len(t):
    c = t[k]
    if instr:
        if esc:
            esc = False
        elif c == '\\':
            esc = True
        elif c == "'":
            instr = False
    else:
        if c == "'":
            instr = True
        elif c == '{':
            depth += 1
        elif c == '}':
            depth -= 1
            if depth == 0:
                break
    k += 1
print('block span: %d..%d (len %d)' % (j, k, k - j))
block = t[j:k+2]
io.open('.hermes/_rp_block_orig.txt', 'w', encoding='utf-8').write(block)
# 字段清单
print('fields:', re.findall(r'^(\s{4})(\w+):', block, re.M)[:40])
print('locale keys:', re.findall(r"^\s{2}'(zh-hk|en|ja)':", block, re.M))
# 每个 locale 的子字段
for loc in ('zh-hk', 'en', 'ja'):
    m = re.search(r"^\s{2}'%s': \{(.*?)^\s{2}\}," % loc, block, re.M | re.DOTALL)
    if m:
        print(loc, 'subfields:', re.findall(r'^\s{4}(\w+):', m.group(1), re.M))
        print(loc, 'paragraphs count:', m.group(1).count('paragraphs:'))
