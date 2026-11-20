# -*- coding: utf-8 -*-
# 候选标题当量计算: 调 scripts/guards/title-equiv.js
import io, json, subprocess, tempfile, os

cands = {
 'en': [
  'Roll Labels | Custom Roll Stickers for Label Applicators | 10 MOQ $0.03 | ZprintPro',
  'Roll Labels | Custom Roll Stickers for Bottles & Food Labeling | 10 MOQ $0.03 | ZprintPro',
  'Roll Labels | Custom Roll Stickers for Bottle Labeling Machines | 10 MOQ $0.03 | ZprintPro',
  'Custom Roll Labels | 4cm Core for Label Applicators | 10 MOQ $0.03 | ZprintPro',
  'Custom Roll Labels for Label Applicators | Food & Bottle Labels | 10 MOQ $0.03 | ZprintPro',
 ],
 'ja': [
  'ロールラベル | 巻芯4cm ラベラー対応 | 10枚〜¥4〜 | ZprintPro',
  'ロールラベル | 巻芯4cm ラベラー対応 | 10枚〜¥4 | ZprintPro',
  'ロールラベル | 巻芯4cm 食品ラベル | 10枚〜¥4〜 | ZprintPro',
  'ロールラベル 印刷 | 巻芯4cm ラベラー対応 | 10枚〜¥4〜 | ZprintPro',
  'ロールラベル | 巻芯4cm・1巻1,000枚 | 10枚〜¥4〜 | ZprintPro',
  'ロールラベル | 巻芯4cm ラベラー対応 | 10枚から¥4 | ZprintPro',
 ],
}
js = r'''
const { equiv } = require('./scripts/guards/title-equiv.js');
const cands = JSON.parse(process.argv[1] ? '{}' : '{}');
'''
# 直接 node -e 调用
for loc, lst in cands.items():
    for c in lst:
        r = subprocess.run(['node', '-e', '''
const m = require('./scripts/guards/title-equiv.js');
const t = process.argv[1];
const fn = m.equiv || m.default || m;
console.log(typeof fn === 'function' ? fn(t) : (m.calc ? m.calc(t) : JSON.stringify(Object.keys(m))));
''', c], capture_output=True, text=True, encoding='utf-8')
        out = r.stdout.strip() or r.stderr.strip()[:80]
        print('%s equiv=%s | %s' % (loc, out, c))
