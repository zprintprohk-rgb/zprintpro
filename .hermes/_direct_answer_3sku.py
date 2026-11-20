# -*- coding: utf-8 -*-
"""直答段扩 3 SKU (mailer / white-card-bags / kraft-paper-bags) + 单位 張->個; 不含交期断言"""
import io, os, re, shutil, sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(REPO, "src", "data", "sku-seo-data.ts")
t = io.open(P, encoding="utf-8", newline="").read()
n0 = len(t)
marks = [(m.group(1), m.start()) for m in re.finditer(r'^  "([a-z0-9-]+)": \{', t, re.M)]
def bounds(slug):
    for i, (s, off) in enumerate(marks):
        if s == slug:
            return off, (marks[i + 1][1] if i + 1 < len(marks) else len(t))
    return None

ANSWERS = {
    "mailer-boxes": "快遞盒／飛機盒訂製直答：100 個起印、HK$3.5-10/個（按尺寸與坑型），E 坑／F 坑瓦楞可選，1 小時內免費數碼打稿，30 秒 AI 報價即時出價，港九新界滿 HK$500 免費順豐。",
    "white-card-bags": "白卡紙袋訂製直答：100 個起印、HK$5-12/個（按尺寸與紙重），250-300g 白卡可選，1 小時內免費數碼打稿，30 秒 AI 報價即時出價，港九新界滿 HK$500 免費順豐。",
    "kraft-paper-bags": "牛皮紙袋訂製直答：100 個起印、HK$3-8/個（按尺寸、紙重與手挽款式），1 小時內免費數碼打稿，30 秒 AI 報價即時出價，港九新界滿 HK$500 免費順豐。",
}

for slug, ans in ANSWERS.items():
    b = bounds(slug)
    if not b:
        print("[FAIL] no block", slug); sys.exit(2)
    s0, s1 = b
    blk = t[s0:s1]
    if "直答" in blk:
        print("[skip]", slug); continue
    m = re.search(r'"body":\s*"', blk)
    if not m:
        print("[FAIL] no body", slug); sys.exit(2)
    blk = blk[:m.end()] + ans + "\\n\\n" + blk[m.end():]
    n_unit = blk.count("100 張起印")
    blk = blk.replace("100 張起印", "100 個起印")
    t = t[:s0] + blk + t[s1:]
    print(f"[OK] {slug}: 直答 +{len(ans)}, 張起印 fixed {n_unit}")

for slug in ANSWERS:
    b = bounds(slug); blk = t[b[0]:b[1]]
    assert "直答" in blk and "100 張起印" not in blk, slug

bp = os.path.join(REPO, ".hermes", "_bak-faqans-20261021", "sku-seo-data.ts.before2")
if not os.path.exists(bp):
    shutil.copy2(P, bp)
io.open(P, "w", encoding="utf-8", newline="").write(t)
print(f"[PASS] {n0} -> {len(t)}")
