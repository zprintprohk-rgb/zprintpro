// .hermes/_patch_pdp_bold.cjs — V9 PDP 段落支持 **bold**
const fs = require('fs');
const p = 'src/app/[locale]/product/[slug]/v9/ProductPageV9.tsx';
let t = fs.readFileSync(p, 'utf8');
const before = t;

// 1) 在 renderBodyPara 之前插入 renderRich
if (!/const renderRich = /.test(t)) {
  t = t.replace(
    '  const renderBodyPara = (p: string, key: string) => {',
    `  const renderRich = (s: string, key: string) =>
    s.split(/(\\*\\*.+?\\*\\*)/g).filter(Boolean).map((seg, i) => {
      const b = /^\\*\\*(.+?)\\*\\*$/.exec(seg);
      return b
        ? <strong key={\`\${key}-b\${i}\`}>{parseInlineLinks(b[1])}</strong>
        : <span key={\`\${key}-t\${i}\`}>{parseInlineLinks(seg)}</span>;
    });

  const renderBodyPara = (p: string, key: string) => {`
  );
}

// 2) 普通段落走 renderRich
t = t.replace(
  'text-justify mb-4">{parseInlineLinks(p)}</p>',
  'text-justify mb-4">{renderRich(p, key)}</p>'
);

// 3) Q 段落答案走 renderRich
t = t.replace(
  '{a && <p className="text-[#3A4250] text-[16px] leading-[1.85] mb-3">{a}</p>}',
  '{a && <p className="text-[#3A4250] text-[16px] leading-[1.85] mb-3">{renderRich(a, key + "-a")}</p>}'
);

console.log('changed:', t !== before, '| renderRich uses:', (t.match(/renderRich/g) || []).length);
fs.writeFileSync(p, t, 'utf8');
