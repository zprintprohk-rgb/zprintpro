# W3 技术 GEO 审计（JSON-LD 覆盖 + 实体对齐 + hreflang + 仓库并发状态）

- 日期: 2026-09-30（审计执行 2026-09-29 深夜 ~ 09-30）
- 执行: AutoClaw 主会话（前次 W3 子代理跨日消亡未落盘，本报告为主会话直接只读审计重做）
- 性质: 只读审计，src/ 零改动
- 数据来源:
  - `rg` / `git log` / `git status` 命令输出（命令与命中数逐条列于下文）
  - `src/app/[locale]/layout.tsx` L121-131, L168-184
  - `src/lib/seo/schema-extensions.ts` L1-40
  - `Get-ChildItem src -Recurse` 文件时间戳（2026-09-29 21:50:35 最新）
  - AGENTS §5 声明口径 vs 实现比对
- 校准状态: 已校准（本报告即首版基线）；关键结论均双方法或双位置交叉验证（§0.23.2）

## 1. JSON-LD Schema 覆盖矩阵

| 路由类型 | 已注入 Schema | 证据 |
|---|---|---|
| 全站 layout | Organization/LocalBusiness (getSiteNAP) + WebSite + SearchAction | `layout.tsx` L180-184 generateWebsiteJsonLd；`src/lib/seo/seo.ts` getSiteNAP |
| Product PDP | Product (+offers/sku/validFrom 族，per §0.20.5 已修) | rg `@type":\s*"Product` 命中；`src/app/[locale]/product/[slug]/page.tsx` 含 HowTo 引用 |
| Category | FAQPage/Product/Breadcrumb/HowTo（4 主钻品类工艺流程） | `src/app/[locale]/category/[slug]/page.tsx` HowTo 命中 |
| Blog | Article/Breadcrumb/FAQPage + HowTo | `src/app/[locale]/blog/[slug]/page.tsx` HowTo 命中 |
| Services | HowTo | `src/app/[locale]/services/seo/[slug]/page.tsx` 命中 |

**HowTo 结论**: HowTo **已存在**（`src/lib/seo/schema-extensions.ts` L20-40 定义 HowToStep + 生成器，4 主钻品类）。粘贴指令 Workflow 3 所列 "必须生成 HowTo" 的前提已过期，实际缺口是**覆盖率与质量**（哪些指南页还没挂 HowTo），不是从 0 建。
- T43 结论（16 类目 × 3 locale + PDP + FAQPage 已全在线）经本次抽查继续成立。

## 2. hreflang 口径（实现 vs AGENTS §5 声明）

实现（`layout.tsx` L123-130, metadata.alternates.languages）:
```
en-US/en-GB/en-AU/en-CA → /en ; ja-JP → /ja ; zh-HK → /zh-hk ; x-default → /
```

| 项 | AGENTS §5 声明 | 实际实现 | 判定 |
|---|---|---|---|
| zh-hk | zh-hant-HK | **zh-HK** | ⚠️ 偏差（BCP47 均合法，Google 接受 zh-HK；但与 SSoT 文档不一致，需 K3 拍板统一口径或修文档） |
| x-default | =zh-hant-HK 落点 | **`/`（根路径）** | ⚠️ 偏差（x-default 指向根路径，非 zh-hk 页；影响小但不符声明） |
| en | en | en-US/GB/AU/CA 四变体全指 /en | ✅ 比声明更细，无冲突 |
| ja | ja-JP | ja-JP | ✅ |
| 架构 | — | Next.js metadata 自动输出，layout 级手渲染已移除（L173-178 注释） | ✅ 正确架构（深层页 hreflang 带正确 path） |

- 注: layout 级 manifest link 上的 `hrefLang` 属性（L170-172）是 PWA manifest 区域提示，非页面 hreflang，不冲突。

## 3. 实体对齐（多语种 Entity Alignment）

- **NAP**: getSiteNAP 按 locale 返回品牌（zh-hk=智印港 / alternateName 含 ZprintPro 族）+ 真实深圳地址（per 8/7 拍板，zh-hk 与 ja 对齐真实主体）。✅
- **sameAs**: `seo.ts` 中 sameAs 数组为**空壳**（`// HK business directories (to be created)` 注释占位）→ **Organization 实体信号缺口 #1**。与 §13.16.1（30 目录目标）联动：目录建设未落地前 sameAs 持续为空。
- **SKU 三语种对齐**: products.ts 存在 title_zh/en/ja 结构（本次抽查确认字段族存在；逐 SKU 对齐率未深查，留待 W2 重构时按页补验——避免本轮膨胀）。
- **foundingDate**: rg 未在 seo.ts/siteConfig 命中独立字段（§13.14 要求从 siteConfig 常量取）→ 待 W2 触及时核查，暂记观察项。

## 4. 仓库并发状态（写决策用）

- 最新 commit: `c30c3647 2026-09-29 22:51 cron(ZP-gsc-feedback)`；之前 `e77a20dd 21:55 cron(ZP-daily-content)`。
- 最后 src 写入: `src/data/blog-data/ja.json` 2026-09-29 21:50:35 → 距本轮审计 **≥15 min 静默窗口满足**（§0.35.7 条件②）。
- `git status --porcelain` 783 行（方法一计数）= M 13 + D 28 + ?? 742（方法二分组求和 13+28+742=783，双方法一致）。
- 13 M 构成: 6 sitemap（cron 刷新）+ 2 regression-guard 记录 + AGENTS.md（**宿主 app-context 标记块自动增删噪音，非人工编辑**，diff 仅 -10 行标记块）+ 4 附属；28 D 全部为冻结目录 `zprintpro-en-us-images/`（§0.25.9.3 冻结名单）；?? 742 主体为 `.hermes/` 内部产物 + 根目录 `_tmp_*` 历史脚本。
- 判定: 无人工未竟改动，`SESSION_LOCK.md` 状态 RELEASED（2026-09-29 02:2x 上一会话释放）。内部文件与 docs 可安全写入；**src/ 本轮零改动**，无需触发双条件完整判定。

## 5. W3 缺口清单（按优先级）

1. **sameAs 空壳**（Organization 实体信号 = 0 外部锚点）→ GEO 实体对齐最大短板；需目录建设推进后回填。
2. **hreflang 口径偏差**（zh-HK vs zh-hant-HK；x-default→/ vs →zh-hk）→ 需 K3 拍板「改实现」或「改 §5 文档」，改动属 src 行为变更，攒批执行。
3. **HowTo 覆盖率清单**（已建生成器，但哪些指南页缺挂未盘点）→ 随 W2 重构逐页补。
4. **SKU 三语种实体对齐率未量化** → W2 首批 3 页重构时按 SKU 逐一对齐并记录（哑粉纸=Matte Art Paper=マットコート紙 类术语表落进重构产物）。
5. **foundingDate 常量化未确认** → 观察项，触及时修。

## 6. 本轮红线执行记录

- src/ 零改动（只读审计）✅
- 全部产出落 `.hermes/geo/`（内部目录）✅
- 双方法复算: 783 计数 ✅ / hreflang 双位置验证 ✅ / HowTo 双文件验证 ✅
- 未触碰: 名片展示层、middleware 301、既有贺卡资产、冻结名单、宿主标记块 ✅
