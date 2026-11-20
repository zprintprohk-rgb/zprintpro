# -*- coding: utf-8 -*-
import subprocess
cands = [
 'Roll Labels | 4cm Cores | 10 MOQ $0.03 | ZprintPro',
 'Roll Labels | Applicator-Ready | 10 MOQ $0.03 | ZprintPro',
 'Roll Labels | 4cm Core Applicator Ready | 10 MOQ $0.03 | ZprintPro',
 'ロールラベル | 巻芯4cm 食品対応 | 10枚〜¥4〜 | ZprintPro',
 'ロールラベル | 巻芯4cm ラベラー用 | 10枚〜¥4〜 | ZprintPro',
]
for c in cands:
    r = subprocess.run(['node', '-e', '''
const m = require('./scripts/guards/title-equiv.js');
const fn = m.equiv || m.default || m;
console.log(fn(process.argv[1]));
''', c], capture_output=True, text=True, encoding='utf-8')
    print('equiv=%s | %s' % (r.stdout.strip(), c))
