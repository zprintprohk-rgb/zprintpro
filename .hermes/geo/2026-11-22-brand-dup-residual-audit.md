# GSC「字段 brand 重复」残余 1 项审计（2026-11-22）

> 数据来源: K3 GSC 商家信息报告截图（2026-11-22 上传, 1 项受影响, 验证 11-14 开始 / 11-15 通过, 示例 URL = zh-hk/product/hardcover-menus）+ live 抓取四页 + git 历史。仅内部文档（§0.23.1）。

## 一、残余 1 项判定：**修复后旧抓取的处理滞后（stale crawl state），live 无缺陷, 零 src 改动**

三方法独立取证（§0.23.2 双方法复算铁律, 实际用三法）：

| 方法 | 对象 | 结果 |
|---|---|---|
| ① 原始 ld+json 文本扫描（JSON.parse 会折叠重复键, 必须扫原文） | zh/en/ja hardcover-menus + 对照页 a4-flyers | 每页 8 块 schema, Product 节点唯一 × `"brand"` 键唯一 |
| ② microdata 游离标记扫描 | 同上四页 | `itemtype`/`itemprop` 全 0, 无 JSON-LD 外 brand 游离 |
| ③ RSC flight payload 上下文解剖 | 同上三语 | Product 序列化副本 **无 @id、单 brand**（c4605923 修复态保持）；第 2 个 brand 记号 = 产品数据对象 `knowledgePanelData.brand:""` 空字符串字段, 非 schema, 结构化解析器不可见 |

sitemap 核对: hardcover-menus 三语 URL `<lastmod>2026-11-22</lastmod>`（当日, 常规重建自动刷新）→ Google 随常规重爬周期自然翻绿。

## 二、因果链（git 史实, 不改写）

| commit | 日期 | 内容 | 对应 GSC 证据 |
|---|---|---|---|
| `414549e5` | 11-01 | Product.brand 全 locale 统一 PRODUCT_BRAND_NAME（hreflang 三语变体被 Google 合并为同一 product 时, per-locale brand 值 = 多 brand） | GMC/商家信息 duplicate-brand 起点 |
| `c4605923` | **11-02 19:13** | 撤 Product @id → Google 不再把 RSC-flight 副本与 SSR 副本按同 @id 合并成一个节点（合并节点的重复字段 = Duplicate field: brand） | **76 项尖峰批的修复 commit** |
| GSC 验证 | 11-14 开始 → 11-15 通过 | 修复后批量翻绿 | K3 截图「验证已通过」 |
| 残余 | 当前 1 项 | hardcover-menus zh-hk 最后处理抓取落在修复传播前/衰减尾窗 | 尖峰(~76 @11-03)→衰减→1 |

## 三、行动

1. **编排层**: 本记录 + 决策包 §D 增补 K3 可选加速项；无需改 src（live 三方法干净, 改动反而违反「只放大有完整部署验收复测证据的动作」）。
2. **K3（可选, 1 次点击）**: GSC 网址检查 → `https://zprintpro.com/zh-hk/product/hardcover-menus/` → 「请求编入索引」，加速 Google 重爬翻绿；不做也随 sitemap 自然重爬。
3. **监控窗口**: 2-3 周（2-3 个重爬周期）。若 2026-12-13 后该项仍未翻绿 → 重开调查, 届时用 Rich Results Test 实时测 live URL（Googlebot 渲染视角）排查 UA 差异投喂。
4. 同族预防注记: Product @id 现状 = 全站 PDP 不带 @id（c4605923 口径）, 若未来有人重新给 Product 加 @id 或在 flight 中注入第二 Product 节点, 本问题必复发——记入改前自查清单。

## 四、判读纪律

- 本项为 **技术卫生问题**, 与 11-24 数据批的四个咬合判定（certificates/a2/食品包裝/稀释形态）互不影响; 不进 KPI 判读。
- 受影响项目数 = 1 且验证已通过的批, 不构成「排名/收录风险」证据（商家信息富结果的展示损失仅限该 URL 的富结果形态, 页面收录与排名不受影响）。
