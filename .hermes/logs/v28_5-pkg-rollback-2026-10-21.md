# 包装盒订制类目图片撤回（K3 2026-10-21 指令）

> **指令原话**: 「这次的包装盒订制分类类目下的SKU图片不达标，在这一类目下的SKU做撤回」
> **执行**: AutoClaw 主会话 · 2026-10-21 19:5x · 数据来源: `src/data/products.ts`（category_slug 提取）+ `git show 62c9b070:src/data/products.ts`（前交换态）+ `git show HEAD:public/sitemap-image.xml`（独立审计基线）

## 1. 范围界定（objective）

- **packaging 类目 = 12 SKU**（products.ts `category_slug='packaging'` 提取，全站类目分布核对：packaging 12 / stickers 9 / flyers 7 / posters 6 / calendars 6 / red-packets 6 / paper-bags 6 / greeting-cards 6 / books 5 / educational 5 / menus 4 / banners 4 / envelopes 4 / wedding-invitations 2 / japan-doujin 1 = 83 ✓）
- **已换图 10 个 → 全部撤回**：corrugated-boxes · cosmetic-boxes · electronics-packaging-box · gang-run-card-boxes · kraft-paper-packaging-box · magnetic-closure-gift-box · mailer-boxes · rigid-boxes · tuck-end-boxes · white-card-boxes
- **未换图 2 个 → HOLD（防 W6 误推）**：food-boxes · folding-boxes

## 2. 回滚口径（surgical，只动图片字段）

- 恢复内容：每个 SKU 的 `imagesByLocale`（3 语数组）+ legacy `images[]`，取自 **62c9b070**（W1 之前的最后状态）
- **不动**：description / AEO 直答段 / 单位修正（100張→個）/ 价格 / FAQ / seoImages / imageAlt —— 期间其他会话对这些产品的文案合法修改全部保留
- 删除 `public/images/products/v28_5/<10 slug>/`（120 文件）；旧图文件从未删除 → 旧 URL 永远 200，零死链
- sitemap 重生成（修复版生成器）：旧的 138 条图片 URL 全部回位

## 3. 断言与双方法审计（全绿）

| 断言 | 结果 |
|---|---|
| 非目标 slug 整块字节等价（73 个）| 通过 |
| 目标块：剥离两个图片 span 后文本逐字节不变 | 通过 |
| IBL 恢复值 == 62c9b070 原值（10/10 深比较）| 通过 |
| 独立审计（对 git HEAD 旧 sitemap）：lost=120 全为目标 SKU；**lostNonTarget=0** | 通过 |
| 旧图片 URL 回位：**138/138** present | 通过 |
| v28_5 计数：sitemap **492**（612−120）、products.ts 引用 **533**（663−130）| 精确 |
| 目录数 41（51−10）；目标目录残留 0 | 精确 |
| 禁改字段（title_zh/minQuantity/basePrice/seoImages/imageAlt）| 全 0 |
| tsc | 54 = 基线 |

> 过程缺陷如实记录：回滚脚本初版把「基线重生成」放在改写之后 → 零回归断言变成同义反复；已修正为「改写前取基线」，并用**独立审计脚本**（对 git HEAD 的 sitemap 做 diff）补做真实回归核验。

## 4. HOLD 名单与波次影响（builder 内固化）

`scripts/v28_5-build-manifest.mjs` 新增 `HOLD` 表（12 个 packaging SKU，含未部署的 2 个），verdict = `hold-images-rejected`，任何波次命令都不会再包含它们。manifest 重建后：

- W1-1017：5 → **2**（剩 spiral-notebooks / thick-paper-flyers）
- W2-1018：33 → **26**
- W6-1022-CTR-gated：12 → **10**
- **明日 W6（10/22）范围收缩为：PB 6 + MN 4 + RP 6 = 16 SKU**（仍以 CTR 首判为前置）

## 5. 线上验证与后续

- 回滚 commit 与本日闸门修复 commit 同批推送（窗口 ≥ 20:14:42，v2 闸控），推送后由后台脚本自动核验：10 SKU × 3 locale 的 PDP **不含** `/images/products/v28_5/<slug>/`、旧图抽样 200（日志 `.hermes/logs/v28_5-pkg-rollback-verify-2026-10-21.log`）
- **重做路径（待 K3）**：packaging 新图入库（或从 v28_5 库中挑替代方案）后，由 K3 指令解除 HOLD 并重排波次；在此之前该类目保持现状（旧图在线，零风险）
- 工具沉淀：`scripts/v28_5-image-rollback.mjs`（通用逐 SKU 图片回滚，`--slugs=... --from-commit=... [--dry-run]`）
