import re

h = open('.hermes/tmp-eprint-products_brochure_booklet_leaflet_printing.html', encoding='utf-8', errors='ignore').read()
text = re.sub(r'<[^>]+>', '|', h)
text = re.sub(r'\s+', ' ', text)

# 找所有 157g 相关的 A4/A5 表
for m in re.finditer(r'157g[^|]*\|', text):
    s = m.start()
    seg = text[s:s+120]
    print(repr(seg))
print('======')
# 第二个 A4 表 (157g) — 找 "|A4||" 出现位置
positions = [m.start() for m in re.finditer(r'\|\|A4\|\|', text)]
print('A4 tables at:', positions)
for p in positions:
    print('---', text[p:p+700])
