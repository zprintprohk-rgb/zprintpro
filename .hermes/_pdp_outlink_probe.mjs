// Verify the two PDP outlink anchors (peer 47622763) render online
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const URL_PDP = 'https://zprintpro.com/en/product/small-batch-stickers/';
const NEEDLES = [
  'href="https://zprintpro.com/en/blog/sticker-guide/"',           // material guide anchor href
  '>sticker material guide</a>',                                    // material guide anchor text
  'href="https://zprintpro.com/en/blog/sticker-buying-guide/"',    // buying guide anchor href
  '>sticker buying guide</a>',                                      // buying guide anchor text
];
const ctrl = new AbortController();
const t = setTimeout(() => ctrl.abort(), 30000);
const res = await fetch(URL_PDP, { headers: { 'User-Agent': UA }, redirect: 'follow', signal: ctrl.signal });
const body = await res.text();
clearTimeout(t);
const out = {
  url: URL_PDP,
  status: res.status,
  bytes: body.length,
  needles: NEEDLES.map((n) => ({ needle: n, found: body.includes(n) })),
};
out.ok = res.status === 200 && out.needles.every((n) => n.found);
console.log(JSON.stringify(out, null, 2));
