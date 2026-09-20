// 修正: 并发车道 43945538 把 ja 标题的中文量词写进了日文
//   「ドリンクメニュー 印刷 | 防水 マット 10份〜 | ZprintPro」
//   「份」= 中文量词 (zh-hk 的 unitLabel)；日文量词应为 枚 (张/片)。
//   ⇒ 属「跨语言量词污染」, 且 i18n 门童的繁简字表不覆盖「份」(简繁同形) ⇒ 门禁漏检。
// 手法: 结构定位 + 全文唯一 + 当量断言 (仍须落 [50,57])
const fs = require('node:fs');
const { equiv, TITLE_MIN, TITLE_MAX } = require('./guards/title-equiv.js');
const FILE = 'src/data/sku-seo-data.ts';
let src = fs.readFileSync(FILE, 'utf8');
const OLD = '"title": "ドリンクメニュー 印刷 | 防水 マット 10份〜 | ZprintPro"';
const NEW = '"title": "ドリンクメニュー 印刷 | 防水 マット 10枚〜 | ZprintPro"';

const hits = src.split(OLD).length - 1;
if (hits !== 1) { console.log(`🔴 旧串命中 ${hits} 次 (需 1) → 未落盘`); process.exit(1); }
const t = NEW.match(/"title": "((?:[^"\\]|\\.)*)"/)[1];
const e = equiv(t);
if (e < TITLE_MIN || e > TITLE_MAX) { console.log(`🔴 当量 ${e} 越界 → 未落盘`); process.exit(1); }
console.log(`✅ 当量=${e}  ${t}`);
// 附加断言: 新标题不得含中文繁体专用字/中文量词
if (/[份張本個]/.test(t.replace(/印刷|分/g, ''))) console.log('⚠️ 仍含可疑中文量词, 请人读');
if (process.argv.includes('--apply')) {
  fs.writeFileSync(FILE, src.split(OLD).join(NEW), 'utf8');
  console.log(`💾 已写入 ${FILE}`);
} else console.log('(dry-run) 加 --apply');
