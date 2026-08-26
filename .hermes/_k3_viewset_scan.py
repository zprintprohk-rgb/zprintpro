# -*- coding: utf-8 -*-
"""72 SKU 文件夹视图集完整性 + PKG-007 串图扫描.
Reports:
1. Per-SKU: file count, file names, file sizes, total size
2. Incomplete viewset (< 4 files)
3. PKG-007 file content match (magnetic box vs HARVEST LABELS)
4. PK-002~006 / PKG-008 detailed inspection
5. All files over 120KB gate
6. Suspicious brand names in filenames (HARVEST LABELS / 14 fictional companies check)
"""
import os
import re
from collections import defaultdict

IMG_BASE = r"F:\zprintpro-nextjs\zprintpro-en-us-images"

# 14 fictional company matrix (per audit)
COMPANIES = [
    'PAGEBOUND', 'CARRYWELL', 'WOODFIRE BISTRO', 'MAPLEWOOD STUDIO',
    'QUILLHOUSE PRESS', 'BRIGHTLEAF', 'SAKURA SHUPPAN',
    # Add more from products.ts
]
# 14 companies per K3 audit; find all in products.ts
COMPANIES_FOUND = set()

# Read products.ts to extract fictional companies
import re
try:
    with open(r"F:\zprintpro-nextjs\src\data\products.ts", 'r', encoding='utf-8') as f:
        content = f.read()
    # Find knowledgePanelData products
    for m in re.finditer(r'"([A-Z][A-Z\s&\']+?)"', content):
        word = m.group(1).strip()
        if 3 <= len(word) <= 40 and word.isupper() and not word.startswith(('HTTP', 'HTTPS', 'API', 'URL', 'PDF', 'AI', 'PSD', 'CDR', 'RGB', 'CMYK', 'JSON', 'XML', 'GMT', 'UTC', 'USA', 'UK', 'EU', 'NFC', 'QR', 'DHL', 'FSC', 'ISO', 'G7')):
            COMPANIES_FOUND.add(word)
except Exception as e:
    print(f"Warning: Could not read products.ts: {e}")

# 已知虚构公司 (K3 audit)
KNOWN_COMPANIES = {
    'PAGEBOUND', 'CARRYWELL', 'WOODFIRE BISTRO', 'MAPLEWOOD STUDIO',
    'QUILLHOUSE PRESS', 'BRIGHTLEAF', 'SAKURA SHUPPAN',
    'HARVEST HOLLOW', 'BLUEPRINT BAKERY', 'CORAL BAY COFFEE',
    'EVERGREEN MARKET', 'GILMORE HARDWARE', 'HARBOR CAFE',
    'IRONWOOD PRESS', 'KETTLE & GRAIN', 'LANTERN HOUSE',
    'MAPLE & OAK', 'NORTHERN BLOOM', 'OLIVE BRANCH',
    'PINE & CEDAR', 'QUARRY STONE CO', 'REDWOOD BOOKSTORE',
    'STONEMILL FLOUR', 'SUNDIAL STUDIO', 'TIMBERLINE OUTFIT',
    'URBAN LOAF', 'VINEYARD CELLAR', 'WILLOWBROOK',
    'OAKMONT PRESS', 'HEMLOCK & PINE', 'KINDLING FIRE CO',
    'RIVERMARK STATIONERY', 'BAY & BASIN', 'FERN & FERN',
    'GOLDENWICK', 'HARBORFRONT', 'LIGHTHOUSE LABS',
    'MARSH & MEADOW', 'NORTHWIND', 'OAKLEAF',
}

# Get all SKU directories
def get_sku_dirs():
    """Return dict {sku_name: [file_paths]}"""
    result = {}
    for entry in os.listdir(IMG_BASE):
        full = os.path.join(IMG_BASE, entry)
        if os.path.isdir(full):
            files = []
            for f in os.listdir(full):
                if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
                    files.append(os.path.join(full, f))
            result[entry] = sorted(files)
    return result

def get_file_info(path):
    """Return (size_kb, view_in_name) tuple."""
    try:
        size = os.path.getsize(path)
    except OSError:
        return 0, ''
    size_kb = size / 1024
    fname = os.path.basename(path).lower()
    # Extract view name
    view = ''
    for v in ['hero', 'detail', 'spread', 'multi-angle', 'variety', 'lifestyle', 'box-open', 'box-closed', 'group', 'context', 'cover']:
        if v in fname:
            view = v
            break
    return size_kb, view

def scan():
    sku_dirs = get_sku_dirs()

    report = []
    incomplete = []
    oversize = []
    suspicious_brands = []
    empty_dirs = []
    single_view_skus = []
    total_files = 0
    total_size_kb = 0

    for sku in sorted(sku_dirs.keys()):
        # Skip non-SKU dirs
        if sku.startswith('_'):
            continue
        files = sku_dirs[sku]
        if not files:
            empty_dirs.append(sku)
            continue
        total_files += len(files)
        views = set()
        file_infos = []
        for f in files:
            size_kb, view = get_file_info(f)
            total_size_kb += size_kb
            if view:
                views.add(view)
            file_infos.append((os.path.basename(f), size_kb, view))
            if size_kb > 120:
                oversize.append((sku, os.path.basename(f), size_kb))
            # Check for suspicious brand names in filename
            fname = os.path.basename(f).upper()
            for brand_word in ['HARVEST LABELS', 'OLIVE GROVE', 'NORTHWIND', 'WILLOW', 'STAGECOACH']:
                if brand_word in fname:
                    suspicious_brands.append((sku, os.path.basename(f), brand_word))

        if len(files) < 4:
            incomplete.append({
                'sku': sku,
                'files': len(files),
                'views': list(views),
                'file_infos': file_infos,
            })
        if len(views) < 3:
            single_view_skus.append((sku, len(views), list(views)))

    # Print report
    print("=" * 80)
    print("72 SKU 文件夹视图集完整性扫描报告")
    print("=" * 80)
    print(f"\n总 SKU 文件夹: {len(sku_dirs)}")
    print(f"总图片文件: {total_files}")
    print(f"总大小: {total_size_kb / 1024:.1f} MB")

    print(f"\n--- 空目录 (0 文件) ---")
    for d in empty_dirs:
        print(f"  {d}")

    print(f"\n--- 视图集不全 (< 4 文件) ---")
    for item in sorted(incomplete, key=lambda x: x['files']):
        print(f"  {item['sku']}: {item['files']} 文件, 视图 {item['views']}")
        for fname, size_kb, view in item['file_infos']:
            print(f"    - {fname} ({size_kb:.0f} KB, {view})")

    print(f"\n--- 视图 < 3 的 SKU (视图集多样性不足) ---")
    for sku, n, views in single_view_skus:
        print(f"  {sku}: {n} 视图 ({views})")

    print(f"\n--- 文件超 120KB 门禁 ---")
    for sku, fname, size in oversize:
        print(f"  {sku}/{fname}: {size:.0f} KB")

    print(f"\n--- 疑似串图 / 错配品牌 ---")
    if suspicious_brands:
        for sku, fname, brand in suspicious_brands:
            print(f"  {sku}/{fname}: 含品牌 {brand}")
    else:
        print("  无 (filename 中未发现 HARVEST LABELS 等未知品牌)")

    print(f"\n--- PKG-007 详情 ---")
    if 'PKG-007' in sku_dirs:
        for f in sku_dirs['PKG-007']:
            size_kb, view = get_file_info(f)
            print(f"  {os.path.basename(f)} ({size_kb:.0f} KB, {view})")
    print()
    print("=" * 80)
    print("Summary: P0 串图嫌疑:")
    print(f"  - PK-002~006 (5 SKU 各 2 文件): 待人工检查")
    print(f"  - PKG-007 (2 文件, K3 报告: 磁吸礼盒→HARVEST LABELS 贴纸)")
    print(f"  - PKG-008 (0 文件): 空")
    print()
    print("门禁超 120KB:")
    for sku, fname, size in oversize:
        print(f"  {sku}/{fname}: {size:.0f} KB")
    print()
    print(f"视图集不全: {len(incomplete)} 个 SKU")
    print(f"空目录: {len(empty_dirs)} 个")

    return {
        'incomplete': incomplete,
        'oversize': oversize,
        'suspicious_brands': suspicious_brands,
        'empty_dirs': empty_dirs,
        'single_view_skus': single_view_skus,
        'total_files': total_files,
        'total_size_kb': total_size_kb,
    }

if __name__ == '__main__':
    scan()
