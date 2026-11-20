# 错误日志 v1 — 反审门童（Regression Guard）SSoT

> **SSoT 路径**: `.hermes/regression-guard/error-log.md`
> **拍板来源**: K3 9/1 15:06 (12:37 派活包 + 4 修正 + 3 齿轮)
> **维护责任**: Mavis (M3) 自进化 SOP (per `playbook.md`)
> **DoD 铁律**: 任何派活包修复错误, 若未同步写本文件, 视为任务未完成 (K3 9/1 15:06)
> **首次建立**: 2026-09-01 (空表, backtest 时写入)

---

## 记录格式

```markdown
## [YYYY-MM-DD HH:MM] <commit> - <任务名>

- **命中门童**: #N <门童名> (X) + ...
- **命中规则**: <rule-id-1> / <rule-id-2> / ...
- **K3 派活包**: <派活包时间 + 拍板内容>
- **修复 commit**: (待 K3 拍板后) <commit-id>
- **拦截时间窗**: <发现到拦截间隔>
- **自进化**: <新规则/更新规则/拦截命中统计>
- **回灌 seeding**: <是否首次发现>
```

---

## 错误记录

### [2026-09-02 06:04] (战略级确认) ja 日本市场公司实际注册信息显示 — K3 9/2 06:04 派活包

- **命中门童 (审计)**: 0 (ja 现状合规, 无需修复)
- **K3 派活包**: "在公司全称上, 只有 JA 日本语言市场上, 需要有公司实际注册信息的, 就需要显示公司实际注册印刷"
- **9 角色综合判定**:
  - **战略军师**: K3 9/2 06:04 派活包 = 战略级确认 (ja 允许 vs zh-hk 禁), 不是修复派活包
  - **CEO**: ja 现状合规, zh-hk §0.32 硬规则不变, en 暂保留
  - **PM**: 升级 entity-guard.js v1.1.1: 注释明确 ja 允许显示 + zh-hk 仍禁 + en 暂保留
  - **数据**: ja 7 blog 已含公司全称 + 实体注册地址, K3 9/1 18:50 派活包"暂保留 en/ja"实际是 ja 允许
  - **SEO/AEO/GEO**: ja 日本合同法/印刷业法要求显示公司实际注册信息 (K3 法律风险规避)
- **K3 §0.32 9/1 18:50 拍板 (zh-hk 硬规则, 不变)**:
  - 5 类禁词 zh-hk only: 公司中文全称 / 实体注册地址 / 公司英文名 / 注册地址英文 / 邮编 518111
- **K3 §0.32 9/1 18:58 拍板 (6 允许表述, 不变)**:
  - 智印港 (ZprintPro) 為彩龍印刷旗下國際印刷服務品牌
  - 母公司品牌音译: 彩龍 / Cai Long / 彩龍印刷
  - 单独"深圳" / 单独"平湖" / "深圳彩龍" 组合允许
- **K3 §0.32 9/2 06:04 派活包 (新规则, 战略级调整)**:
  - **ja 日本市场需要显示公司实际注册信息** (日本合同法/印刷业法要求)
  - en 暂保留 (K3 未明说, 等后续派活包)
- **ja 现状 (合规, 不需修改)**:
  - 6 处 公司中文全称: packaging-box-custom-guide line 46 / tea-beverage line 115 / restaurant-menu line 106 / rush-printing-hk-guide line 29 / packaging-box-pricing-2026 line 1 / certificate-printing-guide line 80
  - 8 处 实体注册地址 (嘉城路 / 平湖 / 龍崗)
  - 3 处 邮编 518111
- **修复内容 (entity-guard.js v1.1.1 升级, 0 修复)**:
  - 1. scripts/guards/entity-guard.js v1.1.0 → v1.1.1: 注释明确 ja 允许显示 + zh-hk 仍禁 + en 暂保留
  - 2. SCAN_LOCALES 维持 ["zh-hk", "zh-HK"], ja/en 自动豁免 (扫描范围 zh-hk only)
  - 3. K3 9/2 06:04 战略级确认 ja 不需修改, 保持现状
- **6 道门童 backtest src/data/blog-data/ 0 命中 PASS** (无变化, v1.1.1 维持):
  - 门童 #1-5 (不变)
  - 门童 #6 实体注册 (§0.32 P0 强制级, v1.1.1 zh-hk only, ja/en 豁免): ✅ 0 命中
- **拦截时间窗**: 9/2 06:04 派活包 → 9/2 06:04 立即战略级确认 + entity-guard.js v1.1.1 升级 = 0 拦截
- **教训固化 (K3 §0.32 跨项目 P0 强制级)**:
  - 任何 K3 派活包拍板红线, M3 必须立即:
    - 写新门童或升级现有门童 (per K3 派活包时间窗)
    - 跑全站 src/data/blog-data/ 0 命中验证
    - 写 error-log.md 事故记录
  - K3 §0.32 战略级分层:
    - zh-hk: 5 禁词硬规则 (撤除公司全称 + 实体注册地址)
    - ja: 允许显示 (K3 9/2 06:04 派活包战略级确认, 日本法律要求)
    - en: 暂保留 (K3 未明说)
  - 任何 future K3 §0.32 相关派活包, 必先看 9 角色综合 + 法律风险评估 (zh-hk 隐私保护 vs ja/en 法律披露)

### [2026-09-02 05:58] (P0 事故修复) zh-hk §0.32 实体注册信息残留 — K3 9/2 05:58 派活包截图

- **命中门童 (修复前)**: 门童 #6 实体注册 (§0.32 P0 强制级) 47 处 / 7 blog
- **命中规则 (修复前)**:
  - ENTITY_FULL_NAME_ZH: `深圳市彩龍印刷包裝有限公司` (K3 §0.32 第 1 禁词, 公司中文全称)
  - ENTITY_ADDRESS_ZH: `廣東省深圳市龍崗區平湖街道嘉城路 1 號` (K3 §0.32 第 2 禁词, 实体注册地址)
  - ENTITY_ZIPCODE: `518111` (K3 §0.32 第 5 禁词, 邮编单独使用)
  - 残留 blog: packaging-box-custom-guide (9 处) / tea-beverage-gift-box-printing-guide (9 处) / wedding-invitation-pricing-guide (6 处) / rush-printing-hk-guide (6 处) / packaging-box-pricing-2026 (5 处) / 2027-monthly-calendar-printing-timetable (6 处) / certificate-printing-guide (6 处)
- **K3 派活包**: 9/2 05:58 截图显示 `2027-monthly-calendar-printing-timetable` zh-hk 页面底部"最後更新"段残留 `深圳市彩龍印刷包裝有限公司 + 廣東省深圳市龍崗區平湖街道嘉城路 1 號 + 多年 + 客戶 + 12 大行業`, K3 问 "为什么还区现这个问题，在zh-hk繁体中文页面还是有 公司全称 深圳市彩龍印刷包裝有限公司 出现，反审门童的规则呢"
- **K3 9/1 18:50 拍板 §0.32 硬规则 (9/1 18:50 memory 已落)**: zh-hk 语言绝不出现以下 5 类实体注册信息 (P0 强制级):
  1. 公司中文全称: 深圳市彩龍印刷包裝有限公司
  2. 实体注册地址: 深圳市龍崗區平湖街道嘉城路 1 號
  3. 公司英文名: Shenzhen Cai Long Printing Packaging Co., Ltd.
  4. 注册地址英文: 1 Jiacheng Road, Pinghu Street, Longgang District, Shenzhen 518111
  5. 邮编 518111 单独使用
- **K3 §0.32 补完 (9/1 18:58 拍板) 6 允许表述 (品牌关系表述)**: 智印港 (ZprintPro) 為彩龍印刷旗下國際印刷服務品牌 / 单独深圳 / 单独平湖 / 彩龍品牌音译
- **根本原因 (教训固化)**: 
  - 9/1 18:50 K3 §0.32 拍板时, M3 已落 memory 但**未立即同步到反审门童 v1.0 (commit 1, 9/1 15:06)**
  - 9/1 18:47 撤除脚本 (commit 7, be744435) 也没加 §0.32 5 禁词 (脚本在 18:47 写, §0.32 18:50 才拍)
  - 反审门童 v1.0 漏了门童 #6 实体注册
  - M3 §0.31 反审门童 v1.0 上岗首单 (12:32 包装盒任务) PASS 后, 没继续审计其他 blog
- **修复 commit**: (待 K3 9/2 06:00 派活包 commit, 预计 be74xxxx 后)
- **修复内容**:
  - 1. Python 全站撤除脚本 `_zh_hk_entity_sweep.py` 撤除 47 处 / 7 blog
  - 2. legal disclaimer NAP 段重写: 智印港 (ZprintPro) 為彩龍印刷旗下國際印刷服務品牌 + 电话 + WhatsApp + 电邮
  - 3. 品牌关系段重写: 保留允许表述
  - 4. 母公司段重写: 母公司品牌 彩龍印刷（深圳）
  - 5. 反审门童 v1.1 升级: 加门童 #6 实体注册 (entity-guard.js), 5 条 §0.32 禁词, red 硬拦, zh-hk only
- **6 道门童 backtest src/data/blog-data/ 0 命中 PASS** (修复后):
  - 门童 #1 数据诚信: ✅ 0 命中
  - 门童 #2 真实电话: ✅ 0 命中
  - 门童 #3 品牌分层: ✅ 0 命中
  - 门童 #4 跨语言污染: ✅ 0 命中
  - 门童 #5 SOP-10 5 问门禁: ✅ 0 命中
  - 门童 #6 实体注册 (§0.32 P0 强制级): ✅ 0 命中
- **拦截时间窗**: 9/1 18:50 拍板 → 9/2 05:58 派活包截图 = 11h 8min
- **教训固化 (K3 §0.32 跨项目 P0 强制级)**:
  - 任何 K3 派活包拍板红线, M3 必须立即:
    - 写新门童或升级现有门童 (per K3 派活包时间窗)
    - 跑全站 src/data/blog-data/ 0 命中验证
    - 写 error-log.md 事故记录
  - 不能再 "memory 已落但反审门童 v1.0 没升级" 的 11h 时间差

### [2026-09-01 15:25] (Commit 2) packaging-box-pricing-2026 - 12:32 包装盒 3 locale 9 项优化 backtest

- **命中门童 (修复前)**: #1 数据诚信 (8) + #2 真实电话 (1) + #3 品牌分层 (2) + #4 跨语言污染 (0) + #5 SOP-10 (4) = 15 命中
- **命中规则**:
  - CRED-FSC-001 (FSC-C123456, 未在 zh-hk 但出现在内容)
  - CRED-ISO-001 (ISO 9001 認證)
  - CRED-15Y-001 (15 年经验)
  - CRED-1K-001 (1,000+ 客户)
  - CRED-4K-001 (4,500+ 包裝盒訂單)
  - CRED-X-INDUSTRIES (12 大行業, 4 大行業標配)
  - CRED-HEID-001 (海德堡 6+1)
  - PHONE-HK-001 (历史 +852 港号)
  - BRAND-DOUBLE (智印港 ZprintPro 双品牌)
  - SOP10-CERT-NO (FSC-C123456)
  - SOP10-24H-SLA (24h SLA)
  - SOP10-12-IND (12 大行业)
  - SOP10-INTL-TOP (国际顶级)
  - SOP10-4-PLUS-NUMBER (4,500+)
  - SOP10-15-YEARS (15 年)
- **K3 派活包**: 9/1 12:23 (改 +86 198 8085 1334) + 9/1 12:27 (撤除 12 类硬数字) + 9/1 12:32 (包装盒全方位) + 9/1 15:06 (CEO 决策报告 4 修正 + 3 齿轮)
- **修复 commit**: 3619c778 (Commit 1 门童 v1) + (待 Commit 2 packaging-box-pricing-2026)
- **修复内容**:
  - title 修正版: `包裝盒印刷價格 2026：500/1000/5000 個・禮盒訂製 | 智印港` (56 当量 ✅)
  - 撤除 10 类虚假数据 (zh-hk 9453→8918 chars / en 8993→8886 / ja 6427→6227)
  - 加 5 條 FAQ (zh-hk 1001 chars / en 1328 / ja 1001)
  - 加 10 條內部連結 (3 locale 主题集群)
  - 加 WhatsApp 按钮 (wa.me/8619880851334)
  - 加 5 schema 标记 (Article / FAQPage / HowTo / BreadcrumbList / Product)
- **拦截时间窗**: 9/1 15:25 门童 backtest 全过 = 修复成功
- **自进化**: 错误模式库 error-patterns.md v1.0 11 类规则 + K3 修正 3 经营参数白名单 (FSC認証紙 / 100 個起印 / 18:00 截單)
- **回灌 seeding**: ✅ 首次发现
- **门童 v1 上岗首单实弹测试 PASS** (K3 9/1 15:06 12:32 任务): 修复后 5 道门童 0 命中

### [2026-09-01 15:10] b4c630f2 - W5 #2 即日印刷 blog (首次记录)

- **命中门童**: #1 数据诚信 (5) + #2 真实电话 (2) + #4 跨语言污染 (1)
- **命中规则**:
  - CRED-FSC-001 (FSC-C123456)
  - CRED-ISO-001 (ISO 9001)
  - CRED-1K-001 (1,000+)
  - CRED-4K-001 (4,200+ / 15,000+ / 1,200+)
  - CRED-15Y-001 (15+ 年)
  - CRED-HEID-001 (海德堡 6+1)
  - PHONE-HK-001 (+852 9225 8890)
  - PHONE-WA-852 (wa.me/85292258890)
- **K3 派活包**: 9/1 12:23 (改 +86 198 8085 1334) + 9/1 12:27 (撤除 12 类硬数字) + 9/1 12:32 (包装盒 blog 全方位优化)
- **修复 commit**: (待 K3 9/1 15:06 拍板后) <Commit 2>
- **拦截时间窗**: 9/1 10:11 写入 → 9/1 15:10 拦截 = 4h 59min (晚)
- **自进化**: error-patterns.md 新增 8 条 (CRED-FSC-001 / CRED-4K-001 / PHONE-HK-001 / PHONE-WA-852 / etc.)
- **回灌 seeding**: ✅ 首次发现 (历史 commit diff seeding)

### [2026-09-01 15:15] (回灌) 历史 commit 8/30 - 8/31 31 段 v3.1 base

- **命中门童**: #1 数据诚信 (3) + #3 品牌分层 (1)
- **命中规则**:
  - CRED-1K-001 (历史残留)
  - CRED-ISO-001 (历史残留)
  - CRED-15Y-001 (历史残留)
  - BRAND-DOUBLE ("智印港 ZprintPro" 8/31 之前 809 处)
- **K3 拍板**: 8/31 5f70edaf (删 GBP 觀塘/合作點) + 9/1 02:54 §13.16 v2 单品牌分层
- **修复 commit**: 5f70edaf (8/31 20:25) + fd22275f (9/1 02:50) + 2bdacde3 (9/1 03:00) + 781550d8 (9/1 09:46)
- **拦截时间窗**: 8/30 写入 → 9/1 15:15 拦截 = 2 天+ (晚)
- **自进化**: BRAND-DOUBLE 模式化 (809 处 48 文件)
- **回灌 seeding**: ✅ 首次发现

### [2026-09-01 15:20] (实弹测试) 12:32 包装盒 title v3.1 拟定版

- **命中门童**: #4 跨语言污染 (1)
- **命中规则**:
  - I18N-TITLE-LEN (title 字符体检 50-60)
- **案例**: 拟定 `包裝盒印刷價格 2026：500/1000/5000 個・FOB 深圳・跨境 DHL 2-4 天 | 智印港` 实测 73 当量 > 65, 必被截断
- **K3 实弹测试**: K3 9/1 15:06 CEO 决策报告触发
- **修正版**: `包裝盒印刷價格 2026：500/1000/5000 個・禮盒訂製 | 智印港` (56 当量 ✅, 帶钱词地图 v2 T1 速赢词 GSC 5+6+1 imp)
- **拦截时间窗**: 12:32 拟定 → 15:20 K3 抓 = 2h 48min
- **自进化**: I18N-TITLE-LEN 模式化 (门童 v1 上岗首单拦截案例)
- **回灌 seeding**: ✅ 首次发现

---

## 周健康报告 (5 cron SSoT v6.4 嵌入, K3 9/1 15:06 齿轮 2)

| 周 | 拦截次数 | 误报次数 | 新增 pattern 数 | 已 pattern 化错误复发数 | 飞轮状态 |
|----|---------|---------|----------------|----------------------|---------|
| W1 (9/1-9/7) | (待填) | (待填) | 11 (v1.0 落地) | 0 | ✅ 健康 |
| W2 (9/8-9/14) | (待填) | (待填) | (待填) | 0 | ✅ 健康 (如 0 复发) |
| W3 (9/15-9/21) | (待填) | (待填) | (待填) | (待填) | 9/15 shadow 转正复盘 |

**K3 验收标准 (K3 9/1 15:06 齿轮 2)**: 连续 2 周零新增 pattern 且零复发 = 飞轮健康

---

## 月度复盘 (9/30 §0.28 P4)

- 拦截率统计 (90% 目标 vs 实际)
- 误报率统计 (<10% 目标 vs 实际)
- 新增 pattern 数 (期望 ≤ 5/月 = 飞轮收敛)

---

## 事件 K3-2026-09-02-0809-data-credit-crisis-v1 (9/2 08:09 K3 push 痛骂数据诚信老数据)

> **拍板来源**: K3 9/2 08:09 push 痛骂原文 "全部文章 85 明明我们 zh-hk 语言下就有 85 篇，你却说 79，这些信息是从哪里来的，错误信息，思考理解问题，分析研究后给到最优方案，能读肯定是最新信息，怎么老是老信息，至少 2 天内有两次说数据不对了"
>
> **事件 ID**: K3-2026-09-02-0809-data-credit-crisis-v1
>
> **事件名**: 6 commit 数据口径未标双口径 (zh-hk 79 unique slugs vs blog-posts.ts SSoT 85 entries)
>
> **严重度**: 🟠 orange (数据诚信, 9/15 FP 复盘后升硬拦)
>
> **数据来源** (per K3 §0.22 SOP-10 第 3 款 + §0.23 数据诚信红线):
> - `python _audit_blog_count_real.py` 9/2 08:10 真验证
> - `python _audit_blog_count_deep.py` 9/2 08:12 真验证
> - `python _simplified_traditional_unify.py` 9/2 08:15 真验证
> - 校准日期: 2026-09-02 08:12
> - 校准状态: 已校准 (本事件 commit 落地后)

### 4 口径对照表 (per §0.33.1, 必填)

| 口径 | 真实数量 | 类型 | 何时用 |
|------|---------|------|--------|
| **zh-hk.json unique slugs** | **79** | zh-hk 真实页面内容 | zh-hk 报告 / zh-hk 修复 / zh-hk 优化 |
| **en.json unique slugs** | **80** | en 真实页面内容 | en 报告 / en 修复 / en 优化 |
| **ja.json unique slugs** | **80** | ja 真实页面内容 | ja 报告 / ja 修复 / ja 优化 |
| **blog-posts.ts SSoT entries** | **85** | SSoT 配置 (含 3 locale 衍生 + 6 重复) | CEO 看 SSoT / 总览 / 战略报告 |
| 跨 locale 并集 | 81 unique | 3 locale 实际总 blog 数 | 跨 locale 报告 |
| 跨 locale 交集 (3 locale 都有) | 78 unique | 3 locale 同步覆盖 | 3 locale 同步修复 |

### 自进化 4 步 SOP (per §0.31.3, K3 9/1 15:06 拍板)

1. **detect** (K3 9/2 08:09): K3 push 痛骂触发"79" vs "85" 口径错位
2. **block** (M3 9/2 08:10): 立刻 stop 所有 blog 报告, 跑 `python _audit_blog_count_real.py` 真验证
3. **learn** (本事件): 写本事件 + AGENTS.md §0.33 数据口径校准硬规则 + v8-cron-sot-upgrade-segment.md §I 升级段
4. **prevent** (落地后): 5 cron SSoT 升级段嵌入 4 口径对照表 + 反审门童 v1.2 加门童 #7 数据口径必填

### 6 commit 撤回声明 (per K3 §0.23 撤回必含原 commit ID + 撤回日期)

| 原 commit ID | 撤回内容 | 撤回原因 | 撤回日期 |
|--------------|---------|---------|---------|
| 01458676 | "79 篇盘点立即起跑" 主营架构 v2 | 数字为 zh-hk.json unique slugs 真实口径没错, 但未标"vs SSoT 85"双口径, 违反 §0.22 SOP-10 第 3 款 | 2026-09-02 08:12 |
| 9cadce1c | "79→85 SSoT 口径纠正" | 标题正确但 commit body 仍以"79"为基准叙事, 缺少双口径对照表 | 2026-09-02 08:12 |
| 2f8d9438 | "17 zh-hk 包裝盒 blog 全局调度" (commit body 沿用 79 口径) | 17 blog 占 79 zh-hk 的 21.5%, 报告未标"vs SSoT 85"双口径 | 2026-09-02 08:12 |
| 3f5a13cb | "9 zh-hk + 9 ja = 18 贴纸 blog 全局调度" (沿用 79 口径) | 9 zh-hk 贴纸占 79 zh-hk 的 11.4%, 报告未标"vs SSoT 85"双口径 | 2026-09-02 08:12 |
| docs/2026-09-02-k3-printing-blog-reorganization.md (untracked) | "79 unique blog 主营 4 Pillar 归类" | 文档口径需改为"79 zh-hk + 80 en + 80 ja + 85 SSoT 4 口径" | 2026-09-02 08:12 |
| docs/2026-09-02-k3-packaging-blog-reorganization.md (committed in 2f8d9438) | "17 blog" 沿用 79 口径 | 文档口径需补全 4 口径对照 | 2026-09-02 08:12 |

**注**: 6 commit 内容**实质正确** (数据真实), 撤回的是**报告口径叙述方式**, 不是数据本身。

### 门童 #7 数据口径必填 (升级 v1.1.1 → v1.2)

- **触发**: 任何报告含 "blog 篇数 / SKU 数 / 询盘数 / 客户数" 等数字
- **拦截**: 必须含 "数据来源" 行 + 4 口径对照表 + 校准日期
- **缺任一** = 0 commit (red 硬拦) / yellow SHADOW 警告 (per §0.31 反审门童 SOP)
- **落地**: scripts/guards/count-guard.js (9/15 反审门童 v1.0 → v1.1 FP 复盘后升硬拦)
- **配套**: v8-cron-sot-upgrade-segment.md §I 升级段 + AGENTS.md §0.33 8 子节

### 5 cron SSoT 升级段嵌入

- `.hermes/cron-prompts/zprintpro-daily-content-1x7w.md` 头部追加 §I 摘要
- `.hermes/cron-prompts/zprintpro-weekly-meta-refresh.md` 头部追加 §I 摘要
- `.hermes/cron-prompts/zprintpro-gsc-feedback-loop.md` 头部追加 §I 摘要
- `.hermes/cron-prompts/zprintpro-monthly-content-authority-audit.md` 头部追加 §I 摘要
- `.hermes/cron-prompts/zprintpro-blog-deepfix.md` (v9.6) 头部追加 §I 摘要

### K3 必拍板项 (per §0.0 零决策铁律, 5 项)

1. 是否同意 6 commit 报告口径升级为"79 zh-hk + 80 en + 80 ja + 85 SSoT" 4 口径对照叙事 (建议: 同意)
2. 门童 #7 数据口径必填是否升硬拦 (建议: 9/15 FP 复盘 <10% 后升)
3. 6 commit 历史是否 amend (建议: 不 amend, AGENTS.md §0.33 永久生效)
4. zh-hk 32 类 700+ 简体残留是否整改 (建议: 仅改 20 处真需改的, 等 K3 拍板)
5. K3 9/2 07:59 "贴纸知識 9+1 简体" 误判是否需要 K3 主动撤销 (建议: 已在 §I.6 文档化纠错)

### 教训固化源头

- 2026-09-02 08:09 K3 push 痛骂 (2 次数据不对, 根因相同: 未标双口径)
- 2026-09-01 16:22 K3 拍板 79→85 口径纠正 (commit 9cadce1c, 但未根治)
- 2026-08-24 22:00 K3 拍板 §0.23 数据诚信红线
- 跨项目 P0 强制级: 任何 "报告数字未标数据来源" / "未标 4 口径对照" / "未标校准日期" 模式 = 报告作废 + K3 不拍板 + 写事故

---

## 事件 K3-2026-09-02-0759-sticker-simp-trad-misjudge-v1 (9/2 07:59 K3 派活包"贴纸知識 9+1 简体"误判)

> **拍板来源**: K3 9/2 07:59 派活包截图 "貼紙知識 9 篇 + 简体 贴纸知识 1 篇 = 10 篇"
>
> **事件 ID**: K3-2026-09-02-0759-sticker-simp-trad-misjudge-v1
>
> **事件名**: K3 误判 zh-hk 贴纸 blog 简繁混用 (实际全繁体, 0 简体残留)
>
> **严重度**: 🟡 yellow (误判, 非 M3 错误, 文档化纠错即可)

### 真验证 (9/2 08:15)

**zh-hk 贴纸/貼紙 blog 数量** (按 slug 含 sticker 关键词):
- **8 篇**:
  1. baby-product-label-sticker-printing-guide
  2. car-dealership-amenity-sticker-printing-guide
  3. hotel-amenity-sticker-printing-guide
  4. ip-character-sticker-printing-guide
  5. pet-food-sticker-printing-guide
  6. sticker-design
  7. sticker-guide
  8. sticker-material-pvc-vinyl-removable

### 简体残留检测

- 简体 "贴纸知识" 残留: **0 次**
- 简体 "贴纸" 残留: **0 次**
- 繁体 "貼紙知識" 出现: 2 次
- 繁体 "貼紙" 出现: 216 次

### 误判根因

K3 截图可能是:
- 旧版 zh-hk (含简体残留) 已修
- K3 记忆误差
- M3 之前 commit 3f5a13cb 报告"9 zh-hk + 9 ja = 18"中 9 zh-hk 实际含 sticker 关键词 8 + sticker-buying-guide 衍生 1 = 9 (K3 可能误以为 9 中有 1 简体, 实际全繁体)

### 处置

- 已在 v8-cron-sot-upgrade-segment.md §I.6 文档化纠错
- 不需 K3 主动撤销 (误判无 commit 落地)
- 8 篇贴纸 blog 全部用繁体 "貼紙", K3 9/2 07:59 误判纠正

### 教训

- M3 报告"9 zh-hk 贴纸"应明确标"按 sticker slug 关键词 8 + sticker-buying-guide 衍生 1 = 9"
- 未来报告含"X 篇 + Y 简体 = Z 篇"必先 grep 验证
- 已在 §0.33 4 口径对照表涵盖此类误判

- 跨项目复用准备 (v1.3 跨项目)

---

## 事件 K3-2026-09-03-2300-blog-json-broken-v1 (9/3 23:00 fix script 改坏 3 个 blog-data JSON, 生产连续 5 次 build fail)

> **拍板来源**: 用户 2026-09-04 "把这次教训固化进门童：任何对 blog-data JSON 的修改，改完必须先过 python -c \"json.load(...)\" 严格校验，再进 commit"
>
> **事件 ID**: K3-2026-09-03-2300-blog-json-broken-v1
>
> **事件名**: 3 个 blog-data JSON 被 fix script 改坏 (嵌套引号未 escape + 0x0A 控制字符 + GBK→UTF-8 mojibake 双重编码), 生产连续 5 次 build fail
>
> **严重度**: 🔴 red (部署阻断 + 全站博客内容下线风险)

### 时间线 (实测, per §0.23 数据来源)

| 时间 | 事件 | 结果 |
|------|------|------|
| 9/3 17:35-22:48 | 9c35def0→6c2f4a94 共 8 commit 的 blog-data JSON | ✅ 实测全部合法 (推翻 M3 "Layer 1 嵌套引号" 诊断) |
| 9/3 23:00 起 | fix script (fix-blog-data-escape-inner-quotes.py 状态机) 改坏 3 文件 | ❌ 损坏起点 (实测 6c2f4a94 合法 → f5d50092 损坏) |
| 9/4 0:35/1:07/1:36 (UTC 9/3 16:35/17:07/17:36) | f5d50092 / 1e41ccbb / f93e4c55 三次 push | ❌ 生产 5 次 build fail (Vercel log: Bad control character + Unexpected token) |
| 9/4 ~4:30 | 从 6c2f4a94 还原 3 文件 + 本地构建 PASS + push 46cc4e09 | ✅ CF Pages success, 6 URL 实测 200 |

### 双重失败根因

1. **内容失败**: fix script 状态机局限 — schema 段嵌套 JSON 子结构的 closing `"` 被误判为 inner quote; GBK→UTF-8 双重转码产生不可逆 mojibake (鏅哄嵃 类指纹)
2. **校验失败 (更深)**: 本地 12 铁律门童 `try{JSON.parse}catch{return hits}` 对损坏文件静默返回 "0 命中" (lazy parse 误报), 且 `common.js` 500KB 上限导致 800-918KB 的 blog-data JSON 根本不在任何门童扫描范围内 — **14 道门童无一能拦下此事故**

### 自进化 4 步

1. **detect**: K3 push 生产 build fail log (5 次) + 字节级验证 3 文件 BROKEN
2. **block**: 门童 #15 `scripts/guards/blog-data-integrity-guard.js` 落地 (red 硬拦, 不走 shadow): JSON.parse 严格解析 + 字符串内控制字符 + mojibake 指纹 + 键数完整性 (zh-hk≥79/en≥80/ja≥80) + 0 字节; 接入 `scripts/canonical/pre-commit` 2.5 步 + 主入口注册; 8 项负向测试全过
3. **learn**: 本事件 + error-patterns.md 门童 #15 章节 (BLOGJSON-PARSE/CTRL/MOJIBAKE/KEYS/EMPTY); 待办: AGENTS.md §0.31 表补 #15 行 (M3 待办, 本次不擅动)
4. **prevent**: pre-commit 硬拦 (staged 含 3 文件) + 未含时廉价全检警告; 修复方法论固化: **损坏文件禁止手写转义补丁, 一律从最近合法 commit 还原 + JSON.stringify/json.dumps 重序列化**

### 数据来源

- git show 逐 commit JSON 合法性实测 (9/4, 12 候选 + 2 补查)
- Vercel 部署日志 (K3 粘贴 5 次失败记录)
- `node scripts/guards/blog-data-integrity-guard.js` 8 项负向测试 (9/4 全过)
- 校准日期: 2026-09-04
