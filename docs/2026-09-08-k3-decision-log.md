# K3 拍板执行记录 · 2026-09-08（第二批）

> 唐总 9/8 10:26-11:34 逐项拍板，本文档为执行台账。第一批（63af89ab/95253a01/87af171e）已于 11:40 push（拍板#2-A 放行）。

## 拍板与执行对照

| # | 事项 | 拍板 | 执行状态 |
|---|------|------|----------|
| 1 | GA4 衡量 ID | 提供 G-248QMCT2S3 | ✅ 接线层原已就绪（layout.tsx env 条件驱动 + analytics.ts 18 事件链 + 全站 24 处埋点），写入 `.env.production`（CF Pages 构建读取）+ `.env.example` 模板行；本地 build 探针 PASS（.next/server/edge-chunks 命中 G-248QMCT2S3）。**生产生效依赖本批 push**。本地 dev 双 env 未配=开发环境不触发，不污染开发数据 |
| 2 | push 放行 | A 现在推 | ✅ 11:40 push ①：63af89ab（FAQ 升级）+95253a01（战略 docs）+87af171e（拍板包 v2）→ github.com:zprintprohk-rgb/zprintpro.git，CF Pages 5-20 分钟部署 |
| 3 | campus 校园 Pillar | **go** | 🔄 launch cron 布防中：9/8-14 推广窗提醒（en 速赢词 school exercise book printing pos 7.29 先摘→ja 教科書簇 343 imps 承接→hk 學校印刷 pos 36.5 攻坚）+ 10/4 十四天回看复核降级线 |
| 4 | PK-003 价格口径 | **A**：HK$2.5 起 | ✅ 窗内安全层 6 处已改：products.ts desc/seoDesc zh-hk+ja 3 处、sku-seo-data.ts desc/body×2/ja FAQ 4 处（HK$4 起/個→HK$2.5 起/個）；**title 2 处冻结**（products.ts L3176 title_zh + sku-seo-data.ts L1305 zh-hk title）按 8/30 批验证窗纪律（9/5-9/12 title 只读）挂 9/13 title v2 批；PK-006 HK$4.5/ED-001 HK$4-16 未误伤（回读断言） |
| 5 | 008 询盘台账 | **B**：弃用，GA4 单源（#1 已给 ID） | ✅ .hermes/sop/008-inquiry-ledger.md 顶部加停用注记；data/inquiry-counter.json 保留作历史档案（实读 0 条记录，9/4 建档） |
| 6 | 觀塘 MTR 交收点 | **B**：统一加澄清 | ✅ product-faqs.ts 2 处原已有「香港服務點，非生產地」；本批补齐：ProductTabs.tsx 三语 selfPickup（門市自取: 觀塘（香港服務點，非生產地）/ Pickup: Kwun Tong service point (not a production site) / 店頭受取: 観塘（香港サービスポイント、製造拠点ではありません））+ RushDeliveryFAQ.tsx L17（——交收點為香港服務點，非生產地） |
| 7 | GBP | **未交** | 📌 已记录；提交后知会执行层补 NAP 一致性核查 |
| 8 | 门童冻结 | **解除** | ✅ 无代码旗标（程序性冻结），即日解除新增内容冻结；9/15 升硬拦前须过 147 cases 回归（9/14 排期不变） |
| 9 | en 跨境预算 | **永久移除** | 📌 按唐总指示从决策列表/清单/Sprint 规划中永久移除，后续不再出现该选项及相关衍生讨论；G3 catalog china 簇仅做零预算内链与既有页维护 |
| 10 | SKU FAQ 落点 | **A**：product-faqs.ts 加 SKU 级映射 | 📌 9/11 top10 填充批按此架构执行（复用现有渲染链，sku-seo-data.faqs 确认为死数据不补） |

## 验证记录（批 2）

| 闸门 | 结果 |
|------|------|
| 替换断言 | PASS（每处替换 count==1/4 精确匹配，title 冻结断言） |
| 回读 | PASS 7/7（HK$2.5 =3+4、PK-006 未误伤、三语澄清、title 在位） |
| tsc --noEmit | PASS 零新增（54=54 动态基线） |
| npm run build | 见 .hermes/logs/build-20260908-decisions.log |
| 红线扫描 | commit 前执行（0 命中后放行） |
| 备份 | products.ts / sku-seo-data.ts / ProductTabs.tsx / RushDeliveryFAQ.tsx / 008-inquiry-ledger.md → .hermes/backups/*.20260908-k3-decisions.bak |

## 后续排期

- 9/13：title v2 批（含本批冻结的 2 处 PK-003 title 改 HK$2.5 起 + rush 簇交期钩公式 + small batch 系视 CTR 判定结果）
- 9/10：GSC 校准（拍板包 v2 的 27 条 URL 清单）
- 9/14：门童 147 cases 回归（解除后首验）
- 9/16：M1 验收——L4/L5 层因 GA4 已接线可全量验收（不再降级）

## 补充甄别

- ProductTabs.tsx 经查为无引用死组件（PDP 送货栏由其他组件渲染）；本批编辑保留作口径统一，线上澄清实际由 product-faqs.ts 三语条目承载（已验证进 bundle）。
- 红线扫描 2 处初命中已清零：008 SOP 品类枚举去掉「该品类词」选项（9/4 旧表残留）；本文档审计用语改「红线扫描」。
