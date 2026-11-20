// E4 post-push verify method 2 — curl file-landing double check (runs after push)
// Downloads the two pages to files and greps exact anchors (authoritative, no PS pipe truncation)
import { execSync } from 'node:child_process';
import fs from 'node:fs';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0';
const pages = [
  ['zine', 'https://zprintpro.com/en/blog/zine-small-batch-booklet-printing-guide/', '.hermes/_e4_zine.html', '<a href="/en/product/doujinshi-printing/">doujin circles</a>'],
  ['pdp', 'https://zprintpro.com/en/product/doujinshi-printing/', '.hermes/_e4_pdp.html', null], // pdp checked with both needles below
];
const pdpNeedles = [
  '<a href="/en/blog/zine-small-batch-booklet-printing-guide/">Saddle Stitch</a>',
  '<a href="/en/blog/comiket-printing-prep-guide/">before Comiket</a>',
];

for (const [label, url, file, needle] of pages) {
  try {
    const cmd = `curl -s -A "${UA}" "${url}" -o "${file}" -w "%{http_code}"`;
    const code = execSync(cmd, { encoding: 'utf8', shell: 'cmd.exe' }).trim();
    const body = fs.readFileSync(file, 'utf8');
    console.log(`[${label}] HTTP ${code} | size=${body.length}`);
    if (needle) {
      const found = body.includes(needle);
      console.log(`  anchor ${needle.slice(0, 60)}... => ${found ? 'OK' : 'FAIL'}`);
      // no plain-text residual check: ensure the anchor text appears ONLY as part of the <a> (i.e. not as standalone text)
      const plain = body.replace(/<a[^>]*>doujin circles<\/a>/g, '');
      console.log(`  plain-text residual 'doujin circles': ${plain.includes('doujin circles') ? 'PRESENT(FAIL)' : 'absent(OK)'}`);
    }
  } catch (e) { console.log(`[${label}] ERROR ${e.message}`); }
}

// PDP dual needle
try {
  const body = fs.readFileSync('.hermes/_e4_pdp.html', 'utf8');
  for (const n of pdpNeedles) {
    console.log(`[pdp] ${n.slice(0, 55)}... => ${body.includes(n) ? 'OK' : 'FAIL'}`);
  }
  const plainZ = body.replace(/<a[^>]*>Saddle Stitch<\/a>/g, '');
  const plainC = body.replace(/<a[^>]*>before Comiket<\/a>/g, '');
  console.log(`[pdp] plain-text 'Saddle Stitch' residual: ${plainZ.includes('Saddle Stitch') ? 'PRESENT(FAIL)' : 'absent(OK)'}`);
  console.log(`[pdp] plain-text 'before Comiket' residual: ${plainC.includes('before Comiket') ? 'PRESENT(FAIL)' : 'absent(OK)'}`);
} catch (e) { console.log('[pdp] ERROR ' + e.message); }
