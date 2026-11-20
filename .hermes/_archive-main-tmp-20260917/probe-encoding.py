#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import io
test = "en: 'Custom Calendars Free Shipping \u00b7 100 MOQ"
out = io.open(r'F:\zprintpro-nextjs\.hermes\probe-test.txt', 'w', encoding='utf-8')
out.write(f'test bytes: {[hex(ord(c)) for c in test[40:50]]}\n')
out.write(f'test repr: {repr(test)}\n')
out.write(f'len: {len(test)}\n')
out.close()
print('done')
