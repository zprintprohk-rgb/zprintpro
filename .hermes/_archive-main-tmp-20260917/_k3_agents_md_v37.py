#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
V3.7 文档修订: AGENTS.md 加 §13.4 v3 + §13.5 v2
K3 14:16 拍板: 博客 §13.4 v2 → v3 修订 + SKU §13.5 → v2 修订
"""
from pathlib import Path

AGENTS = Path(r"F:\zprintpro-nextjs\AGENTS.md")
content = AGENTS.read_text(encoding='utf-8')

# 在 /autoclaw:feishu-lark-skill-guidance 注释前插入两个章节
# 注意: 注释块末尾 `<!-- /autoclaw:feishu-lark-skill-guidance -->` 是文件最末
new_sections = """## 13.4 Blog 内容标准 v3 (2026-08-20 V3.7 拍板, K3 14:16)

**核心升级**: §13.4 v2 已落后实战 (喜帖价格指南 7423 字, 实战范围 > v2 800-1000 字下限). v3 修订 6 条:

1. **字数分级**:
   - 行业快讯: zh-hk 800-1000 字 / en 350-450 词 / ja 250-350 词
   - 商业指南 (价格/选购/对比类, **抢排名主力**): zh-hk **1500-2500 字** / en **600-900 词** / ja 400-600 词
   - 首页级内容深度 = 排名第 5 名入场券 (5 个关键词首页 = 25 imps × 1.5% CTR × 1.5% 询盘率 = 0.56 询盘/天, $2,150/月)
2. **GEO 硬条款**:
   - 答案前置 (第一段先给结论, 再展开论据)
   - 疑问句 H2 (PAA / People Also Ask 命中)
   - 数字列表 (AIO 引用结构, +120% 点击的弹药)
3. **`targetKeywords` 字段 (BlogPostMeta frontmatter 必填)**:
   ```typescript
   targetKeywords?: {
     primary: string;       // 1 主词
     secondary: string[];    // 3-5 长尾
   };
   ```
4. **内链 ≥5** (同类目 PDP + 类目页 + 关联 blog, 三角互链)
5. **7 天 GSC 收录检查**: 上线 7d 后 GSC 仍无收录 = 验收 FAIL, 回炉改写
6. **图片条款松绑**: 允许引用已上线产品图 (`public/images/products/...`), 不强制每篇博客配 hero 图 (婚礼是视觉决策品类, 但纯文字商业指南仍可)

**反例 (v2 时代 24 条博客 excerpt 硬塞 "in Hong Kong"**):
- ❌ `zh-hk: 香港包裝盒訂製...` → `en: Custom Packaging Box Guide: ... in Hong Kong` → `ja: 香港パッケージ箱...`
- ✅ v3 后 en/ja 不硬塞 supplier origin, 改成本地化卖点 (size/paper/design/material)

**应用范围**: 任何新 blog 上线; 任何旧 blog 回炉; 任何 100 词追踪池词条对应的内容页.

---

## 13.5 SKU 内容标准 v2 (2026-08-20 V3.7 拍板, K3 14:16)

**核心升级**: §13.5 v1 缺验收硬条款, 12 婚礼 SKU 实际是"半成品" (无图 / 描述重复 / specs 缺字段). v2 修订 6 条:

1. **无图不得标记完成** (8/19 22 webp 已落盘 + 27 prompts 待跑)
2. **描述唯一性相似度 <70%** (8/19 重复块教训固化, 跑 cosine 相似度查重)
3. **`specs` 4 字段必填**: 材质 / 尺寸 / 工艺 / MOQ (缺一标 FAIL)
4. **价格三件套**: basePrice + priceRange + 跨 locale 显示 (USD/HKD/JPY, 不串 locale)
5. **`targetKeywords` 登记** (跟 blog 同字段, 1 主词 + 3-5 长尾)
6. **新类目首发 ≤6 扩张凭 GSC 证据**: 新类目首 ≤6 个 SKU 上线后, 必须 GSC 验证有 imps 才允许扩张第 7 个

**反例 (v1 时代 12 婚礼 SKU 教训)**:
- ❌ 描述同质化 (8/19 实际发现 4 块文字几乎一致)
- ❌ specs 字段不统一 (有的 3 字段, 有的 6 字段)
- ❌ targetKeywords 未登记 → GSC 100 词追踪池查不到对应 SKU
- ✅ v2 后每个 SKU 跑查重 + 字段补齐 + targetKeywords 登记

**应用范围**: 任何新 SKU 上线; 任何存量 SKU 优化; 任何季节性 SKU 上线 (R5 9/15 三旺季共振).

**跟 §13.4 v3 配套**: Blog 命中 100 词 → PDP 承接, PDP 必须有 targetKeywords 跟 Blog 对齐 (Blog `primary: 喜帖價格` ↔ PDP `primary: 喜帖印刷` 同语义, 三角锚定).

---

"""

# 在 /autoclaw:feishu-lark-skill-guidance 注释块前插入
old_marker = "<!-- autoclaw:feishu-lark-skill-guidance -->"
new_content = content.replace(old_marker, new_sections + old_marker, 1)
assert new_content != content, "Marker not found"

AGENTS.write_text(new_content, encoding='utf-8')
print(f"OK: AGENTS.md ({len(new_content)} chars, +{len(new_content) - len(content)} chars)")
print("  插入 §13.4 v3 (6 条 Blog 内容标准)")
print("  插入 §13.5 v2 (6 条 SKU 内容标准)")
