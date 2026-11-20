# -*- coding: utf-8 -*-
"""Scan all TS/TSX files for duplicate keys in Record<string, string> = { ... } blocks."""
import os
import re
import sys

BASE = r"F:\zprintpro-nextjs\src"
errs = 0
files_scanned = 0
for root, _, fnames in os.walk(BASE):
    for f in fnames:
        if not f.endswith(('.ts', '.tsx')):
            continue
        fp = os.path.join(root, f)
        files_scanned += 1
        with open(fp, 'r', encoding='utf-8') as fh:
            txt = fh.read()
        # 找 Record<string, string> = { ... } 块
        for m in re.finditer(r'Record<string,\s*string>\s*=\s*\{([^}]*)\}', txt, re.DOTALL):
            body = m.group(1)
            keys = re.findall(r"'([\w-]+)'\s*:\s*'", body)
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
                print(f"DUPS in {rel}: {dups}")

print(f"\nScanned {files_scanned} files, {errs} files with duplicate keys in Record<string,string> blocks.")
