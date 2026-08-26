#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""K3 8/22 20:24 找 unused dependencies"""
import re
import pathlib

unused_candidates = [
    'playwright', 'tesseract.js', 'airwallex-payment-elements',
    '@radix-ui/react-accordion', '@radix-ui/react-aspect-ratio',
    '@radix-ui/react-checkbox', '@radix-ui/react-dialog',
    '@radix-ui/react-dropdown-menu', '@radix-ui/react-label',
    '@radix-ui/react-select', '@radix-ui/react-slider',
    '@radix-ui/react-slot', '@radix-ui/react-switch',
    '@radix-ui/react-tabs', '@hookform/resolvers', 'react-hook-form', 'zod'
]
src = pathlib.Path('src')
all_files = list(src.rglob('*.ts')) + list(src.rglob('*.tsx')) + list(src.rglob('*.js')) + list(src.rglob('*.jsx'))
for pkg in unused_candidates:
    pat = re.compile(r"from ['\"]" + re.escape(pkg))
    matches = [str(f) for f in all_files if pat.search(f.read_text(encoding='utf-8', errors='ignore'))]
    status = 'UNUSED' if not matches else 'USED ' + str(len(matches)) + ' files'
    print('  ' + pkg + ': ' + status)
