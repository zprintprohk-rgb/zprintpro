# -*- coding: utf-8 -*-
"""
2026-09-30 大词作战: 3mo 展示量排名 vs 24h 最新排名对比
基准: 3个月三站点汇总 (2026-09-29 19:54) × 24小时三站点汇总 (2026-09-29 00:03)
输出: .hermes/gsc-2026-09-30-money-words.json (排名对比矩阵)
"""
import io, json, re
from openpyxl import load_workbook

BASE = r'F:\zprintpro-nextjs\GSC数据'
F_3MO = BASE + r'\3个月三站点汇总数据zprintpro.com-Performance-on-Search-2026-09-29.xlsx'
F_24H = BASE + r'\24小时三站点汇总数据zprintpro.com-Performance-on-Search-2026-09-29.xlsx'

def load_queries(path):
    wb = load_workbook(path, read_only=True, data_only=True)
    ws = wb.worksheets[1]  # 查询词 sheet
    rows = list(ws.iter_rows(values_only=True))
    out = {}
    for r in rows[1:]:
        q = r[0]
        if not q or q == '查询词':
            continue
        q = str(q).strip()
        try:
            clicks = float(r[1] or 0); imps = float(r[2] or 0)
            pos = float(r[4]) if r[4] is not None else None
        except Exception:
            continue
        out[q] = {'clicks': clicks, 'imps': imps, 'pos': pos}
    return out

d3mo = load_queries(F_3MO)
d24h = load_queries(F_24H)

CLUSTERS = {
    'flyers':    re.compile(r'傳單|宣傳單|宣传单|leaflet|flyer', re.I),
    'packaging': re.compile(r'包裝盒|包装盒|紙盒|纸盒|彩盒|禮盒|礼盒|包裝印刷|packaging|paper box|rigid box|carton|box', re.I),
    'sameday':   re.compile(r'即日|即印|急件|same.?day|rush|特急|当日', re.I),
    'stickers':  re.compile(r'貼紙|贴纸|sticker|シール|ステッカー|label|標籤|标签', re.I),
    'posters':   re.compile(r'海報|海报|poster|ポスター|印海報', re.I),
    'calendar':  re.compile(r'月曆|年曆|日曆|日历|calendar|カレンダー|年历', re.I),
    'redpacket': re.compile(r'利是封|紅包|红包|red packet|lai see|ポチ袋|利市', re.I),
    'paperbag':  re.compile(r'紙袋|纸袋|paper bag|手提袋|shopping bag', re.I),
    'menus':     re.compile(r'餐牌|菜單|菜单|menu|メニュー', re.I),
    'books':     re.compile(r'騎馬釘|骑马钉|書刊|书刊|印書|印书|冊子|booklet|中綴じ|製本|小冊子|畫冊|画册', re.I),
}

def cluster_of(q):
    for name, rx in CLUSTERS.items():
        if rx.search(q):
            return name
    return 'other'

matrix = []
for q, v3 in d3mo.items():
    if v3['imps'] < 30:  # 只看有量级的词
        continue
    c = cluster_of(q)
    v24 = d24h.get(q)
    matrix.append({
        'q': q, 'cluster': c,
        'imps3mo': int(v3['imps']), 'pos3mo': round(v3['pos'], 1) if v3['pos'] else None,
        'imps24h': int(v24['imps']) if v24 else 0,
        'pos24h': round(v24['pos'], 1) if v24 and v24['pos'] else None,
    })

matrix.sort(key=lambda x: -x['imps3mo'])

# 24h TOP (现状热度)
top24 = sorted([{'q': q, 'imps': int(v['imps']), 'pos': round(v['pos'],1) if v['pos'] else None, 'cluster': cluster_of(q)} for q, v in d24h.items()], key=lambda x: -x['imps'])[:40]

# 首页判定: 24h pos<=10 = 已进首页; 11-20 = 临门; 21+ = 深水
result = {
    'totals': {'3mo_queries': len(d3mo), '3mo_imps': int(sum(v['imps'] for v in d3mo.values())),
               '24h_queries': len(d24h), '24h_imps': int(sum(v['imps'] for v in d24h.values()))},
    'matrix': matrix,
    'top24h': top24,
    'generated': '2026-09-30 ~02:30',
}
io.open(r'F:\zprintpro-nextjs\.hermes\gsc-2026-09-30-money-words.json', 'w', encoding='utf-8').write(
    json.dumps(result, ensure_ascii=False, indent=1))
print('OK', len(matrix), 'rows;', len(top24), 'top24h')
