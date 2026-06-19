#!/usr/bin/env node
/**
 * audit-nap.ts — zprintpro-nextjs NAP / 数据完整性审计
 *
 * 4 维度检查 (R1-R3 今晚落地, R4-R5 明天加):
 *   R1: products.ts 顶部 docstring SKU 数字 === products.length
 *   R2: 每 SKU 必含 "ISO 9001" (在 descriptionEn || longDescriptionEn)
 *   R3: 每 SKU 必有 longDescriptionJa (>= 50 字符)
 *   R4: formatPriceForLocale 被导入次数 >= 4 [DEFER]
 *   R5: src/** 非 zh-hk 内容文件无裸 HK$ [DEFER]
 *
 * 用法:   npx tsx scripts/audit-nap.ts
 * 挂载:   package.json scripts.audit = "tsx scripts/audit-nap.ts"
 * 退出码: 0 = all pass, 1 = any fail, 2 = crash
 *
 * 设计: TypeScript AST 解析 products.ts (绕过 @/ alias 在 scripts/ 上下文不解析的问题)
 *
 * 设计哲学 (1 句话):
 *   数据完整性靠 CI 强制, 不靠人手抠。 这一脚本是 Layer 1 兜底,
 *   真正的根治是 TypeScript required 字段 (Layer 3)。
 */

import * as ts from 'typescript';
import { readFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(__dirname, '..');
const PRODUCTS_TS = join(ROOT, 'src', 'data', 'products.ts');

// ---------------------------------------------------------------------------
// 数据模型
// ---------------------------------------------------------------------------

interface ProductInfo {
  id: string;
  sku_code: string;
  descriptionEn: string;
  longDescriptionEn: string;
  longDescriptionJa: string;
}

interface CheckResult {
  rule: string;
  pass: boolean;
  message: string;
  missing?: string[];
}

const results: CheckResult[] = [];

// ---------------------------------------------------------------------------
// AST 解析: 从 products.ts 提取 products[]
// ---------------------------------------------------------------------------

const INTERESTING_FIELDS = new Set([
  'id',
  'sku_code',
  'descriptionEn',
  'longDescriptionEn',
  'longDescriptionJa',
]);

/**
 * 提取字符串字面量值, 支持 3 种 AST 节点:
 *   - ts.StringLiteral              ('foo')
 *   - ts.NoSubstitutionTemplateLiteral (`foo`)
 *   - ts.TemplateExpression         (`foo${bar}baz`) — 仅取 head.text
 */
function getStringValue(node: ts.Node | undefined): string {
  if (!node) return '';
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text;
  }
  if (ts.isTemplateExpression(node)) {
    return node.head.text;
  }
  return '';
}

function parseProducts(content: string): ProductInfo[] {
  const sf = ts.createSourceFile('products.ts', content, ts.ScriptTarget.Latest, true);
  const products: ProductInfo[] = [];

  function walk(node: ts.Node): void {
    if (ts.isVariableStatement(node)) {
      for (const decl of node.declarationList.declarations) {
        if (
          ts.isIdentifier(decl.name) &&
          decl.name.text === 'products' &&
          decl.initializer &&
          ts.isArrayLiteralExpression(decl.initializer)
        ) {
          for (const el of decl.initializer.elements) {
            if (!ts.isObjectLiteralExpression(el)) continue;
            const info: ProductInfo = {
              id: '',
              sku_code: '',
              descriptionEn: '',
              longDescriptionEn: '',
              longDescriptionJa: '',
            };
            for (const prop of el.properties) {
              if (!ts.isPropertyAssignment(prop)) continue;
              if (!ts.isIdentifier(prop.name)) continue;
              const field = prop.name.text;
              if (!INTERESTING_FIELDS.has(field)) continue;
              (info as Record<string, string>)[field] = getStringValue(prop.initializer);
            }
            if (info.sku_code) products.push(info);
          }
        }
      }
    }
    ts.forEachChild(node, walk);
  }

  walk(sf);
  return products;
}

// ---------------------------------------------------------------------------
// R1: docstring SKU 数字 vs products.length
// ---------------------------------------------------------------------------

function checkR1(content: string, products: ProductInfo[]): void {
  // 只检查文件顶部 200 行内的 docstring / 注释
  // (避免中后段代码注释里的其他 SKU 数字干扰, 例如 line 17389 的 "78 个 SKU 描述" 是 sku-seo-data 旧值)
  const header = content.split('\n').slice(0, 200).join('\n');
  const matches = [...header.matchAll(/(\d+)\s*个\s*SKU/gi)];
  if (matches.length === 0) {
    results.push({
      rule: 'R1: docstring SKU count vs array length',
      pass: false,
      message: '未找到顶部 docstring 中的 SKU 数量声明 (期望格式: "N个SKU")',
    });
    return;
  }

  const declaredValues = [...new Set(matches.map((m) => parseInt(m[1], 10)))];
  const actual = products.length;

  if (declaredValues.length > 1) {
    results.push({
      rule: 'R1: docstring SKU count vs array length',
      pass: false,
      message: `顶部 docstring 内 SKU 数字不一致: ${declaredValues.join(' / ')}`,
    });
    return;
  }

  const declared = declaredValues[0];
  results.push({
    rule: 'R1: docstring SKU count vs array length',
    pass: declared === actual,
    message: `声明 ${declared} SKU, 实际 ${actual} SKU`,
  });
}

// ---------------------------------------------------------------------------
// R2: 每 SKU 必含 "ISO 9001" (EN 字段)
// ---------------------------------------------------------------------------

function checkR2(products: ProductInfo[]): void {
  const missing = products
    .filter((p) => !/ISO\s*9001/i.test(`${p.descriptionEn} ${p.longDescriptionEn}`))
    .map((p) => p.sku_code);
  results.push({
    rule: 'R2: ISO 9001 coverage (EN fields)',
    pass: missing.length === 0,
    message: `${products.length - missing.length}/${products.length} SKU 含 ISO 9001 (${missing.length} 缺失)`,
    missing,
  });
}

// ---------------------------------------------------------------------------
// R3: 每 SKU 必有 longDescriptionJa (>= 50 字符)
// ---------------------------------------------------------------------------

function checkR3(products: ProductInfo[]): void {
  const missing = products
    .filter((p) => !p.longDescriptionJa || p.longDescriptionJa.length < 50)
    .map((p) => p.sku_code);
  results.push({
    rule: 'R3: longDescriptionJa completeness (>= 50 chars)',
    pass: missing.length === 0,
    message: `${products.length - missing.length}/${products.length} SKU 有完整 longDescriptionJa (${missing.length} 缺失)`,
    missing,
  });
}

// ---------------------------------------------------------------------------
// 输出
// ---------------------------------------------------------------------------

function printResults(): void {
  console.log('\n=== zprintpro-nextjs NAP Audit ===\n');
  for (const r of results) {
    const icon = r.pass ? '[PASS]' : '[FAIL]';
    console.log(`${icon} ${r.rule}`);
    console.log(`        ${r.message}`);
    if (r.missing && r.missing.length > 0) {
      const list =
        r.missing.length <= 30
          ? r.missing.join(', ')
          : `${r.missing.slice(0, 30).join(', ')} ... (共 ${r.missing.length} 个)`;
      console.log(`        缺失 SKU: ${list}`);
    }
    console.log('');
  }
  console.log('[DEFER] R4: formatPriceForLocale wiring check (>= 4 import sites) — Layer 2 明天加');
  console.log('[DEFER] R5: src/** HK$ literal in non-zh-hk content — Layer 2 明天加');
  console.log('');
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------

function main(): void {
  const content = readFileSync(PRODUCTS_TS, 'utf-8');
  const products = parseProducts(content);

  if (products.length === 0) {
    console.error('[CRASH] AST 解析 products[] 失败, 返回 0 条。 请检查 products.ts 结构是否变化。');
    process.exit(2);
  }

  checkR1(content, products);
  checkR2(products);
  checkR3(products);

  printResults();

  const failed = results.filter((r) => !r.pass);
  if (failed.length === 0) {
    console.log('[OK] R1-R3 all passed. Layer 2 可开工。');
    process.exit(0);
  } else {
    console.log(`[FAIL] ${failed.length} check(s) failed. 下面是 Layer 2 工作清单:`);
    for (const r of failed) {
      if (r.missing && r.missing.length > 0) {
        console.log(`  - ${r.rule}: ${r.missing.length} 个 SKU 待修`);
      }
    }
    process.exit(1);
  }
}

try {
  main();
} catch (e) {
  console.error('[CRASH] audit-nap 未捕获异常:', e);
  process.exit(2);
}
