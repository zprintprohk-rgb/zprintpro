#!/usr/bin/env node

/**
 * 健康檢查腳本
 * 檢查構建輸出是否正確
 */

const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(process.cwd(), 'out');

// 顏色輸出
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[0;31m',
  green: '\x1b[0;32m',
  yellow: '\x1b[1;33m',
  blue: '\x1b[0;34m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// 檢查文件是否存在
function checkFile(filePath, description) {
  const fullPath = path.join(OUT_DIR, filePath);
  if (fs.existsSync(fullPath)) {
    log(`✓ ${description}: ${filePath}`, 'green');
    return true;
  } else {
    log(`✗ ${description} 缺失: ${filePath}`, 'red');
    return false;
  }
}

// 檢查目錄是否存在
function checkDirectory(dirPath, description) {
  const fullPath = path.join(OUT_DIR, dirPath);
  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()) {
    const fileCount = fs.readdirSync(fullPath).length;
    log(`✓ ${description}: ${dirPath} (${fileCount} 項)`, 'green');
    return true;
  } else {
    log(`✗ ${description} 缺失: ${dirPath}`, 'red');
    return false;
  }
}

// 統計 HTML 文件
function countHtmlFiles(dir) {
  let count = 0;
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      count += countHtmlFiles(fullPath);
    } else if (file.endsWith('.html')) {
      count++;
    }
  }
  
  return count;
}

// 主函數
function main() {
  log('🔍 開始健康檢查...', 'blue');
  log('');

  // 檢查 out 目錄是否存在
  if (!fs.existsSync(OUT_DIR)) {
    log('✗ out 目錄不存在', 'red');
    process.exit(1);
  }

  let allPassed = true;

  // 檢查關鍵文件
  log('📄 檢查關鍵文件...', 'blue');
  allPassed &= checkFile('zh-hk/index.html', '首頁 (zh-hk)');
  allPassed &= checkFile('en/index.html', '首頁 (en)');
  allPassed &= checkFile('ja/index.html', '首頁 (ja)');
  allPassed &= checkFile('sitemap.xml', '站點地圖索引');
  allPassed &= checkFile('robots.txt', 'Robots.txt');
  log('');

  // 檢查分類頁面
  log('📁 檢查分類頁面...', 'blue');
  const categories = [
    'paper-bags', 'flyers', 'stickers', 'packaging', 'posters', 'books',
    'business-cards', 'envelopes', 'menus', 'calendars', 'red-packets',
    'banners', 'educational',
  ];
  const locales = ['zh-hk', 'en', 'ja'];
  
  for (const locale of locales) {
    for (const cat of categories) {
      allPassed &= checkFile(`${locale}/category/${cat}/index.html`, `分類頁 (${locale}): ${cat}`);
    }
  }
  log('');

  // 檢查產品頁面（抽樣檢查）
  log('📦 檢查產品頁面（抽樣）...', 'blue');
  const sampleProducts = [
    'premium-business-cards',
    'thick-business-cards-400g',
    'a1-posters',
    'catalog-printing',
  ];
  
  for (const locale of locales) {
    for (const product of sampleProducts) {
      allPassed &= checkFile(`${locale}/product/${product}/index.html`, `產品頁 (${locale}): ${product}`);
    }
  }
  log('');

  // 檢查靜態資源
  log('🖼️  檢查靜態資源...', 'blue');
  allPassed &= checkDirectory('_next', 'Next.js 資源');
  log('');

  // 統計信息
  log('📊 統計信息...', 'blue');
  const htmlCount = countHtmlFiles(OUT_DIR);
  log(`  - HTML 文件總數: ${htmlCount}`, 'green');
  
  // 檢查頁面數量是否符合預期
  const expectedPages = 279; // 3 首頁 + 39 分類頁 + 237 產品頁
  if (htmlCount >= expectedPages * 0.8) {
    log(`  - 頁面數量檢查: 通過 (${htmlCount}/${expectedPages})`, 'green');
  } else {
    log(`  - 頁面數量檢查: 警告 (${htmlCount}/${expectedPages})`, 'yellow');
  }
  
  // 計算總大小
  const getFolderSize = (dir) => {
    let size = 0;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        size += getFolderSize(fullPath);
      } else {
        size += stat.size;
      }
    }
    return size;
  };
  
  const totalSize = getFolderSize(OUT_DIR);
  const sizeInMB = (totalSize / 1024 / 1024).toFixed(2);
  log(`  - 總大小: ${sizeInMB} MB`, 'green');
  log('');

  // 檢查 sitemap
  log('🗺️  檢查站點地圖...', 'blue');
  const sitemapPath = path.join(OUT_DIR, 'sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
    const sitemapCount = (sitemapContent.match(/<sitemap>/g) || []).length;
    log(`  - 站點地圖數量: ${sitemapCount}`, 'green');
  }
  log('');

  // 總結
  if (allPassed) {
    log('✅ 所有檢查通過！', 'green');
    log('');
    log('🚀 項目已準備好部署', 'green');
    process.exit(0);
  } else {
    log('⚠️  部分檢查未通過', 'yellow');
    log('');
    log('請檢查上述錯誤並修復後重新構建', 'yellow');
    process.exit(1);
  }
}

main();
