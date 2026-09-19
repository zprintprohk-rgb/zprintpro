// moq10-validate-classification.ts — 抽驗分類報告準確度 (避免又一次過寬/過窄)
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const json = JSON.parse(fs.readFileSync(path.join(ROOT, '.hermes/logs/moq-price-sync-classification.json'), 'utf-8'));

const list = json.changeMoqList as { file: string; line: number; catLabel: string; snippet: string; kind: string }[];
console.log(`行動清單① (改 MOQ) 共 ${list.length} 條; 抽驗 25 條\n`);

// 抽驗: 每 4 條取 1, 最多 25
const sample = list.filter((_, i) => i % Math.max(1, Math.floor(list.length / 25)) === 0).slice(0, 25);
for (const r of sample) {
  console.log(`[${r.catLabel}] ${r.file}:${r.line} (${r.kind})`);
  console.log(`   ${r.snippet.slice(0, 130)}`);
}

// 反向抽驗: 對每條取原文, 檢查是否真的屬本批品類
console.log('\n=== 反向驗證: 抽 12 條, 回原文看品類 ===');
for (const r of list.filter((_, i) => i % Math.max(1, Math.floor(list.length / 12)) === 0).slice(0, 12)) {
  const lines = fs.readFileSync(path.join(ROOT, r.file), 'utf-8').split('\n');
  const raw = lines[r.line - 1] ?? '';
  const ctx = lines.slice(Math.max(0, r.line - 3), r.line + 2).join(' ').replace(/\s+/g, ' ');
  console.log(`\n[${r.catLabel}] ${r.file}:${r.line}`);
  console.log(`   原文: ${raw.trim().slice(0, 150)}`);
  console.log(`   上文: …${ctx.slice(0, 130)}…`);
}
