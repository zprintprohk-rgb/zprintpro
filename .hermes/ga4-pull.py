#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
GA4 拉取 (2026-09-12 建) —— 补齐 cron prompt 引用但仓库缺失的 fetch_ga4_events.py 能力。

步骤:
  1) 用 GSC service account (C:\\Users\\Administrator\\gsc-key.json) 调 Admin API 自动发现 GA4 property ID
  2) 用 Data API runReport 拉指定天数内的 whatsapp_click 事件 × 落地页 × 会话来源
用途: 把「为什么这几天名片询盘集中」从推断升级为实测 (K3 2026-09-12 授权 SA 为 GA4 查看者)

用法: python .hermes/ga4-pull.py [--days 7]
"""
import argparse
import json
import os
import sys

KEY = os.environ.get("GSC_KEY_FILE", r"C:\Users\Administrator\gsc-key.json")
SA_EMAIL = json.load(open(KEY, encoding="utf-8"))["client_email"]


def creds(scopes):
    from google.oauth2 import service_account
    return service_account.Credentials.from_service_account_file(KEY, scopes=scopes)


def discover_properties():
    """列出该 SA 可见的所有 GA4 媒体资源 (Admin API accountSummaries)。"""
    from google.analytics.admin import AnalyticsAdminServiceClient
    c = AnalyticsAdminServiceClient(
        credentials=creds(["https://www.googleapis.com/auth/analytics.readonly"])
    )
    out = []
    for s in c.list_account_summaries():
        for p in s.property_summaries:
            out.append((p.property, p.display_name))
    return out


def run_report(prop, days):
    from google.analytics.data_v1beta import BetaAnalyticsDataClient
    from google.analytics.data_v1beta.types import (
        DateRange, Dimension, Metric, RunReportRequest,
    )
    c = BetaAnalyticsDataClient(
        credentials=creds(["https://www.googleapis.com/auth/analytics.readonly"])
    )
    req = RunReportRequest(
        property=prop,
        date_ranges=[DateRange(start_date=f"{days}daysAgo", end_date="today")],
        dimensions=[Dimension(name="eventName"), Dimension(name="landingPagePlusQueryString")],
        metrics=[Metric(name="eventCount"), Metric(name="totalUsers")],
        dimension_filter={
            "filter": {
                "field_name": "eventName",
                "string_filter": {"match_type": "EXACT", "value": "whatsapp_click"},
            }
        },
    )
    return c.run_report(req)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--days", type=int, default=7)
    a = ap.parse_args()

    print(f"[1] SA: {SA_EMAIL}")
    try:
        props = discover_properties()
    except Exception as e:  # noqa: BLE001
        print(f"[x] Admin API 失败: {type(e).__name__}: {str(e)[:300]}")
        print("    -> 若为 403/PERMISSION_DENIED: SA 未加入该 GA4 媒体资源, 或 Admin API 未启用")
        return 2
    if not props:
        print("[x] 该 SA 看不到任何 GA4 媒体资源 (需在 GA4 加为查看者)")
        return 2
    print(f"[2] 可见媒体资源 {len(props)} 个:")
    for p, name in props:
        print(f"    {p}  {name}")

    prop = props[0][0]
    print(f"[3] 用 {prop} 拉最近 {a.days} 天 whatsapp_click:")
    try:
        r = run_report(prop, a.days)
    except Exception as e:  # noqa: BLE001
        print(f"[x] Data API 失败: {type(e).__name__}: {str(e)[:300]}")
        return 2

    total = 0
    rows = []
    for row in r.rows:
        ev = row.dimension_values[0].value
        page = row.dimension_values[1].value
        cnt = int(float(row.metric_values[0].value))
        users = int(float(row.metric_values[1].value))
        total += cnt
        rows.append((cnt, users, page))
    rows.sort(reverse=True)
    print(f"    whatsapp_click 总计: {total} 次, 落地页 {len(rows)} 个")
    for cnt, users, page in rows[:25]:
        print(f"    {cnt:5d} 次 / {users:4d} 用户   {page[:110]}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
