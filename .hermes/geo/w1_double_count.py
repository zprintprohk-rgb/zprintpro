# -*- coding: utf-8 -*-
"""W1 §0.23.2 double-method recount of speed-win picks.
Method 1 (already run): openpyxl 查询数 sheet -> band 5-15 rows.
Method 2 (this script): raw XML parse of the same 查询数 sheet -> recompute band,
then verify each SELECTED query exists with the SAME position/impressions as method 1.
Also recounts band totals both ways.
"""
import json, zipfile, re
import xml.etree.ElementTree as ET

BASE = r"F:\zprintpro-nextjs"
NS = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
PICKS = {
    "zh_hk": ["食品包裝印刷", "a6 尺寸", "紙袋印刷", "印刷紙袋", "餐牌印刷", "小冊子印刷", "即日印刷"],
    "en": ["small batch sticker printing", "small batch stickers", "doujinshi printing",
           "exercise book printing business", "fluorescent stickers", "pvc menu"],
}
FILES = {
    "zh_hk": BASE + r"\GSC数据\香港站点28天数据zprintpro.com-Performance-on-Search-2026-09-29.xlsx",
    "en":    BASE + r"\GSC数据\美国站点28天数据zprintpro.com-Performance-on-Search-2026-09-29.xlsx",
}

def raw_rows(path):
    with zipfile.ZipFile(path) as z:
        wb = ET.fromstring(z.read("xl/workbook.xml"))
        rels = ET.fromstring(z.read("xl/_rels/workbook.xml.rels"))
        rid_map = {r.get("Id"): r.get("Target") for r in rels}
        sheet_rids = [s.get("{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id")
                      for s in wb.find("m:sheets", NS)]
        # find 查询数 sheet index
        names = [s.get("name") for s in wb.find("m:sheets", NS)]
        idx = names.index("查询数")
        target = rid_map[sheet_rids[idx]]
        if not target.startswith("xl/"):
            target = "xl/" + target.lstrip("/")
        ws = ET.fromstring(z.read(target))
        sst = []
        if "xl/sharedStrings.xml" in z.namelist():
            ss = ET.fromstring(z.read("xl/sharedStrings.xml"))
            for si in ss.findall("m:si", NS):
                sst.append("".join(t.text or "" for t in si.iter("{%s}t" % NS["m"])))
        rows = []
        for row in ws.iter("{%s}row" % NS["m"]):
            vals = {}
            for c in row.findall("m:c", NS):
                col = 0
                for ch in re.match(r"([A-Z]+)", c.get("r")).group(1):
                    col = col * 26 + (ord(ch) - 64)
                t = c.get("t")
                v = c.find("m:v", NS)
                if t == "s" and v is not None:
                    vals[col] = sst[int(v.text)]
                elif v is not None:
                    try:
                        vals[col] = float(v.text)
                    except ValueError:
                        vals[col] = v.text
                else:
                    vals[col] = None
            if vals:
                rows.append([vals.get(i) for i in range(1, max(vals) + 1)])
    return rows

def main():
    out = {}
    for locale, path in FILES.items():
        rows = raw_rows(path)
        header, data = rows[0], rows[1:]
        # method 2 band extraction
        band = [r for r in data if r[0] is not None and isinstance(r[4], float) and 5.0 <= r[4] <= 15.0]
        m2 = {"n_data_rows": len(data), "n_band_5_15": len(band), "picks": {}}
        qnorm = lambda s: re.sub(r"\s+", " ", str(s).strip().lower())
        for pick in PICKS[locale]:
            hit = [r for r in data if r[0] is not None and qnorm(r[0]) == qnorm(pick)]
            m2["picks"][pick] = ({"position": hit[0][4], "impressions": int(hit[0][2]), "clicks": int(hit[0][1])} if hit else None)
        # method 1 from stored json
        j = json.load(open(BASE + r"\.hermes\geo\_w1_gsc_parsed.json", encoding="utf-8"))
        t = j["files"][locale]["method_a"]["tables"]["查询数"]
        m1 = {"n_data_rows": t["total_data_rows"], "n_band_5_15": t["band_5_15_count"], "picks": {}}
        for pick in PICKS[locale]:
            hit = [d for d in t["band_5_15_all"] if qnorm(d["query"]) == qnorm(pick)]
            m1["picks"][pick] = ({"position": hit[0]["position"], "impressions": hit[0]["impressions"],
                                  "clicks": int(hit[0]["clicks"])} if hit else None)
        agree_rows = (m1["n_data_rows"] == m2["n_data_rows"]) and (m1["n_band_5_15"] == m2["n_band_5_15"])
        agree_picks = all((m1["picks"][p] == m2["picks"][p]) for p in PICKS[locale])
        out[locale] = {"method1_openpyxl": m1, "method2_rawxml": m2,
                       "agree_row_counts": agree_rows, "agree_pick_values": agree_picks}
        print(f"== {locale} == rows {m1['n_data_rows']}=={m2['n_data_rows']} | band5-15 {m1['n_band_5_15']}=={m2['n_band_5_15']} | picks_match={agree_picks}")
        for p in PICKS[locale]:
            print("   ", p, "->", m2["picks"][p])
    with open(BASE + r"\.hermes\geo\_w1_double_count.json", "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=1)
    print("written: .hermes/geo/_w1_double_count.json")

if __name__ == "__main__":
    main()
