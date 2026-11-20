# v16 任务卡 — 海报数码/柯式双轨价 + 银卡/镭射/贴纸差异化系数

> 日期: 2026-07-25 · K3 策略 · autoclaw 执行 · 1 commit 1 push 1 build
> 收入关联: 海报大单挂数码价 = 比柯式贵 2-3 倍直接丢单;银卡/镭射银卡 UV 拼版是香港零竞品品类,系数每加 0.1 = 纯毛利。
> 前置: v15 已上线 (commit 9161367)。

## 任务 1: 海报 A2 双轨价 (数码/柯式自动取优)

**规则 (user 7/25 拍板)**: `A2 展示价 = min(B2 数码公式价, e-print 柯式海报价 × 0.95)`
- 小数量走数码 (快,1-2 天);当数码公式价 > 柯式×0.95 时切换柯式价 (3-5 天),JSON 每档标 `production: "digital" | "offset"`
- e-print 柯式 A2·157g 公开价 (K3 7/25 实抓,單面/雙面): 100=590/890, 200=640/940, 300=690/1,070, 500=740/1,120;1000=890/1,220, 2000=1,220/1,650, 3000=1,660/2,100, 5000=2,570/3,150 — 新增 1000-5000 档 (纯柯式)

**验算锚点 (A2·157g·單面,逐档必须命中)**: 10=**129** (digital) / 20=**198** / 50=**405** / 100=**561** (offset 切换点) / 200=**608** / 300=**656** / 500=**703** / 1000=**846** / 2000=**1,159** / 3000=**1,577** / 5000=**2,442**
雙面: 10=**168** / 50=**600** / 100=**846** / 200=**893** / 300=**1,017** / 500=**1,064**

**页面说明文案** (pollution 红线:不出现 e-print/柯式成本字样):
- zh-hk: 数码档标「數碼快印 · 1-2 工作天」/ 柯式档标「批量印刷 · 3-5 工作天」
- en: "Digital express · 1-2 days" / "Volume offset · 3-5 days"
- ja:「デジタル速刷 · 1-2 営業日」/「オフセット量産 · 3-5 営業日」

## 任务 2: 差异化定价系数 (user 7/25 方向拍板,按下列数值执行)

改 `analysis-2026-07-17/gen-yate98-price-tables.py` (单一真源脚本) 系数常量,重跑生成 JSON,全链 (PDP/报价台) 自动一致。**禁止手改 JSON。**

| 品类 (gang-run-card-boxes.json 按 config 材质关键词识别) | 旧系数 | 新系数 zh-hk | 新系数 en/ja |
|---|---|---|---|
| 350g/400g 單粉卡 (普通白卡) | ×1.5 / ×2.2 | 维持 | 维持 |
| **375g 銀卡** (含"銀卡"不含"鐳射") | ×1.5 / ×2.2 | **×2.0** | **×2.6** |
| **375g 鐳射銀卡** (含"鐳射") | ×1.5 / ×2.2 | **×2.2** | **×2.8** |
| digital-stickers-cost.json 普通材质 | ×1.5 | **×1.6** | ×2.2 维持 |
| digital-stickers-cost.json 特殊材质 (透明龙/镭射/金银,按 config 关键词) | ×1.5 | **×2.0** | **×2.6** |

- en/ja 价 = cost_rmb × 新系数 × 汇率 (沿用 v10 逻辑)
- 验算锚点: 銀卡某档 cost_rmb=800 → zh-hk 由 1,200 变 **HK$1,600**;鐳射銀卡同档 → **HK$1,760**
- 报价台/PDP 銀卡·鐳射配置加一行文案: zh-hk「打樣確認後生產 · 色差保障」/ en "Physical proof approval before production" / ja「本番校正確認後に量産」(高毛利单防色差客诉)

## 任务 3: 联动更新

- 重跑 `scripts/gen-price-data.mjs` → PDP 参考价区块/选择器/报价台全链一致
- products.ts `gang-run-card-boxes` 等 SKU 的 price_range 按新 min-max 同步
- gang-run 博客 excerpt (Q-GR-01/02/03) 若含旧价格区间数字,同步更新 (grep "129" / "2,379" 等旧值核对)

## 纪律

- commit 前 `node scripts/check-encoding.js --fix` + 本地 `npm run build` 全过
- 1 commit: `feat(pricing): posters digital/offset dual-track + silver/holo-card & sticker tiered coefficients`
- push `git push origin_ssh main` → `node scripts/verify-deploy.mjs` PASS
- pollution grep = 0 (对客页无 e-print/yate98/成本/倍率)
- **汇报**: commit sha + run id + ①海报 11 档锚点对照表 (含 production 标记) ②银卡/镭射各 1 档前后价对照 ③贴纸特殊材质识别到的 config 清单 ④price_range 同步清单 ⑤grep 结果
