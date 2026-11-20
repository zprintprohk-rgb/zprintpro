'use strict';
/**
 * Step B-7: products-content.ts 内部定价口径脱敏 (K3 裁决 A + 三语统一脱敏)
 *
 * 清除内容: ① 成本加成倍率 (1.3 / 1.3x fair margin / ×1.3)
 *          ② 内部换汇口径 (RMB→HKD 1.087 / CNY→USD 7.25)
 *          ③ 内部定价方法词 (校準報價 / 校準來源 / 真實校準 / Calibrated / 校正価格)
 *          ④ 内部询价来源 (參考實詢 / supplier quote)
 * 保留内容: 价格阶梯数值本身 (HK$811/1,138/… 与完成率百分比) —— 只脱敏口径, 不动价格
 *
 * 危险写入三件套: 备份 + 计数断言 + 形状断言, 断言未过不写盘。
 */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const TARGET = path.join(REPO, 'src', 'data', 'products-content.ts');
const BAK = path.join(REPO, '.hermes', '_probe-pb', '_products-content.ts.bak-stepB7');

// [旧, 新, 期望出现次数]
const RULES = [
  // ---------- zh-hk 标题 ----------
  ['<h3>5 檔牛皮紙袋校準報價 (参考實價, 2026-07-18)</h3>',
    '<h3>5 檔牛皮紙袋參考價格 (2026-07-18)</h3>', 1],
  ['<h3>智印港 2026-07-18 参考價格 × 1.3 校準真實報價</h3>',
    '<h3>智印港 2026-07-18 牛皮紙袋參考價格</h3>', 1],
  ['<h3>智印港 2026-07-18 参考價格 × 1.3 校準真實報價 (mailer-boxes)</h3>',
    '<h3>智印港 2026-07-18 飛機盒參考價格</h3>', 1],
  // ---------- zh-hk 引言段 ----------
  ['<p>以下價格來自智印港 2026-07-18 向 <a href="/zh-hk/product/kraft-paper-bags/">牛皮紙袋</a> 供應商實詢 (中號 260x170x250mm / 120g 黃牛皮 / 紙繩或扁繩 / 單色-四色),1.3 倍合理利潤 + RMB→HKD 1.087 換算後的可即時展示真實校準錨點:</p>',
    '<p>以下價格為智印港依現行生產與匯率整理的參考報價 (2026-07-18 更新),規格基準為中號 260x170x250mm / 120g 黃牛皮 / 紙繩或扁繩 / 單色-四色:</p>', 1],
  // ---------- zh-hk 表头 + 单元格 ----------
  ["<th class='p-2 text-left'>校準來源</th>", "<th class='p-2 text-left'>價格依據</th>", 2],
  ["<td class='p-2 text-center'>2026-07-18 參考實詢</td>", "<td class='p-2 text-center'>參考價</td>", 10],
  // ---------- zh-hk 结尾口径 ----------
  ['報價通過真實校準,不做模擬價。', '報價為現行參考價,非模擬價。', 1],
  ['所有報價通過 × 1.3 真實校準,不做模擬價。', '所有報價為現行參考價,非模擬價。', 1],
  // ---------- en ----------
  ['<h3>5-Tier Kraft Paper Bag Calibrated Pricing (reference pricing, 2026-07-18)</h3>',
    '<h3>5-Tier Kraft Paper Bag Reference Pricing (2026-07-18)</h3>', 1],
  ["<p>The following prices are sourced from ZprintPro's logged-in <a href=\"/en/product/kraft-paper-bags/\">kraft paper bag</a> supplier quote on 2026-07-18 (medium 260x170x250mm / 120g brown kraft / paper or flat rope / 1-4 color print), with a 1.3x fair margin and CNY→USD 7.25 conversion. They are real calibrated anchors we can display today:</p>",
    '<p>The prices below are ZprintPro reference quotes prepared from our current production and exchange-rate basis (updated 2026-07-18), for medium 260x170x250mm / 120g brown kraft / paper or flat rope / 1-4 colour print:</p>', 1],
  // ---------- ja ----------
  ['<h3>5 段階クラフト紙袋校正価格 (参考価格, 2026-07-18)</h3>',
    '<h3>5 段階クラフト紙袋 参考価格 (2026-07-18)</h3>', 1],
];

// 形状断言: 改写后不得再出现的内部口径 token
const FORBID_RE = /校準報價|校準來源|真實校準|參考實詢|参考價格 × 1\.3|合理利潤|RMB→HKD|Calibrated Pricing|1\.3x fair margin|CNY→USD|correction rate|校正価格/;

function main() {
  const before = fs.readFileSync(TARGET, 'utf8');
  const report = [];

  // ---- 断言 ①: 计数 ----
  for (const [oldS, , expect] of RULES) {
    const n = before.split(oldS).length - 1;
    if (n !== expect) {
      console.error(`❌ 计数断言失败: 「${oldS.slice(0, 50)}…」出现 ${n} 次 (期望 ${expect}) -> 不写盘`);
      process.exit(1);
    }
  }
  report.push(`  计数断言 OK: ${RULES.length} 条规则全部命中期望次数`);

  // ---- 备份 ----
  fs.writeFileSync(BAK, before, 'utf8');
  if (fs.statSync(BAK).size !== Buffer.byteLength(before, 'utf8')) {
    console.error('❌ 备份长度不符 -> 不写盘'); process.exit(1);
  }
  report.push(`  备份 OK: ${path.relative(REPO, BAK)} (${fs.statSync(BAK).size} bytes)`);

  // ---- 替换 (修: String.replace(str,str) 只替第一处 -> 按期望次数逐次替换) ----
  let out = before;
  for (const [oldS, newS, expect] of RULES) {
    for (let k = 0; k < expect; k++) {
      const n = out.split(oldS).length - 1;
      if (n === 0) break;
      out = out.replace(oldS, newS);
    }
    const remain = out.split(oldS).length - 1;
    if (remain !== 0) {
      console.error(`❌ 替换断言失败: 「${oldS.slice(0, 40)}…」仍残留 ${remain} 处 -> 不写盘`);
      process.exit(1);
    }
  }
  report.push(`  替换完成: ${RULES.length} 条规则, 共 ${RULES.reduce((a, r) => a + r[2], 0)} 处`);

  // ---- 断言 ②: 形状 — 内部口径 token 清零 ----
  const left = out.match(new RegExp(FORBID_RE.source, 'g')) || [];
  if (left.length) {
    console.error(`❌ 形状断言失败: 仍有内部口径 token 残留 ${JSON.stringify([...new Set(left)])} -> 不写盘`);
    process.exit(1);
  }
  report.push('  形状断言 OK: 内部口径 token 0 残留');

  // ---- 断言 ③: 价格数值守恒 (只脱敏口径, 价格阶梯一个都不能动) ----
  const pickNums = (s) => (s.match(/HK\$[\d,]+/g) || []).join('|');
  if (pickNums(before) !== pickNums(out)) {
    console.error('❌ 价格守恒断言失败: HK$ 数值序列发生变化 -> 不写盘');
    process.exit(1);
  }
  const pickPct = (s) => (s.match(/\d+%/g) || []).join('|');
  if (pickPct(before) !== pickPct(out)) {
    console.error('❌ 百分比守恒断言失败: 百分比序列发生变化 -> 不写盘');
    process.exit(1);
  }
  report.push('  价格守恒断言 OK: HK$ 数值与百分比序列逐位一致 (只脱敏口径)');

  // ---- 断言 ④: 结构守恒 ----
  if (before.split('\n').length !== out.split('\n').length) {
    console.error('❌ 结构断言失败: 行数变化 -> 不写盘'); process.exit(1);
  }
  const cntTable = (s) => (s.match(/<\/table>/g) || []).length;
  if (cntTable(before) !== cntTable(out)) {
    console.error('❌ 结构断言失败: 表格数变化 -> 不写盘'); process.exit(1);
  }
  report.push(`  结构断言 OK: 行数 ${out.split('\n').length} 不变 / 表格数 ${cntTable(out)} 不变`);

  // ---- 写盘 + 回读校验 ----
  fs.writeFileSync(TARGET, out, 'utf8');
  const after = fs.readFileSync(TARGET, 'utf8');
  if (after !== out || after.charCodeAt(0) === 0xFEFF) {
    console.error('❌ 写盘校验失败 -> 回滚');
    fs.writeFileSync(TARGET, before, 'utf8');
    process.exit(1);
  }

  console.log('=== Step B-7 内部定价口径脱敏 ===');
  report.forEach(r => console.log(r));
  console.log(`\n✅ 写盘成功: ${path.relative(REPO, TARGET)}`);
  console.log(`   字节: ${Buffer.byteLength(before, 'utf8')} -> ${Buffer.byteLength(after, 'utf8')}`);
  console.log(`   回滚: Copy-Item "${path.relative(REPO, BAK)}" "${path.relative(REPO, TARGET)}" -Force`);
}

main();
