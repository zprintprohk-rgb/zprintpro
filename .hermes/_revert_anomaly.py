# -*- coding: utf-8 -*-
"""回退 kraft-paper-packaging-box 的异常区间插入, 并记录 docket"""
import io, os, re, shutil

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(REPO, "src", "data", "sku-seo-data.ts")
t = io.open(P, encoding="utf-8", newline="").read()
old = "300 個起印（HK$1.5-1000/個）"
n = t.count(old)
if n:
    t = t.replace(old, "300 個起印")
    io.open(P, "w", encoding="utf-8", newline="").write(t)
print("reverted", n)
