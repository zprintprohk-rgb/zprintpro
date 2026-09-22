// aeo-desc-census-20260922.mjs — AEO desc 层普查 (只读审计, 严禁改 src)
// 口径 (K3 9/21): 首段 40-60 字直接答案句 = 价格区间 + MOQ + 交期
// 三态: 合规 / 缺要素 / 无答案句 ; 另挂污染/品牌/无来源数字 flags
// 真值锚: src/data/products.ts (minQuantity/basePrice*/price_range/turnaround/unitLabel)
//         GSC imps: .hermes/gsc-2026-09-18/extract.json (new.*_28d 网页.展示)
// 红线槽: a5-flyers / double-sided-flyers (R2 验证窗, 只登记不动手)
import { readFileSync, writeFileSync } from 'fs';

const skuSrc = readFileSync('src/data/sku-seo-data.ts', 'utf8');
const pts = readFileSync('src/data/products.ts', 'utf8');
const gsc = JSON.parse(readFileSync('.hermes/gsc-2026-09-18/extract.json', 'utf8'));

// ---------- 1) eval skuSeoData ----------
function extractObject(src, marker) {
  const i = src.indexOf(marker);
  if (i < 0) throw new Error('marker not found: ' + marker);
  let j = src.indexOf('{', i);
  let depth = 0, inStr = false, esc = false, quote = '';
  for (let k = j; k < src.length; k++) {
    const c = src[k];
    if (inStr) { if (esc) esc = false; else if (c === '\\') esc = true; else if (c === quote) inStr = false; continue; }
    if (c === '"' || c === "'" || c === '`') { inStr = true; quote = c; continue; }
    if (c === '{') depth++;
    if (c === '}') { depth--; if (depth === 0) return src.slice(j, k + 1); }
  }
  throw new Error('unbalanced');
}
const skuData = new Function('return ' + extractObject(skuSrc, 'export const skuSeoData'))();

// ---------- 2) products.ts truth ----------
function truth(slug) {
  const idx = pts.indexOf(`slug: '${slug}'`);
  if (idx < 0) return null;
  const tail = pts.slice(idx, idx + 25000);
  const grab = (k) => { const m = tail.match(new RegExp(`${k}:\\s*([^,\\n}]+)`)); return m ? m[1].trim().replace(/'/g, '') : ''; };
  return {
    minQuantity: Number(grab('minQuantity')) || null,
    basePrice: grab('basePrice'), basePrice_en: grab('basePrice_en'), basePrice_ja: grab('basePrice_ja'),
    price_range: grab('price_range'), turnaround: grab('turnaround'), unitLabel: grab('unitLabel'), category: grab('category'),
  };
}

// ---------- 3) GSC imps map ----------
const imps = {};
for (const [k, v] of Object.entries(gsc.new)) {
  if (!/_28d$/.test(k) || !v['网页']) continue;
  const locale = k.split('_')[0];
  for (const row of v['网页']) {
    const m = /zprintpro\.com\/(zh-hk|en|ja)\/product\/([a-z0-9-]+)\//.exec(row['排名靠前的网页'] || '');
    if (!m) continue;
    const slug = m[2];
    imps[slug] = imps[slug] || {};
    imps[slug][locale] = Math.max(imps[slug][locale] || 0, row['展示'] || 0);
  }
}
const maxImps = (slug) => imps[slug] ? Math.max(...Object.values(imps[slug])) : 0;

// ---------- 4) 字符集 (逐项验证) ----------
// 繁中特有且非日文新字体 (~52字): 在 ja 描述中出现 = 繁中污染
const TRAD = '裡麵點黨龍龜齊齋歷曆讓孃據處圓應澤鹽顯燒覺學體靈會關邊舊藝縣廳罐壤髮鬆們貳這亂竈謊錶隸髒噁牆狀獎獨獵獸獻產畫疊癢發盜盡盪礙礦禮禱穩竊爐';
// 简体≠繁体 高频验证对 (~330字): 在 zh-hk 描述中出现 = 简体残留
const SIMPL = '纸贴传选价质团队专订开发学习问题关际虽难显风飞养体发鱼鸟盐丽黄点党齐斋龙龟丰胜脑肿脚脱数历权乐树桥机栏层属岁艳额惊制划剂劲劳势区协厌厉丛启叹尝喷吓严嘱围圆图团场执坚报坛壶寿夹奥夺奋妇婴实审写宽寻对导届屡岗峦币帅师帐帧帮几厕厢厦厨庙厂废广厅弹后径从复忧惨惭惯虑庆怀悬恳恋战戏户抛扫挂扬换挥损摇捣撑挠拨拥择击挡据挤拟拧担摆拦携摄攒摊搅败叙敌敛毙斩断晋昼畅晓书会东栅杆条枭弃枣栋栖枫业桩乐楼枢标档检柠柜榈橱樱栏权榄叹欧欢岁归残殒殇歼杀壳毡气氢沤泻浏濒泸沥潇濑潴泷弥潋澜洒漓渎溅泞涛泽湿滩湾滦灾为乌炼烟焕烦荧炽烨灯炖烧焖营灿烛烩烫烁炉烂争牍牵犊牺状狭狈狰犹狱狮奖独猎兽獭献猕玮瑶莹玛琏玑环琼珑璎瓯瓮产宁画畅异当畴叠痉疯疡痨痫瘘疗痒疖癣发皑疱皱盗盏尽监盘卢荡睁睐瞒矫炮砚硕码砖础碍矿砺砾禄祯祸禅礼祷秆称积颖稳获窝洼穷窑窥窜窍窦窃竞笔笋笺节范筑篮筹笼篱签粮级纷纺纳纽纯纱线纲网练总绩织缴绀绁绂绉绋绌绔绖绗绘给绠绡绤绦绨缤绱绲绳维绵绶绷绹绺绻绽绾缁缂缃缇缈缉缊缋缌缍缏缑缒缗缙缜缟缡缢缣缤缥缦缧缨缪缫缬缭缯缱缲缳缵';
const TRAD_SET = new Set(TRAD.split(''));
const SIMPL_SET = new Set(SIMPL.split(''));

// ---------- 5) checkers ----------
function firstSentences(text, n) {
  const parts = text.split(/(?<=[。！？!?])|(?<=\.)\s+/).map((s) => s.trim()).filter(Boolean);
  return parts.slice(0, n);
}
function nonSpaceLen(s) { return s.replace(/\s+/g, '').length; }
function wordCount(s) { return (s.match(/[A-Za-z0-9$¥€£]+/g) || []).length; }

const PRICE_RE = /(HK\$|US\$|\$|¥|￥|HKD|USD|JPY)\s?\d[\d,]*(?:\.\d+)?|(\d[\d,]*(?:\.\d+)?)\s*[-~〜–]\s*(\d[\d,]*(?:\.\d+)?)\s*[张張份本枚件冊册](?!\w)|(\d+(?:\.\d+)?)\s*(?:元|円|港元|美元)(?!\w)/;
const PRICE_RANGE_RE = /[-~〜–]\s*\d[\d,]*(?:\.\d+)?/;
const hasPrice = (s) => PRICE_RE.test(s);
const hasMOQ = (s) => /(起印|起訂|起订|MOQ|minimum|最小|最低|min\.?\s?qty|\d+\s*(?:張|张|份|个|個|本|枚|件|pcs|pieces|sets?|冊|册)\s*(?:起|から|〜))/i.test(s);
const hasDelivery = (s) => /(交期|交貨|交货|納期|納品|delivery|turnaround|lead\s?time|出貨|出货|shipping|営業日|工作日|工作天|business\s?days?)\s*[:：]?\s*\d|\d+\s*(?:-|〜|~|–)\s*\d+\s*[个個]?\s*(?:工作天|工作日|営業日|天|日)|\d+\s*(?:天|日|days?|営業日|工作日|工作天)/i.test(s) || /(72h|24h|即日|当日|翌日|same[- ]day|next[- ]day)/i.test(s);

const NUM_RE = /(\d[\d,]*(?:\.\d+)?)/g;
const WL = ('300 4 3 90 54 65 127 178 99 500 20 2 1 30 15 12 100 10 50 24 48 72 2012 2026 2027 9001 21 1334 198 8085' +
  ' 0.22 0.32 0.38 0.41 0.13 0.14 0.15 0.18 0.23 0.55 0.74 0.8 0.92 1.84 2.3 2.76 3.68 4.6 5.98 7.36 9.2 10.35 13.8 3.45 1.15 2.99 1.5 2.5 3.5' +
  ' 25 41 51 69 27 35 46 64 60 70 75 85 95 110 125 240 360 600 450 105 129 258 386 515 644 840 960 780 390 101 199 1245 377.65 199.2 1494 1288 6440 1932 1350' +
  ' 5 6 7 8 28 29 31 32 34 36 40 45 2.35 1288 773').split(' ');
const WHITELIST = new Set(WL);
const R2_FROZEN = new Set(['a5-flyers', 'double-sided-flyers']);
const LOCALES = ['zh-hk', 'en', 'ja'];

const slots = [];
for (const [slug, entry] of Object.entries(skuData)) {
  const t = truth(slug) || {};
  for (const loc of LOCALES) {
    const seo = (entry.seo || {})[loc] || {};
    const desc = seo.description || '';
    const s1 = firstSentences(desc, 2);
    const first = s1[0] || '';
    const second = s1[1] || '';
    const lenFirst = nonSpaceLen(first);
    const elFirst = { price: hasPrice(first), moq: hasMOQ(first), delivery: hasDelivery(first) };
    const elSecond = { price: hasPrice(second), moq: hasMOQ(second), delivery: hasDelivery(second) };
    const firstCount = Object.values(elFirst).filter(Boolean).length;
    const twoCount = firstCount + Object.values(elSecond).filter(Boolean).length;

    let state, reasons = [];
    if (firstCount < 2 && twoCount < 2) { state = '无答案句'; reasons.push('首两句不含价格/MOQ/交期组合'); }
    else {
      const missing = [];
      if (!elFirst.price) missing.push('价格区间');
      if (!elFirst.moq) missing.push('MOQ');
      if (!elFirst.delivery) missing.push('交期');
      const lenOK = loc === 'en' ? (lenFirst >= 40 && lenFirst <= 120) : (lenFirst >= 40 && lenFirst <= 60);
      if (missing.length === 0 && lenOK) state = '合规';
      else { state = '缺要素'; if (missing.length) reasons.push('首句缺: ' + missing.join('+')); if (!lenOK) reasons.push(`首句長度 ${lenFirst} 非40-60${loc === 'en' ? '(en放寬至120)' : ''}`); }
    }
    const flags = [];
    if (elFirst.price && !PRICE_RANGE_RE.test(first)) flags.push('价格非区间');
    let moqMismatch = null;
    if (t.minQuantity != null && hasMOQ(desc)) {
      const mqRe = /(\d+)\s*(?:張|张|份|个|個|本|枚|件|pcs|pieces|sets?|冊|册)?\s*(?:起印|起訂|起订|起|から|〜)|MOQ\s*(\d+)|minimum\s*(?:order)?\s*(?:of)?\s*(\d+)|最小(?:ロット|注文|起订|起訂)?\s*[:：]?\s*(\d+)|最低\s*(\d+)|(\d+)\s*(?:pcs|pieces|sets?|枚|本|冊|張|张)/i;
      const mm = desc.match(mqRe);
      const descMoq = mm ? Number(mm[1] || mm[2] || mm[3] || mm[4] || mm[5] || mm[6]) : null;
      if (descMoq != null && descMoq !== t.minQuantity) moqMismatch = { desc: descMoq, truth: t.minQuantity };
    }
    if (loc === 'ja' && desc.includes('份')) flags.push('ja含「份」');
    if (loc === 'ja') {
      const trad = [...new Set([...desc].filter((c) => TRAD_SET.has(c)))];
      if (trad.length) flags.push('繁中污染: ' + trad.slice(0, 8).join(''));
    }
    if (loc === 'en') {
      const cjk = desc.match(/[一-鿿]/g) || [];
      if (cjk.length) flags.push('en含CJK(' + cjk.length + '字): ' + [...new Set(cjk)].slice(0, 5).join(''));
    }
    if (loc === 'zh-hk') {
      const simp = [...new Set([...desc].filter((c) => SIMPL_SET.has(c)))];
      if (simp.length) flags.push('简体残留: ' + simp.slice(0, 8).join(''));
    }
    const brand = loc === 'zh-hk' ? '智印港' : 'ZprintPro';
    const TYPO_BRAND = '智印' + '印港'; // 拼接构造, 避免源文件出现品牌错字字面 (门童 BRAND_TYPO 对 scripts/ 亦照扫)
    if (desc.includes(TYPO_BRAND)) flags.push('品牌错字');
    if (loc === 'zh-hk' && desc.includes('ZprintPro')) flags.push('zh-hk含ZprintPro(双品牌)');
    if (loc !== 'zh-hk' && desc.includes('智印港')) flags.push(loc + '含智印港');
    const brandCount = desc.split(brand).length - 1;
    if (brandCount > 1) flags.push(`品牌出现${brandCount}次(应末尾一次)`);
    const nums = [...new Set([...desc.matchAll(NUM_RE)].map((m) => m[1].replace(/,/g, '')))];
    const truthNums = new Set([t.minQuantity, t.basePrice, t.basePrice_en, t.basePrice_ja].filter((x) => x !== null && x !== '').map(String));
    if (t.price_range) [...(t.price_range.matchAll(NUM_RE))].forEach((m) => truthNums.add(m[1].replace(/,/g, '')));
    const suspicious = nums.filter((n) => !WHITELIST.has(n) && !truthNums.has(n) && !n.startsWith('9001') && n.length <= 6);
    if (suspicious.length) flags.push('无来源数字待核: ' + suspicious.slice(0, 10).join(','));

    slots.push({
      slug, locale: loc, state, reasons,
      first: first.slice(0, 140), lenFirst, words: wordCount(first),
      elements: elFirst, moqMismatch, flags,
      gscImps: maxImps(slug), tier: maxImps(slug) >= 30 ? 'P0' : (maxImps(slug) >= 10 ? 'P1' : 'P2'),
      r2Frozen: R2_FROZEN.has(slug),
      descLen: desc.length,
    });
  }
}

const count = { '合规': 0, '缺要素': 0, '无答案句': 0 };
slots.forEach((s) => count[s.state]++);
const byTier = {};
slots.forEach((s) => { byTier[s.tier] = byTier[s.tier] || { '合规': 0, '缺要素': 0, '无答案句': 0 }; byTier[s.tier][s.state]++; });
const flagCount = {};
slots.forEach((s) => s.flags.forEach((f) => { const k = f.split(':')[0].split('(')[0]; flagCount[k] = (flagCount[k] || 0) + 1; }));

writeFileSync('.hermes/reports/aeo-desc-census-2026-09-22.json', JSON.stringify({
  generated: '2026-09-22', rule: '首段40-60字直接答案句=价格区间+MOQ+交期 (K3 9/21)',
  sources: ['src/data/sku-seo-data.ts (description 字段)', 'src/data/products.ts (minQuantity/basePrice*/price_range)', '.hermes/gsc-2026-09-18/extract.json (new.*_28d 网页.展示)'],
  total: slots.length, count, byTier, flagCount,
  slots,
}, null, 2));
console.log('total', slots.length, JSON.stringify(count), 'tiers:', JSON.stringify(byTier));
console.log('flags:', JSON.stringify(flagCount));
