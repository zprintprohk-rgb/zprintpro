# -*- coding: utf-8 -*-
"""GSC 28d 导出 sheet 结构体检: 是否含 查询/国家/设备 维度"""
import openpyxl, glob, io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

files = sorted(glob.glob('GSC数据/*2026-10-30*.xlsx'))
for f in files:
    try:
        wb = openpyxl.load_workbook(f, read_only=True, data_only=True)
    except Exception as ex:
        print(f, 'ERR', ex); continue
    print('==', f)
    for i, ws in enumerate(wb.worksheets):
        rows = ws.max_row or 0
        hdr = []
        try:
            hdr = [c for c in next(ws.iter_rows(min_row=1, max_row=1, values_only=True))]
        except Exception:
            pass
        print('  sheet[%d] name=%r rows=%s cols=%s' % (i, ws.title, rows, len(hdr)))
