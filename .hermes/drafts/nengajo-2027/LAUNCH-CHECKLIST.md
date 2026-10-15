# LAUNCH-CHECKLIST — 年賀状 2027 早鸟页（预埋版已入 src/, NENGAJO_LIVE=false 构建期 404）

> 页面已在 `src/app/[locale]/nengajo-2027/page.tsx`（commit 514f4c48 后续批）; 上线 = 填值 + 翻开关 + sitemap 一行 + 补链, **单次小 diff 当日上线**。预埋版可见文案全为诚实基线（「確定次第更新」）, src 内零槽位字面, 误开也无虚假信息风险。

## K3 待填真值（唯一阻塞, 死线 10/21）
| 槽 | 内容 | 落点 |
|---|---|---|
| ZP-K3-SLOT-1 | 早鸟割引率（% 或 ¥，或「無し・牌価のまま」） | 页面 t.ebSlots + tableRows 早割列 ×18 格 |
| ZP-K3-SLOT-2 | 早割正式締切日（YYYY-MM-DD） | 页面 t.ebBody + FAQ A2 |
| ZP-K3-SLOT-3 | 宛名印刷 可否 + 价格 | 页面 t.atenaBody |

## 上线 runbook（真值到手后 ~20 分钟）
1. `src/app/[locale]/nengajo-2027/page.tsx`: 填 K3 三真值（文件头注释标 [1][2][3] 填值位: 早割率→ebSlot+表列; 締切→ebSlot+FAQ A2; 宛名→atenaBody）+ `NENGAJO_LIVE = true`
2. `scripts/generate-sitemap.js` staticPages 加 `'nengajo-2027/',` → `node scripts/generate-sitemap.js`
3. blog ×3 补链（MERGE-SNIPPETS §3 逐字片段, 各 1 段零改其他字符）
3. 门禁全量: `node scripts/check-encoding.js --fix` → `npx tsc --noEmit`（54=54）→ 标题当量 3/3 in 50-57 → `node scripts/guards/blog-quality-12-rules-guard.js --slug=new-year-card-printing-2027-guide`（补链无回归）→ `node scripts/check-regression-guard.js --commit`（#16 GSC 泄漏 0）→ brand/实体扫描 0
4. commit（只 add 本批 4 文件: page.tsx / generate-sitemap.js / sitemap-content.ts / blog-data ×3）+ push（§0.25 墙钟单列核验，≥30min）
5. 上线验证: `node scripts/verify-deploy.mjs` → curl 3 locale `/nengajo-2027/` 200 + body 含 SKU 表 + JsonLd Service/FAQPage 解析成功 → `node scripts/guards/blog-quality-12-rules-guard.js --slug=new-year-card-printing-2027-guide --online`（段12）
6. 索引刺激: sitemap lastmod + IndexNow 提交 3 URL + GSC 手动请求索引（排程 §6 「索引请求已提交」判据）
7. 台账回写: b1c/排程对账 + 报告 `VERDICT/RECOVERY/DELIVERED` 四行

## 红线
- 真值未到不推任何含空槽的页面（今天骨架只入 drafts，不入 src/）
- 投函締切一律引用日本郵便官方当年案内，不代公佈、不编日期（§0.23）
- 名片词零出现（§0.0）；品牌 ja=ZprintPro 单品牌；「智印港」错拼形态零容忍（不写出错拼字样）
