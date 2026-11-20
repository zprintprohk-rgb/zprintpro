'use strict';
/**
 * Step B-1: 三语 content 尾部 GSC 内部数据尾巴 — 整句重写
 *
 * 依据: AGENTS.md §0.23.1「修复必须整句重写, 不能只删数字」(半截空壳教训)
 *       K3 裁决 2: 去掉文件路径 gsc-fresh-*.json / 校准日期 / 内部决策编号 (§九 / §0.23 / 拍板日)
 *
 * 危险写入三件套 (§12, 2026-09-13 K3 批准):
 *   ① 备份  ② 计数断言  ③ 结果形状断言 —— 断言未过**不得写盘**
 */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const TARGET = path.join(REPO, 'src', 'data', 'buying-guides.ts');
const BAK = path.join(REPO, '.hermes', '_probe-pb', '_buying-guides.ts.bak-stepB1');

// 三语尾巴 (原文 逐字, 含 <p><small ...> 整段)
const OLD = {
  'zh-hk': '<p><small class="text-gray-500">數據來源：GSC 數據 / gsc-fresh-2026-09-03.json · candle labels · imps 數據 · pos 數據 (per K3 v10 §九 + §0.23 數據誠信紅線, 校準 2026-09-17 K3 v10 拍板日)</small></p>',
  en: '<p><small class="text-gray-500">数据来源：GSC 数据 / gsc-fresh-2026-09-03.json · candle labels · imps 数据 · pos 数据 (per K3 v10 §九 + §0.23 数据诚信红线, 校准 2026-09-17 K3 v10 拍板日)</small></p>',
  ja: '<p><small class="text-gray-500">データ出典：GSC データ / gsc-fresh-2026-09-03.json · candle labels · imps データ · pos データ (per K3 v10 §九 + §0.23 データ诚信基準, 校正 2026-09-17 K3 v10 拍板日)</small></p>',
};

// 新文案: 只保留客户相关信息 (数据时效), 无黑话/无路径/无日期/无内部编号
const NEW = {
  'zh-hk': '<p><small class="text-gray-500">本文規格與價格以 2026 年最新市場資料整理，供選料與預算參考。</small></p>',
  en: '<p><small class="text-gray-500">Specs and pricing in this guide are based on our latest 2026 market review, for material and budget planning.</small></p>',
  ja: '<p><small class="text-gray-500">本記事の仕様と価格は 2026 年の最新市場情報に基づく参考値です。</small></p>',
};

// 形状断言: 新文案必须 (a) 长度带 (b) 不含任何黑话/路径/内部编号 (c) 保留 <small> 包裹结构
const FORBID = /GSC|gsc-fresh|imps|pos |數據|数据|データ|校準|校准|校正|拍板|§|K3|紅線|红线|誠信|诚信|基準|来源|來源|出典/i;

function main() {
  const before = fs.readFileSync(TARGET, 'utf8');
  let out = before;
  const report = [];

  // ---- 断言 ①: 每个 OLD 必现且仅现 1 次 ----
  for (const [loc, s] of Object.entries(OLD)) {
    const n = out.split(s).length - 1;
    if (n !== 1) {
      console.error(`❌ 计数断言失败 [${loc}]: 旧尾巴出现 ${n} 次 (要求恰好 1 次) -> 不写盘`);
      process.exit(1);
    }
    report.push(`  计数断言 OK [${loc}] 旧尾巴 = 1 次`);
  }

  // ---- 备份 (写盘前) ----
  fs.writeFileSync(BAK, before, 'utf8');
  const bakLen = fs.statSync(BAK).size;
  if (bakLen !== Buffer.byteLength(before, 'utf8')) {
    console.error('❌ 备份校验失败 (长度不符) -> 不写盘');
    process.exit(1);
  }
  report.push(`  备份 OK: ${path.relative(REPO, BAK)} (${bakLen} bytes)`);

  // ---- 替换 ----
  for (const [loc, s] of Object.entries(OLD)) {
    out = out.replace(s, NEW[loc]);
    report.push(`  替换 [${loc}] 完成`);
  }

  // ---- 断言 ②: 形状 — 新文案逐个自检 ----
  for (const [loc, s] of Object.entries(NEW)) {
    if (FORBID.test(s)) {
      console.error(`❌ 形状断言失败 [${loc}]: 新文案仍含黑话/路径/内部编号 -> 不写盘`);
      process.exit(1);
    }
    if (!/^<p><small class="text-gray-500">.+<\/small><\/p>$/.test(s)) {
      console.error(`❌ 形状断言失败 [${loc}]: 新文案未保持 <p><small> 结构 -> 不写盘`);
      process.exit(1);
    }
    if (s.length < 40 || s.length > 200) {
      console.error(`❌ 形状断言失败 [${loc}]: 新文案长度 ${s.length} 越界 [40,200] -> 不写盘`);
      process.exit(1);
    }
  }
  report.push('  形状断言 OK: 三语新文案 0 黑话 / <p><small> 结构保持 / 长度均在带内');

  // ---- 断言 ③: 全文净变化 — 恰好减少 3 个尾巴, 无其他改动 ----
  const removed = Object.values(OLD).reduce((a, s) => a + s.length, 0);
  const added = Object.values(NEW).reduce((a, s) => a + s.length, 0);
  const expectDelta = added - removed;
  const actualDelta = out.length - before.length;
  if (actualDelta !== expectDelta) {
    console.error(`❌ 净变化断言失败: 期望 ${expectDelta}, 实际 ${actualDelta} -> 不写盘`);
    process.exit(1);
  }
  report.push(`  净变化断言 OK: ${actualDelta} 字符 (旧 ${removed} / 新 ${added})`);

  // ---- 断言 ④: 结构守恒 — 行数不变 / content: 块数不变 ----
  const linesBefore = before.split('\n').length, linesAfter = out.split('\n').length;
  if (linesBefore !== linesAfter) {
    console.error(`❌ 结构断言失败: 行数 ${linesBefore} -> ${linesAfter} -> 不写盘`);
    process.exit(1);
  }
  const cnt = (s, re) => (s.match(re) || []).length;
  if (cnt(before, /content: \{/g) !== cnt(out, /content: \{/g)) {
    console.error('❌ 结构断言失败: content 块数变化 -> 不写盘');
    process.exit(1);
  }
  report.push(`  结构断言 OK: 行数 ${linesAfter} 不变 / content 块数 ${cnt(out, /content: \{/g)} 不变`);

  // ---- 断言 ⑤: 全文黑话清零 (独立方法复算, 纪律 2) ----
  const leftovers = [];
  for (const [loc, s] of Object.entries(OLD)) {
    if (out.includes(s)) leftovers.push(loc);
  }
  if (leftovers.length) {
    console.error(`❌ 残留断言失败: ${leftovers.join(',')} -> 不写盘`);
    process.exit(1);
  }
  report.push('  残留断言 OK: 三语旧尾巴全文已无残留');

  // ---- 写盘 ----
  fs.writeFileSync(TARGET, out, 'utf8');
  const after = fs.readFileSync(TARGET, 'utf8');
  if (after !== out) {
    console.error('❌ 写盘校验失败: 回读与预期不符 (可能编码污染) -> 立即回滚');
    fs.writeFileSync(TARGET, before, 'utf8');
    process.exit(1);
  }
  if (after.charCodeAt(0) === 0xFEFF) {
    console.error('❌ 写盘校验失败: 出现 BOM -> 回滚');
    fs.writeFileSync(TARGET, before, 'utf8');
    process.exit(1);
  }

  console.log('=== Step B-1 三语尾巴整句重写 ===');
  report.forEach(r => console.log(r));
  console.log(`\n✅ 写盘成功: ${path.relative(REPO, TARGET)}`);
  console.log(`   字节: ${Buffer.byteLength(before, 'utf8')} -> ${Buffer.byteLength(after, 'utf8')}`);
  console.log(`   回滚命令: Copy-Item "${path.relative(REPO, BAK)}" "${path.relative(REPO, TARGET)}" -Force`);
}

main();
