#!/usr/bin/env node
/**
 * E3 數據來源行批量應用器 (K3 2026-09-21 指令)
 *
 * SSoT: AGENTS.md §0.23 數據誠信紅線 — 報告必含「數據來源: <表名/查詢/事件>」行。
 * 門童 #14 段5 雙條件: 數字 ≥10 + 檢出 數據來源|資料來源|Sources:|出典 標記。
 *
 * ⚠️ 每條來源行只寫該篇正文實際聲稱過的數據源（§0.22 SOP-10 問3 — 零發明）：
 *   來源句全部逐篇從正文抽核（2026-09-21 02:4x 實錄），如 foil=12,800 單 H1 實測、
 *   sticker=4,820 單 + QUV 1000h、cost-baseline=訂單系統 99 SKU 牌價、
 *   packaging/poster=8,000+ 訂單實測、school=產品頁價格口徑、campus=牌價+認證體系。
 *
 * 機制: 同 E2（SOP-5 生成器 + 冪等標記 + 備份 + 欄位只准不丟失斷言）。
 * 用法: node scripts/apply-data-source-lines.cjs          (dry-run)
 *       node scripts/apply-data-source-lines.cjs --apply  (寫入)
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LOCS = ['zh-hk', 'en', 'ja'];
const APPLY = process.argv.includes('--apply');
const MARK = 'data-src-line="2026-09-21"';
const TODAY = '2026-09-21';

// slug → 三語來源行（句子內容 = 該篇正文既有聲稱, 見文件頭抽核記錄）
const LINES = {
  'foil-stamping-3-applications-2026': {
    'zh-hk': '數據來源：智印港 2026 H1（1-6 月）燙金訂單 12,800 單實測統計；12 大行業訂單佔比。',
    'en': 'Sources: ZprintPro 2026 H1 (Jan–Jun) foil-stamping order data — 12,800 orders measured; order share across 12 industries.',
    'ja': '出典：ジープリント 2026年上半期（1-6月）箔押し注文データ（12,800件実測）、12業界の注文占比。',
  },
  'hong-kong-printing-cost-baseline-2026': {
    'zh-hk': '數據來源：智印港訂單系統實際報價（16 品類 99 個在售 SKU 牌價與 MOQ，2026-09 截取）；FSC 環保溢價為廠房實測。',
    'en': 'Sources: ZprintPro order system live quotes (16 categories, 99 active SKUs, prices & MOQ as of 2026-09); FSC eco premium measured in-house.',
    'ja': '出典：ジープリント受注システムの実際の見積（16品類99 SKUの価格とMOQ、2026-09時点）；FSC環境割増は社内実測。',
  },
  'packaging-box-pricing-2026': {
    'zh-hk': '數據來源：智印港 2025-2026 年 8,000+ 訂單包裝盒實測統計；價格 per 產品頁 2026-09 牌價口徑。',
    'en': 'Sources: ZprintPro packaging box order data 2025-2026 (8,000+ orders, measured); prices per product-page list (2026-09).',
    'ja': '出典：ジープリント 2025-2026年の包装箱注文データ（8,000+件実測）；価格は製品ページの価格表（2026-09）準拠。',
  },
  'poster-printing-guide': {
    'zh-hk': '數據來源：智印港 2025-2026 年 8,000+ 訂單海報印刷實測統計；退稿原因分布為業界統計。',
    'en': 'Sources: ZprintPro poster printing order data 2025-2026 (8,000+ orders, measured); rejection-reason distribution per industry statistics.',
    'ja': '出典：ジープリント 2025-2026年のポスター印刷注文データ（8,000+件実測）；再校原因の分布は業界統計。',
  },
  'print-specifications-reference-guide-2026': {
    'zh-hk': '數據來源：智印港 15 年工程師團隊 1,000+ 客戶服務實測；價格 per 產品頁 2026-09 牌價口徑。',
    'en': 'Sources: ZprintPro engineering team field data across 1,000+ clients (15-year team); prices per product-page list (2026-09).',
    'ja': '出典：ジープリント技術チームの1,000+クライアント実測（15年経験チーム）；価格は製品ページの価格表（2026-09）準拠。',
  },
  'school-exercise-book-printing-guide': {
    'zh-hk': '數據來源：智印港練習簿產品頁 2026-09 價格與規格口徑；認證 per 廠房 ISO 9001 + FSC 體系。',
    'en': 'Sources: ZprintPro exercise-book product page, prices & specs as of 2026-09; certifications per factory ISO 9001 + FSC system.',
    'ja': '出典：ジープリント練習帳製品ページの価格・仕様（2026-09時点）；認証は工場のISO 9001 + FSC体制。',
  },
  'sticker-material-pvc-vinyl-removable': {
    'zh-hk': '數據來源：智印港 2025-2026 年 4,820 單防水貼紙訂單實測；QUV 1000 小時加速老化測試（2026 實測）。',
    'en': 'Sources: ZprintPro waterproof sticker order data 2025-2026 (4,820 orders, measured); QUV 1,000-hour accelerated ageing test (2026).',
    'ja': '出典：ジープリント防水ステッカー注文データ 2025-2026（4,820件実測）；QUV 1,000時間加速劣化試験（2026年実測）。',
  },
  'campus-education-printing-pillar-guide': {
    'zh-hk': '數據來源：價格與起印量 per 智印港產品頁 2026-09 牌價口徑；認證清單 per 廠房 ISO 9001 / FDA / EU REACH 體系。',
    'en': 'Sources: prices & MOQ per ZprintPro product-page list (2026-09); certification list per factory ISO 9001 / FDA / EU REACH system.',
    'ja': '出典：価格・最低発注数は製品ページの価格表（2026-09）準拠；認証一覧は工場のISO 9001 / FDA / EU REACH体制。',
  },
};
const SLUGS = Object.keys(LINES);

let pass = 0, skip = 0, fail = 0;
for (const loc of LOCS) {
  const fp = path.join(ROOT, 'src/data/blog-data', `${loc}.json`);
  const raw = fs.readFileSync(fp, 'utf8');
  const data = JSON.parse(raw);
  const applied = [];
  const preFields = {};

  console.log(`\n== ${loc} ==`);
  for (const slug of SLUGS) {
    const entry = data[slug];
    if (!entry || typeof entry.content !== 'string') {
      console.log(`  🔴 ${slug}: 不存在或無 content`);
      fail++;
      continue;
    }
    if (entry.content.includes(MARK)) {
      console.log(`  ⏭  ${slug}: 已含冪等標記, 跳過`);
      skip++;
      continue;
    }
    const line = LINES[slug][loc];
    if (!line) {
      console.log(`  🔴 ${slug}: 缺 ${loc} 來源行`);
      fail++;
      continue;
    }
    // 來源行含門童可檢標記（三語各一）: 數據來源 / Sources: / 出典
    if (!/數據來源|数据来源|資料來源|Sources?:|出處|出典/.test(line)) {
      console.log(`  🔴 ${slug}: 來源行無門童可檢標記`);
      fail++;
      continue;
    }
    const block = `\n<p ${MARK} class="text-sm text-gray-500 mt-6">📊 ${line}</p>\n`;
    entry.content = entry.content.replace(/\s*$/, '') + block;
    preFields[slug] = { title: !!entry.title, description: !!entry.description, date: !!entry.date };
    if (entry.lastUpdated !== TODAY) entry.lastUpdated = TODAY;
    applied.push(slug);
    console.log(`  ✅ ${slug}: 文末追加來源行 (${line.length} 字)`);
    pass++;
  }

  if (APPLY && applied.length > 0) {
    const backup = path.join(ROOT, `.hermes/_bak-src-line-${loc}-20260921.json`);
    fs.writeFileSync(backup, raw);
    fs.writeFileSync(fp, JSON.stringify(data, null, 2) + '\n');
    const check = JSON.parse(fs.readFileSync(fp, 'utf8'));
    let ok = true;
    for (const slug of applied) {
      const e = check[slug];
      const c = e?.content || '';
      const has = /數據來源|数据来源|資料來源|Sources?:|出處|出典/i.test(c);
      const pre = preFields[slug] || {};
      const fieldsOk = e && (!pre.title || e.title) && (!pre.description || e.description) && (!pre.date || e.date);
      if (!has || !fieldsOk) {
        console.log(`  🔴 寫後複驗 ${slug}: has=${has} fieldsOk=${fieldsOk}`);
        ok = false;
      }
    }
    console.log(ok ? `  ✅ 已寫入 ${applied.length} 條 (備份: ${path.relative(ROOT, backup)})` : `  🔴 寫後複驗有失敗`);
    if (!ok) fail++;
  }
}

console.log(`\n${APPLY ? 'APPLY' : 'DRY-RUN'} 完成: ✅ ${pass} / ⏭ ${skip} / 🔴 ${fail}`);
if (!APPLY) console.log('確認無誤後加 --apply 寫入');
process.exit(fail > 0 ? 1 : 0);
