// moq10-validate-v2.ts — 抽驗 v2 報告的「①改 MOQ」179 條
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const json = JSON.parse(fs.readFileSync(path.join(ROOT, '.hermes/logs/moq-price-sync-classification.json'), 'utf-8'));
const list = json.changeMoqList as any[];
console.log(`①改 MOQ: ${list.length} 條\n`);

const step = Math.max(1, Math.floor(list.length / 20));
for (let i = 0; i < list.length && i / step < 20; i += step) {
  const r = list[i];
  const raw = (fs.readFileSync(path.join(ROOT, r.file), 'utf-8').split('\n')[r.line - 1] ?? '');
  console.log(`[${r.catLabel} 目標 ${r.target}] ${r.file}:${r.line}  匹配=「${r.matched}」`);
  console.log(`   ${raw.trim().slice(0, 160)}`);
}
