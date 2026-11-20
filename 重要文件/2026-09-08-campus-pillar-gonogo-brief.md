# 校園教育 Pillar go/no-go 决策简报（D-9/2-24 · D-9/7-1，09:00 拍板用）

**拍板人**: K3 · **准备**: M3 · **数据来源**: GSC数据/campus-90d-2026-09-03.json（9/3 15:28 落盘，GSC UI 16 xlsx 校准后，3m 窗口 5/15-9/1）+ 线上实测 + blog-posts.ts L1693-1711

## 0. 一句话现状（与 daily review 口径的重要校准）

**Pillar 页面已在位**：`/en/blog/campus-education-printing-pillar-guide/` 线上 200（9/4 接线修复 404→200 已落），blog-posts.ts meta 已注册（引用 12 queries GSC 取证）。**因此本次 go/no-go 不是"要不要做 Pillar"，而是"要不要投 launch cron + 8/9 校园博客 3-locale 同步推广"（9/14 开学季截止前的执行资源）。**

## 1. 90 天 GSC 证据（12 queries / 411 imps / 1 click）

| 市场 | imps | clicks | 关键词证据 |
|---|---|---|---|
| ja | 343 | 0 | 教科書 印刷 104 imps pos 40.6；教科書 印刷会社 59 pos 62.6；教材 印刷製本 53 pos 52.4（10 queries，排名 29-78，无内容承接） |
| hk | 61 | 1 | 學校印刷 61 imps CTR 1.64% pos 36.5 |
| en | 7 | 0 | **school exercise book printing pos 7.29（首页边缘速赢词）** |

**支持 go**：① en 速赢词已进首页位（pos 7.29），校园 cluster 内容可直接摘果；② ja 需求体积最大（343 imps/90d）但排名 29-78 全线无日语内容承接 = 内容缺口明确；③ 资产协同：證書印刷 pillar（pos 11.4 / CTR 12.5% 全站最高之一）+ 月曆 9/15 硬截止同属校园 B2B 场景；④ 内容资产已备（pillar 在位 + rewrite-pillar-4-quality.py 内 5 产品 × 4 市场完整 schema/FAQ）。

**支持缓**：① 90d 总 CTR 0.24%，远低于品类记分卡"升主营线 CTR >2%"（§11.7）；② K3 口述"7-8 月不时有校园询盘"**仍未按 §0.23 归档**，记分卡条件 1（询盘连续 2 月 ≥3）无法验证。

## 2. 建议：有条件 go

- **go**：launch cron 9/8-9/14 启动，优先级排序 = en 速赢词 cluster（校刊/练习册，直击 pos 7.29）→ ja 教科書/教材 cluster（343 imps 承接）→ hk 學校印刷（pos 36.5 攻坚）；8/9 校园博客 3-locale 按 W7 §F 排期同步。
- **并行验证（no-go 风险对冲）**：9/16 M1 验收时一并复核校园 CTR 与询盘归档；若 10/4 14 天回看仍 0 进位，按记分卡降级观察线处理。
- **红线遵守**（§11.8）：不删现有页面、不回滚已部署 title、新增内容全部走双向内链（證書↔月曆↔校刊↔pillar）。

## 3. K3 需拍 1 段

go（launch cron + 8/9 博客排期启动）/ 缓（先归档询盘数据 9/16 再拍）/ no-go（D-9/2-24 闭项，pillar 保留不撤）。
