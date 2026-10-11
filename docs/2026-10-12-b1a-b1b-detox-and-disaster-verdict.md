# 2026-10-12 spam-recovery B1a/B1b 去毒落地 + 「灾难 vs 报告 bug」判定

> 数据来源：K2.8 审计 `docs/2026-10-12-b1-sku-template-audit.md`（commit 4d7def3b）；断崖诊断 `docs/2026-10-12-gsc-cliff-diagnosis.md` v2；GSC 实时档 `GSC数据/实时24小时zprintpro.com-Performance-on-Search-2026-10-12.xlsx`（本会话 openpyxl 复算）；词频/镜像实测 `scripts/apply-b1b-keywords-detox-20261012.py` + `.hermes/reports/b1b-keywords-detox-20261012.json`；平价校验 `.hermes/tmp/_parity-check.py`（0 漂移）。

## 一、B1a/B1b 落地结果（K3 2026-10-12 拍板「按建议执行」）

### B1a — 全站 `<meta name="keywords">` 渲染移除（9 文件 12 处）

| 渲染点 | 文件 |
|---|---|
| createMetadata 工厂（guide/pillar 页） | `src/lib/metadata.ts` |
| PDP skuSeo 分支 + coreSeo 分支 | `src/app/[locale]/product/[slug]/page.tsx` ×2 |
| 首页 / 类目页 | `src/lib/seo.ts` ×3（含死变量清理） |
| blog 页 Metadata | `src/app/[locale]/blog/[slug]/page.tsx` |
| 根 layout | `src/app/[locale]/layout.tsx` |
| service-areas | `src/app/[locale]/service-areas/page.tsx` |
| services ×3 | business-cards-printing / catalog-printing-china / rush-printing-delivery |

保留不动：JSON-LD `ImageObject.keywords`（合法 schema 字段，内容极简非 stuffing）、blog `og article:tag`（OpenGraph 合法字段）、全部数据层字段（homeMetadata / seo-keywords.ts / metaMap 等死数据不渲染即无害）。

### B1b — keywords 数组三语去毒（92 SKU × 3 locale）

清洗规则（可复跑，脚本硬断言）：
1. **宠物类跨品类污染词 9 个全杀**（pet food label / pet brand label / custom pet label / pet portrait / pet memorial / pet lover gift / dog mom gift / cat dad gift / pet treat label —— K2.8 审计实锤名单，word-boundary 正则 + 白名单断言防误伤 PET 材质词/catalog 前缀）；
2. **模板词杀**：出现于 >8 个不同 SKU 且无品类语素的词（zh-hk 24 / en 21 / ja 20，含「100個起/100pcs MOQ/100個〜」「即日出貨/same day shipping/当日出荷」「免費打樣/free proof/無料校正」「銅鑼灣快印」「from $0.06/HK$0.5起」「FSC 認証」「foil logo/箔押しロゴ/燙金LOGO」等）；
3. **品类语素白名单保命**：>8 共现但含品类语素的词保留（貼紙/標籤/盒/袋/sticker/label/box/ステッカー/封筒… 共 zh 22 / en 11 / ja 16 词，如「貼紙印刷」×9、「包裝盒印刷」×12）——符合 K2.8「每 SKU 保留本品类词」口径；
4. **每 SKU 每 locale 截断至前 ≤10 个**（保持既有优先序，头部即主词+核心长尾）。

执行路径（SOP-5 合规）：前置断言 CSV↔ts 关键词三语逐字镜像（91 行 0 破裂）→ 清洗器改 CSV 3 列（70 行改动）+ ts 唯一 ts-only key small-bags（3 语）→ **官方管线** `csv-to-sku-seo.mjs --apply` 落 ts（91 块替换、70 块字节变化与 CSV 改动行数精确互证；断言 A-E 全过；ts-only 逐字保留；title 漂移闸 0）→ 生成器头部陈旧注释（100 key=74+26）同步修正为 92=91+1。

量化结果：**5,564 条关键词引用清除**（zh-hk 2,536 / en 1,899 / ja 1,129），约 208 个槽位触发 ≤10 截断；复扫 kill 词残留 0、超 cap 0、pet 0（「catalog」的 cat 前缀为误报已甄别）。备份：`.hermes/_bak-sku-csv-before-b1b-20261012.csv` / `.hermes/_bak-sku-seo-data-before-b1b-20261012.ts` / 生成器自备份 ×2。

**注意**：`seo.body` 正文里的「pet food labels」类应用场景句（en 多 SKU）属 B1c 正文差异化范畴，本批未动（待 K3 拍板 B1c 策略）。imageAlt 中 waterproof-stickers en「for pet food and brand labels」同理登记。

## 二、判定：灾难级真实降权（置信 ~85%），非报告 bug

### 证据链（支持真降权）

1. **逐时硬数据**：10/09 04:00-11:00 逐时曝光 10,13,7,2,6,2,3,1（合计 44，28d 基线 ~582/24h），12:00 起连续 16h 整零。关键点：04:00-11:00 行在 K3 03:0x 导出时已超 64h、属回填完成区，仍只有 44——v1「近期窗未回填」假说不成立（已撤回）。
2. **时间线小时级咬合**：2026-09 spam 更新 10/08 16:37 HKT 推送完成（13d15h，史上最慢）→ 10/09 上午 HKT 断崖开始。
3. **机制解释完备**：B1 审计实锤 scaled content abuse 指纹（en/zh/ja 各 150/108/115 对 >50% 近重复正文、贴纸五兄弟三语互扫 96%+、每页 50-90 词 keywords stuffing、宠物词跨 20 SKU 污染）。spam 更新打的正是这个画像。
4. **形态吻合 Google 明示的 spam 命中相**：无手动处罚通知 / 索引保留（存活 15 词排名不差，燙金利是封 pos1 等）/ 展示蒸发。
5. **排除法干净**：数据延迟（回填区仍低）、10/11 hero 改版（SSR 体检 H1/canonical/JSON-LD 全绿）、10/09 P1 提交、旧域名镜像、robots/技术故障、10 月核心更新——全部排除；非 Google 引擎仍正常引用我站内容（管道无全局故障）。

### 残留 15%：报告管道事故可能

GSC 自身报告故障有历史先例；实时窗尾部 ~12h 理论上可能未回填。**一锤定音 = GA4 实时 Google 自然会话数**（K3 核验中）：

- **GA4 归零 → 实锤（Branch A）**：按 `docs/2026-10-12-spam-update-recovery-plan.md` 全速跑。本批 B1a/B1b = B 阶段首两件已落地。下一杠杆 = **B1c 簇内正文差异化重写**（15-20 簇 × 三语，簇内主推页保留 + 兄弟页差异化 30-40%）——待 K3 拍板策略后我出逐页任务清单。预期管理：恢复以月计，10 月内整站回升不现实；下轮 spam/core 更新是恢复窗口；Q4 季节词（年賀状早鸟 10/31、聖誕卡 11 月中）用 Bing + AI 引擎 + 直接渠道对冲，不等 Google。
- **GA4 正常 → 报告事故（Branch B）**：内容策略不变，48h 后复导出 GSC 全量档对比验证；B1a/B1b 属零风险卫生动作，不因虚惊回滚。

无论哪个分支，B1a/B1b 都该做（spam 指纹是客观存量），所以本批先行落地不等待核验结果。

## 三、旧域名状态（K3 已拍板：域名已续费）

域名续费保住了所有权。301 权益的生死取决于**转发链路**而非域名本身：10/12 03:21 实测 apex/www/老产品路径仍 301（注册商宽限期）。请确认旧域名 301 当前走的是哪条路：

- 若 = 注册商自带转发服务 → 域名续费通常一并保住，无需动作；
- 若 = 自建服务器（未续的那台）→ 服务器一死 301 即死，外链权重蒸发。**零成本解法**：把旧域名 DNS 指到 Cloudflare（免费计划），用 Bulk Redirects / Redirect Rules 做 301 → zprintpro.com，永久免疫服务器续费问题。

站内活代码对旧域名仅 2 处注释（K2.8 已核），无需清理。

## 四、门检与上线证据

- tsc 54=54 基线（全在 quote-engine/__tests__ 存量，0 新增；注意本机 `./node_modules/.bin/tsc` shim 缺 node.exe，须用 `node node_modules/typescript/bin/tsc`）
- brand-mentions --strict A 类 0 命中；encoding 见 commit 记录；pre-commit 门童全过
- 线上断言（push 后回填）：任意 PDP 三语 `<meta name="keywords"` = 0 命中、title/description/JSON-LD 不受影响
