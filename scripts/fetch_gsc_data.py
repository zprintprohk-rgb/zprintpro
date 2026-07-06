"""
zprintpro GSC Data Fetcher (2026-07-06 新增, 替代 gsc_data.csv 手动 export)
- 拉过去 90 天 Search Console data
- OAuth2 service account (KeyFile)
- 维度: query (单维度, 跟现有 gsc_data.csv 同 schema)
- 输出: 写到 gsc_data.csv (兼容现有 cron 解析)

配置 (从 .env 或 .env.example):
  GSC_ACCOUNT_EMAIL = your-service-account@project.iam.gserviceaccount.com
  GSC_KEY_FILE      = C:\\Users\\Administrator\\gsc-key.json
  GSC_SITE_URL      = https://zprintpro.com/

Usage:
  python scripts/fetch_gsc_data.py                    # last 90 days, write to ./gsc_data.csv
  python scripts/fetch_gsc_data.py --days 60          # 自定义窗口
  python scripts/fetch_gsc_data.py --dry-run          # 不写 CSV, 只打印
"""
from __future__ import annotations
import argparse
import csv
import io
import json
import os
import sys
from datetime import date, datetime, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent  # F:\\zprintpro-nextjs
DEFAULT_CSV = ROOT / "gsc_data.csv"


def load_env() -> dict:
    """从 .env (无依赖)."""
    env = {}
    env_path = ROOT / ".env"
    if env_path.exists():
        # 用 utf-8-sig 自动 strip BOM (PowerShell WriteAllText 默认加 BOM)
        try:
            content = env_path.read_text(encoding="utf-8-sig")
        except UnicodeDecodeError:
            content = env_path.read_text(encoding="gbk", errors="replace")
        for line in content.splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            env[k.strip()] = v.strip().strip('"').strip("'")
    # 优先级: env var > .env
    for k in ("GSC_ACCOUNT_EMAIL", "GSC_KEY_FILE", "GSC_SITE_URL"):
        if os.environ.get(k):
            env[k] = os.environ[k]
    return env


def ensure_auth(env: dict) -> tuple[bool, str, str, str]:
    """验证 env + key file, 返回 (ok, email, key_path, site_url) 或 (False, error, '', '')."""
    email = env.get("GSC_ACCOUNT_EMAIL", "")
    key_path = env.get("GSC_KEY_FILE", "")
    site_url = env.get("GSC_SITE_URL", "")

    if not email or "your-service-account" in email:
        return False, "GSC_ACCOUNT_EMAIL 未设置 (或仍是 .env.example placeholder)", "", ""
    if not key_path:
        return False, "GSC_KEY_FILE 未设置", "", ""
    if not Path(key_path).exists():
        return False, f"service account key file 不存在: {key_path}", "", ""
    # 验证 key JSON 至少能解析
    try:
        with open(key_path, "r", encoding="utf-8") as f:
            key_data = json.load(f)
        if "client_email" not in key_data:
            return False, f"key file 格式无效 (缺 client_email): {key_path}", "", ""
    except Exception as e:
        return False, f"key file 解析失败: {e}", "", ""
    if not site_url:
        return False, "GSC_SITE_URL 未设置", "", ""
    return True, email, key_path, site_url


def build_client(key_file: str, delegated_email: str):
    """构建 Search Console API client (OAuth2 service account).

    注意: 在国内网络环境下, Google API endpoint 直连经常超时.
    推荐在 .env 加 GOOGLE_API_PROXY=http://127.0.0.1:7892 让 httplib2 用 HTTP CONNECT proxy.
    """
    from google.oauth2 import service_account
    from googleapiclient import discovery

    http = None
    proxy = os.environ.get("GOOGLE_API_PROXY") or os.environ.get("HTTPS_PROXY") or os.environ.get("HTTP_PROXY")
    if proxy:
        try:
            import httplib2
            import socks  # PySocks package, gives PROXY_TYPE_HTTP constant

            # parse "http://127.0.0.1:7892"
            proto, rest = proxy.split("://", 1)
            host_port = rest.rstrip("/").split(":")
            host = host_port[0]
            port = int(host_port[1])
            http = httplib2.Http(proxy_info=httplib2.ProxyInfo(
                socks.PROXY_TYPE_HTTP, host, port,
            ))
            print(f"   using proxy: {host}:{port}")
        except Exception as e:
            print(f"!! proxy setup failed: {e}; falling back to direct")
            http = None

    SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]
    credentials = service_account.Credentials.from_service_account_file(
        key_file, scopes=SCOPES
    )
    if delegated_email:
        credentials = credentials.with_subject(delegated_email)
    if http is not None:
        # Wrap our httplib2 Http through google_auth_httplib2 so credentials auto-refresh work
        from google_auth_httplib2 import AuthorizedHttp
        authed_http = AuthorizedHttp(credentials, http=http)
        return discovery.build(
            "searchconsole", "v1", http=authed_http, cache_discovery=False
        )
    return discovery.build(
        "searchconsole", "v1", credentials=credentials, cache_discovery=False
    )


def fetch_search_analytics(client, site_url: str, start: str, end: str, row_limit: int = 25000):
    """拉搜索分析 data (dimension=query, aggregationType=byProperty 默认)."""
    request = {
        "startDate": start,
        "endDate": end,
        "dimensions": ["query"],
        "rowLimit": row_limit,
        "startRow": 0,
    }
    all_rows = []
    while True:
        response = (
            client.searchanalytics()
            .query(siteUrl=site_url, body=request)
            .execute()
        )
        rows = response.get("rows", [])
        if not rows:
            break
        all_rows.extend(rows)
        if len(rows) < row_limit:
            break
        request["startRow"] = request["startRow"] + len(rows)
    return all_rows


def fetch_sitemaps(client, site_url: str) -> list[dict]:
    """列出所有 sitemap (用来诊断 coverage)."""
    try:
        response = client.sitemaps().list(siteUrl=site_url).execute()
        return response.get("sitemap", [])
    except Exception as e:
        return [{"error": str(e)}]


def fetch_sites(client) -> list[dict]:
    """列出 all sites user has access to."""
    response = client.sites().list().execute()
    return response.get("siteEntry", [])


def write_csv(rows: list[dict], out_path: Path):
    """写 CSV (跟现有 schema 兼容: 热门查询,点击次数,展示,点击率,排名)."""
    out = io.StringIO()
    writer = csv.writer(out, lineterminator="\n")
    writer.writerow(["热门查询", "点击次数", "展示", "点击率(%)", "排名"])
    total_clicks = 0
    total_imps = 0
    for r in rows:
        # API response keys: keys=['<query>'], clicks, impressions, ctr (0-1), position
        keys = r.get("keys", [])
        kw = keys[0] if keys else ""
        clicks = r.get("clicks", 0)
        imps = r.get("impressions", 0)
        ctr = r.get("ctr", 0)
        pos = r.get("position", 0)
        writer.writerow([kw, clicks, imps, f"{ctr * 100:.2f}", f"{pos:.2f}"])
        total_clicks += clicks
        total_imps += imps

    data = out.getvalue().encode("utf-8")
    out_path.write_bytes(data)
    return {"total_clicks": total_clicks, "total_imps": total_imps, "rows": len(rows)}


def main():
    parser = argparse.ArgumentParser(description="Fetch GSC search analytics → gsc_data.csv")
    parser.add_argument("--days", type=int, default=90, help="窗口天数 (默认 90, GSC 默认最大窗口)")
    parser.add_argument("--dry-run", action="store_true", help="只打印, 不写 CSV")
    parser.add_argument("--out", type=Path, default=DEFAULT_CSV, help="输出路径 (默认 ./gsc_data.csv)")
    parser.add_argument("--site-url", help="override GSC_SITE_URL env")
    parser.add_argument("--also-fetch-sitemaps", action="store_true", help="额外列 sitemap")
    args = parser.parse_args()

    # 1. 加载 env
    env = load_env()
    if args.site_url:
        env["GSC_SITE_URL"] = args.site_url

    # 2. 验证 auth
    ok, info, key_path, site_url = ensure_auth(env)
    if not ok:
        print(f"❌ AUTH FAIL: {info}", file=sys.stderr)
        print(file=sys.stderr)
        print("Setup checklist:", file=sys.stderr)
        print("  1. GCP: enable Search Console API + create service account + download JSON key", file=sys.stderr)
        print("  2. GSC: add service account email as Owner/Full user to https://zprintpro.com property", file=sys.stderr)
        print("  3. .env: set GSC_ACCOUNT_EMAIL=<service-account-email> GSC_KEY_FILE=<key-path> GSC_SITE_URL=https://zprintpro.com/", file=sys.stderr)
        print("  4. docs/GSC-API-SETUP.md for step-by-step", file=sys.stderr)
        return 2

    print(f"✅ auth config OK")
    print(f"   email:   {info}")
    print(f"   key:     {key_path}")
    print(f"   site:    {site_url}")
    print()

    # 3. 拉数据
    end = date.today() - timedelta(days=1)  # GSC API 通常 yesterday 是最新完整数据
    start = end - timedelta(days=args.days - 1)
    print(f"Fetching GSC search analytics: {start} ~ {end} ({args.days} days)")
    print()

    client = build_client(key_path, info)
    if args.dry_run:
        # 只调少量测试
        rows = fetch_search_analytics(client, site_url, start.isoformat(), end.isoformat(), row_limit=10)
        print(f"DRY RUN: {len(rows)} rows preview:")
        for r in rows[:5]:
            print(f"  {r}")
        return 0

    rows = fetch_search_analytics(client, site_url, start.isoformat(), end.isoformat())
    print(f"Fetched {len(rows)} rows.")

    # 4. 写 CSV
    stats = write_csv(rows, args.out)
    print(f"\nWritten to: {args.out}")
    print(f"  rows:        {stats['rows']}")
    print(f"  total clicks:    {stats['total_clicks']}")
    print(f"  total imps:      {stats['total_imps']}")

    # 5. 可选: 列 sitemaps
    if args.also_fetch_sitemaps:
        print("\n--- Sitemaps ---")
        for sm in fetch_sitemaps(client, site_url):
            print(f"  {sm.get('path', sm)}: {sm.get('lastSubmitted', '?')} submitted, {sm.get('lastDownloaded', '?')} downloaded")

    return 0


if __name__ == "__main__":
    sys.exit(main())
