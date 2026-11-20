# -*- coding: utf-8 -*-
"""V20.8 修复: BC/PK/CA/RP/JP 误用 books[PHOTO] 模板严重 bug

根因 (K3 8/15 04:34 反馈):
- V20.7 get_spread_scene_for_layout PHOTO 分支无条件返回 books[PHOTO]
- detect_book_layout 默认 PHOTO
- 22 个非 books SKU 全部走 books[PHOTO] 模板 (贺卡/包装盒/红包/校园都用书本打开)

正确设计 (V20.8):
- PHOTO 模板只对 SKU-level 显式跨 category (ED-005) 用 books[PHOTO]
- cat == "books" 用 books[PHOTO/TEXT] (按 detect_book_layout)
- cat == "educational" 用 educational WORKBOOK (除 ED-005 例外)
- 其他 cat (BC/PK/CA/RP/JP) 用 cat 自己的 SPREAD 模板 (扇形展开/盒开盖/红包扇出)
- detect_book_layout 只在 books 类调用, 其他 cat 返回 None
- layout_marker 只在 books/educational 注入, 其他 cat 不注入
"""
import io
import sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

PATH = r"F:\zprintpro-nextjs\.hermes\k3-inbox\_gen_v20_per_sku.py"
with open(PATH, 'r', encoding='utf-8') as f:
    content = f.read()

# === Step 1: 重写 get_spread_scene_for_layout ===
OLD1 = '''def get_spread_scene_for_layout(cat, layout):
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

NEW1 = '''def get_spread_scene_for_layout(cat, layout, sku_code=""):
    """V20.8 跨 category SPREAD 模板. 修复 K3 8/15 04:34 反馈: BC/PK/RP/JP 不能用 books 模板.

    优先级:
    1. SKU-level override 显式跨 category (ED-005 yearbook 走 books[PHOTO])
    2. cat == "books" 用 books[PHOTO/TEXT] (按 detect_book_layout)
    3. cat == "educational" 用 educational WORKBOOK (除 ED-005)
    4. 其他 cat (BC/PK/CA/RP/JP) 用 cat 自己的 SPREAD 模板 (扇形展开/盒开盖/红包扇出)
    """
    # 1. SKU-level override 显式跨 category (ED-005)
    if sku_code in BOOK_LAYOUT_OVERRIDES and BOOK_LAYOUT_OVERRIDES[sku_code] == "PHOTO":
        return SPREAD_SCENE_LIBRARY["books"]["PHOTO"]
    # 2. books 类目用 books[PHOTO/TEXT]
    if cat == "books":
        if layout == "PHOTO":
            return SPREAD_SCENE_LIBRARY["books"]["PHOTO"]
        return SPREAD_SCENE_LIBRARY["books"]["TEXT"]
    # 3. educational 类目用 educational WORKBOOK (除 ED-005 已在 step 1 处理)
    if cat == "educational":
        return SPREAD_SCENE_LIBRARY["educational"]
    # 4. 其他类目 (BC/PK/CA/RP/JP) 用 cat 自己的 SPREAD 模板
    return SPREAD_SCENE_LIBRARY.get(cat, SPREAD_SCENE_LIBRARY["books"]["TEXT"])'''

if OLD1 in content:
    content = content.replace(OLD1, NEW1, 1)
    print("Step 1 OK: get_spread_scene_for_layout rewritten with cat-aware routing")
else:
    print("Step 1 FAIL")
    sys.exit(1)

# === Step 2: 重写 gen_v20_spread layout_marker - 只 books/educational 注入 ===
OLD2 = '''    # V20.7 跨 category 智能 layout: PHOTO/TEXT/WORKBOOK
    if book_layout == "PHOTO":
        layout_marker = "PHOTO-BOOK STYLE (full-bleed photography, photo dominates the spread, this is a keepsake photo album or yearbook)"
    elif book_layout == "TEXT":
        layout_marker = "TEXT-BOOK STYLE (editorial text + illustration)"
    elif book_layout == "WORKBOOK":
        layout_marker = "WORKBOOK STYLE (educational workbook with exercises, tracing, activities)"
    else:
        layout_marker = ""'''

NEW2 = '''    # V20.8 layout_marker 只 books/educational 注入; 其他类目 (BC/PK/RP/JP) 用 cat-specific 模板, 不注入
    if book_layout == "PHOTO":
        layout_marker = "PHOTO-BOOK STYLE (full-bleed photography, photo dominates the spread, this is a keepsake photo album or yearbook)"
    elif book_layout == "TEXT":
        layout_marker = "TEXT-BOOK STYLE (editorial text + illustration)"
    elif book_layout == "WORKBOOK":
        layout_marker = "WORKBOOK STYLE (educational workbook with exercises, tracing, activities)"
    else:
        layout_marker = ""  # BC/PK/RP/JP 用 cat-specific 模板 (扇形/盒开/红包), 不注入 layout'''

if OLD2 in content:
    content = content.replace(OLD2, NEW2, 1)
    print("Step 2 OK: gen_v20_spread layout_marker - cat-aware")

# === Step 3: 升级 main() 跨 category SPREAD 逻辑 ===
OLD3 = '''            # V20.7 跨 category 智能 layout: PHOTO/TEXT/WORKBOOK
            book_layout = None
            if has_spread:
                book_layout = detect_book_layout(slug, name_en, sku_code)
                spread_scene = get_spread_scene_for_layout(cat, book_layout)
            else:
                spread_scene = None'''

NEW3 = '''            # V20.8 跨 category SPREAD: 只 books/educational 用 detect_book_layout
            # 其他 cat (BC/PK/CA/RP/JP) 用 cat 自己的 SPREAD 模板, book_layout = None
            book_layout = None
            if has_spread:
                if cat in ("books", "educational"):
                    book_layout = detect_book_layout(slug, name_en, sku_code)
                    spread_scene = get_spread_scene_for_layout(cat, book_layout, sku_code)
                else:
                    # BC/PK/CA/RP/JP 用 cat-specific SPREAD 模板 (扇形/盒开/红包/同人志)
                    spread_scene = SPREAD_SCENE_LIBRARY.get(cat)
            else:
                spread_scene = None'''

if OLD3 in content:
    content = content.replace(OLD3, NEW3, 1)
    print("Step 3 OK: main() cat-aware SPREAD routing")
else:
    print("Step 3 FAIL")
    sys.exit(1)

# === Step 4: 升级 header ===
OLD4 = 'V20.7.1 Final - K3 8/15 03:26+03:36+03:38+04:11+04:13+04:20+04:42+04:50 拍板 (books 智能 PHOTO/TEXT/WORKBOOK layout + ED-005 yearbook 升级 + 关键词扩展 flyer/newsletter/school + 空白页修复)'
NEW4 = 'V20.8 Final - K3 8/15 03:26+03:36+03:38+04:11+04:13+04:20+04:42+04:50+04:34 拍板 (BC/PK/RP/JP 不能用 books 模板 + cat-aware SPREAD routing + 22 SKU 修复)'

if OLD4 in content:
    content = content.replace(OLD4, NEW4, 1)
    print("Step 4 OK: header V20.7.1 -> V20.8")

with open(PATH, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\n=== V20.8 upgrade done. File size: {len(content)} bytes ===")
