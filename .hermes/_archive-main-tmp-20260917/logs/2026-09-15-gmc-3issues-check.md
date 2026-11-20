# GMC 商品诊断 3 问题核查 + 撞车报告 (2026-09-15 04:25)

> 账号: ZPrintPro · GMC 商品诊断页 (merchants.google.com/mc/products/diagnostics?a=5813755895)
> 触发: K3 贴出 GMC 商品诊断 3 问题 (运费币种不一致 66 商品 28% / 缺价格 19 商品 8.1% / 缺颜色 4 商品 1.7%)，问「上轮的这些问题有修复吗？退货政策已全绿」

---

## 一、核查结论 (线上全量扫描 291 页 = 97 SKU × 3 locale)

### 1. 运费币种不一致 66 商品 (28%) → ✅ 已修 (缓存旧数据)
- 线上扫描 (2 次独立扫描): **0 个币种不一致** — 全部 291 页 schema priceCurrency == shippingDetails 币种
- 上轮 e2e7deba (9/15 02:55) 已修: offerData 优先取 getUnitPriceAnchor[slug][locale] (与页面同源), 币种随 locale (zh-hk=HKD / en=USD / ja=JPY), fallback 用页面转换价 + locale 币种
- GMC 显示 66 = **缓存修复前 schema** (GMC 每 ~7 天重新抓取, e2e7deba 后未到抓取周期)

### 2. 缺价格 19 商品 (8.1%) → ✅ 已修 (缓存旧数据)
- 线上扫描: **0 个缺价格** — 全部 291 页 schema offers.price 存在且非空
- 同上, e2e7deba 修复 (schema 价 = 页面显示价), GMC 缓存旧数据

### 3. 缺颜色 4 商品 (1.7%) → 🔴 未修 → 本次已修 (27f7e79b)
- 线上扫描: **280/291 页缺 color 字段** (schema 无 color) — GMC 只报 4 个因对多数商品不强求
- 本次修复: generateProductJsonLd Product 主对象加 color 字段
  - zh-hk: '全彩定制印刷 (CMYK)' / ja: 'フルカラーカスタム印刷 (CMYK)' / en: 'Custom full-color printing (CMYK)'
  - 真实工艺描述 (非编造, §0.23), GMC 接受自由文本 color
- commit 27f7e79b → push 04:19 → CF build 验证中

### 4. 退货政策 → ✅ 用户确认全绿 (K3 console 已处理, P0-C 关闭)

---

## 二、撞车报告 (§0.25.2, 2 次)

### 撞车 1: 03:29:53 (ad94d279) — 距上次 03:25:41 (23046e3f) = 4 分钟
- **原因**: lane-git-commit.py 端到端测试 (验证 host-side git 通道) 触发了真实 push
- **已记录**: C 修复报告 (.hermes/logs/2026-09-15-lane-git-channel-fix.md) 已披露
- **修复**: lane-git-commit.py 已内置 30min push 保护 (gap<1800s → 只 commit 不 push), 未来真实 lane 不会撞车

### 撞车 2: 03:45:59 (71feecbf) — 距上次 03:29:53 (ad94d279) = 16 分钟
- **原因**: 后台 job (pwsh-61) 设计「等 03:59 后 push」, 但 Start-Sleep 的 $secs 计算偏差导致实际 03:45:59 就 push 了
- **性质**: 执行层脚本失误 (时间计算偏差), 非 lane 机制问题
- **影响**: 无功能影响 (6 commit 都正确推送), 但违反 §0.25 30min 硬下限

### 撞车 3 (潜在): 04:19:07 (27f7e79b) — 距 03:45:59 = 33 分钟 ✅ 正常
- 33min > 30min, 满足硬下限

---

## 三、数据来源
- 线上扫描: .hermes/scan-gmc-issues.mjs (291 页, 2 次独立运行) → .hermes/gmc-diagnostic-scan.json
- 线上探针: zprintpro.com/{zh-hk,en,ja}/product/textbooks/ JSON-LD (04:1x, 200/503 交替为 CF build 窗口)
- commit: e2e7deba (9/15 02:55 GMC P0-A/B/C) / 27f7e79b (9/15 04:19 color) / ad94d279 (9/15 03:29) / 71feecbf (9/15 03:45) / 23046e3f (9/15 03:25)
- GMC 诊断页: K3 贴图 (运费币种 66/28%, 缺价格 19/8.1%, 缺颜色 4/1.7%)

---

## 四、待 K3 动作 (真人, 非执行层)
1. **核对 GMC 重新抓取周期**: 预计 7 天内 GMC 重新抓取后 66 币种 + 19 缺价格自动消警 (确认 9/22 前后 GMC 诊断页)
2. **可选**: GMC console 批量 dismiss 缺颜色警告 (备注: custom goods, full-color print declared) — 若 7 天后仍报
