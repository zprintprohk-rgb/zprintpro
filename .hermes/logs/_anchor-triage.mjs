// .hermes/logs/_anchor-triage.mjs — 模糊項三分類（K3 2026-09-20 4.2 節）
//
// K3 指定：對 94 條模糊項輸出三類 ——
//   ① 真漂移        句為 MOQ 宣稱且與真值不符 → 轉修正
//   ② 已核准分層    句為企業套組/大批量門檻（如賀卡 50/100）→ 標記 APPROVED
//   ③ 共享模板      跨品類句，無單一真值 → 轉人工白名單
// 目標：模糊率 <10% 才接門童 #25（現 94/244 ≈ 39%）
//
// ⚠️ 依 §0.23.2：啟發式分類**必須抽樣驗證**，不可直接採信（本專案已四度因分類器誤判踩坑）。
import fs from 'node:fs';

const j = JSON.parse(fs.readFileSync('.hermes/logs/moq-anchor-scan-latest.json', 'utf8'));
const amb = j.findings.filter((f) => f.ambiguous);

/** 已核准分層：企業套組／大批量的語境訊號 */
const BULK_SIGNAL = /(企業|法人|批量|大宗|corporate|bulk|wholesale|卸売|大口|商業|公司|集團|品牌套組|派發|DTC|D2C)/i;
/** 行業事實：談行業普遍門檻 */
const FACT_SIGNAL = /(一般|傳統|普遍|市面|業界|通常|慣例|行業|市場|同業|一般的|多く)/i;
/** 共享模板：跨品類並列（一行提 ≥2 品類） */
const MULTI_CAT = /(貼紙|ステッカー|sticker|紙袋|クラフト|bag|包裝|パッケージ|box|海報|ポスター|poster|月曆|カレンダー|餐牌|メニュー|menu|信封|封筒|利是封|傳單|チラシ|flyer|繪本|絵本)/gi;

const buckets = { real_drift: [], approved_tier: [], shared_template: [], unclear: [] };

for (const f of amb) {
  const cats = new Set((f.text.match(MULTI_CAT) || []).map((s) => s.toLowerCase()));
  let cls;
  if (cats.size >= 2) cls = 'shared_template';
  else if (BULK_SIGNAL.test(f.text)) cls = 'approved_tier';
  else if (FACT_SIGNAL.test(f.text)) cls = 'shared_template'; // 行業事實 → 亦不可單值對帳
  else cls = 'real_drift';
  buckets[cls].push(f);
}

const total = amb.length;
console.log(`=== anchor 模糊項三分類（共 ${total} 條）===\n`);
for (const [k, v] of Object.entries(buckets)) {
  const pct = ((v.length / total) * 100).toFixed(0);
  console.log(`${k.padEnd(17)} ${String(v.length).padStart(3)} 條 (${pct}%)`);
}
console.log('');

// 每類抽 3 條供驗證（§0.23.2：先 dump 真實樣本）
for (const [k, v] of Object.entries(buckets)) {
  if (!v.length) continue;
  console.log(`── ${k} 抽樣 ──`);
  for (const f of v.slice(0, 3)) {
    console.log(`  [${f.slug}] ${f.file.split('/').pop()}:${f.line} found=${f.found}/truth=${f.truth} anchor=「${f.anchor}」`);
    console.log(`     ${f.text.replace(/\s+/g, ' ').slice(0, 130)}`);
  }
  console.log('');
}

const payload = {
  generatedAt: new Date().toISOString().slice(0, 19),
  totalAmbiguous: total,
  totalFindings: j.total,
  ambiguityRate: +(total / j.total).toFixed(3),
  buckets: Object.fromEntries(Object.entries(buckets).map(([k, v]) => [k, v.length])),
  realDrift: buckets.real_drift,
  details: Object.fromEntries(Object.entries(buckets).map(([k, v]) => [k, v.map((f) => `${f.slug}|${f.file.split('/').pop()}:${f.line}|${f.found}`)])),
};
fs.writeFileSync('.hermes/logs/moq-anchor-triage.json', JSON.stringify(payload, null, 2) + '\n', 'utf8');
console.log(`明細: .hermes/logs/moq-anchor-triage.json`);
console.log(`模糊率 ${(total / j.total * 100).toFixed(0)}%（目標 <10% 才接門童 #25）`);
