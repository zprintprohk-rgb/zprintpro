# 7/31 18:20 GSC 7 天数据 audit + P0 执行计划 (M3 实际思考)

**执行**: M3 root session 18:22 响应 K3 18:22 指令
**数据源**: F:\ 根目录 2 份 GSC zip (7 天 7/23-7/29 + 28 天 7/2-7/29)
**K3 §0.4 铁律**: M3 不得估算, CSV 为唯一真相源

---

## 数据 audit (K3 千问报告 vs 实际 CSV)

### 核心指标 7 天 (ZIP 1 = 7/23-7/29)
| 指标 | K3 千问报告 | 实际 ZIP 1 CSV | 验证 |
|---|---|---|---|
| 总点击 | 39 | 8+2+2+6+5+10+6 = **39** | ✅ |
| 总展示 | 2,527 | 297+349+230+328+427+452+444 = **2,527** | ✅ |
| CTR | 1.5% | 39/2527 = **1.54%** | ✅ |
| 平均排名 | 32 | (需算) | 接近 |

### 核心指标 28 天 (ZIP 2 = 7/2-7/29)
- 总展示 7,772 / CTR 1.52% ✅
- 跟 K3 报告 118 点击 / 7,772 展示一致

### M3 发现的 K3 千问报告错位

| K3 千问报告 | 实际 GSC CSV | 真相 |
|---|---|---|
| `/en/blog/cmyk-vs-rgb-print-color-guide/` 排名 1.44, 6 点击, 16 imps, CTR 37.5% | `https://zprintpro.com/en/blog/cmyk-guide/` 0 点击, 45 imps, 排名 84.07 | ❌ **slug 错** (千问看到的是 UI 截图旧数据, 实际 slug 是 cmyk-guide) |
| 7 天 Top: en cmyk blog 6 点击 16 imps | 7 天 Top: zh-hk `doujin-circle-printing-guide` 5 点击 43 imps 11.63% | ✅ **真高 CTR blog 是 zh-hk doujin, 不是 en cmyk** |
| ja 市场 CTR 从 0.97% 暴跌到 0.31% | ja 7 天总点击 = 0, ja 28 天总点击 = 7 (7/2-7/29 期间 ja 业务弱) | ✅ 但 ja 展示 718 (28 天), 点击极少, ja 内容质量确实需优化 |

---

## M3 实际判断 (跟千问建议差异)

### 千问建议: cmyk blog 加 3-5 个产品内链
**M3 调整**: 优先给 **zh-hk `doujin-circle-printing-guide`** 加内链 (7 天 5 点击排名 5.21, 表现最好), cmyk-guide 排名 84 太弱暂缓

### 千问建议: en/ja 站点审计
**M3 调整**: ja 表现确实差 (28 天 7 点击), 但 en blog `cmyk-guide` 排名 84, 远不如千问报告的 1.44 — **M3 不应按千问的"1.44"判断做决策, 应按实际 84 做决策**

### 千问建议: 6 个金矿词 title/H1 止血
**M3 调整**: 数据确认下滑 (海報 32.57, poster 34.86, 印海報 36.83, 紙袋 33.19, 宣傳單張 39.79, 貼紙 49.46), 7 天 0 点击下滑趋势成立 — **止血有效, 立即执行**

### M3 额外发现
- **zh-hk `mtr-advertising-specs`** 7 天 4 点击 43 imps 9.3% 排名 5.44 (跟 doujin 并列真高 CTR blog, 也应加内链)
- **zh-hk `eco-paper-bag-gsm`** blog 28 天 2 点击 10 imps 排名 4.4 (top blog, 排名最优)
- **en `saddle-stitch-booklets`** 7 天 58 imps 0 点击 排名 78.69 (高展示低 CTR, 同 §6 报告"包装盒/订书机 0 CTR 0 imps"问题类似)

---

## 8/1 push 1 commit 完整方案 (K3 拍板)

### commit 内容 (5 files 改动)

**1. 2 个 zh-hk 高 CTR blog 加产品内链** (核心 §0.7 权重分发)
- `src/app/[locale]/blog/doujin-circle-printing-guide/page.tsx` — 末尾加 3 个产品内链
  - → `/zh-hk/product/doujin-postcard-set/` (锚: "同人明信片印刷")
  - → `/zh-hk/product/doujin-acrylic-keychain/` (锚: "同人亞加力膠牌")
  - → `/zh-hk/product/doujin-can-badge/` (锚: "同人缶バッジ")
- `src/app/[locale]/blog/mtr-advertising-specs/page.tsx` — 末尾加 3 个产品内链
  - → `/zh-hk/product/saddle-stitch-booklets/` (锚: "騎馬釘書刊")
  - → `/zh-hk/product/catalog-printing/` (錨: "公司 Catalog 印刷")
  - → `/zh-hk/product/foil-stickers/` (錨: "燙金貼紙")

**2. 6 个金矿词产品页 meta 止血**
- `/zh-hk/product/a2-posters/` H1 + title + description 改 (針對 海報印刷 / poster 印刷 / 印海報)
- `/zh-hk/product/paper-bags/` H1 + title + description 改 (針對 紙袋印刷)
- `/zh-hk/product/same-day-flyers/` H1 + title + description 改 (針對 宣傳單張)
- `/zh-hk/product/stickers/` H1 + title + description 改 (針對 貼紙印刷)

title 模板: `[关键词] [价格锚点] [交付时间] | 智印港 ZprintPro`
例: `海報印刷 HK$3起 24小時出貨 | 智印港 ZprintPro`

**3. en `cmyk-guide` blog 内链 + 优化** (千问建议, 但按实际数据 84 排名低, 加内链不指望短期冲排名)
- `src/app/[locale]/blog/cmyk-guide/page.tsx` 末尾加 3-5 个产品内链
- + 增加 FAQ section (提升内容质量, 拉排名)

**4. ja cmyk-guide blog 内链** (ja CTR 修复起步)
- 末尾加 3 个 ja 产品内链

**5. matrix.json 新增 entries**
- v7-SKU-37+ (4 个新增 blog → 产品内链矩阵追踪)

### 验证 6 步
1. npx tsc --noEmit
2. npx next build (本地 webpack 验证)
3. pre-commit hook (UTF-8 + 繁体)
4. git commit
5. 1 push
6. verify cron 5min 后跑 6 步 (HEAD 200 + body 关键词含新内链锚文本)

---

## 8/1 时间表

| 时间 | 动作 |
|---|---|
| 8/1 09:00 | M3 写代码 (5 files 改动, 1 commit 准备) |
| 8/1 09:30 | npx next build PASS |
| 8/1 09:35 | git commit (7/31 + 8/1 合并) |
| 8/1 09:40 | 1 push origin_ssh main |
| 8/1 09:50 | Vercel build 1-2 min |
| 8/1 10:00 | verify cron 跑 6 步 |
| 8/1 10:15 | daily cron 触发 (这次不用等 cron, 先推了) |

---

## K3 拍板项 (3 选 1)

### A (M3 建议)
- 优先 doujin + mtr blog 内链 (真高 CTR)
- 6 金矿词 meta 止血
- 1 commit 1 push 8/1 09:35

### B (K3 千问建议)
- 优先 cmyk blog 内链 (按千问 1.44 排名, 实际 84)
- 6 金矿词 meta 止血
- 1 commit 1 push 8/1 09:35

### C (激进方案)
- A + 写 5 篇新 blog (海報/Saddle Stitch/CMYK ja/食品包裝/騎馬釘) + 全部内链
- 2 commit 1 push (blog 单独 1 commit + meta 止血 1 commit)
- 2 push 8/1 (§0.1 违规 1 次, K3 §0.1 例外)

---

## 7/31 闭环现状

- 7/31 push 累计 = 2 (f5700f9 7/31 10:38 + 0b3fd91 7/31 16:10)
- 7 月 quota 10/500 = 2%
- 8/1 计划 push 1 (§0.1 合规) 或 2 (C 方案违规 1 次)
- K3 拍板 8/1 push 时间 + 方案 A/B/C

报告: `.hermes/reports/m3-0731-1820-gsc-7d-analysis-and-p0-plan.md` (本文件)
