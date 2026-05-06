const fs = require('fs');
const path = require('path');

const extensions = ['.ts', '.tsx', '.json', '.css', '.md', '.js', '.html'];
const targetDirs = ['src', 'public'];
let replacedCount = 0;

function processDir(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (item === 'node_modules' || item === '.next' || item === 'out') continue;
      processDir(fullPath);
    } else if (stat.isFile() && extensions.includes(path.extname(item))) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('智印港')) {
        const newContent = content.replace(/智印港/g, '智印云');
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log('Replaced:', fullPath);
        replacedCount++;
      }
    }
  }
}

for (const dir of targetDirs) {
  if (fs.existsSync(dir)) processDir(dir);
}

console.log(`\nTotal files replaced: ${replacedCount}`);
