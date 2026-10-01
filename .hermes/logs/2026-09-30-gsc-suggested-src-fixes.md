# GSC Suggested src Fixes — 2026-09-30 (ZP-gsc-feedback lane 上报 · 待 K3 拍板排批)

> 本文件由 gsc-feedback lane 产出 (本 lane 写权限仅限 .hermes/, **无 src 写权**, per T2 cron 治理)。
> 所有改动建议须由 daily-content / weekly-meta lane 或人手会话执行, 执行前必过 §0.35.7 双条件判定 + 门童全量。
> 数据来源: .hermes/logs/2026-09-30-gsc-feedback.md (9/29 档 + 线上实测 2026-09-30)。

## 背景

8 T1 锁词锚文本审计 6/8 达标, 2/8 跌破精确锚 ≥3 红线 (v9.3 任务 J 攻坚动作 ②):

| 词 | 现精确锚文章数 | 红线 | 缺口 | GSC 3mo 信号 (9/29 档) |
|---|---|---|---|---|
| 宣傳單張 | 2 | ≥3 | -1 | 417 imps / pos 38.02 / 1 click (刚破零) |
| 包裝盒訂製 | 2 | ≥3 | -1 | 192 imps / pos 31.11 / 0 click |

另: 5 词较 9/18 退潮 (騎馬釘 13→7 / 即日印刷 7→3 / 書刊印刷 5→3 / 貼紙印刷 5→4 / 宣傳單張 7→2) — 根因 = 近日内容演进把精确锚改成长变体锚 (`宣傳單張類目頁` 等) 或下线旧锚文。

## 修复建议 (按优先级)

### F-1 宣傳單張 精确锚回補 (缺口 -1, 成本 ≈ 0)

- 位置: `src/data/blog-data/zh-hk.json` L96 (傳單指南, slug 含 `flyer-printing-guide` 系) 首段锚 `印刷傳單` 后补 1 条 `<a href="/zh-hk/category/flyers/">宣傳單張</a>` 精确锚;
- 或 L462/L471 長變體锚 `宣傳單張類目頁` 拆出 1 条精确锚 (保留长变体亦可, 精确锚新增 1 条即可)。
- 验收: grep `>宣傳單張</a>` 文章数 ≥3。

### F-2 包裝盒訂製 精确锚回補 (缺口 -1)

- 位置: `src/data/blog-data/zh-hk.json` L131 (包裝盒訂製指南) 已有 2 条精确锚; 在 L144 (跨境電商快遞盒) 或 L305 附近新增 1 条 `<a href="/zh-hk/category/packaging/">包裝盒訂製</a>`;
- 验收: grep `>包裝盒訂製</a>` 文章数 ≥3。

### F-3 en/ja saddle-stitch + 教材製本系 title/meta 加强 (机会层)

- 依据: 9/29 档 risers — `saddle stitched booklets` 7d pos 8.0 (3mo 66.5, dpos +58.5) / `saddle stitch booklet` 7d 19.8 (75.9, +56.2) / `教材 製本` 7d 13.5 (57.0, +43.5) / `教材 印刷 製本` 7d 11.0 (48.4, +37.4)。
- 建议: weekly-meta lane 对 en `/en/category/books/` + ja 对应教材/冊子页做 title/meta 加強 (50-57 当量, 门童 #27 过审)。
- 红线: 不改 slug / 不砍页 / 不回滚已部署 title; 数字钩子冻结令 9/30 已到期, 按 v5 规则执行。

## 执行纪律

1. 执行 lane 须先看 `.hermes/locks/lane.lock` + `SESSION_LOCK.md` (§0.35.7 双条件)。
2. 执行后跑门童: `node scripts/guards/title-v5-guard.js` (涉 title) + `check-i18n.js`。
3. 回填: 执行 lane 在当日报告写 "锚文本 8/8 复核" 并更新 matrix `gsc_feedback_<date>.anchor_text_audit_8_words_zh_hk`。

## 挂账 (非本文件范围, 同步提醒)

- Q-P1-01 `improving-print-quality-guide` / Q-P1-03 `2026-calendar-printing-timetable` 死 slug (9/18 挂账, 已 12 天) — 待 K3 拍板 (a) 补写 or (b) 撤项。

---

*ZP-gsc-feedback lane · 2026-09-30 · 只报不改, 待 K3 排批*
