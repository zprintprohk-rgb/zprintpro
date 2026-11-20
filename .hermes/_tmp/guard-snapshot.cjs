const fs = require('fs');
const { execFileSync } = require('child_process');
const phase = process.argv[2] || 'pre';
// 12seg CLI (utf8 capture)
let seg = '';
try {
  seg = execFileSync('node', ['scripts/guards/blog-quality-12-rules-guard.js', '--json'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, timeout: 180000 });
} catch (e) { seg = (e.stdout || '') + '\n[exit ' + e.status + ']'; }
fs.writeFileSync('.hermes/_tmp_12seg_' + phase + '.json', seg, 'utf8');
// blog-standard + internal-links via module API
const out = {};
try { out.blogStandard = require('../../scripts/guards/blog-standard-guard.js').run().hits; } catch (e) { out.blogStandard = [{ err: String(e) }]; }
try { out.internalLinksCta = require('../../scripts/guards/internal-links-cta-guard.js').run().hits; } catch (e) { out.internalLinksCta = [{ err: String(e) }]; }
fs.writeFileSync('.hermes/_tmp_guard_hits_' + phase + '.json', JSON.stringify(out, null, 1), 'utf8');
const segFails = (seg.match(/SEG\d+_[A-Z_]+\]/g) || []).length;
console.log('phase=' + phase, 'blogStandard hits=' + out.blogStandard.length, 'ILC hits=' + out.internalLinksCta.length, '12seg stdout bytes=' + seg.length);
