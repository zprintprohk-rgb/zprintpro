// 按品类展示工艺 (2/2): flyer 家族 en+ja 通用 FAQ 定制 (2026-09-23, 用户拍板「改为按品类展示工艺」)
// zh-hk 已由 _faq-flyer-fix.cjs 处理。本脚本只处理 en(7) + ja(8) FAQ, slug 级定向, 非 flyer 一律不动。
const fs = require('fs');
const crypto = require('crypto');
const FILE = 'F:/zprintpro-nextjs/src/data/products-content.ts';
const FLYERS = ['a4-flyers','a5-flyers','double-sided-flyers','folded-leaflets','thick-paper-flyers','eco-flyers','same-day-flyers','school-flyers'];

const EN_NEW_BODY = '<p>Materials include coated paper, matte paper, uncoated paper, kraft paper, and more. Finishes: 4-color CMYK or digital printing, folding (half-fold / tri-fold), spot UV, and standard die-cutting.</p></details>';
const JA_NEW_BODY = '<p>素材はアート紙、マット紙、上質紙、クラフト紙など。チラシの加工は4色オフセット・デジタル印刷、二つ折り／三つ折り、スポット UV、標準型抜き裁断等多種対応、無料サンプル。</p></details>';

const t = fs.readFileSync(FILE, 'utf8');
const lines = t.split(/\r?\n/);
let cur = '?';
let enChanged = 0, jaChanged = 0, enHit = 0, jaHit = 0;
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^  '([a-z0-9-]+)': \{/);
  if (m) cur = m[1];
  if (!FLYERS.includes(cur)) continue;
  const s = lines[i];
  if (s.includes('What materials and finishes do')) {
    enHit++;
    // 保留 <details class="..."> 前缀, 重建 body
    const mm = s.match(/^(<details class="[^"]*"><summary><strong>What materials and finishes do you offer\?<\/strong><\/summary>)/);
    if (!mm) { console.log(`⚠️ L${i + 1} ${cur}: en FAQ 前缀不匹配, 未替换`); continue; }
    lines[i] = mm[1] + EN_NEW_BODY;
    enChanged++;
  }
  if (s.includes('対応素材と加工は')) {
    jaHit++;
    const mm = s.match(/^(<details class="[^"]*"><summary><strong>対応素材と加工は？<\/strong><\/summary>)/);
    if (!mm) { console.log(`⚠️ L${i + 1} ${cur}: ja FAQ 前缀不匹配, 未替换`); continue; }
    lines[i] = mm[1] + JA_NEW_BODY;
    jaChanged++;
  }
}
console.log(`en FAQ 命中(应7): ${enHit} | 已替换: ${enChanged}`);
console.log(`ja FAQ 命中(应8): ${jaHit} | 已替换: ${jaChanged}`);
if (enHit !== 7 || enChanged !== 7 || jaHit !== 8 || jaChanged !== 8) {
  console.log('❌ 计数不符, 中止写回'); process.exit(1);
}
fs.writeFileSync(FILE, lines.join('\r\n'), 'utf8');
console.log('✅ 已写回 products-content.ts (en ' + enChanged + ' + ja ' + jaChanged + ')');
