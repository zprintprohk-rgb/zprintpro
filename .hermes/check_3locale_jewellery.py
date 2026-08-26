#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Check jewellery-shopping-bag across all 3 locales for encoding issues"""
import json
import os

SLUG = "jewellery-shopping-bag-printing-guide"

for locale in ["zh-hk", "en", "ja"]:
    path = f"F:\\zprintpro-nextjs\\src\\data\\blog-data\\{locale}.json"
    if not os.path.exists(path):
        print(f"{locale}: FILE NOT FOUND")
        continue

    # Read raw bytes
    with open(path, "rb") as f:
        raw = f.read()
    print(f"\n=== {locale}.json ===")
    print(f"File size: {len(raw)} bytes")
    print(f"First 3 bytes (BOM): {raw[0]:02X} {raw[1]:02X} {raw[2]:02X}")

    # Try UTF-8 decode
    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
        entry = data.get(SLUG, None)
        if entry is None:
            print(f"  Slug not found")
            continue
        content = entry.get("content", "")
        title = entry.get("title", "")
        print(f"  Title (UTF-8 read): {title[:60]}")
        print(f"  Content length (UTF-8 read): {len(content)} chars")
        # Check for garbled chars (replacement char or unusual sequences)
        garbled_count = content.count("\ufffd")
        print(f"  Replacement chars: {garbled_count}")
    except UnicodeDecodeError as e:
        print(f"  UTF-8 decode FAILED: {e}")
    except json.JSONDecodeError as e:
        print(f"  JSON decode FAILED: {e}")
