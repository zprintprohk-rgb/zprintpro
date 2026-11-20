# -*- coding: utf-8 -*-
"""Double-method count: HEAD vs working tree for the lane model's claimed removals."""
import io, subprocess

P = "src/data/sku-seo-data.ts"

def count(text, needle):
    return text.count(needle)

head = subprocess.run(["git", "show", f"HEAD:{P}"], capture_output=True).stdout.decode("utf-8")
work = io.open(P, encoding="utf-8", newline="").read()

for needle in ["国際認証体系", "國際認證體系", "internationally certified", "FDA", "full FDA compliance"]:
    print("%-28s HEAD=%3d  WORK=%3d" % (needle, count(head, needle), count(work, needle)))
print("LINES changed:", len(work.split("\n")) - len(head.split("\n")))
