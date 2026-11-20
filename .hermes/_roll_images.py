# -*- coding: utf-8 -*-
# roll-stickers 生图批 (K3 拍板 seedream AI 生全套) — Ark doubao-seedream-5-0-pro
# 11 张: zh-hk ×3 (hero/detail/multi) + en ×4 + ja ×4 → public/images/products/seedream-webp/ 直出
import json, time, sys, io
from pathlib import Path
from PIL import Image
import requests
sys.stdout.reconfigure(encoding='utf-8')

ROOT = Path(r'F:\zprintpro-nextjs')
OUT_DIR = ROOT / 'public' / 'images' / 'products' / 'seedream-webp'
RAW_DIR = ROOT / '.hermes' / '_roll_raw'
RAW_DIR.mkdir(parents=True, exist_ok=True)
ARK_KEY = 'ark-18a3e74b-6c4b-4e60-a4b2-cc9798b75246-2835b'  # K3 2026-10-12 13:0x 换发（替代已泄露旧 key）
ARK_URL = 'https://ark.cn-beijing.volces.com/api/v3/images/generations'

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

SCENE = {
 'hero': {
  'desc': 'Foreground main product: one tall roll of die-cut labels standing upright with white 4cm cardboard core visible from top, a second roll lying beside it with loose labels unwinding in a gentle curve showing grid backing; in background softly blurred: stainless steel semi-automatic bottle labeling machine on a bright modern production bench, a few amber glass honey jars, clean food-workshop ambience with warm bokeh. Product centered 80-85% of frame, slight angle for depth, strong depth of field, ',
  'views': {'zh-hk': 1, 'en': 1, 'ja': 1},
 },
 'detail': {
  'desc': 'Extreme macro close-up of the label roll edge: precision die-cut contour of a honeycomb-shaped label, fine grid backing texture, one corner of a label lifted showing tacky hot-melt adhesive sheen, crisp matte art paper surface with subtle ink texture, soft bokeh background of warm workshop lights. Extreme close-up 85-95% of frame, raking light reveals surface texture, ',
  'views': {'zh-hk': 2, 'en': 2, 'ja': 2},
 },
 'multi-angle': {
  'desc': 'Three views in one frame - top view showing the 4cm white core winding, side view showing neatly wound labels with grid backing edge, and a single label peeled off lying flat showing full honeycomb artwork and grid backing; on a clean warm wooden surface with soft shadow and warm bokeh. Shows real dimensions, ',
  'views': {'zh-hk': 3, 'en': 3, 'ja': 3},
 },
 'variety': {
  'desc': '3-4 rolls of labels in the same scene, each with a different food-brand design (organic honey, cold brew coffee, yuzu soda, artisan cosmetics), each fully visible, consistent lighting and scale, on a bright studio surface with softly blurred production shelf in warm bokeh, ',
  'views': {'zh-hk': None, 'en': 4, 'ja': 4},
 },
}

TASKS = []
for loc in ('zh-hk', 'en', 'ja'):
    for view, meta in SCENE.items():
        n = meta['views'][loc]
        if n:
            TASKS.append((loc, view, n))

def build_prompt(loc, view):
    meta = SCENE[view]
    return ('1:1 square high-definition e-commerce main image, cinematic film quality. ' + PAL[loc] + ' ' + SUBJ[loc] + ' ' + meta['desc'] + TAIL)

results = []
t0 = time.time()
for i, (loc, view, n) in enumerate(TASKS, 1):
    slug_name = 'zprintpro-stickers-roll-stickers-%s-%d.webp' % (loc, n)
    webp_path = OUT_DIR / slug_name
    if webp_path.exists():
        print('[%2d/%d] skip existing %s' % (i, len(TASKS), slug_name))
        continue
    prompt = build_prompt(loc, view)
    body = {'model': 'doubao-seedream-5-0-pro-260628', 'prompt': prompt, 'response_format': 'url',
            'size': '1536x1536', 'stream': False, 'watermark': False, 'n': 1, 'quality': 'high', 'output_format': 'png'}
    headers = {'Authorization': 'Bearer %s' % ARK_KEY, 'Content-Type': 'application/json'}
    ok = False
    for attempt in (1, 2, 3):
        try:
            r = requests.post(ARK_URL, json=body, headers=headers, timeout=120)
            if r.status_code in (403, 429):
                print('  %d RATE LIMIT 退避 60s...' % r.status_code)
                time.sleep(60)
                continue
            r.raise_for_status()
            data = r.json()
            url = data['data'][0]['url']
            img_r = requests.get(url, timeout=60)
            img_r.raise_for_status()
            raw_path = RAW_DIR / ('roll_%s_%d.png' % (loc, n))
            raw_path.write_bytes(img_r.content)
            img = Image.open(io.BytesIO(img_r.content))
            if img.mode in ('RGBA', 'LA', 'P'):
                img = img.convert('RGB')
            img.resize((1200, 1200), Image.LANCZOS).save(webp_path, 'WEBP', quality=75, method=6)
            sz = webp_path.stat().st_size
            print('[%2d/%d] OK %s webp=%dKB %.1fs' % (i, len(TASKS), slug_name, sz//1024, time.time()-t0))
            results.append({'loc': loc, 'view': view, 'n': n, 'status': 'OK', 'webp_bytes': sz})
            ok = True
            break
        except Exception as e:
            print('[%2d/%d] attempt%d FAIL: %s' % (i, len(TASKS), attempt, str(e)[:100]))
            time.sleep(10 * attempt)
    if not ok:
        results.append({'loc': loc, 'view': view, 'n': n, 'status': 'FAIL'})
    time.sleep(2.5)

ok_n = sum(1 for r in results if r['status'] == 'OK')
print('\n=== DONE: %d/%d OK, %.1f min ===' % (ok_n, len(TASKS), (time.time()-t0)/60))
(ROOT / '.hermes' / '_roll_images_results.json').write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding='utf-8')
