// 精确统计本次价格改动处数 (备份 vs 当前)
const fs = require('fs');
const path = require('path');
const BAK = '.hermes/_bak-calendar-price-20260918';
const PAIRS = [
  ['zh-hk.json', path.join(BAK, 'zh-hk.json')],
  ['en.json', path.join(BAK, 'en.json')],
  ['ja.json', path.join(BAK, 'ja.json')],
];
const FROM = {
  'zh-hk.json': ['HK$3-8/本', 'HK$14-57/本', '單本 HK$3-15，平均 HK$8。', '單本 HK$3-15。'],
  'en.json': ['from $0.40/pc', '<strong>$0.40/pc</strong>', 'US$1.80-7.30', '$0.40-1.90/pc', '$0.40/pc'],
  'ja.json': ['1部50円から', '1冊280〜1,140円', '$0.40-1.90/冊'],
};
const cnt = (h, n) => h.split(n).length - 1;
let total = 0;
for (const [name, bakPath] of PAIRS) {
  const before = fs.readFileSync(path.join(BAK, name), 'utf8');
  const beforeP2 = fs.existsSync(path.join(BAK, name + '.before-patch2'))
    ? fs.readFileSync(path.join(BAK, name + '.before-patch2'), 'utf8') : null;
  const now = fs.readFileSync(path.join('src/data/blog-data', name), 'utf8');
  // 逐条 from 串的全文本净减 (同 from 多规则求和即等于净减)
  let fileTotal = 0;
  for (const f of FROM[name]) {
    const ref = (name === 'en.json' && f === '$0.40/pc') ? before : before; // patch2 的 3 处在首次替换后仍在, 故对 before 净减=全部
    const d = cnt(ref, f) - cnt(now, f);
    if (d > 0) { console.log(`${name} :: "${f}" 净减 ${d}`); fileTotal += d; }
  }
  console.log(`${name} 小计: ${fileTotal}  (patch2 前版本存在? ${!!beforeP2})`);
  total += fileTotal;
}
console.log(`\n总计改动处数: ${total}`);
