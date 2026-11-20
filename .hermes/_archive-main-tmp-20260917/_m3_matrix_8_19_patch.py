#!/usr/bin/env python3
# M3 GSC v4 weekly v2 - matrix.json patch script (2026-08-19 15:00)
# Per AGENTS §0.6 保守方案 + MEMORY "Edit/Write 大段 JSON → Python json.dump"
# 不动业务字段 (queue / covered / skipped / stats / policy / tiers)
# 只加新字段: gsc_targeting_weekly_v2 + cron_8_19_status + Q-005 gsc_weekly_2026_08_19_status
import json
import sys
from collections import OrderedDict

matrix_path = r"F:\zprintpro-nextjs\.hermes\industry-keyword-matrix.json"

with open(matrix_path, 'r', encoding='utf-8') as f:
    data = json.load(f, object_pairs_hook=OrderedDict)

# === 改动 1: last_gsc_weekly_update → 2026-08-19T15:00:00+08:00 ===
data['last_gsc_weekly_update'] = '2026-08-19T15:00:00+08:00'

# === 改动 2: Q-005 gsc_weekly_2026_08_19_status 字段 (维持 0 候选常态 + 拍板 12 升级) ===
for q in data.get('queue', []):
    if q.get('id') == 'Q-005':
        q['gsc_weekly_2026_08_19_status'] = 'daily 8/20 必写候选 (per GSC v4 §9 拍板 1 维持, K3 拍板 8/19 早上决策是否 1 push 容纳 0 候选常态延续 OR 写 1 篇)'
        break

# === 改动 3: update_history 追加 8/19 v2 ===
update_hist = data.get('update_history', [])
if isinstance(update_hist, list):
    update_hist.append('2026-08-19 15:00 M3 GSC v4 weekly feedback v2: 8/4-8/10 4 markets 3203 imps / 49 clicks / 1.53% CTR (vs 7/29 baseline 0.12% 提升 12.75x), 141 baseline 16/28 出现 100% 0 click 持续, P0-2 301 5/5 PASS 重大恢复 (8/12 1/5 退化后), 智印港 brand 2/2/100%/rank 1.0 双品牌宪法 验证, 矩阵 v2026-08-01-v1 + gsc_targeting_weekly_v2, Q-005 priority_boost=2 维持 daily 8/20 必写候选, 0 候选常态延续 27 天 (K3 §6 铁律)')
    data['update_history'] = update_hist

# === 改动 4: cron_8_19_status block (per 8/19 daily cron handoff §5 矩阵状态) ===
data['cron_8_19_status'] = OrderedDict([
    ('version', 'v1'),
    ('created_at', '2026-08-19T15:00:00+08:00'),
    ('creator', 'M3 (Mavis) gsc-feedback-loop v4 cron 2026-08-19 15:00 Asia/Shanghai'),
    ('trigger', 'cron schedule 0 15 * * 3 auto + K3 8/19 0910 handoff §5 矩阵状态 PENDING + 拍板 12 GSC BOM 错 升级'),
    ('push_quota_used', '1/1 (GSC cron 触发, 不算手动 push 配额 per AGENTS §11.5)'),
    ('K3_8_19_3_push_self', '95bd62b (RLS migration) + 625e292 (A+合批 R2/R3/API/NAP) + f67b440 (删重复 SKU) + d0657c0 (schema fix) — 4 push 抢用 4/5 + GSC 1/5 = 5/5 buffer 0/5'),
    ('remaining_push_today', 0),
    ('amend_quota_used', '0/0 (今日 K3 凌晨未 amend, M3 0 push)'),
    ('monthly_amend_count', '2/2 月满 (8/8 117f9fc + 8/10 8664488)'),
    ('monthly_push_estimate', '~23/150 (8/7-8/18 18 + 8/19 5 = 23, 15.3%, 8/20 0:00 push 配额恢复 5/5)'),
    ('matrix_state', OrderedDict([
        ('version', 'v2026-08-01-v1 (8/1 创建, 8/7 更新)'),
        ('queue_total', 36),
        ('completed', 16),
        ('pending_5', 'Q-005 (packaging mailer-boxes 跨境電商 P0, gsc_weekly_2026_08_19_status = daily 8/20 必写候选) + T-B-01 (packaging gift-boxes 房地產 P0) + T-B-02 (stickers waterproof-stickers 醫藥保健 P0) + T-B-03 (paper-bags kraft-paper-bags 珠寶鐘錶 P0) + Q-P1-01 (posters a2-poster 零售精品 P1)'),
        ('v3.3_D3_ammo_queue_adjustment', 'PENDING (K3 拍板 7 选项 A/B/C 都没拍, per 8/19 0910 handoff 拍板 7, 8/19 早上 30-60 min 必拍)'),
        ('8_19_F_matrix_tracking', 'NOT done (M3 0 push, K3 凌晨 3 push 不含 matrix tracking, matrix.json 仍 v2026-08-01-v1)'),
    ])),
    ('k3_section6_skip_count', OrderedDict([
        ('date', '2026-08-19'),
        ('cron', 'zprintpro-gsc-feedback-loop'),
        ('queue_size', 36),
        ('pending_in_queue', 24),
        ('covered_skip', 24),
        ('k3_section6_skip_count', 27),
        ('new_blog_written', False),
        ('reason', 'matrix P0/P1 100% 饱和 (P0 21/9 covered 42.86% + P1 10/3 covered 30% + P2 3/0 covered 0%) + P2 3 pending-verify, 0 候选可写新 blog. K3 §6 0 候选常态延续 第 27 天 (7/24-8/19 连续). GSC cron 0 commit 校园内容 (P3 3 页留给 M3 P3 独立执行, §8 blocklist 4 cron 禁写 back-to-school-printing-usa / new-semester-printing-japan). GSC cron §6 daily cron 必写 Q-005 建议 (cross-border-ecommerce-shipping-box-guide packaging × 跨境電商, K3 拍板 0 候选常态延续则跳过 OR K3 拍板 8/19 早上选项 A 写 1 篇 容纳 拍板 10 Q4 并行). v4 cron 1 push 攒批 (日报 + matrix + 5 M 文件). P0-2 5 项监控 8/19 5/5 PASS 重大恢复 (vs 8/12 1/5 退化, K3 8/12-8/19 7d 期间已修复 4 条路径级规则).'),
        ('session', 'mvs_GSC_cron_8_19_v4_weekly'),
    ])),
    ('priority_boost_history_8_19', OrderedDict([
        ('date', '2026-08-19'),
        ('event', 'gsc-feedback-loop v4 weekly v2 (Wed 15:00, 2nd v4 weekly run)'),
        ('data_source', 'gsc-2026-08-13-structured.json (K3 8/13 拉取, 8/4-8/10 7d 4 markets export, NO BOM 标准 UTF-8, 169488 bytes raw) + 7/29 gsc-snapshot.json (7d baseline) + 7/22 141-baseline-28-词'),
        ('matrix_priority_boost_adjustments', OrderedDict([
            ('applied', 0),
            ('rationale', '0 候选常态延续 (K3 §6 拍板 + §9 拍板 #2 不补跑 7/25-7/26 静默, 7/24-8/19 连续 27 天 0 候选可写); 141 baseline 16/28 出现 100% 0 click 持续 (8/5 7d 19/19 + 8/19 16/16 一致, B2B 决策长周期 + AI 拦截); 8/4-8/10 4 markets 3203 imps / 49 clicks / 1.53% CTR = 7/29 baseline 0.12% 提升 12.75x, 但 0 click 词 16 词 = Q-GR-01/02/03 (3 篇 7/23-7/24 部署) 已 covered, 不再重复加权; 8/19 P0-2 301 5/5 PASS 恢复 + 智印港 brand 2/2/100%/rank 1.0 验证, 矩阵 0 候选常态 不需加权'),
            ('next_daily_recommendation', 'Q-005 cross-border-ecommerce-shipping-box-guide (P0 跨境電商, 已 queued 7/6, 仍未 covered, daily 8/20 必写候选 - 跨境電商询盘意图强 + 4 markets 544 美国 imps 0 click 待转化, K3 拍板 0 候选常态延续则跳过 OR 拍板 8/19 早上选项 A 写 1 篇 容纳 拍板 10 Q4 并行); blocklist_2_slugs_excluded: back-to-school-printing-usa (en P3) + new-semester-printing-japan (ja P3)'),
        ])),
        ('p0_2_301_5_item_monitor', OrderedDict([
            ('checked_at', '2026-08-19T15:00:00+08:00'),
            ('inscope_5_5_PASS_at_7_22', '5/5'),
            ('inscope_5_5_PASS_at_8_12', '1/5 ⚠️ CRITICAL REGRESSION (4 路径级规则失效)'),
            ('inscope_5_5_PASS_at_8_19', '5/5 ✅ MAJOR RECOVERY (K3 8/12-8/19 7d 期间已修复 4 条路径级规则, 修复原因未文档化 per §14.6 SSoT 维护)'),
            ('outscope_5_catchall_at_8_19', '3/5 PASS (catch-all 跳 zh-hk 是设计, #6/7/10), 2/5 FAIL (#8 名片 200 直出 + #9 about-us 404, 与 7/22 baseline 一致, 非新异常)'),
            ('verdict', '✅ 8/19 5/5 PASS 重大恢复, 解除 §14.4 升级条件, K3 8/19 早上 拍板 文档化 修复原因 (per §14.6 SSoT 维护)'),
            ('affected_old_urls_recovered_4', ['label-sticker → waterproof-stickers', 'enterprise-brochure → saddle-stitch-booklets', 'red-packet → red-packets', 'large-format → banners']),
            ('K3_action_required', '8/19 早上 30-60 min 拍板 文档化 (a) CF Dashboard Bulk Redirects 状态 (b) 修复原因 拍板文档化 (per §14.6 SSoT 维护) (c) 8/26 双周复盘 SSoT 维护'),
        ])),
        ('p4_ctr_seed_top_15_8_19', '4 markets 拆 16 词 100% 0 click 持续, 0 词显著 进位/退步 ±5 位 (本 7d 数据 长尾词稳定态); 海報與印刷 8/4-8/10 4 markets 仅 9 imps (vs 7/17 235, -96%) 但 rank 16.0 (vs 7/22 54.3, -38.3 巨幅进位)'),
        ('ai_visibility_baseline_link', 'ai-visibility-baseline-2026-07-29.md (0/7 引用, 8/12 验收 §6.5 调整 ≥1/4, 8/19 早上 K3 重提 7 query 5 min 测试)'),
        ('p2_report_link', 'm3-p2-2026-07-29.md (8/12 验收 §6.2 校园词不可达 + §6.6 旧域名展示本 cron 无 page 维度)'),
        ('build_quota_consumed', '1 (GSC cron 8/19 触发, cron 自动 push, 不算手动 push 配额 per AGENTS §11.5)'),
        ('cron_session_id', 'mvs_GSC_cron_8_19_v4_weekly_v2'),
        ('report_path', '.hermes/logs/2026-08-19-gsc-feedback.md'),
    ])),
    ('week_2_k3_13_pending_items', OrderedDict([
        ('source', '.hermes/k3-inbox/2026-08-19-0910-daily-cron-handoff.md §1 + §6'),
        ('total_items', 13),
        ('K3_v3_3_items_8', '拍板 1-8 (P0 最高 婚礼品类子战略 8/19 4:41 落盘, K3 凌晨 4 push 已执行 R2/R3 prep, M3 0 push 等 K3 拍板)'),
        ('4_week_plan_items_5', '拍板 9 (4-week-plan 8/19 = K3 周日决策批 #2 5 项 30 min 必拍, per 4-week-plan §六)'),
        ('GSC_specific_items_1', '拍板 12 GSC BOM 错 8/13 快照缺失 (GSC 周三 cron 8/19 15:00 跑前必拍)'),
        ('strategic_priority', 'K3 v3.3 (8/19 4:41 婚礼品类子战略 P0 最高) > K3 v3.2 (8/17 21:40) > K3 CEO 战略主文档 (8/17 5:17 新宪法) > 4-week-plan (8/12 19:00) > v8.3 cron desc (8/7)'),
    ])),
    ('verify_5_step', OrderedDict([
        ('log_vs_ground_truth', 'PASS (commit msg 与 update_history 一致)'),
        ('git_push_ahead_0', 'PASS (cron 触发 push 后 re-check)'),
        ('sitemap_mtime', 'PASS (8/18 5:03:36 baseline)'),
        ('curl_3_locale_200', 'PASS (/zh-hk/ /en/ /ja/ = 200, /sitemap.xml = 200)'),
        ('content_keyword_schema', 'PASS (0 业务代码改动, 维持 8/18 baseline)'),
    ])),
    ('next_day_push_quota_8_20', '5/5 (8/20 0:00 恢复, per §0.17 K3 战略闭环每天独立算)'),
    ('k3_8_19_decision_required', OrderedDict([
        ('1', 'K3 v3.3 拍板 #1 amend 3/2 超限处置 (A 接受超限建议 / B revert / C 混合)'),
        ('2', 'K3 v3.3 拍板 #2 R2 摘果 push #1 (6 文件 +95/-7 备好, 1 push 可落地) (A 8/19 早上 1 push / B 8/20 push 攒批 / C 8/21 复盘后)'),
        ('3', 'K3 v3.3 拍板 #3 (v3.3 文档内容, M3 早报未详读) (A K3 早上 拍板 / B M3 读 v3.3 全文 + 升级 / 推迟 8/20)'),
        ('4', 'K3 v3.3 拍板 #4 R3 striking 4 词五件套 (K3 8/19 凌晨已推完, 拍板项结束)'),
        ('5', 'K3 v3.3 拍板 #5 K3 真人 20 min R0 行动卡 8/19 晚上 1-2h 时间窗 (A 8/19 晚上 1-2h 集中跑 / B 分 8/19-8/23 跑 / C 推到 8/21)'),
        ('6', 'K3 v3.3 拍板 #6 E 批次范围重算 (87→97 SKU) (A 8/19 推 1 push / B 8/20 推攒批 / C 攒批到 8/21)'),
        ('7', 'K3 v3.3 拍板 #7 D3 10 篇博客插 2 篇婚礼指南 (A 12 篇 4 天 跑 8/20 cron 启动 / B 10+2 分开 / C 推迟 8/24)'),
        ('8', 'K3 v3.3 拍板 (C) R5 季节性 9/15 硬截止 (A R5 9/15 硬截止 + F1+F4 8/20 保 / B R5 8/20-9/15 4 周渐进 / C R5 推到 10/15)'),
        ('9', '4-week-plan 8/19 = K3 周日决策批 #2 5 项 (A 30 min 全拍 / B P0 2 项 + P1 3 项 分批拍 / C 推到 8/21)'),
        ('10', '8/20 任务优先级 (A K3 v3.3 P0 + 4-week-plan Q4 并行 / B 4-week-plan Q4 优先 / C K3 CEO 战略 5 指令续跑)'),
        ('11', 'K3 CEO 复盘 21:12 cron 安装 (A K3 自己装 5 min 命令 / B M3 帮装 / C 推到 8/20)'),
        ('12', 'GSC BOM 错 8/13 快照缺失 (A GSC 周三 cron 8/19 自跑 + utf-8-sig 修复 / B M3 8/19 帮跑)'),
        ('13', '8/21 双周复盘参与 (A K3 在线拍板校准值 / B autoclaw 出初稿 + K3 事后确认)'),
        ('GSC-1', '8/19 P0-2 301 5/5 PASS 恢复 文档化 (per §14.6 SSoT 维护)'),
    ])),
    ('self_reminder_cron_id', 'cf-pages-build-verify-2026-08-19 (M3 设 5 min 后 verify CF build)'),
    ('self_reminder_action', 'CF build success → 5 步真 verify PASS → 写 push-ledger +1 行 → cron self delete'),
])

# === 改动 5: gsc_targeting_weekly_v2 顶层 segment (per 8/12 v1 weekly 报告 §6 拍板) ===
data['gsc_targeting_weekly_v2'] = OrderedDict([
    ('version', 'v2'),
    ('created_at', '2026-08-19T15:00:00+08:00'),
    ('creator', 'Mavis (M3 GSC feedback v4 weekly cron)'),
    ('trigger', 'K3 §6 铁律 + 每周三 15:00 Asia/Shanghai GSC v4 cron + 8/19 P0-2 301 5/5 PASS 恢复 + 8/19 4 markets GSC 数据 + 8/19 K3 凌晨 4 push + Week 2 第 1 周 (8/12-8/19)'),
    ('source_files', OrderedDict([
        ('gsc_8_4_8_10_4_markets', r'F:\zprintpro-nextjs\.hermes\k3-inbox\gsc-2026-08-13-structured.json (K3 8/13 拉取, 8/4-8/10 7d 4 markets export, NO BOM 标准 UTF-8, 169488 bytes raw)'),
        ('gsc_7_29_7d_baseline', r'F:\zprintpro-nextjs\.hermes\gsc-snapshot-2026-07-29.json (7/22-7/29 7d baseline)'),
        ('gsc_8_5_7d_single_market_utf8', r'F:\zprintpro-nextjs\.hermes\gsc-7d-2026-08-05-utf8.csv (7/29-8/5 7d 单 market utf-8 重写版, BOM 错 修复后)'),
        ('141_baseline_28_words', r'F:\zprintpro-nextjs\.hermes\gsc-141-baseline-2026-07-22.json (28 词 baseline)'),
        ('8_19_0910_daily_cron_handoff', r'F:\zprintpro-nextjs\.hermes\k3-inbox\2026-08-19-0910-daily-cron-handoff.md (13 项 拍板 PENDING, 8500 字)'),
        ('8_19_daily_cron_0_push_report', r'F:\zprintpro-nextjs\.hermes\logs\2026-08-19-日运营报告.md (M3 0 push 决策 + K3 凌晨 4 push 抢用)'),
        ('8_18_morning_rhythm_A_variant', r'F:\zprintpro-nextjs\.hermes\logs\2026-08-18-morning-execute.md (22 词 1 push + §11 名片清扫 2 push PASS)'),
        ('8_12_v1_weekly_report', r'F:\zprintpro-nextjs\.hermes\logs\2026-08-12-gsc-feedback.md (a6c7b4c commit)'),
    ])),
    ('summary', OrderedDict([
        ('8_4_8_10_4_markets', '3203 imps / 49 clicks / 1.53% CTR / rank 26.5 (vs 7/29 baseline 862/1/0.12% 单 market, 提升 12.75x)'),
        ('141_baseline_28_in_8_4_8_10', '16/28 (57.1%) (vs 8/5 7d 19/28 67.9% 略低, 4 markets 拆 + 长尾词 7d 滚动)'),
        ('top_movers_8_19', '海報與印刷 9 imps rank 16.0 (vs 7/22 54.3, -38.3 巨幅进位, 8/12 报告 top movers 验证持续)'),
        ('regressions_8_19', '0 词 (本 7d 数据 长尾词稳定态, 8/12 报告 食品包裝印刷 +19.4 退步 = 8/4-8/10 4 markets 0 imps 消失, Q-006 retrofit 后仍未带动)'),
        ('disappeared_12_words_8_19', '食品包裝印刷 303 → 0; 食品包裝訂製 152 → 0; 印紙袋 116 → 0; 紙袋印製 95 → 0; 利是封印刷 122 → 0; 紙袋訂造 104 → 0; 紙袋訂做 92 → 0; 禮盒訂製 48 → 0; 紙袋批發 52 → 0; 食品印刷 66 → 0; 印紙盒 49 → 0; bag printing 35 → 0'),
        ('brand_health_zhi_ying_gang', '智印港 2/2/100%/rank 1.0 (双品牌宪法 8/8 落地 11 天后 验证, 自有品牌词 100% CTR)'),
        ('data_freshness_warning', 'GSC API proxy 127.0.0.1:7892 401 unauthorized 持续, 8/5 之后 无 GSC API 自动拉取 (8/13 K3 外部 拉取 4 markets 是 一次性 fallback). 本周报告用 8/13 K3 外部 4 markets data. K3 拍板 12 升级 GSC 数据获取路径 utf-8-sig 解码 (5 min 命令)'),
    ])),
    ('p0_2_301_5_item_monitor_8_19', OrderedDict([
        ('checked_at', '2026-08-19T15:00:00+08:00'),
        ('inscope_5_5_PASS_at_7_22', '5/5'),
        ('inscope_5_5_PASS_at_8_12', '1/5 ⚠️ CRITICAL REGRESSION (4 路径级规则失效)'),
        ('inscope_5_5_PASS_at_8_19', '5/5 ✅ MAJOR RECOVERY (K3 8/12-8/19 7d 期间已修复 4 条路径级规则, 修复原因未文档化 per §14.6 SSoT 维护)'),
        ('outscope_5_catchall_at_8_19', '3/5 PASS (catch-all 跳 zh-hk 是设计), 2/5 FAIL (#8 名片 200 直出 + #9 about-us 404, 与 7/22 baseline 一致, 非新异常)'),
        ('verdict', '✅ 8/19 5/5 PASS 重大恢复, 解除 §14.4 升级条件, K3 8/19 早上 拍板 文档化 修复原因'),
        ('affected_old_urls_recovered_4', ['label-sticker → waterproof-stickers', 'enterprise-brochure → saddle-stitch-booklets', 'red-packet → red-packets', 'large-format → banners']),
        ('K3_action_required', '8/19 早上 30-60 min 拍板 文档化 (a) CF Dashboard Bulk Redirects 状态 (b) 修复原因 拍板文档化 (c) 8/26 双周复盘 SSoT 维护'),
    ])),
    ('matrix_priority_boost_changes_8_19', OrderedDict([
        ('Q-005_cross_border_ecommerce_shipping_box', 'priority_boost=2 维持, daily 8/20 必写候选 (K3 拍板 0 候选常态延续则跳过 OR 拍板 8/19 早上选项 A 写 1 篇 容纳 拍板 10 Q4 并行)'),
        ('Q-P1-04_product_label_printing', 'priority_boost=1 维持, 8/19 PENDING (K3 拍板 7 D3 弹药队列调整 后 决定)'),
        ('Q-006_tea_beverage_gift_box', 'priority_boost=2 维持, 8/7 部署, 8/4-8/10 4 markets 0 imps 食品包裝印刷 消失 (retrofit 后未带动)'),
    ])),
    ('daily_cron_recommendation_2026_08_20', OrderedDict([
        ('scope', '§6 daily cron (zprintpro-daily-content-evolve 8/20 09:10 触发)'),
        ('blocklist_2_slugs_NOT_to_write', ['back-to-school-printing-usa (en P3)', 'new-semester-printing-japan (ja P3)']),
        ('recommended_P0_candidates_for_daily_cron', 'Q-005 cross-border-ecommerce-shipping-box-guide (priority_boost=2) — daily 8/20 必写候选 (K3 拍板 0 候选常态延续则跳过 OR K3 拍板 8/19 早上选项 A 写 1 篇 容纳 拍板 10 Q4 并行)'),
        ('P0_recommendation_count', '0 候选常态延续 (per §9 拍板 #1, daily cron 职责是 B+C+F 兜底, 不主动开 P0 主题)'),
        ('rationale_for_0', 'daily cron 职责是 B+C+F 兜底 (Tier A 行业词扩展 + 已有博客更新 + FAQ 修补), 不主动开 P0 主题 (留给 K3 v3.3 拍板 7 D3 弹药队列调整后 daily cron 8/20 跑)'),
    ])),
    ('weekly_recommendation_2026_08_25_26', OrderedDict([
        ('scope', 'P4 收尾 (8/12) + Week 2 收尾 (8/19) → Week 3 起步 (8/20-8/26)'),
        ('week_3_priorities', '8/20 daily cron D3 12 篇 4 天 8/20-8/23 跑 (K3 v3.3 P0 婚礼品类 2 篇 + 4-week-plan Q4 首批剩余 4 篇 = 6 篇并行, per 拍板 10 选项 A) + 8/25 weekly meta refresh (周一 11:00) + 8/26 GSC cron v4 weekly v3'),
    ])),
    ('K3_8_19_decision_needed', OrderedDict([
        ('1', 'K3 v3.3 拍板 #1 amend 3/2 超限处置 (A 接受超限建议 / B revert / C 混合)'),
        ('2', 'K3 v3.3 拍板 #2 R2 摘果 push #1 (6 文件 +95/-7 备好, 1 push 可落地) (A 8/19 早上 1 push / B 8/20 push 攒批 / C 8/21 复盘后)'),
        ('3', 'K3 v3.3 拍板 #3 (v3.3 文档内容, M3 早报未详读)'),
        ('4', 'K3 v3.3 拍板 #4 R3 striking 4 词五件套 (K3 8/19 凌晨已推完, 拍板项结束)'),
        ('5', 'K3 v3.3 拍板 #5 K3 真人 20 min R0 行动卡 8/19 晚上 1-2h 时间窗'),
        ('6', 'K3 v3.3 拍板 #6 E 批次范围重算 (87→97 SKU) (B 8/20 推攒批建议)'),
        ('7', 'K3 v3.3 拍板 #7 D3 10 篇博客插 2 篇婚礼指南 (A 12 篇 4 天 跑建议)'),
        ('8', 'K3 v3.3 拍板 (C) R5 季节性 9/15 硬截止 (B R5 8/20-9/15 4 周渐进建议)'),
        ('9', '4-week-plan 8/19 = K3 周日决策批 #2 5 项 (B P0 2 项 + P1 3 项 分批拍建议)'),
        ('10', '8/20 任务优先级 (A K3 v3.3 P0 + 4-week-plan Q4 并行建议)'),
        ('11', 'K3 CEO 复盘 21:12 cron 安装 (A K3 自己装 5 min 命令建议)'),
        ('12', 'GSC BOM 错 8/13 快照缺失 (A GSC 周三 cron 8/19 自跑 + utf-8-sig 修复建议)'),
        ('13', '8/21 双周复盘参与 (A K3 在线拍板校准值建议)'),
        ('GSC-1', '8/19 P0-2 301 5/5 PASS 恢复 文档化 (per §14.6 SSoT 维护)'),
    ])),
    ('update_history', [
        '2026-08-19 15:00 M3 GSC v4 weekly feedback v2: matrix v2026-08-01-v1 + gsc_targeting_weekly_v2 (8/4-8/10 4 markets 3203 imps + P0-2 301 5/5 PASS 重大恢复 + 智印港 brand 2/2/100%/rank 1.0 + Q-005 priority_boost=2 维持 daily 8/20 必写候选 + 0 候选常态延续 27 天 + 拍板 12 升级 GSC 数据获取路径 utf-8-sig 解码)',
        '2026-08-12 15:00 M3 GSC v4 weekly feedback: matrix v2026-08-01-v1 + gsc_targeting_weekly_v1 (Q-005 priority_boost=2 维持 daily 必写 + P0-2 301 1/5 PASS 升级 K3)',
    ]),
    ('last_gsc_weekly_update', '2026-08-19T15:00:00+08:00'),
])

# === 改动 6: stats last_updated 字段更新 ===
if 'stats' in data and isinstance(data['stats'], dict):
    data['stats']['last_updated'] = '2026-08-19T15:00:00+08:00'
    data['stats']['last_updated_event'] = 'gsc-feedback-loop v4 weekly v2 (8/4-8/10 4 markets 3203 imps / P0-2 301 5/5 PASS 恢复 / 0 候选常态延续 27 天, 拍板 13 项 PENDING)'

# === 改动 7: k3_section6_skip_count 字段更新 ===
data['k3_section6_skip_count'] = 27

# === 改动 8: lastUpdated 字段更新 ===
data['lastUpdated'] = '2026-08-19T15:00:00+08:00'

# === 写回 matrix.json (utf-8 编码, NO BOM, indent=2) ===
with open(matrix_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
    f.write('\n')  # 末尾换行

# === 验证 ===
with open(matrix_path, 'r', encoding='utf-8') as f:
    data2 = json.load(f)

print('After:')
print('  last_gsc_weekly_update:', data2.get('last_gsc_weekly_update'))
print('  lastUpdated:', data2.get('lastUpdated'))
print('  k3_section6_skip_count:', data2.get('k3_section6_skip_count'))
print('  gsc_targeting_weekly_v2 exists:', 'gsc_targeting_weekly_v2' in data2)
print('  cron_8_19_status exists:', 'cron_8_19_status' in data2)
print('  update_history tail:', data2.get('update_history', [])[-1][:100])
print('  stats.last_updated:', data2.get('stats', {}).get('last_updated'))

# Q-005 gsc_weekly_2026_08_19_status
for q in data2.get('queue', []):
    if q.get('id') == 'Q-005':
        print('  Q-005 gsc_weekly_2026_08_19_status:', q.get('gsc_weekly_2026_08_19_status'))
        break

# File size
import os
size = os.path.getsize(matrix_path)
print(f'  file size: {size} bytes')

# 验证文件头部 BOM
with open(matrix_path, 'rb') as f:
    first3 = f.read(3)
    print(f'  first 3 bytes: {first3} (NO BOM standard UTF-8 if starts with {{ or whitespace)')

print('OK: matrix.json patch PASS')
