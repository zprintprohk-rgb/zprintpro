# -*- coding: utf-8 -*-
import json
from pathlib import Path
from datetime import datetime, timezone, timedelta

p = Path('F:/zprintpro-nextjs/.hermes/industry-keyword-matrix.json')
with p.open('r', encoding='utf-8') as f:
    data = json.load(f)

tz = timezone(timedelta(hours=8))
now = datetime(2026, 8, 26, 15, 0, 0, tzinfo=tz).isoformat()

# 更新 last_gsc_weekly_update (新增, 若不存在)
data['last_gsc_weekly_update'] = now

# 新增 cron_8_26_status block
data['cron_8_26_status'] = {
    'cron_id': '6f9a93af-45cd-4ccd-afa3-17ccd82536e9',
    'cron_name': 'zprintpro-gsc-feedback-loop',
    'version': 'v3',
    'triggered_at': now,
    'creator': 'Mavis (M3 GSC feedback v4 weekly cron)',
    'report_path': '.hermes/logs/2026-08-26-gsc-feedback.md',
    'data_source': '.hermes/gsc-fresh-2026-08-21.json (8/14-8/18 5d 4 markets, 文件命名沿用旧名 8/21)',
    'data_freshness_warning': '5d vs 7d 不可直接对比 8/4-8/10 baseline, 8/28 早上 30-60 min 重跑 GSC cron 拉 7d 数据 + §4 v9.4 7d 校准',
    'verify_5_step_pending_push': {
        'log_vs_ground_truth': 'PASS',
        'git_push_ahead_0': 'PENDING (撞 §0.25 7.5 min, 推迟 push 等 15:22:30 后 或 K3 拍板)',
        'sitemap_mtime': 'PENDING (push 后 verify)',
        'curl_3_locale_200': 'PENDING (push 后 verify)',
        'content_keyword_schema': 'PASS (0 业务代码改动, 维持 8/26 a1a7e56 baseline)'
    },
    'next_day_push_quota_8_27': '5/5 (8/27 0:00 恢复, per §0.17 K3 战略闭环每天独立算)',
    'k3_8_26_decision_required': {
        '1': 'P0-2 301 4/5 FAIL 新退化 (8/19 5/5 PASS 失真, 4 路径级规则 404) - K3 必拍 1 次回复 (P0 升级)',
        '2': '8/26 GSC cron 撞车 §0.25 7.5 min (上次 push a1a7e56 14:52:30 → 本 cron 触发 15:00:01) - K3 必拍 1 次回复',
        '3': 'K3 v3.3 拍板 #1 amend 3/2 超限处置 (A 接受 / B revert / C 混合)',
        '4': 'K3 v3.3 拍板 #2 R2 摘果 push #1 (6 文件 +95/-7 备好) (A 8/26 早上 1 push / B 8/27 攒批 / C 8/28 复盘后)',
        '5': 'K3 v3.3 拍板 #3 (v3.3 文档内容)',
        '6': 'K3 v3.3 拍板 #4 R3 striking 4 词五件套 (K3 8/19 凌晨已推完, 拍板项结束)',
        '7': 'K3 v3.3 拍板 #5 K3 真人 20 min R0 行动卡 (8/26 晚上 1-2h)',
        '8': 'K3 v3.3 拍板 #6 E 批次范围重算 (87→97 SKU) (B 8/27 推攒批)',
        '9': 'K3 v3.3 拍板 #7 D3 10 篇博客插 2 篇婚礼指南 (A 12 篇 4 天 跑 8/27 cron 启动)',
        '10': 'K3 v3.3 拍板 (C) R5 季节性 9/15 硬截止 (B R5 8/27-9/15 4 周渐进)',
        '11': '4-week-plan 8/26 = K3 周日决策批 #2 5 项 (B P0 2 项 + P1 3 项 分批拍)',
        '12': '8/27 任务优先级 (K3 v3.3 P0 + 4-week-plan Q4 并行) (A 并行)',
        '13': 'K3 CEO 复盘 21:12 cron 安装 (A K3 自己装 5 min 命令)',
        'GSC-1': '8/14-8/18 5d 不可直接对比 8/4-8/10 7d baseline, 8/28 中检校准 §4 v9.4 验收 (A 等 8/28 完整 7d 数据 8/21-8/27 后再拍板)',
        'GSC-2': '8/26 a1a7e56 push W1 B7 选题 #1+#2 metadata+zh-hk content, en/ja 待 daily-content cron 8/27-8/30 补 (A daily-content cron 8/27-8/30 补, W1 8/26-9/1 必发)',
        'GSC-3': 'B7 22 篇 W1-W9 9 周排期 + 矩阵 priority_boost 调整 (A 接受 B7 SSoT 22 篇排期, K3 8/26 04:50 v2 预批)'
    },
    'collision_with_§0.25': {
        'last_push': 'a1a7e56 2026-08-26 14:52:30+08:00',
        'cron_trigger': '2026-08-26 15:00:01+08:00',
        'interval_min': 7.5,
        'rule': '§0.25 30min 间隔 push 部署 (K3 8/26 14:35 撞墙升级拍板)',
        'action': 'commit 本地 不 push, 推迟 push 等 15:22:30 后 或 K3 拍板',
        'k3_required_response': '必拍 1 次回复 (P0)'
    }
}

# 新增 gsc_targeting_weekly_v3 顶层 segment
data['gsc_targeting_weekly_v3'] = {
    'version': 'v3',
    'created_at': now,
    'creator': 'Mavis (M3 GSC feedback v4 weekly cron)',
    'trigger': 'K3 8/26 04:50 v2 预批 B7 commit 57f304f + §4 v9.4 验收 + §0.25 30min 撞墙升级 + 8/14-8/18 5d GSC 4 markets + P0-2 4/5 FAIL 新退化 + 8/19 v2 baseline 失真',
    'source_files': {
        'gsc_8_14_8_18_5d': 'F:\\zprintpro-nextjs\\.hermes\\gsc-fresh-2026-08-21.json (M3 8/26 12:30 拉, 8/14-8/18 5d 4 markets, 文件命名沿用 8/21, 247KB)',
        'gsc_141_baseline_28_words': 'F:\\zprintpro-nextjs\\.hermes\\gsc-141-baseline-2026-07-22.json (28 词 baseline)',
        '8_19_v2_weekly_report': 'F:\\zprintpro-nextjs\\.hermes\\logs\\2026-08-19-gsc-feedback.md (P0-2 5/5 PASS 8/19 baseline)',
        '8_26_a1a7e56_push': 'seo(batch1)+blog(w1): 5 类目 9 处 title 改写 + W1 blog 2 篇 metadata+content 上线',
        '8_26_14_35_§0.25_拍板': 'K3 8/26 14:35 撞墙升级拍板, 30 min 间隔 push 部署规则',
        'B7_22_pool_SSoT': 'F:\\zprintpro-nextjs\\.hermes\\cron-prompts\\zprintpro-gsc-feedback-loop.md v5 (B7 22 篇 SSoT 4 cron 共享, K3 8/26 04:50 v2 预批 commit 57f304f)',
        'docs_b7_blog_pool_2026_08_26': 'F:\\zprintpro-nextjs\\docs\\b7-blog-pool-2026-08-26.md (4 角色 22 篇选题库 派发 + T41/T44 audit 8/28 + money-words 5 梯队 + 8/28 中检 9 时段 + 10 KPI)'
    },
    'summary': {
        '8_14_8_18_5d_4_markets': '1535 imps / 6 clicks / 0.39% CTR / rank N/A (vs 8/4-8/10 7d 4 markets 3203/49/1.53%/26.5, imps -52.1% / clicks -87.8% / CTR -74.5% 三降同步发生 强信号 §7.8 GSC 突降, 5d vs 7d 不可直接对比 待 8/28 中检校准)',
        'section_4_v9_4_three_metrics': '1/3 PASS (striking 6 词 ≥5 PASS / pos 1-20 占比 26.06% < 30% FAIL 差 3.94pp / 有点击词 6 < 12 FAIL 差 6 词)',
        'p0_2_301_5_item_monitor_8_26': '1/5 PASS, 4/5 FAIL 新退化 (vs 8/19 5/5 PASS 失真, 4 路径级规则 404 失效, §0.18 兜底规则覆盖多 locale 活路径典型反例 验证)',
        '141_baseline_28_in_8_14_8_18': '21/28 (75.0%, vs 8/19 16/28 57.1%, +5 新显) 100% 0 click 持续 (B2B 询盘长决策周期 7-30 天 + AI Overviews 拦截 + 中文长尾词排名深 pos 22-58)',
        'top_movers_8_26': '6 严格 striking 词进首页 (a6 尺寸 12→9 / custom stickers small batch 15→7 / pvc 牌 11→6.5 / 同人印刷 11→5 / 同人本 印刷 16→10 / 海报印刷 13.3→4) 0 click 6/6 = 排名进位但 CTR 0%',
        'brand_health_zhi_ying_gang': '智印港 brand 4/4/100%/rank 2.0 (双品牌宪法 8/8 落地 +18 天后 验证, 自有品牌词 100% CTR)',
        'top_country_hkg': 'HKG 1415 imps / 36 clicks / 2.54% CTR / rank 19.5 (主战场 92.2% imps)',
        'top_country_usa': 'USA 830 imps / 3 clicks / 0.36% CTR / rank 40.1 (关键瓶颈 54.0% imps, 8/30 D 指令 GEO 74 篇博客验收倒计时 4 天)',
        'top_country_jpn': 'JPN 291 imps / 3 clicks / 1.03% CTR / rank 22.3 (中等 19.0% imps)',
        'data_freshness_warning': 'GSC 数据 5d 滚动窗口 (实际 8/14-8/18 5d, 文件命名沿用 8/21) 跟 8/4-8/10 7d 4 markets baseline 不可直接对比, 8/28 早上 30-60 min 重跑 GSC cron 拉 7d 数据 + §4 v9.4 7d 校准'
    },
    'p0_2_301_5_item_monitor_8_26': {
        'checked_at': now,
        'inscope_5_5_PASS_at_7_22': '5/5',
        'inscope_5_5_PASS_at_8_12': '1/5 (CRITICAL REGRESSION, 4 路径级规则失效)',
        'inscope_5_5_PASS_at_8_19': '5/5 (MAJOR RECOVERY, K3 8/12-8/19 7d 期间修复 4 条路径级规则)',
        'inscope_5_5_PASS_at_8_26': '1/5 (新退化, 4 路径级规则 404 失效 vs 8/19 5/5 PASS 失真)',
        'verdict': 'P0 升级 K3 必拍 1 次回复, §0.18 兜底规则覆盖多 locale 活路径典型反例 验证',
        'affected_old_urls_failed_4': [
            'waterproof-round-sticker-printing-outdoor-vehicle.html -> 404 (vs 8/19 /zh-hk/product/waterproof-stickers/ PASS)',
            'a5-saddle-stitched-booklet-printing.html -> 404 (vs 8/19 /zh-hk/product/saddle-stitch-booklets/ PASS)',
            'wedding-invitation-printing-foil-ribbon-envelope.html -> 404 (vs 8/19 /zh-hk/category/red-packets/ PASS)',
            'same-day-banner-printing-6x3ft-waterproof-hk.html -> 404 (vs 8/19 /zh-hk/category/banners/ PASS)'
        ],
        'K3_action_required': '8/26 早上 30-60 min 必拍 1 次回复 (P0 升级): (a) 立即 CF Dashboard Bulk Redirects 状态确认 5 min (b) 修复原因 文档化 10 min (c) 路径级规则 重新部署 4 条 30 min (d) 8/30 双周复盘 SSoT 维护 加 §0.18 兜底规则检测 项'
    },
    'matrix_priority_boost_changes_8_26': {
        'Q-005_cross_border_ecommerce_shipping_box': 'priority_boost=2 维持, daily 8/27 必写候选 (per 8/19 v2 §K3 拍板 0 候选常态 OR 拍板 10 Q4 并行 选项 A 接受 1 篇)',
        'Q-006_tea_beverage_gift_box': 'priority_boost=2 维持, 8/7 部署 7d 反弹 0 imps 失败, 8/28 中检 复测',
        'W1_B7_选题_1_rush_printing_hk_guide': 'priority_boost=3 (P0 第一优先) - 8/26 a1a7e56 已 push metadata+zh-hk content, en/ja 待 daily-content cron 8/27-8/30 补',
        'W1_B7_选题_2_2026_packaging_box_pricing': 'priority_boost=3 (P0 第一优先) - 8/26 a1a7e56 已 push metadata+zh-hk content, en/ja 待 daily-content cron 8/27-8/30 补',
        'W1_B7_选题_3_large_envelope_printing_c4_c5': 'priority_boost=3 (P0 第一优先) - 8/26 a1a7e56 push 5 类目 9 处 title 改 (envelopes 优先) 已落地, blog 待 daily-content cron',
        'W3_B7_选题_1_2027_calendar_printing_timetable': 'priority_boost=4 (R5 9/15 硬截止) - 8/30 8:00 月曆 blog 必发 (错峰 6 天缓冲)',
        'W7_B7_选题_2_red_packet_printing_2027': 'priority_boost=4 (R5 季节) - 9/30 8:00 blog 必发 (错峰 7 天缓冲, 2027 农曆新年 = 1/29)',
        'W9_B7_选题_4_christmas_card_printing_2026': 'priority_boost=4 (R5 季节) - 10/14 8:00 blog 必发 (错峰 7 天缓冲, 12/25)',
        '其他_13_选题': 'priority_boost=1 维持 (W2-W9 排期按 SSoT)'
    },
    'daily_cron_recommendation_2026_08_27': {
        'scope': '§6 daily cron (zprintpro-daily-content-evolve 8/27 09:10 触发)',
        'blocklist_2_slugs_NOT_to_write': [
            'back-to-school-printing-usa (en P3, 已 8/14-8/17 落地)',
            'new-semester-printing-japan (ja P3, 已 8/14-8/17 落地)'
        ],
        'recommended_P0_candidates_for_daily_cron': 'W1 B7 选题 #1 rush-printing-hk-guide (priority_boost=3) + W1 B7 选题 #2 2026-packaging-box-pricing (priority_boost=3) - en/ja content 必写 (8/26 a1a7e56 已 push metadata+zh-hk content)',
        'P0_recommendation_count': '2 候选 (W1 8/26-9/1 必发 3 篇, 8/26 a1a7e56 已 push 2 篇 metadata+zh-hk, 8/27 daily cron 必补 en/ja 同步)',
        'rationale': 'K3 8/26 §4 v9.4 拍板 铺量降速 9 篇/周 → 2-3 篇/周 + daily 1 篇/天 → 0-1 篇/天, queue ≥ 1 才写, 强制 v8 SEO+GEO 标准, 质量 > 数量'
    },
    'weekly_recommendation_2026_09_01_02': {
        'scope': 'P4 收尾 (8/12) + Week 2 收尾 (8/19) + Week 3 收尾 (8/26) → Week 4 起步 (8/27-9/2) + 9/1 monthly matrix audit',
        'week_4_priorities': '8/27-8/30 daily cron D3 12 篇 4 天 (K3 v3.3 P0 婚礼 2 篇 + 4-week-plan Q4 首批剩余 4 篇 = 6 篇并行, per 拍板 7 选项 A) + 8/28 早上 9 时段 GSC cron 重跑 7d 数据 + §4 v9.4 7d 校准 + 8/30 8:00 月曆 blog 必发 (W3 R5 季节军令) + 8/30 D 指令 GEO 74 篇博客验收 + 8/30 C 指令 striking 4 词验收 + 9/1 monthly matrix audit'
    },
    'update_history': [
        '2026-08-26 15:00 M3 GSC v4 weekly feedback v3: matrix v2026-08-01-v1 + gsc_targeting_weekly_v3 (8/14-8/18 5d 1535 imps / 6 clicks / 0.39% CTR + §4 v9.4 1/3 PASS + P0-2 4/5 FAIL 新退化 vs 8/19 5/5 PASS 失真 + 141 baseline 21/28 100% 0 click + B7 22 篇 派发 W1-W9 + 撞 §0.25 7.5 min 推迟 push + K3 §0.18 兜底规则检测 P0 升级)',
        '2026-08-19 15:00 M3 GSC v4 weekly feedback v2: matrix v2026-08-01-v1 + gsc_targeting_weekly_v2 (8/4-8/10 4 markets 3203 imps + P0-2 301 5/5 PASS 恢复 + 智印港 brand 2/2/100%/rank 1.0 + Q-005 priority_boost=2 维持 daily 8/20 必写候选 + 0 候选常态延续 27 天 + 拍板 12 升级 GSC 数据获取路径 utf-8-sig 解码)',
        '2026-08-12 15:00 M3 GSC v4 weekly feedback: matrix v2026-08-01-v1 + gsc_targeting_weekly_v1 (Q-005 priority_boost=2 维持 daily 必写 + P0-2 301 1/5 PASS 升级 K3)'
    ]
}

# 写回
with p.open('w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print('matrix.json updated OK')
print('  last_gsc_weekly_update:', data['last_gsc_weekly_update'])
print('  cron_8_26_status created_at:', data['cron_8_26_status']['triggered_at'])
print('  gsc_targeting_weekly_v3 created_at:', data['gsc_targeting_weekly_v3']['created_at'])
print('  gsc_targeting_weekly_v3 update_history entries:', len(data['gsc_targeting_weekly_v3']['update_history']))
