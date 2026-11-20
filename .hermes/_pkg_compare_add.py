# -*- coding: utf-8 -*-
"""packaging en/ja buyingGuide 追加「MOQ × 价格带」对照段（真值全部来自 products.ts）"""
import io, os, re, shutil

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(REPO, "src", "data", "category-seo-content.ts")
B = os.path.join(REPO, ".hermes", "_bak-pkg-compare-20261022")
os.makedirs(B, exist_ok=True)

EN = "'Minimum order and price bands at a glance: food boxes 100 pcs (HK$2.5-18), folding cartons 100 pcs (HK$2.5-15), mailer boxes 100 pcs (HK$3.5-10), cosmetic boxes 100 pcs (HK$8-65), rigid boxes 100 pcs (HK$8-42), kraft paper bags 100 pcs (HK$3-8), white card bags 100 pcs (HK$5-12), gift bags 100 pcs (HK$10-20). Unit price moves with size, stock and finishing; standard sizes share common dies, so no die fee applies.',"
JA = "'最小ロットと価格帯の目安：食品箱 100個〜（HK$2.5-18）、折り箱 100個〜（HK$2.5-15）、メーラーボックス 100個〜（HK$3.5-10）、化粧品箱 100個〜（HK$8-65）、上製箱 100個〜（HK$8-42）、クラフト紙袋 100個〜（HK$3-8）、白カード紙袋 100個〜（HK$5-12）、ギフト紙袋 100個〜（HK$10-20）。単価はサイズ・用紙・加工で変動し、標準サイズは共通ダイのため型代はかかりません。',"

t = io.open(P, encoding="utf-8", newline="").read()
n0 = len(t)
ci = t.index("const packagingContent")
blk_end = t.index("const ", ci + 20)

def insert_into_buying(block, payload, tag):
    """在 buyingGuide.paragraphs 数组末尾插入一段"""
    bg = block.index("buyingGuide: {")
    pp = block.index("paragraphs: [", bg)
    m = re.search(r"\n      \],", block[pp:])
    assert m, tag + " paragraphs close not found"
    end = pp + m.start()          # 指向 "\n      ]," 的换行位置
    inner = block[pp:end]
    assert inner.rstrip().endswith("'") or inner.rstrip().endswith(","), inner[-50:]
    return block[:end] + "\n        " + payload + block[end:]

block = t[ci:blk_end]
enS = block.index("en: {")
jaS = block.index("ja: {")
zhS = block.index("'zh-hk': {")
assert zhS < enS < jaS, "locale order"

# 取 en 子块与 ja 子块（ja 到块尾）
en_blk = block[enS:jaS]
ja_blk = block[jaS:]

assert "Minimum order and price bands at a glance" not in t
assert "最小ロットと価格帯の目安" not in t

en_new = insert_into_buying(en_blk, EN, "en")
ja_new = insert_into_buying(ja_blk, JA, "ja")

out_block = block[:enS] + en_new + ja_new
t2 = t[:ci] + out_block + t[blk_end:]

# 断言
assert t2.count("Minimum order and price bands at a glance") == 1
assert t2.count("最小ロットと価格帯の目安") == 1
assert "份" not in JA
for price in ["HK$2.5-18", "HK$2.5-15", "HK$3.5-10", "HK$8-65", "HK$8-42", "HK$3-8", "HK$5-12", "HK$10-20"]:
    assert price in EN and price in JA, price
# 括号/引号平衡粗检
assert t2.count("[") - t2.count("]") == t.count("[") - t.count("]")

bp = os.path.join(B, "category-seo-content.ts.before")
if not os.path.exists(bp):
    shutil.copy2(P, bp)
io.open(P, "w", encoding="utf-8", newline="").write(t2)
print(f"[OK] {n0} -> {len(t2)} (+{len(t2)-n0}) | en/ja packaging comparison paragraph added")
