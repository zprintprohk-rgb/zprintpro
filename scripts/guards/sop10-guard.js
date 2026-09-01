/**
 * scripts/guards/sop10-guard.js
 * 门童 #5 SOP-10 5 问门禁 (K3 9/1 15:06 拍板)
 *
 * 严重度: 🟡 yellow (shadow mode) + 🔴 red (秘密泄漏)
 *
 * 8 类规则 (per AGENTS.md §0.22 SOP-10 5 问 3 款 + §0.27.8 ARK key):
 * 1. SOP10_CERT_NO [red]: 虚假证书号 (FSC-C123456 / 01 100 150 1234)
 * 2. SOP10_24H_SLA [yellow]: 24h SLA / 24 小时 / 99.2% 达成率 (无 K3 拍板)
 * 3. SOP10_HEIDELBERG [yellow]: 海德堡 6+1 (在 SOP-10 5 问 3 款语境下)
 * 4. SOP10_12_INDUSTRIES [yellow]: 12 大行业 / 4 大行业标配
 * 5. SOP10_INTL_TOP [yellow]: 国际顶级 / 國際頂級
 * 6. SOP10_4_PLUS_NUMBER [yellow]: 4 位数无来源 (4,200+ / 15,000+)
 * 7. SOP10_15_YEARS [yellow]: 15 年 / 15+ 年 / 十五年
 * 8. SECRET_LEAK [red]: API key / token / 证书 硬编码 (per §0.27.8)
 *   - VolcEngine ARK (per K3 8/28 07:48 拍板)
 *   - Supabase service_role
 *   - Airwallex API key / Client ID
 *
 * K3 §0.22 SOP-10 5 问 3 款红线: 派活/上报/报告前必跑
 * K3 §0.27.8 ARK key 不暴露: 任何硬编码触发 commit 拒绝
 */

const path = require('path');
const common = require('./common.js');

const RULES = [
  {
    id: 'SOP10_CERT_NO',
    name: '虚假证书号 (FSC-C123456 / 01 100 150 1234)',
    severity: 'red',
    pattern: /FSC-C\d{6}|01\s*100\s*150\s*1234/g,
    fix: '撤除 (per §0.22 SOP-10 第 4 款 + §0.23 数据诚信)',
  },
  {
    id: 'SOP10_24H_SLA',
    name: '24h SLA / 99.2% 达成率 (无 K3 拍板)',
    severity: 'yellow',
    pattern: /\b24\s*[hH小时]\s*SLA\b|99\.2%\s*達成率|99\.2%\s*达成率/g,
    fix: '撤除 (per §0.22 SOP-10 5 问 3 款), 改用 "急件 18:00 截單翌日 12:00 順豐"',
  },
  {
    id: 'SOP10_HEIDELBERG_6_1',
    name: '海德堡 6+1 印刷机 (SOP-10 语境)',
    severity: 'yellow',
    pattern: /海德堡\s*6\s*\+\s*1/g,
    fix: '撤除 (per §0.22 SOP-10 5 问 3 款), 改用 "进口印刷设备"',
  },
  {
    id: 'SOP10_12_INDUSTRIES',
    name: '12 大行业 / 4 大行业标配',
    severity: 'yellow',
    pattern: /\b12\s*大\s*[行業行业]\b|\b4\s*大\s*[行業行业]\s*標配\b|\b4\s*大\s*[行業行业]\s*标配\b/g,
    fix: '撤除 (per §0.22 SOP-10 5 问 3 款), 改用 "多行业经验"',
  },
  {
    id: 'SOP10_INTL_TOP',
    name: '国际顶级 / 國際頂級 (SOP-10 语境)',
    severity: 'yellow',
    pattern: /國際頂級|国际顶级/g,
    fix: '撤除 (per §0.22 SOP-10 5 问 3 款)',
  },
  {
    id: 'SOP10_4_PLUS_NUMBER',
    name: '4 位数无来源数字 (4,200+ / 15,000+ / 1,200+)',
    severity: 'yellow',
    pattern: /\b\d{1,3},\d{3}\+?\b/g,
    fix: '撤除 (per §0.22 SOP-10 5 问 3 款), 改为可验证数字',
  },
  {
    id: 'SOP10_15_YEARS',
    name: '15 年 / 15+ 年 / 十五年 (SOP-10 语境)',
    severity: 'yellow',
    pattern: /\b15\+?\s*年\b|十五年/g,
    fix: '撤除 (per §0.22 SOP-10 5 问 3 款)',
  },
  {
    id: 'SECRET_LEAK',
    name: 'API key / token 硬编码 (per §0.27.8)',
    severity: 'red',
    pattern: /(ARK_API_KEY|sk-[a-zA-Z0-9]{20,}|pk_live_[a-zA-Z0-9]{20,}|sk_live_[a-zA-Z0-9]{20,}|AIRWALLEX_API_KEY=[a-zA-Z0-9-]{20,})/g,
    fix: '立即 mavis-trash 删除 + K3 必拍 1 次回复 (per §0.27.8 ARK key 不暴露红线)',
  },
];

async function scan(files) {
  const allHits = [];
  for (const file of files) {
    // SECRET_LEAK 在豁免路径也强制扫描 (per §0.27.8)
    if (common.isExemptPath(file)) {
      // 仅 SECRET_LEAK 不豁免
      for (const rule of RULES) {
        if (rule.id !== 'SECRET_LEAK' && !common.isNonExemptRule(rule.id)) continue;
        let content;
        try {
          content = require('fs').readFileSync(file, 'utf-8');
        } catch (e) { continue; }
        const hits = common.scanRule(content, file, rule);
        allHits.push(...hits);
      }
      continue;
    }

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
