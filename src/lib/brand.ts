/**
 * 商品结构化数据（schema.org Product.brand）的唯一集团品牌值
 *
 * 2026-11-01 新建（GMC「字段 brand 重复」51→60 项修复）
 *
 * 为什么需要单一常量：
 *   - 商品节点 `@id` 是 per-locale 的（/{locale}/product/{slug}/#product）；
 *   - Google 按 hreflang 把三语页面归并为同一商品实体；
 *   - 旧实现让 Product.brand 跟随页面语种取值（三种不同品牌名），
 *     同一商品于是出现三个 brand 值 → 「Duplicate field: brand」→ 内容无效、不进富媒体结果；
 *   - 线上 DOM 取证（2026-11-01，真实浏览器渲染后）：每页仅 1 个 Product 节点、1 个 brand，
 *     无重复注入、无 microdata/meta 重复 → 排除"页内重复"，确认为跨语归并冲突。
 *
 * 边界（刻意保留，勿合并）：
 *   - 可见品牌分层（标题 / H1 / UI 文案 / Organization seller 名称）**仍按语种**，走 `getBrandName(locale)`；
 *   - 本常量**只**用于机器身份字段：Product.brand、ItemList 内嵌商品 brand、商品 feed 的 g:brand。
 *
 * 依据：GSC 商家信息「字段 brand 重复」受影响 51 项（2026-10-29）→ 60 项（2026-10-30）；
 *      GMC 该店铺未配置 feed，走「由 Google 发现」（每 24 小时抓取，233 商品）。
 */
export const PRODUCT_BRAND_NAME = 'ZprintPro';
