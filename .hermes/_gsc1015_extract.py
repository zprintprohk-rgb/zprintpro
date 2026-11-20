# -*- coding: utf-8 -*-
"""Extract query-level tables from today's GSC exports + word matrix vs strategy baselines."""
import glob, io, json, re, sys
import openpyxl

ROOT = r"F:\zprintpro-nextjs\GSC数据"

def sheets(path):
    wb = openpyxl.load_workbook(path, read_only=True)
    return wb.sheetnames

def read_sheet(path, sheet_hint):
    wb = openpyxl.load_workbook(path, read_only=True, data_only=True)
    name = sheet_hint if sheet_hint in wb.sheetnames else wb.sheetnames[-1]
    ws = wb[name]
    rows = []
    for r in ws.iter_rows(values_only=True):
        if r and any(c is not None and str(c) != '' for c in r):
            rows.append([c for c in r])
    wb.close()
    return name, rows

files = {
    'hk24': '香港站点24小时数据zprintpro.com-Performance-on-Search-2026-10-15.xlsx',
    'jp24': '日本站点24小时数据zprintpro.com-Performance-on-Search-2026-10-15.xlsx',
    'us24': '美国站点24小时数据zprintpro.com-Performance-on-Search-2026-10-15.xlsx',
    'hk28': '香港站点28天数据zprintpro.com-Performance-on-Search-2026-10-15.xlsx',
    'jp28': '日本站点28天数据zprintpro.com-Performance-on-Search-2026-10-15.xlsx',
    'us28': '美国站点28天数据zprintpro.com-Performance-on-Search-2026-10-15.xlsx',
}

print("=== sheet names ===")
for k, f in files.items():
    print(k, sheets(ROOT + "\\" + f))

def rows_to_queries(rows):
    """Find header row (查询/网页/点击/展示...) then parse query rows."""
    out = []
    hdr_i = None
    for i, r in enumerate(rows):
        joined = "|".join(str(c) for c in r)
        if ('查询' in joined or 'Query' in joined) and ('点击' in joined or 'Click' in joined or '展示' in joined or 'Impression' in joined):
            hdr_i = i
            break
    if hdr_i is None:
        return out
    hdr = [str(c) if c is not None else '' for c in rows[hdr_i]]
    for r in rows[hdr_i + 1:]:
        if not r or r[0] in (None, ''):
            continue
        q = str(r[0]).strip()
        if q.startswith('#') or q == '':
            continue
        try:
            clicks = float(r[1] or 0)
            imps = float(r[2] or 0)
        except Exception:
            continue
        ctr = r[3]
        pos = r[4]
        out.append({'q': q, 'clicks': clicks, 'imps': imps,
                    'pos': float(pos) if isinstance(pos, (int, float)) else None})
    return out

result = {}
for k, f in files.items():
    sheet, rows = read_sheet(ROOT + "\\" + f, '查询数')
    qs = rows_to_queries(rows)
    result[k] = {'sheet': sheet, 'n': len(qs), 'queries': qs}
    print("\n%s -> sheet '%s': %d query rows" % (k, sheet, len(qs)))

io.open(r"F:\zprintpro-nextjs\.hermes\_gsc1015_queries.json", "w", encoding="utf-8").write(
    json.dumps(result, ensure_ascii=False))
print("\nsaved -> .hermes/_gsc1015_queries.json")
