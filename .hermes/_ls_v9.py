# -*- coding: utf-8 -*-
import os, io, re
base = r"F:\zprintpro-nextjs\src\app\[locale]\category\[slug]\v9"
print("v9 entries:", os.listdir(base))
for name in os.listdir(base):
    p = os.path.join(base, name)
    if os.path.isfile(p):
        s = io.open(p, encoding="utf-8", newline="").read()
        has_meta = "generateMetadata" in s or "export const metadata" in s
        has_desc = re.search(r"description\s*:", s) is not None
        print(name, "size", len(s), "metadata?", has_meta, "description-key?", has_desc)
        hits = [l.strip()[:110] for l in s.split("\n") if re.search(r"generateMetadata|export const metadata|description\s*:", l)][:6]
        for h in hits:
            print("   ", h)
