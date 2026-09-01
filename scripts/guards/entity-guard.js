/**
 * scripts/guards/entity-guard.js (v1.1.1)
 * 门童 #6 实体注册 (K3 §0.32 P0 强制级)
 *
 * 严重度: 🔴 red (硬拦, pre-commit hook v7 默认, §0.32 跨项目 P0 强制级)
 *
 * K3 §0.32 zh-hk 硬规则 (9/1 18:50 拍板):
 * zh-hk 5 类禁词 (实体注册信息):
 *  1. 公司中文全称: 深圳市彩龍印刷包裝有限公司
 *  2. 实体注册地址: 廣東省深圳市龍崗區平湖街道嘉城路 1 號
 *  3. 公司英文名: Shenzhen Cai Long Printing Packaging Co., Ltd.
 *  4. 注册地址英文: 1 Jiacheng Road, Pinghu Street, Longgang District, Shenzhen 518111
 *  5. 邮编 518111 单独使用也可能暴露地址, 需合并
 *
 * K3 §0.32 ja 允许显示 (9/2 06:04 派活包战略级确认):
 *  ja 日本市场需要显示公司实际注册信息 (日本合同法/印刷业法要求).
 *  ja 现状合规: 7 blog 已含公司全称 + 实体注册地址 (K3 9/1 18:50 派活包"暂保留 en/ja"实际是 ja 允许).
 *  ja 不需要修改, 保持现状.
 *
 * K3 §0.32 en 暂保留 (9/1 18:50 + 9/2 06:04 派活包都未明说):
 *  en 是否显示公司全称 + 实体注册地址, K3 未拍板.
 *  en 暂保留, 等 K3 后续派活包明确.
 *
 * K3 §0.32 补完 (9/1 18:58 拍板) 6 允许表述 (品牌关系表述, 与实体注册信息区分):
 *  - 智印港 (ZprintPro) 為彩龍印刷旗下國際印刷服務品牌
 *  - 母公司品牌音译: 彩龍 / Cai Long / 彩龍印刷
 *  - 单独"深圳" / 单独"平湖" 仍然允许
 *  - "深圳彩龍" 城市+品牌组合允许
 *
 * 触发来源:
 *  - 2026-09-01 18:50 K3 拍板 "zh-hk 语言不要出现 深圳市彩龍印刷包裝有限公司 / 深圳市龍崗區平湖街道嘉城路 1 號. 这个具体的信息,写进规则里面,硬性规则"
 *  - 2026-09-01 18:58 K3 拍板补完 "智印港 (ZprintPro) 為彩龍印刷旗下國際印刷服務品牌, 这样就很好了"
 *  - 2026-09-02 06:04 K3 拍板 "在公司全称上,只有 JA 日本语言市场上,需要有公司实际注册信息的,就需要显示公司实际注册印刷"
 *
 * v1.1.0 (9/1 18:50 P0 强制级): zh-hk 5 禁词 red 硬拦
 * v1.1.1 (9/2 06:04 派活包): 注释明确 ja 允许显示 + en 暂保留 (扫描范围维持 zh-hk only, ja 自动豁免)
 */

const path = require("path");
const common = require("./common.js");

// 5 类 zh-hk 禁词 (K3 §0.32 硬规则, P0 强制级)
const FORBIDDEN_RULES = [
  {
    id: "ENTITY_FULL_NAME_ZH",
    name: "公司中文全称 (K3 §0.32 第 1 禁词)",
    severity: "red",
    pattern: /深圳市彩龍印刷包裝有限公司|彩龍印刷包裝有限公司|深圳市彩龍印刷包裝/g,
    fix: "改 智印港 (ZprintPro) 為彩龍印刷旗下國際印刷服務品牌 (K3 §0.32 补完允许表述)",
  },
  {
    id: "ENTITY_ADDRESS_ZH",
    name: "实体注册地址 (K3 §0.32 第 2 禁词)",
    severity: "red",
    pattern: /廣東省深圳市龍崗區平湖街道嘉城路 1 號|廣東省深圳市龍崗区平湖街道嘉城路 1 号|龍崗區平湖街道嘉城路 1 號|龍崗区平湖街道嘉城路 1 号|平湖街道嘉城路 1 號|平湖街道嘉城路 1 号|嘉城路 1 號|嘉城路 1 号/g,
    fix: "改 深圳 (城市名允许, per K3 §0.32 补完)",
  },
  {
    id: "ENTITY_FULL_NAME_EN",
    name: "公司英文名 (K3 §0.32 第 3 禁词)",
    severity: "red",
    pattern: /Shenzhen\s+Cai\s+Long\s+Printing\s+Packaging\s+Co\.\s*,\s*Ltd\./g,
    fix: "改 Cai Long Printing (母公司品牌音译, per K3 §0.32 补完允许)",
  },
  {
    id: "ENTITY_ADDRESS_EN",
    name: "注册地址英文 (K3 §0.32 第 4 禁词)",
    severity: "red",
    pattern: /1\s+Jiacheng\s+Road,\s*Pinghu\s+Street,\s*Longgang\s+District,\s*Shenzhen\s+518111/g,
    fix: "改 Shenzhen (城市名允许, per K3 §0.32 补完)",
  },
  {
    id: "ENTITY_ZIPCODE",
    name: "邮编 518111 单独使用 (K3 §0.32 第 5 禁词)",
    severity: "red",
    pattern: /\b518111\b|郵編\s*518111|邮编\s*518111/g,
    fix: "改 深圳 (城市名允许, per K3 §0.32 补完)",
  },
];

// 扫描范围: 仅 zh-hk
// ja: K3 9/2 06:04 派活包战略级确认 ja 允许显示公司实际注册信息 (日本合同法/印刷业法要求)
// en: K3 9/1 18:50 + 9/2 06:04 派活包都未明说, 暂保留
const SCAN_LOCALES = ["zh-hk", "zh-HK"];

async function scan(files) {
  const allHits = [];
  for (const file of files) {
    // 仅扫描 zh-hk (K3 §0.32 硬规则, v1.1.1 ja 允许 + en 暂保留)
    const isZHHK = SCAN_LOCALES.some(
      (l) => file.includes(l) || file.includes(l.toLowerCase())
    );
    if (!isZHHK) {
      // ja: K3 9/2 06:04 战略级确认 ja 允许显示公司实际注册信息, 不扫描
      // en: K3 9/1 18:50 + 9/2 06:04 派活包暂保留, 不扫描
      continue;
    }
    // §0.32 跨项目 P0 强制级, 不豁免 (除 docs/ + .hermes/regression-guard/ 自身)
    if (common.isExemptPath(file) && !common.isNonExemptRule("ENTITY_FULL_NAME_ZH")) {
      continue;
    }

    let content;
    try {
      content = require("fs").readFileSync(file, "utf-8");
    } catch (e) {
      continue;
    }

    for (const rule of FORBIDDEN_RULES) {
      const hits = common.scanRule(content, file, rule);
      allHits.push(...hits);
    }
  }
  return allHits;
}

module.exports = { scan, FORBIDDEN_RULES, SCAN_LOCALES };
