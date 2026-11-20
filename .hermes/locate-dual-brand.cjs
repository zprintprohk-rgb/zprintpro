/**
 * locate-dual-brand.cjs — 定位「智印港 ZprintPro」69 处的真实来源 (只读诊断, 2026-09-13)
 *
 * 背景: 三方取证矛盾 —— 生成器 L49-51/L82 是"从 CSV 原样复制"(无品牌常量); CSV 用普通空格搜
 *       「智印港」=0 处; 但回归版 TS 有 69 处「智印港 ZprintPro」。必须先定位再动手。
 *
 * 用法: node .hermes/locate-dual-brand.cjs <regressed-ts-dump-path>
 */
const fs = require('fs');

const TS_DUMP = process.argv[2];
const CSV = 'zprintpro-sku-seo-data.csv';
const NEEDLE = 'ZprintPro';

const csv = fs.readFileSync(CSV, 'utf8');
const rows = csv.split(/\r?\n/);

console.log('=== CSV (' + rows.length + ' 行) ===');
console.log('  ZprintPro 出现 :', (csv.match(/ZprintPro/g) || []).length);
console.log('  智印港 出现    :', (csv.match(/智印港/g) || []).length);
console.log('  两种品牌同行   :', (csv.match(/智印港[^\n]{0,3}ZprintPro/g) || []).length);

// 逐行找含 ZprintPro 的单元格, 打印品牌附近 24 字符 (含码点) 判断有无隐藏分隔符
let shown = 0;
for (let i = 0; i < rows.length && shown < 3; i++) {
  const r = rows[i];
  const idx = r.indexOf(NEEDLE);
  if (idx < 0) continue;
  const seg = r.slice(Math.max(0, idx - 18), idx + 12);
  const codes = [...seg].map((c) => c.charCodeAt(0));
  console.log('  L' + (i + 1) + ' 样本: ' + JSON.stringify(seg));
  console.log('        码点: ' + codes.join(','));
  shown++;
}

console.log('\n=== 回归版 TS dump ===');
if (!TS_DUMP || !fs.existsSync(TS_DUMP)) {
  console.log('  (未提供 dump 路径, 跳过)');
  process.exit(0);
}
const ts = fs.readFileSync(TS_DUMP, 'utf8');
const tsLines = ts.split(/\r?\n/);
let hits = 0;
const fieldCount = {};
for (let i = 0; i < tsLines.length; i++) {
  const l = tsLines[i];
  if (!l.includes('智印港 ZprintPro')) continue;
  hits++;
  // 该行属于哪个字段? 取行首 key
  const m = l.match(/^\s*"?([A-Za-z_$][\w$]*|[\w-]+)"?\s*:/);
  const field = m ? m[1] : '(?)';
  fieldCount[field] = (fieldCount[field] || 0) + 1;
  if (hits <= 3) {
    const idx = l.indexOf('智印港 ZprintPro');
    console.log('  L' + (i + 1) + ' 字段=' + field + '  片段: ' + JSON.stringify(l.slice(Math.max(0, idx - 40), idx + 26)));
  }
}
console.log('  含该串的行数: ' + hits);
console.log('  按字段分布: ' + JSON.stringify(fieldCount));
