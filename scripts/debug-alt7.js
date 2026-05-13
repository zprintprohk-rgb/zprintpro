const fs = require('fs');
const content = fs.readFileSync('src/data/products.ts', 'utf-8');
const regex = /seoImages:\s*\{[\s\S]*?alt:\s*\{[\s\S]*?\},?[\s\S]*?\},?/g;
let m = regex.exec(content);
if (m) {
  const altMatch = m[0].match(/alt:\s*\{([\s\S]*?)\}/);
  console.log('altMatch found:', !!altMatch);
  if (altMatch) {
    console.log('altBody:');
    console.log(altMatch[1]);
    console.log('---');
    const enMatch = altMatch[1].match(/['"]en['"]\s*:\s*['"]([^'"]*)['"]/);
    console.log('enMatch:', enMatch);
  }
}
