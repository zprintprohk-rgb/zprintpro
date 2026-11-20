'use strict';
/**
 * 只讀預檢: 223 條 products.ts 原文本身是否含「簡體專用字形」(SIMP_ZH)
 * 目的: zh-hk 值 = 原文時, 先確認原文無簡體污染, 否則映射表的 zh-hk 值必須先修字形
 */
const path = require('path');
const guard = require(path.join('F:\\zprintpro-nextjs', 'scripts', 'guards', 'i18n-guard.js'));
const dump = require('F:\\zprintpro-nextjs\\.hermes\\_probe-pb\\_spec-strings.json');
const SIMP = new Set(guard.SIMP_ZH.split(''));
const SIMP_JA = new Set(guard.SIMP_JA.split(''));
const CJK = /[\u3400-\u9FFF]/;
let hit = 0;
for (const o of dump) {
  const bad = [...new Set(o.v.split('').filter(c => SIMP.has(c)))];
  const badJa = [...new Set(o.v.split('').filter(c => SIMP_JA.has(c)))];
  if (bad.length || badJa.length) {
    hit++;
    console.log(`[${o.field}] ${o.v}\n    SIMP_ZH=${bad.join('')}  SIMP_JA=${badJa.join('')}`);
  }
}
console.log(`--- 原文含簡體專用字形者: ${hit} / ${dump.length} (SIMP_ZH 字集 ${SIMP.size} 字, SIMP_JA ${SIMP_JA.size} 字, CJK 測試 ${CJK.test('中')})`);
