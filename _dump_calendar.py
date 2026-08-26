"""Dump calendar 3 locale 实际内容"""
import json
import sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")

for loc in ["zh-hk", "en", "ja"]:
    f = f"F:/zprintpro-nextjs/src/data/blog-data/{loc}.json"
    data = json.loads(open(f, encoding="utf-8").read())
    entry = data["calendar-printing-guide"]
    print(f"\n=== {loc} calendar ===")
    print(f"title: {entry['title']}")
    print(f"date: {entry['date']}")
    print(f"category: {entry['category']}")
    print(f"content length: {len(entry['content'])}")
    print(f"content first 500: {entry['content'][:500]}")
    print(f"\ncontent last 500: {entry['content'][-500:]}")
