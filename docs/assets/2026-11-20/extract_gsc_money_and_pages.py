from __future__ import annotations

import json
import re
from pathlib import Path

import pandas as pd

ROOT = Path(r"F:\zprintpro-nextjs")
OUT = ROOT / "docs" / "assets" / "2026-11-20"
PATH = ROOT / "GSC数据" / "28天三站点汇总数据zprintpro.com-Performance-on-Search-2026-11-19.xlsx"

book = pd.ExcelFile(PATH)
result = {"file": str(PATH), "sheets": book.sheet_names, "pages": {}, "money_queries": {}}
result["sheet_columns"] = {
    sheet: [str(c) for c in pd.read_excel(PATH, sheet_name=sheet, nrows=0).columns]
    for sheet in book.sheet_names
}

# Read the page dimension independently. Do not join it to the query dimension.
page_frame = None
for sheet in book.sheet_names:
    raw = pd.read_excel(PATH, sheet_name=sheet)
    raw.columns = [str(c).strip() for c in raw.columns]
    if any(c in raw.columns for c in ["排名靠前的网页", "热门网页", "熱門網頁", "Page", "Pages", "网页", "網頁"]):
        page_col = next(c for c in ["排名靠前的网页", "热门网页", "熱門網頁", "Page", "Pages", "网页", "網頁"] if c in raw.columns)
        click_col = next(c for c in ["点击次数", "點擊次數", "Clicks"] if c in raw.columns)
        imp_col = next(c for c in ["展示", "展示次数", "展示次數", "Impressions"] if c in raw.columns)
        ctr_col = next(c for c in ["点击率", "點擊率", "CTR"] if c in raw.columns)
        pos_col = next(c for c in ["排名", "平均排名", "Position"] if c in raw.columns)
        page_frame = raw.rename(columns={page_col:"page", click_col:"clicks", imp_col:"impressions", ctr_col:"ctr", pos_col:"position"})
        result["page_sheet"] = sheet
        break

if page_frame is not None:
    for needle in ["a2-posters", "a1-posters", "same-day-flyers", "small-batch-stickers", "custom-stickers", "removable-stickers", "catalog-printing", "red-packets", "calendar"]:
        selected = page_frame[page_frame["page"].astype(str).str.contains(needle, case=False, na=False)]
        result["pages"][needle] = selected[["page", "clicks", "impressions", "ctr", "position"]].to_dict("records")

query_raw = pd.read_excel(PATH, sheet_name="查询数")
query_raw.columns = [str(c).strip() for c in query_raw.columns]
query_raw = query_raw.rename(columns={"热门查询":"query", "点击次数":"clicks", "展示":"impressions", "点击率":"ctr", "排名":"position"})
query_raw["query"] = query_raw["query"].astype(str).str.strip()

patterns = {
    "zh_core_money": r"^(即日印刷|香港印刷|海報印刷|利是封印刷|月曆印刷|貼紙印刷|宣傳單張|宣傳單張印刷|摺頁印刷|印書|包裝盒訂製|紙盒印刷|紙盒訂製|禮盒訂製|學校印刷|包裝盒印刷|易拉架印刷|喜帖印刷|小冊子印刷|a2印刷|證書印刷|書刊印刷|可移貼紙)$",
    "zh_small_order_long_tail": r"海報印刷即日|海報印刷一張|a1 印刷 即日|a2 印刷 即日|透明貼紙印刷|戶外可移貼紙|即日急件",
    "en_money": r"catalog printing china|catalogs printing china|catalogue printing china|small batch sticker|small batch custom sticker|doujinshi printing|gold foil red packets|school exercise book printing",
    "ja_money": r"ステッカー.*小ロット|ラベル 印刷 小ロット|防水ステッカー|クラフト紙 パッケージ|パッケージ印刷|教科書 印刷|教材 印刷|中綴じ|無線綴じ|a2 ポスター|コミケ 印刷|同人誌印刷",
    "seasonal": r"月曆|月歷|calendar|利是封|red packets|年賀状|c109",
}
for label, pattern in patterns.items():
    selected = query_raw[query_raw["query"].str.contains(pattern, case=False, regex=True, na=False)].copy()
    selected = selected.sort_values("impressions", ascending=False)
    result["money_queries"][label] = selected[["query", "clicks", "impressions", "ctr", "position"]].head(60).to_dict("records")

(OUT / "gsc-money-queries-and-pages.json").write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps(result, ensure_ascii=False, indent=2))
