'use strict';
/**
 * ① 確認 GeoFooterText.tsx 的「渲染字串」(TEXT 物件值) 已無簡體 (註解不算, 非客戶可見)
 * ② category 對齊: self-publishing → photo-book 同語系同值 (K3 裁定 1)
 *    安全三件套: 備份 + 計數/形狀斷言 + 寫後複驗
 */
const fs = require('fs');
const path = require('path');
const ROOT = 'F:\\zprintpro-nextjs';
const SIMP = '们个为无与书车门问说时东华产国学体线标签页单价简边发对开关电话后从这来让给还两么义应该当经历众飞机场击视频听读写语词记录买卖贵贱农医乐儿长张纸费计认识种类别离继续断错谁务动员双画数际专亚达诺论约伦纽';
const RE = new RegExp('[' + SIMP + ']', 'g');

/* ① 抽 TEXT 物件的字串值 (略過註解行) */
const f = path.join(ROOT, 'src', 'components', 'seo', 'GeoFooterText.tsx');
const lines = fs.readFileSync(f, 'utf8').split('\n');
const inText = { on: false };
const valueLines = [];
let started = false;
for (const l of lines) {
  if (/^const TEXT: Record<Locale, string> = \{/.test(l)) { started = true; continue; }
  if (started && /^\};/.test(l)) break;
  if (!started) continue;
  if (/^\s*(\/\/|\*|\/\*)/.test(l)) continue;   // 註解不算
  valueLines.push(l);
}
const valueText = valueLines.join('\n');
const zhLine = valueLines.find(l => l.includes("'zh-hk'"));
const zhOnly = valueLines.filter(l => l.includes('智印港') || /^\s*'/.test(l)).join('');
const hits = [...new Set([...valueText.matchAll(RE)].map(m => m[0]))];
console.log('① 渲染字串 (TEXT 值, 略過註解) 簡體專用字: ' + (hits.length ? '★ ' + hits.join('') : '0 ✅'));
console.log('   zh-hk 首行: ' + (zhLine || '(未找到)').trim().slice(0, 100));

/* ② category 對齊 */
const DATA = path.join(ROOT, 'src', 'data', 'blog-data');
const BAK = path.join(ROOT, '.hermes', '_bak-category-align-20260918');
const SP = 'self-publishing-printing-guide', PB = 'photo-book-printing-guide';
const LOCS = ['zh-hk', 'en', 'ja'];
const plan = {};
const errors = [];
for (const loc of LOCS) {
  const p = path.join(DATA, loc + '.json');
  const obj = JSON.parse(fs.readFileSync(p, 'utf8'));
  if (!obj[SP] || !obj[PB]) errors.push(loc + ': 缺 slug');
  const before = obj[SP].category, target = obj[PB].category;
  plan[loc] = { p, obj, before, target };
  if (typeof target !== 'string' || !target.trim()) errors.push(loc + ': photo-book category 為空, 拒絕對齊');
  console.log(`   ${loc}: ${JSON.stringify(before)} → ${JSON.stringify(target)}`);
}
if (errors.length) { console.error('❌ 前置斷言未過: ' + errors.join(' | ')); process.exit(1); }

if (process.argv.includes('--apply')) {
  fs.mkdirSync(BAK, { recursive: true });
  for (const loc of LOCS) fs.copyFileSync(plan[loc].p, path.join(BAK, loc + '.json'));
  for (const loc of LOCS) {
    const { p, obj, target } = plan[loc];
    obj[SP].category = target;
    fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n', 'utf-8');
    const back = JSON.parse(fs.readFileSync(p, 'utf8'));
    const ok = back[SP].category === target && back[PB].category === target
      && Object.keys(back).length === 92 && back[SP].content.length > 3000;
    console.log(`   ${loc} 寫入 → category=${JSON.stringify(back[SP].category)} 複驗 ${ok ? 'OK' : '★FAIL'}`);
    if (!ok) { console.error('❌ 複驗失敗, 回滾'); fs.copyFileSync(path.join(BAK, loc + '.json'), p); process.exit(1); }
  }
  console.log('✅ category 對齊完成; 備份: ' + BAK);
} else {
  console.log('\n(dry-run; 加 --apply 才寫盤)');
}
