# -*- coding: utf-8 -*-
"""V20.7 升级"""
import io
import sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

PATH = r"F:\zprintpro-nextjs\.hermes\k3-inbox\_gen_v20_per_sku.py"
with open(PATH, 'r', encoding='utf-8') as f:
    content = f.read()

# === Step 1: 加 BOOK_LAYOUT_OVERRIDES 字典 (在 LIGHTING_PREAMBLE 后) ===
BOOK_LAYOUT_OVERRIDES_BLOCK = '''

# === V20.7 SKU-level layout override (K3 8/15 04:50+ 反馈: ED-005 graduation-yearbook 应该是 PHOTO, 不是 WORKBOOK) ===
# 跨 category 智能 layout: 某些 SKU (尤其 ED-005 yearbook) 即使在 educational 类目, 也是 photo book 性质
BOOK_LAYOUT_OVERRIDES = {
    "ED-005": "PHOTO",  # graduation-yearbook 走 PHOTO 满版纪念册 (K3 关键反馈, 跟 BK-004 hardcover 一致)
    "BK-001": "PHOTO",  # catalog-printing (catalog/photo book/lookbook 关键词)
    "BK-002": "TEXT",   # saddle-stitch-booklets (saddle-stitch/booklet 关键词)
    "BK-003": "TEXT",   # perfect-bound-books (perfect-bound 关键词)
    "BK-004": "PHOTO",  # hardcover-books (yearbook/wedding/family/graduation 关键词)
    "BK-005": "TEXT",   # spiral-notebooks (notebook 关键词)
}'''

MARKER = 'LIGHTING_PREAMBLE = "warm golden hour lifestyle lighting, soft window glow, natural ambient with warm tones, bright cheerful American lifestyle atmosphere."'
if MARKER in content:
    content = content.replace(MARKER, MARKER + BOOK_LAYOUT_OVERRIDES_BLOCK, 1)
    print("Step 1 OK: BOOK_LAYOUT_OVERRIDES added")
else:
    print("Step 1 FAIL: LIGHTING_PREAMBLE marker not found")
    sys.exit(1)

# === Step 2: 升级 detect_book_layout 函数体 ===
OLD2 = '''    默认 PHOTO (K3 8/15 04:20: 翻开纪念册看的是照片)
    """
    blob = f"{slug} {name_en}".lower()
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

NEW2 = '''    默认 PHOTO (K3 8/15 04:20: 翻开纪念册看的是照片)
    """
    if sku_code in BOOK_LAYOUT_OVERRIDES:
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
    print("Step 2 FAIL: detect_book_layout function body not found")
    sys.exit(1)

# === Step 3: 升级 main() 里的 book_layout 选择 ===
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
    print("Step 3 OK: main() book_layout selection upgraded")
else:
    print("Step 3 FAIL: main() book_layout marker not found")
    sys.exit(1)

# === Step 4: 升级 gen_v20_spread layout_marker ===
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
    print("Step 4 OK: gen_v20_spread layout_marker upgraded")
else:
    print("Step 4 FAIL: gen_v20_spread layout_marker marker not found")
    sys.exit(1)

# === Step 5: 升级 V20.6 header 注释 ===
OLD5 = 'V20.6 Final - K3 8/15 03:26+03:36+03:38+04:11+04:13+04:20+04:42 拍板 (books 智能 PHOTO/TEXT layout + 空白页修复)'
NEW5 = 'V20.7 Final - K3 8/15 03:26+03:36+03:38+04:11+04:13+04:20+04:42+04:50 拍板 (books 智能 PHOTO/TEXT/WORKBOOK layout + 跨 category ED-005 yearbook 升级 + 空白页修复)'

if OLD5 in content:
    content = content.replace(OLD5, NEW5, 1)
    print("Step 5 OK: V20.6 -> V20.7 header updated")

with open(PATH, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\n=== V20.7 upgrade done. File size: {len(content)} bytes ===")
