# -*- coding: utf-8 -*-
"""Scan all TS/TSX files for duplicate keys in ANY Record<string, ...> = { ... } block (incl nested)."""
import os
import re
import sys

BASE = r"F:\zprintpro-nextjs\src"
errs = 0
files_scanned = 0

def find_records(text, depth=0):
    """Find all Record<string, X> = { ... } blocks and return list of (start, body)."""
    results = []
    pattern = re.compile(r'Record<string,\s*[^>]+>\s*=\s*\{')
    for m in pattern.finditer(text):
        # Find matching closing brace
        i = m.end()
        depth_local = 1
        start = m.end()
        while i < len(text) and depth_local > 0:
            c = text[i]
            if c == '{':
                depth_local += 1
            elif c == '}':
                depth_local -= 1
            i += 1
        if depth_local == 0:
            body = text[start:i-1]
            results.append((m.start(), body))
    return results

for root, _, fnames in os.walk(BASE):
    for f in fnames:
        if not f.endswith(('.ts', '.tsx')):
            continue
        fp = os.path.join(root, f)
        files_scanned += 1
        with open(fp, 'r', encoding='utf-8') as fh:
            txt = fh.read()
        records = find_records(txt)
        for rec_start, body in records:
            keys = re.findall(r"'([\w-]+)'\s*:\s*['\"\[{]", body)
            seen = set()
            dups = []
            for k in keys:
                if k in seen:
                    dups.append(k)
                else:
                    seen.add(k)
            if dups:
                errs += 1
                rel = fp.replace(BASE + os.sep, '')
                # Find line number of record start
                line_no = txt[:rec_start].count('\n') + 1
                print(f"DUPS in {rel} line {line_no}: {dups}")

print(f"\nScanned {files_scanned} files, {errs} files with duplicate keys in any Record block.")
