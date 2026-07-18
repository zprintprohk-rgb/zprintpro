#!/usr/bin/env python3
"""Add Q-017, Q-018, Q-019 blog entries to all blog data files cleanly."""

import json, os, re, sys

BASE = r"F:\zprintpro-nextjs"

def read_json(rel_path):
    with open(os.path.join(BASE, rel_path), "r", encoding="utf-8") as f:
        return json.load(f)

def write_json(rel_path, data):
    with open(os.path.join(BASE, rel_path), "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write("\n")

# Change stdout to UTF-8
sys.stdout.reconfigure(encoding="utf-8")

# -- 1. Load source content ---------------------------------------------------
q017 = read_json(r".hermes\q017-content.json")
q018 = read_json(r".hermes\q018-content.json")
q019 = read_json(r".hermes\q019-content.json")

# -- 2. Add to blog-data JSONs -----------------------------------------------
for locale in ["zh-hk", "en", "ja"]:
    data = read_json(f"src/data/blog-data/{locale}.json")
    for src in [q017, q018, q019]:
        for slug, content in src.items():
            data[slug] = content[locale]
    write_json(f"src/data/blog-data/{locale}.json", data)
    print(f"[OK] {locale}.json - added Q-017/018/019, total {len(data)} entries")

# -- 3. Build blog-posts.ts entries -----------------------------------------
def make_ts_entry(slug, source, locale_data):
    zh = locale_data["zh-hk"]
    en  = locale_data["en"]
    ja  = locale_data["ja"]
    title_zh = zh.get("title", "").replace('"', '\\"')
    title_en = en.get("title", "").replace('"', '\\"')
    title_ja = ja.get("title", "").replace('"', '\\"')
    date_str = zh.get("date", "2026-07-15")

    excerpt_zh = zh.get("excerpt", zh.get("content", "")[:200].replace("<", "").replace(">", "").replace('"', '\\"'))
    excerpt_en = en.get("excerpt", en.get("content", "")[:200].replace("<", "").replace(">", "").replace('"', '\\"'))
    excerpt_ja = ja.get("excerpt", ja.get("content", "")[:200].replace("<", "").replace(">", "").replace('"', '\\"'))

    name = "".join(w.title() for w in slug.split("-")).replace(" ", "") + "Blog"

    return f"""const {name}: BlogPostMeta = {{
  slug: '{slug}',
  categoryKey: 'flyers',
  source: '{source}',
  date: '{date_str}',
  title: {{
    'zh-hk': "{title_zh}",
    en: "{title_en}",
    ja: "{title_ja}",
  }},
  excerpt: {{
    'zh-hk': "{excerpt_zh}",
    en: "{excerpt_en}",
    ja: "{excerpt_ja}",
  }},
}};"""

q017_entry = make_ts_entry(
    "thick-paper-flyer-printing-restaurant-takeout-guide", "daily",
    q017["thick-paper-flyer-printing-restaurant-takeout-guide"])
q018_entry = make_ts_entry(
    "magnetic-closure-gift-box-ecommerce-brand-guide", "daily",
    q018["magnetic-closure-gift-box-ecommerce-brand-guide"])
q019_entry = make_ts_entry(
    "folding-box-cosmetics-brand-eco-friendly-guide", "daily",
    q019["folding-box-cosmetics-brand-eco-friendly-guide"])

# -- 4. Append to blog-posts.ts --------------------------------------------
bp_path = os.path.join(BASE, r"src\data\blog-posts.ts")
with open(bp_path, "r", encoding="utf-8") as f:
    content = f.read()

insert_marker = "export function getBlogPostMetaBySlug"
if insert_marker not in content:
    print("ERROR: could not find insert marker in blog-posts.ts!")
    exit(1)

pos = content.index(insert_marker)
new_entries = "\n\n" + "\n\n".join([q017_entry, q018_entry, q019_entry]) + "\n"
new_content = content[:pos].rstrip() + new_entries + "\n" + content[pos:]

with open(bp_path, "w", encoding="utf-8") as f:
    f.write(new_content)
print("[OK] blog-posts.ts - appended Q-017/018/019 entries")

# -- 5. Add to page.tsx slug list -------------------------------------------
page_path = os.path.join(BASE, r"src\app\[locale]\blog\[slug]\page.tsx")
with open(page_path, "r", encoding="utf-8") as f:
    page_content = f.read()

new_slugs = [
    "thick-paper-flyer-printing-restaurant-takeout-guide",
    "magnetic-closure-gift-box-ecommerce-brand-guide",
    "folding-box-cosmetics-brand-eco-friendly-guide",
]
existing = [s for s in new_slugs if s in page_content]
if len(existing) == 3:
    print(f"[OK] page.tsx - all 3 slugs already present")
elif len(existing) == 0:
    # Add after media-merchandise-box-printing-guide
    pattern = r"(\s*)'media-merchandise-box-printing-guide',(\n\s*\]\);)"
    m = re.search(pattern, page_content)
    if m:
        indent = m.group(1)
        insert_lines = "\n".join(f"{indent}'{s}'," for s in new_slugs) + "\n"
        new_page = page_content.replace(
            m.group(1) + "'media-merchandise-box-printing-guide'," + m.group(2),
            insert_lines + m.group(1) + "'media-merchandise-box-printing-guide'," + m.group(2)
        )
        with open(page_path, "w", encoding="utf-8") as f:
            f.write(new_page)
        print("[OK] page.tsx - added 3 slugs")
    else:
        print("WARNING: could not find media-merchandise pattern in page.tsx")
else:
    print(f"[OK] page.tsx - {len(existing)}/3 slugs already present")

print("\nDone! All 3 blogs re-applied cleanly.")
