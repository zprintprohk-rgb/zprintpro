# 2026-10-06 en/ja SKU 搜索词扩展作战方案（CSV 源头批 · K3 16 词承接待验）

> 角色：首席 SEO/AEO/GEO 数据战略参谋 · 数据基座：GSC 2026-10-05 导出 12 文件 + 2026-09-29 对比批 + CSV 源头全量审计（75 行 × 31 列）+ 联网调研（ja 网络印刷四社 / en no-minimum 文化 / 年賀状早割窗）

## 数据来源

- GSC 导出：`GSC数据/` 2026-10-05 批（港 11:57-11:58 / 汇总 11:54-11:55 / 美 17:21-17:22 / 日 17:23-17:32）+ 2026-09-29 同窗口对比
- 解析脚本：`.hermes/tmp/gsc_parse_20260930.py`、`parse_1005_and_csv_20261006.py`、`csv_gap_check_20261006.py`（可复跑）；中间产物 `.hermes/tmp/csv-kw-current.json`
- CSV 源头审计：`zprintpro-sku-seo-data.csv`（75 行 / 31 列 TAB / 2026-09-21 生成器口径）vs `src/data/products.ts`（107 slugs）
- 联网证据：raksul.com / graphic.jp / weblabels.net / accea.co.jp（ja 网络印刷搜索习惯）、new-years-card.news.mynavi.jp + prtimes.jp（グラフィック 9/11 开注・10/31 早割 20%OFF）+ gourmet.watch.impress.co.jp（セブン 10/1-12/25）、stickeryou.com / stickerwhisper.com / samedayprinting.com（en no-minimum / same-day 文化）、n-pri.jp + raksul.com（ja 卒アル 1 冊から文化）
- 前序批次（不重复动）：`docs/2026-10-05-a5-week-delta-aeo-report.md`（15 FAQ × 10 块）、`docs/2026-10-05-a6-k3-bigwords-report.md`（K3 16 词 zh 侧全处理 + 10/12 验证锚点表）

---

## 一、K3 点名 16 个 HK 大词：zh 侧状态确认（本批不动，10/12 收数）

| 词 | 10/05 位次(7d) | zh 侧动作 | 状态 |
|---|---|---|---|
| 海報印刷 | 12.8 (56 imps) | 10/05 poster blog ×2 精确锚内链 | ✅ 已处理，10/12 验证进前 10 |
| 印海報 | 9.2 ✓页1 | 守 | ✅ |
| 月曆印刷 | **6.5 ✓页1** | 守（10 月季节窗启动） | ✅ 兑现 |
| 即日印刷 | 6.4 ✓页1 | 守 | ✅ 兑现 |
| 即日急件 | 19.9（7d 小样本波动） | A6 判「守」 | ⏳ 观察 |
| 紙袋訂製/紙袋印刷/訂做紙袋 | 2.7 / 4.4 / 6.6 全页1 | 守 | ✅ 兑现 |
| 食品包裝印刷 | 9.7（28d 9.3） | 守页 1 + CTR 待起 | ⏳ |
| 香港印刷公司/印刷公司 | 27.6 / 33.9 | 10/05 about title 补词面 | ✅ 已处理 |
| 校簿(印刷) | 20.2 | 10/05 educational 校簿 FAQ | ✅ 已处理 |
| 車身廣告 | 35.9 | 10/05 banners 块 FAQ 归位 | ✅ 已处理 |
| 摺頁傳單/摺頁印刷 | 35.1 / 29.3 | 10/05 flyers 摺頁 FAQ | ✅ 已处理 |
| a2/a1 印刷 即日 | **2.2-4.5 ✓** | rush 頁兑现 | ✅ |
| 易拉架印刷/製作 | 47.4 / 54.9 | 10/05 banners 易拉架價錢 FAQ + L771 blog | ✅ 已处理 |
| 學校印刷 | 37.4 | educational 承接 | ⏳ 目标 20 |
| 急件印刷 | @7 ✓新词 | rush keywords 已含 | ✅ |
| 印書 | 22.4 | books keywords+FAQ（A5） | ⏳ |
| 貼紙訂製 | 23.6 | 10/05 sticker-guide 變體錨 | ✅ 已处理 |
| 書刊印刷 | 22.5 | books keywords（A5） | ⏳ |
| 喜帖印刷 | **8.6 ✓**（10/05 新进页1） | wedding 系 blog 生效 | ✅ 兑现 |
| 騎馬釘印刷 | **7.2 ✓** | 守 | ✅ |

**结论：zh 侧 K3 清单已在 10/05 A5/A6 两批全部覆盖，本批零重复。本批主战场 = 您点名的 en/ja SKU 搜索词扩展。**

## 二、GSC 10/05 en/ja 实证新信号（本批词表的事实锚）

### us 站（28d）
| 词 | imps | pos | 信号 |
|---|---|---|---|
| saddle stitch booklet printing | 102 | **4.1** | 页 1 已回稳（churn 结束） |
| small batch sticker printing / small batch stickers | 59/35 | 5.7/5.9 | 守成 |
| china catalog printing | 55 | 17.4 | 助推区第一 |
| small batch label printing | 42 | 26.6 | 未收编 |
| doujinshi printing | 37 | 12.3 | 页 2 顶 |
| calendar sizes / standard calendar size | 28/25 | 43.5/38.0 | 规格词深水 |
| a2 poster / a2 poster printing | 27/7 | 30.9/8.3 | 7d 版已在页 1 顶 |
| **large envelopes** | 15 | 14.0 | ⭐ 新进 7d Top1，envelopes 簇现成 |
| food packaging | 18 | 23.6 | 助推 |
| **evaluate the printing services company moo/vistaprint 类** | 4 | 3.0 | ⭐ 对比评测词已现身（品牌锚定流） |
| zine 系词 | 实时层现身 | — | ⭐ zine printing = en 同人文化词，无承接 |

### jp 站（28d）
| 词 | imps | pos | 信号 |
|---|---|---|---|
| コミケ 印刷 | 185 | 23.5 | 全站第一词，A4 内链生效中（7d 13.3） |
| クラフト紙 パッケージ 印刷 双变体 | 106 | 23.8-24.4 | A5 FAQ 生效第 1 天 |
| 両面カラー印刷 | 33 | 35.7 | 深水大词（double-sided-flyers ja 词面已在 CSV） |
| pvc シール | 21 | 21.3 | PVC 簇 |
| 食品 パッケージ印刷 | 20 | 50.3 | 深水 |
| チラシ印刷 早い | 15 | 28.8 | 「早い」= ja 急件文化词 |
| a2 クリアポスター 印刷 | 15 | 36.0 | クリアポスター（透明海报）= ja 特色品类词 |
| 卒業アルバム 印刷 | 15 | 67.7 | ⭐ 深水大词，Q4→3 月毕业季蓄水期 |
| カタログ 印刷 | 14 | 38.4 | ja catalog-printing 页 title 是兜底模板（9/30 实测） |
| 特急印刷 激安 | 13 | 16.1 | rush ja 词面已在 |
| 教科書 印刷 | 12 | 28.8（churn 中） | 冻结观察 |
| 缶バッジ 印刷 | 11 | 39.3 | SKU 已下架（D3 拍板项） |
| **同窓会 印刷** | 10 | 44.7 | ⭐ 新词，毕业季簇 |
| 中 綴じ 冊子 印刷 激安 / a1 ポスター | @1.0 ✓ | 守 | 兑现 |
| ラミネート メニュー表 制作 | @7.7 | menus ja 词面缺口 | ⭐ |
| 社名入りカレンダー 少量注文 | @8.3→10 | A5 FAQ 已注入 | ⏳ |

## 三、联网调研：en/ja 市场搜索习惯（词表设计依据）

### ja 习惯词构式（raksul/グラフィック/アクシー/iro-dori 实证）
1. **价格词文化**：「激安」「格安」「料金表」「相場」直接进搜索——raksul 料金表页、iro-dori「100枚710円〜」都把价格放 title；激安是网络印刷第一修饰词
2. **数量起点词**：「1枚から」「10枚〜」「100個〜」「小ロット」——graphic「1枚（小ロット）から」、しまうま「1冊298円から」
3. **速度词**：「最短即日」「11時までのご注文で即日」「最短1営業日」「翌日出荷」——GSC「チラシ印刷 早い」「特急印刷 激安」同构
4. **比价评测词**：「〜比較」「おすすめ」「安い会社16選」——mynavi「格安20社で厳選」popri「徹底比較」
5. **季节节奏**：年賀状 = **9/11 起印刷注文受付、10/31 早割截止（グラフィック 20%OFF）、11 月末早割主流、12/25 投函**（mynavi/prtimes/セブン三源）——ja 站 Q4 头号季节词窗口已开
6. **规格词**：「四六判」「A4判」「角2」「長3」「 PP加工 」——日规尺寸词必须用日本叫法

### en 习惯词构式（stickeryou/stickerwhisper/samedayprinting/printpapa 实证）
1. **No minimum** 是第一文化词（StickerYou「No Minimums」、StickerWhisper「no-minimum die-cut stickers」）——本站 10 起订正是卖点
2. **Same day / next day / rush**：samedayprinting.com 全站主打；GSC「overnight flyer printing」已现身
3. **Cheap + bulk 组合**：「cheap custom stickers」「bulk …」高频
4. **对比评测流**：「best … comparison」「evaluate the printing services company」（GSC 实证 @3.0）——GEO 层机会：让 AI 引用我们的对比表
5. **美规尺寸词**：9x12 envelopes / 17x5.5 brochures / 8.5x11 trifold——en 用美规不用 A 系（GSC「large envelopes」14.0 佐证）

## 四、CSV 源头审计：三大硬伤（本批修复对象）

> `zprintpro-sku-seo-data.csv` 75 行 vs products.ts 107 slugs；SOP-5：改 CSV 源头 → 跑 `scripts/csv-to-sku-seo.mjs` 重生成 `sku-seo-data.ts`（1MB 派生文件禁手搓）

1. **36 个 SKU/类目缺 CSV 行**：含 14 个类目行（stickers/flyers/packaging/paper-bags/posters/books/menus/banners/calendars/envelopes/red-packets/educational/japan-doujin/wedding-invitations）+ 6 个贺卡 SKU（premium/thick-400g/foil/spot-uv/matte/rounded）+ wedding 系 7 + packaging 系 7（corrugated/white-card/tuck-end/gang-run/magnetic/electronics/kraft-paper-packaging-box）+ 同人 4（japan-doujin/doujinshi-printing/postcard-set/eco-tote-bag）+ graduation-yearbook + fruit-food-label-stickers
2. **ja 关键词模板污染 57/75 行**（11 组尾串 ≥3 重复）：flyers 全系带「箔押し証書・表彰状印刷・偽造防止用紙」（证书词污染传单页）；red-packets 全系带「年賀状・クリスマスカード・結婚式招待状」（红包装年賀状词=本批正要建的年賀状词自我蚕食风险）；paper-bags 全系带「2時間受取・48時間出荷」（港站口径词污染 ja 页）——跨品类词面稀释 SKU 相关性 + 造成内耗
3. **en「X USD」半截垃圾词 51/75 行**：生成器拼接 bug 产物（「stickers free shipping,bulk waterproof stickers,stickers USD」USD 后无词），既浪费槽位又显低质
4. **幽灵行 4 条**：gift-boxes / disposable-menus / mesh-banners / small-bags 在 CSV 不在 products.ts（gift-boxes 行 en/ja keywords 全空）——待 K3 确认是已下架残留还是待上架漏登记

## 五、执行方案（三批推进，本批 = B1）

### B1 CSV 源头修复批（先修后补，1 commit）
| # | 动作 | 断言 |
|---|---|---|
| 1 | 清 51 行 en「X USD」半截词（正则 `,?\s*[a-z ]+ USD$| USD,` 边界逐行核） | 清理后 USD 垃圾词 0 命中；每行词数 ≥10 |
| 2 | 57 行 ja 模板污染分簇清理：flyers 簇去证书词 → 补「チラシ 印刷 激安・折りチラシ A4・チラシ印刷 料金・即日チラシ」；red-packets 簇去年賀状/クリスマス/結婚式 → 补「ポチ袋 印刷・紅包 オリジナル・旧正月 祝儀袋」；paper-bags 簇去港站口径 → 补「紙袋 印刷 激安・ノベルティ 紙袋・100個〜」 | 每簇尾串重复组数 11→≤3；各 SKU 首词=该 SKU 日文主词 |
| 3 | 幽灵行 4 条处理：K3 未裁决前不删，仅 gift-boxes 空 keywords 标注 TODO | 0 删行 |
| 4 | 跑 `node scripts/csv-to-sku-seo.mjs` 重生成 + 门童全量（brand/gsc-leak/MOQ） + 备份 CSV 先行 | sku-seo-data.ts 重新生成无 diff 异常；tsc 54=54 |

### B2 36 缺行补齐批（本批主交付，同 commit 或次 commit）
- **补齐规则**：title 列照抄 products.ts 现值（title 冻结纪律，0 churn）；keywords/description/alt/FAQ 按 §六 词表补；MOQ 全走真值
- **一梯队（季节+实证 8 行）**：greeting-cards（年賀状印刷・早割 10/31 前対応 / en business holiday cards——10/1 A4 批 title 已上，keywords 层承接）、japan-doujin + doujinshi-printing + postcard-set + eco-tote-bag（コミケ 185 imps 全站第一词 + en fanzine/artist alley printing）、calendars（en 2027 custom calendars / ja 社名入りカレンダー 1部〜）、envelopes（en large envelopes + 9x12/10x13 美规尺寸 / ja 角2・長3 封筒 激安）、graduation-yearbook（ja 卒業アルバム 印刷 激安・同窓会 記念誌）
- **二梯队（11 类目行）**：stickers/flyers/packaging/paper-bags/posters/books/menus/banners/red-packets/educational/wedding-invitations——每行 ja 按激安/料金表/○から构式、en 按 no minimum/same day/bulk 构式
- **三梯队（17 长尾 SKU）**：贺卡 6 + wedding 7 + packaging 7 + fruit-food-label——按簇模板 + SKU 差异词

### B3 en/ja 页面层承接（后续批，B2 验证后）
- ja catalog-printing 页 title 兜底模板修复（9/30 实测「ZprintPro | 印刷サービス」无头词）→ カタログ印刷 @38.4 收编
- ja greeting-cards 类目页 quickAnswer「年賀状印刷はいつから？9/11 受付開始・10/31 早割」（联网证据口径，年份数字按 2027 实际写）
- en zine printing 词面注入 books/japan-doujin 转化块（GSC 新信号，低成本试水）
- a2 クリアポスター（透明海报）ja 词面 → posters ja keywords（15 imps @36.0）

## 六、en/ja SKU 关键词扩展词表（分簇核心词，CSV 补行用）

| 簇 | ja 扩展词（按习惯构式） | en 扩展词 |
|---|---|---|
| 贴纸 | シール印刷 激安 / ステッカー印刷 料金 / 1枚から シール / 小ロット シール / ネームシール / ラベル印刷 | no minimum stickers / cheap custom stickers / custom stickers near me / small run stickers |
| 传单 | チラシ印刷 激安 / 折りチラシ A4 / チラシ印刷 料金表 / チラシ 100枚 / 即日チラシ / フライヤー印刷 | cheap flyers / same day flyers / no minimum flyer printing / 8.5x11 flyers |
| 包装 | パッケージ印刷 激安 / クラフト紙 パッケージ / 食品パッケージ 激安 / パッケージ 100個〜 / 化粧箱 オリジナル | custom packaging boxes no minimum / cheap custom boxes / kraft packaging |
| 书刊 | 冊子印刷 激安 / 中綴じ 冊子 / 製本 激安 / 冊子印刷 料金 / パンフレット印刷 | zine printing / short run book printing / booklet printing no minimum |
| 年賀状/贺卡 | 年賀状印刷 / 年賀状印刷 早割 / オリジナル年賀状 / 年賀状印刷 激安 | business holiday cards / corporate christmas cards / custom holiday cards bulk |
| 月历 | カレンダー印刷 2027 / 社名入りカレンダー 1部〜 / 卓上カレンダー 名入れ / カレンダー 激安 | 2027 custom calendars / desk calendar printing / company calendars bulk |
| 信封 | 封筒 印刷 激安 / 角2封筒 オリジナル / 長3封筒 / 封筒 両面印刷 | large envelope printing / 9x12 envelopes / catalog envelopes custom |
| 毕业/同人 | 卒業アルバム 印刷 激安 / 同窓会 記念誌 / 卒アル 1冊から / コミケ 新刊印刷 / 同人誌印刷 激安 | fanzine printing / artist alley printing / yearbook printing |
| 菜单 | メニュー表 ラミネート 制作 / メニュー印刷 激安 / PVCメニュー | waterproof menu printing / laminated menus |
| 红包 | ポチ袋 印刷 / 紅包 オリジナル / 旧正月 ポチ袋 | red envelope printing / lunar new year red packets |
| 易拉架 | バナー印刷 激安 / ロールアップバナー / バナースタンド 即日 | roll up banner printing / same day banners |

## 七、红线与验证

- title 列零 churn（缺行 SKU title 照抄 products.ts 现值；存量行 title 一律不动——churn 组 10/12 验证后才解冻）
- SOP-5：只改 CSV 源头，跑生成器重派生；三件套（计数断言 + 形状断言 + 备份）先行
- GSC 黑话不入 CSV 客户可见字段（§0.23.1）；MOQ 真值口径；「早割 10/31」类时效数字写进 FAQ/描述时标注来源与到期复核日
- 验证：B1/B2 后门童全量 + tsc + 线上 3 SKU × 3 locale keywords 探针；下轮 10/12 GSC 验证 en large envelopes / ja 同窓会印刷 / 年賀状簇 0→有展示
- push 窗口：本地 ahead 18（含 10/05 A6 批 ad54ea18），上次 push 09-30 03:26——远超 30 min 间隔，B1+B2 完成后合并 1 push（攒批达标：多文件 src 派生变更）
