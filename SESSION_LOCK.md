# SESSION_LOCK — 并发会话写锁（看门狗文件）

## 🔒 持有中 — 2026-11-27 15:0x Kimi Work 人手会话（批 Q4：首頁商業詞權重批）

| 项 | 值 |
|---|---|
| **持有者** | Kimi Work 主会话（首席 SEO/AEO/GEO 数据战略分析师执行） |
| **K3 拍板** | 11-27 14:49「拍 Q4，今晚收官前把首頁商業詞權重批推上線」 |
| **寫入範圍** | MainCategoryEntry.tsx（zh-hk AEO 答案句加實體聲明）· analytics.ts（zh-hk H1 雙變體加印刷公司）· seo.ts（zh-hk home description 加香港印刷公司）· blog-data/zh-hk.json（hong-kong-printing-guide → 首頁回鏈 ×2） |
| **禁止範圍** | 單變量只動 zh-hk；不動 title（已含香港印刷公司）；不動 en/ja；價格/承諾語句零新增 |
| **双条件核验** | ① git src/ 淨、無 lane.lock（已驗）；② 距 14:19 push ≥30min，預計 15:2x 推送 |
| **TTL** | 30 min，預計 15:4x 前釋放 |
