# 线上探针记录（push 后第一次，2026-10-26 19:00）

> push: 23f9c81c @ 18:54 → CF build 自动重触发（上一轮 ef3140ac FAILED，check run 121526836891）

## 探针结果（19:00，push 后 ~6 分钟）

| 目标 | 结果 | 判读 |
|---|---|---|
| `https://zprintpro.com/robots.txt` | **404** | 线上仍旧状态（app/robots.ts 未生效）——build 未部署或又 FAILED |
| `/en/product/saddle-stitch-booklets/` | 200，H1 = **「Saddle Stitch Booklets 100+ \| ZprintPro」** | 旧版 H1（100+ 残留）——旧 build |
| `/en/product/exercise-books/` | 200，H1 = **「Exercise Books 100+ \| Perfect Bound」** | 旧版 H1 + Perfect Bound 残留——旧 build |

## 二次探针（19:05，push 后 ~11 分钟）——仍 FAIL

| 目标 | 结果 | 判读 |
|---|---|---|
| `robots.txt` | **404** | 11 分钟 build 应已完成——线上仍未部署 |
| saddle H1 | 「Saddle Stitch Booklets **100+**」 | 旧版——P0-3 未上线 |
| exercise H1 | 「Exercise Books **100+** \| Perfect Bound」 | 旧版 + Perfect Bound 残留——P0-3 未上线 |

## 判读（最终）

- **连续两次 CF build 疑似 FAILED**：ef3140ac（18:38，lane 确认 check run 121526836891）+ 23f9c81c（18:54，19:00/19:05 两次探针均未部署）。
- 线上 = 旧 build（P0-2 robots / P0-3 MOQ / 年賀状撤早割均未上线）。
- **本地无法复现**：本地 build PASS（726 URLs / .next/server/app/robots.txt 生成）+ tsc 54=54 + 门禁全绿。
- **处置（需 K3）**：查 CF Dashboard build logs（本轮 push 23f9c81c 与上轮 ef3140ac 的 check run + 失败原因）；若 CF 侧配置/权限问题（私有仓库、build command、内存），修复后重推或手动重跑 build。
- 数据来源: 本探针（urllib.request GET，UA=Mozilla/5.0，2026-10-26 19:00 / 19:05 Asia/Shanghai）。

---

## 勘误（2026-10-26 22:00 · §0.23 撤回声明）

- **撤回上方「连续两次 CF build 疑似 FAILED」最终判读（L21-26）**：21:32/21:40 线上探针确认 **23f9c81c 的 CF build 实际部署成功**——saddle/exercise H1 已更新为「from 10 Copies」、年賀状撤早割已上线。19:00/19:05 看到的旧 H1 + robots 404 = **CF build 部署延迟/切换期**（build 完成但尚未切流），非 build 失败。
- **robots.txt 404 独立成立**：它确实是线上问题（非 build 问题）——CF Pages 将 /robots.txt 视为保留路径，MetadataRoute / route handler / public 静态均被平台行为拦截。修复 = CF Pages Functions（`functions/robots.txt.ts`，commit 9ad7dbf3 + 028233aa）——见 `.hermes/logs/2026-10-26-cf-build-root-cause-diagnosis.md` §4.1。
- 本勘误保留 19:00/19:05 原始探针数据（时间戳不可改写），仅纠正判读。

## 验收（2026-10-26 22:16 · P0-2 robots.txt PASS）

- **push c901bcb7（22:11:54，9 commit 含 CF Functions 方案）→ CF build 部署后探针**：`https://zprintpro.com/robots.txt` **HTTP 200**，内容 = 12 AI allow（GPTBot/OAI-SearchBot/ChatGPT-User/ClaudeBot/Claude-Web/anthropic-ai/PerplexityBot/Perplexity-User/Google-Extended/Applebot-Extended/Bytespider/CCBot）+ Sitemap ×2（sitemap.xml + sitemap-image.xml）+ 无 /_next/ Disallow → **P0-2 验收 PASS**。
- **双方法（§0.23.2）**：`_probe_postpush.py`（urllib 带 UA）200 + 内容逐项验证 ✓；curl 带 UA 复核返回完整文本 ✓。无 UA 的 curl 被 CF challenge（`Attention Required!` 页）= CF 对裸 UA 的 bot 防护，非内容问题。
- **既有部署保持**：saddle/exercise H1「from 10 Copies」200 ✓；年賀状 ja title「年賀状 2027 印刷 10枚から ¥20〜 オリジナル」200 ✓。
- 数据来源: 本探针（urllib.request GET + curl，UA=Mozilla/5.0，2026-10-26 22:16 Asia/Shanghai）。

