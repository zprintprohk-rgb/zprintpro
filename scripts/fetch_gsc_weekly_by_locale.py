"""
zprintpro GSC 每周三语数据拉取 (2026-08-09 Qwen 3.8 战略指令 T9)
- 按 locale 过滤 page 维度, 拉 zh-hk / en / ja 三语实际搜索关键词数据
- 附加全站 country 维度 (香港/美国/日本三大市场佐证)
- 输出: GSC数据/YYYY-MM-DD/{zh-hk,en,ja}_queries.csv + country.csv + weekly-summary.md
- CSV schema 与 gsc_data.csv 兼容 (热门查询,点击次数,展示,点击率(%),排名)

依赖: scripts/fetch_gsc_data.py 的 auth/proxy 逻辑 (import 复用)
配置: .env GSC_ACCOUNT_EMAIL / GSC_KEY_FILE / GSC_SITE_URL (sc-domain:zprintpro.com)
代理: 默认 http://127.0.0.1:7892 (GFW), GSC_PROXY=off 可关

Usage:
  python scripts/fetch_gsc_weekly_by_locale.py              # 28 天窗口
  python scripts/fetch_gsc_weekly_by_locale.py --days 90    # 自定义窗口
  python scripts/fetch_gsc_weekly_by_locale.py --dry-run    # 每 locale 只拉 10 行预览

退出码: 0 成功 / 2 auth 失败 / 3 网络或 API 失败
"""
from __future__ import annotations

import argparse
import sys
from datetime import date, timedelta
from pathlib import Path

SCRIPTS = Path(__file__).resolve().parent
sys.path.insert(0, str(SCRIPTS))

from fetch_gsc_data import build_client, ensure_auth, load_env, write_csv  # noqa: E402

ROOT = SCRIPTS.parent
OUT_ROOT = ROOT / "GSC数据"

# 三语 locale → page 过滤 (site = sc-domain, page 值 = 完整 URL, contains 匹配)
# 第三元素 = 阶段标签 (K3 8/9 认识修正: zh-hk = 老站 8 个月 + 301 继承 + 3 个月收割盘; en/ja = ~2026-07 打通的 1 个月播种盘)
LOCALES = [
    ("zh-hk", "/zh-hk/", "香港市場 (zh-hk · 收割期)"),
    ("en", "/en/", "美国市場 (en · 播种期)"),
    ("ja", "/ja/", "日本市場 (ja · 播种期)"),
]


def fetch_all_queries(client, site_url, start, end, row_limit=5000):
    """汇总: 全站 query 维度 (不过滤 locale, 对应 GSC UI 全站点导出)"""
    request = {
        "startDate": start,
        "endDate": end,
        "dimensions": ["query"],
        "rowLimit": row_limit,
        "startRow": 0,
    }
    all_rows = []
    while True:
        resp = client.searchanalytics().query(siteUrl=site_url, body=request).execute()
        rows = resp.get("rows", [])
        if not rows:
            break
        all_rows.extend(rows)
        if len(rows) < row_limit:
            break
        request["startRow"] += len(rows)
    return all_rows


def fetch_locale_queries(client, site_url, start, end, locale_path, row_limit=5000):
    """dimension=query + page contains /<locale>/ 过滤"""
    request = {
        "startDate": start,
        "endDate": end,
        "dimensions": ["query"],
        "dimensionFilterGroups": [
            {
                "filters": [
                    {"dimension": "page", "operator": "contains", "expression": locale_path}
                ]
            }
        ],
        "rowLimit": row_limit,
        "startRow": 0,
    }
    all_rows = []
    while True:
        resp = client.searchanalytics().query(siteUrl=site_url, body=request).execute()
        rows = resp.get("rows", [])
        if not rows:
            break
        all_rows.extend(rows)
        if len(rows) < row_limit:
            break
        request["startRow"] += len(rows)
    return all_rows


def fetch_country(client, site_url, start, end, row_limit=100):
    """全站 country 维度 (三大市场分布佐证)"""
    request = {
        "startDate": start,
        "endDate": end,
        "dimensions": ["country"],
        "rowLimit": row_limit,
    }
    resp = client.searchanalytics().query(siteUrl=site_url, body=request).execute()
    return resp.get("rows", [])


def write_country_csv(rows, out_path):
    import csv
    import io

    out = io.StringIO()
    w = csv.writer(out, lineterminator="\n")
    w.writerow(["国家/地区", "点击次数", "展示", "点击率(%)", "排名"])
    for r in rows:
        keys = r.get("keys", [])
        w.writerow(
            [
                keys[0] if keys else "",
                r.get("clicks", 0),
                r.get("impressions", 0),
                f"{r.get('ctr', 0) * 100:.2f}",
                f"{r.get('position', 0):.2f}",
            ]
        )
    out_path.write_bytes(out.getvalue().encode("utf-8"))


def main():
    parser = argparse.ArgumentParser(description="GSC 每周三语数据拉取 → GSC数据/日期/")
    parser.add_argument("--days", type=int, default=28, help="窗口天数 (默认 28)")
    parser.add_argument("--dry-run", action="store_true", help="每 locale 只拉 10 行预览, 不写文件")
    args = parser.parse_args()

    env = load_env()
    ok, info, key_path, site_url = ensure_auth(env)
    if not ok:
        print(f"❌ AUTH FAIL: {info}", file=sys.stderr)
        return 2
    print(f"✅ auth OK: {info} / {site_url}")

    end = date.today() - timedelta(days=1)
    start = end - timedelta(days=args.days - 1)
    print(f"窗口: {start} ~ {end} ({args.days} 天)")

    try:
        client = build_client(key_path, info)
    except Exception as e:
        print(f"❌ NETWORK/API FAIL (检查代理 127.0.0.1:7892 是否开启): {e}", file=sys.stderr)
        return 3

    out_dir = OUT_ROOT / date.today().isoformat()
    if args.dry_run:
        try:
            all_rows = fetch_all_queries(client, site_url, start.isoformat(), end.isoformat(), row_limit=10)
            print(f"\n[all] 汇总 (全站): {len(all_rows)} rows (preview)")
            for r in all_rows[:5]:
                print(f"   {r.get('keys', [''])[0]}  clicks={r.get('clicks')} imps={r.get('impressions')} pos={r.get('position'):.1f}")
        except Exception as e:
            print(f"❌ all FAIL: {e}", file=sys.stderr)
            return 3
        for code, path, label in LOCALES:
            try:
                rows = fetch_locale_queries(client, site_url, start.isoformat(), end.isoformat(), path, row_limit=10)
            except Exception as e:
                print(f"❌ {code} FAIL: {e}", file=sys.stderr)
                return 3
            print(f"\n[{code}] {label}: {len(rows)} rows (preview)")
            for r in rows[:5]:
                print(f"   {r.get('keys', [''])[0]}  clicks={r.get('clicks')} imps={r.get('impressions')} pos={r.get('position'):.1f}")
        return 0

    out_dir.mkdir(parents=True, exist_ok=True)
    summary_lines = [
        f"# GSC 三语周报 · {date.today().isoformat()}",
        "",
        f"- 窗口: {start} ~ {end} ({args.days} 天)",
        f"- property: {site_url}",
        "- 口径: 汇总 (全站) + page contains locale 前缀 (zh-hk / en / ja)",
        "",
    ]
    total = {}
    try:
        all_rows = fetch_all_queries(client, site_url, start.isoformat(), end.isoformat())
    except Exception as e:
        print(f"❌ all FAIL: {e}", file=sys.stderr)
        return 3
    stats_all = write_csv(all_rows, out_dir / "all_queries.csv")
    total["all"] = stats_all
    print(f"[all] 汇总 {stats_all['rows']} rows, clicks={stats_all['total_clicks']}, imps={stats_all['total_imps']}")
    top5_all = sorted(all_rows, key=lambda r: r.get("impressions", 0), reverse=True)[:5]
    summary_lines.append("## 汇总 (全站 all)")
    summary_lines.append(f"- rows={stats_all['rows']}  clicks={stats_all['total_clicks']}  imps={stats_all['total_imps']}")
    summary_lines.append("- Top5 by imps:")
    for r in top5_all:
        summary_lines.append(
            f"  - {r.get('keys', [''])[0]} | clicks={r.get('clicks')} imps={r.get('impressions')} pos={r.get('position'):.1f}"
        )
    summary_lines.append("")
    for code, path, label in LOCALES:
        try:
            rows = fetch_locale_queries(client, site_url, start.isoformat(), end.isoformat(), path)
        except Exception as e:
            print(f"❌ {code} FAIL: {e}", file=sys.stderr)
            return 3
        stats = write_csv(rows, out_dir / f"{code}_queries.csv")
        total[code] = stats
        print(f"[{code}] {stats['rows']} rows, clicks={stats['total_clicks']}, imps={stats['total_imps']}")
        top5 = sorted(rows, key=lambda r: r.get("impressions", 0), reverse=True)[:5]
        summary_lines.append(f"## {label} ({code})")
        summary_lines.append(f"- rows={stats['rows']}  clicks={stats['total_clicks']}  imps={stats['total_imps']}")
        summary_lines.append("- Top5 by imps:")
        for r in top5:
            summary_lines.append(
                f"  - {r.get('keys', [''])[0]} | clicks={r.get('clicks')} imps={r.get('impressions')} pos={r.get('position'):.1f}"
            )
        summary_lines.append("")

    try:
        country_rows = fetch_country(client, site_url, start.isoformat(), end.isoformat())
        write_country_csv(country_rows, out_dir / "country.csv")
        summary_lines.append("## 全站国家分布 Top10")
        for r in country_rows[:10]:
            summary_lines.append(
                f"- {r.get('keys', [''])[0]} | clicks={r.get('clicks')} imps={r.get('impressions')}"
            )
    except Exception as e:
        summary_lines.append(f"## 全站国家分布: 拉取失败 {e}")

    (out_dir / "weekly-summary.md").write_bytes("\n".join(summary_lines).encode("utf-8"))
    print(f"\n✅ 已写入: {out_dir}")
    print(f"   all={total['all']['rows']} zh-hk={total['zh-hk']['rows']} en={total['en']['rows']} ja={total['ja']['rows']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
