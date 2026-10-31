# -*- coding: utf-8 -*-
"""17 个带钱查询的「主 URL 展示份额 + 轮换」基线 (2026-10-31 query×page 联接)
依据: 2026-10-31-money-keyword-seo-aeo-geo-global-strategy §2.2 / §6 / §8(承接层 KPI)
输入: GSC数据/money-kw-query-page-2026-10-31.csv (+ -country 版)
输出: .hermes/logs/money-kw-share-baseline-2026-10-31.{md,json}
口径: 只对「精确查询」计算份额; 包含匹配另外单列, 不与精确混算 (战略 §2.2 要求分开)
"""
import csv, json, re, sys, io
from collections import defaultdict
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

QP = "GSC数据/money-kw-query-page-2026-10-31.csv"
QPC = "GSC数据/money-kw-query-page-country-2026-10-31.csv"

# 战略 §2.2 的 17 词 + 指定主 URL（待联接确认的按战略原文）
WORDS = [
    ("zh-hk", "宣傳單張", "/zh-hk/category/flyers/"),
    ("zh-hk", "宣傳單張印刷", "/zh-hk/category/flyers/"),
    ("zh-hk", "貼紙印刷", "/zh-hk/category/stickers/"),
    ("zh-hk", "貼紙訂製", "/zh-hk/category/stickers/"),
    ("zh-hk", "書刊印刷", "/zh-hk/category/books/"),
    ("zh-hk", "印書", "/zh-hk/category/books/"),
    ("zh-hk", "海報印刷", "/zh-hk/category/posters/"),
    ("zh-hk", "紙盒印刷", "/zh-hk/category/packaging/"),
    ("zh-hk", "包裝盒訂製", "/zh-hk/category/packaging/"),
    ("zh-hk", "包裝盒印刷", "/zh-hk/category/packaging/"),
    ("zh-hk", "利是封印刷", None),
    ("zh-hk", "喜帖印刷", None),
    ("zh-hk", "學校印刷", "/zh-hk/category/educational/"),
    ("en", "small batch sticker printing", "/en/category/stickers/"),
    ("en", "china catalog printing", "/en/category/books/"),
    ("ja", "コミケ 印刷", "/ja/category/japan-doujin/"),
    ("ja", "教材 印刷製本", "/ja/category/educational/"),
]

def norm(s):
    return re.sub(r"\s+", " ", str(s or "").strip().lower())

def load_qp():
    rows = list(csv.DictReader(open(QP, encoding="utf-8-sig")))
    agg = defaultdict(lambda: defaultdict(lambda: {"clk": 0, "imp": 0, "pos_w": 0.0}))
    for r in rows:
        q, p = norm(r["热门查询"]), r["页面"].strip()
        imp = float(r["展示"] or 0); clk = float(r["点击次数"] or 0); pos = float(r["排名"] or 0)
        a = agg[q][p]
        a["clk"] += clk; a["imp"] += imp; a["pos_w"] += pos * imp
    return agg

def load_country():
    rows = list(csv.DictReader(open(QPC, encoding="utf-8-sig")))
    agg = defaultdict(lambda: defaultdict(lambda: defaultdict(lambda: {"clk": 0, "imp": 0, "pos_w": 0.0})))
    for r in rows:
        q, p, c = norm(r["热门查询"]), r["页面"].strip(), (r["国家/地区"] or "").strip()
        imp = float(r["展示"] or 0); clk = float(r["点击次数"] or 0); pos = float(r["排名"] or 0)
        a = agg[q][p][c]
        a["clk"] += clk; a["imp"] += imp; a["pos_w"] += pos * imp
    return agg

def main():
    agg = load_qp()
    cagg = load_country()
    out = {"generated": "2026-10-31", "source": [QP, QPC], "items": []}
    md = ["# 17 带钱查询 · 主 URL 展示份额基线（2026-10-31 query×page 联接）\n",
          "> 依据：`2026-10-31-money-keyword-seo-aeo-geo-global-strategy.md` §2.2 / §6 / §8（承接层 KPI：主 URL 展示份额、URL 轮换次数）",
          f"> 数据：`{QP}`（1,870 行）+ `{QPC}`（2,159 行），2026-10-31 导出",
          "> 口径：仅**精确查询**；包含匹配另列。份额 = 该 URL 展示 ÷ 该查询在 query×page 表的全部展示。\n",
          "| 查询 | 指定主 URL | 实际第一 URL | 份额 | URL 数 | 第二 URL | 判定 |",
          "|---|---|---|---:|---:|---|---|"]
    for loc, w, designated in WORDS:
        q = norm(w)
        pages = agg.get(q)
        if not pages:
            md.append(f"| {w} | {designated or '—'} | — | — | 0 | — | `NO_CURRENT_MATCH` |")
            out["items"].append({"locale": loc, "query": w, "designated": designated, "status": "NO_CURRENT_MATCH"})
            continue
        total_imp = sum(v["imp"] for v in pages.values()) or 1
        ranked = sorted(pages.items(), key=lambda kv: -kv[1]["imp"])
        top_url, top = ranked[0]
        share = top["imp"] / total_imp
        n_urls = len([1 for v in pages.values() if v["imp"] > 0])
        second = f"{ranked[1][0].replace('https://zprintpro.com', '')} {ranked[1][1]['imp']/total_imp*100:.0f}%" if len(ranked) > 1 else "—"
        top_path = top_url.replace("https://zprintpro.com", "")
        if designated is None:
            verdict = "待定（战略未指定）"
        elif top_path.rstrip("/") == designated.rstrip("/"):
            verdict = "✅ 与指定一致" if share >= 0.6 else "⚠️ 一致但份额低"
        else:
            verdict = "❌ 与指定不一致"
        md.append(f"| {w} | {designated or '—'} | {top_path} | {share*100:.0f}% | {n_urls} | {second} | {verdict} |")
        # 国家分布
        cdist = {}
        for p, cs in cagg.get(q, {}).items():
            if p != top_url:
                continue
            for c, v in cs.items():
                cdist[c] = cdist.get(c, 0) + v["imp"]
        out["items"].append({
            "locale": loc, "query": w, "designated": designated, "status": "OK",
            "total_imp": total_imp, "urls": n_urls,
            "top_url": top_path, "top_share_pct": round(share * 100, 1),
            "top_clk": top["clk"], "top_pos": round(top["pos_w"] / top["imp"], 2) if top["imp"] else 0,
            "pages": [{"url": u.replace("https://zprintpro.com", ""), "imp": v["imp"], "clk": v["clk"],
                       "share_pct": round(v["imp"] / total_imp * 100, 1),
                       "pos": round(v["pos_w"] / v["imp"], 2) if v["imp"] else 0} for u, v in ranked[:5]],
            "country_of_top_url": cdist,
            "verdict": verdict,
        })
    md.append("\n## 判读要点\n")
    mism = [i for i in out["items"] if i.get("verdict", "").startswith("❌")]
    lowshare = [i for i in out["items"] if i.get("verdict", "").startswith("⚠️")]
    nomatch = [i for i in out["items"] if i["status"] == "NO_CURRENT_MATCH"]
    md.append(f"- 与战略指定主 URL **不一致**：{len(mism)} 个 —— " + ("、".join(i["query"] for i in mism) if mism else "无"))
    md.append(f"- 一致但份额 <60%：{len(lowshare)} 个 —— " + ("、".join(i["query"] for i in lowshare) if lowshare else "无"))
    md.append(f"- 本档无精确匹配：{len(nomatch)} 个 —— " + ("、".join(i["query"] for i in nomatch) if nomatch else "无"))
    md.append("- 「不一致」不等于内耗：需再看该 URL 是否长期稳定承接（28 天趋势）与是否多页长期分流；本基线只给一次快照。")
    open(".hermes/logs/money-kw-share-baseline-2026-10-31.md", "w", encoding="utf-8").write("\n".join(md) + "\n")
    json.dump(out, open(".hermes/logs/money-kw-share-baseline-2026-10-31.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    print("\n".join(md))

if __name__ == "__main__":
    main()
