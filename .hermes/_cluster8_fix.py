# -*- coding: utf-8 -*-
"""簇8 三修: educational ja featuredSnippet(假价+KPI黑话+24h) / mailer 7-10->3-5 / textbooks ja 字形"""
import io, os, re, shutil

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
B = os.path.join(REPO, ".hermes", "_bak-cluster8-20261022")
os.makedirs(B, exist_ok=True)

def read(p):
    return io.open(p, "r", encoding="utf-8", newline="").read()

def write(p, t, tag):
    bp = os.path.join(B, os.path.basename(p) + "." + tag)
    if not os.path.exists(bp):
        shutil.copy2(p, bp)
    io.open(p, "w", encoding="utf-8", newline="").write(t)

# ---- 1. educational ja featuredSnippet ----
P1 = os.path.join(REPO, "src", "data", "category-seo-content.ts")
t1 = read(P1)
OLD1 = "featSnippetPLACEHOLDER"
old_snip = "教科書 印刷 100本から HK$28／本 | 練習冊/教材/学校/塾 4 種対応 | 24h出荷 DHL 2-4日 | ジープリント."
new_snip = "教科書 印刷 100本から HK$24／本 | 練習冊/教材/学校/塾 4 種対応 | 標準 3-5 営業日 DHL 2-4日 | ジープリント."
assert t1.count(old_snip) == 1, "snippet match " + str(t1.count(old_snip))
t1 = t1.replace(old_snip, new_snip)
# 删除 KPI 黑话尾巴
kpi = " 9/4 ja CTR ≥2% 目標."
assert t1.count(kpi) == 1, "kpi tail match " + str(t1.count(kpi))
t1 = t1.replace(kpi, ".")
# h2 的 24h出荷 -> 3-5営業日
h2old = "h2: '教科書 印刷 / 練習冊 / 教材 | 100本起 24h出荷 | ZprintPro'"
h2new = "h2: '教科書 印刷 / 練習冊 / 教材 | 100本起 3-5営業日 | ZprintPro'"
assert t1.count(h2old) == 1, "h2 match"
t1 = t1.replace(h2old, h2new)
write(P1, t1, "before")

# ---- 2. mailer 7-10 -> 3-5 ----
P2 = os.path.join(REPO, "src", "data", "sku-seo-data.ts")
t2 = read(P2)
old2 = "7-10 個工作天交貨，港九新界免費速遞"
n2 = t2.count(old2)
assert n2 >= 1, "mailer lead not found"
t2 = t2.replace(old2, "3-5 個工作天交貨，港九新界免費速遞")
# en/ja 同块 7-10 检查
print("mailer zh fixed:", n2, "| 7-10 residual:", len(re.findall(r"7-10", t2)))
write(P2, t2, "before")

# ---- 3. textbooks ja 字形 ----
P3 = os.path.join(REPO, "src", "data", "products.ts")
t3 = read(P3)
fixes = [
    ("nameJa: '教科書印刷 — K12 教科書・補習校教材・學年内教材・研修マニュアル'",
     "nameJa: '教科書印刷 — K12 教科書・補習校教材・学年別教材・研修マニュアル'"),
]
for a, b in fixes:
    if t3.count(a) == 1:
        t3 = t3.replace(a, b)
        print("ja name fixed")
# descriptionJa 内 學年 -> 学年（仅限 ja 字段段内）
m = re.search(r"descriptionJa: '([^']*)'", t3)
if m:
    seg = m.group(1)
    if "學年" in seg:
        t3 = t3.replace(seg, seg.replace("學年", "学年"))
        print("descriptionJa 學年 -> 学年")
write(P3, t3, "before")

print("[PASS] 3 files patched")
