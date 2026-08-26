"""V21 提示词结构合规性审计 (K3 8/19 拍板)"""
import json, re
from pathlib import Path

SRC = Path(r"F:\zprintpro-nextjs\.hermes\k3-wedding-prompts-C-2026-08-19.json")
d = json.loads(SRC.read_text(encoding='utf-8'))

# V21 spec (per AGENTS.md §13.4 + 8/19 V21 strategy)
V21_REQUIRED_TOKENS = {
    "PRODUCTION-READY FINAL IMAGE ONLY": "前置锚定 (拒绝草稿/多张)",
    "1:1 ratio": "比例 1:1",
    "8K ultra-high-definition": "8K 画质锚",
    "Seedream 5.0": "模型锚 (避免 Seedream 4 误用)",
    "V21 §4.1 main title whitelist": "标题白名单引用",
    "≤ 6 English words": "主标题 ≤6 词",
    "spell 100% correct": "拼写 100% 正确",
    "V21 §4.4 size constraint": "尺寸约束引用",
    "1200x1146": "1200×1146 (1.047:1) 裁切目标",
    "BOTTOM-STRIP": "BOTTOM-STRIP 裁切策略",
    "≤120KB WebP": "WebP ≤120KB",
    "no fine print": "NEGATIVES 1: 无小字",
    "no watermark": "NEGATIVES 2: 无水印",
    "no celebrity faces": "NEGATIVES 3: 无名人脸",
    "no AI generator names": "NEGATIVES 4: 无 AI 名",
}

# View-specific required tokens
VIEW_TOKENS = {
    'HERO':        {'range': (80, 85), 'keyword': 'HERO'},
    'DETAIL':      {'range': (85, 95), 'keyword': 'macro'},
    'VARIETY-C':   {'range': (75, 90), 'keyword': 'tri-panel'},
    'MULTI-ANGLE': {'range': (75, 80), 'keyword': '2x2 grid'},
    'SPREAD':      {'range': (80, 85), 'keyword': 'flat-lay'},
}

# 14 wedding brands (per AGENTS.md 8/19 V21 wedding spec)
WEDDING_BRANDS = [
    'Crescentwood Weddings', 'Ivory Bloom Studio', 'Lumen Brides', 'PaperCrane Brides',
    # 也可能在 en prompt 隐含, 标 0 容差
]

# Char count limits (per K3 8/19)
LANG_LIMITS = {
    'en': {'min_words': 250, 'max_words': 350, 'note': 'en 250-350 词'},
}

# Audit
print('=' * 80)
print('V21 提示词结构合规性审计 - 12 SKU × 待跑 prompts')
print('=' * 80)

total_audit = 0
fail_count = 0
for sku, payload in d.items():
    base = payload['base_filename']
    views = payload['views']
    print(f'\n【{sku}】 base={base}  (需跑 {len(views)} views)')
    for view_name, v in views.items():
        prompt = v['prompt']
        expected = v['expected_filename']
        total_audit += 1
        # Char/word count
        word_count = len(prompt.split())
        char_count = len(prompt)
        # Required tokens check
        missing = []
        for tok, desc in V21_REQUIRED_TOKENS.items():
            if tok not in prompt:
                missing.append(f'{tok} ({desc})')
        # View-specific check
        view_spec = VIEW_TOKENS.get(view_name)
        view_issue = None
        if view_spec:
            keyword = view_spec['keyword']
            if keyword not in prompt:
                view_issue = f"view={view_name} 缺关键词 '{keyword}'"
        # Luxury brand negatives check
        luxury_neg = ['no Tiffany', 'no Gucci', 'no Louis Vuitton', 'no Chanel']
        luxury_in_neg = all(b in prompt for b in luxury_neg)
        # 4 wedding brand detection
        brands_found = [b for b in WEDDING_BRANDS if b in prompt]
        # Status
        status = '✅' if (not missing and not view_issue) else '⚠️'
        if missing or view_issue:
            fail_count += 1
        print(f'  {status} {view_name:12}  {word_count:3}w / {char_count:4}c  → {expected}')
        if brands_found:
            print(f'      brands: {brands_found}')
        if missing:
            print(f'      MISSING: {missing[:3]}{"..." if len(missing)>3 else ""}')
        if view_issue:
            print(f'      VIEW: {view_issue}')
        if not luxury_in_neg:
            print(f'      LUXURY NEG partial: {luxury_neg}')

print(f'\n{"=" * 80}')
print(f'Audit summary: {total_audit} prompts, {fail_count} non-compliant')
print('=' * 80)
