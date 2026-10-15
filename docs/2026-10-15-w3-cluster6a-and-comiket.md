# W3 执行报告：簇 6a（a1↔a2 posters）+ 车道债务偿还 + Comiket C107 承接（2026-10-15）

> **战略出处**: `docs/2026-10-13-three-site-one-month-seo-aeo-geo-strategy.md` §3 W3（10/27-11/2 四项）——按 K3 指令提前执行
> **执行**: AutoClaw 主会话（首席 SEO/AEO/GEO 数据战略分析师）
> **数据来源**（§0.23 强制行）:
> - 真值锚点: `src/data/products.ts` a2 L2683-2780（minQ 10 / basePrice 16·2.3·300 / 157g 可升 200g 相紙 / A2 420×594mm）、a1 L2781-2870（minQ 1 / basePrice 20·4.6·600 / 157-200g / A1 594×841mm）、display L2968（X 展架 60×160/80×180）、art L3064（12 色 Giclée/260g 無酸紙）、adhesive L3161（導氣槽/6-12 個月戶外）
> - 车道债务: `.hermes/logs/2026-10-15-ZP-daily-content.md` §9.1（kraft/eco rows 9/12 desc/h1/alt 回写）
> - 相似度: `.hermes/_b1c6_locate.py`（前）+ `.hermes/_b1c6a_apply.py` 运行输出（后）
> - C107 日期: 2026-12-30~31 東京ビッグサイト（战略 §2.3 记录 + 公开活动事实）
> - 校准状态: 已校准（2026-10-15 23:4x，一手直读）

---

## 一、W3.1 簇 6 = posters 族（N-corner 教训的完整应用）

### 1.1 簇 5（kraft↔eco）——车道 21:17 已消费 ✅ + 本会话偿还其 SOP-5 债务

车道按恢复模式完成 eco 深改/kraft 轻改/faqSchema 独立化，但无 node → desc/h1/alt 停留在 ts 镜像。本会话偿还：**kraft/eco desc/h1/alt ×3 = 18 格 ts→CSV 反向回写**（比车道清单的 12 格多 6 格——imageAlt 同属 CSV 派生域，漏写会被 regen 打回）+ regen 断言 A-E **零漂移**（CSV=ts 镜像正式恢复）。过程中断言闸再次拦险：初版 imageAlt 正则按 locale 内嵌结构取值得到空串，若非拦截会把 6 个 alt 清空——修正为 imageAlt 兄弟节点专用解析后通过。

### 1.2 簇 6a（本轮完成）＝ a1+a2 全套

**N-corner 扫描**（三角教训落地）：posters 族实为 **5 SKU 全模板病**（en 全对 0.95-0.98 / ja 0.88-0.96 / zh a1↔a2 0.712），并发现 MOQ 假值（a2 en desc「50 MOQ」vs minQ 10；ja「1枚から」同错）、ja H1 英文句（"Standard A2 size"/"A1 large size"）、FAQ 答案当 alt、ja 关键词混 en 词。

**本轮范围**（6a）：a1+a2 全套——14 CSV 格（desc/h1/alt ×3 + ja kw ×2；**新内容零绝对价格**，见 §1.3）+ 6 条 body 重写（a2=零售标准规格页 / a1=大幅展示页，互链分流）+ faqSchema ×2 拆 5 SKU 共用模板；6 个 title 零改动。

**验收**：en a1↔a2 0.982→**0.139**；ja 0.958→**0.140**；全部新内容交叉对 ≤0.14；tsc 54=54；门童 #27/#29/#16/brand 全绿；regen 字节级恰 2 块。

### 1.3 价格三方内战（K3 升级，不自判）

a2：CSV title/desc **HK$9** vs products.ts title_zh **HK$12.9** vs **basePrice 16** vs hub 类目块 **HK$6-9**；a1：CSV title **HK$45** vs **basePrice 20** vs hub **HK$10-16**。四个来源互斥。处置：新内容一律不带绝对价格（MOQ/尺寸/材质做钩，门童 #27 无新增 HARD）；存量 title 未动（churn）；**请 K3 一句话裁定** price SSoT（裁定后按 v5 补价格钩 + hub 同步）。

### 1.4 簇 6b（登记今晚 21:17 车道 = 下一棒首务）

display-posters / art-posters / adhesive-posters 三兄弟（en/ja 互扫 0.95-0.98）+ faqSchema 余 3 槽 + zh 对 0.54-0.58 微超目标线——方法与本轮同，差异化锚已备：display=展架装置页（60×160/80×180cm/150-100dpi 真值/展架出租）、art=Giclée 艺术复制页（260g 無酸紙/12 色/100 年）、adhesive=自粘短打页（導氣槽/6-12 個月戶外/異形模切/當日可取）。

## 二、W3.2 Comiket C107 承接（本轮完成核心）

盘点：`doujinshi-printing` PDP 三语 body **gram8 = 1.000**（同一篇中文逐字渲染 en/ja 页——机械翻译死罪 + 模板指纹双杀，B1 级最重形态）；类目 hub `japanDoujinContent` 有 19 处 Comiket 场景但 **C107 具名 0 次**；双 blog（comiket-printing-prep-guide / doujin-circle-printing-guide）三语已在线但零内链。

**本轮落地**：doujinshi-printing ×3 body 重写——**ja 本土化**（表紙カラー+本文モノクロ標準/A5・B5・A4/10部から/FSC 道林紙 90g・表紙 90g コート/無線綴じ・胶装・折り 3 方式/**C107 直答（12/30-31 東京ビッグサイト・逆算 3-4 週間）**/blog 内链×2/hub 内链）、**en 本土化**（同构英文版）、**zh 补 C107 直答段 + FAQ×4 + 内链×3**。验收：**gram8 1.000 → 0.032/0.066/0.034**；三语 body 1211/2413/1103 字符；tsc 54=54。

**遗留（下一棒）**：hub 类目块的 featuredSnippet/FAQ 换 C107 直答版（结构键位需另行核验）+ 同人族其余 SKU（贴纸/亚克力）的 C107 承接。

## 三、W3.3 季节词四件套（部分完成 + 登记）

| 词簇 | 承接页 | FAQ/schema | 内链 | 状态 |
|---|---|---|---|---|
| 利是封（zh） | 簇 2 全套 ✅ | faqSchema 6 SKU 独立 ✅ | 簇内互链 ✅ | ✅ 四件套齐 |
| 日历（三语） | 月曆印刷 pos 16.1 承接页 | — | — | ⬜ 簇 7（calendars 族）随 W4 |
| 年賀状（ja） | **未建**（W2 遗留） | — | — | ⏳ **卡 K3 早鸟报价真值**，10/31 截倒计时 16 天 |
| holiday/christmas cards（en） | greeting-cards 资产在位（§0.0 冻结面） | — | — | ⬜ 随 §0.0 (a)/(b)/(c) 裁决 |

## 四、W3.4 GEO 周度盲测（方法论登记，基线待跑）

按 §0.36.4 口径：手动探针为准、不冒充已在跑。**本轮未产出基线读数**（需浏览器逐引擎提问，本会话预算已尽），方法论已固化：每引擎 5 商业词（en: doujinshi printing / small batch sticker printing / saddle stitch booklet printing / china catalog printing / custom folding boxes；ja: コミケ 印刷 / 同人誌 印刷 / 年賀状 印刷 / 特急印刷 / ポチ袋 オリジナル；zh-hk: 利是封印刷 / 紙袋印刷 / 海報印刷 / 餐牌印刷 / 月曆印刷），记录 zprintpro 域被引位置与竞品榜，落 `.hermes/geo/geo_citation_baseline-*.json`。**建议下一会话或 W4 首日执行。**

## 五、门童与纪律

tsc 54=54（三批全程基线持平）；#27/#29/#16/brand 全绿；regen 断言 A-E（簇 6a 字节级恰 2 块）；push 前独立时钟闸步已固化执行（23:32 核验：距上次 push 4h56m）；10-15 上午撞车（14m41s）已在 SESSION_LOCK 留痕并向 K3 报备。
