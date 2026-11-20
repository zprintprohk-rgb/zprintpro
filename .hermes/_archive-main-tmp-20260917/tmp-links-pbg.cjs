const fs=require('fs');
const prod=fs.readFileSync('src/data/products.ts','utf8');
const prodSlugs=new Set([...prod.matchAll(/slug:\s*'([a-z0-9-]+)'/g)].map(m=>m[1]));
const bp=fs.readFileSync('src/data/blog-posts.ts','utf8');
const blogSlugs=new Set([...bp.matchAll(/slug: '([a-z0-9-]+)'/g)].map(m=>m[1]));
const bg=fs.readFileSync('src/data/buying-guides.ts','utf8');
const bgSlugs=new Set([...bg.matchAll(/slug: '([a-z0-9-]+)'/g)].map(m=>m[1]));
const i=bg.indexOf(`slug: 'packaging-buying-guide'`);
const cStart=bg.indexOf('content: {', i);
const cEnd=bg.indexOf('\n  },', cStart);
const block=bg.slice(cStart, cEnd);
let bad=0;
for(const m of block.matchAll(/href="([^"]+)"/g)){
  const h=m[1];
  if(h.includes('wa.me')||h.startsWith('http')) continue;
  const s=h.replace(/\/+$/,'').split('/').pop();
  if(h.includes('/product/')){ if(!prodSlugs.has(s)){bad++;console.log(`❌ product:${s}`);} }
  else if(h.includes('/blog/')){ if(!(blogSlugs.has(s)||bgSlugs.has(s))){bad++;console.log(`❌ blog:${s}`);} }
  else if(h.includes('/category/')){ if(!['packaging','stickers','flyers','posters','paper-bags','banners','books','menus','envelopes','calendars','red-packets','educational','japan-doujin','greeting-cards','wedding-invitations','place-cards','stationery','labels'].includes(s)){bad++;console.log(`❌ category:${s}`);} }
}
console.log(bad?`${bad} 个死链`:'✅ 全部内链目标有效');
