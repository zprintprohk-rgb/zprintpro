# -*- coding: utf-8 -*-
"""B2 batch 1: append 4 rows (doujinshi/eco-tote/yearbook/postcard) to CSV. No double-quotes/newlines/tabs in cells."""
import io

P = r'F:\zprintpro-nextjs\zprintpro-sku-seo-data.csv'
EXISTING = set(l.split('\t')[3].strip() for l in io.open(P, encoding='utf-8').read().split('\n')[1:] if l.strip())

R = []
# ---- doujinshi-printing ----
R.append([
 '同人誌印刷', 'Doujinshi Printing', '同人誌印刷', 'doujinshi-printing', '55',
 '同人誌印刷 10本起印 | Comiket前24小時特急對應 | 智印港',
 'Doujinshi Printing Comiket | 10 MOQ | USA | ZprintPro',
 '同人誌印刷 コミケ対応 10冊〜 小ロット 短納期 | ZprintPro',
 '同人誌印刷,同人誌 印刷,同人誌製作,同人本印刷,Comiket 印刷,漫畫印刷,小批量同人誌,中綴じ同人誌,自費出版,10本起印,即日同人誌,騎馬釘同人誌',
 'doujinshi printing,doujin printing,comiket printing,fanzine printing,artist alley printing,self publish manga,small batch doujinshi,saddle stitch booklet,comic market printing,doujinshi USA,10 MOQ,doujin printer',
 '同人誌印刷,同人誌 印刷,コミケ 印刷,コミケ 準備,同人誌 作成,中綴じ 印刷,小ロット 同人誌,短納期 同人誌,10冊から,即日 同人誌,コミケ 新刊,オンデマンド 同人誌',
 '同人誌印刷 10 本起印，Comiket 前 24 小時特急對應。中綴じ/無線綴じ/上製本 3 種裝訂，128g 啞粉內頁 + 250g 封面，免費打稿 4 小時，DHL 全球 2-4 天。',
 'Doujinshi printing from 10 copies with Comiket rush — 24h express before event day. Saddle-stitch / perfect / hardcover, 128gsm matte interior + 250gsm cover, free 4h proof, DHL 2-4 days worldwide.',
 '同人誌印刷は10冊から、コミケ前の24時間特急対応。中綴じ・無線綴じ・上製本の3種類、128gマット内蔵+250g表紙、無料校正4時間、DHL国際2-4日。',
 '同人誌印刷', 'Doujinshi Printing', '同人誌印刷',
 '同人誌印刷（中綴じ漫畫本）10 本起印，內頁 128g 啞粉紙四色印刷，封面 250g 銅版紙可局部 UV 或燙金。支援跨頁出血與 4 的倍數頁數規則，Comiket / 即賣會前可選 24-48 小時特急生產線，免費印前檢查解析度與出血。',
 'Print doujinshi from 10 copies — 128gsm matte interior, 250gsm cover with optional spot UV or foil. Supports spread bleed and 4-page-multiple signatures. 24-48h Comiket rush line available, free preflight check on resolution and bleed.',
 '同人誌印刷は10冊から。内蔵128gマット紙の4色印刷、表紙250gコート紙に局部UV・箔押し対応。見開き塗り足しと4の倍数ページ規則に準拠。コミケ前は24-48時間特急ライン、解像度・塗り足しの無料印前チェック付き。',
 '同人誌最少印幾多本？', '10 本起印。Comiket 特急單 24-48 小時生產，建議會前 3 天下單留運輸時間。',
 'Comiket 前趕得切嗎？', '得。24 小時特急生產線 + DHL 空運，日本 2-3 天到貨；港澳順豐次日。',
 '可以印彩色跨頁嗎？', '可以。128g 啞粉內頁支援全彩跨頁出血，裝訂留意騎馬釘中線 3mm 避字。',
 'zprintpro-doujin-doujinshi-printing-zh-hk.webp',
 '同人誌印刷 10本起印 | 香港同人誌印刷 中綴じ 騎馬釘 | 智印港',
 'Doujinshi Printing 10 MOQ | Saddle Stitch Comic Book | ZprintPro',
 '同人誌印刷 10冊〜 | 中綴じ コミケ対応 | ZprintPro',
 '同人周邊印刷→/zh-hk/category/japan-doujin/ | 聯繫我們→/contact/',
])
# ---- eco-tote-bag ----
R.append([
 '環保托特袋', 'Eco Tote Bag', 'エコトートバッグ', 'eco-tote-bag', '40',
 '環保托特袋 | 100%有機棉 | 10件起 ESG禮贈品 | 智印港',
 'Eco Tote Bag | 10 MOQ | Organic Cotton | ZprintPro',
 'エコトートバッグ｜オーガニックコットン｜10個〜｜ZprintPro',
 '環保托特袋,帆布袋印刷,有機棉袋,托特袋訂製,環保袋印刷,ESG 禮品,文創布袋,活動赠品袋,10件起印,棉布袋訂做',
 'eco tote bag,custom tote bags,organic cotton tote,canvas bag printing,eco friendly bags,ESG corporate gifts,tote bags bulk,custom printed tote,10 MOQ,reusable cotton bag',
 'エコトートバッグ,トートバッグ 印刷,オーガニックコットン,エコバッグ オリジナル,トートバッグ 作成,SDGs グッズ,綿バッグ 印刷,10個から,コットンバッグ,イベント バッグ',
 '環保托特袋 10 件起印，100% 有機棉 12oz 帆布，單色絲印或全彩熱轉印，ESG 企業禮贈品首選。免費打稿，5-7 個工作天交貨，DHL 全球 2-4 天。',
 'Eco tote bags from 10 MOQ, 12oz 100% organic cotton, single-colour screen print or full-colour heat transfer. ESG gifting favorite. Free proof, 5-7 day production, DHL 2-4 days worldwide.',
 'エコトートバッグは10個から、12ozオーガニックコットン100%。単色シルク印刷またはフルカラーヒート転写。SDGs ノベルティに最適。無料校正、5-7営業日、DHL 2-4日。',
 '環保托特袋', 'Eco Tote Bag', 'エコトートバッグ',
 '環保托特袋 10 件起印，12oz 有機棉帆布車縫，單面單色絲印最經濟，全彩圖案可轉熱轉印。適合 ESG 報告贈品、文創市集、活動紀念袋，可加拉鏈內袋與加固提手。',
 'Eco tote bags print from 10 units on 12oz organic cotton canvas. Single-colour screen print for budget runs, full-colour heat transfer for gradients. Add zip pockets and reinforced handles for retail-quality finish.',
 'エコトートバッグは10個から、12ozオーガニックコットン帆布。単色シルク印刷はコスパ最適、フルカラーはヒート転写。ファスナーポケットや補強ハンドルで販売品質に対応。',
 '環保袋幾多件起印？', '10 件起印。100 件以上單價明顯下降，500 件可議純棉升級。',
 '全彩圖案印唔印到？', '印到。熱轉印支援全彩漸變，絲印適合 1-3 色大色塊。',
 '有機棉有冇認證？', '有，GOTS 有機棉認證帆布，可出 ESG 採購證明文件。',
 'zprintpro-doujin-eco-tote-bag-zh-hk.webp',
 '環保托特袋 有機棉 12oz | 香港環保袋印刷 ESG 禮品 | 智印港',
 'Eco Tote Bag Organic Cotton 12oz | Custom Printed Cotton Bags | ZprintPro',
 'エコトートバッグ オーガニックコットン 12oz | 綿バッグ印刷 | ZprintPro',
 '同人周邊印刷→/zh-hk/category/japan-doujin/ | 聯繫我們→/contact/',
])
# ---- graduation-yearbook ----
R.append([
 '畢業紀念冊', 'Graduation Yearbook', '卒業記念アルバム', 'graduation-yearbook', '45',
 '香港畢業紀念冊 — 騎馬釘 / 膠裝 / 精裝 1 本起 | 智印港',
 'Graduation Yearbook | 1 MOQ | From $10.35 | ZprintPro',
 '卒業記念アルバム印刷｜1冊〜¥1350〜｜中綴じ｜ZprintPro',
 '畢業紀念冊,畢業紀念冊印刷,畢業冊,校刊印刷,校友會刊,社團特刊,紀念冊訂製,畢業相冊,1本起印,精裝畢業冊',
 'graduation yearbook printing,custom yearbooks,school yearbook,alumni magazine printing,class reunion book,memory book printing,1 MOQ,hardcover yearbook,leavers book',
 '卒業記念アルバム,卒業アルバム 印刷,卒業アルバム 1冊から,同窓会 記念誌,校史 特刊,クラブ 特刊,卒業アルバム 激安,卒アル 作成,卒業アルバム 注文,1冊〜',
 '畢業紀念冊 1 本起印，騎馬釘 / 無線膠裝 / 精裝 3 種，24-200 頁自由配頁，免費排版諮詢。5-7 個工作天交貨，滿 HK$500 順豐免運。',
 'Graduation yearbooks from 1 copy — saddle-stitch / perfect bound / hardcover, 24-200 pages, free layout consultation. 5-7 day turnaround, free US shipping over $99.',
 '卒業記念アルバムは1冊から。中綴じ・無線綴じ・上製本の3種類、24-200ページ自由設計。無料レイアウト相談、5-7営業日納期、全国配送。',
 '畢業紀念冊', 'Graduation Yearbook', '卒業記念アルバム',
 '畢業紀念冊 1 本起印，支援全班個人化（每冊不同姓名/相片）變資料印刷。騎馬釘適合 8-64 頁輕量冊，膠裝 64-200 頁精裝適合典藏版，封面可燙金校徽。3 月畢業季建議提前 4 週下單。',
 'Print one or 500 yearbooks with variable data — every copy personalized with student names and photos. Saddle-stitch for 8-64pp, perfect bound to 200pp, hardcover keepsake with foil-stamped crest. Order 4 weeks before March graduation season.',
 '卒業記念アルバムは1冊から、生徒ごとの名前・写真違いの可変印刷対応。中綴じは8-64P、無線綴じは200Pまで、上製本は箔押し校章で保存版に。3月卒業シーズンは4週間前注文推奨。',
 '畢業冊印 1 本都得？', '得。1 本起印，全班個人化每本不同名同相片都得，可變資料印刷。',
 '3 月畢業季幾時落單？', '建議畢業禮前 4 週。精裝燙金版加 3-5 天，急件有特急線。',
 '可以唔可以幫手排版？', '可以。免費排版諮詢，提供畢業冊模板，相片解析度 300dpi 即可。',
 'zprintpro-education-graduation-yearbook-zh-hk.webp',
 '畢業紀念冊印刷 1本起 | 香港畢業紀念冊 騎馬釘 精裝 | 智印港',
 'Graduation Yearbook 1 MOQ | Custom School Yearbooks Hardcover | ZprintPro',
 '卒業記念アルバム 1冊から | 中綴じ 上製本 対応 | ZprintPro',
 '校園印刷 pillar→/zh-hk/blog/campus-education-printing-pillar-guide/ | 聯繫我們→/contact/',
])
# ---- postcard-set ----
R.append([
 '明信片套裝', 'Postcard Set', 'ポストカードセット', 'postcard-set', '38',
 '明信片套裝 | 和紙風藝術紙 | 4套起 4小時打稿 | 智印港',
 'Washi Postcard Sets | 4 MOQ | Free Ship | ZprintPro',
 'ポストカードセット｜和紙風 4-8枚｜4セット〜｜ZprintPro',
 '明信片套裝,明信片印刷,明信片訂製,和紙明信片,藝術明信片,風景明信片,文創明信片,套裝明信片,4套起印,郵寄明信片',
 'postcard printing,custom postcards,washi postcards,art postcards,postcard sets,travel postcards,photo postcards bulk,4 MOQ,marketing postcards',
 'ポストカードセット,ポストカード 印刷,ポストカード 作成,和紙 ポストカード,アート ポストカード,絵葉書 印刷,観光 ポストカード,4セットから,オリジナル ポストカード',
 '明信片套裝 4 套起印，和紙風藝術紙 300g，每套 4-8 枚可混圖，4 小時免費打稿。文創市集 / 旅遊紀念 / 活動寄語適用，DHL 全球 2-4 天。',
 'Postcard sets from 4 MOQ on 300gsm washi-textured art paper, 4-8 cards per set with mixed designs, free 4-hour proof. Ideal for creative markets, travel souvenirs and events, DHL 2-4 days worldwide.',
 'ポストカードセットは4セットから、和紙風アート紙300g、1セット4-8枚で柄違い混在可。無料校正4時間。クリエイター市場・観光土産・イベントに最適、DHL 2-4日。',
 '明信片套裝', 'Postcard Set', 'ポストカードセット',
 '明信片套裝 4 套起印，300g 和紙風藝術紙單面或雙面印刷，圓角模切可選。每套 4-8 枚支援每枚不同圖，文創市集套裝銷售或企業活動寄語卡，背面可印郵寄格式直接寄出。',
 'Postcard sets print from 4 sets on 300gsm washi-textured stock, single or double sided with optional rounded corners. Each set holds 4-8 cards with different artwork per card — sell at creative markets or send as event mailers with pre-printed back.',
 'ポストカードセットは4セットから、300g和紙風アート紙の片面・両面印刷、角丸加工対応。1セット4-8枚で柄違い混在可。クリエイターズマーケット販売やイベントのダイレクトメールに、裏面郵便形式印刷でそのまま発送可能。',
 '明信片幾多套起印？', '4 套起印。每套 4-8 枚自由配，百套以上單價遞減。',
 '和紙質感係咩紙？', '300g 和紙風藝術紙，紋理細膩適合風景插畫，可配圓角模切。',
 '可以直接寄出嗎？', '可以。背面印郵寄格式（地址線+郵票框），貼郵票即可寄。',
 'zprintpro-doujin-postcard-set-zh-hk.webp',
 '明信片套裝 和紙風 300g | 香港明信片印刷 4套起 | 智印港',
 'Washi Postcard Sets 4 MOQ | Custom Art Postcards | ZprintPro',
 'ポストカードセット 和紙風 300g | 4セットから | ZprintPro',
 '同人周邊印刷→/zh-hk/category/japan-doujin/ | 聯繫我們→/contact/',
])

bad = [c for row in R for c in row if '"' in c or '\n' in c or '\t' in c]
assert not bad, 'forbidden chars in cells'
dupes = [row[3] for row in R if row[3] in EXISTING]
assert not dupes, 'already in CSV: %s' % dupes
assert all(len(row) == 31 for row in R), 'col count != 31: %s' % [len(r) for r in R]

with io.open(P, 'a', encoding='utf-8', newline='\n') as f:
    for row in R:
        f.write('\n' + '\t'.join(row))
print('appended %d rows: %s' % (len(R), [r[3] for r in R]))
