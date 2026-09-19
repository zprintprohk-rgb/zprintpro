/**
 * scripts/guards/title-equiv.js — 全站 title 半角当量统一口径 (2026-09-15)
 *
 * SSoT: docs/2026-09-09-k3-title-rule-v4-write-full.md §一 (CJK×2)
 *       + docs/2026-09-13-title-batch-T-freeze.md §6-3 (K3 2026-09-19 裁决 目标区 50-57, 58 阻断)
 *       + docs/2026-09-15-blog-title-length-research.md (K3 9/15 按推荐执行)
 *
 * 口径:
 *   - 半角当量: 全角 CJK 字符 ×2, 其余 ×1 (2026-09-19 备注: title-audit-v4.mjs 曾自带同等实现,
 *     该脚本阈值已失效并已改为读本模块; 本模块为唯一 SSoT)
 *   - 目标区: 50-57 半角当量 (K3 2026-09-19 裁决, 取代 K3 9/13 的 50-58 与 v4 的 50-54)
 *   - 满格线: >57 禁加 (即 ≥58 硬拦, 防 Google SERP 截断 + 重写风险)
 *   - 不足线: <50 按序补 (GSC 实证长尾 → 数字钩子 → 工艺 → 品牌)
 *
 * 用法:
 *   const { equiv, band, TITLE_MIN, TITLE_MAX } = require('./title-equiv.js');
 */
'use strict';

const TITLE_MIN = 50;   // 半角当量下限 (不足线)
// ★ 2026-09-19 K3 裁决: **58 为阻断线** (非达标上限) ⇒ TITLE_MAX 由 58 改为 **57**。
//   起因: 口径分歧长期存在 —— 本档原写 TITLE_MAX=58 (源 docs/2026-09-13 §6-3「目标区 50-58」),
//   而 K3 近轮反复表述「50≤当量≤**57**，**≥58 硬拦**」。两者永久矛盾 ⇒ 每个批次都坐在 58 边界上。
//   裁决理由 (K3): ① 行业实证 51-60 字符区间重写率最低, 但 58-60 已在上沿;
//   ② 规则一致性优先 —— 书面口径与门禁必须同源, 否则执行层每批都要临场判断。
//   影响 (改前实测): 当量 == 58 的槽位 **8 条** 由「OK」转「TRIM」, 其中 5 条为 en
//   `Free Shipping $99+` 站级模板 (例 removable-stickers 60imp / adhesive-posters 79imp /
//   same-day-flyers(ja) 91imp) ⇒ 违规总数 50 → 58。
//   同步落点: docs/2026-09-13-title-batch-T-freeze.md §6-3 已加取代说明 (书面与代码同源)。
const TITLE_MAX = 57;   // 半角当量上限 (满格线; ≥58 硬拦, K3 2026-09-19 裁决)

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
