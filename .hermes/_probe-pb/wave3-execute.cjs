'use strict';
/**
 * 波 3: en 向剩余「真缺陷」22 字清理
 *
 * ⚠️ 显式排除 (K3 裁决前不得批量改写, per AGENTS.md §0.0):
 *   sku-seo-data.ts 的名片相关字段 (400g名片 / 燙金名片 / 厚口 カード / 箔押し カード)
 *   —— §0.0 明令「不得批量改写含『卡片』的历史内容」(该内容现为资产);
 *     且名片展示层/SEO 层解禁三选项 (a)(b)(c) 尚未拍板 ⇒ 单列上报, 本波不动。
 */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const F = {
  en: path.join(REPO, 'src', 'data', 'blog-data', 'en.json'),
  buy: path.join(REPO, 'src', 'data', 'buying-guides.ts'),
};

const RULES = [
  // [文件, 旧串, 新串, 说明]
  ['en', 'German Aptamil, Hong Kong衍生, Momcil', 'German Aptamil, Hong Kong Derivatives, Momcil',
    '品牌清单里混入中文 (应为 Hong Kong Derivatives)'],
  ['en', '<strong>核心頁:</strong>', '<strong>Core Pages:</strong>', '栏目名中文'],
  ['buy', 'included free for orders of 批量以上 pcs', 'included free for orders of 1,000+ pcs',
    '数量表述残留中文'],
];

const MUST_GONE = ['Hong Kong衍生', '核心頁', '批量以上 pcs'];
// 保留断言只针对**本波触及的两档** (sku-seo-data.ts 本波不动, 其名片资产不在断言范围)
const KEEP = ['餐牌', '騎馬釘', '坑紙', '万邑通', '彩龍印刷'];

function main() {
  const orig = {};
  for (const k of Object.keys(F)) orig[k] = fs.readFileSync(F[k], 'utf8');

  for (const [fk, oldS, , note] of RULES) {
    const n = orig[fk].split(oldS).length - 1;
    if (n !== 1) { console.error(`❌ 计数断言失败 [${fk}] 「${oldS.slice(0, 40)}」出现 ${n} 次 (期望 1) [${note}] -> 不写盘`); process.exit(1); }
  }
  console.log(`  计数断言 OK: ${RULES.length} 条各 1 处`);

  for (const k of Object.keys(F)) {
    fs.writeFileSync(path.join(REPO, '.hermes', '_probe-pb', `_wave3.${k}.bak`), orig[k], 'utf8');
  }
  console.log('  备份 OK');

  const out = { ...orig };
  for (const [fk, oldS, newS] of RULES) out[fk] = out[fk].split(oldS).join(newS);

  for (const [fk, toks] of Object.entries({ en: MUST_GONE.slice(0, 2), buy: [MUST_GONE[2]] })) {
    const left = toks.filter(t => out[fk].includes(t));
    if (left.length) { console.error(`❌ 形状断言失败 [${fk}]: ${JSON.stringify(left)} -> 不写盘`); process.exit(1); }
  }
  console.log('  形状断言 OK: 本波目标清零');

  const gone = KEEP.filter(t => !out.en.includes(t) && !out.buy.includes(t));
  if (gone.length) { console.error(`❌ 保留断言失败: 合法内容被误删 ${JSON.stringify(gone)} -> 不写盘`); process.exit(1); }
  console.log('  保留断言 OK: 术语对照注/引文出处/品牌名/名片资产 未误删');

  const a = JSON.parse(orig.en), b = JSON.parse(out.en);
  if (Object.keys(a).length !== Object.keys(b).length) { console.error('❌ 篇目数变化 -> 不写盘'); process.exit(1); }
  console.log(`  JSON 断言 OK: 篇目 ${Object.keys(b).length} 守恒`);

  for (const k of Object.keys(F)) {
    fs.writeFileSync(F[k], out[k], 'utf8');
    const back = fs.readFileSync(F[k], 'utf8');
    if (back !== out[k] || back.charCodeAt(0) === 0xFEFF) {
      for (const k2 of Object.keys(F)) fs.writeFileSync(F[k2], orig[k2], 'utf8');
      console.error(`❌ 写盘校验失败 [${k}] -> 已回滚`); process.exit(1);
    }
  }
  console.log('\n✅ 波 3 写盘成功');
  console.log('   回滚: Copy-Item .hermes/_probe-pb/_wave3.{en,buy}.bak <对应档> -Force');
}

main();
