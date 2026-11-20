#!/usr/bin/env python3
"""Find 3 SKU real fields with balance tracking"""
import re
p = r'F:\zprintpro-nextjs\src\data\products.ts'
with open(p, 'r', encoding='utf-8') as f:
    text = f.read()

# Find all slug positions
for slug in ['a4-flyers', 'gift-boxes', 'waterproof-stickers']:
    print(f'\n=== {slug} ===')
    m = re.search(rf"slug:\s*'{slug}'", text)
    if not m:
        print(f'  NOT FOUND')
        continue
    slug_pos = m.start()
    # Balance-track to find the matching '},' for this object
    # Start from the '{' before slug_pos and count braces
    # Find the opening '{' for this object
    # A SKU object usually has pattern: { slug: 'xxx', name: '...', ...
    # We want to find the matching '},' of this object's opening
    # Strategy: find the { before slug_pos (the object start)
    # Then count braces forward
    pos = slug_pos
    depth = 0
    found_open = False
    while pos < len(text):
        c = text[pos]
        if c == '{':
            depth += 1
            found_open = True
        elif c == '}':
            depth -= 1
            if found_open and depth == 0:
                # Found matching close
                # Check next char is ','
                end_pos = pos + 1
                if end_pos < len(text) and text[end_pos] == ',':
                    end_pos += 1
                # Now show the object content
                obj = text[slug_pos:end_pos]
                # Find minQuantity, optimizedAt, optimizationRound in this obj
                for field in ['minQuantity', 'optimizedAt', 'optimizationRound', 'name:', 'description:', 'title_zh:']:
                    for fm in re.finditer(rf'\b{re.escape(field)}', obj):
                        # Get line context
                        ctx = obj[max(0, fm.start()-30):fm.end()+100]
                        ctx_oneline = ' '.join(ctx.split())
                        print(f'  {field}: {ctx_oneline[:120]}')
                break
        pos += 1
