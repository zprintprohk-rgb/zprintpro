import re

h = open('.hermes/tmp-eprint-products_brochure_booklet_leaflet_printing.html', encoding='utf-8', errors='ignore').read()
# 去掉标签拿文本流, 找 数量-价格 交替序列
text = re.sub(r'<[^>]+>', '|', h)
text = re.sub(r'\s+', ' ', text)
# 找含 $ 的段落窗口
idx = text.find('$315')
print(text[idx-600:idx+1500])
