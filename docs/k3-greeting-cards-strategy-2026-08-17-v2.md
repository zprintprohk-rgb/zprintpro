# K3 §11 业务子类目豁免 + 3 新类目方案 (v2, 2026-08-17, 联网核实数据)

> **核心**: 咭片/名片 → 归并到 greeting-cards + wedding-invitations + place-cards 业务子类目 (不是 §11 字面禁, 是 §11 战略豁免)
> **数据基线 (2025 末 / 2026 初)**: 全网跨境 + 国内外贸市场真实成交数据, 不是模型预测

---

## 0. 联网核实事实数据 (2026-08-17 联网, 17:30)

| 类目 | 市场规模 (2025) | CAGR | 搜索/需求证据 | 数据源 |
|------|---------------|------|--------------|--------|
| **Greeting Cards 全球** | $19.8-22.5B | 1.9-4.7% | 70B 张/年 (US), 90% 美国家庭年买 | Grand View / Ken Research / 360iResearch |
| **Wedding Invitation 全球** | $4.29B | 6.3% | $550/wedding 平均支出 (US) | TMI / Bonafide |
| **Printed Wedding 全品类** | $13.05B | 6.25-7.61% (APAC) | 亚太 41.97% 份额, 印度最快 | Bonafide / FBI |
| **Place Cards (Wedding 子)** | $123M (6.98% of $1.76B) | 4.5% | Wedding Stationery 6.98% 段 | PW Consulting |
| **Business Card 全球纸** | $1.16-1.85B | 7-9% | 10.2B 张/年 (全球) | VMR / MGR |
| **Business Card 在线** | $12.4B | 7% | (含智能卡/NFC, 范围大) | Data Insights |
| **Business Card 纸 (中国)** | 70.7 亿元 ($9.8B) | 7.84% | 企业 + 个人 70:30 | 贝哲斯咨询 |
| **国内立体贺卡 (跨境)** | ¥120亿 ($16.7B) | 18%+ | 跨境 +35% YoY, EU 27% YoY, supply-demand 1:8 | 八方资源网 2026-08 |
| **国内纸艺文创礼品** | ¥600亿 ($83B) | — | 立体贺卡是核心 | 东莞列举网 2026 |
| **Paper Love 3D 花束贺卡** | TikTok 7 天 GMV 78.94 万元 | — | 单卡 $14.99, 1688 批发 ¥7-12 (15x 毛利) | TT123 2026-01 |
| **LovePop 立体贺卡 (US)** | 2 人 / $40M 年营收 | — | US 头部 3D 弹出式贺卡 | 直击跨境 2025-07 |

**核心结论**:
- ✅ **贺卡 + 喜帖 + Place Cards 总和 >> 名片 17-18x 大** ($20B+$4.3B+$0.12B vs $1.2B)
- ✅ **立体贺卡跨境毛利 15x** (1688 ¥7-12 → US $14.99)
- ✅ **TikTok 7 天 GMV 78.94 万元** (3D 花束贺卡 1 个 SKU, 跨境爆品实证)
- ✅ **US 70B 张/年** (90% 家庭买, 抗经济衰退, $70-80B 年销售)
- ❌ **Business Card 全球纸仅 $1.2-1.85B** (7-9% CAGR 高, 但基础小)
- ❌ **§11 激进清 75 处 (咭片→纸卡/名片→贴纸) 是战略误判** — 应该建 3 个新类目, 不应该并到贴纸

---

## 1. 战略洞察 (K3 8/17 05:32 + 8/18 04:57 修正)

### 1.1 §11 字面禁 → 战略豁免 (§11 业务子类目豁免)
- 咭片/名片 **不是主营品类** (纸 120+ 亿 vs 咭片 8.3 亿美元)
- 咭片/名片是 **业务子类目** (greeting-cards / wedding-invitations / place-cards 的衍生场景)
- 业务子类目页面 (greeting-cards 等) 可以写"咭片/名片"业务子类目用法, 内部链接到对应类目
- 主页/产品页/其他类目页 仍禁咭片/名片 主营误用
- 纸卡 (FSC 物理材质) 保留 (行业术语)
- 名刺 (ja 99 hits) 保留 (ja 行业术语 + 客户案例)

### 1.2 3 新类目 (P0 跨境 + P1 主营补强)
| 类目 | slug | 业务子类目覆盖 | 主营场景 |
|------|------|---------------|---------|
| **贺卡** | `greeting-cards` | 节日贺卡 / 生日卡 / 感谢卡 / 邀请卡 / 商业贺卡 | 节日 + 情感 + 跨境电商 |
| **喜帖** | `wedding-invitations` | 喜帖 / Save the Date / 婚庆整套 / 答谢卡 | 婚庆全套 (Wedding) |
| **台卡/座位卡** | `place-cards` | 婚宴台卡 / 酒水牌 / 名牌卡 / 座位卡 | 婚庆 + 商务 + 餐饮 |

### 1.3 6 子类目 SKU (主类目下 6 子 SKU)
**greeting-cards**:
1. 节日贺卡 (Christmas, Valentine, Mother's Day, Father's Day)
2. 生日卡 (Birthday, 含成人/儿童)
3. 感谢卡 (Thank You)
4. 邀请卡 (Invitation 通版, 非婚庆)
5. 商业贺卡 (Corporate, 商务节日)
6. 立体贺卡 (3D Pop-up, 跨境爆品)

**wedding-invitations**:
1. 喜帖 (Invitation)
2. Save the Date
3. 答谢卡 (Thank You)
4. 婚庆节目单 (Program)
5. 婚庆菜单 (Menu)
6. 婚庆整套 (Full Suite 套装)

**place-cards**:
1. 婚宴台卡 (Table Card)
2. 酒水牌 (Drink Token)
3. 座位卡 (Escort Card)
4. 名牌卡 (Name Tag, 会议/展会)
5. 餐饮台卡 (Café Table, 餐厅/咖啡店)
6. 席位图 (Seating Chart, 婚宴用)

---

## 2. SEO 战略 (按 §13.10 NAP 脱钩)

### 2.1 zh-hk 标题/卖点 (3 locale, 100% 本地化)
- **greeting-cards/zh-hk**: "賀卡印刷 · 100 張起印 · 立體 3D 爆款 · 順豐本地 · 智印港"
- **wedding-invitations/zh-hk**: "喜帖印刷 · 整套婚慶配套 · 燙金/UV 工艺 · 100 套起印 · 智印港"
- **place-cards/zh-hk**: "台卡 / 酒水牌 / 座位卡印刷 · 50 張起印 · 燙金/壓紋 · 智印港"

### 2.2 en 标题/卖点 (3 locale, 全球通用)
- **greeting-cards/en**: "Greeting Card Printing from $0.50 / 100 sheets min · 3D Pop-up Available · DHL 2-4 days"
- **wedding-invitations/en**: "Wedding Invitation Printing from $1.20 / 50 sets min · Foil/UV Finish · ZprintPro"
- **place-cards/en**: "Place Card / Drink Token Printing from $0.30 / 50 sheets min · Foil/Embossing · ZprintPro"

### 2.3 ja 标题/卖点 (3 locale, 日本市場)
- **greeting-cards/ja**: "グリーティングカード印刷 · 100枚から · 立体 3D · ZprintPro"
- **wedding-invitations/ja**: "結婚式招待状印刷 · 50セットから · 箔押し/UV · ZprintPro"
- **place-cards/ja**: "席札 / ドリンクトークン印刷 · 50枚から · 箔押し · ZprintPro"

### 2.4 链接矩阵 (Step 2 上线后, 主页可写"咭片" 链接到 greeting-cards)
- 主页"我们的产品"区块: stickers / flyers / packaging / paper-bags / greeting-cards / wedding-invitations / place-cards (主营 5 + 业务子类目 2)
- greeting-cards 内部链接: → 喜帖 / 台卡 (业务子类目豁免)
- 老 business cards URL 301 → /greeting-cards/ (per middleware.ts 已改)

---

## 3. 实施路线 (Step 2 拍板立即干, 8/18)

### 3.1 改文件清单
1. **src/lib/seo.ts** (3 类目 categorySeoData entries)
2. **src/data/category-seo-content.ts** (3 类目 contentContent 完整 9 段结构 zh-hk/en/ja)
3. **src/data/products.ts** (18 SKU × 3 locale = 54 字段块)
4. **src/data/sku-seo-data.ts** (18 SKU 描述 SEO meta)
5. **src/data/price-tables/** (新增 3 目录 pricing-tables-greeting.json + wedding.json + place-cards.json)
6. **src/app/[locale]/category/[slug]/page.tsx** (3 类目 categoryBannerMap + categoryGuideMap)
7. **src/data/image-alt-map.ts** (3 类目 hero alt)
8. **.hermes/industry-keyword-matrix.json** (3 类目 keyword 跟踪)
9. **public/sitemap*.xml** (3 类目 × 3 locale = 9 new URL entries, 重新 generate)

### 3.2 5 步真 verify (Step 2 commit 前必跑)
1. encoding --fix (UTF-8 LF)
2. tsc --noEmit (0 新错)
3. npm run build (PASS, 14 → 17 categories)
4. curl 8 locale (3 类目各 locale 都 200, 不漏)
5. sitemap (9 new URL, IndexNow 触发)

### 3.3 1 push (攒批, 避免分散 push)
- commit + push 同 1 push
- 1 force-push 算 1 push (今日 4/5 = 留 1 buffer)
- 紧急修复豁免 不再 amend (amend 限额 2/2 已满 8/8+8/10)

### 3.4 拍板事项 (K3 必拍, 5 项决策卡)
- [ ] **A**: 3 类目主推顺序 = greeting-cards (P0 跨境爆品) > wedding-invitations (P0 婚庆) > place-cards (P1 配套) ?
- [ ] **B**: 18 SKU 上线节奏 = 一次性 18 vs 3 周 6/周 ?
- [ ] **C**: 价格锚点 = greeting-cards $0.50/张 起, wedding 整套 $25/套 起, place-cards $0.30/张 起 ?
- [ ] **D**: 主页"我们的产品" = 7 大块 (主营 5 + 业务子类目 2) vs 主营 5 + 1 区块"商务 / 婚庆" ?
- [ ] **E**: business cards 老 SKU 处理 = 保留 (slug 301 → greeting-cards) vs 隐藏 vs 删除 ?

---

## 4. KPI 校准 (8/21 双周复盘硬指标)

| 维度 | 基线 (8/17) | 8/21 目标 | 9/15 目标 |
|------|-------------|-----------|----------|
| GSC 7d 点击 (zh-hk) | 75/7d (v3.1 84 国) | ≥85/7d | ≥120/7d |
| GSC 7d 展示 | 3,922/7d | ≥4,500/7d | ≥6,000/7d |
| 类目数量 | 14 | 17 (Step 2 完) | 17 |
| 3 locale URL 总数 | 600 | 660 (+60 = 20 × 3) | 660 |
| 业务子类目豁免拍板 (咭片→贺卡) | §11 战略落 | ✅ 24h | ✅ |

---

## 5. 战略执行 (R0-R5 主战场, v3.2 拍板)

| R | 范围 | 拍板 | 状态 |
|---|------|------|------|
| **R0** | Supabase + Batch B + PayPal | K3 真人唯一真瓶颈 | 🔒 6 天+ 阻塞 |
| **R1** | 守 (现有流量不跌) | — | ✅ §0.16 智印雲 = 0 |
| **R2** | 摘 (striking-distance 4 词) | 8/19-8/22 两 push | 🟡 排程中 |
| **R3** | 攻 (2 周窗口, 8/20-9/3) | — | 🟢 8/20 三 Agent cron |
| **R4** | 铺 (D4 站外提及) | 8/23 前 10 条免费目录 | 🟢 8/18 14:00 D4 cron |
| **R5** | 季节 (9/15 硬截止) | F1 设计师 8/13-8/20 | 🔄 8/12 暂停, 9/10 改路径 |

---

## 6. 拍板时间表

| 时点 | 拍板事项 | 谁拍 |
|------|---------|------|
| **8/17 05:32** | §11 业务子类目豁免 + 3 新类目方向 | K3 (已拍) |
| **8/18 05:49** | Step 2 立即干 (3 类目 + 18 SKU + 1 push) | K3 (已拍) |
| **8/18 06:00** | 节奏 A 变体 cron (执行 22 词 + §11 修) | cron 自动 |
| **8/18 14:00** | D4 实体资产 10 条 cron | cron 自动 |
| **8/19** | 4 拍板点 (A-E 决策卡) | K3 |
| **8/20 09:00** | 3 Agent 试运行 cron (GSC_Data + Tech_Ops + Schema_Tech) | cron 自动 |
| **8/21** | 双周复盘 (K3 1h 拍板) | M3 主导 |
| **9/15** | 季节性 SKU 硬截止 | M3 |

---

## 7. 教训固化源头

- **8/16 23:11 K3 "A+B 一起修复" 拍板**: A+B 一起修节省迭代
- **8/17 05:32 K3 §11 战略修正**: 咭片/名片 = 业务子类目, 不是字面禁
- **8/18 04:57 K3 "执行 A" 拍板**: 不等 06:00 cron, 立即干 22 词 + §11 修
- **8/18 04:50 cron v8.9 + 04:51 配额 400 + 05:00 CF 账户级 500 + 1天≤5 push**: 攒批基线
- **8/17 22:00 v3.2 校准**: KPI 口径锁定 (GSC 7d · 84 国全量)

