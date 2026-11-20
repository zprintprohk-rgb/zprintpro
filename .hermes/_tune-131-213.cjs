const fs = require('fs');
const F = '.hermes/title-quality-proposals-20260921-b131-213.json';
const j = JSON.parse(fs.readFileSync(F, 'utf8'));
const R = {
  'adhesive-banners|ja': '粘着バナー｜透明 PP 防水加工｜1枚〜 ¥300〜｜ZprintPro',
  'vehicle-wraps|ja': 'カーラッピング｜フルラップ対応｜1台〜 ¥840〜｜ZprintPro',
  'exercise-books|ja': 'ワークブック印刷｜中綴じ対応｜10冊〜 ¥258〜｜ZprintPro',
  'electronics-packaging-box|ja': '電子製品包装箱｜箔押し対応｜200個〜¥240〜｜ZprintPro',
  'hardcover-books|zh-hk': '精裝書籍印刷 | 硬殼燙金 | 10本起 HK$40起 免費打稿 | 智印港',
  'certificates|en': 'Certificates | 100 MOQ $2.76 | 4-Day Proof | ZprintPro',
  'large-envelopes|en': 'Large Envelopes | 100 MOQ $0.28 | C4 A4 Flat | ZprintPro',
  'fruit-food-label-stickers|en': 'Fruit & Food Label Stickers | 500 MOQ $0.23 | ZprintPro',
  'acrylic-keychain|ja': 'アクリルキーホルダー｜推し活 キャラ型｜10個〜｜ZprintPro',
  'magnetic-closure-gift-box|en': 'Magnetic Closure Gift Box | 100 MOQ $3.45 | ZprintPro',
  'gang-run-card-boxes|en': 'Gang-Run Card Boxes | 500 MOQ | Die-Cut Free | ZprintPro',
  'tuck-end-boxes|en': 'Custom Tuck End Boxes | 500 MOQ | 8-15 Day | ZprintPro',
  'eco-tote-bag|en': 'Eco Tote Bag | 10 MOQ | Organic Cotton | ZprintPro',
  'premium-greeting-cards|ja': 'プレミアムグリーティングカード｜10枚〜¥20〜｜ZprintPro',
  'spot-uv-greeting-cards|en': 'Spot UV Greeting Cards | 10 MOQ $0.18 | ZprintPro',
  'spot-uv-greeting-cards|ja': '部分UVグリーティングカード｜マット｜10枚〜¥27〜｜ZprintPro',
  'matte-greeting-cards|en': 'Matte Greeting Cards | 10 MOQ $0.14 | Soft-Touch |ZprintPro',
  'matte-greeting-cards|ja': 'マットグリーティングカード｜指紋防止｜10枚〜 ¥21｜ZprintPro',
  'rounded-corner-greeting-cards|en': 'Rounded Corner Greeting Cards | 10 MOQ $0.13 | R3mm |ZprintPro',
  'rounded-corner-greeting-cards|ja': '角丸グリーティングカード｜R3mm丸角｜10枚〜 ¥20｜ZprintPro',
  'thick-greeting-cards-400g|en': 'Thick 400g Business Cards | 10 MOQ $0.15 | ZprintPro',
  'thick-greeting-cards-400g|ja': '厚口名刺｜400g 箔押し・エンボス｜10枚〜¥23〜｜ZprintPro',
  'foil-greeting-cards|ja': '箔押し名刺｜金銀 ローズゴールド｜10枚〜¥35〜｜ZprintPro',
  'cafe-table-cards|ja': 'カフェテーブルカード｜PVC防水 スタンド｜50枚〜｜ZprintPro',
  'foil-wedding-invitations|en': 'Foil Wedding Invitations | 50 MOQ | Gold & Silver|ZprintPro',
  'name-tags-badges|ja': '名札｜会議・イベント用 磁石対応｜50枚〜｜ZprintPro',
  'save-the-date-cards|zh-hk': 'Save the Date 卡片|A6 燙金UV|50套起 HK$0.85起|智印港',
  'wedding-menu-cards|en': 'Wedding Menu Cards | 50 MOQ | A5 Foil Print | ZprintPro',
  'wedding-seating-charts|ja': '披露宴座席表｜A1/A2サイズ 箔押し｜50枚〜｜ZprintPro',
};
let n = 0;
for (const p of j.proposals) {
  const k = `${p.slug}|${p.locale}`;
  if (R[k] && p.title) { p.title = R[k]; n++; }
}
fs.writeFileSync(F, JSON.stringify(j, null, 2));
console.log('tuned', n, 'titles');
