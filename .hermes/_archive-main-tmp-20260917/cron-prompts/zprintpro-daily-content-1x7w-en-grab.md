# zprintpro-daily-content-1x7w-en-grab (SSoT)
# Source: mavis cron (待 K3 9:00 拍板后 mavis cron create 实际 ID)
# Last sync: 2026-08-08 04:55 (K3 8/8 04:35 战略级 + v8.9 升级同步)
# 触发: 每天 10:15 Asia/Shanghai (跟主 cron 同步)
# 预算: 60 min (en 抓强任务, 不写内容, 只改 title)
# 任务: en 美国 = 低成本抓强 (small-batch-stickers 等 5 SKU title 改字监控 + 不写内容)

【v1 升级 (2026-08-08 04:55 K3 8/8 04:35 战略级 3 市场分层 - en 抓强)】

## 一、核心战略 (per K3 8/8 04:35)

**en 美国 = 低成本抓强 (核心: 只改 5 SKU title, 不写内容, ROI 最高)**

**en 当前状态** (per GSC v2 分析):
- 3 月 imps 2641 / 14 clicks / 0.53% CTR / pos 27.91 (垫底, 但 pos 中等)
- 7 天 移动端 1.45% CTR (桌面 0.43% 3.4 倍) - 移动端优先
- 商家信息 5/9 55.56% CTR pos 2.67 - **EN KP 顶级信号** (3 市场最强)
- 12 高 imps 0% CTR query 250 imps 黑洞 (small-batch-stickers 抓强 29 imps pos 7.76 第 1 页底部)

**资源重排核心** (per K3 §0.11 战略级 P0 第 1 优先):
**en small-batch-stickers pos 7.76 / 29 imps / 0% CTR = 4 天可兑现, 全项目 ROI 最高单点**

## 二、5 SKU EN 抓强信号 (8/8 10:15 amend push 整合)

5 SKU EN P0 (per v2 报告 §5):
1. **P0 第 1 优先** - **small-batch-stickers** (pos 7.76 / 29 imps / 0% CTR) - title_en "Small Batch Stickers 100 MOQ Same-Day Free Shipping Vinyl, Die-Cut, Waterproof" + 8 行业 (DTC/Craft/Brewery/Skincare/Pet Food/Subscription Box/E-commerce/Event) + 5 FAQ
2. **a2-posters** (120+ imps 黑洞王) - title_en "A2 Poster Printing 1-3 Day Turnaround UV-Coated Lamination Free Shipping 100+ MOQ" + 8 行业 + 5 FAQ
3. **waterproof-stickers** (100+ imps 防水贴纸大类) - title_en "Waterproof Stickers 5+ Years Outdoor UV Lamination Free Shipping 100 MOQ" + 8 行业 + 5 FAQ
4. **saddle-stitch-booklets** (88 imps 黑洞 pos 73-87) - title_en "Saddle Stitch Booklets 16-64 Pages 1-3 Day Wire Bound Catalog Printing Free Shipping 100 MOQ" + 8 行业 + 5 FAQ
5. **kraft-paper-bags** (16 imps 抓强 pos 10.38/13.38) - title_en "Kraft Paper Bags 100-200 GSM Custom Logo Printed 5,000 MOQ Free Shipping Asia Factory" + 8 行业 + 5 FAQ

**整合 zh-hk / ja 5 SKU + en 5 SKU = 总 15 SKU 1 push (§0.1 攒批)**

**P0 第 1 优先 单独改** (per K3 8/8 04:35 战略级, ROI 最高):
- EN small-batch-stickers 单独 commit (P0 第 1 优先, 不跟其他合并)
- 期望 0% → 3-5% CTR (4 天可兑现)
- 草稿: `.hermes/k3-inbox/2026-08-08-0440-p0-small-batch-stickers-priority-diff.md` (12.8KB, 已就位)
- K3 9:00 拍板: A 2 commit 2 build vs B 1 amend 1 build (§0.1 攒批)

## 三、§0.10 KPI 校准值 (per K3 校准)

| 指标 | M3 初始 | K3 校准 | 校准公式 |
|------|---------|---------|---------|
| EN CTR 7d | 0.8%+ | 0.6-0.7% | snippet 改后 1-2 周 |
| EN pos 7d | 22 | 25 | 排名响应 2-6 周 |
| small-batch-stickers CTR | 3-5% | 2-3% | 4 天 snippet 改 |
| small-batch-stickers pos | 7.76 | 5-6 | 排名可能微升 |
| EN KP imps | 30+ | 15-20 | Org sameAs 打 5 折 |
| EN KP CTR | 65% | 55-60% | 维持 55.56% 顶级 |

**复盘 SOP**: 任一 KPI 超校准值 = 优秀, 介于 = 合格, 低于 = 需分析

## 四、任务分配 (每天 10:15, 60 min)

### Task 1: 5 SKU EN 抓强信号验证 (15 min) - 每天跑
- 5 SKU EN PDP 改字后 4 天/72h 验 CTR (per §0.11 P0 抓强信号闭环)
- 输出每日 5 SKU EN CTR 报告 (3m vs 7d vs 24h)
- 不升 CTR 升级 K3 拍板 (回滚 / 加 5 FAQ / 等等)
- **重点**: small-batch-stickers 第 1 监控, 期望 0% → 2-3% (校准)

### Task 2: GSC 抓强监控同步 (10 min) - 每天跑
- 跑 8/9 起的 GSC 抓强监控 sub-cron (per main cron v8.9 §二)
- EN 强信号加入 P0 改字清单
- 重点: pos ≤ 10 但 0% CTR query (跟 §0.11 P0 抓强一致)

### Task 3: 不写内容 (per K3 §0.11 资源重排) (0 min) - 拍板项
- en 任务 = **只改 5 SKU title, 不写内容** (per K3 8/8 04:35 战略级)
- 不写新 blog (避免内容堆积, 资源投到抓强信号)
- 不写新 PDP (87 SKU 够用, 不扩)
- 资源 = 全投 5 SKU title 改字 + 抓强闭环 + GSC 监控

### Task 4: EN 抓强二批 (8/16 跑) (15 min)
- Week 2 8/16 EN 抓强二批
- 5 SKU 候补: paper bag gsm FAQPage 5 Q (强化 pos 10.38/13.38) + acrylic-keychain + can-badge + security-stickers + foil-stickers
- 抓强信号闭环 8/16 启动

### Task 5: 询盘转化 funnel (10 min) - 每天跑
- 跟 zh-hk / ja 收割子 cron 同步, 监控 Supabase quotes 表
- en locale 询盘数 (期望 0 → ≥1, per §0.12 转化侧指标)
- form submit / 总 imps 转化率监控 (期望 ≥ 0.05%)

### Task 6: NAP GEO 实体建设 (5 min) - 每天跑
- EN NAP 强化 (4 段):
  1. 品牌 NAP: 「ZprintPro — US/UK/AU/CA/NZ/SG — Free Shipping $99+」
  2. 联系 NAP: 「WhatsApp +1-XXX-XXX-XXXX / zprintpro@outlook.com」(等 K3 9:00 提供)
  3. 物流 NAP: 「DHL Global 2-4 Day from Asia Factory」
  4. 价格 NAP: 「Free Design + 100 MOQ + 5+ Years Outdoor UV」
- 5 SKU EN 改字时 4 NAP 段一并加

## 五、5 渲染源 cross-check (per MEMORY.md §9, 改字前必查)

5 SKU EN 改字必查 5 渲染源:
1. src/data/products.ts (title_en / descriptionEn 字段)
2. src/data/sku-seo-data.ts (PDP meta title / description, 优先)
3. src/data/blog-data/en.json (blog 引用此 SKU)
4. src/components/pdp/orderform.tsx (PDP 提交后 fallback 文案)
5. src/components/pdp/referencepriceblock.tsx (PDP 价格表兜底)
6. public/llms-en.txt (AI 注入, L11 + L222 副文件)

grep SOP: `grep -rn "small batch sticker" src/ public/` / `grep -rn "A2 poster" src/ public/` / `grep -rn "waterproof sticker" src/ public/` / `grep -rn "saddle stitch" src/ public/` / `grep -rn "kraft paper bag" src/ public/`
- 0 残留旧词 + 0 简体字 (en 不适用, 但 0 拼写错)

## 六、Week 2 8/13-8/21 en 抓强二批 (K3 8/8 04:35 拍板)

- 8/16: EN 抓强二批 (paper bag gsm FAQPage 5 Q + 4 候补 SKU)
- 8/19: branded search 6 query 复测 (ZprintPro / zprint / ジープリント 期望 ≥1)
- 8/21: 双周复盘 0 push, en 5 SKU 复盘 (按 §0.10 校准值 + §0.12 转化指标)

## 七、§0.13 K3 战略拍板 4 字+①②③ 模式 (per MEMORY.md §0.13)

**4 字**: X URL / LinkedIn URL / 5 SKU EN 改字 K3 审字 / 8/9 Org sameAs 改 K3 审 diff
**①②③**: 8/12 复盘改用校准值 / §0.10-0.12 三条入记忆 (✓ 已写) / Week 2 排期 OK
**M3 自主范围**: 5 SKU EN 选择 + 改字 USP 模板 + 不写内容决策 + 抓强闭环 + GSC 监控
**K3 9:00 必跑 4 件**: 3 设备 / Supabase dashboard / formsubmit 激活 / 提供 key

## 八、报告落盘 (每天 22:00 跑)

- en 抓强日报: `.hermes/reports/en-grab-YYYY-MM-DD.md` (5 SKU CTR + small-batch-stickers 重点监控 + 抓强闭环 + 不写内容决策)
- en 抓强清单: `.hermes/k3-inbox/en-strong-signal-YYYY-MM-DD.md` (5 SKU 强信号 + 12 高 imps 0% CTR query 进展)
- en 8/12 复盘: `.hermes/k3-inbox/2026-08-12-en-review.md` (用 §0.10 校准值, 不按 M3 乐观值)
- en 8/21 双周复盘: `.hermes/k3-inbox/2026-08-21-en-biweekly-review.md`

## 九、§0.7 §0.8 §0.9 引用 (per K3 8/8 拍板)

- §0.7 关键漏斗 endpoint production smoke 3 步 (8/9 Org sameAs 改后必跑)
- §0.8 Self-Reminder 防抖 (8/8 09:55 cron once 7e2cc0ba 一次性触发, 不空转)
- §0.9 外链注册自动化边界 (en 暂不跑 AutoGLM, 资源投抓强)

## 十、启动必读 (4 个 SSoT)

1. F:\zprintpro-nextjs\.hermes\cron-prompts\zprintpro-daily-content-1x7w.md (主 cron v8.9)
2. F:\zprintpro-nextjs\.hermes\cron-prompts\zprintpro-daily-content-1x7w-en-grab.md (本文件)
3. F:\zprintpro-nextjs\.hermes\industry-keyword-matrix.json (matrix gsc_targeting_v2 段)
4. F:\zprintpro-nextjs\AGENTS.md (项目宪法 §0 / §1 / §11 / §13.15 / §13.16.1)

## 十一、报告落盘 (本任务卡 v1 升级)

- 本文件: `.hermes/cron-prompts/zprintpro-daily-content-1x7w-en-grab.md` (本文件, ~8K chars)
- 整合进主 cron v8.9 §七 3 sub-cron 路径
- K3 status 报告: `.hermes/k3-inbox/2026-08-08-0450-m3-v89-sync.md` (待写)
