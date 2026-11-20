// .hermes/_patch_pillar_all_raw.cjs
const fs = require('fs');
const p = 'src/components/CategoryPillarContent.tsx';
let t = fs.readFileSync(p, 'utf8');
const before = t;
// materialTable.subtitle
t = t.replace('<p className="text-gray-500 mb-4 text-sm md:text-base pl-5">{data.materialTable.subtitle}</p>',
  '<p className="text-gray-500 mb-4 text-sm md:text-base pl-5">{parseInlineLinks(data.materialTable.subtitle)}</p>');
// buyingGuide 段落 (L356)
t = t.replace('<p key={idx} className="leading-relaxed text-sm sm:text-base break-words">{p}</p>',
  '<p key={idx} className="leading-relaxed text-sm sm:text-base break-words">{parseInlineLinks(p)}</p>');
// 标题 lead/rest 保持原样(短标题)
console.log('changed:', t !== before);
const raw = [...t.matchAll(/\{([a-zA-Z_.]+)\}<\/p>/g)].map(m => m[1]);
console.log('remaining raw <p>:', JSON.stringify([...new Set(raw)]));
fs.writeFileSync(p, t, 'utf8');
