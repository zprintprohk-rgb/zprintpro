#!/usr/bin/env python3
"""Inspect page.tsx structure - detailed"""
import re
p = r'F:\zprintpro-nextjs\src\app\[locale]\blog\[slug]\page.tsx'
with open(p, 'r', encoding='utf-8') as f:
    text = f.read()
print('TOTAL_SIZE=', len(text))

# Show line numbers around key patterns
def show_lines_around(text, pattern, label, before=5, after=10):
    idx = text.find(pattern)
    if idx < 0:
        print(f'NOT FOUND: {label} = {pattern!r}')
        return
    pos = 0
    line = 1
    line_starts = [0]
    for ch in text:
        if ch == '\n':
            line_starts.append(pos + 1)
        pos += 1
    target_line = None
    for i, ls in enumerate(line_starts):
        if ls > idx:
            target_line = i
            break
    print(f'=== {label} found at idx={idx}, line={target_line} ===')
    start_line = max(1, target_line - before)
    end_line = min(len(line_starts), target_line + after)
    for ln in range(start_line, end_line):
        if ln < len(line_starts):
            line_text = text[line_starts[ln]:line_starts[ln+1] if ln+1 < len(line_starts) else len(text)]
            marker = ' <<' if ln == target_line else '   '
            print(f'  L{ln}{marker} {line_text[:200]}')

# zh-hk block end -> find "},\n\n  },\n  ja: {"  (with extra blank line)
# Search for various patterns
for pat in ['},\n\n  },\n  ja: {', '},\n  },\n  ja: {', '},\n\n  },\n\n  ja: {']:
    show_lines_around(text, pat, f'zh-hk close candidate: {pat!r}', before=3, after=3)

# ja block end
for pat in ['},\n  }\n};\n', '},\n  },\n};\n', '},\n\n  }\n};\n']:
    show_lines_around(text, pat, f'ja/array close candidate: {pat!r}', before=3, after=3)

# Find posts object close - look for end of export const
print('\n=== Last 500 chars of file ===')
print(repr(text[-500:]))
