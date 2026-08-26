#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Inspect second GSC export dir + en/ja zips."""
import csv, os, glob

os.chdir(r"F:\zprintpro-nextjs")
base2 = r"GSC数据\zprintpro.com-Performance-on-Search-2026-08-08 (1)"
for f in glob.glob(os.path.join(base2, "*.csv")):
    print("FILE:", os.path.basename(f))
    with open(f, "r", encoding="utf-8-sig", errors="replace") as fh:
        rows = list(csv.reader(fh))
    print("  rows:", len(rows), "header:", rows[0][:6] if rows else "EMPTY")
    for r in rows[1:8]:
        print("  ", r[:6])
    print()
