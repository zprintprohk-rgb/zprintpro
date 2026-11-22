# ZP AI 爬蟲 72 小時對賬檢查點（一次性，2026-11-24 13:37）

背景：2026-11-21 13:2x 已通過 Cloudflare API 完成修復（關閉 Bot Fight Mode、AI 爬蟲邊緣放行、新增 2 條 WAF 規則、保留 anti-scrape block），並決定 ai_training 維持 disallow（K3 拍板）。執行單全文：`重要文件/2026-11-21-cloudflare-five-switches-waf-dmca-execution-sheet.md`（§七為執行結果）。

本輪為修復後約 72 小時的對賬檢查點。**只讀核查＋寫報告，不改任何代碼、不 commit、不 push、不改 Cloudflare 設置。**

## 執行步驟

1. 讀取 `重要文件/2026-11-21-cloudflare-five-switches-waf-dmca-execution-sheet.md` 與 `.hermes/backups/cf-ai-waf-20261121/apply-result.json`，提取 11-21 的基線事實。
2. 邊緣三向抽驗（若有 shell 能力則實跑 curl，否則標 NOT EXECUTED，不得假稱已測）：
   - Chrome 真人 UA → 預期 200
   - 空 UA → 預期 403
   - python-requests UA → 預期 403
   另取 https://zprintpro.com/robots.txt 確認 12 類 AI 爬蟲 Allow 仍在、無 Cloudflare Managed 注入。
3. AI 爬蟲真實到訪：若本機 User-scope `CF_API_TOKEN` 仍存在，可用 Cloudflare API 拉取 zone（zone_id=225b44dbbbc31d6cd4bc3ce8b8540f12）相關 metrics；若無法拉取，明確標注「需 K3 到 AI Crawl Control → Metrics 目視確認」，並列出應看的三個指標（GPTBot/OAI-SearchBot/PerplexityBot 的 allowed requests 是否 > 0）。
4. hkprint58 複查：抓取 https://hkprint58.com/sitemap.xml ，與 11-21 基線（lastmod 集中 2026-08-28～10-13）對比，判斷是否仍在更新抄襲頁；首頁「鑫印吧 ZprintPro」殘留是否仍在。
5. DMCA 回執檢查：檢查 `重要文件/dmca-evidence-2026-11-21/` 是否已補 E2 截圖與兩線提交回執；未提交則在報告中置頂提醒 K3。
6. 寫對賬報告：`.hermes/logs/2026-11-24-ai-crawler-72h-recheck.md`，中文，首段必含 `VERDICT / CONSUMED / DELIVERED / NEXT` 四行；所有未能執行的檢查逐項標 NOT EXECUTED 及原因；結尾給出下一步建議（如需調整 WAF 或續跟 DMCA）。
7. 全程中文輸出；不進行任何 src/ 寫入。
