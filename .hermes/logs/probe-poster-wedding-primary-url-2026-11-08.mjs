import fs from 'node:fs';

const commit = process.argv[2];
if (!commit) throw new Error('Usage: node probe-poster-wedding-primary-url-2026-11-08.mjs <commit>');

const cases = [
  {
    key: 'posters_category_zh_hk',
    path: '/zh-hk/category/posters/',
    markers: {
      guide_role_label: '海報印刷尺寸・紙質・工藝指南（支援本類目決策）',
      a2_role_label: 'A2 海報印刷（10 張起產品規格）',
      guide_href: 'href="/zh-hk/blog/poster-printing-guide/"',
      a2_href: 'href="/zh-hk/product/a2-posters/"',
    },
  },
  {
    key: 'poster_guide_zh_hk',
    path: '/zh-hk/blog/poster-printing-guide/',
    markers: {
      page_role: '頁面分工：',
      primary_query_role: '海報印刷／印海報',
      transaction_role: '交易主頁',
      category_href: 'href="/zh-hk/category/posters/"',
    },
  },
  {
    key: 'wedding_invitations_category_zh_hk',
    path: '/zh-hk/category/wedding-invitations/',
    markers: {
      thank_you_role_label: '婚禮感謝卡（賓客答謝；請柬主頁為本類目）',
      thank_you_href: 'href="/zh-hk/product/wedding-thank-you-cards/"',
    },
  },
  {
    key: 'wedding_thank_you_zh_hk',
    path: '/zh-hk/product/wedding-thank-you-cards/',
    markers: {
      intent_clarification: '呢頁只承接婚禮感謝卡同賓客答謝需求',
      invitation_category_anchor: '喜帖印刷類目',
      invitation_category_href: 'href="/zh-hk/category/wedding-invitations/"',
    },
  },
];

function count(haystack, needle) {
  return haystack.split(needle).length - 1;
}

function tagWith(html, pattern) {
  return html.match(pattern)?.[0] ?? null;
}

function attr(tag, name) {
  if (!tag) return null;
  return tag.match(new RegExp(`${name}=["']([^"']*)["']`, 'i'))?.[1] ?? null;
}

const results = [];
for (const item of cases) {
  const requestedUrl = `https://zprintpro.com${item.path}`;
  const response = await fetch(requestedUrl, {
    redirect: 'follow',
    headers: { 'user-agent': 'ZprintPro-Primary-URL-Verify/1.0', 'cache-control': 'no-cache' },
  });
  const html = await response.text();
  const canonicalTag = tagWith(html, /<link\b[^>]*rel=["']canonical["'][^>]*>/i)
    ?? tagWith(html, /<link\b[^>]*href=["'][^"']+["'][^>]*rel=["']canonical["'][^>]*>/i);
  const robotsTag = tagWith(html, /<meta\b[^>]*name=["']robots["'][^>]*>/i)
    ?? tagWith(html, /<meta\b[^>]*content=["'][^"']*["'][^>]*name=["']robots["'][^>]*>/i);
  const canonical = attr(canonicalTag, 'href');
  const robots = attr(robotsTag, 'content');
  const markers = Object.fromEntries(Object.entries(item.markers).map(([key, value]) => {
    const occurrences = count(html, value);
    return [key, { value, count: occurrences, pass: occurrences > 0 }];
  }));
  const pass = response.status === 200
    && response.url === requestedUrl
    && canonical === requestedUrl
    && robots?.toLowerCase().replaceAll(' ', '') === 'index,follow'
    && Object.values(markers).every((marker) => marker.pass);
  results.push({
    key: item.key,
    requested_url: requestedUrl,
    commit,
    http_status: response.status,
    final_url: response.url,
    cf_cache_status: response.headers.get('cf-cache-status'),
    age: response.headers.get('age'),
    canonical,
    robots,
    markers,
    pass,
  });
}

const sku = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const block = sku.split('"wedding-thank-you-cards": {')[1]?.split('"faqs": [],')[0] ?? '';
const newKeywords = ['婚禮感謝卡', '婚禮回謝卡', '婚禮答謝卡', '賓客感謝卡', '婚禮回禮卡', '燙金感謝卡', '婚禮文具印刷', '50套起印'];
const removedInvitationKeywords = ['"喜帖印刷"', '"結婚請帖"', '"囍帖訂製"', '"燙金請帖"'];
const sourceKeywordAssertions = {
  new_keywords_present: newKeywords.every((keyword) => block.includes(`"${keyword}"`)),
  invitation_keywords_absent: removedInvitationKeywords.every((keyword) => !block.includes(keyword)),
  invitation_category_link_present: block.includes('[喜帖印刷類目](/zh-hk/category/wedding-invitations/)'),
};

const evidence = {
  verified_at: new Date().toISOString(),
  commit,
  method: 'Production HTML SSR marker and href assertions plus canonical/robots checks; no ranking claim. Keyword metadata is asserted in the source target block.',
  overall_pass: results.every((result) => result.pass) && Object.values(sourceKeywordAssertions).every(Boolean),
  results,
  source_keyword_assertions: sourceKeywordAssertions,
};

const output = '.hermes/logs/poster-wedding-primary-url-online-2026-11-08.json';
fs.writeFileSync(output, `${JSON.stringify(evidence, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(evidence, null, 2));
if (!evidence.overall_pass) process.exitCode = 1;
