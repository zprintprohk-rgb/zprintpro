#!/usr/bin/env node
/* 只读: 残留 150 处里「正文面」的全部条目 (确认是否有本批应清而未清的) */
const fs = require('fs');
const M = JSON.parse(fs.readFileSync('F:\\zprintpro-main-tmp\\.hermes\\dual-brand-refined.json', 'utf8'));
const body = M.items.filter(x => x.face === 'body');
console.log(` refine-face 判定: 总 ${M.total} | 正文面 ${body.length} | title 面 ${M.titleCount}`);
body.forEach(x => console.log(`  ${x.file}:${x.line} [${x.form}] why=${x.why} …${x.ctx.slice(0, 90)}…`));
