'use strict';
/**
 * Step C 批 1 执行 (248 字 / 28 条): title 10 + description 67 + category 33 + JSON-LD 138
 *
 * 三类性质, 三类处置:
 *   ① 人工漏译 (category 9 条)        → 补英文
 *   ② 术语欠译 (description 组)       → 对齐站内已批准英文表述 (国际认证体系=ISO certified 等)
 *   ③ 撤值遗留/误填 (Cert No.[證書編號備索] ×14 / h1·description 中文误填 / 第三方来源名) → 修正
 *
 * 危险写入三件套: 备份 + 计数断言(逐条期望次数) + 形状断言, 断言未过不写盘。
 * 修法要点: 不用 String.replace(str,str) 单次替换; 用 split/join 全量替换并复查残留=0 (技术债 4)。
 */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');

const FILES = {
  en: path.join(REPO, 'src', 'data', 'blog-data', 'en.json'),
  cat: path.join(REPO, 'src', 'data', 'category-seo-content.ts'),
  sku: path.join(REPO, 'src', 'data', 'sku-seo-data.ts'),
};

// [文件key, 旧串, 新串, 期望次数]
const RULES = [
  // ================= ① category (9 条 / 33 字) =================
  ['en', '"category": "餐飲外賣"', '"category": "Food & Beverage"', 1],
  ['en', '"category": "寵物"', '"category": "Pets"', 1],
  ['en', '"category": "美妝護膚"', '"category": "Beauty & Skincare"', 1],
  ['en', '"category": "母嬰食品"', '"category": "Baby & Infant Food"', 1],
  ['en', '"category": "房地產"', '"category": "Real Estate"', 1],
  ['en', '"category": "醫藥保健"', '"category": "Medical & Health"', 1],
  ['en', '"category": "汽車汽配"', '"category": "Automotive"', 1],
  ['en', '"category": "體育賽事"', '"category": "Sports Events"', 1],
  ['en', '"category": "書籍印刷"', '"category": "Book Printing"', 1],

  // ================= ② description 术语欠译 (逐字符对齐 CSV 清单) =================
  // L5  description "…DHL Express 2-4 day, 國際認證體系 certified factory-direct pricing."
  ['en', '2-4 day, 國際認證體系 certified factory-direct pricing.', '2-4 day, ISO 9001 certified factory-direct pricing.', 1],
  // L131 description "ZprintPro features 進口印刷設備 6+1 printing presses"
  ['en', '"description": "ZprintPro features 進口印刷設備 6+1 printing presses',
    '"description": "ZprintPro features imported 6+1 printing presses', 1],
  // L577 description "ZprintPro 急件 18:00 截單, 4 cut-off tiers" + "國際認證體系 certified, Shenzhen"
  ['en', 'ZprintPro 急件 18:00 截單, 4 cut-off tiers', 'ZprintPro rush orders, 18:00 cutoff, 4 cut-off tiers', 1],
  ['en', '(100 MOQ), 國際認證體系 certified, Shenzhen', '(100 MOQ), ISO 9001 certified, Shenzhen', 1],
  // L593 description "…FSC，國際認證體系 four-cert ready."
  ['en', '國際認證體系 four-cert ready.', 'ISO certified and four-cert ready.', 1],
  // L609 description "5 certifications (ISO 14298:2021/FSC//進口印刷設備 6+1/國際認證體系), 6 FAQs"
  ['en', 'ISO 14298:2021/FSC//進口印刷設備 6+1/國際認證體系)，6 FAQs',
    'ISO 14298:2021 / FSC / imported 6+1 presses / ISO certified)，6 FAQs', 2],
  // L617 description "…rush orders, 國際認證體系，FSC 認證紙 certified, 100 countries"
  ['en', 'rush orders, 國際認證體系，FSC 認證紙 certified, 100 countries',
    'rush orders, ISO certified with FSC-certified paper, 100 countries', 1],
  // L709 description "…ZprintPro global clients, ISO 认证体系 + FSC + FDA + EU REACH, DHL"
  ['en', 'global clients, ISO 认证体系 + FSC + FDA + EU REACH,', 'global clients, ISO 9001 + FSC + FDA + EU REACH,', 1],
  // category-seo-content 内联中文 (en 块)
  ['cat', 'into立体 artworks', 'into three-dimensional artworks', 1],
  ['cat', 'Fine pattern镂空 cutting', 'Fine laser-cut openwork', 1],
  ['cat', "delivery,離島 1-2 days", 'delivery, outlying islands 1-2 days', 1],
  // sku-seo-data en 块中文误填 (h1/description) — 对齐该 SKU 既有英文标题
  ['sku', '"description": "壓紋名片",', '"description": "Embossed Business Cards",', 1],
  ['sku', '"h1": "婚禮名片",', '"h1": "Wedding Business Cards",', 1],
  ['sku', '"description": "婚禮名片",', '"description": "Wedding Business Cards",', 1],
  ['sku', '"h1": "金屬光澤名片",', '"h1": "Metallic Finish Business Cards",', 1],

  // ================= ③ 撤值遗留 / 第三方来源名 (JSON-LD) =================
  // SOP-10 第 4 款: 撤 certNo 后遗留的中文短语 (客户 + JSON-LD 双可见)
  ['en', 'Cert No. [證書編號備索],', 'Cert No. available on request,', 4],
  ['en', '([證書編號備索]),', '(Cert No. available on request),', 2],
  ['en', '([證書編號備索])', '(Cert No. available on request)', 2],
  ['en', '= [證書編號備索],', '= Cert No. available on request,', 1],
  ['en', '[證書編號備索] cert', 'Cert No. available on request', 4],
  ['en', '+ [證書編號備索] triple certified', '+ Cert No. available on request, triple certified', 1],
  ['en', '/ [證書編號備索] = Forest Stewardship', '/ Cert No. available on request = Forest Stewardship', 1],
  ['en', '<li>[證書編號備索]: Forest Stewardship', '<li>Cert No. available on request: Forest Stewardship', 1],
  // L712 JSON-LD description + 正文三处简体
  ['en', '100 MOQ. ISO 认证体系 + FSC + FDA + EU REACH.', '100 MOQ. ISO 9001 + FSC + FDA + EU REACH.', 1],
  ['en', 'All ISO 认证体系 + FSC 认证 certified.', 'All ISO 9001 + FSC certified.', 1],
  ['en', 'ISO 认证体系 + FSC.</p>', 'ISO 9001 + FSC.</p>', 1],
  // 第三方来源名 (AGENTS.md: 对外字段禁第三方品牌名) — 删中文, 保留可核来源链接
  ['en', 'MINDS CMYK (麥思印刷整合)</a>', 'MINDS CMYK</a>', 1],
  // 日文术语出现在 en 正文 — 保留术语说明语义, 改英文括注
  ['en', 'standard 並製本 (yose-giri flat-back), and hardcover corresponds to 上製本',
    'standard perfect binding (yose-giri flat-back), and hardcover corresponds to case binding (jō-seihon)', 1],
];

// 形状断言: 批 1 的 28 条命中中文串改后不得再出现
const FORBID = [
  '餐飲外賣', '寵物', '美妝護膚', '母嬰食品', '房地產', '醫藥保健', '汽車汽配', '體育賽事', '書籍印刷',
  '國際認證體系', '進口印刷設備', '認證紙', '急件', '认证体系', '證書編號備索', '並製本', '上製本',
  '麥思印刷整合', '立体', '镂空', '離島', '壓紋名片', '婚禮名片', '金屬光澤名片',
];

function main() {
  const orig = {}, out = {};
  for (const k of Object.keys(FILES)) orig[k] = fs.readFileSync(FILES[k], 'utf8');

  // ---- 断言 ①: 逐条计数 ----
  const perFile = {};
  for (const [fk, oldS, , expect] of RULES) {
    const n = orig[fk].split(oldS).length - 1;
    if (n !== expect) {
      console.error(`❌ 计数断言失败 [${fk}] 「${oldS.slice(0, 46)}…」出现 ${n} 次 (期望 ${expect}) -> 不写盘`);
      process.exit(1);
    }
    perFile[fk] = (perFile[fk] || 0) + expect;
  }
  console.log(`  计数断言 OK: ${RULES.length} 条规则, 逐条命中期望次数 (${Object.entries(perFile).map(([k, v]) => k + '=' + v).join(' / ')})`);

  // ---- 备份 ----
  for (const k of Object.keys(FILES)) {
    const b = path.join(REPO, '.hermes', '_probe-pb', `_stepC1.${k}.bak`);
    fs.writeFileSync(b, orig[k], 'utf8');
    if (fs.statSync(b).size !== Buffer.byteLength(orig[k], 'utf8')) { console.error('❌ 备份失败'); process.exit(1); }
  }
  console.log('  备份 OK: .hermes/_probe-pb/_stepC1.{en,cat,sku}.bak');

  // ---- 替换 (split/join 全量) ----
  for (const k of Object.keys(FILES)) out[k] = orig[k];
  for (const [fk, oldS, newS] of RULES) out[fk] = out[fk].split(oldS).join(newS);
  console.log(`  替换完成: ${RULES.reduce((a, r) => a + r[3], 0)} 处`);

  // ---- 断言 ②: 形状 — 按**批 1 scope** 判定残留 ----
  // 注意: 國際認證體系/進口印刷設備/認證紙/急件 等术语在 content 档仍有大量出现, 属批 2/Step E 范围,
  //       不得用「全文 0 残留」当判据 (过严断言 = 假失败)。判据只认批 1 自己的 scope:
  //       ① category 字段值 ② title/description 字段值 ③ sku-seo en 块 h1/description ④ JSON-LD 相关串
  const SCOPE_CHECKS = [
    ['en', /"category":\s*"[^"]*[\u4e00-\u9fff][^"]*"/g, 'category 字段值含中文'],
    ['en', /"description":\s*"[^"]*[\u4e00-\u9fff][^"]*"/g, 'description 字段值含中文'],
    ['en', /"title":\s*"[^"]*[\u4e00-\u9fff][^"]*"/g, 'title 字段值含中文'],
    ['en', /證書編號備索/g, '撤值遗留中文 (Cert No.)'],
    ['en', /麥思印刷整合/g, '第三方来源名 (中文)'],
    ['en', /並製本|上製本/g, '日文术语未括注'],
  ];
  for (const [fk, re, label] of SCOPE_CHECKS) {
    const hits = out[fk].match(re) || [];
    if (hits.length) {
      console.error(`❌ 形状断言失败 [${fk}] ${label}: ${hits.length} 处 -> ${JSON.stringify([...new Set(hits)].slice(0, 5))} -> 不写盘`);
      process.exit(1);
    }
  }
  // sku-seo en 块 h1/description 不得含中文
  const skuBlockRe = /"en":\s*\{[\s\S]{0,600}?\}/g;
  const skuBad = (out.sku.match(skuBlockRe) || []).filter(b => /"h1":\s*"[^"]*[\u4e00-\u9fff]/.test(b) || /"description":\s*"[^"]*[\u4e00-\u9fff]/.test(b));
  if (skuBad.length) {
    console.error(`❌ 形状断言失败 [sku] en 块 h1/description 仍含中文: ${skuBad.length} 处 -> 不写盘`);
    process.exit(1);
  }
  console.log('  形状断言 OK: 批 1 scope 内 (category/description/title 字段值 + 撤值遗留 + 第三方名 + sku en 块) 中文 0 残留');

  // ---- 断言 ③: JSON 合法性 (en.json 是机器读档) ----
  try {
    JSON.parse(out.en);
    console.log('  形状断言 OK: en.json 仍为合法 JSON');
  } catch (e) {
    console.error('❌ en.json 解析失败: ' + e.message + ' -> 不写盘');
    process.exit(1);
  }

  // ---- 断言 ④: 键数守恒 (结构未动) ----
  const keys = (s) => Object.keys(JSON.parse(s)).length;
  if (keys(orig.en) !== keys(out.en)) {
    console.error(`❌ 结构断言失败: en.json 篇目数 ${keys(orig.en)} -> ${keys(out.en)} -> 不写盘`);
    process.exit(1);
  }
  console.log(`  结构断言 OK: en.json 篇目数 ${keys(out.en)} 不变`);

  // ---- 写盘 + 回读 ----
  for (const k of Object.keys(FILES)) {
    fs.writeFileSync(FILES[k], out[k], 'utf8');
    const back = fs.readFileSync(FILES[k], 'utf8');
    if (back !== out[k] || back.charCodeAt(0) === 0xFEFF) {
      console.error(`❌ 写盘校验失败 [${k}] -> 回滚全部`);
      for (const k2 of Object.keys(FILES)) fs.writeFileSync(FILES[k2], orig[k2], 'utf8');
      process.exit(1);
    }
    console.log(`  ✅ 写盘: ${path.relative(REPO, FILES[k])} (${Buffer.byteLength(orig[k], 'utf8')} -> ${Buffer.byteLength(back, 'utf8')} bytes)`);
  }
  console.log('\n回滚: Copy-Item .hermes/_probe-pb/_stepC1.<en|cat|sku>.bak 到对应档');
}

main();
