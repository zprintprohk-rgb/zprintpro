from __future__ import annotations

import json
import re
from pathlib import Path

import pandas as pd

ROOT = Path(r"F:\zprintpro-nextjs")
OUT = ROOT / "docs" / "assets" / "2026-11-20"
OUT.mkdir(parents=True, exist_ok=True)

FILES = {
    "2026-09-29": ROOT / "GSC数据" / "28天三站点汇总数据zprintpro.com-Performance-on-Search-2026-09-29.xlsx",
    "2026-11-19": ROOT / "GSC数据" / "28天三站点汇总数据zprintpro.com-Performance-on-Search-2026-11-19.xlsx",
}

TERMS = [
    "海報印刷", "海報印刷即日", "海報印刷一張", "a1 印刷 即日", "a2 印刷 即日",
    "a2 poster", "poster printing", "即日印刷", "貼紙印刷", "透明貼紙印刷",
    "可移貼紙", "戶外可移貼紙", "small batch sticker printing",
]


def norm(value: object) -> str:
    return re.sub(r"\s+", " ", str(value).strip().casefold())


def find_col(columns: list[str], candidates: list[str], contains: list[str] | None = None) -> str:
    for candidate in candidates:
        for col in columns:
            if norm(col) == norm(candidate):
                return col
    if contains:
        for col in columns:
            if all(token.casefold() in col.casefold() for token in contains):
                return col
    raise KeyError(f"Cannot identify column from {columns}; candidates={candidates}; contains={contains}")


def read_queries(path: Path) -> tuple[pd.DataFrame, dict]:
    book = pd.ExcelFile(path)
    errors = []
    for sheet in book.sheet_names:
        raw = pd.read_excel(path, sheet_name=sheet)
        raw.columns = [str(c).strip() for c in raw.columns]
        try:
            query_col = find_col(list(raw.columns), ["热门查询", "熱門查詢", "Query", "Queries", "查询", "查詢"], ["查询"])
        except KeyError as exc:
            errors.append(str(exc))
            continue
        click_col = find_col(list(raw.columns), ["点击次数", "點擊次數", "Clicks", "Clicks "], ["点击"])
        imp_col = find_col(list(raw.columns), ["展示次数", "展示次數", "Impressions"], ["展示"])
        ctr_col = find_col(list(raw.columns), ["点击率", "點擊率", "CTR"], ["率"])
        pos_col = find_col(list(raw.columns), ["排名", "平均排名", "Position"], ["排名"])
        frame = raw[[query_col, click_col, imp_col, ctr_col, pos_col]].copy()
        frame.columns = ["query", "clicks", "impressions", "ctr", "position"]
        frame = frame.dropna(subset=["query"])
        frame = frame[~frame["query"].astype(str).str.contains("总计|總計|Total", case=False, regex=True)]
        frame["query"] = frame["query"].astype(str).str.strip()
        for col in ["clicks", "impressions", "ctr", "position"]:
            frame[col] = pd.to_numeric(frame[col], errors="coerce")
        frame = frame.drop_duplicates(subset=["query"], keep="first")
        meta = {"sheet": sheet, "rows": int(len(frame)), "columns": list(raw.columns)}
        return frame, meta
    raise RuntimeError(f"No query sheet in {path}: {errors}")


data = {}
metadata = {}
for day, path in FILES.items():
    frame, meta = read_queries(path)
    data[day] = frame.set_index(frame["query"].map(norm), drop=False)
    metadata[day] = {"path": str(path), **meta}

rows = []
for term in TERMS:
    key = norm(term)
    record = {"term": term}
    for day in FILES:
        if key in data[day].index:
            item = data[day].loc[key]
            if isinstance(item, pd.DataFrame):
                item = item.iloc[0]
            record[day] = {
                "query": item["query"],
                "clicks": None if pd.isna(item["clicks"]) else float(item["clicks"]),
                "impressions": None if pd.isna(item["impressions"]) else float(item["impressions"]),
                "ctr": None if pd.isna(item["ctr"]) else float(item["ctr"]),
                "position": None if pd.isna(item["position"]) else float(item["position"]),
                "status": "OBSERVED",
            }
        else:
            record[day] = {"status": "NO_CURRENT_BASELINE"}
    rows.append(record)

current = data["2026-11-19"].copy()
current["opportunity"] = (
    (current["position"] >= 4) & (current["position"] <= 20) &
    (current["clicks"].fillna(0) == 0) & (current["impressions"].fillna(0) >= 5)
)
opportunities = current[current["opportunity"]].sort_values(["impressions", "position"], ascending=[False, True])
opp_columns = ["query", "clicks", "impressions", "ctr", "position"]

cluster_patterns = {
    "poster": r"海報|海报|poster",
    "sticker": r"貼紙|贴纸|sticker",
    "rush_same_day": r"即日|急件|same[ -]?day|express|特急|当日|當日",
    "catalog_book": r"catalog|書刊|书刊|印書|印书|小冊子|小册子|doujinshi|book printing",
    "packaging": r"包裝|包装|紙盒|纸盒|禮盒|礼盒|packaging|box printing",
    "flyer_leaflet": r"宣傳單張|宣传单张|傳單|传单|flyer|leaflet",
}
cluster_rows = []
for cluster, pattern in cluster_patterns.items():
    rec = {"cluster": cluster}
    for day, frame in data.items():
        selected = frame[frame["query"].str.contains(pattern, case=False, regex=True, na=False)]
        rec[day] = {
            "queries_observed": int(len(selected)),
            "clicks": float(selected["clicks"].fillna(0).sum()),
            "impressions": float(selected["impressions"].fillna(0).sum()),
        }
    cluster_rows.append(rec)

# Window totals are read from the summary sheet when available, not inferred from the query subset.
summary = {}
for day, path in FILES.items():
    book = pd.ExcelFile(path)
    summary[day] = {"sheets": book.sheet_names}

(OUT / "gsc-small-order-term-comparison.json").write_text(
    json.dumps({"metadata": metadata, "terms": rows, "clusters": cluster_rows, "workbook_sheets": summary}, ensure_ascii=False, indent=2),
    encoding="utf-8",
)
opportunities[opp_columns].head(100).to_csv(OUT / "gsc-2026-11-19-zero-click-opportunities.csv", index=False, encoding="utf-8-sig")
current.sort_values("impressions", ascending=False)[opp_columns].head(150).to_csv(OUT / "gsc-2026-11-19-top-queries.csv", index=False, encoding="utf-8-sig")

flat = []
for rec in rows:
    out = {"term": rec["term"]}
    for day in FILES:
        vals = rec[day]
        out[f"{day}_status"] = vals["status"]
        for metric in ["clicks", "impressions", "ctr", "position"]:
            out[f"{day}_{metric}"] = vals.get(metric)
    flat.append(out)
pd.DataFrame(flat).to_csv(OUT / "gsc-small-order-term-comparison.csv", index=False, encoding="utf-8-sig")

print(json.dumps({"metadata": metadata, "terms": rows, "clusters": cluster_rows}, ensure_ascii=False, indent=2))
