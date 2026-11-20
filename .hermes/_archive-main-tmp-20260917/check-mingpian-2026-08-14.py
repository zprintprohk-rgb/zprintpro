#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""8/14 batch 2 名片清扫 — 先扫描 products.ts 实际残留"""
import sys

PATH = r"F:\zprintpro-nextjs\src\data\products.ts"
OUT = r"F:\zprintpro-nextjs\.hermes\check-mingpian-2026-08-14-out.txt"

with open(PATH, "r", encoding="utf-8") as f:
    content = f.read()

lines = content.split("\n")
hits_mp = []
hits_ms = []
hits_jp = []
hits_mp_envelope = []
hits_mp_poster = []
hits_std_mp = []
for i, line in enumerate(lines, 1):
    if "名片" in line:
        hits_mp.append((i, line))
    if "名刺" in line:
        hits_ms.append((i, line))
    if "咭片" in line:
        hits_jp.append((i, line))
    if "名片/信封" in line:
        hits_mp_envelope.append((i, line))
    if "名片/海報" in line:
        hits_mp_poster.append((i, line))
    if "標準名片" in line:
        hits_std_mp.append((i, line))

# Write to file with utf-8 (bypass GBK)
with open(OUT, "w", encoding="utf-8") as out:
    out.write(f"File size: {len(content)} chars, {len(lines)} lines\n")
    out.write(f"名片: {len(hits_mp)} hits\n")
    out.write(f"名刺: {len(hits_ms)} hits\n")
    out.write(f"咭片: {len(hits_jp)} hits\n")
    out.write(f"名片/信封: {len(hits_mp_envelope)} hits\n")
    out.write(f"名片/海報: {len(hits_mp_poster)} hits\n")
    out.write(f"標準名片: {len(hits_std_mp)} hits\n")
    out.write("=" * 80 + "\n")
    out.write("Hits (first 30):\n")
    for i, line in hits_mp[:30]:
        out.write(f"L{i}: {line[:300]}\n")
    out.write("=" * 80 + "\n")
    out.write("Hits 名刺 (first 30):\n")
    for i, line in hits_ms[:30]:
        out.write(f"L{i}: {line[:300]}\n")
    out.write("=" * 80 + "\n")
    out.write("Hits 咭片 (all):\n")
    for i, line in hits_jp:
        out.write(f"L{i}: {line[:300]}\n")
    out.write("=" * 80 + "\n")
    out.write("Hits 名片/信封 (first 30):\n")
    for i, line in hits_mp_envelope[:30]:
        out.write(f"L{i}: {line[:300]}\n")
    out.write("=" * 80 + "\n")
    out.write("Hits 名片/海報 (first 30):\n")
    for i, line in hits_mp_poster[:30]:
        out.write(f"L{i}: {line[:300]}\n")
    out.write("=" * 80 + "\n")
    out.write("Hits 標準名片 (first 30):\n")
    for i, line in hits_std_mp[:30]:
        out.write(f"L{i}: {line[:300]}\n")
    out.write("DONE\n")
print(f"DONE - {OUT}")
print(f"counts: 名片={len(hits_mp)}, 名刺={len(hits_ms)}, 咭片={len(hits_jp)}, 名片/信封={len(hits_mp_envelope)}, 名片/海報={len(hits_mp_poster)}, 標準名片={len(hits_std_mp)}")
