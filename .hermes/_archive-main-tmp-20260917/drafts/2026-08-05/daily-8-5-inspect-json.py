#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Inspect blog-data JSON structure."""
import json

with open('src/data/blog-data/zh-hk.json', encoding='utf-8') as f:
    d = json.load(f)

print('top-level type:', type(d))
if isinstance(d, dict):
    print('num keys:', len(d))
    keys = list(d.keys())
    print('first 5 keys:', keys[:5])
    print('last 5 keys:', keys[-5:])
    cal = d.get('calendar-printing-guide')
    print()
    print('calendar-printing-guide type:', type(cal))
    if isinstance(cal, dict):
        print('entry keys:', list(cal.keys()))
        content = cal.get('content', '')
        print('content len:', len(content))
        print('content head:', content[:500])
    # check whether structure is {slug: {content: ...}} or {locale: {slug: ...}}
    first_key = keys[0]
    print()
    print('sample first key:', first_key, '->', type(d[first_key]))
    if isinstance(d[first_key], dict):
        print('sample entry keys:', list(d[first_key].keys())[:10])
