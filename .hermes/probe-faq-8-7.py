# -*- coding: utf-8 -*-
"""Check how FAQPage schema is generated in page.tsx (H3 Q/A format compatibility)."""
import re

with open('src/app/[locale]/blog/[slug]/page.tsx', 'r', encoding='utf-8') as f:
    page = f.read()

# Find FAQ extraction logic
for kw in ['generateFaqJsonLd', 'FAQ', 'faq']:
    idx = page.find(kw)
    if idx > 0:
        print(f"=== first '{kw}' at {idx} ===")
        print(page[max(0,idx-400):idx+600])
        print("---")
        break
