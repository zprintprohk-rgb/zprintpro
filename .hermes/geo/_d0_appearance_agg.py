# D0: aggregate 搜索结果呈现 across the 3 single-site 28d files (plan basis) — verify "zero image pack" claim
import json, os
import openpyxl
BASE = r'GSC数据'
SITES = {'zh-hk': '香港站点28天数据zprintpro.com-Performance-on-Search-2026-10-15.xlsx',
         'en': '美国站点28天数据zprintpro.com-Performance-on-Search-2026-10-15.xlsx',
         'ja': '日本站点28天数据zprintpro.com-Performance-on-Search-2026-10-15.xlsx'}
agg = {}
per = {}
for loc, f in SITES.items():
    wb = openpyxl.load_workbook(os.path.join(BASE, f), read_only=True, data_only=True)
    target = next((n for n in wb.sheetnames if '搜索结果呈现' in n or '呈現' in n), None)
    rows = list(wb[target].iter_rows(values_only=True)) if target else []
    d = {}
    for r in rows[1:]:
        if r[0] is None: continue
        name = str(r[0]).strip()
        try: imp = int(float(r[2])) if r[2] is not None else 0
        except Exception: imp = 0
        try: clk = int(float(r[1])) if r[1] is not None else 0
        except Exception: clk = 0
        d[name] = [imp, clk]
        a = agg.setdefault(name, [0, 0]); a[0] += imp; a[1] += clk
    per[loc] = {'sheet': target, 'rows': d}
    wb.close()
out = {'aggregated_3site': {k: {'imps': v[0], 'clicks': v[1]} for k, v in agg.items()},
       'per_site': per,
       'plan_claim': {'产品摘要': 5861, '评价摘要': 1, '商家信息': 2, 'zero_image_pack': True},
       'verify': {'产品摘要_match': agg.get('产品摘要', [0])[0] == 5861,
                  'image_rows_present': [k for k in agg if '图片' in k or 'image' in k.lower()]}}
with open(r'.hermes/geo/v28_5-appearance-verify.json', 'w', encoding='utf-8') as fp:
    json.dump(out, fp, ensure_ascii=False, indent=1)
print('AGG=' + json.dumps({k: v for k, v in out['aggregated_3site'].items()}, ensure_ascii=False))
print('VERIFY=' + json.dumps(out['verify'], ensure_ascii=False))
print('IMAGE_ROWS=' + json.dumps(out['verify']['image_rows_present'], ensure_ascii=False))
