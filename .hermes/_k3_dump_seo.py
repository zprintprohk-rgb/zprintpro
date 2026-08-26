#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import re
with open('src/lib/seo.ts', 'r', encoding='utf-8') as f:
    content = f.read()
for slug in ['menus', 'calendars', 'flyers']:
    pattern = "'" + slug + "': {"
    idx = content.find(pattern)
    if idx > 0:
        # Find matching close - simple parse
        depth = 0
        end = idx
        for i in range(idx, min(idx + 3000, len(content))):
            c = content[i]
            if c == '{':
                depth += 1
            elif c == '}':
                depth -= 1
                if depth == 0:
                    end = i + 1
                    break
        print('=== ' + slug + ' (chars ' + str(idx) + '-' + str(end) + ') ===')
        print(content[idx:end])
        print()
