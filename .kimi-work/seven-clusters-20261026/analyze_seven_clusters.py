from pathlib import Path
from urllib.parse import urlparse
import json
import pandas as pd

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / ".kimi-work" / "seven-clusters-20261026"
LOGS = ROOT / ".hermes" / "logs"

CLUSTERS = {
    "stickers": ["sticker", "label", "貼紙", "標籤", "シール", "ステッカー", "ラベル"],
    "doujin_comiket": ["doujin", "comiket", "zine", "同人", "コミケ", "c109"],
    "books_school": ["saddle stitch", "booklet", "exercise book", "textbook", "workbook", "school printing", "小冊子", "騎馬釘", "教材", "教科書", "学校", "中綴じ", "冊子"],
    "catalog": ["catalog", "catalogue", "目錄", "カタログ"],
    "poster_flyer_rush": ["poster", "flyer", "leaflet", "same day", "rush printing", "海報", "傳單", "宣傳單張", "即日", "急件", "ポスター", "チラシ", "フライヤー", "特急"],
    "nengajo_yearbook": ["nengajo", "new year card", "graduation", "yearbook", "年賀状", "卒アル", "卒業アルバム", "卒業記念"],
    "paperbags_eco": ["paper bag", "paper bags", "paperbag", "kraft bag", "eco-friendly packaging", "eco friendly packaging", "sustainable packaging", "紙袋", "環保包裝", "エコパッケージ"],
}


def locale_of(url):
    parts = [p for p in urlparse(str(url)).path.split("/") if p]
    return parts[0] if parts and parts[0] in {"en", "ja", "zh-hk"} else "other"


def path_of(url):
    return urlparse(str(url)).path


def load(name):
    df = pd.read_csv(LOGS / name)
    df.columns = ["query", "page", "country", "clicks", "impressions", "ctr_pct", "position"]
    df["query"] = df["query"].fillna("").astype(str)
    df["qlower"] = df["query"].str.lower()
    df["locale"] = df["page"].map(locale_of)
    df["path"] = df["page"].map(path_of)
    return df


def cluster_of(query):
    for cluster, terms in CLUSTERS.items():
        if any((t in query) if t != "zine" else ("zine" in query.split()) for t in terms):
            return cluster
    return None


def aggregate(df, keys, suffix):
    if df.empty:
        return pd.DataFrame(columns=keys + [f"clicks_{suffix}", f"impressions_{suffix}", f"position_{suffix}", f"pages_{suffix}"])
    rows = []
    for key, g in df.groupby(keys, dropna=False):
        key = key if isinstance(key, tuple) else (key,)
        imps = float(g["impressions"].sum())
        row = dict(zip(keys, key))
        row.update({
            f"clicks_{suffix}": float(g["clicks"].sum()),
            f"impressions_{suffix}": imps,
            f"position_{suffix}": float((g["position"] * g["impressions"]).sum() / imps) if imps else None,
            f"pages_{suffix}": int(g["path"].nunique()),
        })
        rows.append(row)
    return pd.DataFrame(rows)


def compare(cur, prev, keys):
    out = aggregate(cur, keys, "cur").merge(aggregate(prev, keys, "prev"), on=keys, how="outer")
    for c in ["clicks_cur", "impressions_cur", "pages_cur", "clicks_prev", "impressions_prev", "pages_prev"]:
        out[c] = out[c].fillna(0)
    out["impressions_delta"] = out["impressions_cur"] - out["impressions_prev"]
    out["position_delta"] = out["position_cur"] - out["position_prev"]
    return out


cur = load("gsc-query-page-country-2026-10-26.csv")
prev = load("gsc-query-page-country-previous-28d-2026-10-26.csv")
for df in (cur, prev):
    df["cluster"] = df["qlower"].map(cluster_of)
cur = cur[cur["cluster"].notna()].copy()
prev = prev[prev["cluster"].notna()].copy()

queries = compare(cur, prev, ["locale", "cluster", "query"]).sort_values(["cluster", "locale", "impressions_cur", "impressions_prev"], ascending=[True, True, False, False])
pages = compare(cur, prev, ["locale", "cluster", "path"]).sort_values(["cluster", "locale", "impressions_cur", "impressions_prev"], ascending=[True, True, False, False])
summary = compare(cur, prev, ["locale", "cluster"]).sort_values(["cluster", "locale"])

queries.to_csv(OUT / "seven-cluster-queries.csv", index=False, encoding="utf-8-sig")
pages.to_csv(OUT / "seven-cluster-pages.csv", index=False, encoding="utf-8-sig")
summary.to_csv(OUT / "seven-cluster-summary.csv", index=False, encoding="utf-8-sig")

summary_json = json.loads((LOGS / "gsc-deep-analysis-2026-10-26.json").read_text(encoding="utf-8"))
payload = {
    "method": "Filtered query×page×country rows, classified by the first matching cluster in the fixed CLUSTERS order. Aggregates are exposure in this scope, not market search volume or deduplicated site impressions. Position is impression-weighted. Current and previous use identical logic.",
    "current_window": summary_json["meta"]["current_window"],
    "previous_window": summary_json["meta"]["previous_window"],
    "cluster_order": list(CLUSTERS),
    "terms": CLUSTERS,
    "summary": summary.to_dict(orient="records"),
    "queries": queries.to_dict(orient="records"),
    "pages": pages.to_dict(orient="records"),
}
text = json.dumps(payload, ensure_ascii=False, indent=2).replace("NaN", "null")
(OUT / "seven-cluster-local-evidence.json").write_text(text, encoding="utf-8")

cols = ["locale", "cluster", "impressions_cur", "clicks_cur", "position_cur", "impressions_prev", "clicks_prev", "position_prev", "pages_cur"]
print("CLUSTER SUMMARY")
print(summary[cols].to_string(index=False))
print("\nTOP QUERIES PER CLUSTER")
print(queries.groupby(["cluster", "locale"], group_keys=False).head(8)[["locale", "cluster", "query", "impressions_cur", "clicks_cur", "position_cur", "impressions_prev", "position_prev", "pages_cur"]].to_string(index=False))
print("\nTOP PAGES PER CLUSTER")
print(pages.groupby(["cluster", "locale"], group_keys=False).head(6)[["locale", "cluster", "path", "impressions_cur", "clicks_cur", "position_cur", "impressions_prev", "clicks_prev"]].to_string(index=False))
