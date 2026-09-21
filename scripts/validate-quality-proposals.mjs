/**
 * validate-quality-proposals.mjs — T1 提案库闸门校验（只读，不碰 src）
 *
 * 校验项（全部 pass 才允许将来 apply）：
 *   G1 当量带 50-57（新 title）           G2 品牌末尾（新 title）
 *   G3 币种/假名污染（新 title/h1/desc）   G4 主词在 h1/desc（name 对照）
 *   G5 MOQ 数字 == products.ts 真值（title+desc 交叉，priceFlags 豁免槽除外）
 *   G6 价格钩存在（新 title）             G7 無效填充詞
 * 用法: node --import tsx scripts/validate-quality-proposals.mjs [提案json路径]
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { equiv, band } = require('./guards/title-equiv.js');
const ROOT = path.resolve(import.meta.dirname, '..');

const { skuSeoData } = await import('../src/data/sku-seo-data.ts');
const { products } = await import('../src/data/products.ts');
const truth = {};
for (const p of products) truth[p.slug] = p;

const propPath = process.argv[2] || '.hermes/title-quality-proposals-20260921.json';
const prop = JSON.parse(fs.readFileSync(path.join(ROOT, propPath), 'utf8'));
const flags = prop.meta.priceFlags || {};
const BRAND = { 'zh-hk': '智印港', en: 'ZprintPro', ja: 'ZprintPro' };
const KANA = /[ぁ-んァ-ン]/;
const FLUFF = /專家|专家|品質保證|品质保證|品质保证|High Quality|Best Quality/;

const fails = [];
const pass = [];
const moqNum = (s) => {
  // 先剝價格 token（HK$8起 / $2.30 / ¥300〜），價格里的「起/〜」會造成 MOQ 誤捕（量具教訓）
  const stripped = String(s)
    .replace(/(HK\$|US\$|\$|¥)\s*\d+(\.\d+)?\s*(起|〜|起\/張|起\/個|起\/本)?/g, '')
    .replace(/\d+(\.\d+)?\s*(起\/張|起\/個|起\/本|起\/套)/g, '');
  const m = stripped.match(/(\d+)\s*(起印|個起|个起|本起|冊起|張起|张起|件起|枚起|套起|MOQ|枚〜|個〜|冊〜|pcs|pieces|\+)/i);
  return m ? +m[1] : null;
};

for (const p of prop.proposals) {
  const key = `${p.slug}|${p.locale}`;
  const name = skuSeoData[p.slug]?.name?.[p.locale] || p.slug;
  const tr = truth[p.slug];
  const flag = flags[key];
  const fields = ['title', 'h1', 'desc'];
  for (const f of fields) {
    const v = p[f];
    if (v === null || v === undefined) continue;
    const tag = `${key}.${f}`;
    // G1 当量带（只卡 title）
    if (f === 'title') {
      const b = band(v);
      if (b !== 'OK') fails.push(`${tag} G1_当量=${equiv(v)}(${b})`);
      // G2 品牌末尾
      if (!v.replace(/[\s｜|]+$/u, '').endsWith(BRAND[p.locale])) fails.push(`${tag} G2_品牌末尾`);
      // G6 价格钩（priceFlags 豁免槽 = 无该语价真值，如 can-badge ja bpj undefined）
      if (!flag && !/(HK\$|¥|US\$|\$\d)/.test(v)) fails.push(`${tag} G6_无价格钩`);
      // G5 MOQ == 真值
      if (tr && !flag) {
        const mn = moqNum(v);
        if (mn != null && tr.minQuantity != null && mn !== tr.minQuantity)
          fails.push(`${tag} G5_MOQ=${mn}_真值=${tr.minQuantity}`);
      }
    }
    // G3 币种/假名
    if (p.locale === 'ja' && /HK\$/.test(v)) fails.push(`${tag} G3_币种污染`);
    if (p.locale === 'en' && /HK\$|¥/.test(v)) fails.push(`${tag} G3_币种污染`);
    if (p.locale === 'zh-hk' && KANA.test(v)) fails.push(`${tag} G3_假名污染`);
    if (p.locale === 'ja' && !KANA.test(v)) fails.push(`${tag} G3_ja无假名(疑英文)`);
    // G4 主词（拉丁语系用词干匹配治单复数：A2 Posters vs A2 Poster Printing；CJK 全串包含）
    const norm = v.toLowerCase().replace(/\s/g, '');
    if (/^[a-z0-9 ]+$/i.test(name)) {
      for (const w of name.toLowerCase().split(/\s+/)) {
        const stem = w.length > 4 ? w.slice(0, 4) : w;
        if (!norm.includes(stem)) { fails.push(`${tag} G4_主词缺失(${name})`); break; }
      }
    } else {
      // CJK 分支：name 可能带空格/括号注释（如「瓦楞紙盒 (坑盒/E坑/F坑)」），主词只取首段
      const firstSeg = name.split(/[\s(（]/)[0];
      const mainKw = firstSeg.replace(/\s/g, '').toLowerCase();
      if (!norm.includes(mainKw)) fails.push(`${tag} G4_主词缺失(${mainKw})`);
    }
    // G7 填充词
    if (FLUFF.test(v)) fails.push(`${tag} G7_填充词`);
    // desc 长度
    if (f === 'desc' && v.length < 60) fails.push(`${tag} 长度过短=${v.length}`);
    pass.push(tag);
  }
  // desc MOQ 与 title 一致（跨字段）
  if (p.desc && p.title && !flag) {
    const dm = moqNum(p.desc), tm = moqNum(p.title);
    if (dm != null && tm != null && dm !== tm) fails.push(`${key} G5_title-desc MOQ 不一致 t=${tm} d=${dm}`);
  }
}

console.log(`📊 提案校验: ${pass.length} 字段 / 🔴 ${fails.length} FAIL`);
for (const f of fails) console.log('  🔴', f);
process.exit(fails.length ? 1 : 0);
