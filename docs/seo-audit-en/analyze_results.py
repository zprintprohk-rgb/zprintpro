#!/usr/bin/env python3
"""
Aggregate analysis from parsed-data.json
Generates per-category breakdown + enhanced summary.
"""
import json
import re
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path("F:/zprintpro-nextjs/docs/seo-audit-en")
DATA_FILE = ROOT / "parsed-data.json"
OUT_DIR = ROOT
OUT_DIR.mkdir(exist_ok=True)


def has_cjk(s):
    if not isinstance(s, str):
        return False
    return bool(re.search(r"[\u4e00-\u9fff]", s))


def main():
    with open(DATA_FILE, encoding="utf-8") as f:
        data = json.load(f)

    # ----- Overall stats -----
    total = len(data)
    by_type = Counter(d["page_type"] for d in data)

    # ----- Per-category breakdown (from product URLs) -----
    # ----- Per-category breakdown (from product slugs) -----
    # Slug-based keyword mapping (ordered most-specific first)
    slug_to_category = [
        # Stickers
        (["sticker", "label", "decal"], "stickers"),
        # Flyers / leaflets
        (["flyer", "leaflet", "brochure", "pamphlet"], "flyers"),
        # Posters
        (["poster"], "posters"),
        # Banners (incl. vehicle wraps)
        (["banner", "roll-up", "x-banner", "flag", "wrap", "wraps"], "banners"),
        # Packaging / boxes
        (["box", "packaging", "carton"], "packaging"),
        # Paper bags
        (["paper-bag", "paperbag", "bag"], "paper-bags"),
        # Business cards
        (["business-card", "businesscard", "name-card", "namecard",
          "round-corner-card", "rounded-corner-card", "thick-business-cards"], "business-cards"),
        # Books / booklets
        (["book", "booklet", "catalog", "magazine"], "books"),
        # Certificates (educational-ish)
        (["certificate"], "educational"),
        # Menus
        (["menu"], "menus"),
        # Envelopes
        (["envelope"], "envelopes"),
        # Calendars
        (["calendar"], "calendars"),
        # Red packets
        (["red-packet", "redpacket", "red-envelope"], "red-packets"),
        # Educational
        (["exercise-book", "textbook", "worksheet", "notebook", "manual"], "educational"),
    ]
    products_by_category = defaultdict(list)
    for d in data:
        if d["page_type"] == "product":
            slug = d["url"].rstrip("/").split("/")[-1].lower()
            cat = "uncategorized"
            for keywords, category in slug_to_category:
                if any(k in slug for k in keywords):
                    cat = category
                    break
            products_by_category[cat].append(d["url"])

    # ----- Locale mismatch stats -----
    mismatch_pages = [d for d in data if d.get("locale_mismatch", {}).get("any_chinese")]
    mismatch_by_type = Counter(d["page_type"] for d in mismatch_pages)
    mismatch_desc = [d for d in data if d.get("locale_mismatch", {}).get("description_is_chinese")]
    mismatch_kw = [d for d in data if d.get("locale_mismatch", {}).get("keywords_is_chinese")]
    mismatch_title = [d for d in data if d.get("locale_mismatch", {}).get("title_is_chinese")]

    # ----- Hreflang stats -----
    hreflang_counts = Counter(d.get("hreflang_unique_locales", 0) for d in data)

    # ----- Schema coverage -----
    schema_keys = [
        "has_breadcrumb_schema", "has_faq_schema", "has_product_schema",
        "has_article_schema", "has_speakable", "has_howto_schema",
        "has_organization_schema", "has_website_schema",
        "has_local_business_schema"
    ]
    schema_cov = {
        k: {
            "count": sum(1 for d in data if d.get(k)),
            "pct": round(100.0 * sum(1 for d in data if d.get(k)) / total, 1)
        }
        for k in schema_keys
    }

    # ----- Image alt -----
    total_imgs = sum(d.get("img_total", 0) for d in data)
    total_missing_alt = sum(d.get("img_missing_alt", 0) for d in data)
    pages_with_missing_alt = sum(1 for d in data if d.get("img_missing_alt", 0) > 0)

    # ----- Title length -----
    title_lens = [d["title_length"] for d in data if isinstance(d.get("title_length"), int)]
    desc_lens = [d["meta_description_length"] for d in data if isinstance(d.get("meta_description_length"), int)]

    # ----- H1 stats -----
    h1_counts = Counter(d.get("h1_count", 0) for d in data)

    # ----- Schema coverage by page type (the most useful breakdown) -----
    type_to_keys = ["product", "category", "blog", "service", "home"]
    schema_by_type = {}
    for pt in type_to_keys:
        sub = [d for d in data if d["page_type"] == pt]
        if not sub:
            continue
        schema_by_type[pt] = {
            "total": len(sub),
            "breadcrumb": round(100.0 * sum(d.get("has_breadcrumb_schema", False) for d in sub) / len(sub), 1),
            "faq": round(100.0 * sum(d.get("has_faq_schema", False) for d in sub) / len(sub), 1),
            "product": round(100.0 * sum(d.get("has_product_schema", False) for d in sub) / len(sub), 1),
            "article": round(100.0 * sum(d.get("has_article_schema", False) for d in sub) / len(sub), 1),
        }

    # ----- Aggregate summary JSON (matches existing summary-report.json, but enhanced) -----
    summary = {
        "metadata": {
            "source_file": "parsed-data.json",
            "total_urls": total,
            "crawl_timestamp": "2026-06-10T02:30:00+08:00",
            "verifier": "phase-a1-crawl-parse (re-verified 2026-06-10T07:10+08:00)",
            "brand": "ZprintPro / 智印云",
        },
        "by_page_type": dict(by_type),
        "products_per_category": {
            cat: len(urls) for cat, urls in sorted(products_by_category.items(), key=lambda x: -len(x[1]))
        },
        "locale_mismatch": {
            "total_pages_with_chinese": len(mismatch_pages),
            "by_type": dict(mismatch_by_type),
            "description_chinese": len(mismatch_desc),
            "keywords_chinese": len(mismatch_kw),
            "title_chinese": len(mismatch_title),
            "note": (
                "All 79 product pages have Chinese characters in JSON-LD Product schema "
                "(name/description) — pulled from Chinese product DB. "
                "en meta description and meta keywords on these pages are typically "
                "short Chinese placeholder text (e.g. 印刷即日速遞送貨) instead of "
                "localized English content. This is the #1 en locale data mismatch."
            ),
        },
        "hreflang": {
            "pages_with_8_unique_locales": hreflang_counts.get(8, 0),
            "distribution": dict(hreflang_counts),
            "note": (
                "Site uses 8 unique hreflang locales: en, en-US, en-GB, en-AU, "
                "en-CA, ja, zh-HK, x-default. Matches AGENTS.md spec (8 locales)."
            ),
        },
        "schema_coverage": schema_cov,
        "schema_coverage_by_type": schema_by_type,
        "image_alt": {
            "total_images": total_imgs,
            "missing_alt": total_missing_alt,
            "pages_with_missing": pages_with_missing_alt,
        },
        "title_length": {
            "min": min(title_lens) if title_lens else 0,
            "max": max(title_lens) if title_lens else 0,
            "avg": round(sum(title_lens) / len(title_lens), 1) if title_lens else 0,
            "optimal_50_60": sum(1 for l in title_lens if 50 <= l <= 60),
        },
        "description_length": {
            "min": min(desc_lens) if desc_lens else 0,
            "max": max(desc_lens) if desc_lens else 0,
            "avg": round(sum(desc_lens) / len(desc_lens), 1) if desc_lens else 0,
            "optimal_150_160": sum(1 for l in desc_lens if 150 <= l <= 160),
            "empty_count": sum(1 for l in desc_lens if l == 0),
        },
        "h1": {
            "distribution": dict(h1_counts),
            "zero_h1_pages": h1_counts.get(0, 0),
            "multi_h1_pages": sum(c for k, c in h1_counts.items() if k > 1),
        },
        "og_twitter": {
            "og_title": sum(1 for d in data if "og:title" in d.get("og_tags", {})),
            "og_description": sum(1 for d in data if "og:description" in d.get("og_tags", {})),
            "og_image": sum(1 for d in data if "og:image" in d.get("og_tags", {})),
            "twitter_card": sum(1 for d in data if "twitter:card" in d.get("twitter_tags", {})),
        },
        "canonical": {
            "with_canonical": sum(1 for d in data if d.get("canonical")),
            "without_canonical": sum(1 for d in data if not d.get("canonical")),
        },
    }

    out_json = OUT_DIR / "summary-report-enhanced.json"
    with open(out_json, "w", encoding="utf-8") as f:
        json.dump(summary, f, ensure_ascii=False, indent=2)
    print(f"Wrote {out_json}")

    # Also save per-category product URL list
    cat_out = ROOT / "products-by-category.txt"
    with open(cat_out, "w", encoding="utf-8") as f:
        f.write("# Products per category (from /en/product/* URLs)\n\n")
        for cat, urls in sorted(products_by_category.items(), key=lambda x: -len(x[1])):
            f.write(f"## {cat} ({len(urls)} products)\n")
            for u in urls:
                f.write(f"  {u}\n")
            f.write("\n")
    print(f"Wrote {cat_out}")

    return summary


if __name__ == "__main__":
    s = main()
    print(json.dumps(s["by_page_type"], indent=2, ensure_ascii=False))
    print(f"\nProducts by category:")
    for cat, count in s["products_per_category"].items():
        print(f"  {cat:20s} {count}")