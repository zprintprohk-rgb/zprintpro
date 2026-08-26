# -*- coding: utf-8 -*-
"""V20.7 升级 Step 2-5: 一次性完成所有替换"""
import io
import sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

PATH = r"F:\zprintpro-nextjs\.hermes\k3-inbox\_gen_v20_per_sku.py"
with open(PATH, 'r', encoding='utf-8') as f:
    content = f.read()

OLD2 = '''    blob = f"{slug} {name_en}".lower()
    photo_keywords = [
        "photo", "yearbook", "commemorative", "graduation", "album",
        "class-of", "class of", "memory", "memoir", "portfolio", "wedding",
        "family", "lookbook", "catalog", "exhibition",
    ]
    text_keywords = [
        "textbook", "academic", "saddle-stitch", "saddle stitch", "booklet",
        "notebook", "journal", "novel", "manual", "report", "perfect-bound",
        "perfect bound", "training", "education", "workbook",
    ]
    photo_score = sum(1 for kw in photo_keywords if kw in blob)
    text_score = sum(1 for kw in text_keywords if kw in blob)
    if text_score > photo_score:
        return "TEXT"
    return "PHOTO"  # 默认 PHOTO (K3 拍板)'''

NEW2 = '''    if sku_code in BOOK_LAYOUT_OVERRIDES:
        return BOOK_LAYOUT_OVERRIDES[sku_code]
    blob = f"{slug} {name_en}".lower()
    photo_keywords = [
        "photo", "yearbook", "commemorative", "graduation", "album",
        "class-of", "class of", "memory", "memoir", "portfolio", "wedding",
        "family", "lookbook", "catalog", "exhibition",
    ]
    text_keywords = [
        "textbook", "academic", "saddle-stitch", "saddle stitch", "booklet",
        "notebook", "journal", "novel", "manual", "report", "perfect-bound",
        "perfect bound", "training", "workbook", "exercise", "certificate",
    ]
    workbook_keywords = [
        "exercise", "workbook", "textbook", "training", "education", "school material",
    ]
    photo_score = sum(1 for kw in photo_keywords if kw in blob)
    text_score = sum(1 for kw in text_keywords if kw in blob)
    workbook_score = sum(1 for kw in workbook_keywords if kw in blob)
    if photo_score > 0 and photo_score > text_score and photo_score > workbook_score:
        return "PHOTO"
    if workbook_score > text_score and workbook_score > 0:
        return "WORKBOOK"
    if text_score > photo_score:
        return "TEXT"
    return "PHOTO"  # 默认 PHOTO (K3 拍板)


# === V20.7 跨 category SPREAD 模板选择 ===
def get_spread_scene_for_layout(cat, layout):
    """V20.7 跨 category SPREAD 模板. 优先 books[PHOTO] > books[TEXT] > category 默认."""
    if layout == "PHOTO":
        return SPREAD_SCENE_LIBRARY["books"]["PHOTO"]
    if layout == "TEXT":
        if cat == "books":
            return SPREAD_SCENE_LIBRARY["books"]["TEXT"]
        return SPREAD_SCENE_LIBRARY.get(cat, SPREAD_SCENE_LIBRARY["books"]["TEXT"])
    if layout == "WORKBOOK":
        return SPREAD_SCENE_LIBRARY.get(cat, SPREAD_SCENE_LIBRARY["books"]["TEXT"])
    return SPREAD_SCENE_LIBRARY.get(cat, SPREAD_SCENE_LIBRARY["books"]["TEXT"])'''

if OLD2 in content:
    content = content.replace(OLD2, NEW2, 1)
    print("Step 2 OK: detect_book_layout upgraded + get_spread_scene_for_layout added")
else:
    print("Step 2 FAIL: marker not found")
    sys.exit(1)

# Step 3
OLD3 = '''            # V20.6 books 智能 layout: PHOTO 满版照片 vs TEXT 编辑文字
            book_layout = None
            if has_spread and cat == "books":
                book_layout = detect_book_layout(slug, name_en)
                spread_scene = SPREAD_SCENE_LIBRARY["books"][book_layout]
            else:
                spread_scene = SPREAD_SCENE_LIBRARY.get(cat) if has_spread else None'''
NEW3 = '''            # V20.7 跨 category 智能 layout: PHOTO/TEXT/WORKBOOK
            book_layout = None
            if has_spread:
                book_layout = detect_book_layout(slug, name_en, sku_code)
                spread_scene = get_spread_scene_for_layout(cat, book_layout)
            else:
                spread_scene = None'''
if OLD3 in content:
    content = content.replace(OLD3, NEW3, 1)
    print("Step 3 OK: main() book_layout upgraded")
else:
    print("Step 3 FAIL")
    sys.exit(1)

# Step 4
OLD4 = '''    # V20.6 books 用 detect_book_layout 选 PHOTO/TEXT
    if book_layout and "PHOTO" in (book_layout or ""):
        layout_marker = "PHOTO-BOOK STYLE (full-bleed photography, photo dominates the spread)"
    elif book_layout and "TEXT" in (book_layout or ""):
        layout_marker = "TEXT-BOOK STYLE (editorial text + illustration)"
    else:
        layout_marker = ""'''
NEW4 = '''    # V20.7 跨 category 智能 layout: PHOTO/TEXT/WORKBOOK
    if book_layout == "PHOTO":
        layout_marker = "PHOTO-BOOK STYLE (full-bleed photography, photo dominates the spread, this is a keepsake photo album or yearbook)"
    elif book_layout == "TEXT":
        layout_marker = "TEXT-BOOK STYLE (editorial text + illustration)"
    elif book_layout == "WORKBOOK":
        layout_marker = "WORKBOOK STYLE (educational workbook with exercises, tracing, activities)"
    else:
        layout_marker = ""'''
if OLD4 in content:
    content = content.replace(OLD4, NEW4, 1)
    print("Step 4 OK: layout_marker upgraded")
else:
    print("Step 4 FAIL")
    sys.exit(1)

# Step 5
OLD5 = 'V20.6 Final - K3 8/15 03:26+03:36+03:38+04:11+04:13+04:20+04:42 拍板 (books 智能 PHOTO/TEXT layout + 空白页修复)'
NEW5 = 'V20.7 Final - K3 8/15 03:26+03:36+03:38+04:11+04:13+04:20+04:42+04:50 拍板 (books 智能 PHOTO/TEXT/WORKBOOK layout + 跨 category ED-005 yearbook 升级 + 空白页修复)'
if OLD5 in content:
    content = content.replace(OLD5, NEW5, 1)
    print("Step 5 OK: V20.7 header updated")

with open(PATH, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\n=== V20.7 upgrade done. File size: {len(content)} bytes ===")
