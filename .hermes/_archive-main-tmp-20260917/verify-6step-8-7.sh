#!/usr/bin/env bash
# 6-step verify for poster-printing-price-guide (per skill Step 3.6)
# Domain: zprintpro.com (zprintprohk.com 已失效)
SLUG="poster-printing-price-guide"
BASE="https://zprintpro.com"
FAIL=0

echo "=== Step 1: zh-hk page 200 OK ==="
R1=$(curl -sI "${BASE}/zh-hk/blog/${SLUG}/" | grep -c "200 OK")
echo "zh-hk 200: $R1"
[ "$R1" -ge 1 ] || FAIL=1

echo "=== Step 2: zh-hk content keyword ==="
C1=$(curl -s "${BASE}/zh-hk/blog/${SLUG}/" | grep -c "海報印刷價格")
echo "zh-hk 海報印刷價格 hits: $C1"
[ "$C1" -ge 1 ] || FAIL=1

echo "=== Step 3: en content keyword ==="
C2=$(curl -s "${BASE}/en/blog/${SLUG}/" | grep -c "poster printing price")
echo "en hits: $C2"
[ "$C2" -ge 1 ] || FAIL=1

echo "=== Step 4: ja content keyword ==="
C3=$(curl -s "${BASE}/ja/blog/${SLUG}/" | grep -c "ポスター印刷料金")
echo "ja hits: $C3"
[ "$C3" -ge 1 ] || FAIL=1

echo "=== Step 5: sitemap contains SLUG ==="
S1=$(curl -s "${BASE}/sitemap-zh-hk.xml" | grep -c "${SLUG}")
echo "sitemap-zh-hk hits: $S1"
[ "$S1" -ge 1 ] || FAIL=1

echo "=== Step 6: FAQ Q: present ==="
F1=$(curl -s "${BASE}/zh-hk/blog/${SLUG}/" | grep -c "Q:")
echo "FAQ Q: hits: $F1"
[ "$F1" -ge 4 ] || FAIL=1

echo ""
if [ "$FAIL" -eq 0 ]; then
  echo "ALL 6 STEPS PASS ✅"
else
  echo "FAILURES DETECTED ❌"
fi
exit $FAIL
