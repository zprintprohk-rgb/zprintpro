# -*- coding: utf-8 -*-
"""Packaging word cluster: GSC state from 10-15 28d + 10-16 24h exports."""
import io, re, json
import openpyxl, os

ROOT = r"F:\zprintpro-nextjs"
D = json.load(io.open(ROOT + r"\.hermes\_gsc1015_queries.json", encoding="utf-8"))

CLUSTER = {
    "zh": ["包裝盒", "包裝", "禮盒", "食品包裝", "紙盒", "訂製包裝", "定制包裝", "彩盒"],
    "en": ["packaging", "packaging box", "custom box", "mailer", "folding", "carton", "food box"],
    "ja": ["パッケージ", "箱", "貼箱", "マパッケージ"],
}
def scan(key, terms):
    out = []
    for q in D[key]["queries"]:
        s = q["q"].lower()
        if any(t.lower() in s for t in terms):
            out.append(q)
    return out

print("=== 10-15 28d packaging cluster ===")
for site, key in (("hk", "hk28"), ("en", "us28"), ("ja", "jp28")):
    terms = CLUSTER["zh" if site == "hk" else site]
    rows = scan(key, terms)
    rows.sort(key=lambda r: -r["imps"])
    ti = sum(r["imps"] for r in rows); tc = sum(r["clicks"] for r in rows)
    print("%s: %d query rows, imps=%d clicks=%d" % (site, len(rows), int(ti), int(tc)))
    for r in rows[:9]:
        print("   %-42s imps=%-5d clk=%-2d pos=%s" % (r["q"][:42], int(r["imps"]), int(r["clicks"]), r["pos"]))

print("\n=== 10-16 24h exports: packaging words ===")
files = {
    "hk24": ROOT + r"\GSC数据\香港站点24小时数据zprintpro.com-Performance-on-Search-2026-10-16.xlsx",
    "us24": ROOT + r"\GSC数据\美国站点24小时数据zprintpro.com-Performance-on-Search-2026-10-16.xlsx",
    "jp24": ROOT + r"\GSC数据\日本站点24小时数据zprintpro.com-Performance-on-Search-2026-10-16.xlsx",
}
def read_queries(path):
    wb = openpyxl.load_workbook(path, read_only=True, data_only=True)
    ws = wb["查询数"] if "查询数" in wb.sheetnames else wb[wb.sheetnames[-1]]
    rows = []
    hdr_i = None
    for i, r in enumerate(ws.iter_rows(values_only=True)):
        j = "|".join(str(c) for c in r if c is not None)
        if ("查询" in j or "Query" in j) and ("点击" in j or "Click" in j):
            hdr_i = i
            break
    if hdr_i is None:
        return rows
    for r in ws.iter_rows(min_row=hdr_i + 2, values_only=True):
        if r and r[0]:
            try:
                rows.append({"q": str(r[0]).strip(), "clicks": float(r[1] or 0), "imps": float(r[2] or 0),
                             "pos": float(r[4]) if isinstance(r[4], (int, float)) else None})
            except Exception:
                pass
    return rows

for site, path in files.items():
    if not os.path.exists(path):
        print(site, "file missing"); continue
    terms = CLUSTER["zh" if site == "hk" else ("en" if site == "us" else "ja")]
    rows = [q for q in read_queries(path) if any(t.lower() in q["q"].lower() for t in terms)]
    print("%s 24h packaging rows: %d" % (site, len(rows)))
    for r in rows[:8]:
        print("   %-42s imps=%-4d clk=%-2d pos=%s" % (r["q"][:42], int(r["imps"]), int(r["clicks"]), r["pos"]))
