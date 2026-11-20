# -*- coding: utf-8 -*-
"""Find category slugs in products.ts (the categories array, not products)."""
import re

with open(r"F:\zprintpro-nextjs\src\data\products.ts", 'r', encoding='utf-8') as f:
    content = f.read()

# Categories: { slug: 'xxx', name: 'yyy', nameEn: ..., nameJa: ... } 都在同一行
pattern = re.compile(r"^\s*\{\s*slug:\s*['\"]([^'\"]+)['\"],\s*name:", re.MULTILINE)
slugs = []
for m in pattern.finditer(content):
    slugs.append(m.group(1))

# Unique
unique = sorted(set(slugs))
print(f"Category slugs found: {len(unique)}")
for s in unique:
    print(f"  - {s}")

# Also check if there are 14 categories hardcoded somewhere
print(f"\nLooking for 'business-cards' / 'greeting-cards' / 'wedding-invitations' / 'place-cards' in products.ts...")
for cat in ['business-cards', 'greeting-cards', 'wedding-invitations', 'place-cards']:
    matches = re.findall(rf"slug:\s*['\"]({re.escape(cat)})['\"]", content)
    print(f"  {cat}: {len(matches)} occurrences")
