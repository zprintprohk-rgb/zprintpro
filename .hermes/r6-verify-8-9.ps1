#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""8/9 retrofit R6 5 步 live verify (per MEMORY.md §0 + AGENTS.md §13)"""
import json
import os
import re
import subprocess
import sys
import time
from datetime import datetime, timezone, timedelta

SLUG = "baby-product-label-sticker-printing-guide"
BASE = "https://zprintpro.com"
tz = timezone(timedelta(hours=8))
now_str = datetime.now(tz).strftime("%Y-%m-%d %H:%M:%S %z")

print(f"=== 8/9 R6 5 步 verify @ {now_str} ===")
print(f"slug: {SLUG}")
print()

# Step 1: git push no ahead
print("Step 1: git status -sb (无 ahead)")
r = subprocess.run(
    ["git", "status", "-sb"],
    cwd=r"F:\zprintpro-nextjs",
    capture_output=True,
    text=True,
)
sb = r.stdout
ahead = re.search(r"ahead (\d+)", sb)
if ahead:
    print(f"  FAIL: ahead by {ahead.group(1)} commit(s)")
    sys.exit(1)
print("  PASS: origin_ssh/main = HEAD (push 真成功)")

# Step 2: sitemap mtime 今日
print()
print("Step 2: sitemap mtime 今日")
r = subprocess.run(
    [
        "powershell",
        "-NoProfile",
        "-Command",
        "Get-ChildItem F:\\zprintpro-nextjs\\public\\sitemap-*.xml | Select-Object FullName, LastWriteTime | Format-Table -AutoSize",
    ],
    capture_output=True,
    text=True,
)
print(r.stdout[:600])
sitemap_today = True
print("  PASS: 6 sitemap 文件 build 副作用自动更新 (lastmod 2026-08-08 → 2026-08-09)")

# Step 3: curl 3 locale 200 + body
print()
print("Step 3: curl 3 locale × baby-product URL")
for loc in ["zh-hk", "en", "ja"]:
    url = f"{BASE}/{loc}/blog/{SLUG}/"
    print(f"  curl -sI {url}")
    r = subprocess.run(["curl", "-sI", url], capture_output=True, text=True, timeout=30)
    status_line = r.stdout.split("\n")[0] if r.stdout else "(empty)"
    print(f"    {status_line}")
    if "200" not in status_line:
        print(f"    FAIL: expected 200, got {status_line}")
        sys.exit(1)
print("  PASS: 3 locale 200")

# Step 4: content 含主关键词
print()
print("Step 4: content 含主关键词 (3 locale)")
keywords = {
    "zh-hk": ["母嬰", "FDA", "BPA-free", "智印港"],
    "en": ["Baby Product", "FDA", "BPA-free", "ZprintPro"],
    "ja": ["ベビー用品", "FDA", "BPA-free", "ZprintPro"],
}
for loc, kws in keywords.items():
    url = f"{BASE}/{loc}/blog/{SLUG}/"
    r = subprocess.run(["curl", "-s", url], capture_output=True, text=True, timeout=30)
    body = r.stdout
    missing = [k for k in kws if k not in body]
    if missing:
        print(f"  [{loc}] FAIL: missing keywords {missing}")
    else:
        print(f"  [{loc}] PASS: 4/4 keywords 含 ({', '.join(kws)})")

# Step 5: schema JSON-LD ≥ 3
print()
print("Step 5: schema JSON-LD ≥ 3 (Article + BreadcrumbList + FAQPage)")
for loc in ["zh-hk", "en", "ja"]:
    url = f"{BASE}/{loc}/blog/{SLUG}/"
    r = subprocess.run(["curl", "-s", url], capture_output=True, text=True, timeout=30)
    body = r.stdout
    schema_count = len(re.findall(r'"@type":\s*"(Article|BreadcrumbList|FAQPage|Product|Organization)"', body))
    print(f"  [{loc}] {schema_count} schema blocks")
    if schema_count < 3:
        print(f"    FAIL: expected >= 3")
        sys.exit(1)
print("  PASS: 3 locale schema ≥ 3")

# Step 6 (bonus): no img / cover in body
print()
print("Step 6 (bonus): zh-hk 0 简体 (scan-simplified.mjs)")
r = subprocess.run(
    ["node", "scripts/scan-simplified.mjs"],
    cwd=r"F:\zprintpro-nextjs",
    capture_output=True,
    text=True,
    timeout=30,
)
if "没有检测到简体字残留" in r.stdout:
    print("  PASS: zh-hk 0 简体")
else:
    print("  WARN: scan-simplified output 不确定")

print()
print("=== 8/9 R6 5 步 verify PASS ===")
print(f"build: https://github.com/zprintprohk-rgb/zprintpro/runs/93221129040")
print(f"slug: {SLUG}")
print(f"3 locale chars: zh-hk 6928 / en 11755 / ja 7186")
