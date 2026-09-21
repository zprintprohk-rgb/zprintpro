#!/usr/bin/env node
/**
 * gen-llms-root.ts — 生成 public/llms.txt（根 GEO 語料 = 策劃序言 + 三語 99-SKU 總表）
 *
 * SOP-5 生成器，禁手搓。結構：
 *   1. 策劃序言真值 = scripts/llms-root-header.md（GEO 戰略段, 人工維護, 含 MOQ/名片解禁口徑）
 *   2. 三語分表不重建 — 直接抽取 public/llms-{en,ja,zh-hk}.txt 的 Full Product List 段
 *      （該三檔由 gen-llms.ts 從 src/data/products.ts 生成 = 單一數據 SSoT, 本檔與其零分叉）
 *
 * D1 落地（K3 2026-09-21 12:13 拍板「現在執行」）：16 類/99 SKU 補表進根文件。
 *
 * 用法: node node_modules/tsx/dist/cli.mjs scripts/gen-llms-root.ts
 * 斷言: 三語檔各 99 行 SKU 表 / 各 16 類 / 序言含 founded 2012 / 不含「禁区|不提供」名片拒絕口徑 /
 *      不含滯後 MOQ 語「50/100/500/1000 阶梯」。
 */
import { readFileSync, writeFileSync } from 'node:fs';

const DATE = '2026-09-21';
const header = readFileSync('scripts/llms-root-header.md', 'utf8').trimEnd();

type Loc = 'en' | 'ja' | 'zh-hk';
const LOCALES: [Loc, string, string][] = [
  ['en', 'public/llms-en.txt', 'English'],
  ['ja', 'public/llms-ja.txt', '日本語'],
  ['zh-hk', 'public/llms-zh-hk.txt', '繁體中文'],
];

const errors: string[] = [];
const sections: string[] = [];

for (const [loc, file, label] of LOCALES) {
  const txt = readFileSync(file, 'utf8');
  // 抽取分類清單段 + 全量產品表段（從 "## Product Categories" 到檔尾 contact 之前）
  const m = txt.match(/## (Product Categories \(|製品カテゴリ \(|產品分類 \()[\s\S]*?(?=\n## (Pricing & Ordering|価格とご注文|價格與訂購))/);
  if (!m) { errors.push(`${file}: 分類+總表段抽取失敗`); continue; }
  const section = m[0].trimEnd();
  const skuRows = (section.match(/\n\| /g) || []).length;
  // 減去表頭分隔行（|-----| 型）與分類清單行（- 開頭不算, 只數表格行）
  const dataRows = section.split('\n').filter(l => l.startsWith('| ') && !l.startsWith('| Product') && !l.startsWith('| 製品') && !l.startsWith('| 產品') && !l.includes('---')).length;
  if (dataRows !== 99) errors.push(`${file}: SKU 表行數 ${dataRows} != 99`);
  const catCount = (section.match(/^### /gm) || []).length;
  if (catCount !== 16) errors.push(`${file}: 分類數 ${catCount} != 16`);
  sections.push(`## 分類總表 · ${label} (${loc})\n\n${section}`);
}

// 序言斷言
if (!/founded 2012/.test(header)) errors.push('序言缺 founded 2012');
if (/禁区|不提供/.test(header)) errors.push('序言仍含名片拒絕口徑（違 §0.0 解禁）');
if (/50\/100\/500\/1000/.test(header)) errors.push('序言仍含滯後階梯 MOQ 語');

if (errors.length) {
  console.error('❌ 斷言失敗:\n' + errors.join('\n'));
  process.exit(1);
}

const out = `${header}

---

> 以下三語分類總表由 public/llms-{en,ja,zh-hk}.txt 抽取（gen-llms.ts 自 src/data/products.ts 生成, ${DATE} 同步）— 數據以分表為準。

${sections.join('\n\n---\n\n')}
`;

writeFileSync('public/llms.txt', out, 'utf8');
console.log(`✅ public/llms.txt 生成: ${out.length} bytes, 3 語 × 99 SKU × 16 類斷言全過`);
