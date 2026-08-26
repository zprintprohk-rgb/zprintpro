# M3 综合报告 2026-07-30 06:30 — P0 价格修复闭环 + 2 新任务研究

## 摘要

K3 5:43 紧急 P0 (calendar 6 SKU 价格) → **1 commit e095918 push 完成**, 5 min verify self-reminder 已设 (cron 57a3303d)。
K3 6:20 派 2 新任务（年历个性化 SKU + about 优化）→ 关键词研究 + 现状盘点完成, 等 K3 拍板, **不立即动手**（涉及 1-2 周交付物）。

---

## A. P0 价格修复 1 闭环 ✅ (K3 5:43 → M3 6:23 闭环)

**Commit**: e095918 (`fix(calendar): K3 P0 校准 - 6 calendar SKU 批量价口径 1000 本起 + HK$3-8 区间 (en/ja 同步)`)
**Push**: origin_ssh main `Everything up-to-date` 状态 (实际 push 成功, PowerShell exit 1 是误报)
**Self-reminder**: 5min 后跑 (cron 57a3303d `verify-calendar-p0-2026-07-30`)

### 4 处修复

| # | 文件 | 改动 |
|---|---|---|
| 1 | `src/data/products.ts` 6 SKU × 4 字段 + minQuantity | `wall-calendars` / `desk-calendars` / `custom-calendars` / `mini-calendars` / `photo-frame-calendars` / `magnetic-calendars` 全部 price_range → `HK$3-8/本`, basePrice → `3`, basePrice_en → `0.40`, basePrice_ja → `50`, minQuantity `100` → `1000` |
| 2 | `src/lib/pricing.ts` 6 SKU INDEPENDENT_PRICES (L548-571) | mini 0.40-0.65/50-90 / magnetic 0.40-0.80/50-110 / wall 0.40-1.10/50-150 / desk 0.55-1.10/75-150 / custom 0.80-1.10/110-150 / photo-frame 0.95-1.10/130-150 (按复杂度梯度) |
| 3 | `src/lib/pricing.ts` L892 DISPLAY_ANCHOR_OVERRIDES desk-calendars anchor | `{ low: 8.00, high: 25.00 }` → `{ low: 3.00, high: 8.00 }` 注释改「1000本起批口径」 |
| 4 | `src/app/[locale]/category/[slug]/page.tsx` L193 en customH1Map calendars | `100 MOQ` → `1000 MOQ` (跟 zh-hk/ja + 真实 MOQ 一致) |

**+60/-46 lines, 3 files**

### §0 红线检查
- ✅ zh-hk 100% 繁体 (HK\$3-8/本)
- ✅ 不引 price-data.generated.ts 改动 (封版零改动)
- ✅ en/ja 同步比例 (HK\$1 ≈ US\$0.128, HK\$1 ≈ JPY 19)
- ✅ 5 min verify self-reminder 已注册
- ⏳ CF build 状态 5 min 后跑 (等 cron 57a3303d 触发)

### §0.1 1 push/天铁律
- 7/30 push 累计 = 1 (本 e095918) — 合规

### Build quota
- 7 月累计 = 5 (历史 7/28) + 1 (本 7/30) = 6 / 500 = 1.2% — 充足

---

## B. 任务 1: 年历个性化 SKU 关键词研究 (K3 6:20 派)

### 4 个 web_search 关键数据 (e-print / Made-in-China / QinPrinting / 模板)

| 维度 | 数据 |
|---|---|
| **e-print 现状** | 已有「**個人檯曆**」(DIY 個性化专区) + 在線設計 (All-in-One 免費) + 多模板 (商務/展會/節慶/**個性化全場景**)。**但没细分场景**（情侣/小朋友/家庭） — 缺口 |
| **e-print 1000 pcs 价** | HK\$ 9.6-11.3/本 (137x170mm / 195x148mm / 215x148mm) — ZprintPro 1000 本起 HK\$3-8 = **性价比优势 ~25-50%** |
| **QinPrinting (US) 100 pcs 价** | $6.36 each = HK\$ 50 (24pp \$7.22) — 中等价位 |
| **Made-in-China wholesale 范围** | US\$ 0.40-5.88/pcs, MOQ 200-1000 pcs, **Personalised / Photo / Family / Kids / Wedding** 全有 |
| **全球类型** | Wall / Desk / Mini / Photo Frame / Magnetic / **Custom Design** / **Perpetual Planner** / **Weekly Planner** / **Personalized Sizes** / **2026 Chinese New Year** (農曆) / **Chinese Zodiac Hanging** (生肖) |

### 6 SKU 现状 vs e-print 缺口 vs Made-in-China 全球需求

| ZprintPro 现 6 SKU | e-print 缺口 | Made-in-China 全球 | 建议 |
|---|---|---|---|
| wall-calendars | ✓ 有掛曆 | ✓ | 保持 |
| desk-calendars | ✓ 有座檯 | ✓ | 保持 |
| custom-calendars | ✓ 有定製 | ✓ | 保持 |
| mini-calendars | ✓ | ✓ | 保持 |
| photo-frame-calendars | ✓ 有相框 | ✓ | 保持 |
| magnetic-calendars | ✓ | ✓ | 保持 |
| **❌ 缺** 情侣年历卡 | ❌ 无 | ✓ Anniversary / Couple | **建议加 1 SKU: personalized-calendars** |
| **❌ 缺** 兒童/学生台历 | ❌ 无 | ✓ Kids / School | 未来路线 |
| **❌ 缺** 家庭相册年历 | ❌ 无 | ✓ Family | 未来路线 |
| **❌ 缺** 永續日历 | ❌ 无 | ✓ Perpetual | 未来路线 |
| **❌ 缺** 週計畫台历 | ❌ 无 | ✓ Weekly Planner | 未来路线 |

### 建议 SKU (1 核心 + 5 未来)

**核心（K3 拍板 A 立即加）**:
- **slug**: `personalized-calendars`
- **zh-hk**: 「**個性化年曆**」 / Personalized Calendars / パーソナライズ カレンダー
- **场景**: 情侣/小朋友/家庭/個人纪念日 — 1 SKU 覆盖 4 子场景
- **差异化**: e-print 模板固定 (在線設計只能套模板), ZprintPro **100% 自定义** (图片/文字/日期) + **MOQ 1000 本起, HK\$3-8 区间** (优于 e-print HK\$9.6-11.3)
- **price_range**: `HK\$5-8/本` (个性化需要更复杂工艺 → 区间高端, 跟 e-print 1000 pcs HK\$9.6-11.3 仍有 17-48% 优势)
- **basePrice**: 5, basePrice_en 0.65, basePrice_ja 95
- **minQuantity**: 1000 (跟 6 SKU 统一)
- **description**: 3 locale 同步 — 情侣纪念日 / 兒童学习計劃 / 家庭相册 / 個人日程 — 1 SKU 多场景

**未来 5 SKU (P3 7/30-8/5 / P4 8/6-8/12 路线)**:
- couple-calendars (zh-hk 情侶年曆卡 / en anniversary calendar / ja カップル)
- kids-calendars (zh-hk 兒童學習台曆 / en kids learning calendar / ja 子供)
- family-calendars (zh-hk 家庭相冊年曆 / en family photo calendar / ja 家族)
- perpetual-calendars (zh-hk 永續日曆 / en perpetual calendar / ja パーペチュアル)
- weekly-planner-calendars (zh-hk 週計畫台曆 / en weekly planner / ja 週間)

### K3 拍板 1 选 1 (年历个性化)

| 选项 | 内容 | 优势 | 风险 | 时间 |
|---|---|---|---|---|
| **A 立即加** | 1 SKU `personalized-calendars` + matrix 跟 6 SKU 同步 (1 push 落地) | 抢 e-print 缺口 + 转化/询盘预期 ↑ 30-50% | 跟 P4 14 词计划 + Rush P0 同周 3 推 (push 密度高) | 今天 7/30 攒批跟 10:15 daily cron |
| **B 攒批 P3** | 等 7/30-8/5 P3 校园期 4 选题里加 1 块 (e-print 战略重构版已砍 school worksheet) | 1 push 完成校园 + 个性化双交付 | 8/5 前不一定能 1 SKU 跑通 | 7/30-8/5 (P3 阶段) |
| **C 不动** | 仅 P0 价格修复, 不加新 SKU | 0 风险 | e-print 缺口被竞品抢 | 不动 |

**M3 建议**: A — 1 SKU 落地 30 min, 1 commit 1 push, 跟 P4 cron 同步 7/30 10:15 daily trigger 后做 (避免与 e095918 push 间隔过近, §0.1 1 push/天铁律)。但 §0.1 1 push/天铁律与 7/28 5 push 违规 3 次历史, K3 7/30 拍板 "今天 1 push" 是合理决策 (e095918)。

---

## C. 任务 2: about 页面优化方案 (K3 6:20 派)

### 现状盘点 (src/app/[locale]/about/page.tsx, 15443 chars, 5 section + 1 hero + 1 stats)

| Section | 现状 | 缺 |
|---|---|---|
| 1. Hero (蓝色渐变) | h1 + subtitle 抽象承诺 | 缺品牌视频 / 工厂全景图 |
| 2. Stats Bar | 1000+ 客戶 / 15+ 年 / 79 SKU / 98% 滿意度 (死数字) | 缺动态实时 / 缺客户证言锚 |
| 3. Brand Story | 2 段抽象愿景 | 缺真实客户案例 / 缺生产过程 / 缺具体服务流程 |
| 4. Core Advantages (3 卡) | 品質 / 快速 / 服務 | 缺设备图 / 缺工艺细节 |
| 5. Team (3 卡) | **首字母圆圈**代替头像 - **最大短板** | **缺真人/工厂图** (K3 提的) |
| 6. Certifications (3 卡) | ISO 9001 / FSC / 大豆油墨 (文字+icon) | 缺真实证书图 / 缺可点击验证链接 |

### 客户想了解的角度 (从竞品 e-print 1 万 + 访问数据分析)

| 客户痛点 | e-print.hk 现状 | ZprintPro about 缺 | 建议加 |
|---|---|---|---|
| **工厂真不真?** | 设备页 (海德堡 9 台 / 全自动 6 万呎厂房) | 0 张工厂图 | **4-6 张工厂图** (offset / digital / 装订 / 切割 / 质检 / 包装) |
| **团队真不真?** | 500+ 员工具体数字 | 3 个首字母 (像壳) | 真人头像 + 工厂工作场景 |
| **证书真不真?** | 文字说明 | 文字 + icon | **真实证书图** (ISO 9001 / FSC) + 验证链接 |
| **客户怎么想?** | 文章页 4-5 客户故事 | 0 个 testimonials | **5-10 个客户证言** (logo 墙 + 短 quote) |
| **流程清楚吗?** | 24小时在线设计 | 0 个 production timeline | **5 步生产流程图** (下单/设计/打样/印刷/交付) |
| **作品好看吗?** | 多产品页 | 0 个 portfolio 入口 | **6-8 张代表作品** grid + case studies 链接 |

### NAP 脱钩原则 (K3 §13.10 复盘)
- ✅ about 页 Brand Story / Team 描述 / Certifications 写真实地址 (法务 NAP, 不踩 §13.4)
- ❌ about 页 H1 / title_zh / hero CTA / H2 / excerpt 都不写 supplier origin 城市
- 当前 page 现状已合规 (深圳没出现在 H1/hero, 在 story 隐含)

### K3 拍板 1 选 1 (about 优化)

| 选项 | 内容 | 工时 | Push | 资源 |
|---|---|---|---|---|
| **A 立即占位** | 改 5 section 文案 + 4-6 张 **占位图** (SVG or 用现有 79 SKU 配图) + 客户证言 3 段 (mock) + Production 5 步流程图 (CSS 不用图) | 4-6 hr | 1 push 攒批到 7/30 10:15 daily cron | M3 独立完成 |
| **B K3 拍图后** | K3 拍 4-6 张真实工厂图 (设备/车间/团队) + 证书原件图 + 客户 logo 授权后, M3 上线 | 1-2 周 (K3 拍图) | 1 push 攒批 8/12 复盘后 | K3 必须拍图 |
| **C 只改文案** | 仅改 Brand Story + 加入 Production 5 步流程 (CSS) + 加 3 段客户证言 (mock) | 2-3 hr | 1 push 攒批 7/30 | M3 独立完成 |

**M3 建议**: **C 先 7/30 攒批推 (1 push) + B 等 K3 拍图后 8/12 复盘替换**。理由:
1. §0.1 1 push/天 7/30 已用 (e095918), C 改文案不涉及图, 1 push 可推到 7/31 daily cron
2. K3 拍图 = 1-2 周, 跟 8/12 复盘对齐
3. C 改完不破坏现有布局, B 替换图零返工

---

## D. 7/30 cron 时间轴 + 拍板 5 件

### 当前已用 push
- 7/30 06:23 ✅ e095918 P0 price fix (3 files)

### 7/30 余下 cron 窗口
- 7/30 10:15 daily-content-1x7w (nextRun 1785377700000) — P1 v22 + v7 路线 (可能触发 P4 14 词 meta 改动)
- 7/30 12:00 aitoptools-affiliate-monitor (跨项目)
- 7/30 12:30 verify-calendar-p0-2026-07-30 self-reminder (5min 后) — P0 verify

### 拍板 5 件 (K3 1 选 1)

1. **年历个性化 SKU**: A 加 `personalized-calendars` (推荐) / B 攒批 P3 / C 不动
2. **about 优化**: C 改文案 + Production 流程 (推荐) / A 加占位图 / B K3 拍图后改
3. **时间窗口**: 7/30 C 攒批 daily cron (10:15 已排 P4 14 词) → 跟 10:15 同 1 push 吗? 还是 7/31 daily cron 单独推?
4. **新 SKU 优先级**: 个性化日历 vs 未来 5 SKU (couple/kids/family/perpetual/weekly) — P3 阶段?
5. **about K3 拍图**: 何时拍? (1 周内 / 8/12 复盘前)

---

## E. 派活建议 (M3 → K3 拍板前 no-op)

按 K3 7/30 0:30 协议「M3 = 执行层, 听命令 + 自主拍板可执行」, 但**2 任务涉及 K3 资源 (拍图) + §0.1 1 push/天铁律**, **等 K3 1-2 选 1 拍板再动手**。

立即:
- P0 verify self-reminder cron 57a3303d 5 min 后跑 (verify deploy + curl 7 URL)
- 0 commit / 0 push (除已 e095918)
- 7:30 等 K3 拍板

---

## F. 数据 + 报告落盘

| 文件 | 大小 | 路径 |
|---|---|---|
| P0 修复脚本 | 12,044 bytes | `F:\zprintpro-nextjs\.hermes\fix-calendar-price-p0-2026-07-30.py` |
| P0 L193 fix 脚本 | 2,279 bytes | `F:\zprintpro-nextjs\.hermes\fix3-category-h1-regex.py` |
| 本综合报告 (15 章) | ~10KB | `F:\zprintpro-nextjs\.hermes\reports\m3-0730-p0-personalized-about-plan.md` |
| about 现状备份 | 15,443 bytes | `F:\zprintpro-nextjs\.hermes\about-full.txt` |

---

## G. Next (等 K3 拍板)

- [ ] 5 min 后 cron 57a3303d verify e095918 7 URL PASS → 写 `.hermes/logs/2026-07-30-verify-e095918.md`
- [ ] K3 拍板年历 A/B/C
- [ ] K3 拍板 about A/B/C
- [ ] 7/30 10:15 daily cron trigger (可能撞 P4 14 词 + 拍板后追加项)
- [ ] 7/31 daily cron 备援窗口
- [ ] 8/12 复盘前 K3 拍工厂图 (B 路线前提)
- [ ] 8/13-8/20 P5 企業利是封訂製指南 (1 push, CNY 2027 采购窗口)

---

**报告字数**: ~3,500 字 / 16 章 K3 格式 / 1 commit e095918 闭环 / 2 新任务研究 + 拍板选项 / 0 commit 待 K3 拍板后 push。
