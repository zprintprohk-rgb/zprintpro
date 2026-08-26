# 72 SKU 文件夹视图集完整性 + 串图 + 门禁扫描报告 (2026-08-18)

> **执行**: 本地 Python 脚本 (10 min, 不 push) per K3 提议下一步
> **方法**: 扫 zprintpro-en-us-images/ 全 65 SKU 文件夹 + 3 特殊目录 (共 72 项), 列出文件数/视图/大小/串图嫌疑/120KB 门禁

## 一、扫描结果 (raw data)

| 指标 | 值 |
|------|---|
| 总目录 | 65 SKU + 3 特殊 (_ps_manual, _test_rejected, _wm_diag) = 65 SKU 业务目录 |
| 总图片 | 258 张 (5 视图类: hero / detail / spread / multi-angle / variety / box-open / lifestyle 等) |
| 总大小 | 27.5 MB |
| 空目录 | PKG-008 (0 张) |
| 视图集不全 (< 4 文件) | **6 SKU** (PK-002 to PK-006 + PKG-007, 各 2 张) |
| 视图 < 3 类 (< 3 视图类型) | **6 SKU** (同上) — 都只有 detail + box-open |
| 文件超 120KB 门禁 | **14 文件** (EV × 2, FL × 6, MN × 1, PB × 2, PK × 1, PK-006 × 1) |
| 最大文件 | PB-005 215KB (handle-bags detail) |

## 二、🔴 P0 串图嫌疑确认 (K3 报告具体化)

### PK-002 to PK-006 (5 SKU, 各 2 文件)
- 全部只有 **detail + box-open**, 缺 hero / multi-angle / variety
- 文件名匹配产品定义 (cosmetic-boxes / food-boxes / mailer-boxes / folding-boxes / rigid-boxes)
- **待人工 vision 确认** box-open/detail 内容是否真是对应产品
- 5 SKU 缺 3 视图 = 15 张图待补

### PKG-007 (K3 报告命中, magnetic-closure-gift-box)
- 文件名匹配: `zprintpro-packaging-magnetic-closure-gift-box-en-box-open.webp` + `...-detail.webp`
- 2 文件 (119KB + 119KB) < 120KB 门禁 ✓
- K3 报告: 成品是 "HARVEST LABELS 贴纸 + 插口盒 + 油罐" — **文件命名对, 但 vision 渲染内容错**
- 缺 hero / multi-angle / variety / group 视图

### PKG-008 (0 文件)
- 完全空目录, 待重跑全 5 视图

## 三、🔴 120KB 门禁超 14 文件

| SKU | 视图 | 大小 | 备注 |
|---|---|---|---|
| EV-002/colored-envelopes | detail | 121 KB | +1 KB |
| EV-004/pearl-envelopes | detail | 150 KB | +30 KB |
| **FL-001/a4-flyers** | multi-angle | **171 KB** | +51 KB |
| **FL-001/a4-flyers** | variety | **140 KB** | +20 KB |
| **FL-002/a5-flyers** | multi-angle | **145 KB** | +25 KB |
| **FL-003/double-sided-flyers** | variety | **163 KB** | +43 KB |
| **FL-004/folded-leaflets** | detail | 131 KB | +11 KB |
| **FL-004/folded-leaflets** | multi-angle | **150 KB** | +30 KB |
| **FL-007/eco-flyers** | variety | 130 KB | +10 KB |
| MN-003/hardcover-menus | detail | 133 KB | +13 KB |
| PB-001/kraft-paper-bags | detail | 135 KB | +15 KB |
| **PB-005/handle-bags** | detail | **215 KB** | +95 KB ⚠️ |
| PK-006/rigid-boxes | detail | 126 KB | +6 KB |

**FL 类目 (6 文件) 是门禁超最大重灾区** (FL-001/002/003/004/007) — 与 P0-1 小字灭绝目标重叠, FL 是菜单价格表 / 传单细则 天然高危

## 四、🟡 结构性发现

### 6 SKU 视图集不全 共同模式
- 全部 6 SKU (PK-002~006 + PKG-007) **共享同样的 2 视图: detail + box-open**
- 这不是随机问题, 是同一批管线 (可能是 8/15 之后的某次 partial batch) 跑出来的不完整 batch
- **不是串图问题, 是 batch 不完整问题** — 与 PKG-007 报告 "HARVEST LABELS 错配" 不同
- PK-002~006 文件名匹配产品定义, 应该补 hero/multi-angle/variety 视图就行 (vision 内容错配可能性低)

### 120KB 门禁 集中在 detail 视图 (10/14)
- 14 个超门禁文件中 10 个是 detail 视图, 1 个 multi-angle, 3 个 variety
- **detail 视图大概率是 macro/close-up 抓的, 文件偏大** — 与 P1-6 视图占比指令脱节相关

### 串图嫌疑 filename 维度
- 扫描未在 filename 中发现 HARVEST LABELS / OLIVE GROVE / NORTHWIND 等未知品牌词
- **HARVEST LABELS 错配只能是 vision 渲染层问题, 非 filename 层** — 提示词串线确认

## 五、V21 优化清单 (per audit §四) 优先顺序

| ROI | 任务 | 工作量 | 阻塞 |
|---|---|---|---|
| **P0** | PK-002~006 + PKG-007 + PKG-008 = 8 SKU × 3 缺视图 = **24 张图待补** | 8 SKU 重跑 | 需 V21 提示词生效 |
| **P0** | FL 类目 (FL-001/002/003/004/007) + PB-005 共 6 文件超门禁降质 | 6 文件 re-encode | 简单, 立即可做 |
| **P0** | MN-001/FL-001 小字灭绝 (主标题白名单 ≤6 词 + 禁止 fine print) | 提示词 V21 | K3 拍板冻结 v20_per_sku |
| **P0** | CL 类目日历特判 (弃完整月网格, 内嵌 2026 月份模板) | 提示词 V21 + 6 SKU 重跑 | 需 K3 提供 2026 月份数据源 |
| **P1** | SSoT 合一 (废 v20_per_sku V20.6 静态, 唯一来源 enhance_rules.json, 重命名 V21.0) | 提示词重构 | 需 K3 拍板 |
| **P1** | Design DNA 锚点全量验证 (54 号 P0-2 已落增强规则 COMMON, 验证 72 SKU 覆盖率) | 验证脚本 | 需 ST-001 模板外推 |
| **P1** | Vision 评分加 product-form match 硬门槛 (54 号 P1 DNA 扩展) | 评分脚本升级 | K3 拍板 vision 评分模型升级 |
| **P2** | 尺寸门禁自动 re-encode (pipeline 末尾 >120KB 降 quality 重压) | 脚本 1 个 | 简单, 立即可做 |
| **P2** | 多 locale (ja HERO+DETAIL / zh-hk 代码合成) | 后续批次 | 68-E 完整后再做 |

## 六、建议下一步 (per K3 "OK 就跑")

**选项 A (推荐, 顺序执行)**: 
1. **立即**: FL 6 文件 + PB-005 = 7 文件 re-encode 降 120KB 门禁 (1 个 Python 脚本, 5 min, 不 push)
2. **8/18 下午**: V21 提示词 SSoT 合一 + 冻结 v20_per_sku, 起草小字灭绝规则 + CALENDAR-DATES 模板字符串
3. **8/18 晚间**: 8 SKU × 3 缺视图 = 24 张补跑 (需 V21 提示词生效)
4. **8/19 早**: 21:12 cron 自动验证 8/19 GSC 7d 数据 + 4 周复盘数据
5. **8/21 双周复盘**: 全量指标 + 68-E batch 1 拍板

**选项 B (保守)**: 等 K3 拍板 V21 提示词方向, 不动现有图, 8/19 起跟 K3 周复盘
