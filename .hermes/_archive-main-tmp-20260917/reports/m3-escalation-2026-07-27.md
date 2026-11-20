# M3 升级报告 — 2 新任务 K3 红线冲突 (2026-07-27)

## 上下文

- M3 7/27 派发: T1+T2 摸底, 零 commit 零 push → **已完成** (报告 `m3-t1t2-2026-07-27.md` 4.5KB)
- T1 拉数成功 (oauth2 OK + proxy 127.0.0.1:7892), 7d 1 click / 870 imps, Q-GR 3 词 0 收录
- T2: 3 URL 200 + sitemap 已声明, GSC 7d 0 展示 (收录未生效, 预期内)
- user 7/27 01:08 新加 2 任务: (a) 2 篇博客内容为空待补全 (b) 移动端 CategorySidebar 占一整屏需折叠

**两个新任务都触 K3 红线 (严格字面), 升级 K3 拍板**:
- (a) Q-GR-02 + Q-GR-03 body content 补全 → K3 §2 T2 「❌ 不改博客正文一个字」+「内容层冻结」
- (b) CategorySidebar 移动端折叠 → K3 §3 #1 「展示层冻结」, CategorySidebar **未在 K3 §3 #1 清单**, 但属 page.tsx ecosystem

---

## 任务 A: 2 篇博客 body content 补全

### 现状 (user 7/27 01:08 截图 + 代码查证)

| 博客 | slug | commit | title/excerpt | body content | source |
|---|---|---|---|---|---|
| 小批量彩盒訂製 (zh-hk 截图) | `custom-card-boxes-small-batch-usa` | d273aac (7/24) | ✅ 已写 (line 1358-1367) | ❌ **缺字段** | user 截图"内容为空" |
| 美妝彩盒拼版印刷 (zh-hk 截图) | `cosmetic-card-boxes-gang-run-japan` | d273aac (7/24) | ✅ 已写 (line 1377-1386) | ❌ **缺字段** | user 截图"内容为空" |
| (顺带发现) 拼版白卡彩盒指南 | `gang-run-card-boxes-hk-guide` | 7/23 v7 cron | ✅ 已写 | ❌ **缺字段** | 同一执行 bug, Q-GR-01 |

### 根因

- blog-posts.ts line 13-17 注释: "Note: full article content (HTML strings) still lives in `getBuyingGuideBySlug(slug)` / `legacyPosts[locale][slug].content`"
- 实际 legacyPosts / getBuyingGuideBySlug **只覆盖 9 篇 buying guide + 11 篇 legacy post**, 不覆盖 v7/v8 daily-content-evolve 写的 25+ 篇新博客
- v7/v8 cron prompt 漏了 body content 字段, 写 meta 后就 commit, 详情页打开只显示 meta (title + excerpt), 无 HTML body → user 看到"内容为空"

### 红线分析

| K3 规则 | 字面 | 实际意图 | 我的判断 |
|---|---|---|---|
| T2 「不改博客正文一个字」 | ❌ 禁 | 防破坏已索引内容, 失 GSC 信任 | v7 cron 漏写 body, 不是"改"是"补全", 实际意图是修 bug |
| T2 「内容层冻结」 | ❌ 禁 | — | 严格按字面, 补全 body 也属"内容层动" |
| §13.4 「9 段结构 + 4 FAQ + Article + FAQPage + BreadcrumbList JSON-LD」 | ✅ 要求 | 9 段深度博客标准 | 补全 body 应按这个标准写 |

### 我的方案 (3 选项, 等 K3 拍板)

#### A1. 严格红线: 暂停补全, 走原计划
- 不动 2 篇博客, 等 D4-D10 启动后, 在 T3 校园词着陆页的 cron 里, 把 body content 也加进 prompt
- 风险: Q-GR 三篇 GSC 收录曲线会更平 (3 篇都 0 body, GSC 不索引空内容), 7/30-8/2 重跑 T1 仍会看到 0 收录
- 收益: 100% 不触红线

#### A2. 补全 2 篇 body (Q-GR-02 + Q-GR-03), 跳过 Q-GR-01 香港
- 按 §13.4 9 段结构 + 4 FAQ + Article + FAQPage JSON-LD 补 body
- 3 locale: zh-hk 800-1000 字 / en 250-350 词 / ja 250-350 词
- §13.10 NAP 脱钩: en/ja 标题不写 Shenzhen/Hong Kong, supplier origin 藏在正文 "DHL 2-4 day from Asia factory"
- §11 无名片 / §13.16.1 zh-hk 100% 繁体 严格执行
- Q-GR-01 香港拼版是 K3 7/23 插队 priority_boost=3 单独拍板, 不在 user 7/27 提的 2 篇里 → 跳过
- 1 commit 1 build: `feat(blog): Q-GR-02+03 body content 补全 (9 段+FAQ+JSON-LD)`
- 风险: 严格按 K3 字面仍属"内容层动", 但实际是补全 v7 cron 漏写
- 收益: 修复 v7 cron bug, GSC 收录曲线开始爬升

#### A3. 一次性补全 3 篇 (Q-GR-01+02+03)
- 同 A2, 但包含 Q-GR-01 香港拼版
- 风险: user 没明确要求改 Q-GR-01, 我自做主张范围扩大
- 收益: 一次修完 3 篇, 避免 7/30 又升级一次

**推荐: A2** (按 user 实际意图 2 篇, 范围最小, 修 v7 cron bug 立即可索引)

---

## 任务 B: 移动端 CategorySidebar 折叠

### 现状 (user 7/27 01:08 截图)

- 移动端 zh-hk 首页, 「產品分類」标题 + 11 个分类行, **占满一整屏 (375 × ~820px)**
- CategorySidebar.tsx line 86-125 直接 `categoryCounts.map()` 全展开, 无 useState 控制
- 截图行: 贴纸印刷 9 / 宣传单张 7 / 包装盒定制 12 / 定制海报 6 / 纸袋印刷 6 / 咭片印刷 6 / 喷绘广告 5 / 书籍印刷 5 / 餐牌印刷 5 / 信封印刷 4 / 年历印刷 6

### 红线分析

| K3 规则 | 字面 | 实际意图 | 我的判断 |
|---|---|---|---|
| §3 #1 「展示层冻结: page.tsx hero / ProductCard / HotProducts / CategoryProductCard / RelatedProducts / pricing.ts 零改动 (K3 已封版 1222af5)」 | ❌ 禁 | 1222af5 commit 锁住的是「视觉锚 / 价格体系」 | CategorySidebar **不在列**, 严格按字面可改 |
| §3 #1 跟 page.tsx 同 ecosystem | ⚠️ 建议升级 | — | CategorySidebar 是 page.tsx 第 388 行 `<CategorySidebar ... />` 引入的, 改 CategorySidebar.tsx 不改 page.tsx 本身, 但视觉效果动 → 建议升级 K3 拍板 |

### 我的方案 (2 选项)

#### B1. 不改, 现状接受
- 11 个分类全展开 = 信息密度高, 用户可一次看到全部
- 移动端可滚动, 不算严重 UX 问题
- 风险: 0

#### B2. 移动端默认折叠, 点击展开
- CategorySidebar.tsx 顶部加 `useState<boolean>(isMobile = false)`, 移动端默认折叠
- 「產品分類」标题右侧加 ChevronDown/Up 按钮, 点击 toggle
- 桌面端 (`lg:`) 不变, 11 分类全展开 (跟 K3 1222af5 桌面端视觉一致)
- 1 commit 1 build: `fix(mobile): CategorySidebar 移动端默认折叠, 点击展开`
- 风险: 严格按 K3 §3 #1 字面 CategorySidebar **不在列**, 可改; 但视觉效果变, 建议 K3 拍板
- 收益: 移动端首屏不再被 11 分类占满, 用户能直接看到 banner + H1 + sharp hooks + 产品列表

**推荐: B2** (UX 修复, 桌面端不变保 K3 1222af5 视觉, 移动端是功能性 UI 不是视觉锚)

---

## §11 名片禁区 (K3) — 顺手发现 (待 K3 拍板)

- products.ts:87 明确有 `slug: 'business-cards', name: '咭片印刷', nameEn: 'Business Cards', nameJa: '名刺印刷'`
- K3 §11 「❌ 绝对不要写名片/咭片/business cards/名刺 — 这不是 ZprintPro 的主营业务」
- 历史包袱: 6 个 SKU (premium-business-cards / thick-business-cards-400g / 等) 已上线 + 1 篇 buying guide (bgBusinessCard) 已铺
- 本次不动 (破坏性大), 升级 K3 拍板长期清理方案: (a) 全删 (b) 重命名为 postcard 类 (c) 保留但加 canonical 301 到 stickers (d) 跟 §11 协商放宽 (业务实际有做, §11 是理想化)
- 7/27 1 commit 1 build 红线不适用, 是产品线战略, 需 K3 单独拍板

---

## 风险 (≤1 项)

**R1 (保留 from m3-t1t2 report)**: GSC service account 权限状态未确认 (HIGH) — 截至 7/27, T3/T4 决策链缺数据

**R2 (新, MED)**: 任务 A + B 加起来 = 2 commits / 2 build quota (如 K3 拍板 A2 + B2)
- 7 月 quota 已用 1 推 4 次 + weekly 1 次 + 7/22 1 次 + 7/23 1 次 + 7/24 1 次 (per AGENTS.md §0) ≈ 8-9 次
- 7 月 500 quota 仍很充足, 但 8/12 流量战役剩 16 天, 平均每天 ≤1 push 是硬红线
- 建议: 任务 A2 + B2 合 1 push 1 build, 减少 quota 占用 + 减少 deploy 风险

---

## 下一步 (等 K3 拍板)

| 选项 | 内容 | 时间 | quota |
|---|---|---|---|
| A1 (暂停补全) | 不动 | 0 | 0 |
| A2 (补全 2 篇) | blog-posts.ts 增 body 字段 + JSON-LD 改 3 locale | 30min | 1 |
| A3 (补全 3 篇) | 同 A2 + Q-GR-01 | 40min | 1 |
| B1 (不改 UI) | 不动 | 0 | 0 |
| B2 (折叠) | CategorySidebar.tsx 加 useState + 移动端默认折叠 | 20min | 1 (合 A2/A3 攒 1 push) |

**推荐组合: A2 + B2, 1 commit 1 push 1 build, 总 50min, quota 1 次**

**等 K3 拍板**:
1. A 选项: A1 / A2 / A3 哪个?
2. B 选项: B1 / B2 哪个?
3. A2/A3 + B2 合并 push 还是分 2 push?
4. §11 名片禁区长期清理方案 (a/b/c/d) — 不阻塞本次 push

---

## 文件清单 (本 session 产出)

| 文件 | 用途 | 状态 |
|---|---|---|
| `.hermes/reports/m3-t1t2-2026-07-27.md` | T1+T2 摸底报告 (K3 格式, 已写) | ✅ done |
| `.hermes/reports/m3-escalation-2026-07-27.md` | 本升级报告 (K3 拍板项) | 新增 |
| `.hermes/gsc-snapshot-2026-07-29.csv` | GSC 7/20-7/26 7d query (268 rows) | 新增 |
| `.hermes/tmp/analyze-gsc-2026-07-29.py` | GSC 数据分析 | 新增 |
| `.hermes/tmp/write-m3-t1t2-report.py` | 报告生成器 #1 | 新增 |
| `.hermes/tmp/write-m3-escalation-report.py` | 报告生成器 #2 (本文件) | 新增 |
| `.hermes/tmp/check-qgr-body.py` | 3 Q-GR 博客 body 状态 check | 新增 |

**零 commit / 零 push (本 session 全部 .hermes/ 本地).**
