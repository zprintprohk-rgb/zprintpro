const ts = require('typescript');
const fs = require('fs');
const src = fs.readFileSync('F:\\zprintpro-nextjs\\src\\lib\\seo.ts', 'utf-8');
// Try syntax check only
try {
  const sf = ts.createSourceFile('seo.ts', src, ts.ScriptTarget.ES2020, true);
  // Walk through the AST to find syntax errors
  function walk(node) {
    if (node.flags & ts.NodeFlags.ThisNodeHasError) return node;
    ts.forEachChild(node, walk);
  }
  walk(sf);
  // Check for parse errors
  const parseErrors = sf.parseDiagnostics || [];
  if (parseErrors.length > 0) {
    parseErrors.slice(0, 5).forEach(d => {
      const line = src.substr(0, d.start).split('\n').length;
      console.log(`Line ${line}: ${d.messageText}`);
    });
  } else {
    console.log('PARSE OK');
  }
} catch (e) {
  console.log('PARSE FAIL:', e.message);
}
