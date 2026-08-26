# V21→V22 生图提示词升级分析与全量 EN 交付

- **状态**: ✅ 完成（校验 agent 抽查中）
- **日期**: 2026-08-22
- **交付**: `seedream_prompts_v22_99sku_en.txt`（99 SKU / 442 条提示词，每条 1800-2400 字符）

## 一、版本脉络（实测定位）

| 版本 | 载体 | 状态 |
|---|---|---|
| V20 | `seedream_prompts_v20_87sku_4views.txt`（87 SKU 旧版提示词，中英混合） | ✅ 存在 |
| V21 | `v20_9_parsed.json`（99 SKU 纯英文提示词 + `seo_filename` + `alt_en` + V21 条款内嵌：§4.1 标题白名单 ≤6 词、§4.4 尺寸 1200×1146 BOTTOM-STRIP） | ✅ 存在（8/19 05:51 落盘） |
| V22 | review-2026-08-22 定义：**Direct API 通道**（6-9x 提速，等 ARK_API_KEY）；无独立提示词文件 | ⚠️ 仅渠道定义 |

**结论**：V21→V22 的升级 = 生成通道从 AutoGLM 换 Direct API（提速 6-9 倍）+ 提示词按 V22 标准重写（本次交付内容 = V22 版提示词，兼容 Direct API 直调）。

## 二、V20 → V21 → V22 升级点对比

| 维度 | V20（旧） | V21（当前） | V22（本次交付） |
|---|---|---|---|
| SKU 数 | 87 | 99（+wedding 12：WI/PC 套系） | 99（全量） |
| 语言 | 中英混合 | 纯英文 | 纯英文 |
| 开头 | 生图图片: Seedream 5.0... | PRODUCTION-READY FINAL IMAGE ONLY | PRODUCTION-READY FINAL IMAGE ONLY（保留） |
| SEO 字段 | 无 | seo_filename + alt_en | 保留 + GEO 关键词注入 |
| 尺寸条款 | 1200×1200 | 1200×1146 BOTTOM-STRIP | 1200×1146 BOTTOM-STRIP（保留） |
| 用途声明 | 无 | 部分内嵌 | ✅ WHERE USED 每视图显式声明 |
| 目标人群 | 无 | 部分 | ✅ AUDIENCE 每 SKU 类目化 |
| 美国市场适配 | 通用 | 部分场景化 | ✅ 类目场景 + 美国生活方式元素 + 色板 |
| 信任要素 | 无 | 无 | ✅ CRAFT & TRUST（真实摄影感/专业信任） |
| 长度 | 约 800-1500 | 1001-7408（中位 3725，过长） | **1800-2400（全部达标）** |

## 三、V22 提示词结构（每条 9 段）

1. **HEAD** — 生产级终图声明 + 输出规格（1200×1146 / ≤120KB / 8K UHD）
2. **USE（用途声明）** — 告诉 seedream 图用在哪（US PDP 主图/特写/组合/多角度/展开页）+ 点击/转化目标
3. **AUDIENCE（目标人群）** — 类目化美国买家画像（如 US 小批量贴纸买家、婚礼新人、学校）
4. **PRODUCT（产品主体）** — SKU 注入：材料/工艺/规格/卖点（取自 alt_en，ASCII 净化）
5. **SCENE（应用场景）** — 类目化美国生活方式场景（客厅/咖啡桌/店招/教室/婚礼花园）
6. **COLOR PALETTE（色板）** — 类目化美国市场偏好色
7. **VIEW 规格** — HERO 80-85% / DETAIL 85-95% 特写 / VARIETY 多款 / MULTI-ANGLE / SPREAD 中缝
8. **CRAFT & TRUST（信任+CTR）** — 真实摄影感、专业光影、可信供应商质感、情感共鸣
9. **SEO/GEO CONTEXT + NEGATIVE** — GSC 美国真实搜索词注入 + 完整负面清单（无水印/无 AI 名/无奢侈品牌 Logo/无乱码）

## 四、SEO+GEO 优化（基于 GSC 美国真实数据）

注入的美国市场真实搜索词（GSC 2026-08-13 实测）：
- `saddle stitch booklets / booklet printing`（imp 19 最高）
- `small batch label / sticker printing`、`small quantity label printing`（小批量强需求）
- `china catalog printing / catalogue printing china`（中国印刷商定位）
- `removable stickers / repositionable stickers`
- `foil sticker printing`、`security sticker printing`、`custom fluorescent stickers`
- `how to print waterproof stickers`（指南型意图）
- `calendar sizes`、`how big is a standard wall calendar`
- `exercise book printing business`、`adhesive banner printing`

**GEO 逻辑**：生成式引擎（AI Overview/GEO）会解析图片 alt/文件名/周边文本——提示词内嵌真实搜索词 → 生成图与用户查询语义对齐 → 提升被 GEO 引用的概率。文件名用 `zprintpro-<类目>-<卖点>-en.webp`（SEO 友好），alt_en 为 1 句含关键词的英文描述。

## 五、美国市场适配要点（信任/点击/转化）

- **真实 > 完美**：真实摄影感、自然光影、纸纹/油墨可见——美国买家对"假图"高度警惕，真实感直接提升信任
- **生活方式场景**：客厅/咖啡桌/店招/教室/婚礼花园——让买家想象"我的场景"
- **明确主体**：HERO 80-85% 占比、干净留白——移动端缩略图也一眼识别（提升 CTR）
- **工艺特写**：DETAIL 85-95% 微距——纸纹/烫金/UV 质感可见（打消"海外供应商质量"疑虑）
- **负面清单**：无水印/AI 名/奢侈品牌 Logo/名人脸/乱码——规避版权与可信度雷区

## 六、文件与后续

- 交付文件：`F:\zprintpro-nextjs\.hermes\k3-inbox\seedream_prompts_v22_99sku_en.txt`（913KB）
- 配套：`v22_templates.py`（15 类目模板，可复用于调参）
- 后续：V22 Direct API 通道（ARK_API_KEY）到位后，可直接用本 TXT 批量直调 seedream（6-9x 提速）
