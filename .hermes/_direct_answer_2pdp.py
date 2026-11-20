# -*- coding: utf-8 -*-
"""直答段扩 2 PDP (rigid-boxes / cosmetic-boxes) + 单位修正 張->個"""
import io, os, re, shutil, sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(REPO, "src", "data", "sku-seo-data.ts")
with io.open(P, "r", encoding="utf-8", newline="") as f:
    t = f.read()
n0 = len(t)

marks = [(m.group(1), m.start()) for m in re.finditer(r'^  "([a-z0-9-]+)": \{', t, re.M)]
def bounds(slug):
    for i, (s, off) in enumerate(marks):
        if s == slug:
            return off, (marks[i + 1][1] if i + 1 < len(marks) else len(t))
    return None

ANSWERS = {
    "rigid-boxes": "精裝盒訂製直答：100 個起印、HK$8-42/個（按尺寸、灰板厚度與工藝），3-7 個工作天生產（檔案確認後），1 小時內免費數碼打稿，30 秒 AI 報價即時出價，港九新界滿 HK$500 免費順豐。",
    "cosmetic-boxes": "化妝品包裝盒訂製直答：100 個起印、HK$8-65/個（按盒型與工藝），天地蓋／磁吸翻蓋／抽屜式／書型 4 種盒型 + EVA／紙漿／PET 內托可選，5-7 個工作天生產（檔案確認後），1 小時內免費數碼打稿，30 秒 AI 報價，港九新界滿 HK$500 免費順豐。",
}

for slug, answer in ANSWERS.items():
    b = bounds(slug)
    if not b:
        print("[FAIL] no block", slug); sys.exit(2)
    s0, s1 = b
    blk = t[s0:s1]
    if "直答" in blk:
        print("[skip] already has 直答:", slug); continue
    m = re.search(r'"body":\s*"', blk)
    if not m:
        print("[FAIL] no body", slug); sys.exit(2)
    ins = m.end()
    blk = blk[:ins] + answer + "\\n\\n" + blk[ins:]
    # 单位: 盒类 "100 張起印" -> "100 個起印"
    n_unit = blk.count("100 張起印")
    blk = blk.replace("100 張起印", "100 個起印")
    t = t[:s0] + blk + t[s1:]
    print(f"[OK] {slug}: 直答 +{len(answer)} chars, 張起印 fixed {n_unit}")

# 断言
for slug in ANSWERS:
    b = bounds(slug); blk = t[b[0]:b[1]]
    assert "直答" in blk, slug + " missing 直答"
    assert "100 張起印" not in blk, slug + " unit residue"
assert "100 個起印、HK$8-42/個" in t and "100 個起印、HK$8-65/個" in t

bp = os.path.join(REPO, ".hermes", "_bak-faqans-20261021", "sku-seo-data.ts.before")
os.makedirs(os.path.dirname(bp), exist_ok=True)
if not os.path.exists(bp):
    shutil.copy2(P, bp)
with io.open(P, "w", encoding="utf-8", newline="") as f:
    f.write(t)
print(f"[PASS] {n0} -> {len(t)} chars")
