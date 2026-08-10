#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
K3 8/10 10:17 §0.15 升级 part 3 - src/lib/seo.ts 12+ 处 hardcoded 'ZprintPro' 改 locale-aware
- zh-hk = 智印港 (per K3 10:17 升级)
- en = ZprintPro (per §0.15 locale-aware 公式)
- ja = ジープリント (per §13.16.1 ja brand 公式)
- 之前 c48181b 改智印雲 残留 + cefe895 改 layout.tsx 后, 这一批是 §0.15 升级最后遗漏
"""
import re
import sys
from pathlib import Path

ROOT = Path(r"F:\zprintpro-nextjs")
SEO_TS = ROOT / "src" / "lib" / "seo.ts"

# 1. 加 helper getBrandName (插在 getWebLogoAlt 之后, L24)
HELPER_CODE = '''
/**
 * 2026-08-10 K3 §0.15 升级 (10:17 拍板) + §0.15 locale-aware siteName 公式
 * 全 locale brand 切换: zh-hk=智印港 / en=ZprintPro / ja=ジープリント
 * 之前 zh-hk=智印港 / en/ja=ZprintPro 的 hardcoded 模式会丢失 ja ジープリント 公式
 */
export function getBrandName(locale: Locale): string {
  if (locale === 'zh-hk') return '智印港';
  if (locale === 'ja') return 'ジープリント';
  return 'ZprintPro';
}
'''


def main() -> int:
    with open(SEO_TS, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. 加 helper (插在 getWebLogoAlt 函数定义后)
    if "export function getBrandName" in content:
        print("[SKIP] getBrandName helper already exists")
    else:
        # 找 getWebLogoAlt 闭合括号 + 新行
        old_marker = "export function getWebLogoAlt(locale: Locale): string {\n  return locale === 'zh-hk' ? '智印港 ZprintPro' : 'ZprintPro';\n}\n"
        new_marker = old_marker + HELPER_CODE
        if old_marker in content:
            content = content.replace(old_marker, new_marker, 1)
            print("[OK] Added getBrandName helper after getWebLogoAlt")
        else:
            print("[FAIL] getWebLogoAlt marker not found - abort")
            return 1

    # 2. 改 L23 getWebLogoAlt 改 locale-aware (zh-hk=智印港 ZprintPro 双品牌, en=ZprintPro, ja=ジープリント ZprintPro)
    old_logo_alt = "export function getWebLogoAlt(locale: Locale): string {\n  return locale === 'zh-hk' ? '智印港 ZprintPro' : 'ZprintPro';\n}"
    new_logo_alt = (
        "export function getWebLogoAlt(locale: Locale): string {\n"
        "  // 2026-08-10 §0.15 升级: ja locale ジープリント ZprintPro (双品牌, ja 公式 per §13.16.1)\n"
        "  if (locale === 'zh-hk') return '智印港 ZprintPro';\n"
        "  if (locale === 'ja') return 'ジープリント ZprintPro';\n"
        "  return 'ZprintPro';\n"
        "}"
    )
    if old_logo_alt in content:
        content = content.replace(old_logo_alt, new_logo_alt, 1)
        print("[OK] getWebLogoAlt locale-aware (3 locale)")
    else:
        print("[WARN] getWebLogoAlt marker not exact match - try regex")

    # 3. 改所有 `locale === 'zh-hk' ? 'A' : 'B'` 模式 → getBrandName(locale)
    # Pattern 1: locale === 'zh-hk' ? siteConfig.displayName : 'ZprintPro' → getBrandName(locale)
    count_p1 = 0
    while "locale === 'zh-hk' ? siteConfig.displayName : 'ZprintPro'" in content:
        content = content.replace(
            "locale === 'zh-hk' ? siteConfig.displayName : 'ZprintPro'",
            "getBrandName(locale)",
            1,
        )
        count_p1 += 1
    print(f"[OK] Pattern 1 (displayName/ZprintPro ternary): {count_p1} replacements")

    # Pattern 2: locale === 'zh-hk' ? '智印港 ZprintPro' : 'ZprintPro' → getBrandName(locale) + ' ZprintPro'
    count_p2 = 0
    while "locale === 'zh-hk' ? '智印港 ZprintPro' : 'ZprintPro'" in content:
        content = content.replace(
            "locale === 'zh-hk' ? '智印港 ZprintPro' : 'ZprintPro'",
            "locale === 'zh-hk' ? '智印港' : locale === 'ja' ? 'ジープリント' : 'ZprintPro'",  # K3 10:17 全 locale brand 切换
            1,
        )
        count_p2 += 1
    print(f"[OK] Pattern 2 (智印港 ZprintPro/ZprintPro): {count_p2} replacements")

    # 写回
    with open(SEO_TS, "w", encoding="utf-8", newline="\n") as f:
        f.write(content)
    print(f"[OK] Wrote {SEO_TS}")

    # 验证
    with open(SEO_TS, "r", encoding="utf-8") as f:
        verify = f.read()
    print()
    print("=== verify remaining hardcoded 'ZprintPro' ===")
    remaining = re.findall(r"'ZprintPro'", verify)
    print(f"  total 'ZprintPro' literal: {len(remaining)}")
    # 找仍在 ternary 中的
    still_ternary = re.findall(
        r"locale === 'zh-hk' \? 'ZprintPro'|'ZprintPro' \? .* : ", verify
    )
    print(f"  still in ternary (zh-hk=ZprintPro pattern): {len(still_ternary)}")
    # getBrandName helper 出现次数
    helper_count = verify.count("getBrandName(locale)")
    print(f"  getBrandName(locale) calls: {helper_count}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
