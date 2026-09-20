// .hermes/logs/_probe-menus-template.mjs — 驗證 menus 頁底部模板句 MOQ 已修正（K3 線上實測項）
const BASE = 'https://zprintpro.com';
const MENUS = [
  { slug: 'pvc-menus', expect: '10 張起印' },
  { slug: 'laminated-menus', expect: '10 份起印' },
  { slug: 'hardcover-menus', expect: '10 本起印' },
  { slug: 'drink-menus', expect: '10 份起印' },
  { slug: 'disposable-menus', expect: '100 份起印' },
];
const STALE = '50 張起印，48 小時快遞';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
console.log('=== menus 頁底部模板句 MOQ 線上驗證 ===\n');
let ok = 0;
let stale = 0;
let invalid = 0;
for (const m of MENUS) {
  const url = `${BASE}/zh-hk/product/${m.slug}/`;
  let r;
  try {
    r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ZP-probe/1.0)' } });
  } catch (e) {
    console.log(`🔴 ${m.slug}: fetch 失敗 ${e.message}`);
    invalid++;
    continue;
  }
  const html = await r.text();
  const valid = r.status === 200 && html.length > 20000;
  if (!valid) {
    console.log(`🔴 ${m.slug}: INVALID（HTTP ${r.status} / ${html.length} bytes）— 不計入 0`);
    invalid++;
    await sleep(600);
    continue;
  }
  const hasStale = html.includes(STALE);
  const hasExpect = html.includes(m.expect);
  if (hasStale) {
    console.log(`🔴 ${m.slug}: 仍有殘留「${STALE}」`);
    stale++;
  } else if (hasExpect) {
    console.log(`✅ ${m.slug}: 「${m.expect}」已生效，無殘留`);
    ok++;
  } else {
    console.log(`⚠️ ${m.slug}: 無殘留，但未見預期「${m.expect}」（可能部署未完成）`);
  }
  await sleep(600);
}
console.log(`\n彙總: 已生效 ${ok} ｜ 仍見殘留 ${stale} ｜ INVALID ${invalid} ｜ 共 ${MENUS.length}`);
if (stale === 0 && invalid === 0 && ok === MENUS.length) console.log('✅ 全部通過 — K3 發現的殘留已修復上線');
else if (stale) console.log('→ 仍見殘留：確認 CF Pages build 是否完成，勿直接判失敗（§0.23.2）');
