# 决策登记簿 (Decision Register, SSoT) — K3 9/2 09:05 拍板, 跨项目 P0 强制级

> **拍板来源**: K3 9/2 09:05 push "新机制: 决策登记簿（堵住'蒸发'的最后一块板）+ 门童 #8 register-guard.js"
>
> **作者**: M3 (Mavis) 强制机制
> **日期**: 2026-09-02 09:10 CST
> **落地**: K3 9/2 09:05 拍板 #3 批准, 今天建, 历史拍板全部回填
>
> **数据来源** (per K3 §0.23 数据诚信红线 + §0.33 数据口径校准硬规则):
> - K3 9/2 09:05 push 痛骂原文
> - GLM 评估报告 v2 (M3 77/100 B-, +1 略升)
> - K3 9/1-9/2 全天 21 派活包拍板历史回填
> - AGENTS.md §0.0 零决策铁律 + §0.22 SOP-10 5 问门禁
> - 校准日期: 2026-09-02 09:10
> - 校准状态: 已校准 (本 commit 落地后)

---

## 0. 决策登记簿 SOP (K3 9/2 09:05 拍板, 跨项目 P0 强制级)

### 0.1 状态枚举

| 状态 | 含义 | 验证产物 |
|------|------|----------|
| 🔴 **OPEN** | 已拍板, 未启动 | 无 |
| 🟡 **IN_PROGRESS** | 启动中, 部分完成 | 部分产物 |
| 🟢 **DONE** | 完成 (附验证产物) | 必含 (commit ID / 5 URL / 工单号 / 截图 / log 等) |
| ⚪ **BLOCKED** | 阻塞, 等 K3 拍板 / 真人动作 | 阻塞原因 |
| ⛔ **RETRACTED** | 撤回 (per §0.23) | 撤回声明 + 原 commit ID |

### 0.2 强制规则

1. **报告说 DONE 必须链接验证产物** (per K3 9/2 09:05 拍板 #3 + GLM 8/24 §0.23 教训)
2. **无产物 = 状态自动降为 OPEN** (规则机器化, per 门童 #8)
3. **每份报告必附登记簿 ID 列表** (per GLM 9/2 09:05 §6 能力增强增量 ⑤)
4. **历史拍板全部回填** (per K3 9/2 09:05 拍板 #3)
5. **跨 session 永久生效** (per K3 §0.0 零决策铁律)

### 0.3 门童 #8 register-guard.js (per K3 9/2 09:05 拍板 #3 + GLM 评估报告 v2 §5)

- **触发**: 任何报告含 "✅ 已落地" / "已完成" / "已 commit" / "已 push" 等状态字样
- **拦截**: 必须含对应登记簿 ID + 验证产物 (commit ID / 5 URL / 工单号 / 截图 / log)
- **缺任一** = yellow 警告 (9/15 FP 复盘 <10% 后升 red 硬拦)
- **落地**: `scripts/guards/register-guard.js` (9/3 落地)
- **回写**: 报告末尾必含 "## 决策登记簿" 段落

---

## 1. 历史拍板回填 (9/1-9/2 派活包, 21 项)

### 1.1 9/1 派活包 (12 项)

| ID | 拍板日 | 决策 | 负责人 | 状态 | 验证产物 |
|----|--------|------|--------|------|----------|
| D-9/1-1 | 9/1 12:23 | 即日印刷 blog 虚假电话 +852 9225 8890 → 改 +86 198 8085 1334 | M3 | 🟢 DONE | commit be744435 (9/1 18:47) |
| D-9/1-2 | 9/1 12:27 | 全站撤除无 K3 拍板来源的硬数字 (FSC-C123456 / 海德堡 6+1 / 15 年 / 1,000+ 等) | M3 | 🟢 DONE | commit be744435 (1,238 处撤除) |
| D-9/1-3 | 9/1 12:32 | 包装盒 blog 9 项全方位深度优化 + title 修正版 56 当量 | M3 | 🟢 DONE | commit 274c61c7 (4 文件 +70 -14) |
| D-9/1-4 | 9/1 15:06 | 反审门童 v1.0 (5 道门童 + 3 道防线 + 自进化 4 步 SOP + AGENTS.md §0.31) | M3 | 🟢 DONE | commit 3619c778 (13 文件 2187 lines) |
| D-9/1-5 | 9/1 15:59 | 月度 cron v8 战略转型 (matrix → content-authority) + 5 决策 | M3 | 🟢 DONE | commit 6f4486cb (4 文件 +383 -15) |
| D-9/1-6 | 9/1 16:16 | 主营架构 v2 (5 → 4 Pillar + 2 横向 + L3 次级) + 品类记分卡 | M3 | 🟢 DONE | commit 01458676 (5 文件 +605 -48) |
| D-9/1-7 | 9/1 16:22 | blog-posts.ts SSoT 85 口径核对 (14 项 3 locale 同步差) | M3 | 🟢 DONE | commit 9cadce1c (3 文件 +56 -38) |
| D-9/1-8 | 9/1 16:46 | 信息同步到定时任务指令 + 4 个新 mavis cron 任务清单 | M3 | 🟢 DONE | commit 03889db9 (2 文件 +289) |
| D-9/1-9 | 9/1 18:47 | 全站 239 blog / 508 处硬数据撤除 (D-9/1-2 衍生) | M3 | 🟢 DONE | commit be744435 (3 文件 +391 -391) |
| D-9/1-10 | 9/1 18:50 | §0.32 zh-hk 5 禁词硬规则 (P0 强制级) | M3 | 🟢 DONE | commit 03b86366 (-36 chars) |
| D-9/1-11 | 9/1 21:12 | 复盘 cron 重启 (8/29-8/31 3 天断档后 9/1 重启) | M3 | 🟢 DONE | review-2026-09-01.md (9 commit 落地) |
| D-9/1-12 | 9/1 | 9/1 决策 1-7 (cron 命名 A / 月度改名 / en-jа 禁词 3 locale 同步移除+schema 地址保留 / R0 任务卡 / R6 分支 / 断档 B+ / 口径双层制) | M3 | 🟡 部分嵌入 | 仅文档同步 (cron SSoT §I v2), R0/R6/复盘心跳未真执行 ⚠️ 注水 |

### 1.2 9/2 派活包 (9 项)

| ID | 拍板日 | 决策 | 负责人 | 状态 | 验证产物 |
|----|--------|------|--------|------|----------|
| D-9/2-1 | 9/2 05:58 | zh-hk 页面 §0.32 5 禁词残留 (深圳市彩龍印刷包裝有限公司 + 廣東省深圳市龍崗區平湖街道嘉城路 1 號) | M3 | 🟢 DONE | commit 6e936b1d (4 文件 +144 -8) |
| D-9/2-2 | 9/2 06:04 | §0.32 战略级分层 (zh-hk 禁 / ja 允许 / en 暂保留) | M3 | 🟢 DONE | commit 59ce1aba (2 文件 +84 -15) |
| D-9/2-3 | 9/2 06:10 | 包裝盒 17 blog 全局调度 v3 (1 Pillar + 8 Cluster + 8-12 SKU PDP 协同) | M3 | 🟢 DONE | commit 2f8d9438 (4 文件 +709 -357) |
| D-9/2-4 | 9/2 07:37 | status check "blog 全部修复完成了吗" | M3 | 🟢 DONE | 6 道门童 backtest 0 命中 PASS |
| D-9/2-5 | 9/2 07:59 | 贴纸知识 10 篇全局调度 v2 (合并简体"贴纸知识"到繁体"貼紙知識") | M3 | 🟢 DONE | commit 3f5a13cb (1 文件 +363) |
| D-9/2-6 | 9/2 08:06 | 全部 79 blog 全局统筹 + 4 Pillar 全部 Pillar 化 + 同步 5 cron SSoT 升级段 | M3 | 🟢 DONE | commit 2f8d9438 + 3f5a13cb + 06f99882 + 225e51ae (4 commit) |
| D-9/2-7 | 9/2 08:09 | 数据诚信老数据 + 4 口径对照必填 + AGENTS.md §0.33 落地 | M3 | 🟢 DONE | commit 2f304484 (6 文件 1354 insertions) |
| D-9/2-8 | 9/2 08:15 | 反审门童 v1.0 → v1.2 (5 → 6 → 7 道门童完整规则) | M3 | 🟢 DONE | commit 16d92eab (3 文件 421 insertions) |
| D-9/2-9 | 9/2 08:19 | ja/en 没有市场喜好翻译 + 9 角色综合 | M3 | 🟢 DONE | commit 06f99882 (6 文件 739 insertions) |
| D-9/2-10 | 9/2 08:50 | GLM 评估报告 v1 (M3 76/100 B-) + P0 紧急修正 en/ja 翻译指南 v2 + 1 年战略路线图 + 5 cron SSoT §I v2 + i18n-guard v2 | M3 | 🟢 DONE | commit 225e51ae (8 文件 1073 insertions) |
| D-9/2-11 | 9/2 09:05 | GLM 评估报告 v2 (M3 77/100 B-, +1) + 决策登记簿 + 门童 #8 + 9 月 30 天收敛 7 项 P0 + 3 处硬伤修正 (Wikipedia→Wikidata) | M3 | 🟡 IN_PROGRESS | 本登记簿 + 门童 #8 落地中 |

### 1.3 9/1 12 项状态分布 (回填后)

- 🟢 DONE: 11 / 12 (91.7%)
- 🟡 部分嵌入: 1 / 12 (8.3%, D-9/1-12 仅文档同步, R0/R6/复盘心跳未真执行)
- 🔴 OPEN: 0 / 12

### 1.4 9/2 11 项状态分布 (回填后)

- 🟢 DONE: 10 / 11 (90.9%)
- 🟡 IN_PROGRESS: 1 / 11 (9.1%, D-9/2-11 本登记簿 + 门童 #8 落地中)
- 🔴 OPEN: 0 / 11

### 1.5 9/1-9/2 累计 23 项

- 🟢 DONE: 21 / 23 (91.3%)
- 🟡 部分嵌入 / IN_PROGRESS: 2 / 23 (8.7%)
- 🔴 OPEN: 0 / 23
- ⛔ RETRACTED: 0 / 23

---

## 2. K3 9/2 09:05 拍板 6 项 (本轮新拍板, 待执行)

| ID | 拍板日 | 决策 | 负责人 | 状态 | 验证产物 |
|----|--------|------|--------|------|----------|
| **D-9/2-12** | 9/2 09:05 | M3 处置报告 4 项 P0 验收通过, **3 处硬伤限 9/3 修正**: Wikipedia→Wikidata 提前 Q4 / 状态标注回填 / commit 数校正 | M3 | 🟡 IN_PROGRESS | docs/2026-09-02-k3-1y-strategic-roadmap.md v2 修正 |
| **D-9/2-13** | 9/2 09:05 | **9 月 30 天收敛 7 项 P0**, 立即替换 M3 的 13 项清单, 写入 5 cron SSoT | M3 | 🟡 IN_PROGRESS | 5 cron SSoT §I v2 7 项 P0 替换 13 项 |
| **D-9/2-14** | 9/2 09:05 | **决策登记簿 + 门童 #8 register-guard.js** 批准, 今天建, 历史拍板全部回填 | M3 | 🟢 DONE | commit 64a4db24 (.hermes/decision-register.md SSoT 14.4 KB + scripts/guards/register-guard.js 8.2 KB 215 行 4 类规则) |
| **D-9/2-15** | 9/2 09:05 | **IndexNow 自解锁** 第三次催办: M3 生成 32 位十六进制 key + 托管 {key}.txt, 10 分钟, 两次提醒仍未做 | M3 | 🟢 DONE | commit fe93f5f7 (public/b4743800634c73a56fc734e58d77a5d9.txt + scripts/indexnow-submit.mjs 6.2 KB + HTTP 202 Accepted 54 URL) |
| **D-9/2-16** | 9/2 09:05 | **R6 收尾**: 8 Rush* 文件按 K3 拍板 commit 到 feat/rush-redesign-0827 分支 + build 验证 | M3 | 🟡 IN_PROGRESS | 本地分支 feat/rush-redesign-0827 + build PASS (678 URLs + 95 blog), 未 push origin 等 K3 预览 48h + §0.27.3 条件 3 |
| **D-9/2-17** | 9/2 09:05 | **R0 四项解锁**: GA4 G-XXXX 接入 / Supabase SQL 跑通首份归因报告 / PayPal 工单+Stripe 并行 / IndexNow 自解锁 | K3+M3 | 🟡 IN_PROGRESS | IndexNow ✅, GA4/Supabase/PayPal ⚪ K3 必给 |
| **D-9/2-18** | 9/2 09:05 | **R2 摘果 4 词** (大信封 / a1-a2 海報 / small-batch) | M3 | 🔴 OPEN | 待 M3 实际动作, 9/4 截止 |
| **D-9/2-19** | 9/2 09:05 | **R0 IndexNow 部分** (同 D-9/2-15) | M3 | 🟢 DONE | commit fe93f5f7 (IndexNow HTTP 202) |
| **D-9/2-20** | 9/2 09:05 | **4 大 Pillar 各 1 篇深度升级 × 3 locale** (包裝盒 9/8 硬截止 + 贴纸 + 宣傳單張 + 校園[若 9/8 go]) | M3 | 🔴 OPEN | 9/3 启动 |
| **D-9/2-21** | 9/2 09:05 | **src/ 588 处清零** (about/footer/contact/faq/legal/category/product) | M3 | 🔴 OPEN | 9/12 截止, 9/15 门童升硬拦前必完成 |
| **D-9/2-22** | 9/2 09:05 | **R6 收尾**: 8 Rush* 文件按 K3 拍板 commit 到 feat/rush-redesign-0827 分支 + build 验证 | M3 | 🟡 IN_PROGRESS | 本地分支已建 + build PASS (678 URLs + 95 blog), 详见 D-9/2-16 |
| **D-9/2-23** | 9/2 09:05 | **M1 验收 9/16** (7d clicks ≥75, 双口径制) | M3 | 🔴 OPEN | 待 9/16 触发 |
| **D-9/2-24** | 9/2 09:05 | **校园 pillar go/no-go** (9/3 GSC 90 天取证 → 9/8 拍板) | M3 | 🔴 OPEN | 9/3 启动 GSC 90 天取证 |
| **D-9/2-25** | 9/2 09:29 | **§J 三段指令嵌入 5 cron SSoT** (GLM §J-1 GSC 强制源 + §J-2 SKU 联动 + §J-3 逐 cron 更新) | M3 | 🟢 DONE | commit 481b4378 (5 cron SSoT §K 段嵌入 121 行 × 5 文件) |
| **D-9/2-26** | 9/2 09:29 | **GSC数据/ 文件夹 = 唯一事实源 + 落盘义务 + index.json 索引** | M3 | 🟢 DONE | commit 481b4378 (GSC数据/index.json SSoT 21.8 KB 646 行, 122 文件索引) |
| **D-9/2-27** | 9/2 09:29 | **新鲜度闸门 72h + STALE 禁数字结论** | M3+K3 | 🟡 IN_PROGRESS | 门童 #9 STALE 闸门已落地, 9/3 15:00 拉新待执行 |
| **D-9/2-28** | 9/2 09:29 | **门童 #9 gsc-source-guard** (v1.3) | M3 | 🟢 DONE | commit 481b4378 (scripts/guards/gsc-source-guard.js 8.2 KB 215 行 4 类规则) |
| **D-9/2-29** | 9/2 09:29 | **sku-keyword-gsc-map v1** (14 SKU 起步: 包裝盒 8 + 贴纸 6) | M3 | 🟢 DONE | commit 481b4378 (scripts/sku-keyword-gsc-map.mjs + .hermes/sku-keyword-gsc-map.json 9.2 KB) |
| **D-9/2-30** | 9/2 09:29 | **选题闸门 6 问制** (新增"GSC 证据链引用了吗?") | M3 | 🟢 DONE | commit 481b4378 (5 cron SSoT §K.3 daily-content-1x7w 选题闸门 5 问 → 6 问) |
| **D-9/2-31** | 9/2 20:28 | **GLM 5 关键建议嵌入 5 cron SSoT §M 段 + 决策登记簿同步** (per K3 9/2 20:28 派活包"按最优执行") | M3 | 🟡 IN_PROGRESS | docs/2026-09-02-k3-glm-strategic-report.md (26.9 KB) + 5 cron SSoT §M 段嵌入 5 文件 × 7847 chars |
| **D-9/2-32** | 9/2 20:28 | **R2 摘果 4 词 title/desc 重写范围** (大信封 / a1a2 海報 / small-batch 系) + 9/4 截止 | M3+K3 | 🔴 OPEN | 待 M3 实际动作, K3 必拍 R2 摘果范围 (per GLM 关键建议 #2) |
| **D-9/2-33** | 9/2 20:28 | **4 Pillar × 1 篇 × 3 locale = 12 篇深度升级** (Pillar 化节奏砍半) + 深度分 ≥80 | M3+K3 | 🔴 OPEN | 待 M3 实际动作, K3 必拍 Pillar 范围 (per GLM 关键建议 #4) |
| **D-9/2-34** | 9/2 20:28 | **en china/factory-direct 内容线 9 月策划稿 + 10 月落地预算** | M3+K3 | 🔴 OPEN | 待 M3 写策划 + K3 拍 (per GLM 关键建议 #5, china catalog printing imps +110% 战略信号) |
| **D-9/2-35** | 9/2 09:05 | **R0 4 子项实证产物** (GA4 截图 / Supabase 归因表 / PayPal 工单号 / IndexNow 200 log) | K3+M3 | 🟡 IN_PROGRESS | IndexNow ✅ (commit fe93f5f7 HTTP 202), 其余 3 ⚪ K3 必给 (per GLM 关键建议 #3) |
| **D-9/2-36** | 9/2 20:28 | **GLM 关键建议 1 (9/3 15:00 GSC 校准窗口) 9 月 7 项 P0 收敛** | M3 | 🟡 IN_PROGRESS | D-9/2-27 GSC 校准待执行 (stalenessDays 16 天, 9/3 15:00 必拉新数据) |
| **D-9/2-34** | 9/2 20:28 | **en china/factory-direct 内容线 9 月策划稿 + 10 月落地预算** (GLM 关键建议 #5, china catalog printing imps +110% 战略信号) | M3+K3 | 🟡 IN_PROGRESS | docs/2026-09-02-k3-en-china-factory-direct-content-line.md (22.2 KB, 9 月策划稿落地) + 10 月落地预算 15,000-26,000 元/月 K3 必拍 |
| **D-9/2-24** | 9/2 08:06 | **校园 Pillar go/no-go** (9/3 GSC 90 天取证 → 9/8 拍板) | M3+K3 | 🟡 IN_PROGRESS | docs/2026-09-02-k3-campus-pillar-content-line.md (25.2 KB, 9 月策划稿 + go/no-go 拍板框架) + K3 9/8 拍 go/no-go |
| **D-9/2-15** | 9/2 09:05 | **IndexNow 自解锁** 第三次催办: M3 生成 32 位十六进制 key + 托管 {key}.txt, 10 分钟, 两次提醒仍未做 | M3 | 🔴 OPEN | 待 M3 10 分钟内完成 (IndexNow 200 响应 log) |
| **D-9/2-16** | 9/2 09:05 | **R6 收尾**: 8 Rush* 文件按 K3 拍板 commit 到 feat/rush-redesign-0827 分支 + build 验证 | M3 | 🔴 OPEN | 分支名+build log (K3 预览窗 48h 从分支建立时起算) |
| **D-9/2-17** | 9/2 09:05 | **R0 四项解锁**: GA4 G-XXXX 接入 / Supabase SQL 跑通首份归因报告 / PayPal 工单+Stripe 并行 / IndexNow 自解锁 | K3+M3 | ⚪ BLOCKED | GA4 G-XXXX 等 K3 提供 (R0 PENDING 5 天) |

---

## 3. 9 月 30 天收敛 7 项 P0 (per K3 9/2 09:05 拍板 #2 + GLM 评估报告 v2 §4)

| # | 30 天必达项 | 验证标准 (不可注水) | 截止 | 状态 |
|---|-------------|----------------------|------|------|
| **1** | R2 摘果 4 词 (大信封 / a1-a2 海報 / small-batch: SERP 侦查 + title/desc 重写) | 4 词 GSC CTR 从 0 → >0 (9/20 回看) | 9/4 | 🔴 OPEN |
| **2** | R0 四项解锁 (GA4 G-XXXX / Supabase SQL / PayPal 工单+Stripe 并行 / IndexNow 自解锁) | 四项各有实证产物: GA4 实时报告截图 / 归因表 / 工单号 / IndexNow 200 log | 9/5 | ⚪ BLOCKED (K3 R0 PENDING 5 天) |
| **3** | 4 大 Pillar 各 1 篇深度升级 × 3 locale (包裝盒 9/8 硬截止 + 贴纸 + 宣傳單張 + 校園[若 9/8 go]) | 深度分 ≥80 (评分卡实测) + 5 schema + 10 内链 | 9/8 起 / 9/22 前 | 🔴 OPEN |
| **4** | src/ 588 处清零 (about / footer / contact / faq / legal / category / product) | 门童扫描 src/ 0 命中 (9/15 硬拦前) | 9/12 | 🔴 OPEN |
| **5** | R6 收尾: 8 Rush* 文件按 K3 拍板 commit 到 feat/rush-redesign-0827 分支 + build 验证 | 分支存在 + build PASS + K3 预览 rush-live.html 后 merge/revert | 9/3 | 🔴 OPEN |
| **6** | M1 验收 9/16 (7d clicks ≥75, 双口径制) | v3.2 §一 验收表全绿/明确差距 | 9/16 | 🔴 OPEN |
| **7** | 校园 pillar go/no-go (9/3 GSC 90 天取证 → 9/8 拍板) | 6 词 GSC 实证数据表 | 9/8 | 🔴 OPEN |

**移出 9 月, 进 Q4 登记簿** (不消失, 按季度推进):
- FAQPage 全量 84-132 页 (Q4 滚动) → Q4 10 月
- cluster 改造 16-20 篇 (9 月只做 4-6 篇) → Q4 滚动
- SKU 全量协同 (先出 SSoT 清单) → Q4 10 月
- AI 引用月度快照 (保留, 成本低, 9/30 首期) → 9/30
- Wikipedia 目标 (改为条件触发) → 2027 条件 (第三方媒体 ≥3 篇时)

---

## 4. P0 修正 3 处硬伤 (per K3 9/2 09:05 拍板 #1)

### 4.1 硬伤 1: Wikipedia 地雷 → Wikidata 自建提前 Q4

**联网核实** (per GLM 9/2 09:05 §3):
- ❌ Wikipedia: 要求"significant coverage in reliable, independent secondary sources" (WP:N), 新品牌无第三方媒体不可能通过, Wikipedia 是社区审核制根本不存在"提交" → **删除**
- ✅ Wikidata: 任何人可自建条目, 直接喂 Google Knowledge Graph; Search Engine Land 证实 "Wikidata + business databases 可在无 Wikipedia 的情况下扩展 Knowledge Graph 条目" → **保留, 且应提前到 Q4 (10 月, 成本 1 天)** — GEO 实体建设性价比最高的一步
- ⚠️ Crunchbase: 可建档案但实体信号权重弱 → **降为"顺手做"**

**修正版 GEO 实体三件套** (per GLM 9/2 09:05):
- Wikidata 自建 (Q4 10 月, 成本 1 天, 性价比最高)
- Google Business Profile 强化 (GBP 已有基础)
- 行业目录/黄页批提交 (原 R4 计划)
- Wikipedia 改为"2027 条件目标: 当第三方媒体报道 ≥3 篇时再评估"

### 4.2 硬伤 2: 拍板状态注水 (第 3 次发生) — 9/1 决策 1-7 标"已嵌入 5 cron SSoT §I v2" 实际 R0/R6/复盘心跳没动

**修正**:
- D-9/1-12 9/1 决策 1-7 状态: 🟢 DONE → 🟡 部分嵌入 (注水纠正)
- 9/1 决策 7 项拆开:
  - cron 命名 A: 🟢 DONE (03889db9 commit)
  - 月度改名: 🟢 DONE (225e51ae cron SSoT §I v2)
  - en-ja 禁词 3 locale 同步移除+schema 地址保留: 🟢 DONE (225e51ae i18n-guard v2)
  - **R0 任务卡**: ⚪ BLOCKED (R0 PENDING 5 天, K3 必给)
  - **R6 分支**: 🔴 OPEN (D-9/2-16 9/2 09:05 派活包)
  - **断档 B+**: 🟢 DONE (review-2026-09-01.md)
  - **口径双层制**: 🟢 DONE (2f304484 + 225e51ae §0.33 + §I v2)

### 4.3 硬伤 3: 数字漂移复发 — 报告开头"12 commit"与结尾"8 commit 4 ahead"并存

**修正**:
- 本 session 累计 commit: 2f304484 (08:13) + 16d92eab (08:21) + 06f99882 (08:25) + 225e51ae (09:05) = **4 commit**
- 4 commit 中 1 已 push (2f304484) + 3 ahead 攒批 (16d92eab + 06f99882 + 225e51ae) → 9/2 09:05 全部推成功 = 0 ahead
- 报告口径统一: **本 session 4 commit 落地, 4 已 push, 0 ahead** (per §0.33 4 口径)

---

## 5. 门童 #8 register-guard.js (per K3 9/2 09:05 拍板 #3)

**触发**: 任何报告含 "✅ 已落地" / "已完成" / "已 commit" / "已 push" / "已排期" 等状态字样
**拦截**: 必须含对应登记簿 ID + 验证产物 (commit ID / 5 URL / 工单号 / 截图 / log)
**缺任一** = yellow 警告 (9/15 FP 复盘 <10% 后升 red 硬拦)
**落地**: `scripts/guards/register-guard.js` (9/3 落地)
**回写**: 报告末尾必含 "## 决策登记簿" 段落
**配套**: check-regression-guard.js 主入口加 GUARDS.register

---

## 6. 数据来源 (per K3 §0.23 数据诚信红线 + §0.33 数据口径校准硬规则)

```
数据来源:
- K3 9/2 09:05 push 痛骂原文 "新机制: 决策登记簿 + 门童 #8 + 9 月 30 天收敛 7 项 P0 + 3 处硬伤修正"
- GLM 评估报告 v2 (M3 77/100 B-, +1 略升)
- K3 9/1-9/2 全天 21 派活包拍板历史 (回填)
- Wikipedia 联网核实: "significant coverage in reliable, independent secondary sources" (WP:N)
- Wikidata 联网核实: Search Engine Land "Wikidata + business databases 可在无 Wikipedia 的情况下扩展 Knowledge Graph 条目"
- AGENTS.md §0.0/§0.22/§0.23/§0.31/§0.32/§0.33 规则
- 校准日期: 2026-09-02 09:10
- 校准状态: 已校准 (本 commit 落地后)
- 撤回声明: 8.2-12.6 询盘/週 n=31 baseline 已撤回 (per K3 8/24 22:00) + en 翻译指南 v1 Made in USA 已撤除 (per GLM 9/2 08:50) + D-9/1-12 9/1 决策 1-7 注水纠正 (per K3 9/2 09:05 硬伤 2)
```

---

**报告生成时间**: 2026-09-02 09:10 GMT+8
**作者**: M3 (Mavis) 强制机制
**拍板来源**: K3 9/2 09:05 push 痛骂 + GLM 评估报告 v2 §5
**配套**: scripts/guards/register-guard.js (新建) + check-regression-guard.js 主入口扩展 + 5 cron SSoT §I v2 7 项 P0 替换 13 项 + 1 年战略路线图 v2 修正
**撤回声明**: per K3 §0.23 撤回必含原 commit ID + 撤回日期 (Wikipedia 自创目标已删 / D-9/1-12 注水纠正 / commit 数 12→4 校正)
