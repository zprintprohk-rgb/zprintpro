// Read-only: structure of dsh dirs + dsh --help (no credential contents touched)
const fs = require('fs');
const { spawnSync } = require('child_process');
function ls(p) {
  try { return fs.readdirSync(p).join('\n'); } catch (e) { return 'ERR: ' + e.message; }
}
console.log('=== C:/Users/Administrator/.dsh ===');
console.log(ls('C:/Users/Administrator/.dsh'));
console.log('=== .dsh/llm-deepseek (names only) ===');
console.log(ls('C:/Users/Administrator/.dsh/llm-deepseek'));
console.log('=== .dsh/profiles (names only) ===');
console.log(ls('C:/Users/Administrator/.dsh/profiles'));
const bin = 'C:/Users/Administrator/AppData/Roaming/DSH Desktop/host-commands/desktop/bin';
console.log('=== DSH bin exists:', fs.existsSync(bin), '===');
if (fs.existsSync(bin)) console.log(ls(bin));
const dshCmd = bin + '\\dsh.cmd';
if (fs.existsSync(dshCmd)) {
  const r = spawnSync('cmd.exe', ['/c', dshCmd, '--help'], { encoding: 'utf8', timeout: 30000 });
  console.log('=== dsh --help (exit ' + r.status + ') ===');
  console.log((r.stdout || '') + (r.stderr || ''));
} else {
  console.log('dsh.cmd not at that path — wrapper quoting differs; skip help');
}
