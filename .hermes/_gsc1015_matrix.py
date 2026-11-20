# -*- coding: utf-8 -*-
"""Word matrix: strategy baselines (10-13) vs today's fresh GSC exports (10-15).
Drops on money/big words are alarms (hard constraint); improvements feed the flywheel report."""
import json, io

D = json.load(io.open(r"F:\zprintpro-nextjs\.hermes\_gsc1015_queries.json", encoding="utf-8"))

def lookup(site, needle, data_key):
    hits = []
    for q in D[data_key]['queries']:
        if needle.lower() in q['q'].lower():
            hits.append(q)
    return hits

def fmt(hits):
    if not hits:
        return None
    imps = sum(h['imps'] for h in hits)
    clicks = sum(h['clicks'] for h in hits)
    poss = [h['pos'] for h in hits if h['pos']]
    pos = round(sum(poss) / len(poss), 1) if poss else None
    top = sorted(hits, key=lambda h: -(h['imps']))[0]
    return {'imps': int(imps), 'clicks': int(clicks), 'pos': pos,
            'ctr': round(clicks / imps * 100, 1) if imps else 0.0, 'top_q': top['q']}

# (site_key, layer, label, [query needles], baseline_28d "imps/pos", baseline_24h_pos or None)
MATRIX = [
 ('hk', '带钱', '紙袋印刷', ['紙袋印刷'], '77 / 8.3', None),
 ('hk', '带钱', '印刷紙袋', ['印刷紙袋'], '72 / 8.2', None),
 ('hk', '带钱', '食品包裝印刷', ['食品包裝印刷'], '117 / 9.7', '6.6'),
 ('hk', '带钱', '餐牌印刷', ['餐牌印刷'], '58 / 9.8', None),
 ('hk', '带钱', '燙金利是封', ['燙金利是封'], '—', '1.0'),
 ('hk', '带钱', '利是封訂製/訂做利是封', ['利是封訂製', '訂做利是封'], '19-30', '23.0-38.4'),
 ('hk', '大词', '海報印刷', ['海報印刷'], '180 / 16.1', '8.9'),
 ('hk', '大词', '貼紙印刷', ['貼紙印刷'], '156 / 26.5', None),
 ('hk', '大词', '月曆印刷', ['月曆印刷'], '118 / 16.4', None),
 ('hk', '大词', '宣傳單張', ['宣傳單張'], '105+101 / 23.9-30.2', None),
 ('hk', '大词', '包裝盒', ['包裝盒'], '68 imps (8/11)', None),
 ('hk', '习惯', '印海報', ['印海報'], '127 / 15.1', '7.0'),
 ('hk', '习惯', '禮物紙袋邊度買', ['紙袋邊度買'], '—', '4.0'),
 ('hk', '习惯', '訂做紙袋', ['訂做紙袋'], '—', '38.4'),
 ('en', '带钱', 'saddle stitch booklet printing', ['saddle stitch'], '104 / 4.2', None),
 ('en', '带钱', 'small batch sticker printing', ['small batch sticker'], '64+35 / 5.6-5.8', '2.5'),
 ('en', '带钱', 'doujinshi printing', ['doujinshi printing'], '38 / 11.2', None),
 ('en', '带钱', 'china catalog printing', ['catalog printing'], '53+24 / 17.7-26.7', None),
 ('en', '大词', 'a2 poster', ['a2 poster'], '29 / 30.6', '3.4'),
 ('en', '习惯', 'calendar sizes', ['calendar size'], '23+22 / 38-44', None),
 ('en', '品牌', 'zprint / z print', ['zprint', 'z print'], '25+20 / 6.4-7.6', '1.0'),
 ('jp', '带钱', 'コミケ 印刷', ['コミケ'], '175 / 20.8', None),
 ('jp', '带钱', '特急印刷 激安', ['特急印刷'], '13 / 16.1', None),
 ('jp', '大词', 'クラフト紙 パッケージ印刷', ['クラフト紙'], '55+50 / 24', None),
 ('jp', '大词', '両面カラー印刷 / pvc シール', ['両面カラー', 'pvc シール', 'ｐｖｃ'], '28+19 / 21.9-35.4', None),
 ('jp', '季节', '年賀状', ['年賀状'], '0 展示', None),
 ('jp', '季节', '卒業アルバム 印刷', ['卒業アルバム'], '13 / 66.1', None),
 ('jp', '习惯', '教科書 印刷 / 教材 印刷', ['教科書', '教材'], '18+12 / 20.4-34.6', None),
]

print("%-4s %-4s %-26s | 28d: imps/clk/pos/ctr%% | 24h: imps/clk/pos | vs 基线" % ("site", "层", "词"))
print("-" * 130)
for site, layer, label, needles, bl28, bl24 in MATRIX:
    ds = {'en': 'us'}.get(site, site)
    a = fmt(sum([lookup(ds, n, ds + '28') for n in needles], [])) or {'imps': 0, 'clicks': 0, 'pos': None, 'ctr': 0.0}
    b = fmt(sum([lookup(ds, n, ds + '24') for n in needles], [])) or {'imps': 0, 'clicks': 0, 'pos': None}
    a_s = "%d/%d/%s/%s" % (a['imps'], a['clicks'], a['pos'], a['ctr'])
    b_s = "%d/%d/%s" % (b['imps'], b['clicks'], b['pos'])
    print("%-4s %-4s %-26s | %-24s | %-14s | 28d基线 %s | 24h基线 %s" % (site, layer, label, a_s, b_s, bl28, bl24))

print("\n=== 24h site totals & top movers ===")
for site in ('hk', 'jp', 'us'):
    qs = D[site + '24']['queries']
    ti = sum(q['imps'] for q in qs); tc = sum(q['clicks'] for q in qs)
    print("%s 24h: queries=%d imps=%d clicks=%d" % (site, len(qs), int(ti), int(tc)))
    for q in sorted(qs, key=lambda x: -x['imps'])[:8]:
        print("   %-38s imps=%-5d clk=%-3d pos=%s" % (q['q'][:38], int(q['imps']), int(q['clicks']), q['pos']))
