#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Read m3-task-cards file handling various encodings."""
import os

os.chdir(r"F:\zprintpro-nextjs")
path = r".hermes\m3-task-cards\2026-08-09-mavis-phase-strategy-8-10.md"
raw = open(path, "rb").read()
print("size:", len(raw), "head:", raw[:8])
for enc in ["utf-8-sig", "utf-16", "utf-16-le", "gbk"]:
    try:
        text = raw.decode(enc)
        print(f"=== decoded with {enc} ===")
        print(text[:6000])
        break
    except Exception as e:
        print(enc, "fail:", e)
