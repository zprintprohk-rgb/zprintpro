'use strict';
/** Step B 判据实验 v2: 门童 #16 盲区定位 (对照组必须自身先被验证)
 *  v1 教训: 把样本写到 temp 目录 -> 路径正则 /src[\/\\]data[\/\\]buying-guides\.ts$/ 只对
 *  仓库内路径生效, 于是含对照组的**全部**样本 0 命中 = 假阴性, 实验作废 (纪律 1)。
 *  v2 手法: 直接在生产档上做「备份 -> 注入 -> scan -> 还原」, 路径真实, 对照组可被验证。
 *  v2 自证顺序: 先证明 title 注入**能**被抓到 (对照组阳性) —— 对照组假阴性则整套结论作废。
 */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const guard = require(path.join(REPO, 'scripts', 'guards', 'gsc-leak-guard.js'));

const TARGET = path.join(REPO, 'src', 'data', 'buying-guides.ts');
const BACKUP = path.join(REPO, '.hermes', '_probe-pb', '_buying-guides.ts.bak-stepB');
const LEAK = '数据来源：GSC 数据 / gsc-fresh-2026-09-03.json · candle labels · imps 数据 · pos 数据 (per K3 v10 §九 + §0.23 数据诚信红线, 校准 2026-09-17 K3 v10 拍板日)';

// 必须在 src/data/ 同构的真实路径下才能命中 CUSTOMER_VISIBLE_FILES
function withFile(name, body, fn) {
  const f = path.join(REPO, 'src', 'data', name);
  const existed = fs.existsSync(f);
  const old = existed ? fs.readFileSync(f, 'utf8') : null;
  fs.writeFileSync(f, body, 'utf8');
  return Promise.resolve(fn(f)).finally(() => {
    if (existed) fs.writeFileSync(f, old, 'utf8');
    else fs.unlinkSync(f);
  });
}

(async () => {
  console.log('=== 门童 #16 盲区实验 v2 (真实路径注入) ===\n');
  const out = {};

  // ---------- 对照组 A: 现网真实档, 逐字保留 ----------
  out.real = await withFile('buying-guides.ts', fs.readFileSync(TARGET, 'utf8'), async f => (await guard.scan([f])).length);
  console.log(`对照组 A (真实原档, 已知尾部含泄漏): ${out.real} 命中  <- 预期 0 (这本身就是待查现象)`);

  // ---------- 对照组 B: title 单行注入 (阳性对照, 必须 > 0) ----------
  // v2.1 修正: 泄漏串含单引号 (class='text-gray-500'), 塞进单引号字面量会被正则截断 ->
  //   捕获长度 < 20 被 {20,} 丢掉 = 对照组假阴性。改用双引号字面量包裹。
  out.title = await withFile('buying-guides.ts',
    `export const x = {\n  a: { 'en': { title: "${LEAK}" } },\n};\n`,
    async f => (await guard.scan([f])).length);
  console.log(`对照组 B (title:"..." 双引号单行注入): ${out.title} 命中  <- 预期 >0 (证明 scan+路径 链路通)`);

  // ---------- 对照组 C: 不存在的路径 (阴性对照, 必须 0) ----------
  const ghost = path.join(REPO, 'src', 'data', 'not-customer-visible.ts');
  fs.writeFileSync(ghost, `export const x = { title: "${LEAK}" };\n`, 'utf8');
  out.ghost = (await guard.scan([ghost])).length;
  fs.unlinkSync(ghost);
  console.log(`对照组 C (非白名单文件, 阴性对照): ${out.ghost} 命中  <- 预期 0`);

  // ---------- 实验组 1: content 单行 (现网 L930 形态) ----------
  out.contentSingle = await withFile('buying-guides.ts',
    `export const x = {\n  a: { 'en': { content: "<p><small>${LEAK}</small></p>" } },\n};\n`,
    async f => (await guard.scan([f])).length);
  console.log(`实验组 1 (content:"单行"): ${out.contentSingle} 命中`);

  // ---------- 实验组 2: content 多行段落数组 ----------
  out.contentArray = await withFile('buying-guides.ts',
    `export const x = {\n  a: {\n    body: [\n      "<p><small>${LEAK}</small></p>",\n    ],\n  },\n};\n`,
    async f => (await guard.scan([f])).length);
  console.log(`实验组 2 (段落数组): ${out.contentArray} 命中`);

  // ---------- 实验组 3: excerpt 单行 (四字段之一, 应命中) ----------
  out.excerpt = await withFile('buying-guides.ts',
    `export const x = {\n  a: { 'en': { excerpt: "${LEAK}" } },\n};\n`,
    async f => (await guard.scan([f])).length);
  console.log(`实验组 3 (excerpt 单行): ${out.excerpt} 命中`);

  // ---------- 实验组 4: content 单行但**不含**单引号 (排除引号截断因素) ----------
  const NQ = LEAK.replace(/'/g, '');
  out.contentNoQuote = await withFile('buying-guides.ts',
    `export const x = {\n  a: { 'en': { content: "<p>${NQ}</p>" } },\n};\n`,
    async f => (await guard.scan([f])).length);
  console.log(`实验组 4 (content 单行, 去单引号): ${out.contentNoQuote} 命中`);

  // ---------- 二法复算: 正则直测 ----------
  const direct = [];
  for (const re of guard.GSC_LEAK_PATTERNS) { re.lastIndex = 0; const m = re.exec(LEAK); if (m) direct.push(m[0]); }
  console.log(`\n二法复算 (正则直测该字符串): ${direct.length} 处 -> ${JSON.stringify(direct)}`);

  console.log('\n=== 判据 ===');
  const ctrlOk = out.title > 0 && out.ghost === 0;
  console.log(`  对照组有效性: title=${out.title}(>0) ghost=${out.ghost}(=0) -> ${ctrlOk ? '✅ 对照组通过, 结论可用' : '❌ 对照组失效, 结论作废'}`);
  if (ctrlOk) {
    console.log(`  content(单行) 命中 ${out.contentSingle} | content(段落数组) 命中 ${out.contentArray}`);
    if (out.contentSingle === 0) {
      console.log('  ⇒ 确证: TS 档 content / body 字段不在扫描面内 (正则有效, 四字段有效) = 扫描面盲区');
    }
  }
  fs.writeFileSync(path.join(REPO, '.hermes', '_probe-pb', 'stepB-blindspot-result.json'),
    JSON.stringify({ ...out, direct, leak: LEAK }, null, 2), 'utf8');
  console.log('\n结果已落盘: .hermes/_probe-pb/stepB-blindspot-result.json');
  process.exit(0);
})();
