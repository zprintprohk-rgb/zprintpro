from pathlib import Path
import json
import pandas as pd

ROOT = Path(r"F:\zprintpro-nextjs")
SOURCE = ROOT / "GSC数据" / "28天三站点汇总数据zprintpro.com-Performance-on-Search-2026-10-30 (2).xlsx"
OUT = ROOT / ".hermes" / "logs" / "money-keyword-query-evidence-2026-10-31.json"
TERMS = [
    "宣傳單張", "宣傳單張印刷", "貼紙印刷", "貼紙訂製", "書刊印刷", "印書",
    "海報印刷", "教科書印刷", "紙盒印刷", "包裝盒訂製", "包裝盒印刷",
    "利是封印刷", "喜帖印刷", "學校印刷", "small batch sticker printing",
    "china catalog printing", "コミケ 印刷", "教材 印刷製本",
]

xls = pd.ExcelFile(SOURCE)
result = {
    "source": str(SOURCE.relative_to(ROOT)).replace("\\", "/"),
    "window": "2026-09-30..2026-10-27",
    "scope": "all countries; query table is not country-joined",
    "sheets": xls.sheet_names,
    "matches": {},
    "sheet_columns": {},
}
for sheet in xls.sheet_names:
    df = pd.read_excel(SOURCE, sheet_name=sheet)
    result["sheet_columns"][sheet] = [str(c) for c in df.columns]
    if not any("查詢" in str(c) or "查询" in str(c) or "query" in str(c).lower() for c in df.columns):
        continue
    qcol = next(c for c in df.columns if "查詢" in str(c) or "查询" in str(c) or "query" in str(c).lower())
    for term in TERMS:
        mask = df[qcol].astype(str).str.casefold() == term.casefold()
        if not mask.any() and term in {"貼紙訂製", "印書", "學校印刷", "教科書印刷"}:
            mask = df[qcol].astype(str).str.contains(term, case=False, regex=False, na=False)
        rows = []
        for _, row in df.loc[mask].iterrows():
            rows.append({str(k): (None if pd.isna(v) else (v.item() if hasattr(v, "item") else v)) for k, v in row.items()})
        if rows:
            result["matches"].setdefault(term, []).extend({"sheet": sheet, "row": r} for r in rows)
OUT.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps({"output": str(OUT), "sheets": result["sheets"], "matched_terms": sorted(result["matches"]), "match_counts": {k: len(v) for k, v in result["matches"].items()}}, ensure_ascii=False, indent=2))
