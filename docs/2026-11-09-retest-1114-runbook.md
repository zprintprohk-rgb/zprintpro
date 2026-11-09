# 11-14 首轮复测 Runbook（预注册 · 确定性执行）

> 依据：`2026-11-07-three-market-seo-aeo-geo-flywheel-strategy.md` §7（11-14 重点词复测）· §8 学习门槛 · `docs/2026-11-09-three-site-inventory-flywheel-next-step.md` §3.4（A/B/C 回写与复测口径）
> 性质：复测口径预注册（L1 交付）。基线全部来自已登记文档/JSON，**复测执行 = 跑一条命令**，消除口径漂移空间。

## 一、前置：已部署变量清单（confounders 预登记，11-14 复测前不得新增）

| 变量 | commit | 上线 | 归属粒度 |
|---|---|---|---|
| catalog en H1 `100+→10+`（A） | `a33abd3b` | 11-09 | en `china catalog printing` 族 |
| catalog zh desc `100 起→10 本起印` + 去重（B） | `392c5f30` | 11-09 | zh-hk 畫冊印刷族 |
| catalog ja desc `100〜→10冊〜`（C） | `392c5f30` | 11-09 | jpn カタログ印刷族 |
| risk-query 四修复（A2/教材/コミケ 价格 MOQ 口径） | `74ffa5a9` | 11-08 | 各自词簇 |
| 海报/喜帖主承接分工 + 内链 | `9acc3d16` | 11-08 | 海報印刷 / 喜帖印刷 |
| 月曆过期口径收口 | `c0552853` | 11-03 | 月曆印刷（11-10 复测窗） |

## 二、已预登记基线（同口径锚点）

| 项 | 基线 | 来源 |
|---|---|---|
| `china catalog printing` | **98 imp / 14.15 / 0 clk**（28d to 11-07）+ PDP 份额 **72.7%** | money-keyword-delta 11-07 + money-kw CSV |
| `教材 印刷製本` | jpn **47 imp / 29.98**（API）+ blog pos **11.97**（query×page） | 14q snapshot + money-kw CSV |
| 海报/喜帖承接 | 海報印刷 blog 37%→category 分工；喜帖 thank-you-cards PDP 73% | money-kw CSV + 9acc3d16 |
| 貼紙印刷 14d | 38.06（HOLD，目标 ≤25 未达） | 11-04 判定（11-13/11-21 窗） |
| 年賀状簇 | **7 imp / 0 clk / 5 国**（jpn 首展 pos 10.00） | end1103 修正验证 |
| 恢复系数 | 最后官方 **123.7%**（11-03 detector）；复测日若无当日 detector 记 `available:false` | gsc-cliff-2026-11-03.json |

## 三、执行方式（复测日跑一条命令）

```powershell
# 1) 20:13 gsc 车道拉取新 API 档（--end=复测日前一日）后：
node .hermes/_retest_1114.cjs --qc=GSC数据/gsc-query-country-28d-end1108.csv --qp=GSC数据/money-kw-query-page-country-2026-11-XX.csv
# 2) 输出：.hermes/logs/gsc-2026-11-14-retest-run.json（10 词 × 国家粒度 + 页级份额 + 判定规则内嵌）
```

- 脚本行为：新 CSV 缺失 → `NO_NEW_DATA`（不编造）；列序按 `查询,国家,点击,展示,CTR,排名`（已含 clicks≤impressions 自检教训）；页级份额仅在 qp 档存在时计算。
- **自检已通过**（end1103 + money-kw 10-31 空跑）：教材 47/29.98、nengajo 5 国、PDP 72.7% 与基线全部一致 → 计算路径可信。

## 四、判定规则（与 §8 对齐，防止把窗口移动当成效）

1. catalog A/B/C：按各自**查询粒度**对基线（en 98/14.15；zh/ja desc 族以 11-14 当窗新基线为准，11-09 部署前无独立 desc 基线 → **首窗只判方向与真值一致性，不判成效**）；14.15→≤10 且 imp 不塌 = 进入 11-21 二窗；imp 塌或 pos 退 = 查 confounders。
2. 海报/喜帖分工：看主 URL 份额是否向拍板页收敛（无收敛 ≠ 失败，记录即可）。
3. 教材：blog pos 是否脱离 10-12 边界带；价格真值上线后的 CTR 变化只作方向记录。
4. 年賀状：imp/clk 是否随季节窗增长（只测量，K3-5 未拍板不动作）。
5. SERP 不可得 → 如实记 `SERP_UNAVAILABLE`，不以普通快照顶替。
6. 全部结论落 `.hermes/logs/`，不冒充车道报告；六件齐才可标 FIX_DEPLOYED→MEASURE→（需 scale_evidence）SCALE。

## 五、数据来源

- 基线：`gsc-2026-11-07-money-keyword-delta.json` · `gsc-2026-11-04-handoff-14q-snapshot.json` · `gsc-2026-11-04-taskj-third.json` · `gsc-2026-11-04-nengajo-break-zero-verification.md`（即 `.hermes/logs/2026-11-04-*` 族）
- 部署证据：`2026-11-09-p0-catalog-h1-execution.md` · `2026-11-09-p2-catalog-desc-execution.md` · `.hermes/logs/2026-11-08-risk-query-priority-execution.md` · `2026-11-08-poster-wedding-primary-url-execution.md`
- 复测脚本：`.hermes/_retest_1114.cjs`（含 NO_NEW_DATA 守卫与判定规则内嵌）
