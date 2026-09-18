#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Find JSON parse error in zh-hk.json at line 552 col 308."""
import json
from pathlib import Path

text = Path("F:/zprintpro-nextjs/src/data/blog-data/zh-hk.json").read_text(encoding="utf-8")
# 找 line 552, col 308
lines = text.split("\n")
print(f"total lines: {len(lines)}")
if len(lines) >= 552:
    line552 = lines[551]
    print(f"line 552 length: {len(line552)}")
    print(f"line 552 col 290-330:")
    for i in range(max(0, 290), min(len(line552), 330)):
        ch = line552[i]
        print(f"  c{i}: {ch!r}  U+{ord(ch):04X}")
    print(f"line 552 col 300-320: {line552[300:320]!r}")
