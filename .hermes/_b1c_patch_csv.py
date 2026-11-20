# -*- coding: utf-8 -*-
# B1c cluster1: CSV 15-slot patch (title/desc/h1/alt) — 生成器权威域
import io, sys

PATH = 'zprintpro-sku-seo-data.csv'
rows = list(io.open(PATH, encoding='utf-8').read().split('\n'))
while rows and not rows[-1].strip():
    rows.pop()
hdr = rows[0].split('\t')
idx = {n: hdr.index(n) for n in hdr}

# (slug, col, new) — 无引号/换行/制表符断言在写入前
EDITS = {
 'waterproof-stickers': {
  'SEO标题(ZH)': '防水貼紙 可移貼紙 戶外抗UV 10張起 HK$0.22起 | 智印港',
  'SEO描述(ZH)': '防水貼紙 10 張起印，HK$0.22 起/張。PVC 防水／PP 合成紙兩大面材，UV 防褪色油墨戶外 3 年不褪色，可覆啞膜／光膜、異形模切。設備標識、車身貼、飲品冰桶都合用。5-7 個工作天交貨，港九新界 HK$500 免費順豐速遞，1 小時免費數碼打稿。',
  'SEO描述(EN)': 'Waterproof stickers, 10 pcs MOQ from $0.32. PVC waterproof / PP synthetic stocks with UV-resistant ink, 3-year outdoor fade resistance, matte or gloss lamination, custom die-cut. 5-7 day production, free US shipping $99+, 1-hour digital proof. | ZprintPro',
  'SEO描述(JA)': '防水ステッカー 10枚〜¥41〜。PVC防水／PP合成紙の2大面材、UV耐性インクで屋外3年の褪色対応。マット／グロスラミ、型抜き対応。設備ラベル、車用、ドリンクバケツに。5-7営業日発送、1時間無料デジタル校正、全国送料無料。',
  'H1标题(JA)': '防水ステッカー｜PVC防水・屋外対応｜ZprintPro',
  '图片Alt标签(ZH)': '防水貼紙 / 不干膠 | 香港防水貼紙印刷 PVC 防水／PP 合成紙 模切 | 智印港',
  '图片Alt标签(EN)': 'Custom Waterproof Stickers for outdoor gear and product labels — ZprintPro',
  '图片Alt标签(JA)': '防水ステッカー / ダイカットステッカー | 防水対応・オリジナル形状 | ZprintPro',
 },
 'transparent-stickers': {
  'SEO标题(ZH)': '透明貼紙 PVC貼紙 防水 異形切割 10張起 HK$0.38起 | 智印港',
  'SEO描述(ZH)': '透明貼紙 10 張起印，HK$0.38 起/張。透明 PET 面材可選白墨打底，貼上玻璃瓶、化妝品瓶身只見圖案不見底紙，無標籤高級感。支援精細模切與異形裁切，印前免費檢查反白與最小字級。5-7 個工作天交貨，港九新界 HK$500 免費順豐速遞。',
  'SEO描述(EN)': 'Clear stickers, 10 pcs MOQ from $0.41. Transparent PET with optional white ink base for a no-label look on glass, cosmetics and clear packaging. Precision die-cutting, free prepress check of reversed text and minimum font sizes. 5-7 day production, free US shipping $99+. | ZprintPro',
  'SEO描述(JA)': '透明ステッカー 10枚〜¥51〜。透明PET素材、白インク下地オプション付き。ガラス瓶・化粧品容器に貼ってラベルレスな高級感。精密型抜き、反白文字と最小フォントの印前チェック無料。5-7営業日発送、全国送料無料。',
  'H1标题(ZH)': '透明貼紙 | 透明PET 白墨可選 無標籤質感',
  'H1标题(JA)': '透明ステッカー｜透明PET・白インク可｜ZprintPro',
  '图片Alt标签(EN)': 'Custom Transparent Stickers for cosmetics and glass bottles — ZprintPro',
 },
 'foil-stickers': {
  'SEO标题(ZH)': '燙金貼紙 | 防水 PVC 異形切割 | 10張起 HK$0.78起 | 智印港',
  'SEO描述(ZH)': '燙金貼紙 10 張起印，HK$0.78 起/張。金、銀、玫瑰金等多色箔，燙金與四色分版套印，配覆膜保護箔面。禮盒、酒標、VIP 邀請卡即刻升級質感，可搭配局部 UV 做出層次。5-7 個工作天交貨，港九新界 HK$500 免費順豐速遞，1 小時免費打稿。',
  'SEO描述(EN)': 'Foil stickers, 10 pcs MOQ from $0.51. Gold, silver, rose gold and more hot-stamped foils, 4-color plus foil two-plate process, laminated to protect the foil surface. Gift boxes, wine labels, VIP badges. 5-7 day production, free US shipping $99+. | ZprintPro',
  'SEO描述(JA)': '箔押しステッカー 10枚〜¥64〜。金・銀・ローズゴールド等多色箔、4色＋箔の2版工程、箔面保護ラミ対応。ギフトボックス、ワインラベル、VIPバッジに。部分UVと組み合わせて立体感も。5-7営業日発送、全国送料無料。',
  'H1标题(JA)': '箔押しステッカー｜金・銀・ローズ箔対応｜ZprintPro',
  '图片Alt标签(EN)': 'Custom Foil Stickers for gift packaging and wine labels — ZprintPro',
 },
 'security-stickers': {
  'SEO标题(ZH)': '防偽貼紙 標籤貼紙 防水圓角 10張起 HK$1.15起 | 智印港',
  'SEO描述(ZH)': '防偽貼紙 10 張起印，HK$1.15 起/張。VOID 防拆、易碎紙、全息膜等防偽工藝，撕下留字、一撕即碎，配可變序號／QR／條碼防竄貨。適合保修封條、3C 產品、證書與禮品封籤。5-7 個工作天交貨，批次留樣與色差控制。',
  'SEO描述(EN)': 'Security stickers, 10 pcs MOQ from $0.41. VOID tamper-evident, destructible paper and holographic film options with variable serials, QR codes and barcodes for anti-counterfeit tracking. 5-7 day production, free US shipping $99+. | ZprintPro',
  'SEO描述(JA)': 'セキュリティステッカー 10枚〜¥51〜。VOID開封証跡、壊れやすい紙、ホログラムフィルムなど偽造防止工芸。可変シリアル／QR／バーコードで横流し対策。保証シール、3C製品、証書に。5-7営業日発送、ロット保存・色差管理。',
  'H1标题(JA)': 'セキュリティステッカー｜VOID・壊れやすい紙・ホロ｜ZprintPro',
  '图片Alt标签(EN)': 'Custom Security Stickers for warranty seals and asset tracking — ZprintPro',
 },
 'fluorescent-stickers': {
  'SEO标题(ZH)': '螢光貼紙 貼紙印刷 防水圓角 10張起 HK$0.52起 | 智印港',
  'SEO描述(ZH)': '螢光貼紙 10 張起印，HK$0.52 起/張。螢光油墨高飽和醒目，SGS 無重金屬遷移認證，可配反光條紋提升夜間可見度。促銷標籤、安全標識、活動佈置首選。5-7 個工作天交貨，港九新界 HK$500 免費順豐速遞。',
  'SEO描述(EN)': 'Fluorescent stickers, 10 pcs MOQ from $0.46. High-saturation fluorescent inks, SGS certified no heavy-metal migration, optional reflective strips for night visibility. Promo labels, safety signs, events. 5-7 day production, free US shipping $99+. | ZprintPro',
  'SEO描述(JA)': '蛍光ステッカー 10枚〜¥60〜。高飽和蛍光インク、SGS無重金屬移行認証。反射ストライプ組合せで夜間視認性アップ。セールラベル、安全標識、イベント装飾に。5-7営業日発送、全国送料無料。',
  'H1标题(JA)': '蛍光ステッカー｜高飽和蛍光インク・SGS認証｜ZprintPro',
  '图片Alt标签(EN)': 'Custom Fluorescent Stickers for safety signs and promotions — ZprintPro',
 },
}

n = 0
for ri, line in enumerate(rows):
    if ri == 0:
        continue
    cells = line.split('\t')
    slug = cells[idx['Slug']]
    if slug in EDITS:
        for col, val in EDITS[slug].items():
            assert '"' not in val and '\n' not in val and '\t' not in val, 'illegal char %s %s' % (slug, col)
            cells[idx[col]] = val
            n += 1
        rows[ri] = '\t'.join(cells)

io.open(PATH, 'w', encoding='utf-8', newline='\n').write('\n'.join(rows) + '\n')
print('CSV patched cells:', n, '(expect 5 slugs x cols)')
