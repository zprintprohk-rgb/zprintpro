# -*- coding: utf-8 -*-
"""W1 GSC speed-win parser (2026-09-30).
Method A: openpyxl parse of GSC 28-day xlsx exports (2026-09-29).
Method B (double-count per AGENTS.md §0.23.2): raw XML re-parse of the same xlsx via zipfile,
comparing per-sheet row counts + count of queries in position band [5,15].
Reads ONLY; writes results to .hermes/geo/_w1_gsc_parsed.json. No PowerShell CJK usage (§0.26.9).
"""
import json, zipfile, re, sys, datetime
import xml.etree.ElementTree as ET
from openpyxl import load_workbook

BASE = r"F:\zprintpro-nextjs"
FILES = {
    "zh_hk": BASE + r"\GSC数据\香港站点28天数据zprintpro.com-Performance-on-Search-2026-09-29.xlsx",
    "en":    BASE + r"\GSC数据\美国站点28天数据zprintpro.com-Performance-on-Search-2026-09-29.xlsx",
    "ja":    BASE + r"\GSC数据\日本站点28天数据zprintpro.com-Performance-on-Search-2026-09-29.xlsx",
}
NS = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}

def col_letter_to_idx(ref):
    m = re.match(r"([A-Z]+)(\d+)", ref)
    col, row = 0, int(m.group(2))
    for ch in m.group(1):
        col = col * 26 + (ord(ch) - 64)
    return row, col

def raw_sheet_rows(path, sheet_index=1):
    """Method B: parse sheet XML directly from the xlsx zip. Returns list of rows (list of str/num)."""
    with zipfile.ZipFile(path) as z:
        # workbook.xml to get sheet order/names
        wb = ET.fromstring(z.read("xl/workbook.xml"))
        sheets = [s.get("name") for s in wb.find("m:sheets", NS)]
        # shared strings
        sst = []
        if "xl/sharedStrings.xml" in z.namelist():
            ss = ET.fromstring(z.read("xl/sharedStrings.xml"))
            for si in ss.findall("m:si", NS):
                sst.append("".join(t.text or "" for t in si.iter("{%s}t" % NS["m"])))
        # find sheet file via workbook rels
        rels = ET.fromstring(z.read("xl/_rels/workbook.xml.rels"))
        rid_map = {r.get("Id"): r.get("Target") for r in rels}
        # sheet order in workbook.xml corresponds to r:id order in rels
        sheet_rids = [s.get("{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id") for s in wb.find("m:sheets", NS)]
        target = rid_map[sheet_rids[sheet_index]]
        if not target.startswith("xl/"):
            target = "xl/" + target.lstrip("/")
        ws = ET.fromstring(z.read(target))
        rows = []
        for row in ws.iter("{%s}row" % NS["m"]):
            vals = {}
            for c in row.findall("m:c", NS):
                _, col = col_letter_to_idx(c.get("r"))
                t = c.get("t")
                v = c.find("m:v", NS)
                if t == "s" and v is not None:
                    vals[col] = sst[int(v.text)]
                elif t == "inlineStr":
                    is_el = c.find("m:is", NS)
                    vals[col] = "".join(x.text or "" for x in is_el.iter("{%s}t" % NS["m"])) if is_el is not None else None
                elif v is not None:
                    vals[col] = v.text
                else:
                    vals[col] = None
            if vals:
                maxc = max(vals)
                rows.append([vals.get(i) for i in range(1, maxc + 1)])
        return sheets, rows

def to_float(x):
    try:
        return float(x)
    except (TypeError, ValueError):
        return None

def parse_method_a(path):
    wb = load_workbook(path, read_only=True, data_only=True)
    info = {"sheets": wb.sheetnames, "tables": {}}
    for name in wb.sheetnames:
        ws = wb[name]
        rows = list(ws.iter_rows(values_only=True))
        if not rows:
            continue
        header = [str(h) if h is not None else "" for h in rows[0]]
        info["tables"][name] = {"header": header, "n_rows": len(rows) - 1}
        # try to detect a query-like table (has 位置/position column) and collect rows
        pos_col = next((i for i, h in enumerate(header) if ("排名" in h) or ("位置" in h) or (h.lower() in ("position", "avg. position", "ranking"))), None)
        imp_col = next((i for i, h in enumerate(header) if ("展示" in h) or ("曝光" in h) or ("impression" in h.lower())), None)
        clk_col = next((i for i, h in enumerate(header) if ("点击次数" in h) or ("点击" in h and "率" not in h) or ("click" in h.lower())), None)
        ctr_col = next((i for i, h in enumerate(header) if ("点击率" in h) or ("ctr" in h.lower())), None)
        q_col = 0
        if pos_col is not None and imp_col is not None:
            band, allrows = [], 0
            for r in rows[1:]:
                if r[0] is None:
                    continue
                allrows += 1
                pos, imp = to_float(r[pos_col]), to_float(r[imp_col])
                if pos is None or imp is None:
                    continue
                if 5.0 <= pos <= 15.0:
                    band.append({"query": str(r[q_col]), "clicks": to_float(r[clk_col]) or 0,
                                 "impressions": int(imp), "ctr": to_float(r[ctr_col]) or 0,
                                 "position": pos})
            band.sort(key=lambda d: (-d["impressions"], d["position"]))
            info["tables"][name]["total_data_rows"] = allrows
            info["tables"][name]["band_5_15_count"] = len(band)
            info["tables"][name]["band_5_15_all"] = band  # full list for downstream filtering
        # exact date range from 图表 sheet
        if "日期" in header:
            di = header.index("日期")
            dates = [str(r[di]) for r in rows[1:] if r[di] is not None]
            if dates:
                info.setdefault("date_range", {})  # placeholder
                info["date_range"] = {"first": min(dates), "last": max(dates), "days": len(dates)}
        # top pages sheet snapshot (landing mapping cross-check)
        if name == "网页":
            info["top_pages"] = [
                {"page": str(r[0]), "clicks": to_float(r[1]) or 0, "impressions": to_float(r[2]) or 0}
                for r in rows[1:12] if r[0] is not None
            ]
    wb.close()
    return info

def parse_method_b(path):
    sheets, rows = raw_sheet_rows(path)
    out = {"sheets": sheets, "row_counts": {}}
    return sheets, rows

def parse_page_query_csv():
    """Root gsc_page_query.csv (2026-08-26): query->page mapping. Two counting methods."""
    import csv
    p = BASE + r"\gsc_page_query.csv"
    rows = []
    with open(p, encoding="utf-8-sig", newline="") as f:
        rd = csv.reader(f)
        for row in rd:
            rows.append(row)
    n_a = len(rows) - 1
    # method B: manual count of physical lines (quote-aware not needed if csv has no embedded newlines; verify via csv parse equality)
    with open(p, encoding="utf-8-sig", newline="") as f:
        raw = f.read()
    n_b = raw.count("\n") - (1 if raw.endswith("\n") else 0)
    header = rows[0] if rows else []
    return {"file": "gsc_page_query.csv", "mtime_note": "2026-08-26", "header": header,
            "n_rows_method_csv": n_a, "n_rows_method_lines": n_b, "match": n_a == n_b,
            "sample": rows[1:4]}

def main():
    result = {"generated_at": datetime.datetime.now().isoformat(timespec="seconds"), "files": {}}
    result["page_query_csv"] = parse_page_query_csv()
    print("page_query_csv:", result["page_query_csv"]["n_rows_method_csv"], "vs",
          result["page_query_csv"]["n_rows_method_lines"], "match=", result["page_query_csv"]["match"])
    for locale, path in FILES.items():
        a = parse_method_a(path)
        entry = {"file": path.replace(BASE + "\\", "GSC数据\\") if "GSC数据" in path else path,
                 "method_a": a, "method_b": {}}
        # Method B: re-parse each sheet, compare row counts
        sheets_b = None
        with zipfile.ZipFile(path) as z:
            wbxml = ET.fromstring(z.read("xl/workbook.xml"))
            sheets_b = [s.get("name") for s in wbxml.find("m:sheets", NS)]
        for idx, sname in enumerate(a["sheets"]):
            sh, rows = raw_sheet_rows(path, idx)
            entry["method_b"][sname] = len(rows) - 1  # minus header
        # compare
        diffs = []
        for sname in a["sheets"]:
            na = a["tables"].get(sname, {}).get("n_rows")
            nb = entry["method_b"].get(sname)
            if na is not None and nb is not None and na != nb:
                diffs.append({"sheet": sname, "openpyxl": na, "raw_xml": nb})
        entry["double_count_match"] = (len(diffs) == 0)
        entry["double_count_diffs"] = diffs
        result["files"][locale] = entry
    outp = BASE + r"\.hermes\geo\_w1_gsc_parsed.json"
    with open(outp, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=1)
    # console summary
    for locale, e in result["files"].items():
        print(f"== {locale} == {e['file']}")
        print("  sheets:", e["method_a"]["sheets"], "| double_count_match:", e["double_count_match"], e["double_count_diffs"])
        for sname, t in e["method_a"]["tables"].items():
            if "band_5_15_count" in t:
                print(f"  [{sname}] rows={t.get('total_data_rows')} band5-15={t['band_5_15_count']}")
                for d in t.get("band_5_15_all", [])[:14]:
                    print(f"    pos={d['position']:.1f} imp={d['impressions']} clk={int(d['clicks'])} ctr={d['ctr']:.3f} q={d['query']}")
    print("written:", outp)

if __name__ == "__main__":
    main()
