import fs from 'node:fs';
const DAEMON = 'http://127.0.0.1:10086/command';
const SESSION = 'l1-1-serp-check';
async function cmd(action, args) {
  const res = await fetch(DAEMON, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action, args, session: SESSION }) });
  const t = await res.text();
  return { status: res.status, body: t.slice(0, 1200) };
}
const r1 = await cmd('navigate', { url: 'https://www.google.com.hk/search?q=%E9%A3%9F%E5%93%81%E5%8C%85%E8%A3%9D%E5%8D%B0%E5%88%B7&hl=zh-HK&gl=hk&pws=0' });
console.log('NAV:', JSON.stringify(r1));
await new Promise((r) => setTimeout(r, 3000));
const r2 = await cmd('evaluate', { code: 'JSON.stringify({href:location.href,title:document.title,len:document.body?document.body.innerText.length:-1,head:document.title.slice(0,80)})' });
console.log('EVAL:', JSON.stringify(r2));
const r3 = await cmd('evaluate', { code: 'document.body.innerText.slice(0,400)' });
console.log('TEXT:', JSON.stringify(r3));
