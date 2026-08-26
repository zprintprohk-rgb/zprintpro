#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Check next.config.js typescript settings + JSON line endings."""
import subprocess

# check next.config
with open('next.config.js', encoding='utf-8') as f:
    cfg = f.read()
print('--- next.config.js relevant ---')
for line in cfg.splitlines():
    if 'typescript' in line or 'ignoreBuildErrors' in line:
        print(line.strip())

# check JSON line endings
for p in ['src/data/blog-data/zh-hk.json', 'src/data/blog-data/en.json', 'src/data/blog-data/ja.json']:
    with open(p, 'rb') as f:
        b = f.read()
    print(f'--- {p} ---')
    print('CRLF:', b.count(b'\r\n'), '| bare LF:', b.count(b'\n') - b.count(b'\r\n'), '| BOM:', b[:3] == b'\xef\xbb\xbf')
