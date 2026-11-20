const { equiv, band } = require('F:/zprintpro-nextjs/scripts/guards/title-equiv.js');
const groups = {
  'custom-red-packets|ja': [
    'オリジナルポチ袋印刷 | 箔押し UV | 100枚〜 ¥103〜 | ZprintPro',
    'オリジナルポチ袋印刷 | 箔押し | 100枚〜 ¥103〜 | ZprintPro',
    'オリジナルポチ袋 | 箔押し UV | 100枚〜 ¥103〜 | ZprintPro',
    'オリジナルポチ袋印刷 箔押し 100枚〜 ¥103〜 | ZprintPro',
    'オリジナルポチ袋印刷 箔押し UV 100枚〜 ¥103〜 | ZprintPro',
  ],
  'custom-calendars|ja': [
    'オリジナルカレンダー 印刷 | 業務用 | 1冊〜 ¥50〜 | ZprintPro',
    'オリジナルカレンダー | 業務用 | 1冊〜 ¥50〜 | ZprintPro',
    'オリジナルカレンダー | 小ロット | 1冊〜 ¥50〜 | ZprintPro',
    'オリジナルカレンダー 印刷 業務用 1冊〜 ¥50〜 | ZprintPro',
  ],
  'mini-calendars|ja': [
    'ミニカレンダー印刷 | 2027 ノベルティ | 1冊〜 ¥50〜 | ZprintPro',
    'ミニカレンダー | 2027 ノベルティ | 1冊〜 ¥50〜 | ZprintPro',
    'ミニカレンダー | ノベルティ | 1冊〜 ¥50〜 | ZprintPro',
    'ミニカレンダー 2027 ノベルティ 1冊〜 ¥50〜 | ZprintPro',
  ],
  'roll-up-banners|ja': [
    'ロールアップバナー | アルミスタンド | 1個〜 ¥6,440〜 | ZprintPro',
    'ロールアップバナー | アルミスタンド | 1個〜 | ZprintPro',
    'ロールアップバナー アルミスタンド 1個〜 ¥6,440〜 | ZprintPro',
    'ロールアップバナー アルミスタンド 1個〜¥6,440〜 | ZprintPro',
  ],
};
for (const [k, list] of Object.entries(groups)) {
  console.log(`### ${k}`);
  for (const t of list) {
    const e = equiv(t);
    const ok = e >= 50 && e <= 57 ? 'OK ' : 'FAIL';
    console.log(`  ${ok} eq=${e} band=${band(t)} :: ${t}`);
  }
}
