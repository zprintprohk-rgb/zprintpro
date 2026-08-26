#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Verify poster-size-guide content: FAQ count, internal links, no forbidden terms."""
import json, re

for locale in ['zh-hk', 'en', 'ja']:
    with open(f'src/data/blog-data/{locale}.json', encoding='utf-8') as f:
        data = json.load(f)
    entry = data['poster-size-guide']
    content = entry['content']
    faqs = content.count('<strong>Q:')
    links = re.findall(r'href="([^"]+)"', content)
    img = content.count('<img')
    forbidden = [t for t in ['智印印港', '智印港'] if locale in ['en', 'ja'] and t in content]
    # check internal links against known routes
    print(f'--- {locale} ---')
    print(f'FAQ count: {faqs}')
    print(f'<img> count: {img}')
    print(f'internal links ({len(links)}):')
    for l in links:
        print(f'  {l}')
    if forbidden:
        print(f'FORBIDDEN brand term in {locale}: {forbidden}')
    # zh-hk brand check
    if locale == 'zh-hk':
        print(f'zh-hk brand 智印港 count: {content.count("智印港")}')
