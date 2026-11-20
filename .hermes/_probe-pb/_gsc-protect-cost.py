# -*- coding: utf-8 -*-
"""GSC 命中词保护: 修复前(e2ece10a^) vs 修复后 关键短语计数 (0 删)"""
import json, io, re, sys, subprocess
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

SLUG = 'hong-kong-printing-cost-baseline-2026'
PHRASES = {
    'en': ['printing price', 'price baseline', 'HK$0.25', 'HK$3', 'MOQ', '100-piece', 'FSC', 'saddle stitch',
           'perfect bound', 'flyers', 'paper bag', 'wall calendar', '16 categories', 'quote', 'HKD'],
    'zh-hk': ['印刷價格', '價格基準', '起訂量', '裝訂', '騎馬釘', '膠裝', 'FSC', '單張', '牛皮紙袋', '月曆', 'HK$3',
              '利是封', '貼紙', '品類', '報價'],
    'ja': ['印刷価格', '価格ベースライン', '最小ロット', '製本', '中綴じ', '無線綴じ', 'FSC', 'チラシ', 'クラフト紙袋',
           'カレンダー', 'HK$3', '紅包', 'ステッカー', 'カテゴリ', '見積もり'],
}

def content_at(commit, loc):
    """commit 版本"""
    out = subprocess.run(['git', 'show', '%s:src/data/blog-data/%s.json' % (commit, loc)],
                         capture_output=True, encoding='utf-8')
    return json.loads(out.stdout)[SLUG]['content']

def content_worktree(loc):
    """工作树当前版本"""
    return json.load(open('src/data/blog-data/%s.json' % loc, encoding='utf-8'))[SLUG]['content']

all_ok = True
for loc, ps in PHRASES.items():
    before = content_at('e2ece10a^', loc)
    after = content_worktree(loc)
    print('=== %s ===' % loc)
    for p in ps:
        b, a = before.count(p), after.count(p)
        flag = 'OK' if a >= b else '!!DELETED'
        if a < b:
            all_ok = False
        print('  %-18s before=%d after=%d %s' % (p, b, a, flag))
print('保护判定: %s' % ('全部 >= 修复前 (0 删)' if all_ok else '存在删除, 需核查'))
