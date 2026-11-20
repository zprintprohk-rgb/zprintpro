# -*- coding: utf-8 -*-
"""Dual-method inventory: for each category Record in category-seo-content.ts,
which locale keys exist (quoted 'zh-hk': / unquoted en: ja: forms)? §0.23.2 double-method."""
import io, re

p = r"F:\zprintpro-nextjs\src\data\category-seo-content.ts"
s = io.open(p, encoding="utf-8", newline="").read()

# find all top-level Record entries:  name: {  ...  },  via brace matching
entries = []
for m in re.finditer(r"^  ([A-Za-z0-9_-]+): \{", s, re.M):
    start = m.start()
    j = s.find("{", m.start())
    d = 0; k = j; end = None
    while k < len(s):
        if s[k] == "{": d += 1
        elif s[k] == "}":
            d -= 1
            if d == 0: end = k; break
        k += 1
    if end: entries.append((m.group(1), s[start:end]))

out = io.open(r"F:\zprintpro-nextjs\.hermes\_locale_matrix.txt", "w", encoding="utf-8", newline="")
out.write("total Records: %d\n" % len(entries))
out.write("%-18s %-8s %-6s %-6s  %s\n" % ("Record", "chars", "zh", "en", "ja"))
for name, span in entries:
    zh = len(re.findall(r"(?:'zh-hk'|\"zh-hk\")\s*:", span))
    en = len(re.findall(r"(?:'en'|\"en\"|\ben)\s*:\s*\{", span))
    ja = len(re.findall(r"(?:'ja'|\"ja\"|\bja)\s*:\s*\{", span))
    out.write("%-18s %-8d %-6d %-6d  %d\n" % (name, len(span), zh, en, ja))
out.close()
print("done -> .hermes/_locale_matrix.txt")
