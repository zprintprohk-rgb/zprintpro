/**
 * sticker ja: 补作者署名块 (LinkedIn 信号) —— 三语 E-E-A-T 署名段一致性修复
 * (K3 2026-09-19 评估第三点: sticker ja content 侧缺 LinkedIn, zh-hk/en 均有 ⇒ 三语不一致)
 *
 * 做法: 在 ja content 末尾的 CTA 块之后追加与 zh-hk/en **同构**的日文署名块
 *   (原作者实体 + LinkedIn sameAs 锚 + 站点锚), 只新增该段, 其余字节不动 (断言保证)。
 *
 * 用法: node .hermes/_probe-pb/add-sticker-ja-author.mjs [--apply]
 */
import fs from 'fs';

const APPLY = process.argv.includes('--apply');
const SLUG = 'sticker-material-pvc-vinyl-removable';
const p = 'src/data/blog-data/ja.json';
const raw = fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, '');
const data = JSON.parse(raw);
const entry = data[SLUG];
if (!entry) { console.log('🔴 无该 slug'); process.exit(1); }
const before = entry.content;

if (/linkedin\.com/i.test(before)) { console.log('✅ ja 已含 LinkedIn 信号 (幂等, 跳过)'); process.exit(0); }

// 与 zh-hk/en 同构的日文署名块 (结构一致: 作者实体 + LinkedIn 锚 + 站点锚)
const BLOCK = '\n\n<p class="text-sm text-gray-600 mt-2">執筆: ZprintPro 印刷工程チーム (15 年オフセット印刷エンジニア) ・ <a href="https://www.linkedin.com/in/zprintpro-engineer" class="text-[#2873F5] hover:underline">zprintpro-engineer</a> ・ ZprintPro 越境印刷 SaaS ・ <a href="https://zprintpro.com/ja/" class="text-[#2873F5] hover:underline">zprintpro.com</a></p>';

// 定位末尾 CTA 块 (最后一个 </div>) 之后插入, 保持「CTA 之后 = 署名段」这一既有结构顺序
const lastDiv = before.lastIndexOf('</div>');
if (lastDiv < 0) { console.log('🔴 未找到 </div> 锚点, abort'); process.exit(1); }
const insertAt = lastDiv + '</div>'.length;
const out = before.slice(0, insertAt) + BLOCK + before.slice(insertAt);

// 断言: 除新增块外, 原文逐字保留
if (out.replace(BLOCK, '') !== before) { console.log('🔴 断言失败 — 除新增块外 content 被改动, abort'); process.exit(1); }
if (out.length !== before.length + BLOCK.length) { console.log('🔴 断言失败 — 长度不守恒, abort'); process.exit(1); }
console.log(`${APPLY ? '写入' : 'DRY-RUN'} ja: 追加署名块 ${BLOCK.length} 字节 | content ${before.length} → ${out.length}`);
console.log('  新增块内容: ' + BLOCK.trim());
if (APPLY) {
  entry.content = out;
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log('  ✅ 已写入');
}
