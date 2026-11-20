# 印刷需求雷达（Print Radar）v1.0

面向全球市场的印刷品需求采集与触达系统：每天 01:00 自动采集政府招标、多语言新闻与公开社媒中的印刷需求（书刊、包装盒、教材、练习簿等），沉淀到可追踪的线索台账，生成日报/周报/看板与触达草稿。

## 目录结构

```
print-demand-system/
├── config/ settings.json（公司信息/邮件/频控） · sources.json（采集源） · keywords.json（多语言关键词）
├── scripts/ 采集与处理脚本（见下表）
├── data/ leads.db（SQLite 台账） · raw/（每日原始数据） · exports/（CSV 导出） · backup/
├── outreach/ templates/（多语言话术） · outbox/（触达草稿） · sent_log.jsonl（发送日志）
├── reports/ daily/（日报） · weekly/（周报）
├── dashboard/ index.html（离线看板，双击打开）
└── logs/ run_*.log · latest_run.json · ALERT.md · dev_smtp/（演练信箱）
```

## 日常使用

| 操作 | 方式 |
|---|---|
| 查看今天的结果 | 打开 `dashboard/index.html`，或看 `reports/daily/latest.md` |
| 手动补跑一次 | 双击 `scripts/run_now.bat`（或 `python scripts/run_daily.py --trigger manual`） |
| 只重算报表（不重新采集） | `python scripts/run_daily.py --skip-collect` |
| 导出 CSV（线索/供应商/触达） | `python scripts/export.py` → `data/exports/` |
| 查看运行记录 | `logs/latest_run.json`、`logs/run_*.log`；失败告警见 `logs/ALERT.md` |
| 生成看板 | `python scripts/dashboard.py` |

## 每日 01:00 自动任务

- 已在 App「定时」中配置：**印刷需求雷达·每日采集 01:00**（Asia/Shanghai），每天 01:00 自动运行。
- 每次运行产出：新增线索入库、日报、看板刷新、触达草稿（草稿模式，默认不发送）。
- 失败告警：运行状态非正常时，面板简报会带「⚠️ 失败告警」，同时写入 `logs/ALERT.md`。
- 手动补跑不影响已有数据：同一链接/近似标题自动去重合并。

## 关键配置

- `config/settings.json`
 - `user_company.*`：把 `__YOUR_*__` 占位符替换为贵司真实信息（出现在触达邮件/话术中）
 - `outreach.enabled`：是否生成触达草稿（默认开）；`outreach.auto_send`：是否自动发送（默认关，需人工开启）
 - `outreach.smtp.*`：SMTP 发件配置（开启真实发送前填写）
 - `outreach.daily_email_cap` / `daily_whatsapp_cap`：每日发送上限（默认 30 / 15）
- `config/sources.json`：采集源清单（每条可单独启停、调整检索词）
- `config/keywords.json`：多语言关键词库（分类/意图/招标/排除），同时用于评分与过滤

## 人工介入点（有意保留）

1. **触达确认**：草稿在 `outreach/outbox/` 生成后，人工复核 → 发送。真实外发需在设置中开启 `auto_send` 并配置 SMTP。
2. **WhatsApp/社媒**：草稿含 `wa.me` 一键跳转链接与评论/私信话术，人工点击发送（平台规则限制，详见 `docs/COMPLIANCE.md`）。
3. **线索回收**：把发送结果、回复、报价与成交状态回填到台账（看板支持筛选，或直接更新数据库）。

更多操作细节与故障处理见 `docs/SOP.md`，合规要求见 `docs/COMPLIANCE.md`。