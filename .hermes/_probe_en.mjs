const t = await (await fetch('https://zprintpro.com/en/category/packaging/')).text();
const m = t.match(/<meta name="description" content="([^"]{0,600})"/);
console.log('EN_DESC_LEN=' + (m ? m[1].length : 'MISSING'));
console.log('EN_DESC=' + (m ? m[1].slice(0, 300) : '-'));
const og = t.match(/<meta property="og:description" content="([^"]{0,600})"/);
console.log('EN_OG_LEN=' + (og ? og[1].length : 'MISSING'));
console.log('ENCHECK_DONE');
