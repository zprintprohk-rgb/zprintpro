const { equiv, band, TITLE_MIN, TITLE_MAX } = require('F:/zprintpro-nextjs/scripts/guards/title-equiv.js');
const cands = {
  'custom-red-packets|ja': 'オリジナルポチ袋印刷 | 箔押し UV | 100枚〜 ¥103〜 | ZprintPro',
  'custom-calendars|ja': 'オリジナルカレンダー 印刷 | 業務用 | 1冊〜 ¥50〜 | ZprintPro',
  'mini-calendars|ja': 'ミニカレンダー印刷 | 2027 ノベルティ | 1冊〜 ¥50〜 | ZprintPro',
  'double-sided-flyers|ja': '両面チラシ印刷 | フルカラー 10枚〜 | ¥85〜 | ZprintPro',
  'roll-up-banners|ja': 'ロールアップバナー | アルミスタンド | 1個〜 ¥6,440〜 | ZprintPro',
  'a4-flyers|en': 'A4 Flyer Printing | 10 MOQ | From $0.55 | ZprintPro',
  'thick-paper-flyers|en': 'Thick Paper Flyers | 10 MOQ | From $0.70 | ZprintPro',
  'outdoor-vinyl-banners|en': 'Outdoor Vinyl Banners | 1 MOQ | From $2.76 | ZprintPro',
  'eco-flyers|en': 'Eco Flyers | Recycled Paper | 10 MOQ $0.60 | ZprintPro',
  'vehicle-wraps|en': 'Vehicle Wraps | 3M Vinyl | 1 MOQ From $6.44 | ZprintPro',
  'graduation-yearbook|en': 'Graduation Yearbook | 1 MOQ | From $10.35 | ZprintPro',
  'kraft-paper-packaging-box|ja': 'クラフト紙包装箱 特注 エコ 300個〜 ¥150〜 | ZprintPro',
};
for (const [k, t] of Object.entries(cands)) {
  const e = equiv(t);
  const ok = e >= TITLE_MIN && e <= TITLE_MAX ? 'OK' : `FAIL(<${TITLE_MIN} or >${TITLE_MAX})`;
  console.log(`${ok}  eq=${e} band=${band(t)}  [${k}] ${t}`);
}
