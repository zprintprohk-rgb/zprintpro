# -*- coding: utf-8 -*-
"""Parse K3 10-19 24h GSC exports: packaging cluster keyword baseline (24h window, NOT the 21-23 check window)."""
import glob, io

try:
    import openpyxl
except ImportError:
    print("openpyxl missing"); raise SystemExit(1)

out = io.open(r"F:\zprintpro-nextjs\.hermes\_gsc24h_1019.txt", "w", encoding="utf-8", newline="")
KEYS = ["食品包裝", "食品包装", "包裝盒", "包裝盒印刷", "包裝盒訂製", "訂製包裝盒", "紙盒", "食品盒", "custom packaging", "food packaging", "パッケージ", "クラフト"]
for f in sorted(glob.glob(r"F:\zprintpro-nextjs\GSC数据\*24小时*10-19.xlsx")):
    wb = openpyxl.load_workbook(f, read_only=True)
    for ws in wb.worksheets:
        rows = list(ws.iter_rows(values_only=True))
        if not rows: continue
        hdr = [str(c) if c else "" for c in rows[0]]
        qi = next((i for i, h in enumerate(hdr) if "查詢" in h or "查询" in h or "query" in h.lower() or "トップ" in h), 0)
        out.write("=== %s | sheet %s | hdr=%s\n" % (f.split("\\")[-1], ws.title, hdr[:6]))
        hits = 0
        for r in rows[1:]:
            q = str(r[qi]) if r[qi] else ""
            if any(k.lower() in q.lower() for k in KEYS):
                out.write("  %s | %s\n" % (q[:50], " | ".join(str(x) for x in r[qi+1:qi+5])))
                hits += 1
                if hits > 40: break
        if hits == 0:
            out.write("  (no cluster keyword in %d rows)\n" % (len(rows) - 1))
    wb.close()
out.close()
print("parsed")
