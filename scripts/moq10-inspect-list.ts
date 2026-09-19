// moq10-inspect-list.ts — 抽驗逐條清單兩端 (high 與 low)
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const j = JSON.parse(fs.readFileSync(path.join(ROOT, '.hermes/logs/moq-price-sync-action-list.json'), 'utf-8'));
const list = j.changeMoq as any[];

for (const conf of ['high', 'mid', 'low'] as const) {
  const sub = list.filter((r) => r.confidence === conf);
  console.log(`\n========== ${conf} (${sub.length} 條) ==========`);
  const step = Math.max(1, Math.floor(sub.length / (conf === 'high' ? 8 : 6)));
  for (let i = 0; i < sub.length && i / step < (conf === 'high' ? 8 : 6); i += step) {
    const r = sub[i];
    console.log(`[${r.catLabel}] ${r.file}:${r.line}  「${r.matched}」→「${r.targetText}」`);
    console.log(`   依據: ${r.confReason}${r.fieldHint ? ' | 欄位=' + r.fieldHint : ''}`);
    console.log(`   ${r.context.slice(0, 150)}`);
  }
}
