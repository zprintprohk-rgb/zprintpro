// 修补 print-specs FAQ 工具里的 3 处五要件越界 (用 Node 写, 避开 PowerShell 转义问题)
import fs from 'fs';
const p = '.hermes/_probe-pb/add-printspecs-faq.mjs';
let s = fs.readFileSync(p, 'utf8');
const before = s;
const FIXES = [
  // zh-hk Q1: 首句 2 字 → 给出完整首答; 答案补足 >=60 字
  [
    'A5 係 148 × 210 mm,A6 係 105 × 148 mm。',
    'A5 嘅尺寸係 148 × 210 mm,A6 係 105 × 148 mm,所以 A5 更大。',
  ],
  [
    '100 張起印 HK$0.50-2/張,以 CMYK 雙面 157g 銅版紙計算。呢個價位係短版最常見的入門選擇,啱晒小批量試單。',
    '100 張起印 HK$0.50-2/張,以 CMYK 雙面 157g 銅版紙計算;呢個係短版最常見嘅入門價位,啱晒小批量試單同打樣。',
  ],
  // en Q1: 首句 13 词 → ≤12
  [
    'A5 is 148 × 210 mm and A6 is 105 × 148 mm. A5 has exactly twice the area, at 1.41x edge and 1.98x area.',
    'A5 is 148 × 210 mm and A6 is 105 × 148 mm. A5 has twice the area, at 1.41x edge and 1.98x area.',
  ],
  // en Q4: 首句 13 词 → ≤12
  [
    'It depends on quantity: choose digital for 100-300 pieces and offset above 500.',
    'It depends on quantity. Choose digital for 100-300 pieces and offset above 500.',
  ],
  // en Q5: 首句 13 词 → ≤12 (若仍在)
  [
    'The standard is 300 DPI with 3mm bleed, plus a 3mm safe zone.',
    'The standard is 300 DPI and 3mm bleed. A 3mm safe zone also applies.',
  ],
];
let n = 0;
for (const [o, nn] of FIXES) {
  if (s.includes(o)) { s = s.replace(o, nn); n++; console.log('✅ 修补:', o.slice(0, 46)); }
  else console.log('ℹ️ 未匹配(可能已改):', o.slice(0, 46));
}
if (s !== before) { fs.writeFileSync(p, s, 'utf8'); console.log(`\n已写回 ${n} 处修补`); }
