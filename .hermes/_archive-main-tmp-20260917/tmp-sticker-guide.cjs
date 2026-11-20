// T1 貼紙 B类修复: sticker-guide 补答案块 ×2 + CTA ×2 (三语言)
const fs = require('fs');

const QUICK_BLOCKS = {
  'zh-hk': [
    '<div class="bg-amber-50 rounded-lg p-4 my-4"><strong>貼紙印刷幾錢？</strong>PVC 防水貼紙 100 張起印，每張低至 HK$0.22；銅版紙貼紙更平。價格由材質、尺寸、數量、工藝決定（按 2026 價目）。</div>',
    '<div class="bg-amber-50 rounded-lg p-4 my-4"><strong>貼紙幾耐交貨？</strong>常規 3-5 個工作天，24 小時加急可選。落單確認設計稿後開始生產，大貨 100 張起。</div>',
  ],
  en: [
    '<div class="bg-amber-50 rounded-lg p-4 my-4"><strong>How much do stickers cost?</strong>PVC waterproof stickers from 100 units at US$0.028/piece; art-paper stickers cheaper. Price depends on material, size, quantity and finish (2026 pricing).</div>',
    '<div class="bg-amber-50 rounded-lg p-4 my-4"><strong>How long does sticker production take?</strong>Standard 3-5 business days; 24-hour rush available. Production starts after design approval; MOQ 100.</div>',
  ],
  ja: [
    '<div class="bg-amber-50 rounded-lg p-4 my-4"><strong>ステッカー印刷の料金は?</strong>PVC 防水ステッカー 100 枚から、1 枚 HK$0.22〜。アート紙ならより安価。料金は素材・サイズ・数量・加工で決定(2026 料金)。</div>',
    '<div class="bg-amber-50 rounded-lg p-4 my-4"><strong>納期はどのくらい?</strong>通常 3-5 営業日、24 時間特急も選択可。デザイン確認後に生産開始、最小 100 枚。</div>',
  ],
};

const TOP_CTA = {
  'zh-hk': '<p class="my-4"><a href="https://wa.me/8619880851334" target="_blank" class="text-[#1A56DB] underline font-semibold">立即 WhatsApp 報價（+86 198 8085 1334）</a> — 貼紙印刷 100 張起，30 秒 AI 報價。</p>',
  en: '<p class="my-4"><a href="https://wa.me/8619880851334" target="_blank" class="text-[#1A56DB] underline font-semibold">Get an instant WhatsApp quote (+86 198 8085 1334)</a> — stickers from 100 units, 30-second AI quote.</p>',
  ja: '<p class="my-4"><a href="https://wa.me/8619880851334" target="_blank" class="text-[#1A56DB] underline font-semibold">WhatsApp で今すぐ見積もり（+86 198 8085 1334）</a> — ステッカー 100 枚から、30 秒 AI 見積。</p>',
};

const BOTTOM_CTA = {
  'zh-hk': '<p class="mt-4"><a href="https://wa.me/8619880851334" target="_blank" class="text-[#1A56DB] underline font-semibold">WhatsApp 聯絡智印港</a> 獲取貼紙印刷報價（+86 198 8085 1334）</p>',
  en: '<p class="mt-4"><a href="https://wa.me/8619880851334" target="_blank" class="text-[#1A56DB] underline font-semibold">Contact ZprintPro via WhatsApp</a> for a sticker printing quote (+86 198 8085 1334)</p>',
  ja: '<p class="mt-4"><a href="https://wa.me/8619880851334" target="_blank" class="text-[#1A56DB] underline font-semibold">WhatsApp で智印港に連絡</a> ステッカー印刷の見積もり（+86 198 8085 1334）</p>',
};

let totalChanged = 0;
for (const loc of Object.keys(QUICK_BLOCKS)) {
  const file = `src/data/blog-data/${loc}.json`;
  const d = JSON.parse(fs.readFileSync(file, 'utf8'));
  const slug = 'sticker-guide';
  const p = d[slug];
  if (!p) { console.log(`[${loc}] 不存在`); continue; }
  let c = p.content;
  const before = c.length;
  // 幂等: 已含顶部 CTA 标记则跳过
  if (c.includes('立即 WhatsApp 報價') || c.includes('Get an instant WhatsApp') || c.includes('WhatsApp で今すぐ見積もり')) {
    console.log(`[${loc}] 已有顶部 CTA, 跳过 (幂等)`);
    continue;
  }
  // 1) 答案块 ×2 插在第一个 H2 前
  const firstH2 = c.indexOf('<h2');
  if (firstH2 < 0) { console.log(`[${loc}] 无 H2, 跳过`); continue; }
  const quickBlocks = QUICK_BLOCKS[loc].join('\n');
  c = c.slice(0, firstH2) + quickBlocks + '\n' + c.slice(firstH2);
  // 2) 顶部 CTA 插在首个 <p> 前 (倒金字塔首段前)
  const firstP = c.indexOf('<p');
  if (firstP >= 0) {
    c = c.slice(0, firstP) + TOP_CTA[loc] + '\n' + c.slice(firstP);
  }
  // 3) 底部 CTA 追加到末尾 (若末尾不是 CTA)
  if (!c.includes('WhatsApp 聯絡智印港</a> 獲取貼紙印刷報價') && !c.includes('Contact ZprintPro via WhatsApp</a> for a sticker') && !c.includes('WhatsApp で智印港に連絡</a> ステッカー印刷')) {
    c = c + '\n' + BOTTOM_CTA[loc];
  }
  p.content = c;
  fs.writeFileSync(file, JSON.stringify(d, null, 2), 'utf8');
  totalChanged++;
  console.log(`[${loc}] ✅ 答案块×2 + CTA×2 (+${c.length - before}B)`);
}
console.log(`\n共 ${totalChanged}/3`);
