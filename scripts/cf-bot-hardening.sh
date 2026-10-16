#!/usr/bin/env bash
# cf-bot-hardening.sh — zprintpro.com Cloudflare 反爬加固 (K3 2026-10-16 拍板)
#
# 前置：export CLOUDFLARE_API_TOKEN=<zone 级 token>  CF_ZONE_ID=<zprintpro.com 的 zone id>
#   token 权限需要：Zone.Bot Management / Zone.WAF / Zone.Config 写权限。
#   本仓库与运行环境均无该 token（2026-10-16 已查），需 K3 在 CF 后台生成后执行本脚本一次。
#
# 动作（全部幂等可重复执行）：
#   1. 开启 Bot Fight Mode（免费版即可，拦已知爬虫/自动化流量）
#   2. WAF 自定义规则：拦截空 UA / 常见 scraper UA（python-requests/curl/wget/scrapy/headless 等）
#   3. 速率限制：单 IP 每分钟 >120 次请求则 challenge（Googlebot 等验证 bot 不受 Bot Fight Mode 误伤）
#
# 注意：合法搜索引擎 UA（Googlebot/Bingbot）不在拦截列表；Bot Fight Mode 只拦未验证的自动化流量。
set -euo pipefail
: "${CLOUDFLARE_API_TOKEN:?export CLOUDFLARE_API_TOKEN first}"
: "${CF_ZONE_ID:?export CF_ZONE_ID first}"
API="https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}"
AUTH=(-H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" -H "Content-Type: application/json")

echo "== 1. Bot Fight Mode =="
curl -sS -X PUT "${API}/bot_management" "${AUTH[@]}" \
  --data '{"fight_mode":true,"enable_js":true,"suppress_session_score":false}' | python -c "import sys,json;d=json.load(sys.stdin);print('success:',d.get('success'))"

echo "== 2. WAF 自定义规则：scraper UA 拦截 =="
curl -sS -X POST "${API}/rulesets/phases/http_request_firewall_custom/entrypoint" "${AUTH[@]}" \
  --data '{
    "rules": [{
      "action": "block",
      "description": "anti-scrape: block empty/scraper UA (2026-10-16 hkprint58 incident)",
      "enabled": true,
      "expression": "(http.user_agent eq \"\") or (http.user_agent contains \"python-requests\") or (http.user_agent contains \"Scrapy\") or (http.user_agent contains \"curl/\") or (http.user_agent contains \"Wget\") or (http.user_agent contains \"Go-http-client\") or (http.user_agent contains \"HeadlessChrome\") or (http.user_agent contains \"HTTrack\")"
    }]
  }' | python -c "import sys,json;d=json.load(sys.stdin);print('success:',d.get('success'))"

echo "== 3. 速率限制：单 IP 120 req/min 以上 challenge =="
curl -sS -X POST "${API}/rulesets/phases/http_ratelimit_security/entrypoint" "${AUTH[@]}" \
  --data '{
    "rules": [{
      "action": "managed_challenge",
      "description": "anti-scrape: rate limit 120rpm per IP (2026-10-16)",
      "enabled": true,
      "expression": "(http.request.uri.path contains \"/images/\") or (http.request.uri.path contains \"/category/\") or (http.request.uri.path contains \"/product/\")",
      "ratelimit": {"characteristics": ["ip"], "period": 60, "requests_per_period": 120, "mitigation_timeout": 600}
    }]
  }' | python -c "import sys,json;d=json.load(sys.stdin);print('success:',d.get('success'))"

echo "done. 验证：CF Dashboard → Security → Bots / WAF / Rate limiting 应各见 1 条。"
