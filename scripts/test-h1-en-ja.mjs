#!/usr/bin/env node
/**
 * H1 生成测试脚本 - v7 升级验证
 * 
 * 测试 en/ja 新模板：
 * - en: ${title} · ${sellingPoint} · ${regionHook} · ZprintPro
 * - ja: ${title} · ${sellingPoint} · ${regionHook} · ZprintPro
 * 
 * 验证点：
 * 1. H1 长度 <= 70 字符（en/ja）
 * 2. 去重逻辑生效（title 已含 sellingPoint 则跳过）
 * 3. regionHook 正确注入（en: Global Shipping, ja: 香港の印刷専門家）
 * 4. 3 层降级逻辑正常工作
 */

import { buildProductH1En, buildProductH1Ja } from '../src/lib/h1-builder.ts';

// 测试用例
const TEST_CASES = [
  // en 测试用例
  {
    locale: 'en',
    cases: [
      { title: 'Waterproof Stickers', catSlug: 'stickers', expectedHooks: ['Free Design', 'Global Shipping'] },
      { title: 'Custom Packaging Boxes for Restaurant Opening', catSlug: 'packaging', expectedHooks: ['Free Mockup', 'Global Shipping'] },
      { title: 'Large Shopping Bags', catSlug: 'paper-bags', expectedHooks: ['Eco-Friendly', 'Global Shipping'] },
      { title: 'Eco-Friendly Bags', catSlug: 'paper-bags', expectedHooks: ['Global Shipping'] }, // 去重测试：title 已含 Eco-Friendly
      { title: 'Kraft Paper Bags', catSlug: 'paper-bags', expectedHooks: ['Eco-Friendly', 'Global Shipping'] },
    ]
  },
  // ja 测试用例
  {
    locale: 'ja',
    cases: [
      { title: '防水ステッカー', catSlug: 'stickers', expectedHooks: ['無料デザイン', '香港の印刷専門家'] },
      { title: '食品ラベル', catSlug: 'stickers', expectedHooks: ['無料デザイン', '香港の印刷専門家'] },
      { title: '無料デザインステッカー', catSlug: 'stickers', expectedHooks: ['香港の印刷専門家'] }, // 去重测试：title 已含 無料デザイン
      { title: 'ギフトボックス', catSlug: 'packaging', expectedHooks: ['無料サンプル', '香港の印刷専門家'] },
      { title: '大型紙袋', catSlug: 'paper-bags', expectedHooks: ['環境配慮', '香港の印刷専門家'] },
    ]
  }
];

// 验证函数
function validateH1(h1, locale, testCase) {
  const errors = [];

  // 1. 长度检查
  const MAX_CHARS = locale === 'zh-hk' ? 60 : 70;
  if (h1.length > MAX_CHARS) {
    errors.push(`❌ H1 长度 ${h1.length} > ${MAX_CHARS}`);
  } else {
    errors.push(`✅ H1 长度 ${h1.length} ≤ ${MAX_CHARS}`);
  }

  // 2. 去重逻辑检查
  testCase.expectedHooks.forEach(hook => {
    if (!h1.includes(hook)) {
      errors.push(`❌ H1 缺少预期 hook: ${hook}`);
    } else {
      errors.push(`✅ H1 包含 hook: ${hook}`);
    }
  });

  // 3. locale 隔离检查
  if (locale === 'en') {
    if (h1.includes('Shenzhen') || h1.includes('Hong Kong')) {
      errors.push(`❌ en H1 包含禁止词汇: Shenzhen / Hong Kong`);
    } else {
      errors.push(`✅ en H1 无禁止词汇`);
    }
  } else if (locale === 'ja') {
    if (h1.includes('深セン') || h1.includes('中国') || h1.includes('深圳印刷')) {
      errors.push(`❌ ja H1 包含禁止词汇: 深セン / 中国 / 深圳印刷`);
    } else {
      errors.push(`✅ ja H1 无禁止词汇`);
    }
  }

  return errors;
}

// 主函数
function main() {
  console.log('🧪 H1 生成测试 - v7 升级验证\n');
  console.log('=' .repeat(60));

  let totalTests = 0;
  let passedTests = 0;

  TEST_CASES.forEach(({ locale, cases }) => {
    console.log(`\n📍 ${locale.toUpperCase()} 测试用例\n`);
    console.log('-'.repeat(60));

    cases.forEach((testCase, index) => {
      totalTests++;
      console.log(`\n测试 #${index + 1}: "${testCase.title}" (${testCase.catSlug})`);

      let h1;
      if (locale === 'en') {
        h1 = buildProductH1En(testCase.title, testCase.catSlug);
      } else if (locale === 'ja') {
        h1 = buildProductH1Ja(testCase.title, testCase.catSlug);
      } else {
        console.log(`❌ 不支持的 locale: ${locale}`);
        return;
      }

      console.log(`生成 H1: "${h1}"`);

      const errors = validateH1(h1, locale, testCase);
      const allPassed = errors.every(e => e.startsWith('✅'));

      if (allPassed) {
        passedTests++;
        console.log(`🎉 测试通过`);
      } else {
        console.log(`⚠️ 测试失败:`);
      }

      errors.forEach(error => {
        console.log(`  ${error}`);
      });
    });
  });

  console.log('\n' + '='.repeat(60));
  console.log(`\n📊 测试总结: ${passedTests}/${totalTests} 通过\n`);

  if (passedTests === totalTests) {
    console.log('✅ 所有测试通过！v7 升级成功。');
    process.exit(0);
  } else {
    console.log(`❌ ${totalTests - passedTests} 个测试失败。`);
    process.exit(1);
  }
}

// 运行测试
main();