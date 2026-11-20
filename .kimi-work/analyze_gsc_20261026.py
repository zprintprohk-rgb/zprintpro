from __future__ import annotations

import json
import re
from pathlib import Path
from urllib.parse import unquote, urlparse

import numpy as np
import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
LOG = ROOT / ".hermes" / "logs"
CURRENT = ("2026-09-28", "2026-10-25")
PREVIOUS = ("2026-08-31", "2026-09-27")


def load(name: str, kind: str) -> pd.DataFrame:
    df = pd.read_csv(LOG / name)
    rename = {"热门查询": "query", "国家/地区": "country", "页面": "page", "点击次数": "clicks", "展示": "imps", "排名": "pos"}
    df = df.rename(columns=rename)
    if kind == "date":
        df = df.rename(columns={"query": "date"})
    for col in ("clicks", "imps", "pos"):
        df[col] = pd.to_numeric(df[col], errors="coerce").fillna(0.0)
    return df


def locale_of(page: str) -> str:
    path = urlparse(str(page)).path
    if path.startswith("/en/"):
        return "en"
    if path.startswith("/ja/"):
        return "ja"
    if path.startswith("/zh-hk/"):
        return "zh-hk"
    return "other"


def market_of(country: str) -> str:
    return country if country in {"hkg", "usa", "jpn"} else "other"


def agg(df: pd.DataFrame, keys: list[str]) -> pd.DataFrame:
    if df.empty:
        return pd.DataFrame(columns=keys + ["clicks", "imps", "pos", "ctr"])
    work = df.copy()
    work["pos_imps"] = work["pos"] * work["imps"]
    out = work.groupby(keys, as_index=False).agg(clicks=("clicks", "sum"), imps=("imps", "sum"), pos_imps=("pos_imps", "sum"))
    out["pos"] = np.where(out["imps"] > 0, out["pos_imps"] / out["imps"], np.nan)
    out["ctr"] = np.where(out["imps"] > 0, out["clicks"] / out["imps"], np.nan)
    return out.drop(columns="pos_imps")


def compare(cur: pd.DataFrame, prev: pd.DataFrame, keys: list[str]) -> pd.DataFrame:
    a = agg(cur, keys).rename(columns={"clicks": "clicks_cur", "imps": "imps_cur", "pos": "pos_cur", "ctr": "ctr_cur"})
    b = agg(prev, keys).rename(columns={"clicks": "clicks_prev", "imps": "imps_prev", "pos": "pos_prev", "ctr": "ctr_prev"})
    out = a.merge(b, on=keys, how="outer")
    for col in ("clicks_cur", "imps_cur", "clicks_prev", "imps_prev"):
        out[col] = out[col].fillna(0)
    out["imps_delta"] = out["imps_cur"] - out["imps_prev"]
    out["clicks_delta"] = out["clicks_cur"] - out["clicks_prev"]
    out["pos_delta"] = out["pos_cur"] - out["pos_prev"]
    return out


def records(df: pd.DataFrame, columns: list[str] | None = None, limit: int | None = None) -> list[dict]:
    work = df.copy()
    if columns:
        work = work[columns]
    if limit is not None:
        work = work.head(limit)
    work = work.replace([np.inf, -np.inf], np.nan)
    work = work.where(pd.notna(work), None)
    return json.loads(json.dumps(work.to_dict("records"), ensure_ascii=False, default=str))


qc_cur = load("gsc-query-country-2026-10-26.csv", "query")
qc_prev = load("gsc-query-country-previous-28d-2026-10-26.csv", "query")
qpc_cur = load("gsc-query-page-country-2026-10-26.csv", "query")
qpc_prev = load("gsc-query-page-country-previous-28d-2026-10-26.csv", "query")
dp = load("gsc-date-page-56d-2026-10-26.csv", "date")

for frame in (qpc_cur, qpc_prev):
    frame["locale"] = frame["page"].map(locale_of)
    frame["market"] = frame["country"].map(market_of)
for frame in (qc_cur, qc_prev):
    frame["market"] = frame["country"].map(market_of)
dp["locale"] = dp["page"].map(locale_of)
dp_cur = dp[(dp["date"] >= CURRENT[0]) & (dp["date"] <= CURRENT[1])].copy()
dp_prev = dp[(dp["date"] >= PREVIOUS[0]) & (dp["date"] <= PREVIOUS[1])].copy()

# Full-property/page-dimension trend (includes anonymized-query traffic).
full_locale = compare(dp_cur, dp_prev, ["locale"]).sort_values("locale")
full_total = compare(dp_cur.assign(scope="all"), dp_prev.assign(scope="all"), ["scope"])
full_pages = compare(dp_cur, dp_prev, ["locale", "page"])
full_pages["path"] = full_pages["page"].map(lambda x: unquote(urlparse(x).path))

# Query-only views; never mix their absolute totals with full-property metrics.
market_query = compare(qc_cur, qc_prev, ["market"]).sort_values("market")
query_cmp = compare(qc_cur.assign(query=qc_cur["query"].str.lower().str.strip()), qc_prev.assign(query=qc_prev["query"].str.lower().str.strip()), ["query"])
query_cmp["is_brand"] = query_cmp["query"].str.contains(r"智印港|zprintpro|ジープリント", regex=True)
nonbrand = query_cmp[~query_cmp["is_brand"]].copy()

clusters = {
    "海報/posters": r"海報|印海報|poster",
    "紙袋/paper bags": r"紙袋|paper bag|paper bags",
    "食品包裝/food packaging": r"食品包裝|食品印刷|食品 パッケージ|food packaging|food box|food boxes",
    "包裝盒/packaging boxes": r"包裝盒|紙盒|パッケージ|packaging box|packaging boxes|custom box|custom boxes|mailer box",
    "貼紙/stickers-labels": r"貼紙|標籤|シール|ステッカー|ラベル|sticker|label",
    "傳單/flyers": r"宣傳單張|傳單|チラシ|フライヤー|flyer|leaflet",
    "書刊小冊子/books-booklets": r"書刊|印書|小冊子|騎馬釘|冊子|中綴じ|教科書|booklet|saddle stitch|perfect bound|textbook|exercise book",
    "同人誌/doujin-zine": r"同人|コミケ|doujin|zine|fanzine|comiket|artist alley",
    "月曆/calendars": r"月曆|カレンダー|calendar",
    "急件/rush": r"即日|急件|特急|早い|same day|next day|rush|overnight",
    "年賀狀-holiday cards": r"年賀状|年賀|nengajo|holiday card|holiday cards|christmas card|christmas cards|greeting card|greeting cards",
    "利是封/red packets": r"利是封|紅包|ポチ袋|red packet|red packets|red envelope|red envelopes",
    "信封/envelopes": r"信封|封筒|envelope|envelopes",
    "畢業紀念冊/yearbooks": r"畢業紀念冊|卒業アルバム|卒アル|yearbook|graduation album",
    "型錄/catalogs": r"目錄|型錄|カタログ|catalog|catalogue",
}


def add_cluster(frame: pd.DataFrame) -> pd.DataFrame:
    out = frame.copy()
    queries = out["query"].fillna("").str.lower()
    out["cluster"] = "其他"
    for name, pattern in clusters.items():
        mask = queries.str.contains(pattern, regex=True)
        out.loc[mask, "cluster"] = name
    return out


cluster_cmp = compare(add_cluster(qpc_cur), add_cluster(qpc_prev), ["locale", "cluster"])
cluster_cmp = cluster_cmp[cluster_cmp["cluster"] != "其他"].sort_values(["locale", "imps_cur"], ascending=[True, False])

info_pattern = r"size|sizes|how |what |template|design|meaning|とは|サイズ|作り方|書き方|違い|邊度|點樣|幾多|價錢|价格|價格|料金|相場|比較|comparison| vs |alternative|best |evaluate"
money_pattern = r"訂製|訂做|定制|價錢|價格|報價|即日|急件|印刷|打印|激安|格安|料金|相場|小ロット|早い|特急|custom|cheap|price|cost|bulk|small batch|no minimum|same day|next day|rush|printing|printer|print company|print services"
nonbrand["intent"] = np.select(
    [nonbrand["query"].str.contains(info_pattern, regex=True), nonbrand["query"].str.contains(money_pattern, regex=True)],
    ["信息/比较", "商业/交易"],
    default="泛词/待判",
)

opportunities = nonbrand[(nonbrand["imps_cur"] >= 10) & (nonbrand["pos_cur"] >= 4) & (nonbrand["pos_cur"] <= 20)].copy()
opportunities["priority_score"] = opportunities["imps_cur"] * (21 - opportunities["pos_cur"]) / 17
opportunities = opportunities.sort_values(["priority_score", "imps_cur"], ascending=False)

ctr_gaps = nonbrand[(nonbrand["imps_cur"] >= 5) & (nonbrand["pos_cur"] <= 10) & (nonbrand["clicks_cur"] == 0)].copy()
ctr_gaps = ctr_gaps.sort_values("imps_cur", ascending=False)

gains = nonbrand[(nonbrand["imps_cur"] >= 10)].sort_values("imps_delta", ascending=False)
declines = nonbrand[(nonbrand["imps_prev"] >= 10)].sort_values("imps_delta", ascending=True)
new_words = nonbrand[(nonbrand["imps_cur"] >= 10) & (nonbrand["imps_prev"] == 0)].sort_values("imps_cur", ascending=False)
lost_words = nonbrand[(nonbrand["imps_prev"] >= 10) & (nonbrand["imps_cur"] == 0)].sort_values("imps_prev", ascending=False)

# Exact locale attribution for target queries.
locale_query_cmp = compare(qpc_cur.assign(query=qpc_cur["query"].str.lower().str.strip()), qpc_prev.assign(query=qpc_prev["query"].str.lower().str.strip()), ["locale", "query"])
locale_query_cmp["is_brand"] = locale_query_cmp["query"].str.contains(r"智印港|zprintpro|ジープリント", regex=True)
locale_opps = locale_query_cmp[(~locale_query_cmp["is_brand"]) & (locale_query_cmp["imps_cur"] >= 8) & (locale_query_cmp["pos_cur"] >= 4) & (locale_query_cmp["pos_cur"] <= 20)].copy()
locale_opps["priority_score"] = locale_opps["imps_cur"] * (21 - locale_opps["pos_cur"]) / 17
locale_opps = locale_opps.sort_values(["locale", "priority_score"], ascending=[True, False])

seasonal = locale_query_cmp[locale_query_cmp["query"].str.contains(clusters["年賀狀-holiday cards"], regex=True)].sort_values("imps_cur", ascending=False)
question_words = nonbrand[(nonbrand["intent"] == "信息/比较") & (nonbrand["imps_cur"] >= 5)].sort_values("imps_cur", ascending=False)

# Cannibalization: multiple meaningful landing pages for the same query and locale.
cannibal_rows = []
for (query, locale), group in qpc_cur.groupby(["query", "locale"]):
    total_imps = group["imps"].sum()
    significant = group[group["imps"] >= 3].copy()
    if total_imps < 20 or significant["page"].nunique() < 2:
        continue
    page_imps = significant.groupby("page")["imps"].sum().sort_values(ascending=False)
    share = page_imps.iloc[0] / page_imps.sum()
    if share > 0.85:
        continue
    cannibal_rows.append({
        "query": query,
        "locale": locale,
        "imps": int(total_imps),
        "pages": int(page_imps.size),
        "top_page_share": round(float(share), 3),
        "page_imps": {unquote(urlparse(k).path): int(v) for k, v in page_imps.items()},
    })
cannibal = sorted(cannibal_rows, key=lambda x: x["imps"], reverse=True)

# Page-level sources of English decline and Japanese growth.
en_page_declines = full_pages[(full_pages["locale"] == "en") & (full_pages["imps_prev"] >= 30)].sort_values("imps_delta", ascending=True)
ja_page_gains = full_pages[(full_pages["locale"] == "ja") & (full_pages["imps_cur"] >= 20)].sort_values("imps_delta", ascending=False)

columns_cmp = ["clicks_cur", "imps_cur", "pos_cur", "ctr_cur", "clicks_prev", "imps_prev", "pos_prev", "ctr_prev", "imps_delta", "clicks_delta", "pos_delta"]
result = {
    "meta": {
        "current_window": CURRENT,
        "previous_window": PREVIOUS,
        "query_country_rows_current": len(qc_cur),
        "query_country_rows_previous": len(qc_prev),
        "note": "Full-property date/page metrics and query-only metrics are separate GSC aggregation scopes; never mix them.",
    },
    "full_total": records(full_total, ["scope"] + columns_cmp),
    "full_locale": records(full_locale, ["locale"] + columns_cmp),
    "query_market": records(market_query, ["market"] + columns_cmp),
    "clusters": records(cluster_cmp, ["locale", "cluster"] + columns_cmp),
    "opportunities": records(opportunities, ["query", "intent"] + columns_cmp + ["priority_score"], 60),
    "ctr_gaps": records(ctr_gaps, ["query", "intent"] + columns_cmp, 50),
    "gains": records(gains, ["query"] + columns_cmp, 30),
    "declines": records(declines, ["query"] + columns_cmp, 30),
    "new_words": records(new_words, ["query"] + columns_cmp, 30),
    "lost_words": records(lost_words, ["query"] + columns_cmp, 30),
    "locale_opportunities": records(locale_opps, ["locale", "query"] + columns_cmp + ["priority_score"], 100),
    "seasonal": records(seasonal, ["locale", "query"] + columns_cmp, 60),
    "question_words": records(question_words, ["query"] + columns_cmp, 50),
    "cannibalization": cannibal[:40],
    "en_page_declines": records(en_page_declines, ["path"] + columns_cmp, 40),
    "ja_page_gains": records(ja_page_gains, ["path"] + columns_cmp, 40),
    "top_pages": records(full_pages.sort_values("imps_cur", ascending=False), ["locale", "path"] + columns_cmp, 80),
}

out = LOG / "gsc-deep-analysis-2026-10-26.json"
out.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
opp_out = LOG / "gsc-opportunities-2026-10-26.csv"
opportunities.to_csv(opp_out, index=False, encoding="utf-8-sig")
print(f"Wrote {out} and {opp_out}")
for section in ("full_total", "full_locale", "query_market", "clusters", "opportunities", "ctr_gaps", "seasonal", "cannibalization", "en_page_declines", "ja_page_gains"):
    print(f"\n## {section}")
    print(json.dumps(result[section][:20] if isinstance(result[section], list) else result[section], ensure_ascii=False, indent=2))
