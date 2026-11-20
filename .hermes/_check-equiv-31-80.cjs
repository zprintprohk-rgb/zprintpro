const { equiv, band } = require('../scripts/guards/title-equiv.js');
const J = (n) => String(n).replace(/,/g, ''); // 日價去千分位
const S = '｜'; // 緊湊全角分隔符（上批控當量手段）
const titles = [
  ['graduation-yearbook|ja', `卒業記念アルバム印刷${S}1冊〜¥${J(1350)}〜${S}中綴じ${S}ZprintPro`],
  ['textbooks|ja', `教科書印刷${S}中綴じ 無線綴じ${S}100冊〜¥${J(1288)}〜${S}ZprintPro`],
  ['kraft-paper-packaging-box|en', 'Custom Kraft Packaging Box | 300 MOQ $1.15 | ZprintPro'],
  ['a1-posters|zh-hk', 'A1 大幅海報 厚紙 | 1張起印 HK$45起 4小時打稿 | 智印港'],
  ['a1-posters|en', 'A1 Poster Printing | 594×841mm | 1 MOQ $4.60 | ZprintPro'],
  ['business-envelopes|ja', `ビジネス封筒${S}DL/C5/C4 窓付き${S}100枚〜¥20〜${S}ZprintPro`],
  ['waterproof-stickers|en', 'Waterproof Stickers | PVC | 10 MOQ $0.32 | ZprintPro'],
  ['small-batch-stickers|ja', '小ロットステッカー | 10枚〜 ¥69〜 | 防水PVC | ZprintPro'],
  ['eco-paper-bags|en', 'Eco Paper Bags | FSC Kraft | 100 MOQ $1.84 | ZprintPro'],
  ['hardcover-menus|en', 'Hardcover Menus | Leatherette | 10 MOQ $9.20 | ZprintPro'],
  ['double-sided-flyers|en', 'Custom Double-Sided Flyers | 10 MOQ $0.65 | ZprintPro'],
  ['catalog-printing|ja', `カタログ印刷${S}箔押し ラミネート${S}10枚〜¥${J(644)}〜${S}ZprintPro`],
  ['die-cut-stickers|ja', `ダイカットステッカー${S}防水PVC${S}10枚〜¥60〜${S}ZprintPro`],
  ['eco-flyers|zh-hk', '環保傳單印刷 | 圓角 覆膜 | 10張起印 HK$0.38起 | 智印港'],
  ['wall-calendars|en', 'Wall Calendars | 1 MOQ $0.40 Bulk 300+ | ZprintPro'],
  ['roll-up-banners|en', 'Roll-up Banners | Wind-Resistant | 1 MOQ $46 | ZprintPro'],
  ['handle-bags|en', 'Handle Paper Bags | Rope | 100 MOQ $1.84 | ZprintPro'],
  ['desk-calendars|ja', `卓上カレンダー${S}ノベルティ 定番${S}1冊〜¥50〜${S}ZprintPro`],
  ['business-envelopes|en', 'Business Envelopes | DL C5 C4 | 100 MOQ $0.14 | ZprintPro'],
  ['eco-tote-bag|ja', `エコトートバッグ${S}オーガニックコットン${S}10個〜${S}ZprintPro`],
  ['outdoor-posters|en', 'Outdoor Posters | Vinyl PVC | 1 MOQ $3.68 | ZprintPro'],
  ['display-posters|en', 'Display Posters | Foam & Gator | 1 MOQ $7.36 | ZprintPro'],
  ['folding-boxes|en', 'Folding Boxes | Auto-Lock | 100 MOQ $0.51 | ZprintPro'],
  ['photo-frame-calendars|zh-hk', '相框年曆 | 騎馬釘 1本起印 HK$3起 4小時打稿 | 智印港'],
  ['disposable-menus|zh-hk', '一次性餐牌 | 防水 圓角 | 100起印 HK$0.22起 | 智印港'],
  ['perfect-bound-books|zh-hk', '無線膠裝書籍印刷 | 覆膜 膠裝 | 10本起印 HK$16起 | 智印港'],
  ['foil-greeting-cards|en', 'Foil-Stamped Business Cards | 10 MOQ $0.23 | ZprintPro'],
  ['kraft-paper-bags|ja', `クラフト紙袋${S}箔押し ラミネート${S}100枚〜¥${J(240)}〜${S}ZprintPro`],
  ['folded-leaflets|en', 'Folded Leaflets | Tri-Fold | 10 MOQ $0.80 | ZprintPro'],
  ['art-posters|en', 'Art Posters | Archival Matte | 1 MOQ $5.98 | ZprintPro'],
  ['laminated-menus|en', 'Laminated Menus | Wipeable | 10 MOQ $1.84 | ZprintPro'],
  ['magnetic-closure-gift-box|ja', `マグネット式ギフトボックス${S}100個〜¥${J(450)}〜${S}ZprintPro`],
  ['removable-stickers|ja', `はがせるステッカー${S}再剥離${S}10枚〜¥46〜${S}ZprintPro`],
  ['foil-stickers|ja', '箔押しステッカー | 金銀箔 防水 | 10枚〜 ¥64〜 | ZprintPro'],
  ['security-stickers|ja', `セキュリティステッカー${S}防水 PVC${S}10枚〜¥51〜${S}ZprintPro`],
  ['white-card-bags|en', 'White Card Bags | Art Card | 100 MOQ $2.76 | ZprintPro'],
  ['gift-bags|en', 'Gift Paper Bags | Ribbon | 100 MOQ $4.60 | ZprintPro'],
  ['gift-bags|ja', 'ギフト紙袋 | 箔押し リボン | 100枚〜 ¥600〜 | ZprintPro'],
  ['handle-bags|ja', `手提げ紙袋${S}マルチサイズ${S}100枚〜¥${J(240)}〜${S}ZprintPro`],
];
let bad = 0;
for (const [k, t] of titles) {
  const b = band(t);
  if (b !== 'OK') { bad++; console.log(`🔴 ${k} equiv=${equiv(t)} (${b})  ${t}`); }
  else console.log(`✅ ${k} equiv=${equiv(t)}`);
}
console.log(bad ? `\n${bad} 條超帶` : '\n全部在帶內');
