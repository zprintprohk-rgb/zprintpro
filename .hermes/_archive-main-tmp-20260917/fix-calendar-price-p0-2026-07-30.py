#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
fix-calendar-price-p0-2026-07-30.py
M3 P0 价格修复 — 6 calendar SKU 批量价口径改 1000 本起 + HK$3-8 区间
en/ja 同步比例

修复前 (现):
  wall-calendars      HK$12-40/本  basePrice 12  basePrice_en 4.6   basePrice_ja 644   minQuantity 100
  desk-calendars      HK$16-50/本  basePrice 16  basePrice_en 5.52  basePrice_ja 773   minQuantity 100
  custom-calendars    HK$20-65/本  basePrice 20  basePrice_en 7.36  basePrice_ja 1030  minQuantity 100
  mini-calendars      HK$6-20/本   basePrice 6   basePrice_en 2.76  basePrice_ja 386   minQuantity 100
  photo-frame-cal.    HK$24-80/本  basePrice 24  basePrice_en 9.2   basePrice_ja 1288  minQuantity 100
  magnetic-calendars  HK$10-30/本  basePrice 10  basePrice_en 3.68  basePrice_ja 515   minQuantity 100

修复后 (1000 本起 + HK$3-8 区间 + 6 SKU 统一口径):
  wall-calendars      HK$3-8/本   basePrice 3  basePrice_en 0.40  basePrice_ja 50  minQuantity 1000
  desk-calendars      HK$3-8/本   basePrice 3  basePrice_en 0.40  basePrice_ja 50  minQuantity 1000
  custom-calendars    HK$3-8/本   basePrice 3  basePrice_en 0.40  basePrice_ja 50  minQuantity 1000
  mini-calendars      HK$3-8/本   basePrice 3  basePrice_en 0.40  basePrice_ja 50  minQuantity 1000
  photo-frame-cal.    HK$3-8/本   basePrice 3  basePrice_en 0.40  basePrice_ja 50  minQuantity 1000
  magnetic-calendars  HK$3-8/本   basePrice 3  basePrice_en 0.40  basePrice_ja 50  minQuantity 1000

(同 1 类目 6 SKU 区间统一 HK$3-8 = §13.4 类目优先级 P1 (calendars) 类目页统一口径)

执行步骤:
  1. 改 products.ts 6 SKU × 4 字段
  2. 改 pricing.ts L548-571 6 SKU INDEPENDENT_PRICES (en/ja)
  3. 改 pricing.ts L892 desk-calendars DISPLAY_ANCHOR_OVERRIDES anchor
  4. 改 category/[slug]/page.tsx L193 en customH1Map calendars 100 MOQ → 1000 MOQ
  5. spot check 编码 + BOM
  6. 写日志
"""
import io
import os
import re
import sys
from datetime import datetime

ROOT = r"F:\zprintpro-nextjs"

# ===== 1. products.ts 6 SKU 修复映射 =====
SKU_FIXES = [
    # (slug, old_price_range, new_price_range, old_basePrice, new_basePrice, ...)
    ("wall-calendars",      "HK$12-40/本", "HK$3-8/本", "12",  "3",  "4.6",  "0.40", "644",  "50"),
    ("desk-calendars",      "HK$16-50/本", "HK$3-8/本", "16",  "3",  "5.52", "0.40", "773",  "50"),
    ("custom-calendars",    "HK$20-65/本", "HK$3-8/本", "20",  "3",  "7.36", "0.40", "1030", "50"),
    ("mini-calendars",      "HK$6-20/本",  "HK$3-8/本", "6",   "3",  "2.76", "0.40", "386",  "50"),
    ("photo-frame-calendars", "HK$24-80/本", "HK$3-8/本", "24", "3",  "9.2",  "0.40", "1288", "50"),
    ("magnetic-calendars",  "HK$10-30/本", "HK$3-8/本", "10",  "3",  "3.68", "0.40", "515",  "50"),
]

def fix_products_ts():
    path = os.path.join(ROOT, "src", "data", "products.ts")
    with io.open(path, "r", encoding="utf-8") as f:
        text = f.read()

    # 检查 6 SKU 块都存在
    for slug, *_ in SKU_FIXES:
        if f"slug: '{slug}'" not in text:
            raise RuntimeError(f"products.ts 缺 slug: {slug}")

    changes = []
    for slug, old_pr, new_pr, old_bp, new_bp, old_bpe, new_bpe, old_bpj, new_bpj in SKU_FIXES:
        # 找 slug 起始行, 在后 500 行内替换 4 个字段 + minQuantity
        # 每个字段 4 种典型排版格式:
        #   price_range: 'X',
        #   basePrice: Y,
        #   basePrice_en: Z,
        #   basePrice_ja: W,
        #   minQuantity: 100,
        m = re.search(r"^\s*slug:\s*'" + re.escape(slug) + r"',", text, re.MULTILINE)
        if not m:
            raise RuntimeError(f"products.ts 未找到 slug 行: {slug}")
        start = m.start()
        end = min(start + 12000, len(text))  # longDescription 表格大, 6 SKU 块 ~5000-7000 字符
        block = text[start:end]

        # 替换
        new_block = block
        new_block = re.sub(
            r"(price_range:\s*['\"])" + re.escape(old_pr) + r"(['\"])",
            r"\g<1>" + new_pr + r"\g<2>",
            new_block, count=1,
        )
        new_block = re.sub(
            r"(basePrice:\s*)" + re.escape(old_bp) + r"(,?)",
            r"\g<1>" + new_bp + r"\g<2>",
            new_block, count=1,
        )
        new_block = re.sub(
            r"(basePrice_en:\s*)" + re.escape(old_bpe) + r"(,?)",
            r"\g<1>" + new_bpe + r"\g<2>",
            new_block, count=1,
        )
        new_block = re.sub(
            r"(basePrice_ja:\s*)" + re.escape(old_bpj) + r"(,?)",
            r"\g<1>" + new_bpj + r"\g<2>",
            new_block, count=1,
        )
        # minQuantity 100 → 1000 (这是本 SKU 专属, 不影响其他 SKU)
        new_block = re.sub(
            r"(minQuantity:\s*)100(\s*,?)",
            r"\g<1>1000\g<2>",
            new_block, count=1,
        )

        if new_block == block:
            raise RuntimeError(f"products.ts {slug} 块无任何替换 — 字段不匹配")

        text = text[:start] + new_block + text[end:]
        changes.append({
            "slug": slug,
            "price_range": f"{old_pr} → {new_pr}",
            "basePrice": f"{old_bp} → {new_bp}",
            "basePrice_en": f"{old_bpe} → {new_bpe}",
            "basePrice_ja": f"{old_bpj} → {new_bpj}",
            "minQuantity": "100 → 1000",
        })

    with io.open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write(text)
    return changes


# ===== 2. pricing.ts 6 SKU INDEPENDENT_PRICES 修复 (en/ja) =====
# 用户口径 1000 本起 + 显示价 HK$3-8
# en: HK$3 ≈ US$0.40 / HK$8 ≈ US$1.10  (HK$1 ≈ US$0.128)
# ja: HK$3 ≈ JPY 50 / HK$8 ≈ JPY 150     (HK$1 ≈ JPY 19)
# 6 SKU 在 3-8 区间内按复杂度梯度 (mini 低端 / 定制相框 顶端)
SKU_ANCHOR_FIXES = [
    # (slug, old_en_min, old_en_max, new_en_min, new_en_max, old_ja_min, old_ja_max, new_ja_min, new_ja_max)
    ("wall-calendars",        "4.6",  "13.8",  "0.40", "1.10", "644",  "1932", "50",  "150"),
    ("desk-calendars",        "5.52", "16.56", "0.55", "1.10", "773",  "2318", "75",  "150"),
    ("custom-calendars",      "7.36", "20.24", "0.80", "1.10", "1030", "2834", "110", "150"),
    ("mini-calendars",        "2.76", "7.36",  "0.40", "0.65", "386",  "1030", "50",  "90"),
    ("photo-frame-calendars", "9.2",  "25.76", "0.95", "1.10", "1288", "3606", "130", "150"),
    ("magnetic-calendars",    "3.68", "11.04", "0.40", "0.80", "515",  "1546", "50",  "110"),
]

def fix_pricing_ts_anchors():
    path = os.path.join(ROOT, "src", "lib", "pricing.ts")
    with io.open(path, "r", encoding="utf-8") as f:
        text = f.read()

    changes = []
    for slug, oe_min, oe_max, ne_min, ne_max, oj_min, oj_max, nj_min, nj_max in SKU_ANCHOR_FIXES:
        # 找 slug 块 (3 行)
        m = re.search(
            r"'" + re.escape(slug) + r"':\s*\{\s*"
            r"'en':\s*\{\s*min:\s*" + re.escape(oe_min) + r",\s*max:\s*" + re.escape(oe_max) + r",\s*unit:\s*'pc'\s*\},"
            r"\s*'ja':\s*\{\s*min:\s*" + re.escape(oj_min) + r",\s*max:\s*" + re.escape(oj_max) + r",\s*unit:\s*'\u500b'\s*\}",
            text,
        )
        if not m:
            raise RuntimeError(f"pricing.ts {slug} anchor 块未找到 — 字段值不匹配 (en: {oe_min}-{oe_max}, ja: {oj_min}-{oj_max})")

        old_block = m.group(0)
        new_block = (
            f"'{slug}': {{"
            f"\n    'en': {{ min: {ne_min}, max: {ne_max}, unit: 'pc' }},"
            f"\n    'ja': {{ min: {nj_min}, max: {nj_max}, unit: '\u500b' }},"
            f"\n  }}"
        )
        # 改 unit 'pc' 行要加 unit 字段原始格式 (可能 'pc' 或 'pc ')
        # 这里我们用 group(0) 找到原 block 整段替换

        # 用更精细的方式: 只替换数字
        new_text = text
        new_text = new_text.replace(
            f"'{slug}': {{\n    'en': {{ min: {oe_min}, max: {oe_max}, unit: 'pc' }},",
            f"'{slug}': {{\n    'en': {{ min: {ne_min}, max: {ne_max}, unit: 'pc' }},",
        )
        new_text = new_text.replace(
            f"    'ja': {{ min: {oj_min}, max: {oj_max}, unit: '\u500b' }},",
            f"    'ja': {{ min: {nj_min}, max: {nj_max}, unit: '\u500b' }},",
        )
        if new_text == text:
            raise RuntimeError(f"pricing.ts {slug} anchor 无任何替换")
        text = new_text
        changes.append({
            "slug": slug,
            "en": f"min {oe_min}→{ne_min}, max {oe_max}→{ne_max}",
            "ja": f"min {oj_min}→{nj_min}, max {oj_max}→{nj_max}",
        })

    # ===== 3. desk-calendars DISPLAY_ANCHOR_OVERRIDES anchor =====
    # L892 现: 'desk-calendars':      { low: 8.00, high: 25.00, unit: '本' },
    # 改:                      { low: 3.00, high: 8.00,  unit: '本' }
    old_anchor = "'desk-calendars':      { low: 8.00, high: 25.00, unit: '\u672c' }, // \u53f0\u5386(\u51cf\u534a)"
    new_anchor = "'desk-calendars':      { low: 3.00, high: 8.00,  unit: '\u672c' }, // \u53f0\u5386(1000\u672c\u8d77\u6279\u53e3\u5f84)"
    if old_anchor not in text:
        raise RuntimeError("pricing.ts DISPLAY_ANCHOR_OVERRIDES desk-calendars anchor 未找到")
    text = text.replace(old_anchor, new_anchor)
    changes.append({
        "slug": "desk-calendars (DISPLAY_ANCHOR_OVERRIDES)",
        "low/high": "8.00/25.00 → 3.00/8.00",
    })

    with io.open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write(text)
    return changes


# ===== 4. category/[slug]/page.tsx L193 en customH1Map calendars =====
def fix_category_page_h1():
    path = os.path.join(ROOT, "src", "app", "[locale]", "category", "[slug]", "page.tsx")
    with io.open(path, "r", encoding="utf-8") as f:
        text = f.read()

    old = "en: 'Custom Calendars Free Shipping \u00b7 100 MOQ 2027 Desk Wall Hardcover Foil \u00b7 USA Corporate Gifts',"
    new = "en: 'Custom Calendars Free Shipping \u00b7 1000 MOQ 2027 Desk Wall Hardcover Foil \u00b7 USA Corporate Gifts',"
    if old not in text:
        raise RuntimeError("category/[slug]/page.tsx L193 en calendars 100 MOQ 字符串未找到")
    text = text.replace(old, new)
    with io.open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write(text)
    return [{"file": "src/app/[locale]/category/[slug]/page.tsx", "L193 en H1": "100 MOQ → 1000 MOQ"}]


# ===== 5. spot check 编码 + BOM =====
def spot_check():
    files = [
        "src/data/products.ts",
        "src/lib/pricing.ts",
        os.path.join("src", "app", "[locale]", "category", "[slug]", "page.tsx"),
    ]
    for f in files:
        p = os.path.join(ROOT, f)
        with open(p, "rb") as fh:
            b = fh.read()
        bom = b[:3] == b"\xef\xbb\xbf"
        size = len(b)
        ok = (not bom) and (size > 1000)
        print(f"  spot_check: {f} size={size} BOM={bom} OK={ok}")
        if bom:
            raise RuntimeError(f"{f} 出现 UTF-8 BOM, 立即 revert")


def main():
    print("=" * 70)
    print("M3 P0 价格修复 — 6 calendar SKU 批量价口径 1000 本起 + HK$3-8")
    print(f"开始时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 70)

    print("\n[1/4] 改 products.ts 6 SKU × 4 字段 + minQuantity 100→1000")
    p_changes = fix_products_ts()
    for c in p_changes:
        print(f"  ✓ {c['slug']:30s}  pr={c['price_range']:18s} bp={c['basePrice']:7s} bpe={c['basePrice_en']:7s} bpj={c['basePrice_ja']:7s} moq={c['minQuantity']}")

    print("\n[2/4] 改 pricing.ts 6 SKU INDEPENDENT_PRICES + desk-calendars anchor")
    pr_changes = fix_pricing_ts_anchors()
    for c in pr_changes:
        print(f"  ✓ {c['slug']:40s}  {c.get('en','')} {c.get('ja','')} {c.get('low/high','')}")

    print("\n[3/4] 改 category/[slug]/page.tsx L193 en calendars 100 MOQ → 1000 MOQ")
    cp_changes = fix_category_page_h1()
    for c in cp_changes:
        print(f"  ✓ {c['file']:50s}  {c['L193 en H1']}")

    print("\n[4/4] spot check 编码")
    spot_check()

    print("\n" + "=" * 70)
    print("✅ 4 处修复完成 — 准备 commit + push")
    print("=" * 70)


if __name__ == "__main__":
    main()
