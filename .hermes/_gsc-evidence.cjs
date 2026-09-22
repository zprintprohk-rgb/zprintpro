// 修复候选证据: GSC 28d 查询表中各候选长尾词的实证
const fs = require('fs');
const g = JSON.parse(fs.readFileSync('F:/zprintpro-nextjs/.hermes/gsc-2026-09-18/extract.json', 'utf8'));
const queries = g.new.combo_28d['查询数'];
const BRAND_RE = /智印港|ZprintPro|zprintpro|ジープリント/i;
const needles = {
  'en-doujinshi': ['doujinshi', 'doujin printing', 'comiket', '同人誌'],
  'en-exercise': ['exercise book', 'workbook', 'school exercise'],
  'en-pvc-menu': ['pvc menu', 'restaurant menu printing', 'waterproof menu'],
  'en-fluorescent': ['fluorescent sticker', 'neon sticker'],
  'en-transparent': ['transparent sticker', 'clear sticker', 'die cut sticker'],
  'en-vehicle': ['vehicle wrap', 'car wrap', 'van wrap'],
  'en-textbook': ['textbook', 'text book printing'],
  'en-smallbatch': ['small batch sticker', 'custom sticker low', 'sticker printing'],
  'ja-rollup': ['ロールアップ', '易拉宝', 'バナー印刷'],
  'ja-minical': ['ミニカレンダー', '卓上カレンダー', 'カレンダー印刷'],
  'ja-redpacket': ['年賀状', 'ポチ袋', 'お年玉'],
  'ja-customcal': ['カスタムカレンダー', 'オリジナルカレンダー', 'ノベルティカレンダー'],
};
for (const [k, ws] of Object.entries(needles)) {
  console.log('=== ' + k);
  const hits = queries.filter((q) => {
    const qn = q['热门查询'];
    if (!qn || BRAND_RE.test(qn)) return false;
    return ws.some((w) => qn.toLowerCase().includes(w.toLowerCase()));
  }).sort((a, b) => (b['展示'] || 0) - (a['展示'] || 0));
  for (const h of hits.slice(0, 8)) {
    console.log(`  ${h['热门查询']}  imp=${h['展示']} clk=${h['点击次数']} pos=${h['排名']}`);
  }
  if (!hits.length) console.log('  (no hits)');
}
