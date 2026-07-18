# 301 迁移执行手册 (z-printpro.com → zprintpro.com)

> **批准**: user 2026-07-17 "难度不大,可以执行"
> **原则**: 老站 SaaS 零改动;全部 301 在 Cloudflare 边缘完成;名片 8 条 URL 放弃不迁
> **时间窗**: 8 月开学季前 4 周启动最佳 (排名转移 2-8 周)

## 前置 (Day 1,新站承接)

- [ ] QuoteForm 端点修复 (询盘不能静默流失)
- [ ] educational 类目页教科书 4 元素检查 (H3≥6 / TBL≥2 / DHL / ISO-FSC)
- [ ] rush-printing-delivery 页加微单起送说明
- [ ] 查老域名 DNS 是否有 MX/邮箱记录 (有则迁移时保留)
- [ ] 老站 GSC + 新站 GSC 都已验证 domain 级属性 (Change of Address 需要)

## DNS 迁移 (Day 2-3)

1. Cloudflare 添加站点 `z-printpro.com` (Free 计划)
2. 域名注册商处把 NS 改为 CF 分配的 2 个 NS
3. DNS 生效后 (5 min-24 h),**先只开 DNS 解析(灰云)验证旧站仍可访问** — 确认无误再开橙云代理
4. 若老站有 SSL 由 SaaS 签发,CF SSL 模式先设 Flexible,验证后再 Full

## 301 导入 (Day 3-4)

1. CF Dashboard → Rules → Redirect Rules → **Bulk Redirects** → 新建 List
2. 导入 `analysis-2026-07-17/cloudflare-bulk-redirect.csv` (150 条,已剔除名片)
3. 创建 Bulk Redirect Rule 绑定该 List,状态 301,**保留 query string**
4. 抽查 10 条验证一跳到位:
   ```bash
   curl -sI "https://www.z-printpro.com/products/paper-bag-printing/" | head -3
   # 期望: 301 → https://zprintpro.com/zh-hk/category/paper-bags/ (一跳,不是多跳)
   ```
5. 名片 8 条不建规则 (返回旧站 200 直到 SaaS 到期,或 CF 加 410 规则 — 倾向 410,干净)

## GSC 操作 (Day 4-5)

1. 老站 GSC → 设置 → **Change of Address** → 选 zprintpro.com
2. 新站 GSC 提交 sitemap-index.xml 重新抓取
3. 记录迁移日基线截图 (两站点击/展示/排名)

## 监控 (Day 5 - Week 8)

每周三 gsc-feedback-loop cron 加 3 项:
- [ ] 141 个残杀词: 新站排名均值变化 (目标 8 周内 < 20)
- [ ] 老站展示衰减曲线 (目标 8 周衰减 > 70%)
- [ ] GSC 覆盖率报告: 301 抓取异常 = 0

**回滚条件**: 4 周后新站残杀词排名无任何上升 + 老站流量没转移 → 暂停 Change of Address,排查(大概率是目标页相关性不足,调映射)

## 收尾 (Week 8+)

- [ ] 迁移稳定 → 关 SaaS 自动续费 (2026-10-12 到期前)
- [ ] SaaS 到期后,CF 的 301 规则**继续保留** (域名留着,301 永久生效,成本=域名续费 only)
- [ ] 老域名邮箱若在用 → 迁到 CF Email Routing
