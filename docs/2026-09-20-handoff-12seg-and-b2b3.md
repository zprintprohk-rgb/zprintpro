# 交接活书 · 12 段骨架 / 门禁加固 / B2-B3 内容批次（2026-09-20 定稿）

> **读者**：下一个接手的执行层（deepseek / autoclaw 车道或人手会话），以及 K3 复盘。
> **性质**：活书 = 当前真实状态 + 未完事项 + 可复跑命令。**不是**总结报告。
> **配套技能**：`C:\Users\Administrator\.openclaw-autoclaw\skills\zprintpro-self-evolution-hardening\SKILL.md`（避坑八条 + 能力五件）
> **配套 SSoT**：`docs/2026-09-08-title-rules-and-deep-blog-standard.md`（§0 口径锁定卡 / §3.1 段骨架 / §3.2 Schema / §5.1 门禁命令 / §7 规则翻译层）

---

## 一、当前真实状态（机器可验，勿凭记忆）

| 项 | 值 | 复跑命令 |
|---|---|---|
| 远端 main | `46619a82`（本地已同步，领先 0） | `git fetch origin && git log -1 --format=%h origin/main` |
| 12 段骨架 fails（待清债务） | **33** | `node scripts/guards/blog-quality-12-rules-guard.js --baseline --online` |
| 已接受偏差 | 3（sticker 段 3，含 monitor） | 读 `.hermes/regression-guard/blog-12seg-accepted-deviations.json` |
| bypass 台账 | 16 次旁路 / 16 次留痕 / 0 未留痕 | `node scripts/guards/bypass-audit-guard.js --report` |
| 豁免台账 review | 正常（next 2026-12-19） | `node scripts/guards/cron-prompts-exemption-guard.js` |
| 规则翻译层 | 3 绑定一致 | `node scripts/guards/rule-translation-guard.js` |
| 本次探针 | ALL PASS 29/29 | `bash .hermes/_probe-pb/probe-self-evolution-skill.sh` |

**本次会话净结果**：fails **49 → 33**；strip 内嵌 JSON-LD **8 篇**；FAQ 补写 **3 篇 × 3 locale**；门禁新增/重写 4 个（#14 v3 / #21 / #22 / #23）；线上验收通过（段 12 四条 ja FAIL 自愈、foil 生成区 FAQPage `0→1`、Person 三语字段上线）。

---

## 二、⚠️ 交给你必须先处理的三件事（按优先级）

### P0-1 · `dateModified` 陈旧且与可见日期不一致（**已查出，未修**）
**实测**（`node .hermes/_probe-pb/verify-datemodified-layers.mjs`）：
```
第一层 元数据: dateModified = 2026-09-03      ← 陈旧
第二层 可见  : 最後更新: 2026 年 9 月 4 日     ← 与元数据差 1 天, 站内自相矛盾
第三层 正文  : ✅ 已满足 (FAQ 6 组, 真改内容非伪刷新)
```
**为什么要修**：`dateModified` 是 AI 引擎三层新鲜度验证中**最重的一层**；正文已改而元数据未跟上 ⇒ **拿不到新鲜度信号**，而受影响页正处于 Perplexity 30 天甜蜜点内（半衰期 5.8 周）。
**怎么修**：改 `src/data/blog-posts.ts` 的 meta（`dateModified` / 可见日期），对齐实际修改时间；同步受影响文章（至少 B2/B3 覆盖的 8 篇）。**属数据层改动，需 K3 授权**。

### P0-2 · hk-cost-baseline × 3 补定价 FAQ（**已授权 (a)，主工作量**）
**约束**：事实**零新增**（只取该篇正文的 16 品类 × 99 SKU 价格基准表 + 起订量分布 + 装订指南）；写入前跑「**每个数字必须在正文出现**」断言；五要件（格式 / en 40-80 词·CJK 60-120 字 / 首句 en ≤12 词·CJK ≤21 字 / 自包含 / 5-8 组）；**三语 FAQPage 独立生成**（不共用英语数据）、schema 与可见文本**逐字一致**、`inLanguage` 匹配。
**做法参考**：照抄 B3 三篇的成功路径（见技能 §二.4）——`dump-faq-source.mjs` 取事实源 → 写草稿 → 五要件自检 → 数字断言 → 写入 → 三语结构对齐（`assert-faqpage-structure.mjs`）→ push → 线上 `0→≥1` 验收。
**注意**：该篇**没有内嵌 FAQPage**（实测：`FAQPage: 无` / 正文可解析 FAQ 组数 0）⇒ 事实源是**正文价格表**，不是 JSON-LD。

### P1 · 段 8 `<section>` 可提取性测试（**路径 (a)，等 K3 手动**）
按 K3 尺度：PerplexityBot 平均 ~6 小时抓取、引用半衰期 **5.8 周**、AI 引用更新是**周级** ⇒ 部署后先记**基线快照**，**3-4 周后**复跑对比。不要按小时期望变化。

---

## 三、可复跑的验证命令（交付前必跑）

```bash
# ① 五门童
node scripts/guards/blog-quality-12-rules-guard.js --baseline --online --json   # 段1-12 + 基线对账(自动递减)
node scripts/guards/rule-translation-guard.js                                   # 三处 sha256 绑定
node scripts/guards/cron-prompts-exemption-guard.js                             # 豁免台账 + review 时效
node scripts/guards/bypass-audit-guard.js --since=5                             # 旁路留痕
node scripts/guards/blog-standard-guard.js                                      # Pillar 字数季度目标 + title 当量

# ② 线上断言
node .hermes/_probe-pb/measure-live-faqpage.mjs [--slug=…]        # 三态: DUPLICATE / SINGLE_GENERATED / SINGLE_INLINE_ONLY
node .hermes/_probe-pb/verify-question-consistency.mjs [--slug=…] # 生成区 Question vs 可见正文逐字
node .hermes/_probe-pb/assert-faqpage-structure.mjs              # mainEntity 数组 / name / text
node .hermes/_probe-pb/verify-datemodified-layers.mjs            # 三层新鲜度

# ③ 自进化探针（本活书的裁决器）
bash .hermes/_probe-pb/probe-self-evolution-skill.sh             # ALL PASS 才算交接完成
```

---

## 四、纪律承继（接手后不改写，只追加）

1. **原子提交**：`git commit -F <msgfile> -- <paths...>`（禁先 add 后 commit / `-a` / `-A`）；提交前三问自检。
2. **并发会话期禁用 `--amend`**（amend 前必先 `git log -1` 认 HEAD 归属）。
3. **`--no-verify` 必配 `ZP_BYPASS_REASON`**（唯一入口，理由自动落台账）。
4. **push 前必 `git fetch`**；non-fast-forward 是安全失败模式，**禁 `--force`**（rebase 后重试）。
5. **基线只许递减**；**新增 FAIL 不许塞进基线**；「已接受偏差」走独立台账 + monitor。
6. **门禁报 0 命中 ≠ 线上干净** ⇒ 关键结论必须线上 curl 复核。
7. **单一数据源不可信**：数（双方法复算）/ 条目（先 dump）/ 时间（两源交叉）。
8. **写盘前断言，断言不过即 abort**（strip 三断言 / 文本等价断言 / 数字来源断言）。

---

## 五、已知遗留与风险

| 项 | 状态 | 备注 |
|---|---|---|
| hk-cost-baseline × 3 FAQ | ⏳ 待做（已授权） | 主工作量 |
| `dateModified` 对齐 | ⏳ 待授权 | 见 P0-1 |
| 剩余 fails 33 条 | ⏳ 待分类 | 段分布：段6 案例 8 / 段8 GEO 原子 12 / 段9 FAQ 3 / 段11 内链 4 / 段12 内嵌 15 等；建议下一批按段归类清理 |
| sticker 段 3（三语 40-47%） | ✅ accepted_deviation | monitor：跌破 35% 自动转 FAIL；review 2026-12-19 |
| C 二期 run-context 消费追踪注入 | ⏳ 待做 | 为后续内容操作提供「依据哪版 SSoT / 哪条 lane」归因链 |
| Person `image` 字段 | ⛔ 禁止添加 | K3 明令：禁 AI 头像 / 虚构 persona（合成图可检测，属 E-E-A-T 惩罚行为） |
| 车道空窗 | ⚠️ 曾 18.3h 无 push | 遇此情形先 `fetch` 确认远端，可 fast-forward 则按 K3 授权接管 push |

---

## 六、交接确认（接手人必做）

1. 跑 `bash .hermes/_probe-pb/probe-self-evolution-skill.sh` ⇒ 必须 **ALL PASS**；
2. 跑 §三 的 ①-② 全部命令 ⇒ 记录当前账（与 §一 对比，如有漂移先查再动）；
3. 读技能 §一 避坑八条（**尤其 `LOCATE_BEFORE_PATCH` / `SAFECOMMIT_ATOMIC` / `TIME_READING_UNVERIFIED`**）；
4. 从 §二 P0-1 或 P0-2 起手，**一次只做一件**，做完即 push（"完成一批、push 一批"）。
