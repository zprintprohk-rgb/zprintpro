# -*- coding: utf-8 -*-
# E1 应用脚本: sticker-guide -> /en/product/small-batch-stickers/ 无风险内链
# 用法: 窗口(双条件② 满 15min) 后运行; 内嵌 JSON 有效性验证; 零新增文案
import io, sys, json, shutil, os
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

p = r'F:\zprintpro-nextjs\src\data\blog-data\en.json'
raw = open(p, encoding='utf-8').read()

# 备份 (回滚用, 符合 §0.23 数据诚信)
bak = r'F:\zprintpro-nextjs\.hermes\_bak-blogdata-en-before-e1-20261027.json'
shutil.copy2(p, bak)
print('备份:', bak)

old = 'campaigns and small-batch restocking for cross-border sellers.'
# 目标文件为 JSON, content 内 HTML 链接用 \" 转义引号; new 须含字面 \" (反斜杠+引号)
# Python 单引号串内 \\\" -> 字面 \"  (反斜杠+引号 两个字符)
new = 'campaigns and <a href=\\\"/en/product/small-batch-stickers/\\\">small-batch restocking for cross-border sellers</a>.'

n = raw.count(old)
assert n == 1, f'old 出现 {n} 次 (应为 1)'

raw2 = raw.replace(old, new)
data = json.loads(raw2)  # JSON 有效性三重门
c = data['sticker-guide']['content']
assert '/en/product/small-batch-stickers/' in c, '锚 URL 未注入'
assert 'cross-border sellers</a>.' in c, '锚闭合缺失'

# 校验既有结构未破坏
h2_before = raw.count('<h2')
h2_after = raw2.count('<h2')
assert h2_before == h2_after, f'H2 数变化 {h2_before}->{h2_after}'

# 双方法: 先写临时文件再原子替换
tmp = p + '.e1tmp'
with open(tmp, 'w', encoding='utf-8', newline='\n') as f:
    f.write(raw2)
# 验证临时文件可解析
json.load(open(tmp, encoding='utf-8'))
os.replace(tmp, p)
print('E1 落位成功 (JSON 有效 + 锚注入 + H2 结构保持 + 备份已存)')
