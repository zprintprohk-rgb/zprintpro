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

1. **CF Error 1015 误伤实测（2026-10-16 18:19）**：首轮截图时，`/en/product/waterproof-stickers/` 与 `/zh-hk/category/packaging/` 因一次加载并发拉取数十张 `/images/` 触发我方限速规则（20 次/10 秒）被拦，截图捕获 1015 页（Ray ID: ab6521e1ab543df9）。两页已用小视口重拍成功（1149KB / 1655KB）。**含义**：真人用户快速连点页面存在被 1015 误伤的真实风险，已上报 K3 建议拆分规则（HTML 路径保持 20/10s，`/images/` 放宽或移出）。
2. **SPN 匿名限流（429）**：队列带 65s 退避重试，逐条结果见日志；若个别 URL 最终失败，后续会话用注册态 SPN 补存。

## 我方原创性锚点（配套）

- 指纹/水印上线 commit：`cce4bf23`（页脚 ZP-OC-2610 + 8 SKU 档号 + 1812 张水印 + 轮换器）、`ffe0cf6e`（活 FAQ 数据源补注）
- git 仓库全历史（2026-05-08 上线至今）+ GSC 首收记录（K3 后台）
- 本证据库入库 commit：见 git log（evidence(hkprint58) 字样）

## Wayback CDX 终验（追加区）

（SPN 队列完成后回填：每 URL 的快照时间戳 + 抽查内容非 403/1015 块页）
