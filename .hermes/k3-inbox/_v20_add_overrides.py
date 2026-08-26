# -*- coding: utf-8 -*-
"""手动加 BOOK_LAYOUT_OVERRIDES 在 detect_book_layout 之前"""
import sys
PATH = r"F:\zprintpro-nextjs\.hermes\k3-inbox\_gen_v20_per_sku.py"
with open(PATH, 'r', encoding='utf-8') as f:
    content = f.read()

OLD = 'def detect_book_layout(slug="", name_en="", sku_code=""):'
NEW = '''# === V20.7 SKU-level layout override (K3 8/15 04:50+ 反馈: ED-005 graduation-yearbook 应该是 PHOTO, 不是 WORKBOOK) ===
# 跨 category 智能 layout: 某些 SKU (尤其 ED-005 yearbook) 即使在 educational 类目, 也是 photo book 性质
BOOK_LAYOUT_OVERRIDES = {
    "ED-005": "PHOTO",  # graduation-yearbook 走 PHOTO 满版纪念册 (K3 关键反馈, 跟 BK-004 hardcover 一致)
    "BK-001": "PHOTO",  # catalog-printing (catalog/photo book/lookbook 关键词)
    "BK-002": "TEXT",   # saddle-stitch-booklets (saddle-stitch/booklet 关键词)
    "BK-003": "TEXT",   # perfect-bound-books (perfect-bound 关键词)
    "BK-004": "PHOTO",  # hardcover-books (yearbook/wedding/family/graduation 关键词)
    "BK-005": "TEXT",   # spiral-notebooks (notebook 关键词)
}


# === V20.6 books 智能 layout (K3 8/15 04:20+04:42 反馈) ===
# 翻开纪念册/毕业照/photo book 应是大幅满版照片 (80%) 为主, 不是文字 + 小图排版
# 笔记本/saddle-stitch/学术 = 文字型
# 默认 PHOTO (K3 8/15 04:20: 翻开纪念册看的是照片)
def detect_book_layout(slug="", name_en="", sku_code=""):'''

if OLD not in content:
    print("ERROR: def detect_book_layout not found")
    sys.exit(1)

content = content.replace(OLD, NEW, 1)
print("BOOK_LAYOUT_OVERRIDES added before detect_book_layout")

with open(PATH, 'w', encoding='utf-8') as f:
    f.write(content)
print("Done, file size:", len(content))
