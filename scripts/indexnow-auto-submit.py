#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
K3 v3.17 B5 IndexNow 自动化脚本
- 每日扫 sitemap.xml 解析全部 URL
- 与 .hermes/secrets/indexnow-history.json diff, 找新 URL
- POST IndexNow API (Bing + Yandex + Seznam + Naver)
- 提交结果落 .hermes/logs/indexnow-YYYY-MM-DD.json
- SOP-5 派生数据禁手搓: 脚本化生成 history + log
- 业务 0 改动: 增量提交, 不动 src/

Usage: python scripts/indexnow-auto-submit.py
Cron: zprintpro-daily-content-1x7w (每天 9:10 Asia/Shanghai) 启动后自动跑
"""

import json
import os
import sys
import urllib.request
import urllib.parse
from datetime import datetime
from pathlib import Path
import xml.etree.ElementTree as ET

# 配置
SITEMAP_URL = "https://zprintpro.com/sitemap.xml"
INDEXNOW_KEY_FILE = Path(__file__).parent.parent / ".hermes" / "secrets" / "indexnow-key.json"
INDEXNOW_HISTORY_FILE = Path(__file__).parent.parent / ".hermes" / "secrets" / "indexnow-history.json"
INDEXNOW_LOG_DIR = Path(__file__).parent.parent / ".hermes" / "logs"
KEY_LOCATION = "https://zprintpro.com/indexnow-key.txt"
INDEXNOW_API = "https://api.indexnow.org/indexnow"
USER_AGENT = "K3-IndexNow-Bot/1.0"
MAX_URLS_PER_BATCH = 10000  # IndexNow API 限制


def load_key():
    """读 IndexNow key (K3 拍板 8/24 提前注入)"""
    if not INDEXNOW_KEY_FILE.exists():
        raise FileNotFoundError(
            f"IndexNow key not found: {INDEXNOW_KEY_FILE}, "
            f"K3 8/24 拍板提前注入 (.hermes/secrets/indexnow-key.json)"
        )
    return json.loads(INDEXNOW_KEY_FILE.read_text(encoding="utf-8"))["key"]


def load_history():
    """读历史提交 URL 列表"""
    if not INDEXNOW_HISTORY_FILE.exists():
        return []
    try:
        return json.loads(INDEXNOW_HISTORY_FILE.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, ValueError):
        return []


def save_history(urls):
    """保存历史提交 URL 列表"""
    INDEXNOW_HISTORY_FILE.parent.mkdir(parents=True, exist_ok=True)
    INDEXNOW_HISTORY_FILE.write_text(
        json.dumps(urls, ensure_ascii=False, indent=2),
        encoding="utf-8"
    )


def fetch_sitemap_urls():
    """fetch sitemap.xml 解析全部 URL"""
    req = urllib.request.Request(SITEMAP_URL, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=30) as resp:
        xml_content = resp.read().decode("utf-8")
    # 解析 XML
    root = ET.fromstring(xml_content)
    ns = {"ns": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls = []
    for url in root.findall(".//ns:loc", ns):
        url_text = url.text.strip() if url.text else ""
        if url_text:
            urls.append(url_text)
    return urls


def find_new_urls(all_urls, history):
    """找新 URL (未在 history 中)"""
    return [u for u in all_urls if u not in history]


def submit_indexnow(key, urls):
    """POST IndexNow API 批量提交 (最多 10000 URL/次)"""
    if not urls:
        return {"status": "no_new_urls"}
    # IndexNow 限制每次最多 10000 URL, 我们分批
    batches = [urls[i:i+MAX_URLS_PER_BATCH] for i in range(0, len(urls), MAX_URLS_PER_BATCH)]
    results = []
    for batch in batches:
        payload = {
            "host": "zprintpro.com",
            "key": key,
            "keyLocation": KEY_LOCATION,
            "urlList": batch,
        }
        data = json.dumps(payload).encode("utf-8")
        req = urllib.request.Request(
            INDEXNOW_API,
            data=data,
            headers={"Content-Type": "application/json", "User-Agent": USER_AGENT},
        )
        with urllib.request.urlopen(req, timeout=30) as resp:
            results.append({
                "status_code": resp.status,
                "submitted": len(batch),
            })
    return {
        "status": "ok",
        "results": results,
        "total_submitted": sum(r["submitted"] for r in results),
    }


def main():
    """主函数: 扫 sitemap + diff + 提交 + log"""
    timestamp = datetime.now().isoformat()
    log_entry = {
        "timestamp": timestamp,
        "script": "scripts/indexnow-auto-submit.py",
        "version": "v3.17 B5",
    }
    print(f"[{timestamp}] K3 v3.17 B5 IndexNow 自动提交启动")

    try:
        # 1. 读 key
        key = load_key()
        log_entry["key_prefix"] = key[:8] + "..."
        print(f"  IndexNow key loaded: {log_entry['key_prefix']}")

        # 2. 扫 sitemap
        all_urls = fetch_sitemap_urls()
        log_entry["all_urls_count"] = len(all_urls)
        print(f"  sitemap 解析: {len(all_urls)} URLs")

        # 3. diff 历史
        history = load_history()
        new_urls = find_new_urls(all_urls, history)
        log_entry["new_urls_count"] = len(new_urls)
        log_entry["history_count"] = len(history)
        print(f"  新 URL: {len(new_urls)} 个 (历史: {len(history)} 个)")

        # 4. 提交
        if not new_urls:
            result = {"status": "no_new_urls"}
            log_entry["result"] = result
            print(f"  无新 URL, 跳过提交")
        else:
            result = submit_indexnow(key, new_urls)
            log_entry["result"] = result
            # 5. 保存历史 (history + new_urls 去重)
            updated_history = list(set(history + new_urls))
            save_history(updated_history)
            log_entry["history_updated"] = True
            print(f"  提交结果: {result}")
            print(f"  history 更新: {len(updated_history)} URLs")

    except FileNotFoundError as e:
        log_entry["error"] = "KEY_NOT_FOUND"
        log_entry["error_detail"] = str(e)
        print(f"  [ERROR] {e}")
    except Exception as e:
        log_entry["error"] = type(e).__name__
        log_entry["error_detail"] = str(e)
        print(f"  [ERROR] {e}")

    # 6. log
    INDEXNOW_LOG_DIR.mkdir(parents=True, exist_ok=True)
    log_file = INDEXNOW_LOG_DIR / f"indexnow-{datetime.now().strftime('%Y-%m-%d')}.json"
    log_file.write_text(
        json.dumps(log_entry, ensure_ascii=False, indent=2),
        encoding="utf-8"
    )
    print(f"  log 落盘: {log_file}")
    print(f"[{timestamp}] 完成")


if __name__ == "__main__":
    main()
