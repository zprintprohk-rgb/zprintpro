# -*- coding: utf-8 -*-
import io
import sys

CONTENT = """

### 88fd338 漏修模式 + 报告后不能「等 K3 拍板」(2026-07-31 zprintpro 跨项目教训, 升级版)

**症状**:
- 7/30 12:19 88fd338 commit 修 2 处 syntax (en L141 + products L3381), Vercel 报错的 }, 修了
- 7/30 12:32 M3 verify FAIL 报告 → "build 失败, K3 拍板 A/B/C" → 21h 没主动跟进
- 7/31 10:36 K3 紧急升级: 88fd338 卡死 21h+, 业务链堆积
- 7/31 10:38 M3 才发: 88fd338 漏修 3 处 about syntax (L85 zh-hk }, + L114 en 缺换行 + L169 ja 缺换行 + L196 ja },)

**根因**:
1. **同 bug 模式重复 4 处** - fix-about-k4-v2 写 about 时, zh-hk/en/ja 3 翻译块都有同样 syntax bug (多余 }, + 缺换行), 但 Vercel webpack 遇第一个 SyntaxError stop, 报的是 L138-141 en 错位, 88fd338 修这一个就以为完事
2. **M3 报告后「等 K3 拍板」** = 21h 没主动跟进 (12:32 → 10:36 22h) - K3 紧急升级是 P0, M3 应该 2h 内就二次升级

**修复**:
- 7/31 10:36 M3 收到 K3 紧急升级 → 10:38 修完 4 处 + 1 commit f5700f9 + 1 push (1 build 1 push 解决全部)
- Vercel build 应 1-2 min PASS, 12:43 verify cron f66b484f 跑 6 步

**跨项目 SOP 升级 (build fail 链)**:
- ✅ M3 报告发了 ≠ 任务完了 - build fail 链报告后 2h 内必二次升级 K3
- ✅ K3 紧急升级收到后 30 min 内必 commit + push + verify cron (不能拖)
- ✅ 同 bug 模式 4 处 - 修一个不能假定其他 3 个没, 必须用 tsc + npx next build 全部扫一遍
- ✅ npx next build 本地验证 - 比 Vercel build log 快, 30s 跑完知道所有 syntax 错
- ✅ Vercel build 60s+ failure = 代码问题 (不是 webhook/queue/cache), 必须先查 build log, 不要先归因平台

**应用范围**:
- 任何 PaaS 部署 (CF Pages / Vercel / Netlify / Vercel Edge / Cloudflare Workers)
- 任何 cron verify 失败后的跟进 (cron 静默阈值 2h, 不 4h 不 8h)
- 任何 K3 P0 紧急升级 (30 min 内 commit + push + verify, 不等 K3 拍板细节)

**禁忌**:
- ❌ 报告发了 = 任务完了 (12:32 → 10:36 22h 没跟进)
- ❌ 0s build failure = 平台问题 (实际 60s+ = 代码问题)
- ❌ 88fd338 修了 1 处 = 全部修了 (实际还有 3 处同样 bug)
- ❌ M3 0 Vercel access → 不问 K3 要 build log, 自己猜 webhook/queue/cache
- ❌ K3 紧急升级 → 「等 K3 拍板 A/B/C」, 自己不主动 commit + push
"""

with io.open(r'C:\Users\Administrator\.minimax\agents\mavis\memory\MEMORY.md', 'a', encoding='utf-8', newline='\n') as f:
    f.write(CONTENT)

# verify
with io.open(r'C:\Users\Administrator\.minimax\agents\mavis\memory\MEMORY.md', 'r', encoding='utf-8') as f:
    new_size = len(f.read())
print(f'Memory updated: {new_size} bytes')
