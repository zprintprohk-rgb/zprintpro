#!/usr/bin/env node
/**
 * scripts/fix-entity-zhhk-blogdata.mjs — §0.32 实体禁词修正 (2026-09-13, 守卫真扫 blog-data 后发现)
 * zh-hk blog 正文「事實卡」出现法人全称「深圳市彩龍印刷包裝有限公司」×2 (K3 9/1 18:50 §0.32 硬规则: zh-hk 不得出现)
 * 修法: 改用 K3 9/1 18:58 批准的表述 →「主體：智印港（彩龍印刷旗下）」
 * §12 三件套 + 回滚映射; 断言未过不写盘。
 */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const DRY = process.argv.includes('--dry');
const TS = new Date().toISOString().replace(/[:.]/g, '-');
const REL = 'src/data/blog-data/zh-hk.json';
const FROM = '主體：深圳市彩龍印刷包裝有限公司';
const TO = '主體：智印港（彩龍印刷旗下）';
const BANNED = '深圳市彩龍印刷包裝有限公司';

const raw = readFileSync(join(ROOT, REL), 'utf8');
const errs = [];
const n = raw.split(FROM).length - 1;
if (n !== 2) errs.push(`计数断言失败: 「${FROM}」= ${n} (期望 2)`);
let json0; try { json0 = JSON.parse(raw); } catch (e) { errs.push('前置 JSON 非法: ' + e.message); }
const keys0 = json0 ? Object.keys(json0).length : 0;
const next = raw.split(FROM).join(TO);
if (next.includes(BANNED)) errs.push('形状断言失败: 仍残留法人全称');
if (!next.includes(TO)) errs.push('形状断言失败: 未见新表述');
if (raw.length - next.length !== n * (FROM.length - TO.length)) errs.push('长度差断言失败');
let json1; try { json1 = JSON.parse(next); } catch (e) { errs.push('后置 JSON 非法: ' + e.message); }
if (json1 && Object.keys(json1).length !== keys0) errs.push('键数变化');

if (errs.length) { console.error('[FAIL] 断言未过, 未写盘:'); errs.forEach(e => console.error('  - ' + e)); process.exit(1); }
console.log(`[断言通过] ${REL}: 「${FROM}」×${n} → 「${TO}」`);
if (DRY) { console.log('[dry] 未写盘'); process.exit(0); }
const BK = `.hermes/backup-entity-${TS}`;
mkdirSync(join(ROOT, BK), { recursive: true });
copyFileSync(join(ROOT, REL), join(ROOT, BK, 'zh-hk.json'));
writeFileSync(join(ROOT, `.hermes/rollback-entity-${TS}.json`), JSON.stringify({ at: TS, items: [{ file: REL, before: FROM, after: TO, count: n }] }, null, 1), 'utf8');
writeFileSync(join(ROOT, REL), next, 'utf8');
console.log(`[备份] → ${BK}\n[回滚] .hermes/rollback-entity-${TS}.json`);
