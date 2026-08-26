# -*- coding: utf-8 -*-
"""Read v8 template + analyze GSC data for keyword opportunities."""
import csv, io, json, re

# --- 1. Read v8 template (strip BOM, replace errors) ---
with open('.hermes/template/blog-v8-seo-geo-template.md', 'rb') as f:
    raw = f.read()
text = raw.decode('utf-8', errors='replace')
if text.startswith('\ufeff'):
    text = text[1:]
print("=== V8 TEMPLATE (first 3500 chars) ===")
print(text[:3500])
print("\n=== V8 TEMPLATE (3500-7000) ===")
print(text[3500:7000])
