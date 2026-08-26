import re

h = open('.hermes/tmp-eprint-products_brochure_booklet_leaflet_printing.html', encoding='utf-8', errors='ignore').read()
text = re.sub(r'<[^>]+>', '|', h)
text = re.sub(r'\s+', ' ', text)
# 第二个 A5 表 (157g) 完整内容
p = text.find('157g光粉紙||')
print(text[p:p+900])
