# Seedream V21.0 升级报告 (2026-08-18, K3 拍板)

> **触发**: 8/18 image-prompt-quality-audit-2026-08-18.md 11 张抽样审计 3/11 P0 命中
> **执行**: K3 "同步更新我们的生图技能" (10:34 指令)
> **落地**: C:\Users\Administrator\.openclaw-autoclaw\skills\seedream-v20\SKILL.md 17,051 bytes / 327 lines (V20.6 → V21.0)

## 一、升级路径

V20.6 (8/17 04:55 K3 拍板基线) → **V21.0 (8/18 拍板, V20.6.1 内部已升 85-95% macro / V20.6 strict ≥9.0 / V20.9.1 BOTTOM-STRIP 1.047:1 全部上收)**

## 二、V21.0 核心改动 (5 大块)

### §4 P0 修复 4 件 (K3 8/18 拍板)

1. **P0-1 小字灭绝**: 主标题白名单制 (≤6 词 + 拼写 100% 正确) + 强制 NEGATIVES (no fine print / no small labels / no body copy). 高危类目: MN / FL / CL / BC. Vision 评分硬门禁: 任何小字 (字号 < 主标题 50%) 必含错字风险, 一律 0 分重出
2. **P0-2 日历特判**: 弃完整月网格, 改 "stylized partial week strip" / "stylized date blocks without specific numbers". 或 prompt 内嵌真实 2026 月份模板字符串 (cal 命令生成). 重跑范围 CL-001~006 全 6 SKU
3. **P0-3 串图门禁**: Vision 评分 5 维 → 6 维, 新增 V6 PRODUCT-FORM MATCH. 与 SKU slug 严格匹配 (magnetic-closure-gift-box ≠ HARVEST LABELS). 评分 < 7.0 自动拦截重出. PKG-007 失败案例作 V6 起点
4. **P0-4 120KB 门禁自动 re-encode**: `gen_all_batch_v2.py` 末尾追加 PIL 自动 re-encode (quality 85/78/72/65 逐级降, 底线 65). 14 文件超门禁待重压 (FL × 6 + EV × 2 + MN × 1 + PB × 2 + PK-006 × 1)

### §5 SSoT 合一 (废 v20_per_sku V20.6 漂移源)

| SSoT 源 | 旧 | V21 |
|---------|-----|-----|
| `seedream-v20/SKILL.md` (人类可读) | V20.6 文档 | **V21.0 升级** |
| `v20_per_sku/*.txt` 87 文件 | V20.6 60-70% DETAIL | **冻结, 移 _archive/** |
| `enhance_rules.json` (机器可读) | V20.9.5 实际版 | **V21.0 重基线化, 唯一源** |
| 54 号 手工诊断 | 60-70% 漂移 | **整合进 enhance_rules.json COMMON** |

### §2 视图占比双轨 (K3 8/17 06:2x + 8/18 拍板合并)

| 视图 | 占比 | 留白 |
|------|------|------|
| HERO / VARIETY / MULTI-ANGLE / SPREAD / per-SKU 专属 | 60-70% | 30-40% |
| **DETAIL (唯一例外)** | **85-95% macro** | 5-15% |

V20.6 SKILL 写 60-70%, V20.9.5 enhance_rules.json 写 85-95%, 8/17 06:2x K3 拍板覆写, V21 双轨合并

### §6 水印 SOP 沿用 (BOTTOM-STRIP 1200×1146 1.047:1)

- 裁切底边 54px → 输出 1200×1146 (1.047:1)
- ⚠️ 前端 PDP 容器 Tech_Ops 核对 (1:1 设计会拉伸, P1 待办)
- 9 张定稿 0 水印 + ≤120KB (V21 §4.4 管线自动 re-encode 保证)

### §8 SOP 升级 (5 维 → 6 维真验收)

1. 候选完整 85 × 5 × 5 = 2125 (V21 升级 2 候选 → 5 候选, V6 评分后选优)
2. **V6 product-form match ≥ 7.0** (新增)
3. **主标题白名单拼写 100% 正确** (新增, 抽样 5 SKU vision 验)
4. 定稿命名 425 张 final_webp 1200×1146 ≤120KB
5. P0-4 视觉验证 场景-卖点对位 + 无小字
6. 水印检测 grep 0 命中

## 三、72 SKU 视图集扫描 (8/18 PASS, 报告已落盘)

| 类别 | 状态 | 修复优先级 |
|------|------|-----------|
| PKG-007 (magnetic-closure-gift-box, vision 错) | 2 文件 | **P0 重跑** (5 视图全) |
| PK-002~006 (5 SKU, 视图集不全) | 各 2 文件 (detail+box-open) | **P0 补 3 视图 × 5 SKU = 15 张** |
| PKG-008 (空) | 0 文件 | **P0 全跑 5 视图 = 5 张** |
| FL × 6 + PB-005 215KB | 14 文件超 120KB | **P0 自动 re-encode** |
| CL-001~006 (日历错) | 6 SKU | **P0 V21 §4.2 重跑** |

**总工作量**: 8 SKU × 3-5 视图补跑 = 28 张 + 6 SKU × 2 视图重跑 = 12 张 + 14 文件 re-encode = **54 个动作**

## 四、§11 V21 待办 (K3 拍板后)

### P0 立即 (8/18 内)
- [ ] 移 `v20_per_sku/*.txt` 87 文件到 `.hermes/_archive/v20_per_sku_V20.6/`
- [ ] 14 文件超 120KB → 自动 re-encode
- [ ] 重跑 PKG-007 (5 视图) + PK-002~006 (3 视图 × 5) + PKG-008 (5 视图) = 28 张补跑
- [ ] 重跑 CL-001~006 (V21 §4.2 日历特判) = 12 张
- [ ] 火山引擎 Safe Mode 解锁 (K3 手动 5 min, 8/16 阻塞中)

### P1 本周 (8/19-8/21)
- [ ] V21 enhance_rules.json 重基线化 (V6 product-form match + 主标题白名单 + 120KB auto-re-encode + §4 全部 P0)
- [ ] 工具链升级 (`_auto_select_best.py` 5→6 维, `gen_all_batch_v2.py` 加 120KB re-encode)
- [ ] Tech_Ops 核对前端 PDP 容器 1.047:1
- [ ] 8/21 双周复盘

### P2 下周 (8/22+)
- [ ] 多 locale (ja HERO+DETAIL / zh-hk 代码合成)
- [ ] 68-E 全量重跑 (en 2125 候选 / 22 min)

## 五、变更对照 (V20.6 → V21.0 SKILL.md)

| 段 | V20.6 (旧) | V21.0 (新) |
|----|-----------|------------|
| 标题 | Seedream V20.6 | Seedream V21.0 |
| §1 比例 | 1:1 (旧 SKILL) | **1.047:1 (1200×1146) + ⚠️ Tech_Ops 核对** |
| §2 DETAIL | 60-70% (旧) | **85-95% macro (覆写 8/17 06:2x K3)** |
| §4 | 无 | **新增 V21 P0 修复 4 件 (小字/日历/串图/120KB)** |
| §5 | 无 | **新增 SSoT 合一 (废 v20_per_sku, 唯一 enhance_rules.json)** |
| §8 验收 | 5 步真验收 | **6 步 (新增 V6 + 主标题白名单抽样)** |
| §9 工具链 | V20.x 工具 | V21 升级 (5→6 维, 120KB re-encode, v20_per_sku 冻结) |
| §10 升级路径 | V20.2 → V20.6 | V20.2 → V20.6 → **V21.0** (K3 8/18 拍板) |
| §11 待办 | 8 件 (K3 拍板前) | **12 件 (P0 立即 5 + P1 本周 4 + P2 下周 3)** |

## 六、风险与降级

- **P0 风险**: V21 §4.1 主标题白名单可能过严, 某些 SKU 主标题是 7+ 词组合, 需 8/19 抽测 5 SKU 验证
- **降级 1**: 若主标题白名单拒出率 > 30%, 放宽到 8 词
- **降级 2**: 若 V6 product-form match 误判频繁, 退化为 V5 5 维评分 + 人工 review
- **降级 3**: 若 120KB re-encode 后质量损失 > K3 接受, 保留 120KB 限制到 130KB 软门禁

## 七、源文件

- SKILL.md: `C:\Users\Administrator\.openclaw-autoclaw\skills\seedream-v20\SKILL.md` (17051 bytes, 327 lines, 8/18 落盘)
- 审计报告: `F:\zprintpro-nextjs\.hermes\reports\image-prompt-quality-audit-2026-08-18.md` (8613 bytes, 8/18 落盘)
- 72 SKU 扫描报告: `F:\zprintpro-nextjs\.hermes\reports\72-sku-viewset-scan-2026-08-18.md` (5773 bytes, 8/18 落盘)
- 扫描脚本: `F:\zprintpro-nextjs\.hermes\_k3_viewset_scan.py` (可重跑)

EOF · 8/18 10:34 · K3 拍板 V21.0 升级 PASS · 12 待办 4 优先级 · 风险 3 降级方案 · 1 文档同步完成
