/**
 * 修复 .meta.json 文件，补充所有三语 Alt/Title
 */

const fs = require('fs');
const path = require('path');

const PROJECT_DIR = 'F:\\zprintpro-nextjs';
const BLOG_PROMPTS = path.join(PROJECT_DIR, 'seedream-blog-prompts.txt');
const HERO_PROMPTS = path.join(PROJECT_DIR, 'seedream-hero-prompts.txt');

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

  // Group by topic (remove locale suffix)
  const map = {};
  for (const e of entries) {
    const topic = e.base.replace(/-(zh-hk|en|ja)$/, '');
    if (!map[topic]) map[topic] = {};
    map[topic][e.locale] = { alt: e.alt, title: e.title };
  }
  return map;
}

function generateMeta(topic, metaMap) {
  const data = metaMap[topic] || {};
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

function fixMetaDir(dir, metaMap) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.webp'));
  for (const f of files) {
    const base = f.replace('.webp', '');
    const topic = base.replace(/-(zh-hk|en|ja)(-\d+)?$/, '');
    const metaPath = path.join(dir, f.replace('.webp', '.meta.json'));
    fs.writeFileSync(metaPath, generateMeta(topic, metaMap));
    console.log(`  Fixed: ${f}`);
  }
}

console.log('Fixing Blog meta files...');
const blogMetaMap = parsePromptFile(BLOG_PROMPTS);
fixMetaDir(path.join(PROJECT_DIR, 'public', 'images', 'blog'), blogMetaMap);

console.log('\nFixing Hero meta files...');
const heroMetaMap = parsePromptFile(HERO_PROMPTS);
fixMetaDir(path.join(PROJECT_DIR, 'public', 'images', 'hero'), heroMetaMap);
