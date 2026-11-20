# -*- coding: utf-8 -*-
"""队列回写: stickers-zh-hk -> remeasure + 交付/学习记录; 同步 重要文件 副本"""
import json, io, sys, shutil
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

SRC = '.hermes/cron-prompts/blog-money-keyword-queue.json'
d = json.load(open(SRC, encoding='utf-8'))
item = d['items'][1]
assert item['cluster'] == 'stickers-zh-hk', 'unexpected item'

item['status'] = 'remeasure'
item['last_delivered'] = '2026-10-31'
item['delivered_url'] = '/zh-hk/blog/sticker-guide/'
item['delivery_note'] = ('review_or_rewrite 完成：既有 sticker-guide 已覆盖材质/工艺/流程/FAQ 采购决策，'
                         '按「review_then_rewrite_only_if_new_decision_value_exists」未新写泛文；'
                         '本轮做结构维护（段2 快速答案块 2→4、段7 LinkedIn+EU REACH 措辞、段8 15 原子、段11 内链 8→11、excerpt/schemas 补）'
                         '＋商业真值口径修正（交期 3-5→5-7 per 防水貼紙 SKU description；螢光貼紙 SKU 不存在→卷裝貼紙；工藝 % 加成为无源→定性）。')
item['recheck_after'] = '2026-11-07'
item['measurement_history'] = [{
    'date': '2026-10-31',
    'window': '2026-09-30..2026-10-27',
    'baseline': item.get('baseline'),
    'action': 'review_or_rewrite_delivered (structure maintenance + commercial truth reconciliation)',
    'judgement': '交付前基线；7 天（2026-11-07）复测 貼紙印刷／貼紙訂製 展示与排名',
}]
item['learning'] = {
    'last_failure_mode': 'conflicting_commercial_truth',
    'next_run_constraints': [
        '交期/价格/MOQ 必须逐项对照 products.ts SKU 的 description/title/minQuantity；原文 3-5 天与 SKU 5-7 天冲突时以 SKU 为准',
        '不存在 SKU 的产品类型（如螢光貼紙）不得出现在价格表；改为真实存在的 SKU（卷裝貼紙）',
        '无 finishings 参数的加成百分比视为无源数字，只可定性（轻/中/高）或引用真实 SKU 牌价对比',
    ],
}
d['updated_at'] = '2026-10-31'
out = json.dumps(d, ensure_ascii=False, indent=2) + '\n'
open(SRC, 'w', encoding='utf-8', newline='\n').write(out)
shutil.copyfile(SRC, '重要文件/blog-money-keyword-queue.json')
print('queue updated: stickers-zh-hk status=remeasure last_delivered=2026-10-31 recheck=2026-11-07')
