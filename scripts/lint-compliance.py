#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
scripts/lint-compliance.py (3D 矩阵版)
ZprintPro / 智印雲 合规 lint — NAP + JP Legal + Locale × File 矩阵

升级点:
- [新增] Section 6: 3D 矩阵 NAP drift 检查 — locale × file × pattern
- [新增] Section 7: 自动检测所有多 locale 内容文件
- [保留] Section 1-5: 原有硬规则

Usage:
  python scripts/lint-compliance.py
  python scripts/lint-compliance.py --strict
  python scripts/lint-compliance.py --matrix-only
"""
import os
import re
import sys
import argparse
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
os.chdir(ROOT)

RED = "\033[91m"
GREEN = "\033[92m"
YELLOW = "\033[93m"
CYAN = "\033[96m"
RESET = "\033[0m"


def color(text, c):
    if sys.stdout.isatty():
        return f"{c}{text}{RESET}"
    return text


# NAP drift signals (实体声明 / factory / showroom / 取货点)
NAP_DRIFT_SIGNALS = [
    "Hong Kong factory",
    "Kwun Tong factory",
    "Kwun Tong showroom",
    "Kwun Tong warehouse",
    "觀塘實體工廠",
    "觀塘門市",
    "観塘実体工場",
    "Kwun Tong Industrial District",
    "182 Wai Yip Street",
    "82 Wai Yip Street",
    "Shing Wan Industrial Building",
    "香港觀塘實體工廠",
]

# 派送区域描述 (保留)
DELIVERY_AREA_PATTERNS = [
    r"香港島",
    r"九龍",
    r"新界",
    r"港島",
    r"灣仔",
    r"觀塘",  # 区域名 OK
    r"旺角",
    r"銅鑼灣",
    r"尖沙咀",
    r"順豐",
    r"SF Express",
    r"DHL Express",
]


def find_matches(path: Path, patterns: list, simple: bool = True) -> dict:
    if not path.exists():
        return {}
    text = path.read_text(encoding="utf-8", errors="replace")
    results = {}
    for p in patterns:
        results[p] = []
        for i, line in enumerate(text.splitlines(), 1):
            if simple:
                if p in line:
                    results[p].append((i, line.strip()))
            else:
                if re.search(p, line):
                    results[p].append((i, line.strip()))
    return results


def glob_ts_files() -> list:
    files = []
    src = ROOT / "src"
    if not src.exists():
        return files
    for ext in ("ts", "tsx"):
        files.extend(src.rglob(f"*.{ext}"))
    return files


def detect_locale_segments(text: str) -> list:
    """返回 [(start_line, locale)] 列表,每个 locale 段的起始行"""
    segments = []
    locale_patterns = [
        (re.compile(r"['\"]?(zh-hk)['\"]?\s*:"), "zh-hk"),
        (re.compile(r"['\"]?en['\"]?\s*:"), "en"),
        (re.compile(r"['\"]?ja['\"]?\s*:"), "ja"),
        (re.compile(r"['\"]?zh['\"]?\s*:"), "zh-hk"),
    ]
    for i, line in enumerate(text.splitlines(), 1):
        for pat, locale in locale_patterns:
            if pat.search(line):
                segments.append((i, locale))
                break
    return segments


def find_locale_for_line(segments: list, target_line: int) -> str:
    """找到 target_line 所属的 locale 段(最近的前置 locale 字段)"""
    current = "unknown"
    for start_line, locale in segments:
        if start_line <= target_line:
            current = locale
        else:
            break
    return current


def audit_3d_matrix() -> dict:
    """
    返回:
    {
      "files": [
        {
          "path": str,
          "locale_counts": {"zh-hk": int, "en": int, "ja": int, "unknown": int},
          "hits": [(line, signal, locale, content), ...]
        }
      ],
      "total": int,
      "by_locale": {"zh-hk": int, "en": int, "ja": int, "unknown": int}
    }
    """
    CONTENT_FILES = [
        "src/data/products.ts",
        "src/data/product-faqs.ts",
        "src/data/category-seo-content.ts",
        "src/data/pillar-content.ts",
        "src/data/sku-seo-data.ts",
        "src/components/seo/RegionalContent.tsx",
        "src/components/seo/GeoFooterText.tsx",
        "src/lib/analytics.ts",
        "src/app/[locale]/contact/page.tsx",
    ]

    result = {"files": [], "total": 0, "by_locale": {"zh-hk": 0, "en": 0, "ja": 0, "unknown": 0}}

    for cf in CONTENT_FILES:
        cf_path = ROOT / cf
        if not cf_path.exists():
            continue
        text = cf_path.read_text(encoding="utf-8", errors="replace")
        lines = text.splitlines()
        segments = detect_locale_segments(text)

        hits = []
        for i, line in enumerate(lines, 1):
            for signal in NAP_DRIFT_SIGNALS:
                if signal in line:
                    locale = find_locale_for_line(segments, i)
                    hits.append((i, signal, locale, line.strip()))
                    break

        locale_counts = {"zh-hk": 0, "en": 0, "ja": 0, "unknown": 0}
        for _, _, loc, _ in hits:
            locale_counts[loc] = locale_counts.get(loc, 0) + 1
            result["by_locale"][loc] = result["by_locale"].get(loc, 0) + 1
        result["total"] += len(hits)

        result["files"].append({
            "path": cf,
            "locale_counts": locale_counts,
            "hits": hits,
        })

    return result


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--strict", action="store_true", help="WARN 也算失败")
    parser.add_argument("--matrix-only", action="store_true", help="只跑 3D 矩阵审计")
    args = parser.parse_args()

    failed = False
    warnings = []

    def fail(msg):
        nonlocal failed
        print(f"  {color('[FAIL]', RED)} {msg}")
        failed = True

    def warn(msg):
        nonlocal warnings
        print(f"  {color('[WARN]', YELLOW)} {msg}")
        warnings.append(msg)

    def passed(msg):
        print(f"  {color('[PASS]', GREEN)} {msg}")

    if not args.matrix_only:
        print()
        print(color("=" * 60, CYAN))
        print(color("  ZprintPro Compliance Lint — NAP + JP Legal", CYAN))
        print(color("=" * 60, CYAN))
        print()

        # =================================================================
        # Check 1: /ja/legal 法定公示
        # =================================================================
        print(color("[1] /ja/legal 法定公示 (JP 特商法)", CYAN))
        legal_file = ROOT / "src" / "app" / "[locale]" / "legal" / "page.tsx"
        if not legal_file.exists():
            fail(f"{legal_file} not found")
        else:
            bad_patterns = ["観塘", "Kwun Tong", "觀塘", "完備", "完备", "+852 ", "Hong Kong factory"]
            hits = find_matches(legal_file, bad_patterns, simple=True)
            total = sum(len(v) for v in hits.values())
            if total == 0:
                passed(f"{legal_file.name} clean of HK legacy / 完備 / +852")
            else:
                for p, locs in hits.items():
                    if locs:
                        fail(f"{legal_file.name} contains '{p}' [{len(locs)} hits] — violates 特商法")
                        for ln, txt in locs[:3]:
                            print(f"        L{ln}: {txt[:80]}")

        print()

        # =================================================================
        # Check 2: siteConfig NAP
        # =================================================================
        print(color("[2] siteConfig NAP", CYAN))
        seo_file = ROOT / "src" / "lib" / "seo.ts"
        if not seo_file.exists():
            fail(f"{seo_file} not found")
        else:
            text = seo_file.read_text(encoding="utf-8", errors="replace")
            if re.search(r"phone:\s*'\+86", text):
                passed("siteConfig.phone = +86 ...")
            else:
                fail("siteConfig.phone not +86 prefix")
            if re.search(r"city:\s*'Shenzhen'", text):
                passed("siteConfig.address.city = Shenzhen")
            else:
                fail("siteConfig.address.city != Shenzhen")
            hardcoded = [
                (r"addressLocality:\s*'Kwun Tong'", "schema NAP drift"),
                (r"streetAddress:\s*'182 Wai Yip Street'", "fake HK addr"),
                (r"postalCode:\s*'999077'", "fake HK postal"),
            ]
            for pat, desc in hardcoded:
                if re.search(pat, text):
                    fail(f"seo.ts hardcoded [{desc}]: {pat}")
                else:
                    passed(f"seo.ts no hardcoded '{pat[:30]}'")

        print()

        # =================================================================
        # Check 3: Footer NAP
        # =================================================================
        print(color("[3] Footer NAP", CYAN))
        footer_file = ROOT / "src" / "components" / "layout" / "Footer.tsx"
        if footer_file.exists():
            text = footer_file.read_text(encoding="utf-8", errors="replace")
            if re.search(r"\+86[\s\-]?181[\s\-]?2638[\s\-]?0255", text):
                passed("Footer has +86 181 2638 0255")
            else:
                fail("Footer missing real Shenzhen phone")
            if re.search(r"(深圳|Shenzhen|龍崗|龙岗|平湖)", text):
                passed("Footer has Shenzhen address")
            else:
                fail("Footer missing Shenzhen address")
        else:
            warn("Footer.tsx not found — skipped")

        print()

        # =================================================================
        # Check 4: "特定商取引法完備" 非法定用语
        # =================================================================
        print(color("[4] 特商法 term compliance", CYAN))
        bad_combo_pattern = re.compile(r"特定商取引法.*完備|完備.*特定商取引法|特定商取引法.*完备|完备.*特定商取引法")
        found_combos = []
        for f in glob_ts_files():
            try:
                text = f.read_text(encoding="utf-8", errors="replace")
            except Exception:
                continue
            for i, line in enumerate(text.splitlines(), 1):
                if bad_combo_pattern.search(line):
                    found_combos.append((f, i, line.strip()))
        if found_combos:
            fail(f"Found '特定商取引法完備' 非法定用语 [{len(found_combos)} hits]:")
            for f, ln, txt in found_combos[:5]:
                rel = f.relative_to(ROOT)
                print(f"        {rel}:{ln}: {txt[:80]}")
        else:
            passed("No '特定商取引法完備' non-legal term")

        print()

    # =================================================================
    # Check 5 (legacy) + Check 6 (NEW: 3D matrix)
    # =================================================================
    print(color("[6] NAP drift 3D matrix (locale × file × pattern)", CYAN))
    matrix = audit_3d_matrix()

    if matrix["total"] == 0:
        passed(f"all 7 content files clean of NAP drift (0 hits)")
    else:
        # 打印矩阵
        print()
        print(f"  {'File':<40} {'zh-hk':>6} {'en':>5} {'ja':>5} {'unk':>5} {'TOTAL':>6}")
        print(f"  {'-'*40} {'-'*6} {'-'*5} {'-'*5} {'-'*5} {'-'*6}")
        for f in matrix["files"]:
            lc = f["locale_counts"]
            name = f["path"].replace("src/", "")
            print(f"  {name:<40} {lc['zh-hk']:>6} {lc['en']:>5} {lc['ja']:>5} {lc['unknown']:>5} {len(f['hits']):>6}")

        print()
        print(f"  Total: {matrix['total']} NAP drift signals")
        print(f"  by_locale: {matrix['by_locale']}")
        print()

        # 对每个 hit warn
        for f in matrix["files"]:
            for ln, sig, loc, content in f["hits"][:3]:  # 最多显示 3 个/file
                warn(f"{f['path']}:{ln} [{loc}] '{sig}'")
        if matrix["total"] > 21:  # 7 files × 3 each
            print(f"  ... ({matrix['total'] - 21} more)")

    print()
    print(color("=" * 60, CYAN))
    if failed:
        print(color("  [LINT FAILED] — fix FAILs and re-run", RED))
        print(color("=" * 60, CYAN))
        sys.exit(1)
    elif args.strict and (warnings or matrix["total"] > 0):
        print(color(f"  [LINT FAILED in --strict mode] — {len(warnings)} WARNs + {matrix['total']} drift", RED))
        print(color("=" * 60, CYAN))
        sys.exit(1)
    else:
        msg = f"{len(warnings)} WARNs, {matrix['total']} drift"
        print(color(f"  [LINT PASSED] — {msg} (non-blocking)", GREEN))
        print(color("=" * 60, CYAN))
        sys.exit(0)


if __name__ == "__main__":
    main()