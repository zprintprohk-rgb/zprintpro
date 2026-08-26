"""Read v8 blog content sample"""
import json

with open(r'F:\zprintpro-nextjs\src\data\blog-data\zh-hk.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Read a v8 K3 blog fully
k = 'sports-merchandise-gift-box-printing-guide'
v = data[k]
print(f'== {k} ==')
print(f'Title: {v.get("title")}')
print(f'Description: {v.get("description")}')
print(f'Date: {v.get("date")}')
print(f'Category: {v.get("category")}')
content = v.get('content', '')
print(f'Content length: {len(content)}')
# Strip HTML to count zh chars
import re
plain = re.sub(r'<[^>]+>', '', content)
plain = re.sub(r'\s+', ' ', plain).strip()
print(f'Plain text length: {len(plain)}')
# Count H2, H3, FAQ
h2_count = len(re.findall(r'<h2[ >]', content))
h3_count = len(re.findall(r'<h3[ >]', content))
faq_count = len(re.findall(r'<strong>Q:', content))
schema_count = len(re.findall(r'FAQPage|Article|BreadcrumbList|HowTo', content))
print(f'H2: {h2_count}, H3: {h3_count}, FAQ: {faq_count}, Schema: {schema_count}')
# Find image tags
img_count = len(re.findall(r'<img[ >]', content))
print(f'IMG tags: {img_count}')
# Count internal links
internal_links = re.findall(r'href="(/[^"]*)"', content)
unique_links = set(internal_links)
print(f'Internal links: {len(internal_links)} total, {len(unique_links)} unique')
print(f'Links: {sorted(unique_links)[:10]}')
# Last 200 chars
print(f'\n=== Content (last 800 chars) ===')
print(content[-800:])
print(f'\n=== Content (first 800 chars) ===')
print(content[:800])
