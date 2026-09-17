/**
 * 门童 #18: 机构/招标页面承诺口径 (K3 2026-09-17 拍板)
 *
 * 拍板口径 (K3 原话):
 *   1. 禁止使用确定性词汇: ❌「保证」「承诺」「确保」「已具备」「已完成」
 *      ✅ 替换为: 「拟」「计划」「预计」「以…为准」「待确认」
 *   2. 绑定生效条件: 所有骨架内容必附前提条件
 *      (以最终签订的合同条款为准 / 以甲方书面确认的技术规格书为前提 / 以内部立项审批通过为生效条件)
 *   3. 区分「事实陈述」与「意向表达」:
 *      - 认证 = 事实: 有就是有, 没有就是没有; 未获证绝不暗示已获证, 只能写「符合标准」或「认证进行中」
 *      - 产能/交期 = 意向: 可给区间但必标「预估」
 *   4. 系统字段适配: 强制数值字段填 0 或 9999 并备注「[待核定]」
 *   5. 骨架 → 血肉转化节点: 收到中标通知书 / 签订框架协议 / OA 审批通过 后
 *      替换占位符 → 删除限定词 → 保留更新记录 → 法务二次审核
 *
 * 本门童职责: 在机构/招标类页面上拦截确定性承诺词汇 (客户可见字符串内, 注释豁免),
 * 并检查是否声明了生效条件。防止「未拍板就写死承诺」造成的对外合规风险。
 */

const fs = require('fs');

/** 受本门童约束的页面 (机构/招标/政府采购类) */
const GUARDED_FILES = [
  /institutional-printing[\/\\]page\.tsx$/,
  /tender[\/\\]page\.tsx$/,
  /government[\/\\]page\.tsx$/,
  /procurement[\/\\]page\.tsx$/,
];

/** 确定性承诺词 (禁) — 覆盖 3 语言 */
const BANNED = [
  { re: /保证|保證/g, label: '保证/保證' },
  { re: /承诺|承諾/g, label: '承诺/承諾' },
  { re: /确保|確保/g, label: '确保/確保' },
  { re: /已具备|已具備/g, label: '已具备/已具備' },
  { re: /已完成/g, label: '已完成' },
  { re: /\bguarantee(?:d|s)?\b/gi, label: 'guarantee' },
  { re: /\bensure(?:d|s)?\b/gi, label: 'ensure' },
  { re: /\bassure(?:d|s)?\b/gi, label: 'assure' },
  { re: /\bcommit(?:ted|s)?\s+to\b/gi, label: 'commit to' },
  { re: /保証|確約/g, label: '保証/確約' },
];


/**
 * 否定式/中性语境豁免 (2026-09-17 补)
 *
 * 「不構成承諾」「非承諾」这类**否定式表述恰恰是本门童要保护的风控措辞** —— 它们明确声明
 * "这不是承诺", 与"承诺了某事"语义相反。字面匹配会误报, 故在此豁免。
 * 同理英文 not a commitment / does not constitute。
 */
const NEGATION_CONTEXT = [
  /不構成[^，。；]{0,14}承諾/,
  /不构成[^，。；]{0,14}承诺/,
  /非承諾|非承诺/,
  /尚不構成|尚不构成/,
  /并不構成|并不构成/,
  /(?:does|do|is|are)\s+not\s+(?:a\s+)?commitment/i,
  /not\s+constitute\s+(?:a\s+)?commitment/i,
  /は約束を構成し(?:ません|ない)/,
];

/** 生效条件声明 (必含其一的语义) */
const CONDITION_MARKERS = [
  /以最終簽訂的合同|以最终签订的合同/,
  /以.{0,12}書面確認.{0,12}規格書|以.{0,12}书面确认.{0,12}规格书/,
  /以內部立項審批|以内部立项审批/,
  /subject to the (?:finally )?executed contract/i,
  /subject to the technical specification/i,
  /締結される契約に準じ/,
  /発注機関が書面で確認した技術仕様書/,
];

/**
 * 剥离 TS/TSX 注释 (行注释 + 块注释), 只保留客户可见的代码文本
 * 理由: 本门童自身会在文件头注释里引用禁用词作为规则说明, 必须豁免
 */
function stripComments(src) {
  return src
    // 块注释 → 替换为同形空白但**保留换行**, 保证行号与原始文件一致 (否则报错行号会偏移)
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
    // 行注释 → 清空该行注释部分 (避开 URL 的 //)
    .replace(/(^|[^:])\/\/[^\n]*/g, '$1');
}

function scan(files) {
  const allHits = [];
  for (const file of files) {
    const rel = file.replace(/\\/g, '/');
    if (!GUARDED_FILES.some((re) => re.test(rel))) continue;

    let content;
    try {
      content = fs.readFileSync(file, 'utf-8');
    } catch (err) {
      continue;
    }

    const code = stripComments(content);
    const lines = code.split('\n');

    // 1. 禁用确定性词汇
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      for (const b of BANNED) {
        b.re.lastIndex = 0;
        const m = b.re.exec(line);
        if (m && NEGATION_CONTEXT.some((n) => n.test(line))) continue;   // 否定式语境豁免
        if (m) {
          allHits.push({
            file: rel,
            line: i + 1,
            match: m[0],
            severity: 'red',
            ruleId: 'INSTITUTIONAL_PROMISE_WORDING',
            ruleName:
              '机构/招标页出现确定性承诺词 (K3 2026-09-17 拍板: 禁用 保证/承诺/确保/已具备/已完成, 改用 拟/计划/预计/以…为准/待确认)',
            fix: `将「${m[0]}」改为意向表述 (拟/计划/预计/以…为准/待确认), 或为该段补充生效条件`,
          });
          break;
        }
      }
    }

    // 2. 生效条件声明必须存在
    const hasCondition = CONDITION_MARKERS.some((re) => re.test(code));
    if (!hasCondition) {
      allHits.push({
        file: rel,
        line: 0,
        match: '(缺少生效条件声明)',
        severity: 'red',
        ruleId: 'INSTITUTIONAL_PROMISE_WORDING',
        ruleName: '机构/招标页缺少生效条件声明',
        fix: '补充生效条件 (如「以最终签订的合同条款为准」「以甲方书面确认的技术规格书为前提」)',
      });
    }
  }
  return allHits;
}

module.exports = {
  scan,
  RULES: [{ id: 'INSTITUTIONAL_PROMISE_WORDING', severity: 'red' }],
  GUARDED_FILES,
  BANNED,
  NEGATION_CONTEXT,
  stripComments,
};
