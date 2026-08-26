# -*- coding: utf-8 -*-
"""Append §0.15 品牌一致性 P0 + §0.16 残留清理节奏 to MEMORY.md (跨项目 P0 固化)"""
import sys
sys.stdout.reconfigure(encoding='utf-8')

MEMORY_PATH = r'C:\Users\Administrator\.minimax\agents\mavis\memory\MEMORY.md'

APPENDED = r"""

### §0.15 品牌一致性 P0 (2026-08-08 07:12 K3 拍板, 跨项目 P0 固化)

**核心**: 任何项目的前端可见处 (title / OG / schema Organization.name / H1 / meta description) 品牌名必须 locale-aware 统一, 优先于所有 SKU 改字 + 残留清理. 法律名仅限 footer / 条款 / 发票.

**Locale 切换公式** (per K3 8/8 07:12):
- zh-hk → 智印港 (本地品牌, 用户记忆词, 100% CTR baseline)
- ja → ジープリント (per §13.16.1 K3 8/8 02:52 拍板, Z→J 音译 + Print→プリント)
- en → zprintpro (小写, 跟品牌域名一致, SEO 友好)

**三处撕裂反例 (zprintpro 8/8 05:00 deploy 后发现)**:
- ❌ SERP 标题显示 "智印雲" (旧 NAP 法律名), 用户记忆品牌词 "智印港" → CTR 受损
- ❌ schema Organization.name (智印雲) vs 页面 title (智印雲) vs 用户搜索 (智印港) 三方不一致 → 实体消歧失败 → AI 引用风险
- ❌ NAP 法律名 (智印雲) vs 显示品牌 (智印港) 的 locale 切换没做对 (8/7 之前 siteName 一刀切)

**修法 (zprintpro 8/9 1 push 内兑现, per K3 8/8 07:12)**:
```ts
// src/lib/seo.ts — locale-aware siteName
siteName: locale === 'zh-hk' ? '智印港' : (locale === 'ja' ? 'ジープリント' : 'zprintpro')
```
- zh-hk <title> / OG / schema.name 全部统一 "智印港"
- en <title> / OG / schema.name 统一 "zprintpro"
- ja <title> / OG / schema.name 统一 "ジープリント"
- NAP 法律名 "智印雲" 只在 footer / 条款 / 发票保留 (不进入 SERP 渲染)

**判断 SOP** (任何品牌词 / locale 切换 commit 实施前自查):
1. 打开 locale-aware 模板 (src/lib/seo.ts siteName / displayName / getSiteNAP)
2. 跑 curl 8 locale (zh-hk / en / ja / 5 other) 抓 <title> / og:title / JSON-LD Organization.name
3. 比对 3 字段值 vs locale 切换公式, 任一不一致 = FAIL
4. 8 locale 全 PASS 才算 locale 切换完成

**反例 (zprintpro 8/8 05:00 教训)**:
- ❌ 8/7 之前 siteName 走 siteConfig.name 字段 (硬编码 '智印雲'), 不按 locale 切
- ❌ 5 zh-hk 块内 brand 修复命中 imageCaption (用了 title_zh), 但 <title> / OG / schema 仍走 siteConfig.name
- ❌ 840 处智印雲 残留 in longDescription/description/faq/schema, 排 9 月初 = 战略误判 (K3 8/8 07:12 纠偏)

**应用范围**:
- 任何 zprintpro / aitoptools / togthr 多 locale 项目
- 任何"主品牌 + locale 分层 + NAP 法律名"并存架构
- 任何 SERP 标题 / 实体消歧 / AI 引用 优化
- 任何 cron auto / 手动 / 紧急 push 改 src/lib/seo.ts

**实施硬约束**:
- 任何 cron auto-commit 改 src/lib/seo.ts 必跑 8 locale curl 验证 (P0 阻断)
- 任何 brand 修复 commit 必双修: title_zh 段 (imageCaption) + siteName 段 (SERP) + schema 段 (实体)
- 任何 NAP 法律名 vs 显示品牌 混用 = 立即修, 不等
- 品牌一致性 P0 优先于所有 SKU 改字 (per K3 8/8 07:12 战略级)

**配套机制**:
- §0.10 KPI 校准 — 品牌一致性直接影响 branded search CTR + AI 引用
- §0.11 资源分配 — locale 切换 1 push 内 4-5 处改字 (1 个 locale 切换 P0 > 10 个 SKU 改字 P2)
- §0.12 转化侧 — 品牌一致性提升 SERP CTR → 询盘 + 转化率
- §0.13 K3 战略拍板 — locale 切换是 4 字必拍之一 (per K3 8/8 04:35 + 07:12 增补)

**教训固化源头**:
- zprintpro 8/8 05:00 deploy 后 8/8 07:12 K3 战略纠偏
- 跨项目: 任何多 locale 品牌分层项目必须 locale-aware siteName 切换, 不硬编码

### §0.16 残留清理节奏 (2026-08-08 07:12 K3 拍板, 跨项目 P0 固化)

**核心**: 品牌 / 术语残留禁止排到"下月"或"9 月初", 按 **~170 处/天 × 3 天清完**节奏, 前端 0 残留是双周复盘硬指标.

**节奏模板 (zprintpro 8/13 / 8/15 / 8/17, per K3 8/8 07:12 拍板)**:
| 日期 | 残留清理批次 | 范围 | 校验 |
|------|------------|------|------|
| 8/13 | longDescription 前 200 处 | 高流量 PDP 优先 (zh-hk 3 月 13759 imps 命中 SKU) | grep + §0.7 smoke |
| 8/15 | description + faq 300 处 | 中流量 SKU + 跨 8 locale | pre-commit 简体字守门 |
| 8/17 | schema 剩余 340 处 | JSON-LD Organization / Product / FAQPage 全 schema | JSON-LD validate |
| 8/18 | 全量 grep 验收 = 0 (除 k3-inbox 历史引用) | src/ + public/ + AGENTS.md + 4 SSoT 报告允许 | grep 0 残留 + 复盘硬指标 |

**反例 (zprintpro 8/8 05:00 M3 排错)**:
- ❌ 840 处智印雲 残留排 "9 月初" = 战略误判 (K3 8/8 07:12 纠偏)
- ❌ "量大怕出错" 不能作为残留拖延理由
- ❌ 残留每多 1 天, branded search + 实体一致性 + AI 引用 多受损 1 天
- ❌ §0.11 资源分配 P0 抓强信号 vs P1 本地实体建设, 残留清理是 P0 抓强的前提 (不一致前端 = 抓强失效)

**判断 SOP** (任何残留清理 commit 实施前自查):
1. 跑 `grep -r "旧 brand/术语" src/ public/ AGENTS.md` 算残留数
2. 残留 ≥ 100 处 → 按 ~170/天 3 天清完, 不分散到 9 月
3. 每批 commit 后跑 8 locale curl 验证 + grep 复检
4. 3 批全完成 = 前端 0 残留, 写入复盘硬指标

**应用范围**:
- 任何 zprintpro / aitoptools / togthr 跨项目品牌 / 术语残留
- 任何 NAP 法律名 vs 显示品牌 混用
- 任何 181 → 198 / 智印雲 → 智印港 / 智印印港 → 智印港 类型全局替换
- 任何 cron auto / 手动 / 紧急 push 改 src/data/products.ts 大段

**实施硬约束**:
- 残留清理必走 Python 脚本 (regex + line-based 找块), 不走 Edit/Write (per MEMORY "Edit/Write 大段 JSON 内容" §7)
- 每批 commit 前必跑 pre-commit 3 步 (encoding / 简体字 / i18n)
- 3 批 8/13 / 8/15 / 8/17 必按节奏, 不延期
- 8/18 全量 grep 验收 = 0 是 8/21 复盘硬指标, 不达标 = 扣 KPI

**配套机制**:
- §0.11 资源分配 — 残留清理 P0, 优先于 SKU 改字 P2
- §0.14 配额 — 残留清理 3 批 × 1 push = 3 push, 留 2 push buffer 给 8/9 locale 切换 + 紧急
- §0.15 品牌一致性 — 残留清理是 §0.15 的执行层
- §0.13 K3 战略拍板 — 残留清理节奏是 4 字 + ①②③ 必拍

**教训固化源头**:
- zprintpro 8/8 07:12 K3 战略纠偏 840 残留 "9 月初" → "Week 2 3 天"
- 跨项目: 任何残留清理禁止"量大拖延", 必须按 ~170/天 节奏

"""

with open(MEMORY_PATH, 'r', encoding='utf-8') as f:
    current = f.read()

if '§0.15 品牌一致性 P0' in current and '§0.16 残留清理节奏' in current:
    print('SKIP: §0.15/0.16 already in MEMORY.md')
    sys.exit(0)

with open(MEMORY_PATH, 'a', encoding='utf-8') as f:
    f.write(APPENDED)

# Verify
import os
size = os.path.getsize(MEMORY_PATH)
print(f'OK: §0.15 + §0.16 appended, MEMORY.md now {size/1024:.1f} KB')
