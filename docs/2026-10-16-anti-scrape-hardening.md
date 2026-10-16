# 2026-10-16 反爬反制落地报告（针对 hkprint58.com 鑫印吧仿站）

> K3 2026-10-16 12:19 指令：全权执行「技术层反爬」四项。执行者：Kimi Work 会话。
> 锁：SESSION_LOCK.md 2026-10-16 12:2x 持有声明。

## 背景

hkprint58.com（鑫印吧）整站仿制本站：品类结构（包装盒/书刊/贴纸/纸袋/校园/咭片/信封/数码/同人志/喷绘）、「HK$0.25/张起 · 100件参考价 · 整批」报价格式、FAQ 问答体、「5 台海德堡 + 3 台惠普 B2 + 15,000+ 客户 + 顺丰 48 小时」话术骨架，仅替换品牌与联系方式。

## 已落地四项

### 1. 文案指纹（证据层）

| 位置 | 内容 | 档号 |
|---|---|---|
| 页脚（3 语，全站每页） | 可见原创声明 + 档号（zh-hk 智印港 / en-ja ZprintPro，单品牌不并现） | `ZP-OC-2610` |
| **`product-faqs.ts` 活 FAQ ×8 处**（7 类目数组 + skuMoneyFAQs[saddle-stitch-booklets]，三语） | 「你哋嘅廠喺邊？係咪自己印？」真实平湖嘉城路工厂事实 + 唯一留样档号，产品页可见 FAQ + FAQPage JSON-LD 同源渲染 | `ZPQC-2610-{ST,FL,PBX,PO,PB,CAL,ENV,SSB}` |
| `products.ts` 8 SKU faqSchema 第 5 条 QA（英文） | 同口径英文 QA | `ZPQC-2610-{WS,KB,A4F,A2P,MB,FRP,WC,SSB}` |

> **执行修正记录**：首注后发现 `products.ts faqSchema` 全站无消费点（死数据，仅类型声明处引用），活 FAQ 数据源为 `src/data/product-faqs.ts`（`coreProductFAQMap` 类目级 + `skuMoneyFAQs` SKU 级，page.tsx 挂载）。已补注活数据源 8 处；死数据中的 8 条英文 QA 保留（内容真实、零渲染风险，未来若接线即自带指纹）。注入脚本：`.hermes/_inject-live-faq-fingerprint.py`（活）+ `.hermes/_inject-faq-fingerprint.py`（死），均幂等。

- 8 SKU = waterproof-stickers / kraft-paper-bags / a4-flyers / a2-posters / mailer-boxes / foil-red-packets / wall-calendars / saddle-stitch-booklets（对方抄袭最重的 8 个品类各 1 个）。
- 注入脚本：`.hermes/_inject-faq-fingerprint.py`（幂等，块内含 `ZPQC-` 即跳过）。
- SSoT：`src/data/copy-fingerprints.ts`；页脚渲染点：`src/components/layout/Footer.tsx`（`data-copy-fingerprint`）。
- 避让：title 六槽冻结域零触碰；greeting-cards 6 SKU 资产零触碰；middleware 301 零触碰；certificates/foil-stickers 冻结槽零触碰。
- 取证用法：Google 精确搜 `"ZP-OC-2610"` / `"ZPQC-2610-WS"` 或指纹长句，命中对方站 = 逐字复制铁证。

### 2. 指纹轮换器

- `scripts/rotate-copy-fingerprint.mjs`：每月把页脚档号轮换为当月 `ZP-OC-YYMM`，账本 `.hermes/logs/copy-fingerprint-rotation.jsonl`，当月幂等 no-op。
- 接入建议（**待 K3 拍板**）：monthly-matrix 车道（每月 1 号 06:13）加一步 `--apply`；当前为手动/会话触发。

### 3. 图片水印

- `scripts/watermark-images.py`：1812 张图片原位叠加对角平铺半透明水印「zprintpro.com」（域名中性，不碰双品牌铁律；白字 78α + 黑描边，亮暗底均可见）。
- 范围：products / products-localized / factory / samples / categories / japan / articles / v26 / blog / blog-m3；跳过 hero、payment、backup、logo/icon、svg、宽 <320px。
- 进度标记 `.hermes/logs/watermark-done.json`（sha mtime+size 签名），重复跑幂等；图片更新后重跑只补新图。
- 回滚：`git checkout -- public/images/` 即可全量还原（全部在 git 内）。
- 执行结果：1812 ok / 0 fail（首轮 300s 超时杀了 887/1812 处，按 mtime 重建标记后续跑完成，无双重水印）。

### 4. Cloudflare 拦截（**待 K3 一次性操作**）

- 本环境无 zone 级 `CLOUDFLARE_API_TOKEN`（仓库与 env 已查，均无），Bot Fight Mode / WAF 属 zone 级开关，无法代执行。
- 交付 `scripts/cf-bot-hardening.sh`：K3 在 CF 后台生成 token 后 `export CLOUDFLARE_API_TOKEN=... CF_ZONE_ID=... && bash scripts/cf-bot-hardening.sh` 一次即可，含 ① Bot Fight Mode ② scraper UA 拦截规则 ③ /images//category//product/ 路径 120rpm/IP 限速 challenge。
- **或纯手动**：CF Dashboard → Security → Bots 开 Bot Fight Mode（免费），30 秒搞定，效果覆盖第①条。

## 验证

- 第一批 push `cce4bf23`（12:46）：CF deploy PASS；线上探针：首页/en 页脚 `ZP-OC-2610` ✓。
- 第二批（活 FAQ 修正）：`npx tsc --noEmit` 54 = 基线 0 增量 ✓；brand-lint A 类 0 命中 ✓；push-gate 机器闸（15m 拦截后窗口重开再过）。
- 上线后探针（第二批 push 后）：`/zh-hk/product/waterproof-stickers/` HTML 含 `ZPQC-2610-ST`；任一产品图可见对角水印。

## 遗留（上报 K3）

1. CF token 需 K3 生成（或手动开 Bot Fight Mode）。
2. 轮换器接入 monthly-matrix 车道待拍板。
3. hero/hero-v21 首页主视觉未加水印（保护转化视觉）；如需一并覆盖，一句话即可补跑。
4. 取证/摊牌/DMCA 流程见首轮回复，证据清单制作可随时开工。
