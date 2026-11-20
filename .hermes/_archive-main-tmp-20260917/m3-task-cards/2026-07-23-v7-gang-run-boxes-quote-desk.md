# M3 任务卡 2026-07-23 v7:拼版白卡彩盒 SKU 上线 + drawer-slide 301 + 报价台 v2 接入

> 优先级: P0(香港零竞争词 + en/ja 高毛利品类)| 依赖: v6 任务卡(若未跑,本卡与其合并为 1 个 commit)
> 收入关联: 拼版彩盒香港 SEO 零竞争 + 成本 RMB 86 起(×1.5 = HKD 129 起)对香港无对手;en/ja 同价锚转换,毛利 ~27%+DHL 运费另计。
> user 拍板(2026-07-23): 交货周期 **8-15 天**;4 种纸张;>30kg 切物流;拼版彩盒 3 市场重点推。

---

## Task 1: 新 SKU `gang-run-card-boxes`(拼版白卡彩盒)— 取代 drawer-slide-gift-box 坑位

### 数据决策(勿改)
- packaging 维持 12 条: `drawer-slide-gift-box`(28 天 GSC 仅 10 展示/1 点击,礼盒类最弱)301 → `rigid-boxes`;`gang-run-card-boxes` 顶坑位
- `rigid-boxes` / `magnetic-closure-gift-box` 保留不动

### SKU 内容(写入 src/data/products.ts,category: 'packaging')
- slug: `gang-run-card-boxes`
- 名称:
  - zh-hk: `拼版白卡彩盒(免刀模費)` 
  - en: `Gang-Run Card Boxes (No Die-Cut Fee)`
  - ja: `合版ホワイトカードボックス(型代不要)`
- 核心卖点(3 locale 各自的 PDP + 类目卡):
  - 免刀模費/免排版費(拼版 = 固定刀模,成本直降 40-60%)
  - **4 种纸张**: 350g 單粉卡(超高松)/ 400g 單粉卡(超高松)/ 375g 銀卡紙 / 375g 鐳射銀卡
  - **盒型**: 飛機盒 / 普通扣底盒 / 雙插盒;**尺寸**: 60x40x20 ~ 200x150x80 共 8 档标准尺寸(见 price-tables/gang-run-card-boxes.json configs)
  - 500-10,000 枚,**交期 8-15 天**(凑版,如实写,不要写 5-7 天)
  - 覆光膜/啞膜,可选燙金/UV/擊凸/貼膠片(银卡类含印白墨/逆向 UV)
- 价格展示 (市场分层倍率, user 2026-07-23 拍板, en/ja 毛利≥50%):
  - zh-hk: `HKD 129 起`(cost 86.2 ×1.5)
  - en: `From USD 25`(cost ×2.2 ×0.128)
  - ja: `From ¥3,800`(cost ×2.2 ×19.8)
  - 报价台三列输出按 market_markup 分层: zh-hk ×1.5 / en+ja ×2.2
- ❌ en 标题/正文不带 Hong Kong/Shenzhen;ja 不带 深圳/中国(§13.10/§13.13)
- ❌ 无名片;无 <img> 新增外链
- optimizedAt: '2026-07-23', optimizationRound: 1

### 差异化定位文案(防止与 white-card-boxes 混淆)
- `white-card-boxes`(专版定制)= 自定义尺寸/自定义工艺,5-7 天
- `gang-run-card-boxes`(拼版)= 标准刀模+标准尺寸,免刀模费,8-15 天,**价格直降 40-60%**
- 两个 PDP 互相加一行交叉链接("需要自定义尺寸?→ 专版白卡彩盒" / "预算优先?→ 拼版彩盒免刀模费")

## Task 2: drawer-slide-gift-box 301 → rigid-boxes

对齐 v6 Task 3 的完整流程(如 v6 已跑,照同样式补这条):
1. next.config.js buildGuideRedirects() 追加双 source 规则(per locale)
2. products.ts 删除 drawer-slide-gift-box SKU 对象
3. 全站 `grep -rn "drawer-slide-gift-box" src/ public/` 引用清理(类目页/关联推荐/blog 内链 → rigid-boxes)
4. quote 参数映射 `drawer-slide-gift-box → rigid-boxes`
5. sitemap 重生成;matrix.json 同步

## Task 3: 报价台 v2 接入(quote-desk)

报价台已存在(隐藏路由 /quote-desk/?k= + SHA-256 门)。本轮接入新数据层:
1. **数据源**: src/data/price-tables/ 下 12 张表(e-print 锚 4 + yate98 成本锚 6 + special-fold 1 + shipping-rules 1)+ fx-rates.json
2. **三级选择**: 品类 → 配置(config 字符串解析为可读选项: 材质/盒型/尺寸/工艺)→ 数量档位
3. **输出按市场分层**: 成本参考(cost_rmb)| zh-hk 卖价(×1.5 HKD)| en 卖价(×2.2→USD)/ ja 卖价(×2.2→JPY), 报价文案按客户 locale 取对应列
4. **运费自动判定**: 按 tiers.weight_kg
   - ≤30kg → 显示「順豐快遞(运费另计/到付)」
   - >30kg → 按 shipping-rules.json logistics 公式算运费,折页类固定 200,其他品类 `(0.7×kg+100)×1.09+200`
   - 报价文案含独立运费行,不与货品价混在一起
5. **三语 WhatsApp 报价文案**(沿用现有模板,加运费行 + 拼版彩盒品类)
6. ❌ 红线不变: 页面禁出现 e-print / intuan / yate98 / anchor / cost 字样对客;noindex;零内链

## 执行纪律(全部 1 commit)
1. 删 SKU/文件前必须 grep 引用(铁律)
2. `node scripts/check-encoding.js --fix` → tsc(过滤 __tests__/No index/missing the following)干净
3. commit: `feat(pdp+quote): gang-run-card-boxes SKU (香港零竞争) + drawer-slide 301→rigid-boxes + quote-desk v2 12 tables + shipping auto`
4. `git push origin_ssh main` → `node scripts/verify-deploy.mjs` PASS

## 验收清单(附 curl 原文)
1. `curl -s https://zprintpro.com/zh-hk/category/packaging/ | grep -c "product/"` = 12 且含 gang-run-card-boxes、不含 drawer-slide-gift-box
2. 3 locale × `/product/gang-run-card-boxes/` = 200;标题 zh-hk 含「拼版」、en 含「Gang-Run」、ja 含「合版」
3. PDP 含「8-15 天」(zh-hk)/「8-15 days」(en)/「8-15日」(ja)和 4 种纸张
4. `curl -s -o /dev/null -w "%{http_code}" .../product/drawer-slide-gift-box/` = 301 → rigid-boxes
5. quote-desk 选拼版卡盒 5000 张(272kg)→ 运费行显示物流公式价(非顺丰)
6. en/ja 页面 `grep -c "智印港\|深圳"` = 0
