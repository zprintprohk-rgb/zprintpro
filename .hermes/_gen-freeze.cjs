const fs = require('fs');
// K3 2026-09-21 拍板: 「没有进前10的主词全部不冻结」
// 冻结集合 = 主词 GSC 28d 排名 <=10 的 slug（.hermes/reports/freeze-repartition-2026-09-21.json）
// 取代 2026-09-20 批次1 的 36 slug 集合。
const r = require('./reports/freeze-repartition-2026-09-21.json');
const slugs = [...r.frozenSlugs].sort();
const body = `/**
 * title-window-freeze.ts — 验证窗冻结 slug 集合（2026-09-21 重划, K3 拍板「没进前10的主词全部不冻结」）
 *
 * 来源: .hermes/reports/freeze-repartition-2026-09-21.json（${r.frozenCount} 冻结 / ${r.unfrozenCount} 解冻）
 * 口径: slug 任一 locale 主词（标题首段）在 GSC 28d 查询表存在「完整包含主词」且排名 <=10 的查询 → 维持冻结;
 *       其余 slug 全部解冻, 可进入新一轮标题飞轮。
 * 数据: .hermes/gsc-2026-09-18/extract.json new.combo_28d 查询表（1000 行, 品牌词已排除）。
 *
 * ⚠️ 维护纪律: 窗满对账后本文件应清空或删除; 新增冻结批次须另建集合, 禁就地混写。
 * 本文件由 .hermes/_gen-freeze.cjs 从源头 JSON 生成（SOP-5: 禁手搓）, 重生成命令:
 *   node .hermes/_gen-freeze.cjs
 */
export const TITLE_WINDOW_FROZEN: ReadonlySet<string> = new Set([
${slugs.map(s => `  '${s}',`).join('\n')}
]);
`;
fs.writeFileSync('F:/zprintpro-nextjs/src/data/title-window-freeze.ts', body);
console.log('written', slugs.length, 'slugs');
