# E6 eco-paper-bag-gsm 退场诊断（展示 103→0）

> 任务源: `docs/2026-10-26-dual-engine-seo-aeo-geo-deep-strategy.md` §5.1 E6（en 作战清单）——「先查 URL Inspection、近 4–8 周变更史、内链与收录，不盲改」。
> 执行: DeepSeek 执行层 · 2026-10-27 01:32 · **诊断交付物，不触 src 内容**（策略明确禁止直接重写）。
> URL: `https://zprintpro.com/en/blog/eco-paper-bag-gsm/`

## 1. 数据来源行（§0.23）

- 线上探针: `.hermes/_probe_e6.py`（urllib 带 UA，2026-10-27 01:32 Asia/Shanghai）。
- 内容源: `src/data/pillar-content.ts` L400-432（ecoPaperBagGsmCluster，blog/[slug] 经 `getClusterBySlug` 渲染）。
- 描述对照: `src/data/cluster-content.ts` L266（slug `blog/eco-paper-bag-gsm`）。
- GSC 展示数据（103→0）: 策略文件引用 gsc-deep-analysis-2026-10-26（内部，不进入客户可见内容）。

## 2. 线上健康探针（三闸门，§0.23.2）

| 检查 | 结果 |
|---|---|
| HTTP 状态 | **200**（有效响应，非 404/软 404） |
| X-Robots-Tag | 无（未被边缘拦截） |
| canonical | `https://zprintpro.com/en/blog/eco-paper-bag-gsm/`（自指 ✓） |
| meta robots | 存在但非 noindex（页面 166KB 正常渲染） |
| 页面尺寸 | 166,099 bytes（内容完整） |

**结论**：抓取/索引层技术健康——不是 robots/301/404/canonical 类故障。

## 3. 内容与数据诚信问题（发现）

### 3.1 Dual-source 带宽口径漂移

| 源 | 位置 | 克重带宽口径 |
|---|---|---|
| `cluster-content.ts` | L266 description | **120gsm-350gsm** |
| `pillar-content.ts` | L409 title / L419 body | **120g-250g**（线上实际渲染此源） |

- blog/[slug] 路由用 `getClusterBySlug`（pillar-content）→ 线上显示 120g-250g。
- cluster-content.ts 的 350gsm 描述**未上线**（该文件无 app 消费，`git grep "from '@/data/cluster-content'"` 0 命中）。
- 影响：描述与正文带宽不一致是**数据卫生问题**，但非线上可见；350 可能是历史遗留（早版本曾覆盖到 350g）。

### 3.2 三语 PDP 内链不对称

| locale | 内链数 | PDP 链接 |
|---|---|---|
| zh-hk | 3 | kraft-paper-bags + white-card-bags ✓ |
| en | 3 | kraft-paper-bags + white-card-bags ✓ |
| ja | **1** | **无**（仅 packaging-guide） |

- en/zh-hk 的采购闭环完整（GSM 指南 → 纸袋 PDP）；ja 缺采购承接。
- 策略 §5.4 内链规则：语义一致的 H2 下采购段末放自然锚；ja 属于可补项但**含新内容决策，非无风险内链**（周末闸门约束）。

### 3.3 内链指向孤立

- 指向 eco-paper-bag-gsm 的仅：breadcrumb-names（面包屑）+ cluster-content/pillar-content（集群元数据）。
- **无其他页面自然内链指向**（hub 内部互链在 pillar 集群内，页面自身是 cluster 成员）。
- 策略 E6 停止条件：「200 + index/follow + 自指 canonical 不能证明已被索引」——线上健康 ≠ 已被索引。

## 4. 变更史（近 4-8 周）

| commit | 日期 | 内容 |
|---|---|---|
| 7119c4a5 | 10/26 | CAT-P0-06 catalog 内部 ranking target 泄露清理（blog-data + blog-posts + books） |
| 02369b16 | 10/25 | blog 价格族对齐 poster/paper-bag 3语 + books title/bulk |
| 77e88deb | 10/22 | sprint wave2: B 组 12 h2（含 packaging/paper bag 相关规格） |
| d576349c | 更早 | SEO batch2: 6 内链（eco/menu → packaging） |

- 近期多为**批量改写**（12 段骨架、价格族、泄露清理），eco-paper-bag-gsm 作为 cluster 成员随批被动变动。

## 5. 根因假设（按可能性排序，待 K3 GSC 侧验证）

1. **收录/查询关联变化**（最可能）：URL Inspection 显示已抓取但查询不再关联，或索引状态变化——需 K3 GSC URL Inspection 确认「已抓取未索引 vs 已索引未匹配」。
2. **内容批量改写后的相关性漂移**：10/22-10/26 多次 12 段重构/价格族重写后，页面主题重心与「eco paper bag gsm」查询的匹配度可能变化（title 现为 "Eco Paper Bag GSM Guide | 120g-250g Selection" 主词尚在）。
3. **描述带宽漂移**（低概率直接因果）：cluster-content 350 未上线，线上 title/description 均为 120g-250g，一致。

## 6. 执行边界（策略 E6 明示）

- ❌ **不直接重写** eco-paper-bag-gsm 内容。
- ❌ **不**仅凭「200 + index/follow + canonical」判定已索引。
- ✅ **下一步**：K3 在 GSC → URL Inspection 查该 URL 的「抓取状态 / 索引进度 / 被查询关联」，并按 §5.1 E6 停止条件回传证据。
- ✅ **可执行项（待 K3 拍板后）**：ja 补 PDP 采购链接（非无风险内链，需单独决策）；描述带宽统一为单一 SSoT 口径（350 或 250 由 K3 定）。

## 7. 结论

- **线上技术层健康**（200/canonical/index 标记正常），103→0 不是抓取故障。
- **发现 2 项数据卫生问题**：①cluster-content description 350gsm 漂移（未上线，需清理或标注）②ja 缺 PDP 采购链接（结构性缺口）。
- **根因待 K3 GSC URL Inspection 确认**（收录/关联层），本诊断不越过「不盲改」边界。
