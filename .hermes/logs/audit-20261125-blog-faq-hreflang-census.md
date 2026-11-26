# 2026-11-25 blog FAQPage + hreflang 双方法全量普查（autoclaw 人手会话 · 承接失败子任务自行完成）

> 任务源: 首席分析师执行轮子任务 GHdw_5F_0nCrxcpSVYxyQQ 因 provider 容量失败；其落盘脚本 method-a.mjs / method-b.mjs 经验收合格后由主会话执行完成。本报告为该子任务的最终交付。
> 方法声明（§0.23.2 双方法复算）: **方法 A = repo 静态普查**（Node utf-8 解析 blog-posts.ts / pillar-content.ts / buying-guides.ts / blog-data JSON / page.tsx，FAQ 正则直接从 page.tsx `extractFaqFromHtml` 运行时提取，杜绝转录误差）；**方法 B = live 线上探针**（26 探针串行 ≥2.6s + 三重有效性校验 200/≥3000B/含 h1+ld+json + 重定向跟读）。两方法在 19 个 blog 样本上交叉对账 **0 mismatch**。

## 一、FAQ 覆盖普查（方法 A，routableSet=98）

**口径声明（§0.33 双口径）**: 本普查 routableSet=98（articleSlugs 82 ∪ buying-guides 10 ∪ pillar-content clusters 9，去重），与 §0.33.1 的 blog-posts.ts SSoT 85 / zh-hk.json 79 是**不同口径**（本口径=可路由内容源并集），不可互比。

| locale | routable | FAQ 内容命中（faqRegex） | 无 FAQ | 无内容源 |
|---|---|---|---|---|
| zh-hk | 98 | **73** | 25 | 0 |
| en | 98 | **74** | 24 | 0 |
| ja | 98 | **73** | 25 | 0 |

- FAQ 判定正则（= page.tsx 运行时真值）: `/<p[^>]*>\s*<strong>\s*Q[0-9]*\s*[:：]…A[0-9]*\s*[:：]…<\/p>/gi`（Q/A 强标签结构）
- blog-data JSON keys: zh-hk 101 / en 102 / ja 101；与 routableSet 交集 79；JSON 独有（非可路由源）22/23/22 个 key。

### ★ 结论修正（推翻 11-25 早前「blog 抽样无 FAQPage」初判）
1. **FAQPage schema 层是健康的**: 方法 B 19/19 blog 样本 valid，其中 15 个有 FAQPage JSON-LD；repo 判「有 FAQ 内容」的样本 **100%** 线上出 FAQPage，repo 判「无 FAQ 内容」的样本 100% 无 FAQPage——**0 mismatch**。此前子任务「blog 抽样无 FAQPage」系抽样恰好落在无 FAQ 内容的文章上（cmyk-guide / folded-leaflet / christmas-card），把**内容缺口**误读成 **schema 缺口**。
2. **真实缺口 = 内容层**: 24-25 篇/语种无 Q/A 结构 FAQ 块（≈25%），无 schema 可出。属内容增补工作（走 daily 车道 blog 骨架 §12 段标准），**非门童/schema 修复**。
3. 孤儿探针反证: `sticker-material-pvc-vinyl-removable`（blog-posts 有 meta、census 判非可路由）线上 **200 + FAQPage 在线** —— dynamic fallback 在路由，**非死链孤儿**；census 口径需把 dynamicParams 兜底纳入（后续轮修正 census 脚本，不改 src）。

## 二、hreflang 口径普查（方法 A 26 触点 + 方法 B 4 页型线上确认）

### repo 触点分布（26 处 `languages:{}`）
| 口径 | 位置 | en 形态 | ja 形态 | x-default |
|---|---|---|---|---|
| **multi-en**（en-US/en-GB/en-AU[/en-CA]） | layout.tsx:129 · seo.ts:348/881/974/1645 · metadata.ts:21 | multi | ja-JP 或 ja | `/zh-hk` 或对应 zh-hk 页 |
| **single-en** | 全部独立页面（about/blog/case-studies/contact/company-news/help-center/insights/legal*/nengajo/payment/press-kit/services/* /trade-program/faq 等 ~20 处） | single(en) | ja 或 ja-JP | 各页 zh-hk 对应 |
| 异常触点 | legal/page.tsx:234 | **en=none**（languages 对象缺 en） | ja-JP | x-default→**en**/legal |
| 异常触点 | business-card-printing/page.tsx:137 | en=none | ja=none | x-default→/zh-hk/services/business-cards-printing/（301 承接目标页；**§0.0 名片展示层不触，仅登记**） |
| 异常触点 | comiket-c109/page.tsx:185 | en=none | ja=none | x-default→ja/comiket-c109 |

### live 确认（方法 B）
- blog 页（19 样本全一致）: `zh-Hant-HK, en, ja, x-default`（4 条，single-en）
- 首页 zh-hk/en、en 类目页、en PDP: `zh-Hant-HK, en-US, en-GB, en-AU, ja, x-default`（6 条，multi-en）
- **结论**: 早前「页面 6 条 vs blog 4 条」的 en 口径差**线上复现成立**，且为**系统性双轨**（全局 SEO 层 multi-en vs 页面层 single-en）。影响：en 变体聚合信号分裂（Google 对 en-US/en-GB/en-AU vs en 的解读差异），属 §0.36.3 缺口 #2 同族，**src 行为变更 → 攒批执行 + 待 K3 对统一口径拍板**（维持 §5 声明 zh-hant-HK/x-default→zh-hk，或页面层全部对齐全局层）。
- legal 页 en=none 为独立小缺口（languages 对象缺 en 键），随统一口径批一并处理。

## 三、K3 待拍板清单（本普查新增，不代拍）
1. **hreflang en 口径统一**: (a) 页面层全部对齐全局 multi-en / (b) 全局收敛 single-en / (c) 维持现状（记录为已知差异）。推荐方向：页面层补齐与全局一致（blog 页缺 en-US/en-GB/en-AU 变体），但属 src 批量 SEO 面 → 攒批+拍板。
2. **blog FAQ 内容增补范围**: 25/24/25 篇无 FAQ 块是否列入 daily 车道 blog 骨架增补队列（内容层，非 schema 层）。
3. legal 页 languages 缺 en 键：随口径批处理或单独小修。

## 四、数据来源
```
数据来源:
- 方法 A repo census: .hermes/tmp/audit-20261125/method-a.json（2026-11-25 生成，Node utf-8 解析 src/data/{blog-posts,pillar-content,buying-guides}.ts + src/data/blog-data/*.json + src/app/[locale]/blog/[slug]/page.tsx）
- 方法 B live probe: .hermes/tmp/audit-20261125/method-b.json（26 探针 200/26，串行≥2.6s，2026-11-25）
- 交叉对账: 19 blog 样本 repo↔live FAQ 0 mismatch
- 失败子任务脚本承接: GHdw_5F_0nCrxcpSVYxyQQ（method-a.mjs/method-b.mjs 验收合格）
校准状态: ✅ 已校准（双方法同日执行，结果一致）
```
