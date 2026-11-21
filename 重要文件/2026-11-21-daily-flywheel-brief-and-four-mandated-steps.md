# 2026-11-21 飞轮日brief：四大指令项执行 + 三线盘点（9月对比 / 调度器审计 / 关键词矩阵）

> VERDICT: EXECUTED（①SMALLBATCH 复测落账 ✓ ②周六 Blog＝NO_OP 交 Harness 19:08 新职责 ③海报/教材/C109 诊断 ✓ ④query×page＝NO_DATA 如实记录）
> 数据来源:
> - `.hermes/logs/gsc-2026-11-19-four-window-analysis.json` + `gsc-2026-11-19-money-keyword-delta.json`（最新批, 数据日 11-16, 双方法 openpyxl×pandas 8 批 match）
> - `.hermes/geo/2026-11-21-gsc-september-vs-now.md`（B 车, 9 月对比 + 图表 docs/assets/2026-11-19/）
> - `.hermes/geo/2026-11-21-scheduler-lane-audit.md`（C 车, R1-R13 对照表）
> - `.hermes/geo/2026-11-21-keyword-classification-matrix.md`（D 车, 15 站竞品 URL + Top10 分值）
> - `.hermes/geo/2026-11-21-directive-digest.md`（A 车, 11-19/11-20 指令解读）
> - `.hermes/logs/verify-2026-11-19-smallbatch-truth-residual.md`（SMALLBATCH 线上断言 PDP PASS）
> 校准日期: 2026-11-21（GSC 数据滞后声明: 最新数据日 = 11-16）

## §1 四大指令项（11-20 文件 §8 11-21 行 + 11-19 §12）

| # | 指令 | 执行结果 |
|---|---|---|
| 1 | SMALLBATCH 7d 复测（追加 measurement_history） | ✅ `重要文件/blog-money-keyword-queue.json` stickers-en 条目追加首条 history：`small batch sticker printing` 21 imp / 0 clk / **pos 7.52**（7d 窗 11-10..11-16）。**判读：窗口未满**（数据日上限 11-16 = 部署后仅 ~3 天曝光）→ 按「不用移动窗口判胜」不作胜负判断；imps 46→21 低展示词高方差无因果；28d 决策窗维持 11-28。部署锚 ff97d235 + 11-19 线上断言 PDP PASS/residual 0 已链入台账 |
| 2 | 周六 Blog 恢复单篇补缺（海报既有文复写或 NO_OP） | 生产职责 = Harness 19:08（prompt `harness-blog-single-fix-20261120.md` 已在库）→ **编排层不代写**（新架构 Blog=车道职责 + 本批纪律）。**11-21 上午复核（10:4x）：当时 18:17/19:08 窗口未到、入口零活动 → NO_OP 为暂定判定，19:08 窗过后由下一轮终判（若车道届时仍零活动则 NO_OP 落锤）**；海报文候选建议已备好（§3），留给下周六 19:08 新职责或终判后人工窗口执行 |
| 3 | 海报/教材/C109 承接诊断（只诊断不改 title） | ✅ 见 §3 |
| 4 | query×page 承接复测（三议程首个 7d 可读窗） | **NO_DATA 如实记录**：最新 query×page 导出仍 = `money-kw-query-page-end1031.csv`（STALE）；每日三档 11-17/18/20 三批缺。三议程效果判定顺延至导出恢复（需 K3） |

## §2 GSC 最新批判读（数据日 11-16）+ 9 月对比

**7d streak**：曝光连续 7 批升（5635→8283）；点击自 11-11 峰 158 连降 3 批至 130（−17.7%）；CTR 连降 3 批（2.10→1.57%）；排名自 13.56 连差 2 批至 15.52 → **「曝光↑点击/CTR↓」稀释形态**（新内容/新词进池但摘要不够好——与 zero-click 同根）。

**confirmed worse 9 词**（海報印刷/宣傳單張/喜帖印刷/小冊子印刷/證書印刷/易拉架印刷/教材印刷製本/コミケ印刷/印刷）· **better 5 词**（月曆/貼紙/可移貼紙/摺頁/紙盒印刷）。證書印刷 10.78→**12.22 两窗连差未回页一**（certificates meta 修复 11-16 晚部署, 本窗几乎不含——下批首读）。

**9 月前两周基线（09-01..09-14: 188 clk/10,841 imp/CTR 1.73%/pos 16.16）→ 同长 28d 全正向**：点击 +56%、曝光 +34%、CTR +0.28pp、排名 −3.78；但页一词数 8→6、en/ja 三词回撤（教材印刷製本 +32.95、a2 poster +22.15、small batch stickers 跌出页一）= **大盘净改善 + 尾部三词回撤**的组合，回撤词进诊断队列（§3）。

**page1_zero_click**：核心 4 词未变（书籍印刷/食品包裝印刷/small batch sticker printing/卒アル販売）+印刷廠；食品包裝印刷 125 imp/0 点击/pos 7.93 仍最大缺口（11-18 meta 修复不在本窗, 冻结观察）。

## §3 海报/教材/C109 承接诊断（只诊断）

| 载体 | 28d 页聚合（数据日 11-16） | 诊断 |
|---|---|---|
| /zh-hk/blog/poster-printing-guide/ | **1194 imp @ 10.86** | **海报簇真正承接页且贴页一线**——大池在 blog，PDP 与 category 分流 |
| /zh-hk/product/a2-posters/ | 825 imp @ 12.98 | 11-18 直答块+FAQ 不在本窗；11-13 title 批已入站；下批（11-24 数据）首读咬合 |
| /zh-hk/category/posters/ | 329 imp @ 37.82 | 深位异常（同 books 51.04 形态）——query×page 恢复后验证是否 self-cannibalization |
| /zh-hk/comiket-c109/ | 538 imp @ **9.46 页一守住** | C109 已闭幕、季节性退坡属预期；不再投资，内链导向常青页收割 |
| ja 教材印刷製本 | query 40.0（+32.95 回撤） | ja 簇无专用承接落地；按指令只诊断——候选动作留 12 月资源分配 |

**结论**：海报簇杠杆 = blog 承接页的摘要/直答（贴页一线 10.86）而非再改 title；a2 等下批数据；C109 停投。

## §4 调度器审计（C 车）——K3/管理员侧清单

- **半活**：触发层在（7 任务在册 State=Ready）但全部 `LogonType=Interactive` → 夜间/清晨 0x800710E0；今晨 06:43/07:10 再拒。
- **11-20「手动调度器重建」未发生**（Windows 层零变更）；实际只有 11-19 14:39 管理员应用了 Harness 2 任务（推翻 11-19 文档「未应用」声明）；11-20 18:56 修复脚本被 watchdog-canary 守卫拦下中止（零变更）。
- **已好转**：DeepSeek 额度恢复（11-20 起 dsh_exit=0）；11-20 晚 gsc-feedback（PARTIAL, push fb62b52b）+ daily（PARTIAL）成纱；weekly-meta 触发但 finalize exit 4（guard 拦 9 src 文件——**11-21 等价性已核验关闭**：被拦文件系并发 K3 真值批的进行中工作树, lane 自身任务 HOLD 零改动；该批经 99902084/42223814 全量落地在 main（双方法：谱系+树差 436+/746- 吻合 + lane 报告自述）；无工作丢失, guard 防双写按设计生效。终判见 `.hermes/geo/2026-11-21-scheduler-lane-audit.md` §R14）。
- **待 K3/管理员**：S4U canary→四方验收→-All 流程、watchdog 重建（06:43/S4U/无 RestartOnFailure）、Harness 4 入口粘贴+停用 GSC/monthly 重复入口、cron-lanes.json/lane-status 同步、query×page 每日三档恢复、k3-review 连 4 天缺的积压。

## §5 关键词矩阵结论（D 车）

- **真带钱词 Top10**（距页一×曝光）：宣傳單張 3792 / 貼紙印刷 3342 / 書刊印刷 3169 / 宣傳單張印刷 2401 / コミケ印刷 2067 / 禮盒訂製 1863 / 教材印刷製本 1740 / 月曆印刷 1667 / 海報印刷 1541 / 紙盒印刷 1520。
- **速赢层**（距页一≤5）：證書印刷 10.78 · doujinshi printing 10.80 · 香港印刷 11.37 · 小冊子印刷 11.92 · 可移貼紙 13.19 · china catalog printing 13.98。
- **竞品格局**：港站头部 snippet 标配 = 每品明价 + MOQ 枚举 + 即日钩子（我们 zero-click 主因 = SERP 无明价无 MOQ——11-18 schema=MOQ 价阶 + meta 单变量正对向）；日本头部靠「单价可算 + 起订直给」（raksul 1 枚起/graphic 100 部 1,690 円/megaprint 950 円）；名刺/年賀状受 §0.0 展示裁决与真值门约束，裁决前只内部承接。
- **承接缺口**（NO_CURRENT_BASELINE）：ja 行业 5 词 + 教科書印刷 + holiday cards 无精确基线——按 11-19 §1「缺行写 NO_CURRENT_BASELINE，不是零需求」。

## §7 委派覆盖核对（reconciliation）

- 4 车侦察全部 settled：4 usable / 0 failed / 0 stopped / 0 empty。B、C 两车自行落盘其产物；**A（指令解读）与 D（关键词矩阵）两车为只读权限无法写盘**（各自如实申报），其全文由编排层代为落盘为本文件所链的 digest 与 matrix——内容未失，仅有转手。
- **未覆盖/降级项（如实声明）**：① A 车提及 11-20 文件 §8 两周日程表 14 行未逐行转录进 digest——SSoT 仍是源文件（重要文件/2026-11-20-...md §8），digest 仅保留行级要点（11-21 行已全文引用）；② C 车审计中一项明示「未逐文件核」：weekly-meta 被 guard 拦的 9 个 src 文件与后续 K3 拍板落地的 99902084/42223814 是否等价——留作开放项；③ query×page 复测 = NO_DATA（导出供给缺失，非侦察缺口，§1 已记录）。

## §6 明日/本周

- 11-22：SMALLBATCH 窗口判定维持至 11-28 决策级窗；blog 单篇若 19:08 Harness 未跑 → NO_OP 如实记。
- 11-24：W4 第 4 轮 + 11-24 数据批首读（certificates meta / a2 直答块 / 食品包裝 meta 三个咬合判定 + 證書印刷是否回页一）。
- 11-28：SMALLBATCH 28d 决策窗 + 两周计划终审（继续/停止/回滚）。
- 等待 K3：§4 清单六项。
