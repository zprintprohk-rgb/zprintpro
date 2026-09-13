# T 批（title / schema 面品牌收口）执行规范与冻结声明

**批准**: K3 2026-09-13（转述千问 3.8max 复核：批准做 A，独立 T 批，附带三个前置条件）
**执行顺序**: K3 2026-09-13 拍板 —— **T1 先落 + T2 按文件分批（每批 ≤5 文件，都带回滚映射与探针）**

---

## 1. 冻结声明（T 批窗口内生效）

> **自本文件落库起至 T 批全部完成（T1 + 各 T2 批次）为止，`title` / `metaTitle` / `ogTitle` / `twitterTitle` / `headline` / `h1` 字段冻结**：
> 除 T 批自身外，任何批次（含 cron 自动任务、其他车道）**不得修改**上述字段。
> 起因：此前已发生过「另一批次动 SKU 标题 → 与本批产生合并冲突」的教训（千问 3.8max 点出）。

## 2. 三个前置条件（千问要求，逐条落地）

| # | 条件 | 落地方式 |
|---|---|---|
| ① | commit 内附**回滚映射（旧 title JSON）** | 每批写 `.hermes/rollback-T<批号>-<ts>.json`（逐点 before/after 片段）+ `.hermes/backup-title-T<批号>-<ts>/`（原文件副本）；回滚工具 `scripts/rollback-title-batch.mjs` |
| ② | 部署后**逐点全探** | 每批写 `.hermes/probe-T<批号>-<ts>.json`（受影响页面 URL 清单）；部署后逐 URL 断言品牌口径 |
| ③ | **GSC 观察 14 天** | 批次完成后登记观察窗口（展现/点击/CTR/排名），异常即按回滚映射单批回滚 |

## 3. 批次划分（2026-09-13 实测清单 = 301 处 / 57 文件）

| 批 | 范围 | 处数 | 状态 |
|---|---|---|---|
| **T1** | `src/data/blog-data/{zh-hk,ja,en}.json` | 26（修 24 行） | ✅ 已执行（commit 见下）；守卫复扫 0 命中 |
| **T1b** | T1 内**保留项**：一次性英文括注「智印港（ZprintPro）」×6、英文专有名词 ×2 | 8 | ⏸ 待 K3 语义裁决（是否算「双品牌同现」） |
| **T2-1…T2-n** | 代码/混合面：`sku-seo-data.ts` 47、`blog/[slug]/page.tsx` 45、`products.ts` 26、`seo.ts` 17、`buying-guides.ts` 13、`blog-posts.ts` 9、`pillar-content.ts` 9、`catalog-printing-china` 8、`schema-extensions.ts` 7、`h1-builder.ts` 6、`seo-keywords.ts` 6 … | 275 | ⏳ 每批 ≤5 文件，逐点复核（locale 启发式对三元/模板串可能误判，必须人工过目） |

**清单来源**: `.hermes/title-batch-T-manifest.json`（`scripts/audit-exposure-set.mjs` 与守卫同源口径；`dual` 83 + `lone-mismatch` 218）

## 4. T1 执行记录

- 脚本 `scripts/fix-title-batch-T1.mjs`（计数断言 + 结果形状断言 + 备份，断言未过不写盘）
- 改动：zh-hk 13 行 / ja 10 行 / en 1 行 = **24 行**
- 守卫复扫 `src/data/blog-data`：**🔴 0 / 🟠 0 / 🟡 0**
- 品牌基线：83 → **77**（只许递减）
- 回滚映射：`.hermes/rollback-T1-2026-09-13T10-17-17-122Z.json`（24 点）
- 探针清单：`.hermes/probe-T1-2026-09-13T10-17-17-122Z.json`（22 URL）
- 备份：`.hermes/backup-title-T1-2026-09-13T10-17-17-122Z/`

## 5. 铁律

1. 每批**独立 commit**，可单批回滚（K3 拍板：任何一批出问题都能单批回滚）。
2. 每批必须**先写回滚映射与备份，再写盘**（§12 三件套）。
3. 触碰 title 字段的批次**必须**在本规范登记（批次号 / 文件 / 处数 / 回滚映射路径 / 探针清单路径）。
4. T 批全部结束后：复审 `docs/2026-09-13-guard-exemption-policy.md` 的 C 档豁免（sunset 条款）。
