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
 *
 * ============================================================================
 * ★ 双向化 v2 (2026-09-19) —— 见文件末尾「双向化」段
 *   原实现只有 scanLocaleScoped(content, file, pollution, ['zh-hk']) **一个方向**
 *   ⇒ 「en/ja 含 CJK」「zh-hk 含简体专用字形」从未被检查
 *   (线上事故: src/lib/price-data.generated.ts 18 SKU / 342 栏位语言污染存活多日,
 *    存活根因 = 门童单向; 固化见 .hermes/regression-guard/error-patterns.md)
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');
const common = require('./common.js');

const RULES = [
  {
    id: 'I18N_POLLUTION',
    name: 'zh-hk 值含简体专用字形 (双向化 v2)',
    severity: 'red',
    // ⚠️ 本 pattern 仅为文档/兼容占位: 实际扫描用 BIDIRECTIONAL_RULES 的独立字集 (SIMP_ZH / SIMP_JA / CJK)
    pattern: /[复电业为发这们个时来会说过对开现应学页]/g,   // = LEGACY_POLLUTION_CHARS (v1 窄集)
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

// ============================================================================
// ★ 双向化 (2026-09-19) —— 字集 curate + 三向判据
// ============================================================================
//
// 【为何不能做成对称的「非该语系出现 CJK 即报」】
//   ja 本来就用汉字 ⇒「含 CJK」对 ja 无意义且**必然误报**(实测 19 处真日文);
//   zh-hk 与 ja 的判据都必须收窄到「简体专用字形」(繁体/日文必与简体不同形者)。
//
// 【SIMP_ZH 收录原则 (血的教训, 见 .hermes/logs/2026-09-18-selfpub-delivery.md §⑦ 事故 1)】
//   只收「繁体必与简体不同形」的字。反例(2026-09-18 实测踩中): 把「進出／費用／計算／條件」
//   拆成单字整批入集 ⇒ 出/算/用/件 被误判 —— 四者皆繁简同形。
//   同理以下「繁体也用」或「繁简同形」的字一律**不收**:
//     出 算 用 件 格 台 里 后 干 云 制 准 系 松 卷 并 斗 范 丰 划 伙 夸 涂 咸 凶 郁 于 筑 庄 粘 表 虫 丑
//   ★ 另设「粤语/港式合法用法」排除项 (2026-09-19 实测):
//     晒 —— 粤语完成体助词 (講晒 / 睇晒 / 得晒) 在 zh-hk 粤语行文中**合法**, 虽与「曬」简体同形,
//           仍必须排除 (实测 10 处假阳性: 一句講晒 / 睇晒所有書刊產品 …)
//
// 【SIMP_JA 收录原则】= SIMP_ZH − 日文新字体(JA_SHINJITAI)
//   日文新字体与简体**同形**者(写/数/点/双/学/画/国/体/来/与/当/医/断/错/言 …)是**正确的日文写法**,
//   不得判为污染(实测教训: 直接把 zh-hk 宽集套到 ja 会误报 19 处真日文)。
//   ⇒ 两份字集, **一份字集套三语系**是错的。
const SIMP_ZH = [
  // 组 1 · 印刷/包装/材料/工艺
  '贴纸张页书册订单货价费额币银账购销运递邮装产质检验设计图标记规艺术层码',
  '绿红蓝黄胶烫压镂喷绘缝织软钢铝铜铁锌钉镀绳线纤绸缎绢纺纱编织绵综缓缩续维经统络纯纹绒缆键盘',
  // 组 2 · 商务/服务/营销/沟通
  '务业优创报询评论问题帮联请谢让认讲课读译词语试谈误诉训许谱详笔签节类顺项须预领顾传输权组织员',
  '爱礼贺庆历统现简约环净结构备归档减赠汇盘储测',
  // 组 3 · 高频字形差异 (印刷站点最常踩)
  '发电无义议见复过对开应学来会说这们个时为与万亿轮辆载转达际岛陆广东宁济岁龄长轻远边',
  '买卖换赔赚财贷奖赢输满号国体医断数点双画写旧尽声实温条状证宝湾残楼党盗属茎据潜惧壮',
  '触辞担胆灯独麦蛮浅窃区湿随峡狭献挟携昼嘱誉乱悦错击',
  // 组 4 · 其余常用简体专用字形 (繁简必异形)
  '爱罢备贝笔毕边变标别宾仓产长偿场尘陈称惩迟冲处础聪丛导邓敌动冻队吨夺堕讹恶儿尔罚阀饭贩访飞废纷奋愤风冯凤肤妇该盖赶冈刚岗纲给巩沟够馆惯归龟规柜汉轰壶护沪户华怀坏欢还秽浑获鸡积极际剂济继驾歼监拣舰荐贱践桨酱阶洁结仅进惊竞剧觉绝军骏开凯壳课垦恳块亏扩腊蜡赖兰拦栏烂滥捞劳涝乐垒泪篱离丽厉励隶帘联怜炼练粮两疗辽猎临邻岭铃领刘龙聋笼垄卢虏鲁录虑仑论罗萝逻骡骆妈马迈猫闷梦弥谜庙灭鸣谋亩恼脑拟酿鸟聂镍农浓欧呕盘庞喷贫频凭苹扑铺齐骑岂启气弃迁钱钳谴枪墙抢桥窍亲轻倾琼穷趋驱劝却扰热荣锐润洒萨赛伞丧扫涩杀筛闪陕赡伤赏绍绅审婶肾渗绳胜圣师狮诗识蚀驶势适释饰视寿树竖帅谁硕丝饲苏肃虽孙损锁态摊滩坛叹汤涛讨腾题听头椭洼袜弯网韦违围伟伪纬谓卫闻稳呜芜吴坞雾牺习戏细虾辖吓鲜贤衔显宪乡响萧晓协胁泻锌衅兴锈绣绪轩悬选寻逊鸦哑亚讶烟盐严颜阎艳厌砚谚杨扬阳养样尧爷叶颐遗仪蚁诣异荫阴饮隐樱婴鹰莹萤营蝇颖拥佣踊忧铀犹诱鱼渔屿狱誉渊园员圆缘愿约跃钥粤阅陨蕴晕韵灾攒暂赞赃脏凿枣灶责择泽贼轧闸诈斋债毡盏斩辗崭绽涨帐胀赵贞针侦诊镇阵挣睁帧郑织职执挚掷帜钟终种众皱骤诸猪诛烛铸驻赚桩妆锥坠缀浊资渍总纵邹诅组钻',
].join('');

// 组 5 · 常用简体专用字形补漏 (2026-09-19 集合完整性审计)
//   组 1-4 曾漏 专/关/举/舱 等高频字 —— 漏字 = 该方向形同虚设
//   (实证: 缺「专」会让 K3 指定的 ja 注入用例 3 假绿 ⇒ 用注入测试反查字集完整性是必要工序)
const SIMP_ZH_EXTRA = [
  '专关举舱参将坚艰间捡俭槛鉴紧谨劲鲸镜纠驹锯颗裤宽矿况阔莱篮阑澜览揽懒镭俩连莲涟脸链恋凉谅灵咙拢陇掳卤驴屡缕沦纶锣玛蚂骂吗脉馒瞒锚铆贸镁觅缅铭谬纳钠挠闹馁腻拧纽诺鸥抛骗飘泼颇仆牵铅谦强寝氢顷饶绕韧摄贪瘫谭荧谊谣鸭砖肿轴',
  '疯讽坟粪缚赋负钙阁钩贡贯轨诡锅骇韩鹤横鸿谎挥辉贿烩讳诲荤祸饥讥缉辑级挤纪几颊剑饯渐溅骄娇搅缴绞矫诫届锦钧库',
].join('');
const SIMP_ZH_ALL = SIMP_ZH + SIMP_ZH_EXTRA;

// 日文新字体 (与简体**同形** ⇒ 属**正确日文写法**, 必须从 ja 判据排除)
// 含 K3 点名 15 字: 写数点双学画国体来与当医断错言; 其余为同形新字体 (会/号/旧/尽/触/辞/担/胆/灯/独/麦/
// 蛮/浅/窃/区/声/湿/实/随/条/万/温/峡/狭/献/挟/携/状/昼/嘱/誉/证/乱/悦/宝/湾/残/楼/党/盗/属/茎/据/潜/惧/壮)
// + 装/黄/欧 (印刷高频, 实测同形) + 礼/寿/猫 (顧客謝礼・寿命・猫 为正确日文)
// + 却/践/称/弥 (退却・実践・名称・弥生) + 参/将/径/届 (参加・将来・半径・届出)
// + 横/寝/恋 (横浜・横断・寝室・就寝・恋愛 —— 均由本测试例 7/9 语料回归实测揪出)
const JA_SHINJITAI = '写数点双学画国体来与当医断错言'
  + '会号旧尽触辞担胆灯独麦蛮浅窃区声湿实随条万温峡狭献挟携状昼嘱誉证乱悦宝湾残楼党盗属茎据潜惧壮装黄欧礼寿'
  + '却践称弥猫参将径届横寝恋';

// 形状断言 (§12 危险写入三件套): 字集只允许 CJK 汉字, 混入 ASCII/正则元字符即抛错
const NON_HAN = /[^\u3400-\u9FFF]/;
const SIMP_ZH_CLEAN = [...new Set(SIMP_ZH_ALL.split(''))].join('');
const JA_SHINJITAI_CLEAN = [...new Set(JA_SHINJITAI.split(''))].join('');
if (NON_HAN.test(SIMP_ZH_CLEAN) || NON_HAN.test(JA_SHINJITAI_CLEAN)) {
  throw new Error('门童 #4 字集形状断言失败: 字集含非 CJK 汉字字符 (会破坏 RegExp 字符类)');
}
// 反向断言: 繁简同形字 绝不允许进 SIMP_ZH (2026-09-18 误报事故固化物)
const MUST_NOT_IN_SIMP_ZH = '出算用件格台里后干云制准系松卷并斗范丰划伙夸涂咸凶郁于筑庄粘表虫丑';
for (const ch of MUST_NOT_IN_SIMP_ZH) {
  if (SIMP_ZH_CLEAN.includes(ch)) {
    throw new Error(`门童 #4 字集形状断言失败: 繁简同形字「${ch}」不得进 SIMP_ZH (2026-09-18 误报事故固化物)`);
  }
}
// ja 判据 = SIMP_ZH − 日文新字体
const JA_EXCLUDE = new Set(JA_SHINJITAI_CLEAN.split(''));
const SIMP_JA = SIMP_ZH_CLEAN.split('').filter(c => !JA_EXCLUDE.has(c)).join('');
for (const ch of '写数点双学画国体来与当医断错言') {
  if (SIMP_JA.includes(ch)) throw new Error(`门童 #4 字集形状断言失败: 日文新字体「${ch}」必须从 ja 判据排除`);
}

/**
 * 三向判据 (K3 派活 2026-09-19; 判据已实测验证, **不可自行改成对称规则**)
 * | 语系   | 判据                          | 依据 |
 * | en     | 值含 CJK 汉字                 | 英文不需要中文 ⇒ **零误报**, 可直接上 |
 * | zh-hk  | 值含简体专用字形 (SIMP_ZH)     | 繁体站显示简体 = 红线 |
 * | ja     | 值含简体专用字形 (SIMP_JA 窄集) | ja 本来就用汉字,「含 CJK」对它无意义且必然误报 |
 */
const CJK_IDEOGRAPH_RE = /[\u3400-\u9FFF\uF900-\uFAFF]/;
const BIDIRECTIONAL_RULES = [
  {
    id: 'I18N_POLLUTION',
    name: 'zh-hk 值含简体专用字形 (双向化 v2 扩集)',
    severity: 'red',
    locales: ['zh-hk'],
    chars: SIMP_ZH_CLEAN,
    fix: '改繁体 (per §0.29 v3.1 跨语言污染零容忍); 繁简同形字(出/算/用/件/格)已排除, 不会误报',
  },
  {
    id: 'I18N_POLLUTION_JA',
    name: 'ja 值含简体专用字形 (已排除日文新字体)',
    severity: 'red',
    locales: ['ja'],
    chars: SIMP_JA,
    fix: '改日文写法; 写/数/点/双/学/画/国/体/来/与/当/医/断/错/言 等新字体属正确日文, 已从判据排除',
  },
  {
    id: 'I18N_POLLUTION_EN',
    name: 'en 值含 CJK 汉字 (英文不需要中文)',
    severity: 'red',
    locales: ['en'],
    pattern: CJK_IDEOGRAPH_RE,
    fix: '改英文; 若为品牌词「智印港」⇒ 走门童 #3 品牌分层 (en 站台品牌 = ZprintPro)',
  },
];

// 既有窄集 (v1 原 pattern) —— 其命中属「改造前已 red」的存量, **永不被基线豁免**
// 语义: 基线只覆盖「本次新增检测维度」带来的存量; 不得借基线掩盖既有 red
const LEGACY_POLLUTION_CHARS = new Set('复电业为发这们个时来会说过对开现应学页'.split(''));
// 双向污染命中的标记 (Symbol 不会进 JSON 输出; 供 scan() 把基线豁免结果重新过滤回原序数组)
const BIDI = Symbol('i18n-bidi');

// 自定义检查: title 长度 (2026-09-15 统一口径: 半角当量 CJK×2, 目标区 50-58, SSoT = title-equiv.js)
const { equiv: titleEquiv, TITLE_MIN, TITLE_MAX } = require('./title-equiv.js');
// 只对明确是 SEO title 数据源的文件检查 (page.tsx 组件的普通文案 title 字段会误报, 2026-09-15 收紧)
const TITLE_LENGTH_FILES = [
  'sku-seo-data', 'blog-data', 'buying-guides', 'blog-posts.ts',
  'seo.ts', 'h1-builder.ts', 'pillar-content.ts', 'schema-extensions.ts', 'seo-keywords.ts',
];
function checkTitleLength(content, file) {
  const hits = [];
  const titleRe = /title:\s*["']([^"']{1,200})["']/g;
  let match;
  while ((match = titleRe.exec(content)) !== null) {
    const title = match[1];
    const e = titleEquiv(title);
    if (e < TITLE_MIN || e > TITLE_MAX) {
      const line = common.findLineNumber(content, match.index);
      hits.push({
        file: path.relative(process.cwd(), file).replace(/\\/g, '/'),
        line,
        match: title.slice(0, 60) + (title.length > 60 ? '...' : ''),
        severity: 'yellow',
        ruleId: 'I18N_TITLE_LENGTH',
        ruleName: `title 字符体检 ${TITLE_MIN}-${TITLE_MAX} 当量 (实测 ${e} 当量)`,
        fix: `title 长度 ${TITLE_MIN}-${TITLE_MAX} 半角当量 (per K3 9/13 终裁 + title-equiv.js), 当前 ${e} 当量`,
      });
    }
  }
  return hits;
}

// 自定义检查: locale 作用域扫描 (2026-09-13, 取代 src/data 整树豁免)
//  - I18N_CURRENCY : 仅 zh-hk 字段要求统一 HK$ (en/ja 字段出现 USD/¥ 合法)
//  - I18N_POLLUTION*: 见 scanBidirectional (2026-09-19 双向化)
function scanLocaleScoped(content, file, rule, onlyLocales) {
  const hits = [];
  const re = new RegExp(rule.pattern.source, rule.pattern.flags.includes('g') ? rule.pattern.flags : rule.pattern.flags + 'g');
  let m, count = 0;
  while ((m = re.exec(content)) !== null) {
    if (m.index === re.lastIndex) re.lastIndex++;
    if (count >= common.MAX_HITS_PER_RULE) break;
    const loc = common.resolveLocale(content, m.index, file);
    if (!loc || !onlyLocales.includes(loc)) continue;      // 非目标 locale (或判定不出) -> 不报
    if (common.isCommentLine(content, m.index)) continue;
    hits.push({
      file: path.relative(process.cwd(), file).replace(/\\/g, '/'),
      line: common.findLineNumber(content, m.index),
      match: `${m[0]} (locale=${loc})`,
      severity: rule.severity,
      ruleId: rule.id,
      ruleName: rule.name,
      fix: rule.fix,
    });
    count++;
  }
  return hits;
}

/**
 * ★ 双向跨语言污染扫描 (2026-09-19 新增)
 *
 * 取代原 `scanLocaleScoped(content, file, pollution, ['zh-hk'])` 单向上限:
 *   原实现**只检查「zh-hk 混入英/日」一个方向**;「en/ja 含 CJK」「zh-hk 含简体专用字形」
 *   两个方向从未被检查 ⇒ price-data.generated.ts 的 342 栏位污染存活多日。
 *
 * 三向判据 (BIDIRECTIONAL_RULES) + 每语系独立字集:
 *   zh-hk: SIMP_ZH (宽集)   ja: SIMP_JA (窄集, 排除日文新字体)   en: CJK 汉字
 *
 * ★ 为什么必须换成「词法作用域」而不是原来的「最近左侧 locale 键」:
 *   v1 窄集只有 19 字, 用「原始文本 + 最近左侧 locale 键」尚可; 字集一放宽到千字级,
 *   该做法立刻爆炸 —— 2026-09-19 实测 src/ 命中 4,971 条, 逐条归因后确认 **绝大多数是假阳性**:
 *     ① 代码注释 (JSX 花括号注释 / 行尾双斜杠注释) 被算成某 locale 的「值」
 *     ② 代码本身 (如 `h1-builder.ts` 的繁→简转换表 `.replace(/貼/g,'贴')`) 被算成值
 *     ③ 无 locale 归属的源串 (如 price-tables/*.json 的 `configs[].config` 简体源标签)
 *        被「最近左侧键」错当成 ja (该档的 market_markup.ja: 2.2 就在上方)
 *   ⇒ 规则的对象是**值** (per「值含…」判据), 故改为:
 *     · 只扫**字符串字面量** (值), 注释与代码一律不扫
 *     · locale 归属改为**结构化作用域**: 命中必须落在 `locale键:` 之后那个**值的区间**内
 *       (值区间 = 从值起点按 ()[]{} 配平扫描到同级 `,`/闭合符)
 *     · 归属不到任何 locale 作用域 → **不报** (不豁免不误报; 见报告「精度 vs 保守照扫」取舍)
 *   ⇒ 结果: 真缺陷 (locale 字段里的污染) 全部保留, 假阳性被词法层剔除。
 *
 * 命中字段:
 *   char      —— 命中的字 (供测试与报告定位)
 *   legacyRed —— true = 既有一向窄集(v1)命中 ⇒ 改造前已是 red, 基线**不得**豁免
 */
const FILE_LOCALE_ONLY_RE = /(?:^|[\/\\])(?:blog-data[\/\\])?(zh-hk|en|ja)(?:\.json|[\/\\])/;
const LOCALE_KEY_INLINE_RE = /(?:["'`])?(zh-hk|en|ja)(?:["'`])?\s*:/g;
const KEY_ONLY_RE = /^["'`]?(zh-hk|en|ja)["'`]?$/;
const KEY_PREV_OK = new Set(['{', ',', '(', '[', ';', '=', '>', '?', ':']);

/** 词法区间: 字符串字面量 + 注释 (注释优先吞掉, 以免注释里的引号打乱字符串切分) */
function lexRanges(content) {
  const ranges = [];
  const n = content.length;
  let i = 0;
  while (i < n) {
    const ch = content[i];
    if (ch === '/' && content[i + 1] === '/') {
      let e = content.indexOf('\n', i);
      if (e === -1) e = n;
      ranges.push({ type: 'comment', start: i, end: e });
      i = e; continue;
    }
    if (ch === '/' && content[i + 1] === '*') {
      const f = content.indexOf('*/', i + 2);
      const e = f === -1 ? n : f + 2;
      ranges.push({ type: 'comment', start: i, end: e });
      i = e; continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      let j = i + 1;
      while (j < n) {
        if (content[j] === '\\') { j += 2; continue; }
        if (content[j] === ch) break;
        if (content[j] === '\n' && ch !== '`') break;   // 单/双引号不跨行 (未闭合保护)
        j++;
      }
      const e = Math.min(j + 1, n);
      ranges.push({ type: 'string', start: i, end: e });
      i = e; continue;
    }
    i++;
  }
  ranges.sort((a, b) => a.start - b.start);
  return ranges;
}

/** 二分: 返回包含 idx 的区间 (start<=idx<end) 或 null */
function rangeAt(ranges, idx) {
  let lo = 0, hi = ranges.length - 1, found = null;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const r = ranges[mid];
    if (idx < r.start) hi = mid - 1;
    else if (idx >= r.end) lo = mid + 1;
    else { found = r; break; }
  }
  return found;
}

/** idx 之前最近的「非空白」字符 (用于判定是不是真的键位, 排除 `case 'zh-hk':`) */
function prevNonWs(content, idx) {
  let i = idx - 1;
  while (i >= 0 && /\s/.test(content[i])) i--;
  return i >= 0 ? content[i] : null;
}

/** 值区间: 从 start 起, 跳过字符串/注释, 按 ()[]{} 配平, 同级 `,`/闭合符终止 */
function valueEnd(content, start, ranges) {
  const n = content.length;
  let i = start;
  while (i < n && /\s/.test(content[i])) i++;
  let depth = 0, j = i;
  while (j < n) {
    const r = rangeAt(ranges, j);
    if (r && r.start === j) { j = r.end; continue; }
    const c = content[j];
    if (c === '{' || c === '[' || c === '(') { depth++; j++; continue; }
    if (c === '}' || c === ']' || c === ')') {
      if (depth === 0) return j;              // 闭合符属外层 -> 值到此为止
      depth--; j++; continue;
    }
    if (depth === 0 && c === ',') return j;
    j++;
  }
  return n;
}

/** 构建某文件的 locale 值作用域 (含「文件级 locale」: blog-data/<loc>.json) */
function buildLocaleScopes(content, file) {
  const ranges = lexRanges(content);
  const norm = String(file).replace(/\\/g, '/');
  let fileLocale = null;
  if (/blog-data/.test(norm)) {
    const fm = FILE_LOCALE_ONLY_RE.exec(norm);
    if (fm) fileLocale = fm[1];
  }
  const scopes = [];
  LOCALE_KEY_INLINE_RE.lastIndex = 0;
  let km;
  while ((km = LOCALE_KEY_INLINE_RE.exec(content)) !== null) {
    const idx = km.index;
    const r = rangeAt(ranges, idx);
    if (r && r.type === 'comment') continue;
    if (r && r.type === 'string') {
      // 引号包裹的键: 整个字符串必须**就是** locale 键本身 (排除值里出现 "en:" 的文本)
      if (!KEY_ONLY_RE.test(content.slice(r.start, r.end))) continue;
    } else {
      const prev = prevNonWs(content, idx);
      if (prev !== null && !KEY_PREV_OK.has(prev)) continue;   // `case 'zh-hk':` 之类不算键位
    }
    const colon = idx + km[0].length - 1;
    scopes.push({ locale: km[1], start: colon + 1, end: valueEnd(content, colon + 1, ranges) });
  }
  scopes.sort((a, b) => a.start - b.start || b.end - a.end);
  return { ranges, scopes, fileLocale };
}

/** 归属: 文件级 locale 优先; 否则取**最内层**包含 idx 的值作用域 */
function attrLocale(ctx, idx) {
  if (ctx.fileLocale) return ctx.fileLocale;
  let best = null;
  for (const s of ctx.scopes) {
    if (s.start <= idx && idx < s.end && (!best || s.start > best.start)) best = s;
  }
  return best ? best.locale : null;
}

function scanBidirectional(content, file) {
  const ctx = buildLocaleScopes(content, file);
  const hits = [];
  for (const rule of BIDIRECTIONAL_RULES) {
    const re = rule.chars
      ? new RegExp(`[${rule.chars}]`, 'g')
      : new RegExp(rule.pattern.source, rule.pattern.flags.includes('g') ? rule.pattern.flags : rule.pattern.flags + 'g');
    let m;
    while ((m = re.exec(content)) !== null) {
      if (m.index === re.lastIndex) re.lastIndex++;
      const r = rangeAt(ctx.ranges, m.index);
      if (!r || r.type !== 'string') continue;               // 只扫「值」(字符串字面量)
      const loc = attrLocale(ctx, m.index);
      if (!loc || !rule.locales.includes(loc)) continue;     // 无 locale 归属 -> 不报
      hits.push({
        file: path.relative(process.cwd(), file).replace(/\\/g, '/'),
        line: common.findLineNumber(content, m.index),
        match: `${m[0]} (locale=${loc})`,
        char: m[0],
        severity: rule.severity,
        ruleId: rule.id,
        ruleName: rule.name,
        fix: rule.fix,
        // 既有一向窄集命中: 属改造前已 red 的存量, 不进专用基线 (不得借基线掩盖既有 red)
        legacyRed: rule.id === 'I18N_POLLUTION' && LEGACY_POLLUTION_CHARS.has(m[0]),
      });
    }
  }
  return hits;
}

async function scan(files) {
  const allHits = [];
  const bidiAll = [];
  for (const file of files) {
    if (common.isExemptPath(file)) continue;  // i18n 跨语言污染在 SOP 文档也需查

    let content;
    try {
      content = require('fs').readFileSync(file, 'utf-8');
    } catch (e) { continue; }

    // 标准规则扫描 (排除需要自定义逻辑的三条 + 需文件作用域的规则)
    const customIds = ['I18N_TITLE_LENGTH', 'I18N_POLLUTION', 'I18N_CURRENCY', 'I18N_FOOD_BOXES_CROSS'];
    for (const rule of RULES.filter(r => !customIds.includes(r.id))) {
      const hits = common.scanRule(content, file, rule);
      allHits.push(...hits);
    }

    // I18N_FOOD_BOXES_CROSS 只对 sku-seo-data 有效
    // (2026-09-13: 原模式 /food-boxes.*[一-鿿]{20,}/ 在 blog-data 上必然误报 —— 文章里出现 food-boxes 内链
    //  + 中文正文即命中; 该规则的历史目标是 sku-seo-data 的 food-boxes 段, 故按文件作用域收窄)
    if (/sku-seo-data/.test(file)) {
      const fb = RULES.find(r => r.id === 'I18N_FOOD_BOXES_CROSS');
      allHits.push(...common.scanRule(content, file, fb));
    }

    // ★ 双向跨语言污染 (2026-09-19): zh-hk 简体专用字形 / ja 简体专用字形 / en 含 CJK
    // 位置刻意保持在**原 v1 pollution 的位置** (food-boxes 之后 / 币种之前):
    // check-regression-guard.js 的品牌存量基线是「按文件预算 + 先到先扣」,
    // 命中在本数组中的次序会决定谁吃到该文件的剩余预算 ⇒ 换位会改变 red 构成
    // (实测: 把 bidi 挪到数组末尾, zh-hk.json 的 4 笔 v1 命中拿不到品牌预算, red 4→6)。
    const bidi = scanBidirectional(content, file);
    for (const h of bidi) h[BIDI] = true;
    allHits.push(...bidi);
    bidiAll.push(...bidi);

    // locale 作用域: 币种统一 -> 只看 zh-hk 字段
    const currency = RULES.find(r => r.id === 'I18N_CURRENCY');
    allHits.push(...scanLocaleScoped(content, file, currency, ['zh-hk']));

    // title 长度自定义检查 (2026-09-15: 白名单文件 = 真实 SEO title 数据源, 排除 page.tsx 组件文案误报)
    if (TITLE_LENGTH_FILES.some((f) => file.includes(f))) {
      const titleHits = checkTitleLength(content, file);
      allHits.push(...titleHits);
    }
  }
  // ★ 专用基线通道 (只作用于双向污染三条规则): 存量只许递减;
  //   超出基线的部分才作为新增缺陷返回 (red 硬拦); 其余规则命中一律原样透传
  const keptBidi = new Set(applyI18nBaseline(bidiAll));
  return allHits.filter(h => !h[BIDI] || keptBidi.has(h));
}

// ============================================================================
// ★ 专用基线通道 (比照门童 #20 .hermes/meta-baseline.json 模式)
// ============================================================================
// 为什么必须自带基线、不共用 check-regression-guard.js 的全局 perFile 预算:
//   后者(品牌基线)是「先到先扣」, 且按**文件**记账、不分规则 —— 门童 #4 扩维后的存量命中
//   会在 products.ts / sku-seo-data.ts 等大文件上错扣品牌预算, 或反之拿不到豁免而拦死全站。
// 语义:
//   · 存量**只许递减**; 超出 perFile 基线的部分 = 新增缺陷 (red)
//   · **既有一向窄集命中 (legacyRed) 永不进基线** —— 基线不得掩盖改造前已 red 的存量
//   · baseline.total 与实测不符时打印告警 (基线必须来自规则落地后的实测命中数)
const I18N_BASELINE_FILE = path.join(__dirname, '..', '..', '.hermes', 'i18n-pollution-baseline.json');

function loadI18nBaseline() {
  try {
    const b = JSON.parse(fs.readFileSync(I18N_BASELINE_FILE, 'utf8'));
    return { total: b.total || 0, perFile: b.perFile || {}, recordedAt: b.recordedAt || null };
  } catch (e) {
    return { total: 0, perFile: {}, recordedAt: null };
  }
}

/** 状态汇总 (供报告引用): 实测命中 N -> 基线 N, 剩余待修, 本次新增 */
function baselineStatus(hitsAll) {
  const b = loadI18nBaseline();
  const per = {};
  for (const h of hitsAll) per[h.file] = (per[h.file] || 0) + 1;
  const rows = [];
  let remaining = 0, excessTotal = 0;
  for (const f of new Set([...Object.keys(b.perFile), ...Object.keys(per)])) {
    const allowed = b.perFile[f] || 0;
    const now = per[f] || 0;
    const left = Math.max(0, allowed - now);
    const excess = Math.max(0, now - allowed);
    remaining += left;
    excessTotal += excess;
    rows.push({ file: f, allowed, now, left, excess });
  }
  return { baselineTotal: b.total, nowTotal: hitsAll.length, remaining, excessTotal, rows };
}

function applyI18nBaseline(hits) {
  const b = loadI18nBaseline();
  const legacyRed = hits.filter(h => h.legacyRed);
  const rest = hits.filter(h => !h.legacyRed);
  if (b.total === 0) {
    console.log(`ℹ️ 门童 #4 双向污染存量: 基线 0 (无基线档), 现存 ${hits.length} (其中既有内向 red ${legacyRed.length}), 全部裸报`);
    return hits;
  }
  const allowance = { ...b.perFile };
  const kept = [];
  for (const h of rest) {
    const left = allowance[h.file] || 0;
    if (left > 0) { allowance[h.file] = left - 1; continue; }
    kept.push(h);
  }
  kept.push(...legacyRed);          // 既有 red 永远保留 (基线不掩盖既有 red)
  const newlyExempt = rest.length - kept.length + legacyRed.length;
  console.log(
    `ℹ️ 门童 #4 双向污染存量基线: 实测命中 ${hits.length} → 基线 ${b.total}` +
    ` (录于 ${b.recordedAt || '未标注'}); 本次基线内豁免 ${newlyExempt}` +
    `, 既有内向 red 保留 ${legacyRed.length}, ★新增缺陷 ${kept.length - legacyRed.length}`
  );
  if (b.total !== hits.length) {
    console.log(`   ⚠️ 实测(${hits.length}) ≠ 基线(${b.total}) ⇒ 存量${hits.length < b.total ? '已递减 ' + (b.total - hits.length) + ' 条 (可将基线同步下调)' : '反增 ' + (hits.length - b.total) + ' 条 (须核查是否新增污染)'}`);
  }
  return kept;
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

module.exports = {
  scan,
  RULES,
  EN_FORBIDDEN_RULES,
  JA_FORBIDDEN_RULES,
  // 双向化 (2026-09-19) 导出: 供 scripts/test-i18n-pollution-bidirectional.js 直接驱动裸扫
  BIDIRECTIONAL_RULES,
  SIMP_ZH: SIMP_ZH_CLEAN,
  SIMP_JA,
  JA_SHINJITAI: JA_SHINJITAI_CLEAN,
  LEGACY_POLLUTION_CHARS,
  scanBidirectional,
  scanLocaleScoped,
  applyI18nBaseline,
  loadI18nBaseline,
  baselineStatus,
  I18N_BASELINE_FILE,
};

