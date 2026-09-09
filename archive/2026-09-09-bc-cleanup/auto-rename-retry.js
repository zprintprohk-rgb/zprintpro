/**
 * 自动重命名重试脚本 - 对失败图片使用更激进的OCR策略
 * 用法: node auto-rename-retry.js
 */

const { createWorker } = require('tesseract.js');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMG_DIR = 'seedream-downloads';

// 解析所有 SKU 的价格映射
function buildPriceMap() {
  const content = fs.readFileSync('seedream-prompts-all-skus.txt', 'utf8');
  const blocks = content.split(/========== /).slice(1);
  const map = [];
  for (const block of blocks) {
    const header = block.split('\n')[0].replace(/=+$/, '').trim();
    const [skuId, slug] = header.split(' | ').map(s => s.trim());
    const pricesLine = block.match(/Prices:\s*(.+)/)?.[1]?.trim();
    if (!pricesLine) continue;
    const zhMatch = pricesLine.match(/ZH=(HK\$[\d,-]+)/);
    const enMatch = pricesLine.match(/EN=\$([\d,-]+)/);
    const jaMatch = pricesLine.match(/JA=¥([\d,-]+)/);
    map.push({
      skuId, slug,
      zh: { price: zhMatch?.[1] || '', currency: 'HK$', seo: block.match(/SEO Filename ZH:\s*(.+)/)?.[1]?.trim() },
      en: { price: enMatch?.[1] || '', currency: '$', seo: block.match(/SEO Filename EN:\s*(.+)/)?.[1]?.trim() },
      ja: { price: jaMatch?.[1] || '', currency: '¥', seo: block.match(/SEO Filename JA:\s*(.+)/)?.[1]?.trim() },
    });
  }
  return map;
}

// OCR 识别（多种裁剪策略）
async function recognizeWithStrategies(worker, imagePath) {
  const strategies = [
    // 策略1: 右上角标签（原始）
    { left: 1100, top: 50, width: 900, height: 450, preprocess: 'threshold' },
    // 策略2: 更宽的右上角区域
    { left: 1000, top: 30, width: 1000, height: 500, preprocess: 'threshold' },
    // 策略3: 仅顶部中间（有些标签偏左）
    { left: 600, top: 50, width: 1400, height: 400, preprocess: 'normalize' },
    // 策略4: 全图上部 1/3
    { left: 0, top: 0, width: 2048, height: 700, preprocess: 'normalize' },
  ];
  
  let bestText = '';
  let bestLength = 0;
  
  for (const strat of strategies) {
    const tempPath = 'ocr-retry-' + Date.now() + '.png';
    let pipeline = sharp(imagePath).extract(strat);
    
    if (strat.preprocess === 'threshold') {
      pipeline = pipeline.greyscale().threshold(180);
    } else {
      pipeline = pipeline.greyscale().normalize();
    }
    
    await pipeline.toFile(tempPath);
    const ret = await worker.recognize(tempPath);
    
    try { fs.unlinkSync(tempPath); } catch {}
    
    if (ret.data.text.length > bestLength) {
      bestLength = ret.data.text.length;
      bestText = ret.data.text;
    }
  }
  
  return bestText;
}

// 从 OCR 文本中提取语言和 SKU（更宽松的匹配）
function detectLangAndSku(text, priceMap) {
  text = text.replace(/\s+/g, ' ').trim();
  
  // 判断语言 - 更宽松
  let lang = null;
  if (/HK\$|HK\s*\$|港幣|張起/.test(text)) {
    lang = 'zh-hk';
  } else if (/¥|円|人気|無料|名刺|ステッカー|デザイン/.test(text)) {
    lang = 'ja';
  } else if (/\$\d+|From\s+\$|Hot\s+Sale|Free\s+Design|Business\s+Cards|Stickers/.test(text)) {
    lang = 'en';
  }
  
  if (!lang) return null;
  
  // 提取价格数字（更宽松）
  const priceMatches = text.match(/(?:HK\$|¥|\$)\s*([\d,.]+(?:\s*[-~～]\s*[\d,.]+)?)/g);
  
  // 匹配 SKU
  let bestMatch = null;
  let bestScore = 0;
  
  for (const sku of priceMap) {
    const entry = sku[lang];
    if (!entry || !entry.price) continue;
    
    let score = 0;
    const priceNum = entry.price.replace(/,/g, '');
    
    // 价格数字匹配（允许部分匹配）
    if (text.includes(priceNum)) {
      score += 100;
    } else {
      // 部分匹配：价格的前几位
      for (let i = 2; i <= priceNum.length; i++) {
        if (text.includes(priceNum.substring(0, i))) {
          score += i * 5;
        }
      }
    }
    
    // 货币符号匹配
    if (lang === 'zh-hk' && /HK\$|HK\s*\$/.test(text)) score += 50;
    if (lang === 'en' && /\$\d+/.test(text) && !/HK\$/.test(text)) score += 50;
    if (lang === 'ja' && /¥|円/.test(text)) score += 50;
    
    // 产品关键词匹配（更宽松）
    const slugWords = sku.slug.split('-');
    for (const word of slugWords) {
      if (word.length > 2) {
        if (text.toLowerCase().includes(word.toLowerCase())) score += 30;
        // 允许部分匹配
        if (word.length > 4 && text.toLowerCase().includes(word.substring(0, 4).toLowerCase())) score += 15;
      }
    }
    
    if (score > bestScore) {
      bestScore = score;
      bestMatch = { skuId: sku.skuId, slug: sku.slug, lang, seo: entry.seo, score };
    }
  }
  
  // 降低阈值到 30
  return (bestMatch && bestScore >= 30) ? bestMatch : null;
}

async function main() {
  const priceMap = buildPriceMap();
  
  // 读取之前的报告，找出失败的图片
  let previousReport = [];
  if (fs.existsSync('rename-report.json')) {
    previousReport = JSON.parse(fs.readFileSync('rename-report.json', 'utf8'));
  }
  
  const failedFiles = previousReport.filter(r => !r.target).map(r => r.original);
  
  // 获取当前目录中仍未命名的图片
  const currentFiles = fs.readdirSync(IMG_DIR)
    .filter(f => {
      const ext = path.extname(f).toLowerCase();
      const s = fs.statSync(path.join(IMG_DIR, f));
      return (ext === '.png' || ext === '.jpg' || ext === '.jpeg') && s.size > 500000 && !f.startsWith('zprintpro-');
    });
  
  // 合并：之前的失败 + 当前未命名
  const toProcess = [...new Set([...failedFiles, ...currentFiles])]
    .map(f => ({ name: f, path: path.join(IMG_DIR, f), mtime: fs.statSync(path.join(IMG_DIR, f)).mtime }))
    .sort((a, b) => a.mtime - b.mtime);
  
  console.log('待重试图片:', toProcess.length);
  
  if (toProcess.length === 0) {
    console.log('没有需要重试的图片');
    return;
  }
  
  const worker = await createWorker('eng+jpn+chi_sim');
  const usedNames = new Map();
  
  // 记录已使用的文件名
  fs.readdirSync(IMG_DIR).filter(f => f.startsWith('zprintpro-')).forEach(f => usedNames.set(f, true));
  
  let success = 0;
  let stillFailed = 0;
  
  for (let i = 0; i < toProcess.length; i++) {
    const file = toProcess[i];
    console.log(`\n[${i + 1}/${toProcess.length}] ${file.name}`);
    
    try {
      const text = await recognizeWithStrategies(worker, file.path);
      console.log('  OCR:', text.replace(/\n/g, ' | ').substring(0, 140));
      
      const match = detectLangAndSku(text, priceMap);
      
      if (match) {
        console.log(`  匹配: ${match.skuId} [${match.lang}] (置信度:${match.score})`);
        
        let baseName = match.seo.replace(/\.(jpg|png)$/, '');
        let ext = path.extname(file.name).toLowerCase() === '.png' ? '.png' : '.jpg';
        let targetName = baseName + ext;
        
        let counter = 1;
        while (usedNames.has(targetName) || fs.existsSync(path.join(IMG_DIR, targetName))) {
          counter++;
          targetName = `${baseName}-${counter}${ext}`;
        }
        usedNames.set(targetName, true);
        
        fs.renameSync(file.path, path.join(IMG_DIR, targetName));
        console.log(`  ✓ → ${targetName}`);
        success++;
      } else {
        console.log('  ✗ 仍未能匹配');
        stillFailed++;
      }
    } catch (err) {
      console.log('  ✗ 错误:', err.message);
      stillFailed++;
    }
  }
  
  await worker.terminate();
  
  console.log('\n========================================');
  console.log('重试完成');
  console.log(`成功: ${success}`);
  console.log(`仍失败: ${stillFailed}`);
  console.log('========================================');
  
  if (stillFailed > 0) {
    const remaining = fs.readdirSync(IMG_DIR)
      .filter(f => {
        const ext = path.extname(f).toLowerCase();
        const s = fs.statSync(path.join(IMG_DIR, f));
        return (ext === '.png' || ext === '.jpg' || ext === '.jpeg') && s.size > 500000 && !f.startsWith('zprintpro-');
      });
    console.log(`仍有 ${remaining.length} 张未命名，请使用 rename-helper.js 手动处理`);
    fs.writeFileSync('remaining-files.txt', remaining.join('\n'), 'utf8');
  }
}

main().catch(console.error);
