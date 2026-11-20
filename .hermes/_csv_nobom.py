# -*- coding: utf-8 -*-
# CSV 重写为无 BOM UTF-8 (修复生成器列名识别)
import io, sys, csv
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
csvp = r'F:\zprintpro-nextjs\zprintpro-sku-seo-data.csv'
rows = list(csv.DictReader(open(csvp, encoding='utf-8-sig'), delimiter='\t'))
# 确认列名无 \ufeff
first = list(rows[0].keys())[0]
print('首列名 repr:', repr(first))
with open(csvp, 'w', encoding='utf-8', newline='') as f:
    w = csv.DictWriter(f, fieldnames=list(rows[0].keys()), delimiter='\t')
    w.writeheader()
    w.writerows(rows)
fs = open(csvp, 'rb').read(3)
print('写入后前3字节:', fs)
print('done')
