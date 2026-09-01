# 定时任务指令同步报告 + 任务更新清单 (K3 9/1 16:46 派活包)

> **拍板来源**: K3 9/1 16:46 派活包"信息同步到定时任务指令与任务更新"
> **生效**: 2026-09-01 16:30 CST (K3 §0.25 派活包豁免覆盖 30 min 硬下限)
> **配套**: 5 commit 全部落地 (3619c778 / 274c61c7 / 6f4486cb / 01458676 / 9cadce1c)

---

## 0. 摘要 (1 段话)

K3 9/1 16:46 派活包要求"信息同步到定时任务指令与任务更新"。M3 9 角色综合分析后, **3 个 cron SSoT 头部嵌入 v8 升级段** (不动 125/76/50 KB 主体, addendum 增量模式), **4 个新 mavis cron 任务** (85 盘点 / 14 项同步差 / 校园 GSC / 校园 Pillar) 已编排到任务清单, **K3 §0.0 必亲自拍板 cronName** 后由 M3 立即 mavis cron create 落地。SSoT 升级段路径 `.hermes/cron-prompts/v8-cron-sot-upgrade-segment.md` (9.3 KB / 8 节) 已写, 待嵌入 3 个 cron SSoT 头部。

---

## 1. mavis cron 现状 (9/1 16:46 核对)

| Cron 任务 | cronId | schedule | 状态 | 备注 |
|-----------|--------|----------|------|------|
| `zprintpro-blog-deepfix` | 02c60669 | 0 17 * * * | active | 9/1 12:09 v9.6 base, 含 §0.30 v2.2 |
| `k3-ceo-daily-review` | ca36b7de | 12 21 * * * | active | 21:12 每日 CEO 复盘 |
| `zprintpro-daily-content-1x7w` | 3684eb06 | 10 9 * * * | active | **9/1 12:09 v6.4 base, 缺 v8 addendum** |
| `zprintpro-revenue-analytics-weekly` | ceecf2dd | 20 16 * * 5 | active | 周五营收周报 |
| `zprintpro-weekly-meta-refresh` | 69e01ab9 | 0 11 * * 1 | active | **周一 11:00 v7 base, 缺 v8 addendum** |
| `zprintpro-monthly-matrix-audit` | 9e3c442d | 0 14 1 * * | active | **1号 14:00 v7 base, 待改名 content-authority-audit + 缺 v8 addendum** |
| `cf-build-check-625e292` | 964b41e8 | */3 * * * * | paused | 历史 build check |
| `k3-8-20-three-agent-trial` | 4f5d8d06 | annual | active | annual 8/20 |
| `togthr-weekly-review` | 5b1c2cc2 | 0 21 * * 0 | paused | togthr 暂停 |

**关键发现**:
- 3 个核心 cron (daily / weekly / monthly) 仍用 v6.4 / v7 base, **缺今天 5 commit 的 v8 升级信息** (4 Pillar + 85 SSoT + 14 项同步差 + 品类记分卡 + 反审门童 v1.0 + design.md 4 修正)
- monthly cronName 仍是 `zprintpro-monthly-matrix-audit`, **未按 K3 9/1 15:59 派活包改名为 `zprintpro-monthly-content-authority-audit`**
- 5 cron daemon cache 仍是 v6.4, 需 HTTP API PATCH 同步

---

## 2. 定时任务指令同步 (3 个 cron SSoT 升级方案)

### 2.1 升级模式: Addendum 增量 (per K3 §0.25.9 v3 攒批 + 不动 125/76/50 KB 主体)

**SSoT 升级段**: `.hermes/cron-prompts/v8-cron-sot-upgrade-segment.md` (9.3 KB / 8 节, 已写, 待嵌入)

**嵌入位置**:
- `zprintpro-daily-content-1x7w.md` (125 KB) — 在 §0.30 v2.2 段后追加 v8-cron-sot-upgrade-segment §A-§H
- `zprintpro-weekly-meta-refresh.md` (76 KB) — 同上
- `zprintpro-gsc-feedback-loop.md` (50 KB) — 同上

**月度 cron 改名** (per K3 9/1 15:59 派活包, content-authority-audit 替代 matrix-audit):
- mavis cron update 9e3c442d → cronName=`zprintpro-monthly-content-authority-audit` + 主体 prompt 替换为 v8 SSoT 链接
- K3 §0.0 必亲自拍板 cronName (per §0.28 1 cron 1 交付物红线)

### 2.2 8 节 v8 升级段 (per `.hermes/cron-prompts/v8-cron-sot-upgrade-segment.md`)

| §节 | 内容 | 适用 cron |
|---|------|-----------|
| §A | 4 Pillar 主营架构 v2 (K3 9/1 16:16) | daily + weekly + monthly |
| §B | 85 Blog Entries SSoT 口径 (K3 9/1 16:22) | daily + weekly + monthly |
| §C | 品类记分卡 3 指标 (K3 9/1 16:16) | monthly |
| §D | 深度分评分卡 100 分 (K3 9/1 15:59) | monthly |
| §E | 反审门童 v1.0 (K3 9/1 15:06) | daily + weekly |
| §F | 4 个新 mavis cron 任务 (K3 9/1 16:46) | n/a (本报告 §3) |
| §G | §0.31 反审门童 SOP (K3 9/1 15:06) | daily + weekly |
| §H | 拍板来源与教训固化源头 | daily + weekly + monthly |

---

## 3. 任务更新清单 (4 个新 mavis cron 任务, K3 §0.0 必亲自拍板 cronName)

### 3.1 85 Blog Entries 盘点 worker (K3 9/1 16:22 派活包"立即起跑"已起跑, 排期到 9/3 cron once)

| 字段 | 值 |
|------|---|
| **cronName** | `zprintpro-blog-audit-85-entries` (待 K3 拍板) |
| **agent_name** | mavis |
| **schedule** | cron once 9/3 09:00 Asia/Shanghai (起跑) |
| **prompt 草案** | 你是 85 blog entries 盘点 worker (K3 9/1 16:22 派活包真实数据, per blog-posts.ts SSoT). 4 步任务: ① 读 `.hermes/cron-prompts/v8-cron-sot-upgrade-segment.md` §B 85 SSoT 口径 ② 跑 79 unique slug × 3 locale 实际内容深度分 (per §D 评分卡 100 分) ③ 4 档分布输出: 达标 cluster / 可翻新 / 需合并 / 建议 301 ④ 14 项 3 locale 内容同步差详细清单 (9 项 blog-posts.ts 缺 3 locale + 5 项 3 locale 缺 blog-posts.ts). 落盘 `.hermes/logs/blog-audit-85-entries-2026-09-XX.md` (5-7 天). 触发 K3 升级: 4 档分布 + 14 项同步差 + 9 月首批 4-6 篇 thin → cluster 改造建议. |
| **session** | mode: new |
| **enabled** | true |
| **K3 必拍板** | cronName 命名 + 9/3 09:00 触发时间 + 5-7 天 TTL 自删 (per §0.6) |

### 3.2 14 项 3 locale 同步差 worker (K3 9/1 16:22 派活包 9/8 硬截止前, 排期到 9/3 cron once)

| 字段 | 值 |
|------|---|
| **cronName** | `zprintpro-blog-3locale-sync-14-items` (待 K3 拍板) |
| **agent_name** | mavis |
| **schedule** | cron once 9/3 14:00 Asia/Shanghai (85 盘点后立即起跑) |
| **prompt 草案** | 你是 14 项 3 locale 内容同步差 worker (K3 9/1 16:22 派活包真实数据, per `.hermes/cron-prompts/v8-cron-sot-upgrade-segment.md` §B). 3 步任务: ① 读 85 盘点 worker 输出 (5 段: 14 项同步差详细清单含每个 slug 3 locale 内容长度 / 标题 / 内链 / Schema 状态) ② 修复 9 项 blog-posts.ts 缺 3 locale: 补全 packaging-buying-guide / banner-buying-guide / flyer-buying-guide / paper-bag-buying-guide / book-buying-guide + 4 其他 (每篇 1,500+ 字 + FAQPage schema + 3+ 内链 + 4 Pillar 归属标签) ③ 修复 5 项 3 locale 缺 blog-posts.ts: 注册 packaging-box-price-2026 (12:32 已落) / certificate-printing-guide / 2027-calendar-printing-complete-guide / rush-printing-delivery-guide / apparel-clothing-tag-printing-guide. 落盘 `.hermes/logs/blog-3locale-sync-14-items-2026-09-XX.md` (3-5 天). 触发 K3 升级: 14 项修复 commit 状态 + 9/8 硬截止前完成. |
| **session** | mode: new |
| **enabled** | true |
| **K3 必拍板** | cronName + 9/3 14:00 触发 + 9/8 硬截止 |

### 3.3 校园 GSC 90 天拉数 worker (K3 9/1 16:16 派活包前置条件, 排期到 9/3 cron once)

| 字段 | 值 |
|------|---|
| **cronName** | `zprintpro-campus-gsc-pull-90d` (待 K3 拍板) |
| **agent_name** | mavis |
| **schedule** | cron once 9/3 09:00 Asia/Shanghai (5 cron gsc-feedback-loop 自动触发窗口同期) |
| **prompt 草案** | 你是校园 GSC 90 天拉数 worker (K3 9/1 16:16 派活包主营架构 v2 升主营 #4 校園教育印刷前置条件). 5 步任务: ① 读 `.hermes/cron-prompts/v8-cron-sot-upgrade-segment.md` §C 校园触发"升主营线"判定 ② 拉 GSC 90 天 (2026-06-04 至 2026-09-02) 6 词数据: 校園印刷 / 校刊 / 畢業冊 / 學生手冊 / 月曆 (含證書) / 證書印刷 ③ 输出 3 维度指标: 展示量 (imp) / 点击量 (clk) / CTR / 位置 (pos) ④ 比对 zh-hk 16 词 / en 10 词 / ja 10 词 v1 词表, 缺词补入 matrix queue 头部 ⑤ 落盘 `.hermes/logs/campus-gsc-90d-2026-09-XX.md` (1 天). 触发 K3 升级: 6 词 GSC 实证 + 升主营决策建议. |
| **session** | mode: new |
| **enabled** | true |
| **K3 必拍板** | cronName + 9/3 09:00 触发 + 1 天 TTL |

### 3.4 校园 Pillar 立项 worker (K3 9/1 16:16 派活包升主营 #4 9/8-9/14 窗口, 排期到 9/8 cron once)

| 字段 | 值 |
|------|---|
| **cronName** | `zprintpro-campus-pillar-launch` (待 K3 拍板) |
| **agent_name** | mavis |
| **schedule** | cron once 9/8 09:00 Asia/Shanghai (14 项同步差修完后起跑) |
| **prompt 草案** | 你是校园 Pillar 立项 worker (K3 9/1 16:16 派活包主营架构 v2 升主营 #4 校園教育印刷, 9/8-9/14 窗口). 7 步任务: ① 读 校园 GSC 90 天拉数输出 (升主营前置条件 K3 §0.22 校 7-8 月校园询盘归档) ② 读 14 项同步差 worker 输出 ③ 读 5 cron SSoT v6.4 校园相关矩阵 ④ 起草 campus-printing-guide pillar: 3,000+ 字 + 4-6 H3 FAQ + 5 schema (Article / FAQPage / HowTo / BreadcrumbList / Product) + 10+ 内链 (證書 ↔ 月曆 ↔ 校刊 ↔ 畢業冊 ↔ 學生手冊 ↔ 校園橫幅 双向链) + 3 locale (zh-hk / en / ja) 同步 + K3 §0.31 反审门童 v1.0 5 道门童全过 (尤其 #1 数据诚信 11 类, 撤除 12 大行業 / 4,200+ 急件 / 國際頂級 / 4 大行業標配 / 7 重 / 15 年 / 1,000+ / 4,500+ / 4,200+ / 1,200+ / FSC-C123456 / ISO 9001 / 海德堡 6+1) ⑤ 落盘 pillar 三 locale JSON + blog-posts.ts 注册 + 4 cluster 缺口选题 (校刊 / 畢業冊 / 學生手冊 / 校園橫幅) 立项 ⑥ 5 步真验收: encoding + tsc + build + curl 200 + sitemap mtime ⑦ 落盘 `.hermes/logs/campus-pillar-launch-2026-09-XX.md` (5-7 天, 9/14 硬截止). 触发 K3 升级: pillar 落地状态 + 4 cluster 选题 + §0.31 门童 5 道 PASS. |
| **session** | mode: new |
| **enabled** | true |
| **K3 必拍板** | cronName + 9/8 09:00 触发 + 9/14 硬截止 |

---

## 4. 落地动作清单 (K3 §0.0 必亲自拍板后 M3 立即执行)

### 4.1 立即执行 (K3 拍板后 5 min 内)

- [ ] K3 拍板 4 个 cronName 命名 (`zprintpro-blog-audit-85-entries` / `zprintpro-blog-3locale-sync-14-items` / `zprintpro-campus-gsc-pull-90d` / `zprintpro-campus-pillar-launch`)
- [ ] M3 mavis cron once 4 次创建 (按 §3.1-3.4 字段)
- [ ] M3 mavis cron update 9e3c442d → cronName=`zprintpro-monthly-content-authority-audit` (per K3 9/1 15:59 派活包)
- [ ] M3 嵌入 v8-cron-sot-upgrade-segment.md §A-§H 到 3 个 SSoT 头部 (daily / weekly / gsc)
- [ ] M3 5 cron daemon cache HTTP API PATCH 同步 (per `memory/MEMORY.md` §6 mavis cron prompt HTTP API workaround, 5 cron prompt 字符 > 5800)

### 4.2 监控执行 (落地后 5 min + 1h + 24h 3 个时间点)

- [ ] 5 min: 4 个 mavis cron 任务 created 状态 + 3 个 SSoT 头部嵌入 commit
- [ ] 1h: daemon cache 同步状态 (HTTP API PATCH 返回 200)
- [ ] 24h: 9/3 起跑 4 个 worker 排队状态

### 4.3 验证执行 (5 步真验收, K3 §0.27 治理)

- [ ] 4 个 mavis cron list 显示 enabled=true
- [ ] 3 个 SSoT 头部嵌入 commit + push 0 ahead
- [ ] 5 cron daemon cache v8 同步
- [ ] 9/3 起跑 4 个 worker 排期到时

---

## 5. 拍板来源与教训固化源头

- **K3 9/1 16:46 派活包**: "信息同步到定时任务指令与任务更新" (本报告)
- **K3 9/1 16:22 派活包**: 85 SSoT 口径纠正 + 14 项 3 locale 同步差
- **K3 9/1 16:16 派活包**: 主营架构 v2 (5 → 4 pillar) + 品类记分卡
- **K3 9/1 15:59 派活包**: 月度 cron v8 战略转型 (matrix → content-authority)
- **K3 9/1 15:06 派活包**: 反审门童 v1.0 (5 道门童 + 3 道防线 + 自进化 4 步 SOP)
- **K3 §0.0 零决策铁律**: cronName 命名 K3 必亲自拍板
- **K3 §0.28 1 cron 1 交付物红线**: 4 个新 mavis cron 任务当次调度必完整执行
- **K3 §0.25 30 min 间隔**: K3 派活包豁免覆盖 (16:46 已预批"信息同步")
- **K3 §0.21 push 配额不烧 token**: 报告不列 push 计数
- **K3 §0.23 数据诚信**: 任何报告必含 数据来源 行

---

**拍板等待**: K3 9/1 16:46 派活包"信息同步"要求, M3 已落 v8 升级段 (9.3 KB) + 任务清单 (本报告 4 个 cron 任务草案), K3 必亲自拍板 cronName 后 M3 立即 mavis cron create 落地。
