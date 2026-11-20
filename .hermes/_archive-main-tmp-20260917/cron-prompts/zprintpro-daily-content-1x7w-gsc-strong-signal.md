# zprintpro-daily-content-1x7w-gsc-strong-signal (SSoT)
# Source: mavis cron (待 K3 9:00 拍板后 mavis cron create 实际 ID, daily 22:00)
# Last sync: 2026-08-08 04:55 (K3 8/8 04:35 战略级 + v8.9 升级同步)
# 触发: 8/9 起 daily 22:00 Asia/Shanghai (mavis cron once + 重复 + delete_after_run)
# 预算: 30 min (抓强监控轻量, 不写内容)
# 任务: 每天自动检测 pos ≤ 10 但 0% CTR 的 query 清单, 形成 "改→验" 闭环

【v1 升级 (2026-08-08 04:55 K3 8/8 04:35 战略级 - GSC 抓强监控)】

## 一、核心战略 (per K3 8/8 04:35 + §0.11 资源分配)

**GSC 抓强监控 = 资源重排的闭环** (per §0.11 P0 抓强信号 > 本地实体建设 > 黑洞大词):
- **目的**: 每天自动检测 pos ≤ 10 但 0% CTR 的 query 清单 (4 天可兑现)
- **触发**: 8/9 起 daily 22:00 (mavis cron once + 重复, 1 次跑完即停)
- **输出**: 每日 1-3 个新抓强信号 + K3 9:00 拍板 1/2/3 (立即改 / 24h 后改 / 加入 Week 2 排期)
- **闭环**: 改 title → 72h 验 CTR (cron auto check) → 形成闭环

**为什么是 P0 优先** (per K3 §0.11 资源分配):
- 1 个抓强信号 > 10 个黑洞大词改字 (投入产出比)
- 黑洞大词 (a2-posters 856 imps / food-boxes 634 / JA cmyk 197) 需 1-2 月外链配合, 4 天不可兑现
- 抓强信号 (small-batch-stickers pos 7.76 / 牛皮紙盒 pos 1 / 燙金貼紙 pos 2.55 / 彩色信封 pos 1 / 飛機盒 pos 10.33) 4 天必 CTR 提升

## 二、监控逻辑 (5 步)

### Step 1: 拉 GSC 7 天数据
- 调 GSC API (or .hermes/secrets/gsc-key.json 用 service account)
- 过滤: 7 天数据 + 3 locale (zh-hk / en / ja) + 所有 query + 所有 page
- 输出: query × {imps, clicks, CTR, pos} 矩阵

### Step 2: 抓强信号过滤 (per §0.11 P0)
- 过滤条件: **pos ≤ 10 AND clicks < 0.5 * imps / 100 (即 CTR < 0.5%)**
- 例外: clicks = 0 但 imps ≥ 5 (强信号, snippet 缺 USP)
- 输出: 抓强信号清单 (按 imps 降序排)

### Step 3: 找当前 PDP slug
- 对每个 query 找当前 PDP slug:
  - via src/data/products.ts: slug, name, nameEn, nameJa, title_zh, title_ja, title_en
  - via src/data/blog-posts.ts: slug, title (3 locale)
  - via src/data/categories: category
- 输出: query → slug mapping

### Step 4: 判断 7 天内是否被改过
- `git log --since="7 days ago" -- src/data/products.ts src/data/sku-seo-data.ts`
- 已改的 query 标 "已验证 (改 X 天)"
- 未改的 query 标 "新发现 (改建议: 立即 / 24h / Week 2)"

### Step 5: 输出每日抓强清单
- 路径: `.hermes/k3-inbox/daily-strong-signal-YYYY-MM-DD.md`
- 格式:
  ```
  # GSC Daily Strong Signal Report - 2026-08-09
  ## 3 抓强信号 (今日新发现)
  1. **牛皮紙盒** - 7 imps 0% CTR pos 1.0 - 命中 SKU: kraft-paper-packaging-box - 改建议: 立即 (12 PDP 待改)
  2. **燙金貼紙** - 11 imps 0% CTR pos 2.55 - 命中 SKU: foil-stickers - 改建议: 24h (优先级中)
  3. **彩色信封** - 7 imps 0% CTR pos 1.0 - 命中 SKU: colored-envelopes - 改建议: Week 2 (8/13 抓强二批)
  ## 5 维持抓强 (已改, 验证中)
  1. **small-batch-stickers** - 改 3 天 - CTR 0% → 1.2% (校准 2-3% 期望 7 天)
  ...
  ## 5 黑洞大词 (4 天不可兑现, 跳过)
  1. **a2 海報 印刷** - 7 imps 0% CTR pos 6.03 - 维持 Week 2 排期
  ...
  ```
- 升级 K3 inbox

## 三、§0.10 KPI 校准值 (per K3 校准)

| 指标 | M3 初始 | K3 校准 | 校准公式 |
|------|---------|---------|---------|
| 抓强信号闭环 4 天 | CTR +5% | CTR +1-2% | snippet 改 1-2 周 |
| 抓强信号 7 天 | pos 升 30% | pos 升 10-15% | 排名响应 2-6 周 |
| 抓强信号数量 | 每日 1-3 个 | 每日 0-2 个 | 平均 1 个/天 |

**复盘 SOP**: 任一 KPI 超校准值 = 优秀, 介于 = 合格, 低于 = 需分析

## 四、§0.8 Self-Reminder 防抖 (per K3 8/8 01:56 P0 阻断)

- **已知时间点**: 8/9 22:00 第一次跑 (mavis cron once + at + delete_after_run=true)
- **未知事件**: 不轮询, 跑完一次即停
- **不空转**: 不留 `*/N min` 重复 tick (per C31 lesson, 5min tick 浪费 token)
- **每日触发**: 每天 22:00 一次性触发, 跑完输出 → mavis cron once + delete_after_run=true
- **mavis cron 三步曲 (C31 lesson)**:
  1. 改 SSoT (本文件)
  2. mavis cron update 完整 prompt
  3. mavis cron get 验证 daemon 跟 SSoT 1:1 一致

## 五、工具链 (5 件套)

1. **GSC API 拉数据**: `scripts/gsc_strong_signal_monitor.py` (待写, 8/8 10:15 攒批内交付)
2. **GSC key 凭证**: `F:\zprintpro-nextjs\.env` 已有 GSC_ACCOUNT_EMAIL / GSC_KEY_FILE / GSC_SITE_URL
3. **PDP slug mapping**: `scripts/products_lookup.py` (待写, 读 products.ts + blog-posts.ts 输出 slug 字典)
4. **git log 7 天查询**: `git log --since="7 days ago" -- src/data/`
5. **输出 markdown**: 直接 `Write` tool + Python f-string 拼装

## 六、闭环 (改→验)

### 改 (per 抓强清单)
- K3 9:00 拍板: 1) 立即改 2) 24h 后改 3) 加入 Week 2 排期
- M3 立即改: 1) 改 PDP title 2) 改 PDP meta 3) commit + push 4) §0.7 production smoke 3 步
- 输出: 抓强信号已改 report

### 验 (72h 后)
- 抓强监控 cron 第 4 天跑时, 自动检查 "已验证 (改 X 天)" 段
- 期望: CTR 0% → 1-2% (校准) / 2-3% (抓强 7 天后)
- 不升 CTR 升级 K3 拍板 (回滚 / 加 5 FAQ / 等等)

### 闭环 (per §0.11 P0 抓强信号)
- 1 抓强信号 = 1 改 → 1 验证 → 1 闭环
- 每日 0-2 个抓强信号 = 每日 0-2 个闭环
- 8/9-8/21 共 13 天 × 1 个/天 = ~13 个闭环
- 期望 13 个抓强信号中 8+ 个 (60%+) 4 天 CTR 提升

## 七、3 市场分 cron 同步 (per v8.9 主 cron)

**避免 4 cron 抢任务 (主 cron + 3 sub-cron + GSC 抓强监控)**:
- 主 cron 10:15 触发: 调度 3 sub-cron 任务 (zh-hk 收割 / ja 复制公式 / en 抓强)
- 3 sub-cron 10:15-12:00: 各自执行任务
- GSC 抓强监控 22:00 跑: 输出新抓强清单 + 验证 72h 闭环
- K3 9:00 拍板: 抓强清单的 1/2/3 决定
- 次日 10:15 触发: 3 sub-cron 接收 K3 拍板后的改字任务

**SSoT 单向流** (避免循环):
- GSC 抓强监控 → 每日清单 (22:00)
- K3 inbox 拍板 (9:00)
- 3 sub-cron 接收任务 (10:15)
- PDP 改字 + §0.7 production smoke 3 步 (10:15-12:00)
- 72h 后 GSC 抓强监控验证 (22:00, 4 天后)
- 闭环完成

## 八、Week 2 8/13-8/21 抓强监控重点

- 8/9 22:00 第一次跑 (建立 baseline, 期望 ≥3 抓强信号)
- 8/10-8/12 daily 跑, 8/12 复盘用校准值
- 8/13-8/21 daily 跑, 8/21 双周复盘
- 8/13 zh-hk 抓强二批 (4 SKU: mailer-boxes / laminated-menus / custom-calendars / removable-stickers) 由 GSC 监控触发
- 8/16 EN 抓强二批 (paper bag gsm FAQPage 5 Q) 由 GSC 监控触发
- 8/18 JA 教科書/教材 title 二批 (3 SKU) 由 GSC 监控触发

## 九、§0.13 K3 战略拍板 4 字+①②③ 模式 (per MEMORY.md §0.13)

**4 字**: X URL / LinkedIn URL / GSC 抓强监控 K3 审 config / 8/9 Org sameAs 改 K3 审 diff
**①②③**: 8/12 复盘改用校准值 / §0.10-0.12 三条入记忆 (✓ 已写) / Week 2 排期 OK
**M3 自主范围**: GSC 抓强监控 cron 设计 + 5 步监控逻辑 + 闭环 SOP + tools chain + 3 cron 同步
**K3 9:00 必跑 4 件**: 3 设备 / Supabase dashboard / formsubmit 激活 / 提供 key (GSC 监控不依赖 K3 必跑, 自动 daily 22:00)

## 十、报告落盘 (每天 22:00 跑)

- 抓强清单: `.hermes/k3-inbox/daily-strong-signal-YYYY-MM-DD.md` (每日 1-3 抓强 + 5 维持验证 + 5 黑洞跳过)
- 抓强闭环: `.hermes/k3-inbox/strong-signal-closed-loop-YYYY-MM-DD.md` (4 天前改的信号 72h 验 CTR)
- 抓强累计: `.hermes/reports/strong-signal-8-day-bundle.md` (8/9-8/12 4 天 + 8/13-8/16 4 天 攒批)

## 十一、§0.7 §0.8 §0.9 引用 (per K3 8/8 拍板)

- §0.7 关键漏斗 endpoint production smoke 3 步 (改 PDP title 后必跑, 不跑不算 PASS)
- §0.8 Self-Reminder 防抖 (本 cron 用 once + delete_after_run=true, 不空转)
- §0.9 外链注册自动化边界 (本 cron 不涉及外链, 仅 GSC 抓强)

## 十二、启动必读 (4 个 SSoT)

1. F:\zprintpro-nextjs\.hermes\cron-prompts\zprintpro-daily-content-1x7w.md (主 cron v8.9)
2. F:\zprintpro-nextjs\.hermes\cron-prompts\zprintpro-daily-content-1x7w-gsc-strong-signal.md (本文件)
3. F:\zprintpro-nextjs\.hermes\industry-keyword-matrix.json (matrix gsc_daily_strong_signal_monitor 段)
4. F:\zprintpro-nextjs\AGENTS.md (项目宪法 §0 / §1 / §11 / §13.10 / §13.13)

## 十三、报告落盘 (本任务卡 v1 升级)

- 本文件: `.hermes/cron-prompts/zprintpro-daily-content-1x7w-gsc-strong-signal.md` (本文件, ~8K chars)
- 整合进主 cron v8.9 §七 GSC 抓强监控 sub-cron
- K3 status 报告: `.hermes/k3-inbox/2026-08-08-0450-m3-v89-sync.md` (待写)
