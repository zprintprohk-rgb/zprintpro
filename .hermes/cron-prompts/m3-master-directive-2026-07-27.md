# M3 主控指令 v1 · 北极星 US$50,000/月 · 7/27-8/12 全周期作战 (2026-07-27 K3 拍板)

> **本文档是 M3 未来 17 天的唯一行动纲领。** 按 §1 决策权限表自走，遇 §7 升级条件才停下来报告。
> 已冻结 (1222af5 封版): page.tsx hero / *Card*.tsx / HotProducts / RelatedProducts / pricing.ts / products.ts price_range / price-data.generated.ts — 零改动。

---

## 1. 决策权限表 (不用问 vs 必须升级)

| M3 可直接执行 | 必须升级 K3/user |
|---|---|
| 本卡内所有内容写作/改写 (博客/SKU 文案/meta/title) | 任何封版清单文件改动 |
| 内链新增/调整 (先核 §13.6 有效路由, 写完 curl 200) | 价格/系数/price_range 改动 |
| 301 重定向 (next.config.js, 本卡指定清单内) | 新增 SKU / 删除 SKU (除 v22 指定) |
| sitemap 重生成 / GSC indexing request | GSC API 网络失败 (proxy 是 user 侧) |
| 每天 ≤1 push (攒批) | CF build 失败 / 任一 curl 5xx·404·301 |
| 报告/快照/matrix.json 更新 | §11/§13.10/§13.16.1 边界模糊时 |

**拿不准的内容问题 → 选保守方案 (不删、不改 slug、不加地区词), 在报告里标注, 继续下一任务, 不停机等回复。**

---

## 2. 总时间轴

| 阶段 | 日期 | 主线 |
|---|---|---|
| P1 | 7/27-7/28 | v22 名片→贺卡改造 (本卡 §3) |
| P2 | 7/29 | GSC 周检 + Q-GR 收录复检 (§4) |
| P3 | 7/30-8/5 | T3 校园着陆页 3 张 + T5 拼版互链 (§5) |
| P4 | 8/6-8/12 | T4 CTR 优化 + 开学季冲刺 + 8/12 复盘报告 (§6) |

---

## 3. P1: v22 名片→贺卡改造 (7/27-7/28, 2 commit 上限)

### 背景
user 7/27 拍板: 名片品类不删, 改造为贺卡 (美国贺卡 Q4 旺季 + 日本年賀状 10-12 月峰值)。工艺同源 (烫金/UV/哑胶/厚卡/圆角直接复用)。

### SKU 映射 (1:1)
| 旧 slug | 新 slug | zh-hk 名 | en 名 | ja 名 |
|---|---|---|---|---|
| premium-business-cards | premium-greeting-cards | 高級賀卡 | Premium Greeting Cards | プレミアムグリーティングカード |
| thick-business-cards-400g | thick-greeting-cards-400g | 厚身賀卡(400g) | Thick 400g Greeting Cards | 厚手400gカード |
| foil-business-cards | foil-greeting-cards | 燙金/燙銀賀卡 | Foil-Stamped Greeting Cards | 箔押しグリーティングカード |
| spot-uv-business-cards | spot-uv-greeting-cards | UV局部光油賀卡 | Spot UV Greeting Cards | スポットUVカード |
| matte-business-cards | matte-greeting-cards | 啞膠賀卡 | Matte Greeting Cards | マットカード |
| rounded-corner-cards | rounded-corner-greeting-cards | 圓角賀卡 | Rounded Corner Cards | 角丸カード |
| (类目) business-cards | greeting-cards | 賀卡印刷 | Greeting Cards | グリーティングカード・年賀状 |

### 执行步骤 (顺序不可乱)
1. **products.ts**: 6 SKU slug 改新名 + category/category_slug 改 'greeting-cards' + title_zh/en/ja + description/descriptionEn/descriptionJa + longDescription 全文重写为贺卡场景:
   - zh-hk: 聖誕/新年/婚禮/百日宴/生日场景, 100% 繁体
   - en: holiday season / wedding / thank-you / Christmas cards, §13.15 hooks (Free Shipping $99+ / No minimum / Free Design)
   - ja: 年賀状/挨拶状/クリスマスカード, **ja title 直接带「年賀状」** 抢 10 月峰值
   - specs 加對折/平卡选项描述 (longDescription 内, 不动结构化字段)
   - **图片路径不动** (文件名保留 business-cards 字样, 避免断链), alt 全部重写贺卡语义
   - price_range 不动 (走封版前区间锚逻辑)
2. **类目注册**: products.ts line ~87 类目对象 slug/name 全 locale 改 greeting-cards; Header/nav/footer 引用 grep 'business-cards' 清零 (组件内文案同步改)
3. **301**: next.config.js redirects() 加 21 条: 6 旧 SKU slug → 新 slug × 3 locale + 类目旧路径 ×3 (模式: /:locale/product/:old/ → /:locale/product/:new/ 逐条写死, 不用通配); buying guide 旧 slug (bgBusinessCard 对应 slug) → 301 到最近似贴纸/贺卡指南, 若无可投 → 301 到 /:locale/blog/
4. **buying guide**: bgBusinessCard 内容重写为贺卡选购指南 (同 9 段+4FAQ 规范) 或按上条 301
5. **blog-posts.ts / page.tsx posts 对象 / blog-data JSON**: grep 'business-card' 残留内链改新 slug; §11 检查全仓不得新增名片内容 (历史 alt/文件名除外)
6. **验证 6 步**: check-encoding --fix → npm run build → push origin_ssh main → verify-deploy PASS → curl 3 新 slug 200 + 3 旧 slug 301 一跳 → grep live 页 'business card|咭片|名刺' = 0 (图片文件名除外)
7. **commit 策略**: 步骤 1-4 一 commit; 验证发现问题 fix 第二 commit。每天 ≤1 push。

### v22 禁区
- ❌ 不动 price_range / 价格表 / 系数
- ❌ 不删图片文件 / 不改图片路径
- ❌ 不动 PDP 组件结构

---

## 4. P2: GSC 周检 (7/29, 对齐周三 cron)

1. 跑 scripts/fetch_gsc_data.py 拉 7/22-7/28 7 天数据。**oauth2 网络失败 → 立即升级, 不绕不装。**
2. 对比 gsc-141-baseline-2026-07-22.json, 输出:
   - Q-GR 3 词 (拼版彩盒 / gang run card boxes / 合版 カードボックス) 展示·点击·排名变化
   - Q-GR 3 篇收录状态复检 (URL Inspection 或 site:)
   - 校园词 (練習冊/教科書印刷/畢業紀念冊/exercise books/textbook printing) 展示量 → 直接决定 P3 着陆页选题权重
   - 151 条 301 旧 URL 展示衰减曲线
   - 「展示 ≥50 且 CTR <1%」URL Top 10 → 存给 P4 T4 用
3. 写 .hermes/gsc-snapshot-2026-07-29.json + 报告 (K3 格式: 结论 30 字 + 3 行数据 + ≤1 风险)

---

## 5. P3: 校园着陆页 + 拼版互链 (7/30-8/5)

### T3 三张着陆页 (按 P2 数据微调选题, 无数据用默认)
1. **zh-hk 类目强化** (改 src/app/[locale]/category/[slug]/page.tsx educational 分支 hero 文案, 不动结构):
   - hero 加「開學季教材印刷 · 練習冊 HK$0.90/本起 · 滿$500包郵」+ exercise-books/textbooks/graduation-yearbook 3 卡置顶逻辑 (如排序由 weight_score 控制, 只调 weight_score, 不动组件)
2. **en 博客 1 篇** slug `back-to-school-printing-usa`:
   - "Back to School Printing: Workbooks, Textbooks & Yearbooks — Free Shipping $99+, No Minimum 50"
   - 9 段 + 4 FAQ + Article/FAQPage/BreadcrumbList JSON-LD + 内链 3 校园 PDP
   - §13.15 en hooks ≥4 个; §13.10 零地区词
3. **ja 博客 1 篇** slug `new-semester-printing-japan` (日本新学期 4 月, 8 月主打夏休み明け教材・自由研究印刷):
   - 量级对齐现有 ja 条目; 内链 textbooks/exercise-books PDP
- 每篇登记 matrix.json covered[], 先查 covered[] 防内卷 (§6), 写完 curl 200 + FAQ JSON-LD 抽查

### T5 拼版互链 (与 T3 并行, 同一 push 攒批)
- gang-run-card-boxes PDP ↔ 3 Q-GR 博客双向正文内链 (如 PDP longDescription 加「延伸閱讀」段, 走 products.ts longDescription 字段, 不动组件)
- white-card-boxes / tuck-end-boxes / corrugated-boxes longDescription 各加 1 条 → gang-run PDP 内链
- 内链前先核 §13.6 有效路由模式, 写完 curl 全部 200

---

## 6. P4: CTR 优化 + 冲刺复盘 (8/6-8/12)

1. **T4**: 取 P2 存的「展示 ≥50 CTR <1%」Top 10 URL → 只改 title/meta description (products.ts title_* 或 blog title), 公式 = query 实拍词 + 数字 + 单价锚 (HK$0.22/個 级)。攒 1 commit 1 push。
2. **8/12 复盘报告** (K3 格式), 对照北极星验收表:
   | 指标 | baseline | 8/12 目标 |
   |---|---|---|
   | Q-GR 三词收录 | 7/27 已 3/3 有正文 | 任一词 Top 20 |
   | 校园词展示 (7天) | P2 摸底值 | ×3 |
   | 全站 CTR (28天) | ~1% | ≥2% |
   | 开学季询盘 | — | WhatsApp 提及「練習冊/教科書/開學」≥10 条 (user 人工提供) |
   | 151 条 301 转移 | 3/20 天 | 核心路径 100% |

---

## 7. 升级条件 (立即停手报告, 不自行决策)

1. GSC API oauth2 网络失败 (proxy/VPN = user 动作)
2. CF Pages build failure / push 拒绝
3. 任一新/改 URL curl 返回 5xx/404/非预期 301
4. 发现需要动封版清单文件才能完成的子任务
5. 宪法边界模糊 (§11 名片残留处理分歧 / §13.10 地区词判断 / §13.16.1 简繁)

## 8. 报告纪律 (每次完成一个 P 阶段)

- 写 .hermes/reports/m3-<阶段>-<日期>.md (K3 格式: 结论前置 ≤30 字 + 3 行数据 + ≤1 风险)
- ack 一行路径, 不贴全文
- push 永远 origin_ssh main, 每天 ≤1 次, push 后 verify-deploy.mjs PASS 才算完

## 9. 长期挂起 (不阻塞, 有数据再说)

- payment 威胁模型文档 (autoclaw 任务 B) 到齐后 K3 review
- 报价台 6 项 curl 验收 (7/29 cron 后)
- 贺卡图片重命名 (低优先, alt 已承担 SEO)
