#!/usr/bin/env bash
# v9.1 闸一自验六条 (执行卡 §5) — Git Bash 执行
# 判定: ①④⑤ 无输出行=过; ② ≥1 过; ③ ≥1 过; 锁定三 diff 为空=过; ⑥ build:cf 单独后台跑
cd "$(dirname "$0")/.." || exit 1

echo '=== LOCK3: git diff main --stat -- src/data/ messages/ (输出为空 = PASS) ==='
git diff main --stat -- src/data/ messages/
echo '=== LOCK3 END ==='

echo '=== GATE1: 字号白名单外 font-size (无输出行 = PASS) ==='
git diff main -U0 -- ":(literal)src/app/[locale]" | grep '^+' | grep -E 'font-size:' | grep -vE 'font-size:\s*(12|13|14|15|16|17|18|19|20|22|27|42)px' | head -5
echo '=== GATE1 END ==='

echo '=== GATE2: aspect-ratio 1/1 计数 (>=1 = PASS) ==='
git diff main -U0 -- ":(literal)src/app/[locale]" | grep '^+' | grep -c 'aspect-ratio:\s*1/1'
echo '=== GATE2 END ==='

echo '=== GATE3: PDP 路由 images/factory/ 计数 (>=1 = PASS) ==='
grep -c 'images/factory/' "src/app/[locale]/product/[slug]/page.tsx"
echo '=== GATE3 END ==='

echo '=== GATE4: 禁词 (无输出行 = PASS) ==='
git diff main -U0 -- ":(literal)src/app/[locale]" | grep '^+' | grep -iE '名片|咭片|business.?card|名刺|name.?card|SEO 主內容|可見正文|內部標注|kicker">AEO' | head -5
echo '=== GATE4 END ==='

echo '=== GATE5a: 卡面原版命令 (记录其在本机 Git Bash 的实际表现) ==='
git diff main -U0 -- ":(literal)src/app/[locale]" | grep '^+' | grep -aP '\x{FFFD}|\xc3\xa3\xe2\x82\xac|\xc3\xa5' | head -5
echo "gate5a exit=$?"
echo '=== GATE5a END ==='

echo '=== GATE5b: 字节级等价检测 (U+FFFD=UTF-8 EF BF BD + 卡面 mojibake 字节序列, 无输出行 = PASS) ==='
git diff main -U0 -- ":(literal)src/app/[locale]" | grep '^+' | grep -aP '\xEF\xBF\xBD|\xc3\xa3\xe2\x82\xac|\xc3\xa5' | head -5
echo '=== GATE5b END ==='

echo '=== ALL GATES DONE (GATE6 = build:cf, 后台作业单独执行) ==='
