# E6 eco-paper-bag-gsm 展示退场诊断（数据批 · 不盲改）

> 任务源: `docs/2026-10-26-dual-engine-seo-aeo-geo-deep-strategy.md` §5.1 E6 + §5.2 表（`/en/blog/eco-paper-bag-gsm/` 103→0）。
> 执行: DeepSeek 执行层（数据批）· 2026-10-26
> 结论: **根因假设 3 条 + 证据；修复动作留待 K3 拍板（本条禁止直接重写）**。

## VERDICT / CONSUMED / DELIVERED / NEXT

```
VERDICT: PARTIAL（诊断完成；索引状态需 K3 URL Inspection 补充）
CONSUMED: page-probe-2026-10-26.json @ 10/26 | gsc_data.csv @ 10/26 | GSC数据/*.xlsx (9/3–10/23) | git log pillar-content.ts | pillar-content.ts 内容读
DELIVERED: 本诊断报告（无 src 改动，符合「不盲改」）
NEXT: K3 URL Inspection 确认索引状态 → 拍板修复方向（A/B/C/D 见 §5）
```

## 1. 数据来源行（§0.23）

- **线上探针**: `.hermes/logs/page-probe-2026-10-26.json`（2026-10-26 抓取，`/en/blog/eco-paper-bag-gsm/`）
- **GSC 查询快照**: `gsc_data.csv`（2026-10-26 最新导出，列：热门查询/点击/展示/CTR/排名）
- **GSC 窗口导出**: `GSC数据/*.xlsx`（2026-09-03 至 2026-10-23，7/24/28 天 + 3 个月 + 实时窗口，共 ~100 文件，openpyxl 扫描）
- **变更史**: `git log -- src/data/pillar-content.ts`（最近 15 次 commit）
- **页面源码**: `src/data/pillar-content.ts` L400-432（ecoPaperBagGsmCluster 三语内容）
- **内链**: `grep -r "eco-paper-bag-gsm" src/`（全库 4 处）
- **路由**: `src/app/[locale]/blog/[slug]/page.tsx` L858-869（`getClusterBySlug` + `/{locale}/` 渲染替换）

## 2. 双方法复算（§0.23.2）

| 结论 | 方法 1 | 方法 2 | 一致 |
|---|---|---|---|
| 页面线上健康（200/index/canonical/schema） | page-probe JSON 字段（status/title/canonical/schema_types） | 策略文件 L211 引用同一探针 | ✅ |
| eco 长尾不在热门导出 | openpyxl 扫描 100+ xlsx（`eco paper bag`/`eco-paper-bag` 命中 0） | gsc_data.csv 快照（`eco paper bag gsm` 无行；`eco paper bag` 排名 1.0 展示 1） | ✅ |
| 内链仅 4 处 | grep 全库（breadcrumb/pillar/cluster 各 1 + 导出 1） | 无 kraft/white-card PDP 反向链接（grep 无命中） | ✅ |
| 近 4-8 周无内容更新 | lastUpdated=2026-05-14（源码字段） | git log 最近内容 commit 9a991b48（9 月 CRED sweep，非内容刷新） | ✅ |

## 3. 证据

### 3.1 线上健康（探针）
`/en/blog/eco-paper-bag-gsm/` = **200 / 166,526 bytes**；robots `index, follow`（meta ×2）；canonical 自指 `https://zprintpro.com/en/blog/eco-paper-bag-gsm/`；h1 = title；schema = Article + BreadcrumbList + HowTo + SpeakableSpecification + WebSite。

> ⚠ 判据提醒（策略 §5.1 E6 原文）：「200 + index/follow + 自指 canonical **不能证明已被索引**」——索引状态需 GSC URL Inspection（K3 管理员）。

### 3.2 GSC 现状（本地可查部分）
- `gsc_data.csv`（10/26 快照）eco 相关 14 行，全部 0 点击；`eco paper bag` 排名 **1.0**（展示 1）——主词仍在首页，但展示量极小。
- `eco paper bag gsm` 长尾在快照与全部 100+ xlsx 导出 = **0 行**（当前窗口 0 展示）。
- 「前期 103」数据点**无本地原始序列**（xlsx 只含热门查询；103 来自 Kimi GSC 后台更长窗口分析）——**时间线（哪个窗口 103 → 哪个窗口 0）无法本地复算，标注待 Kimi/K3 提供窗口口径**。

### 3.3 变更史（近 4–8 周）
| commit | 日期 | 与页面关系 |
|---|---|---|
| 9a991b48（CRED sweep A+D） | 9 月 | 改 FSC 段：假证书 `FSC C123456` → `文件備索`（K3 8/24 拍板，正确动作）+ ISO 9001 → 國際認證 |
| dfc7fa22（broken-links-w6） | 8 月 | 内链补前缀（页面内链修复） |
| eafc8458（en purge HK） | 更早 | en 段 US 定位 |
| 早先批次 | 更早 | 内容创建（date 2026-05-13） |

**lastUpdated = 2026-05-14**——内容 5 个月无实质刷新。

### 3.4 内链（全库 4 处）
1. `breadcrumb-names.ts` L115（面包屑名）
2. `pillar-content.ts` L138（packaging-guide pillar `clusters` 数组 → 相关文章块）
3. `pillar-content.ts` L401（定义）+ L486（导出）
4. `cluster-content.ts` L266（另一数据源，slug 带 `blog/` 前缀——渲染未确认使用）

**缺口**: `linkedProducts` 指向 kraft-paper-bags / white-card-bags（页面 → 产品单向），**产品页 / 类目页无反向链接回该指南**（全库 grep 无命中）——内链薄弱，页面仅从 pillar 相关块 + 面包屑获得权重。

### 3.5 内容质量疑点（读三语 content）
| 疑点 | 位置 | 说明 |
|---|---|---|
| **模板尾巴** | zh/en/ja 尾部「成本效益分析」段 | 「嚴格追踪您的活動指標：測量**促銷傳單的兌換率**、監控**包裝的開箱視頻**、調查**客戶對貼紙吸引力**」——促销传单/贴纸调查内容与纸袋 GSM 主题无关（模板拼接残留，三语同源） |
| **ja 本地化瑕疵** | ja 段「コスト效益分析」 | 「效益」为中文词残留，ja 应为「コスト効率」 |
| **ja 内链不一致** | ja 段尾部 | 仅 1 个内链（packaging-guide）；zh/en 有 kraft/white-card 产品内链（zh 3 个 / en 含 2 个产品链接） |
| `/{locale}/` 占位符 | 三语内链 | 渲染时被 `replace(/\/{locale}\//g, /${locale}/)` 替换（路由 L860）——**非死链**，排除 |

## 4. 根因假设（诊断结论）

| # | 假设 | 证据强度 | 说明 |
|---|---|---|---|
| **H1（主）** | **内容陈旧 + 模板尾巴稀释相关性**：5 个月无更新 + 尾部主题无关内容（传单/贴纸调查） | 中-高 | 长尾信息页（103 展示窗口）被 Google 判「低新鲜度/部分主题漂移」→ 展示收缩至 0；模板尾巴是明显「为凑篇幅拼接」信号 |
| **H2** | **内链薄弱**：无产品页/类目页反向链接，页面权重单一来源（pillar 相关块） | 中 | 与其他信息页竞争长尾时无支撑；kraft/white-card PDP 的既有权威未传导 |
| **H3（待 K3）** | **索引状态未知**：`index/follow + canonical` ≠ 已索引；若 URL Inspection 显示「已索引但无展示」→ 查询意图不匹配/内容质量问题；若「未索引/已移除」→ 需 IndexNow 重提 | 需验证 | **E6 判据明示，本地无法验证**——K3 URL Inspection 是下一步关键证据 |
| H4（弱） | 查询意图漂移（eco paper bag gsm 被 Google 重归类） | 低 | 无 GSC 窗口序列可证，仅保留观察 |

## 5. 修复方向（拍板后执行，本轮不动）

- **A（无争议质量修复）**: 三语删「成本效益分析」模板尾巴（或改写为纸袋专属成本分析：克重/单价/运输/环保溢价对比表）；ja「效益」→「効率」；ja 补 kraft/white-card 产品内链（对齐 zh/en）。
- **B**: `lastUpdated` 更新为本次修复日期 + 内容刷新（补承重测试方法 / GSM×印刷工艺对照表 / 供应商选型清单等纸袋专属信息）。
- **C（内链增强）**: kraft-paper-bags / white-card-bags PDP 加「GSM 選擇指南」反向链接 + packaging category 页引用（§8.3 daily-content 或 blog-deepfix 车道承载）。
- **D（索引确认）**: **K3 URL Inspection**（确认「已索引无展示」vs「未索引」）→ 需要时 IndexNow 重提 + sitemap lastmod 更新。

## 6. 下一步（NEXT）

1. **K3**: GSC URL Inspection `/en/blog/eco-paper-bag-gsm/`（索引状态 + 最近抓取时间）→ 回填本报告 H3。
2. **K3/Kimi**: 拍板 A/B/C 修复批次（建议 A 先行——纯质量修复无风险；C 由 blog-deepfix/daily-content 车道按 §8.3 队列承接）。
3. **DeepSeek**: 拍板后按 §8.4 原子任务输入包执行（TASK_ID: E6-…，WRITE_SCOPE = pillar-content.ts 三语 content + lastUpdated；GATES = encoding/tsc/brand/JSON；ONLINE_VERIFY = 探针确认 200 + h1 + 模板尾巴消失）。

> 数据来源: 见 §1（探针 JSON / gsc_data.csv / GSC xlsx 导出 / git log / 源码读）。
