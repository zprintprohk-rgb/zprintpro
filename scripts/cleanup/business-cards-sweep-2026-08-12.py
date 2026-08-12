"""
§11 名片禁区清扫 (K3 8/12 10:55 PM 审核拍板) v2 全清
- 4 类主替换 (FAQ MOQ + 注释 + 表格 L117/L128)
- 5 类扩展残留 (ja FAQ 名刺 + zh-hk 名片夾 + en 名片色系 + longDescription 标准名片)

豁免: business-cards 图片文件名 (189 处) 实际挂在 greeting-cards 产品下, 改文件名
     破坏 CDN URL, 收益为 0, 不动。
验证: grep -E "名片|咭片|名刺" src/data/products.ts | wc -l → 应 = 0
"""

import os
import re
from pathlib import Path

WORKSPACE = Path("F:/zprintpro-nextjs")
SRC = WORKSPACE / "src"

# 4 类主替换
FAQ_MOQ_OLD = "貼紙 50 張起、名片/信封 100 張起、禮品包裝盒 100 個起"
FAQ_MOQ_NEW = "貼紙 50 張起、信封 100 張起、禮品包裝盒 100 個起"

NOTE_OLD = "// 咭片印刷 (6 SKU)"
NOTE_NEW = "// 卡片印刷 (6 SKU)"

TABLE_OLD_1 = "標準商務名片、大量派發場景"
TABLE_NEW_1 = "標準商務卡片、大量派發場景"

TABLE_OLD_2 = "適合彩色照片名片"
TABLE_NEW_2 = "適合彩色照片卡片"

# 5 类扩展残留 (K3 8/12 11:50 全清拍板)
JA_FAQ_OLD = "ステッカー 50枚〜、名刺・封筒 100枚〜、ギフトボックス 100個〜"
JA_FAQ_NEW = "ステッカー 50枚〜、封筒 100枚〜、ギフトボックス 100個〜"  # ja: 卡片 = カード, 但 §11 禁名片, 改封筒单走

ZHHK_BAG_OLD = "兼容全球名片夾與卡套"
ZHHK_BAG_NEW = "兼容全球卡夾"  # 名片夹 = 卡片尺寸兼容

EN_COLOR_OLD = "與信紙、名片色系可對齊"
EN_COLOR_NEW = "與信紙、卡片色系可對齊"  # 实际原文可能是 zh-hk, 但保留 fallback

LONG_DESC_OLD = "厚度達標準名片的1.3倍"
LONG_DESC_NEW = "厚度達標準卡片厚度的1.3倍"

# 通用兜底: 任何残留的 名片/咭片/名刺 (排除 image 文件名 + business-cards 路径)
GENERIC_OLD_NEW = [
    ("名片色系", "卡片色系"),
    ("名片厚度", "卡片厚度"),
    ("名片的", "卡片的"),
    ("咭片", "卡片"),
    ("名刺", "カード"),  # ja 名刺 = 卡片
]


def sweep_products_ts() -> tuple[int, list[str]]:
    path = SRC / "data" / "products.ts"
    if not path.exists():
        return 0, ["products.ts not found"]

    content = path.read_text(encoding="utf-8")
    changes = []
    orig = content

    # 1. FAQ MOQ 5 处
    if FAQ_MOQ_OLD in content:
        n = content.count(FAQ_MOQ_OLD)
        content = content.replace(FAQ_MOQ_OLD, FAQ_MOQ_NEW)
        changes.append(f"FAQ MOQ (zh-hk 5 SKU 复用): x{n}")

    # 2. 注释 L101
    if NOTE_OLD in content:
        n = content.count(NOTE_OLD)
        content = content.replace(NOTE_OLD, NOTE_NEW)
        changes.append(f"注释 '咭片印刷' -> '卡片印刷': x{n}")

    # 3. 表格 L117
    if TABLE_OLD_1 in content:
        n = content.count(TABLE_OLD_1)
        content = content.replace(TABLE_OLD_1, TABLE_NEW_1)
        changes.append(f"表格 '標準商務名片' -> '標準商務卡片': x{n}")

    # 4. 表格 L128
    if TABLE_OLD_2 in content:
        n = content.count(TABLE_OLD_2)
        content = content.replace(TABLE_OLD_2, TABLE_NEW_2)
        changes.append(f"表格 '彩色照片名片' -> '彩色照片卡片': x{n}")

    # 5. ja FAQ 53 处
    if JA_FAQ_OLD in content:
        n = content.count(JA_FAQ_OLD)
        content = content.replace(JA_FAQ_OLD, JA_FAQ_NEW)
        changes.append(f"ja FAQ 名刺 -> 封筒 (53 处预期): x{n}")

    # 6. zh-hk 名片夾 -> 卡夾
    if ZHHK_BAG_OLD in content:
        n = content.count(ZHHK_BAG_OLD)
        content = content.replace(ZHHK_BAG_OLD, ZHHK_BAG_NEW)
        changes.append(f"zh-hk '名片夾' -> '卡夾': x{n}")

    # 7. en 名片色系 -> 卡片色系
    if EN_COLOR_OLD in content:
        n = content.count(EN_COLOR_OLD)
        content = content.replace(EN_COLOR_OLD, EN_COLOR_NEW)
        changes.append(f"en '名片色系' -> '卡片色系': x{n}")

    # 8. longDescription 标准名片
    if LONG_DESC_OLD in content:
        n = content.count(LONG_DESC_OLD)
        content = content.replace(LONG_DESC_OLD, LONG_DESC_NEW)
        changes.append(f"longDescription '標準名片的' -> '標準卡片厚度的': x{n}")

    # 9. 通用兜底替换
    for old, new in GENERIC_OLD_NEW:
        if old in content:
            n = content.count(old)
            content = content.replace(old, new)
            changes.append(f"通用 '{old}' -> '{new}': x{n}")

    if content != orig:
        path.write_text(content, encoding="utf-8")

    return len(changes), changes


def main():
    print("=== §11 名片禁区清扫 v2 (K3 8/12 11:50 全清拍板) ===\n")
    n, changes = sweep_products_ts()
    if n > 0:
        print(f"[OK] products.ts: {n} 类替换")
        for c in changes:
            print(f"  - {c}")
    else:
        print(f"  - products.ts: 无需替换")

    print(f"\n=== 验证 grep ===")
    os.chdir(WORKSPACE)
    residual_total = 0
    for pat in ["名片", "咭片", "名刺"]:
        result = os.popen(
            f'grep -c "{pat}" src/data/products.ts 2>nul'
        ).read().strip()
        n = int(result) if result.isdigit() else 0
        residual_total += n
        if n == 0:
            print(f"[OK] '{pat}' 在 products.ts = 0 (清零)")
        else:
            print(f"[WARN] '{pat}' 在 products.ts 残留 {n} 处")

    print(f"\n总残留: {residual_total} 处")
    return n


if __name__ == "__main__":
    main()
