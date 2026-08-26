# v13 任务卡 — PDP 参考价格表 + 参数选择器 (对客)

> 日期: 2026-07-25 · K3 策略 · autoclaw 执行 · 1 commit 1 push 1 build
> 收入关联: 印刷是定制报价制,但"完全看不到价"= 客户流失首因。给参考价 + 参数自选 = 询价率提升的直接杠杆;报价台引擎已建好,本卡是把它产品化到对客 PDP。
> 前置: v12 (intuan 污染清除 + 图片) 已上线。

## 策略 (K3 已定,照做)

**形态**: PDP 插入「參考價格表」区块,两件套:
1. **SSR 静态价格表** (默认配置的全部数量档,可被抓取/索引,SEO 友好)
2. **客户端参数选择器** (材料/盒型/尺寸/数量 联动,即时出价) — 复用报价台引擎逻辑,但**数据走 server 端注入**,不把 12 张 JSON 打进 client bundle

**红线 (同报价台)**:
- 页面与文案绝不出现: e-print / intuan / yate98 / 成本 / anchor / ×1.5 / ×2.2 / cost_rmb
- 只展示卖价: zh-hk = HKD (sell_hkd),en = USD,ja = JPY (×2.2 已由 v10 calcPrice 处理,复用它)
- 每区块顶部固定文案: zh-hk「參考價 · 最終以 WhatsApp 正式報價為準」/ en "Reference pricing · Final quote via WhatsApp" / ja「参考価格 · 正式見積は WhatsApp にて」
- 运费展示简化: ≤30kg「順豐到付」/ >30kg 显示 calcShipping 的 HKD 估值文案 / 无重量「運費另計」— 不暴露 0.7×kg 公式细节
- CTA 按钮接现有 WhatsApp 链接,message 预填当前选中配置 + 数量 + 参考价 (客户发来就是半完整询盘)

## 覆盖 SKU 映射 (price-tables slug → products.ts SKU)

| price-table | PDP SKU | 备注 |
|---|---|---|
| gang-run-card-boxes.json | PKG-016 gang-run-card-boxes | 全量 119 档 |
| gang-run-card-boxes.json (按 config 关键词过滤) | PKG-013 white-card-boxes (filter 飛機盒/飞机盒) / PKG-015 tuck-end-boxes (filter 雙插盒/双插盒) | 拼版表即这两盒型的真实价,过滤后注入 |
| corrugated-boxes-cost.json | PKG-014 corrugated-boxes | 49 档 |
| white-card-bags-cost.json | paper-bags 类目对应白卡袋 SKU | 按 slug 匹配,匹配不到就汇报,别编 |
| digital-stickers-cost.json | stickers 类目数码贴纸 SKU | 同上 |
| flyers-cost-yate98.json | flyers 类目 custom-flyers 对应 SKU | 同上 |
| flyers.json (eprint) | a5/a4/same-day-flyers 对应 SKU | 无重量档运费显示「運費另計」 |
| books.json (eprint) | saddle-stitch-booklets / exercise-books / perfect-bound-books | ×0.97/×0.94 已是 v11 后实价 |
| special-fold-leaflets.json | 折页对应 SKU | 固定 200 运费文案 |

没映射到的 SKU 不显示区块 (优雅降级,不留空壳)。executor 先输出一份 slug 映射自查表再动手。

## 技术实现 (约束)

1. **新组件** `src/components/pdp/ReferencePriceBlock.tsx` (client component):
   - props: `tableSlug`, `tiersData` (server 注入的纯数据: config/configHuman×3/qty/sell_hkd/weight_kg), `locale`, `productName`, `whatsappNumber`
   - 内部逻辑复用 `src/lib/quote-engine/desk.ts` 的 calcPrice/calcShipping **公式思路**,但数据从 props 拿 (import desk.ts 会把全部 JSON 打进 bundle — 禁止)
   - ×2.2 换算: server 端预计算每个 tier 的 sellUSD/sellJPY (yate98 表 = cost_rmb ×2.2×汇率;eprint 表 = sell_hkd×汇率),client 只按 locale 显示
2. **Server 端注入**: `src/app/[locale]/product/[slug]/page.tsx` 里 import 对应 price-table JSON (Next.js server component 静态引入,不进 client bundle),注入给 ReferencePriceBlock
3. **SSR 默认表**: 每个 SKU 选「最常用配置」(第 1 个 config) 的全数量档,SSR 渲染 <table>,含价格 → Google 可索引实价 (对 SEO 是加分)
4. **选择器**: 材料(纸材)→盒型/规格→数量档 三级下拉,联动出价;移动端单列,桌面端表格
5. 位置: PDP 现有 price_range 文案区块下方,产品描述上方;样式用现有 Tailwind 体系,参考 quote-desk 的 slate 风格但对齐 PDP 品牌色

## 验收 (汇报必带)

1. 本地 `npm run build` 过 + `node scripts/check-encoding.js --fix` 过
2. 映射自查表: 哪些 SKU 挂上了价格区块,哪些降级,原因
3. curl 抽查 3 个 PDP (zh-hk/en/ja 各 1): HTML 含 SSR 价格表 + HK$/USD/¥ 数值 + 「參考價」文案
4. pollution grep: 3 个 PDP HTML 里 e-print/intuan/yate98/成本/anchor/×1.5/×2.2 = 0
5. en/ja 价 ÷ zh-hk 价 ≈ 2.2/1.5 比例 (抽查 1 档验算)
6. WhatsApp CTA 链接含预填配置文本
7. push `git push origin_ssh main` → `node scripts/verify-deploy.mjs` PASS → commit sha + run id

## 纪律

- 1 commit: `feat(pdp): reference price table + config selector for price-table-backed SKUs`
- 改 products.ts 或 page.tsx 大段后必须本地 build 验证再 push (v7 教训)
- 删任何文件前 grep 引用
- 不确定的 slug 映射: 汇报问,不编
