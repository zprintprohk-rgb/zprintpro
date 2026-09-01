/**
 * scripts/guards/phone-guard.js
 * 门童 #2 真实电话 (K3 9/1 15:06 拍板)
 *
 * 严重度: 🔴 red (硬拦, pre-commit hook 默认启用)
 *
 * 4 类规则:
 * 1. PHONE_HK_BLACKLIST: +852 港号 (除白名单 +852-XXXX-XXXX K3 拍板号, 当前 0 港号)
 * 2. PHONE_WA_852: wa.me/852 (港号 wa 链接, 黑名单)
 * 3. PHONE_CN_WHITELIST: +86 198 8085 1334 唯一白名单
 * 4. PHONE_NON_WHITELIST: 非白名单电话格式 (+1 / +81 / +44 提示 K3 拍板)
 *
 * K3 §13.10 真实主体: 唯一联系号 +86 198 8085 1334 (call + WhatsApp 统一)
 * K3 8/7 phase-out 181: 旧 +86 181 2638 0255 已废止
 *
 * 修正 3 (K3 9/1 15:06): 经营参数白名单不豁免此门童 (电话是品牌资产, 必拦)
 */

const path = require('path');
const common = require('./common.js');

// 唯一白名单 (K3 §13.10)
const PHONE_WHITELIST = [
  /\+86\s*198\s*8085\s*1334/g,
  /wa\.me\/8619880851334/g,
  /8619880851334/g,
];

const RULES = [
  {
    id: 'PHONE_HK_BLACKLIST',
    name: '+852 港号黑名单',
    severity: 'red',
    pattern: /\+852[\s-]?\d{4}[\s-]?\d{4}/g,
    fix: '改 +86 198 8085 1334 (per §13.10 真实主体 phase-out 181)',
  },
  {
    id: 'PHONE_WA_852',
    name: 'wa.me/852 港号 wa 链接',
    severity: 'red',
    pattern: /wa\.me\/852\d+/g,
    fix: '改 wa.me/8619880851334',
  },
  {
    id: 'PHONE_NON_WHITELIST',
    name: '非白名单电话格式',
    severity: 'orange',
    pattern: /\+\d{1,3}[\s-]?\d{4,}/g,
    fix: '确认是 K3 拍板的真实号, 加白名单或撤除',
  },
];

async function scan(files) {
  const allHits = [];
  for (const file of files) {
    if (common.isExemptPath(file)) continue;  // 电话不豁免任何路径 (品牌资产)

    let content;
    try {
      content = require('fs').readFileSync(file, 'utf-8');
    } catch (e) { continue; }

    // 先扫白名单区域
    let strippedContent = content;
    for (const wp of PHONE_WHITELIST) {
      strippedContent = strippedContent.replace(wp, '__WHITELISTED__');
    }

    for (const rule of RULES) {
      const hits = common.scanRule(strippedContent, file, rule);
      allHits.push(...hits);
    }
  }
  return allHits;
}

module.exports = { scan, RULES, PHONE_WHITELIST };
