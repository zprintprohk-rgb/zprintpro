# -*- coding: utf-8 -*-
"""盲区大词盘点: K3 给定种子词 × GSC 3mo 词库 匹配现状"""
import openpyxl, json, re, io

BASE = r"F:\zprintpro-nextjs\GSC数据"
def load_queries(path):
    wb = openpyxl.load_workbook(path, read_only=True)
    ws = wb.worksheets[1]
    rows = list(ws.iter_rows(values_only=True))
    out = {}
    for r in rows[1:]:
        q, clicks, imps, ctr, pos = r[0], r[1] or 0, r[2] or 0, r[3] or 0, r[4]
        if q is None: continue
        out[str(q).strip()] = {"clicks": float(clicks), "imps": float(imps),
                               "pos": float(pos) if pos is not None else None}
    return out

data = load_queries(BASE + r"\3个月三站点汇总数据zprintpro.com-Performance-on-Search-2026-09-29.xlsx")
sites = {s: load_queries(p) for s, p in {
    "hk": BASE + r"\香港站点3个月数据zprintpro.com-Performance-on-Search-2026-09-29 (1).xlsx",
    "us": BASE + r"\美国站点3个月数据zprintpro.com-Performance-on-Search-2026-09-29.xlsx",
    "jp": BASE + r"\日本站点3个月数据zprintpro.com-Performance-on-Search-2026-09-29.xlsx"}.items()}

SEEDS = {
 "zh": ["畫冊印刷","包裝盒印刷","紙盒印刷","書刊印刷","教科書印刷","證書印刷","即日印刷","宣傳單張","貼紙印刷","目錄印刷","傳單印刷","名片印刷","利是封印刷","月曆訂製","海報印刷","餐牌印刷","紙袋印刷","小冊子印刷","膠裝書","騎馬釘","禮盒訂製","咭片","車身貼"],
 "en": ["booklet printing","custom packaging boxes","paper box printing","catalog printing","textbook printing","certificate printing","same day printing","flyer printing","sticker printing","red packet printing","brochure printing","poster printing","paper bag printing","banner printing","wholesale printing","cheap booklet printing","saddle stitch booklet","menu printing","wedding card printing","label printing"],
 "ja": ["冊子印刷","パッケージ印刷","紙箱印刷","書籍印刷","教科書印刷","証明書印刷","即日印刷","チラシ印刷","シール印刷","カタログ印刷","ポチ袋印刷","ポスター印刷","紙袋印刷","のぼり印刷","同人誌印刷","オリジナルシール"]}

report = []
for lang, seeds in SEEDS.items():
    for seed in seeds:
        # 在 3mo 词库中找包含 seed(去空格) 或 seed 包含于其中的词
        norm_seed = seed.replace(" ", "").lower()
        hits = []
        for q, m in data.items():
            nq = q.replace(" ", "").lower()
            if norm_seed in nq or nq in norm_seed:
                hits.append((q, m))
        hits.sort(key=lambda x: -x[1]["imps"])
        # 站点分布
        site_imps = {s: next((m["imps"] for q, m in sites[s].items()
                              if q.replace(" ", "").lower() == norm_seed or norm_seed in q.replace(" ", "").lower()
                              or q.replace(" ", "").lower() in norm_seed), 0) for s in ("hk","us","jp")}
        total_imps = sum(m["imps"] for _, m in hits)
        best = min((m["pos"] for _, m in hits if m["pos"]), default=None)
        top_hits = [{"q": q, "imps": m["imps"], "pos": round(m["pos"],1) if m["pos"] else None}
                    for q, m in hits[:3]]
        report.append({"lang": lang, "seed": seed, "variants": len(hits),
                       "total_imps_3mo": total_imps, "best_pos": round(best,1) if best else None,
                       "site_imps": site_imps, "top": top_hits})

with io.open(r"F:\zprintpro-nextjs\.hermes\gsc-2026-09-29-blindspot.json", "w", encoding="utf-8") as f:
    json.dump(report, f, ensure_ascii=False, indent=1)
for r in report:
    print(r["lang"], r["seed"], "variants=", r["variants"], "imps3mo=", r["total_imps_3mo"],
          "best=", r["best_pos"], "sites=", r["site_imps"])
print("DONE")
