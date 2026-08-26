# -*- coding: utf-8 -*-
"""
mavis HTTP API PATCH cron 任务的 prompt 字段
- 绕开 CLI 5800 char buffer 限制 (per MEMORY.md 跨项目经验)
- 4 个 zprintpro cron prompts 已落盘 (.hermes/cron-prompts/zprintpro-*.md)
- SSoT 模式: .hermes/cron-prompts/{name}.md (git tracked) → daemon cache
"""
import urllib.request
import json
import os
from pathlib import Path

DAEMON = "http://127.0.0.1:8766"

# 4 个 zprintpro cron
CRONS = [
    {
        "id": "3684eb06-19af-4d74-93c8-20b95dd0e666",
        "name": "zprintpro-daily-content-1x7w",
        "file": r"F:\zprintpro-nextjs\.hermes\cron-prompts\zprintpro-daily-content-1x7w.md",
    },
    {
        "id": "69e01ab9-680c-46b6-8a53-601c07a6a4e1",
        "name": "zprintpro-weekly-meta-refresh",
        "file": r"F:\zprintpro-nextjs\.hermes\cron-prompts\zprintpro-weekly-meta-refresh.md",
    },
    {
        "id": "9e3c442d-4bcd-436b-ab44-c7a2c14db485",
        "name": "zprintpro-monthly-matrix-audit",
        "file": r"F:\zprintpro-nextjs\.hermes\cron-prompts\zprintpro-monthly-matrix-audit.md",
    },
    {
        "id": "6f9a93af-45cd-4ccd-afa3-17ccd82536e9",
        "name": "zprintpro-gsc-feedback-loop",
        "file": r"F:\zprintpro-nextjs\.hermes\cron-prompts\zprintpro-gsc-feedback-loop.md",
    },
]

for cron in CRONS:
    # 读 SSoT 文件
    p = Path(cron["file"])
    if not p.exists():
        print(f"SKIP: {cron['file']} 不存在")
        continue
    content = p.read_text(encoding="utf-8")
    print(f"OK: {cron['name']} 读 {len(content)} bytes")

    # 提取纯 prompt 部分 (去掉 # 注释行 + 标题行)
    # 找到 prompt 主体起始: 第一个 "你是" 段
    lines = content.split("\n")
    prompt_start = None
    for i, line in enumerate(lines):
        if line.startswith("你是 ") and "zprintpro" in line:
            prompt_start = i
            break
    if prompt_start is None:
        print(f"WARN: {cron['name']} 找不到 prompt 起始, 用整文件")
        prompt_text = content
    else:
        prompt_text = "\n".join(lines[prompt_start:])

    # PATCH HTTP API
    url = f"{DAEMON}/api/cron/{cron['id']}"
    body = {"prompt": prompt_text}
    data = json.dumps(body, ensure_ascii=False).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        method="PATCH",
        headers={
            "Content-Type": "application/json; charset=utf-8",
            "User-Agent": "mavis-patch/1.0",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            result = json.loads(r.read().decode("utf-8"))
            print(f"  PATCH {r.status} OK: {cron['name']} prompt = {len(prompt_text)} bytes")
    except urllib.error.HTTPError as e:
        print(f"  ERR {e.code}: {e.read().decode('utf-8', errors='ignore')[:500]}")
    except Exception as e:
        print(f"  ERR: {e}")

print(f"\n4 cron prompts 已 HTTP API PATCH 到 mavis daemon")
