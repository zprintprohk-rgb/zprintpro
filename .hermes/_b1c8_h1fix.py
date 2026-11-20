# -*- coding: utf-8 -*-
import io, os, shutil
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(REPO, "zprintpro-sku-seo-data.csv")
BAK = os.path.join(REPO, ".hermes", "_bak-b1c8-20261016")
with io.open(P, "r", encoding="utf-8", newline="") as fh:
    lines = fh.read().split("\n")
cols = lines[23].split("\t")
assert len(cols) == 31 and cols[3] == "outdoor-posters", "row24 形态"
assert cols[15] == "Outdoor Posters 50+ | UV Resistant | ZprintPro", f"col15 现值不符: {cols[15]}"
cols[14] = "戶外海報印刷 — 防水抗UV 戶外耐候，1 張起印"
cols[15] = "Outdoor Posters from 1 | UV-Resistant Vinyl | ZprintPro"
cols[16] = "屋外ポスター 1枚〜：耐UV・防水素材"
shutil.copy2(P, os.path.join(BAK, "zprintpro-sku-seo-data.csv.before-h1"))
lines[23] = "\t".join(cols)
with io.open(P, "w", encoding="utf-8", newline="") as fh:
    fh.write("\n".join(lines))
print("PASS: outdoor h1 三格真值化")