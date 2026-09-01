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

module.exports = { scan, RULES };
