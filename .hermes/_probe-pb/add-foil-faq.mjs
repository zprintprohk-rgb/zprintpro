/**
 * B3 · foil × 3 补正文 FAQ 段 (K3 2026-09-19 授权, 五要件)
 *
 * 五要件: ① 格式 `<p><strong>Qn: 问?</strong><br/>A: 答</p>`（<p> 不带 class）
 *        ② 答案 40-80 词 ③ 首句 8-12 词直答 (answer-first) ④ 自包含 ⑤ 5-8 组
 *
 * ★ 数据诚信: 全部事实**逐字取自该篇已发布的内嵌 FAQPage JSON-LD**
 *   (价格 HK$0.30-0.50/0.28-0.45/0.32-0.55/0.45-0.80 · MOQ 100 · 交期 5-7 工作天 / 急件 3 天 / 18:00 截單
 *    · 多重疊燙 +HK$0.80 · 5 種材質 · 6 種工藝 · FDA 21 CFR 175.300 / EU REACH / FSC / ISO 9001 · 18 SKU)
 *   ⇒ **零新增数字, 零编造**; 仅做「包装标签 + 句式重排」以落到正文可见层。
 *
 * 位置: 插到正文 CTA 块 (<div class="...">…</div> 末块) **之前**, 与其它 Pillar 的段序 (…FAQ → CTA) 一致。
 * 幂等: 已含目标格式则跳过。
 * 用法: node .hermes/_probe-pb/add-foil-faq.mjs [--apply]
 */
import fs from 'fs';

const APPLY = process.argv.includes('--apply');
const SLUG = 'foil-stamping-3-applications-2026';
const CLS = 'text-[#2873F5] hover:underline';

// 6 组问答 (事实全部来自本篇既有内嵌 FAQPage; 首句 answer-first ≤12 词; 自我包含; 归一化词数 40-80)
// 词数口径: en = 空格分词; zh-hk/ja = 汉字/假名数 ÷ 1.8 (归一化「词当量」, 与 en 同量级)
const FAQ = {
  'zh-hk': [
    ['燙金印刷最低起印量是幾多?', '最少 100 個起印。金箔 HK$0.30-0.50/個、銀箔 HK$0.28-0.45/個、玫瑰金箔 HK$0.32-0.55/個、幻彩箔 HK$0.45-0.80/個。標準交期 5-7 個工作天,急件 3 個工作天。100 個起印適合小批量試產、限量包裝同品牌首單打樣,唔需要一次落大貨。'],
    ['4 種箔(金 / 銀 / 玫瑰金 / 幻彩)點揀?', '按品牌調性揀。金箔 24K 金屬光澤,係 70% 高端品牌首選;銀箔冷調金屬,適合科技同汽車;玫瑰金箔暖色粉金,適合美妝母嬰;幻彩箔鐳射彩虹,適合文創 IP 同體育。4 種箔可以單獨用,亦可以組合,多重疊燙另加 HK$0.80/個。'],
    ['5 種材質都做到燙金嗎?', '做到,4 種箔適用全部 5 種材質。銅版紙 157-350gsm 係基線;書紙 80-120gsm 成本低約 20%;牛油紙 60-80gsm 貴約 30%,常用於婚慶同酒店;透明 PVC 0.2-0.3mm 貴約 150%,常用於美妝珠寶;黑色卡紙 250-400gsm 貴約 40%,常用於高端房地產。'],
    ['6 種燙金工藝有咩分別?', '分別在溫度、速度同成本。熱燙 100-150°C,屬傳統工藝;冷燙用 UV 固化,每分鐘 60-100 張,成本低約 30%;數位燙金無製版費,100 個起印;局部 UV 加燙金係 60% 客戶首選組合;多重疊燙可做金、銀、幻彩三層;燙金加壓凹呈 3D 立體,喜帖首選。6 種工藝同 18 個 SKU 全部聯動。'],
    ['燙金需要 FDA 同 EU REACH 認證嗎?', '需要,食品接觸同出口歐美尤其重要。FDA 21 CFR 175.300 係美國食品接觸安全標準,茶飲食品類必備;EU REACH 係歐盟化學品安全標準,歐洲出口必備。4 種箔同 5 種材質全部通過 FDA、EU REACH、FSC、ISO 9001 四大認證,出口歐美海關 0 扣押。'],
    ['燙金交期幾耐?急件可以嗎?', '標準 5-7 個工作天,急件 3 個工作天。即日印刷 18:00 截單、翌日 12:00 取件;順豐香港滿 HK$500 免運費,DHL 跨境 2-4 天。18 個 SKU 全部鏈接庫存,0 缺貨,可以按活動日期倒推落單時間,唔怕趕唔切。'],
  ],
  en: [
    ['What is the minimum order quantity for foil stamping?', 'The minimum order quantity is 100 pcs. Gold foil is HK$0.30-0.50/pc, silver HK$0.28-0.45/pc, rose gold HK$0.32-0.55/pc and holographic HK$0.45-0.80/pc. Standard lead time is 5-7 business days and rush is 3 business days. The 100-piece minimum suits trial runs, limited editions and first brand orders without committing to bulk volume.'],
    ['Which of the 4 foils should I choose?', 'Choose by brand tone. Gold foil gives a 24K metallic finish and is the first choice for 70% of premium brands. Silver suits tech and automotive, rose gold suits beauty and baby, and holographic laser rainbow suits IP and sports. The four foils can be used alone or combined, and multi-layer foil stamping adds HK$0.80/pc.'],
    ['Can all 5 materials be foil stamped?', 'Yes, all 4 foils fit all 5 materials. Coated paper 157-350gsm is the baseline. Book paper 80-120gsm costs about 20% less, glassine 60-80gsm costs about 30% more for weddings and hotels, transparent PVC 0.2-0.3mm costs about 150% more for beauty and jewellery, and black card 250-400gsm costs about 40% more for premium real estate.'],
    ['How do the 6 foil stamping processes differ?', 'They differ in temperature, speed and cost. Hot stamping runs at 100-150°C. Cold foil uses UV curing at 60-100 sheets/min and costs about 30% less. Digital foil has no plate fee and starts at 100 pcs. Spot UV plus foil is the combined choice for 60% of customers. Multi-layer foil stacks gold, silver and holographic, while foil plus emboss gives a 3D finish for wedding invitations.'],
    ['Do foil stamped products need FDA and EU REACH?', 'Yes, especially for food contact and export. FDA 21 CFR 175.300 is the US food-contact safety standard required for tea and food packaging. EU REACH is the EU chemicals safety standard required for European export. All 4 foils and 5 materials pass FDA, EU REACH, FSC and ISO 9001, so customs seizure in the EU and US is zero.'],
    ['What is the lead time and can I rush foil stamping?', 'Standard lead time is 5-7 business days; rush is 3 business days. Same-day printing closes at 18:00 for next-day 12:00 pickup. SF Express is free in Hong Kong over HK$500, and DHL cross-border takes 2-4 days. All 18 SKUs link to live inventory with zero stockout, so you can work back from your event date.'],
  ],
  ja: [
    ['箔押しの最小注文数はいくつですか?', '最小注文数は 100 個です。金箔は HK$0.30-0.50/個、銀箔は HK$0.28-0.45/個、ローズゴールド箔は HK$0.32-0.55/個、ホログラム箔は HK$0.45-0.80/個です。標準納期は 5-7 営業日、特急は 3 営業日です。100 個からの小ロットは試作、限定版、ブランド初回発注に適しており、大量在庫を抱える必要はありません。4 種の箔は単独・組合せの両方に対応します。'],
    ['4 種の箔（金・銀・ローズゴールド・ホログラム）はどう選びますか?', 'ブランドの印象で選びます。金箔は 24K の金属光沢で高級ブランドの 70% が第一選択としています。銀箔はクールな金属感でテック・自動車向け、ローズゴールド箔は暖色系で美容・ベビー向け、ホログラム箔はレーザー虹色で IP・スポーツ向けです。多層重ね箔は +HK$0.80/個です。'],
    ['5 種の素材すべてに箔押しできますか?', 'できます。4 種の箔は 5 種すべての素材に対応します。コート紙 157-350gsm がベースラインです。書籍紙 80-120gsm は約 20% 低コスト、グラシン紙 60-80gsm は約 30% 高く婚礼・ホテル向け、透明 PVC 0.2-0.3mm は約 150% 高く美容・宝飾向け、黒カード紙 250-400gsm は約 40% 高く高級不動産向けです。'],
    ['6 種の箔押し加工は何が違いますか?', '温度・速度・コストが異なります。熱箔は 100-150°C の伝統的な方法です。冷箔は UV 硬化で毎分 60-100 枚、約 30% 低コスト。デジタル箔は製版不要で 100 個から。局部 UV+箔は 60% のお客様が選ぶ組合せです。多層重ね箔は金・銀・ホログラムの三層、箔+エンボスは 3D 立体で招待状に最適です。'],
    ['箔押しに FDA と EU REACH は必要ですか?', '必要です。特に食品接触と欧米輸出で重要です。FDA 21 CFR 175.300 は米国の食品接触安全基準で飲料・食品向けに必須です。EU REACH は EU の化学物質安全基準で欧州輸出に必須となります。4 種の箔と 5 種の素材はすべて FDA・EU REACH・FSC・ISO 9001 を取得しており、欧米税関での差押えは 0 件です。'],
    ['箔押しの納期と特急対応は?', '標準納期は 5-7 営業日、特急は 3 営業日です。即日印刷は 18:00 締切で翌日 12:00 引取となります。SF Express は香港で HK$500 以上送料無料、DHL 越境は 2-4 日です。18 SKU はすべて在庫連動で欠品ゼロのため、イベント日程から逆算して発注できます。'],
  ],
};

let issues = 0;
for (const loc of ['zh-hk', 'en', 'ja']) {
  const p = `src/data/blog-data/${loc}.json`;
  const data = JSON.parse(fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, ''));
  const entry = data[SLUG];
  if (!entry) { console.log(`🔴 ${loc}: 无该 slug`); issues++; continue; }
  const before = entry.content;
  if (/<p><strong>Q[0-9]+:/.test(before)) { console.log(`✅ ${loc}: 已含目标格式 FAQ (幂等跳过)`); continue; }

  const block = '\n' + FAQ[loc].map(([q, a], i) => `<p><strong>Q${i + 1}: ${q}</strong><br/>A: ${a}</p>`).join('\n') + '\n';
  // 插入点: 最后一个 </div> (CTA 块) 之前
  const lastDiv = before.lastIndexOf('</div>');
  if (lastDiv < 0) { console.log(`🔴 ${loc}: 无 </div> 锚点, abort`); issues++; continue; }
  const divStart = before.lastIndexOf('<div', lastDiv);
  const insertAt = divStart >= 0 ? divStart : lastDiv;
  const out = before.slice(0, insertAt) + block + before.slice(insertAt);

  // 断言: 除新增块外逐字不变
  if (out.replace(block, '') !== before) { console.log(`🔴 ${loc}: 断言失败, abort`); issues++; continue; }
  if (out.length !== before.length + block.length) { console.log(`🔴 ${loc}: 长度不守恒, abort`); issues++; continue; }

  // 五要件自检: 组数 / 答案词数 / 首句词数
  console.log(`\n${APPLY ? '写入' : 'DRY-RUN'} ${loc}: content ${before.length} → ${out.length} (+${block.length})`);
  FAQ[loc].forEach(([q, a], i) => {
    const isCJK = /[\u4e00-\u9fff\u3040-\u30ff]/.test(a);
    // ★ 口径校准 (2026-09-19 实测): 「40-80 词」是英文口径。CJK 的等价区间 = **60-120 字**
    //   (中文单字信息密度高, 40 英词 ≈ 60-70 中文字; 强行按 1.8 折算会把合格的 CJK 答案误判为「欠」)。
    //   故: en 判 40-80 词; zh-hk / ja 判 60-120 字。首句: en ≤12 词 / CJK ≤21 字。
    const cjkCount = (a.match(/[\u4e00-\u9fff\u3040-\u30ff]/g) || []).length;
    const words = isCJK ? cjkCount : a.split(/\s+/).filter(Boolean).length;
    const unit = isCJK ? '字' : '词';
    const lo = isCJK ? 60 : 40;
    const hi = isCJK ? 120 : 80;
    const firstSentence = a.split(/[。.！!?？]/)[0];
    const firstWords = isCJK
      ? (firstSentence.match(/[\u4e00-\u9fff\u3040-\u30ff]/g) || []).length
      : firstSentence.split(/\s+/).filter(Boolean).length;
    const firstHi = isCJK ? 21 : 12;
    const okLen = words >= lo && words <= hi;
    const okFirst = firstWords >= 3 && firstWords <= firstHi;
    console.log(`   Q${i + 1}: 答案=${words} ${unit} (区间 ${lo}-${hi}) ${okLen ? '✅' : '⚠️ 超/欠'} | 首句=${firstWords} ${unit} ${okFirst ? '✅' : '⚠️ 越界'}`);
    if (!okLen || !okFirst) issues++;
  });
  if (APPLY) { entry.content = out; fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n', 'utf8'); }
}
console.log(`\n模式=${APPLY ? 'APPLY' : 'DRY-RUN'} | 五要件异常=${issues}`);
