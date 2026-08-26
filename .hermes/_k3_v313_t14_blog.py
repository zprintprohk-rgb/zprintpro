#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""K3 v3.13 T14 #2: en calendar-printing-guide blog 尺寸段重写 + 2027 时效"""
import json
from pathlib import Path

BLOG = Path(r"F:\zprintpro-nextjs\src\data\blog-data\en.json")
d = json.load(BLOG.open(encoding="utf-8"))
p = d["calendar-printing-guide"]
print("title:", p.get("title", "")[:80])
print("content_len:", len(p.get("content", "")))
