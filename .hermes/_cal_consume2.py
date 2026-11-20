# -*- coding: utf-8 -*-
import io, re, os

ROOT = r"F:\zprintpro-nextjs"
hits = []
for dirpath, dirs, files in os.walk(ROOT + r"\src"):
    dirs[:] = [d for d in dirs if d not in ("node_modules",)]
    for f in files:
        if f.endswith((".tsx", ".ts")):
            p = os.path.join(dirpath, f)
            try:
                s = io.open(p, encoding="utf-8", newline="").read()
            except Exception:
                continue
            if "category-seo-content" in s or "calendarsContent" in s:
                hits.append(p)
for p in hits:
    print(p.replace(ROOT, ""))
    s = io.open(p, encoding="utf-8", newline="").read()
    for m in re.finditer(r".*(?:import|from|locale\?|\.\[locale\]|zh-hk fallback|fallback)[^\n]*", s):
        ln = m.group(0).strip()
        if "category-seo-content" in ln or "Content?." in ln or "fallback" in ln.lower():
            print("   ", ln[:170])
