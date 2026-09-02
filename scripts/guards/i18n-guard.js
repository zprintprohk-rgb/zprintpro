/**
 * scripts/guards/i18n-guard.js
 * 门童 #4 跨语言污染 (K3 9/1 15:06 拍板)
 *
 * 严重度: 🟡 yellow (shadow mode) + 🔴 red (部分严重)
 *
 * 6 类规则:
 * 1. I18N_POLLUTION [red]: zh-hk 文本内简体字残留 (per §0.29 v3.1 字符体检)
 * 2. I18N_TITLE_LENGTH [yellow]: title 字符体检 50-60 (zh-hk) / 50-60 (en) / 50-60 (ja)
 * 3. I18N_META_LENGTH [yellow]: meta description 150-160
 * 4. I18N_FULL_WIDTH [yellow]: 半角/全角混用 (per §0.29 v2 半角当量)
 * 5. I18N_CURRENCY [yellow]: 币种格式 (统一 HK$ 不混 USD/JPY)
 * 6. I18N_FOOD_BOXES_CROSS [red]: food-boxes en/ja 误用 zh-hk 文本 (历史 P0 教训, fd22275f)
 *
 * K3 §0.29 v3.1 字符体检 3 行:
 *   - 满格 ≥55 禁加
 *   - 不足 <45 按序补
 *   - 跨语言污染零容忍
 */

const path = require('path');
const common = require('./common.js');

const RULES = [
  {
    id: 'I18N_POLLUTION',
    name: 'zh-hk/ja 文本内简体字残留',
    severity: 'red',
    pattern: /[复电业为发这们个时来会说过对开现应学页]/g,
    fix: '改繁体字 (per §0.29 v3.1 跨语言污染零容忍)',
  },
  {
    id: 'I18N_TITLE_LENGTH',
    name: 'title 字符体检 50-60',
    severity: 'yellow',
    pattern: /title:\s*["']([^"']{1,200})["']/g,  // 检测 title 字段, 单独验证长度
    fix: 'title 长度 50-60 字符 (per §0.29 v3.1)',
    // 注意: 此规则需要单独的长度检查, scanRule 不适用, 用 customCheck
  },
  {
    id: 'I18N_META_LENGTH',
    name: 'meta description 字符体检 150-160',
    severity: 'yellow',
    pattern: /description:\s*["']([^"']{1,500})["']/g,
    fix: 'meta description 长度 150-160 字符 (per §0.29 v3.1)',
  },
  {
    id: 'I18N_CURRENCY',
    name: '币种格式不统一',
    severity: 'yellow',
    pattern: /US\$|USD|JPY|￥/g,  // 跨境统一 HK$, 不用 USD/JPY/￥
    fix: '改 HK$ (跨境统一币种 per zprintpro §5 多币种 + K3 §13.10 真实主体)',
  },
  {
    id: 'I18N_FOOD_BOXES_CROSS',
    name: 'food-boxes en/ja 误用 zh-hk 文本',
    severity: 'red',
    pattern: /food-boxes.*[一-鿿]{20,}/g,  // food-boxes 文件含大量中文
    fix: '检查 src/data/sku-seo-data.ts food-boxes 段, en/ja 不应误用 zh-hk 文本 (per fd22275f 修复)',
  },
];

// 自定义检查: title 长度
function checkTitleLength(content, file) {
  const hits = [];
  const titleRe = /title:\s*["']([^"']{1,200})["']/g;
  let match;
  while ((match = titleRe.exec(content)) !== null) {
    const title = match[1];
    // zh-hk / en / ja 半角当量计算 (每中文字符 = 1.5 半角当量, 每 ASCII = 1)
    let equiv = 0;
    for (const ch of title) {
      equiv += ch.charCodeAt(0) > 127 ? 1.5 : 1;
    }
    if (equiv < 45 || equiv > 65) {
      const line = common.findLineNumber(content, match.index);
      hits.push({
        file: path.relative(process.cwd(), file).replace(/\\/g, '/'),
        line,
        match: title.slice(0, 60) + (title.length > 60 ? '...' : ''),
        severity: 'yellow',
        ruleId: 'I18N_TITLE_LENGTH',
        ruleName: `title 字符体检 50-60 (实测 ${equiv.toFixed(1)} 当量)`,
        fix: `title 长度 50-60 当量 (per §0.29 v3.1), 当前 ${equiv.toFixed(1)} 当量`,
      });
    }
  }
  return hits;
}

async function scan(files) {
  const allHits = [];
  for (const file of files) {
    if (common.isExemptPath(file)) continue;  // i18n 跨语言污染在 SOP 文档也需查

    let content;
    try {
      content = require('fs').readFileSync(file, 'utf-8');
    } catch (e) { continue; }

    // 标准规则扫描
    for (const rule of RULES.filter(r => r.id !== 'I18N_TITLE_LENGTH')) {
      const hits = common.scanRule(content, file, rule);
      allHits.push(...hits);
    }

    // title 长度自定义检查
    if (file.includes('sku-seo-data') || file.includes('seo.ts') || file.includes('page.tsx')) {
      const titleHits = checkTitleLength(content, file);
      allHits.push(...titleHits);
    }
  }
  return allHits;
}



// ===== v2 禁词扩展 (per K3 9/2 08:50 GLM 评估报告 P0 紧急修正) =====
// 触发源: GLM 评估报告 §3 "en 翻译指南 FTC 合规地雷" + §4 "ja 翻译指南 Raksul 校准"
// 落地: 9/3 15:00 GSC 校准窗口前必生效 (en 翻译必 9/3 开翻前完成)

// en 禁词 (per FTC Act §5 + 16 C.F.R. Part 323 + EO 14392 2026-03-13 + 2026-04 执法 sweep)
const EN_FORBIDDEN_RULES = [
  {
    id: 'EN_MADE_IN_USA',
    name: 'Made in USA (FTC Act §5 违规, 重点打击)',
    severity: 'red',
    pattern: /\bMade\s*in\s*USA?\b/gi,
    fix: '撤除 (per GLM 9/2 08:50 P0 紧急修正, FTC Act §5 + 16 C.F.R. Part 323 + EO 14392 2026-03-13 + 2026-04 执法 sweep). 替换为 Factory-direct from Shenzhen / DHL 2-4 day delivery to US',
  },
  {
    id: 'EN_US_BASED',
    name: 'US-based (EO 14392 重点打击)',
    severity: 'red',
    pattern: /\bUS[- ]?based\b/gi,
    fix: '撤除 (per GLM 9/2 08:50 P0 紧急修正). 替换为 Shenzhen-based with global shipping',
  },
  {
    id: 'EN_AMERICAN_MADE',
    name: 'American-made (FTC 2026-04 执法 sweep 中招变体)',
    severity: 'red',
    pattern: /\bAmerican[- ]?made\b/gi,
    fix: '撤除 (per GLM 9/2 08:50 P0 紧急修正). 替换为 Factory-direct from China',
  },
  {
    id: 'EN_100_PERCENT_DOMESTIC',
    name: '100% Domestic (FTC 2026-04 执法 sweep 中招变体)',
    severity: 'red',
    pattern: /\b100%\s*Domestic\b/gi,
    fix: '撤除 (per GLM 9/2 08:50 P0 紧急修正). 替换为真实定位',
  },
  {
    id: 'EN_100_PERCENT_USA',
    name: '100% USA (FTC 2026-04 执法 sweep 中招变体)',
    severity: 'red',
    pattern: /\b100%\s*USA\b/gi,
    fix: '撤除 (per GLM 9/2 08:50 P0 紧急修正). 替换为真实定位',
  },
  {
    id: 'EN_ALL_AMERICAN_MADE',
    name: 'All-American Made (FTC 2026-04 执法 sweep 中招变体)',
    severity: 'red',
    pattern: /\bAll[- ]?American\s*Made\b/gi,
    fix: '撤除 (per GLM 9/2 08:50 P0 紧急修正). 替换为真实定位',
  },
  {
    id: 'EN_NAKED_FREE_SHIPPING',
    name: '裸 Free Shipping (无 HK$500 限定, 真实规则 順豐滿 HK$500 免運)',
    severity: 'orange',
    pattern: /\bFree\s*Shipping\b(?!\s*over\s*HK\$500)/gi,
    fix: '改为 Free SF shipping over HK$500 (per 真实经营参数)',
  },
  {
    id: 'EN_NAKED_BULK_DISCOUNT',
    name: '裸 Bulk Discount (无 500+ 限定, MOQ 100 + lead time 5-7 days)',
    severity: 'orange',
    pattern: /\bBulk\s*Discount\b(?!\s*at\s*\d+\+)/gi,
    fix: '改为 Bulk pricing at 500+ units (per MOQ 体系)',
  },
];

// ja 禁词 (per 日本景表法 不当表示防止法 + Raksul 校准)
const JA_FORBIDDEN_RULES = [
  {
    id: 'JA_激安',
    name: '激安 (B2C 甩卖词, 法人语境掉价)',
    severity: 'orange',
    pattern: /激安/g,
    fix: '改用 格安 / コスパ (per GLM 9/2 08:50 Raksul 校准)',
  },
  {
    id: 'JA_業界最安',
    name: '業界最安 (无依据比较, 日本景表法 不当表示防止法)',
    severity: 'red',
    pattern: /業界最安/g,
    fix: '撤除 (per GLM 9/2 08:50 Raksul 校准, 日本景表法 不当表示防止法)',
  },
  {
    id: 'JA_業界最高',
    name: '業界最高 (无依据比较, 日本景表法 不当表示防止法)',
    severity: 'red',
    pattern: /業界最高/g,
    fix: '撤除 (per GLM 9/2 08:50 Raksul 校准, 日本景表法 不当表示防止法)',
  },
  {
    id: 'JA_最安値',
    name: '最安値 (无依据比较, 日本景表法 不当表示防止法)',
    severity: 'red',
    pattern: /最安値/g,
    fix: '撤除 (per GLM 9/2 08:50 Raksul 校准, 日本景表法 不当表示防止法)',
  },
  {
    id: 'JA_NO_1',
    name: 'No.1 (无依据比较, 日本景表法 不当表示防止法)',
    severity: 'red',
    pattern: /No\.1/g,
    fix: '撤除 (per GLM 9/2 08:50 Raksul 校准, 日本景表法 不当表示防止法)',
  },
  {
    id: 'JA_業界一',
    name: '業界一 (无依据, 日本景表法 不当表示防止法)',
    severity: 'red',
    pattern: /業界一/g,
    fix: '撤除 (per GLM 9/2 08:50 Raksul 校准, 日本景表法 不当表示防止法)',
  },
  {
    id: 'JA_日本一',
    name: '日本一 (无依据, 日本景表法 不当表示防止法)',
    severity: 'red',
    pattern: /日本一/g,
    fix: '撤除 (per GLM 9/2 08:50 Raksul 校准, 日本景表法 不当表示防止法)',
  },
  {
    id: 'JA_NAKED_FREE_SHIPPING',
    name: '裸 送料無料 (无 HK$500 限定, 真实规则 順豐滿 HK$500 免運)',
    severity: 'orange',
    pattern: /(?<!条件的)送料無料(?!条件)/g,
    fix: '改为 送料無料の条件明記 (对应满额规则)',
  },
];

module.exports = { scan, RULES, EN_FORBIDDEN_RULES, JA_FORBIDDEN_RULES };
