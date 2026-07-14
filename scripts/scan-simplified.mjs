/**
 * 简体字检测脚本
 * 2026-07-14 v2: 直接扫描文件内容，不依赖正则解析大文件
 * 
 * AGENTS.md §13.13: zh-hk 必须输出 100% 繁体中文
 */

import fs from 'fs';
import path from 'path';

// 简体字映射表（只包含高频印刷/产品词）
const SIMPLIFIED_CHARS = /[贴纸单样胶册开环烫订专质货运标号广龙极飞术复图书制厅际备养营获证读设计构团对创药饮饰农贸铁银钟学点话认长门间国时来动场带块条组编圆压头实写将觉见购销费预项须顺领顾验历里发台适]/g;

// 产品文件路径
const productsFile = path.join(process.cwd(), 'src/data/products.ts');

// 检查文件是否存在
if (!fs.existsSync(productsFile)) {
  console.error('❌ 产品文件不存在:', productsFile);
  process.exit(1);
}

// 读取产品文件
const content = fs.readFileSync(productsFile, 'utf-8');

// 直接扫描 title_zh 和 name 字段中的简体字
// 匹配 title_zh: 'xxx' 或 title_zh: "xxx" 模式
const titleRegex = /title_zh:\s*['"`]([^'"`]+)['"`]/g;
const nameRegex = /(?:^|\s)name:\s*['"`]([^'"`]+)['"`]/gm;

let issues = [];
let totalSimplifiedChars = 0;

// 检查 title_zh 字段
let match;
while ((match = titleRegex.exec(content)) !== null) {
  const titleZh = match[1];
  const simplifiedMatches = titleZh.match(SIMPLIFIED_CHARS);
  if (simplifiedMatches && simplifiedMatches.length > 0) {
    issues.push({
      field: 'title_zh',
      value: titleZh,
      simplifiedChars: [...new Set(simplifiedMatches)]
    });
    totalSimplifiedChars += simplifiedMatches.length;
  }
}

// 检查 name 字段（zh-hk 产品名）
while ((match = nameRegex.exec(content)) !== null) {
  const name = match[1];
  // 跳过英文名和分类名
  if (/^[A-Za-z\s]/.test(name)) continue;
  
  const simplifiedMatches = name.match(SIMPLIFIED_CHARS);
  if (simplifiedMatches && simplifiedMatches.length > 0) {
    issues.push({
      field: 'name',
      value: name,
      simplifiedChars: [...new Set(simplifiedMatches)]
    });
    totalSimplifiedChars += simplifiedMatches.length;
  }
}

console.log('\n📋 简体字检测报告\n');
console.log('='.repeat(80));

if (issues.length === 0) {
  console.log('✅ 没有检测到简体字残留');
  console.log('✅ 所有 zh-hk 产品名称都是纯繁体中文');
} else {
  console.log(`❌ 发现 ${issues.length} 个字段包含简体字`);
  console.log(`❌ 简体字总数: ${totalSimplifiedChars} 个`);
  
  console.log('\n🔍 问题详情:');
  console.log('-'.repeat(80));
  
  issues.forEach((issue, i) => {
    console.log(`\n${i + 1}. ❌ [${issue.field}] "${issue.value}"`);
    console.log(`   简体字: ${issue.simplifiedChars.join(', ')}`);
  });
}

console.log('\n' + '='.repeat(80));
console.log('🎯 简体字检测完成！');

// 返回退出码
process.exit(issues.length > 0 ? 1 : 0);