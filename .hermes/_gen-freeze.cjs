const fs = require('fs');
// K3 2026-09-23 拍板: 「只有排名进前10的SKU,并且是有点击的情况下，SKU标题才冻结，不满足这个要求的全部解冻」
// 冻结集合 = 主词 GSC 28d 排名 <=10 且 点击 >0 的 slug（.hermes/reports/freeze-repartition-2026-09-23.json）
// 取代 2026-09-21 的 23 slug 集合（旧口径只有排名<=10, 未要求有点击）。
const r = require('./reports/freeze-repartition-2026-09-23.json');
const slugs = [...r.frozenSlugs].sort();
const body = `/**
 * title-window-freeze.ts — 验证窗冻结 slug 集合（2026-09-23 重划, K3 拍板「只有排名进前10且有点击的SKU标题才冻结」）
 *
 * 来源: .hermes/reports/freeze-repartition-2026-09-23.json（${r.frozenCount} 冻结 / ${r.unfrozenCount} 解冻）
 * 口径: slug 任一 locale 主词（标题首段）在 GSC 28d 查询表存在「完整包含主词」且 排名<=10 且 点击>0 的查询 → 维持冻结;
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
