# -*- coding: utf-8 -*-
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), '.hermes'))
from _gsc_xlsx import read_xlsx

F = 'GSC数据/28天三站点汇总数据zprintpro.com-Performance-on-Search-2026-10-15.xlsx'
r = read_xlsx(F)
print('rows:', len(r))
print('header:', r[0])
for row in r[1:6]:
    print(' ', row)
# 列数分布
from collections import Counter
print('width dist:', Counter(len(x) for x in r).most_common(5))
