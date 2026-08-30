"""
Schema 探针: 对照 information_schema.columns (实跑) 和 008/002 迁移文件
目的: tracking.ts 字段对齐 (K3 8/29 拍板 - 别再犯字段对不上的错)
"""
from __future__ import annotations
import os
import sys
import json
import urllib.request
import urllib.error
from datetime import datetime, timezone

SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL", "").rstrip("/")
SERVICE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")
ANON_KEY = os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY", "")
TIMEOUT = 30

# 想查的 2 张表 (tracking.ts 写入目标)
TABLES = ["quote_requests", "whatsapp_inquiries"]


def log(level: str, msg: str) -> None:
    ts = datetime.now(timezone.utc).strftime("%H:%M:%S")
    print(f"[{ts}] {level:5s} | {msg}", flush=True)


def http_get(path: str, headers: dict):
    url = f"{SUPABASE_URL}{path}"
    req = urllib.request.Request(url, method="GET", headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
            return resp.status, json.loads(resp.read().decode("utf-8") or "null")
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        try:
            return e.code, json.loads(body)
        except json.JSONDecodeError:
            return e.code, body


def query_table_columns():
    """用 service_role 查 information_schema.columns"""
    headers = {
        "apikey": SERVICE_KEY,
        "Authorization": f"Bearer {SERVICE_KEY}",
    }
    # PostgREST 不一定暴露 information_schema; 用 pg_catalog 函数
    # 替代: 用 /rest/v1/rpc/<fn> 不行, 改用直接的 SQL endpoint (如果 Supabase 启用了)
    # fallback: 通过 rpc 调用 get_columns() 函数 (如果有)
    # 实际方案: Supabase 的 SQL Editor 是用 pg-meta 走的, REST 不直接支持
    # → 改用 Supabase Management API: POST /v1/projects/{ref}/database/query
    # 那个需要 personal access token, 这里用 service_role 走 PostgREST
    # 测试能否直接 GET information_schema
    for tbl in TABLES:
        path = f"/rest/v1/information_schema.columns?table_name=eq.{tbl}&select=table_name,column_name,data_type,is_nullable,column_default,character_maximum_length&order=table_name,ordinal_position"
        status, resp = http_get(path, headers)
        if status == 200 and isinstance(resp, list):
            log("PASS", f"information_schema 查询 {tbl}: {len(resp)} 列")
            print()
            print(f"=== {tbl} (information_schema 实跑) ===")
            print(f"{'column':<25} {'type':<25} {'nullable':<10} {'default':<30}")
            print("-" * 95)
            for col in resp:
                t = col.get("data_type", "?")
                if col.get("character_maximum_length"):
                    t = f"{t}({col['character_maximum_length']})"
                nullable = "YES" if col.get("is_nullable") == "YES" else "NO"
                default = (col.get("column_default") or "")[:28]
                print(f"{col['column_name']:<25} {t:<25} {nullable:<10} {default:<30}")
            print()
        else:
            log("FAIL", f"information_schema 查询 {tbl}: {status} {resp}")


def main():
    print("=" * 70)
    print("Schema 探针: tracking.ts 字段对齐 (K3 8/29 拍板)")
    print("=" * 70)
    if not SUPABASE_URL or not SERVICE_KEY:
        log("FAIL", "env 缺失, 必填 NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY")
        return 2
    query_table_columns()
    return 0


if __name__ == "__main__":
    sys.exit(main())
