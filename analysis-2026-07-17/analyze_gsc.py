# -*- coding: utf-8 -*-
"""GSC 数据深度分析 - ZprintPro 2026-07-09 导出"""
import pandas as pd
import sys, io, os

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
BASE = os.path.dirname(os.path.abspath(__file__))

def load(name):
    path = os.path.join(BASE, name)
    df = pd.read_csv(path)
    print(f"\n{'='*70}\n### {name}  (rows={len(df)}, cols={list(df.columns)})")
    return df

# ---------- 过滤器(了解数据范围) ----------
try:
    f = load('过滤器.csv')
    print(f.to_string())
except Exception as e:
    print('过滤器读取失败', e)

# ---------- 总体趋势 ----------
chart = load('图表.csv')
print(chart.head(3))
print('...')
print(chart.tail(3))
# 归一列名
cols = chart.columns.tolist()
date_col = cols[0]
num_cols = [c for c in cols[1:]]
for c in num_cols:
    chart[c] = pd.to_numeric(chart[c], errors='coerce')
print(f"\n时间范围: {chart[date_col].iloc[0]} ~ {chart[date_col].iloc[-1]}, 共 {len(chart)} 天")
for c in num_cols:
    print(f"  {c}: 合计={chart[c].sum():,.0f}  日均={chart[c].mean():,.1f}  峰值={chart[c].max():,.0f}  末日={chart[c].iloc[-1]:,.0f}")

# 分半对比(前一半 vs 后一半)
half = len(chart)//2
print("\n前/后半段对比:")
for c in num_cols:
    a, b = chart[c].iloc[:half].mean(), chart[c].iloc[half:].mean()
    delta = (b-a)/a*100 if a else float('nan')
    print(f"  {c}: 前半日均 {a:,.1f} -> 后半日均 {b:,.1f}  ({delta:+.1f}%)")

# ---------- 国家/地区 ----------
cty = load('国家_地区.csv')
print(cty.head(15).to_string())

# ---------- 设备 ----------
dev = load('设备.csv')
print(dev.to_string())

# ---------- 搜索呈现 ----------
try:
    sa = load('搜索结果呈现.csv')
    print(sa.to_string())
except Exception as e:
    print(e)

# ---------- 查询 ----------
q = load('查询数.csv')
qc = q.columns.tolist()
qname = qc[0]
# 数值列
for c in qc[1:]:
    q[c] = pd.to_numeric(q[c], errors='coerce')
click_col = [c for c in qc if '点击' in c or '次' in c][:1]
imp_col = [c for c in qc if '展示' in c][:1]
ctr_col = [c for c in qc if '点击' in c and '率' in c or 'CTR' in c.upper()][:1]
pos_col = [c for c in qc if '排名' in c or '位置' in c][:1]
print(f"列识别: clicks={click_col} imps={imp_col} ctr={ctr_col} pos={pos_col}")

total_clicks = q[click_col[0]].sum() if click_col else 0
total_imps = q[imp_col[0]].sum() if imp_col else 0
print(f"\n查询总数(去重): {len(q)}, 合计点击 {total_clicks:,.0f}, 合计展示 {total_imps:,.0f}")

print("\n--- Top 30 查询(按点击) ---")
print(q.head(30).to_string())

# 高展示低点击机会(展示>=50, CTR 低于均值)
if click_col and imp_col:
    q['_ctr'] = q[click_col[0]]/q[imp_col[0]]
    opp = q[(q[imp_col[0]]>=30) & (q['_ctr']<0.02)].sort_values(imp_col[0], ascending=False)
    print("\n--- 高展示低点击机会(展示>=30 且 CTR<2%) ---")
    print(opp.head(25)[[qname]+qc[1:]].to_string())

# 位置 4-20 的"触手可及"词
if pos_col:
    near = q[(q[pos_col[0]]>=4)&(q[pos_col[0]]<=20)].sort_values(imp_col[0], ascending=False)
    print("\n--- 排名 4-20 的高展示词(改进标题/内容可上首页) ---")
    print(near.head(20).to_string())

# ---------- 网页 ----------
p = load('网页.csv')
pc = p.columns.tolist()
pname = pc[0]
for c in pc[1:]:
    p[c] = pd.to_numeric(p[c], errors='coerce')
print(f"页面总数: {len(p)}, 合计点击 {p[pc[1]].sum():,.0f}, 合计展示 {p[pc[2]].sum():,.0f}")
print("\n--- Top 30 页面(按点击) ---")
print(p.head(30).to_string())

# 按 locale / 类型聚合
def classify(url):
    if '/zh-hk/' in url: loc='zh-hk'
    elif '/en/' in url: loc='en'
    elif '/ja/' in url: loc='ja'
    else: loc='root/other'
    if '/blog/' in url: typ='blog'
    elif '/product/' in url: typ='product'
    elif '/category/' in url: typ='category'
    elif url.rstrip('/').endswith(('zh-hk','en','ja')) or '/zh-hk/' not in url and '/en/' not in url and '/ja/' not in url: typ='home/root'
    else: typ='other'
    return pd.Series([loc, typ])
p[['locale','ptype']] = p[pname].apply(classify)
agg = p.groupby(['locale','ptype'])[[pc[1],pc[2]]].sum().sort_values(pc[1], ascending=False)
print("\n--- 页面按 locale×类型 聚合(点击/展示) ---")
print(agg.to_string())

# 零点击高展示页面
p['_ctr'] = p[pc[1]]/p[pc[2]]
zp = p[(p[pc[2]]>=30)&(p[pc[1]]<=2)].sort_values(pc[2], ascending=False)
print("\n--- 高展示零/低点击页面(展示>=30, 点击<=2) ---")
print(zp.head(25)[pc[:3]].to_string())
