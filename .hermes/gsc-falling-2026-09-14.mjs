// GSC 热度下降词分析 — 9/3 canonical (8/7-9/3) vs 9/10 解析 (8/14-9/10) 方向对比
import fs from 'fs';

const hk10 = JSON.parse(fs.readFileSync('.hermes/hk28d-queries.json', 'utf8')); // {q,clicks,imp,pos}
const g93 = JSON.parse(fs.readFileSync('GSC数据/gsc-fresh-2026-09-03.json', 'utf8'));
const q93 = g93.data['28d'].hk.queries; // {query,clicks,imps,ctr,pos}
const map93 = new Map(q93.map(x => [x.query, x]));

console.log('=== 窗口: 9/3 Top100 (8/7-9/3) vs 9/10 解析 78 词 (8/14-9/10) — 方向仅可比 ===');
const rows = [];
for (const r of hk10) {
  const o = map93.get(r.q);
  if (!o) { rows.push({ q: r.q, imp10: r.imp, pos10: r.pos, imp93: null, pos93: null, dPos: null, impPct: null }); continue; }
  const dPos = +(o.pos - r.pos).toFixed(2); // >0 位置上升(pos变小更好), <0 下滑
  const dImp = r.imp - o.imps;
  const impPct = o.imps > 0 ? +((dImp / o.imps) * 100).toFixed(0) : null;
  rows.push({ q: r.q, imp10: r.imp, pos10: r.pos, imp93: o.imps, pos93: o.pos, dPos, impPct });
}

console.log('\n--- A. 位置下滑 TOP (pos 变大 = 排名退; dPos 负值越大越严重) ---');
rows.filter(r => r.pos93 != null && r.dPos < 0)
  .sort((a, b) => a.dPos - b.dPos)
  .slice(0, 15)
  .forEach(r => console.log(`  ${r.q}: pos ${r.pos93}->${r.pos10} (Δ${r.dPos}) | imp ${r.imp93}->${r.imp10} (${r.impPct ?? 0}%)`));

console.log('\n--- B. 展示下滑 ≥20% (排除位置下滑已列) ---');
rows.filter(r => r.pos93 != null && r.impPct != null && r.impPct <= -20 && !(r.dPos < 0))
  .sort((a, b) => a.impPct - b.impPct)
  .slice(0, 10)
  .forEach(r => console.log(`  ${r.q}: imp ${r.imp93}->${r.imp10} (${r.impPct}%) | pos ${r.pos93}->${r.pos10}`));

console.log('\n--- C. 9/3 Top100 有展示、9/10 78 词中消失 (imp 降 0 或跌出前段) ---');
q93.filter(x => !hk10.some(r => r.q === x.query))
  .sort((a, b) => a.imps - b.imps)
  .slice(0, 12)
  .forEach(x => console.log(`  ${x.query}: imp ${x.imps} pos ${x.pos}`));

console.log('\n--- D. 位置上升 TOP (对比参照, 非下降) ---');
rows.filter(r => r.pos93 != null && r.dPos > 0)
  .sort((a, b) => b.dPos - a.dPos)
  .slice(0, 10)
  .forEach(r => console.log(`  ${r.q}: pos ${r.pos93}->${r.pos10} (Δ+${r.dPos}) | imp ${r.imp93}->${r.imp10} (${r.impPct ?? 0}%)`));

// 汇总输出 JSON 供后续引用
const out = {
  window_note: '9/3 Top100 = 8/7-9/3; 9/10 解析 = 8/14-9/10; 仅方向可比, 非同口径周环比',
  falling_pos: rows.filter(r => r.pos93 != null && r.dPos < 0).sort((a, b) => a.dPos - b.dPos),
  falling_imp: rows.filter(r => r.pos93 != null && r.impPct != null && r.impPct <= -20).sort((a, b) => a.impPct - b.impPct),
  disappeared: q93.filter(x => !hk10.some(r => r.q === x.query)).sort((a, b) => a.imps - b.imps)
};
fs.writeFileSync('.hermes/gsc-falling-2026-09-14-result.json', JSON.stringify(out, null, 2), 'utf8');
console.log('\n结果已存 .hermes/gsc-falling-2026-09-14-result.json');
