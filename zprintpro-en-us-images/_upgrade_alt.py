# -*- coding: utf-8 -*-
"""一次性升级 v26_0_sidecar.json 的 60 条 alt 为含 slug 的统一格式"""
import io, sys, re, json
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

SIDECAR = Path(r"F:\zprintpro-nextjs\zprintpro-en-us-images\v26_0_pro_webp\v26_0_sidecar.json")

VIEW_DESC = {
    'HERO': 'main product image',
    'DETAIL': 'detail close-up',
    'VARIETY': 'multiple designs',
    'MULTI-ANGLE': 'multi-angle view',
}


def build_alt(sku, lang, view_upper, seo_fn):
    """从 SEO filename 反推 slug, 生成统一 alt 格式"""
    view = view_upper.lower()
    base = seo_fn.replace('.webp', '')
    # 去掉 lang + view
    if base.endswith('-' + view):
        base = base[:-len('-' + view)]
    if base.endswith('-' + lang):
        base = base[:-len('-' + lang)]
    # 去掉 zprintpro-{cat}-
    m = re.match(r'^zprintpro-([a-z]+(?:-[a-z]+)*)-(.+)$', base)
    slug = m.group(2) if m else base
    return f"ZprintPro custom printing {VIEW_DESC.get(view_upper, view)} - {sku} ({slug})"


def main():
    data = json.loads(SIDECAR.read_text(encoding='utf-8'))
    print(f"升级前: {len(data)} 条")
    upgraded = 0
    same = 0
    for e in data:
        new_alt = build_alt(e['sku'], e['lang'], e['view'], e['file'])
        if e['alt'] != new_alt:
            e['alt'] = new_alt
            upgraded += 1
        else:
            same += 1
    SIDECAR.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f"已升级 alt: {upgraded} 条")
    print(f"已是统一格式: {same} 条")
    print(f"最终: {len(data)} 条 alt 全部统一为含 slug 格式")
    # 抽样 3 条给用户看
    print()
    print("=== 抽样 3 条新 alt ===")
    for e in data[:3]:
        print(f"  {e['file']}")
        print(f"    alt: {e['alt']}")
    print()
    print("=== 抽样 1 条 zh-hk ===")
    for e in data:
        if e['lang'] == 'zh-hk':
            print(f"  {e['file']}")
            print(f"    alt: {e['alt']}")
            break
    print()
    print("=== 抽样 1 条 ja ===")
    for e in data:
        if e['lang'] == 'ja':
            print(f"  {e['file']}")
            print(f"    alt: {e['alt']}")
            break


if __name__ == '__main__':
    main()
