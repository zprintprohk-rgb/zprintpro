# B1c 簇 2 收尾：cartoon/eco/large 利是封 ×3 语 + 家族对齐 — 执行与验收报告 (2026-10-15)

> **战略出处**: `docs/2026-10-13-three-site-one-month-seo-aeo-geo-strategy.md` §3 W1.3（B1c 簇 2 收尾）+ `docs/2026-10-15-b1c-three-cluster-flywheel-and-defense-full-analysis.md` §八 P0-2
> **执行**: AutoClaw 主会话（K3 指令「现在直接开工簇 2 收尾」）· 按 §4 七条固化 SOP 全流程（锁 → 实锤 → 清洗 → 门禁 → 相似度 → 重爬 → 进度登记）
> **数据来源**（§0.23 强制行）:
> - 真值锚点: `src/data/products.ts` L3996/L4089/L4182（minQuantity 100 / basePrice 1.10·0.46·64、1.90·0.74·103、2.20·0.92·129 / price_range / specs / variables 一手直读）
> - 簇内现状: `src/data/sku-seo-data.ts` L1214-L1429（6 SKU 块）+ `zprintpro-sku-seo-data.csv` rows 34/36/37/38
> - 交期口径: `src/data/category-seo-content.ts` redPacketsContent（K3 10-14 复核 hub：標準 5-7 個工作天，複雜工藝 7-8 天，旺季 11 月底前下單）
> - 相似度: `.hermes/analysis/b1c-cluster2-final-similarity-2026-10-15.json`（双方法 9 对 ×3 语 ×2 域）
> - 门童: `.hermes/logs/sku-title-v5-audit-2026-10-15.json` + keywords-detox/gsc-leak/meta-desc 运行输出
> - 校准状态: 已校准（2026-10-15 09:2x，本 run 全部一手直读 + 双方法复算）

---

## 一、实锤定位（先实锤再动刀 — SOP 第 1 条）

开工扫描确认簇 2 根因模式在剩余 3 SKU 上完全复现，且**新增一处数据管线伤**：

| # | 病灶 | 位置 | 性质 |
|---|---|---|---|
| 1 | desc 层旧模板：「157g 紅金紙」（eco 实为 FSC 再生纸/种子纸、large 实为 150-200g）、ja「エコ年賀状/大型年賀状」错品类词 + XのX 口吃、「from ZprintPro the US」模板句、 duplicated「100 MOQ」管道残渣 | eco/large ×3 语 CSV+ts | spam 指纹（簇 2 已知根因） |
| 2 | H1 层：eco/large zh H1 = products.ts 描述复制粘贴；eco/large ja H1 = 通用模板「高品質・短納期…」 | eco/large CSV+ts | 同簇 1 ja-H1 病 |
| 3 | faqSchema：三 SKU 仍共用 6 SKU 同一份 4 问模板，含「MOQ 500」与 minQuantity=100 矛盾、cartoon/large 页答 eco 问题 | products.ts ×3 | JSON-LD 层同源指纹 |
| 4 | **cartoon CSV 陈旧域**：ts 侧 desc/h1 已被 10-14 车道手工改优，CSV 仍是旧模板 → 下次 regen 会用坏模板**覆盖好内容**（SOP-5 偏差的实锤现场，本批根治） | cartoon CSV desc×3 + h1×3 | 数据管线伤 |
| 5 | 交期内战：家族 desc 5-7 vs 正文 3-5（eco/large/cartoon）；embossed 车道批全 3-5 与 hub SSoT（5-7）冲突 | 4 SKU | 数字内战（簇 1 §4 同型） |
| 6 | ja 正文 FAQ 块三 SKU 同指纹：「50〜100個/部/枚」含糊 +「即日少量の急ぎは10枚から」与 MOQ 100 直接矛盾 + 无据「24〜48時間以内」加急声明 | 4 SKU ja body | 指纹 + 数字失实 |

（cartoon 的 title/desc 主体与 3 语正文已由前棒改优，本批只做收尾对齐，不重复劳动 — 幂等。）

## 二、执行清单

**CSV（源头，32 格）**：
- eco：title zh/en + desc ×3 + h1 ×3 + keywords zh/ja 全重写（FSC 再生纸/种子纸/大豆油墨/無覆膜 差异化锚入 title-desc-h1；价格 HK$1.90/$0.74/¥103 真值）
- large：title en + desc ×3 + h1 ×3 + keywords zh/ja（110×200mm 加大 30-50% 差异化锚；HK$2.20/$0.92/¥129）
- cartoon：desc ×3 + h1 ×3 **整格回灌**（ts 优质值 + 交期修正）+ keywords zh/ja 聚焦化（清 中秋賀卡/聖誕卡/婚禮請柬/嬰兒滿月卡/感謝卡 模板词）
- embossed（车道批对齐）：keywords zh/ja 聚焦化 + desc ×3 交期 3-5→5-7

**ts 正文（17 操作，body=ts 权威域）**：
- cartoon zh：第 3 段与第 4 段材質/尺寸重复去重 + 交期对齐 + 尾段补内链 3 条（hub/foil/custom）+ 常見問題 4 问
- eco zh / large zh：交期对齐 + 内链 3 条（custom/paper-bags/hub；hub/embossed/custom）+ 常見問題 4 问（产品专属）
- 4 SKU ja：正文 FAQ 块产品化 ×3（cartoon/eco/large）+ embossed FAQ Q1/Q2 修矛盾；「10枚から」矛盾全簇清零；无据「24〜48時間以内」加急声明移除（保留 DHL 2-4 日事实层）；补内链句 ×3（祝儀袋印刷一覧/foil/embossed/custom/paper-bags）
- hub 口径对齐：所有新增交期/旺季表述与 hub SSoT 一致（5-7 工作天、複雜工藝 7-8 天不新增、11 月底前下單）

**products.ts（3 行）**：cartoon/eco/large faqSchema 每槽换产品专属 4 问（英文，foil/custom 同风格），MOQ 500 矛盾清除，FAQPage JSON-LD 每页独立。

## 三、事故防御与管线修复记录

1. **verify 模式拦下 19 处不匹配后才写盘**（三件套纪律）：CSV keywords 实为逗号分隔纯文本（非 JSON）、cartoon CSV 陈旧域、交期句实际无「交貨」二字、ja FAQ 锚点需切片法——全部在 verify 轮暴露，零误写。
2. **regen 漂移闸两次博弈**：dry-run 报 2 行 title 漂移 → 打印只显示第 0 位（zh，相同）造成假象 → 按 §0.23.2 码点级比对定位真实差异在**第 1 位 en title**（CSV 新值 → ts 旧值，预期流向）→ 按簇 3 先例 `--allow-drift` 显式确认（拒绝 b15 回写陷阱方向）。断言 A-E PASS，**字节级变化恰 4 块零误伤**。
3. **cartoon SOP-5 偏差根治**：车道 10-14 手改 ts 未回写 CSV 的偏差域（desc×3+h1×3）本批以「ts 优质值 + 修正」整格回灌 CSV → regen 后 CSV=ts 镜像恢复，下次 regen 不再回退。

## 四、验收数据

| 门童/指标 | 结果 |
|---|---|
| 簇内相似度（词级 Jaccard / 8-gram，双方法，body+desc ×3 语 9 对） | worst = **0.538**（desc zh foil↔eco）/ 8-gram max <0.09；红线 <0.60 **0 违规**、目标 ≤0.55 达成 |
| tsc | **54 = 54** 基线（error-TS 计数法，增量 0） |
| 门童 #27 title-v5 | 利是封 18 槽全部 `hard:[]`，当量 51-57 全带内；存量 HARD=8 均为非本批槽 |
| 门童 #29 keywords-detox | 0 违规（252 槽全扫；6 豁免=v22 贺卡槽待 K3 裁决） |
| 门童 #16 gsc-leak / #20 meta-desc | exit 0 / exit 0 |
| brand mentions --strict | A 类 0 |
| regen csv-to-sku-seo | --allow-drift 显式确认；断言 A-E PASS；字节级变化 = cartoon/eco/large/embossed 恰 4 块 |
| 全簇清零断言 | 「即日少量の急ぎは10枚から」/「少量の即日対応は10枚から」/「24〜48時間以内」/「標準納期は3〜5営業日」/「from ZprintPro the US」/「高品質・短納期…」/「157g 紅金紙」/ XのX ja desc / 通用 ja H1 —— **利是封 6 块内全部 0 命中** |
| 内链 | 新增 21 条全部真实路由（/zh-hk/ /en/ /ja/ 前缀断言过；hub×6 + foil×2 + embossed×2 + custom×8 + paper-bags×2 + greeting-cards 沿用前棒） |
| faqSchema | 3 槽 JSON 解析 4 问/槽，无 MOQ500 |
| BOM/编码 | CSV/ts/products.ts 全部无 BOM；备份 `.hermes/_bak-b1c2c-20261015/` |

## 五、重爬刺激与验证窗

- sitemap 6 XML 重生成（lastmod=2026-10-15，3 locale 各 238 URL + image sitemap 239 产品）+ IndexNow 双通道（54 URL 批 200 + 3 locale ping）。
- 验证窗：本批与簇 2 前批（10-13/10-14）合并观察，7-10 天后以 GSC 28d 档对账 貼紙印刷/海報印刷 之外的利是封词面（燙金利是封 pos 1 守位 + 利是封訂製/訂做利是封 23-30 爬升）与 FAQPage rich results。

## 六、遗留登记（本批范围外，交簇 4-8 队列）

1. **全站同型模板存量**（本批定位实测，利是封簇已 0 残留）：`from ZprintPro the US` ×33 块（bags/flyers/calendars/menus/books 等）/ ja 通用 H1「高品質・短納期…」×27 块 / ja「標準納期は3〜5営業日」+「24〜48時間以内」×9 块 / 「即日少量の急ぎは10枚から」×2 块（laminated/drink menus）——建议簇 8 长尾批按本批同法清剿。
2. CSV「内部链接建议」列不被 regen 消费（列映射核实），cartoon 行该列的 same-day-flyers 错链无线上风险，簇 8 批顺带修正即可。
3. embossed zh desc 仍留「3-5 個工作天交貨」→ 本批已改 5-7 ✓（无遗留）；其 zh 正文无 FAQ 块（lane 风格），后续簇批可补齐。
4. W1 CTR 批验证窗（10-22~10-25）与本批互不重叠，无 title churn 冲突。

## 七、SOP-10 5 问自检（§0.22）

1. **架构差异？** ✅ 实读 csv-to-sku-seo.mjs 权威域划分（title/desc/h1/keywords/alt=CSV，body/faqs=ts）+漂移闸源码，改 CSV 源头 + regen 为正确路径，非手搓派生。
2. **约束适用范围？** ✅ 恢复模式块（总线 > 恢复 > 增产）生效中；§0.0 名片面零触碰；title 冻结槽（certificates/foil-stickers）未动；本批 title 全部非冻结槽。
3. **原数据/拍板来源？** ✅ 价格/MOQ/材质/尺寸全部 products.ts 一手行号；交期 5-7 取 hub SSoT（K3 10-14 复核版）；无编造数字；无据加急声明按数据诚信**移除**而非保留。
4. **字段值策略？** ✅ 不涉 certNo/validUntil/issuer。
5. **Markdown 渲染？** ✅ 正文新增 `[文字](/locale/路由)` 走 SkuSeoBody parseInlineLinks 链路（Rule 5 门童覆盖）；全部链接 locale 前缀断言过。
