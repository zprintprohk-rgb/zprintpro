# GSC 热度下降词最优方案执行报告 — 2026-09-14

> 触发: K3 提供 GSC 界面数据洞见 (点击 344 ↑61% / 展示 2.1万 ↑80%) + 热度下降词判定, 指示「思考理解问题，分析研究后按最优方案执行」
> 依据: `.hermes/logs/2026-09-14-gsc-falling-analysis.md` (§4 最优迭代方案 P0-1/P0-2/P1-1/P1-2)

---

## 0. 数据来源 (§0.23 必含)

```
数据来源:
- 词级真值: .hermes/hk28d-queries.json (9/10 xlsx 28d hk 78 词) vs GSC数据/gsc-fresh-2026-09-03.json (9/3 Top100)
- 类目页正文源: src/data/category-seo-content.ts (posters L3280-3392 / menus L1010-1118 / banners L415-509 / packaging L82-196)
- 博客注册表: src/data/blog-data/zh-hk.json (slug 实存核对)
- K3 拍板: 9/12 8 T1 锁词攻坚 + 9/13 指令 (分析报告为执行依据)
- 线上探针: 无 (本次为内容层改动, 上线后由 cron 探针验证)
```

---

## 一、幂等核对 (先查后做, §0.24 + R4)

| 方案项 | 核对结果 | 处置 |
|---|---|---|
| P0-2「优先写 Q-002 cosmetics 博客」 | **Q-002 7/7 已部署** (matrix covered + 3 locale blog-data 全在线, verify PASS) | **不重写** (幂等铁律); 包装簇改走类目页泛词段 |
| P0-1「8 词攻坚②补锚」 | 今早 daily 试射任务 J 已完成 (21 锚 + typo/URL 修复) | 不重复; 只补本次 4 簇场景词 |
| 戶外橫額 / 戶外海報 | 类目页已覆盖 (各 3 处) | 不重复加 |

---

## 二、执行内容 (1 文件, 4 处编辑 + 1 死链修复)

### 1. posters 类目页 — P0-1 海報簇 3 词场景段 (新增)

- **补词**: `海報列印` (0→1 处) / `a3海報` (0→1 处) / `戶外海報` (已 3 处, 场景强化)
- **落点**: buyingGuide 段落末尾
- **内容**: 香港街招/展架/櫥窗/圍板场景 + 尺寸-解析度-材质联动 (a3=420×297mm 150dpi / A1-A2 72-100dpi / 戶外 PVC 網布 2-3 年) + 内链 [海報印刷指南](/zh-hk/blog/poster-printing-guide/)
- **title 未动** (51 当量 OK 区, per §4 明确"不超 54 不重写")

### 2. menus 类目页 — P1-1 餐牌簇 膠片 vs 膠卡 对比段 (新增)

- **补词**: `膠片餐牌` (1→2 处) / `膠卡餐牌` (1→2 处)
- **策略**: 用上升词 膠卡餐牌 (Δ+4.45) 给下降词 膠片餐牌 (Δ-2.81) 导流 — 同簇对比段内链互挂
- **落点**: buyingGuide 段落末尾 + 内链 [餐牌印刷指南](/zh-hk/blog/restaurant-menu-printing-guide/) (实存)

### 3. banners 类目页 — P1-2 橫額簇 車身廣告 场景段 (新增)

- **补词**: `車身廣告` (0→1 处) — 8/27 警告词之一, 展示流失簇
- **落点**: buyingGuide 段落末尾
- **内容**: 流動廣告牌场景 (PVC 車貼/噴繪橫幅布, 防水防 UV, 1-3 年) — 无内链 (该类目无对应 blog, 避免死链)

### 4. 死链修复 (顺带, §13.6 红线)

- **发现**: 类目页 13 个 blog 内链中 `poster-buying-guide` 为**唯一死链** (4 处: posters buyingGuide 2 + links 2)
- **根因**: 8/26 攻堅批写入时 slug 已改名 (实存 = `poster-printing-guide`)
- **修复**: 4 处 href 统一改 `poster-printing-guide`, 复扫 0 死链

### 5. lastUpdated 更新

- posters: 2026-08-21 → **2026-09-14**; menus: 2026-08-22 → **2026-09-14**; banners 无此字段 (结构保持)

---

## 三、验收 (全绿)

| 项 | 结果 |
|---|---|
| 词覆盖 | 海報列印 1 / a3海報 1 / 車身廣告 1 / 膠片餐牌 2 / 膠卡餐牌 2 |
| 死链复扫 | 0 (修复后) |
| encoding | 3 文件 UTF-8 LF ✅ |
| tsc | 54=54 基线持平, 0 新增 (category-seo-content 相关 0) |
| diff 逐行 | 只含本次范围 (12+ / 6-) |
| 硬闸门 | BC 扫描 0 阻断 (名片已解禁, 报告式) |
| 内链目标 | poster-printing-guide ✅ / restaurant-menu-printing-guide ✅ 均实存 |

---

## 四、验收边界 (不虚报)

- 本次为**内容层补词**, 词级效果需 9/17 干净窗验证 (§4 验收: 戶外海報回 18 内 / 膠片餐牌回 17 内 / 包裝盒回 30 内)
- Q-002 博客**已存在** — 「优先写」判断过时 (queue 残留, covered 已有), 本批不重复写; 包装簇类目页泛词段已充分 (10 段 buyingGuide), 未追加
- sitemap/scripts 9/13 遗留改动**未混入本批** (另批处理, 避免风险面扩散)
- 未 push 前探针 (线上未部署); push 后由 §12 SOP + cron 探针兜底

---

## 五、SOP-10 5 问门禁

1. **架构差异?** 查 8/27 GMC 修复计划 + 9/12 T1 攻坚拍板 + 今早试射报告 (任务 J 已做锚); 本次在既有类目内容结构内补段, 无新架构
2. **约束适用范围?** 9/12 拍板「8 T1 锁词攻坚」+ 分析报告 §4 最优方案 = 执行依据; 不触业务 0 改动红线 (不删 SKU/文案), title 不重写 (51 当量)
3. **原数据/拍板来源?** 词级真值 = 9/10 解析 vs 9/3 canonical; 数字 (尺寸/解析度/材质寿命) 全部沿用类目页既有字段值, 未新造
4. **字段值策略?** 仅 buyingGuide 段落追加; 无 certNo/联系方式类字段
5. **Markdown 渲染?** [text](url) 链接 → 类目页既有渲染管线 (parseInlineLinks), 未引入裸文本渲染

---

## 六、部署 & 遗留 & 下游派单

### 6.1 部署记录 (push 已落地)

- commit: `13a2725e` (main, 2026-09-14 09:42 +0800) — fast-forward push `a6922c56..13a2725e`
- 今天唯一 push (距上次 9/13 18:54 > 30min 硬下限, quota 合规)
- 可推清单 5 条全绿: 路径排除 ✓ / 秘密 0 ✓ / 旧图 0 ✓ / 三闸门 (encoding 基线 + tsc 54=54 + build) ✓ / verify-deploy 待 build 完成复跑
- 分支策略: 本批为小改动 (≤3 文件 src 行为修复), 按 §0.25.10 直推 main; 原 redesign/plp-pdp-v9 分支历史未动 (28 commits 领先系既有状态, 非本批引入)
- verify-deploy: `13a2725e` 查询时 build queued → 待 1-2 min 后重跑确认 CF Pages success + 关键 URL curl 200 (§12 不豁免)

### 6.1.1 部署验证结果 (2026-09-14 09:47 终验)

- CF Pages build: **success** (run 103832037043) — `node scripts/verify-deploy.mjs 13a2725e` → `PASS — deploy is live`
- 线上探针 5 URL 全 200: posters/menus/banners 类目页 + poster-printing-guide + restaurant-menu-printing-guide 博客
- 新段渲染: posters (海報列印/a3海報/戶外海報/poster-printing-guide) ✅ / menus (膠片餐牌/膠卡餐牌/restaurant-menu-printing-guide) ✅ / banners (車身廣告) ✅

### 6.2 遗留 & 下游派单

- ⏳ 9/17 干净窗: weekly-meta 复核 4 簇词 7d 环比 (戶外海報/包裝盒/膠片餐牌/戶外橫額)
- ⏳ 9/17 后: gsc-feedback 8 T1 词首轮可判定数据拉取
- ⏳ push 后线上探针: 3 类目页 200 + 新段渲染 (cron/手动兜底, verify-deploy 复跑)
- 📌 sitemap 6 文件 + scripts 5 文件 (9/13 遗留) 待另批 commit

---
*deepseek harness 执行层 · 2026-09-14 09:40*
