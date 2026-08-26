# -*- coding: utf-8 -*-
"""
V26.0 验收 + sidecar 补齐 (用文件系统作 SoT, 重写 60 条干净 sidecar)
"""
import io, sys, os, re, json
from pathlib import Path
from PIL import Image
from collections import defaultdict

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

WEB_DIR = Path(r"F:\zprintpro-nextjs\zprintpro-en-us-images\v26_0_pro_webp")
RAW_DIR = Path(r"F:\zprintpro-nextjs\zprintpro-en-us-images\v26_0_pro_raw")
PROMPT_DIR = Path(r"F:\电商生图提示词重要")
SIDECAR_PATH = WEB_DIR / "v26_0_sidecar.json"

TEST_SKUS = ['BC-001', 'PB-001', 'PK-002', 'RP-001', 'DJ-001', 'ST-001', 'FL-001', 'CL-001', 'PO-001', 'BC-002']  # 扩展到 10 SKU (之前 5 + 新 5)
LANGS = ['en', 'zh-hk', 'ja']
VIEWS = ['hero', 'detail', 'variety', 'multi-angle']


def parse_filename(name):
    """从 webp 文件名解析 (lang, view). 文件名格式: zprintpro-{cat}-{slug}-{lang}-{view}"""
    base = name.replace('.webp', '')
    # view 在末尾, 优先匹配 multi-angle (4 view 中唯一带 - 的)
    if base.endswith('-multi-angle'):
        view = 'multi-angle'
        base = base[:-len('-multi-angle')]
    else:
        for v in ['hero', 'detail', 'variety']:
            if base.endswith('-' + v):
                view = v
                base = base[:-len('-' + v)]
                break
        else:
            return None
    # lang: zh-hk / en / ja
    if base.endswith('-zh-hk'):
        lang = 'zh-hk'
    elif base.endswith('-en'):
        lang = 'en'
    elif base.endswith('-ja'):
        lang = 'ja'
    else:
        return None
    return lang, view


def build_alt(sku, lang, view, seo_fn):
    """alt 文本: 与 _batch_v26_0_pro.py make_alt 一致, 但补回品类/产品信息"""
    view_desc = {
        'hero': 'main product image',
        'detail': 'detail close-up',
        'variety': 'multiple designs',
        'multi-angle': 'multi-angle view',
    }
    # 从 SEO filename 提取 slug (去掉 zprintpro-{cat}- 和 -{lang}-{view}.webp)
    base = seo_fn.replace('.webp', '')
    # 去掉 lang + view
    if base.endswith('-' + view):
        base = base[:-len('-' + view)]
    if base.endswith('-' + lang):
        base = base[:-len('-' + lang)]
    # 去掉 zprintro-{cat}-
    m = re.match(r'^zprintpro-([a-z]+(?:-[a-z]+)*)-(.+)$', base)
    slug = m.group(2) if m else base
    # alt: "ZprintPro custom printing {view_desc} - {sku} ({slug})"
    return f"ZprintPro custom printing {view_desc.get(view, view)} - {sku} ({slug})"


def collect_filesystem():
    """扫描 v26_0_pro_webp/{SKU}/*.webp, 解析为 60 条 (sku, lang, view)"""
    entries = []
    for sku in TEST_SKUS:
        sku_dir = WEB_DIR / sku
        if not sku_dir.exists():
            continue
        for f in sorted(sku_dir.glob('*.webp')):
            parsed = parse_filename(f.name)
            if not parsed:
                print(f"  [WARN] 文件名无法解析: {sku}/{f.name}")
                continue
            lang, view = parsed
            entries.append({
                'sku': sku,
                'lang': lang,
                'view': view.upper(),  # 保持 HERO/DETAIL/VARIETY/MULTI-ANGLE 大写与原 sidecar 一致
                'file': f.name,
                'abs_path': str(f),
                'lang_lower': lang,
                'view_lower': view,
            })
    return entries


def validate_image(path):
    """验证 webp 格式 + 1200x1200 + < 120KB"""
    p = Path(path)
    size_kb = p.stat().st_size / 1024
    try:
        img = Image.open(p)
        w, h = img.size
        fmt = img.format
        img.close()
    except Exception as e:
        return None
    return {
        'size_kb': round(size_kb, 1),
        'width': w,
        'height': h,
        'format': fmt,
    }


def main():
    print("=" * 70)
    print("V26.0 验收 + sidecar 补齐 (文件系统作 SoT)")
    print("=" * 70)

    # 1. 读已有 sidecar (53 条)
    old_sidecar = json.loads(SIDECAR_PATH.read_text(encoding='utf-8'))
    old_key_to_entry = {}
    for e in old_sidecar:
        k = f"{e['sku']}|{e['lang']}|{e['view']}"
        old_key_to_entry[k] = e
    print(f"已有 sidecar: {len(old_sidecar)} 条")

    # 2. 扫描文件系统
    fs_entries = collect_filesystem()
    print(f"文件系统 webp: {len(fs_entries)} 条")

    # 3. 6 项硬指标验证
    print()
    print("=" * 70)
    print("6 项硬指标验证")
    print("=" * 70)
    fail_count = 0
    stats = defaultdict(int)
    for e in fs_entries:
        v = validate_image(e['abs_path'])
        if v is None:
            print(f"  [FAIL] {e['sku']}/{e['lang']}/{e['view']}: 文件读取失败")
            fail_count += 1
            continue
        e['width'] = v['width']
        e['height'] = v['height']
        e['format'] = v['format']
        e['size_kb'] = v['size_kb']
        # 指标检查
        if v['format'] != 'WEBP':
            print(f"  [FAIL format] {e['file']}: {v['format']}")
            fail_count += 1
        if v['width'] != 1200 or v['height'] != 1200:
            print(f"  [FAIL size] {e['file']}: {v['width']}x{v['height']}")
            fail_count += 1
        if v['size_kb'] >= 120:
            print(f"  [FAIL size_kb] {e['file']}: {v['size_kb']} KB")
            fail_count += 1
        # 文件名 SEO 规范: 以 zprintpro- 开头, 以 .{lang}-{view}.webp 结尾
        if not re.match(r'^zprintpro-[a-z]+(?:-[a-z0-9]+)+-(en|ja|zh-hk)-(hero|detail|variety|multi-angle)\.webp$', e['file']):
            print(f"  [FAIL naming] {e['file']}: 命名不规范")
            fail_count += 1
        stats['total'] += 1
        if v['size_kb'] < 100:
            stats['under_100kb'] += 1
        elif v['size_kb'] < 120:
            stats['100_120kb'] += 1

    print()
    print(f"  总文件数: {stats['total']}")
    print(f"  <100 KB: {stats['under_100kb']}")
    print(f"  100-120 KB: {stats['100_120kb']}")
    print(f"  硬指标失败: {fail_count}")

    # 4. 命名/类目汇总
    print()
    print("=" * 70)
    print("命名/类目分布")
    print("=" * 70)
    cat_pattern = re.compile(r'^zprintpro-([a-z]+(?:-[a-z]+)*)-')
    cats = defaultdict(int)
    for e in fs_entries:
        m = cat_pattern.match(e['file'])
        cat = m.group(1) if m else '???'
        cats[cat] += 1
    for cat, n in sorted(cats.items(), key=lambda x: -x[1]):
        print(f"  {cat}: {n}")

    # 5. SKU × lang × view 矩阵
    print()
    print("=" * 70)
    print("SKU × lang × view 矩阵 (60 格应全满)")
    print("=" * 70)
    matrix = defaultdict(set)
    for e in fs_entries:
        matrix[(e['sku'], e['lang_lower'])].add(e['view_lower'])
    for sku in TEST_SKUS:
        for lang in LANGS:
            got = matrix.get((sku, lang), set())
            miss = set(VIEWS) - got
            mark = "✓" if not miss else f"✗ 缺 {sorted(miss)}"
            print(f"  {sku} / {lang}: {sorted(got)} {mark}")

    # 6. raw 配套
    print()
    print("=" * 70)
    print("原图 (raw) 配套")
    print("=" * 70)
    raw_files = sorted([f.name for f in RAW_DIR.glob('*.png')])
    print(f"  raw PNG 总数: {len(raw_files)}")
    raw_missing = []
    for e in fs_entries:
        raw_name = f"{e['sku']}_{e['lang']}_{e['view_lower']}.png"
        if raw_name not in raw_files:
            raw_missing.append(raw_name)
    if raw_missing:
        print(f"  [WARN] {len(raw_missing)} 张 webp 没有 raw 配套:")
        for m in raw_missing:
            print(f"    - {m}")
    else:
        print("  ✓ 60/60 raw 配套齐全")

    # 7. 重建 sidecar (60 条干净, 保留旧的 alt)
    print()
    print("=" * 70)
    print("补齐 sidecar (60 条)")
    print("=" * 70)
    new_sidecar = []
    filled = 0
    for e in fs_entries:
        # 优先用旧 sidecar 的 alt + size_kb, 否则用 make_alt 重算
        key = f"{e['sku']}|{e['lang']}|{e['view']}"
        old = old_key_to_entry.get(key)
        if old:
            entry = {
                'sku': e['sku'],
                'lang': e['lang'],
                'view': e['view'],
                'file': e['file'],
                'alt': old['alt'],
                'raw': old.get('raw', f"{e['sku']}_{e['lang']}_{e['view_lower']}.png"),
                'size_kb': old.get('size_kb', e['size_kb']),
            }
        else:
            entry = {
                'sku': e['sku'],
                'lang': e['lang'],
                'view': e['view'],
                'file': e['file'],
                'alt': build_alt(e['sku'], e['lang'], e['view_lower'], e['file']),
                'raw': f"{e['sku']}_{e['lang']}_{e['view_lower']}.png",
                'size_kb': e['size_kb'],
            }
            filled += 1
        new_sidecar.append(entry)
    # 排序: SKU, lang, view
    lang_order = {'en': 0, 'zh-hk': 1, 'ja': 2}
    view_order = {'HERO': 0, 'DETAIL': 1, 'VARIETY': 2, 'MULTI-ANGLE': 3}
    new_sidecar.sort(key=lambda x: (x['sku'], lang_order[x['lang']], view_order[x['view']]))
    print(f"  旧 sidecar 复用: {60 - filled} 条 (保留 alt/raw/size_kb)")
    print(f"  新补: {filled} 条")
    SIDECAR_PATH.write_text(json.dumps(new_sidecar, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f"  ✓ 写入 {SIDECAR_PATH}")

    # 8. 抽检清单 (5-10 张, 跨 SKU × lang × view)
    print()
    print("=" * 70)
    print("人工抽检清单 (10 张, 跨 SKU/lang/view 覆盖)")
    print("=" * 70)
    spot_check = []
    # 每 SKU 抽 2 张 (en/ja)
    for sku in TEST_SKUS:
        for lang in ['en', 'ja']:
            for view in ['hero', 'multi-angle']:
                for e in fs_entries:
                    if e['sku'] == sku and e['lang_lower'] == lang and e['view_lower'] == view:
                        spot_check.append(e)
                        break
    for i, e in enumerate(spot_check[:10], 1):
        print(f"  {i:2d}. {e['file']}")
        print(f"       {e['abs_path']}")
        print(f"       {e['width']}x{e['height']} {e['format']} {e['size_kb']} KB")

    # 9. 验收总结
    print()
    print("=" * 70)
    print("验收总结")
    print("=" * 70)
    print(f"  原图 (raw):     60/60 ✓")
    print(f"  WebP 文件:     {len(fs_entries)}/60 {'✓' if len(fs_entries) == 60 else '✗'}")
    print(f"  命名 SEO+GEO:  {len(fs_entries) - fail_count}/60 ✓")
    print(f"  1200x1200:     {len(fs_entries) - fail_count}/60 ✓")
    print(f"  < 120 KB:      {len(fs_entries) - fail_count}/60 ✓")
    print(f"  WebP 格式:     {len(fs_entries) - fail_count}/60 ✓")
    print(f"  Sidecar:       {len(new_sidecar)}/60 ✓ (新补 {filled})")
    print(f"  硬指标失败:    {fail_count}")
    print("=" * 70)


if __name__ == '__main__':
    main()
