# V23.2 三语生图提示词 — 完成报告

日期: 2026-08-23
任务: user 拍板 3 方向 — ①学 V20.1→V20.9→V21 进化 (场景植入/虚构客户信息/灯光控制) ②zh-hk 坚持爆炸贴卖点 + JA 信息带卖点 ③操作噪音出 prompt (豆包分析: 火山方舟 API = 裸模型, 优化要自己做)

## 交付物 (3 个 TXT,未改 products.ts 接线,未 commit/push)

| 文件 | SKU | Prompts | META |
|------|-----|---------|------|
| `seedream/v23.2-prompts-en.txt` (838 KB) | 99 | 396 | 99 |
| `seedream/v23.2-prompts-zh-hk.txt` (744 KB) | 99 | 396 | 99 |
| `seedream/v23.2-prompts-ja.txt` (921 KB) | 99 | 396 | 99 |

生成器: `.hermes/_v231_generator.py` (脚本化,可重跑)

## 历史进化学习成果 (SKILL_seedream_v20.md + V20.6 样例实证)

| 进化点 | 来源版本 | V23.2 落地 |
|--------|---------|-----------|
| 14 虚构公司矩阵 (产品上印虚构品牌=代入感) | V17→V19 (K3 8/14 19:10) | ✅ 16 类目 × 3 locale 虚构品牌表, 类目内 SKU %4 轮转 |
| 真实可读受控文字 (指定确切文字防乱码) | V20.4 (K3 8/15 04:13) | ✅ 产品上印「品牌名+标語」确切文字, negative 禁"除指定外任何文字" |
| 类目差异化场景库 | V19 | ✅ 沿用 V23.1 16 类目 × 3 locale 场景 |
| 灯光控制 (warm golden hour/光源方向/反射) | V20 样例实证 | ✅ LIGHTING 表 16 类目 × 3 locale |
| 明亮鲜艳不暗沉 | K3 14:35 强约束 | ✅ 每 prompt 带"bright vivid and not dim / 明亮鮮明不暗沉" |
| 爆炸贴卖点 | 2026-04 旧版三语爆炸贴 → V16 禁 → user 8/23 恢复 zh-hk | ✅ zh-hk HERO 右上爆炸贴 (深红 #DC2626, 非价格卖点) |
| VARIETY 人手互动 / 场景去重 | V23.1 增强 2/3 | ✅ 保留 |
| anti-draft 前缀 | V20.9 | ❌ 移除 (那是豆包 UI 2 候选的采样问题, 方舟 API 无此行为) |

## 裸模型原则落地 (豆包分析 8/23)

豆包免费版 = Seedream + 自动优化流水线 (分辨率映射/提示词优化/水印关闭/后处理/模型路由); 火山方舟 API = 裸模型。
- ✅ 剔出 prompt 正文: 版本号 / "Seedream 5.0 lite Direct API" / watermark off / ≤120KB WebP / WHERE USED / AUDIENCE / 1200x1200 输出声明 — 验证 0 残留
- ✅ 操作参数移到文件头: API size=2048x2048 (1:1) → post_v23_resize.py 后处理 1200×1200 ≤120KB WebP, watermark=false 是 API 参数
- ✅ prompt 结构视觉前置 (语序即权重): 画幅+画质 → 构图占比 → 产品+客户印刷 → 场景+灯光 → 风格 → 负面

## user 8/23 拍板项

- ✅ zh-hk HERO 爆炸贴: 右上角单一爆炸贴, 主標+副標 2-6 字短词防乱码 (免費打樣/免費設計/72小時出貨/免刀模費 等 16 类目差异化), **不含价格** (价格烙进图=维护炸弹)
- ✅ JA HERO 細信息带: 左上角深蓝底白字横带, 日文卖点 (無料サンプル/短納期対応/小ロット対応 等), 无爆炸贴 (日本市场干净美学)
- ✅ EN HERO 无 badge: US Amazon 干净主图惯例 (建议, K3 可推翻)
- ✅ 爆炸贴/信息带仅 HERO: DETAIL/VARIETY/MULTI-ANGLE 验证 0 出现
- ✅ 负面清单分化: zh-hk HERO 允许唯一指定爆炸贴 / JA HERO 允许唯一信息带 / 其他视图全禁

## 验证结果 (全 PASS)

- 计数: 3 文件 × 99 SKU × 4 视图 = 396 prompts + 99 META ✅
- 操作噪音 (PRODUCTION-READY/WHERE USED/AUDIENCE/watermark/120KB/Direct API/版本号): 0 ✅
- 虚构客户文字嵌入: 396/396 三语全 ✅ (印刷文字语言=目标市场: EN 英文 / zh-hk 繁体 / JA 日文)
- 销售话术正文泄漏: 0 (badge/信息带内卖点为刻意设计, 剔除后复查 0) ✅
- 灯光控制: 297/396 (MULTI-ANGLE 79 用场景自带影棚灯光) ✅
- BC 贺卡命名归位 / PKG-014 串类目修复 / 2 新 SKU: 沿用 V23.1 修复 ✅

## 试跑建议

抽 PC-001 + PKG-014 + FL-003 (验证传单街上场景+爆炸贴) 各 4 视图 × 3 locale = 36 张。校验:
1. 虚构品牌名+标語清晰可读无乱码 (200% 放大, zh-hk 繁体笔画 / JA 假名重点查)
2. zh-hk 爆炸贴文字端正无错字, 画面唯一
3. JA 信息带日文准确, 无爆炸贴
4. 灯光方向符合 LIGHTING 表 (如传单=暖黄金时段窗光)
5. 无水印 / 无额外幻觉文字
