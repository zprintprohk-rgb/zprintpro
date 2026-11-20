# D0: extract 查询数 (query) sheets from the 4 GSC 28d files -> per-query baseline for wave word-surface checks
import json, os
import openpyxl
BASE = r'GSC数据'
FILES = {'threesite': '28天三站点汇总数据zprintpro.com-Performance-on-Search-2026-10-15.xlsx',
         'zh-hk': '香港站点28天数据zprintpro.com-Performance-on-Search-2026-10-15.xlsx',
         'en': '美国站点28天数据zprintpro.com-Performance-on-Search-2026-10-15.xlsx',
         'ja': '日本站点28天数据zprintpro.com-Performance-on-Search-2026-10-15.xlsx'}
out = {'extracted_at': '2026-10-16', 'note': 'baseline for §5 词面硬约束 (基线 = 10-15 档逐词表); site-level query sheets (no queryxpage in this export)'}
for tag, f in FILES.items():
    wb = openpyxl.load_workbook(os.path.join(BASE, f), read_only=True, data_only=True)
    target = next((n for n in wb.sheetnames if '查询' in n or '查詢' in n or 'quer' in n.lower()), None)
    rows = list(wb[target].iter_rows(values_only=True)) if target else []
    qs = []
    for r in rows[1:]:
        if r and r[0] is not None:
            qs.append({'q': str(r[0]), 'clicks': r[1] if len(r) > 1 else None, 'imps': r[2] if len(r) > 2 else None})
    out[tag] = {'file': f, 'sheet': target, 'queries': qs}
    wb.close()
with open(r'.hermes/geo/v28_5-query-baseline-2026-10-15.json', 'w', encoding='utf-8') as fp:
    json.dump(out, fp, ensure_ascii=False)
print({k: (len(v['queries']) if isinstance(v, dict) and 'queries' in v else v) for k, v in out.items() if k != 'note'})
print('WROTE .hermes/geo/v28_5-query-baseline-2026-10-15.json')
