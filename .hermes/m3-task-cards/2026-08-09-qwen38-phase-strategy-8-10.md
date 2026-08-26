# Qwen 3.8 战略大脑 · 8/10-8/12 阶段策略任务卡 (M3 自主抓取执行)

> **签发**: Qwen 3.8 (战略) · 2026-08-09
> **抓取方**: M3 (执行) — 本文件位于 m3-task-cards/ 约定目录,M3 每次调度先扫本目录最新日期文件
> **生效**: 2026-08-09 → 2026-08-12 复盘日
> **上级约束**: m3-master-directive-v2 §0 红线 + MEMORY.md §0.17/§0.18 + AGENTS.md 全部硬约束

---

## §0 执行结果核实结论 (Qwen 3.8 独立核验, 非转述)

| 项 | M3 报告 | git/文件实证 | 判定 |
|---|---|---|---|
| 8/9 retrofit baby-product | 0d46a4c 10 files +1569/-1476 | git log 命中, 3 locale JSON + 6 sitemap + 验证 JSON 全在 | ✅ 真实 |
| CF build | 2 个 success (93221129040 + 93221969828) | 对应 0d46a4c + a69f0c1 两 commit | ✅ 真实 |
| 5 步转化验证 verified | conversion-link-check-2026-08-09.json | 3 locale step1 CTA 5/5 valid + step2 quote=true | ✅ 硬证据成立 |
| about page.tsx 8/8 漏 commit | 留 8/10 攒批 | `git status` 确认 working tree M, 未 commit | ✅ 一致 |
| 6 篇 retrofit 进度 3/6 | apparel/cross-border/baby-product done | git log 2e28154 + 46809c3 + 0d46a4c 全命中 | ✅ 真实 |

### ⚠️ 台账纠偏 1 处 (§0.17 一口径, 必须执行)

**8/9 push 实际 = 2 次, 不是 1 次。** git log 显示 0d46a4c 与 a69f0c1 分两次 push (CF 2 个 build 佐证)。日运营报告 §14 写 "1/5" 与 §0.17 push 台账一口径冲突。

- **M3 必做**: 8/10 日运营报告 §14 按实际记 `8/9 = 2/5 push`, 月累计相应 +1 (约 6/150, 健康区间)。
- **教训**: 报告 commit 与 .hermes 文件如与 retrofit 同批, 应合入同一 push, 不另起 push。

### ⚠️ 转化验证口径修正 (soft vs hard 分层)

step3 GA4 (`content_has_gtag=false`) 与 step4 wa.me (`content_has_wa=false`) 记 "verified" 是框架级口径。**自 8/10 起 conversion-link-check 输出必须分两栏**:
- **hard**: step1 CTA href 全 200 + step2 quote form 存在 → 决定 `conversion_status`
- **soft**: step3 GA4 / step4 wa.me 备选入口 → 记 `backup_entry: framework-level / page-level`, 不计入 verified 判定依据

---

## §1 阶段战略判断 (Qwen 3.8)

**市场成熟度矩阵 (K3 8/9 认识修正, 最高优先校准轴)**:

| 市场 | 沉淀时间线 | 当前阶段 | 评估指标 |
|---|---|---|---|
| zh-hk | 繁体老站 z-printpro.com 8 个月沉淀 → 301 继承新站 (权重传递 90%) → 新站再 3 个月 | **收割期** | CTR / 转化 / branded search (品牌词已 pos 3) |
| en | ~2026-07 初才打通, 约 1 个月 | **播种期** | imps 周环比 / 排名爬升 / 收录页数, clicks≈0 属正常 |
| ja | ~2026-07 初才打通, 约 1 个月 | **播种期** | 同 en |

**2026-08-09 K3 确认**: en/ja 打通 = 2026-07 初, 校准点不变 (8/21 趋势 / 9/21 首次正式校准)。

**校准后果 (所有 GSC 解读必须先过这张表)**:

1. zh-hk 的 87% imps 占比 = 阶段差异 (8 个月+301 继承 vs 1 个月冷启动), **不是执行差异**; 禁止横向对比三语执行质量
2. en/ja 播种期 clicks≈0 是正常现象, **禁止因 0 click 做标题急救式优化** (校准周期 ≥4 周, §0.10)
3. en/ja 真收割判定窗口: 8/21 双周复盘只看趋势, 9/21 (打通满 3 个月) 才是第一次正式校准点
4. zh-hk 主 KPI: 品牌词智印港 CTR 基线 10% → 4 周 40%+; 转化询盘 8/12 ≥5

**当前主线优先级排序 (8/9-8/12)**:

1. **P0 最高 = 整合 push 7 项落地** (locale-aware siteName 切换是 GEO 实体一致性核心, zh-hk 智印港 / ja ジープリント / en ZprintPro 三品牌分层从"文案"升级为"schema + og + title 全站一致")。阻塞点 = K3 拍板 6 项输入 (见 §4)。
2. **P1 = retrofit 收官** (8/10 cmyk / 8/11 paper / 8/12 same-day, 6/6 v8_ready 是 8/12 复盘验收硬指标)。
3. **P2 = CF Bulk Redirects 修正版上线** (K3 手动 5 分钟, 不耗 build 配额, 消 GSC 30+ URL 404 黑洞)。
4. **观察项 = GMC sku 补全后 24h 诊断页** (117f9fc + schema-extensions sku 落地后查被拒数变化)。

**不做的事**: 不开新 cron、不新增 retrofit 篇目、不动封版文件、不提前启动 8/13 双任务模式。

---

## §2 M3 自主执行任务 (无需 K3 逐条确认, 按 §1 决策权限表)

### T1 · 8/10 retrofit cmyk-guide (daily cron 触发, P0)

- slug: `cmyk-guide` 对应实际 slug 以 `grep -rn "cmyk" src/data/blog-posts.ts` 为准 (§0.1 双数据源教训: 先 grep 找全源文件)
- v8 七件套 3 locale + **FAQPage 5 Q** (per matrix §8.9)
- 拆 5 长尾 query 内链, 内链先核后写 (curl 200 才写入, §0.4)
- **防 ja FAQ bug 复现 (8/9 教训)**: retrofit 脚本 FAQ 锚点匹配必须用动态 H3 解析, 禁止硬编码 anchor 字符串; ja 跑完立即 grep `A1:` 出现次数, >4 即判定重复, 当场修
- Tier A 跨境電商 / 美妝護膚 场景词, 遵守 §13.10 NAP 脱钩 + §13.13 3 locale 铁律

### T2 · about page.tsx 攒批合入 (8/8 K3 14:43 拍板遗留)

- `{false && (...)}` 工厂图/团队图 placeholder 隐藏改动已在 working tree (已验证 M 状态)
- **与 T1 合并 1 push**, commit message 注明双内容; push 前 diff 确认只有该段改动, 无其他漂移

### T3 · 整合 push dry-run 预验证 (K3 拍板前完成, 不 push)

目标: K3 回 "1-5 OK" 后 30 分钟内可 push, 不等验证。

1. 按 `.hermes/k3-inbox/2026-08-08-1535-8-9-integrated-push-checklist.md` §2 的 12 files 清单, 逐文件核对 diff 草稿存在且非空
2. 本地跑 §0.7 smoke 前 4 步: encoding check → 简体字守门 → `npx tsc --noEmit` → `npm run build`
3. 结果落 `.hermes/reports/integrated-push-dryrun-2026-08-09.md` (PASS/FAIL 逐项)
4. **不 commit 不 push**, 等 K3 触发条件 (§4)
5. 幂等: 若该报告文件已存在且 mtime 在今日 → 返回 ALREADY DONE

### T4 · 台账与报告纪律 (每日)

- 日运营报告 §14 push 数按 `git log --oneline --since` 实际计数, 禁止估算 (§0 台账纠偏)
- conversion-link-check 按 §0 软硬分层输出
- retrofit 脚本/中间 txt/py 文件留在 .hermes/ 不 commit 进 src/

### T5 · 8/11 + 8/12 预排 (沿用既定, 不变更)

- 8/11: retrofit paper-materials (ZH 紙質/紙張 19 imps 词)
- 8/12: retrofit same-day-flyers (T1 4 CTR 狙击) + 复盘日跑 review-8-12-template.md, 落 k3-inbox, 7 项 PASS/FAIL + §9 路径推荐, **8/12 复盘日不 push**

### T9 · GSC 每周三语数据自动拉取 (K3 8/9 拍板, Qwen 3.8 已落地, M3 只读消费)

**已就绪 (无需 M3 搭建, 只消费)**:

- 脚本: `scripts/fetch_gsc_weekly_by_locale.py` (8/9 dry-run + 正式运行全 PASS, 代理 127.0.0.1:7892)
- 定时: 每周三 15:00 `zprintpro-gsc-weekly-3locale` (nextRun 8/12)
- 输出: `GSC数据/<日期>/{all, zh-hk, en, ja}_queries.csv + country.csv + weekly-summary.md`
- 摘要: cron 自写 `.hermes/logs/weekly-gsc-summary-<日期>.md`; 失败升级 `.hermes/k3-inbox/gsc-fetch-fail-<日期>.md`

**口径 (与 K3 8/9 手动导出 4 包一致)**: 汇总 = 全站不过滤; zh-hk = page 含 `/zh-hk/`; en = page 含 `/en/`; ja = page 含 `/ja/`。窗口 28 天。

**M3 消费规则**:

1. 每周三/周四 cron 分析读 `GSC数据/<最新日期>/` + weekly-summary.md, 替代旧 `gsc_data.csv` 单文件口径
2. 抓强监控按三语分轨, 且**指标分阶段** (per §1 成熟度矩阵):
   - zh-hk (收割期): CTR 变化 / branded search 智印港 CTR (基线 10% → 目标 40%) / pos ≤10 query 的转化入口
   - en / ja (播种期): imps 周环比 + pos 中位数爬升 + Top query 排名分布, **不考核 clicks/CTR**
3. K3 手动导出的 zip 与 API 拉取并存时, 以 API 版为准 (机器可读 + 可对比), zip 留档不删
4. 8/9 基线 (首跑, 解读须带阶段标签): all 850 rows clicks=18 imps=4951; zh-hk 325/17/4293 (收割盘) = 87% imps; en 439/2/1410 (1 个月播种盘); ja 98/0/560 (1 个月播种盘)。**en/ja imps 有量 clicks 近零 = 正常播种态, 不做标题急救**
5. weekly-summary.md 每维顶部标注阶段 (收割/播种), 防止后续误读

---

### T10 · 季节性 SKU 裁决: 新建 8 + 301 收编 12 旧 (K3 8/10 提问, Qwen 3.8 GSC 实证裁决)

**裁决: 新建, 不替换。旧 12 个同品类 SKU 在季节性 SKU 上线后 301 收编。依据 (2026-08-10 GSC page 维度 90 天实测)**:

1. 旧资产是负资产: red-packets 6 SKU 90 天合计 120 imps/3 clicks; calendars 6 SKU 合计 93 imps/2 clicks。最高单页 31 imps。对比 posters/a2-posters 1827 imps。
2. 真实需求词是类目级不是 SKU 级: zh-hk「訂製利是封」(2 imps pos 47) / en「desk calendar printing」等 size 类长尾 — 旧 SKU 页 (foil-/cartoon-/magnetic-) 与搜索词不匹配, 排名全在 5-21 开外。
3. 替换零收益: 换 title/slug 救不回 pos 16+ 的页; 且替换动 slug = 断外链 + 触发重抓取 = 播种期自残。
4. 内链零依赖: blog-posts.ts 内链只链 category 级 (/category/red-packets/、/category/calendars/), 无任何旧 SKU 直链 → 收编零断链风险。
5. 报告自己已答: 季节性 = 增量入口, 不占主线资源。替换 = 把增量做成了存量改写。

**执行 SOP (9/10 上线时一并执行, M3 负责)**:

- 新建 8 SKU: slug 用需求词 (lai-see-custom-set / corporate-lai-see-series / desk-calendar-2027-light-shadow / a3-wall-calendar-solar-terms 等), 不复用旧 slug
- 上线验证 200 后, 对 12 旧 slug 配 301 → 最匹配新 SKU (foil-red-packets→corporate 款, cartoon-red-packets→童趣款, desk-calendars→台历款, wall-calendars→挂历款 等), per §0.18 四步 SOP (curl 200 + 禁止兜底首页 + 禁止自指向)
- CF 重定向与 §T-404 修正版同一批 Bulk Redirects 上线, 不新增 push
- 旧 SKU 在 products.ts 标 `retiredAt: '2026-09-10'` 保留 1 个季度再物理删除 (防回滚)
- 验收: 上线 7 天新 8 页 imps > 旧 12 页 90 天均值, 否则复盘

**边界**: 本裁决不改变 8/29-9/10 开发排期 (2-3 push, §0.17 台账), 设计期 (8/13-8/28) 零代码动作。

---

## §3 验收标准 (M3 自检, 全过才报完成)

| # | 项 | 标准 |
|---|---|---|
| 1 | cmyk retrofit | 3 locale v8 7 项 7/7 + FAQPage 5 Q + 0 简体 + build PASS |
| 2 | about 合入 | diff 仅 {false && (...)} 段, 与 cmyk 同 push |
| 3 | push 配额 | 8/10 ≤1 effective push; 台账数字 = git 实际 |
| 4 | dry-run | 报告落盘, 4 步 smoke 全 PASS 或 FAIL 项明确列出 |
| 5 | live verify | R6 6 步流水线全 PASS (cmyk 3 locale 200 + schema ≥3) |

---

## §4 升级 K3 清单 (唯一需要老板拍板/动手的项)

### A. 拍板输入 (整合 push 触发条件, 阻塞 P0)

1. X (Twitter) URL
2. LinkedIn URL
3. 15 SKU 改字审字 (草稿: k3-inbox 2026-08-08-0400 + 0430 两份)
4. Org sameAs 改 diff 审字
5. locale 切换 5 处审字 (草稿: k3-inbox 2026-08-08-0712)
6. IndexNow key

K3 回 "1-5 OK" + 提供 1/2/6 → M3 立即执行整合 push (B 方案 1 push 1 build)。

### B. K3 手动操作 (5-10 分钟级, 不耗 build 配额)

1. **CF Bulk Redirects 按修正版上线** (k3-inbox 2026-08-08-1535-cf-bulk-redirects-corrected.md §6 SOP, 4 条 Bulk + 1 条 Edge Rule 410)
2. formsubmit.co 激活邮件点链接 (8/7 18:45 触发)
3. Supabase dashboard 查 4 链 (fae355ba / 4892080c / 360e8366 / 117f9fc)
4. 3 设备端到端 (Desktop Chrome / Mobile Safari / Android Chrome)
5. GMC 诊断页查被拒数 (整合 push 后 24h)

### C. 无需 K3 动作 (M3 闭环)

- T1-T5 全部、台账纠偏、转化验证口径修正、dry-run 预验证

---

## §5 风险与止损

- 整合 push 若 8/10 仍未获 K3 拍板 → **不顺带 push**, 继续等; retrofit 主线不受影响 (两条线解耦)
- cmyk retrofit 触发任何封版文件 diff → 立即停手升级 (§0.3)
- ja FAQ 重复 bug 复现 → 当场 v2 修, 不延后 (§0.6 保守方案)
- CF build 失败 / push 报错 / curl 5xx → 立即升级 K3, 不报完成

EOF · .hermes/m3-task-cards/2026-08-09-qwen38-phase-strategy-8-10.md
