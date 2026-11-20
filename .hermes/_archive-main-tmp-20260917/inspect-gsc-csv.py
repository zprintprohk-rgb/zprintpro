#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Inspect GSC query CSV columns."""
import csv, os

os.chdir(r"F:\zprintpro-nextjs")
path = r"GSC数据\zprintpro.com-Performance-on-Search-2026-08-08\查询数.csv"
with open(path, "r", encoding="utf-8-sig", errors="replace") as f:
    reader = csv.reader(f)
    rows = list(reader)
print("nrows:", len(rows))
print("header:", rows[0])
for r in rows[1:6]:
    print(r)
