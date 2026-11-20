// Reviews migration verification: API flip + e2e POST + pending state
// Test entry clearly marked for K3 to approve (verify display path) then reject/delete (zero fake residue)
const slug = 'die-cut-stickers', locale = 'zh-hk';

// 1) GET flip
const g1 = await fetch(`https://zprintpro.com/api/reviews?slug=${slug}&locale=${locale}`);
console.log('1_GET_STATUS:', g1.status, '(expect 200 — was 404 pre-migration)');
console.log('1_GET_BODY:', (await g1.text()).slice(0, 60));

// 2) POST e2e (test entry, clearly labeled)
const p = await fetch('https://zprintpro.com/api/reviews', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    slug, locale,
    rating: 5,
    author: '系統測試',
    body: '端到端測試提交（非真實客戶評價）：驗證表單→pending→審核→展示全鏈路，測試完成後將由管理員刪除。',
    consent: true,
  }),
});
console.log('2_POST_STATUS:', p.status, '(expect 200 ok = RLS insert passed; 409 = already submitted today)');
console.log('2_POST_BODY:', (await p.text()).slice(0, 60));

// 3) GET again — approved list should still be empty (entry is pending until K3 approves)
const g2 = await fetch(`https://zprintpro.com/api/reviews?slug=${slug}&locale=${locale}`);
const j2 = await g2.json();
console.log('3_GET_APPROVED_COUNT:', (j2.reviews || []).length, '(expect 0 = pending isolation works)');

// 4) PDP still healthy
const pdp = await fetch(`https://zprintpro.com/zh-hk/product/${slug}/`);
console.log('4_PDP_STATUS:', pdp.status);

// 5) duplicate-day rate limit check (2nd POST should 409)
const p2 = await fetch('https://zprintpro.com/api/reviews', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ slug, locale, rating: 4, author: '系統測試', body: '重複提交頻控測試內容足夠長度字段。', consent: true }),
});
console.log('5_DUP_RATE_LIMIT:', p2.status, '(expect 409 = per-day unique index works)');
console.log('REVIEWS_MIGRATION_VERIFY_DONE');
