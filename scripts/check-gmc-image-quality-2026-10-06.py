"""Pillow 双方法复算: 6 个贺卡 SKU 的 v26 图片 (本地文件, §0.23.2)
验证: 真实格式 / 尺寸 / 帧数 / 是否有 alpha — 判断是否可能触发「图片类型不受支持」
"""
from pathlib import Path
from PIL import Image

ROOT = Path(r"F:\zprintpro-nextjs\public\images\v26\greeting-cards")
variants = ["premium", "thick-400g", "foil", "spot-uv", "matte", "rounded-corner"]

print(f"{'variant':<16}{'file':<22}{'format':<10}{'size':<12}{'frames':<8}{'mode':<8}")
for v in variants:
    p = ROOT / v / "ja" / "hero.webp"
    if not p.exists():
        print(f"{v:<16}MISSING: {p}")
        continue
    with Image.open(p) as im:
        frames = getattr(im, "n_frames", 1)
        animated = getattr(im, "is_animated", False)
        print(f"{v:<16}{p.name:<22}{im.format:<10}{im.size[0]}x{im.size[1]:<8}{frames}{'(anim!)' if animated else '':<8}{im.mode:<8}")

print("\n--- 500x500 最低门槛 (2027-01-31 新政, 现在就该达标) ---")
for v in variants:
    p = ROOT / v / "ja" / "hero.webp"
    if p.exists():
        with Image.open(p) as im:
            ok = im.size[0] >= 500 and im.size[1] >= 500
            print(f"{v}: {im.size[0]}x{im.size[1]} -> {'PASS' if ok else 'FAIL <500'}")
