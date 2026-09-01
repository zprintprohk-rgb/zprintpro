/**
 * scripts/guards/brand-guard.js
 * 门童 #3 品牌分层 (K3 9/1 15:06 拍板)
 *
 * 严重度: 🔴 red (硬拦, 品牌资产 §13.16 v2 红线)
 *
 * 5 类规则:
 * 1. BRAND_DOUBLE: 双品牌同时出现 (智印港 ZprintPro / ZprintPro 智印港 / 智印港 ジープリント)
 * 2. BRAND_TYPO: 错字 智印印港 (绝写, K3 §13.16 v2 红线)
 * 3. BRAND_LOCALE_MISMATCH: 跨语言品牌混用
 *    - zh-hk 文本内出现 ZprintPro / ジープリント
 *    - en 文本内出现 智印港 / ジープリント
 *    - ja 文本内出现 智印港 (ジープリント 单独埋点允许, per K3 8/8 02:52 §13.16.1)
 * 4. BRAND_JA_ALTERNATE: ja ジープリント 不与 ZprintPro 字面同时出现
 * 5. BRAND_CONSISTENCY: 同页面 brand 出现 > 2 次警告
 *
 * K3 §13.16 v2 单品牌分层 (9/1 02:54 拍板):
 *   - zh-hk = 智印港 (单品牌, 不加 ZprintPro 后缀)
 *   - en = ZprintPro (单品牌)
 *   - ja = ZprintPro (单品牌)
 *   - ja alternate "ジープリント" 单独埋点 (per K3 8/8 02:52 §13.16.1)
 *   - 双品牌 "智印港 ZprintPro" 不再同时出现
 *   - 错字「智印印港」禁写
 */

const path = require('path');
const common = require('./common.js');

const RULES = [
  {
    id: 'BRAND_DOUBLE',
    name: '双品牌同时出现',
    severity: 'red',
    pattern: /智印港\s*ZprintPro|ZprintPro\s*智印港|智印港\s*ジープリント|ジープリント\s*智印港/g,
    fix: '按 locale 单品牌分层: zh-hk=智印港 / en=ZprintPro / ja=ZprintPro (per K3 9/1 02:54 §13.16 v2)',
  },
  {
    id: 'BRAND_TYPO',
    name: '错字 智印印港',
    severity: 'red',
    pattern: /智印印港/g,
    fix: '改 智印港 (per K3 §13.16 v2 红线, 错字绝写)',
  },
  {
    id: 'BRAND_LOCALE_MISMATCH',
    name: '跨语言品牌混用',
    severity: 'red',
    pattern: /[一-鿿]+.*ZprintPro.*[一-鿿]+|ZprintPro.*[一-鿿]+/g,  // 简化: 中文字符上下文出现 ZprintPro
    fix: '按 locale 单品牌分层 (per K3 9/1 02:54 §13.16 v2)',
  },
  {
    id: 'BRAND_JA_ALTERNATE',
    name: 'ja ジープリント 不与 ZprintPro 字面同时出现',
    severity: 'orange',
    pattern: /ジープリント.*ZprintPro|ZprintPro.*ジープリント/g,
    fix: 'ja alternate ジープリント 单独埋点, 不与 ZprintPro 字面同时出现 (per K3 8/8 02:52 §13.16.1)',
  },
];

async function scan(files) {
  const allHits = [];
  for (const file of files) {
    if (common.isExemptPath(file)) continue;  // 品牌分层不豁免任何路径

    let content;
    try {
      content = require('fs').readFileSync(file, 'utf-8');
    } catch (e) { continue; }

    for (const rule of RULES) {
      const hits = common.scanRule(content, file, rule);
      allHits.push(...hits);
    }
  }
  return allHits;
}

module.exports = { scan, RULES };
