// .hermes/_lock_update.cjs — 释放块定点更新 (簇9.5 收口)
const fs = require('fs');
const p = 'SESSION_LOCK.md';
let t = fs.readFileSync(p, 'utf8');
const BT = String.fromCharCode(96); // backtick
const oldSeg = '✅ 恢复系数 10-16 窗 120.6%（条件① 2/3 日）✅ 簇9 三层清扫完成：sku-seo.ts+CSV（批凒A 266 纯口径 + 批凒B 13 逐 SKU 真值 + KEEP 34 精确保护 + ja 副作用 32 处纠正）+ products.ts（ISO:2015 ×9 + MOQ ×27 全 KEEP 审计）✅ 簇9.5 全站 CRED 残余面已计量落盘（ISO 568/Heidelberg 354/SGS 103/15+年 17 ≈ 1,030+，`b1c-cluster95-surface-2026-10-16.json`）= **下一会话首批**。SSoT `docs/2026-10-16-b1c-cluster9-body-sweep.md`。**本锁释放。下一棒：簇9.5 全站清扫 → 10/22 年賀状翻开关（K3 真值 10/21）+ CTR 首判（K3 导档）。**';
const newSeg = '✅ 恢复系数 10-16 窗 120.6%（条件① 2/3 日）✅ 簇9 三层清扫完成（批次A 266 + 批次B 13 + KEEP 34 + products.ts ×9，MOQ ×27 全 KEEP 审计）✅ **簇9.5 全站 CRED 清扫 DONE**：~660 处（ISO 9001 全变体 + 15+年族 + 15,000+ 族 + 自設廠房→平湖廠房 ×256 + FSC C123456 假号 + ja 简体 胶装/规格 CSV 源头修）+ **扣分项闭环**（CRED 存量基线只许递减 / 4_PLUS 上下文白名单 / Heidelberg 品牌白名单 K3 9-19 选 A / i18n §0.0 六槽豁免）本批 0 次 --no-verify；线上探针 a4/about ISO=0。SSoT `docs/2026-10-16-b1c-cluster95-sweep.md`。**本锁释放。下一棒：解除判定（K3 10-17 导档+GA4）→ 年賀状 10/22 → CTR 首判 → C107；9.5-B/C（Heidelberg 表述/SGS 真伪）+ 2 篇 ja 巨型博客 + 1,000+ 孤立行 = 残余待 K3。**';
if (!t.includes(oldSeg)) { console.log('FAIL seg not found'); process.exit(2); }
t = t.replace(oldSeg, newSeg);
t = t.replace('簇9 全站清扫 DONE + 恢复系数 120.6% 落盘', '簇9 全站清扫 DONE + 簇9.5 全站 CRED 清扫 DONE + 千问扣分项闭环');
// 顺带修正历史批次字 (凒→次)
t = t.split('批凒').join('批次');
fs.writeFileSync(p, t, 'utf-8');
console.log('lock release block updated (cluster9.5 close-out)');
