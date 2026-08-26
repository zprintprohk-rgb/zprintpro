#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Check industry-keyword-matrix.json queue/covered state."""
import json, os

os.chdir(r"F:\zprintpro-nextjs")
with open(r".hermes\industry-keyword-matrix.json", "r", encoding="utf-8") as f:
    m = json.load(f)

print("queue:", len(m.get("queue", [])))
print("covered:", len(m.get("covered", [])))
print("category_priority:", json.dumps(m.get("category_priority", {}), ensure_ascii=False)[:500])
print("---queue first 15---")
for i, q in enumerate(m.get("queue", [])[:15]):
    if isinstance(q, dict):
        print(i, q.get("keyword") or q.get("slug") or q.get("title"), "|", q.get("tier"), "|", q.get("priority"), "|", q.get("status"))
    else:
        print(i, q)
