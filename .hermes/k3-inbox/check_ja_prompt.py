#!/usr/bin/env python3
"""Check JA prompt for English/Chinese mix."""
import re
with open(r'F:\zprintpro-nextjs\seedream\v24-prompts-ja.txt', 'r', encoding='utf-8') as f:
    text = f.read()
blocks = re.split(r'(?=^### SKU-\d+\s*\|)', text, flags=re.MULTILINE)
for b in blocks:
    if 'PKG-014' in b[:60]:
        m = re.search(r'\[HERO\][^\n]*\n(.+?)(?=^\[|^---|\Z)', b, re.MULTILINE | re.DOTALL)
        if m:
            body = m.group(1).strip()
            # Find English words (Latin chars)
            en_words = re.findall(r'[A-Za-z][A-Za-z\s,]+', body)
            print(f'PKG-014 JA HERO prompt: {len(body)} chars')
            print(f'English words found: {len(en_words)}')
            for w in en_words[:20]:
                w = w.strip()
                if len(w) > 2:
                    print(f'  - {w[:60]}')
        break
