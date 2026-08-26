const ts = require('typescript');
const fs = require('fs');
const src = fs.readFileSync('F:\\zprintpro-nextjs\\src\\lib\\seo.ts', 'utf-8');
const result = ts.transpileModule(src, {
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.Module.ESNext },
  reportDiagnostics: true
});
if (result.diagnostics && result.diagnostics.length) {
  result.diagnostics.slice(0, 5).forEach(d => {
    const pos = d.start;
    const line = src.substr(0, pos).split('\n').length;
    console.log(`Line ${line}: ${d.messageText}`);
  });
} else {
  console.log('PARSE OK');
}
