# -*- coding: utf-8 -*-
"""队列 1/2/4 执行器: 内链批2 (6) + 裡印扩3PDP + hub FAQ 修2"""
import io, os, json, re, shutil, sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BAK = os.path.join(REPO, ".hermes", "_bak-queue-20261020")
os.makedirs(BAK, exist_ok=True)

def rd(p):
    with io.open(p, "r", encoding="utf-8", newline="") as f:
        return f.read()

def wr(p, t, name=None):
    bp = os.path.join(BAK, (name or os.path.basename(p)) + ".before")
    if not os.path.exists(bp):
        shutil.copy2(p, bp)
    with io.open(p, "w", encoding="utf-8", newline="") as f:
        f.write(t)

report = []
Q = '\\"'  # 文件内 JSON 转义引号

LINK_EDITS = {
    "zh-hk.json": [
        ("包裝上加綠色標識傳遞 ESG 承諾",
         "<a href=" + Q + "/zh-hk/category/packaging/" + Q + ">包裝盒</a>上加綠色標識傳遞 ESG 承諾"),
        ("外賣速食 → PVC 防水;ESG 餐廳 → PP + FSC 大豆油墨",
         "外賣速食 → PVC 防水（餐盒包裝見<a href=" + Q + "/zh-hk/product/food-boxes/" + Q + ">食品包裝盒</a>）;ESG 餐廳 → PP + FSC 大豆油墨"),
    ],
    "en.json": [
        ("Add green identifiers on packaging to communicate ESG commitment",
         "Add green identifiers on <a href=" + Q + "/en/category/packaging/" + Q + ">packaging</a> to communicate ESG commitment"),
        ("takeaway/cafe, US$2-6.5/sheet",
         "takeaway/cafe, US$2-6.5/sheet. Pair with <a href=" + Q + "/en/product/food-boxes/" + Q + ">food packaging boxes</a> for takeout"),
    ],
    "ja.json": [
        ("水性ラミネートのセット提供可能。",
         "水性ラミネートのセット提供可能。<a href=" + Q + "/ja/category/packaging/" + Q + ">エコパッケージ印刷</a>もご相談ください。"),
        ("テイクアウト・カフェ、¥250-800/枚",
         "テイクアウト・カフェ、¥250-800/枚。テイクアウトには<a href=" + Q + "/ja/product/food-boxes/" + Q + ">食品対応パッケージ</a>も。"),
    ],
}

for fname, edits in LINK_EDITS.items():
    p = os.path.join(REPO, "src", "data", "blog-data", fname)
    t = rd(p)
    pre_links = t.count("href")
    for old, new in edits:
        c = t.count(old)
        if c != 1:
            print(f"[FAIL] {fname}: 锚点匹配 {c} 次 (期望 1): {old[:32]}")
            sys.exit(2)
        t = t.replace(old, new)
    post_links = t.count("href")
    try:
        json.loads(t)
    except Exception as e:
        print(f"[FAIL] {fname} JSON 失效: {e}"); sys.exit(3)
    if post_links - pre_links != 2:
        print(f"[FAIL] {fname} href 增量 {post_links - pre_links} (期望 2)"); sys.exit(3)
    wr(p, t)
    report.append(f"links {fname}: href {pre_links}->{post_links}")

# ---------- 项2: 裡印 扩 3 PDP ----------
TS = os.path.join(REPO, "src", "data", "sku-seo-data.ts")
t = rd(TS)
SLUG_RE = re.compile(r'^  "([a-z0-9-]+)": \{', re.M)
marks = [(m.group(1), m.start()) for m in SLUG_RE.finditer(t)]

LIYIN = {
    "folding-boxes": "關於內側印刷（裡印）：內側印刷可加深開箱品牌體驗；如需食品接觸面的內側印刷，可安排食品級油墨並以 PE 淋膜保護印刷面，落單時註明即可；外印＋內層淋膜的組合同樣符合間接接觸要求，兩種方案可在免費打稿時一併確認。",
    "mailer-boxes": "關於內側印刷（裡印）：快遞盒內側印刷可傳遞品牌信息、提升開箱體驗；如需食品接觸面的內側印刷，可安排食品級油墨並以 PE 淋膜保護，落單時註明即可，兩種方案可在免費打稿時一併確認。",
    "white-card-bags": "關於內側印刷（裡印）：紙袋內側印刷可做客製設計；如需盛載食品的內側印刷，可安排食品級油墨並以 PE 淋膜保護印刷面，落單時註明即可，兩種方案可在免費打稿時一併確認。",
}

def block_bounds(slug):
    for i, (s, off) in enumerate(marks):
        if s == slug:
            end = marks[i + 1][1] if i + 1 < len(marks) else len(t)
            return off, end
    return None

for slug, para in LIYIN.items():
    b = block_bounds(slug)
    if not b:
        print(f"[FAIL] 块未找到 {slug}"); sys.exit(2)
    s0, s1 = b
    blk = t[s0:s1]
    if "內側印刷（裡印）" in blk:
        print(f"[skip] {slug} 已有裡印"); continue
    m = re.search(r'(準備(?:好就)?落單[？—]+1 小時免費打稿)', blk)
    if not m:
        print(f"[FAIL] {slug} CTA 未找到"); sys.exit(2)
    cta = m.group(1)
    pre = blk[:m.start()]
    esc = re.search(r'(?:\\\\+n)+$', pre)
    sep = esc.group(0) if esc else "\\\\n\\\\n"
    blk2 = blk.replace(cta, para + sep + cta, 1)
    t = t[:s0] + blk2 + t[s1:]
    report.append(f"liyin {slug}: +{len(para)} chars, sep={sep!r}")

wr(TS, t)

# ---------- 项4: hub FAQ 替换 2 条 ----------
CS = os.path.join(REPO, "src", "data", "category-seo-content.ts")
c = rd(CS)
pc = c.index("packagingContent")
zh = c.index("'zh-hk': {", pc)
cands = [x for x in [c.find("'en': {", zh), c.find("en: {", zh)] if x > 0]
en = min(cands)
block = c[zh:en]

OLD_Q1 = "{ q: '可移貼紙同戶外貼紙有咩分別？', a: '可移貼紙（再剥離）撕走不留痕，適合玻璃櫥窗同短期推廣；戶外貼紙用防水防 UV 材質，耐候 3-5 年，適合車身同外牆。兩款都 10 張起印。' },"
NEW_Q1 = "{ q: '包裝盒印刷價錢點計？', a: '包裝盒 100 個起印；價錢按盒型、尺寸、紙材與工藝計，8 檔標準尺寸免刀模費，拼版方案可再壓低單價。可參考摺疊盒 HK$2.5-15/個、精裝盒 HK$8-42/個 的價格帶，再用 30 秒 AI 即時報價取實價。' },"
OLD_Q2 = "{ q: '透明貼紙同環保材質貼紙有冇得印？', a: '有。透明貼紙可選白墨打底（全面/局部/無三種效果）；環保材質有種子紙同 FSC 認證紙，適合永續品牌。10 張起印，免費數據檢查。' },"
NEW_Q2 = "{ q: '包裝盒可以做內側印刷（裡印）嗎？', a: '可以。內側印刷可加深開箱品牌體驗；如需食品接觸面裡印，可安排食品級油墨並以 PE 淋膜保護印刷面，落單時註明即可，兩種方案可在免費打稿時一併確認。' },"

for old, new in [(OLD_Q1, NEW_Q1), (OLD_Q2, NEW_Q2)]:
    if block.count(old) != 1:
        print(f"[FAIL] hub FAQ 块内匹配 {block.count(old)}"); sys.exit(2)
    block = block.replace(old, new)
if "可移貼紙同戶外貼紙" in block:
    print("[FAIL] Q1 残留"); sys.exit(3)
c = c[:zh] + block + c[en:]
wr(CS, c)
report.append("hubfaq: 2 stickers->packaging Qs replaced (block-scoped)")

for r in report:
    print("[OK]", r)
print("[PASS] 队列 1/2/4 完成")
