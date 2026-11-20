# -*- coding: utf-8 -*-
"""队列回写: flyers-zh-hk -> remeasure + 交付记录 + 复测 + 学习约束; 同步 重要文件 副本"""
import json, io, sys, shutil
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

SRC = '.hermes/cron-prompts/blog-money-keyword-queue.json'
COPIES = ['重要文件/blog-money-keyword-queue.json']

d = json.load(open(SRC, encoding='utf-8'))
item = d['items'][0]
assert item['cluster'] == 'flyers-zh-hk', 'unexpected first item'

item['status'] = 'remeasure'
item['last_delivered'] = '2026-10-31'
item['delivered_url'] = '/zh-hk/blog/flyer-printing-guide/'
item['delivery_note'] = ('队列原定新建 flyer-printing-buying-guide；审计发现既有 flyer-printing-guide 已覆盖采购指南意图'
                         '（zh-hk 原 6,870 字，H2 覆盖：宣傳單張幾錢/尺寸/紙質/單雙面/MOQ/交期/工藝/設計/FAQ），'
                         '按 selection_policy「Do not create an article when review_or_rewrite can close the evidence gap」改为复写修复，'
                         '未新建近义 slug。')
item['recheck_after'] = '2026-11-07'
item['measurement_history'] = [{
    'date': '2026-10-31',
    'window': '2026-09-30..2026-10-27',
    'baseline': item.get('baseline'),
    'action': 'review_or_rewrite_delivered (repair, no new article)',
    'judgement': '交付前基线；7 天（2026-11-07）复测 GSC 主词展示/排名/点击',
}]
item['learning'] = {
    'last_failure_mode': 'queue_evidence_gap_inaccurate',
    'next_run_constraints': [
        '队列 evidence_gap 标「No general guide was found」时，必须先查 src/data/blog-data/*.json 与 blog-posts.ts 是否存在已覆盖该意图的文章',
        'blog-posts.ts 存在但 blog-data 无正文的孤儿 slug（如 flyer-buying-guide）视为缺陷，需报告并等拍板后处理，不得擅自删条目',
    ],
}
# 附注: 孤儿 slug 审计发现（写入队列顶层 notes, 不改他人项）
d.setdefault('audit_notes', []).append({
    'date': '2026-10-31',
    'finding': 'blog-posts.ts 注册 flyer-buying-guide（三语 title 齐备）但 blog-data 三语均无正文，线上页面 HTTP 200 空内容（soft-404）；flyer-printing-guide 曾链向该空页，已改指向 a5-vs-a6-flyer-size。待 K3 裁决：删除条目或后续以独立角度补正文。',
    'source': 'GSC 28d 2026-10-30 档 + products.ts + 线上 curl',
})
d['updated_at'] = '2026-10-31'

out = json.dumps(d, ensure_ascii=False, indent=2) + '\n'
open(SRC, 'w', encoding='utf-8', newline='\n').write(out)
for c in COPIES:
    shutil.copyfile(SRC, c)
    print('synced ->', c)
print('queue updated: flyers-zh-hk status=%s last_delivered=%s recheck_after=%s' % (
    item['status'], item['last_delivered'], item['recheck_after']))
