const fs = require('fs');
const bp = fs.readFileSync('src/data/blog-posts.ts', 'utf8');
// 找出 const 声明如何被收集
const idx = bp.indexOf('lpSchoolExerciseBookPrintingGuide');
console.log('=== 收集点 (lastIndexOf) ===');
let i = bp.lastIndexOf('lpSchoolExerciseBookPrintingGuide');
console.log(bp.slice(Math.max(0, i - 1200), i + 300));
console.log('\n=== 末尾 800 字符 ===');
console.log(bp.slice(-800));
