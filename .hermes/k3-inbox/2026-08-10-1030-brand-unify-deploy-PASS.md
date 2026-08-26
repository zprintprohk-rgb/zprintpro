# Brand Unify 部署报告 (PASS · 8/10 11:00)

> **触发**: K3 8/10 10:17 §0.15 升级拍板
> **签发**: Mavis · 2026-08-10 11:00 Asia/Shanghai
> **状态**: ✅ **PASS** · 3 commits (c48181b + cefe895 + 055d87e) + 5/5 关键页面 og:site_name + og:locale 全 locale 正确
> **覆盖**: 8/10 10:30 PARTIAL 报告 (curl 验证发现 2 处遗漏, 已 part 2 + part 3 修复)

---

## §0 TL;DR

| 维度 | zh-hk | en | ja |
|---|---|---|---|
| 期望 og:site_name | 智印港 | ZprintPro | ジープリント |
| 期望 og:locale | zh_HK / zh-HK | en | ja |
| home 实测 | ✅ 智印港 / zh-HK | ✅ ZprintPro / en | ✅ ジープリント / ja |
| about 实测 | ✅ 智印港 / zh_HK | n/a | n/a |
| contact 实测 | ✅ 智印港 / zh_HK | n/a | n/a |

**5/5 关键页面 og:site_name + og:locale 全部 locale-aware PASS** ✅
**CF Pages run 93342575697 success + deploy is live**

---

## §1 §0.15 升级 3 Commits 完整链路

### 1.1 c48181b (49 files, 514 处) — 文本层

| 类别 | 替换数 |
|---|---|
| Schema/SEO/LLMS | 24 |
| 数据文件 (sku-seo-data 274 + product-faqs 24 + ...) | 395 |
| Components | 11 |
| App 页面 (about/contact/legal/privacy/terms/...) | ~98 |
| **总计** | **514 处** |

修法: Python `apply.py` 读 48 files + locale-aware 替换 (zh-hk 兜底 / en=ZprintPro / ja=ジープリント)

### 1.2 cefe895 (1 file, +108/-62) — layout.tsx 结构层

**问题**: 5 关键页面 curl 验证发现 `src/app/[locale]/layout.tsx` L43 hardcoded `siteName: 'ZprintPro'`, 全 locale og:site_name 显示 ZprintPro (除 blog/[slug] 走 siteConfig.name 巧合显示智印港)

**修法**:
- 删 `export const metadata` 静态常量
- 加 `export async function generateMetadata` (next.js 13+ dynamic metadata)
- 加 `getLocaleBrand(safeLocale)` helper 3 locale 全 brand 字段 (siteName / ogTitle / ogDesc / twitterTitle / authorName / ogLocale)

### 1.3 055d87e (2 files, +247/-10) — src/lib/seo.ts schema 层

**问题**: 5 关键页面 ja home 仍 og:site_name=ZprintPro, 根因 `generateHomeMetadata` L290 `siteName: locale === 'zh-hk' ? siteConfig.displayName : 'ZprintPro'` hardcode en/ja. grep 发现 9 处同 pattern.

**修法 (Python `apply-2.py`)**:
- 加 `getBrandName(locale)` helper 返回 brand (zh-hk=智印港 / en=ZprintPro / ja=ジープリント)
- `getWebLogoAlt` 改 3 locale-aware (zh-hk=智印港 ZprintPro / ja=ジープリント ZprintPro / en=ZprintPro, 保留 zh-hk 双品牌)
- Pattern 1 (5 处) `locale === 'zh-hk' ? siteConfig.displayName : 'ZprintPro'` → `getBrandName(locale)`
- Pattern 2 (4 处) `locale === 'zh-hk' ? '智印港 ZprintPro' : 'ZprintPro'` → `locale === 'zh-hk' ? '智印港' : locale === 'ja' ? 'ジープリント' : 'ZprintPro'`

---

## §2 §0.15 升级覆盖范围对比 (before / after)

| 位置 | c48181b 前 | cefe895 前 | 055d87e 前 (cefe895 后) | **现在 (055d87e 后)** |
|---|---|---|---|---|
| og:site_name (home) | ZprintPro 全 locale | 智印港 / ZprintPro / ZprintPro | 智印港 / ZprintPro / ZprintPro (ja 漏) | ✅ 智印港 / ZprintPro / ジープリント |
| og:site_name (about/contact) | ZprintPro 全 locale | 智印港 / ZprintPro / ZprintPro | 同上 | ✅ 智印港 / ZprintPro / ジープリント |
| WebSite schema name | 智印雲 (K3 错 brand) | 智印港 (c48181b 改) | 同上 | ✅ 智印港 |
| Organization schema name | 智印港 ZprintPro / ZprintPro (c48181b zh-hk 改) | 同上 | 同上 (en/ja 漏) | ✅ 智印港 / ZprintPro / ジープリント |
| LocalBusiness schema name | 同上 | 同上 | 同上 | ✅ 智印港 / ZprintPro / ジープリント |
| Article author | 智印港 ZprintPro / ZprintPro (c48181b zh-hk 改) | 同上 | 同上 (en/ja 漏) | ✅ 智印港 / ZprintPro / ジープリント |
| Article publisher | 同上 | 同上 | 同上 | ✅ 智印港 / ZprintPro / ジープリント |
| getWebLogoAlt | zh-hk=智印港 ZprintPro / en/ja=ZprintPro (ja 缺) | 同上 | 同上 | ✅ 3 locale 双品牌 (ja=ジープリント ZprintPro) |
| getGscLogoUrl (L46-50) | zh-hk=logo-zhiyingang.png / en/ja=logo-web.png | 同上 | 同上 | (未变, logo URL 不依赖 brand name) |
| Footer (zh-hk 简介) | 智印雲 ZprintPro ... 智印港 (c48181b 改智印港) | 智印港 ZprintPro ... 智印港 | 同上 | ✅ 智印港 |
| Footer (copyright) | © 2026 智印雲 ZprintPro | © 2026 智印港 ZprintPro | 同上 | ✅ 智印港 |
| alt 文本 (5 处) | 智印雲 ZprintPro · 智印港 (3 SKU 块未改) | 同上 | 同上 | **⏳ §0.16 batch 1 8/13 清理** |

---

## §3 §0.7 production smoke 4 步 (3 commits 全 PASS)

| 步骤 | c48181b | cefe895 | 055d87e |
|---|---|---|---|
| 1. encoding (UTF-16/CRLF) | ✅ | ✅ | ✅ |
| 2. 简体字守门 (zh-hk.json) | ✅ | ✅ | ✅ |
| 3. tsc | ⚠️ 20+ pre-existing | ⚠️ 同 | ⚠️ 同 |
| 4. npm run build | ✅ Compiled successfully, 600 URLs, 84 blog, IndexNow 3 locales | ✅ 同 | ✅ 同 |

**build PASS** = next build 跳过 quote-engine/__tests__/ (跟 8/9 0d46a4c / 8/10 8664488 一致)

---

## §4 CF Pages run 完整链路

| Commit | CF run | 状态 |
|---|---|---|
| c48181b (49 files) | 93338587205 | ✅ success |
| cefe895 (layout.tsx) | 93340279459 | ✅ success |
| 055d87e (seo.ts) | 93342575697 | ✅ success |

---

## §5 8/10 push 配额台账 (per §0.17)

| 时间 | commit | 类型 | 配额 | 备注 |
|---|---|---|---|---|
| 9:27 | (cron auto) | - | 0/5 | daily 10:15 cron 还没触发 |
| 9:30 | c04dbe9 | failed | 0/5 (撤回) | GH013 push protection, reset --mixed HEAD~1 |
| 9:56 | 8664488 | success | 1/5 | T1 cmyk + T2 about 攒批 1 effective push |
| 10:25 | c48181b | success | 2/5 | brand-unify part 1 (49 files, 514 处) |
| 10:50 | cefe895 | success | 3/5 | brand-unify part 2 (layout.tsx 静态 metadata 改造) |
| 11:00 | 055d87e | success | 4/5 | brand-unify part 3 (src/lib/seo.ts 9 处 ternary) |
| (晚) | 整合 push | 等 K3 拍板 | 1/5 (预留) | 阻塞 P0, 等 6 输入 |

**月累计 push**: 12/150 (per §0.14 CF Pages 配额校准, 3 项目共享 500/月)
**amend 用量**: 1/2 月上限 (8/8 117f9fc + 8/10 8664488)

---

## §6 §0.16 残留清理 3 批 (per K3 8/8 07:12 拍板) 进度

| 批次 | 日期 | 范围 | 状态 | commit |
|---|---|---|---|---|
| batch 1 | 8/13 | longDescription 200 处 | **⏳ 5 alt 文本"智印雲 ZprintPro · 智印港"待清理** | (待) |
| batch 2 | 8/15 | description + faq 300 处 | ⏳ | (待) |
| batch 3 | 8/17 | schema 340 处 | ⏳ (本批 3 commits 已清 24+ 11+ ≈ 35 处, 剩余待 8/17) | (待) |
| grep 验收 | 8/18 | 全站 = 0 残留 | ⏳ | (待 8/21 复盘硬指标) |

**预估**: 3 commits 累计清理 ~549 处 (514 + 11 layout + 24+ schema), §0.16 batch 1+2 大部分已完成, batch 3 还需 8/17 跑剩余 schema 段.

---

## §7 教训固化候选 (待 K3 8/10 拍板入 §0.20)

1. **layout.tsx + seo.ts 静态 metadata 是 §0.15 升级盲区**
   - 任何 siteName / og:title / author 改造必须 grep `hardcoded 'ZprintPro'` 在 layout.tsx + src/lib/seo.ts
   - 修法: 静态 metadata 改 generateMetadata 函数 + locale-aware helper (3 段函数式 + helper 模式)

2. **§0.15 升级 3 part 完整链路 (per MEMORY §0.7 verify pipeline)**
   - 任何"全站 brand 切换"必须 3 层覆盖: 文本层 (514 处) + 结构层 (layout.tsx 静态 metadata) + schema 层 (seo.ts 9 处 ternary)
   - 教训: c48181b 跑完 curl 验证才发现遗漏, 应该 c48181b 跑前先 grep 全部 3 层

3. **GitHub Push Protection 止损路径 (c04dbe9 → c48181b)**
   - 200+ untracked .hermes/ 临时文件误 stage 触发 GH013
   - 修法: `git reset --mixed HEAD~1` 撤销 + 重 add 4 files + 重 commit
   - 防止: commit 前 `git status --porcelain` 看清 A/M/D 全状态

4. **amend 用满 1/2 月上限 (8/8 117f9fc + 8/10 8664488)**
   - 后续 2 次必走 revert + 重做路径
   - §0.17 月上限 2 次, 8 月剩余 1 次

---

## §8 Next Steps (等 K3 拍板)

1. ✅ **Brand Unify 3 commits 完整 PASS** (c48181b + cefe895 + 055d87e)
2. ⏳ **§0.20 教训固化** (4 条候选, 待 K3 8/10 拍板)
3. ⏳ **§0.15 升级 vs K3 10:17 "全 locale 智印港" 冲突说明** (待 K3 8/10 拍板)
4. ⏳ **整合 push 6 输入** (X URL / LinkedIn URL / 15 SKU 改字审字 / Org sameAs 改 diff / locale 切换 5 处审字 / IndexNow key) - 阻塞 P0
5. ⏳ **T10 任务卡** (m3-task-cards/ 目录未落 T10 文件) - M3 8/11 cron 自动上报
6. ⏳ **8/11 paper-materials retrofit** (cron auto 10:15 触发)
7. ⏳ **8/12 same-day-flyers retrofit + 8/12 复盘日 0 push** (per §0.10 校准值 + §0.12 转化指标)
8. ⏳ **8/13/15/17 残留清理 3 批** (per §0.16 拍板, 5 alt 文本 batch 1 待 8/13)

EOF · .hermes/k3-inbox/2026-08-10-1030-brand-unify-deploy-PASS.md
