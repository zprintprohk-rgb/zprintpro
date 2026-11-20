# -*- coding: utf-8 -*-
"""packaging zh buyingGuide: 追加「食品包裝」hub-spoke 段（含 4 条内链）"""
import io, os, re, shutil

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(REPO, "src", "data", "category-seo-content.ts")
t = io.open(P, encoding="utf-8", newline="").read()
n0 = len(t)

# 定位 packagingContent 的 zh-hk 块
ci = t.index("const packagingContent")
zh_i = t.index("'zh-hk': {", ci)
bg = t.index("buyingGuide: {", zh_i)
pp = t.index("paragraphs: [", bg)
# 括号匹配
depth = 0
k = pp + len("paragraphs: ")
end = None
for idx in range(k, len(t)):
    ch = t[idx]
    if ch == '[':
        depth += 1
    elif ch == ']':
        depth -= 1
        if depth == 0:
            end = idx
            break
assert end, "paragraphs close not found"
seg = t[pp:end]
n_par = seg.count("',\n") + seg.count("',")
print("paragraphs region len", len(seg))

NEW = """
        '食品包裝專節：同一個盒型，食品類要額外處理三件事——<b>食品級紙材</b>（落單註明，可選 PE 淋膜保護印刷面）、<b>防潮處理</b>（烘焙、茶葉、冷藏出貨必備）、<b>合規文件</b>（出口歐美用 FSC 認證紙，通關文件我們一併提供）。月餅、年糕、曲奇等節慶禮盒，建議預留 3-4 週做打樣同對色。<a href="/zh-hk/product/food-boxes/">食品包裝盒產品頁</a>、<a href="/zh-hk/blog/food-packaging-printing-guide/">食品包裝印刷完全指南</a>、<a href="/zh-hk/blog/kraft-paper-box-printing-guide/">牛皮紙盒指南</a>、<a href="/zh-hk/blog/custom-packaging-box-design-guide/">包裝盒設計流程</a>。'"""

if "食品包裝專節" in t:
    print("already present, skip")
    raise SystemExit(0)

t = t[:end] + "," + NEW + t[end:]
# 断言
assert "食品包裝專節" in t
assert t.count("食品包裝專節") == 1
nm = len(re.findall(r"<a href=", t))
print("total <a href= after:", nm)
bp = os.path.join(REPO, ".hermes", "_bak-hubfood-20261022", "category-seo-content.ts.before")
os.makedirs(os.path.dirname(bp), exist_ok=True)
if not os.path.exists(bp):
    shutil.copy2(P, bp)
io.open(P, "w", encoding="utf-8", newline="").write(t)
print("[OK]", n0, "->", len(t))
