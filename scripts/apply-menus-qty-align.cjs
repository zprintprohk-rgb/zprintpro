// menus 数据层「起订量数字声称」对齐 (P0, 2026-09-20 第 2 批)
// 依据:
//   真值 SSoT = src/data/products.ts 的 minQuantity / unitLabel
//     pvc-menus=10張 · laminated-menus=10份 · hardcover-menus=10本 · drink-menus=10份
//     disposable-menus=100份 (已正确, 不动) · wedding-menu-cards=50 (无 unitLabel, 本批不动)
//   标题为 2026-09-20 第 1 批 (a2f636e6) 已上线口径; 本批把 description / body / en-h1 的
//   50本/100張/100-MOQ/50冊 等**数字声称**对齐到 10, 消除「标题说 10、正文说 100」客户可见矛盾。
// 手法: 结构定位 (配平花括号) 找到 seo.<locale>.body / .description / .h1 → 取旧值 → 全文断言旧值恰好 1 次
//       → 块内替换 → 拼接回 src。dry-run 默认, --apply 才写盘。
// ⚠️ 本脚本**只改数字声称**, 不改语义/材质/价格 (那些另有矛盾, 见 commit message「未做」段)
const fs = require('node:fs');
const FILE = 'src/data/sku-seo-data.ts';
let src = fs.readFileSync(FILE, 'utf8');
const applied = [];
const failed = [];

// ── 结构定位工具 ───────────────────────────────────────────────
function balanced(src, openIdx) {
  let depth = 0, inStr = false, esc = false, quote = '';
  for (let i = openIdx; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (esc) { esc = false; continue; }
      if (c === '\\') { esc = true; continue; }
      if (c === quote) inStr = false;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { inStr = true; quote = c; continue; }
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) return i; }
  }
  return -1;
}

// 在 scope 内按 "key": { ... } 找到嵌套块范围
function blockRange(s, key, from = 0) {
  const k = `"${key}": {`;
  const i = s.indexOf(k, from);
  if (i < 0) return null;
  const e = balanced(s, i + k.length - 1);
  if (e < 0) return null;
  return { start: i, bodyStart: i + k.length, end: e };
}

// 取 scope 内 "key": "value" 的 value 与其绝对区间
// ⚠️ value 内的 \n 在 TS 源码里是**转义序列** (反斜杠+n 两字符); 本函数**原样保留**转义写法,
//    因为回写时也是原样写回 (避免「解转义→再转义」把 \\n 二次转义成字面换行)
function stringRange(s, key, from = 0) {
  const k = `"${key}": "`;
  const i = s.indexOf(k, from);
  if (i < 0) return null;
  let j = i + k.length, out = '', esc = false;
  for (; j < s.length; j++) {
    const c = s[j];
    if (esc) { out += '\\' + c; esc = false; continue; }
    if (c === '\\') { esc = true; continue; }
    if (c === '"') break;
    out += c;
  }
  return { value: out, start: i + k.length, end: j };
}

// 在第 depth 层 seo 下取 locale 字段; path 形式: ['seo', locale, field] 或 [field]
function getField(slugKey, locale, field, rootLevel) {
  const slug = blockRange(src, slugKey);
  if (!slug) return null;
  const seo = blockRange(src, 'seo', slug.bodyStart);
  if (!seo) return null;
  const loc = blockRange(src, locale, seo.bodyStart);
  if (!loc) return null;
  const f = stringRange(src, field, loc.bodyStart);
  if (!f || f.end > loc.end) return null;
  return f;
}

// 替换某字段值 (全文断言旧值恰好 1 次)
function replaceField(slugKey, locale, field, fn) {
  const f = getField(slugKey, locale, field);
  if (!f) { failed.push(`${slugKey}/${locale}/${field}: 未定位字段`); return; }
  const hits = src.split(f.value).length - 1;
  if (hits !== 1) { failed.push(`${slugKey}/${locale}/${field}: 旧值全文命中 ${hits} 次 (需 1)`); return; }
  const nv = fn(f.value);
  if (nv === f.value) { failed.push(`${slugKey}/${locale}/${field}: 替换后无变化`); return; }
  src = src.slice(0, f.start) + nv + src.slice(f.end);
  applied.push(`${slugKey}/${locale}/${field}`);
}

// ── 替换规则 (逐条对应一笔实测数字声称) ─────────────────────────
const R = {
  'pvc-menus': {
    'zh-hk': { description: [['PVC 餐牌印刷 50 本起。', 'PVC 餐牌印刷 10 張起印。']], body: [['起訂量為 100 張', '起訂量為 10 張']] },
    'en': { description: [['100-MOQ', '10-MOQ'], ['| 100 MOQ', '| 10 MOQ']], body: [['minimum order of 100.', 'minimum order of 10.']], h1: [['PVC Menus 100+', 'PVC Menus 10+']] },
    'ja': { description: [['50冊〜', '10枚〜']], body: [['（最小注文100枚から）', '（最小注文10枚から）'], ['ZprintProのほとんどの商品は50〜100枚からの最小注文です。即日少量の急ぎは10枚から対応。', '最小注文は10枚から。急ぎの少量は10枚から対応。']] },
  },
  'laminated-menus': {
    'zh-hk': { description: [['過膠餐牌/餐牌印刷 50 本起。', '過膠餐牌印刷 10 份起印。']], body: [['起訂量為 100 張', '起訂量為 10 份']] },
    'en': { description: [['100-MOQ', '10-MOQ'], ['| 100 MOQ', '| 10 MOQ']], body: [['minimum order of 100.', 'minimum order of 10.']], h1: [['Laminated Menus 100+', 'Laminated Menus 10+']] },
    'ja': { description: [['50冊〜', '10枚〜']], body: [['最小注文は100枚からです。', '最小注文は10枚からです。']] },
  },
  'hardcover-menus': {
    'zh-hk': { description: [['精裝餐牌/精裝餐牌 50 本起。', '精裝餐牌印刷 10 本起印。']], body: [['起訂量為 100 本', '起訂量為 10 本']] },
    'en': { description: [['100-MOQ', '10-MOQ'], ['| 100 MOQ', '| 10 MOQ']], body: [['minimum order of 100.', 'minimum order of 10.']], h1: [['Hardcover Menus 100+', 'Hardcover Menus 10+']] },
    'ja': { description: [['50冊〜', '10冊〜']], body: [['最小注文は100冊から。', '最小注文は10冊から。'], ['ZprintProのほとんどの商品は10冊からの最小注文です。即日少量の急ぎは10部から対応。', '最小注文は10冊から。急ぎの少量は10冊から対応。']] },
  },
  'drink-menus': {
    'zh-hk': { description: [['酒水牌/酒水牌 50 本起。', '酒水牌印刷 10 份起印。']], body: [['起訂量為 100 張', '起訂量為 10 份']] },
    'en': { description: [['100-MOQ', '10-MOQ'], ['| 100 MOQ', '| 10 MOQ']], body: [['minimum order of 100.', 'minimum order of 10.']], h1: [['Drink Menus 100+ | Laminated Durable', 'Drink Menus 10+']] },
    'ja': { description: [['50冊〜', '10枚〜']] },
  },
  // disposable-menus: 真值 100 份 → 只修模板错值「50 本起」, 其余 100 全部保留 (已正确)
  'disposable-menus': {
    'zh-hk': { description: [['一次性餐牌/餐牌印刷 50 本起。', '一次性餐牌印刷 100 份起印。']], body: [['起訂量為 100 張', '起訂量為 100 份']] },
    'ja': { description: [['50冊〜', '100枚〜']] },
  },
};

for (const [slug, locs] of Object.entries(R)) {
  for (const [locale, fields] of Object.entries(locs)) {
    for (const [field, pairs] of Object.entries(fields)) {
      for (const [from, to] of pairs) {
        const before = applied.length;
        replaceField(slug, locale, field, (v) => {
          const hits = v.split(from).length - 1;
          if (hits !== 1) { failed.push(`${slug}/${locale}/${field}: 子串「${from}」在字段值内命中 ${hits} 次 (需 1)`); return v; }
          return v.split(from).join(to);
        });
        if (applied.length > before) console.log(`✅ ${slug}/${locale}/${field}  「${from}」→「${to}」`);
      }
    }
  }
}

if (failed.length) {
  console.log('\n🔴 未落盘:');
  for (const f of failed) console.log('  ' + f);
}
if (process.argv.includes('--apply') && failed.length === 0) {
  fs.writeFileSync(FILE, src, 'utf8');
  console.log(`\n💾 已写入 ${FILE} (${applied.length} 处字段替换)`);
} else {
  console.log(`\n(dry-run) 将落盘 ${applied.length} 处; 加 --apply 执行`);
}
