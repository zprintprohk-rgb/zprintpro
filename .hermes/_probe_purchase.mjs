// Buy Now batch1 probe: purchase block rendered in PDP SSR HTML? (client comp renders null on SSR!)
// NOTE: 'use client' component SSR-renders its initial state (visible: qty row + buttons) — data-purchase-block marker should be in HTML
const h = await (await fetch('https://zprintpro.com/zh-hk/product/kraft-paper-bags/')).text();
console.log('PDP_HAS_PURCHASE_BLOCK:', h.includes('data-purchase-block'));
console.log('PDP_HAS_ADD_TO_CART:', h.includes('加入購物車'));
console.log('PDP_HAS_BUY_NOW:', h.includes('立即購買'));
console.log('PDP_HAS_QTY_INPUT:', h.includes('qty-kraft-paper-bags'));
console.log('PURCHASE_PROBE_DONE');
