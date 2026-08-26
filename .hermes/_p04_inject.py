#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""P0-4 整改脚本: 给 enhance_rules.json COMMON 段追加场景-卖点对位条款.
K3 8/17 01:47 拍板 (ST-001 防水贴纸场景无水元素 → 举一反三 14 类目)."""
import json
import os

path = r'zprintpro\.cluster\m3-exec-20260811\enhance_rules.json'
with open(path, 'r', encoding='utf-8') as f:
    rules = json.load(f)

# P0-4 场景-卖点对位条款 (K3 8/17 01:47 拍板)
p04_clause = (
    " P0-4 SCENE-SELLING-POINT ALIGNMENT (2026-08-17 K3 directive, after ST-001 "
    "waterproof sticker scene had no water context): HERO and LIFESTYLE scenes MUST "
    "visually demonstrate the product core selling point; for waterproof stickers "
    "show water/rain/wet surface; for oilproof labels show kitchen/oil/food; for "
    "Chinese New Year red packets show festive elements (lantern/fu character/red "
    "couplet); for hardcover books show rigid case-bound; for foil-stamped show "
    "metallic gold reflection under warm light; do NOT use generic everyday-object "
    "scenes (MacBook/Moleskine/dry Hydro Flask) unless the selling point is "
    "office-friendly; the scene must prove the unique benefit, not just display the "
    "product in a generic lifestyle context. P0-5 SELLING-POINT TYPE 4-CLASS: function "
    "= must include functional demo element (water/oil/tear); craft = must include "
    "craft visualization (reflection/embossed/die-cut edge); scene = must include "
    "festive/event element; material = must include tactile texture element. Refer to "
    "seedream/scene_dictionary.json for the per-category selling-point scene rule set. "
    "P0-4 NEGATIVES: no generic office scene, no MacBook without selling-point "
    "context, no Hydro Flask in dry hand, no everyday objects without selling-point "
    "demonstration, no festive decoration when selling point is functional, no "
    "functional demo when selling point is decorative."
)

# Append to COMMON (preserve existing content + K3 P0-4 marker for traceability)
rules['COMMON'] = rules['COMMON'] + p04_clause

# Update version
rules['version'] = rules.get('version', '') + ' + P0-4 (2026-08-17)'

# Backup before write
backup_path = path + '.pre-p04.bak'
if not os.path.exists(backup_path):
    with open(backup_path, 'w', encoding='utf-8') as f:
        # Read original (re-load)
        pass
# Always backup the PRE-change state
with open(backup_path, 'w', encoding='utf-8') as f:
    # Load pre-change from a known state? We modified rules in memory, so backup the OLD by reloading
    pass
# Reload original from git to get pre-change state for backup
import subprocess
orig = subprocess.run(['git', 'show', f'HEAD:zprintpro/.cluster/m3-exec-20260811/enhance_rules.json'],
                      capture_output=True, text=True, encoding='utf-8')
if orig.stdout:
    with open(backup_path, 'w', encoding='utf-8') as f:
        f.write(orig.stdout)
    print(f'Backup (from git HEAD): {backup_path} ({os.path.getsize(backup_path)} bytes)')
else:
    print(f'WARN: cannot get git HEAD version, backup skipped')

# Write new version
with open(path, 'w', encoding='utf-8') as f:
    json.dump(rules, f, ensure_ascii=False, indent=2)
print(f'New size: {os.path.getsize(path)} bytes')
print(f'COMMON new length: {len(rules["COMMON"])} chars')
print(f'version: {rules["version"]}')
print()
print('--- Last 600 chars of COMMON (P0-4 marker area) ---')
print(rules['COMMON'][-600:])
