#!/usr/bin/env python3
"""Read V23.5.1 prompt and show full HERO body."""
import re

# Regenerate to get fresh content
import subprocess
subprocess.run(['python', r'F:\zprintpro-nextjs\.hermes\k3-inbox\gen_v23_5.py',
                '--skus', 'PKG-014', '--locale', 'zh-hk',
                '--out', r'F:\zprintpro-nextjs\seedream\v23.5.1-test.txt'],
               capture_output=True)

with open(r'F:\zprintpro-nextjs\seedream\v23.5.1-test.txt', 'r', encoding='utf-8') as f:
    text = f.read()
blocks = re.split(r'(?=^### SKU-\d+\s*\|)', text, flags=re.MULTILINE)
for b in blocks:
    if 'PKG-014' in b[:50]:
        m = re.search(r'\[HERO\][^\n]*\n(.+?)(?=^\[|^---|\Z)', b, re.MULTILINE | re.DOTALL)
        if m:
            print(m.group(1))
        break
import os
os.remove(r'F:\zprintpro-nextjs\seedream\v23.5.1-test.txt')
