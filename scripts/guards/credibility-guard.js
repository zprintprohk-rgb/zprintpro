/**
 * scripts/guards/credibility-guard.js
 * 门童 #1 数据诚信 (K3 9/1 15:06 拍板)
 *
 * 严重度: 🟠 orange (shadow mode 9/1-9/15, --strict 启用硬拦)
 *
 * 11 类无 K3 拍板来源的硬数字 / 证书号 / 经验年限:
 * 1. ISO 9001:2015 / ISO 9001
 * 2. FSC®?\s*C\d{6} (含连字符 FSC-C123456)
 * 3. TÜV\s*Rheinland
 * 4. 1,000\+ / 1000\+ (3 位数加号)
 * 5. 4 位数无来源数字 (4,200+ 急件 / 15,000+ 客戶 / 1,200+)
 * 6. X 大行业 / X 大行業 (12 大行業 / 4 大行業標配)
 * 7. X 重 (7 重)
 * 8. 国际顶级 / 國際頂級
 * 9. 15 年 / 15+ 年 / 十五年
 * 10. 自設廠房 / 自设厂房
 * 11. 海德堡 / Heidelberg / HP Indigo (无 K3 拍板机型)
 *
 * K3 9/1 15:06 修正 3: 经营参数白名单 (FSC認証紙 / HK$ / 100 個起印 / 18:00 截單 / 順豐 / DHL)
 * 在 common.js isOperationalWhitelist() 中处理
 *
 * 拦 false positive 修正: 价格/交期/起印量/材质描述 都不在拦截范围
 */

const path = require('path');
const common = require('./common.js');

// 11 类规则 (K3 9/1 12:27 + 15:06 拍板)
const RULES = [
  {
    id: 'CRED_ISO_9001',
    name: 'ISO 9001 认证 (无 K3 拍板来源)',
    severity: 'orange',
    pattern: /ISO\s*9001:?(2015)?/g,
    fix: '撤除 (per §0.23 数据诚信), 改用描述性文案 "ISO 认证体系"',
  },
  {
    id: 'CRED_FSC_C123456',
    name: 'FSC 证书号 (C\d{6})',
    severity: 'orange',
    pattern: /FSC®?\s*-?\s*C\d{6}/g,
    fix: '撤除 (per §0.23 数据诚信), 改用描述性文案 "FSC 認証紙" (材质描述, 经营参数白名单)',
  },
  {
    id: 'CRED_TUV_RHEINLAND',
    name: 'TÜV Rheinland 认证',
    severity: 'orange',
    pattern: /TÜV\s*Rheinland/g,
    fix: '撤除 (per §0.23 数据诚信)',
  },
  {
    id: 'CRED_1000_PLUS',
    name: '1,000+ / 1000+ 客户 (3 位数加号)',
    severity: 'orange',
    pattern: /\b1,?000\+/g,
    fix: '撤除 (per §0.23 数据诚信), 改用 "全球客户" 等描述性文案',
  },
  {
    id: 'CRED_4_PLUS_NUMBER',
    name: '4 位数无来源数字 (4,200+ / 15,000+ / 1,200+ / 4,500+)',
    severity: 'orange',
    pattern: /\b\d{1,3},\d{3}\+?\b/g,
    fix: '撤除 (per §0.23 数据诚信), 改为可验证数字 (如 2024 H1 询盘 X 单)',
  },
  {
    id: 'CRED_X_INDUSTRIES',
    name: 'X 大行业 / X 大行業 (12 大行業 / 4 大行業標配)',
    severity: 'orange',
    pattern: /\b\d+\s*大\s*[行業行业行業]\b/g,
    fix: '撤除 (per §0.23 数据诚信), 改用 "多行业经验" 描述',
  },
  {
    id: 'CRED_X_FOLD',
    name: 'X 重 (7 重 / 8 重 工序)',
    severity: 'orange',
    pattern: /\b\d+\s*重\b/g,
    fix: '撤除 (per §0.23 数据诚信), 改用 "多道工序" 描述',
  },
  {
    id: 'CRED_INTL_TOP',
    name: '国际顶级 / 國際頂級',
    severity: 'orange',
    pattern: /國際頂級|国际顶级/g,
    fix: '撤除 (per §0.23 数据诚信)',
  },
  {
    id: 'CRED_15_YEARS',
    name: '15 年 / 15+ 年 / 十五年 经验',
    severity: 'orange',
    pattern: /\b15\+?\s*年\b|十五年/g,
    fix: '撤除 (per §0.23 数据诚信), 改用 "多年印刷经验" 描述',
  },
  {
    id: 'CRED_SELF_FACTORY',
    name: '自設廠房 / 自设厂房',
    severity: 'orange',
    pattern: /自設廠房|自设厂房/g,
    fix: '撤除 (per §0.23 数据诚信), 改用 "深圳平湖廠房 + 香港服務點" 描述 (per §13.10 真实主体)',
  },
  {
    id: 'CRED_HEIDELBERG',
    name: '海德堡 / Heidelberg / HP Indigo 印刷机',
    severity: 'orange',
    pattern: /海德堡\s*柯式|海德堡\s*6\+1|Heidelberg|HP\s*Indigo/g,
    fix: '撤除 (per §0.23 数据诚信), 改用 "进口印刷设备" 描述',
  },
];

async function scan(files) {
  const allHits = [];
  for (const file of files) {
    // 豁免路径检查
    if (common.isExemptPath(file) && !RULES.some(r => common.isNonExemptRule(r.id))) continue;

    let content;
    try {
      content = require('fs').readFileSync(file, 'utf-8');
    } catch (e) { continue; }

    for (const rule of RULES) {
      // 不豁免规则在豁免路径也强制扫描
      if (common.isExemptPath(file) && !common.isNonExemptRule(rule.id)) continue;

      const hits = common.scanRule(content, file, rule);
      allHits.push(...hits);
    }
  }
  return allHits;
}

module.exports = { scan, RULES };
