# 全站标题 v4 写满原则 · 执行台账与预览（2026-09-09 执行层）

> **任务来源**: 唐总 9/9 19:38 令「按 2026-09-08-v4-full-alignment-master-report.md 的指令执行」+「对全网站的所有标题更新，写进自进化技能里」
> **标准 SSoT**: `docs/2026-09-08-title-rules-and-deep-blog-standard.md`（v1.0，含 K3 9/9 06:18 v4 写满原则 §1.5 终裁）+ `docs/2026-09-09-k3-title-rule-v4-write-full.md`
> **本文件性质**: ① 今日立即执行集 before/after ② 全站 title 分级台账与 9/13 合批计划 ③ master-report 指令对账表 ④ 数据来源
> **生效范围裁决**: v4 文档 §一「9/13 验证窗判定后的全部 title 改动 + 一切新建页面；8/30 批次与 9/4 摘果批在窗内 title 只读纪律不变」。故今日 title 动作仅限 **窗外白名单词（master-report §5.2 摘果第二波）**，其余 fill 区条目全部挂 9/13 合批。

---

## 一、今日立即执行集（窗外白名单，已落盘）

| # | 页面 | 层 | 改前（半角当量） | 改后（半角当量） | 依据 |
|---|------|----|-----------------|-----------------|------|
| 1 | /product/large-envelopes/ zh-hk `<title>` | SKU SEO title | 大號信封 \| 雙面印刷 多規格 \| 智印港（35） | 大號信封印刷 C4/DL 尺寸 100 個起 HK$0.60 起 \| 智印港（52） | master-report §5.2 摘果第二波头号词（大信封 28d pos 3.1/48 imp/0 click）；价格锚实取 products.ts EV-003 basePrice 0.60 + minQuantity 100；§1.3 长尾=大信封（GSC 实证同页词） |
| 2 | /product/fluorescent-stickers/ en 正文 | SkuSeoBody | ISO 9001 认证句后无荧光材质钩 | 追加 Fluorescent/neon stock（day-glow paper + waterproof PVC）+ die-cut 场景钩 | master-report §5.2 fluorescent stickers 新摘果词（7d pos 6.9+6.0）；title 不动（stickers 类目 8/29 批窗内） |
| 3 | a2 海報 title | — | — | **不动（纪律裁决）** | §5.2 原列白名单，但 git 实证 a2 海報 title 已于 8/29 e14ce6dc 改价锚（8/30 批窗内）→ 按 §5.1「已改词一律只读」，挂 9/12-13 判定后进 title v2 |

公司信封（同页正文锚覆盖即可，§5.2 原文）不动 title；已由 large-envelopes 页 keywords/body 覆盖（现状核验：keywords 已含「公司信封印刷」）。

---

## 二、全站 title 分级台账（v4 写满原则体检，半角当量口径）

### 2.1 SKU PDP 层（src/data/sku-seo-data.ts，255 条 title）

| 分级 | 条数 | 处置 |
|------|------|------|
| fill <50（按序补） | 133 | 9/13 判定后合批写满（§1.2 补词顺序） |
| ok 50-54 写满目标区 | 44 | 保持 |
| legacy 55-60 遗留容忍 | 51 | 9/13 后新改一律收 ≤54；窗内只读 |
| over >60 满格禁加 | 27 | 9/13 合批修剪 |

> **CSV 生成链脱钩警示**: zprintpro-sku-seo-data.csv 仅 47 slug 且不含 8/29 后任何 title 改动（实测探针双 False），而 ts 实有 84 slug——**直接改 ts 为唯一安全通道，禁跑 csv-to-sku-seo.mjs**（会回滚 9/4 R2 批成果）。已在台账固化，防后续执行层踩坑。

### 2.2 博客层（src/data/blog-posts.ts，260 条 title）

| 分级 | 条数 | 处置 |
|------|------|------|
| fill <50 | 28 | 博客规则 = 50-60 字符（第二部分），<50 为「不足线」，9/13 后随重写批次补 |
| ok 50-60 | 32 | 达标保持 |
| legacy 61-68 | 42 | 观察（Google 重写风险区间 76% 上沿） |
| over >68 | 158 | 重写批次顺带修剪 |

> 博客 title fill 区样例（全部挂 9/13 合批，此处列前 12）：
> - `sticker-buying-guide` zh-hk [46] 貼紙印刷選購完全指南：材質、工藝、價格一次搞懂
> - `sticker-buying-guide` ja [48] ステッカー印刷ガイド：材質、加工、価格を徹底解説
> - `sticker-buying-guide` zh-hk [44] 貼紙印刷選購完全指南：材質、形狀、用途全解析
> - `flyer-buying-guide` zh-hk [44] 傳單印刷選購完全指南：尺寸、紙質、摺法全攻略
> - `packaging-buying-guide` zh-hk [48] 包裝盒印刷選購完全指南：盒型、材質、工藝一次搞懂
> - `poster-buying-guide` zh-hk [44] 海報印刷選購完全指南：尺寸、紙質、用途全解析
> - `paper-bag-buying-guide` zh-hk [44] 紙袋印刷選購完全指南：紙質、尺寸、手挽全攻略
> - `banner-buying-guide` zh-hk [49] 噴繪廣告選購完全指南：X展架、易拉寶、背景板全攻略
> - `menu-buying-guide` zh-hk [46] 餐牌印刷選購完全指南：材質、工藝、耐用度全攻略
> - `company-intro` zh-hk [44] 智印港印刷公司簡介：專業設備與一站式印刷服務
> - `sticker-guide` zh-hk [46] 香港貼紙印刷完全指南：材質、工藝與應用場景詳解
> - `sticker-design` zh-hk [46] 貼紙設計的10個黃金法則：打造令人難忘的品牌形象

### 2.3 类目层（口径澄清）

category-seo-content.ts 扫出 288 条「title」字段经结构核验**绝大多数为页内内容块标题**（核心競爭優勢/材質工藝詳解 等，12-35 全角），**非 `<title>` SEO 标题**；类目页 `<title>` 实际由 `generateCategoryMetadata()`（lib/seo 工具函数）按类目名动态生成。故类目层不在本轮 fill 统计内；9/13 合批时从 lib/seo 侧按 v4 口径处理，并与 K3 确认类目 title 模板（涉及全类目批量形态）。

---

## 三、master-report 指令对账表（A1-A12 + 三份文件）

| 指令 | 现状 | 本轮动作/产出位置 |
|------|------|------------------|
| A1 K3 拍板包 4 项 | K3 已 9/8-9/9 多轮拍板（02745e2c/6e2f4564 等） | 无需重复 |
| A2 摘果第二波成品稿 | master-report §5.2 即成品方向 | 本文件 §一（含纪律裁决修正：a2 海報窗内只读） |
| A3 上线摘果第二波 | — | ✅ sku-seo-data.ts 2 处已落盘（§一），随本次 push 上线 |
| A4 SKU FAQ 空数组普查 | 9/8 执行层已建普查脚本位 | 挂 9/11（A6 同批），非本轮 |
| A5 9/10 GSC 校准 + 抓取状态表 | 9 篇 URL 清单已就绪（decision-pack-v2 §0） | 明日 cron 执行；今日已预检 9 篇全 200 |
| A6 top 10 SKU FAQ 填充 | — | 挂 9/11 |
| A7 月曆旺季补强收尾 | 6dcfbb67 H1 强化已做 | 挂 9/11-9/15 死线窗口 |
| A8 8/30 批 CTR 判定 | — | 挂 9/12-13（cron 已排） |
| A9 门童 147 cases 回归 | 147 集已建（b8752dad） | 挂 9/14 |
| A10 AI 探针首轮 | — | 挂 9/15（战略层） |
| A11 M1 联合验收 | — | 挂 9/16 |
| A12 Track B B1 貼紙支撑内容 | — | 挂 9/12 周五槽位 |
| 交付物①关键词矩阵 | ✅ .hermes/industry-keyword-matrix.json 已含 `gsc_feedback_2026_09_08` 段（16 键）+ `priority_boost_history` 第 9 条（4 变更/数据源/禁词口径完整，格式与前 8 条一致） | 核验通过（9/8 22:58 v7 反馈环产出） |
| 交付物②GSC 反馈日志 | ✅ .hermes/logs/2026-09-08-gsc-feedback.md：§数据来源行（canonical 9/3 + STALE 5d 标注）/§6 词-选题对账（B7 覆盖检查）/§7 下游 cron 建议 三要素齐全 | 核验通过 |
| 交付物③标题标准文件 | ✅ docs/2026-09-08-title-rules-and-deep-blog-standard.md v1.0（今日 17:45 更新版含 v4 写满原则 + §1.5 终裁 + 12 铁律 + 六部分全） | 核验通过，按幂等铁律不重写 |

---

## 四、数据来源（SOP-10 §0.23）

```
- GSC: GSC数据/gsc-fresh-2026-09-03.json（canonical，9/3 15:25 校准；现 STALE 5d，9/10 校准窗刷新）
- 价格锚: src/data/products.ts EV-003 large-envelopes basePrice 0.60 / minQuantity 100 / price_range HK$0.60-3.40/個
- git: 窗内冻结集实证 10 commit（01ae4db9..4bf2c124，8/29-9/6）；a2 海報=e14ce6dc 8/29；R2 实改范围=f5d50092 仅 small-batch-stickers
- 标题台账扫描: 本轮 audit_titles2/3.py 全文件实测（SKU 255/博客 260/类目 288），JSON 存档 .openclaw/tmp/v4mirror/
- 标准文件: docs/2026-09-08-title-rules-and-deep-blog-standard.md（17:45 版）+ docs/2026-09-09-k3-title-rule-v4-write-full.md
```

## 五、诚实缺口

- GSC 数据 STALE（136h+）：9/13 合批前必须在 9/10 校准窗刷新，fill 区补词选词以新数据为准；
- 类目层 title 模板改动涉全类目形态，挂 K3 确认后再动（本台账仅澄清源头）；
- CSV 与 ts 脱钩为存量技术债：9/13 合批后建议一次性重建 CSV 源（K3 拍板后执行）。

