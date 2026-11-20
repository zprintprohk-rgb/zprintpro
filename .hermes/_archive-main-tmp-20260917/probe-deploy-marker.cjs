#!/usr/bin/env node
/* 只读: 判定「部署是否上线」的最强标记 — 首页 Footer 文案 (批2 改动) + 缓存头 */
const U = 'https://zprintpro.com/zh-hk/';
(async () => {
  const r = await fetch(U + '?cb=' + Date.now(), { headers: { 'user-agent': 'zprintpro-verify/1.0', 'cache-control': 'no-cache' } });
  const html = await r.text();
  console.log('HTTP', r.status);
  console.log('cache-control:', r.headers.get('cache-control'), '| cf-cache-status:', r.headers.get('cf-cache-status'), '| age:', r.headers.get('age'));
  console.log('etag:', r.headers.get('etag'));
  const newTxt = '智印港 是全球智能印刷訂製平台';
  const oldTxt = '智印港 ZprintPro 是全球智能印刷訂製平台';
  console.log(`新文案命中 = ${html.split(newTxt).length - 1} | 旧文案命中 = ${html.split(oldTxt).length - 1}`);
  const t = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [null, ''])[1];
  console.log('首页 title:', t);
  const author = (html.match(/<meta name="author" content="([^"]*)"/i) || [null, ''])[1];
  console.log('author meta:', author);
})();
