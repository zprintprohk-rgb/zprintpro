#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Read GSC 7d CSV and print top queries by impressions."""
import csv

with open('.hermes/gsc-7d-2026-08-05-utf8.csv', encoding='utf-8-sig') as f:
    rows = list(csv.reader(f))

rows = rows[1:]
rows.sort(key=lambda r: -(int(r[2]) if r[2].strip().isdigit() else 0))
print(f'Total queries: {len(rows)}')
print('--- Top by impressions ---')
for r in rows[:30]:
    print(f'pos {r[4]:>6} | {r[2]:>4} imp | {r[3]:>5}% | {r[0]}')
print('--- All queries (for review) ---')
for r in rows:
    print(f'{r[4]:>6} | {r[2]:>4} imp | {r[3]:>5}% | {r[0]}')
