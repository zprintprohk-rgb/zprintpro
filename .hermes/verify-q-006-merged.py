import json

for locale in ['zh-hk', 'en', 'ja']:
    with open(f'src/data/blog-data/{locale}.json', 'r', encoding='utf-8') as f:
        d = json.load(f)
    e = d['tea-beverage-gift-box-printing-guide']
    print(f'=== {locale} Q-006 ===')
    print(f'  title: {e["title"][:70]}')
    print(f'  description chars: {len(e["description"])}')
    print(f'  content chars: {len(e["content"])}')
    print(f'  date: {e["date"]}')
    print(f'  category: {e["category"]}')
    # 4 FAQ verify
    import re
    faqs = re.findall(r'<h3>Q\d+', e['content'])
    print(f'  FAQ count: {len(faqs)}')
    # 7 internal links verify
    links = re.findall(r'href="/[^"]+', e['content'])
    print(f'  internal links: {len(links)} (unique: {len(set(links))})')
    # v8 token verify
    print(f'  重點摘要/TL;DR/要約: {"YES" if any(k in e["content"] for k in ["重點摘要", "Key Takeaways", "要約"]) else "NO"}')
    print(f'  黄 callout: {"YES" if "bg-amber-50" in e["content"] else "NO"}')
    print(f'  蓝 CTA: {"YES" if "bg-blue-50" in e["content"] else "NO"}')
    print(f'  Author: {"YES" if "ZprintPro Engineering Team" in e["content"] else "NO"}')
    print(f'  Sources: {"YES" if "資料來源" in e["content"] or "Data Sources" in e["content"] or "データソース" in e["content"] else "NO"}')
    print(f'  Disclaimer: {"YES" if "免責" in e["content"] or "Disclaimer" in e["content"] else "NO"}')
    print()

# blog-posts.ts verify
with open('src/data/blog-posts.ts', 'r', encoding='utf-8') as f:
    bp = f.read()
import re
slugs = re.findall(r"articleSlugs\s*=\s*\[([\s\S]*?)\];", bp)
if slugs:
    slugs_list = re.findall(r"'([^']+)'", slugs[0])
    has_q006 = 'tea-beverage-gift-box-printing-guide' in slugs_list
    print(f'blog-posts.ts articleSlugs total: {len(slugs_list)}, has Q-006: {has_q006}')

# blogPosts verify
blogposts_match = re.search(r"const blogPosts: BlogPost\[\]\s*=\s*\[([\s\S]*?)\n\];", bp)
if blogposts_match:
    blogposts_text = blogposts_match.group(1)
    has_q006_entry = "slug: 'tea-beverage-gift-box-printing-guide'" in blogposts_text
    print(f'blog-posts.ts blogPosts has Q-006 entry: {has_q006_entry}')
    # Find line number of Q-006
    for m in re.finditer(r"slug: '([^']+)'", blogposts_text):
        if m.group(1) == 'tea-beverage-gift-box-printing-guide':
            print(f'  Q-006 blogPost entry found')
            break
