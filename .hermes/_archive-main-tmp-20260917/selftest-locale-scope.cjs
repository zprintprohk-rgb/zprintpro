#!/usr/bin/env node
/* 只读: 对新 locale 作用域守卫做「误报率 + 真阳性」双向验证
 *  A) src/data/blog-posts.ts 全量扫描: 期望 red 大幅下降 (原 50 red)
 *  B) 注入真违规 (zh-hk 字段写简体字 / zh-hk title 字段写 ZprintPro) -> 期望被抓
 */
const fs = require('fs');
const { execSync } = require('child_process');
const ROOT = 'F:\\zprintpro-main-tmp';
const sh = (c) => { try { return execSync(c, { cwd: ROOT, encoding: 'utf8', maxBuffer: 128 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] }); } catch (e) { return (e.stdout || '') + (e.stderr || ''); } };
const hist = (out) => {
  const h = {}; const lines = out.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) { const m = lines[i].match(/^\s*(🔴 HARD|🟡 SHADOW) \[(\w+)\]/); if (!m) continue; const r = (lines[i + 1] || '').match(/规则: (\S+)/); h[`${m[2]}/${r ? r[1] : '?'}`] = (h[`${m[2]}/${r ? r[1] : '?'}`] || 0) + 1; }
  return h;
};
console.log('A) blog-posts.ts 全量扫描 (修后):');
console.log('   ', JSON.stringify(hist(sh('node scripts/check-regression-guard.js src/data/blog-posts.ts'))));

// B) 真阳性注入
const TMP = ROOT + '\\src\\data\\__i18n-scope-selftest.ts';
fs.writeFileSync(TMP, [
  'export const bad = {',
  "  'zh-hk': '这页应被抓 (简体字残留)',",       // zh-hk 字段简体 -> I18N_POLLUTION
  '};',
  'export const badTitle = {',
  "  title: { 'zh-hk': '牛皮紙袋 | 智印港 ZprintPro' },", // zh-hk title 双品牌 -> BRAND_DOUBLE
  '};',
  'export const okJa = {',
  "  'ja': '会議・会社概要 ZprintPro ジープリント',",     // ja 字段: 会 合法; ジープリント+ZprintPro 同现 -> BRAND_JA_ALTERNATE(orange)
  '};',
].join('\n') + '\n', 'utf8');
const out = sh('node scripts/check-regression-guard.js src/data/__i18n-scope-selftest.ts');
fs.unlinkSync(TMP);
console.log('\nB) 注入真违规后 (期望: 抓到 简体zh-hk + 双品牌):');
console.log('   ', JSON.stringify(hist(out)));
console.log(out.split(/\r?\n/).filter(l => /🔴|🟡/.test(l)).slice(0, 6).join('\n'));
