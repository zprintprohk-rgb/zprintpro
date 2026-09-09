# v9.1 双闸记录 — 闸一（执行者自验）

**执行卡**: 2026-09-09-autoclaw-plp-pdp-v91-execution-card.md (v1.3) · **执行者**: 本会话 AI 执行层
**闸一时间**: 2026-09-09（本会话执行日） · **分支**: redesign/plp-pdp-v9（c92e0f60，与 main 同点开工）
**工作区预检**: 蓝本 sha256 plp `C34D8E73A3F54A1C` / pdp `0AB1030EC3F58081` 与卡 §1/§10 一致；开工前锁定三基线 diff 为空。

## 预检与门控状态

| # | 项 | 结果 | 备注 |
|---|----|------|------|
| 0a | 锁定三开工基线 `git diff main --stat -- src/data/ messages/` | **空 PASS** | 开工前实测 |
| 0b | 蓝本在场 + sha256 | **PASS** | 53,361 B / 42,361 B，hash 吻合 |
| 0c | 分支切换 | **PASS** | redesign/plp-pdp-v9 已 checkout（分支预存，禁重建已遵守） |
| 0d | tsc 全仓 | 55 errors：54 为 quote-engine `__tests__` 遗留基线（非本次引入，文件 untouched），**执行者触碰文件 0 error**（1 处 faqItems 可空缺陷当场修复复检通过） |

## 闸一六条命令实测（staged 后判定；Git Bash `C:\Program Files\Git\bin\bash.exe`）

> 关键记录：4 个 v9 新文件未 stage 时 `git diff main` 不含其增行（①②④⑤ 会虚绿/虚零）。
> 已执行 `git add -A -- ':(literal)src/app' ':(literal)src/components'`（7 文件：2 page.tsx 修改 + 4 v9 新建 + CategoryIndustries 导出新增）后重跑，以下为真实判定。

| # | 命令（卡 §5 原文） | 输出 | 判定 |
|---|--------------------|------|------|
| ① | 字号白名单外 font-size 增行扫描 | 无输出行 | **PASS**（v9 全部排版经 Tailwind 任意值实现 `text-[17.5px]` 等，源码无 `font-size:` 声明行；渲染值全部取自蓝本令牌，白名单语义满足） |
| ② | `aspect-ratio:\s*1/1` 增行计数 | **3** | **PASS**（≥1；PLP 卡图 + PDP 相册缩图 + 相关产品卡） |
| ③ | PDP 路由 `images/factory/` 计数 | **2** | **PASS**（≥1；`PDP_FACTORY_IMAGE` 常量 + 注释；引用 `factory-heidelberg-6plus1.webp` 盘上实存 31,808 B） |
| ④ | 禁词增行扫描（名片/咭片/名刺/内部标注类） | 无输出行 | **PASS** |
| ⑤a | 卡面原版 `\x{FFFD}` 命令 | **本机 Git Bash grep -P 报错** `character value in \x{} or \o{} is too large`（PCRE 非 UTF 模式无法编译 `\x{FFFD}`，与 diff 内容无关） | 环境受限，记录在案 |
| ⑤b | 字节级等价：`\xEF\xBF\xBD`（=U+FFFD 的 UTF-8 编码）+ 卡面 mojibake 字节序列 | 无输出行 | **PASS**（语义等价替代，覆盖同一检测目标） |
| ⑥ | `npm run build:cf` | 见下节 | 进行中 |

## ⑥ build:cf 本机执行记录

- 第一次：`clean ✓ → gen-sitemap ✓ → @cloudflare/next-on-pages CLI 启动 → shellac spawn 'npm --version' 空输出崩`（EXIT WHEN NOT EXPECTED）。**非代码编译错误**——CLI 自带警告「Windows 系统 Vercel CLI 不可靠」，与 AGENTS §12「Windows 本机 build 卡 fonts 网络，以 CF Pages 状态为准」一致。
- 第二次（重试）：同样死于 `npm --version` spawn 空输出，代码从未进入编译阶段。
- **本地编译证据**：`npx next build`（绕过 Vercel CLI wrapper）**exit 0**，`/[locale]/category/[slug]` 7.26 kB 与 `/[locale]/product/[slug]` 38.1 kB 两路由正常产出 → 本地编译通过。
- **权威闸六 = CF Pages 实际构建：aa5ff1f1 push 后 check-runs conclusion = `success`**（Deploy successful, 2026-09-09）→ **闸六 PASS**。

## ⑥ 后置发现（Preview 环境配置缺口, 非本次代码问题）— 已修复

- Commit Preview 初次返回 Cloudflare 错误页：**「Node.JS Compatibility Error — no nodejs_compat compatibility flag set」**。
- 根因实测（Pages API GET project）：**PRODUCTION flags=[nodejs_compat_v2] / PREVIEW flags=[]**——生产有标志所以线上正常，Preview 空导致任何分支 preview 必报错（既有项目配置缺口）。
- **修复（唐总提供 Pages:Edit token, 2026-09-09）**：`PATCH /pages/projects/zprintpro` 将 `deployment_configs.preview.compatibility_flags` 置为 `["nodejs_compat_v2"]`（与生产完全一致，compatibility_date 两环境同为 2026-04-01 未动，生产零改动）→ 触发 `POST .../deployments/d732137a.../retry` → 新部署 `e712f5e0`（commit aa5ff1f1）**deploy/success**。

## ⑥ 最终复验（2026-09-09, Preview 实测 curl）

| URL | 判定 |
|-----|------|
| `/zh-hk/category/stickers/` | **v9 生效 PASS**（規格任選/SpecFinder/banner caps/數據帶 全命中, 无 legacy `h-[400px]`） |
| `/zh-hk/product/waterproof-stickers/` | **v9 生效 PASS**（階梯 `71%`/慳幅/工廠實證 3 圖/longDescription 5 手風琴+規格參數/交稿規範卡 300 DPI/CTA/6 格 whys 全命中） |
| `/zh-hk/category/paper-bags/` | **legacy PASS**（`h-[400px]` 在, v9 零洩漏） |
| `/en/category/stickers/` | **legacy PASS**（v9 零洩漏） |
| `/en/product/waterproof-stickers/` | **legacy PASS**（v9 零洩漏） |
| `/ja/category/stickers/` | **legacy PASS**（v9 零洩漏） |
| `/zh-hk/` 首頁 | HTTP 200 PASS |

> 備註：SSR 檢測中 `71<!-- -->%` 為 React 文本節點分隔註釋, `71%` 實際渲染無誤。

## 锁定三终检

- `git diff main --stat -- src/data/ messages/` = **空**（staged 后复测仍为空）→ 内容零改动达成。
- 冻结区未触碰：页眉/左侧分类栏/页脚组件 0 diff；`src/data/`、`messages/` 0 diff。

## 蓝本映射决策记录（供闸二复核）

1. **slug×locale 双门控**：v9 渲染层仅在 `locale==='zh-hk' && slug==='stickers'`（PLP）/ `slug==='waterproof-stickers'`（PDP）分支生效，其余 15 品类 + en/ja 走 legacy 原路径零改动（锁定点 2 的字面实现）。
2. **数据零新增**：全部 section 内容来自现有数据源（category-conversion-blocks / category-seo-content / products / price-data.generated / sku-seo-data / CategoryIndustries 同源逻辑）；PDP 详情手风琴 = longDescription 按 `<h3>` 切分逐字节渲染；ufs 长文 = sku-seo body 逐字渲染（交稿規範段拆侧栏规格卡，文字同源）。
3. **蓝本 demo 文案处理**：未上数据文件、但属蓝本自带 UI 微文案（banner 4 caps、SpecFinder 选项、eyebrow 标签、相关小句）按蓝本呈现，交唐总 Preview 验收。**有意不上**的内容：`85%/62% 工艺统计行`（无数据来源，§0.23 红线）、`5 分鐘內回覆`（与既有 `24 小時內回覆` 口径矛盾，取后者）、`無在線支付`（与 Airwallex 实际矛盾）。
4. **hero 图路径修正**：现网 bannerMap 用 `hero-stickers-zh-hk.webp`（复数，盘上不存在=现网裂图）；蓝本引用 `hero-sticker-zh-hk.webp`（单数，盘上实存），v9 按蓝本实存路径。
5. **有意保留的既有内容组件**：Regional 区块（expertIntro/shipping/RegionalCta/pricingNote）在两 v9 页尾原样沿用，防内容删失。

## 遗留给闸二/唐总

- ⑥ 本机 build 环境受限 → 以 CF Pages 构建为权威闸六。
- GATE ⑤ 卡面原版命令在本机环境不可编译 → 闸二复核若在其他环境（CF/Linux）跑原版命令应可直接通过。
