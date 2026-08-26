# -*- coding: utf-8 -*-
"""修复 detect_book_layout 函数签名"""
import sys
PATH = r"F:\zprintpro-nextjs\.hermes\k3-inbox\_gen_v20_per_sku.py"
with open(PATH, 'r', encoding='utf-8') as f:
    content = f.read()

OLD = 'def detect_book_layout(slug="", name_en=""):'
NEW = 'def detect_book_layout(slug="", name_en="", sku_code=""):'

if OLD in content:
    content = content.replace(OLD, NEW, 1)
    print("detect_book_layout signature fixed to include sku_code")
else:
    print("OLD not found, checking if already fixed...")
    if 'def detect_book_layout(slug="", name_en="", sku_code=""):' in content:
        print("Already fixed!")
    else:
        print("ERROR: marker not found")
        sys.exit(1)

with open(PATH, 'w', encoding='utf-8') as f:
    f.write(content)
print("Done, file size:", len(content))
