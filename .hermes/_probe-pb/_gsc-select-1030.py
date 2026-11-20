# -*- coding: utf-8 -*-
"""GSC 28d 选文: 从 10-29 导出 xlsx (网页 sheet) 提取 6 个候选 slug 的 imps/pos/clk (双方法复算之一)"""
import openpyxl, io, sys, glob, os
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

cands = ['school-exercise-book-printing-guide', 'hong-kong-printing-cost-baseline-2026',
         'campus-education-printing-pillar-guide', 'print-specifications-reference-guide-2026',
         'poster-printing-guide', 'packaging-box-pricing-2026', 'calendar-printing-guide',
         '2027-monthly-calendar-printing-timetable', 'hong-kong-printing-guide']

path = glob.glob('GSC数据/28天三站点汇总数据*2026-10-29.xlsx')[0]
wb = openpyxl.load_workbook(path, read_only=True, data_only=True)
# 找网页 sheet (sheet index 2 昨天验证过; 按名字兜底)
ws = None
for name in wb.sheetnames:
    if '网页' in name or 'Pages' in name or 'ページ' in name:
        ws = wb[name]; break
if ws is None:
    ws = wb.worksheets[2]
rows = list(ws.iter_rows(values_only=True))
hdr = rows[0]
print('sheet=%s cols=%d' % (ws.title, len(hdr)))
# 列索引: 找 网页/URL, 展示次数, 点击次数, 平均排名
idx_url, idx_clk, idx_imp, idx_pos = 0, 1, 2, 4

agg = {}
for r in rows[1:]:
    url = str(r[idx_url] or '')
    if '/blog/' not in url:
        continue
    imp = float(r[idx_imp] or 0)
    clk = float(r[idx_clk] or 0)
    pos = float(r[idx_pos] or 0)
    for c in cands:
        if c in url:
            agg.setdefault(c, []).append((url, imp, pos, clk))

for c in cands:
    if c not in agg:
        print('%s: (不在 28d 数据)' % c)
        continue
    total = sum(x[1] for x in agg[c])
    best = max(agg[c], key=lambda x: x[1])
    print('%s | total_imp=%.0f | 最高单页 %s imp=%.0f pos=%.2f clk=%.0f' % (c, total, best[0], best[1], best[2], best[3]))
    for x in sorted(agg[c], key=lambda x: -x[1]):
        print('    %s imp=%.0f pos=%.2f clk=%.0f' % (x[0], x[1], x[2], x[3]))
