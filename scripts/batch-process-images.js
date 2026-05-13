/**
 * ZPrintPro 全站图片批量处理脚本
 * Phase 1: Blog (B开头) -> 1320px宽, WebP, 80-100KB
 * Phase 2: Hero (H开头) -> 1320x400px, WebP, 160-200KB
 * Extra: Eco Paper Bags EN -> WebP, ~100KB
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SOURCE_DIR = 'F:\\新网站压缩后的图片';
const PROJECT_DIR = 'F:\\zprintpro-nextjs';
const BLOG_OUT = path.join(PROJECT_DIR, 'public', 'images', 'blog');
const HERO_OUT = path.join(PROJECT_DIR, 'public', 'images', 'hero');
const PRODUCTS_OUT = path.join(PROJECT_DIR, 'public', 'images', 'products', 'seedream-webp');

const BLOG_PROMPTS = path.join(PROJECT_DIR, 'seedream-blog-prompts.txt');
const HERO_PROMPTS = path.join(PROJECT_DIR, 'seedream-hero-prompts.txt');

// 目标大小范围 (KB)
const BLOG_TARGET = { min: 80, max: 100 };
const HERO_TARGET = { min: 160, max: 200 };
const ECO_TARGET = { min: 80, max: 120 };

// 解析映射文件: { baseName: { zh-hk: {alt, title}, en: {...}, ja: {...} } }
function parsePromptFile(filepath) {
  const content = fs.readFileSync(filepath, 'utf-8');
  const lines = content.split(/\r?\n/);
  const entries = [];
  let current = null;

  for (const line of lines) {
    const filenameMatch = line.match(/Filename:\s*(.+\.jpg|.+\.png)/i);
    if (filenameMatch) {
      if (current) entries.push(current);
      const filename = filenameMatch[1].trim();
      const base = path.basename(filename, path.extname(filename));
      current = { base, alt: '', title: '', locale: 'zh-hk' };
      if (base.endsWith('-en')) current.locale = 'en';
      else if (base.endsWith('-ja')) current.locale = 'ja';
      else if (base.endsWith('-zh-hk')) current.locale = 'zh-hk';
    }
    const altMatch = line.match(/Alt:\s*(.+)/i);
    if (altMatch && current) {
      current.alt = altMatch[1].trim();
      current.title = current.alt;
    }
  }
  if (current) entries.push(current);

  // Group by base name
  const map = {};
  for (const e of entries) {
    if (!map[e.base]) map[e.base] = {};
    map[e.base][e.locale] = { alt: e.alt, title: e.title };
  }
  return map;
}

function generateMeta(baseName, metaMap) {
  const data = metaMap[baseName] || {};
  const alt = {
    'zh-hk': data['zh-hk']?.alt || '',
    'en': data['en']?.alt || '',
    'ja': data['ja']?.alt || '',
  };
  const title = {
    'zh-hk': data['zh-hk']?.title || '',
    'en': data['en']?.title || '',
    'ja': data['ja']?.title || '',
  };
  return JSON.stringify({ alt, title }, null, 2);
}

async function processImage(inputPath, outputPath, options) {
  const { maxWidth, targetSize, fixedSize, qualityRange } = options;
  let pipeline = sharp(inputPath);
  const metadata = await pipeline.metadata();

  if (fixedSize) {
    // 保持固定尺寸，裁剪或填充
    pipeline = pipeline.resize(fixedSize.width, fixedSize.height, {
      fit: 'cover',
      position: 'center',
    });
  } else if (maxWidth) {
    pipeline = pipeline.resize(maxWidth, null, { withoutEnlargement: false });
  }

  // 二分查找最佳质量
  let low = qualityRange[0];
  let high = qualityRange[1];
  let bestBuffer = null;
  let bestQuality = low;

  for (let iter = 0; iter < 8; iter++) {
    const mid = Math.round((low + high) / 2);
    const buf = await pipeline.clone().webp({ quality: mid, effort: 4 }).toBuffer();
    const kb = buf.length / 1024;

    if (kb >= targetSize.min && kb <= targetSize.max) {
      bestBuffer = buf;
      bestQuality = mid;
      break;
    }
    if (kb < targetSize.min) {
      low = mid;
    } else {
      high = mid;
    }
    bestBuffer = buf;
    bestQuality = mid;
  }

  if (!bestBuffer) {
    bestBuffer = await pipeline.webp({ quality: bestQuality, effort: 4 }).toBuffer();
  }

  fs.writeFileSync(outputPath, bestBuffer);
  const finalKb = bestBuffer.length / 1024;
  return { size: finalKb, quality: bestQuality };
}

async function processBlog(blogMetaMap) {
  console.log('\n=== Phase 1: Blog Images ===');
  fs.mkdirSync(BLOG_OUT, { recursive: true });

  const files = fs.readdirSync(SOURCE_DIR)
    .filter(f => /^b/i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

  console.log(`Found ${files.length} blog source files`);

  // Build lookup: topic-locale -> list of source files
  const groups = {};
  for (const f of files) {
    const m = f.match(/^(blog-[\w-]+)-(zh-hk|en|ja)(?:-(\d+))?\.(jpg|jpeg|png)$/i);
    if (!m) continue;
    const key = `${m[1]}-${m[2]}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push({ file: f, num: parseInt(m[3] || '1', 10) });
  }

  const results = [];
  for (const [key, items] of Object.entries(groups)) {
    items.sort((a, b) => a.num - b.num);
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const outBase = i === 0 ? key : `${key}-${item.num}`;
      const outPath = path.join(BLOG_OUT, `${outBase}.webp`);
      const metaPath = path.join(BLOG_OUT, `${outBase}.meta.json`);
      const inPath = path.join(SOURCE_DIR, item.file);

      try {
        const info = await processImage(inPath, outPath, {
          maxWidth: 1320,
          targetSize: BLOG_TARGET,
          qualityRange: [75, 85],
        });
        fs.writeFileSync(metaPath, generateMeta(key, blogMetaMap));
        results.push({ name: `${outBase}.webp`, size: info.size, quality: info.quality });
        console.log(`  ✓ ${outBase}.webp -> ${info.size.toFixed(1)}KB (q=${info.quality})`);
      } catch (e) {
        console.error(`  ✗ Failed ${item.file}: ${e.message}`);
      }
    }
  }

  return results;
}

async function processHero(heroMetaMap) {
  console.log('\n=== Phase 2: Hero Images ===');
  fs.mkdirSync(HERO_OUT, { recursive: true });

  const files = fs.readdirSync(SOURCE_DIR)
    .filter(f => /^h/i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

  console.log(`Found ${files.length} hero source files`);

  const results = [];
  for (const f of files) {
    const m = f.match(/^(hero-[\w-]+)-(zh-hk|en|ja)\.(png|jpg|jpeg)$/i);
    if (!m) {
      console.log(`  ! Skipping unrecognized hero file: ${f}`);
      continue;
    }
    const base = `${m[1]}-${m[2]}`;
    const outPath = path.join(HERO_OUT, `${base}.webp`);
    const metaPath = path.join(HERO_OUT, `${base}.meta.json`);
    const inPath = path.join(SOURCE_DIR, f);

    try {
      const info = await processImage(inPath, outPath, {
        fixedSize: { width: 1320, height: 400 },
        targetSize: HERO_TARGET,
        qualityRange: [80, 90],
      });
      fs.writeFileSync(metaPath, generateMeta(base, heroMetaMap));
      results.push({ name: `${base}.webp`, size: info.size, quality: info.quality });
      console.log(`  ✓ ${base}.webp -> ${info.size.toFixed(1)}KB (q=${info.quality})`);
    } catch (e) {
      console.error(`  ✗ Failed ${f}: ${e.message}`);
    }
  }

  return results;
}

async function processEcoBags() {
  console.log('\n=== Extra: Eco Paper Bags EN ===');
  fs.mkdirSync(PRODUCTS_OUT, { recursive: true });

  const files = ['zprintpro-paper-bags-eco-paper-bags-en-11.jpg',
    'zprintpro-paper-bags-eco-paper-bags-en-12.jpg',
    'zprintpro-paper-bags-eco-paper-bags-en-13.jpg',
    'zprintpro-paper-bags-eco-paper-bags-en-14.jpg'];

  const results = [];
  for (const f of files) {
    const inPath = path.join(SOURCE_DIR, f);
    if (!fs.existsSync(inPath)) {
      console.log(`  ! Missing source: ${f}`);
      continue;
    }
    const base = path.basename(f, '.jpg');
    const outPath = path.join(PRODUCTS_OUT, `${base}.webp`);
    try {
      const info = await processImage(inPath, outPath, {
        maxWidth: 1320,
        targetSize: ECO_TARGET,
        qualityRange: [75, 85],
      });
      results.push({ name: `${base}.webp`, size: info.size });
      console.log(`  ✓ ${base}.webp -> ${info.size.toFixed(1)}KB`);
    } catch (e) {
      console.error(`  ✗ Failed ${f}: ${e.message}`);
    }
  }

  return results;
}

async function main() {
  console.log('ZPrintPro Image Batch Processor');
  console.log('==============================');

  const blogMetaMap = parsePromptFile(BLOG_PROMPTS);
  const heroMetaMap = parsePromptFile(HERO_PROMPTS);

  console.log(`Parsed ${Object.keys(blogMetaMap).length} blog entries, ${Object.keys(heroMetaMap).length} hero entries`);

  const blogResults = await processBlog(blogMetaMap);
  const heroResults = await processHero(heroMetaMap);
  const ecoResults = await processEcoBags();

  // Summary
  console.log('\n=== SUMMARY ===');
  console.log(`Blog images: ${blogResults.length} processed`);
  blogResults.forEach(r => console.log(`  ${r.name}: ${r.size.toFixed(1)}KB`));
  console.log(`Hero images: ${heroResults.length} processed`);
  heroResults.forEach(r => console.log(`  ${r.name}: ${r.size.toFixed(1)}KB`));
  console.log(`Eco bags: ${ecoResults.length} processed`);
  ecoResults.forEach(r => console.log(`  ${r.name}: ${r.size.toFixed(1)}KB`));
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
