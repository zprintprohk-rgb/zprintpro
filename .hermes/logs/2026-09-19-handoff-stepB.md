# 派活书（交接包）— 新对话从 Step B 开始 · 2026-09-19

> **用法**：新对话直接贴本文件全文 + K3 最新裁决。**不要再问「上次做到哪」** —— 本文件即交接。
> **工作目录**：`F:\zprintpro-nextjs`（唯一生产目录，main 分支）

---

## 0. 接手前必读（3 分钟）

1. **`AGENTS.md`** —— 尤其 §0.23.1（GSC 数据禁入客户可见内容，跨项目 P0）、§0.25（30 min push 间隔 + `check-push-window.mjs` 守衛）、§0.35（定时任务 SSoT 与结果总线）、§12（push 5 步 SOP）
2. **`.hermes/regression-guard/error-patterns.md`** —— 顶部已置顶「门禁的饱和上限会伪装成稳定红线」；内含「门禁盲区三例」与「双方法复算」教训
3. **`.hermes/logs/i18n-en-cjk-classification-v2-2026-09-19.md`** —— 1032 字分档清单（双方法三层判据一致）
4. **`.hermes/logs/lane-status.json`** —— 定时任务结果总线（执行层第一输入，禁看 mtime）

**开工自检**：`git -C F:\zprintpro-nextjs status --short` 看有无他人未提交改动（见 §4 保护清单）；`node scripts/check-push-window.mjs` 看 push 窗口。

---

## 1. 已完成（本会话闭环，全部线上验证）

| 环节 | commit | 状态 |
|---|---|---|
| 队列 P0 第 2 篇 Self-Publishing 三语上线 | `15c1e7e3` | ✅ 线上三语 200 |
| Step 1 止血：全站 zh-hk 页脚简体→繁体 + 远距双品牌 ZprintPro→智印港 | `325c2e5b` / `5e377dd5` | ✅ 线上 4/4 验收 |
| Step 2 price-data 跨语系污染源头治理（342 栏位 / 114 唯一字串）| `ecdf1475` | ✅ 线上验证（数值 token 3137 序列零改动）|
| Step 3 门童 #4 双向化 + 专用基线 + 注入回放 10 例 | `24013b89` | ✅ |
| Step 3.5 门禁真实计数改造（两刀：`common.js` + `brand-guard`/`i18n-guard`）| `03e525f1` / `30c22144` | ✅ |
| Step 4 `products.ts` 规格三栏三语化（238 条映射 / 方案 a）| `84d65111` | ✅ 线上验证（含 2 笔真实 red 归零）|
| Step 5 (B) `size` 栏 73/73 + PDP 栏名三语 + en 繁中 FAQ 清除 | `82a9f2d3` | ✅ 线上验证 |
| (A) 孤儿交付物 v10.1 决策 1-B 展示层（5 SKU 1 本起印，hunk 级拆分）| `8e67354e` | ✅ 已推 |
| Step A 1-B **落点修复**（改接 `v9/ProductPageV9.tsx` + 删 `page.tsx` 死代码）| `a5e14d37` | ⏳ 推送/探针由 `pwsh-34` 处理中 —— **接手先确认它的精确探针结果** |

**当前健康基线**：`tsc = 54` · 门禁汇总 **🔴 0** · 门童 #4 基线 **1320**（30 文件）· 注入回放 **10 PASS / 0 FAIL** · 实测 red 真值 2（CompareTable/whatsapp 已修）

---

## 2. Step B（P0，接手第一件）— GSC 泄漏修复 + 查清门童 #16 基线性质

### 2.1 缺陷（已确证，精确原文）

`src/data/buying-guides.ts` **L930** 是 `en` 语系 `content` 值（该行长 8,899 字符），**尾部**含：

```
<p><small class="text-gray-500">数据来源：GSC 数据 / gsc-fresh-2026-09-03.json · candle labels · imps 数据 · pos 数据 (per K3 v10 §九 + §0.23 数据诚信红线, 校准 2026-09-17 K3 v10 拍板日)</small></p>
```

命中后台黑话 **7 处**：`GSC` / `gsc-fresh-2026-09-03.json` / `imps` / `pos` / `红线` / `校准` / `拍板`。
**性质**：蜡烛手工皂标签指南的 **en 页面正文**，**客户可见** ⇒ 命中 §0.23.1 红线。

### 2.2 修法（K3 已裁「本批修」）

**整句重写，不是只删数字**（§0.23.1 教训：只删数字会留下 `GSC 燙金 +` 这类半截空壳）。
重写后**只保留与客户相关的信息**，例如「based on September 2026 search data analysis」；
**去掉**：文件路径 `gsc-fresh-*.json`、校准日期、内部决策编号（`§九` / `§0.23` / `拍板日`）。

### 2.3 必须顺带查清（K3 明确要求）

| 已知事实 | 待查 |
|---|---|
| 门童 #16 **确实覆盖**该档：`scripts/guards/gsc-leak-guard.js:29` 的 `CUSTOMER_VISIBLE_FILES` 含 `/src[\/\\]data[\/\\]buying-guides\.ts$/` | 那为何没拦？主门童汇总显示「**存量基线内豁免命中 295 条**」⇒ **强假设：它躺在 `gsc-leak-guard` 的存量基线里被豁免** |

**两种性质、两种处置（K3 裁定）**：
- **若为存量豁免** ⇒ 性质是「**红线被长期宽限**」，比盲区更严重：**从基线移除该项**，并记入 `error-patterns.md` 作为「**豁免基线可能隐藏真缺陷**」案例
- **若为文件级盲区** ⇒ 补 `CUSTOMER_VISIBLE_FILES` 正则

⚠️ 注意：`gsc-leak-guard.js` 的 `scan()` 返回值形态非数组（本次尝试调用失败），**先读该档源码确认导出接口**再测。

---

## 3. Step C / Step E（Step B 完成后串行）

### 3.1 Step C — 1032 清理批 1（K3 已批准按 v2 清单拆 3 批）

清单：`.hermes/logs/i18n-en-cjk-classification-v2-2026-09-19.md` + 逐笔 CSV
**批 1（高优，直接伤 SERP/schema）**：`title` 10 + `description` 67 + `category` 33 + `JSON-LD` 138 = **248 字符**
**批 2**：`content` 697 字符；**批 3**：`其他` 87 字符
要求：附**基线递减**（1320 → N−M）+ 同步更新 `.hermes/i18n-pollution-baseline.json`（只许递减）

### 3.2 Step E — 行业术语 847 字清单（K3 裁决 5）

`content` 档内 46 条 / **847 字符（占 1032 的 82%）** 疑为**印刷行业术语**（`國際認證體系`312 / `進口印刷設備`258 / `認證體系`208 / `認證紙`69 / `急件`36 / `截單`36）。
K3 指示：**先出全量术语表，由 K3 / 母语者一次性确认后，再决定清理范围**。
注：`急件 18:00 截單` 已在 `common.js` 的 `OPERATIONAL_WHITELIST.businessParams` 内。

---

## 4. ⛔ 保护清单（不得触碰 / 不得误提交）

1. **`src/app/[locale]/product/[slug]/page.tsx`** 工作区含 **weekly-meta 车道未提交改动**（2 个内链 hunk + 1 个 404 修复 hunk）—— 属另一 lane，**不得一并提交**
2. 编辑 **`src/data/blog-data/*.json` 前必须先看锁** `.hermes/locks/lane.lock`（§0.35.5：9/19 曾因人手会话与 lane 并发写同档产生坏版 `_broken-zhhk-lane-20260919.json`）
3. §0.0 名片解禁裁决未定项：**不得删改既有贺卡资产 / 不得改 middleware 301 映射**

---

## 5. 已定口径（避免重复裁决）

| 项 | 结论 |
|---|---|
| 分档口径 | **1032**（门童结构化值作用域 = 基线来源）。**不用 1235**（`resolveLocale` 口径，8 档内多出的 203 字**全部落在注释体内**，零例外，是假阳性）|
| 白名单 | **仅 4 行**已批：`payment-methods/page.tsx:697 beneficiaryCn` / `:758 唐运提 QR 行` / `Footer.tsx:146 supportJA` / `en.json` 品牌名 `彩龍印刷` |
| `唐运提` | **保留简体**（法人姓名以身份证为准）|
| `CRED_HEIDELBERG` | 选 **(A) 允许**，映射转写已核正确（`Heidelberg` / `ハイデルベルク`）|
| 1-B 名单 | **5 SKU**（含 `saddle-stitch-booklets`）；`page.tsx` 死代码**已删**（K3 裁定）|
| Etsy | ⛔ **未开**，等措辞卡 + Step B/C 闭环 |

---

## 6. 执行纪律（本轮血的教训，务必遵守）

1. **验收探针的判据必须先自证再用** —— 本会话连续 5 次栽在「度量工具本身没被度量」：简体字集误收繁简同形字（出/算/用/件）→ 价格预期绑错产品 → CSV 列名取错 → 档位定义混淆「字段归属」与「内容特征」→ 探针验了「构建过没过」却没验「改动在不在渲染路径上」
2. **双方法复算是硬要求**：任何 N vs M 对比，落地前必须第二独立方法复算；**不一致则结论作废**（本会话它拦下过一次 570 笔的错误范围划分）
3. **本地全绿 ≠ 线上生效**：`tsc`/门禁/构建全过 ≠ 客户看得到。**1-B 那次就是这么翻车的**（push ✅ + CF SUCCESS ✅ 但改动落在未渲染的 `page.tsx` 上）。**必须用「精确字符串」探针**（不用通用词，如 `4-color offset` 这类页面里本来就有的词）
4. **push 前置**：`node scripts/check-push-window.mjs`（基准 = `origin/main` 最新 commit 时间，非「我上次 push」）→ ≥30 min 才推；不足则 **commit 留本地立即结束**（§0.25.8 禁 `Start-Sleep` 阻塞）
5. **CF Pages 可能瞬时失败**：`84d65111` 曾 deploy/failure 但被后继 commit 正常带上线 —— 遇到失败先查 CF API 部署历史（account_id `32c174efaa22353f357c0fdff9d61b86`，token 在 `.env` 的 `CLOUDFLARE_PAGES_TOKEN`），**不要盲目烧配额重推**
6. **不许手搓派生档（SOP-5）**、**危险写入三件套（备份 + 计数断言 + 形状断言，断言未过不写盘）**

---

## 7. 常用命令

```bash
node scripts/check-regression-guard.js      # 门禁汇总 + 真实计数 + 截断警示
node scripts/test-i18n-pollution-bidirectional.js   # 门童 #4 注入回放 (须 10 PASS)
npx tsc --noEmit                            # 须 = 54
node scripts/check-push-window.mjs          # push 窗口守衛
node scripts/verify-deploy.mjs              # CF Pages 部署状态
node .hermes/_probe-pb/decisive-1b-live.cjs # 1-B 精确探针
```
