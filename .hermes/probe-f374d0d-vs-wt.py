#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import io, subprocess

wt = io.open(r'F:\zprintpro-nextjs\src\app\[locale]\about\page.tsx', 'r', encoding='utf-8').read()
cm = subprocess.check_output(['git', '-C', r'F:\zprintpro-nextjs', 'show', 'f374d0d:src/app/[locale]\about\page.tsx'], stderr=subprocess.STDOUT).decode('utf-8')

print(f'working tree length: {len(wt)}')
print(f'f374d0d commit length: {len(cm)}')
print(f'diff size: {len(wt) - len(cm)}')
print(f'working tree processTitle: {wt.count("processTitle")}')
print(f'commit processTitle: {cm.count("processTitle")}')
print(f'working tree testimonialTitle: {wt.count("testimonialTitle")}')
print(f'commit testimonialTitle: {cm.count("testimonialTitle")}')
print(f'working tree 印刷流程: {wt.count("印刷流程")}')
print(f'commit 印刷流程: {cm.count("印刷流程")}')
print(f'working tree 5步流程: {wt.count("5 步")}')
print(f'commit 5步流程: {cm.count("5 步")}')
print('---')
print('commit about last 500 chars:')
print(cm[-500:])
