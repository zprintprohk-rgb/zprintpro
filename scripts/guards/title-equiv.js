/**
 * scripts/guards/title-equiv.js — 全站 title 半角当量统一口径 (2026-09-15)
 *
 * SSoT: docs/2026-09-09-k3-title-rule-v4-write-full.md §一 (CJK×2)
 *       + docs/2026-09-13-title-batch-T-freeze.md §6-3 (K3 9/13 终裁目标区 50-58)
 *       + docs/2026-09-15-blog-title-length-research.md (K3 9/15 按推荐执行)
 *
 * 口径:
 *   - 半角当量: 全角 CJK 字符 ×2, 其余 ×1 (与 title-audit-v4.mjs equiv 一致)
 *   - 目标区: 50-58 半角当量 (K3 9/13 拍板, 取代 v4 的 50-54)
 *   - 满格线: >58 禁加 (防 Google SERP 截断 + 58% 重写率)
 *   - 不足线: <50 按序补 (GSC 实证长尾 → 数字钩子 → 工艺 → 品牌)
 *
 * 用法:
 *   const { equiv, band, TITLE_MIN, TITLE_MAX } = require('./title-equiv.js');
 */
'use strict';

const TITLE_MIN = 50;   // 半角当量下限 (不足线)
const TITLE_MAX = 58;   // 半角当量上限 (满格线, K3 9/13 终裁)

/**
 * 半角当量计算: 全角 CJK (含 CJK 部首/兼容表意/全角标点/日文假名) ×2, 其余 ×1.
 * 与 title-audit-v4.mjs 的 equiv() 完全一致 (2026-09-15 统一).
 */
function equiv(s) {
  if (!s) return 0;
  return [...String(s)].reduce(
    (n, ch) => n + (/[\u2E80-\u9FFF\uF900-\uFAFF\uFF01-\uFF60\u3000-\u303F]/.test(ch) ? 2 : 1),
    0
  );
}

/**
 * 区间判定:
 *   'OK'    50-58  (达标)
 *   'FILL'  <50    (不足, 按序补)
 *   'TRIM'  >58    (超标, 修剪回 50-58)
 */
function band(s) {
  const e = equiv(s);
  if (e < TITLE_MIN) return 'FILL';
  if (e > TITLE_MAX) return 'TRIM';
  return 'OK';
}

module.exports = { equiv, band, TITLE_MIN, TITLE_MAX };
