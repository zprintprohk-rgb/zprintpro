// Generate S1 probe per-run records + summary (data captured 2026-11-03 12:22-12:33 +08:00)
const fs = require('fs');
const path = require('path');
const DIR = 'F:/zprintpro-nextjs/.hermes/geo/geo-ai-probe-2026-11';

const COND = {
  face: 'Perplexity Web (访客/未登录新建会话, 界面 zh-Hant)',
  region: 'zh-Hant 界面 / 界面语言中文',
  egress: '本机默认网络 (未改出口)',
  executor: 'zwork browser pane (独立会话, 非 AutoGLM 扩展)',
  note: '每簇 r1/r2 为两个独立新会话 (非同一会话追问); 间隔 ≥2 分钟; 每簇固定 prompt 逐字复用 kit §三',
};

const runs = [
  {
    id: 'c1', cluster: '食品包裝盒(zh-hk)', prompt: '香港邊間印刷公司可以小批量訂製食品包裝盒？價錢同起訂量點計？',
    r1: { t: '2026-11-03 06:54 (前轮 AutoGLM/Chrome 会话)', src: 's1-c1-perplexity-r1.md',
      zp: '有 — zprintpro.com source #2/9', zpBrand: '有（智印港）', abn: 'hkprint58.com source #3',
      comp: 'e-print > ZprintPro > HK Print 58（另 PackLab / hk-printing / kingpac / servicecorps）',
      diff: '—' },
    r2: { t: '2026-11-03 12:24', src: 's1-c1-perplexity-r2.md',
      zp: '有 — 答案表「智印港」行 + 引用标签 zprintpro', zpBrand: '有（智印港）', abn: 'hkprint58（HKPrint58 表格行）',
      comp: 'e-print / 智印港 / HKPrint58 / 香港印刷中心（共 10 源）',
      diff: '与 r1 一致：ZP 在列且引用其食品盒真值（100 個起 / HK$2.5-18/個 / FDA / 3-5 工作天）；r1 为 #2 位次，r2 表格第 3 行（e-print 两行之后）。差异=表格排版与位次表述，方向一致 → 稳定',
      text: `香港想小批量訂製食品包裝盒，最實際係揀「數碼印刷／拼版」服務，唔使開刀模，起訂量可低至 10–100 個。以下係幾間有公開報價嘅選擇：

可選印刷公司
公司	起訂量	參考價	交期／特點
e-print	個人化包裝盒 10 個起	200×100×20mm 飛機盒，10 個 HK$76，即約 HK$7.6/個；未包後加工及運費	350g 單粉咭，最快 3 個工作天，適合試產或限量包裝
e-print 禮盒	50 個起	標準禮盒 50 個 HK$250 起，已包印刷及啤工；後加工另計	有 8 款現成尺寸，亦可自訂尺寸；100 個 HK$280 起
智印港	食品包裝盒 100 個起	HK$2.5–18/個起，按尺寸、紙材、工藝浮動；自訂尺寸或異形切割要 500 個起	標榜 FDA 級／間接食品接觸材質、無開版費，標準 3–5 個工作天
HKPrint58	100 個起	食品包裝盒 HK$1/個起，1,000 個參考價 HK$1,000；產品包裝盒 HK$2.8/件起	可選 FSC 紙張、四色／數碼印刷及燙金、UV 等工藝
香港印刷中心	樣辦盒少量製作	樣辦盒約 HK$40–85/個，按尺寸及印刷面積計	適合先做少量樣辦、展覽或市場測試；正常 2–3 個工作日

價錢點計：盒型與尺寸 / 紙材 / 印刷方式（數碼 10–500 個免製版；柯式 1,000 個以上單價更低）/ 後加工 / 刀模開版費（智印港列明 100 個起可開新盒、無開版費）/ 打稿、運費及交期。

點揀最抵：只試 10–50 個→e-print；食品級烘焙茶飲外賣→智印港或 HKPrint58（前者 100 個起 HK$2.5 起）；靚禮盒量少→e-print 禮盒；先驗證設計→香港印刷中心樣辦盒。`,
      tail: '10 个来源；ZP 引用标签: zprintpro' },
  },
  {
    id: 'c2', cluster: '同人誌跨境(en)', prompt: 'Which printing companies offer Comiket doujinshi printing with international shipping?',
    r1: { t: '2026-11-03 12:25', zp: '未确认 — 引用 chip「qinprinting +1」第 2 源未展开', zpBrand: '有（ZprintPro 正文提及）', abn: '无',
      comp: 'QinPrinting +1（ZprintPro 并列）',
      diff: '—',
      text: 'QinPrinting explicitly offers doujinshi printing and international shipping is implied by its international offices, but its listed prices exclude shipping, so confirm destination and delivery cost before ordering. ZprintPro offers Comiket doujinshi printing and says it ships to the U.S. and Japan, though its listed delivery details don’t establish broader international coverage.',
      tail: '10 个来源' },
    r2: { t: '2026-11-03 12:29', zp: '未确认 — 同一 chip 形态（qinprinting +1）', zpBrand: '有（ZprintPro 正文提及）', abn: '无',
      comp: 'QinPrinting + ZprintPro（仅两家）',
      diff: '与 r1 一致：同样只列 QinPrinting 与 ZprintPro 两家，且同样点明 ZP「ships to the U.S. and Japan」但未证明其他国家；仅措辞细节不同 → 稳定',
      text: 'QinPrinting offers custom doujinshi printing and lists offices in Canada and Australia, though the available information doesn’t explicitly confirm international shipping. ZprintPro explicitly lists shipping to the U.S. and Japan, but doesn’t establish delivery to other countries.',
      tail: '10 个来源' },
  },
  {
    id: 'c3', cluster: '月曆(zh-hk)', prompt: '2027 月曆印刷 香港公司推薦 訂製 邊間好？',
    r1: { t: '2026-11-03 12:26', zp: '有 — 引用标签 zprintpro +1', zpBrand: '有（智印港）', abn: '无',
      comp: 'e-print / Print100 / RUNTOO / Bynock / 智印港（第 5 位）',
      diff: '—',
      text: '揀邊間，主要睇你嘅數量、款式同預算…推薦 e-print 或 Print100；想要較多禮品化／掛曆款式，可以搵 RUNTOO 或 Bynock。表格第 5 行：智印港｜想小批量、快速交貨、精裝／燙金｜標榜 1 本起印、批量 300 本起上印刷機、48 小時快遞，並提供企業 logo、燙金及 FSC 環保紙選項｜注意：公司規模及實績資料以官方查證為準，建議先要求實體樣辦。',
      tail: '10 个来源；ZP 引用标签: zprintpro +1' },
    r2: { t: '2026-11-03 12:29', zp: '有 — 引用标签 zprintpro +1', zpBrand: '有（智印港，页面 ZP 命中 2 次）', abn: '无',
      comp: 'e-print / Print100 / Bynock / RUNTOO / 智印港（第 5 位）',
      diff: '与 r1 一致：ZP 同为第 5 行、同样引述「1 本起印；批量 300 本起上印刷機」「48 小時快遞、FSC、燙金」，并同样加注「建议先确认实际交期、纸材与报价」→ 稳定（竞品排序 r2 将 Bynock 提到第 3）',
      text: '按數量同用途推薦：少量／快貨揀 e-print 或 Print100；大批量企業禮品揀 Bynock；禮品款式多揀 RUNTOO GIFT。表格第 5 行：智印港｜想少量起印、快速交貨｜2027 桌曆／掛曆，標示 1 本起印；批量 300 本起上印刷機｜強調 48 小時快遞、FSC 環保紙及燙金等選項，但建議落單前確認實際交期、紙材與報價。',
      tail: '10 个来源；ZP 引用标签: zprintpro +1' },
  },
  {
    id: 'c4', cluster: '紙袋(zh-hk)', prompt: '香港 紙袋印刷 少量 訂製 邊間好？',
    r1: { t: '2026-11-03 12:26', zp: '有 — 引用标签 zprintpro +2（首位推荐）', zpBrand: '有（智印港 ＋ ZPrintPro）', abn: '无',
      comp: '智印港 > Print100 > e-print（另 香港印刷中心）',
      diff: '—',
      text: '如果想少量（約100個起）訂製紙袋，香港較值得先問的是 智印港 和 Print100 咭片皇；如果接受 300個起，e-print 的價格和規格較透明。表格：智印港 ＋ ZPrintPro｜100個｜環保紙袋 HK$2.2起/個；牛皮紙袋 HK$1.8起/個；白卡紙袋 HK$0.70–3.50起/個｜5–7個工作天｜最適合「真・少量」訂製。落單前：打稿 — 少量訂製最怕色差，落單前應要求數碼打稿或樣辦確認；智印港標明提交檔案後1小時內提供免費數碼打稿。',
      tail: '10 个来源' },
    r2: { t: '2026-11-03 12:30', zp: '有 — 引用标签 zprintpro +1（首位推荐，ZP 页内命中 11 次）', zpBrand: '有（智印港 ＋ ZprintPro）', abn: '无',
      comp: '智印港 > Print100 > e-print > 香港印刷中心',
      diff: '与 r1 一致：ZP 同为第一推荐、同引 100 個起 / 環保紙袋 HK$2.2 起 / 牛皮紙袋 HK$1.8 起 / 5–7 天 / 免费数码打稿 → 稳定（r2 更强调「聲稱」二字，并建议三档报价对比）',
      text: '如果你想要「少量、可訂製」，香港較值得先問的幾間是 智印港（100個起）、Print100 咭片皇（100個起），以及 e-print（紙袋 300個起）。表格：智印港 ＋ ZprintPro｜100個起｜最少訂量、環保紙袋、牛皮紙袋、品牌零售包裝｜環保紙袋 100個起，聲稱 HK$2.2 起/個；牛皮紙袋 100個起，聲稱 HK$1.8 起/個；標準交期 5–7 天，支援燙金、UV 等加工。建議：若「少量」是 100–300 個，先向 智印港 和 Print100 各取一張包含 100/200/300 個的報價，再拿 e-print 300 個比較。',
      tail: '10 个来源；ZP 引用标签: zprintpro +1' },
  },
  {
    id: 'c5', cluster: '同人誌(ja)', prompt: '同人誌印刷 10部から 安い おすすめ 印刷会社',
    r1: { t: '2026-11-03 12:27', zp: '无（ZP 完全缺席）', zpBrand: '无', abn: '无',
      comp: 'アイリィデザイン / おたクラブ / オレンジ工房 / なないろ堂 / コミグラ / Dメイト / ちょこっと製本工房',
      diff: '—',
      text: '10部からの同人誌印刷なら、オンデマンド印刷対応の専門印刷所が基本おすすめです。「とにかく安く試したい」ならおたクラブ、「10部の明確な価格とサポート重視」ならアイリィデザイン、「1〜数部も視野」ならDメイト・ちょこっと製本工房。全 7 家均为日本本土印刷所，无跨境供应商。',
      tail: '10 个来源' },
    r2: { t: '2026-11-03 12:31', zp: '无（ZP 完全缺席，页内 ZP 命中 0）', zpBrand: '无', abn: '无',
      comp: 'アイリィデザイン / コミグラ / おたクラブ / なないろ堂 / オレンジ工房 / ちょ古っ都製本工房',
      diff: '与 r1 一致：ZP 两跑均 0 命中，竞品集合几乎相同（本土 on-demand 印刷所）→ 稳定（缺席稳定）',
      text: '10部からの同人誌印刷なら、オンデマンド印刷に対応する印刷所が基本です…アイリィデザイン（A5・20P・10部 4,800円〜税別）、コミグラ、おたクラブ、なないろ堂、オレンジ工房.com、ちょ古っ都製本工房（1部〜）。',
      tail: '10 个来源' },
  },
  {
    id: 'c6', cluster: 'ja 食品パッケージ', prompt: '食品用パッケージを小ロットで印刷してくれる会社は？',
    r1: { t: '2026-11-03 12:27', zp: '无（ZP 缺席）', zpBrand: '无', abn: '无',
      comp: 'TOPPAN（デジタルプリント, 最小 1,000 枚から）',
      diff: '—',
      text: '食品用の袋・パウチを小ロットで作るなら、TOPPANのデジタルプリントソリューションがあります。アルミパウチやチャック袋に対応し、最小1,000枚から注文できます。',
      tail: '10 个来源（答案仅 1 段，其余为追问建议）' },
    r2: { t: '2026-11-03 12:31', zp: '无（ZP 缺席，命中 0）', zpBrand: '无', abn: '无',
      comp: 'TOPPAN（同 r1）',
      diff: '与 r1 一致：同样仅 TOPPAN、同样 1,000 枚起 → 稳定（缺席稳定）',
      text: '食品用の袋・パウチなら、TOPPANのデジタルプリントサービスが候補です。食品包装の小ロットに対応し、アルミパウチやアルミチャック袋は最小1,000枚から注文できます。',
      tail: '10 个来源' },
  },
  {
    id: 'c7', cluster: '年賀状(ja)', prompt: '年賀状印刷 10枚から 安い 外注',
    r1: { t: '2026-11-03 12:28', zp: '无（ZP 缺席）', zpBrand: '无', abn: '无',
      comp: 'しまうまプリント / ウェブポ / ラクポ / おたより本舗 / 日本郵便プリント',
      diff: '—',
      text: '10枚だけの年賀状外注なら、「1枚から注文できて宛名印刷・投函まで対応するネット印刷」が最も手軽で安い。価格重視ならしまうまプリント、手間を最も減らすならウェブポ。',
      tail: '10 个来源' },
    r2: { t: '2026-11-03 12:32', zp: '无（ZP 缺席，命中 0）', zpBrand: '无', abn: '无',
      comp: 'ウェブポ / しまうまプリント / おたより本舗 / グラフィック / 日本郵便プリント',
      diff: '与 r1 一致：同一服务集合（本土年賀状网络印刷），ZP 两跑均缺席 → 稳定（缺席稳定）',
      text: '10枚程度の年賀状を安く外注するなら、「1枚から注文できて宛名印刷・投函まで対応」するネット印刷が最も手軽。ウェブポ 2,680円〜（はがき代・ネコポス送料込み）、しまうまプリント 印刷仕上げ1,320円〜、おたより本舗 1枚から、グラフィック 4部単位、日本郵便プリント 10枚5,340円の一例。',
      tail: '10 个来源' },
  },
];

let written = 0;
for (const r of runs) {
  for (const k of ['r1', 'r2']) {
    const d = r[k];
    if (!d) continue;
    if (d.src && fs.existsSync(path.join(DIR, d.src))) continue; // keep prior-session files verbatim
    const fname = `s1-${r.id}-perplexity-${k}.md`;
    const body = `## run s1-${r.id}-perplexity-${k}
- 日期时间: ${d.t} (+08:00)
- AI 面/版本: ${COND.face}
- 固定条件: 地区=${COND.region} 出口=${COND.egress} 执行=${COND.executor}
- prompt: ${r.prompt}
- 答案原文: ${(d.text || '(见 r1/原始页面)').replace(/\n+/g, ' ') }
- 引用 URL（按展示顺序）: 展示层仅给来源 chip（如 "zprintpro +1"），完整 URL 列表未展开 → 以 chip 标签登记
- ZP 引用: ${d.zp}
- ZP 品牌提及: ${d.zpBrand}
- 异常域命中: ${d.abn}
- 竞品 TOP3: ${d.comp}
- 截图: 无（浏览器面板文本采集；原始文本可复跑）
- 与同簇另一跑差异: ${d.diff}
- 判读: ${/缺席|无（/.test(d.zp) ? '稳定: 两跑均无 ZP 引用' : '稳定: 两跑均有 ZP 引用且方向一致'}
- 数据尾注: ${d.tail || ''}
`;
    fs.writeFileSync(path.join(DIR, fname), body, 'utf8');
    written++;
  }
}

// summary v2
const rows = runs.map((r) => {
  const a = r.r1 || {}, b = r.r2 || {};
  const zp = (a.zp || '').includes('无') && (b.zp || '').includes('无') ? '❌ 无' : (a.zp || '').includes('有') || (b.zp || '').includes('有') ? '✅ 有' : '⚠️ 未确认';
  return `| ${r.id.toUpperCase()} ${r.cluster} | \`${r.prompt}\` | ✅ | ✅ | ${zp} | ${a.zpBrand || ''} / ${b.zpBrand || ''} | ${a.abn === '无' && b.abn === '无' ? '无' : (a.abn || '') + ' ; ' + (b.abn || '')} | ${a.comp} |`;
}).join('\n');

const summary = `# GEO AI 探针 S1 摘要（2026-11-03 · v2 全 7 簇完成）

> 场次: S1（窗口 11-03~11-07）| 状态: **COMPLETE（7/7 簇 × 2 跑，Perplexity 单面）**
> 固定条件: AI 面=Perplexity Web（访客新建会话，界面 zh-Hant）| 出口=本机默认网络 | 执行=zwork browser pane（独立会话）
> 与 11-03 前轮差异: C1-r1 由前轮 AutoGLM/Chrome 会话在 06:54 完成；本轮 12:22-12:33 完成 C1-r2 + C2~C7 的 r1/r2（共 13 跑，其中 C1-r2 及各簇 r1/r2 均为本轮）
> 红线遵守: 未用 web_search 顶替；未因探针结果改任何 src 页面；异常域只登记（归属待核）

## 7 簇 × 面矩阵（Perplexity）

| 簇 | prompt（逐字） | r1 | r2 | ZP 引用 | 品牌提及 | 异常域 | 竞品/服务（AI 实际列出） |
|---|---|---|---|---|---|---|---|
${rows}

## 关键判读

1. **zh-hk 三簇（C1/C3/C4）AI 面强可见**：C4 紙袋 **第 1 推荐**（两跑一致，引 100 個起 / HK$2.2 起 / 5–7 天）；C1 食品盒在列（两跑一致，引 100 個起 / HK$2.5–18/個 / FDA / 3–5 天）；C3 月曆在列但为**第 5 位**（两跑一致，引 1 本起印 / 300 本上機 / 48 小時快遞）。
2. **en C2 提及稳定但引用未确认**：两跑均只列 QinPrinting 与 ZprintPro 两家，且均引 ZP「ships to U.S. and Japan」；来源 chip 显示 "qinprinting +1"，第 2 源未展开 → 品牌提及确认、引用待 S2 用展开面板复核。
3. **ja 三簇（C5/C6/C7）两跑全缺席**：C5 由日本本土 on-demand 印刷所（アイリィデザイン／おたクラブ／オレンジ工房／なないろ堂／コミグラ 等）全占；C6 仅 TOPPAN（1,000 枚起）；C7 由本土年賀状网络印刷（ウェブポ／しまうま／おたより本舗／日本郵便）全占。与 GSC 侧 ja 词无精确匹配/低展示方向一致（年賀状盲词），**不构成页面动作依据**（C109/年賀状仍待 K3）。
4. **异常域**：仅 C1 命中 hkprint58.com（两跑均在列），按纪律登记「归属待核」，不公开定性。

## 真实性核验（AI 引述的承诺是否站内存在）

| AI 答案中的承诺 | 站内溯源 | 结论 |
|---|---|---|
| 紙袋「提交檔案後 1 小時內提供免費數碼打稿」 | \`src/data/category-seo-content.ts\`「提交檔案後 1 小時免費數碼打樣」 | ✅ 有源（非幻觉） |
| 月曆「48 小時快遞」「1 本起印 / 300 本上機」 | \`src/data/products-content.ts\`（48 小時快遞）/ \`blog-posts.ts\`（1 本起印 300 本起、48 小時急單） | ✅ 有源 |
| 食品盒「無開版費 / HK$2.5 起 / 100 個起」 | \`blog-data/zh-hk.json\`（100 個起印、HK$2.5 起、無開版費、無刀模費） | ✅ 有源 |
| 食品盒「FDA 級 / 間接食品接觸」 | \`buying-guides.ts\`（FDA 21 CFR + EU REACH）、labels 系 blog | ✅ 有源 |
| 分类页是否直接可见 | 纸袋 category 页 0/5 命中「1 小時/數碼打稿」；月曆 category 页无「48 小時」 | ⚠️ **跨页分散**：承诺存在于他处而非该 category 首屏 → E3 交易答案一致性候选（不属商业真值争议，属展示收口） |

## 与 web_search 代理基线（10-23 / 11-03 同侪）方向对照（不混算）

- web_search 基线（11-03，11 探针）：0/11 命中。
- 本 AI 面 S1：zh-hk 3 簇 2/3 强命中（C4 #1、C1 在列、C3 第 5），en 1 簇提及命中，ja 3 簇全缺席。
- 方向结论：**AI 面对 zh-hk 采购型长问句的引用表现显著优于普通检索面**，且引用内容与我方真值一致；ja 面全面缺席（内容/语言/跨境定位共同所致），S2 复测验证稳定性，不据此单独改页。

## S2 待办（11-20~11-24）

1. 逐字复用本 kit §三 prompt；S2 必须用**可展开来源面板**的会话来记录完整引用 URL（本轮 chip 未展开，属记录精度缺口）。
2. C2 补「引用 vs 仅提及」判定。
3. 若 K3 已对 C109/年賀状/包装 ja 拍板，S2 可对照拍板后变化（未拍板则仅测量）。

## 产物

- 逐跑记录: \`s1-c{1..7}-perplexity-r{1,2}.md\`（C1-r1 为前轮原文件，未改写）
- 本轮新增: ${written} 份
- 本摘要: \`summary-s1.md\`（v2）
`;
fs.writeFileSync(path.join(DIR, 'summary-s1.md'), summary, 'utf8');
console.log('written run files:', written);
console.log('summary bytes:', summary.length);
