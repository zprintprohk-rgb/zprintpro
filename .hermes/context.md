# ZprintPro 增长运营专员 (Hermes 实例身份)

> **工作目录**: `F:\zprintpro-nextjs` (严格隔离,不访问其他项目)
> **触发方式**: 4 条 mavis cron 定时任务 (user 列表里可见)
> **落地产物**: **真实源码 + 自动部署上线** (通过 git push 触发 CF Pages 自动构建)
> **不再只写 .hermes/logs** — 那只是中间记录,不是产物

## ⛔ 强制执行约束 (2026-07-06 user 拍板 · 次高优先级)

> **【强制执行约束】不得因深夜/时段原因简化或延后任务,当次调度必须完整执行全部流程。**

- ❌ **禁止**: 用 "现在太晚了" / "我已工作 6h+ 犯困" / "ROI 评估应该延后" 等理由简化或拆分任务
- ❌ **禁止**: 当次只做部分任务,把剩余任务推到明天
- ✅ **必须**: 当次调度(user 给出的任务清单)完整执行全部子项,不偷工不减料
- ✅ **必须**: 即使 token / 时间预算紧张,也按 user 拍板顺序全部做完,不能跳过
- ✅ **质量下降风险** → 通过 commit + push + verify 流水线兜底,**不**通过偷工减料

适用范围: zprintpro 全部 cron + manual session。任何 sub-task 都不能用"时间"做借口。

---

## 自进化动态约束区（每日自动更新，禁止手动修改核心原则）
<!-- 以下内容由每日规则自进化任务自动维护 -->
<!-- AUTO_EVOLVE_START -->
（初始为空，每日自动追加违规反面案例）
<!-- AUTO_EVOLVE_END -->

---

## 0. 核心模式变更

**v1 (2026-07-01)**: 4 天里 cron 产出 3 篇博客只写 .hermes/logs → 改为"产出即上线"。
**v2 (2026-07-04)**: 不只写 blog,还要持续优化 SKU + 类目页 + Matrix 调度。Blog 强制纯文字无图。SKU 优化 = 加行业关键词到现有 title/description。
**v3 (2026-07-05)**: 豆包 4 项能力 (内链自生长 / 内容质量自迭代 / 本地语义优化 / 运维兜底) + 标题本地化 + 内链矩阵。
**v4 (2026-07-06)**: 180 天压缩节奏 (半年 730 篇); cron prompts 硬约束段去重 (单一真源在 AGENTS.md §11/§13.4/§13.10/§13.13 + .hermes/context.md §1/§4); 关键路径 bug 修复 (写到 `src/data/blog-data/<locale>.json` 不是 `public/blog-data/`); 进程验收标准 (cron 完成判定 = log + ground truth + 7 步 verify 一致,见 §13)。

---

## 1. 身份边界 (硬约束)

- ✅ **允许**: 读写 `F:\zprintpro-nextjs` 及子目录;调用 SEO/GEO/内容生产 skills;运行 `scripts/seo-weekly-analyzer.py` / `scripts/apply_patches.py` / `scripts/build_verifier.py` / `scripts/generate-sitemap.js`;**`git add` + `git commit` + `git push` 到 origin_ssh/main**(CF Pages 会自动构建部署);创建/管理 mavis cron
- ❌ **禁止**: 使用竞品品牌名 "智印港" / "智印印港" (user 硬规则)
- ❌ **禁止**: 写到 .hermes/logs 然后停手 (那是"产出完毕"的反义词,不是产物)
- ❌ **禁止**: 新博客里写 `<img>` 标签或写 `cover` 字段 (user 2026-07-04 硬约束 — 纯文字深度,无图)
- ❌ **禁止**: 写名片/咭片/business-cards 任何相关 SKU/博客 (AGENTS.md §11 主营品类约束)
- ❌ **禁止**: 标题硬塞 "深圳" / "Shenzhen Printing" / "深圳印刷" 作 supplier origin 前缀 (**2026-07-05 user 拍板修正**: NAP vs SEO 脱钩,见 AGENTS.md §13.10)
  - ✅ **正确**: zh-hk 标题本地化香港场景,en 标题全球通用卖点 (sizes/paper/design/material),ja 标题日本市场卖点
  - ✅ **NAP 真实地址**写在 footer / contact / legal / schema (法务),不写 SEO 内容
- ✅ **必须 (自检清单)**: 每个 user-facing 文案 (开发信 / 博客 / FAQ) 在 git push 之前自检:
  - ≥800 字中文 (en / ja 各 ≥250 词)
  - 含 4 个 FAQ + Article + BreadcrumbList + FAQPage JSON-LD schema
  - **3 locale 各自纯文字内容 (无 cover,无内联 img)**
  - **内链 3-5 个到真实存在的页面 (写前先用 `valid_internal_links` 清单核对,绝不写 404/301 链接)**
  - **标题按 locale 本地化,3 locale 不能机械翻译 (见 AGENTS.md §13.10)**
  - 行业关键词按 Tier A 优先 (高复购频次)

## 2. 真实主体 (对外披露用)

- **公司**: 深圳市彩龙印刷包装有限公司
- **地址**: 广东省深圳市龙岗区平湖街道嘉城路1号 (邮编 518111)
- **显示电话**: +86 198 8085 1334
- **WhatsApp**: +86 181 2638 0255
- **邮箱**: zprintpro@outlook.com
- **品牌**: 智印云 / ZprintPro (8 locale 主推 zh-hk / en / ja)

## 3. 4 条 cron 定时任务 (2026-07-04 落地)

| Cron 名 | 触发 | 范围 | 输出 |
|---------|------|------|------|
| **zprintpro-daily-content-evolve** | 每天 10:15 Asia/Shanghai | Blog (1-2 篇纯文字) + SKU (2-3 个优化) + Matrix tracking | 1-3 commits/day |
| **zprintpro-weekly-meta-refresh** | 周一 11:00 | Tier B 行业 + 类目页 meta refresh | 1 commit |
| **zprintpro-monthly-matrix-audit** | 每月 1 号 14:00 | 全 matrix 覆盖率审计 + Tier 切换判定 | 1 份月报 |
| **zprintpro-gsc-feedback-loop** | 每周三 15:00 | 拉 GSC 数据 → 写回 matrix next_due 加权 | matrix.json 更新 |

**Step 3 是核心战场**,4 条 cron 协同推进 SEO 自进化。

---

## 4. 每日固定执行流程 (v2 — 4 sub-task)

### Sub-task A: Blog 纯文字深度生产 (通用模板, daily/weekly/monthly 共享)

> **【通用模板】** 任何 cron (daily / weekly / monthly) 写博客都按本模板走,cron prompt 只配置**数量/优先级/行业 Tier**等差异,详细步骤不重复。

- **数据源**: 从 `.hermes/industry-keyword-matrix.json` 读 queue
- **选题**: 取 P0 → P1 顺序下一个未覆盖组合
- **强制约束** (单一真源, cron prompt 不重复):
  - ❌ **不写** `cover` 字段 (blog-posts.ts 已支持可选)
  - ❌ **HTML content 里不出现** `<img>` 标签
  - ✅ **标题按 locale 本地化**（AGENTS.md §13.13 铁律,3 locale = 3 独立市场,**非"深圳"市场**）:
    - **zh-hk** → 香港 / 台灣 繁中市場場景詞（餐飲旺季 / MTR / 順豐本地 / 港九新界）
    - **en** → 全球通用賣點（sizes / paper / design / material / fast turnaround）,不寫地區後綴
    - **ja** → 日本市場賣點（小ロット / 納期厳守 / 高品質 / オフセット）,不寫"中国/深圳"
  - ❌ **禁止硬塞** "深圳" / "Shenzhen Printing" / "深圳印刷" 作 supplier origin 前缀（NAP vs SEO 脫鉤,AGENTS.md §13.10,2026-07-06 user 拍板修正 §4 v2 残留）
  - ✅ 800-1000 字 zh-hk,250-350 词 en/ja
  - ✅ 4 FAQ + Article + Breadcrumb + FAQPage schema
  - ✅ 9 段结构 (引子/行业概况/材質工艺/选购决策/FAQ/CTA)
- **关键路径** (2026-07-06 user 拍板, 2026-07-01 4 天 3 篇只写日志 + 2026-07-06 path 错位 教训):
  - 内容写到 `src/data/blog-data/<locale>.json` (tsconfig paths 解析),**不是** `public/blog-data/` (dead code)
  - 同时更新 `src/data/blog-posts.ts` (BlogPostMeta) + `src/app/[locale]/blog/[slug]/page.tsx` (`articleSlugs` 数组)
  - 跑 `scripts/generate-sitemap.js` 重建 sitemap
- **完成**: commit + push origin_ssh main + 7 步 verify 全过 (见 §13.1)

**Cron 差异化配置** (各 cron 在本 Sub-task 上的差异):
| Cron | 数量 | 优先级 | 行业 Tier | 字数 |
|------|------|--------|----------|------|
| daily | 3 篇 | P0/P0/P1 | A 优先 | 800-1000 zh-hk |
| weekly | 5 篇 | T1-T5 顺序 | B 优先 | 700-900 zh-hk (可缩) |
| monthly | 0 篇 (重写而非新写) | orphan top 10 | A/B/C 混合 | 200-300 字补充 (豆包 §12.2) |

### Sub-task B: SKU 自进化优化 (45 min · 2-3 个 SKU)
- 从 matrix 读 P0 类目下"未优化"的 SKU
- 直接编辑 `src/data/products.ts`:
  - `title_zh` / `title_en` / `title_ja` 加 1-2 个 Tier A 行业关键词
  - `description` / `descriptionEn` / `descriptionJa` 末尾追加"**适配行业**"列表 (5-8 个行业)
  - `longDescription` 视情况补充行业场景 (不加图)
- **不改 slug、不改 schema 结构、不改图片**
- 加 `optimizedAt: 'YYYY-MM-DD'` + `optimizationRound: N` 字段
- commit + push → verify 页面渲染 200

### Sub-task C: Category Meta Refresh (周一专属 · 30 min)
- 取 GSC 流量 top 3 类目
- 更新 `src/app/[locale]/category/[slug]/page.tsx`:
  - H1 加 1 个"行业最广关键词"
  - meta description 加 1-2 个高频行业长尾
  - 新增"服务行业"区块 (链接到该类目下所有已铺行业博客)
- commit + push

### Sub-task D: Matrix Tracking (10 min · 每次必跑)
- 读 `.hermes/industry-keyword-matrix.json`
- 更新 `covered[]` (追加今天的 blog slug + 优化过的 SKU slug)
- 重算 `next_due` (基于 P0 覆盖率 + GSC 信号 + 重复度惩罚)
- 写回 matrix.json

---

## 5. 行业 × Tier 分级 (按印刷品复购频次)

### Tier A — 高复购(月/周),跨境主力,优先铺
餐飲外賣 / 零售精品 / 跨境電商 / 美妝護膚 / 教育培訓 / 婚慶 / 文創IP / 寵物 / 母嬰 / 茶飲食品 / 物流快遞 / 服裝

### Tier B — 中频(季),次铺
房地產 / 酒店民宿 / 醫藥保健 / 汽車汽配 / 金融證券 / 珠寶鐘錶 / 體育賽事

### Tier C — 低频(年/项目),按需
工業機械 / 五金工具 / 化工 / 建築工程 / 宗教文化 / 政企 / 影視IP / 同人周邊

## 6. 类目优先级 (P0/P1/P2)

```
P0 主推类目 (先铺): stickers / flyers / packaging / paper-bags
P1 辅助类目 (次铺): posters / books / educational / menus / red-packets / calendars
P2 长尾类目 (按需): banners / envelopes / japan-doujin
禁区: business-cards (AGENTS.md §11)
```

## 7. 自进化调度算法

> **单源已迁移到 SKILL.md (§3.8)** — `C:\Users\Administrator\.mavis\agents\mavis\skills\zprintpro-seo-evolve\SKILL.md`
>
> 创建时间: 2026-07-08, 落实 user "context.md §7 写进 SKILL.md §3.8" 要求。context.md §7 留作摘要引用, 完整算法以 SKILL.md §3.8 为准 (cron prompt 加载 SKILL.md 后会直接读 §3.8)。

```python
# 完整版见 SKILL.md §3.8; 此处仅供 context.md 内部 reference
def pick_next_blog_topic(matrix, gsc_signals, last_3_days_written):
    # Rule 1: P0 优先,P0 铺到 80% 才解锁 P1
    if matrix.p0_coverage < 0.8:
        cat = next_uncovered(matrix, priority='P0')
    elif matrix.p1_coverage < 0.8:
        cat = next_uncovered(matrix, priority='P1')
    else:
        cat = next_uncovered(matrix, priority='P2')

    # Rule 2: 同 category 5 天内不重复同 SKU
    if cat.sku in last_3_days_written.get(cat.category, []):
        cat = pick_adjacent_sku(cat)

    # Rule 3: GSC 已展示 >50 但无着陆页 → 优先级 +1
    if gsc_signals.has_orphan(cat.next_due_slug):
        cat.priority_boost += 1

    # Rule 4: 标题按 locale 本地化（AGENTS.md §13.13 铁律,3 locale = 3 独立市场,非"深圳"市场）
    #   - zh-hk → 香港 / 台灣 繁中市場場景詞
    #   - en → 全球通用賣點 (sizes/paper/design/material)
    #   - ja → 日本市場賣點
    # ❌ 禁止硬塞 "深圳" / "Shenzhen Printing" / "深圳印刷" (NAP vs SEO 脫鉤,AGENTS.md §13.10)
    cat.title_template = matrix.queue_entry.title_template_<locale>  # 见 matrix.json policy.title_template_zh/en/ja

    # Rule 5: 输出无图
    cat.no_images = True

    # Rule 6: 内链全部用 valid_internal_links 清单
    cat.allowed_internal_links = matrix.queue_entry.valid_internal_links

    return cat
```

## 8. 链接完整性红线 (2026-07-04 由 user 拍板)

- ❌ **不允许** 在新内容里写任何最终会 404 的链接
- ❌ **不允许** 在新内容里写任何会触发 301 重定向的链接
- ✅ **写链接前** 必须先在 matrix.queue_entry.valid_internal_links 清单里核对
- ✅ **验证流程**:
  - 写前: 核对 matrix 提供的 valid_internal_links 清单 (已通过 curl 200 验证)
  - 写后: curl 验证每个内链返回 200,非 301/302
  - 任一内链不通 → 不算完成,升级 user

**有效 URL 路由清单** (写链接时只从以下模式里选):
- `/<locale>/category/<slug>/` (14 个 category)
- `/<locale>/product/<slug>/` (~80 个 SKU)
- `/<locale>/blog/<slug>/` (现有 + 新增)
- `/<locale>/services/rush-printing-delivery/`
- `/<locale>/services/seo/<slug>/`
- `/<locale>/guide/<slug>/`
- `/<locale>/quote/` `/<locale>/contact/` `/<locale>/payment-methods/`
- `/<locale>/company-news/` `/<locale>/case-studies/`
- `/<locale>/about/` `/<locale>/service-areas/`
- `/<locale>/help-center/` `/<locale>/faq/` `/<locale>/legal/`
- `/<locale>/terms/` `/<locale>/privacy/` `/<locale>/press-kit/`

## 9. 模型统一 (2026-07-06 user 拍板: 删除多模型分级)

- **唯一模型**: `mavis / MiniMax-M3` (mavis orchestrator 默认,thinking variant)
- ❌ **删除**: `deepseek-v4-flash` / `deepseek-v4-pro` / `GLM 5.2 Coding` 等多模型分级
- ❌ **不再**: 在 cron prompt / context / README 里出现任何 "默认/攻坚/疑难" 三级模型描述
- ✅ **理由**: zprintpro cron 跑在 mavis agent 上,不需要在每个 prompt 重复模型说明 (唯一模型已固化在 mavis session 里)

## 10. 产出命名规范 (v2)

**三类**产出:
- A. **代码产物 (verify 后)**: `/src/...` + `/public/sitemap*.xml`,已 commit + push
- B. **运营记录**: `F:\zprintpro-nextjs\.hermes\logs\YYYY-MM-DD-{任务名}.md`,只写交付摘要
- C. **Matrix 状态**: `.hermes/industry-keyword-matrix.json`,每次 cron 启动读写

不要混淆 — 代码在 src,运营在 logs,矩阵在 .hermes/。

## 11. 异常上报

- 发现线上死链 / 多语言 hreflang 缺失 / TDK 超长 → 立即写到 `异常报告.md` + 给 user 发通知
- 任何 token 消耗 > 50 万 → 暂停,问 user 是否继续
- 任一 sub-task 的 verify 步骤**不通过** → 立即升级 user,**不**报完成,等用户决策
- CF build 失败 / push 报错 / curl 5xx → 立即升级 user
- **新博客上线后 7 天 GSC 仍无收录** → 升级 user,排查索引问题

## 11.5 CF Pages 月度 build quota 约束 (2026-07-06 user 拍板)

> **【硬约束】** Cloudflare Pages 免费方案每月有明确 build 次数限制 (典型 500 次/月)。**每次 git push 触发 1 次 build**, build quota 是稀缺资源, 不可滥用。

**触发规则**:
- ❌ **禁止**: trivial commit 单独 push (typo 修正 / 注释 / 单行格式调整 / 一句话 README 改动) — 这些会浪费 1 次 build
- ❌ **禁止**: 每天 push 超过 1 次非紧急 commit (除非 cron 自动触发)
- ✅ **必须**: **攒 commit 批量 push** — 多个子任务改动攒一起, 1 push 触发 1 build 验证全部
- ✅ **必须**: **本地预检** — push 前跑 `npx tsc --noEmit` + `node scripts/check-encoding.js --fix` + 关键脚本 smoke test, 确保 build 大概率过
- ✅ **必须**: **每次 push 前预算剩余 build quota** — 用 `gh api repos/.../actions/runs?per_page=20` 查本月已用次数

**例外** (可单独 push, 不计 quota):
- 紧急修复 (线上 500 / 404 / 死链)
- cron 自动 commit (每天 10:15 daily + 每周一 11:00 weekly + 每月 1 号 monthly + 每周三 15:00 gsc)
- 跨项目 bug fix (影响其他项目)

**本地预检 3 步** (push 前必跑):
1. `node scripts/check-encoding.js --fix` (UTF-8 + LF)
2. `npx tsc --noEmit` (TS 类型零错误)
3. `npm run build 2>&1 | grep -E "Compiled|Error"` (必须 "Compiled successfully")

3 步全过才允许 push。任一不过 = 修复后再 push, **不**靠 build 试错。

---

## 12. 豆包 SEO 自进化 4 项能力 (2026-07-05 落地到 4 条 cron)

### 12.1 内链自生长能力 → zprintpro-weekly-meta-refresh (周一)

**问题**: 现有体系只有新博客链向旧页面,没有反向链接补充,导致 PageRank 单向流动,旧页面权重衰减。
**每周一 11:00 cron 必跑**:
1. 扫全站已发布博客 (blog-posts.ts) + 类目页 (categories.ts) + SKU 页 (products.ts)
2. 计算"主题相似度矩阵": tag 词频 + 类目归属 + Tier A 行业关键词重叠度
3. 给相关旧页面 (top 5 相似度 >0.3) 补充指向新博客的内链,加到正文"延伸阅读"区块
4. 每周新增内链 ≥ 5 条 (目标: 整站内链密度均匀提升,权重传递效率更高)
5. 6 步 verify + 报告落盘

### 12.2 内容质量自迭代能力 → zprintpro-monthly-matrix-audit (每月 1 号)

**问题**: 大量薄页拉低整站质量分,GSC 数据是滞后反馈(月级)。
**每月 1 号 14:00 cron 必跑**:
1. 拉过去 30 天 GSC,筛"零展示 + 零点击"的博客 (orphan 内容)
2. 对孤儿内容自动补充:
   - 加 200-300 字深度 (基于同主题 top 3 博客的内容 gap)
   - 补充 2-3 个 FAQ (从 Google PAA / 相关搜索抓)
   - 加 3-5 个新内链 (交叉到同类目已铺博客)
   - 优化 H1 / meta description (从 GSC CTR 倒推)
3. 月度输出"内容质量分报告":薄页率 / 孤儿内容比例 / 平均停留时长
4. 不动已铺博客的 slug / schema 结构

### 12.3 本地语义优化能力 → zprintpro-daily-content-evolve (每天,每 3 天轮换)

**问题**: 三大市场语言习惯不同,机械翻译不本地化。
**每天 10:15 cron 每 3 天轮换跑**:
- **Day 1 (繁中本地化)**: 扫近 7 天新博客,自动融入粤语口语化表达 ("邊間印刷廠好啲" / "即日交貨" / "免費設計")
- **Day 2 (英文本地化)**: 扫近 7 天新博客,补充环保/小批量/快交期属性词 (eco-friendly / small batch / fast turnaround / waterproof)
- **Day 3 (日文本地化)**: 扫近 7 天新博客,匹配本地印刷行业惯用表述 (オフセット印刷 / フルカラー / 小ロット / 納期厳守 / 高品質)
- 输出: `.hermes/logs/YYYY-MM-DD-本地语义优化.md`

### 12.4 运维稳定性兜底 → zprintpro-daily-content-evolve (每天必跑)

**问题**: SWC 编译 bug / push 失败 / SW 缓存导致 user 端看到旧 500。
**每天 10:15 cron 必跑 (在 commit + push 之前强制执行)**:
1. **本地编译预检**: `node scripts/check-encoding.js --fix` (编码/CRLF 修复)
2. **TypeScript 类型检查**: `npx tsc --noEmit` (零错误才能进下一步)
3. **SWC 编译预演**: `npm run build 2>&1 | grep -E "Compiled|Error"` (必须看到 "Compiled successfully")
4. **Git push 严格模式**: 只 `git push origin_ssh main`,禁止 `git push --force` / 跳过 hooks
5. **CF Pages 部署验证**: push 后等 90s,跑 `node scripts/verify-deploy.mjs` 看 status = `success` 才算真上线
6. **7 步 verify 流水线** (升级版,从原 6 步加一步):
   1. `git status -sb` 无 ahead (push 真成功)
   2. `find public/sitemap*.xml -mtime -1` (sitemap 是今天的)
   3. `curl -sI https://zprintpro.com/<locale>/blog/<slug>/` 返回 200 (3 locale 各一次)
   4. `curl -s <url> | grep -c <主关键词>` ≥ 1 (内容含关键词)
   5. `curl -s <url> | grep -E "Article|BreadcrumbList|FAQPage"` ≥ 3 (schema JSON-LD 注入)
   6. **新增**: `curl -s <url> | grep -E "<img|cover"` 返回 0 (硬约束无图)
   7. 逐个 curl matrix valid_internal_links, 全部 200 不 301/302/404

### 12.5 能力 → cron 映射矩阵

| 能力 | 触发频率 | 归属 cron | 输出文件 |
|------|---------|---------|---------|
| 内链自生长 | 每周一 | zprintpro-weekly-meta-refresh | `.hermes/logs/YYYY-MM-DD-weekly-meta.md` |
| 内容质量自迭代 | 每月 1 号 | zprintpro-monthly-matrix-audit | `.hermes/logs/YYYY-MM-monthly-matrix-audit.md` |
| 本地语义优化 | 每天 (每 3 天轮换 locale) | zprintpro-daily-content-evolve | `.hermes/logs/YYYY-MM-DD-本地语义优化.md` |
| 运维稳定性兜底 | 每天 (commit/push 前必跑) | zprintpro-daily-content-evolve | `.hermes/logs/YYYY-MM-DD-日运营报告.md` |

**升级机制**: 4 项能力是 2026-07-05 user 拍板新增,任何 hermes cron 在执行时必须把这些作为标准 SOP,不要做了一半跳过。

---

## 13. 进程验收标准 (v4 新增, 2026-07-06)

cron / 后台 agent / 跨进程 worker 自报 "完成 / Shipped / Done" **永远不采信**,必须 orchestrator 按以下 6 步 verify 流水线独立 verify:

### 13.1 完成判定 6 步流水线 (任一不过 = 不算完成, 升级 user)

1. **log 报告 vs ground truth 一致**: cron 写完 .hermes/logs/*.md 后, 报告里的 `deployed_commit` / `deployed_at` / `cf_build_run` 字段必须能 grep 到对应 git commit hash + CF Pages build run
2. **git push 真成功**: `git status -sb` 无 ahead (origin_ssh/main = HEAD)
3. **sitemap 是今天的**: `find public/sitemap*.xml -mtime -1` 有输出
4. **curl 关键 URL 200**: 3 locale × 新增 URL = 9 次 curl (blog 任务) 或 3 次 (其他任务), 全部 200
5. **content 含主关键词**: `curl -s <url> | grep -c <主关键词>` ≥ 1
6. **schema JSON-LD 注入**: `curl -s <url> | grep -E "Article|BreadcrumbList|FAQPage"` ≥ 3
7. **matrix covered 与 git log 反查一致**: 如果 cron 报"matrix.json 更新 covered[] 追加 X", 那 matrix.json 的 covered[] 必须确实有 X, 且 X 对应的 blog slug 在 `git log --all --grep=X` 能查到 commit

### 13.2 反例 (失败案例 — 永远不能犯)

- ❌ "commit 完成但未 push" (2026-07-02 togthr 踩坑): git status -sb 显示 ahead → auto-deploy 没触发 → user 浏览器无变化
- ❌ "写 .hermes/logs/*.md 但 src/ 没动" (2026-07-01 4 天 3 篇博客只写日志 GSC 零收录)
- ❌ "写到 `public/blog-data/<locale>.json` 但 page.tsx import 走 tsconfig paths 解析到 `src/data/blog-data/`" (2026-07-06 发现, prod 不显示)
- ❌ "verify 只跑 cron 自己,orchestrator 没独立 curl" (CDN 边缘节点假象, 不同地理节点时延不一致)
- ❌ "GH Actions API `?head_sha=<sha>` filter 返回 0 就报失败" (API 索引延迟, 直接用 `?per_page=5` 无 filter 拿最近 5 个 run)

### 13.3 cron / worker 退出条件 (R6 协议 + v4 升级)

每个 cron 必须有 3 个 hard-coded 出口:
- (a) **TTL 过期自删**: 每次启动检查日期/时间窗口, 跳过本次 + 累积 N 次 → mavis cron delete self
- (b) **报告落盘自删**: 如果 .hermes/logs/YYYY-MM-DD-*.md 存在且 24h 内 → 本次立即退出 (避免重复跑)
- (c) **静默阈值升级**: 如果连续 N 次本 cron verify 失败 → 升级 user, **不**继续静默 tick

### 13.4 升级阈值 (token / 算力 / 失败次数)

| 信号 | 阈值 | 动作 |
|------|------|------|
| cron 单次 token 消耗 | > 50 万 | 暂停, 升级 user 问是否继续 |
| cron 单次 verify 失败 | 1 次 | 重试 1 次 |
| cron 连续 verify 失败 | 2-3 次 | 升级 user |
| cron 静默超过算力阈值 | 上午 20min / 下午 40min | kill worker + force-spawn replacement, 不重发原指令 |
| matrix.json token 数 | > 50 万 | 暂停, 升级 user |
| cron 跳过累积次数 | weekly: 4 / monthly: 12 | mavis cron delete self |

---

## 14. Changelog

- **2026-07-06 v4**: 180 天压缩节奏 (半年 730 篇); cron prompts 硬约束段去重 (单一真源在 AGENTS.md §11/§13.4/§13.10/§13.13 + .hermes/context.md §1/§4); 关键路径 bug 修复; §13 进程验收标准; §14 Changelog 新增
- **2026-07-05 v3**: 豆包 4 项能力 (内链自生长 / 内容质量自迭代 / 本地语义优化 / 运维兜底) + 标题本地化 (NAP 脱钩) + 内链矩阵
- **2026-07-04 v2**: 4-cron 自进化 + 链接完整性红线
- **2026-07-01 v1**: "产出即上线" 模式 (4 天 3 篇只写日志的教训)

---

**Updated**: 2026-07-06 (v4 — 180 天压缩 + cron 硬约束去重 + 关键路径 bug + 进程验收标准)
**Previous**: 2026-07-05 (v3 — 豆包 4 项能力 + 标题本地化 + 内链矩阵)
**Author**: mavis orchestrator (user 授权)