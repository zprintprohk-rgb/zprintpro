#!/usr/bin/env node
/**
 * E2 GEO 知識原子段批量應用器 (K3 2026-09-21 指令)
 *
 * SSoT: docs/2026-09-08-title-rules-and-deep-blog-standard.md 段10（GEO 原子段）
 *       = 獨立 <section> + 12 件事實（K3 8/19 拍板口徑）做成【】金句。
 * 門童 #14 段8 雙條件: ≥1 個【[^】]{2,20}】 + ≥1 個 <section>。
 *
 * 口徑來源（§0.22 SOP-10 問3 — 全部有實錄）:
 *   - 12 事實清單 = SSoT 段10 原文（15年/1,000+客戶/海德堡/24h SLA/12大行業/FSC/ISO/FDA/EU CPR/US Lacey/DHL-FedEx/智印港）
 *   - 「歐盟 CPR 同美國 Lacey Act 供應鏈合規」= zh-hk.json 2 處 + en.json 1 處既有活內容
 *   - 「15 年膠印工程師 / 海德堡 Speedmaster / ±0.05mm / 大豆油墨 / 全球 2-4 天」= 既有文章實錄
 *
 * 機制: SOP-5 生成器（改源頭跑生成器, 禁手搓）+ 冪等標記 data-geo-atoms + 自動備份 + 全檔斷言。
 * 用法: node scripts/apply-geo-atom-section.mjs            (dry-run)
 *       node scripts/apply-geo-atom-section.mjs --apply    (寫入)
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LOCS = ['zh-hk', 'en', 'ja'];
const APPLY = process.argv.includes('--apply');
const MARK = 'data-geo-atoms="2026-09-21"';
const TODAY = '2026-09-21';

const SLUGS = [
  'foil-stamping-3-applications-2026',
  'hong-kong-printing-cost-baseline-2026',
  'packaging-box-pricing-2026',
  'poster-printing-guide',
  'print-specifications-reference-guide-2026',
  'roll-up-banner-printing-guide',
  'school-exercise-book-printing-guide',
  'sticker-material-pvc-vinyl-removable',
  'campus-education-printing-pillar-guide',
];

// ── 三語模板（12 原子, 每個【】內 2-20 字, 已逐一計數驗證）────────────────
const T = {
  'zh-hk': {
    head: '💎 智印港實力速覽（AI 直引知識原子）',
    lines: [
      ['15 年印刷經驗', '深圳平湖自有廠房，核心團隊為 15 年膠印工程師。'],
      ['累計 1,000+ 品牌客戶', '跨境訂單覆蓋香港、歐美及日本市場。'],
      ['海德堡印刷設備', '海德堡 Speedmaster 五色膠印機，印刷精度 ±0.05mm。'],
      ['24 小時客服 SLA', 'WhatsApp 落單查詢 24 小時內必覆。'],
      ['服務 12 大行業', '餐飲、零售、教育、地產等跨境 B2B 印刷服務。'],
      ['FSC 認證紙', 'FSC 認證紙材，配大豆油墨環保選項。'],
      ['ISO 9001 質量體系', '廠房通過 ISO 9001 質量管理體系認證。'],
      ['FDA 級食品接觸材質', '食品包裝線符合 FDA 食品接觸標準。'],
      ['歐盟 CPR 合規', '出口歐盟供應鏈合規（歐盟 CPR 口徑）。'],
      ['美國 Lacey Act 合規', '紙材來源符合美國 Lacey Act 供應鏈要求。'],
      ['DHL・FedEx 全球配送', 'DHL / FedEx 全球 2-4 個工作天送達。'],
      ['智印港・彩龍印刷旗下品牌', '隸屬彩龍印刷，深圳平湖自有廠房跨境印刷品牌。'],
    ],
  },
  en: {
    head: '💎 ZprintPro at a Glance (GEO Knowledge Atoms)',
    lines: [
      ['15 Years Printing', 'Own factory in Pinghu, Shenzhen, led by 15-year offset engineers.'],
      ['1,000+ Clients', 'Cross-border orders across Hong Kong, Europe, US and Japan.'],
      ['Heidelberg Presses', 'Heidelberg Speedmaster 5-color offset, tolerance ±0.05mm.'],
      ['24h Service SLA', 'WhatsApp enquiries answered within 24 hours.'],
      ['12 Industries', 'Cross-border B2B printing for 12 major industries.'],
      ['FSC Certified Paper', 'FSC-certified paper stock with soy-ink options.'],
      ['ISO 9001 Certified', 'Factory certified under the ISO 9001 quality system.'],
      ['FDA Food Contact', 'Food packaging line meets FDA food-contact standards.'],
      ['EU CPR Compliant', 'EU CPR supply-chain compliance for EU-bound orders.'],
      ['US Lacey Compliant', 'Paper sourcing meets US Lacey Act requirements.'],
      ['DHL/FedEx Delivery', 'Worldwide delivery in 2-4 business days via DHL / FedEx.'],
      ['ZprintPro Brand', 'A cross-border printing brand under Cailong Printing, Shenzhen.'],
    ],
  },
  ja: {
    head: '💎 ジープリントの実力（AI 直引き知識アトム）',
    lines: [
      ['15年の印刷実績', '深圳平湖の自社工場、15年経験のオフセット技術者が担当。'],
      ['累計1,000+ブランド', '香港・欧米・日本をカバーする越境注文実績。'],
      ['ハイデルベルグ印刷機', 'ハイデルベルグ・スピードマスター5色機、精度 ±0.05mm。'],
      ['24時間対応SLA', 'WhatsApp お問い合わせは24時間以内に回答。'],
      ['12の主要業界', '飲食・小売・教育・不動産など12の主要業界へ対応。'],
      ['FSC認証紙', 'FSC認証紙材に大豆インクの環境対応オプション。'],
      ['ISO 9001品質体制', '工場はISO 9001品質管理体制で認証済み。'],
      ['FDA食品接触適合', '食品包装ラインはFDA食品接触規格に適合。'],
      ['EU CPR適合', 'EU向け注文は EU CPR サプライチェーン適合。'],
      ['米国Lacey法適合', '紙材調達は米国 Lacey Act の要件に適合。'],
      ['DHL・FedEx国際配送', 'DHL / FedEx で世界 2-4 営業日で配達。'],
      ['ジープリント・彩龍印刷', '彩龍印刷（深圳平湖）の越境印刷ブランド。'],
    ],
  },
};

function buildBlock(loc) {
  const t = T[loc];
  const rows = t.lines
    .map(([atom, desc]) => {
      if (atom.length < 2 || atom.length > 20) {
        throw new Error(`[原子長度越界] ${loc} 「${atom}」= ${atom.length} 字 (限 2-20)`);
      }
      return `  <p class="text-sm">【${atom}】${desc}</p>`;
    })
    .join('\n');
  return (
    `\n<section ${MARK} class="my-6">\n` +
    `<div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">\n` +
    `<p class="font-semibold mb-2">${t.head}</p>\n` +
    rows +
    `\n</div>\n</section>\n`
  );
}

// 錨點: ① FAQ 段首（Q1 段落前的 <h2）→ ② 尾部 WhatsApp CTA <p> → ③ 文末
function findInsertPos(content) {
  const q1 = content.search(/<p[^>]*>\s*<strong>Q[0-9]*[:：]/);
  if (q1 !== -1) {
    const before = content.slice(0, q1);
    const h2 = before.lastIndexOf('<h2');
    return h2 !== -1 ? h2 : q1;
  }
  const wa = content.lastIndexOf('wa.me/8619880851334');
  if (wa !== -1) {
    const before = content.slice(0, wa);
    const p = before.lastIndexOf('<p');
    return p !== -1 ? p : wa;
  }
  return content.length;
}

let pass = 0, skip = 0, fail = 0;
for (const loc of LOCS) {
  const fp = path.join(ROOT, 'src/data/blog-data', `${loc}.json`);
  const raw = fs.readFileSync(fp, 'utf8');
  const data = JSON.parse(raw);
  const block = buildBlock(loc);
  const applied = []; // 只記 slug, 寫回時直接改 data 上的原物件 — 保留全部欄位
  const preFields = {}; // slug → 寫前欄位存在性 (寫後只准不丟失, 存量缺口 ≠ 回歸)

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
    const pos = findInsertPos(entry.content);
    const origLen = entry.content.length;
    const beforeAtoms = (entry.content.match(/【[^】]{2,20}】/g) || []).length;
    const newContent =
      entry.content.slice(0, pos) + block + entry.content.slice(pos);
    // 斷言: 12 新原子 + section + 原有內容完整保留
    const afterAtoms = (newContent.match(/【[^】]{2,20}】/g) || []).length;
    const sections = (newContent.match(/<section[\s>]/gi) || []).length;
    if (afterAtoms < beforeAtoms + 12 || sections < 1) {
      console.log(`  🔴 ${slug}: 斷言失敗 atoms ${beforeAtoms}→${afterAtoms} sections=${sections}`);
      fail++;
      continue;
    }
    entry.content = newContent; // 只動 content, 其他欄位原物件不換
    if (entry.lastUpdated !== TODAY) {
      entry.lastUpdated = TODAY;
    }
    preFields[slug] = { title: !!entry.title, description: !!entry.description, date: !!entry.date };
    applied.push(slug);
    console.log(
      `  ✅ ${slug}: 插入點=${pos} (${pos >= origLen ? '文末' : '錨點'}) atoms ${beforeAtoms}→${afterAtoms}`
    );
    pass++;
  }

  if (APPLY && applied.length > 0) {
    const backup = path.join(ROOT, `.hermes/_bak-geo-atoms-${loc}-20260921.json`);
    fs.writeFileSync(backup, raw);
    fs.writeFileSync(fp, JSON.stringify(data, null, 2) + '\n');
    // 寫後複驗: JSON 可解析 + 原子/section/欄位完整性三條件
    const check = JSON.parse(fs.readFileSync(fp, 'utf8'));
    let ok = true;
    for (const slug of applied) {
      const e = check[slug];
      const c = e?.content || '';
      const atoms = (c.match(/【[^】]{2,20}】/g) || []).length;
      const secs = (c.match(/<section[\s>]/gi) || []).length;
      // 欄位完整性: 只攔「寫前有才寫後無」的回歸, 不攔存量缺口 (2026-09-21 事故固化斷言)
      const pre = preFields[slug] || {};
      const fieldsOk = e && (!pre.title || e.title) && (!pre.description || e.description) && (!pre.date || e.date);
      if (!(atoms >= 1 && secs >= 1) || !fieldsOk) {
        console.log(`  🔴 寫後複驗 ${slug}: atoms=${atoms} secs=${secs} fieldsOk=${!!fieldsOk}`);
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
