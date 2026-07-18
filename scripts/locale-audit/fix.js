// Locale violation scanner + rewriter v2 (segment-level locale detection)
// Usage: node scripts/locale-audit/fix.js           -> dry-run report
//        node scripts/locale-audit/fix.js --write   -> apply changes
const fs = require('fs');

const WRITE = process.argv.includes('--write');

// ---------- per-file locale key config ----------
// keys that switch locale context; 'bare' includes generic zh field names (products.ts)
const LOCALE_KEYS = {
  'src/data/products.ts': [
    [/^'zh-hk':$|^zh-hk:$/, 'zh'], [/^title_zh:$|^description_zh:$|^name:$|^nameZh:$|^title:$|^description:$|^longDescription:$/, 'zh'],
    [/^title_ja:$|^description_ja:$|^nameJa:$|^descriptionJa:$|^longDescriptionJa:$/, 'ja'],
    [/^title_en:$|^description_en:$|^nameEn:$|^descriptionEn:$|^longDescriptionEn:$/, 'en'],
    [/^ja:$/, 'ja'], [/^en:$/, 'en'], [/^zh:$/, 'zh'],
  ],
  'src/data/sku-seo-data.ts': [
    [/^"zh-hk":$/, 'zh'], [/^"ja":$/, 'ja'], [/^"en":$/, 'en'], [/^"zh":$/, 'zh'],
  ],
  'src/data/category-seo-content.ts': [
    [/^'zh-hk':$/, 'zh'], [/^ja:$/, 'ja'], [/^en:$/, 'en'], [/^zh:$/, 'zh'],
  ],
  'src/lib/seo.ts': [
    [/^'zh-hk':$/, 'zh'], [/^ja:$/, 'ja'], [/^en:$/, 'en'], [/^zh:$/, 'zh'],
  ],
  'src/lib/seo-keywords.ts': [
    [/^'zh-hk':$/, 'zh'], [/^ja:$/, 'ja'], [/^en:$/, 'en'], [/^zh:$/, 'zh'],
  ],
  'src/lib/seo-related-queries.ts': [
    [/^'zh-hk':$/, 'zh'], [/^ja:$/, 'ja'], [/^en:$/, 'en'], [/^zh:$/, 'zh'],
  ],
  'src/lib/seo/schema-extensions.ts': [
    [/^'zh-hk':$/, 'zh'], [/^ja:$/, 'ja'], [/^en:$/, 'en'], [/^zh:$/, 'zh'],
  ],
};

const KEY_RE_SRC = {
  'src/data/products.ts': /('zh-hk'|title_zh|description_zh|nameJa|nameEn|title_ja|title_en|descriptionJa|descriptionEn|longDescriptionJa|longDescriptionEn|name|title|description|longDescription|ja|en|zh)(?=:)/g,
  'default': /('zh-hk'|"zh-hk"|"ja"|"en"|"zh"|ja|en|zh)(?=:)/g,
};

function locOfKey(file, key) {
  for (const [re, loc] of LOCALE_KEYS[file] || []) {
    if (re.test(key + ':')) return loc;
  }
  return null;
}

const hasKana = s => /[ぁ-ゟァ-ヿ]/.test(s);
const hasHan = s => /[一-鿿]/.test(s);

const JA_BAD = /香港|深圳|深セン|中国|Hong Kong|Shenzhen/;
const EN_BAD = /Hong Kong|hong kong|Shenzhen|\bHK\b(?!\.)/;

// ---------- NAP / keep patterns (line-level keep: schema, currency, market lists) ----------
const KEEP_RE = new RegExp([
  'areaServed',
  'Australia, Hong Kong, Taiwan', // served-market list
  'ZprintPro HK', '深セン印刷', // schema alternateName (NAP layer)
  "city: 'Shenzhen'", 'Longgang District', // schema/registered address (NAP)
  "country: 'HK'", // schema addressCountry (NAP)
  'zh-Hant-HK', // locale code
  'geoKeywords', // ja search keyword "印刷 中国" is an allowed ja market term (AGENTS §13.10)
].join('|'));

// NAP substrings masked before rules, restored after (real registered address / legal entity)
const MASKS = [
  /広東省深圳市龍崗区平湖街道嘉城路\s?1?\s?号/g,
  /深圳市彩龙印刷包裝有限公司/g,
  /深圳市彩龍印刷包裝有限公司/g,
  /（中国[・\s]?深圳本社）/g,
  /Shenzhen Cailong Printing (&|&) Packaging Co\.,? Ltd\.?/g,
  /HK\$/g, // currency symbol
  /isZh \? '[^']*' :/g, // zh branch of ternary
  /isZh \? `[^`]*` :/g,
];
function maskNap(s) {
  const store = [];
  let out = s;
  for (const re of MASKS) out = out.replace(re, m => { store.push(m); return `\x00${store.length - 1}\x00`; });
  return { out, store };
}
function unmaskNap(s, store) {
  return s.replace(/\x00(\d+)\x00/g, (_, i) => store[+i]);
}

// ---------- replacement rules [regex, replacement, note] ----------
const JA_RULES = [
  [/香港直結の安心感/g, '自社工場直結の安心感', 'hk-direct-trust'],
  [/香港直結で/g, 'アジア自社工場直結で', 'hk-direct'],
  [/香港直結/g, 'アジア自社工場直結', 'hk-direct2'],
  [/ZprintProは香港で/g, 'ZprintProは', 'hk-where'],
  [/は香港\s?5,000\s?社以上の/g, 'は累計 5,000 社以上の', 'hk-5000'],
  [/香港発の印刷\s?SaaS/g, '越境印刷 SaaS', 'hk-saas'],
  [/香港式茶餐廳/g, '中華料理・飲茶', 'hk-cafe'],
  [/香港全土の/g, '日本全国の', 'hk-all'],
  [/香港商戶/g, '法人顧客', 'hk-merchants'],
  [/香港本地印刷/g, '自社工場印刷', 'hk-local-print'],
  [/香港本地速達/g, '国際速達', 'hk-local-express'],
  [/香港の印刷専門家/g, '印刷の専門家', 'hk-expert'],
  [/香港全域に配送していますか/g, '日本全国に配送していますか', 'hk-deliver-q'],
  [/香港全域配送/g, '日本全国配送', 'hk-deliver-title'],
  [/香港全域/g, '日本全国', 'hk-all-area'],
  [/香港島（中環、銅鑼湾）、九龍（旺角、観塘）、新界（沙田、屯門）まで顺丰または専用トラックで配送/g, '東京・大阪・名古屋など日本全国へ DHL / FedEx で配送', 'hk-geo'],
  [/香港衛生署食品安全基準に準拠/g, '日本の食品衛生基準に準拠', 'hk-health'],
  [/香港衛生署基準対応/g, '日本の食品衛生基準対応', 'hk-health2'],
  [/香港衛生署標準/g, '国際食品安全基準', 'hk-health3'],
  [/香港衛生署/g, '日本の食品衛生基準', 'hk-health4'],
  [/香港消防處標準阻燃/g, '国際阻燃基準', 'hk-fire'],
  [/香港教育局教科書規格/g, '学校教科書規格', 'hk-edu'],
  [/香港出版流通に精通/g, '出版流通に精通', 'hk-pub'],
  [/香港出版総会経由/g, '出版社経由', 'hk-pub2'],
  [/香港の小中高/g, 'アジア圏の小中高', 'hk-schools'],
  [/香港の大手予備校チェーン/g, 'アジア圏の大手予備校チェーン', 'hk-juku-chain'],
  [/香港の塾/g, 'アジア圏の塾', 'hk-juku'],
  [/香港の小學校/g, 'アジア圏の小學校', 'hk-shogakko'],
  [/香港最通用規格/g, '最通用規格', 'hk-spec'],
  [/香港\s?SF Express 直送/g, 'DHL Express 直送', 'hk-sf'],
  [/順豐香港本地派送/g, 'DHL 国際速達', 'hk-sf2'],
  [/香港名刺/g, '高級名刺', 'hk-meishi'],
  [/香港\s?箔押し/g, '箔押し', 'hk-foil'],
  [/当日配送（香港本店受取）/g, '特急仕上げ（要事前相談）', 'hk-pickup'],
  [/当日仕上げ（香港本店受取）/g, '当日仕上げ（特急対応）', 'hk-pickup2'],
  [/香港本店/g, '自社工場', 'hk-honten'],
  [/中国深圳自社工場/g, 'アジア自社工場', 'cn-sz-factory'],
  [/中国\s?深圳自社工場/g, 'アジア自社工場', 'cn-sz-factory2'],
  [/深圳自社工場/g, 'アジア自社工場', 'sz-factory'],
  [/深圳自營工廠/g, 'アジア自社工場', 'sz-factory2'],
  [/深セン工場/g, 'アジア自社工場', 'sz-factory3'],
  [/中国深圳の国際印刷ブランド/g, 'アジア発の国際印刷ブランド', 'cn-brand'],
  [/中国語併記の\s?3\s?言語/g, '日中英 3 言語', 'cn-lang'],
  [/中国語併記の多言語/g, '日中英併記の多言語', 'cn-lang2'],
  [/伝統的な中国紅包/g, '伝統的な紅包', 'cn-redpacket'],
  [/中国式\s?([LMS])/g, '伝統式 $1', 'cn-style'],
  [/紅包は中国式/g, '紅包は伝統式', 'cn-style2'],
  [/香港の食品パッケージ/g, '食品パッケージ', 'hk-food'],
  [/香港の紙袋印刷/g, '紙袋印刷', 'hk-paperbag'],
  [/香港の([^。、」』|]{2,20}?)(?=印刷|カスタマイズ|サービス)/g, '$1', 'hk-no-generic'],
  [/ 香港(?=\s?[|｜])/g, '', 'hk-bar'],
  [/印刷 香港(?=\s?[|｜])/g, '印刷', 'hk-bar2'],
  // round 2
  [/香港島（中環、銅鑼湾）、九龍（旺角、観塘）、新界（沙田、屯門）まで顺丰または専用トラックで配送します?/g, '東京・大阪・名古屋など日本全国へ DHL / FedEx で配送します', 'hk-geo2'],
  [/香港島・九龍・新界をカバー/g, '日本全国をカバー', 'hk-geo3'],
  [/香港へクロスボーダー直送/g, '日本全国へ国際速達直送', 'hk-cross'],
  [/紅包は香港・日本・台湾の/g, '紅包は日本・台湾などアジア圏の', 'hk-redpacket'],
  [/自社工場 \(深圳\)/g, '自社工場 (アジア)', 'sz-factory-card'],
  [/深圳にある自社工場/g, 'アジアにある自社工場', 'sz-factory-card2'],
  [/ - 香港印刷 ZprintPro/g, ' | ZprintPro', 'hk-print-zp'],
  [/"香港 (?=[^"]*[ァ-ヿ])/g, '"', 'hk-quote'],
  [/香港 cosmetic packaging/g, 'cosmetic packaging', 'hk-kw-cosmetic'],
  [/香港(?=\$\{shortNameJa\})/g, '', 'hk-template'],
  [/「名刺印刷 香港」、/g, '「名刺印刷」、', 'hk-kw-meishi'],
  [/香港ビジネス首选：プロの印象は名刺から/g, 'ビジネス向け：プロの印象は名刺から', 'hk-heading'],
  [/香港で「/g, '「', 'hk-de-quote'],
  [/香港では(?=[^。、，,]{0,30}印刷)/g, '', 'hk-deha'],
  [/香港で(?=[^。、，,]{0,25}印刷)/g, '', 'hk-de'],
  [/香港\s?(?=[^。、，,]{0,25}印刷)/g, '', 'hk-before-print'],
  [/ +(?=」)/g, '', 'quote-space'],
  [/深圳工場/g, 'アジア自社工場', 'sz-kojo'],
  [/深圳(?!市)/g, 'アジア', 'sz-generic'],
  // round 3
  [/ 香港(?=」)/g, '', 'hk-kw-quote'],
  [/香港島（中環、銅鑼湾）、九龍（旺角、観塘）、新界（沙田、屯門）まで配送します/g, '東京・大阪・名古屋など日本全国へ DHL / FedEx で配送します', 'hk-geo-short'],
  [/香港島・九龍の主要商業地区/g, '日本全国の主要商業地区', 'hk-install'],
  [/香港島・九龍の主要展示会場と商業地区/g, '日本全国の主要展示会場と商業地区', 'hk-install2'],
  [/香港島・九龍の主要地区/g, '日本全国の主要地区', 'hk-install3'],
  [/香港島会展周辺、九龍塘／旺角商場、将軍澳／荃湾コミュニティ/g, '展示会場周辺・大型商場・コミュニティ施設', 'hk-install4'],
  [/香港ISBN/g, '海外ISBN', 'hk-isbn'],
  [/ターゲットが香港島の金融業界や新界の住宅コミュニティの場合/g, 'ターゲットが金融業界や住宅コミュニティの場合', 'hk-cal-target'],
  [/香港の商場中庭、港鐵沿線/g, '商場中庭、駅沿線', 'hk-mall'],
  [/繁体中国語/g, '繁体中文', 'cn-lang3'],
  [/香港市場で同人グッズ/g, '日本市場で同人グッズ', 'hk-doujin'],
  [/香港スタイル食堂/g, '中華風食堂', 'hk-chachaan'],
  [/香港・越境 EC/g, '越境 EC', 'hk-ec'],
  [/香港の(?=[ァ-ヿー])/g, '', 'hk-no-kata'],
  [/香港 (?=\$\{name\})/g, '', 'hk-tpl'],
  [/九龍・香港島・新界・離島/g, '日本全国（沖縄・離島含む）', 'hk-geo-table'],
  [/SF Express across Hong Kong/g, 'DHL Express worldwide', 'hk-sf-across'],
];

const EN_RULES = [
  [/Hong Kong-rooted,\s?/g, '', 'hk-rooted'],
  [/48-hour local delivery across Hong Kong via SF Express \/ DHL/g, '2-4 business day worldwide delivery via DHL Express / FedEx', 'hk-48h'],
  [/local delivery across Hong Kong via SF Express(, and DHL Express worldwide)?/g, 'worldwide delivery via DHL Express / FedEx', 'hk-local-delivery'],
  [/Our 48-hour local delivery in Hong Kong/g, 'Our 2-4 day worldwide delivery', 'hk-48h2'],
  [/Printed in our Hong Kong facility/g, 'Printed in our Asia facility', 'hk-printed'],
  [/Hong Kong-based printing SaaS platform/g, 'global printing SaaS platform', 'hk-saas'],
  [/Hong Kong publishing workflows/g, 'Asian publishing workflows', 'hk-pub'],
  [/Hong Kong\\?'s Business Card Specialist/g, 'Your Business Card Specialist', 'hk-specialist'],
  [/HK Education Bureau/g, 'international education standards', 'hk-edu'],
  [/HK Department of Health/g, 'international food safety authorities', 'hk-doh'],
  [/Hong Kong local courier/g, 'International express courier', 'hk-courier'],
  [/Hong Kong local pickup/g, 'Factory pickup (by appointment)', 'hk-pickup'],
  [/(\d+ )Hong Kong /g, '$1', 'hk-count'],
  [/Do you deliver to all areas of Hong Kong\?/g, 'Do you deliver worldwide?', 'hk-deliver-q'],
  [/We deliver to Hong Kong Island \(Central, Causeway Bay\), Kowloon \(Mong Kok, Kwun Tong\), and New Territories \(Sha Tin, Tuen Mun\) via SF Express or dedicated truck/g, 'We deliver worldwide via DHL Express / FedEx in 2-4 business days', 'hk-geo'],
  [/ Printing Hong Kong —/g, ' Printing —', 'hk-h2'],
  [/Hong Kong Station \(HK service point[^)]*\)/g, 'our service point', 'hk-station'],
  [/Island-wide coverage: Hong Kong Island, Kowloon, New Territories\./g, 'Worldwide coverage: DHL Express / FedEx 2-4 day delivery.', 'hk-coverage'],
  [/Direct from Shenzhen factory with SF Express delivery across Hong Kong/g, 'Direct from our Asia factory with DHL Express worldwide delivery', 'sz-direct'],
  [/Modern production base in Shenzhen/g, 'Modern production base at our Asia factory', 'sz-base'],
  [/Shenzhen production facility/g, 'Asia production facility', 'sz-facility'],
  [/(\x00\d+\x00) Asia production facility/g, '$1 Our Asia production facility', 'sz-facility-fix'],
  [/Shenzhen Production Facility/g, 'Our Production Facility', 'sz-facility2'],
  [/Shenzhen factory/g, 'Asia factory', 'sz-factory'],
  [/Cross-border express to HK\./g, 'Cross-border express worldwide.', 'hk-cross'],
  [/business card printing Hong Kong/g, 'business card printing online', 'kw-bcard'],
  [/business cards 400g printing hong kong/g, 'business cards 400g printing online', 'kw-bcard2'],
  [/ printing hong kong/g, ' printing online', 'kw-generic'],
  [/services in Hong Kong/g, 'services worldwide', 'hk-services'],
  [/ in Hong Kong/g, ' worldwide', 'hk-in'],
  [/ across Hong Kong/g, ' worldwide', 'hk-across'],
  [/Hong Kong merchants/g, 'merchants worldwide', 'hk-merchants'],
  [/by 11am \(Hong Kong time\)/g, 'by 11am (GMT+8)', 'hk-time'],
  [/11am HKT/g, '11am GMT+8', 'hkt'],
  [/ZprintPro Hong Kong/g, 'ZprintPro', 'hk-zp'],
  [/(\| Professional [^|']*?) Hong Kong/g, '$1 Online', 'alt-prof'],
  [/(\| )Hong Kong /g, '$1', 'alt-pipe'],
  [/('|\`)Hong Kong /g, '$1', 'alt-quote'],
  [/ Printing Hong Kong(\s?\|)/g, ' Printing$1', 'hk-printing-bar'],
  [/ Hong Kong(?=\s?[|｜'])/g, '', 'hk-bar'],
  // round 3
  [/ printing Hong Kong(?=[",])/g, ' printing', 'kw-print'],
  [/ printing Hong Kong /g, ' printing ', 'kw-print2'],
  [/Hong Kong, cross-border e-commerce/g, 'cross-border e-commerce', 'hk-ec-en'],
  [/ Hong Kong(?=[",])/g, '', 'kw-hk'],
  [/ Hong Kong\./g, ' worldwide.', 'hk-period'],
  [/In Hong Kong, searches for/g, 'Searches for', 'hk-searches'],
  [/Hong Kong Publishing Federation/g, 'regional publishing associations', 'hk-pubfed'],
  [/Hong Kong ISBN/g, 'international ISBN', 'hk-isbn'],
  [/\(Hong Kong Island and Kowloon major commercial areas\)/g, '(major commercial areas, by appointment)', 'hk-install-en'],
  [/on Hong Kong Island and Kowloon/g, 'in major service areas', 'hk-install-en2'],
  [/in major areas of Hong Kong Island and Kowloon/g, 'in major service areas', 'hk-install-en3'],
  [/Hong Kong Island convention center vicinity, Kowloon Tong \/ Mong Kok malls, Tseung Kwan O \/ Tsuen Wan communities/g, 'convention center districts, major malls, and community venues', 'hk-install-en4'],
  [/Hong Kong Island finance professionals/g, 'finance professionals', 'hk-fin'],
  [/Shenzhen Factory Direct to Japan/g, 'Asia Factory Direct to Japan', 'sz-japan'],
  [/Shenzhen Factory → Japan Direct/g, 'Asia Factory → Japan Direct', 'sz-japan2'],
  [/Shenzhen-based/g, 'Asia-based', 'sz-based'],
  [/SF Express HK delivery/g, 'international express delivery', 'hk-sf-kw'],
  [/48-hour Hong Kong local delivery/g, '2-4 day worldwide delivery', 'hk-48h3'],
  [/\$\{name\} Hong Kong — /g, '${name} — ', 'hk-tpl-en'],
  [/HK DOH compliance/g, 'food safety compliance', 'hk-doh-kw'],
  [/We deliver to Hong Kong Island \(Central, Causeway Bay\), Kowloon \(Mong Kok, Kwun Tong\), and New Territories \(Sha Tin, Tuen Mun\)/g, 'We deliver worldwide via DHL Express / FedEx in 2-4 business days', 'hk-geo5'],
];

// ---------- segment processing ----------
function splitSegments(file, line, curCtx) {
  const keyRe = new RegExp(KEY_RE_SRC[file] ? (KEY_RE_SRC[file].source) : KEY_RE_SRC.default.source, 'g');
  const marks = [];
  let m;
  while ((m = keyRe.exec(line)) !== null) {
    const loc = locOfKey(file, m[1]);
    if (loc) marks.push({ idx: m.index, end: keyRe.lastIndex, loc });
  }
  if (!marks.length) return [{ text: line, loc: curCtx, keyAt: -1 }];
  const segs = [];
  let prev = 0;
  for (let i = 0; i < marks.length; i++) {
    const mk = marks[i];
    const next = i + 1 < marks.length ? marks[i + 1].idx : line.length;
    if (mk.idx > prev) segs.push({ text: line.slice(prev, mk.idx), loc: curCtx, keyAt: -1 });
    segs.push({ text: line.slice(mk.idx, next), loc: mk.loc, keyAt: mk.idx });
    curCtx = mk.loc;
    prev = next;
  }
  return segs;
}

function effectiveLoc(seg) {
  if (seg.keyAt >= 0 && seg.loc) return seg.loc; // explicit key on this segment wins
  // inherited context: detect by content (faq arrays, template continuation)
  if (hasKana(seg.text)) return 'ja';
  if (hasHan(seg.text)) return 'zh';
  if (seg.loc === 'zh') return 'zh';
  return seg.loc || 'en';
}

function processFile(file) {
  const lines = fs.readFileSync(file, 'utf-8').split('\n');
  let ctx = null;
  const changes = [];
  const leftovers = [];
  const keeps = [];
  const out = lines.map((line, i) => {
    if (/^\s*(\/\/|\*)/.test(line)) return line; // skip comments
    const segs = splitSegments(file, line, ctx);
    const lastKeyLoc = segs.length > 1 ? segs[segs.length - 1].loc : ctx;
    let newLine = '';
    let changed = false;
    for (const seg of segs) {
      const loc = effectiveLoc(seg);
      let text = seg.text;
      if (loc === 'ja' || loc === 'en') {
        const bad = loc === 'ja' ? JA_BAD : EN_BAD;
        if (bad.test(text)) {
          if (KEEP_RE.test(text)) {
            keeps.push({ file, line: i + 1, loc, text: text.trim().slice(0, 200) });
          } else {
            const rules = loc === 'ja' ? [...JA_RULES, ...EN_RULES] : EN_RULES;
            const { out: masked, store } = maskNap(text);
            const before = masked;
            let work = masked;
            for (const [re, rep] of rules) work = work.replace(re, rep);
            text = unmaskNap(work, store);
            if (text !== seg.text) {
              changed = true;
              changes.push({ file, line: i + 1, loc, old: seg.text.trim().slice(0, 220), nw: text.trim().slice(0, 220) });
            }
            const still = (loc === 'ja' ? JA_BAD : EN_BAD).test(work) && !KEEP_RE.test(text);
            if (still) leftovers.push({ file, line: i + 1, loc, text: text.trim().slice(0, 220) });
          }
        }
      }
      newLine += text;
    }
    ctx = lastKeyLoc;
    return changed ? newLine : line;
  });
  if (WRITE && changes.length) fs.writeFileSync(file, out.join('\n'), 'utf-8');
  return { changes, leftovers, keeps };
}

const FILES = Object.keys(LOCALE_KEYS);
const all = { changes: [], leftovers: [], keeps: [] };
for (const f of FILES) {
  if (!fs.existsSync(f)) { console.error('missing: ' + f); continue; }
  const r = processFile(f);
  all.changes.push(...r.changes);
  all.leftovers.push(...r.leftovers);
  all.keeps.push(...r.keeps);
}
fs.writeFileSync('scripts/locale-audit/changes.json', JSON.stringify(all.changes, null, 1));
fs.writeFileSync('scripts/locale-audit/leftovers.json', JSON.stringify(all.leftovers, null, 1));
fs.writeFileSync('scripts/locale-audit/keeps.json', JSON.stringify(all.keeps, null, 1));
console.log(`mode: ${WRITE ? 'WRITE' : 'DRY-RUN'}`);
console.log(`changes: ${all.changes.length}, leftovers: ${all.leftovers.length}, keeps: ${all.keeps.length}`);
const byFile = {};
for (const c of all.changes) byFile[c.file] = (byFile[c.file] || 0) + 1;
console.log('changes by file:', byFile);
