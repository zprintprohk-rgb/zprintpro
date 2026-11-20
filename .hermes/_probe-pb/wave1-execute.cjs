'use strict';
/**
 * 波 1 执行 (K3 已批准 29 条 "按建议", 抽样后按**真实语境**修正判定)
 *
 * 抽样发现 4 类「我原建议会误伤」的合法内容 ⇒ 本脚本**显式跳过**, 并说明理由:
 *   ① 术语对照注: 餐牌 (HK 叫法对照) / 騎馬釘 中綴じ (括注) / 坑紙 段ボール (括注) — 删了丢信息
 *   ② 第三方引文出处: 万邑通 (Winit) …白皮书 — 引文出处, 非品牌宣传, 保留
 *   ③ 合规他语系内容: sku-seo 的 zh-hk 块标题 / ja 块文案 (厚口チラシ・箔押し) — 属正确语系
 *   ④ 合规品牌名: 彩龍印刷 (白名单)
 *
 * 真正要修的 (en 值内嵌中文 / 坏输出 / 缺空格):
 */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');

const F = {
  en: path.join(REPO, 'src', 'data', 'blog-data', 'en.json'),
  ja: path.join(REPO, 'src', 'data', 'blog-data', 'ja.json'),
  cat: path.join(REPO, 'src', 'data', 'category-seo-content.ts'),
  sku: path.join(REPO, 'src', 'data', 'sku-seo-data.ts'),
  buy: path.join(REPO, 'src', 'data', 'buying-guides.ts'),
  bp: path.join(REPO, 'src', 'data', 'blog-posts.ts'),
  catpage: path.join(REPO, 'src', 'app', '[locale]', 'category', '[slug]', 'page.tsx'),
};

// [文件, 旧串, 新串, 期望次数, 说明]  —— 顺序: 具体先于兜底
const RULES = [
  // ===== 核心术语 6 条 (K3 拍板) =====
  ['en', '國際認證體系 certified Factory-Direct', 'internationally certified Factory-Direct', 3, '消费尾部 certified+Factory-Direct'],
  ['en', '國際認證體系 certified', 'internationally certified', 8, '消费尾部 certified'],
  ['en', '國際認證體系', 'internationally certified', 46, '兜底'],
  ['en', '進口印刷設備 6+1 presses', 'Heidelberg 6+1 presses', 2, '6+1 复数形态'],
  ['en', '進口印刷設備 6+1 press', 'Heidelberg 6+1 press', 13, '6+1 单数形态'],
  ['en', '進口印刷設備 presses', 'Heidelberg presses', 2, '消费尾部 presses'],
  ['en', '進口印刷設備 press', 'Heidelberg presses', 7, '消费尾部 press'],
  ['en', '進口印刷設備', 'Heidelberg presses', 40, '兜底'],
  ['en', 'FSC 認證紙 certified', 'FSC-certified paper', 10, '消费前缀 FSC + 尾部 certified'],
  ['en', 'FSC 認證紙 Certification', 'FSC chain-of-custody certification', 2, '消费前缀 FSC + Certification 尾'],
  ['en', 'FSC 認證紙', 'FSC-certified paper', 22, '消费前缀 FSC (防 FSC FSC-certified 重复)'],
  ['en', '急件 18:00 截單', 'rush orders, 18:00 cutoff', 17, '固定句式'],
  ['en', '答案 nugget', 'Answer nugget', 12, 'K3 终裁: 12 处正常文案改英文'],
  ['en', '答案答案答案答案答案答案答案答案答案答案答案答案答案', '', 0, 'K3 终裁: 13 连重复坏输出整串删除'],
  // ===== 波 1 其余 (经抽样修正后的真缺陷) =====
  ['en', '18 SKU细分 5 products', '18 SKU segment: 5 products', 1, '缺空格 (细分→segment)'],
  ['en', 'Chinese-style 紅包 for tea ceremony', 'Chinese-style red packets for tea ceremony', 1, '英文正文嵌中文'],
  ['cat', 'round, irregular,镂空.', 'round, irregular, laser-cut openwork.', 1, 'en 值嵌中文'],
  ['cat', 'unlimited length —满足 building hoarding', 'unlimited length — meeting building hoarding', 1, 'en 值嵌中文'],
  ['cat', '24h HK,離島 1-2 days', '24h HK, outlying islands 1-2 days', 1, 'en 值嵌中文'],
  ['buy', '輸入六色印刷設備 offset for color accuracy', 'six-colour offset presses for color accuracy', 1, 'en 值嵌日文汉字'],
  ['buy', 'larger runs (批量以上) move to offset', 'larger runs (1,000 and above) move to offset', 1, 'en 值嵌中文 ×2'],
  ['bp', 'ISO 认证体系 + FSC + FDA + EU REACH certified', 'ISO 9001 + FSC + FDA + EU REACH certified', 1, 'en 值嵌简体'],
  ['catpage', "'en': 'Custom Calendars 2027 9月最後黃金窗", "'en': 'Custom Calendars 2027 late-September window", 1, 'en 值嵌中文'],
  ['catpage', "'en': 'Custom Lai See Red Packets · 100 MOQ Foil 11月前就位", "'en': 'Custom Lai See Red Packets · 100 MOQ Foil in place by November", 1, 'en 值嵌中文'],
  // ja description 内嵌简体
  ['cat', 'レーザーで镂空。', 'レーザーでレーザーカット。', 1, 'ja 值嵌简体'],
];

// scope 断言: 波 1 修完后, 以下 token 在**对应文件**里不得再出现
// ⚠️ 口径: 必须用**精确 en 短语**而非裸术语 —— 裸术语在 ja/zh-hk 行里合规存在 (如 ja 的 輸入六色印刷設備)
const MUST_GONE = {
  en: ['答案答案', 'SKU细分', '紅包 for tea', '進口印刷設備', '國際認證體系', '認證紙'],
  cat: ['镂空。', '—满足', 'HK,離島'],
  buy: ['輸入六色印刷設備 offset', 'runs (批量以上)'],
  bp: ["global clients, ISO 认证体系 + FSC"],
  catpage: ["Calendars 2027 9月最後黃金窗", 'Foil 11月前就位'],
};
// 显式保留 (抽样判定为合法); 断言它们**仍在** (防误删)
const MUST_KEEP = {
  en: ['餐牌', '騎馬釘', '坑紙', '万邑通', '彩龍印刷', 'Answer nugget'],
  sku: ['燙金名片', '厚口チラシ', '箔押し'],
};

function main() {
  const orig = {};
  for (const k of Object.keys(F)) orig[k] = fs.readFileSync(F[k], 'utf8');

  // 计数断言
  for (const [fk, oldS, , expect, note] of RULES) {
    const n = orig[fk].split(oldS).length - 1;
    if (n !== expect) {
      console.error(`❌ 计数断言失败 [${fk}] 「${oldS.slice(0, 40)}…」出现 ${n} 次 (期望 ${expect}) [${note}] -> 不写盘`);
      process.exit(1);
    }
  }
  console.log(`  计数断言 OK: ${RULES.length} 条规则逐条命中期望次数 (共 ${RULES.reduce((a, r) => a + r[3], 0)} 处)`);

  // 备份
  for (const k of Object.keys(F)) {
    const b = path.join(REPO, '.hermes', '_probe-pb', `_wave1.${k}.bak`);
    fs.writeFileSync(b, orig[k], 'utf8');
    if (fs.statSync(b).size !== Buffer.byteLength(orig[k], 'utf8')) { console.error('❌ 备份失败'); process.exit(1); }
  }
  console.log('  备份 OK: .hermes/_probe-pb/_wave1.*.bak (7 档)');

  // 替换
  const out = { ...orig };
  for (const [fk, oldS, newS, expect] of RULES) out[fk] = out[fk].split(oldS).join(newS);
  console.log(`  替换完成`);

  // 断言: MUST_GONE
  for (const [fk, toks] of Object.entries(MUST_GONE)) {
    const left = toks.filter(t => out[fk].includes(t));
    if (left.length) { console.error(`❌ 形状断言失败 [${fk}]: 残留 ${JSON.stringify(left)} -> 不写盘`); process.exit(1); }
  }
  console.log('  形状断言 OK: 本次目标 token 全部清零');

  // 断言: MUST_KEEP (防误删)
  for (const [fk, toks] of Object.entries(MUST_KEEP)) {
    const gone = toks.filter(t => !out[fk].includes(t));
    if (gone.length) { console.error(`❌ 保留断言失败 [${fk}]: 合法内容被误删 ${JSON.stringify(gone)} -> 不写盘`); process.exit(1); }
  }
  console.log('  保留断言 OK: 抽样判定为合法的内容 (术语对照/引文出处/他语系) 未被误删');

  // 断言: 重复词
  const DUP = ['certified certified', 'presses presses', 'FSC FSC-certified', 'paper certified', 'callout callout', 'Answer nugget Answer'];
  for (const fk of Object.keys(out)) {
    for (const d of DUP) {
      if (out[fk].includes(d)) { console.error(`❌ 重复断言失败 [${fk}]: 「${d}」 -> 不写盘`); process.exit(1); }
    }
  }
  console.log('  重复断言 OK: 6 类重复词 0 命中');

  // 断言: JSON 合法性 + 篇目守恒
  for (const fk of ['en', 'ja']) {
    const a = JSON.parse(orig[fk]), b = JSON.parse(out[fk]);
    if (Object.keys(a).length !== Object.keys(b).length) { console.error(`❌ 结构断言失败 [${fk}]`); process.exit(1); }
    console.log(`  JSON 断言 OK [${fk}]: 合法, 篇目 ${Object.keys(b).length} 守恒`);
  }

  // 写盘 + 回读
  for (const k of Object.keys(F)) {
    fs.writeFileSync(F[k], out[k], 'utf8');
    const back = fs.readFileSync(F[k], 'utf8');
    if (back !== out[k] || back.charCodeAt(0) === 0xFEFF) {
      console.error(`❌ 写盘校验失败 [${k}] -> 全量回滚`);
      for (const k2 of Object.keys(F)) fs.writeFileSync(F[k2], orig[k2], 'utf8');
      process.exit(1);
    }
  }
  console.log('\n✅ 波 1 写盘成功 (7 档)');
  console.log('   回滚: Copy-Item .hermes/_probe-pb/_wave1.<key>.bak <对应档> -Force');
}

main();
