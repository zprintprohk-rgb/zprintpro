# -*- coding: utf-8 -*-
"""队列 audit_note: 追加测量底座审计 v2 引用 (不改任何 status)"""
import json, io, sys, shutil
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

SRC = '.hermes/cron-prompts/blog-money-keyword-queue.json'
d = json.load(open(SRC, encoding='utf-8'))
notes = d.setdefault('audit_notes', [])
notes.append({
    'date': '2026-11-01',
    'finding': ('测量底座审计 v2（NO_OP 轮，未改内容）：28d 全国家 21,127 imps，市场占比 zh-hk 57.9% / en-us 13.0% / ja 10.9% / apac 5.3% / en-other 2.9%；'
                '12 条 query×page 承接浓度：zh-hk 带钱词（貼紙印刷 33.9% split、書刊印刷 45.5% split、海報印刷 37% split）呈分散，'
                'packaging/catalog/comiket 单 URL 集中（70-96%）；small batch sticker printing pos 5.5 单 URL 100% 承接 0 点击 = 纯 CTR 缺口非内容缺口。'
                '建议：zh-hk 下一杠杆为承接页 title/meta + 内链收口；en sticker 做 snippet 测试；country×query 仍不可联接（xlsx 独立 sheet）。'),
    'source': '.hermes/logs/money-keyword-measurement-audit-2026-11-01.json + GSC 28d 2026-10-30 档 + 队列 query_page_evidence',
})
d['updated_at'] = '2026-11-01T03:45:00+08:00'
out = json.dumps(d, ensure_ascii=False, indent=2) + '\n'
open(SRC, 'w', encoding='utf-8', newline='\n').write(out)
shutil.copyfile(SRC, '重要文件/blog-money-keyword-queue.json')
print('audit_note appended; statuses unchanged')
