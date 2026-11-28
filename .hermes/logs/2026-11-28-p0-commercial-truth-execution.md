# 2026-11-28 P0 商业真值与实体修复批 — 执行记录

- **授权**: K3 2026-11-28 08:55「按 2026-11-28-three-site-homepage-flywheel-four-file-alignment-and-money-word-action.md 最优推荐方案继续下一步」
- **范围**: P0 商业真值 / locale 混语 / 实体标签。**非 title 批**；未动 middleware 301、防火墙、定时 wrapper、贺卡资产；未按 UA 输出不同内容。
- **锁**: SESSION_LOCK 08:55 持有 → 本记录写完即释放。开工双条件核验通过（src/ 净、无 staged、无 lane.lock、对端静默 >13h）。
- **push**: 本批只本地 commit，**不 push**（今日 00:26 / 00:35 已两次业务推送，CF build 额度留给下一窗口）。

## 改动文件与旧值→新值

### 1. locale 混语（高杠杆）
| 文件 | 修复 |
|---|---|
| `src/data/products.ts` | 44 处 `适配行业` 按字段归属替换：descriptionEn→`Best for:`(11)、descriptionJa→`適用業界:`(11)、zh 字段→`適配行業`(22)。脚本 `.hermes/tmp/fix-shipei-hangye.py`，残留校验 en/ja=0。 |
| `src/components/product/PdpPurchaseButtons.tsx` | PDP 小计行硬编码 `→ 結算` → locale 字典新增 `checkout` key（zh-hk 結算 / en checkout / ja お会計）。 |

### 2. P0 SKU 口径统一（真值源 = products.ts / pricing.ts / 报价引擎推导表）
| SKU | 修复 |
|---|---|
| small-batch-stickers | product-faqs 删除无源数字 `HK$0.45 起/張`；改为 A4 版面口径（10 张档 HK$89 起/A4、100 张档 HK$38 起/A4，与页面报价引擎推导表一致）；en 对齐 pricing.ts 11-27 D1 方案B（10pcs $0.60 / 50pcs $0.55）；交期对齐 products.ts features「1-2 天交付」。 |
| custom-calendars | zh「已服務的本地客戶」撤下无来源客户计数与 SGS 声明，改 1 本起印/50 本批量档/7-10 天（6 处同模板共享全替换）；en 表 A3 MOQ 25→1、3-5 天→7-10 天、`$$$` 占位→from $0.40；ja「500枚15%オフ/1000枚25%オフ」→对齐 products.ts 数量档（100 本 15% / 500 本 30%）、3-5 天→7-10 天。 |
| roll-up-banners | zh 撤下客户计数/SGS/「48 小時」，改 1 套起訂/5-7 天/5·10 套批量档（5 处共享全替换）；en 表删除无源价格 $75/$150/$300/$600 与编造交期 → from $46/set（basePrice_en 真值）+ by quote；ja 折扣档对齐 products.ts（5 套 20% / 10 套 35%）、3 営業日出荷→5-7、删除无源「¥10,000 以上送料無料」、「国際認証取得済み」。 |
| catalog-printing | zh 撤下客户计数，保留 products.ts 真值「10 本起印·48 小時」（數碼檔）；en 表 MOQ 100→10(digital)、`$$`→from $4.60、3-5 天→48 hours (HK local)；ja 納期 7 営業日→數碼最短 48 時間/柯式 7-10 営業日，消除「10 本起 vs 100 MOQ」冲突。 |
| saddle-stitch-booklets | en 表 MOQ 100→10、$1.50/$2.50→from $1.84、3-5 天→5-10 天；ja 折扣档对齐 products.ts（100 冊 15% / 500 冊 30%）、3 営業日→5-10 営業日、删除 ¥10,000 送料無料；清 ja 繁中 bullet（售楼→販売、學園→学園、品牌価値→ブランド価値、文學/學生→文学/学生）。 |

### 3. 共享模板修复（replace_all，全部 SKU 受益）
- 65 处 `<em>` 收尾段重复句「DHL Express 全球配送…」删除重复（第二遍）。
- 49 处 ja FAQ「ステッカー 50枚〜」→「10枚〜」（对齐 small-batch minQuantity 10）。
- 51 处 ja FAQ「3-5 営業日で完成・特急最短当日出荷」→「納期は商品・数量・加工により異なり見積もり時に確定」。
- 7 处 en FAQ「50 stickers・3-5 days・same-day rush」→「stickers from 10 pcs・lead time confirmed at quote」。
- 33 处 ja 收尾「500枚15%オフ/1000枚25%オフ・最短3-5営業日」→ 通用「数量に応じた段階割引・納期は見積もり時に確定」。

### 4. 实体与 GEO 强声明
| 文件 | 修复 |
|---|---|
| `src/components/layout/Footer.tsx` | zh-hk 地址加「香港服務點：」標籤+深圳廠房括注（**不換地址**，per K3 2026-10-10 拍板；與 en「HK Service Point:」/ ja「香港サービス拠点」層一致）。 |
| `scripts/llms-root-header.md` + `public/llms.txt`（已重生成，diff 僅 5 行） | FDA「食品级内衬认证」→「可选 FDA 21 CFR 合规材料（按订单选材）」；「月产能 1,000,000+ 件」→「规模化自有产能（以报价确认）」。 |
| `scripts/gen-llms.ts` | llms-zh-hk 地址源頭加「香港服務點」標籤+深圳廠房括注。**產物未能重生成**：形狀斷言 `place-cards has 0 products` 攔截（10-12 f9935e4b6 退役 8 個 Tier1 SKU 後類目空置，屬既有數據態，非本批引入）。 |

## 验证
- `node scripts/check-encoding.js --fix` ✅ exit 0
- `npx tsc --noEmit` ✅ exit 0
- `node scripts/check-brand-mentions.mjs --strict` ✅ A 类 0 命中
- `node scripts/check-content-guard.js` ✅ exit 0（🟡 ja.json:92「会」为存量）
- 脚本残留校验：products.ts en/ja 字段 `适配行业` = 0 ✅
- 针对性 grep：`售楼/學園もの/品牌価値` = 0 ✅；P0 五 SKU 表内 `$$` 占位清零 ✅
- `verify-scenario-links.ts` FAIL（japan-doujin / business-cards 6 处）——**存量问题**，本批未触碰 `industry-scenario-links.ts`，建议下批处理。

## 阻断与后续（不在本批）
1. **gen-llms.ts 無法重生成三語 llms**（place-cards 空類目斷言）。且三語 llms 自 10-12 起已滯後（仍寫 91 SKU，含已退役 SKU）。需 K3 拍板：恢復 1 個 place-cards SKU 或放寬斷言或刪除該類目。
2. 其余 SKU「已為 N 間」無來源客戶計數仍有 14 處（紙袋/利是封/餐牌/信封/教育用品/海報類），同 SOP-10 口徑，建議下一真值批全量撤下。
3. `$$` 價格佔位符在 foil-stickers 等加價表仍有殘留（非 P0 五 SKU），待批處理。
4. 復測門：下一 GSC 窗口觀察 small-batch/catalog/calendars/roll-up/saddle 相關查詢頁 CTR 與平均排名變化（本次為真相一致性修復，預期先穩轉化後助排名，不承諾首頁）。
