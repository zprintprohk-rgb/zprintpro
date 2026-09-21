/**
 * title-window-freeze.ts — 验证窗冻结 slug 集合（2026-09-20 批次1, 冻结 2-4 周至 ~2026-10-04）
 *
 * 来源: .hermes/reports/title-flywheel-approved-2026-09-20.json（42 提案 / 36 slug, K3 9/20 拍板冻结）
 * 用途: PDP H1 渲染切换（page.tsx）时避让——冻结 slug 维持旧渲染, 不污染 9/20 批 CTR 验证窗。
 *
 * ⚠️ 维护纪律: 窗满(2026-10-04)对账后本文件应清空或删除; 新增冻结批次须另建集合, 禁就地混写。
 * 本文件由 .hermes/_gen-freeze.cjs 从源头 JSON 生成（SOP-5: 禁手搓）, 重生成命令:
 *   node .hermes/_gen-freeze.cjs
 */
export const TITLE_WINDOW_FROZEN: ReadonlySet<string> = new Set([
  'a5-flyers',
  'adhesive-banners',
  'can-badge',
  'colored-envelopes',
  'cosmetic-boxes',
  'custom-calendars',
  'custom-red-packets',
  'desk-calendars',
  'doujinshi-printing',
  'eco-flyers',
  'eco-paper-bags',
  'eco-red-packets',
  'eco-tote-bag',
  'exercise-books',
  'foil-red-packets',
  'folded-leaflets',
  'food-boxes',
  'fruit-food-label-stickers',
  'gang-run-card-boxes',
  'graduation-yearbook',
  'hardcover-books',
  'large-red-packets',
  'magnetic-closure-gift-box',
  'mini-calendars',
  'pearl-envelopes',
  'perfect-bound-books',
  'photo-frame-calendars',
  'roll-up-banners',
  'school-flyers',
  'small-bags',
  'spiral-notebooks',
  'thick-greeting-cards-400g',
  'thick-paper-flyers',
  'transparent-stickers',
  'vehicle-wraps',
  'wall-calendars',
]);
