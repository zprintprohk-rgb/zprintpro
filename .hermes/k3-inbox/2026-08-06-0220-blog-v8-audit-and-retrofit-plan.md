# 8/6 2:20 Blog v8 合规度审计 + 61 篇 Retrofit 计划

## 触发
K3 8/6 2:20 看 cosmetics v8 截图反馈："版面整洁、间距好、开始印你的护肤品牌包装盒 + 作者内容 明显是 SEO 内容；修复旧 blog 文章和新写的 blog 文章，这些也是要学会的，不单单是结构，还有第三张图的后面的开始印你的护肤品牌包装盒 和作者 内容，都非常好"

## 审计结果 (.hermes/reports/blog-v8-audit-2026-08-06.json)
**62 篇 blog (去重后), 按 15 项 v8 标准 (9 段 + Tailwind + 0 简体 + 长度) 评分**:

| 类别 | 标准 | 数量 | 比例 |
|------|-----|------|-----|
| **v8_ready** | 12+/15 | 1 篇 | 1.6% (cosmetics) |
| **partial** | 8-11/15 | 6 篇 | 9.7% (缺 重點摘要 + 黄_callout + 蓝_CTA) |
| **old_format** | <8/15 | 55 篇 | 88.7% (缺 重點摘要 + 黄_callout + 至少 1 大结构) |

**61/62 篇需 retrofit** (K3 强调范围)。

## v8 模板现状
- `.hermes/template/blog-v8-seo-geo-template.md` (8/5 17:11 拍板, 9 段 + 3 locale 排版 token + Anti-AI-Slop 8 项)
- **已含**: 9 段结构 / 颜色 token / 段编号 / 长度基准 / SKU 内链策略
- **缺**: 
  1. **视觉/排版 token 详细** (字号/行高/段间距, K3 强调要学)
  2. **Retrofit 模式** (vs 新写模式)
  3. **61 篇 retrofit 排期** (vs 原 8 周 60 篇新写排期)

## 行动方案

### A. 立即 (8/6 2:30-3:00) — 更新 v8 模板 + cron prompt + skill
1. **`.hermes/template/blog-v8-seo-geo-template.md` v2**:
   - §10 视觉/排版 token 详细 (H1 字号/行高/段间距, H2/H3 间距, 段落 ≤ 4 行)
   - §11 Retrofit 模式 (vs 新写模式) — diff 最小, 保留原内容, 只加 9 段结构 + Tailwind class
   - §12 61 篇 retrofit 排期 (8/6-8/30 按 category 排, 25 天 ÷ 61 篇 = 2.4 篇/天)

2. **`.hermes/cron-prompts/zprintpro-daily-content-1x7w.md` v8.2**:
   - 任务分两支: 1 篇新写 (按 Pillar/Cluster/Case 排期) + 1 篇 retrofit (按 61 篇优先级)
   - retrofit 优先级: GSC imps × CTR gap > 0.5% (P1 high-impact)
   - 1 commit 1 push 合并 (1 push/day 不破)

3. **`.openclaw-autoclaw/skills/zprintpro-seo-evolve/SKILL.md`** 更新:
   - 加 "blog-retrofit" 子能力
   - 触发条件: 旧 blog v8 评分 < 12/15
   - 模板: 9 段结构 + 视觉 token + retrofit 模式

### B. 8/6 10:15 daily cron 首次双任务
- 新写: packaging-box-custom-guide (Q-A-01 Pillar v8, K3 答 A)
- retrofit: 选 partial 6 篇中 GSC 最高 1 篇 (e.g. apparel-shopping-bag-printing-guide 或 cross-border-ecommerce-shipping-box-guide, GSC 7d 待查)

### C. 8/6-8/30 retrofit 排期
- 8/6-8/12 (Phase A): 6 partial → 100% v8_ready
- 8/13-8/19 (Phase B): 25 篇 old_format 优先 (P0/P1 类目)
- 8/20-8/26 (Phase C): 20 篇 old_format (P1/P2 类目)
- 8/27-8/30 (Phase D): 10 篇 (News / 长尾)
- **8/30 验收**: 62/62 篇 v8_ready (100% 合规)

### D. 不破 push quota
- 1 push/day (K3 §0.6)
- 1 push = 1 new write + 1 retrofit = 1 commit (合并 6 file: 3 locale JSON + blog-posts.ts 兜底 + matrix + 报告)
- retrofit 1 篇 ≈ +1500-3000 chars/3 locale = +5000-10000 chars per push (可控)
- 月度 23 + 25 = 48 push / 500 quota (9.6%) — 安全

## 关键产物
- ✅ `.hermes/reports/blog-v8-audit-2026-08-06.json` (62 篇详细评分)
- 🔄 `.hermes/template/blog-v8-seo-geo-template.md` v2 (待写)
- 🔄 `.hermes/cron-prompts/zprintpro-daily-content-1x7w.md` v8.2 (待写)
- 🔄 `.openclaw-autoclaw/skills/zprintpro-seo-evolve/SKILL.md` 更新 (待写)
- 🔄 `.hermes/industry-keyword-matrix.json` 加 v8_retrofit_needed 字段 (待写)
- 🔄 `.hermes/plan/blog-v8-rollout-2026-08-06-to-08-30.md` 加 retrofit 排期 (待写)

## 立即动手
1. 更新 v8 模板 v2 (§10 视觉 + §11 retrofit + §12 排期)
2. 更新 daily cron prompt v8.2 (双任务)
3. 更新 zprintpro-seo-evolve skill
4. 更新 rollout 排期
5. 更新 matrix
6. 写完一并 commit (1 push, 不破 quota)
