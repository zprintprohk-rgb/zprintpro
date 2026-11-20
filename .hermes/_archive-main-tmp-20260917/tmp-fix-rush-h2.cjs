// T1 rush-printing-hk-guide H2 问句化 + CTA 收敛修正
const fs = require('fs');

const slug = 'rush-printing-hk-guide';

// 三语言 H2 替换表 (原文 → 问句)
const H2_MAP = {
  'zh-hk': [
    ['一、3 大門派速度對比：自營工廠 / 印刷中介 / 門市快圖美', '即日印刷 3 大門派邊個最快？'],
    ['二、4 個品類真實單價：傳單 / 海報 / 貼紙 / 紙袋', '即日印刷 4 個品類幾錢？'],
    ['三、6 大旺季場景：展會 / 投標 / 活動 / 開業 / 易拉寶 / 貼紙', '邊 6 大場景最需要即日印刷？'],
    ['四、12 大行業即時印刷需求場景', '邊 12 大行業常用即日印刷？'],
    ['五、流程 5 步，順豐 / DHL 跨境配送 SLA', '即日印刷流程點行？跨境幾耐到？'],
    ['六、5 條主題集群內部連結：1 核心，4 支撐雙向連結', '即日印刷主題點互相連結？'],
    ['七、智印港 12 件事屬實：多年，客戶，進口印刷設備，急件 18:00 截單', '智印港 12 件事點樣屬實？'],
    ['八、4 條 FAQ：速度 / 價錢 / 收貨 / 文件', '即日印刷常見問題？'],
    ['九、CTA，立即詢價 (WhatsApp 30 秒報價)', '點樣立即詢價？'],
  ],
  'en': [
    ['1. Three Channels: Speed & Cost Comparison', 'Which Same-Day Printing Channel Is Fastest?'],
    ['2. Four Categories Real Pricing: Flyer / Poster / Sticker / Paper Bag', 'How Much Does Same-Day Printing Cost by Category?'],
    ['3. Six Real Use Cases: Trade Show / Tender / Event / Opening / Banner / Sticker', 'Which 6 Scenarios Need Same-Day Printing Most?'],
    ['4. Process: 5 Steps, SF Express / DHL Cross-border', 'How Does Same-Day Printing Work? How Fast Is Cross-border?'],
    ['5. Five Internal Links: Service Page, 4 Categories', 'How Does the Same-Day Printing Cluster Link Together?'],
    ['6. Four FAQs: Speed / Cost / Pickup / File', 'Same-Day Printing FAQs — What to Know?'],
    ['7. CTA, Peak Season Reminder', 'How to Get an Instant Quote?'],
  ],
  'ja': [
    ['1. 3 ルート速度比較：自社工場 / 仲介 / 店頭', '当日特急はどのルートが最速？'],
    ['2. 4 カテゴリー実勢価格：フライヤー / ポスター / ステッカー / 紙袋', '当日特急の料金はカテゴリー別にいくら？'],
    ['3. 6 大シーン実例：展示会 / 入札 / イベント / 開業 / バナー / ステッカー', 'どの 6 シーンで当日特急が最も必要？'],
    ['4. 5 ステップ流れ，SF Express / DHL 越境', '当日特急の流れは？越境は何日？'],
    ['5. 5 内部リンク：サービスページ，4 カテゴリー', '当日特急クラスターのリンク構造は？'],
    ['6. 4 FAQ：速度 / 価格 / 受取 / ファイル', '当日特急のよくある質問は？'],
    ['7. CTA，繁忙期提醒', 'どうやって即時見積もりを取得？'],
  ],
};

for (const loc of ['zh-hk', 'en', 'ja']) {
  const file = `src/data/blog-data/${loc}.json`;
  const d = JSON.parse(fs.readFileSync(file, 'utf8'));
  let c = d[slug].content;
  let count = 0;
  for (const [oldT, newT] of H2_MAP[loc]) {
    // 只替换 H2 标签内的文本 (保持 class)
    const re = new RegExp(`(<h2[^>]*>)${oldT.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(</h2>)`, 'g');
    const before = c;
    c = c.replace(re, `$1${newT}$2`);
    if (c !== before) count++;
  }
  if (count === 0) { console.log(`[${loc}] ⚠️ 0 处替换 — 检查 H2 原文`); continue; }
  d[slug].content = c;
  fs.writeFileSync(file, JSON.stringify(d, null, 2), 'utf8');
  console.log(`[${loc}] ✅ ${count} 处 H2 问句化`);
}

// 备份提示
console.log('\n注意: 已直接写入, 如需恢复用 git checkout');
