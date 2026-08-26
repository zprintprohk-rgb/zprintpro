# V25.7 → V25.9 三语言生图提示词 更新迭代分析

> 分析范围：zprintpro 电商生图提示词体系（99 SKU × 4 视图 HERO/DETAIL/VARIETY/MULTI-ANGLE，EN/ZH-HK/JA 三语言）
> 依据：`F:\电商生图提示词重要\` V25.7 文档版 / V25.8(5SKU+99SKU) / V25.9(99SKU) 全文；`_gen_v25_7/8/9.py` 脚本 docstring；本次生图实测（5 SKU 生成+视觉核验）
> 分析执行：版本差异分析员 + 交叉核验员 两路 Agent 独立产出，主线实测交叉验证

---

## 一、版本演进总览

| 维度 | V25.7 | V25.8 | V25.9 |
|---|---|---|---|
| 结构 | 九段标签式（WHERE USED/AUDIENCE/PRODUCT/SCENE/COLOR/VIEW/CRAFT/SEO/NEGATIVE） | 11 段标签式 | **一段话 5 层**：色彩灯光→前景产品→虚化场景→构图→负面 |
| 字符量（BC-001 HERO） | 2196（≤2400 OK） | 2723（[OVER] 超限） | **1710**（EN 全量 avg 1519） |
| 手 | HERO 有手（单手写卡片） | 全无手（×3 重复强调） | 无手，负面一句收尾 |
| 比例 | 未写 1:1 | 强制 1:1（重复 2 次） | 开头一句 "1:1 square..." |
| 色彩 | 温和暖调 | 鲜艳饱和（vivid/saturated）+ noble elegant | **浅色通透主基调 + 三市场色 + category tones 降级次基调** |
| 虚化 | subtle DOF | strong bokeh（背景仍可辨认） | softly blurred（朴素叙述） |
| SEO | 独立 SEO 段 | 独立 SEO 段 | **删除 SEO 段**（保留 SEO_FILENAME 文件名） |
| 负面 | 23 项 | 23 项+no muted+无手×3 | 一句 9-10 项 |
| 设计美感 | 仅文字排版要求 | 仅文字排版要求 | **新增 16 类目 PATTERN_THEME + 三市场 MARKET_STYLE** |
| 三语言 | 仅 EN | EN/ZH-HK/JA（JA 粗糙拼接） | **三语言独立成文，MARKET_COLOR 三套正式浅色系** |

## 二、每次改动的考虑因素（脚本 docstring 依据）

### V25.7（_gen_v25_7.py）
> "V25.6 基础上修 6 项：1. 虚构品牌名小logo+短文案主视觉双层；2. VARIETY 多款设计排列无手；3. MULTI-ANGLE 中性桌面纯产品三视图；4. BC 直边；5. PB 鸡眼扣；6. 文档版 ≤2400 字符"

- 商业可信度：品牌小 logo+短文案双层避免 AI 乱编文字；视图分工：展示类视图先无手化；质量约束 ≤2400。

### V25.8（_gen_v25_8.py）
> "V25.7 基础上修 5 项：1. 全部去手；2. 强调 1:1；3. 鲜艳饱和色彩；4. 强虚化背景；5. zh-hk 加右上角大红爆炸贴"

- 手是 AI 翻车重灾区→产品独立入镜；电商主图统一 1:1 适配 PDP；点击率导向→鲜艳高亮；强虚化兼顾产品感与场景感；ZH-HK 爆炸贴本地化营销。

### V25.9（_gen_v25_9.py）
> "V25.8 问题：11 段标签式、SEO 混入、'无手'重复 3 次、avg 1900+；V25.9 改进：一段话、去 SEO、去重复、avg ~800，模型更易理解"

- 模型可解性：按生成逻辑线性排列（色彩→产品→场景→构图→负面）；
- 长度回归：V25.8 超 2400（[OVER]）→ V25.9 EN avg 1519；
- 去 SEO：对生图无价值，SEO 职责交给文件名/网站元数据；
- **色彩路线回调（本版核心）**：V25.8 全饱和在参考图中暴露"浓艳、腻、缺通透"→ 按参考图改主浅色（airy pastel）+ 通透发光 + 色彩层次（rich color curves 防呆板）+ 三市场独立色系；category tones 保留品类饱和落点；
- 材质数据源统一到 _sku_data.json（300gsm/foil stamping/spot UV）。

## 三、颜色段演进矩阵（用户重点）

| 项 | V25.7 | V25.8 | V25.9（最终） |
|---|---|---|---|
| 主基调 | warm gold foil, ivory white, cream, blush accent | vivid saturated, bright cheerful, noble elegant | **Light airy pastel tones as dominant palette, luminous and translucent, elegant noble colors, rich color curves, never flat or dull** |
| 通透感 | 未强调 | 高调高亮（偏厚饱和） | **luminous and translucent + background bright and well-lit** |
| 高贵感 | 材质词间接表达 | noble elegant palette | **elegant noble colors + champagne/light gold 浅金化** |
| 禁压抑 | no dark gloomy（1 处） | COLOR+AVOID 双写 | **no dark heavy gloomy colors, never flat or dull**（置于色彩段首） |
| EN 色 | warm gold foil, ivory, cream | vivid warm gold foil, bright ivory... | **soft blush pink, champagne gold, cream white, sage green, dusty blue, warm ivory**（新增 dusty blue 灰蓝叠层） |
| ZH-HK 色 | （无） | 与 EN 同底 | **festive soft pink, rich champagne gold, warm ivory white, jade green accents, lucky red touches** |
| JA 色 | （无） | 粗糙拼接 bright clean Japanese... | **sakura pink, light gold, soft lavender, mint green, pure white, warm cream, delicate and translucent** |

> 关键设计：V25.9 = "主浅色 + 品类保饱和"双轨妥协——category tones 原封保留 V25.8 饱和金箔色作为产品本色落点，浅色通透画面上金箔烫金仍有饱和度层次，整站从"浓艳高亮"转向"明亮通透、优雅大气"。

## 四、交叉核验结论（交叉核验员）

| 核验项 | 结果 |
|---|---|
| 文件完整（三语言 × 99 SKU × 4 视图） | 396/396 条，SEO_FILENAME 396/396 唯一，无截断 ✓ |
| 主基调四短语覆盖率 | EN/ZH-HK/JA 各 396/396 = **100%** ✓ |
| 三市场专属色 | EN 6 色 / ZH-HK 5 色 / JA 6 色全部命中 ✓ |
| 三语言名副其实 | 繁体中文（燙金/百個可印）+ 日文（アートブック/サクスタジオ）✓ |

## 五、主线实测补充：V25.9 提示词两处内部矛盾（生图实证发现）

| SKU | 矛盾 | 实测结果 | 处理 |
|---|---|---|---|
| RP-001 ZH-HK | 主基调浅色通透 vs category tones "vivid festive Chinese red, deep crimson" + 场景 "dark walnut wood table" | 首版生成深红暗调，不符合 V25.9 浅色要求 | 修正轻描（soft pink 主调、浅木桌、浅色背景）重生成→浅色验证通过 ✓ |
| DJ-001 JA | 场景 "black convention tablecloth"（黑色会展桌布） | 首版背景出现黑色/暗色过深 | 修正为 "soft pink pastel tablecloth + pink/blush/light-blue booth" 重生成→粉蓝展台验证通过 ✓ |

> 建议：批量跑 99 SKU 前，需系统性清理 category tones/场景段里的深色冲突项（红色系类目保留红色但降为点缀，场景道具避开黑色桌布/深色桌面）。

## 六、最终结论

V25.9 是提示词体系从"标签说明书"到"一段话题面"的结构性收官：砍掉对生图无益的 SEO 段与三重重复禁令，2723 字符超限标签压缩为 1269–1760 字符单段自然语言；核心变化在色彩维度——放弃 V25.8 全民鲜艳高饱和，按参考图审美校准为浅色通透主基调（Light airy pastel + luminous and translucent），用 rich color curves 防呆板、no dark heavy gloomy 禁压抑，为三市场定制 airy pastel（灰蓝叠层）/喜庆金红（翡翠绿点缀）/樱花淡彩（wagara 日纹）三套浅色系，V25.8 饱和金箔色降级为 category tones 保产品本色。实测验证：5 SKU 成图全部浅色通透达标（RP/DJ 两处提示词矛盾修正后），色调符合用户 V25.9 规范表逐项对照。
