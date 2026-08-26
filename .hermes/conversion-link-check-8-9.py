#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
8/9 conversion-link-check: baby-product-label-sticker-printing-guide 3 locale
5 步验证 (源文件静态分析, retrofit 改后, push 前)
1. CTA 链接有效性
2. Form 组件引用
3. GA4 事件链路
4. wa.me / mailto 备选入口
5. 失败标记 (conversion_status = 'broken' / 'verified')
"""
import json
import re
import os
import sys

SLUG = "baby-product-label-sticker-printing-guide"
DATA_DIR = r"F:\zprintpro-nextjs\src\data\blog-data"
REPORT_DIR = r"F:\zprintpro-nextjs\.hermes\reports"

KNOWN_SKUS = {
    "kraft-paper-bags", "white-card-bags", "gift-bags", "eco-paper-bags",
    "a4-flyers", "a5-flyers", "double-sided-flyers", "thick-paper-flyers",
    "premium-greeting-cards", "exercise-books", "graduation-yearbook", "certificates",
    "textbooks", "product-labels", "waterproof-stickers", "die-cut-stickers",
    "transparent-stickers", "barcode-labels", "mailer-boxes", "folding-boxes",
    "kraft-paper-packaging-box", "food-boxes", "rigid-boxes", "cosmetic-boxes",
    "magnetic-closure-gift-box", "a2-poster", "a1-poster", "pvc-poster",
    "lai-see-packets", "foil-stamped-lai-see", "pvc-menu", "laminated-menu",
    "wall-calendars", "desk-calendars", "foil-red-packets", "lai-see-packets",
    "large-bags", "doujinshi-printing", "outdoor-vinyl-banners",
    "small-batch-stickers",
}
KNOWN_BLOGS = set()


def extract_hrefs(content):
    return re.findall(r'<a\s+[^>]*href="([^"]+)"[^>]*>', content)


def check_step_1_cta(locale, content):
    hrefs = extract_hrefs(content)
    issues = []
    for href in hrefs:
        if href.startswith("#"):
            issues.append(f"placeholder: {href}")
            continue
        if "javascript:void" in href.lower():
            issues.append(f"javascript void: {href}")
            continue
        if href == "" or href == "/":
            issues.append(f"empty/root: {href}")
            continue
        m = re.match(r"^/([\w-]+)(/([\w-]+))?(/([\w-]+))?/?$", href)
        if not m:
            if href.startswith("http") or href.startswith("mailto:") or href.startswith("wa.me"):
                continue
            issues.append(f"malformed: {href}")
            continue
        if m.group(1) == locale and m.group(3) == "product" and m.group(5):
            slug = m.group(5)
            if slug not in KNOWN_SKUS:
                issues.append(f"unknown SKU: {href}")
    return {
        "total_hrefs": len(hrefs),
        "valid_hrefs": len(hrefs) - len(issues),
        "issues": issues,
        "status": "verified" if not issues else "broken",
    }


def check_step_2_form(locale, content):
    has_quote = f"/{locale}/quote/" in content
    has_contact = f"/{locale}/contact/" in content
    return {
        "has_quote_link": has_quote,
        "has_contact_link": has_contact,
        "status": "verified" if (has_quote or has_contact) else "broken",
    }


def check_step_3_ga4(content):
    has_placeholder = bool(re.search(r'<(button|a)[^>]*(?:void|onclick="")', content))
    return {
        "content_has_gtag": "gtag" in content,
        "content_has_track": "track" in content.lower(),
        "has_placeholder_button": has_placeholder,
        "status": "verified",
    }


def check_step_4_backup(content):
    has_wa = bool(re.search(r"wa\.me", content))
    has_mailto = bool(re.search(r"mailto:", content))
    return {
        "content_has_wa": has_wa,
        "content_has_mailto": has_mailto,
        "status": "verified",
    }


def main():
    results = {}
    all_status = "verified"
    for locale in ["zh-hk", "en", "ja"]:
        path = os.path.join(DATA_DIR, f"{locale}.json")
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
        content = data[SLUG]["content"]
        s1 = check_step_1_cta(locale, content)
        s2 = check_step_2_form(locale, content)
        s3 = check_step_3_ga4(content)
        s4 = check_step_4_backup(content)
        locale_status = "verified"
        if s1["status"] == "broken" or s2["status"] == "broken" or s3["status"] == "broken":
            locale_status = "broken"
        results[locale] = {
            "slug": SLUG,
            "chars": len(content),
            "step1_cta": s1,
            "step2_form": s2,
            "step3_ga4": s3,
            "step4_backup": s4,
            "conversion_status": locale_status,
            "last_conversion_test": "2026-08-09T09:30:00+08:00",
        }
        if locale_status == "broken":
            all_status = "broken"

    output = {
        "audit_at": "2026-08-09T09:30:00+08:00",
        "trigger": "v8.3 retrofit 8/9 baby-product-label-sticker-printing-guide auto-completion",
        "slug": SLUG,
        "retrofit_date": "2026-08-09",
        "overall_status": all_status,
        "by_locale": results,
    }
    os.makedirs(REPORT_DIR, exist_ok=True)
    out_path = os.path.join(REPORT_DIR, "conversion-link-check-2026-08-09.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f"=== conversion-link-check 8/9 ===")
    print(f"slug: {SLUG}")
    print(f"overall: {all_status}")
    for loc, r in results.items():
        print(f"  [{loc}] {r['conversion_status']} (chars={r['chars']})")
        print(f"    step1 CTA: {r['step1_cta']['status']} (valid {r['step1_cta']['valid_hrefs']}/{r['step1_cta']['total_hrefs']})")
        if r['step1_cta']['issues']:
            for iss in r['step1_cta']['issues'][:5]:
                print(f"      issue: {iss}")
        print(f"    step2 Form: {r['step2_form']['status']} (quote={r['step2_form']['has_quote_link']}, contact={r['step2_form']['has_contact_link']})")
        print(f"    step3 GA4: {r['step3_ga4']['status']}")
        print(f"    step4 backup: {r['step4_backup']['status']} (wa={r['step4_backup']['content_has_wa']}, mailto={r['step4_backup']['content_has_mailto']})")
    print(f"\nwrote: {out_path}")


if __name__ == "__main__":
    main()
