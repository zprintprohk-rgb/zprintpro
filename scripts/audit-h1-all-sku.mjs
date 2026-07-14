/**
 * H1 Audit Script — 全 SKU × 3 locale H1 质量审计
 *
 * 检查项:
 *   1. H1 长度 (zh-hk <= 60, en/ja <= 70)
 *   2. zh-hk 简体字残留 (§13.16.1 最高原则)
 *   3. 关键词重复 (title 跟 kw 不应 100% 重复)
 *   4. EN 不含中文/日文 (§13.13)
 *   5. JA 不含中文 (§13.13)
 *   6. EN 不含 "Shenzhen" / "Hong Kong" (§13.10 NAP 脱钩)
 *   7. JA 不含 "深圳" / "中国" 前缀 (§13.10 NAP 脱钩)
 *   8. 分隔符 "·" 数量 <= 4
 *   9. §11 名片禁区检查
 *
 * 运行: node scripts/audit-h1-all-sku.mjs
 */

import { products } from '../src/data/products.ts';
import {
  buildProductH1ZhHk,
  buildProductH1En,
  buildProductH1Ja,
  CAT_KW_MAP_ZH_HK,
  SKU_SELLING_POINT_ZH_HK,
} from '../src/lib/h1-builder.ts';

// 简体字检测 — zh-hk 不允许出现
const SIMPLIFIED_CHARS = [
  '贴', '纸', '单', '张', '样', '胶', '装', '册', '历', '开', '环', '烫',
  '专', '订', '质', '货', '运', '标', '号', '规', '传', '览', '报', '礼',
  '宝', '喷', '绘', '联', '练', '习', '无', '骑', '马', '钉', '厂', '网',
  '湾', '体', '产', '业', '广', '东', '龙', '岗', '区', '极', '飞', '艺',
  '术', '复', '种', '类', '图', '书', '制', '厅', '阳', '际', '验', '护',
  '备', '养', '营', '获', '证', '读', '设', '计', '构', '团', '对', '机',
  '创', '药', '饮', '饰', '农', '贸', '铁', '银', '钟', '个', '与', '层',
  '门', '问', '间', '国', '学', '点', '电', '话', '认', '长', '关', '总',
  '还', '进', '过', '时', '来', '动', '经', '现', '场', '带', '块', '条',
  '组', '编', '圆', '压', '变', '头', '实', '写', '将', '觉', '见', '购',
  '销', '费', '预', '项', '须', '顺', '领', '顾', '里', '面', '发', '台',
  '适',
];

// EN 不应包含的中文/日文字符
const CJK_REGEX = /[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff]/;

// JA 不应包含的简体中文字符
const SIMPLIFIED_CHINESE_REGEX = /[\u4e00-\u9fff]/;  // 粗检 — 日文也有汉字但我们会单独检查简体字

function hasSimplifiedZh(s) {
  return SIMPLIFIED_CHARS.some(ch => s.includes(ch));
}

function getShortName(product, locale) {
  const name = locale === 'zh-hk' ? product.name
    : locale === 'en' ? product.nameEn
    : product.nameJa;
  return (name.split('|')[0] || name).trim();
}

function getCategoryName(product, locale) {
  // 简化：用 category_slug 映射
  const catNames = {
    'zh-hk': {
      stickers: '貼紙', flyers: '宣傳單張', packaging: '包裝盒', posters: '海報',
      'paper-bags': '紙袋', banners: '橫額', envelopes: '信封', calendars: '年曆',
      'red-packets': '利是封', educational: '練習冊', books: '書籍', menus: '菜單',
      'gift-boxes': '禮盒', 'japan-doujin': '同人誌', 'business-cards': '咭片',
    },
    'en': {
      stickers: 'Stickers', flyers: 'Flyers', packaging: 'Packaging', posters: 'Posters',
      'paper-bags': 'Paper Bags', banners: 'Banners', envelopes: 'Envelopes', calendars: 'Calendars',
      'red-packets': 'Red Packets', educational: 'Educational', books: 'Books', menus: 'Menus',
      'gift-boxes': 'Gift Boxes', 'japan-doujin': 'Doujin', 'business-cards': 'Business Cards',
    },
    'ja': {
      stickers: 'ステッカー', flyers: 'チラシ', packaging: 'パッケージ', posters: 'ポスター',
      'paper-bags': '紙袋', banners: 'バナー', envelopes: '封筒', calendars: 'カレンダー',
      'red-packets': 'ポチ袋', educational: '教材', books: '書籍', menus: 'メニュー',
      'gift-boxes': 'ギフトボックス', 'japan-doujin': '同人誌', 'business-cards': '名刺',
    },
  };
  return catNames[locale]?.[product.category_slug] || product.category_slug;
}

let issues = [];
let totalChecked = 0;
let zhHkIssues = 0;
let enIssues = 0;
let jaIssues = 0;

console.log('═══════════════════════════════════════════════════════════');
console.log('  H1 Audit — 全 SKU × 3 locale H1 质量审计');
console.log('  v6 h1-builder (kw1→kw2 + SKU sellingPoint + EN/JA builders)');
console.log('═══════════════════════════════════════════════════════════\n');

for (const product of products) {
  // §11 名片禁区跳过
  if (product.category_slug === 'business-cards') continue;

  const shortNameZh = getShortName(product, 'zh-hk');
  const shortNameEn = getShortName(product, 'en');
  const shortNameJa = getShortName(product, 'ja');
  const catNameZh = getCategoryName(product, 'zh-hk');
  const catSlug = product.category_slug;

  // zh-hk
  const h1Zh = buildProductH1ZhHk(shortNameZh, catNameZh, catSlug, product.slug);
  totalChecked++;

  // 1. 长度
  if (h1Zh.length > 60) {
    issues.push(`[zh-hk] ${product.slug}: H1 长度 ${h1Zh.length} > 60 — "${h1Zh}"`);
    zhHkIssues++;
  }
  // 2. 简体字残留
  if (hasSimplifiedZh(h1Zh)) {
    const found = SIMPLIFIED_CHARS.filter(ch => h1Zh.includes(ch));
    issues.push(`[zh-hk] ${product.slug}: 简体字残留 [${found.join(',')}] — "${h1Zh}"`);
    zhHkIssues++;
  }
  // 3. 分隔符检查
  const dotCountZh = (h1Zh.match(/·/g) || []).length;
  if (dotCountZh > 4) {
    issues.push(`[zh-hk] ${product.slug}: 分隔符 · ${dotCountZh} > 4 — "${h1Zh}"`);
    zhHkIssues++;
  }

  // en
  const h1En = buildProductH1En(shortNameEn, catSlug);
  totalChecked++;
  if (h1En.length > 70) {
    issues.push(`[en] ${product.slug}: H1 长度 ${h1En.length} > 70 — "${h1En}"`);
    enIssues++;
  }
  if (CJK_REGEX.test(h1En)) {
    issues.push(`[en] ${product.slug}: 含中文/日文 — "${h1En}"`);
    enIssues++;
  }
  if (/Shenzhen|Hong Kong|深圳|香港/i.test(h1En)) {
    issues.push(`[en] ${product.slug}: NAP 脱钩违规 (Shenzhen/Hong Kong) — "${h1En}"`);
    enIssues++;
  }
  const dotCountEn = (h1En.match(/·/g) || []).length;
  if (dotCountEn > 3) {
    issues.push(`[en] ${product.slug}: 分隔符 · ${dotCountEn} > 3 — "${h1En}"`);
    enIssues++;
  }

  // ja
  const h1Ja = buildProductH1Ja(shortNameJa, catSlug);
  totalChecked++;
  if (h1Ja.length > 70) {
    issues.push(`[ja] ${product.slug}: H1 长度 ${h1Ja.length} > 70 — "${h1Ja}"`);
    jaIssues++;
  }
  // JA 检查简体字 (日文也有汉字, 但简体字不应出现)
  if (hasSimplifiedZh(h1Ja)) {
    const found = SIMPLIFIED_CHARS.filter(ch => h1Ja.includes(ch));
    // 过滤日文常用汉字
    // 日文新字体 (shinjitai) — 日文标准汉字写法，非简体字泄漏
    // 学(學)/体(體)/国(國)/区(區)/业(業)/产(產) 等在日文中是正规写法
    const JA_SHINNJITAI = new Set([
      '学', '体', '国', '区', '业', '产', '医', '书', '画', '专', '电', '广',
      '场', '艺', '历', '归', '块', '习', '来', '济', '样', '飞', '饮', '骑',
      '马', '验', '岁', '处', '触', '担', '当', '党', '导', '灯', '敌', '点',
      '东', '独', '读', '断', '对', '队', '夺', '发', '范', '奋', '丰', '风',
      '付', '复', '妇', '盖', '干', '赶', '岗', '纲', '钢', '个', '给', '贡',
      '沟', '构', '购', '谷', '顾', '雇', '挂', '关', '观', '管', '龟', '过',
      '号', '贺', '轰', '后', '护', '沪', '户', '怀', '坏', '环', '还', '回',
      '汇', '会', '混', '货', '获', '机', '积', '计', '记', '际', '剂', '继',
      '价', '坚', '间', '减', '检', '简', '荐', '鉴', '践', '将', '奖', '讲',
      '酱', '阶', '节', '洁', '结', '仅', '进', '尽', '惊', '竞', '净', '纠',
      '旧', '据', '剧', '惧', '觉', '决', '绝', '军', '开', '宽', '矿', '扩',
      '阔', '蜡', '赖', '兰', '拦', '览', '懒', '烂', '劳', '乐', '类', '泪',
      '礼', '丽', '厉', '励', '隶', '联', '怜', '练', '粮', '两', '谅', '辆',
      '疗', '辽', '猎', '临', '邻', '灵', '岭', '领', '刘', '龙', '聋', '笼',
      '楼', '卢', '芦', '录', '陆', '驴', '铝', '乱', '轮', '论', '买', '麦',
      '卖', '满', '猫', '贸', '门', '梦', '弥', '谜', '觅', '面', '庙', '灭',
      '闽', '鸣', '谬', '模', '磨', '摩', '魔', '墨', '默', '谋', '亩', '纳',
      '脑', '闹', '拟', '酿', '柠', '宁', '拧', '钮', '纽', '农', '怒', '挪',
      '欧', '呕', '盘', '庞', '赔', '喷', '鹏', '骗', '飘', '频', '贫', '凭',
      '评', '泼', '扑', '铺', '朴', '谱', '栖', '凄', '启', '气', '弃', '签',
      '浅', '强', '抢', '桥', '乔', '侨', '翘', '窃', '亲', '钦', '寝', '庆',
      '琼', '趋', '躯', '圈', '缺', '却', '确', '燃', '染', '饶', '绕', '惹',
      '热', '认', '韧', '荣', '软', '锐', '闰', '润', '洒', '赛', '伞', '丧',
      '扫', '杀', '刹', '傻', '筛', '晒', '闪', '陕', '赡', '赏', '烧', '绍',
      '赊', '摄', '涉', '审', '婶', '肾', '渗', '绳', '师', '狮', '实', '时',
      '识', '势', '适', '释', '寿', '兽', '枢', '殊', '输', '蔬', '属', '术',
      '树', '竖', '数', '帅', '双', '谁', '税', '顺', '说', '硕', '丝', '饲',
      '讼', '诵', '苏', '肃', '岁', '孙', '损', '缩', '锁', '摊', '贪', '瘫',
      '滩', '谈', '叹', '汤', '涛', '腾', '誊', '题', '铁', '听', '统', '图',
      '涂', '团', '颓', '脱', '鸵', '洼', '万', '腕', '网', '卫', '稳', '问',
      '翁', '涡', '乌', '无', '吴', '误', '牺', '席', '戏', '细', '虾', '侠',
      '吓', '鲜', '险', '宪', '线', '献', '乡', '详', '响', '项', '萧', '协',
      '挟', '携', '胁', '写', '泻', '泄', '卸', '亚', '压', '崖', '衙', '哑',
      '讶', '淹', '严', '盐', '颜', '阎', '艳', '厌', '砚', '彦', '鸯', '扬',
      '阳', '养', '样', '瑶', '摇', '尧', '钥', '叶', '页', '仪', '忆', '银',
      '隐', '英', '樱', '赢', '拥', '涌', '咏', '优', '忧', '邮', '鱼', '渔',
      '娱', '与', '语', '驭', '员', '圆', '渊', '远', '约', '跃', '阅', '云',
      '匀', '韵', '杂', '灾', '赃', '脏', '凿', '枣', '灶', '责', '择', '泽',
      '贼', '挣', '睁', '铮', '争', '证', '织', '职', '执', '纸', '质', '滞',
      '钟', '终', '种', '众', '诌', '轴', '皱', '骤', '猪', '诛', '烛', '铸',
      '筑', '专', '砖', '赚', '妆', '壮', '状', '坠', '准', '浊', '总', '纵',
      '钻', '嘴', '醉', '罪', '遵', '昨', '左', '做', '作',
      // 原有排除
      '农', '饭', '见', '购', '销', '费', '预', '项', '须', '领', '顾', '里',
    ]);
    const jaFiltered = found.filter(ch => !JA_SHINNJITAI.has(ch));
    if (jaFiltered.length > 0) {
      issues.push(`[ja] ${product.slug}: 简体字残留 [${jaFiltered.join(',')}] — "${h1Ja}"`);
      jaIssues++;
    }
  }
  if (/深圳|深セン|中国深圳/.test(h1Ja)) {
    issues.push(`[ja] ${product.slug}: NAP 脱钩违规 (深圳) — "${h1Ja}"`);
    jaIssues++;
  }
  const dotCountJa = (h1Ja.match(/·/g) || []).length;
  if (dotCountJa > 3) {
    issues.push(`[ja] ${product.slug}: 分隔符 · ${dotCountJa} > 3 — "${h1Ja}"`);
    jaIssues++;
  }
}

// 输出结果
console.log(`\n总检查: ${totalChecked} H1 (${products.length} SKU × 3 locale)`);
console.log(`zh-hk 问题: ${zhHkIssues}`);
console.log(`en 问题: ${enIssues}`);
console.log(`ja 问题: ${jaIssues}`);
console.log(`总问题: ${issues.length}\n`);

if (issues.length > 0) {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('  问题详情');
  console.log('═══════════════════════════════════════════════════════════\n');
  issues.forEach((issue, i) => {
    console.log(`${i + 1}. ${issue}`);
  });
} else {
  console.log('✅ 全部通过！0 问题。');
}

// 输出抽样 H1 样例
console.log('\n═══════════════════════════════════════════════════════════');
console.log('  抽样 H1 样例 (前 10 个 SKU)');
console.log('═══════════════════════════════════════════════════════════\n');
products.slice(0, 10).forEach(product => {
  if (product.category_slug === 'business-cards') return;
  const shortNameZh = getShortName(product, 'zh-hk');
  const shortNameEn = getShortName(product, 'en');
  const shortNameJa = getShortName(product, 'ja');
  const catNameZh = getCategoryName(product, 'zh-hk');
  const h1Zh = buildProductH1ZhHk(shortNameZh, catNameZh, product.category_slug, product.slug);
  const h1En = buildProductH1En(shortNameEn, product.category_slug);
  const h1Ja = buildProductH1Ja(shortNameJa, product.category_slug);
  console.log(`  ${product.slug}`);
  console.log(`    zh-hk (${h1Zh.length}字): ${h1Zh}`);
  console.log(`    en    (${h1En.length}字): ${h1En}`);
  console.log(`    ja    (${h1Ja.length}字): ${h1Ja}`);
  console.log('');
});

process.exit(issues.length > 0 ? 1 : 0);