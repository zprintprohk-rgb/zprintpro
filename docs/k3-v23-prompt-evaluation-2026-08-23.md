# V23 生图提示词评估报告 — 结论: 提示词主体可用, META 层不可用, 修复后再跑

> 日期: 2026-08-23 · 评估人: K3 视角 (PM/项目负责人) · 对象: 豆包 V22 诊断 + V23 全量提示词 (97 SKU / 388 prompts) + 转换器脚本
> 北极星对齐: 30% 核心大词进首页 / CTR / 转化率 / 询盘率 / 专业信任感

---

## 一、豆包 V22 诊断的质量: 8/10 — 方向正确, 值得肯定

诊断的 8 个问题里 7 个是对的:

| 诊断 | 判定 |
|------|------|
| 销售信息混入生图 prompt (Free sample/DHL/MOQ 会被渲染成画面乱码文字) | ✅ 正确, 这是 V22 最大风险点 |
| SEO 关键词裸列干扰生成, 应语义融入 + 关键词归 META | ✅ 正确, 符合 GEO 最佳实践 |
| AUDIENCE/CRAFT 大段重复稀释权重 | ✅ 正确 |
| 负面清单缺"产品表面乱码印刷文字" | ✅ 正确, 这是印刷品类的专属致命伤 (贺卡生成无意义英文字符 = 直接报废) |
| 1200×1146 替代 1200×1200 | ⚠️ 用户已拍板坚持 1200×1200, 不再议 |
| HERO 60-70% 替代 80-85% | ⚠️ 用户已拍板坚持 80-85%, 不再议。但记录一个事实: 移动端缩略图下 80-85% 占比的识别度优势 vs 留白高级感是 trade-off, 建议试跑阶段两种占比各出 1 张 A/B 对比, 用眼睛投票而不是用理论投票 |

## 二、V23 实际交付物审计: 提示词主体 7/10, META 层 3/10 (不合格)

### ✅ 做对的
- 388 条结构完整 (97 SKU × HERO/DETAIL/VARIETY/MULTI-ANGLE), 计数实测无误
- 销售话术剥离干净 (Free sample/DHL/MOQ 在 prompt 体内 0 残留, 实测)
- 统一负面清单每条继承, 含印刷品专属禁项
- 字符数 2200→1879, 信息密度提升
- 忠实保留了用户拍板的 1200×1200 + HERO 80-85%

### ❌ 实测发现的 4 个硬伤 (全部有证据)

**硬伤 1: AUDIENCE 句子被正则剪成半截, 直接送进 API**
- BC 类全部 SKU: `"...ordering greeting cards for, they need..."` — "for," 后面没了
- PKG-014 DETAIL: `"...ordering custom rigid g"` — **断在单词中间**
- 转换器 (可调参).py 的 `compress_audience()` 用分号切割再拼接, 清尾逻辑漏了 "for," / 截断词 → 破损英文指令进入每条 prompt

**硬伤 2: PKG-014 瓦楞盒的 AUDIENCE 是礼盒的 (串类目污染)**
- 瓦楞盒 (运输箱) 的 AUDIENCE 写的是 "US beauty, skincare, jewelry... brands ordering custom rigid g..." — 这是 rigid-boxes 礼盒的买家画像。运输箱受众应是 e-commerce/物流。机械转换器按类目模板复用导致串味。

**硬伤 3: seo_filename 62% 缺失或错位**
- 60/97 SKU 的 META 是 `(no seo filename - xxx-en.webp)` 兜底占位, 无 zprintpro 前缀, 与网站实际接线无关
- BC 贺卡 5 个 SKU 的文件名是 `zprintpro-stickers-premium-stickers-*` — **深挖后发现这不是豆包抄错, 是网站 products.ts 本身的遗产 bug**: BC-001 premium-greeting-cards 的 imagesByLocale 就接着 stickers 命名的文件 (7/22 V22 名片→贺卡改造时文件没改名)。豆包忠实继承了网站的错。

**硬伤 4: alt_en 大量断句残文**
- `"Free sample, DHL Expre."` / `"DHL Ex."` / `"global delive."` / `"logistics &."` — 这些是要上网页的 ALT 文本, 断在单词中间的英文不能直接上线

## 三、能否按豆包 V23 直接生图? — 结论: 不能原样跑, 修 4 处后可以

| 层 | 判定 | 原因 |
|----|------|------|
| 生图 prompt 主体 (388 条) | **修硬伤 1+2 后可用** | 半截 AUDIENCE 句子是 API 负载里的垃圾指令, 必须修; 修复后提示词工程质量合格 |
| META 层 (filename/alt/keywords) | **不可用, 弃掉重建** | 62% 文件名是占位, alt 断句, 且只有 en (缺 ja/zh-hk) |
| 试跑流程 (2 SKU × 4 视图先校验) | ✅ 完全同意 | 豆包这个流程建议是对的, 严格执行 |

**修复方案 (全部脚本化, 不手搓 — SOP-5 纪律):**

1. **AUDIENCE 重建**: 按 16 类目 × 标准买家画像表 (我出 16 条正确画像), 脚本替换所有半截句, 同时修正串类目 (PKG-014 这类)
2. **seo_filename 重建**: 从 products.ts 的 imagesByLocale **脚本导出**每个 SKU 的真实接线文件名 (网站是唯一事实源), 生成 mapping 表。顺带决策: 是否趁重生图修复贺卡/贴纸命名错位 (见下)
3. **alt_en 重建**: 从 products.ts descriptionEn 脚本截取完整句 (不断词), 人工抽审 10 条
4. **补 ja/zh-hk META**: alt_ja / alt_zh-hk / geo_keywords_ja / geo_keywords_zh-hk — 这是"EN 模板 → JA/zh-hk"迁移的最小必要字段, 图片文件按现有 `-ja` / `-zh-hk` 后缀约定生成

## 四、命名错位修复决策点 (需要拍板)

BC 贺卡 5 SKU 当前接线 `zprintpro-stickers-*` 文件名。趁这次全量重生图, 两个选项:

- **A (推荐)**: 新图用正确命名 `zprintpro-greeting-cards-premium-greeting-cards-en.webp`, 同步脚本改 products.ts 接线。图片文件名关键词对 Google Images 收录是真实加分项, 反正图要重生, 改名零额外成本
- **B**: 沿用旧名 (兼容现状, 不改 products.ts), 但贺卡图永远背着 "stickers" 文件名, 图片 SEO 关键词永远错位

## 五、对北极星目标的贡献度评估 (诚实版)

图片重做对各目标的真实作用路径:

| 目标 | 图片的作用 | 权重 |
|------|-----------|------|
| 核心大词排名进首页 | **间接**: 图片本身不推排名; 但优质图 → 页面停留/互动 ↑ → 行为信号; filename+alt 对 Google Images 垂直流量直接有效 | 辅助杠杆, 不是主杠杆。排名主杠杆仍是内容深度 + 内链 + schema + 外信号 |
| SERP CTR | **弱**: SERP 上图主要出现在 Images tab 和 AIO 引用; 主 CTR 杠杆是 title/meta (T34/T35 在做) | 小 |
| PDP 转化率 / 询盘率 | **强**: 这是图片的主战场 — 专业写实产品摄影直接决定海外买家对"中国供应商"的信任度, 4-6 张多视图 (HERO/细节/多角度/场景) 是 B2B 询盘转化的标配证据链 | **主战场** |
| GEO/AI 引用 | **中**: AIO 引用主要看文字内容; 图片贡献小于 G1 Index 这类数据资产 | 中 |

**结论: 这轮生图的真实定位 = 转化率 + 询盘率 + 信任感工程, 不是排名工程。** 期待值应设在询盘转化提升, 排名目标靠 v3.16 战略里的内容/内链/schema 主线。

## 六、我的 V23.1 增强项 (豆包版之外)

1. **每条产品图加"可读设计、无可读文字"指令**: 贺卡/盒子全空白像假货, 全文字又必乱码 → 正解是 `elegant printed floral/pattern design visible, no legible words or letters on product surfaces` — 视觉上有印刷设计感, 但无具体文字 (豆包版只禁了文字, 没解决"空白太假"的对立问题)
2. **VARIETY 视图加 1 张人手元素** (手持贺卡/手开箱): B2B 信任研究里"真实人手 + 产品"对供应商信任度提升显著, 建议 VARIETY 或第 5 视图加入
3. **4 视图场景去重**: 现版 4 视图共用同一 SCENE 段 → PDP 画廊 4 张同场景图单调。建议 HERO/DETAIL 共场景, VARIETY 换"使用中"场景, MULTI-ANGLE 换中性影棚背景
4. **JA 版本场景本土化** (可选增强): ja 文件若用日本场景 (日式婚礼/日本办公/学园祭), 对 JA 市场 PDP 转化有真实提升; 成本是 JA 版不能纯复用 EN 场景段
5. **试跑校验清单加 1 条**: 生成图放大 200% 检查产品表面 — 任何可辨识的伪文字/伪 logo 一票否决

## 七、执行路线建议

```
Step 0 (本次拍板): 命名错位修不修 (A/B) + JA 场景本土化做不做
Step 1 (脚本, ~30min): V23.1 = 豆包 V23 + 4 硬伤修复 + 增强项 1/3
Step 2 (试跑): PC-001 + PKG-014 × 4 视图, 按校验清单人工审 (含 200% 放大检)
Step 3 (拍板后全量): 388 张 EN
Step 4 (EN 验收后): 脚本生成 JA/zh-hk META + 按需生成 JA 场景版
Step 5: 上线 = 文件入 public/images/products/seedream-webp/ + products.ts 接线核对 + IndexNow
```
