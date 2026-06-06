import os, shutil, re, json, hashlib


def delete_root_app_directory():
    """delete root app/ to prevent Next.js 404"""
    root_app_dir = os.path.join(os.getcwd(), "app")
    if os.path.exists(root_app_dir):
        print(f"  [auto-defense] DANGEROUS root app/ detected - would cause 404")
        print(f"  [auto-defense] Force deleting: {root_app_dir}")
        shutil.rmtree(root_app_dir, ignore_errors=True)
        print(f"  [auto-defense] Deleted root app/ - dual-directory conflict resolved")


def get_file_hash(file_path):
    with open(file_path, "rb") as f:
        return hashlib.md5(f.read()).hexdigest()


def fix_script_tags(content):
    """Fix Script tags to use script+dangerouslySetInnerHTML"""
    import re
    pat = re.compile(r"<Script[^>]*type=\"application/ld\\+json\"[^>]*>(.*?)</Script>", re.DOTALL)
    if pat.search(content):
        content = pat.sub(r'<script type="application/ld+json" dangerouslySetInnerHTML={{__html: \\1}}></script>', content)
    content = re.sub(r"import Script from [\'\"]next/script[\'\"];?\\s*\\n?", "", content)
    return content


def enhance_page_content(page_path, keywords):
    if not os.path.exists(page_path):
        return None
    with open(page_path, "r", encoding="utf-8", newline="\\n") as f:
        content = f.read()
    old_hash = get_file_hash(page_path)
    changes = []
    core_keyword = keywords[0] if keywords else ""
    if core_keyword:
        m = re.search(r"<h1[^>]*>(.*?)</h1>", content, re.DOTALL)
        if m:
            content = content.replace(m.group(0), f"<h1>{core_keyword} | ZPrintPro</h1>", 1)
            changes.append("H1")
        m2 = re.search(r'meta\\s*{\\s*description:\\s*"([^"]*)"', content)
        if m2:
            old = m2.group(0)
            new_val = f'meta {{\\n    description: "{core_keyword}\\uff0c\u4e13\u4e1a\u5370\u5237\u670d\u52a1\uff0c\u5feb\u901f\u4ea4\u4ed8\uff0c\u54c1\u8d28\u4fdd\u8bc1"'
            content = content.replace(old, new_val, 1)
            changes.append("Meta Description")
    if "<Script" in content:
        content = fix_script_tags(content)
        changes.append("Script fix")
    content = re.sub(r"\\bkey=(\\d+)", r"key={\\1}", content)
    new_hash = hashlib.md5(content.encode("utf-8")).hexdigest()
    if old_hash == new_hash:
        return None
    return {"path": page_path, "content": content, "keywords": keywords, "changes": changes}


def main():
    delete_root_app_directory()
    PROJECT_ROOT = os.getcwd()
    LOCALES = ["zh-hk", "en", "ja"]
    all_pages = []
    for locale in LOCALES:
        d = os.path.join(PROJECT_ROOT, "src", "app", locale, "services")
        if os.path.exists(d):
            for slug in os.listdir(d):
                p = os.path.join(d, slug, "page.tsx")
                if os.path.exists(p):
                    all_pages.append({"locale": locale, "slug": slug, "path": p})
    if not all_pages:
        print("  No service pages found")
        return
    print(f"  Found {len(all_pages)} service pages")
    kw_map = {}
    gp = os.path.join(PROJECT_ROOT, "gsc_patches.json")
    if os.path.exists(gp):
        with open(gp, "r", encoding="utf-8") as f:
            patches = json.load(f)
        for p in patches:
            kw_map[os.path.basename(os.path.dirname(p.get("path", "")))] = p.get("keywords", [])
    enhanced = []
    for page in all_pages:
        slug = page["slug"]
        keywords = kw_map.get(slug, [slug.replace("-", " ")])
        result = enhance_page_content(page["path"], keywords)
        if result:
            enhanced.append(result)
            print(f"  {page['locale']}/{slug}: {', '.join(result['changes'])}")
    if enhanced:
        for item in enhanced:
            with open(item["path"], "w", encoding="utf-8", newline="\\n") as f:
                f.write(item["content"])
        print(f"\\n  Enhancement done, {len(enhanced)} files updated")
    else:
        print("\\n  No changes needed")
    delete_root_app_directory()


if __name__ == "__main__":
    main()