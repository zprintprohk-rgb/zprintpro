# 证据留底档案 — 鑫印吧（hkprint58.com）× 智印港（zprintpro.com）

**建档**：2026-10-16 18:0x-18:2x（北京时间）· AutoClaw 会话，K3 全权委托
**用途**：摊牌 / Google DMCA / 主机商投诉的证据原件库。配套分析见 `docs/2026-10-16-hkprint58-vs-zprintpro-forensics-checklist.md`。
**时间戳**：本目录随 git 入库，commit SHA 即我方对「对方侵权现状 + 我方在先内容」的第三方可验证时间戳（GitHub 服务器时间）；Wayback 存档结果见 `logs/spn-log.txt`。

## 方法

| 件 | 方法 |
|---|---|
| HTML（15 页） | PowerShell Invoke-WebRequest，UA=Chrome/131（我方 WAF 白名单形态，对方站无拦截），原始字节落盘，重定向最终 URL 记录于日志 |
| 截图（9 张） | Edge 131 headless=`new`，窗口 1440×N，UA 覆写为同上（剥离 HeadlessChrome 特征），PNG 原件 |
| SHA256 | `SHA256SUMS.txt`（全量 HTML+PNG，入库后可随时校验是否被篡改） |
| Wayback SPN | 匿名 Save Page Now 队列（15 URL，45s 间隔 + 429 退避），日志 `logs/spn-log.txt`；CDX 复核结果追加于本文件末尾 |

## 文件清单

```
target/html/   对方 5 页：home / en-waterproof-stickers / zhiyingang-brand-story / faq-bd8520663ab2 / case-skincare-brand
target/png/    对方 5 页整页截图
ours/html/     我方 10 页：zh-hk 首页 / en 首页 / 4 个产品页 / 2 个品类页 / zh-hk FAQ / 旧站 z-printpro.com（实测已 301 → 新站，最终 URL 见日志）
ours/png/      我方 4 页整页截图
logs/          download-log.txt（HTTP 状态+最终 URL+字节数）/ spn-log.txt（Wayback 队列）
SHA256SUMS.txt 全量哈希
```

## 已知事件记录（诚实留痕，per §0.23）

1. **CF Error 1015 误伤实测（2026-10-16 18:19）→ ✅ 已修复（同日 18:4x）**：首轮截图时，`/en/product/waterproof-stickers/` 与 `/zh-hk/category/packaging/` 因一次加载并发拉取数十张 `/images/` 触发我方限速规则（20 次/10 秒）被拦，截图捕获 1015 页（Ray ID: ab6521e1ab543df9）。两页已用小视口重拍成功（1149KB / 1655KB）。**修复**：限速规则已改 v2（仅限 HTML 路径 20/10s，/images/ 移出限速），线上探针验证图片 40 连发 0 拦截、HTML 第 21 发起拦；真人误伤面已消除（详见 anti-scrape 报告 §4）。
2. **SPN 匿名限流（429）→ 根因 = Internet Archive 当日临时故障**：第一轮 3/15 成功（成功的含最关键的我方首页）；12 URL 待 IA 恢复后用 round2 脚本补存（170s 间隔）。

## 我方原创性锚点（配套）

- 指纹/水印上线 commit：`cce4bf23`（页脚 ZP-OC-2610 + 8 SKU 档号 + 1812 张水印 + 轮换器）、`ffe0cf6e`（活 FAQ 数据源补注）
- git 仓库全历史（2026-05-08 上线至今）+ GSC 首收记录（K3 后台）
- 本证据库入库 commit：见 git log（evidence(hkprint58) 字样）

## Wayback CDX 终验（追加区）

**第一轮 SPN（2026-10-16 18:20-18:55）**：3/15 成功（匿名接口限流，根因 = Internet Archive 当日临时故障，快照读取页实测显示 "Internet Archive services are temporarily offline"）：

| URL | 快照 | 状态 |
|---|---|---|
| zprintpro.com/zh-hk/ | [20261016100704](https://web.archive.org/web/20261016100704/https://zprintpro.com/zh-hk/) | ✅ 全文验证：真页面，页脚指纹 ZP-OC-2610 已被封存 |
| zprintpro.com/en/category/stickers/ | [20261016103400](https://web.archive.org/web/20261016103400/https://zprintpro.com/en/category/stickers/) | 已存（SPN 返回快照 URL；IA 故障期间暂不可读，恢复后可读） |
| zprintpro.com/zh-hk/faq/ | [20261016103724](https://web.archive.org/web/20261016103724/https://zprintpro.com/zh-hk/faq/) | 已存（同上） |

**待补存 12 URL**（IA 恢复后跑 `.hermes/tmp/evidence-20261016/spn-round2.ps1`，间隔 170s，侵权方 5 页优先；我方原创性已由首页快照 + git 历史 + 本证据库入库 commit 三重锚定，补存为增量加固）:
对方 5 页（home / en-waterproof-stickers / zhiyingang-brand-story / faq-bd8520663ab2 / case-skincare）+ 我方 en 首页 + 4 产品页 + zh-hk packaging 品类页 + 旧站 z-printpro.com（本地已存其 301 → 新站实证，旧站无独立存档页面可存）。
