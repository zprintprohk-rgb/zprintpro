/** 补丁: 清掉与 100 本起印矛盾的最后两句「無最低起印量限制」 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const F = 'src/data/blog-data/zh-hk.json';
const SLUG = 'saddle-stitch-booklet-printing-guide';
const FROM = '無最低起印量限制';
const TO = '100 本起印';
const raw = fs.readFileSync(path.join(ROOT, F), 'utf8');
const i = raw.indexOf('"slug": "' + SLUG + '"');
const j = raw.indexOf('"slug":', i + 10);
const seg = raw.slice(i, j);
const n = seg.split(FROM).length - 1;
console.log(`窗口内 "${FROM}" = ${n} (期望 2)`);
if (n !== 2) { console.error('❌ 计数断言未过, 拒绝写盘'); process.exit(1); }
const out = raw.slice(0, i) + seg.split(FROM).join(TO) + raw.slice(j);
JSON.parse(out);
fs.writeFileSync(path.join(ROOT, F), out, 'utf8');
const now = fs.readFileSync(path.join(ROOT, F), 'utf8');
const i2 = now.indexOf('"slug": "' + SLUG + '"');
const seg2 = now.slice(i2, now.indexOf('"slug":', i2 + 10));
console.log(`写后窗口残留 ${seg2.split(FROM).length - 1} (期望 0) / 全文残留 ${now.split(FROM).length - 1}`);
if (seg2.includes(FROM)) { console.error('❌ 形状断言未过'); process.exit(1); }
console.log('✅ 补丁完成');
