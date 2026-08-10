#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
K3 8/10 10:17 §0.15 升级 - 智印雲 全部 改为 智印港
- zh-hk context: 智印雲 → 智印港
- en context: 智印雲 → ZprintPro (补漏, 之前 568087a 应该都改了)
- ja context: 智印雲 → ジープリント (补漏, per §13.16.1 拍板)
- 通用文件 (src/lib/, src/data/, src/components/ 不带 locale): 智印雲 → 智印港 (zh-hk 兜底)

注意: 这是 K3 10:17 §0.15 升级版, 跟 §13.10 NAP 脱钩原则冲突 (之前 NAP 允许位保留智印雲).
K3 10:17 拍板: "全 locale 只要 智印港", 撤销 §13.10 NAP 允许位.
"""
import re
import sys
from pathlib import Path

ROOT = Path(r"F:\zprintpro-nextjs")

# 48 files 跨 src/ + public/ (per grep 2026-08-10 10:18)
FILES = [
    # src/lib (2)
    "src/lib/seo.ts",
    "src/lib/seo/schema-extensions.ts",
    # src/data (10)
    "src/data/sku-seo-data.ts",
    "src/data/product-templates/textbooks.html",
    "src/data/category-seo-content.ts",
    "src/data/buying-guides.ts",
    "src/data/breadcrumb-names.ts",
    "src/data/pillar-content.ts",
    "src/data/product-seo.ts",
    "src/data/product-faqs.ts",
    "src/data/industry-keyword-matrix.json",  # 已知 .json 残留
    "src/data/seasonal-keywords.json",  # 已知 .json 残留
    # src/components (7)
    "src/components/seo/RegionalContent.tsx",
    "src/components/seo/GeoFooterText.tsx",
    "src/components/home/WhyChooseUs.tsx",
    "src/components/home/HotProducts.tsx",
    "src/components/home/HeroBanner.tsx",
    "src/components/home/FactoryTrust.tsx",
    "src/components/ProductWhyChooseUs.tsx",
    "src/components/category/CategorySidebar.tsx",
    "src/components/layout/Footer.tsx",
    # src/app/[locale] (22)
    "src/app/[locale]/trade-program/page.tsx",
    "src/app/[locale]/terms/page.tsx",
    "src/app/[locale]/services/rush-printing-delivery/page.tsx",
    "src/app/[locale]/services/page.tsx",
    "src/app/[locale]/service-areas/page.tsx",
    "src/app/[locale]/search/page.tsx",
    "src/app/[locale]/quote/page.tsx",
    "src/app/[locale]/privacy/page.tsx",
    "src/app/[locale]/press-kit/page.tsx",
    "src/app/[locale]/payment-methods/page.tsx",
    "src/app/[locale]/help-center/page.tsx",
    "src/app/[locale]/help-center/HelpCenterClient.tsx",
    "src/app/[locale]/checkout/page.tsx",
    "src/app/[locale]/cart/page.tsx",
    "src/app/[locale]/payment/success/page.tsx",
    "src/app/[locale]/case-studies/page.tsx",
    "src/app/[locale]/blog/BlogContent.tsx",
    "src/app/[locale]/about/page.tsx",
    "src/app/[locale]/blog/page.tsx",
    "src/app/[locale]/contact/page.tsx",
    "src/app/[locale]/category/[slug]/page.tsx",
    "src/app/[locale]/order-confirmation/page.tsx",
    "src/app/[locale]/faq/page.tsx",
    "src/app/[locale]/company-news/page.tsx",
    "src/app/[locale]/legal/page.tsx",
    # public (4)
    "public/llms-ja.txt",
    "public/llms-zh-hk.txt",
    "public/images/logo-v4-horizontal.svg",
    "public/manifest.zh-hk.json",
]

# Locale mapping per file path
def get_locale_replacement(path: str) -> tuple[str, str, str]:
    """Return (old, new_zh, new_en, new_ja) — actually just (zh, en, ja) brand."""
    if "/zh-hk/" in path or "zh-hk" in path or path.endswith("zh-hk.json") or path.endswith("zh-hk.txt"):
        return "智印港"
    if "/en/" in path or path.endswith("en.json") or path.endswith("en.txt"):
        return "ZprintPro"
    if "/ja/" in path or path.endswith("ja.json") or path.endswith("ja.txt"):
        return "ジープリント"
    # 通用文件 (src/lib, src/data, src/components, public/images) - 兜底 zh-hk
    return "智印港"


def get_brand_replacement(path: str) -> str:
    """Get the single brand replacement based on file path locale."""
    return get_locale_replacement(path)


def count_occurrences(content: str, old: str) -> int:
    return content.count(old)


def process_file(rel_path: str) -> tuple[int, int, int]:
    """Process a single file. Returns (occurrences_before, occurrences_after, occurrences_replaced)."""
    full = ROOT / rel_path
    if not full.exists():
        return (0, 0, 0)

    # Read as UTF-8 (with errors=replace for safety)
    try:
        with open(full, "r", encoding="utf-8") as f:
            content = f.read()
    except UnicodeDecodeError:
        with open(full, "r", encoding="utf-8", errors="replace") as f:
            content = f.read()

    brand = get_brand_replacement(rel_path)
    before = count_occurrences(content, "智印雲")
    if before == 0:
        return (before, 0, 0)

    new_content = content.replace("智印雲", brand)
    after = count_occurrences(new_content, "智印雲")

    # Write back (UTF-8 LF, no BOM)
    with open(full, "w", encoding="utf-8", newline="\n") as f:
        f.write(new_content)

    return (before, after, before - after)


def main() -> int:
    print("=" * 70)
    print("K3 8/10 10:17 §0.15 升级 - 智印雲 → locale-aware brand")
    print("  zh-hk → 智印港")
    print("  en → ZprintPro")
    print("  ja → ジープリント")
    print("  通用 (src/lib, src/data, src/components) → 智印港 (zh-hk 兜底)")
    print("=" * 70)

    total_before = 0
    total_after = 0
    total_replaced = 0
    file_count = 0
    for rel in FILES:
        brand = get_brand_replacement(rel)
        before, after, replaced = process_file(rel)
        if before > 0:
            file_count += 1
            total_before += before
            total_after += after
            total_replaced += replaced
            marker = "OK " if after == 0 else "FAIL"
            print(f"  [{marker}] {rel} ({brand}): {before} → {after} (replaced {replaced})")
        else:
            print(f"  [SKIP] {rel}: 0 occurrences")

    print("-" * 70)
    print(f"Files modified: {file_count}/{len(FILES)}")
    print(f"Total 智印雲 before: {total_before}")
    print(f"Total 智印雲 after:  {total_after}")
    print(f"Total replaced:      {total_replaced}")
    print("=" * 70)
    return 0 if total_after == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
