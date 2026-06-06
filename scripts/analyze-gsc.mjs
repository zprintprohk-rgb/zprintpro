// 替代 auto_patch_backup.py 的核心逻辑
// 因为本机没 Python，用 Node 跑同样的：读 GSC CSV → 找高潜力词 → 提 FAQ 建议
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const csv = fs.readFileSync(path.join(ROOT, 'gsc_data.csv'), 'utf-8');
const lines = csv.split(/\r?\n/).filter(l => l.trim());
const header = lines[0].split(',');
// 热门查询,点击次数,展示,点击率,排名
const colIdx = {
  query: header.findIndex(h => h.includes('热门')),
  imp: header.findIndex(h => h.includes('展示')),
  rank: header.findIndex(h => h.includes('排名')),
};

const rows = [];
for (let i = 1; i < lines.length; i++) {
  const cells = lines[i].split(',');
  const kw = cells[colIdx.query];
  const imp = parseInt(cells[colIdx.imp]);
  const rank = parseFloat(cells[colIdx.rank]);
  // 排除旧品牌"智印港"
  if (kw.includes('智印港')) continue;
  // 高潜力：展示>50 且排名 20-50
  if (imp > 50 && rank >= 20 && rank <= 50) {
    rows.push({ keyword: kw, impressions: imp, rank });
  }
}
rows.sort((a, b) => b.impressions - a.impressions);
const top = rows.slice(0, 10);
console.log(`高潜力关键词 ${rows.length} 个，取 top ${top.length}：`);
top.forEach((r, i) => console.log(`  ${i + 1}. ${r.keyword} | 展示=${r.impressions} | 排名=${r.rank}`));
