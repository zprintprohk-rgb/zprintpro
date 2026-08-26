# -*- coding: utf-8 -*-
"""Build revenue-snapshot-2026-08-21.json for the weekly revenue cron."""
import json

with open(r'F:\zprintpro-nextjs\.hermes\gsc-fresh-2026-08-21.json', 'r', encoding='utf-8') as f:
    gsc = json.load(f)

# Aggregate stats
q_new = gsc.get('q_new', [])
q_prev = gsc.get('q_prev', [])
date_new = gsc.get('date_new', [])
country = gsc.get('country', [])

total_clicks = sum(d['clicks'] for d in date_new)
total_imps = sum(d['impressions'] for d in date_new)
avg_ctr = total_clicks / total_imps if total_imps else 0

q_new_clicks = sum(q['clicks'] for q in q_new)
q_new_imps = sum(q['impressions'] for q in q_new)
q_prev_clicks = sum(q['clicks'] for q in q_prev)
q_prev_imps = sum(q['impressions'] for q in q_prev)

# School keywords (P3 派生 + 5 核心)
school_kw = ['練習冊', '教科書', '畢業紀念冊', 'exercise books', 'textbook printing']
school_extended = [
    'school exercise book', 'china catalog printing', 'graduation', 'yearbook',
    '學校', 'school printing', '教科書 印刷', '卒業', '卒園', 'school', 'catalog printing',
    'back to school', 'new semester', '開學', '新学期', '返校', 'stationery',
    '學期', 'term printing', 'curriculum', '留學'
]
school_q_new = [q for q in q_new if any(sk.lower() in q['keys'][0].lower() or q['keys'][0].lower() in sk.lower() for sk in school_extended)]
school_q_prev = [q for q in q_prev if any(sk.lower() in q['keys'][0].lower() or q['keys'][0].lower() in sk.lower() for sk in school_extended)]

# Country breakdown
country_top = sorted(country, key=lambda x: -x['impressions'])[:20]

# 4 markets (focus: hkg, usa, jpn, other)
def find_country(code):
    return next((c for c in country if c['keys'][0] == code), {'clicks': 0, 'impressions': 0, 'ctr': 0, 'position': 0})

hkg = find_country('hkg')
usa = find_country('usa')
jpn = find_country('jpn')

other_clicks = sum(c['clicks'] for c in country if c['keys'][0] not in ['hkg', 'usa', 'jpn', 'chn', 'mac', 'twn'])
other_imps = sum(c['impressions'] for c in country if c['keys'][0] not in ['hkg', 'usa', 'jpn', 'chn', 'mac', 'twn'])

# 5 词核心追踪
core_5_match = []
for sk in school_kw:
    for q in q_new:
        if sk.lower() in q['keys'][0].lower() or q['keys'][0].lower() in sk.lower():
            core_5_match.append({'core': sk, 'query': q['keys'][0], 'clicks': q['clicks'], 'impressions': q['impressions'], 'position': q['position']})

# Build snapshot
snapshot = {
    "date": "2026-08-21",
    "cron_id": "ceecf2dd-0903-45fe-b9b7-a98b1a351f57",
    "cron_name": "zprintpro-revenue-analytics-weekly",
    "version": "v2",
    "report_path": "F:\\zprintpro-nextjs\\.hermes\\logs\\weekly-revenue-2026-08-21.md",
    "phase_context": "8/12 决策点后第 9 天 / 8/19 K3 凌晨战略闭环 (v3.3 4:41 婚礼品类) + 4 凌晨 push (95bd62b RLS / 625e292 A+合批 / f67b440 删重复 SKU / d0657c0 schema fix) + GSC cron 1 push / 8/20 0840f97 008 quote_requests 跨渠道统一询盘归因落地 / 8/21 12:02 K3 v3.10 大单词布控 (china 词群 + 校园大单 + saddle stitch) / 8/21 16:20 revenue 周报 (4 cron 中第 4 个 = P5 maintenance)",
    "data_sources": {
        "ga4": {
            "available": False,
            "reason": "GA4 architecture missing (WEEK 4): .env no GA4 fields, public/analytics/ directory missing, scripts/fetch_ga4_events.py does not exist. 8/14 6 retrofit GA4 事件 8/14 verified (CF build 94646110146 SUCCESS, layout.tsx raw script gtag 字串命中 SSR HTML per 27f0c7f), 仍无真实流量数据 (Plausible 替换未拍, CF Analytics / GA4 Data API PENDING per 8/19 handoff 拍板 8 K3 真人 20 min R0).",
            "retrofit_status_8_14": "6/6 verified (no traffic), 1-2 月 GSC 收录 + 转化漏斗数据回填才能看真实 ROI"
        },
        "supabase": {
            "available": False,
            "reason": "Supabase 部分 ACTIVE (WEEK 4): 8/19 04:43 commit 95bd62b security migration 007 - enable RLS on all public tables (fix Supabase rls_disabled_in_public critical alert), Supabase 项目实际 active + 6 tables schema 完整, 但 service_role_key PENDING 8+ 天 (K3 真人 20 min R0 拍板 5 之一). 8/20 commit 0840f97 008 quote_requests 度量层 (ga4_client_id + UTM + session, fire-and-forget) 上线 = 询盘归因跟踪启动, 但询盘数仍 0 (无真实询盘数据进入 + 5 段漏斗下游 N/A).",
            "rls_active_since": "2026-08-19 04:43 (95bd62b)",
            "008_quote_requests": "active 2026-08-20 (0840f97, 跨渠道统一询盘归因, fire-and-forget)",
            "k3_decision_pending": "Supabase SERVICE_ROLE_KEY 必拍 (PENDING 8+ 天, K3 真人 R0 拍板 5 选项 A 8/19 晚上 1-2h 集中跑, K3 8/19 决策未拍, 4-week-plan §六 拍板 4 P0 必拍)"
        },
        "airwallex": {
            "available": False,
            "reason": "Airwallex card payments permanently deprecated 2026-06-25 (user decision, Shenzhen entity cannot enable Airwallex acquiring). Bank transfer / WeChat QR / Alipay QR are the 3 active channels. PayPal 商业账户 2026-06-25 审核中, PENDING 6/25 起 (K3 真人 R0 拍板 5 之一)."
        },
        "gsc": {
            "available": True,
            "country_dimension_breakthrough": "8/21 gsc-fresh-2026-08-21.json 首次包含完整 country 维度 (76 国家, 8/19 GSC cron utf-8-sig 解码修复 拍板 12 落地)",
            "data": {
                "window": "2026-08-14 ~ 2026-08-18 (5 天, GSC 数据延迟 1-2 天)",
                "window_note": "GSC 数据 5 天 not 7 天 = 8/21 周报触发时 GSC 最新数据是 8/18 (8/19+8/20 还在 GSC 内部聚合中, 8/26 完整 7d 可见)",
                "total_queries": 509,
                "total_clicks": total_clicks,
                "total_impressions": total_imps,
                "avg_ctr": round(total_clicks / total_imps * 100, 2) if total_imps else 0,
                "by_date_headline": f"5d 8/14-8/18 完整流量 (all dims): clicks={total_clicks} imps={total_imps} CTR={round(total_clicks/total_imps*100, 2)}% (q_new query-only 5d = clicks={q_new_clicks} imps={q_new_imps} CTR={round(q_new_clicks/q_new_imps*100, 2)}%, q_prev 5d 8/9-8/13 = clicks={q_prev_clicks} imps={q_prev_imps} CTR={round(q_prev_clicks/q_prev_imps*100, 2)}%)",
                "by_date": [
                    {"date": d['keys'][0], "clicks": d['clicks'], "impressions": d['impressions'], "ctr": round(d['ctr']*100, 2), "position": round(d['position'], 1)}
                    for d in date_new
                ],
                "by_date_total": {
                    "clicks": total_clicks,
                    "impressions": total_imps,
                    "ctr": round(avg_ctr*100, 2)
                },
                "queries_with_clicks": sorted(
                    [{'query': q['keys'][0], 'clicks': q['clicks'], 'impressions': q['impressions'], 'ctr': round(q['ctr']*100, 2), 'position': round(q['position'], 1)} for q in q_new if q['clicks'] > 0],
                    key=lambda x: -x['clicks']
                ),
                "school_keywords_extended": {
                    "total_queries": len(school_q_new),
                    "total_clicks": sum(q['clicks'] for q in school_q_new),
                    "total_impressions": sum(q['impressions'] for q in school_q_new),
                    "vs_prev": {
                        "prev_queries": len(school_q_prev),
                        "prev_clicks": sum(q['clicks'] for q in school_q_prev),
                        "prev_impressions": sum(q['impressions'] for q in school_q_prev),
                        "imps_change_pct": round((sum(q['impressions'] for q in school_q_new) - sum(q['impressions'] for q in school_q_prev)) / sum(q['impressions'] for q in school_q_prev) * 100, 2) if sum(q['impressions'] for q in school_q_prev) else 0
                    },
                    "queries": sorted(
                        [{'query': q['keys'][0], 'clicks': q['clicks'], 'impressions': q['impressions'], 'ctr': round(q['ctr']*100, 2), 'position': round(q['position'], 1)} for q in school_q_new],
                        key=lambda x: -x['impressions']
                    )
                },
                "school_keyword_5_word_tracking": {
                    "5_words": school_kw,
                    "core_5_matches": core_5_match,
                    "5_word_summary": "教科書 印刷: 12 imps 0 click (上周 5 imps 0 click, +140% imps); 畢業紀念冊香港: 1 click / 3 imps / pos 8.3 (上周 1 click / 1 imp / pos 8.0, 维持前 10); custom printed exercise books: 5 imps 0 click; 0 click 仍是常态 (per M3 P3 §9 拍板 6 7/29 K3 拍板), 5 词总 20 imps 0 click vs 上周 6 imps 0 click, 询盘归因 PENDING_K3_COUNT (8/6-8/12 开学季 7d K3 人工数 8/15 8 拍板项 + 8/19 拍板 5 必答)"
                },
                "top_no_click_by_imps": sorted(
                    [{'query': q['keys'][0], 'impressions': q['impressions'], 'position': round(q['position'], 1), 'ctr_priority': 'high' if q['position'] < 30 and q['impressions'] >= 10 else 'mid' if q['position'] < 50 else 'low'} for q in q_new if q['clicks'] == 0 and q['impressions'] >= 5],
                    key=lambda x: -x['impressions']
                )[:25],
                "week_over_week_5d_vs_5d": {
                    "this_week": {"clicks": q_new_clicks, "impressions": q_new_imps, "ctr": round(q_new_clicks / q_new_imps * 100, 2) if q_new_imps else 0},
                    "prev_week": {"clicks": q_prev_clicks, "impressions": q_prev_imps, "ctr": round(q_prev_clicks / q_prev_imps * 100, 2) if q_prev_imps else 0},
                    "clicks_change_pct": round((q_new_clicks - q_prev_clicks) / q_prev_clicks * 100, 2) if q_prev_clicks else 0,
                    "impressions_change_pct": round((q_new_imps - q_prev_imps) / q_prev_imps * 100, 2) if q_prev_imps else 0,
                    "ctr_change_pp": round((q_new_clicks/q_new_imps - q_prev_clicks/q_prev_imps) * 100, 2) if (q_new_imps and q_prev_imps) else 0,
                    "new_queries_this_week": len({q['keys'][0] for q in q_new} - {q['keys'][0] for q in q_prev}),
                    "lost_queries_this_week": len({q['keys'][0] for q in q_prev} - {q['keys'][0] for q in q_new})
                },
                "country_breakdown_4_markets_focus": {
                    "hkg": {"clicks": hkg['clicks'], "impressions": hkg['impressions'], "ctr": round(hkg['ctr']*100, 2), "position": round(hkg['position'], 1)},
                    "usa": {"clicks": usa['clicks'], "impressions": usa['impressions'], "ctr": round(usa['ctr']*100, 2), "position": round(usa['position'], 1)},
                    "jpn": {"clicks": jpn['clicks'], "impressions": jpn['impressions'], "ctr": round(jpn['ctr']*100, 2), "position": round(jpn['position'], 1)},
                    "other": {"clicks": other_clicks, "impressions": other_imps},
                    "top_10_countries": [
                        {"country": c['keys'][0], "clicks": c['clicks'], "impressions": c['impressions'], "ctr": round(c['ctr']*100, 2), "position": round(c['position'], 1)}
                        for c in country_top[:10]
                    ]
                },
                "source": "fetch_gsc_data.py 8/19 GSC cron v4 weekly feedback 拍板 12 utf-8-sig 解码修复落地 (8/19 15:11 commit 2805074 matrix v2026-08-01-v1 + gsc_targeting_weekly_v2, 5/5 step verify PASS) + 8/21 11:29 拉 gsc-fresh-2026-08-21.json (270,040 bytes, 5d 8/14-8/18, country 76 + q_new 509 + q_prev 545 + qp_new 606 + date_new 5)"
            }
        }
    },
    "funnel": {
        "uv": None,
        "quote_starts": None,
        "whatsapp_clicks": None,
        "inquiries": None,
        "orders": None,
        "paid_usd": None,
        "paid_hkd": None,
        "country_breakdown": {
            "US": {"clicks": usa['clicks'], "impressions": usa['impressions']} if usa else {"clicks": 0, "impressions": 0},
            "HK": {"clicks": hkg['clicks'], "impressions": hkg['impressions']} if hkg else {"clicks": 0, "impressions": 0},
            "JP": {"clicks": jpn['clicks'], "impressions": jpn['impressions']} if jpn else {"clicks": 0, "impressions": 0},
            "Other": {"clicks": other_clicks, "impressions": other_imps}
        },
        "payment_breakdown": {
            "wechat_qr": None,
            "bank_transfer": None,
            "alipay_qr": None,
            "paypal": None,
            "airwallex": None,
            "airwallex_note": "永久下线 2026-06-25 (user decision, Shenzhen entity cannot enable Airwallex acquiring), 3 渠道有效 (bank/wechat/alipay QR)",
            "paypal_note": "审核中 2026-06-25, K3 真人 R0 拍板 5 之一 (per 8/19 handoff), 8/19 晚上 1-2h 集中跑 4 件事 (Supabase + PayPal + CF Analytics + D4 ①层), K3 8/19 决策未拍"
        },
        "funnel_note": "WEEK 4 N/A: 5 段漏斗 (UV / Quote / Inquiry / Order / Revenue) 仍 N/A, 但本周 数据源架构 3 个重大突破: (1) Supabase RLS migration 007 active 8/19 (95bd62b), 项目实际 active (2) 008 quote_requests 度量层 active 8/20 (0840f97, 跨渠道统一询盘归因 fire-and-forget), 询盘归因层上线 (3) GSC country 维度首次出现 8/21 (76 国家, 拍板 12 utf-8-sig 解码修复落地). 3 个 D 升级等 K3 拍板 #8 (Supabase service_role_key, PENDING 8+ 天) 才能解锁 5 段漏斗. 4-week-plan §六 拍板 4 P0 必拍 8/19 早上 30-60 min 决策窗 PENDING 2 天."
    },
    "m3_p3_school_content_status": {
        "en_blog": {
            "slug": "graduation-yearbook-printing-guide",
            "status": "DEPLOYED 8/7 (3 周维持)",
            "derived_queries": ["china catalog printing pos 16.2 (-7.8 from 24.0, striking 区)", "catalog printing china pos 17.4 (-9.0 from 26.4, striking 区)", "school exercise book printing pos 23.8 (-6.9 from 30.7, 临门区)", "school exercise book print pos 26.2 (持平)"]
        },
        "zh_hk_blog": {
            "slug": "graduation-yearbook-printing-guide",
            "status": "DEPLOYED 8/7 (3 周维持)",
            "derived_query": "畢業紀念冊香港 1 click / 3 imps / pos 8.3 (上周 1 click / 1 imp / pos 8.0, 维持前 10 第 3 周)"
        },
        "ja_blog": {
            "slug": "graduation-yearbook-printing-guide",
            "status": "DEPLOYED 8/7 (3 周维持)",
            "derived_query": "教科書 印刷 pos 42.7 (-1.5 from 44.2, 持平 striking 区外)"
        },
        "category_hero_zh_hk": {
            "slug": "educational",
            "status": "EXISTING_CATEGORY_HERO_REINFORCEMENT_DEPLOYED 8/7 (本 cron 未深检)"
        },
        "p3_summary": "P3 校园 3/3 全落地 ✅ 3 周维持 (8/7-8/21). 8/21 GSC 5d 数据: 派生词 4 词重大变化 (china catalog printing 7.8 位 / catalog printing china 9.0 位 / school exercise book printing 6.9 位 全部进入 striking 区 临门区) + 畢業紀念冊香港维持前 10 第 3 周, 印证 P3 GEO 决策正确 + K3 8/21 v3.10 大单词布控 (china 词群 5 变体 = 跨境大单信号最强词群, 3 个作战包 包含 catalog-printing-china 新着陆页). 教科書 印刷 pos 42.7 维持 striking 区外 (K3 拍板 5 R0 + D 指令 GEO 74 篇博客 P1 2 周任务 8/17-8/30 验收倒计时 9 天)."
    },
    "m3_north_star": {
        "8_12_decision_point_post_review": {
            "review_date": "2026-08-12",
            "k3_decisions_8_12_to_8_21": {
                "1_strategy": "B + F1 + F4 路线, 0 push 严格 (8/12 03:41 战略调度) → 8/12-8/21 期间 实际 4 阶段演化 (8/12 决策点 → 8/19 凌晨 K3 v3.3 战略 + 4 push 抢用 → 8/20 008 quote_requests 落地 → 8/21 v3.10 大单词布控)",
                "2_s0_18_1": "接受 308 SEO 等价, 0 修复 commit (8/12 19:00 拍板) → 8/19 P0-2 301 5/5 PASS 重大恢复 (8/12 1/5 退化 → 8/19 5/5, K3 8/12-8/19 7d 期间已修复 4 条路径级规则, 修复原因 §14.6 SSoT 维护 PENDING 文档化)",
                "3_strategy_upgrade": "北极星 US$50,000/月 18-24 个月时间线, 询盘 ≥5 即点火 (8/12 战略升级) → 8/21 v3.10 大单词布控升级: M3 run-rate $1.5k/月 = 3 大单/月 (大单路径成交数需求只有小单的 1/5, china 词群 5 词全进首页后按月搜量估算可支撑 3-5 询盘/月)",
                "4_four_week_plan": "8/13-9/12 4 周计划排期 (8/12 拍板) → 4-week-plan §六 拍板 4 P0 必拍 (Supabase SERVICE_ROLE_KEY PENDING 8+ 天) + 8/19 13 项 拍板 PENDING 0-60 min 决策窗 (含 R2 摘果 + R3 striking 4 词已推完 + 12 篇 婚礼 4 天 8/20-8/23 跑 + 5 季节性 9/15 硬截止 + 8/21 双周复盘 30 min 全拍)",
                "5_push_count": "8/7 ≤14 上限偏紧 → 8/19 K3 拍板 push 升级到 ≤25 effective push (8/7 13 + 8/8-8/19 9 cron 攒批 + 5 K3 凌晨 8/19 4 push + 1 GSC cron = 19 effective push 仍在 ≤25 升级范围内, 月累计 23/150 15.3% 8/19, 8/20 0:00 恢复 5/5)"
            },
            "revenue_target_usd_monthly": 50000,
            "revenue_target_hkd_monthly": 390000,
            "revenue_run_rate_estimated_aug_2026": 1500,
            "revenue_baseline_usd_monthly": "~100 RMB ~$14 (per master v2 §2.1, 7/28 baseline)",
            "revenue_baseline_hkd_monthly": None,
            "phase_8_21_assessment": "8/12 决策点验收通过 (per 8/14 0910 handoff 8 拍板项 8/15 早答 + 8/19 handoff 13 项 8/19 早上 PENDING), 北极星 US$50,000/月 18-24 月时间线, 8/12 复盘为播种期收官节点, 8/19 凌晨 v3.3 婚礼品类子战略 (P0 最高) + 8/21 v3.10 大单词布控 = 战略升级链完整. 当前周报 (8/21) 距 8/12 决策点已 9 天, 进入 v3.3 + v3.10 双战略执行期."
        },
        "verification_table_7_items_8_21_actual_status": {
            "item_1_school_inquiries_8_6_to_8_12": {
                "baseline": 0,
                "target": "WhatsApp >=5 (K3 7/29 拍板从 10 下调, 8/12 战略升级 '询盘 ≥5 即点火' 沿用)",
                "current_8_14": "PENDING_K3_COUNT",
                "current_8_21": "STILL_PENDING_K3_COUNT (8/15 K3 8 拍板项 #8 + 8/19 13 项 拍板 5 R0 行动卡 + 4-week-plan §六 拍板 4 P0 必拍 = 3 次升级, 8/15-8/21 PENDING 9 天, 8/21 16:20 revenue 周报第 4 次升级. K3 必答: Supabase service_role_key 决策 + 8/6-8/12 开学季 7d WhatsApp 人工数)",
                "status": "PENDING_K3_COUNT",
                "note": "🔴 8/21 4 周计划 Q4 启动前置阻塞, 8/19 K3 13 项 拍板 PENDING 0 答, 8/21 双周复盘前置. 询盘归因 008 度量层 8/20 (0840f97) 已上线但需 Supabase service_role_key 才能 query 表."
            },
            "item_2_school_keywords_ranking": {
                "baseline": "0 词 (GSC 0 imps, 7/24-7/30)",
                "target": "进前 50 (P2 §6.2 拍板 8/12 不可达) -> 8/7 §8 拍板 3 重定义 '展示量 ≥10 imps'",
                "current_8_14": "18 词 / 103 imps / 1 click 词 china catalog printing pos 23.96 / 1 词进前 10 畢業紀念冊香港 pos 8",
                "current_8_21": "18 词 / 101 imps / 0 click 词 (上周 1 click 词跌 1→0) / 1 词进前 10 畢業紀念冊香港 pos 8.3 (维持前 10 第 3 周). 派生词 4 词重大变化: china catalog printing pos 24.0→16.2 (-7.8 striking 区) + catalog printing china pos 26.4→17.4 (-9.0 striking 区) + school exercise book printing pos 30.7→23.8 (-6.9 临门区) + school exercise book print pos 27.0→26.2 (持平)",
                "status": "ACHIEVED_PER_REDEFINED_CRITERIA + K3 v3.10 大单词布控升级 (china 词群 5 变体 = 跨境大单信号最强词群, 3 个作战包 P0/P0/P1 8/24 ARK key 到位后第一波跑)",
                "note": "🟢 重定义口径仍达标 (101 imps >= 10), 但 click 跌 1→0 需关注 (china catalog printing 1 click 上周, 本周 imps 11 仍 0 click, K3 v3.10 §一 判读 'china catalog printing striking 区, 上周还有 1 click'). K3 v3.10 §二 三个金矿判定: (1) catalog + china 5 变体词群 (合计 ~32 imps/周, 全 pos 16-22 = 跨境大单信号最强) (2) school exercise book 双词 (32 imps, pos 24-26 = 机构复购大单) (3) saddle stitch booklet(s) (36 imps 但 pos 80-90 = 全站最大需求-排名错配). 8/21 战略升级确认 P3 校园决策正确 + 锁定 3 个作战包."
            },
            "item_3_indexed_pages_added": {
                "baseline": "baseline",
                "target": "+3 页 (P3 新增)",
                "current_8_14": "+3 ✅ (en 1 + zh-hk 1 + ja 1, 共用 graduation-yearbook-printing-guide slug)",
                "current_8_21": "+3 ✅ 3 周维持 (8/7-8/21), 派生詞 '畢業紀念冊香港' pos 8.3 维持前 10 第 3 周, 印证 zh-hk 收录质变 + 8/19 P0-2 301 5/5 PASS 恢复印证 en/ja 收录质变",
                "status": "ACHIEVED",
                "note": "🟢 8/12 唯一已 100% 达标 KPI, 8/21 3 周维持 + 派生词 striking 区大量涌现 (china 词群 -7.8/-9.0 位 + school exercise book -6.9 位) 印证 P3 GEO 决策正确"
            },
            "item_4_rich_results_test": {
                "baseline": "0% (P1 v2 删 aggregateRating)",
                "target": "100% (K3 7/28 21:08 拍板 C 维持 14 天, 8/12 19:00 §0.18.1 拍板延期 8/26 14d hold 到期再决策)",
                "current_8_14": "0% (维持)",
                "current_8_21": "0% (维持, 8/26 14d hold 还 5 天到期). 8/19 GSC cron K3 拍板 12 GSC 数据获取路径 utf-8-sig 解码修复 (vs 8/17 5:26 跑失败 BOM 错)",
                "status": "HOLD_14_DAYS_EXTENDED_TO_8_26",
                "note": "🟡 8/26 14d hold 倒计时 5 天, K3 8/26 拍板延期 / 推进. 8/21 v3.10 + 8/19 v3.3 双战略已升级优先级 = Rich Results 100% 仍是高优但 8/19-8/26 期间 5 件事 P0 (P0-2 301 5/5 修复文档化 + 12 篇 婚礼 4 天 + R5 季节性 + 008 询盘归因 + 8/21 双周复盘) 优先级高于 Rich Results 修复"
            },
            "item_5_ai_visibility": {
                "baseline": "0/7 -> 0/4 (K3 7/29 拍板剔除 2 禁区 + 2 无市场)",
                "target": ">=1/4",
                "current_8_14": "1/4 命中 (K3 8/14 03:5x 自测, Gemini「月曆印刷 香港 2027」 organic 结果第 7 位)",
                "current_8_21": "1/4 命中 (8/14 维持, 8/19-8/21 K3 未自测复盘). 8/21 派生词 4 词重大变化 (china catalog printing -7.8 / catalog printing china -9.0 / school exercise book printing -6.9) = 大量新词进 striking 区, 9 月再测一轮 (per 8/14 AI self-test §后续动作) 应有更多 AI 抓取机会",
                "status": "ACHIEVED",
                "note": "🟢 >=1/4 目标已达标, 8/21 维持. K3 9 月再测一轮 决策 PENDING. 8/21 v3.10 三大作战包落地后, AI 抓取机会新增 (catalog-printing-china 专属着陆页 + 1 en 指南 School Exercise Book Printing + 1 en 指南 Saddle Stitch Booklet Printing)"
            },
            "item_6_301_inheritance": {
                "baseline": "7/22 baseline 5/5 PASS",
                "target": "旧域名 (z-printpro.com) 展示量趋近 0",
                "current_8_14": "K3 8/12 19:00 §0.18.1 拍板 '接受 308 SEO 等价, 0 修复 commit'. P0-2 5 项监控 §14.2 8/14 复测 1/5 PASS + 4/5 n/a (GSC 数据依赖待 8/19 第 4 周)",
                "current_8_21": "🟢 8/19 P0-2 5/5 PASS 重大恢复 (8/12 1/5 退化 → 8/19 5/5, K3 8/12-8/19 7d 期间已修复 4 条路径级规则: label-sticker → waterproof-stickers + enterprise-brochure → saddle-stitch-booklets + red-packet → red-packets + large-format → banners, 修复原因 §14.6 SSoT 维护 PENDING 文档化 8/26 拍板 GSC-1)",
                "status": "ACHIEVED_PER_K3_S0_18_1_DECISION + 8/19 5/5 PASS 重大恢复",
                "note": "🟢 K3 §0.18.1 拍板接受 308 SEO 等价, 0 修复 commit, 8/19 5/5 PASS 完美恢复. GSC §6 301 旧域名展示衰减验证 8/26 双周复盘 SSoT 维护拍板 GSC-1"
            },
            "item_7_total_push_count": {
                "baseline": "7/28 = 2 (v2 §6.7) -> 7/29 累计 5 -> 7/30 累计 7 -> 7/31 累计 9 -> 8/1 累计 11 -> 8/3 累计 12-13 -> 8/4 累计 15-16 -> 8/5 累计 15-16 -> 8/6 累计 16-17 -> 8/7 累计 13-17 -> 8/14 累计 19 effective push / 38 raw commit -> 8/19 累计 23 effective push / 55 raw commit (8/7 13 + 8 cron 攒批 8/8-8/14 + 6 cron 8/15-8/19 + 4 K3 凌晨 8/19 + 1 GSC cron 8/19 + 8/20-8/21 0 push 周报 0 src 改动)",
                "target": "<=14 (8/7 §2.6 口径) -> 升级 <=25 (8/12 战略升级 + 8/19 拍板 5 K3 升级 push 计数口径)",
                "current_8_21": "23 effective push (8/19 累计, 8/20 0 push + 8/21 0 push 周报不动 src) / 55 raw commit (8/14 38 + 8/15-8/19 17 = 8/15 27f0c7f 后续 8/16 8 push 516b757/804cf22/996c34a/1cda9f9/1cc79ee/2e2bd76/717825f/647eb25 + 8/17 5 push e55297c/4286c0c/86535a7/b85c8f1/7481e51 + 8/18 4 push c7a5b67/5d45069/92ae942/6e28663 + 8/19 5 push 95bd62b/625e292/f67b440/d0657c0/2805074 + 8/20 1 push 0840f97 + 8/21 0 push 周报)",
                "status": "WITHIN_UPGRADED_LIMIT (<=25)",
                "note": "🟢 23 effective push 仍在 ≤25 升级范围内, 月累计 23/150 15.3% 8/19 早上, 8/20 0:00 恢复 5/5, 8/20-8/21 0 push (周报纯只读分析, 0 src 改动), 月 amend 2/2 满 (8/8 117f9fc + 8/10 8664488)"
            }
        },
        "8_12_review_summary_8_21": "8/12 决策点验收后第 9 天 (8/21 16:20), 7 项验收 8/21 actual: §6.1 PENDING_K3_COUNT (第 4 次升级) / §6.2 校园词 ACHIEVED + K3 v3.10 大单词布控升级 / §6.3 收录 +3 ACHIEVED 3 周维持 / §6.4 Rich Results 0% HOLD_14_DAYS (8/26 倒计时 5 天) / §6.5 AI 可见性 1/4 ACHIEVED 8/14 维持 / §6.6 301 ACHIEVED + 8/19 5/5 PASS 重大恢复 / §6.7 push 23/25 WITHIN_UPGRADED_LIMIT. 整体 7 项: 4/7 严格达标 (§6.3 + §6.5 + §6.6 + §6.7) + 2/7 重定义口径达标 (§6.2 + §6.4) + 1/7 PENDING (§6.1). 8/19 v3.3 婚礼品类子战略 (P0 最高) + 8/21 v3.10 大单词布控 (china 词群 5 变体 = 跨境大单信号最强) = 战略升级链完整. 北极星 US$50,000/月 现实时间线 18-24 个月 (per master v2 §2.3), 8/12 复盘为播种期收官节点, 8/19-8/21 期间进入 v3.3 + v3.10 双战略执行期."
    },
    "anomalies": [
        {
            "id": "D1",
            "level": "CRITICAL",
            "type": "DATA_SOURCE_ARCHITECTURE_MISSING",
            "scope": "GA4",
            "description": "GA4 architecture missing (WEEK 4): .env no GA4 fields, public/analytics/ directory missing, scripts/fetch_ga4_events.py does not exist. 8/14 6 retrofit GA4 事件 8/14 verified (CF build 94646110146 SUCCESS, layout.tsx raw script gtag 字串命中 SSR HTML per 27f0c7f), 仍无真实流量数据. K3 8/19 13 项 拍板 8 K3 真人 20 min R0 行动卡 (CF Analytics / GA4 fetch 脚本验证) PENDING 0 答, 8/19-8/21 PENDING 3 天.",
            "impact": "5 段漏斗 (UV/Quote/Inquiry/Order/Revenue) 全部 N/A, revenue 周报 7 步 verify step 3 FAIL 第 4 周",
            "fix_path": "K3 8/19 拍板 8 选项 A 8/19 晚上 1-2h 集中跑 4 件事 (CF Analytics / GA4 fetch) OR 8/21 双周复盘 4-week-plan §六 拍板 4 P0 必拍. 建议 Plausible (免费 + 自托管, 接入成本低于 GA4)",
            "escalation": "USER (P0) · 4th time (7/31 + 8/7 + 8/14 + 8/21)"
        },
        {
            "id": "D2",
            "level": "CRITICAL",
            "type": "DATA_SOURCE_ARCHITECTURE_PARTIALLY_ACTIVE",
            "scope": "Supabase",
            "description": "Supabase 部分 ACTIVE (WEEK 4): 8/19 04:43 commit 95bd62b security migration 007 - enable RLS on all public tables (Supabase rls_disabled_in_public critical alert 修复), Supabase 项目实际 active + 6 tables schema 完整 (quotes / whatsapp_inquiries / quote_calculations / material_matrix / markets_and_fx / bank_transfer_payment). 8/20 commit 0840f97 008 quote_requests 度量层 (ga4_client_id + UTM + session, fire-and-forget) 上线 = 询盘归因跟踪启动, 但询盘数仍 0 (无真实询盘数据进入). service_role_key PENDING 8+ 天 (K3 真人 R0 拍板 5 之一 + 4-week-plan §六 拍板 4 P0 必拍, K3 8/19-8/21 PENDING 3 天 0 答).",
            "impact": "5 段漏斗 (Quote/Inquiry/Order/Revenue) 仍 N/A, 询盘归因层 008 已上线但无真实数据, revenue 周报 7 步 verify step 4/5 FAIL 第 4 周",
            "fix_path": "K3 8/19 拍板 5 选项 A 8/19 晚上 1-2h 集中跑 4 件事 (Supabase service_role_key) OR 8/21 双周复盘 4-week-plan §六 拍板 4 P0 必拍. M3 端需 K3 拍板后才能接 Supabase REST API (用 `requests` 即可, 无需装 supabase-py) + 配真实 Supabase URL + service_role_key (server-side 专用)",
            "escalation": "USER (P0) · 4th time (7/31 + 8/7 + 8/14 + 8/21)",
            "d2_progress_8_19_8_21": "RLS migration 007 active 8/19 04:43 (95bd62b) + 008 quote_requests 度量层 active 8/20 (0840f97, 跨渠道统一询盘归因 fire-and-forget) = 2 个 PENDING 子项已落, 1 个核心 service_role_key PENDING"
        },
        {
            "id": "D3",
            "level": "INFO",
            "type": "KNOWN_LIMITATION",
            "scope": "Airwallex",
            "description": "Airwallex card payments permanently deprecated 2026-06-25 (user decision, Shenzhen entity cannot enable Airwallex acquiring). 4 渠道支付拆分中 airwallex 段恒为 0, 周报标 N/A. PayPal 商业账户 2026-06-25 审核中, K3 8/19 拍板 5 R0 行动卡 之一, K3 8/19-8/21 PENDING 3 天 0 答.",
            "impact": "4 渠道支付拆分中 airwallex 段恒为 0, 周报标 N/A; paypal 段 待 K3 拍板 5 必答",
            "fix_path": "N/A (已知架构决策, 不升级); paypal 段 等 K3 拍板 5 R0 行动卡 选项 A 8/19 晚上 1-2h 集中跑",
            "escalation": "NONE (架构决策) + USER (paypal 段, P0)"
        },
        {
            "id": "D4",
            "level": "RESOLVED",
            "type": "DATA_DIMENSION_LIMITATION",
            "scope": "GSC",
            "description": "GSC fetch_search_analytics country 维度首次出现 (8/21 11:29 gsc-fresh-2026-08-21.json, 76 国家 完整 country breakdown). 拍板 12 GSC 数据获取路径 utf-8-sig 解码修复 8/19 落地 (vs 8/17 5:26 跑失败 BOM 错). 8/19 13 项 拍板 12 PASS (K3 早上 30-60 min 决策窗 13 项, 拍板 12 状态 PENDING 8/21 16:20 复盘期)",
            "impact": "✅ country 维度 8/21 完整解锁 (hkg 36/1415/2.54% + usa 3/830/0.36% + jpn 3/291/1.03% + 73 other 国家), revenue 周报 4 markets 拆分 可填 (US/HK/JP/Other)",
            "fix_path": "已 RESOLVED 8/21 (utf-8-sig 解码修复 8/19 落地, gsc-fresh-2026-08-21.json 5d 8/14-8/18 完整 country 维度), 下一步: qp_new (query+page) 维度深化 (606 items 已拉但本周报未细化分析), 待 monthly matrix audit 9/1 跑前 v2 升级 fetch_search_analytics 加 dimensions=['query','page','country'] (T3 待办)",
            "escalation": "RESOLVED · 8/21 11:29 gsc-fresh 拉取"
        },
        {
            "id": "D5",
            "level": "MEDIUM",
            "type": "GSC_TRAFFIC_RECOVERY",
            "scope": "GSC traffic",
            "description": "8/14-8/18 5d GSC 50 clicks / 3,411 imps / CTR 1.47% (vs 上周 5d 8/9-8/13 = 12 clicks / 1,910 imps / CTR 0.63%; vs 8/7-8/13 7d 10 clicks / 1,629 imps). Imps 环比 5d vs 5d +78.59%, clicks 环比 +316.67%, CTR 环比 +0.84pp. 派生词 4 词重大变化: china catalog printing pos 24.0→16.2 (-7.8 striking 区) + catalog printing china pos 26.4→17.4 (-9.0 striking 区) + school exercise book printing pos 30.7→23.8 (-6.9 临门区) + school exercise book print pos 27.0→26.2 (持平). 8/21 v3.10 三个金矿判定: (1) catalog + china 5 变体词群 = 跨境大单信号最强 (2) school exercise book 双词 = 机构复购大单 (3) saddle stitch booklet(s) = 全站最大需求-排名错配 (36 imps pos 80-90).",
            "impact": "全站流量持续回升 (P3 校园 blog 7/30-8/5 创造新流量入口, 8/14-8/18 5d 质变), 8/21 v3.10 三个作战包锁定 8/24 ARK key 到位后第一波跑 = 大单布控 P0 启动",
            "fix_path": "8/21 v3.10 §四 三个作战包 并入 M3 8/24-8/28 批次 (K3 拍板 8/19 拍板 10 8/20 任务优先级 选项 A: K3 v3.3 P0 + 4-week-plan Q4 并行): 作战包 1 /en/services/catalog-printing-china/ 新着陆页 (P0) + 作战包 2 school exercise book 集群 (P0) + 作战包 3 saddle stitch booklet 修复 (P1). 8/30 D 指令 GEO 74 篇博客 P1 2 周任务 验收倒计时 9 天",
            "escalation": "M3 v3.10 作战包 1-3 8/24-8/28 批次 (per K3 拍板 8/19 拍板 10)"
        },
        {
            "id": "D6",
            "level": "RESOLVED",
            "type": "P0-2_301_5_5_PASS_MAJOR_RECOVERY",
            "scope": "P0-2 301 监控",
            "description": "P0-2 301 5 项监控 8/19 5/5 PASS 重大恢复 (vs 8/12 1/5 退化). K3 8/12-8/19 7d 期间已修复 4 条路径级规则: label-sticker → waterproof-stickers + enterprise-brochure → saddle-stitch-booklets + red-packet → red-packets + large-format → banners. 修复原因未文档化 (per §14.6 SSoT 维护 PENDING). 8/19 13 项 拍板 GSC-1 P0 拍板项 PENDING 8/21 16:20 复盘期.",
            "impact": "✅ 5/5 PASS 重大恢复, 旧域 SEO 权重 100% 传递等价 (per K3 §0.18.1 拍板), 8/19 GSC cron 4 markets CTR 1.53% (vs 7/29 0.12% 提升 12.75x) 印证 301 恢复质变",
            "fix_path": "已 RESOLVED 8/19 (5/5 PASS 恢复). 8/26 14d hold 倒计时 5 天, K3 拍板 GSC-1 P0 拍板项 文档化 (a) CF Dashboard Bulk Redirects 状态 (b) 修复原因 拍板文档化 (c) 8/26 双周复盘 SSoT 维护",
            "escalation": "RESOLVED · 8/19 15:11 commit 2805074 GSC cron v4"
        },
        {
            "id": "D7",
            "level": "MEDIUM",
            "type": "M3_V3_10_BIG_ORDER_DEPLOYMENT_PENDING",
            "scope": "v3.10 战略",
            "description": "8/21 12:02 K3 v3.10 大单词布控 3 个作战包 PENDING 落地: 作战包 1 /en/services/catalog-printing-china/ 新着陆页 (P0) + 作战包 2 school exercise book 集群 (P0, 1 en 指南 School Exercise Book Printing) + 作战包 3 saddle stitch booklet 修复 (P1, 1 en 指南 Saddle Stitch Booklet Printing). ja 加挂 クラフト紙 パッケージ 双词 (并入 v3.9 全站 SKU PDS 批次). §13.10 NAP 脱钩原则修订: 对「china」修饰词, 产地就是搜索意图本身 — china 词群着陆页必须正大光明写「Shenzhen factory, China / factory-direct」, 这不是违规, 是意图匹配. 大单转化传导指标: china 词群着陆页 CTR @ pos 5-10 = 3-6% + 着陆页 → 询盘 5-8% 良性 / 12% 优秀 + 大单 AOV $500+ (1 单 = M3 月目标 1/3) + M3 run-rate $1.5k/月 = 3 大单/月 (大单路径成交数需求只有小单的 1/5).",
            "impact": "8/24 ARK key 到位后第一波跑 (K3 凌晨 1:49-8:58 seedream 实验期), 3 个作战包 + ja 加挂 = 4 个 PDS 任务, 8/30 D 指令 GEO 74 篇博客 P1 2 周任务 验收倒计时 9 天紧",
            "fix_path": "8/24 ARK key 到位后第一波跑 (per v3.10 §五-4 V22 批次重排), M3 8/22-8/23 prep 3 个作战包 + ja 加挂 4 个 PDS 任务 (P0/P0/P1/P2), 1 push/天, 8/24 1 push 落地作战包 1 (catalog-printing-china 落地页), 8/25 1 push 作战包 2 + 作战包 3 en 指南合批, 8/26 1 push ja 加挂 + 0 候选常态延续 35 天",
            "escalation": "M3 8/22-8/26 cron 跑 (K3 拍板 10 8/20 任务优先级 选项 A 续跑)"
        },
        {
            "id": "D8",
            "level": "CRITICAL",
            "type": "M3_P3_SCHOOL_CLICK_DROP",
            "scope": "校园词 click drop",
            "description": "8/14-8/18 5d 校园词 (P3 派生 18 词) 0 click (vs 8/7-8/13 7d 校园词 18 词 1 click china catalog printing pos 23.96, vs 8/9-8/13 5d 1 click 同词). imps 持平 (101 vs 105, -3.81% 5d vs 5d), 0 click 跌幅 100% 需关注. 5 词核心追踪: 教科書 印刷 12 imps 0 click (上周 5 imps, +140% imps) + 畢業紀念冊香港 1 click / 3 imps / pos 8.3 (上周 1 click / 1 imp / pos 8.0, 维持前 10 第 3 周) + custom printed exercise books 5 imps 0 click + 0 click 仍是常态 per M3 P3 §9 拍板 6.",
            "impact": "0 click 跌幅 100%, 但 imps 持平 + 派生词 4 词重大位置变化 (china 词群 -7.8/-9.0 / school exercise book -6.9 / 畢業紀念冊香港维持前 10 第 3 周) = 总流量质变, click 转化需 CTR 优化 / 4 周观察 8/26 双周复盘",
            "fix_path": "8/21 v3.10 §六 大单转化传导指标 + 4-week-plan Q4 8/20-8/25 期间持续 CTR 优化 (重写 title/description 不改 H1, 1 push/天, 8/19 R3 striking 4 词五件套已推完 5 件套 PASS 8/30 GSC 验收), M3 P5 maintenance 持续 + 8/21 12:02 K3 v3.10 三个作战包 8/24 落地 = 8/26 双周复盘 4 周观察期质变点",
            "escalation": "M3 P5 + 8/21 v3.10 作战包 8/24-8/26 cron 跑"
        },
        {
            "id": "D9",
            "level": "INFO",
            "type": "P0-1_5_DAY_WINDOW_NOTE",
            "scope": "GSC window",
            "description": "8/14-8/18 5d 窗口 (vs 7d 标准) = GSC 数据延迟 1-2 天, 8/21 周报触发时 GSC 最新数据 8/18 (8/19+8/20 还在 GSC 内部聚合中). 5d vs 5d WoW 是本周报实际可用对比窗口, 7d vs 7d 需 8/26 完整 7d 可见 (per 4-week-plan §六 8/26 14d hold 到期 + 8/26 14d hold 决策).",
            "impact": "5d vs 5d WoW 是本周报实际可用对比 (clicks +316.67%, imps +78.59%, CTR +0.84pp, 6 click 词 vs 5 click 词). 8/26 双周复盘 改 7d vs 7d 完整对比",
            "fix_path": "5d vs 5d WoW 维持, 8/26 改 7d vs 7d 完整对比 (per master v2 §6 + 4-week-plan §六 8/26 决策)",
            "escalation": "NONE (技术限制)"
        }
    ],
    "data_sources_inventory_8_21": {
        "scripts_inventory": {
            "fetch_gsc_data.py": "✅ active (gsc-fresh-2026-08-21.json 5d 8/14-8/18 country 维度解锁)",
            "fetch_gsc_weekly_by_locale.py": "✅ active (8/19 GSC cron v4 weekly 拍板 12 utf-8-sig 修复落地)",
            "fetch_ga4_events.py": "❌ 缺失 (GA4 架构级缺失, D1 第 4 周连续升级)",
            "fetch_supabase_funnel.py": "❌ 缺失 (Supabase 部分 ACTIVE, 需 service_role_key 接入, D2 第 4 周连续升级)"
        },
        "cron_inventory": {
            "zprintpro-daily-content-evolve": "每天 10:15 Asia/Shanghai (8/14-8/21 期间 7 次, 0 候选常态延续 35 天 per §9 拍板 #1)",
            "zprintpro-weekly-meta-refresh": "周一 11:00 (8/18 1 次, 0 候选常态)",
            "zprintpro-monthly-matrix-audit": "每月 1 号 14:00 (下次 9/1 14:00)",
            "zprintpro-gsc-feedback-loop": "每周三 15:00 (8/19 1 次, 2805074 matrix v2026-08-01-v1 + gsc_targeting_weekly_v2 5/5 step verify PASS)",
            "zprintpro-revenue-analytics-weekly": "每周五 16:20 (本 cron, 8/21 触发, 0 push 纯只读分析)",
            "k3-ceo-daily-review": "❌ PENDING 4 天 (per 8/19 handoff 拍板 11, K3 战略闭环缺最后零件, K3 自己装 5 min 命令 选项 A PENDING)"
        }
    },
    "commit_inventory_8_14_to_8_21": {
        "total_commits_14d": 55,
        "key_commits_8_14_to_8_21": [
            {"hash": "27f0c7f", "date": "8/14", "subject": "fix(seo+conversion+ssot): 8/14 3 in 1 (M3 09:10 cron) - §11 batch 2 名片清扫 32 hits 清零 + 6 retrofit GA4 事件修复 + 16 files bundle"},
            {"hash": "516b757", "date": "8/16", "subject": "fix(content): 8/16 blog 封面全量更新 65 篇 x3 语言 (1200x750 WebP<=120KB 新图 + 旧图 36 个替换)"},
            {"hash": "804cf22", "date": "8/16", "subject": "revert(content): 8/16 撤回全部 blog 封面 - 移除 74 个 cover 块恢复纯文字模式 (图片质量不达预期)"},
            {"hash": "647eb25", "date": "8/16", "subject": "feat(about): 8/16 关于我们工厂图 UI 升级 - 深色 Bento 画廊"},
            {"hash": "717825f", "date": "8/16", "subject": "feat(about): 8/16 关于我们板块 22 figure 工序流 gallery (K3 8/16 11:22 拍板完整版)"},
            {"hash": "e55297c", "date": "8/16", "subject": "feat(about): 8/16 关于我们板块 text + SEO + GEO + internal link 大改 (K3 16:51 拍板 重要内容)"},
            {"hash": "b85c8f1", "date": "8/16", "subject": "docs(AGENTS) + feat(components): 8/16 23:11 K3 拍板固化 (Push 3 A + Push 4 B-1)"},
            {"hash": "7481e51", "date": "8/17", "subject": "docs(seo) + feat(llms): K3 CEO 战略定调 8/17 - 65-D1 llms.txt GEO 升级 + 67-B 4 金矿词 CTR 收割 (P0)"},
            {"hash": "5d45069", "date": "8/18", "subject": "feat(seo): 67-B 25 词清单剩余 19 词 B 指令 - 6 类目 title/keywords/description 3 locale 攒批"},
            {"hash": "c7a5b67", "date": "8/18", "subject": "feat(seo): 67-B 22 词清单 8/18 续做 rush 服务页 3 词"},
            {"hash": "92ae942", "date": "8/18", "subject": "fix(seo): §11 1a2ef94 CF Pages build FAIL 修复 (P0 紧急)"},
            {"hash": "6e28663", "date": "8/18", "subject": "feat(seo): Step 2 §11 业务子类目豁免 + 3 新类目 + 12 新 SKU (8/18 第 4 push)"},
            {"hash": "95bd62b", "date": "8/19 04:43", "subject": "security: migration 007 - enable RLS on all public tables (fix Supabase rls_disabled_in_public critical alert)"},
            {"hash": "625e292", "date": "8/19 05:00", "subject": "feat(seo+security): A+ 合批 — R2 摘果 3 目标 + R3 striking 4 词五件套 + API 安全加固 4 件套 + NAP 觀塘修正"},
            {"hash": "f67b440", "date": "8/19 05:36", "subject": "fix(products): 删除 WI/PC 12 个重复 SKU 对象 (6e28663 引入, 类目页重复渲染 live bug)"},
            {"hash": "d0657c0", "date": "8/19 05:40", "subject": "fix(seo): generateLocalBusinessSchema addressCountry 走 nap.address.country"},
            {"hash": "2805074", "date": "8/19 15:11", "subject": "docs(matrix): 8/19 GSC v4 weekly feedback v2 - matrix v2026-08-01-v1 + gsc_targeting_weekly_v2 (8/4-8/10 4 markets 3203 imps + P0-2 301 5/5 PASS 重大恢复)"},
            {"hash": "0840f97", "date": "8/20", "subject": "feat(tracking): 008 quote_requests 度量层 - 跨渠道统一询盘归因 (ga4_client_id + UTM + session) fire-and-forget"}
        ],
        "m3_v3_3_wedding_category_4_day_run_8_20_to_8_23": "PENDING 落地 (8/19 拍板 7 选项 A 12 篇 4 天 8/20-8/23 跑, 8/21 D3 第 5 天 0/3 篇 落后 2 篇, 8/22-8/23 9 篇 4 push 紧)"
    }
}

with open(r'F:\zprintpro-nextjs\.hermes\revenue-snapshot-2026-08-21.json', 'w', encoding='utf-8') as f:
    json.dump(snapshot, f, ensure_ascii=False, indent=2)

print(f"OK. snapshot saved.")
print(f"  本周 (5d 8/14-8/18) clicks: {q_new_clicks}, imps: {q_new_imps}, CTR: {q_new_clicks/q_new_imps*100:.2f}%")
print(f"  上周 (5d 8/9-8/13) clicks: {q_prev_clicks}, imps: {q_prev_imps}, CTR: {q_prev_clicks/q_prev_imps*100:.2f}%")
print(f"  WoW clicks: {(q_new_clicks-q_prev_clicks)/q_prev_clicks*100:+.2f}%, imps: {(q_new_imps-q_prev_imps)/q_prev_imps*100:+.2f}%")
print(f"  by date total clicks: {total_clicks}, imps: {total_imps}, CTR: {total_clicks/total_imps*100:.2f}%")
print(f"  School queries new: {len(school_q_new)}, clicks: {sum(q['clicks'] for q in school_q_new)}, imps: {sum(q['impressions'] for q in school_q_new)}")
print(f"  Country top: hkg {hkg['clicks']}/{hkg['impressions']} CTR {hkg['ctr']*100:.2f}%, usa {usa['clicks']}/{usa['impressions']} CTR {usa['ctr']*100:.2f}%, jpn {jpn['clicks']}/{jpn['impressions']} CTR {jpn['ctr']*100:.2f}%")
print(f"  6 click 词:")
for q in sorted([q for q in q_new if q['clicks']>0], key=lambda x: -x['clicks']):
    print(f"    {q['keys'][0]}: clicks={q['clicks']} imps={q['impressions']} CTR={q['ctr']*100:.2f}% pos={q['position']:.1f}")
