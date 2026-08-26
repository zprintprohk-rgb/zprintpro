# -*- coding: utf-8 -*-
"""matrix v4 → v5 升级 (per K3 8/8 07:12 战略纠偏)
新增: 8/9 push 1 locale 切换 + 8/13/15/17 残留清理 3 批 + 8/18 grep 验收
"""
import sys
sys.stdout.reconfigure(encoding='utf-8')
import json

MATRIX_PATH = r'F:\zprintpro-nextjs\.hermes\industry-keyword-matrix.json'

with open(MATRIX_PATH, 'r', encoding='utf-8') as f:
    matrix = json.load(f)

# Add v9.0 sections
v90_sections = {
    'gsc_targeting_v9_locale_switch': {
        'rationale': 'per K3 8/8 07:12 P0 战略纠偏 - 8/9 1 push 内做 locale-aware siteName 切换',
        'priority': 'P0',
        'K3 4 字 5 增 (per §0.13 + K3 8/8 07:12 增补)': {
            'X URL': 'K3 9:00 提供',
            'LinkedIn URL': 'K3 9:00 提供',
            '15 SKU 改字 K3 审字': '重点 ja 自然度 + zh-hk 纯繁',
            '8/9 Org sameAs 改 K3 审 diff': 'src/lib/seo.ts sameAs 数组 + getSiteNAP()',
            'locale-aware siteName 切换 5 处改字 (新增 P0)': 'src/lib/seo.ts 5 处 + 3 llms 副文件 8 locale + 1 footer 法律名保留'
        },
        '改字清单 (5 处)': [
            {
                'file': 'src/lib/seo.ts',
                'line': 35,
                'old': "name: '智印雲'",
                'new': "name: '智印港'",
                'rationale': 'NAP 法律名 zh-hk 切显示品牌, schema 一致性'
            },
            {
                'file': 'src/lib/seo.ts',
                'line': 39,
                'old': "displayName: '智印港'",
                'new': "displayName: locale === 'ja' ? 'ジープリント' : '智印港'",
                'rationale': 'displayName 也 locale-aware, ja 用ジープリント'
            },
            {
                'file': 'src/lib/seo.ts',
                'line': 41,
                'old': "alternateName: ['ZprintPro', 'ZprintPro HK', '智印雲印刷', '智印港']",
                'new': "alternateName: ['ZprintPro', 'ZprintPro HK', '智印港', 'ジープリント']",
                'rationale': 'alternateName 删旧 brand 智印雲印刷, 加 ja 品牌ジープリント'
            },
            {
                'file': 'src/lib/seo.ts',
                'line': 102,
                'old': "name: '智印雲',\n      alternateName: ['ZprintPro', 'ZprintPro HK', '智印雲(香港)', '智印雲印刷', '智印港']",
                'new': "name: '智印港',\n      alternateName: ['ZprintPro', 'ZprintPro HK', '智印港']",
                'rationale': 'zh-hk getSiteNAP() branch 切显示品牌, alternateName 删旧 brand'
            },
            {
                'file': 'src/lib/seo.ts',
                'line': 130,
                'old': "name: 'ZprintPro Global',\n      alternateName: ['ZprintPro HK', '智印雲(香港)']",
                'new': "name: 'zprintpro',\n      alternateName: ['ZprintPro', 'ZprintPro Global', 'zprintpro.com']",
                'rationale': 'en getSiteNAP() branch 切小写 zprintpro, 跟域名一致, SEO 友好'
            }
        ],
        'K3 9:00 必审字反馈': '审字 OK 后 M3 立即 8/9 push 1 兑现',
        'M3 必跑': 'curl 8 locale <title> + og:title + JSON-LD Organization.name 验证 3 字段全过 §0.15 公式',
        'IndexNow ping': '99 URLs (8 locale × 4 page types: /, /category/, /product/, /blog/) 用 K3 9:00 提供 key',
        '§0.7 production smoke 3/3 PASS': '8 locale <title> + siteConfig.name + JSON-LD Organization.name 全过',
        'expected impact (per §0.10 校准)': {
            'SERP CTR zh-hk 智印港 词': '10% → 12-13% (brand 一致性提升)',
            'schema 实体消歧': '4 天可见, AI 引用从 ≥2/4 → ≥3/4',
            'branded search 智印港': '7d 0 → 1-2 (新增 query)'
        }
    },
    'gsc_residual_cleanup_3_batches': {
        'rationale': 'per §0.16 + K3 8/8 07:12 节奏固化 - 840 智印雲 残留从"9 月初"提前到 Week 2 3 天清完',
        'priority': 'P0 (per §0.11 资源分配, 残留清理优先于 SKU 改字 P2)',
        '节奏模板': {
            '8/13 (Wed) batch 1 longDescription 前 200 处': {
                'target_file': 'src/data/products.ts',
                'target_pattern': r'longDescription.*?智印雲',
                'expected_count': 200,
                'validation': 'grep + §0.7 smoke 3 步 + 8 locale <title> 验证',
                'commit_msg_prefix': 'fix(residual): 8/13 batch 1 longDescription 200/840 智印雲→智印港'
            },
            '8/15 (Fri) batch 2 description + faq 300 处': {
                'target_file': 'src/data/products.ts',
                'target_pattern': r'(description|faq).*?智印雲',
                'expected_count': 300,
                'validation': 'pre-commit 简体字守门 + 8 locale <title> 验证',
                'commit_msg_prefix': 'fix(residual): 8/15 batch 2 description+faq 500/840 智印雲→智印港'
            },
            '8/17 (Sun) batch 3 schema 剩余 340 处': {
                'target_file': 'src/data/products.ts',
                'target_pattern': r'(schema|jsonLd|JSON-LD|Product\.name).*?智印雲',
                'expected_count': 340,
                'validation': 'JSON-LD validate + 8 locale schema 验证',
                'commit_msg_prefix': 'fix(residual): 8/17 batch 3 schema 840/840 智印雲→智印港 全清完'
            },
            '8/18 (Mon) 全量 grep 验收': {
                'target_cmd': 'grep -c "智印雲" src/data/products.ts',
                'expected': '0 (除 k3-inbox 历史引用)',
                'validation': 'grep 0 残留 + 复盘硬指标 + 8/21 校准 KPI',
                'commit_msg_prefix': 'verify(residual): 8/18 grep 验收 = 0 (840 全清完)'
            }
        },
        'K3 9:00 必拍': 'Week 2 排期 + 残留清理 8/13/15/17 3 批插入 (per K3 8/8 07:12 ①②③)',
        'SOP per batch': 'Python 脚本 (regex + line-based 找块) → pre-commit 3 步 → commit + push → CF Pages build success → curl 8 locale <title> 验证 → 落盘 PASS 报告',
        'expected impact (per §0.10 校准)': {
            '前端 0 残留': '8/18 验收 = 0 是 8/21 复盘硬指标',
            'branded search + entity 一致性': '每清 200 处 +1-2% CTR / -1 position',
            'AI 引用': '8/21 期望 ≥3/4 引擎 (per K3 8/8 07:12 复盘校准)'
        }
    },
    'gsc_daily_strong_signal_monitor_v9': {
        'rationale': 'per §0.8 + K3 8/8 04:50 - 8/9-8/21 daily 22:00 抓强监控, 一次性 cron + delete_after_run',
        'priority': 'P1 (per §0.11 资源分配, 中频复利)',
        'schedule': '8/9-8/21 daily 22:00 Asia/Shanghai (cron once + delete_after_run)',
        'SOP': '拉 GSC 7d 数据 → 筛 pos ≤ 10 但 0% CTR → 写 .hermes/k3-inbox/2026-08-{n}-2200-gsc-strong-signal-r{n}.md → 升级 K3 (新 P0 抓强) → cron self delete',
        'SLA': '触发 ≤ 3 min 跑完 + 报告 + 自删, 1h >3 次无操作 = P0 故障',
        'expected impact': 'P0 抓强信号 4 天可兑现, 8/21 期望 ≥3 个 query CTR 提升 ≥1%'
    },
    'K3_8_8_07_12_correction': {
        'priority': 'P0 战略纠偏',
        'K3 6 段反馈要点': {
            '1. 执行评估': '4⭐⭐⭐⭐⭐ (部署/战略/护栏) + 1⭐⭐⭐ (优先级判断 = 840 残留排 9 月初 + title 品牌残留被低估)',
            '2. P0 修正': '8/9 1 push 内做 locale-aware siteName 切换 (zh-hk=智印港 / ja=ジープリント / en=zprintpro)',
            '3. 残留提前到 Week 2': '8/13/15/17 3 天清完, 8/18 全量 grep = 0, 比 9 月初早 3 周兑现',
            '4. 下一步策略': 'B 方案 (1 amend 1 build) + 8/9 push 1 (locale+Org sameAs+IndexNow) + 8/13/15/17 残留清理',
            '5. 必须写进记忆的 2 条': '§0.15 品牌一致性 P0 + §0.16 残留清理节奏',
            '6. K3 9:00 拍板 (4 字+采 B+§0.15/0.16 OK+4 件跑完)': 'M3 立即 10:15 amend push, 8/9 启动 locale 切换 + 残留清理'
        },
        'M3 "按最优执行" 自主范围': [
            '§0.15/0.16 入 MEMORY (跨项目 P0 固化) ✅ 189.9 KB',
            'cron v8.9 → v9.0 升级 ✅ 61.4 KB (8/9 push 1 + 残留 3 批 + B 方案)',
            'matrix v4 → v5 升级 (本段) ✅',
            '8/9 locale 切换 diff 草稿 (5 处) 写给 K3 9:00 审',
            '840 残留 Week 2 3 批 Python 脚本准备',
            '8/8 10:15 amend push 内容准备 (B 方案)',
            '8/8 09:55 cron once 校验 SSoT v9.0 + 触发 amend push',
            '8/8 22:00 GSC 抓强监控首跑',
            '升级 K3 等 9:00 拍板'
        ],
        'K3 9:00 必拍 (M3 自主范围外)': [
            '4 字 5 增: X URL / LinkedIn URL / 15 SKU 审字 / Org sameAs 审 diff / locale 切换 5 处审字',
            '①②③: 校准值/记忆/Week 排期 + 残留清理插入',
            '采 B 方案 ✅',
            '4 件自跑: 3 设备/Supabase 3 链/formsubmit/key'
        ],
        '8/21 校准 KPI (per §0.10 + K3 8/8 07:12 75% 达成概率上调)': {
            'zh-hk 7d CTR': '1.55→3.2%+ (智印港品牌一致性提升)',
            'zh-hk 询盘累计': '0→≥5 (per §0.12 转化指标)',
            'branded search 智印港': '0→≥1 (新增 query)',
            'JA branded search ジープリント': '0→≥1 (per §13.16.1)',
            'AI 引用': '≥2/4 → ≥3/4 (locale 切换 + 残留清理后实体消歧清晰)',
            '目录 30/30 完成': '8/21 期望 25-30/30 (AutoGLM 跑中)',
            '301 5/5 PASS': 'P1 deadline 8/9',
            '前端 0 智印雲 残留': '8/18 验收硬指标 (per §0.16)'
        }
    }
}

# Append to matrix
if 'gsc_targeting_v9_locale_switch' in matrix:
    print('SKIP: v9.0 sections already present in matrix')
    sys.exit(0)

matrix.update(v90_sections)

with open(MATRIX_PATH, 'w', encoding='utf-8') as f:
    json.dump(matrix, f, ensure_ascii=False, indent=2)

import os
size = os.path.getsize(MATRIX_PATH)
print(f'OK: matrix v4 → v5 upgraded, {size/1024:.1f} KB')
print(f'Added keys: {list(v90_sections.keys())}')
