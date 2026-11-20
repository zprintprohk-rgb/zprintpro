# -*- coding: utf-8 -*-
"""en/ja hub FAQ parity: +price Q (en), +inside-print Q (en/ja)"""
import io, os, shutil, sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(REPO, "src", "data", "category-seo-content.ts")
with io.open(P, "r", encoding="utf-8", newline="") as f:
    s = f.read()
n0 = len(s)

lines = s.split("\n")
def off(ln):
    o = 0
    for i in range(ln - 1):
        o += len(lines[i]) + 1
    return o

A = off(82); B = off(419)
blk = s[A:B]
zh = blk.index("'zh-hk': {")
en = blk.index("en: {")
ja = blk.index("ja: {")
print("offsets", zh, en, ja)

en_blk = blk[en:ja]
ja_blk = blk[ja:]

EN_ADD = ("      { q: 'How much does packaging box printing cost?', a: 'Packaging boxes start from 100 pcs. Price depends on box style, size, material and finishing; standard sizes share fixed dies (no die fee), and gang-run layouts reduce unit cost. Reference bands: folding boxes HK$2.5-15/pc, rigid boxes HK$8-42/pc. Get an instant quote in 30 seconds.' },\n"
          "      { q: 'Can you print on the inside of the box (reverse printing)?', a: 'Yes. Inside printing adds brand colour, messages or serials. For direct food contact we use food-grade ink with a PE lining over the printed surface; outer printing plus an inner PE lining also meets indirect-contact requirements. Mention it on your order and both options are confirmed in the same free proof.' },\n")

JA_ADD = ("      { q: '箱の内側（裏印刷）はできますか？', a: 'できます。内側印刷でブランドカラーやメッセージ、シリアルを入れられます。食品に直接触れる面は食品グレードのインキ＋PE ラミネートで保護し、外側印刷＋内側 PE ラミネートでも間接接触の要件を満たします。ご注文時に「内側印刷あり」とご指定ください。無料校正で両案を確認できます。' },\n")

def inject_first_faq(block, add, tag):
    i = block.index("faq: [\n")
    head = block[:i] + "faq: [\n"
    return head + add + block[i + len("faq: [\n"):]

en_new = inject_first_faq(en_blk, EN_ADD, "en")
ja_new = inject_first_faq(ja_blk, JA_ADD, "ja")
out = s[:A] + blk[:en] + en_new + ja_new + s[B:]

# 断言
assert out.count("箱の内側（裏印刷）はできますか？") == 1
assert out.count("How much does packaging box printing cost?") == 1
assert out.count("Can you print on the inside of the box") == 1
bp = os.path.join(REPO, ".hermes", "_bak-hub-links-20261020", "category-seo-content.ts.before2")
os.makedirs(os.path.dirname(bp), exist_ok=True)
if not os.path.exists(bp):
    shutil.copy2(P, bp)
with io.open(P, "w", encoding="utf-8", newline="") as f:
    f.write(out)
print("[OK] hub FAQ parity +%d chars (%d -> %d)" % (len(out) - n0, n0, len(out)))
