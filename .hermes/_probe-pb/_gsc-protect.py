# -*- coding: utf-8 -*-
"""GSC 命中词保护校验: 修复前 vs 修复后 关键短语出现次数 (段5 证据, 0 删)"""
import json, io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

PHRASES = {
    'en': ['roll-up banner', 'roll-up', '10 sets', 'HK$85-300', '5-7 working day', 'digital proof', '1 hour', 'waterproof vinyl', 'mesh', 'eyelets', 'pole pocket', 'trade show', 'exhibition'],
    'zh-hk': ['易拉架', '易拉寶', '10 套', 'HK$85-300', '5-7 個工作天', '打稿', '1 小時', '防水帆布', '網孔布', '打孔', '穿杆袋', '展會', '免費數碼打稿'],
    'ja': ['ロールアップバナー', '10 セット', 'HK$85', '5〜7 営業日', '校正', '1 時間以内', '防水ビニール', 'メッシュ', 'ハトメ', 'ポールポケット', '展示会', '無料デジタル校正'],
}

def content_at(commit, loc):
    """git show <commit>:src/data/blog-data/<loc>.json 的内容"""
    import subprocess
    out = subprocess.run(['git', 'show', '%s:src/data/blog-data/%s.json' % (commit, loc)],
                         capture_output=True, encoding='utf-8')
    d = json.loads(out.stdout)
    return d['roll-up-banner-printing-guide']['content']

for loc in ['en', 'zh-hk', 'ja']:
    before = content_at('e2ece10a^', loc)
    after = content_at('e2ece10a', loc)
    print('=== %s ===' % loc)
    all_ok = True
    for p in PHRASES[loc]:
        b = before.count(p)
        a = after.count(p)
        flag = 'OK' if a >= b else '!!DELETED'
        if a < b:
            all_ok = False
        print('  %-18s before=%d after=%d %s' % (p, b, a, flag))
    print('  => 保护判定: %s' % ('全部 ≥ 修复前 (0 删)' if all_ok else '存在删除, 需核查'))
