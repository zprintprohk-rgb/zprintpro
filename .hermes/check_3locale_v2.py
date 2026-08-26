#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Verify en/ja jewellery-shopping-bag files - write to file to avoid console encoding issues"""
import json
import io
import sys

# Force stdout to UTF-8
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

SLUG = "jewellery-shopping-bag-printing-guide"

results = []
for locale in ["zh-hk", "en", "ja"]:
    path = f"F:\\zprintpro-nextjs\\src\\data\\blog-data\\{locale}.json"
    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
        entry = data.get(SLUG, None)
        if entry is None:
            results.append(f"{locale}: NOT FOUND")
            continue
        title = entry.get("title", "")
        content = entry.get("content", "")
        results.append(f"{locale}: title_len={len(title)} content_len={len(content)}")
        results.append(f"  title preview: {title[:80]}")
        results.append(f"  content first 100: {content[:100]}")
    except UnicodeDecodeError as e:
        results.append(f"{locale}: UTF-8 decode FAILED at byte {e.start}: {e.reason}")
    except json.JSONDecodeError as e:
        results.append(f"{locale}: JSON decode FAILED: {e}")

# Write to file (UTF-8 with BOM safe)
out_path = r"F:\zprintpro-nextjs\.hermes\_check_3locale_result.txt"
with open(out_path, "w", encoding="utf-8") as f:
    f.write("\n".join(results))

print(f"Written to {out_path}")
print(f"Total locales checked: 3")
