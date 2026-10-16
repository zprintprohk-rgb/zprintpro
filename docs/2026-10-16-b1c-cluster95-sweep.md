# 2026-10-16 B1c 簇9.5 全站 CRED 残余清扫 — 执行报告（千问方案 4.3① 9.5-A+D 落地 + 扣分项闭环）

> **数据来源**（§0.23 强制行）: `.hermes/logs/b1c-cluster95-surface-v2-2026-10-16.json`（全变体计量）+ scripts/guards/credibility-guard.js 规则口径（K3 9/1 12:27 拍板 + 9/19 选 A 增补）+ products.ts minQuantity 一手 + 替换前后计数断言 + 校准 2026-10-16 15:xx-16:xx

## 一、执行量（9.5-A + 9.5-D + 同句连坐）

| 层 | 处数 | 内容 |
|---|---|---|
| sku-seo.ts + CSV | 已于簇 9 清 | （本批 regen 幂等确认） |
| products-content.ts | ~400 | V9 模板三语（ISO 品質認證/品質保証/manufacturing standards/:2015/quality certified 等模板族）+ 海德堡连坐（印刷機把關 ×71 等） |
| blog-data 三语 | ~110 | 事实卡/认证块/校购块（含 FSC C123456 假号→文件備索、Cert No. available on request 撤除）+ ja 教育块 |
| seo.ts + about + contact + catalog + 组件层 | ~90 | metaDesc 家族、credSubtitle、certs 块、TrustBadges 三语标题、HowItWorks 信任条、FactoryTrust、FloatingQuoteCTA trustLine、CategorySharpHooks、CategoryPillarContent、schema-extensions HowTo（Heidelberg 连坐） |
| blog-posts + pillar + quote-engine/desk | ~10 | FAQ 摘要行（99.2% 達成率→準時交付紀錄）、15,000+ customers→global、quote 输出行 |
| **合计** | **~660 处** | ISO 9001 全变体 ×576 + 15+年族 ×17 + 15,000+ 族 ×6 + 100+ 國家/12 industries/16 years 连坐 |

**终态**：全站客户可见面 ISO 9001 渲染实例 = 0（余 8 处均为 K3 拍板历史注释/开发注释，不渲染）；15+ 年族 = 0；15,000+ 族 = 0（ts+CSV 两域断言）。

## 二、守卫基础设施（千问扣分项闭环 — 本次 0 次 --no-verify）

1. **CRED 存量基线**（`scripts/record-cred-baseline.mjs` + `.hermes/cred-baseline.json`）：方案 C 同款扩展到数据诚信规则——守卫按整文件扫描，触碰大内容文件必撞存量病灶；基线 = HEAD 逐文件逐规则计数（978 hits），**只许递减**，新增违规照常硬拦。
2. **CRED_4_PLUS_NUMBER 上下文白名单**：裸数字命中结构性无法命中货币/数量白名单（原缺陷）→ ±40 字符上下文窗（货币前缀/数量单位/円/区间）。
3. **CRED_HEIDELBERG 品牌白名单**：落实代码内引用的 K3 2026-09-19 拍板「选 A 允许」（设备品牌=行业标准识认）——原实现仅豁免 docs 路径，本批补齐 per-hit 白名单。
4. **i18n-guard §0.0 六槽豁免对齐**：thick-400g/foil-greeting-cards ×3 locale 的 v22 改名残留（keywords 燙金名片/名刺）在 detox 守卫已显式豁免、i18n 守卫重复硬拦 = 规则缺口 → 按 slug+locale 对齐 known_exemptions（§0.0.3 未拍板禁改语义保持）。
5. **内容侧既定修法执行**：自設廠房→平湖廠房 ×256（CRED_SELF_FACTORY 修法）；ja 简体 胶装→上製本（doujinshi，ts-only 漂移域）、规格→規格（a2-posters，**CSV col14 源头修 + regen 同步**——regen 回灌一次后按铁律改源头）。

## 三、保留与登记（K3 球 / 9.5 残余）

- **Heidelberg/海德堡 独立行 ×235 + SGS ×91**：9.5-B/C——Heidelberg 已获 K3 9/19 选 A（品牌白名单后不再拦 commit）；SGS 无守卫规则；两者真伪/表述优化待 K3 指示。
- **about 页 K3 8/24 拍板历史注释 ×3 + 开发注释 ×2**：史实保留（per §0.34.2）。
- **2 篇 ja 巨型博客**（8種ボックス比較 + 9素材パッケージ）：同句含 8,000+ 件実測/5,500+ 事例/¥420,000/15 年/Heidelberg 多雷且为 K3 知识原子冲突区 → **字节级还原退出 diff**，登记 9.5 残余待专批（需 K3 对「実測数据是否可作为已核验经营数据」表态）。
- **1,000+ 客户族 ×139 / 12 industries ×31 孤立行**：9.5-E（未触碰行，无 commit 阻塞）。
- **ISO 12647**：同族认证主张，守卫未覆盖 → docket。

## 四、验证

- tsc **54=54**；门童：hook 默认模式 **RED=0（干净通过，本批 0 次 --no-verify）**；CRED --strict exit 0；encoding 30 文件 LF；brand A 0；audit B-3 0；#29 违规 0；regen 断言 A-E。
- push `9a991b48`（+lane 并发 7f1a283e/0647d7fb）；**线上探针：a4-zh ISO=0（原 2，HowTo schema 闭环）、about-zh ISO=0（原 20）**。
- verify-deploy check-runs API 422（并发 lane 推送竞态，SHA 0647d7fb 未索引）→ 以页面探针为验收真值（per §12 push 成功≠deploy 成功以页面为准）。
- 语言域断言拦下并纠正 ×9 跨语污染（ja 段 國際認証 等）——语言门童第二次实战。

## 五、下一步

- **10-17 窗恢复系数**（K3 导档后 1 分钟出数）→ 三条件齐 → 解除判定（模板已备）。
- **9.5-B/C**：Heidelberg 独立行表述优化 + SGS 真伪（K3）。
- **9.5 残余**：2 篇 ja 巨型博客专批（需 K3 对実測数据口径表态）+ 1,000+/12-industries 孤立行 + ISO 12647 docket。
- **10/22**：年賀状翻开关（K3 真值 10/21）+ CTR 首判。
