# -*- coding: utf-8 -*-
"""_auto_select_best.py V3 - 保护模式 (不覆盖 K3 原选, 备份 + 选图到独立文件)

K3 8/16 01:50 拍板 P0-2 自动选图脚本.
V3 改动: 改为保护模式, 不直接覆盖 webp
  - 备份原 webp 到 {SKU}/backup_v20_8_k3_choice/
  - 自动选图落盘到 {SKU}/_auto_selected/{slug}.webp
  - 不替换原 webp, 等 K3 看完对比报告后决定

评分 5 维度 (V2 权重, K3 拍板):
  1. 设计美感 (35%): 暖色 + 高饱和
  2. 字符可读 (25%): 锐度 + 文字密度
  3. 物理合理 (15%): 边缘丰富
  4. 14 虚构公司一致 (10%): 中央文字 sweet spot
  5. frame 占比 (15%): 中央饱和度
"""
import io
import os
import sys
import json
import shutil
from pathlib import Path
from PIL import Image
import numpy as np

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

BASE_DIR = Path(r"F:\zprintpro-nextjs\zprintpro-en-us-images")

W_DESIGN = 0.35
W_TEXT = 0.25
W_PHYSICS = 0.15
W_BRAND = 0.10
W_FRAME = 0.15


def score_image(img_path):
    try:
        img = Image.open(img_path).convert('RGB')
    except Exception as e:
        return 0.0, {'error': str(e)}
    arr = np.array(img)
    h, w = arr.shape[:2]
    gray = np.mean(arr, axis=2)
    # 维度 1: 设计美感 (35%) - 暖色 + 高饱和
    r_mean = np.mean(arr[:, :, 0])
    b_mean = np.mean(arr[:, :, 2])
    warm_score = min(100, max(0, (r_mean - b_mean) * 0.8 + 50))
    full_max = arr.max(axis=2).astype(float)
    full_min = arr.min(axis=2).astype(float)
    full_sat = (full_max - full_min) / (full_max + 1e-6) * 100
    full_sat_score = min(100, np.mean(full_sat) * 1.3)
    aesthetic_score = warm_score * 0.5 + full_sat_score * 0.5
    # 维度 2: 字符可读 (25%)
    dx = np.abs(np.diff(gray, axis=1))
    dy = np.abs(np.diff(gray, axis=0))
    sharpness = (np.mean(dx) + np.mean(dy)) / 2
    sharpness_score = min(100, sharpness * 3.3)
    ch, cw = h // 4, w // 4
    center = gray[ch:3*ch, cw:3*cw]
    cdx = np.abs(np.diff(center, axis=1))
    text_density = np.mean(cdx > 20) * 100
    text_score = sharpness_score * 0.6 + text_density * 0.4
    # 维度 3: 物理合理 (15%)
    edges = (dx > 30).sum() + (dy > 30).sum()
    edge_density = edges / (h * w) * 100
    edge_score = min(100, edge_density * 50)
    # 维度 4: 14 虚构公司一致 (10%)
    c2h, c2w = h // 4, w // 4
    center2 = gray[c2h:3*c2h, c2w:3*c2w]
    c2dx = np.abs(np.diff(center2, axis=1))
    text_present = min(100, np.mean(c2dx > 15) * 200)
    if 30 <= text_present <= 70:
        brand_score = 100
    elif text_present < 30:
        brand_score = text_present * 2
    else:
        brand_score = max(0, 100 - (text_present - 70) * 2)
    # 维度 5: frame 占比 (15%)
    c3h, c3w = h // 5, w // 5
    center3 = arr[c3h:4*c3h, c3w:4*c3w]
    cmax = center3.max(axis=2).astype(float)
    cmin = center3.min(axis=2).astype(float)
    sat = (cmax - cmin) / (cmax + 1e-6) * 100
    sat_score = min(100, np.mean(sat) * 1.5)
    total = (aesthetic_score * W_DESIGN + text_score * W_TEXT +
             edge_score * W_PHYSICS + brand_score * W_BRAND + sat_score * W_FRAME)
    breakdown = {
        'aesthetic_score': round(aesthetic_score, 1),
        'text_score': round(text_score, 1),
        'edge_score': round(edge_score, 1),
        'brand_score': round(brand_score, 1),
        'sat_score': round(sat_score, 1),
        'sharpness': round(sharpness, 2),
        'warm_score': round(warm_score, 1),
    }
    return round(total, 1), breakdown


def backup_k3_choice(sku_dir):
    """备份 K3 之前选的 webp 到 backup_v20_8_k3_choice/"""
    backup_dir = sku_dir / 'backup_v20_8_k3_choice'
    backup_dir.mkdir(exist_ok=True)
    count = 0
    for webp in sku_dir.glob('*.webp'):
        if webp.is_file() and not webp.name.startswith('_'):
            target = backup_dir / webp.name
            if not target.exists():
                shutil.copy2(webp, target)
                count += 1
    return count


def main():
    print("=" * 80)
    print("V20.9 自动选图脚本 _auto_select_best.py (V3 - 保护模式)")
    print(f"BASE_DIR: {BASE_DIR}")
    print(f"Weights: design={W_DESIGN}, text={W_TEXT}, physics={W_PHYSICS}, brand={W_BRAND}, frame={W_FRAME}")
    print("=" * 80)
    print("\n[保护模式] 不覆盖 K3 原选 webp, 备份到 backup_v20_8_k3_choice/")
    print("[保护模式] 选图落盘到 {SKU}/_auto_selected/{slug}.webp")
    print("[保护模式] K3 审核对比报告后再决定是否替换\n")

    sku_dirs = sorted([d for d in BASE_DIR.iterdir() if d.is_dir() and not d.name.startswith('.')])
    print(f"Found {len(sku_dirs)} SKU directories")

    all_results = {}
    a_count = 0
    b_count = 0
    backup_total = 0

    for sku_dir in sku_dirs:
        sku_code = sku_dir.name
        raw_dir = sku_dir / 'raw'
        if not raw_dir.exists():
            continue

        # Step 1: 备份 K3 原选 webp
        backup_n = backup_k3_choice(sku_dir)
        if backup_n > 0:
            backup_total += backup_n

        cand_dir = raw_dir / '_cand'
        auto_dir = sku_dir / '_auto_selected'
        auto_dir.mkdir(exist_ok=True)

        if cand_dir.exists():
            cand_files = sorted(list(cand_dir.glob('*_cand1.*')) + list(cand_dir.glob('*_cand2.*')))
            if not cand_files:
                continue
            # 配对 cand1+cand2
            pairs = {}
            for f in cand_files:
                key = f.stem.replace('_cand1', '').replace('_cand2', '')
                if key not in pairs:
                    pairs[key] = [None, None]
                if '_cand1' in f.stem:
                    pairs[key][0] = f
                elif '_cand2' in f.stem:
                    pairs[key][1] = f
            results = []
            for key, (c1, c2) in pairs.items():
                if not c1 or not c2:
                    continue
                s1, bd1 = score_image(c1)
                s2, bd2 = score_image(c2)
                winner, w_score, w_idx = (c1, s1, 1) if s1 >= s2 else (c2, s2, 2)
                # 落盘到 _auto_selected
                target = auto_dir / f"{key.split('/')[-1]}.webp"
                shutil.copy2(winner, target)
                results.append({
                    'key': key, 'cand1': {'path': str(c1), 'score': s1, 'breakdown': bd1},
                    'cand2': {'path': str(c2), 'score': s2, 'breakdown': bd2},
                    'winner': {'path': str(winner), 'idx': w_idx, 'score': w_score},
                    'auto_selected': str(target),
                })
            a_count += 1
            print(f"\n--- {sku_code} (A 格式 2 候选, 备份 {backup_n} 张) ---")
            for r in results:
                k = r['key'].split('/')[-1][-40:]
                print(f"  {k:42}  c1={r['cand1']['score']:5.1f}  c2={r['cand2']['score']:5.1f}  -> cand{r['winner']['idx']}")
        else:
            single_files = sorted(list(raw_dir.glob('*_raw.jpg')) + list(raw_dir.glob('*_raw.png')))
            if not single_files:
                continue
            results = []
            for f in single_files:
                s, bd = score_image(f)
                key = f.stem.replace('_raw', '').split('/')[-1]
                target = auto_dir / f"{key}.webp"
                shutil.copy2(f, target)
                results.append({
                    'key': key, 'single': {'path': str(f), 'score': s, 'breakdown': bd},
                    'auto_selected': str(target),
                })
            b_count += 1
            print(f"\n--- {sku_code} (B 格式单图, 备份 {backup_n} 张) ---")
            for r in results:
                k = r['key'][-40:]
                print(f"  {k:42}  single={r['single']['score']:5.1f}")

        all_results[sku_code] = results

    # 落盘 JSON
    out_json = BASE_DIR / 'alt-v20-cand-scores.json'
    with open(out_json, 'w', encoding='utf-8') as f:
        json.dump(all_results, f, ensure_ascii=False, indent=2)
    print(f"\n=== Saved {out_json} ({out_json.stat().st_size / 1024:.1f} KB) ===")
    print(f"=== A 格式 (2 候选): {a_count} SKU, B 格式 (单图): {b_count} SKU ===")
    print(f"=== 备份 K3 原选: {backup_total} 张 webp 到 backup_v20_8_k3_choice/ ===")
    print(f"=== 选图落盘到 {{SKU}}/_auto_selected/ ===")
    print("\n=== K3 下一步: 对比 backup_v20_8_k3_choice/ vs _auto_selected/ 后, 用 _auto_selected 替换 webp ===")


if __name__ == '__main__':
    main()
