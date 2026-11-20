# D0 v2: GSC 28d -> per-slug tiers. totals from 3-site file; per-locale from 3 single-site files (no double count)
import json, os, re, subprocess, sys
BASE = r'GSC数据'
F3 = '28天三站点汇总数据zprintpro.com-Performance-on-Search-2026-10-15.xlsx'
SITES = {'zh-hk': '香港站点28天数据zprintpro.com-Performance-on-Search-2026-10-15.xlsx',
         'en': '美国站点28天数据zprintpro.com-Performance-on-Search-2026-10-15.xlsx',
         'ja': '日本站点28天数据zprintpro.com-Performance-on-Search-2026-10-15.xlsx'}
try:
    import openpyxl  # noqa
except ImportError:
    subprocess.run([sys.executable, '-m', 'pip', 'install', 'openpyxl', '--quiet', '--disable-pip-version-check'], check=True)
    import openpyxl  # noqa

SLUG_RE = re.compile(r'/product/([a-z0-9-]+)/?', re.I)

def pick_sheet(wb, keys):
    for name in wb.sheetnames:
        for k in keys:
            if k in name:
                return name
    return None

def parse_pages(path):
    wb = openpyxl.load_workbook(path, read_only=True, data_only=True)
    target = pick_sheet(wb, ['网页', '頁面', '页面', 'Pages', 'pages'])
    info = {'sheets': wb.sheetnames, 'pages_sheet': target}
    if target is None:
        return None, info
    rows = list(wb[target].iter_rows(values_only=True))
    return rows, info

def cols_of(header):
    url_i = imp_i = clk_i = None
    for i, h in enumerate(header or []):
        if h is None: continue
        s = str(h)
        if url_i is None and ('网页' in s or '頁面' in s or '页面' in s or 'page' in s.lower() or 'url' in s.lower() or 'http' in s.lower()):
            url_i = i
        if imp_i is None and ('展示' in s or '曝光' in s or 'impression' in s.lower()):
            imp_i = i
        if clk_i is None and ('点击' in s or '點擊' in s or 'click' in s.lower()):
            clk_i = i
    return url_i, imp_i, clk_i

def collect(path):
    rows, info = parse_pages(path)
    if rows is None:
        return {}, info
    url_i, imp_i, clk_i = cols_of(rows[0])
    out = {}
    for r in rows[1:]:
        if url_i is None or r[url_i] is None: continue
        m = SLUG_RE.search(str(r[url_i]))
        if not m: continue
        try: imp = int(float(r[imp_i])) if imp_i is not None and r[imp_i] is not None else 0
        except Exception: imp = 0
        try: clk = int(float(r[clk_i])) if clk_i is not None and r[clk_i] is not None else 0
        except Exception: clk = 0
        d = out.setdefault(m.group(1), [0, 0]); d[0] += imp; d[1] += clk
    return out, info

res = {'source_files': {}}
tot3, info3 = collect(os.path.join(BASE, F3))
res['source_files']['threesite_28d'] = {'file': F3, **info3, 'slug_rows': len(tot3)}
per_loc = {}
for loc, f in SITES.items():
    d, info = collect(os.path.join(BASE, f))
    per_loc[loc] = d
    res['source_files'][loc + '_28d'] = {'file': f, **info, 'slug_rows': len(d)}

def tier(imp):
    if imp == 0: return 'zero'
    if imp < 5: return 'tail'
    if imp <= 100: return 'mid'
    return 'head'

per_slug = {}
for slug, d in tot3.items():
    zh = per_loc['zh-hk'].get(slug, [0, 0])[0]
    en = per_loc['en'].get(slug, [0, 0])[0]
    ja = per_loc['ja'].get(slug, [0, 0])[0]
    per_slug[slug] = {'imps': d[0], 'clicks': d[1], 'imps_zh': zh, 'imps_en': en, 'imps_ja': ja,
                      'per_site_sum': zh + en + ja, 'tier': tier(d[0])}
for loc, d in per_loc.items():
    for slug, v in d.items():
        if slug not in per_slug:
            per_slug[slug] = {'imps': 0, 'clicks': 0, 'imps_zh': 0, 'imps_en': 0, 'imps_ja': 0, 'per_site_sum': 0, 'tier': 'zero'}
            per_slug[slug]['imps_' + ('zh' if loc == 'zh-hk' else loc)] = v[0]
            per_slug[slug]['per_site_sum'] += v[0]
            per_slug[slug]['tier'] = tier(v[0])

res['per_slug'] = per_slug
counts = {'total_slugs': len(per_slug)}
for t in ('zero', 'tail', 'mid', 'head'):
    counts[t] = sum(1 for v in per_slug.values() if v['tier'] == t)
res['counts'] = counts
plan_top = {'a2-posters': 516, 'saddle-stitch-booklets': 331, 'doujinshi-printing': 242, 'custom-calendars': 205, 'handle-bags': 186, 'small-batch-stickers': 186, 'catalog-printing': 184, 'a1-posters': 178, 'food-boxes': 161, 'kraft-paper-packaging-box': 155}
res['crosscheck_top10'] = {s: {'plan': v, 'parsed': per_slug.get(s, {}).get('imps'), 'match': per_slug.get(s, {}).get('imps') == v} for s, v in plan_top.items()}
res['crosscheck_counts'] = {'plan': {'with_imps': 84, 'tail_lt5': 16, 'zero': 7}, 'parsed': counts}
# appearance sheet
p3 = os.path.join(BASE, F3)
wb = openpyxl.load_workbook(p3, read_only=True, data_only=True)
ap = pick_sheet(wb, ['搜索结果呈现', '呈現', 'appearance'])
if ap:
    rows = list(wb[ap].iter_rows(values_only=True))
    res['appearance_sheet'] = {'sheet': ap, 'rows': [[str(c) for c in r] for r in rows[:12]]}
res['extracted_at'] = '2026-10-16T12:4x+08:00'
res['method'] = 'totals=3-site 28d 网页 sheet; per-locale=3 single-site 28d 网页 sheets; no double counting'
out = r'.hermes/geo/v28_5-gsc-tiers.json'
with open(out, 'w', encoding='utf-8') as f:
    json.dump(res, f, ensure_ascii=False, indent=1)
print('WROTE', out)
print('COUNTS=' + json.dumps(counts))
print('TOP16=' + json.dumps(sorted(per_slug.items(), key=lambda kv: -kv[1]['imps'])[:16], ensure_ascii=False))
print('CROSSCHECK_TOP=' + json.dumps(res['crosscheck_top10'], ensure_ascii=False))
mism = {s: v for s, v in per_slug.items() if v['per_site_sum'] != v['imps']}
print('THREESITE_VS_SITES_MISMATCH=' + str(len(mism)) + ' e.g. ' + json.dumps(dict(list(mism.items())[:5]), ensure_ascii=False)[:400])
print('SHEETS=' + json.dumps(res['source_files'], ensure_ascii=False)[:900])
if 'appearance_sheet' in res:
    print('APPEARANCE=' + json.dumps(res['appearance_sheet'], ensure_ascii=False)[:700])
