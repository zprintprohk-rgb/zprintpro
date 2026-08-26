# M3 任务卡 2026-07-24 v9:报价台 v2 全量接入(最终数据源版)

> 优先级: P0(大目标:让你 30 秒出报价)| 1 commit 1 build | 估 60-90 min
> **数据源变更 (K3 2026-07-24 拍板): intuan 20 配置询价计划取消 —— yate98 工厂数据已全覆盖且带重量,不再需要 intuan。**
> 收入关联: 报价效率 = 询盘转化率; WhatsApp 报价从 20 分钟/单 → 30 秒/单。

## 数据层(全部已入仓,直接 import,不要改 JSON)

`src/data/price-tables/` 共 12 张表:
- **e-print 锚 4 张**: flyers.json / books.json / exercise-books.json / perfect-bound-books.json(对客价 = e-print ×0.95/×0.90)
- **yate98 成本锚 5 张**: gang-run-card-boxes.json / corrugated-boxes-cost.json / digital-stickers-cost.json / white-card-bags-cost.json / flyers-cost-yate98.json(每档含 cost_rmb + sell_hkd + **weight_kg**)
- **special-fold-leaflets.json**: e-print 特殊折页 ×0.95(无重量,走固定运费规则)
- **shipping-rules.json**: 运费引擎
- **fx-rates.json**: HKD 1 / USD 0.128 / JPY 19.8

## 功能规格

### 1. 三级选择器
品类(12 张表)→ 配置(config 字符串解析成下拉:材质/盒型/尺寸/工艺)→ 数量档位(qty tiers)

### 2. 输出区(选对配置+数量即显示)
- **zh-hk 模式**: 建议卖价 sell_hkd(已含 ×1.5)
- **en/ja 模式**: cost_rmb × 2.2 × fx → USD / JPY(market_markup 字段,毛利 ≥50%)
- 成本列**只在页面调试模式显示**,正式文案不出现

### 3. 运费自动判定(shipping-rules.json)
- 读 tier.weight_kg
- ≤30kg → 「順豐快遞:运费另计/到付」(SF Express: freight collect)
- >30kg → 按规则算:
  - special-fold-leaflets → 固定 HKD 200
  - 其他品类 → `(0.7×kg + 100) × 1.09 + 200` HKD;en/ja 模式同公式算 HKD 后 ×fx 显示
- 特殊折页无重量 → 默认走「顺丰到付」,备注"大件转物流 HK$200"

### 4. 三语 WhatsApp 报价文案(一键复制)
按客户 locale 生成,模板:
```
【ZprintPro 報價 / Quote / お見積り】
產品: {name_zh/en/ja}
規格: {config 可读化}
數量: {qty}
貨品價: {price} {currency}
運費: {shipping line}
交期: {lead time}
✅ 免費設計稿 · 15+ 年印刷經驗
```
- ❌ 文案禁出现: e-print / intuan / yate98 / 成本 / anchor / ×1.5 / ×2.2
- zh-hk 落款「智印港 ZprintPro」,en/ja 落款「ZprintPro」

### 5. 安全红线(不变)
- 隐藏路由 /quote-desk/?k= + SHA-256 密钥门(现有,别动密钥)
- noindex + 零内链 + sitemap 不含
- 页面任何位置不出现供应商名/成本字样(view-source 也算)

## 执行纪律
1. `node scripts/check-encoding.js --fix` → tsc(过滤 __tests__/No index/missing the following)→ `npm run build` 无新增错
2. commit: `feat(quote-desk): v2 — 12 price tables + market-tiered pricing (zh-hk ×1.5 / en+ja ×2.2) + 30kg shipping engine + 3-locale WhatsApp copy`
3. `git push origin_ssh main` → `node scripts/verify-deploy.mjs` PASS

## 验收清单(报完成附截图/curl)
1. /quote-desk/?k=<key> 选「拼版白卡彩盒 → 飛機盒 120x80x40 350g → 5000 張(145.19kg)」→ 显示 sell_hkd 1,488 + 运费物流公式价(≈ HK$500)
2. 同一配置切 en → 显示 USD(=cost×2.2×0.128)+ DHL 行
3. 选数码贴纸 500 张(1.87kg)→ 运费行 = 顺丰到付
4. 特殊折页 10000 张 → 运费 HK$200
5. WhatsApp 文案 zh-hk/en/ja 各生成 1 条,无供应商名/成本字样
6. `curl -s https://zprintpro.com/quote-desk/ | grep -ci "e-print\|intuan\|yate98"` = 0(不带 key 应为密钥门页)
7. 首页/类目页 grep `quote-desk` = 0(零内链)
