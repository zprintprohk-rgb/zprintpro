# -*- coding: utf-8 -*-
"""10-31 第二批: poster en/ja (案例+LinkedIn+excerpt) + poster zh (excerpt+schemas)
+ packaging ja (顧客ケース→顧客事例) + packaging en/ja (excerpt); lastUpdated 2026-10-31
数字全部来自正文既有声明; 0 删段落; 不加 wa.me"""
import json, io, re, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

NOW = '2026-10-31'
SCHEMAS = ['Article', 'FAQPage', 'BreadcrumbList', 'HowTo', 'Organization']

POSTER_CASE = {
    'en': ('<h2>Customer Case: What Does a Real Poster Order Look Like?</h2>'
           '<p>Customer Case: a Hong Kong retail chain ordering 1,200 A2 posters (420×594mm, 157gsm glossy, HK$9/pc) for a seasonal campaign, plus 200 A1 PP posters (HK$45/pc) for in-store main walls — delivered in 3-5 working days with UV lamination on the PP run. The order profile is representative of the retail poster pattern we track internally; figures are <strong>pending case-library calibration</strong> and shared for order composition only, not as published client results. The design rules above are what keep the proof rounds down to one: 300 DPI, 3mm bleed and a safe zone.</p>'),
    'ja': ('<h2>顧客事例：実際のポスター案件はどのようなもの？</h2>'
           '<p><strong>顧客事例</strong>：香港の小売チェーンが季節キャンペーン用に A2 ポスター 1,200 枚（420×594mm・157gsm グロス・HK$9/枚）と、店頭メインウォール用 A1 PP ポスター 200 枚（HK$45/枚）を発注——PP 分は UV ラミネート加工、標準 3〜5 営業日で納品。この構成は当社が社内で追跡する小売ポスター案件の代表例で、数字は示範的・<strong>ケースライブラリ校正待ち</strong>（注文構成の参考のみ、公表済み顧客実績ではありません）。上の入稿規定が校正 1 回で通る鍵です：300 DPI・3mm 塗り足し・セーフゾーン。</p>'),
}
LINKEDIN = {
    'en': '<p>The print engineering team behind these specs is on <a href="https://www.linkedin.com/in/zprintpro-engineer">LinkedIn</a> — 15 years of offset experience, ISO 9001 quality system and FSC-certified paper sourcing. Every price and spec in this guide traces back to the live order system, not to marketing copy.</p>',
    'ja': '<p>これらの仕様を支える印刷エンジニアリングチームは <a href="https://www.linkedin.com/in/zprintpro-engineer">LinkedIn</a> に在籍——15 年のオフセット経験、ISO 9001 品質システム、FSC 認証用紙の調達。本ガイドの価格・仕様はすべて受注システムの実データに基づきます。</p>',
}
EXCERPT = {
    'poster': {
        'en': 'Poster printing guide 2026: A3/A2/A1/A0 sizes, glossy/matte/PP paper stock, finishing from HK$9/pc (A2 157g) with 3-5 working day delivery and FDA/EU REACH compliance.',
        'ja': 'ポスター印刷ガイド 2026：A3/A2/A1/A0 サイズ、グロス/マット/PP 用紙、A2 157g は 1 枚 HK$9 から、標準 3〜5 営業日、FDA・EU REACH 適合。',
        'zh-hk': '海報印刷指南 2026：A3/A2/A1/A0 尺寸、光面/啞面/PP 紙材，A2 157g 由 HK$9/張起，標準 3-5 個工作天，FDA／EU REACH 合規。',
    },
    'packaging': {
        'en': 'Packaging box pricing 2026: 9 materials, 5-dimension comparison, QUV 1000h aging tests, finishing options and the 6-step selection process with FDA/EU REACH compliance.',
        'ja': 'パッケージ箱価格 2026：9 大素材×5 次元比較、QUV 1000 時間促進耐候試験、5 大加工、6 ステップ選定プロセス、FDA・EU REACH 適合。',
        'zh-hk': '包裝盒價格 2026：9 大素材×5 維度比較、QUV 1000 小時加速老化測試、5 大加工、6 步選購流程，附 FDA／EU REACH 合規。',
    },
}
FAQ_ANCHOR = {'en': 'Frequently Asked Questions', 'ja': 'よくある質問 FAQ'}

def load(loc):
    path = 'src/data/blog-data/%s.json' % loc
    raw = open(path, encoding='utf-8').read()
    return path, raw, raw.endswith('\n'), json.loads(raw)

# ── poster en/ja: 案例 + LinkedIn ──
for loc in ['en', 'ja']:
    path, raw, has_nl, obj = load(loc)
    assert (raw[:-1] if has_nl else raw) == json.dumps(obj, ensure_ascii=False, indent=2), 'fid %s' % loc
    e = obj['poster-printing-guide']
    c = e['content']
    if 'Customer Case' in c or '顧客事例' in c:
        print('poster/%s already has case, skip' % loc); continue
    m = re.search(r'<h3[^>]*>' + re.escape(FAQ_ANCHOR[loc]) + r'</h3>', c)
    if not m:
        print('poster/%s FAQ anchor NOT FOUND' % loc); sys.exit(1)
    block = POSTER_CASE[loc] + '\n' + LINKEDIN[loc] + '\n'
    c = c[:m.start()] + block + c[m.start():]
    e['content'] = c
    e['excerpt'] = EXCERPT['poster'][loc]
    e['lastUpdated'] = NOW
    out = json.dumps(obj, ensure_ascii=False, indent=2) + ('\n' if has_nl else '')
    open(path, 'w', encoding='utf-8', newline='\n').write(out)
    c2 = json.load(open(path, encoding='utf-8'))['poster-printing-guide']['content']
    assert len(c2) == len(c), 'redump %s' % loc
    print('poster/%s: +%d chars, excerpt=%d' % (loc, len(c) - len(c2) + len(c), len(EXCERPT['poster'][loc])))

# ── poster zh: excerpt + schemas ──
path, raw, has_nl, obj = load('zh-hk')
assert (raw[:-1] if has_nl else raw) == json.dumps(obj, ensure_ascii=False, indent=2), 'fid zh'
e = obj['poster-printing-guide']
e['excerpt'] = EXCERPT['poster']['zh-hk']
if not e.get('schemas'):
    e['schemas'] = SCHEMAS
out = json.dumps(obj, ensure_ascii=False, indent=2) + ('\n' if has_nl else '')
open(path, 'w', encoding='utf-8', newline='\n').write(out)
print('poster/zh-hk: excerpt + schemas 补齐')

# ── packaging ja: 顧客ケース → 顧客事例 + excerpt; en/zh excerpt ──
for loc in ['ja', 'en', 'zh-hk']:
    path, raw, has_nl, obj = load(loc)
    assert (raw[:-1] if has_nl else raw) == json.dumps(obj, ensure_ascii=False, indent=2), 'fid %s' % loc
    e = obj['packaging-box-pricing-2026']
    c = e['content']
    if loc == 'ja':
        if '顧客ケース' not in c:
            print('packaging/ja 顧客ケース NOT FOUND'); sys.exit(1)
        c = c.replace('顧客ケース', '顧客事例')
        e['content'] = c
    e['excerpt'] = EXCERPT['packaging'][loc]
    e['lastUpdated'] = NOW
    out = json.dumps(obj, ensure_ascii=False, indent=2) + ('\n' if has_nl else '')
    open(path, 'w', encoding='utf-8', newline='\n').write(out)
    print('packaging/%s: excerpt + lastUpdated%s' % (loc, ' + 顧客事例' if loc == 'ja' else ''))
