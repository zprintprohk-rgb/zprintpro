# SKU 标题 v5 审查与修复 — 本会话补充批（2026-09-23）

> 规则 SSoT: `docs/zprintpro-sku-title-rule-v5-2026-09-23.md`（K3 2026-09-23 拍板，五段式 + 当量 50-57 + 长尾来源阶梯 L0 DELIVERY→L1 GSC→L2 联网→L3 宁缺毋编 + 记录义务）
> 冻结口径: K3 2026-09-23 新拍板「排名前10且有点击才冻结」→ 冻结集 = `certificates` / `foil-stickers`（2026-09-23 重划，`src/data/title-window-freeze.ts` 已重生成）
> 并发说明: K3 侧会话已先行落地 `d3f165fc`（02:42，"SKU 标题 v5 长尾补源修复 28 槽/23 SKU"，unpushed，报告 `.hermes/reports/sku-title-v5-2026-09-23.md`）。**本批 = K3 批遗漏补修 12 槽 + K3 批数据纠错 1 处**，与 d3f165fc 攒批 1 次 push。

## 一、本批修复明细（12 槽 / 12 SKU）

> 当量 = `scripts/guards/title-equiv.js`（全角 CJK×2 / 半角×1，目标 50-57，58 阻断）

| # | 槽位 | 改前 → 改后 | 当量 | 长尾来源行 | 数字来源行 |
|---|---|---|---|---|---|
| 1 | custom-red-packets ja | オリジナルポチ袋印刷 \| 箔押し UV エンボス \| ZprintPro → オリジナルポチ袋印刷 箔押し UV 100枚〜 ¥103〜 \| ZprintPro | 53→57 | 主词 L1（GSC jp_28d「オリジナル ポチ袋」1imp pos3，K3 批已对齐） | 100枚〜←products.ts minQuantity=100；¥103〜←basePrice_ja=103 |
| 2 | custom-calendars ja | カスタムカレンダー \| ノベルティ 各種サイズ \| ZprintPro → オリジナルカレンダー \| 業務用 \| 1冊〜 ¥50〜 \| ZprintPro | 54→55 | 業務用：L2（ja 业务用检索模板；G4 主词对齐 nameJa 首段「オリジナルカレンダー」，修复 カスタム→オリジナル 错位） | 1冊〜←minQuantity=1（ja 日历族口径=冊）；¥50〜←basePrice_ja=50 |
| 3 | mini-calendars ja | ミニカレンダー \| ノベルティ 各種サイズ \| ZprintPro → ミニカレンダー 2027 ノベルティ 1冊〜 ¥50〜 \| ZprintPro | 50→54 | 2027：季节年号（站内 calendar 族既有口径）；ノベルティ：意图词保留 | 1冊〜←minQuantity=1；¥50〜←basePrice_ja=50 |
| 4 | double-sided-flyers ja | 両面チラシ印刷 フルカラー 安い 10枚〜 ¥85〜 \| ZprintPro → 両面チラシ印刷 \| フルカラー 10枚〜 \| ¥85〜 \| ZprintPro | 55→54 | T1 已审提案落盘（`.hermes/title-quality-proposals-20260921.json` 未落地，本批补；去 安い 空洞） | 10枚〜←minQuantity=10；¥85〜←basePrice_ja=85 |
| 5 | roll-up-banners ja | ロールアップバナー \| アルミスタンド 高画質 \| ZprintPro → ロールアップバナー \| アルミスタンド \| 1個〜 \| ZprintPro | 54→55 | 工艺位保留；去 高画質 空洞词 | 1個〜←desc 真值（「1個〜、1-3営業日で全国配送」） |
| 6 | a4-flyers en | A4 Flyer Printing \| 10 MOQ \| Free US Ship \| ZprintPro → A4 Flyer Printing \| 10 MOQ \| From $0.55 \| ZprintPro | 53→51 | 无（钩子优先） | 10 MOQ←minQuantity=10；$0.55←basePrice_en=0.55（去 Free US Ship 条件承诺空洞） |
| 7 | thick-paper-flyers en | Thick Paper Flyers \| Free Shipping $99+ \| ZprintPro → Thick Paper Flyers \| 10 MOQ \| From $0.70 \| ZprintPro | 51→52 | 无（钩子优先） | 10 MOQ←minQuantity=10；$0.70←basePrice_en=0.7 |
| 8 | outdoor-vinyl-banners en | Outdoor Vinyl Banners \| Free Shipping $99+ \| ZprintPro → Outdoor Vinyl Banners \| 1 MOQ \| From $2.76 \| ZprintPro | 54→54 | 无（钩子优先） | 1 MOQ←minQuantity=1（K3 9/21 08:36 拍板全部 1 件起）；$2.76←basePrice_en=2.76 |
| 9 | eco-flyers en | Eco Flyers \| Same-Day Printing \| Free US Ship \| ZprintPro → Eco Flyers \| Recycled Paper \| 10 MOQ $0.60 \| ZprintPro | 57→54 | Recycled Paper：L1（GSC us_28d「eco flyers」2imp pos10）+ 素材真值 | 10 MOQ←minQuantity=10；$0.60←basePrice_en=0.6 |
| 10 | vehicle-wraps en | Vehicle Wraps \| 3M Vinyl Wrap \| Free US Ship \| ZprintPro → Vehicle Wraps \| 3M Vinyl \| 1 MOQ From $6.44 \| ZprintPro | 56→55 | 工艺位 3M Vinyl（name/desc 真值）；主词 L1（GSC「vehicle wrap」3imp pos18.7） | 1 MOQ←minQuantity=1；$6.44←basePrice_en=6.44 |
| 11 | graduation-yearbook en | Graduation Yearbook \| 1 MOQ \| Free US Ship \| ZprintPro → Graduation Yearbook \| 1 MOQ \| From $10.35 \| ZprintPro | 54→53 | 无（钩子优先） | 1 MOQ←minQuantity=1（K3 9/21 08:36 批）；$10.35←basePrice_en=10.35 |
| 12 | kraft-paper-packaging-box ja | クラフト紙包装箱 特注 エコ 300個〜 ¥240〜 \| ZprintPro → クラフト紙包装箱 特注 エコ 300個〜 ¥150〜 \| ZprintPro | 53→53 | K3 批结构保留（特注 エコ 300個〜） | **数据纠错**：¥240→¥150（K3 批误植 cosmetic-boxes 的 bpj=240；kraft 真值 bpj=150，双方法复核：块解析 + 直接 grep `basePrice_ja` 一致） |

## 二、K3 批（d3f165fc）复审计结论

- 28 槽当量全部 50-57 带内（本会话复跑 census：276 槽 band 0 issue）。
- 发现并纠正 1 处数据问题：**kraft-paper-packaging-box ja「¥240〜」无来源**（products.ts 该 SKU `basePrice_ja=150`；240 = cosmetic-boxes 的 bpj，疑似复制误植）→ 本批 #12 纠正为 ¥150〜。
- small-batch-stickers en「50pcs」：K3 批保留 50pcs（改前即 50pcs，仅格式化 + 补 Custom）。desc 真值 =「from 10 pcs at $0.045/pc」（9/20 事实错误批已对齐 desc/引擎 minQ=10），**title「50pcs」与 desc/引擎 minQ 不一致（失实，活书 9/20 窗后队列 #18）**——但 K3 批刚于 02:42 触碰该槽，为避免与 K3 批改动冲突，本批不动，**上报 K3**（选项 A：title 50pcs→10pcs；选项 B：维持 50pcs 按「50pcs 价格档」口径，需改 desc；推荐 A）。
- premium-greeting-cards en「100pcs」：title 与 desc「from 100 pcs HK$100」一致（minQ=10 为 products.ts 层漂移，非 title 错误）→ 不动，备注数据层漂移。

## 三、剩余 issue 判定（复审计 5 项，全部非真实违规）

| 槽位 | 标签 | 判定 |
|---|---|---|
| laminated-menus zh-hk | 无钩子（误报） | 实有「10份起」（份 = products.ts unitLabel 真值，minQ=10）✓ |
| eco-tote-bag zh-hk | 无钩子（误报） | 实有「10件起」（minQ=10）✓；「100%有機棉」素材真值 |
| premium-greeting-cards en | 无钩子（误报） | 实有「100pcs」（正则 \bpcs\b 边界漏判），与 desc 一致 ✓ |
| certificates zh-hk | 空洞词 | **冻结**（排名前10+有点击），「專業印刷 品質保證」报告不动作，需 K3 解锁才可修 |
| white-card-boxes zh-hk | 空洞词（可接受） | 「500個起」真值钩子 ✓；「免費送貨」= desc 真实承诺（滿 HK$500 免費速遞），非空洞修饰词 |

## 四、重复扫描（v5 §2.3 三筛选 #3）

- 本批引入长尾：業務用（custom-calendars ja，日历簇唯一）· 2027/ノベルティ（mini-calendars ja，日历簇内唯一）· Recycled Paper（eco-flyers en，传单簇唯一）——**同簇零碰撞**（脚本核验 `.hermes/_post-k3-audit.cjs` + 人工比对同簇 title）。
- K3 批已处理的同簇去重（摺頁傳單 vs 單張印刷）不重复处理。

## 五、当量体检（改前→改后 3 行）

- 12 槽改前当量：53/54/50/55/54/53/51/54/57/56/54/53 → 改后：57/55/54/54/55/51/52/54/54/55/53/53，**全部 50-57 带内**（应用器用 title-equiv.js 断言，任一越界即中止）。
- 全站 276 槽 census 复跑：band OK 276 / 0 缺失 / FILL/TRIM 空表。

## 六、门禁结果

| 门童 | 结果 |
|---|---|
| census | 92 SKU / 276 槽 / 0 缺失 / band 0 issue |
| tsc | 54 = 基线（0 增量，全为 quote-engine __tests__ 既有） |
| brand-mentions --strict | A 类 0 命中 |
| gsc-leak | 0 命中 |
| encoding --fix | 无待检问题 |
| 长尾来源行 / 数字来源行 | 见 §一 每槽两列 |

## 七、验证窗登记

- `.hermes/title-verify-window-v5-20260923.json`：**38 槽**（K3 批 28 + 本批 12，含 2 槽重叠 custom-red-packets ja / kraft-paper-packaging-box ja 记全链 old→new），appliedDate=2026-09-23，windowEnd=2026-10-03（10 天，对齐 batch1 惯例），gscBaseline 取自 GSC 2026-09-18 combo_28d 页面级。
- 窗内纪律：只读，同簇不再改；起算日 = 修复日 2026-09-23（K3 解冻口径下所有触碰槽重置窗口，先例：活书 9/21 00:03）。

## 八、幂等三问

1. **是否已完成？** 否——K3 批 28 槽之外，复审计仍发现 12 槽真实违规（5 ja 无钩子/空洞 + 6 en Free US Ship 无真钩子 + 1 数据纠错），本批补齐。
2. **是否重复 K3 批？** 部分槽与 K3 批同 SKU 不同 locale（custom-red-packets ja 补钩子、kraft ja 纠价），均为 K3 批未覆盖的字段/数字，无重复改动；12 槽的 old 串逐字命中当前文件（应用器断言），未与 d3f165fc 冲突。
3. **是否可逆？** 是——`.hermes/rollback-title-v5-b2-2026-09-23.json`（old→new 全映射）+ 应用器备份目录 + d3f165fc 为 K3 批回滚锚点。

## 九、撞墙候选（上报 K3，非本批执行）

- **A. greeting-cards 簇名片词**：thick-greeting-cards-400g / foil-greeting-cards 三语 title 仍含「名片/名刺/business cards」（v22 1:1 改名残留，§0.0 未拍板区）。K3 批已上报 A/B/C（推荐 B：title 归贺卡簇）——沿用 K3 批结论，不重复上报。
- **B. small-batch-stickers en title「50pcs」失实**（minQ=10，desc 已对齐 10 pcs）：本批不动，待 K3 一句（推荐 title 50pcs→10pcs）。
- **C. premium-greeting-cards en「100pcs」vs minQ=10**：desc/title 一致，属 products.ts 层漂移，待数据层校准（非内容批权限）。

## 十、数据来源行

```
数据来源:
- docs/zprintpro-sku-title-rule-v5-2026-09-23.md（K3 2026-09-23 拍板，规则 SSoT）
- src/data/products.ts（2026-09-23 提取：minQuantity/basePrice_en/basePrice_ja/unitLabel/turnaround/price_range；kraft bpj 双方法复核）
- GSC .hermes/gsc-2026-09-18/extract.json（combo_28d 查询表 hk/en/jp + 网页表；基线日期 2026-09-18）
- DELIVERY 词库 F:\全球印刷资讯\DELIVERY\02-关键词词库.csv（L0 en 品类词，无 zh/ja 行 → zh/ja 走 L1/L2）
- K3 冻结新口径原话（2026-09-23：「只有排名进前10的SKU,并且是有点击的情况下，SKU标题才冻结」）
- K3 批报告 .hermes/reports/sku-title-v5-2026-09-23.md + commit d3f165fc（2026-09-23 02:42）
- K3 9/21 08:36 MOQ=1 批拍板记录（vehicle-wraps/outdoor-vinyl-banners/graduation-yearbook 1 MOQ 依据）
- 活书 docs/2026-09-20-handover-living-book.md §9（窗口重置先例 9/21 00:03；窗后队列 #18 small-batch）
```

## 十一、执行与交付

- 应用器: `scripts/apply-v5-title-batch2-20260923.mjs`（备份 `.hermes/backup-title-v5-b2-*/`）
- 回滚映射: `.hermes/rollback-title-v5-b2-2026-09-23.json`
- 窗口登记: `.hermes/title-verify-window-v5-20260923.json`
- 冻结重划: `.hermes/reports/freeze-repartition-2026-09-23.json`（frozenCount=2）+ `src/data/title-window-freeze.ts`（重生成，仅 certificates/foil-stickers）
- 交付 commit 与 d3f165fc 攒批 1 次 push（§0.25.9 攒批优先；距上次 push ≥30min 已满足）
