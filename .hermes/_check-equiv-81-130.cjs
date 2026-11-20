const { equiv, band } = require('../scripts/guards/title-equiv.js');
const S = '｜';
const titles = [
  ['small-bags|zh-hk', `小號紙袋印刷${S}多尺寸 白卡牛皮${S}100個起 DHL 2-4天${S}智印港`],
  ['small-bags|en', 'Custom Small Paper Bags | 100 MOQ | Free Ship | ZprintPro'],
  ['small-bags|ja', `小型紙袋${S}100個〜 即日発送${S}白カード 多サイズ${S}ZprintPro`],
  ['large-bags|en', 'Custom Large Paper Bags | 100 MOQ $3.45 | ZprintPro'],
  ['large-bags|ja', `大型紙袋${S}100枚〜 ¥450〜${S}エコ素材 多サイズ${S}ZprintPro`],
  ['a4-flyers|ja', `A4 チラシ${S}両面フルカラー${S}10枚〜 ¥70〜${S}ZprintPro`],
  ['a5-flyers|ja', `A5 チラシ${S}両面フルカラー${S}10枚〜 ¥50〜${S}ZprintPro`],
  ['double-sided-flyers|zh-hk', '雙面傳單印刷 | 圓角 覆膜 | 10張起印 HK$0.40起 | 智印港'],
  ['folded-leaflets|ja', `折りたたみパンフレット${S}三つ折り${S}10枚〜 ¥110${S}ZprintPro`],
  ['thick-paper-flyers|ja', `厚紙チラシ${S}両面フルカラー${S}10枚〜 ¥95〜${S}ZprintPro`],
  ['eco-flyers|ja', `エコチラシ${S}再生紙 フルカラー${S}10枚〜 ¥75〜${S}ZprintPro`],
  ['display-posters|ja', `展示用ポスター${S}防水 PP 翌日発送${S}1枚〜 ¥960〜${S}ZprintPro`],
  ['art-posters|ja', `アートポスター${S}美術紙 Giclée${S}1枚〜 ¥780〜${S}ZprintPro`],
  ['mailer-boxes|en', 'Custom Kraft Mailer Boxes | 100 MOQ $0.80 | ZprintPro'],
  ['mailer-boxes|ja', `発送箱 メーラーボックス${S}100個〜 ¥105〜${S}ZprintPro`],
  ['folding-boxes|zh-hk', '折疊盒印刷訂製 | 燙金 UV | 100個起 HK$2.5起 | 智印港'],
  ['folding-boxes|ja', `折りたたみ箱${S}箔押し ラミネート${S}100枚〜 ¥69〜${S}ZprintPro`],
  ['rigid-boxes|en', 'Rigid Boxes | 100 MOQ $1.84 | Free Ship | ZprintPro'],
  ['rigid-boxes|ja', `上製本箱（リジッドボックス）${S}100個〜 ¥240〜${S}ZprintPro`],
  ['foil-red-packets|zh-hk', '燙金利是封印刷 | 燙金 局部UV | 100個起 HK$1.10起 | 智印港'],
  ['foil-red-packets|en', 'Foil Red Packets | Gold Foil | 100 MOQ $0.46 | ZprintPro'],
  ['foil-red-packets|ja', `箔押しポチ袋${S}金箔 UV エンボス${S}100枚〜 ¥64〜${S}ZprintPro`],
  ['embossed-red-packets|en', '3D Embossed Red Packets | 100 MOQ $0.92 | ZprintPro'],
  ['embossed-red-packets|ja', `エンボスポチ袋${S}箔押し UV${S}100枚〜 ¥129〜${S}ZprintPro`],
  ['custom-red-packets|zh-hk', '定制利是封印刷 | 燙金 UV 壓紋 | 100個起 HK$1.9起 | 智印港'],
  ['custom-red-packets|en', 'Custom Red Packets | 100 MOQ $0.74 | 4-Day | ZprintPro'],
  ['cartoon-red-packets|zh-hk', '卡通利是封印刷 | 燙金 局部UV | 100個起 HK$1.10起 | 智印港'],
  ['cartoon-red-packets|en', 'Custom Cartoon Red Packets | 100 MOQ $0.46 | ZprintPro'],
  ['cartoon-red-packets|ja', `キャラクターポチ袋${S}イラスト${S}100枚〜 ¥64〜${S}ZprintPro`],
  ['eco-red-packets|en', 'Eco Red Packets | 100 MOQ $0.74 | Free Ship | ZprintPro'],
  ['eco-red-packets|ja', `エコポチ袋${S}再生紙 箔押し${S}100枚〜 ¥103〜${S}ZprintPro`],
  ['large-red-packets|zh-hk', '大號利是封印刷 | 燙金 局部UV | 100個起 HK$2.20起 | 智印港'],
  ['large-red-packets|en', 'Large Red Packets | 100 MOQ $0.92 | Free Ship | ZprintPro'],
  ['large-red-packets|ja', `大判ポチ袋${S}箔押し UV 厚紙${S}100枚〜 ¥129〜${S}ZprintPro`],
  ['wall-calendars|ja', `壁掛けカレンダー${S}ノベルティ${S}1冊〜 ¥50〜${S}ZprintPro`],
  ['desk-calendars|en', 'Desk Calendars | 1 MOQ $0.40 Bulk 300+ | ZprintPro'],
  ['photo-frame-calendars|en', 'Custom Photo Frame Calendars | 1 MOQ $0.40 | ZprintPro'],
  ['photo-frame-calendars|ja', `フォトフレームカレンダー${S}置き型${S}1冊〜 ¥50〜${S}ZprintPro`],
  ['magnetic-calendars|ja', `マグネットカレンダー${S}ノベルティ${S}1冊〜 ¥50〜${S}ZprintPro`],
  ['hardcover-menus|ja', `高級メニュー${S}上製本 箔押し${S}10冊〜 ¥1288〜${S}ZprintPro`],
  ['drink-menus|en', 'Drink Menus | 10 MOQ $3.68 | Waterproof | ZprintPro'],
  ['drink-menus|ja', `ドリンクメニュー${S}10枚〜 ¥515〜${S}防水 マット${S}ZprintPro`],
  ['disposable-menus|en', 'Disposable Menus | 100 MOQ $0.14 | Free Ship | ZprintPro'],
  ['disposable-menus|ja', `使い捨てメニュー${S}100枚〜 ¥20〜${S}防水 マット${S}ZprintPro`],
  ['outdoor-vinyl-banners|ja', `屋外ビニールバナー${S}高画質 PVC${S}1個〜 ¥360〜${S}ZprintPro`],
];
let bad = 0;
for (const [k, t] of titles) {
  const b = band(t);
  if (b !== 'OK') { bad++; console.log(`🔴 ${k} equiv=${equiv(t)} (${b})  ${t}`); }
}
console.log(bad ? `${bad} 條超帶` : `全部 ${titles.length} 條在帶內`);
titles.forEach(([k, t]) => { if (band(t) === 'OK') console.log(`✅ ${k} equiv=${equiv(t)}`); });
