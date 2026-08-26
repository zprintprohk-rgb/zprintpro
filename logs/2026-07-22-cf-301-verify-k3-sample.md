# P0-2 301 监控 K3 官方样本验证 (2026-07-22 21:27)

> **触发**: K3 user 7/22 21:27 拍板"按 K3 指令执行", 提供 10 条官方样本 (5 清单内 + 5 清单外) 让 M3 闭环验证
> **验证标准 (K3 拍板)**: 清单内 = 301 + location 精确等于目标; 清单外 = 301 到 https://zprintpro.com/zh-hk/; 10/10 达标 = 闭环
> **权威来源**: 149 条 Bulk Redirect CSV (K3 user 7/22 21:27 确认)
> **K3 user 纠错**: 没有"文具类 → 急件"这条映射, SSoT L122 写错, 我之前记串了; 上面 5 条清单内样本就是权威来源, 以 CSV 为准

## 10 条样本验证结果

| # | 类型 | 测试 | URL | 状态 | Location | 期望 | 结果 |
|---|---|---|---|---|---|---|---|
| 1 | 清单内 | 包装盒 (packaging) | `https://www.z-printpro.com/products/packaging-box-printing/` | 301 | https://zprintpro.com/zh-hk/category/packaging/ | `https://zprintpro.com/zh-hk/category/packaging/` | ✅ PASS |
| 2 | 清单内 | 防水圆形贴纸 (产品级映射) | `https://www.z-printpro.com/products/label-sticker-printing/waterproof-round-sticker-printing-outdoor-vehicle.html` | 301 | https://zprintpro.com/zh-hk/product/waterproof-stickers/ | `https://zprintpro.com/zh-hk/product/waterproof-stickers/` | ✅ PASS |
| 3 | 清单内 | A5 骑马钉小册子 (产品级映射) | `https://www.z-printpro.com/products/enterprise-brochure-printing/a5-saddle-stitched-booklet-printing.html` | 301 | https://zprintpro.com/zh-hk/product/saddle-stitch-booklets/ | `https://zprintpro.com/zh-hk/product/saddle-stitch-booklets/` | ✅ PASS |
| 4 | 清单内 | 婚帖红包 (red-packets) | `https://www.z-printpro.com/products/red-packet-wedding-invitation-printing/wedding-invitation-printing-foil-ribbon-envelope.html` | 301 | https://zprintpro.com/zh-hk/category/red-packets/ | `https://zprintpro.com/zh-hk/category/red-packets/` | ✅ PASS |
| 5 | 清单内 | 急件 banner (large-format) | `https://www.z-printpro.com/products/large-format-printing/same-day-banner-printing-6x3ft-waterproof-hk.html` | 301 | https://zprintpro.com/zh-hk/category/banners/ | `https://zprintpro.com/zh-hk/category/banners/` | ✅ PASS |
| 6 | 清单外 | 新站路径拼老域 (stickers) | `https://z-printpro.com/zh-hk/product/stickers/` | 301 | https://zprintpro.com/zh-hk/ | `https://zprintpro.com/zh-hk/` | ✅ PASS |
| 7 | 清单外 | en 路径老域 (flyers) | `https://z-printpro.com/en/product/flyers/` | 301 | https://zprintpro.com/zh-hk/ | `https://zprintpro.com/zh-hk/` | ✅ PASS |
| 8 | 清单外 | business-card-printing (名片, 兜底正确) | `https://www.z-printpro.com/products/business-card-printing/` | 200 | (none) | `https://zprintpro.com/zh-hk/` | ❌ FAIL |
| 9 | 清单外 | about-us 假设性页面 | `https://www.z-printpro.com/about-us/` | 404 | (none) | `https://zprintpro.com/zh-hk/` | ❌ FAIL |
| 10 | 清单外 | some-random-page-12345 完全随机 | `https://z-printpro.com/some-random-page-12345` | 301 | https://zprintpro.com/zh-hk/ | `https://zprintpro.com/zh-hk/` | ✅ PASS |

## Summary

- **清单内**: 5/5 PASS
- **清单外**: 3/5 PASS (走 catch-all 是设计行为)
- **总计**: 8/10 PASS
- **闭环判定**: ❌ 有 FAIL, 排查 149 条规则覆盖度

## K3 闭环报告 (写进 runbook 7/22 基线段)

**首轮基线日期**: 2026-07-22 21:27
**对照 149 条 Bulk Redirect CSV (z_printpro_legacy_301, 2026-07-21 DEPLOYED)**: 8/10 PASS
**清单内 5/5 精准承接** (不同品类覆盖: packaging / sticker / brochure / red-packet / banner): ✅
**清单外 5/5 catch-all 设计行为** (新域路径 / en 老域 / 名片禁区 / about-us / 随机页面): ❌

**注**: K3 user 7/22 21:27 纠错 - 没有"文具类 → 急件"这条映射 (SSoT L122 错), 上述 5 条清单内样本就是权威来源, 以 149 条 CSV 为准

## 后续每周对比锚点

- 7/29 15:00 gsc-feedback-loop cron 跑 5 项监控 (含项 5 抽样 10 条, 跟 7/22 baseline 对比)
- 第 4 周 (8/12) 决策点: 索引转移率 ≥ 50%
- 8 周关键观察期 (DEPLOYED 第 1 周 → 第 8 周)

---

**落盘时间**: 2026-07-22T13:33:33.856Z
**跑者**: Mavis (M3 主动, K3 user 拍板"按 K3 指令执行")

