from pathlib import Path
from urllib.parse import urlparse
import json
import pandas as pd

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / ".kimi-work" / "packaging-research-20261026"
LOGS = ROOT / ".hermes" / "logs"
TERMS = (
    "packag", "box", "boxes", "carton", "rigid", "mailer", "kraft",
    "包裝", "包装", "紙盒", "纸盒", "彩盒", "禮盒", "礼盒", "天地", "坑盒",
    "パッケージ", "化粧箱", "貼り箱", "クラフト紙", "段ボール", "ギフトボックス",
)

def locale_of(url: str) -> str:
    path = urlparse(str(url)).path
    parts = [p for p in path.split("/") if p]
    return parts[0] if parts and parts[0] in {"en", "ja", "zh-hk"} else "other"

def path_of(url: str) -> str:
    return urlparse(str(url)).path

def load(name: str) -> pd.DataFrame:
    df = pd.read_csv(LOGS / name)
    df.columns = ["query", "page", "country", "clicks", "impressions", "ctr_pct", "position"]
    df["locale"] = df["page"].map(locale_of)
    df["path"] = df["page"].map(path_of)
    df["is_packaging"] = df["query"].fillna("").str.lower().map(
        lambda q: any(t in q for t in TERMS)
    )
    return df[df["is_packaging"]].copy()

def aggregate(df: pd.DataFrame, keys: list[str], suffix: str) -> pd.DataFrame:
    if df.empty:
        return pd.DataFrame(columns=keys + [f"clicks_{suffix}", f"impressions_{suffix}", f"position_{suffix}"])
    grouped = []
    for key, g in df.groupby(keys, dropna=False):
        imps = float(g["impressions"].sum())
        row = dict(zip(keys if isinstance(key, tuple) else [key], key if isinstance(key, tuple) else [key]))
        row.update({
            f"clicks_{suffix}": float(g["clicks"].sum()),
            f"impressions_{suffix}": imps,
            f"position_{suffix}": float((g["position"] * g["impressions"]).sum() / imps) if imps else None,
            f"pages_{suffix}": int(g["path"].nunique()),
        })
        grouped.append(row)
    return pd.DataFrame(grouped)

cur = load("gsc-query-page-country-2026-10-26.csv")
prev = load("gsc-query-page-country-previous-28d-2026-10-26.csv")
cur_q = aggregate(cur, ["locale", "query"], "cur")
prev_q = aggregate(prev, ["locale", "query"], "prev")
queries = cur_q.merge(prev_q, on=["locale", "query"], how="outer")
for c in ["clicks_cur", "impressions_cur", "pages_cur", "clicks_prev", "impressions_prev", "pages_prev"]:
    queries[c] = queries[c].fillna(0)
queries["impressions_delta"] = queries["impressions_cur"] - queries["impressions_prev"]
queries["position_delta"] = queries["position_cur"] - queries["position_prev"]
queries = queries.sort_values(["locale", "impressions_cur", "clicks_cur"], ascending=[True, False, False])
queries.to_csv(OUT / "packaging-gsc-queries.csv", index=False, encoding="utf-8-sig")

cur_pages = aggregate(cur, ["locale", "path"], "cur")
prev_pages = aggregate(prev, ["locale", "path"], "prev")
pages = cur_pages.merge(prev_pages, on=["locale", "path"], how="outer")
for c in ["clicks_cur", "impressions_cur", "clicks_prev", "impressions_prev"]:
    pages[c] = pages[c].fillna(0)
pages["impressions_delta"] = pages["impressions_cur"] - pages["impressions_prev"]
pages = pages.sort_values(["locale", "impressions_cur"], ascending=[True, False])
pages.to_csv(OUT / "packaging-gsc-pages.csv", index=False, encoding="utf-8-sig")

summary = json.loads((LOGS / "gsc-deep-analysis-2026-10-26.json").read_text(encoding="utf-8"))
clusters = [r for r in summary["clusters"] if "包裝盒" in r["cluster"] or "食品包裝" in r["cluster"]]
cannibalization = [r for r in summary["cannibalization"] if any(t in r["query"].lower() for t in TERMS)]

payload = {
    "method": "Packaging rows filtered from query×page×country. Query/page aggregates are weighted by impressions within that scope; do not compare totals with date×page or query×country scopes.",
    "current_window": summary["meta"]["current_window"],
    "previous_window": summary["meta"]["previous_window"],
    "clusters": clusters,
    "cannibalization": cannibalization,
    "top_queries": queries.groupby("locale", group_keys=False).head(25).to_dict(orient="records"),
    "top_pages": pages.groupby("locale", group_keys=False).head(25).to_dict(orient="records"),
}
payload_json = json.dumps(payload, ensure_ascii=False, indent=2).replace("NaN", "null")
(OUT / "packaging-local-evidence.json").write_text(payload_json, encoding="utf-8")

print("PACKAGING CLUSTERS")
print(pd.DataFrame(clusters)[["locale", "cluster", "imps_cur", "clicks_cur", "pos_cur", "imps_prev", "pos_prev"]].to_string(index=False))
print("\nTOP QUERIES BY LOCALE")
print(queries.groupby("locale", group_keys=False).head(12)[["locale", "query", "impressions_cur", "clicks_cur", "position_cur", "impressions_prev", "position_prev", "pages_cur"]].to_string(index=False))
print("\nTOP PAGES BY LOCALE")
print(pages.groupby("locale", group_keys=False).head(12)[["locale", "path", "impressions_cur", "clicks_cur", "position_cur", "impressions_prev"]].to_string(index=False))
print(f"\nWrote {OUT / 'packaging-local-evidence.json'}")
