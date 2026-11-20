# -*- coding: utf-8 -*-
"""skuMoneyFAQs +4 利是封 SKU x 4 问 x 3 语（覆盖 25 -> 29/83，CNY 2027 旺季簇）"""
import io, os, re, shutil

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(REPO, "src", "data", "product-faqs.ts")
B = os.path.join(REPO, ".hermes", "_bak-faq-rp-20261022")
os.makedirs(B, exist_ok=True)

D = {
 "foil-red-packets": [
  ("燙金利是封最少印幾多？價錢點計？", "Minimum order and price for foil red packets?",
   "箔押しポチ袋の最小ロットと価格は？",
   "100 個起印，HK$1.10-4.80/個（按尺寸、箔色與數量）。標準 5-7 個工作天。",
   "From 100 pcs at HK$1.10-4.80 each by size, foil colour and quantity; 5-7 business days standard.",
   "100個から、HK$1.10-4.80/個（サイズ・箔色・数量による）。標準5〜7営業日。"),
  ("有咩圖案可以揀？可唔可以改用公司 Logo？", "Which designs are available — can we use our own logo?",
   "図柄は選べますか。自社ロゴに変更できますか。",
   "吉祥圖案有多款現成可選；亦可以改成公司 Logo 或年度生肖設計，打稿確認後才開印。",
   "Ready-made auspicious patterns are available, or we replace them with your logo or a zodiac design; print starts after proof approval.",
   "既存の吉祥文様のほか、貴社ロゴや干支デザインへの差し替えも可能です。校正承認後に印刷します。"),
  ("適合咩場合派？", "Where are foil red packets usually given out?",
   "どんな場面で使われますか。",
   "企業年會、客戶禮贈、春節促銷、婚宴回禮、酒店迎賓，以及需要體面的商務拜年。",
   "Corporate year-end events, client gifting, CNY promotions, wedding favours, hotel greetings and business visits.",
   "企業の年末イベント、取引先への贈答、春節キャンペーン、結婚式の引き出物、ホテルの迎賓など。"),
  ("旺季幾時要落單？", "When should we order for the CNY peak?",
   "繁忙期はいつ発注すべきですか。",
   "農曆新年前三週是最高峰，建議預留 3-4 週；標準 5-7 個工作天，急件請先查檔期。",
   "The three weeks before Lunar New Year are peak: allow 3-4 weeks. Standard production is 5-7 business days; ask about rush slots early.",
   "旧正月前3週間が最繁忙期です。3〜4週間の余裕を見てください。標準5〜7営業日、特急は枠を早めにご確認ください。"),
 ],
 "custom-red-packets": [
  ("訂製利是封最少印幾多？價錢點計？", "Minimum order and price for custom red packets?",
   "オリジナルポチ袋の最小ロットと価格は？",
   "100 個起印，HK$1.90-6.40/個（按尺寸、紙材、工藝與數量）。標準 5-7 個工作天。",
   "From 100 pcs at HK$1.90-6.40 each by size, stock, finishing and quantity; 5-7 business days.",
   "100個から、HK$1.90-6.40/個（サイズ・用紙・加工・数量による）。標準5〜7営業日。"),
  ("可以印公司 Logo 同祝福語嗎？", "Can we print our logo and a greeting?",
   "会社ロゴやメッセージは入れられますか。",
   "可以，Logo、祝福語、年份與生肖都可入版；需要燙金、局部 UV 或擊凸亦可一併安排。",
   "Yes — logo, greeting, year and zodiac all go on plate, with foil, spot UV or embossing added in the same run.",
   "可能です。ロゴ、メッセージ、年号、干支を入れられ、箔押し・スポットUV・エンボスも同時に手配できます。"),
  ("設計稿要唔要自己出？", "Do we need to supply artwork?",
   "デザインは必要ですか。",
   "有 AI／PDF 稿可直接入稿；只有 Logo 與文字亦可走免費設計，打稿後再確認。",
   "Supply AI or PDF if available; with only a logo and text, free design is included and you approve the proof.",
   "AI／PDFがあればそのまま入稿できます。ロゴとテキストのみでも無料デザインで対応し、校正後に確定します。"),
  ("交期同數量點安排最穩？", "How should we plan quantity and timing?",
   "部数と納期はどう計画しますか。",
   "按實際派發人數加 5-10% 損耗；旺季（新年前三週）建議提早 3-4 週落單。",
   "Plan for the actual recipient count plus 5-10% spare; in the peak three weeks before CNY, order 3-4 weeks ahead.",
   "実際の配布数に5〜10%の予備を加えてください。旧正月前3週間は3〜4週間前の発注が安全です。"),
 ],
 "embossed-red-packets": [
  ("浮雕利是封最少印幾多？價錢點計？", "Minimum order and price for embossed red packets?",
   "エンボス加工のポチ袋の最小ロットと価格は？",
   "100 個起印，HK$3.00-9.50/個（按尺寸、紙材與浮雕面積）。標準 5-7 個工作天。",
   "From 100 pcs at HK$3.00-9.50 each by size, stock and embossed area; 5-7 business days.",
   "100個から、HK$3.00-9.50/個（サイズ・用紙・エンボス面積による）。標準5〜7営業日。"),
  ("浮雕效果係點做出嚟？", "How is the embossed effect produced?",
   "エンボスはどうやって付けますか。",
   "用模具壓出立體紋理，手指摸得到凹凸；適合傳統花紋、剪紙圖案與品牌徽章。",
   "A die presses the relief into the sheet, so fingers feel the pattern — good for traditional motifs, paper-cut art and crests.",
   "型で凹凸を押し出すため、指で模様を感じられます。伝統文様や切り絵、紋章に向きます。"),
  ("適合送咩客戶？", "Which recipients suit embossed packets?",
   "どんな相手向けですか。",
   "VIP 客戶、銀行與金融公關、酒店迎賓、高端品牌送禮，需要「一摸就知分別」的場合。",
   "VIP clients, banking and finance PR, hotel greetings and premium gifting — where the hand-feel itself signals the tier.",
   "VIP顧客、銀行・金融の広報、ホテル迎賓、高級ブランドの贈答など、手触りで格が伝わる場面に。"),
  ("浮雕會唔會影響燙金位置？", "Does embossing conflict with foil?",
   "エンボスと箔押しは併用できますか。",
   "可以併用，但要先定好層次：一般建議 Logo 燙金、底紋浮雕，兩者錯位才不會互相壓平。",
   "They combine, but set the layers first: foil the logo and emboss the background so the two do not flatten each other.",
   "併用できますが、順序設計が重要です。ロゴは箔、地紋はエンボスにするなど、重ならない配置にします。"),
 ],
 "large-red-packets": [
  ("加大利是封最少印幾多？價錢點計？", "Minimum order and price for large red packets?",
   "大判ポチ袋の最小ロットと価格は？",
   "100 個起印，HK$2.20-7.50/個（按尺寸、紙材與工藝）。標準 5-7 個工作天。",
   "From 100 pcs at HK$2.20-7.50 each by size, stock and finishing; 5-7 business days.",
   "100個から、HK$2.20-7.50/個（サイズ・用紙・加工による）。標準5〜7営業日。"),
  ("加大尺寸可以放幾多？", "What fits inside the larger size?",
   "大判サイズには何が入りますか。",
   "可放多張鈔票、禮券或現金卡；紙材要夠挺，否則裝多張會變形，落單時可指定加厚。",
   "Multiple notes, vouchers or gift cards fit — specify a heavier stock so the packet keeps its shape when filled.",
   "複数枚の紙幣や商品券、ギフトカードが入ります。中身が多い場合は厚手の用紙をご指定ください。"),
  ("加大款適合咩用途？", "Where are large packets used?",
   "大判はどんな用途ですか。",
   "婚宴回禮、企業年會抽獎、酒店與珠寶店送禮、需要放禮券的商務拜年。",
   "Wedding favours, corporate lucky draws, hotel and jewellery gifting, and business visits where vouchers are enclosed.",
   "結婚式の引き出物、企業の抽選会、ホテルやジュエリー店の贈答、商品券を入れる挨拶回り。"),
  ("同標準尺寸可以同一批落單嗎？", "Can large and standard sizes ship in one order?",
   "大判と標準サイズを同時発注できますか。",
   "可以，同一設計語言下混款落單，共用一次打稿與一次出貨，減少色差。",
   "Yes — mixed sizes with one design language share a proof round and one shipment, which keeps colours consistent.",
   "可能です。同じデザイン言語で混在発注すれば、校正も出荷も一度で済み、色差も抑えられます。"),
 ],
}

def q(s):
    assert "'" not in s, s
    return "'" + s + "'"

def entry(slug, rows):
    out = [f"  '{slug}': ["]
    for (qz, qe, qj, az, ae, aj) in rows:
        out += ["    {", "      question: {", f"        'zh-hk': {q(qz)},", f"        en: {q(qe)},", f"        ja: {q(qj)},", "      },",
                "      answer: {", f"        'zh-hk': {q(az)},", f"        en: {q(ae)},", f"        ja: {q(aj)},", "      },", "    },"]
    out.append("  ],")
    return "\n".join(out)

t = io.open(P, encoding="utf-8", newline="").read()
n0 = len(t)
for slug in D:
    assert f"'{slug}': [" not in t, slug

# 插到最后一个 key（wall-calendars）之后
anchor = "'wall-calendars': ["
ai = t.index(anchor)
depth = 0
end = None
k = t.index("[", ai)
for idx in range(k, len(t)):
    ch = t[idx]
    if ch == "[":
        depth += 1
    elif ch == "]":
        depth -= 1
        if depth == 0:
            end = idx
            break
assert end and t[end + 1] == ","
blocks = [entry(s, D[s]) for s in D]
t2 = t[:end + 2] + "\n" + "\n".join(blocks) + t[end + 2:]

keys = re.findall(r"^  '([a-z0-9-]+)': \[", t2, re.M)
assert len(keys) == 29, len(keys)
for s, rows in D.items():
    assert len(rows) == 4
    assert t2.count(f"'{s}': [") == 1
    for r in rows:
        assert "份" not in r[2] + r[5]
    assert "HK$" in rows[0][3]
bp = os.path.join(B, "product-faqs.ts.before")
if not os.path.exists(bp):
    shutil.copy2(P, bp)
io.open(P, "w", encoding="utf-8", newline="").write(t2)
print(f"[OK] +4 red-packet SKU FAQs | keys 25 -> {len(keys)} | {n0} -> {len(t2)}")
