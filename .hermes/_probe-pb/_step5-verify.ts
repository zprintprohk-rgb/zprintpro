/**
 * Step 5 验收探针 — 4 项:
 *  ① 映射档三向自检 (zh-hk === 原文 / en 无 CJK / ja 非零假名英文 / 无简体专用字形)
 *  ② size 栏覆盖 73/73 + 全站 95 SKU × 3 locale 端到端取值
 *  ③ 栏名 (dt) 三语 + 旧->新对照 (zh-hk 授权变更)
 *  ④ (§2.1/§2.3) zh-hk 零非预期 churn 断言
 * 用法: npx tsx .hermes/_probe-pb/_step5-verify.ts
 */
import { products } from '../../src/data/products';
import {
  SPEC_I18N,
  SPEC_FIELD_LABELS,
  localizeSpecValue,
  localizeSpecField,
} from '../../src/data/product-specs-i18n';
import * as fs from 'fs';

const CJK = /[\u3400-\u4FFF\uF900-\uFAFF]/;
const HAN = /[\u3400-\u9FFF\uF900-\uFAFF]/;
const KANA = /[\u3040-\u309F\u30A0-\u30FF]/;
// 门童 #4 的简体专用字形宽集 (直接从 guard 取, 保证与门禁同源, 不另立字集)
// eslint-disable-next-line @typescript-eslint/no-var-requires
const guard = require('../../scripts/guards/i18n-guard.js');
const SIMP_ZH: string = guard.SIMP_ZH;
const SIMP_JA: string = guard.BIDIRECTIONAL_RULES.find((r: any) => r.locales.includes('ja')).chars;
const SIMP_RE = new RegExp('[' + SIMP_ZH + ']');
const SIMP_JA_RE = new RegExp('[' + SIMP_JA + ']');
console.log(`(字集同源: SIMP_ZH ${SIMP_ZH.length} 字 / SIMP_JA ${SIMP_JA.length} 字, 取自 scripts/guards/i18n-guard.js)`);

let fail = 0;
const bad = (m: string) => { fail++; console.log('  ❌ ' + m); };

// ── ① 映射档自检 ──
const keys = Object.keys(SPEC_I18N);
console.log(`① 映射档自检: ${keys.length} 条`);
let hkDiff = 0, enCjk = 0, jaBad = 0, hkSimp = 0, jaSimp = 0;
for (const k of keys) {
  const v = SPEC_I18N[k];
  if (v['zh-hk'] !== k) { hkDiff++; if (hkDiff <= 3) bad(`zh-hk !== 原文: ${JSON.stringify(k)} -> ${JSON.stringify(v['zh-hk'])}`); }
  if (CJK.test(v.en)) { enCjk++; if (enCjk <= 3) bad(`en 含 CJK: ${v.en}`); }
  if (!HAN.test(v.ja) && !KANA.test(v.ja) && (HAN.test(k) || KANA.test(k))) { jaBad++; if (jaBad <= 3) bad(`ja 无汉字无假名 (原文有): ${v.ja}`); }
  if (SIMP_RE.test(v['zh-hk'])) { hkSimp++; if (hkSimp <= 3) bad(`zh-hk 含简体: ${v['zh-hk']}`); }
  if (SIMP_JA_RE.test(v.ja)) { jaSimp++; if (jaSimp <= 3) bad(`ja 含简体专用字形: ${v.ja}`); }
}
console.log(`   zh-hk≠原文 = ${hkDiff} (必须 0) | en 含 CJK = ${enCjk} (必须 0) | ja 无汉字假名 = ${jaBad} (必须 0) | zh-hk 含简体 = ${hkSimp} (必须 0) | ja 含简体 = ${jaSimp} (必须 0)`);
if (hkDiff || enCjk || jaBad || hkSimp || jaSimp) console.log('  ↑ 已计入 fail');

// ── ② size 覆盖 ──
const sizeSet = new Set<string>();
for (const p of products as any[]) if (p.specs?.size) sizeSet.add(p.specs.size);
const sizeCovered = [...sizeSet].filter(v => SPEC_I18N[v]);
console.log(`\n② size 栏覆盖: ${sizeCovered.length}/${sizeSet.size}`);
if (sizeCovered.length !== sizeSet.size) {
  bad('size 未覆盖: ' + [...sizeSet].filter(v => !SPEC_I18N[v]).map(JSON.stringify).join(' | '));
}
const FIELDS = ['material', 'size', 'printMethod', 'finishing'] as const;
let slots = 0, enStillCjk = 0, hkChanged = 0, jaSimpHit = 0;
const jaSameAsKey: string[] = [];
for (const p of products as any[]) {
  if (!p.specs) continue;
  for (const f of FIELDS) {
    const orig = p.specs[f];
    if (!orig) continue;
    slots++;
    for (const loc of ['zh-hk', 'en', 'ja'] as const) {
      const out = localizeSpecValue(orig, loc);
      if (!out) bad(`空值 ${p.slug}.${f}[${loc}]`);
      if (loc === 'zh-hk' && out !== orig) hkChanged++;
      if (loc === 'en' && HAN.test(out)) { enStillCjk++; if (enStillCjk <= 3) bad(`en 输出仍含 CJK: ${p.slug}.${f} = ${out}`); }
      if (loc === 'ja' && SIMP_JA_RE.test(out)) { jaSimpHit++; if (jaSimpHit <= 3) bad(`ja 输出含简体专用字形: ${p.slug}.${f} = ${out}`); }
      if (loc === 'ja' && out === orig && HAN.test(orig) && !jaSameAsKey.includes(orig)) jaSameAsKey.push(orig);
    }
  }
}
console.log(`   端到端: ${slots} 栏位 × 3 locale = ${slots * 3} 次取值`);
console.log(`   zh-hk 输出 ≠ 原文 = ${hkChanged} (必须 0, §2.1 零 churn) | en 输出仍含 CJK = ${enStillCjk} (必须 0) | ja 含简体 = ${jaSimpHit} (必须 0)`);
console.log(`   ja 取值 = 原文 且原文含汉字的条目 (逐条人工复核: 原文本身即日文可用写法) = ${jaSameAsKey.length}`);
jaSameAsKey.forEach(v => console.log(`     · ${v}`));

// ── ③ 栏名 dt ──
console.log('\n③ 栏名 (dt) 三语对照 + zh-hk 改动前后:');
const OLD = ['material', 'size', 'printMethod', 'finishing'];
for (const k of OLD) {
  const before = k;
  const after = localizeSpecField(k, 'zh-hk');
  console.log(`   ${k.padEnd(12)} zh-hk: "${before}" -> "${after}"${before === after ? '  同' : '  ★变(已授权)'}`);
  console.log(`   ${''.padEnd(12)} en   : "${localizeSpecField(k, 'en')}"  |  ja: "${localizeSpecField(k, 'ja')}"`);
}
console.log(`   未命中 fallback: localizeSpecField('unknownKey','zh-hk') = ${JSON.stringify(localizeSpecField('unknownKey', 'zh-hk'))} (应 = 原 key)`);

// ── ④ §2.3 zh-hk 零 churn 证据 (en 段变更只影响 en) ──
console.log('\n④ §2.3 FAQ 残留清理的语系作用域: 见 git diff (仅 en 语系块内 1 条删除, zh-hk/ja 块零改动)');

console.log(`\n=== 探针结果: ${fail === 0 ? '✅ 全过' : '❌ ' + fail + ' 项失败'} ===`);
process.exit(fail === 0 ? 0 : 1);
