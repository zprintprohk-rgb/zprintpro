# W7 战略 Addendum — 180 天路线图首段 (M1 堵漏 + 埋点 + CTR 攻坚)

> **拍板来源**: K3 (唐总) 2026-09-06 战略任务交付《W7 战略方案 · SEO+AEO+GEO 180 天作战路线图》
> **交付物**: `DELIVERY/w7-strategy-180day-20260906.html` (zprintpro agent workspace)
> **生效**: 2026-09-06 CST
> **挂载范围**: 全部 5 cron SSoT (daily-content-1x7w / weekly-meta-refresh / gsc-feedback-loop / monthly-matrix-audit / monthly-content-authority-audit)
> **维护**: M3 (Mavis) 跨 session 永久
> **优先级**: 与既有段落冲突时, 本 addendum 的 §A (others 404 堵漏) / §B (区块 23 键口径) / §D (埋点停手) 为准; 其余为增量衔接

---

## §A P0 硬伤: others 三语 404, 43 词 / 519 展示 / 5 点击泄漏 (M1 第一优先)

### §A.1 事实 (9/6 主线终态探针实测, NoRedirect + 跟随, 2.5s 慢速)

- `/zh-hk/category/others/`、`/en/category/others/`、`/ja/category/others/` 三路全部 **404 直连, 无任何 301/308**
- 266 词审计 (gsc-fresh-2026-09-03, 28 天) 中 **43 词 / 519 展示 / 5 个真实点击** 的建议承接页是 others: zh-hk 13 词/267 展示/5 点击, ja 25 词/230 展示, en 5 词/22 展示
- 带点击的 5 词 (全 zh-hk): 車身廣告 (60 展示/1 点击)、賀卡印刷 (4/1)、精裝盒 (2/1)、a4 印刷 (2/1)、彩色印刷 (1/1) — 用户点进来直接撞 404

### §A.2 处置分两层 (禁止混淆 URL 层与词层)

**第一层 · URL 层 (M3 可自走, 属 §1 slug 改造 + 301 授权)**:
1. 先 grep 站内 (src/、sitemap、blog-data、*.tsx) 所有指向 `/category/others` 的链接与路由引用
2. next.config.js redirects 增加 308: `/{loc}/category/others/` → 按 locale 落地最大相关页: zh-hk/en → `/{loc}/category/flyers/`, ja → `/ja/category/flyers/` (flyers 是 43 词最大去向, 7 词/130 展示; 先 curl 验证目标 200, per §0.4)
3. 若 sitemap 生成器含 others 条目, 移除 (不删文件, 只从生成源摘掉)
4. 验收: curl -I 三语 others URL 返回 308 + Location 200; 站内 grep 无 others 残留内链

**第二层 · 词层 (内容/选题/内链指令, 不做 URL 301 — 搜索词没有 URL)**:
43 词逐词分流裁决 (9/6 主线脚本 others_final.py 产出, 零遗漏), 按下表进入对应 cron 队列:

| 去向 | 词数 | 28d 展示 | 代表词 | 执行车道 |
|------|------|---------|--------|---------|
| FAQ/博客 (AEO 知识词) | 15 | 167 | a6 尺寸、a5/a6 比較、cmyk/rgb 色彩模式、環保印刷、印刷カラーモード | daily-content: 并入《印刷文件准备/尺寸/色彩》FAQ 资产 (见 §E) |
| flyers (308 后正文覆盖) | 7 | 130 | 両面カラー印刷 (65)、摺頁印刷、彩色印刷、チラシ印刷早い、特急印刷激安、印刷急ぎ、当日印刷 | weekly-meta: flyers 页 FAQ/正文扩长尾 |
| banners | 2 | 90 | 車身廣告 (60, 有点击)、易拉架印刷 | daily-content: banners 页正文/FAQ 覆盖 (banners 三语 200) |
| packaging | 2 | 34 | 食品印刷、精裝盒 (有点击) | weekly-meta: packaging 页覆盖 |
| stickers | 3 | 21 | 缶バッジ印刷、缶バッチ印刷、custom foil decals | weekly-meta: stickers 页覆盖 |
| books | 3 | 18 | 學校印刷、上製本印刷安い、無線綴じ小ロット | daily-content: books 页覆盖 |
| posters | 3 | 13 | a2 print、a2 printing、a2 透明海报 | weekly-meta: posters 页覆盖 |
| envelopes | 3 | 10 | 大判封筒、封筒印刷法人、法人封筒 | weekly-meta: envelopes 页覆盖 |
| japan-doujin | 2 | 10 | コミケ印刷、卒業アルバム印刷 | daily-content: japan-doujin 页覆盖 |
| greeting-cards | 1 | 4 | 賀卡印刷 (有点击) | weekly-meta: greeting-cards 页覆盖 |
| paper-bags | 1 | 3 | factory price eco friendly printed bags | weekly-meta: paper-bags 页覆盖 |
| 新品类机会 (先兜底) | 1 | 19 | 亞加力匙扣訂製 | 先 308→stickers 兜底; **M6 (约 2027-02) 用累积数据裁决是否开亚克力定制品类**, 本期不建页 |

---

## §B 数据口径修正: 转化区块以注册表实测 23 键为准 (旧 7 格账作废)

### §B.1 修正 (数据诚信, per §0.22/§0.23)

- `money-keyword-map-20260905.md` §三「缺口 TOP10」基于 W4 前 **7 格** 旧账, W5 后多车道已补齐, **该 TOP10 大面积过时, 停用**
- 9/6 主线实测 `src/data/category-conversion-blocks.ts` 注册表 = **23 键** (stickers/packaging/flyers/paper-bags 三语 + calendars zh-hk/en + posters zh-hk + menus zh-hk + books 三语 + japan-doujin zh-hk/ja + envelopes zh-hk + red-packets zh-hk)

### §B.2 真实缺口 (按 28d 展示排序, 原始 JSON 重算)

| 优先级 | 语言×品类 | 词数 | 28d 展示 | 页面状态 | 排期 |
|--------|----------|------|---------|---------|------|
| 1 | posters · en | 9 | 103 | 200 无区块 | M1 |
| 2 | posters · ja | 12 | 60 | 200 无区块 | M1 |
| 3 | menus · en | 4 | 20 | 200 无区块 | M2 |
| 4 | greeting-cards · en | 2 | 15 | 200 无区块 | M2 |
| 5 | greeting-cards · ja | 2 | 7 | 200 无区块 | M3 |

- **不补**: banners 三语、red-packets en/ja — 页面 200 但 266 钱词中对应搜索词为 0, 等词图出现信号再做 (避免无效投入)
- monthly-content-authority 区块排期、daily-content 选题一律用 23 键口径; 引用区块数必标数据来源

---

## §C CTR 基线与攻坚队列 (衔接 v8-weekly-addendum §B T1 排名轨迹)

### §C.1 基线 (28d, gsc-fresh-2026-09-03)

- 三语合计 6,617 展示 / 39 点击, **加权 CTR 0.59%** (zh-hk 0.73% / en 0.40% / ja 0.14%)
- 头部 7 个高展示词合计 800+ 展示仅 1 点击, 全部卡在 G3-G4 (第 2-4 页):

| 词 | 市场 | 当前位 | 28d 展示 | 趋势 |
|----|------|-------|---------|------|
| 月曆印刷 | zh-hk | 19.8 | 138 | +13.2 位 |
| 宣傳單張印刷 | zh-hk | 29.3 | 137 | +6.2 位 |
| 海報印刷 | zh-hk | 25.6 | 133 | 上移 |
| 貼紙印刷 | zh-hk | 35.1 | 133 | +6.4 位 |
| 食品包裝印刷 | zh-hk | 16.6 | 109 | +22.9 位 |
| 紙袋印刷 | zh-hk | 14.5 | 67 | 上移 |
| 餐牌印刷 | zh-hk | 15.3 | 66 | G3 上段 |

### §C.2 指令

- weekly-meta-refresh 标题优化队列: 以上 7 词 + 紙袋訂製 (25.1, +20.6 位黑马) 承接页 title/meta 优先改写; 只改 `<title>` + meta description, 不改 H1 (per §1 CTR 授权)
- 标题钩子: zh-hk「香港｜工廠直印｜小批量｜即日｜實價」; en「Small Batch｜Factory-direct｜Transparent Price」; ja「小ロット｜短納期｜実質価格」
- **合规红线 (per §I.5.2)**: en 禁 Made in USA / US-based / Free Shipping 等 8 类 (FTC), 用 Factory-direct from Shenzhen / DHL 2-4 day; ja 禁 激安/業界最安/No.1, 用 格安/コスパ
- 目标: 加权 CTR 0.59% → 1.5% (180 天, 经验估计, 以 GSC 周报复测为准, 不写死承诺)

---

## §D 询盘埋点 = K3 人工节点 (M3 停手, 不擅自改组件)

- 现状: 全站无 GA4 打通、无 WhatsApp 点击追踪, 漏斗末段 (询盘) 是黑盒, ROI 无法度量
- 需要: ① wa.me 链接加 onclick 事件 `whatsapp_click` (带品类/locale/页面参数) ② /quote/ 表单提交事件 ③ CTA 曝光事件
- **红线**: 此动作触及组件层 (封版清单 page.tsx/Card 类/HotProducts 风险), **M3 不擅自改码**; M3 可产出实施方案 (事件命名/触发点/数据层 spec) 写入 reports/, 等 K3 拍板后执行
- 北极星指标 (埋点后生效): **月度 WhatsApp 有效询盘数**; 180 天目标非品牌自然点击 39 → 120 (约 3×)

---

## §E AEO/GEO 资产排期 (衔接 v8-monthly §5 AEO 引用资格 + §C 品类记分卡)

- **M1 资产 (9 月, daily-content)**: 三语《印刷尺寸对照表》— A1-A6/月曆/海報常见尺寸一表覆盖, 目标词含 a6 尺寸 (7.7 位)、a5/a6 比較、calendar sizes、a1/a2/a3 poster size、海報size、a5とa6どっちが大きい 等 15+; 表格型答案 + FAQPage JSON-LD, 答案句前置首屏。与 §A 词层 FAQ 15 词合并为同一资产, 不重复立项
- **M3 (约 11 月)**: TOP10 答案块词 (pvc貼紙 6.1 位、證書紙材質 7.8 位、印海報價錢、月曆價錢 等) 逐页 FAQPage/HowTo schema; 价格 FAQ 引用成本基准报告实价 (99 SKU × 16 品类)
- **M4 (约 12 月, GEO 护城河)**: 三份三语数据资产 — ①小批量 MOQ 指南 (打 small batch 全词群) ②香港/深圳交货周期与即日印刷实测 ③印刷文件准备规范 (CMYK/出血/分辨率, 与 §E 尺寸资产互链)
- **AI 引用月测 (monthly-matrix 新增项)**: 每月 10 条固定 prompt (中/英/日混合, 如「香港邊間印刷廠可以小批量訂製貼紙?」「recommend a small-batch sticker printer in China/HK」「小ロット パッケージ印刷 おすすめ」) 在 ChatGPT/Perplexity/Gemini 跑一轮, 记录是否提及 zprintpro + 引用 URL, 作为 GEO 月度 KPI 基线
- 实体一致性核查 (M4): 品牌名 (ZprintPro/智印港/彩龍印刷)、WhatsApp、深圳厂房、DHL 配送、价格口径在 OrganizationSchema/页脚/About/博客署名/merchant-feed 统一

---

## §F 180 天六冲刺排期 (与既有 9 月排期融合, 不另起炉灶)

| 冲刺 | 时间窗 | 核心产出 | 与既有排期衔接 |
|-------|-------|---------|--------------|
| M1 堵漏+埋点 | 9/6-10/6 | others 404 分流 (§A) + posters en/ja 区块 (§B) + 头部 CTR (§C) + 尺寸对照表 FAQ 资产 (§E) + 埋点方案待 K3 拍板 (§D) | 对齐 9/15 季节硬截止 (月曆/利是封) + 9/16 M1 中间闸门; others 堵漏为新增 P0, 排在内容生产前 |
| M2 冲榜 | 10/7-11/6 | 紙袋/食品包裝/月曆/餐牌内链锚文本强化 + menus en/greeting-cards en 区块 + NO-TARGET 知识词 8 篇博客 | 对齐周 4-6 C1 高展示攻坚 |
| M3 AEO 抢位 | 11/7-12/6 | 答案块 schema 注入 + greeting-cards ja 区块 | 对齐 v8 monthly AEO 引用资格 |
| M4 GEO 资产 | 12/7-1/6 | 三份数据资产三语 + 实体一致性核查 + AI 引用首轮 | Q4 旺季结构升级 |
| M5 转化深化 | 1/7-2/6 | 3 个 A/B 测试 (CTA 文案/价格锚点/区块位置, 复用 zp_ab_bucket) + WA 预填文案按品类自动化 + 报价模板 | 春节/利是封旺季 |
| M6 壁垒+扩张 | 2/7-3/6 | 180 天复盘 + 亚克力新品类裁决 (§A 亞加力匙扣) + ja 市场加码 + 外链建设 | 下一个 180 天规划 |

---

## §G 待补缺口 (诚实声明, per §0.23 不编造)

- **竞品 SERP 对标未完成**: 9/6 W7 执行时 4 路分析 Agent 供应商即时故障 + 联网搜索额度耗尽 (insufficient_credits), 竞品首页实测/价格锚点对比无数据。待额度恢复后补测 6 query: 「月曆印刷」「海報印刷 香港」「sticker printing hong kong」「catalog printing china」「small batch sticker printing」「パッケージ印刷 小ロット」。补测结果写入 monthly-matrix 报告, **不得用记忆/估算填补竞品数字**
- **询盘基线缺失**: 埋点 (§D) 上线前, 「39→120 点击」可测, 询盘数无历史基线; CTR/CVR 提升幅度为行业经验估计, 上线后以 A/B 与 GSC 实测为准

---

## §H 数据来源 (SOP-10 §0.23 强制)

- W7 战略报告: `DELIVERY/w7-strategy-180day-20260906.html` (2026-09-06, zprintpro agent workspace)
- GSC 数据: `F:\zprintpro-nextjs\GSC数据\gsc-fresh-2026-09-03.json` (28 天窗口, 三语 6,617 展示/39 点击)
- 词图审计: `.cluster/v34-bigword-w5/wordmap-v2-summary.md` (266 词) + `.cluster/v34-bigword/money-keyword-map-20260905.md` (107 钱词)
- 区块注册表实测: `F:\zprintpro-nextjs\src\data\category-conversion-blocks.ts` (23 键, 2026-09-06)
- 线上探针: 2026-09-06 终态探针 (others 三语 404; catalogs/booklets→books、rush-printing→flyers、business-cards→greeting-cards 308; banners/red-packets/greeting-cards/japan-doujin 三语 200)
- 线上 HEAD: dfc7fa22 (W6 死链清零后)
- 复算脚本: `.openclaw/tmp/recompute_gaps2.py` (缺口重算) + `.openclaw/tmp/others_final.py` (43 词分流, 零遗漏)

EOF · w7-strategy-addendum-2026-09-06.md
