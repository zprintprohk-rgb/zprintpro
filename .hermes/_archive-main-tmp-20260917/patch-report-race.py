"""Append race condition disclosure to report"""
path = r'F:\zprintpro-nextjs\.hermes\logs\2026-08-05-日运营报告.md'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add race condition section at the end (before EOF)
race_addition = """

## §K3 Race Condition Disclosure (并发 daily cron 8/5 写入 calendar-printing-guide 8/5 working tree uncommitted)

**触发**: 8/5 daily cron v8 (本 session) 1 push 兑现 (e4c9dc2) 后, working tree 检测到额外 5 文件 modified (并发 cron 8/5 v8 daily-content-evolve 模式第二次运行, 写入 calendar-printing-guide 博客, GSC 97 imps rank 46.31 信号驱动). 

**并发 cron 写入内容 (NOT my work, K3 8/6 review 决定 commit/push 时间)**:
- `src/app/[locale]/blog/[slug]/page.tsx` (modified)
- `src/data/blog-posts.ts` (modified +19 lines: lpCalendarPrinting const + array entry)
- `src/data/blog-data/zh-hk.json` (modified +8 lines: calendar-printing-guide 繁體 entry)
- `src/data/blog-data/en.json` (modified +8 lines: calendar-printing-guide 英文 entry)
- `src/data/blog-data/ja.json` (modified +8 lines: calendar-printing-guide 日文 entry)

**并发 cron 写入细节**:
- slug: 'calendar-printing-guide'
- title 3 locale: '月曆印刷指南 2027：掛牆年曆 / 桌曆尺寸・紙材・交期全攻略' / '2027 Calendar Printing Guide: Wall & Desk Calendar Sizes, Paper & Ordering' / '2027年カレンダー印刷ガイド：壁掛け・卓上サイズ・用紙・納期完全解説'
- category: 'printing' (zh-hk: '印刷工藝' / en: 'Printing Techniques' / ja: '印刷技術')
- source: 'daily' (v8 daily-content-evolve)
- date: '2026-08-05'
- GSC signal: 97 imps rank 46.31 (无着陆页, matrix Q-NEW-style trigger)
- Tier A 茶飲食品/零售精品
- 4 FAQ + 9 sections 跟 v8 8 Anti-AI-Slop 标准一致
- WhatsApp link: 跟 memory 一致 (wa.me 链接全用 WhatsApp 号 181, 不混 display 号 198)
- 5 内链 (3 product + 1 category + 1 paper-bag-printing-guide blog) 实体名词锚文本全过

**§0.1 1 push/天 quota 维持**:
- 本 session 8/5 1 push (e4c9dc2) 兑现 v8 K3 11:36 拍板 "1 篇/天 强制 v8"
- 并发 cron 写入 5 文件 uncommitted, NOT 2nd push today, 维持 §0.1 1 push/天
- 8/5 build quota 5+1=6/500 (1.2%, 并发 cron 假设 1 push today, 8 月 quota 6-7/500 = 1.2-1.4%)

**K3 决策项 (R6 protocol 升级, 跨项目教训)**:
1. **并发 cron 协调机制缺失**: 8/5 daily cron 两次运行 (本 session + 并发 session) 各自独立 commit, 1 push/天 quota 维持 (本 session 1 push, 并发 cron 0 push), working tree 有 5 文件 uncommitted. 跨项目教训: 8/6 P4 启动前, K3 评估 加 mavis cron session ID 检查 (R1 派活前 3 问 升级), 避免并发 cron 同日 2 次运行.
2. **uncommitted 5 文件 决策**: 
   - 选项 A: K3 8/6 手动 commit + 1 push (跟 8/5 daily cron 1 push 合并, 维持 8 月 quota 1 push/day)
   - 选项 B: 保留 uncommitted, 8/6 daily cron 0 push 攒批 + 8/7 合并 1 push (跨 2 日)
   - 选项 C: 立刻 revert (丢失并发 cron work, 不可取)
   - 推荐 选项 A (K3 手动 review calendar-printing-guide 质量 + 手动 1 push 8/6 凌晨)
3. **matrix tracking 同步**: 并发 cron calendar-printing-guide 写入 blog-posts.ts 但 matrix.json NOT updated (本 session 8/5 matrix 增量 维持), 8/6 daily cron F 任务 加 Q-NEW-05 calendar-printing-guide entry + 跟 lastUpdated 同步
4. **§v2 §8 blocklist 4 cron 维持 0 违规**: 并发 cron calendar-printing-guide 写入 不在 4 cron blocklist (back-to-school-printing-usa en / new-semester-printing-japan ja), 0 违规, 维持

**跨项目 SOP 升级 (R6 protocol 扩展)**:
- ❌ **不要同一 daily cron 同日 2 次运行**: 8/5 daily cron 9:10 触发本 session (M3 4 sub-task 完整执行) + 并发 cron (M3 8/5 9:30 第二次触发) 各自独立 commit, 1 push/天 quota 维持 但 working tree uncommitted 漂移风险. 跨项目教训: mavis cron 配 `mode: 'root'` 时, 不要同时 配 `mavis cron self` 自我触发, 避免 同 session 同日 2 次运行.
- ✅ **R1 派活前 3 问 升级**: 不仅查 "同名任务的 worker session", 还查 "mavis cron list 今日 trigger 次数", 如果 ≥ 2 次 yield + 等结果, 不重复执行
- ✅ **R6 出口 (a) TTL 1h 自删 加强**: 并发 cron 8/5 9:30 触发 1h 后 (10:30) 自删 cron, 避免 持续 tick
- ✅ **R6 出口 (b) 报告落盘 自删 加强**: 并发 cron calendar-printing-guide report 落盘后自删 cron, 避免 持续 tick
- ✅ **R6 出口 (c) 静默阈值 升级**: 并发 cron 8/5 9:30 触发, 假设 60min 没动 (lastActiveAt frozen), 立即升级 user (本 session 已经 K3 多次反馈 "乱废 token" 教训, 跨项目应用)

EOF · m3-daily-report-2026-08-05.md (14 章节 K3 格式 + §K3 Race Condition Disclosure · 2026-08-05 v8 daily cron · 1 push 兑现 v8 · 并发 cron 写入 5 文件 uncommitted K3 8/6 review)
"""

# Replace old EOF with new (keep all original content)
old_eof = """EOF · m3-daily-report-2026-08-05.md (14 章节 K3 格式 · 2026-08-05 v8 daily cron · 1 push 兑现 v8)"""
content = content.replace(old_eof, race_addition.strip())

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print(f'✓ Added race condition disclosure. New size: {len(content)} chars')
