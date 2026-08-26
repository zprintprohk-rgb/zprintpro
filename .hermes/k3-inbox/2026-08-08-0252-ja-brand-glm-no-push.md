# K3 8/8 02:52 拍板 4 SSoT 同步 (ja 品牌 + AutoGLM + 8/9 批次, 0 push)

**commit**: 4 件改动全部落 working tree, **0 push** (per K3 §0.1 8/8 攒批策略 + 8/9 daily cron amend 合并 1 push)
**改动文件**: 4 个 (.hermes/ + AGENTS.md, 全部不需立即 push)
**8/9 期望 1 push**: src/lib/seo.ts Organization sameAs 改动 + retrofit cross-border commit 合并 1 effective

## K3 5 段分析 + 4 SSoT 落地

### K3 5 段分析
1. **外链自动化分级** (4 类型): 行业目录 ✅ / 清单文 outreach ✅ / Guest post 🟡 / 论坛 PBN ⛔
2. **智印港为什么香港见效快** (4 因子): 本地实体信号 / 品牌记忆度 / 口语=搜索词 / 实体一致性
3. **智印港公式复制日本**: ジープリント + sameAs + 30 目录 + 品牌词埋点
4. **8/9-8/12 攒批执行表** (外链不占 push, 跟每日 1 push 并行)
5. **§0.9 增补 + 3 拍板**: ①日文品牌 ②AutoGLM 启动 ③8/9 批次

### 4 SSoT 改动 (Mavis 自主 "按最优执行")

| # | 改动 | 文件 | 大小变化 |
|---|------|------|----------|
| 1 | matrix ja_brand 段 (ジープリント + 30 目录 + branded search 监测 + schema enhancement) | industry-keyword-matrix.json | 233251 → 236547 (+3296) |
| 2 | cron prompt v8.4 → v8.5 (ja 品牌 + 8/9 批次 + AutoGLM + 30 目录 + §0.9 增补) | zprintpro-daily-content-1x7w.md | 21596 → ~27500 (+~5900) |
| 3 | AGENTS.md §13.16.1 ja 品牌 "ジープリント" 公式 (4 因子 + 实施 5 步 + 禁忌) | AGENTS.md | +~1500 |
| 4 | review 模板 §5.5/5.6/5.7 增补 (branded search + Org sameAs + 外链目录进度) | review-8-12-template.md | ~7700 → ~9300 (+~1600) |

## 拍板建议 (Mavis "按最优执行" 自主拍)

### ① 日文品牌称呼 → **ジープリント (J-Print)** ✅
**理由 (4 维度)**:
- **音译简洁**: Z → J (日语无 Z, 借 J 接近) + Print → プリント = 3 假名
- **品牌延续**: 跟 en "ZprintPro" 品牌同源, NAP 一致性跟"智印港"公式同源
- **SEO 流量**: "プリント" 是日语印刷核心搜索词, 嵌入流量自然
- **不破 §13.13 鐵律**: primary 仍 ZprintPro, alternateName ジープリント (跟"智印港"公式一致)

### ② AutoGLM 启动 → **OK 默认** ✅
**8/10 起每天 10 条**:
- 30 目录目标: 印刷/POD 7 + 本地/创业 7 + 行业 5 + SaaS 聚合 3 = 22 起步 (8 备选)
- 半自动: agent 填 + K3 点 (ToS 合规, 整批 bot 风险)
- **首周 20-30 条** = 日本实体存在感基线

### ③ 8/9 批次 → **OK 默认** ✅
**5 增补项**:
1. **llms.txt** 已有, 8/9 增补 ja 品牌词 + 日文 sameAs
2. **robots.txt** 12/12 AI bots allowed, 8/9 增补 5 个新 AI bots (DeepSeek Bot / Kimi / Mistral AI / Cohere / Perplexity-User)
3. **IndexNow key** 待 K3 8/8 09:00 提供, 落 scripts/submit-indexnow.py 跑 99 URLs
4. **FAQPage schema** 已有, 8/9 验证 5/5 PASS + 增补 cross-border retrofit
5. **Organization sameAs** 改 src/lib/seo.ts (8/9 daily cron amend 合并 1 push)

## 8/8-8/9 推送计划 (per §0.1 攒批 + 8/9 amend 合并 1 push)

| 时间 | 任务 | 攒批关系 | 状态 |
|------|------|----------|------|
| 8/8 03:00 (现在) | 4 SSoT 落 working tree | 0 push (per §0.6 cron auto-commit 范围 .hermes/ + AGENTS.md only) | ✅ DONE |
| 8/8 09:00 | K3 起来跑 3 设备端到端 + Supabase dashboard 查 + formsubmit 激活 + X/LinkedIn/IndexNow key 提供 | K3 跑 | ⏸ 等 K3 |
| 8/8 09:55 | 精准提醒触发 (cron once 7e2cc0ba, §0.8 修复后) | 校验 SSoT v8.4 + 准备 amend | ⏸ |
| 8/8 10:15 | daily cron 触发 retrofit cross-border commit (按 SSoT v8.4 跑, 含 §0.7 production smoke) | commit #1 | ⏸ |
| 8/8 10:20 | amend AGENTS.md 198 + push | **1 effective push** (per 3A) | ⏸ |
| 8/9 09:10 | daily cron 触发 retrofit cross-border-ecommerce-shipping-box-guide commit | commit #2 | ⏸ |
| 8/9 10:30 | amend src/lib/seo.ts Organization sameAs + push (含 8/9 批次 5 项 llms.txt + robots + IndexNow + FAQPage) | **1 effective push** (per 3A) | ⏸ |
| 8/10 09:00 | K3 起来 AutoGLM 跑日本目录填表 (每天 10 条, K3 点提交) | 站外, 不占 push | ⏸ |
| 8/11 09:10 | daily cron 触发 cmyk-guide retrofit | commit #3 | ⏸ |
| 8/12 09:10 | daily cron 触发 paper-materials retrofit | commit #4 | ⏸ |
| 8/12 22:00 | daily cron auto 跑 review-8-12-template.md 套模板, 落 8/12-review-final.md | 0 push (cron 内部) | ⏸ |

## §0.9 增补 (K3 8/8 02:52 拍板, MEMORY.md 待写)

**外链注册自动化边界**:
- ✅ 可批量: 行业目录/本地商会/创业名录 → AutoGLM 填表, K3 点提交+验证
- ✅ 可自动: 清单文发现 + outreach 起草 (发送归 K3)
- 🟡 半自动: Guest post / 投稿 → AutoGLM 找征稿页 + 起草大纲, K3 改写发送
- ⛔ 禁止: 论坛签名档/评论留链/Web2.0/PBN/自动换链 (Penguin + 封号)

**实体一致性硬约束**:
- 日文品牌名一旦定 (ジープリント), 全站+目录+社媒+schema 4 处统一, 不许漂移
- 量化目标: 首周 20-30 条合规目录 = 日本实体存在感基线

**守住一条**: agent 填表, 最终提交按钮和邮箱验证由 K3 点 (ToS 合规, 整批 bot 风险)

## 报告路径

本报告: `.hermes/k3-inbox/2026-08-08-0252-ja-brand-glm-no-push.md`

## 升级 K3 1 段

4 SSoT 落 working tree, 0 push, 等 8/9 daily cron amend 合并 1 push. K3 8/8 02:52 3 拍板 Mavis "按最优执行" 自主: ① ジープリント (理由 4 维度), ② 8/10 起 AutoGLM 每天 10 条, ③ 8/9 批次 5 增补 (llms.txt + robots + IndexNow + FAQPage + Org sameAs). §0.9 外链自动化边界 增补 (✅ / ✅ / 🟡 / ⛔ 4 分级 + 实体一致性硬约束). 8/8 09:00 K3 起来确认 + 跑 3 设备端到端 + 提供 X/LinkedIn/IndexNow key, 8/9 daily cron 一并 amend 合并.
