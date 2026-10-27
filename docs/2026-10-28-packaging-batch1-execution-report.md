# 批 1 清毒执行报告（P0-02 三语声明清毒 · 2026-10-28）

> 数据来源：`docs/2026-10-27-packaging-p0-02-cleanup-plan.md`（B1/B2/B3/B4 项定义）· `docs/2026-10-28-packaging-batch1-execution-pack.md`（P1-P4 精确串）· `docs/2026-10-27-packaging-k3-decision-package.md`（⚡D2 速览表推荐值）· 源码 grep/read 复核（rg 引擎）
> 拍板依据：K3 2026-10-28 05:44「指令按最优推荐执行」= 速览表 12 项全部按推荐 → P0-01「K3 拍板后才改被点名源头」闸门开启。

## 一、执行范围与数量（本批 = 批 1 全量）

| 源文件 | 类别 | 编辑数 | 说明 |
|---|---|---|---|
| `src/data/products.ts` | P1 | 11 | food title/desc/descEn/features、cosmetic features、mailer descEn、fruit-label title/features/三语 desc |
| `src/data/category-seo-content.ts` | P2 | 66 | zh/en/ja 三语：e-print/hk-printing 竞品对比删除、FDA/FSC/SGS/ISTA/EU WEEE 断言条件化、清关承诺删除、刀模免费/打样当日/旺角打样中心条件化、抗压 80-200kg/40-60%/HK$0.03 删除、枚→個、nav FDA 标签删除 |
| `src/data/blog-data/zh-hk.json` | P3 | 21 | food-guide/custom-guide/kraft 对比/price-2026/cosmetics/tea/快遞盒/9大材質/嬰幼兒食品盒 9 篇包装域 blog：FDA 21 CFR/GB 4806.8/SGS/FSC 断言删除、65%/60%/500 次/76-87%/40-60% 假统计删除、占位残片（多年件/超過 多間/500-多個/?起印）清除、50→100 起印对齐 |
| `src/data/blog-posts.ts` | P3 | 9 | kraft/price-2026/tea/cosmetics 4 篇 excerpt 三语认证断言删除 |
| `src/data/sku-seo-data.ts` | P4 | 15 | mailer ja h1 英文→日文、folding ja title 100枚→100個、gang-run zh/en/ja 40-60%→条件化、8-15 天→以報價為準、rigid en 2100-MOQ 删除 |
| `zprintpro-sku-seo-data.csv` | P4 | 14 | boxes 域与 TS 同步：food/cosmetic/fruit-label FDA 单元格、mailer h1、folding 枚→個、gang-run ja/en 40-60%、2100-MOQ |

合计 136 处替换（含 replace_all），全部经脚本逐条计数断言（每条 old 串命中数 ≥1 或 =1 校验，不匹配即中止不写盘）。

## 二、关键决策记录

1. **CSV 漂移受控双改（偏离 SOP-5 的正当性）**：同侪 commit `9efc9da3` 手改派生 TS（sku-seo-data.ts 80 行）未同步 CSV 源头 → 若按 SOP-5 重生成（`scripts/csv-to-sku-seo.mjs`）必回退同侪 boxes+stickers 双域清毒。本批采用受控路径：**CSV + TS 双改（仅 boxes 域 food/cosmetic/fruit-label/mailer/folding/gang-run/rigid），不重生成**，使两源在 boxes 域重新一致（未来重生成不再回退清毒）；stickers 域漂移登记移交七簇会话。此偏离已记录，报告为唯一解释文档。
2. **推荐值落位**（K3 授权）：food 起價 HK$2.5、起印 100（blog custom-guide 50→100 对齐）；交期统一「以報價為準」条件化；认证类一律「以訂單確認」条件化；FSC 保留「可选项」表述（license code+scope 到位后回填）。
3. **未误清（SOP-10 反例#3 守则）**：大豆油墨、多年印刷經驗、全球客戶、海德堡、15年/1000+（存在於 blog 实力速览块）、DHL 全球 2-4 日、拼版免刀模費商业模式等已拍板真实数据**一律保留未动**。

## 三、门禁结果（审查全绿 4 件）

| 门禁 | 结果 |
|---|---|
| tsc | 54=54 持平（54 处全为既有 `__tests__` 类型错误，非本次引入） |
| encoding `check-encoding.js` | 无异常（Node UTF-8 无 BOM 写入） |
| zh-hk.json JSON 解析 | PASS |
| title-v5 门童 #27 | exit=0；HARD=7 全为 stickers 七簇域存量（卷裝貼紙等 PRICE_MISMATCH），**本次 4 个 title 变更（food/fruit-label/folding/gang-run）不在硬拦集合** |
| 编造 lint `check-brand-mentions.mjs --strict` | [A 类] 0 命中 PASS |
| gsc-leak 门童 #16 | exit=0 |
| 逐行 diff | 只含批 1 指令范围 6 文件；public/sitemap*.xml 与 .hermes 守卫文件为他方/车道产物，未纳入本次 commit |

双方法复算：① 脚本逐条计数断言（命中数校验）② grep/rg 残留复核（包装域 FDA/e-print/ISTA/40-60%/打樣當日/枚 残留 = 0），两法一致。

## 四、残留与移交（非本批范围）

1. **七簇域移交**：products.ts 纸袋族 5 处 + flyers/posters 2 处 `internationally certified`（L1365/1555/1650/1749/1843/1917/2550）；sku-seo flyers 6 处 `internationally certified production with full FDA compliance`；stickers CSV 漂移；category 横幅/菜單/貼紙/同人誌 8 处 打樣當日/旺角；blog 贴纸/传单/药标/海报/学校/同人誌 FDA 相邻域。
2. **watch 项**（D22 审计）：gang-run ja title 混合中英（`拼版白卡彩盒...| 彩盒印刷...`）；彩盒族（corrugated/tuck-end/white-card）en body `8-15 days`；kraft blog `18,500 訂單實證` 数字来源；「超厚名片」CSV 行（名片展示层未拍板，不动）；blog 实力速览块【國際質量認證】【歐盟 CPR】；price-2026 `無中間商加價`。
3. **线上复核重灾页**（push 后）：food/cosmetic/fruit-label/kraft/rigid/gang-run/mailer ×3 locale——products.ts 源头已清，待本批上线后 curl 复核。

## 六、线上复核补漏（2026-10-28 06:32-06:50，CF build 122509322140 已部署）

**门童 0 命中 ≠ 线上干净（教训重演）**：线上探针发现 food/category 页仍有 FDA/SGS 渲染，定位到 **4 个批 1 未覆盖的伴随源**（渲染 packaging 页面的 companion 组件/数据）：

| 源 | 处数 | 清理内容 |
|---|---|---|
| `src/data/product-faqs.ts` | 15 | packagingBoxesFAQs + food-boxes FAQ：FSC 認證→可选项、FDA 食品級/SGS 遷移測試→以訂單確認、10-15 個工作天→以報價為準、即日打樣→日程以報價為準（三语） |
| `src/components/category/CategoryIndustries.tsx` + `CategorySharpHooks.tsx` | 5 | packaging 卡片 FDA 標準紙可選→食品級紙材可選（zh/en/ja） |
| `src/lib/seo.ts` | 3 | packaging category metaDescription 三语 FDA 清除 |
| `src/data/category-conversion-blocks.ts` | 41 | packaging:zh/en/ja 三块：meta/FAQ/socialProof/comparisonTable/orderFlow 的 FDA/FSC 绝对断言、HK$0.03/HK$0.8 拼版单价、HK$300-800 刀模費行业对比、8-15 天交期、30%/4820 型统计、30個/50個 MOQ→100（拍板）、生分解性・無可塑剤・国際環境基準・3日出荷・当日完成→条件化 |
| `src/data/products.ts` | 4 | folding 80cm 跌落測試、kraft【FSC 認證】/完全生物降解 90 天/無塑化劑/承重 3-5 公斤→条件化 |

合计 68 处（第二批 5+58+3 脚本 + 3 手动），全部计数断言 + grep 双方法复核。线上 category/food 页 FDA 将随本轮部署归零（复核见下轮）。

**移交更新**：CategoryIndustries/SharpHooks pet_food 卡（stickers 类目 FDA）+ product-faqs 纸袋 即日打樣（L502/533）+ GMP 認證防偽標籤（L57）+ 通用 FAQ 可完全降解（generalProductFAQs L786）+ 餐牌/證書 打樣當日（conversion-blocks 七簇块）+ socialProof 4820+（watch）→ 七簇域/D22 审计。

## 七、下一步

- push-gate 窗口推送本批（7 src/数据文件 + 本报告，攒批达标；上次 push 06:30 → 最早 07:00）
- 线上复核（补漏后）：food/category ×3 locale FDA/SGS/即日打樣 归零确认
- D4-D5 kraft 草案落位（速览表 kraft MOQ A=300 已授权）
- K3 管理员按 K3-10 重存 dsh 凭据 → 恢复车道 → 新 GSC 导出 → 反馈环四指标首跑
