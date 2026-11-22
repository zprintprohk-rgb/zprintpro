# 2026-11-21 P1 真值批执行报告（manual session，非车道产物）

> VERDICT: EXECUTED（P1-1 ✅ / P1-2 ✅ / push ✅ origin main=c93cb09d / 锁已释放）
> CONSUMED: strategy-task-queue READY 队列两项（88/86 分）+ 11-20 §8 日程 11-22 独立核查项（A2 已提前验）
> DELIVERED: 2 个 truth batch commit（2521140 / c93cb09d）+ 6e48429b 一并推送 + 队列回写 + 新 READY 任务 1 项
> NEXT: P1-3（FIX-20261030-BLOG-CERT-PHRASES 全域 + STICKER-PRICE-THREE-LAYER）+ P1-4（verify 脚本 UA 修复）留待下一窗口；线上 build 复验见 §5

## §1 执行窗口与纪律
- 窗口：2026-11-21 17:47–20:05（Asia/Shanghai）
- 锁：preflight --acquire（lane=manual-p1-truth-batch）17:50 持锁；19:51 发现锁已被 19:08 Harness 窗 reclaim 路径释放（staleness 3600s 到期），全程对端零 src 写入（19:28/19:53 双次实测），无双写
- 双条件（§0.35.7）：src clean + 对端 ≥15min 无写入，两次复验均满足
- push：19:50 origin main 13:32→c93cb09d（3 commit 攒批 1 build；≥1 src 行为修复阈值满足；30min 窗口 13:32+ 满足）

## §2 P1-1 海报簇 blog 旧价清毒（FIX-20261113-POSTER-BLOG-TRUTH 第二轮）
- 首论：6a9294d7（今日早些 K3 会话）只覆盖 poster-printing-guide；本批覆盖其餘全部海报簇 blog 面
- poster-printing-price-guide：title「HK$9起」→ 常青「A1 A2 海報印刷價格：單價・紙材・批量折扣全解析 | 智印港」(title-equiv 55, 50-57 合规; 首版 60 超线, 门童口径复核后修剪) + description/重點摘要/數據洞察 对齐已拍板 A2 真值（HK$16/張起·10張HK$160·100張HK$561≈HK$5.6/張·常規1-2工作天·200張或以下11:00前確認即日投產以報價確認·A1三級產品線20/45-56/290）+ 市場詢價表加「第三方口徑僅供參考, 智印港實價以30秒AI報價為準」歸屬聲明 + 最後更新 2026-11
- poster-size-guide：三處「HK$9 起/張」→「HK$16 起/張(10張HK$160)」+ WhatsApp CTA 5-7天→常規1-2天 + description 3-5天→1-2天(以報價確認)
- blog-posts.ts：zh-hk title 鏡像同步
- 驗證：scan-hk9.py 全檔掃（HK$9 非數字後隨）海報簇 0 殘留（其餘 12 處匹配全部為他品類合法價 HK$9-15/HK$9.50/HK$9.36 等）

## §3 P1-2 ja 教育/C109 簇真值批（FIX-20261113-JA-EDUCATION-C109-TRUTH 第二轮）
- 首论：6a9294d7 注明 campus 殘留統計%/USD價格「留給 CERT 任務」但該任務尚未執行 → 本批補齊（D5/D6 範圍）
- campus-education-printing-pillar-guide：全額返金 x4 刪（100%全額返金/ご満足いただけない場合全額返金/100%全額返金または無料再印刷/30日品質保証無條件）+ USD 1-40/部 x2 → SKU 價格表準拠 + 「4認証書類パッケージ提供」無源承諾 x2 → 注文時個別確認 + 24時間対応SLA + 7×24 無源 SLA → 順次回答口徑 + 「100% FSC 認証紙」絕對化 → FSC 認証紙対応 + 未源納期別表（校刊7日等）→ 見積り時確認
- doujin-circle-printing-guide：「1 冊 ¥7,500 起」單價口徑 x2 →「ご注文 ¥7,500〜（指定仕様・数量の注文金額目安）」（對齊 K3 裁決 #5 + comiket 頁 + EXP-1108-JA-DOUJINSHI-UNIT）
- school-exercise-book-printing-guide：description 認證清單（ISO+FSC+FDA+EU REACH）刪 → グローバル顧客対応 + 30日間品質保証 x2 + 30日保証 CTA → 注文時確認 + blog-posts.ts ja 鏡像同步
- comiket-printing-prep-guide：複核 ¥7,500 兩處已正確條件化，零改動
- 驗證：verify-p1-ja.py 目標 slugs 全 0 殘留

## §4 门童與質量
- encoding：UTF-8 LF PASS（兩批）/ gsc-leak：exit 0 / title-v5：HARD=0（WARN=30 與今早基線一致，無新增）/ brand --strict：A類 0 命中 / tsc：exit 0（新基線 0 持平）

## §5 部署與線上復驗
- push：19:50 origin main=c93cb09d（6e48429b+2521140+c93cb09d 三 commit 一次 build）
- verify-deploy.mjs：GitHub API 403 限流（未認證配額），改線上直抓
- 19:57 線上實錘（zh price-guide）：`<title>` 已是新常青標題 ✅；meta description 仍是舊值 → CF build 傳播中（邊緣混雜期）；本報告落地後由下一窗口複驗 desc/body 錨點（HK$561/30秒AI報價為準）+ ja doujin「ご注文 ¥7,500〜」
- ⚠️ 線上副發現（已登記新 READY 任務 FIX-20261121-DOUJIN-RUSH-RESIDUAL）：blog 側欄熱門產品卡 doujinshi zh desc「Comiket 前 24 小時特急対応」+ a4-flyers「最快24小時」title 片段 — products.ts SEO 欄位 rush 殘留（K3 #5 已批條件化口徑，下批執行）

## §6 P1 剩余項（下一窗口）
- P1-3a：FIX-20261030-BLOG-CERT-PHRASES 全域（本批已順帶清 campus/exercise 兩 slug；剩餘 slugs + zh/en 文件 19 詞組 528 次盤點面）
- P1-3b：FIX-20261030-STICKER-PRICE-THREE-LAYER（sticker-buying-guide 價格表撤數字改成本構成）
- P1-4：verify 腳本 curl UA 修復（今日 WAF 新規則攔裸 curl，本批線上驗證兩次踩到；涉及 verify-deploy/探針腳本，動 scripts/ 需避開車道運行窗）
- 11-22 獨立核查剩餘：即日傳單 + small-batch 線上真值斷言（A2 本批 13:58 已驗 ✅）

## §7 SOP-10 五問
1. 架構差異：已核 6a9294d7 首輪邊界（queue target 欄位明示 poster-printing-guide only），本批為第二輪不越界；ja 批對齊 queue 寫域
2. 約束範圍：未觸 title 凍結槽（新 title 走 50-57 當量門童）、未動名片/賀卡資產、未動 301
3. 數據來源：所有新值 = K3 2026-10-30 裁決單#1/#5 + 11-20 拍板單 A2-A8/B1-B9 + 11-13 CT-D1-D6；市場詢價表保留但加第三方歸屬
4. 字段值策略：無自填衝突商業值；modeled 價維持「待工廠實詢」
5. Markdown 渲染：blog content 為 HTML 字串，無 parseInlineLinks 影響

## §8 追加批 P1-1b（19:48 提交 902d685f，本地待推送）
- 線上實錘：`<title>` 已新但 meta description 仍供舊值（HK$6-9/張·3-5天）→ **blog 頁 meta 實際取自 blog-posts.ts（title 與 description 皆然），blog-data json 的 description 欄位不進 meta**（本批重要架構學習，寫入技能缺口）
- poster-printing-price-guide excerpt 三語同步新真值（zh HK$16/HK$160/HK$561/A1 柯式20起/1-2天；en US$2.30/pc·10pc US$23/1-2 business days；ja ¥3,000/10枚·¥300每枚/1-2営業日——USD/JPY 錨 = K3 20:55 覆核 currencyOverrides qty10）
- poster-size-guide title 三語 3-5 天→1-2 天（A6 拍板對齊，1:1 字符替換寬度不變）+ excerpt 三語同步
- guards：encoding PASS / gsc-leak 0
- 部署：隨下一 push 窗口（20:14 後）或晚車道；30min 窗口 19:44 push 後未滿不搶推
- 複驗責任：下一窗口線上斷言 price-guide meta description 新值 + size-guide title「1-2 天」

## §9 11-22 收尾（16:24–16:50，跨日最终推送）
- 隔夜实况：20:13 gsc 车道 fired 但 dsh 会话僵尸 20h（管道死锁），wrapper cmd 21312 非提升会话不可 kill；其产物完整（报告 VERDICT:PARTIAL 全结构 + anomaly JSON + ledger append），16:28 wrapper finalize 因找 2026-11-22 报告未果生成 STALE AUTO-FILL（车道日实为 11-21）
- host-side 收尾（授权依据 §0.35.5「失败也写报告」+ 报告产物完整）：剔除 wrapper STALE 重复 bus 记录 → 写 host-finalize PARTIAL 记录（dsh 20h 僵尸/管道死锁/产物完整/归并说明）→ lane-status 刷新（142 bus records）
- 锁：删除 20:13 遗僵尸 lock（文件级删除成功；进程不可 kill 系权限限制，已记入 bus blocked_reason）
- **P1-4 活探针 UA 修复完成（7a862aee）**：verify-deploy / cron-watchdog / moq10-live-probe / cf-regression-probe / blog-quality-guard 五脚本 → `Mozilla/5.0 (compatible; <id>)`；实测首页 200/221KB/无挑战。probe-live-titles 原本即合规不动
- **rule-translation 门童（#21）拦截与准予放行**：UA 字面量修改触发 2 绑定漂移（blog-12-segment / schema-single-source 共用该 guard）→ 按门童官方口径 `--stamp` 重刷 ledger（rule SSoT/producer 未动，仅门禁 UA 行）→ 三处 sha256 一致放行
- **最终推送**：origin main c93cb09d→**9092ad6c**（7 commit 一次 build：P1-1b 镜像 + 台账×2 + P1-4 + 车道收尾 + docs carry + stamp）
- 遗留：P1-3（cert 全域 + 贴纸三层价）随 11-23/11-24 窗口；k3-review 积压（11-18 起 MISSING）随调度器修复；20:13 gsc 的 A72 confounder 已由车道登记（12-04 判决需单变量归属）

## §10 P1-1c 第四源层修复（17:20 提交 f5170f85，已推送，线上已验证）
- **根因链（§0.23.1「门童 0 命中 ≠ 线上干净」第三实例）**：blog 页 meta description 优先级 = `legacyPost.description`（page.tsx 内联 legacyPosts map）→ blog-data JSON description → blog-posts.ts excerpt → ''。前两批只修 JSON 与 posts.ts 两层，内联 map 优先命中 → 线上 desc 恒旧
- 修复：price-guide/size-guide 内联 map 的 title+description 对齐拍板真值；ja doujin description「コミケ前 24 時間特急」→「特急は見積り確認」
- **线上复验（build 后 17:31）**：meta desc = 「智印港 A2 10 張起印 HK$16/張（10 張 HK$160）、100 張 HK$561（約 HK$5.6/張），A1 柯式 HK$20/張起…」✅ title ✅ body HK$561 ✅；「HK$6-9」仅存于带第三方口径归属的市场询价表（预期保留）
- 固化学习：**blog meta 四层源**（内联 map > JSON description > posts.ts excerpt > slug）+ **线上断言必须拉全页**而非只查源码/单层；已建议 k3-review 后续验收按全页 meta 断言
- 今日 pushes：9092ad6c（7 commit）→ f5170f85（P1-1c）；CF build 均 success
