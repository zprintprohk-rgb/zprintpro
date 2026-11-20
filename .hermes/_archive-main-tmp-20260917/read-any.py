#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Read UTF-16 or UTF-8 text file and print as UTF-8."""
import sys

path = sys.argv[1]
raw = open(path, 'rb').read()
# Detect UTF-16 BOM
if raw[:2] in (b'\xff\xfe', b'\xfe\xff'):
    text = raw.decode('utf-16')
else:
    text = raw.decode('utf-8', errors='replace')
sys.stdout.buffer.write(text.encode('utf-8'))
