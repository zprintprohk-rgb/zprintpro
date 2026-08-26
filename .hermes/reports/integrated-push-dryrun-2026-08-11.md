# 整合 push dry-run · 2026-08-11（M3 cron 触发，只验不推）

> 执行时间：2026-08-11 ~05:5x Asia/Shanghai（cron bb09d556）
> 目的：验证整合 push 所需代码树状态，供 K3 回填 1-5 OK 后 30 分钟内可推
> 审批状态：**PENDING**（X URL / LinkedIn URL / IndexNow key 三项待填）→ 今日不 push

## 一、4 步 smoke 结果

| 步骤 | 命令 | 结果 |
|---|---|---|
| 1 编码检查 | `node scripts/check-encoding.js --fix` | ✅ exit 0（无 staged 文件需修） |
| 2 简体扫描 | `node scripts/scan-simplified.mjs` | ✅ exit 0（零简体） |
| 3 类型检查 | `npx tsc --noEmit` | ✅ 非测试目录 0 error（51 errors 全在 quote-engine/__tests__/，KNOWN PRE-EXISTING） |
| 4 本地构建 | `npm run build` | ✅ exit 0（603 URLs / Blog 85 / Categories 14 / Products 85，3 locale 各 201，IndexNow 3 locale ping） |

## 二、部署实况（HEAD）

- HEAD = **d119014**（3 unverified 转化坏链修复）
- CF Pages：**success**（run 93657996175，verify-deploy 二次复查 PASS）
- 远程 origin_ssh/main 与本地一致，ahead 0

## 三、Batch A（零依赖项）落地核验 — 已随 c4a8c5f 上线

| 项 | 状态 | 证据 |
|---|---|---|
| 品牌名 helper | ✅ 已完成 | seo.ts L34 `getBrandName(locale)` 三语分支（实为 getBrandName 非 getSiteName） |
| 4 页面模板切换 | ✅ 已完成 | about/blog/case-studies/press-kit 的 siteConfig.name 直连数 = 0 |
| schema sku 补全 | ✅ 已完成 | schema-extensions.ts 含 sku（2 处） |
| business-cards 死数据清理 | ✅ 已完成 | seo.ts 仅剩 L611 一条"勿写 business-cards"注释，无实际死数据 |
| cron prompt v9.1 | ✅ 已提交 | 随 c4a8c5f（+132 行） |
| AGENTS.md 教训固化 | ✅ 已提交 | 随 c4a8c5f（+63 行） |
| matrix.json 回写 | ✅ 已提交 | 随 c4a8c5f（+25 行） |
| llms.txt 品牌 | ✅ 已完成 | 首行 `# ZprintPro` |

## 四、Batch B（阻塞项，等 K3 三输入）

| 项 | 状态 | 阻塞于 |
|---|---|---|
| Organization sameAs（X + LinkedIn + 目录） | ⏸ 待实施 | X URL / LinkedIn URL 待填 |
| IndexNow key 配置 | ⏸ 待实施 | IndexNow key 待填 |

## 五、§0.16 清理批（8/13-8/17 排期，非整合 push 范围）

- products.ts 智印雲 残留：**840 行**（8/13/15/17 三批清理主战场，已预留 3 push 槽位）

## 六、结论

**PASS（dry-run）**。Batch A 全部已上线且经 CF success 验证；Batch B 仅等 K3 三输入，代码树本身零阻塞。K3 回填 `1-5 OK` + 三项 URL/key 后，整合 push 可当日执行（与当日 retrofit 合并 1 push）。

> 注：今日实际 push = 4（c4a8c5f / edb9e69 / 3fdf13a / d119014），均已 CF success。本 dry-run 不产生新 push。
