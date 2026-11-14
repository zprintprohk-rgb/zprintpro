# 2026-11-14 Merchant 结构化数据真值批 — GO 判定、执行记录与部署后清单

> 日期：2026-11-14 17:2x（Asia/Shanghai）
> 角色：ZprintPro 首席 SEO／AEO／GEO 数据战略分析师
> 依据：`2026-11-14-merchant-structured-data-truth-fix.md`（K3 本地修复与验收）· CT-20261113 裁决与真值纪律 · 协同飞轮（真值 > 内容）
> 性质：对 K3 提问「仅提交获准文件→推送闸门→部署→复跑三语生产验收」的 **GO 判定与执行记录**。

## 〇、判定：GO（已执行）

**判定理由**：① P0 商业语义错误（Merchant Feed 83×3 条零运费、统一固定时效、不可退货、en small-batch 分类页 38 USD vs PDP 0.55 USD、全 SKU 免费打样/DHL 承诺）直接违反 CT 真值纪律并构成 GMC 政策风险；② 修复范围自洽（6 文件，diff 逐行核对均为商家真值相关：撤配送承诺/统一 14 天退货/价格三源同入口/采购承诺仅 MOQ）；③ 门禁全绿（brand 0、encoding 6/6、tsc 54 存量零新增、rule-translation guard 0、diff check 通过）；④ 距上次 push 34 min ≥ 30 min 硬下限。

**已执行**：
- commit `d7042647`（6 文件：新增 `src/lib/merchant-policy.ts` + `pricing.ts`(getProductOfferPrice) + `seo.ts`(采购承诺去承诺化) + `schema-extensions.ts`(分类页价格同源) + PDP page.tsx + merchant-feed route.ts；100+/186-）；
- push 成功（`3f899c5d..d7042647`，`origin/main..HEAD=0`）；CF Pages 部署进行中（run 132401847433）；
- 后台任务 `pwsh-e1f369062b654960`：等部署完成后自动跑 §六.A 三语生产验收（AUDIT_ASSERT=1）。

## 一、GO 核验要点（提交前）

| 检查 | 结果 |
|---|---|
| 获准文件范围 | 6 个 src 文件全部商家真值相关；seo.ts 仅 sourcingIntentKeywords 去承诺化 + 退货策略导入（diff 逐行核对） |
| 未夹带 | title/H1/正文/blog JSON/贺卡资产/301/价格源/UNIT_PRICE_ANCHORS 零改动（报告 §五 与 diff 一致） |
| 规则翻译守卫 | 0 命中（本批无 prompt 变更） |
| 品牌/编码/tsc | A 类 0 / 6 文件 UTF-8 LF / 54 存量零新增 |
| 30min 下限 | 距 16:41 上次 push 34 min ✓ |

## 二、部署后清单（按优先级）

1. **生产验收（§六.A，后台任务执行中）**：12/12 URL 200 + JSON-LD 可解析 + 无 shippingDetails/g:shipping + 退货 14 天 + 价格同源 + 无采购承诺 + 无 Product 重复发射。**验收通过后以该 JSON 为线上验收证据入库（k3 任务）**。
2. **Google 工具**：Rich Results Test 各测一个三语 PDP 与分类页；Search Console URL 检查请求重新索引（RRT「缺少可选配送增强」≠ 应恢复错误零运费）。
3. **Merchant Center 账户级对账（1-3 工作日）**：核对账户级 shipping/returns 配置不会以更高优先级覆盖成「全部免运/全部不可退」；强制重新抓取三条 Feed；GSC 商家信息按 URL 抽样。
4. **复测窗（7-14 天）**：保存生产前基线（`merchant-jsonld-audit-2026-11-14.json`）与部署后 JSON，同 URL 同口径比较；不把结构化修复归因于排名/CTR/询盘（另设 GSC query×page 窗口）。

## 三、边界与残余（不夹带）

- **visible copy 配送承诺**（如 en 规格表「Free US shipping $99+」「100% satisfaction guarantee」「Door-to-door delivery」）**不在本批写域**（报告 §五.3）；已登记的 EN 规格表模板残留（11-13）继续挂后续模板批——schema 与 visible 目前不再互相矛盾，但 visible 自身承诺仍需独立真值任务。
- 本批未 stage/commit 工作树其他会话改动（2087 项中仅 6 个获准文件入批）；`.hermes/tmp` 探针与证据 JSON 留工作树（lane 产物由车道决定提交）。

## 四、给 K3/管理员的后续

① 收后台验收结果（job `pwsh-e1f369062b654960`，约部署完成后数分钟）；② Merchant Center 账户级对账（清单 3）；③ 调度 S4U canary 仍未应用（`repair-zp-scheduler-logon.ps1 -Apply`），今晚 20:13/21:17/23:47 车道触发仍依赖会话常驻；④ 11-13 GSC 三档导出仍未到。

## 数据来源与边界

- `2026-11-14-merchant-structured-data-truth-fix.md` · git diff（6 文件逐行）· `rule-translation-guard.js`（0 命中）· `check-encoding.js`（6/6）· GH check-runs API（部署 in_progress）· 生产页 JSON-LD 基线抓取。
- 本报告只记录 GO 判定与执行；生产验收结果以后台任务输出为准，未跑通前不宣称线上已修复；SOP-10 五问按内部执行记录执行。

（本报告落 `docs/`，同步副本 `重要文件/`。）
