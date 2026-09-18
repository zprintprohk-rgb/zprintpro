# 2026-09-10 · v9.2 任务 B1 验收报告（zh-hk 全 16 品类 PLP 模板对齐）

> 指令：K3 指令包 v9.2（docs/2026-09-10-k3-directive-v92-template-rollout.md）任务 B 批 B1
> 蓝本：`https://zprintpro.com/zh-hk/category/stickers/` 定型页（唯一 SSoT，禁止自由发挥）

## 批次 / commit / 改动文件数

**分支提交（3 个，1 push 攒批）**：
- `f24daac6` feat(plp): B1 zh-hk 全16品类 PLP 模板对齐（3 文件，111+/34-）
- `862eed1c` fix(plp): B1探针修正 — SpecFinder purposes 默认 []（防贴纸用途泄漏）
- `44e80330` fix(nav): 挂账1-C清偿 — en/ja navOrder 纸袋移至末位

**改动文件（src 4 个 + 脚本 1 个，数据层 0）**：
`page.tsx`（门控）/ `CategoryPageV9.tsx`（泛化）/ `SpecFinderV9.tsx`（options 模式）/ `Header.tsx`（en/ja 导航序）/ `scripts/check-bc-ban.mjs`（白名单）
→ **merge main SHA：`237ee53b`（15:14:38 push，距上次 30m29s 合规）；CF deploy：`be21022d` success**

## 6 条验收逐条

| # | 验收项 | 结果 |
|---|--------|------|
| 1 | 内容零改动 `git diff --stat -- src/data/ messages/` | ✅ 0 diff（全部内容取自现有数据源，禁机翻新造） |
| 2 | 编码 + tsc + build | ✅ encoding UTF-8 LF 全过；tsc **54=54 基线持平**（分支基线，无新增）；本地 `next build` PASS |
| 3 | 禁词红线 | ✅ 我的 5 文件 0 命中；bc-ban：GSC_404_R2 豁免落地（挂账2）+ 37 处 pre-existing 声明放行（见挂账3） |
| 4 | 字号基线 17.5px | ✅ v9 模板 `text-[17.5px]` 保持（CategoryPageV9 L159） |
| 5 | 图片存在性 | ✅ 12 类真实 hero 图逐一对账（ls public/images/hero/ 实证）；4 类无图（greeting-cards/japan-doujin/wedding-invitations/place-cards）→ 藏青渐变占位（代码注释声明，B2/B3 补图后接入） |
| 6 | 线上抽查 | ✅ 16/16 zh-hk 品类 200；stickers 回归（Sticker Printing + 用途选项保留）✓ / flyers 新 v9（Flyers eyebrow + 无贴纸用途泄漏）✓ / greeting-cards 渐变 banner 无 hero + 无用途泄漏 ✓ / en legacy 隔离 ✓ / en 导航序 paper-bags 移末位 ✓ |

## 泛化方案（stickers 定型页 → 可复用模板，内容零改写）

1. **Banner hero**：`V9_HERO_BASE` 按真实文件映射 12 类（hero-flyer/gift-box/kraft-bag/sticker 等，非「hero-{slug}」规则——以 `ls public/images/hero/` 实证为准）；无图 4 类 → 渐变底。
2. **产品网格 eyebrow**：stickers 保持「Sticker Printing」逐像素不变；其余用 `category.nameEn`（products.ts 注册）。
3. **SpecFinder 泛化**：非 stickers 由 `products.specs.material` + `minQuantity` 实数据派生材質/數量选项（映射到真实 SKU 跳转）；**用途下拉仅 stickers 有**（无通用数据源，防编造）；stickers 不传 options → 硬编码默认不变。
4. **空值守卫**：section1 quickAnswers / industries / socialProof / guide / FAQ / orderFlow / compare 全部条件渲染——无转换块的 4 品类（banners/greeting-cards/wedding-invitations/place-cards）自动隐藏空区块。
5. **page.tsx 门控**：`isV9Stickers` → `isV9ZhHk(locale)`（函数门控 + 显式 `:boolean` 禁用 TS5.5 推断类型谓词，防 legacy 分支 locale 收窄报 TS2367）；en/ja legacy 零影响。

## 已知偏差/挂账清偿（本段闭环）

**挂账 1（C 执行）✅ 清偿**：前置验证确认 en/ja 纸袋首位**非有意**（行谱系仅 V21 创建、8/11 zh-hk 按搜索量重排未同步、pillar v2 纸袋降级战略矛盾）→ 按裁定 C 将 en/ja navOrder 纸袋移至末位（`44e80330`），三语言导航序一致，共享 `-240px` 偏移全正确。验证退路：未触发（无布局依赖问题）。

**挂账 2 ✅ 清偿**：按裁定修 `scripts/check-bc-ban.mjs` 白名单（`faf84eac`），豁免面**严格限定** `next.config.js` GSC_404_R2 数组块内 URL 对/注释行；重扫确认 GSC_404_R2 源行 0 报。**更正**：Task A 报告所称「bc-ban 1 条命中」不实——当时仅看输出尾部，实际阻断行 ~37+ 条 pre-existing（本报告逐条列明）。

**挂账 3（新增，待 K3 裁定）**：bc-ban 剩余 37 处 pre-existing 阻断行（均非本次引入，我的文件 0 命中）：
- 死代码键：`CategoryProductCard/CategorySidebar/HotProducts/ProductCard/ProductTabs/ProductTabs.tsx/h1-builder/pricing` 的 `'business-cards'` icon/H1/价格锚点键（legacy en/ja 组件仍引用）
- 搜索承接机制误报：`search-helpers.ts:36`（名片→贺卡 alias 承接行，含「名片/咭片/名刺」但无 greeting 字面，脚本不豁免）；`quotation-widget.tsx:46`（グリーティングカード relabel）
- 测试文件：`search.regression.test.ts`（名片/咭片/名刺 搜索回归用例）
- 数据类型：`types/quotation.ts:5` ProductType 联合含 'business-card'
- 注释：`next.config.js:156`（GSC_404_R2 数组外历史注释）；`route.ts:20`、`blog-posts.ts` 2 个 legacy 博客条目、`category-seo-content.ts` 注释
- **建议**：A 批清理（移除死代码键/测试沿用）；B 脚本二轮白名单（承接映射行 + BC-BAN-DEPRECATED 测试文件 + §11 业务子类目键，严格限定清单）；C 维持现状放行。**本次按 §6.1 声明放行，未硬修（触及 legacy/数据 = 越权）**。

## 数据来源
- K3 拍板：docs/2026-09-10-k3-directive-v92-template-rollout.md（任务 B）+ 会话裁定（挂账1 C / 挂账2 白名单授权）
- 实证：git f24daac6/862eed1c/44e80330/faf84eac；`ls public/images/hero/`（12 类图）；`category-conversion-blocks.ts` 键控（12 品类 zh-hk）；tsc/build 本地跑
- 生产探针：CF deploy `be21022d`（2026-09-10 15:1x HKT）+ curl 抽查 6 项全 PASS（16 品类 200 / stickers 回归 / flyers / greeting-cards / en legacy / en 导航序）
