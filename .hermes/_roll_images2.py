# -*- coding: utf-8 -*-
# roll-stickers 生图批 v2 — K3 2026-10-12 13:1x 指令:
#   Doubao-Seedream-5.0-flash (0.12元/张, 2.88元额度) / 2048x2048 2K PNG / n=1 / 质量优化
#   流程: 下载原图 → SEO文件名 PNG 存 .hermes/_roll_raw/ → 压缩 1200x1200 <120KB webp
#         带 alt EXIF → public/images/products/seedream-webp/
#   顺序: zh-hk 1,2,3 → en 1,2,3,4 → ja 1,2,3,4 (按系列顺序)
import json, time, sys, io, struct
from pathlib import Path
from PIL import Image
import requests
sys.stdout.reconfigure(encoding='utf-8')

ROOT = Path(r'F:\zprintpro-nextjs')
RAW_DIR = ROOT / '.hermes' / '_roll_raw'          # 原图 PNG (SEO 文件名)
WEBP_DIR = ROOT / 'public' / 'images' / 'products' / 'seedream-webp'
RAW_DIR.mkdir(parents=True, exist_ok=True)
ARK_KEY = 'ark-fce39cda-fd48-46cc-8d60-d1449f43a055-741fd'  # K3 2026-10-12 15:4x 第三次发 (账户 2122227803)
ARK_URL = 'https://ark.cn-beijing.volces.com/api/v3/images/generations'
MODEL_CANDIDATES = ['doubao-seedream-5-0-flash-260915']
UNIT_COST = 0.12
BUDGET = 2.88

ALT = {
 'zh-hk': '卷裝貼紙 / 卷裝標籤 | 香港卷裝標籤印刷 卷芯4cm 貼標機適用 每卷1,000張 | 智印港',
 'en': 'Custom Roll Labels on 4cm cores, 1,000 per roll for label applicators | ZprintPro',
 'ja': 'ロールラベル 印刷 | 巻芯径4cm・1巻1,000枚・ラベラー対応 | ZprintPro',
}

TAIL = 'Product tack-sharp. No garbled text, no misspellings, no torn edges, no plastic look, no floating objects, no harsh flash, no watermark, no hands no people.'
PAL = {
 'en': "Category-specific color palette with rich contrast, depth and dimension — warm kraft paper honey tones, amber gold, sage green label accents, cream and soft white — artisanal food-brand feel. American market palette: clean white base with bold accent colors; high contrast pops against neutral backgrounds.",
 'zh-hk': "Category-specific color palette with rich contrast, depth and dimension — warm kraft honey tones, amber gold, festive red and gold accents, cream and soft white — premium HK food-brand feel. High contrast pops against clean neutral backgrounds.",
 'ja': "Category-specific color palette with rich contrast, depth and dimension — warm kraft honey tones, muted amber, washi cream, deep indigo label accents — refined Japanese minimalist food-brand feel. Clean base with high contrast.",
}
SUBJ = {
 'en': 'US small-batch food and beverage brands labeling bottles and jars on a semi-automatic labeling machine; a roll of custom die-cut roll labels, features: applicator-ready 4cm core, unwind direction preset, 1,000 labels per roll, hot-melt adhesive, art paper face stock, grid backing, custom die-cut shape. Product surface shows brand "Verano" small logo, short copy "ORGANIC HONEY 250g" plus batch code "BATCH No. 0425", beautifully designed decorative artwork with meaningful visual content: hand-drawn honeycomb and botanical line art, minimal modern food-label aesthetic, letters correctly spelled.',
 'zh-hk': '香港食品飲料品牌於半自動貼標機上為玻璃瓶貼標；一卷定制異形模切卷裝貼紙，特性：貼標機適用 4cm 卷芯、出標方向預設、每卷 1,000 張、熱熔膠、銅板紙面材、格仔底紙。產品表面印品牌「Verano」小標誌，短文案「有機蜂蜜 250 克」，精美設計圖案：手繪蜂巢與植物線稿，簡約現代食品標籤風格，文字正確無誤。',
 'ja': '日本の食品・飲料ブランドが半自動ラベラーで瓶に貼付する様子；カスタム型抜きロールラベル、特長：巻芯径4cm・繰り出し方向プリセット・1巻1,000枚・ホットメルト・グリッド台紙。商品面にはブランド「みなみ農園」の小さなロゴ、ショートコピー「有機はちみつ 250g」、ロット番号「LOT 0425」、丁寧なデザイン：手描きの蜂巢と植物の線画、ミニマルな和風食品ラベル、文字は正しくスペル済み。',
}
SCENES = {
 'hero': 'Foreground main product: one tall roll of die-cut labels standing upright with white 4cm cardboard core visible from top, a second roll lying beside it with loose labels unwinding in a gentle curve showing grid backing; in background softly blurred: stainless steel semi-automatic bottle labeling machine on a bright modern production bench, a few amber glass honey jars, clean food-workshop ambience with warm bokeh. Product centered 80-85% of frame, slight angle for depth, strong depth of field, ',
 'detail': 'Extreme macro close-up of the label roll edge: precision die-cut contour of a honeycomb-shaped label, fine grid backing texture, one corner of a label lifted showing tacky hot-melt adhesive sheen, crisp matte art paper surface with subtle ink texture, soft bokeh background of warm workshop lights. Extreme close-up 85-95% of frame, raking light reveals surface texture, ',
 'multi': 'Three views in one frame - top view showing the 4cm white core winding, side view showing neatly wound labels with grid backing edge, and a single label peeled off lying flat showing full honeycomb artwork and grid backing; on a clean warm wooden surface with soft shadow and warm bokeh. Shows real dimensions, ',
 'variety': '3-4 rolls of labels in the same scene, each with a different food-brand design (organic honey, cold brew coffee, yuzu soda, artisan cosmetics), each fully visible, consistent lighting and scale, on a bright studio surface with softly blurred production shelf in warm bokeh, ',
}
# 按系列顺序: zh-hk 1,2,3 → en 1..4 → ja 1..4
ORDER = [('zh-hk', 'hero', 1), ('zh-hk', 'detail', 2), ('zh-hk', 'multi', 3),
         ('en', 'hero', 1), ('en', 'detail', 2), ('en', 'multi', 3), ('en', 'variety', 4),
         ('ja', 'hero', 1), ('ja', 'detail', 2), ('ja', 'multi', 3), ('ja', 'variety', 4)]

def build_prompt(loc, view):
    return ('1:1 square high-definition e-commerce main image, cinematic film quality. ' + PAL[loc] + ' ' + SUBJ[loc] + ' ' + SCENES[view] + TAIL)

def make_exif(alt: str) -> bytes:
    desc = alt.encode('utf-8') + b'\x00'
    ifd_len = 2 + 12 + 4
    desc_off = 8 + ifd_len
    entry = struct.pack('<HHII', 0x010E, 2, len(desc), desc_off)
    tiff = b'II' + struct.pack('<H', 42) + struct.pack('<I', 8) + struct.pack('<H', 1) + entry + struct.pack('<I', 0) + desc
    return b'Exif\x00\x00' + tiff

def save_webp(img: Image.Image, path: Path, alt: str):
    for q in (80, 75, 70, 65, 60, 55):
        img.convert('RGB').resize((1200, 1200), Image.LANCZOS).save(path, 'WEBP', quality=q, method=6, exif=make_exif(alt))
        if path.stat().st_size < 120 * 1024:
            return q, path.stat().st_size
    return q, path.stat().st_size

# 模型调用: 新 key 网关 auth 窗口级抖动 (分钟级 200/401 交替) — 用免费坏模型探针侦测窗口:
# 探针返 404(认证过) = 窗口开 → 立刻发真请求; 401 = 关 → 5s 后再探, 上限 ~3.5min
MODEL = None
BAD_PROBE = {'model': 'no-such-model-probe', 'prompt': 'probe', 'response_format': 'url', 'size': '1024x1024', 'watermark': False, 'n': 1}

def auth_window_open():
    try:
        rp = requests.post(ARK_URL, json=BAD_PROBE, headers={'Authorization': 'Bearer %s' % ARK_KEY, 'Content-Type': 'application/json'}, timeout=30)
        return rp.status_code != 401
    except Exception:
        return False

def gen(prompt):
    global MODEL
    ids = [MODEL] if MODEL else MODEL_CANDIDATES
    last = None
    for mid in ids:
        body = {'model': mid, 'prompt': prompt, 'response_format': 'url', 'size': '2048x2048',
                'stream': False, 'watermark': False, 'n': 1, 'output_format': 'png'}
        for attempt in range(1, 8):
            r = requests.post(ARK_URL, json=body, headers={'Authorization': 'Bearer %s' % ARK_KEY, 'Content-Type': 'application/json'}, timeout=180)
            if r.status_code == 200:
                MODEL = mid
                return r.json()
            last = (mid, r.status_code, r.text[:160])
            if r.status_code == 401 and 'AuthenticationError' in r.text:
                print('    401 窗口关, 探针等窗...', flush=True)
                opened = False
                for _p in range(42):
                    time.sleep(5)
                    if auth_window_open():
                        opened = True
                        print('    窗口开, 立刻发射', flush=True)
                        break
                if opened:
                    continue
                raise RuntimeError('auth window never opened in ~3.5min: %s' % (last,))
            if r.status_code in (403, 429):
                time.sleep(60)
                continue
            if 'InvalidModel' in r.text or 'NotFound' in r.text:
                break
            break
    raise RuntimeError('model probe fail: %s' % (last,))

# 前台分片跑 (background job 沙箱出口代理会剥 Authorization 头 → 401):
#   python _roll_images2.py 1 3   → 只跑 ORDER[0..2]
import sys as _sys
_a = int(_sys.argv[1]) if len(_sys.argv) > 1 else 1
_b = int(_sys.argv[2]) if len(_sys.argv) > 2 else len(ORDER)
SLICE = ORDER[_a-1:_b]

spent = 0.0
results = []
t0 = time.time()
for i, (loc, view, n) in enumerate(SLICE, _a):
    base = 'zprintpro-stickers-roll-stickers-%s-%d' % (loc, n)
    png_path = RAW_DIR / (base + '.png')
    webp_path = WEBP_DIR / (base + '.webp')
    if png_path.exists() and webp_path.exists():
        print('[%d/%d] skip %s (exists)' % (i, len(ORDER), base), flush=True)
        continue
    if spent + UNIT_COST > BUDGET:
        print('BUDGET EXHAUSTED after %.2f元' % spent, flush=True)
        results.append({'base': base, 'status': 'BUDGET_OUT'})
        break
    prompt = build_prompt(loc, view)
    ok = False
    for attempt in (1, 2, 3):
        try:
            data = gen(prompt)
            url = data['data'][0]['url']
            img_r = requests.get(url, timeout=120)
            img_r.raise_for_status()
            png_path.write_bytes(img_r.content)          # 1) 原图大小 PNG, SEO 文件名
            img = Image.open(io.BytesIO(img_r.content))
            if img.mode in ('RGBA', 'LA', 'P'):
                img = img.convert('RGB')
            q, sz = save_webp(img, webp_path, ALT[loc])  # 2) 1200x1200 <120KB webp + alt EXIF
            spent += UNIT_COST
            # 验证 EXIF 回读
            back = Image.open(webp_path)
            exif_desc = (back.getexif().get(0x010E) or back.info.get('exif', b'')) if True else None
            try:
                exif_ok = back.getexif().get(0x010E) == ALT[loc]
            except Exception:
                exif_ok = False
            print('[%d/%d] OK %s raw=%dKB webp=%dKB q=%d exif=%s %.1fs 累计%.2f元' % (
                i, len(ORDER), base, len(img_r.content)//1024, sz//1024, q, exif_ok, time.time()-t0, spent), flush=True)
            results.append({'base': base, 'status': 'OK', 'raw_kb': len(img_r.content)//1024, 'webp_kb': sz//1024, 'q': q, 'exif_ok': bool(exif_ok), 'model': MODEL})
            ok = True
            break
        except Exception as e:
            print('[%d/%d] attempt%d FAIL: %s' % (i, len(ORDER), attempt, str(e)[:160]), flush=True)
            time.sleep(15 * attempt)
    if not ok:
        results.append({'base': base, 'status': 'FAIL'})
    time.sleep(2.5)

ok_n = sum(1 for r in results if r.get('status') == 'OK')
print('\n=== DONE %d/%d, spent %.2f元, %.1f min ===' % (ok_n, len(ORDER), spent, (time.time()-t0)/60), flush=True)
(ROOT / '.hermes' / '_roll_images_results.json').write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding='utf-8')
sys.exit(0 if ok_n == len(ORDER) else 2)
