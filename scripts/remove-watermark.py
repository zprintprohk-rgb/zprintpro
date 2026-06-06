"""
ZprintPro AI 生图水印去除脚本
================================

使用 Python + OpenCV 自动去除 seedream / doubao 等 AI 生图平台的水印。

工作原理：
1. 读取图片
2. 在右下角区域（典型水印位置）创建 mask
3. cv2.inpaint 用周围像素填充水印区域
4. 输出清洗后的图片

使用方法：
    # 单个文件
    python remove-watermark.py input.png output.png

    # 批量处理整个目录
    python remove-watermark.py --batch input_dir/ output_dir/

    # 自定义水印区域
    python remove-watermark.py input.png output.png --roi 0.85 0.92 1.0 1.0

通过率：~80%（少数边缘图需要人工补）
"""

import argparse
import os
import sys
from pathlib import Path
from typing import Tuple, Optional

try:
    import cv2
    import numpy as np
except ImportError:
    print("ERROR: 需要安装 opencv-python 和 numpy", file=sys.stderr)
    print("  pip install opencv-python numpy", file=sys.stderr)
    sys.exit(1)


# ============ 核心函数 ============

def detect_watermark_roi(img: np.ndarray) -> Tuple[int, int, int, int]:
    """
    自动检测水印区域（启发式：右下角）

    Returns:
        (x1, y1, x2, y2) - 水印区域坐标
    """
    h, w = img.shape[:2]

    # 默认假设水印在右下角 15% × 8% 区域
    # seedream / doubao 典型水印尺寸
    roi_w = int(w * 0.18)
    roi_h = int(h * 0.10)

    x1 = w - roi_w
    y1 = h - roi_h
    x2 = w
    y2 = h

    return (x1, y1, x2, y2)


def remove_watermark(
    input_path: str,
    output_path: str,
    roi: Optional[Tuple[int, int, int, int]] = None,
    inpaint_radius: int = 3,
) -> bool:
    """
    去除图片右下角水印

    Args:
        input_path: 输入图片路径
        output_path: 输出图片路径
        roi: 水印区域 (x1, y1, x2, y2)，None = 自动检测
        inpaint_radius: inpaint 半径（越大修复范围越大）

    Returns:
        True 成功 / False 失败
    """
    try:
        img = cv2.imread(input_path)
        if img is None:
            print(f"  [FAIL] 无法读取: {input_path}", file=sys.stderr)
            return False

        h, w = img.shape[:2]

        # 1. 决定水印区域
        if roi is None:
            x1, y1, x2, y2 = detect_watermark_roi(img)
        else:
            # 归一化坐标 → 像素
            if max(roi) <= 1.0:
                x1 = int(roi[0] * w)
                y1 = int(roi[1] * h)
                x2 = int(roi[2] * w)
                y2 = int(roi[3] * h)
            else:
                x1, y1, x2, y2 = roi

        # 2. 创建 mask
        mask = np.zeros(img.shape[:2], dtype=np.uint8)
        cv2.rectangle(mask, (x1, y1), (x2, y2), 255, -1)

        # 3. 扩展 mask 边缘（确保完全覆盖水印 + 抗锯齿过渡）
        kernel = np.ones((3, 3), np.uint8)
        mask = cv2.dilate(mask, kernel, iterations=1)

        # 4. Inpaint
        result = cv2.inpaint(
            img, mask, inpaintRadius=inpaint_radius, flags=cv2.INPAINT_TELEA
        )

        # 5. 输出
        os.makedirs(os.path.dirname(output_path) or '.', exist_ok=True)
        cv2.imwrite(output_path, result, [cv2.IMWRITE_PNG_COMPRESSION, 6])

        return True

    except Exception as e:
        print(f"  [ERROR] {input_path}: {e}", file=sys.stderr)
        return False


def batch_process(
    input_dir: str,
    output_dir: str,
    extensions: tuple = ('.png', '.jpg', '.jpeg', '.webp'),
    inpaint_radius: int = 3,
) -> Tuple[int, int]:
    """
    批量处理目录

    Returns:
        (success_count, fail_count)
    """
    input_path = Path(input_dir)
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)

    success = 0
    fail = 0

    files = [f for f in input_path.rglob('*') if f.suffix.lower() in extensions]
    total = len(files)

    print(f"批量处理: {input_dir} -> {output_dir}")
    print(f"找到 {total} 个图片文件")

    for i, file in enumerate(files, 1):
        rel = file.relative_to(input_path)
        out_file = output_path / rel
        print(f"  [{i}/{total}] {rel} ... ", end='', flush=True)

        if remove_watermark(str(file), str(out_file), inpaint_radius=inpaint_radius):
            print("OK")
            success += 1
        else:
            print("FAIL")
            fail += 1

    return (success, fail)


# ============ CLI ============

def main():
    parser = argparse.ArgumentParser(
        description='ZprintPro AI 生图水印去除（OpenCV inpaint）'
    )
    parser.add_argument('input', help='输入图片路径 或 批量输入目录')
    parser.add_argument('output', help='输出图片路径 或 批量输出目录')
    parser.add_argument('--batch', action='store_true', help='批量处理模式')
    parser.add_argument(
        '--roi',
        nargs=4,
        type=float,
        metavar=('X1', 'Y1', 'X2', 'Y2'),
        help='水印区域（归一化 0-1 或 像素）',
    )
    parser.add_argument(
        '--radius',
        type=int,
        default=3,
        help='inpaint 半径（默认 3，越大修复越强）',
    )

    args = parser.parse_args()

    if args.batch:
        success, fail = batch_process(
            args.input, args.output, inpaint_radius=args.radius
        )
        total = success + fail
        rate = (success / total * 100) if total > 0 else 0
        print(f"\n完成: 成功 {success} / 失败 {fail} / 通过率 {rate:.1f}%")
        sys.exit(0 if fail == 0 else 1)
    else:
        roi = tuple(args.roi) if args.roi else None
        ok = remove_watermark(args.input, args.output, roi=roi, inpaint_radius=args.radius)
        if ok:
            print(f"OK: {args.input} -> {args.output}")
            sys.exit(0)
        else:
            print(f"FAIL: {args.input}", file=sys.stderr)
            sys.exit(1)


if __name__ == '__main__':
    main()
