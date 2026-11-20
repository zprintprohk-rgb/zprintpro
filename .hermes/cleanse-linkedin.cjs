/**
 * cleanse-linkedin.cjs — 撤除 blog-data 内全部 LinkedIn 链接 (K3 2026-09-13 拍板)
 *
 * K3 口径: 「直接撤，因为真的 LinkedIn 也没内容，也没发过关于智印港的内容」
 *   -> 不限 engineer/editor 变体, blog-data 内**所有** linkedin.com URL 一律撤除
 *   注意: 仅限 blog-data 内容层; Organization schema 的 sameAs(§13.16.1 拍板策略) 不在本次范围
 *
 * 相对首版的两处修正:
 *   ① URL 位于内嵌 JSON-LD 字符串内, 外层 JSON 中引号是转义的 \"...\" -> 正则容忍 \\?
 *   ② 数组删除需位置感知: 先删「带尾逗号」的(非末位), 再删「带首逗号」的(末位), 避免 [, / ,]
 * 安全: 先枚举变体 -> 干跑 -> 断言(残留0 / 无逗号残渣 / JSON.parse) -> 才写盘 + 备份
 *
 * 用法: node .hermes/cleanse-linkedin.cjs          # 干跑
 *       node .hermes/cleanse-linkedin.cjs --apply
 */
const fs = require('fs');
const path = require('path');

const APPLY = process.argv.includes('--apply');
const DIR = 'src/data/blog-data';
const FILES = ['zh-hk.json', 'en.json', 'ja.json'];
const URL_RE = /\\?"(https:\/\/[^"\\]*linkedin\.com\/[^"\\]*)\\?"/g;

// ── 1) 枚举全部变体 ───────────────────────────────────────────
console.log('=== 枚举 LinkedIn URL 变体 ===');
const variants = new Map();
for (const f of FILES) {
  const t = fs.readFileSync(path.join(DIR, f), 'utf8');
  for (const m of t.matchAll(URL_RE)) variants.set(m[1], (variants.get(m[1]) || 0) + 1);
}
for (const [u, n] of [...variants.entries()].sort((a, b) => b[1] - a[1])) console.log(`  [${n} 处] ${u}`);
console.log(`  变体种类: ${variants.size}   总计: ${[...variants.values()].reduce((a, b) => a + b, 0)} 处`);

// ── 2) 逐文件处理 ─────────────────────────────────────────────
let grand = 0;
const rows = [];
for (const f of FILES) {
  const p = path.join(DIR, f);
  const orig = fs.readFileSync(p, 'utf8');
  const before = (orig.match(URL_RE) || []).length;

  // ②a 非末位: "url",   → 删除(连尾逗号)
  let txt = orig.replace(/\\?"https:\/\/[^"\\]*linkedin\.com\/[^"\\]*\\?",\s*/g, '');
  // ②b 末位: , "url"   → 删除(连首逗号)
  txt = txt.replace(/,\s*\\?"https:\/\/[^"\\]*linkedin\.com\/[^"\\]*\\?"/g, '');

  const after = (txt.match(/linkedin\.com/i) || []).length;
  const artifact = /,\s*,/.test(txt) || /\[\s*,/.test(txt) || /,\s*\]/.test(txt);
  rows.push({ f, before, after, artifact, delta: orig.length - txt.length });
  grand += before;
  if (APPLY && after === 0 && !artifact) {
    fs.copyFileSync(p, p + '.bak-linkedin-purge');
    fs.writeFileSync(p, txt, 'utf8');
  }
}

console.log('\n=== 处理结果 ===');
for (const r of rows) {
  console.log(`  ${r.f}: 撤除 ${r.before} 处 -> 残留 ${r.after}  逗号残渣 ${r.artifact ? '有 ✗' : '无 ✓'}  体积 -${r.delta}B`);
}
console.log(`  合计撤除 ${grand} 处  (${APPLY ? 'APPLY' : 'DRY-RUN'})`);

if (!APPLY) { console.log('\n加 --apply 生效 (先写 .bak-linkedin-purge)'); process.exit(0); }

let bad = 0;
for (const f of FILES) {
  try { JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')); console.log(`  JSON.parse OK: ${f}`); }
  catch (e) { console.log(`  JSON.parse FAIL: ${f} -> ${e.message.slice(0, 80)}`); bad++; }
}
process.exit(bad ? 1 : 0);
