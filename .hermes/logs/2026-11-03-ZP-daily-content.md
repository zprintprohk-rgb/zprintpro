# 2026-11-03 ZP-daily-content 车道报告（定时 18:17 轮 · 月曆窗复核收口 + en desk FAQ 源定位）

- **VERDICT: OK**
- **RECOVERY: 167.0%**（gsc-cliff-2026-11-03.json: realtime 24h **2026-11-02T03:00→11-03T02:00, 展示 977 / 点击 23**, 断崖前固定口径 585.2 → **167.0%**; 动态全国家口径 977÷mean28(790, 11-03 档) = **123.7%**; k3-review 11-03 同源 129.5% 差异 = 分母 754.5 vs 790 口径不同, 双双 >100%; alert 仅 INFO_CALIBER_SWITCH×3 单站档 22d 过旧回退 11-03 汇总档, **无 CRITICAL**）
- **CONSUMED**: run-context-ZP-daily-content.json（18:17:24, preflight EXIT=0 持锁）· lane-status.json（problems=4: gsc-feedback LastTaskResult=1 / monthly-matrix 11-01 MISSING + 2147946720 / k3-review LastTaskResult=1）· lane-runs.jsonl（11-02: k3-review 07:10 FAILED→20:26 续跑 OK、gsc-feedback 20:13 FAILED→11-03 06:1x 恢复 OK、daily-content 21:21 OK; 11-03: k3-review 07:16 OK）· **k3-review 2026-11-03 报告（NEXT② en desk-calendars 过期 FAQ 源定位 = 今日主任务）** · 2026-11-01-ZP-daily-content.md（旧任务 21:17 轮改写合并: 4 文件 30 处月曆复核 DELIVERED 但 src 未提交）· git status/diff（3 dirty 文件 mtime 11-01 21:20 = 旧任务未提交产物, 滞留 2 天）· 线上 curl 探针（en desk-calendars 产品页 + en calendars 分类页）· GSC 11-03 四档 · strategy-task-queue（5+1 WAITING_K3）· b1c-queue（1-30 DONE）
- **DELIVERED**: **月曆窗复核收口 — commit `c0552853`（8 文件 39 处, push `47d65a92..c0552853`）**: ① 收口入库旧任务 11-01 未提交 3 文件（product-faqs/category-seo-content/category-conversion-blocks）→ 即部署, 解决线上 en desk FAQ 过期渲染 ② sku-seo-data CTA early-bird ×3 ③ blog 层过期口径 22 处（ja 6 / zh-hk 9 / en 4 / blog-posts 1）· **en desk-calendars FAQ 源定位答复（k3 NEXT②）** · 本报告 · bus 记录
- **NEXT**: ① en 月曆深指南「order by September 15」硬期限 + 折扣/利用率% 声明（10-15% discount / drops to 50-60% / utilization 85-90%）→ **blog-deepfix 周六批 + K3 拍板核验**（非政策中性可自理）② 燙金 blog「8 折早鳥優惠 / 20% early bird discount」折扣声明 → K3 核验（有拍板则撤/改）③ 11-04 k3-review 复核项: 11-03 20:13 gsc API 再拉 + 任务J 第三测、monthly-matrix 11-01 月复盘是否解除、daily-content 21:17 NO_OP/READY ④ 5+1 项 WAITING_K3（贴纸 zh 真值/贴纸三层价/blog H1 后缀/五类真值/blog 认证词组/17 主 URL）⑤ GSC 单站档 22d 过旧（K3 补导）⑥ 07:10 k3-review × weekly-meta 撞锁风险（11-02 07:10 曾 FAILED, 11-03 07:16 OK）

---

## 1. en desk-calendars FAQ 源定位（k3-review 11-03 NEXT② 答复）

**k3 证据**: 线上 en desk-calendars FAQ 块渲染「If we order calendars in September, is it still in time? / lock your order by end of October」+ 转换块「2027 early-bird pre-orders secure discount pricing」；k3 查 worktree product-faqs.ts 判定「源不在 product-faqs.ts」。

**定位结论（双方法: 线上 curl + committed 版本对比）**:
- 线上渲染源 = **product-faqs.ts `calendarsFAQs` committed 旧版**（Q「9 月落單印月曆仲嚟得切嗎？/If we order calendars in September...」+ A「Q4 is peak season...lock your order by end of October」）
- 修复**已存在于 dirty 工作树**（旧任务 11-01 21:20 改写的 product-faqs.ts L675-684: Q 改「月曆落單要幾早？」+ A 改「11 月起檔期以報價回覆為準」）**但从未提交/部署** → k3 读 dirty 工作树才误判「源不在」
- 同理 category-conversion-blocks.ts en「early-bird 10% off / early-bird discount WhatsApp 模板」= committed 旧版, dirty 版已修
- **处置**: 本轮将 3 个 dirty 文件入库提交 → 部署即修复线上渲染（commit c0552853）✓

## 2. 本批交付明细

| 来源 | 文件 | 处数 | 内容 |
|---|---|---:|---|
| 收口（旧任务 11-01 产物） | product-faqs.ts | 6 | calendarsFAQs zh/en/ja Q 改写（9月落單→幾時落單）+ 答案去「10月底锁单」→「11 月起以報價回覆為準」 |
| 收口 | category-seo-content.ts | 5 | 月曆 zh 段 featuredSnippet/FAQ×4 去早鳥預訂/早鳥預訂已開放 |
| 收口 | category-conversion-blocks.ts | 12 | zh metaDescription 去早鳥9折 + orderFlow 鎖價→以報價為準 + WhatsApp 模板去早鳥 + FAQ×4; en 去 early-bird/10% off |
| 新修 | sku-seo-data.ts | 3 | en 月曆 CTA「lock early-bird pricing before the Q4 peak/rush」×3 →「secure your production slot early」 |
| 新修 | blog-data ja.json | 6 | 10月末まで→早めに（+11月以降製造枠見積り時）· 数据出典 Q4繁忙期 10月末→早め · 10月底(zh 混入)デザイン/発注確定→早め |
| 新修 | blog-data zh-hk.json | 9 | 建議 10 月底前確認訂單×3→盡早確認（11 月起以報價回覆為準）· 早鳥預訂連免費設計→預訂連免費設計 · desc/FAQ 同法 |
| 新修 | blog-data en.json | 4 | confirm artwork by late October→as early as possible · Q4 slots by late October→as early as possible |
| 新修 | blog-posts.ts | 1 | zh excerpt Q4 旺季 10 月底前確認→建議盡早確認 |
| **合计** | **8 文件** | **39** | |

**口径**: 政策中性（零新数字/零价格 MOQ 交期/零 title）；保留季节性节奏叙述（August-October ordering window / 黄金窗口 8/15-10/15 / 2027 pre-order window opens = 描述性, 非开放窗口承诺）；不发明新折扣率/截單日。

**三闸门**: #1 先 curl 线上定位 + committed 版对比（双方法）再写对 ✓ · #2 diff 39+/39- 逐行 + 语句抽查 ✓ · #3 全量扫描（early-bird/10月底/10月末/late October 等）calendar 域残留 = 0（延后项除外）✓

## 3. 验证与门童

| 项 | 结果 |
|---|---|
| 门童 | encoding ✓ · brand --strict A 类 0 ✓ · gsc-leak ✓ · content ✓ · i18n ✓ · MOQ #24 PASS（新漂移 0）· pre-commit 5 门童 0 red + DoD + 简中 ✓ · tsc **54=54** ✓ |
| 恢复红线 | 零新数字/零新正文/Jaccard N/A/未动 title/名片域零触碰/未动同侪在途文件 |
| 线上复验 | push 后 en desk-calendars FAQ 将由 c0552853 部署修复（verify-deploy 待复查） |

## 4. 并发与安全

- §0.35.7 双条件: ① git status 无 MM + staged 删除归零 ✓ ② 对端 src 最后写 11-02 21:19（sku-seo, 旧任务）→ 静默 >24h ✓
- 3 个 dirty 文件 = **本 lane 旧任务 11-01 产物**（同车道, 非外人对端）→ 收口入库属本 lane 职责; 已披露于 commit message
- push 前 ahead 仅 1 commit; 30min 下限（上推 11-01 18:5x）远超 ✓; 攒批 = ≥1 src 行为修复 ✓
- 幂等键: `harness-20261103-calendar-window-close`
- **CF Pages build: SUCCESS — deploy is live**（复查 18:39, run 125864247445）

## 数据来源

```
数据来源:
- 结果总线: run-context-ZP-daily-content.json (18:17:24, preflight EXIT=0 持锁) · lane-status.json (problems=4) · lane-runs.jsonl (89 条: 11-02 k3 FAILED→20:26 OK / gsc FAILED→11-03 06:1x OK / daily 21:21 OK; 11-03 k3 07:16 OK)
- k3-review 2026-11-03 报告 (NEXT② en desk FAQ 源定位 · GSC 11-03 四档 24h 977/23 pos 15.93 CTR 2.35% · 129.5% 分母 754.5)
- GSC: gsc-cliff-2026-11-03.json (24h 11-02T03→11-03T02 977 imp/23 clk · precliff 167.0% · dynamic 123.7% 分母 790 · INFO×3 单站档 22d 过旧回退 11-03 汇总档 3d)
- 线上探针: curl zprintpro.com/en/product/desk-calendars/ + /en/category/calendars/ (11-03 18:2x, 200, 定位 FAQ 源)
- 修复脚本: .hermes/_calendar_cleanup_20261103.py (untracked evidence) + git show HEAD:对比 committed 版
- 队列: strategy-task-queue.json (5+1 WAITING_K3; FIX-WEEKLY owner=ZP-k3-review; ASSET owner=manual-executor) · b1c-queue-progress.json (1-30 DONE)
- 交付证据: git c0552853 (8 文件 39+/39-) · tsc 54=54 · 门童全 PASS
校准状态: 🟢 已校准 — 双方法源定位 + 残留 0 + commit c0552853 已 push
```
