# -*- coding: utf-8 -*-
"""2026-09-29 GSC 三窗口对比分析: 7天/28天/3个月 × 三站点汇总 + 分站点3个月"""
import openpyxl, json, re, io, sys
from collections import defaultdict

BASE = r"F:\zprintpro-nextjs\GSC数据"
FILES = {
    "7d":  BASE + r"\7天三站点汇总数据zprintpro.com-Performance-on-Search-2026-09-29 (1).xlsx",
    "28d": BASE + r"\28天三站点汇总数据zprintpro.com-Performance-on-Search-2026-09-29.xlsx",
    "3mo": BASE + r"\3个月三站点汇总数据zprintpro.com-Performance-on-Search-2026-09-29.xlsx",
}
SITE_FILES = {
    "hk": BASE + r"\香港站点3个月数据zprintpro.com-Performance-on-Search-2026-09-29 (1).xlsx",
    "us": BASE + r"\美国站点3个月数据zprintpro.com-Performance-on-Search-2026-09-29.xlsx",
    "jp": BASE + r"\日本站点3个月数据zprintpro.com-Performance-on-Search-2026-09-29.xlsx",
}
DAYS = {"7d": 7, "28d": 28, "3mo": 93}  # 3mo: 2026-06-27..2026-09-29 = 94 天, 用 93(图表行数-1)? 实测按 93

def load_queries(path):
    wb = openpyxl.load_workbook(path, read_only=True)
    ws = wb.worksheets[1]  # 第2个 sheet = 查询词
    rows = list(ws.iter_rows(values_only=True))
    out = {}
    for r in rows[1:]:
        q, clicks, imps, ctr, pos = r[0], r[1] or 0, r[2] or 0, r[3] or 0, r[4]
        if q is None: continue
        out[str(q).strip()] = {"clicks": float(clicks), "imps": float(imps),
                               "ctr": float(ctr), "pos": float(pos) if pos is not None else None}
    return out

data = {k: load_queries(v) for k, v in FILES.items()}
sites = {k: load_queries(v) for k, v in SITE_FILES.items()}

allq = sorted(set(data["7d"]) | set(data["28d"]) | set(data["3mo"]))

# 每日常规化
def daily(m, d): return {"clicks_d": m["clicks"]/d, "imps_d": m["imps"]/d, "pos": m["pos"], "ctr": m["ctr"]}

joined = {}
for q in allq:
    j = {}
    for w in ("7d", "28d", "3mo"):
        m = data[w].get(q)
        j[w] = daily(m, DAYS[w]) if m else {"clicks_d": 0.0, "imps_d": 0.0, "pos": None, "ctr": 0.0}
    # 站点归属 (3mo 出现即可)
    j["sites"] = [s for s in ("hk", "us", "jp") if q in sites[s] and sites[s][q]["imps"] > 0]
    joined[q] = j

# 语言识别
def lang_of(q):
    if re.search(r"[\u3040-\u30ff]", q): return "ja"
    if re.search(r"[\u4e00-\u9fff]", q): return "zh"
    return "en"

MONEY_ZH = re.compile(r"印刷|訂製|订制|定制|批發|批发|報價|报价|價格|价格|印刷廠|印刷厂|公司|印製|製作|制作|訂做|定做|供應|供应|廠家|厂家")
MONEY_EN = re.compile(r"print|packag|\bbox|sticker|label|flyer|brochure|booklet|catalog(?:ue)?|calendar|banner|poster|card|custom|bulk|wholesale|cheap|price|quot|manufactur|supplier|factor", re.I)
MONEY_JA = re.compile(r"印刷|製造|オーダー|注文|価格|見積|安い|業者|メーカー|作成|製作|プリント|発注")
def is_money(q):
    l = lang_of(q)
    if l == "zh": return bool(MONEY_ZH.search(q))
    if l == "ja": return bool(MONEY_JA.search(q))
    return bool(MONEY_EN.search(q))

# ============ Task 1.1 跃升词: pos 提升>5 或 imps_d 7d vs 3mo 翻倍且 pos 前进 ============
risers = []
for q, j in joined.items():
    p7, p3 = j["7d"]["pos"], j["3mo"]["pos"]
    i7, i3 = j["7d"]["imps_d"], j["3mo"]["imps_d"]
    c7, c3 = j["7d"]["clicks_d"], j["3mo"]["clicks_d"]
    if p7 is None: continue
    d_pos = (p3 - p7) if p3 is not None else None
    surge = (i3 > 0 and i7 >= i3 * 2 and i7 >= 1) or (c7 > c3 and c7 >= 0.3)
    if (d_pos is not None and d_pos >= 5 and i7 >= 0.5) or (surge and (d_pos or 0) >= 2):
        risers.append({"q": q, "lang": lang_of(q), "sites": j["sites"], "p7": round(p7,1),
                       "p3": round(p3,1) if p3 else None, "dpos": round(d_pos,1) if d_pos is not None else None,
                       "i7": round(i7,2), "i3": round(i3,2), "c7": round(c7,2), "c3": round(c3,2)})
risers.sort(key=lambda x: (-(x["dpos"] or 0), -x["i7"]))

# ============ Task 1.2 暴跌词: pos 掉出前50 或 imps 腰斩 ============
fallers = []
for q, j in joined.items():
    p7, p3 = j["7d"]["pos"], j["3mo"]["pos"]
    i7, i3 = j["7d"]["imps_d"], j["3mo"]["imps_d"]
    c7, c3 = j["7d"]["clicks_d"], j["3mo"]["clicks_d"]
    if p3 is None: continue
    gone = (p7 is None and i3 >= 1) or (p7 is not None and p7 > 50 and p3 <= 30)
    collapse = i3 >= 2 and i7 <= i3 * 0.4
    if (gone and i3 >= 1) or (collapse and (c3 or 0) > 0):
        fallers.append({"q": q, "lang": lang_of(q), "sites": j["sites"], "p7": round(p7,1) if p7 else None,
                        "p3": round(p3,1), "i7": round(i7,2), "i3": round(i3,2),
                        "c7": round(c7,2), "c3": round(c3,2), "why": "gone>50" if gone else "imps_collapse"})
fallers.sort(key=lambda x: -x["i3"])

# ============ Task 1.3 潜水带钱词: money + pos 11-30 + imps_d 高 ============
submerged = []
for q, j in joined.items():
    p3, i3, c3 = j["3mo"]["pos"], j["3mo"]["imps_d"], j["3mo"]["clicks_d"]
    if p3 is None or not (11 <= p3 <= 30): continue
    if not is_money(q): continue
    if i3 < 0.3: continue
    p7, i7 = j["7d"]["pos"], j["7d"]["imps_d"]
    submerged.append({"q": q, "lang": lang_of(q), "sites": j["sites"], "p3": round(p3,1),
                      "i3": round(i3,2), "c3": round(c3,2), "p7": round(p7,1) if p7 else None,
                      "i7": round(i7,2), "ctr3": j["3mo"]["ctr"]})
submerged.sort(key=lambda x: -x["i3"])

# ============ Task 1.4 AEO 零点击: imps 高 ctr 极低 ============
zero_click = []
for q, j in joined.items():
    i3, c3, ctr = j["3mo"]["imps_d"], j["3mo"]["clicks_d"], j["3mo"]["ctr"]
    if i3 >= 2 and c3 < 0.05:
        zero_click.append({"q": q, "lang": lang_of(q), "sites": j["sites"], "p3": round(j["3mo"]["pos"],1) if j["3mo"]["pos"] else None,
                           "i3": round(i3,2), "ctr": ctr})
zero_click.sort(key=lambda x: -x["i3"])

# ============ 分站点 3mo Top (挖掘盲区用) ============
site_top = {}
for s, d in sites.items():
    rows = [{"q": q, "imps": m["imps"], "clicks": m["clicks"], "pos": m["pos"]}
            for q, m in d.items() if m["imps"] > 0]
    rows.sort(key=lambda x: -x["imps"])
    site_top[s] = rows[:60]

# 汇总规模
totals = {}
for w, d in data.items():
    totals[w] = {"queries": len(d), "clicks": sum(m["clicks"] for m in d.values()),
                 "imps": sum(m["imps"] for m in d.values())}

out = {"totals": totals, "risers": risers[:40], "fallers": fallers[:40],
       "submerged": submerged[:60], "zero_click": zero_click[:40], "site_top": site_top}
with io.open(r"F:\zprintpro-nextjs\.hermes\gsc-2026-09-29-analysis.json", "w", encoding="utf-8") as f:
    json.dump(out, f, ensure_ascii=False, indent=1)
print("totals:", json.dumps(totals))
print("risers:", len(risers), "fallers:", len(fallers), "submerged:", len(submerged), "zero_click:", len(zero_click))
print("DONE")
