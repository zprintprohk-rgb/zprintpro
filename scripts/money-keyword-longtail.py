# -*- coding: utf-8 -*-
"""17 带钱词的长尾（包含匹配）层分析 — 只读
输出每个词簇的包含匹配 query 数量、展示贡献、以及前 5 个长尾词（含主 URL）
"""
import csv, json, re, sys, io
from collections import defaultdict
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

QP = "GSC数据/money-kw-query-page-2026-10-31.csv"
HEADS = [
    ("zh-hk", "宣傳單張"), ("zh-hk", "貼紙印刷"), ("zh-hk", "貼紙訂製"), ("zh-hk", "書刊印刷"),
    ("zh-hk", "印書"), ("zh-hk", "海報印刷"), ("zh-hk", "紙盒印刷"), ("zh-hk", "包裝盒訂製"),
    ("zh-hk", "包裝盒印刷"), ("zh-hk", "利是封印刷"), ("zh-hk", "喜帖印刷"), ("zh-hk", "學校印刷"),
    ("en", "small batch sticker printing"), ("en", "china catalog printing"),
    ("ja", "コミケ 印刷"), ("ja", "教材 印刷製本"),
]

def norm(s):
    return re.sub(r"\s+", " ", str(s or "").strip().lower())

rows = list(csv.DictReader(open(QP, encoding="utf-8-sig")))
byq = defaultdict(lambda: {"imp": 0.0, "clk": 0.0, "pages": defaultdict(float)})
for r in rows:
    q = norm(r["热门查询"])
    imp = float(r["展示"] or 0); clk = float(r["点击次数"] or 0)
    d = byq[q]
    d["imp"] += imp; d["clk"] += clk
    d["pages"][r["页面"].replace("https://zprintpro.com", "")] += imp

out = []
print(f"{'词':22s} {'精确展示':>8s} {'长尾条数':>6s} {'长尾展示':>8s}  top 长尾")
for loc, w in HEADS:
    wn = norm(w)
    exact = byq.get(wn)
    longs = [(q, v) for q, v in byq.items() if wn in q and q != wn]
    ltot = sum(v["imp"] for _, v in longs)
    top = sorted(longs, key=lambda kv: -kv[1]["imp"])[:3]
    topstr = " | ".join(f"{q[:18]}({v['imp']:.0f})" for q, v in top)
    print(f"{w:22s} {(exact['imp'] if exact else 0):8.0f} {len(longs):6d} {ltot:8.0f}  {topstr}")
    out.append({
        "locale": loc, "head": w,
        "exact_imp": exact["imp"] if exact else 0,
        "exact_clk": exact["clk"] if exact else 0,
        "longtail_count": len(longs),
        "longtail_imp": ltot,
        "longtail_ratio": round(ltot / ((exact["imp"] if exact else 0) + ltot), 3) if (ltot or exact) else 0,
        "top_longtails": [{"q": q, "imp": v["imp"], "clk": v["clk"],
                           "top_page": max(v["pages"].items(), key=lambda kv: kv[1])[0] if v["pages"] else None}
                          for q, v in top],
    })
json.dump(out, open(".hermes/logs/money-kw-longtail-2026-10-31.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)
print("\n→ .hermes/logs/money-kw-longtail-2026-10-31.json")
