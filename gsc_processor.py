import os, re, json, shutil, hashlib, csv


def delete_root_app_directory():
    root_app_dir = os.path.join(os.getcwd(), "app")
    if os.path.exists(root_app_dir):
        print(f"  [auto-defense] DANGEROUS root app/ detected, deleting...")
        shutil.rmtree(root_app_dir, ignore_errors=True)
        print(f"  [auto-defense] Deleted root app/")


def load_gsc_data(gsc_file="gsc_data.csv"):
    if not os.path.exists(gsc_file):
        raise FileNotFoundError(f"GSC file {gsc_file} not found")
    rows = []
    with open(gsc_file, "r", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            page = row.get("Page", "").strip()
            query = row.get("\u70ed\u95e8\u67e5\u8be2", row.get("Query", "")).strip()
            clicks_str = row.get("\u70b9\u51fb\u6b21\u6570", row.get("Clicks", "0"))
            impr_str = row.get("\u5c55\u793a", row.get("Impressions", "0"))
            if not page or not query: continue
            try:
                clicks = float(clicks_str) if clicks_str else 0
                impressions = float(impr_str) if impr_str else 0
            except ValueError: continue
            if "\u667a\u5370\u5370\u6e2f" in query or "\u667a\u5370\u6e2f" in query: continue
            rows.append({"page": page, "query": query, "clicks": clicks, "impressions": impressions})
    rows.sort(key=lambda r: r["clicks"], reverse=True)
    print(f"  GSC data loaded: {len(rows)} records")
    return rows


def extract_sku_slug(url):
    m = re.search(r"/(?:product|services)/([^/?#]+)", url)
    return m.group(1) if m else None


def get_page_path(locale, slug):
    return os.path.join(os.getcwd(), "src", "app", locale, "services", slug, "page.tsx")


def generate_seo_patch(page_path, keywords):
    if not os.path.exists(page_path): return None
    with open(page_path, "r", encoding="utf-8", newline="\\n") as f:
        content = f.read()
    old_hash = hashlib.md5(content.encode("utf-8")).hexdigest()
    changes = []
    core_kw = keywords[0]
    m = re.search(r"<h1[^>]*>(.*?)</h1>", content, re.DOTALL)
    if m and core_kw not in m.group(1):
        content = re.sub(r"<h1[^>]*>.*?</h1>", f"<h1>{core_kw} | ZPrintPro</h1>", content, flags=re.DOTALL)
        changes.append("H1")
    m2 = re.search(r'meta\\s*{\\s*description:\\s*"([^"]*)"', content)
    if m2 and core_kw not in m2.group(1):
        new_desc = f'meta {{\\n    description: "{core_kw}\\uff0c\u4e13\u4e1a\u5370\u5237\u670d\u52a1\uff0c\u5feb\u901f\u4ea4\u4ed8\uff0c\u54c1\u8d28\u4fdd\u8bc1"'
        content = re.sub(r'meta\\s*{\\s*description:\\s*"([^"]*)"', new_desc, content)
        changes.append("Meta Description")
    pat = re.compile(r"<Script[^>]*type=\"application/ld\\+json\"[^>]*>(.*?)</Script>", re.DOTALL)
    if pat.search(content):
        content = pat.sub(r'<script type="application/ld+json" dangerouslySetInnerHTML={{__html: \\1}}></script>', content)
        changes.append("Script fix")
        content = re.sub(r"import Script from [\'\"]next/script[\'\"];?\\s*\\n?", "", content)
    content = re.sub(r"\\bkey=(\\d+)", r"key={\\1}", content)
    new_hash = hashlib.md5(content.encode("utf-8")).hexdigest()
    if old_hash == new_hash: return None
    return {"path": page_path, "content": content, "keywords": keywords, "changes": changes}


def process_gsc_data():
    delete_root_app_directory()
    rows = load_gsc_data()
    page_keywords = {}
    for row in rows:
        slug = extract_sku_slug(row["page"])
        if not slug: continue
        if slug not in page_keywords: page_keywords[slug] = []
        if len(page_keywords[slug]) < 5:
            page_keywords[slug].append(row["query"])
    print(f"  Identified {len(page_keywords)} services from GSC data")
    patches = []
    LOCALES = ["zh-hk", "en", "ja"]
    for slug, keywords in page_keywords.items():
        for loc in LOCALES:
            pp = get_page_path(loc, slug)
            p = generate_seo_patch(pp, keywords[:5])
            if p:
                patches.append(p)
                print(f"  Patch: {loc}/{slug} ({', '.join(p['changes'])})")
    print(f"\\n  Total: {len(patches)} patches for {len(page_keywords)} services")
    if patches:
        with open("gsc_patches.json", "w", encoding="utf-8") as f:
            json.dump(patches, f, ensure_ascii=False, indent=2)
        print(f"  Saved to gsc_patches.json")
    delete_root_app_directory()
    return patches


if __name__ == "__main__":
    process_gsc_data()