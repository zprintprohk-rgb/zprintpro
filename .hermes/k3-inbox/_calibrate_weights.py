# -*- coding: utf-8 -*-
"""_calibrate_weights.py - V20.9 权重校准工具 (K3 8/16 03:30 拍板 4 步方案)

K3 8/16 03:30 拍板:
- "不要在权重没校准前批量跑 87 SKU——40% 差异意味着～35 个 SKU 会选错图"
- 校准方法: K3 标注 5-10 张图 (稳态/草稿 + 哪张选), 脚本反推最优权重

用法:
1. K3 跑豆包 V20.9 prompt 拿 5-10 组 2 候选图
2. K3 在 calibration_data.json 标每组:
   - cand1: {image_path, is_picked: true/false, is_stable: true/false, design_score: 0-100}
   - cand2: 同上
3. 跑本脚本: python _calibrate_weights.py
4. 输出: 最优权重 (5 维度百分比), 用这权重更新 _auto_select_best.py
"""
import io
import sys
import json
from pathlib import Path
from PIL import Image
import numpy as np

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

BASE_DIR = Path(r"F:\zprintpro-nextjs\zprintpro-en-us-images")
CALIBRATION_FILE = BASE_DIR / 'calibration_data.json'


def extract_5_dims(img_path):
    """跟 _auto_select_best.py 一致的 5 维度提取, 返回 raw 分数 (0-100)"""
    try:
        img = Image.open(img_path).convert('RGB')
    except Exception as e:
        return None
    arr = np.array(img)
    h, w = arr.shape[:2]
    gray = np.mean(arr, axis=2)
    # 1. 设计美感 raw (暖色 + 高饱和)
    r_mean = np.mean(arr[:, :, 0])
    b_mean = np.mean(arr[:, :, 2])
    warm_score = min(100, max(0, (r_mean - b_mean) * 0.8 + 50))
    full_max = arr.max(axis=2).astype(float)
    full_min = arr.min(axis=2).astype(float)
    full_sat = (full_max - full_min) / (full_max + 1e-6) * 100
    full_sat_score = min(100, np.mean(full_sat) * 1.3)
    aesthetic_raw = warm_score * 0.5 + full_sat_score * 0.5
    # 2. 字符可读 raw (锐度 + 文字密度)
    dx = np.abs(np.diff(gray, axis=1))
    dy = np.abs(np.diff(gray, axis=0))
    sharpness = (np.mean(dx) + np.mean(dy)) / 2
    sharpness_score = min(100, sharpness * 3.3)
    ch, cw = h // 4, w // 4
    center = gray[ch:3*ch, cw:3*cw]
    cdx = np.abs(np.diff(center, axis=1))
    text_density = np.mean(cdx > 20) * 100
    text_raw = sharpness_score * 0.6 + text_density * 0.4
    # 3. 物理合理 raw (边缘丰富)
    edges = (dx > 30).sum() + (dy > 30).sum()
    edge_density = edges / (h * w) * 100
    physics_raw = min(100, edge_density * 50)
    # 4. 14 虚构公司一致 raw (中央文字 sweet spot)
    c2h, c2w = h // 4, w // 4
    center2 = gray[c2h:3*c2h, c2w:3*c2w]
    c2dx = np.abs(np.diff(center2, axis=1))
    text_present = min(100, np.mean(c2dx > 15) * 200)
    if 30 <= text_present <= 70:
        brand_raw = 100
    elif text_present < 30:
        brand_raw = text_present * 2
    else:
        brand_raw = max(0, 100 - (text_present - 70) * 2)
    # 5. frame 占比 raw (中央饱和度)
    c3h, c3w = h // 5, w // 5
    center3 = arr[c3h:4*c3h, c3w:4*c3w]
    cmax = center3.max(axis=2).astype(float)
    cmin = center3.min(axis=2).astype(float)
    sat = (cmax - cmin) / (cmax + 1e-6) * 100
    frame_raw = min(100, np.mean(sat) * 1.5)
    return {
        'aesthetic': round(aesthetic_raw, 2),
        'text': round(text_raw, 2),
        'physics': round(physics_raw, 2),
        'brand': round(brand_raw, 2),
        'frame': round(frame_raw, 2),
    }


def calibrate(annotations):
    """annotations: [{cand1_dims, cand2_dims, picked: 1 or 2, stable: 'cand1' or 'cand2'}, ...]
    简单贪心搜索: 枚举权重组合, 找跟 K3 picked 选择 100% 对齐的最优权重
    """
    best = None
    best_score = -1
    # 枚举权重 (步长 0.05, 5 维度总和 = 1.0)
    for w_a in [0.20, 0.30, 0.40, 0.50, 0.60, 0.70]:
        for w_t in [0.05, 0.10, 0.15, 0.20, 0.25, 0.30]:
            for w_p in [0.05, 0.10, 0.15, 0.20]:
                for w_b in [0.05, 0.10, 0.15]:
                    for w_f in [0.05, 0.10, 0.15, 0.20]:
                        if abs(w_a + w_t + w_p + w_b + w_f - 1.0) > 0.01:
                            continue
                        # 用这权重对每个 annotation 评分, 看是否选 cand K3 选的
                        match = 0
                        for ann in annotations:
                            d1 = ann['cand1_dims']
                            d2 = ann['cand2_dims']
                            s1 = (d1['aesthetic'] * w_a + d1['text'] * w_t +
                                  d1['physics'] * w_p + d1['brand'] * w_b + d1['frame'] * w_f)
                            s2 = (d2['aesthetic'] * w_a + d2['text'] * w_t +
                                  d2['physics'] * w_p + d2['brand'] * w_b + d2['frame'] * w_f)
                            script_pick = 1 if s1 >= s2 else 2
                            if script_pick == ann['picked']:
                                match += 1
                        if match > best_score:
                            best_score = match
                            best = (w_a, w_t, w_p, w_b, w_f)
    return best, best_score


def main():
    if not CALIBRATION_FILE.exists():
        print(f"ERROR: {CALIBRATION_FILE} not found")
        print("K3 请按下面格式创建 calibration_data.json:")
        print("""[
  {
    "sku": "BC-001",
    "view": "hero",
    "cand1_path": "BC-001/raw/_cand/..._cand1.jpg",
    "cand2_path": "BC-001/raw/_cand/..._cand2.jpg",
    "picked": 2,  // K3 选了 cand2
    "stable_cand": 2,  // K3 判定 cand2 是稳态
    "design_score_diff": 30  // K3 评分: cand 比 cand1 设计美感高 30 分
  },
  ...
]""")
        sys.exit(1)

    with open(CALIBRATION_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)

    print(f"Loaded {len(data)} calibration annotations")
    if len(data) < 5:
        print(f"WARN: <5 annotations, calibration will be unreliable. K3 建议 >=10 张")

    # 提取 5 维度
    annotations = []
    for ann in data:
        d1 = extract_5_dims(ann['cand1_path'])
        d2 = extract_5_dims(ann['cand2_path'])
        if d1 and d2:
            annotations.append({
                'cand1_dims': d1,
                'cand2_dims': d2,
                'picked': ann['picked'],
                'sku': ann.get('sku', '?'),
                'view': ann.get('view', '?'),
            })

    if not annotations:
        print("ERROR: no valid annotations")
        sys.exit(1)

    print(f"\n=== Extracted 5 dims for {len(annotations)} annotations ===")
    for i, a in enumerate(annotations):
        print(f"  {i+1}. {a['sku']} {a['view']}: picked=cand{a['picked']}")
        print(f"     cand1: {a['cand1_dims']}")
        print(f"     cand2: {a['cand2_dims']}")

    # 校准
    best, best_score = calibrate(annotations)
    w_a, w_t, w_p, w_b, w_f = best
    print(f"\n=== 校准结果 ===")
    print(f"最优权重: aesthetic={w_a}, text={w_t}, physics={w_p}, brand={w_b}, frame={w_f}")
    print(f"对齐 K3 选择: {best_score}/{len(annotations)} = {best_score/len(annotations)*100:.0f}%")

    if best_score == len(annotations):
        print("✓ 100% 对齐 K3 选择, 权重完美")
    elif best_score >= len(annotations) * 0.8:
        print("✓ ≥80% 对齐, 权重可用, 微调即可")
    else:
        print("⚠ <80% 对齐, 建议:")
        print("  - 增加 K3 偏好维度 (人脸肤色 / 背景虚化 / 暖色偏向)")
        print("  - 或增加标注数量到 ≥20 张")
        print("  - 或考虑方案 C: 训练 ML 模型")

    # 输出更新 _auto_select_best.py 的 W_* 配置
    update_config = f"""# V20.9 K3 校准后权重 (8/16 BC-001 + 12 SKU 验证)
# 校准来源: {len(annotations)} 标注, 对齐 {best_score}/{len(annotations)} ({best_score/len(annotations)*100:.0f}%)
W_DESIGN = {w_a}    # 设计美感 (暖色 + 高饱和)
W_TEXT = {w_t}     # 字符可读 (锐度 + 文字密度)
W_PHYSICS = {w_p}   # 物理合理 (边缘丰富)
W_BRAND = {w_b}     # 14 虚构公司一致 (中央文字 sweet spot)
W_FRAME = {w_f}     # frame 占比 (中央饱和度)"""
    print(f"\n=== 复制以下内容替换 _auto_select_best.py 的 W_* 配置 ===")
    print(update_config)


if __name__ == '__main__':
    main()
