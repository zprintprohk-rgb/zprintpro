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

---

## 执行记录 2026-07-21 01:30-02:10 (K3 via WebBridge)

**状态: 除阿里云 NS 提交外全部就绪, NS 值已填入待用户确认。**

| 资源 | ID / 值 |
|---|---|
| CF zone (z-printpro.com) | `32ec1b9381d610d866c22aab4865ed79` (status: pending) |
| 分配的 NS | `amalia.ns.cloudflare.com` / `kevin.ns.cloudflare.com` |
| Bulk Redirect List | `z_printpro_legacy_301` = `02bad76ee5d94974a232ca81da199e4a` |
| 清单条目 | **149 条, 全部 status_code=301, preserve_query_string=true** (API 核验 count=149, bad=0) |
| 账号级 bulk redirect ruleset | `6ad7203adbb348edacdf06ff752615db` (1 rule, enabled, expression `http.request.full_uri in $z_printpro_legacy_301`) |
| zone 级裸域名 catch-all ruleset | `140edd478e414178b03be0478829f374` (`http.host eq "z-printpro.com"` → https://zprintpro.com/zh-hk/ 301) |
| DNS 记录 (已代理 orange cloud) | www CNAME→www.z-printpro.com.queniuaa.com, @ CNAME→ali-hk-66.bjyyb.net |
| 保留记录 | _dnsauth TXT (SaaS验证), google-site-verification TXT (GSC 验证需要) |

**CSV 变更**: 149 条 (原 150 - 删名片价格指南博客 1 条; 名信片信封产品从 educational 改指 envelopes); 去 BOM。23 个目标 URL 全部 curl 200。

**域名到期警告**: z-printpro.com 2026-08-17 到期 (剩 26 天), 阿里云控制台显示"急需续费"。注册商仍是阿里云, NS 迁 CF 不影响续费, 但必须本周内续。

**坑记录**:
- CF dashboard 向导 UI 不稳定 (cookie 同意弹窗拦截点击 + React 受控组件 fill 不触发状态) → 最终全程走 `dash.cloudflare.com/api/v4/` 内部会话代理 fetch, 稳定可靠。
- 清单名只允许 `[a-z0-9_]` (连字符不行) — 向导因此静默拒绝 Next。
- Bulk Redirect ruleset 在**账号级** phase `http_request_redirect`; zone 级单条重定向用 phase `http_request_dynamic_redirect` + `action_parameters.from_value`。
- 阿里云域名列表正确入口: dc.console.aliyun.com → 左侧「域名列表」(#/domain-list/all)。

**剩余步骤** (等用户确认 NS 提交后):
1. 阿里云点「确定」改 NS → 可能要手机验证码
2. 等 zone 变 Active (dig NS z-printpro.com 或 CF dash 状态)
3. 灰度抽查 10 条: `curl -sI https://www.z-printpro.com/products/paper-bag-printing/` 等 → 期望一跳 301
4. GSC 老站 Change of Address → zprintpro.com (需老站已验证 domain 属性)
5. SaaS (青岛壹通, 2026-10-12 到期) 迁移稳定 8 周后再关闭; CF 301 规则永久保留

---

## 迁移完成记录 2026-07-21 17:10 (K3 via WebBridge)

**🎉 P0-2 301 迁移全部完成:**

| 步骤 | 结果 |
|---|---|
| 阿里云 NS 切换 | ✅ 用户执行, amalia/kevin 已全球生效 (本地+8.8.8.8 双验证) |
| 灰度抽查 | ✅ 21/21 PASS (11 代表类目 + 10 随机), 全部一跳 301 → 正确目标, 目标页全 200 |
| GSC Change of Address | ✅ 已注册: z-printpro.com → zprintpro.com, 请求日期 2026-07-21, 状态「正在迁移」 |
| 基线数据 | F:\z-printpro.com-Performance-on-Search-2026-07-09 (老站 91 天) + 新站 2026-07-17 已存档 |

**GSC 操作坑记录**:
- jsaction 框架对 synthetic JS 事件基本免疫; WebBridge `click` 时灵时不灵 → **`mouse_click` (原始 CDP 鼠标事件) 最可靠**。
- 关键控件可能是隐藏双层渲染: 点击前用 elementFromPoint 校验可见层, 给可见按钮打临时 id 再点。
- combobox 展开: mouse_click 点击输入框即开 (不要依赖 send_keys arrowdown)。
- 验证通过≠完成: 必须再点「确认迁移」, 成功标志 = 页面显示「此网站当前正在迁移 + 取消迁移按钮」。
- 截图 (screenshot action) 是排查 SPA 状态的最可靠手段, 比 innerText/snapshot 可信。

**后续监控** (已并入 zprintpro-gsc-feedback-loop 周三 cron): 老站流量衰减曲线 + 新站承接曲线 + 校园/单张词排名迁移情况。Google 官方口径: 地址更改信号有效期 180 天, CF 301 规则永久保留。

---

## 7/22 21:27 baseline: 5 项监控 + K3 官方 10 样本 8/10 PASS + 2 真异常

**状态**: P0-2 DEPLOYED 第 1 周内首次系统化监控, K3 v5.1 抽样规则建立, 149 条路径级规则覆盖度验证

### 5 项监控脚本
- 路径: `F:\zprintpro-nextjs\.hermes\tmp\cf-301-monitor-2026-07-22.cjs`
- 项 1: 老域 DNS NS 状态 (CF NS = amalia/kevin 生效) → PASS
- 项 2: sitemap.xml 老 URL 残留 = 0 → PASS (576 URLs, 0 残留)
- 项 3: GSC Coverage: 301 抓取异常 = 0 → PASS
- 项 4: 老域 200 直出路径扫描 (裸域 catch-all 兜底验证) → PASS
- 项 5: K3 官方 10 样本抽查 → 8/10 PASS

### K3 官方 10 样本 (清单内 5 + 清单外 5)
**清单内 5 条 (149 条 Bulk Redirect CSV 抽样, 必须一跳 301 精确目标)**:
1. 包装盒 (zh-hk) ✅ 一跳 301 → /zh-hk/category/packaging/
2. 防水贴纸 (en) ✅ 一跳 301 → /en/product/waterproof-stickers/
3. A5 骑马钉 (zh-hk) ✅ 一跳 301 → /zh-hk/product/saddle-stitch-booklets/
4. 婚帖红包 (zh-hk) ✅ 一跳 301 → /zh-hk/product/red-packets/
5. 急件 banner (ja) ✅ 一跳 301 → /ja/product/same-day-flyers/

**清单外 5 条 (走 catch-all 跳 zh-hk/ 是设计行为, 不算异常)**:
6. 随机类目 (en/stickers) ✅ catch-all 跳 /zh-hk/
7. 随机类目 (en/flyers) ✅ catch-all 跳 /zh-hk/
8. ❌ `/business-card-printing/` **200 直出 (真异常)** — AGENTS.md §11 名片禁区矛盾, 但老站 200 直出不被 Bulk Redirect 兜底
9. ❌ `/about-us/` **404 没兜底 (真异常)** — 老站此 URL 已死链, 无对应新站目标
10. 随机页面 (en/quote) ✅ catch-all 跳 /zh-hk/

### 2 真异常 #8 #9 修法 (K3 7/23 00:30 拍板)
- **#8 business-card-printing 200 直出**: 选 A = 加 Bulk Redirect 规则 → /zh-hk/ (跟 149 条同模式, 149→151)
- **#9 about-us 404 没兜底**: 选 A = 加 Bulk Redirect 规则 → /about/ (新站)
- K3 自己在 CF Dashboard 加, Mavis 已准备 .hermes/cf-bulk-redirect-2-new-rules-2026-07-23.md 素材
- 改完通知 Mavis 跑改后 5 项监控 verify 10/10 PASS 闭环

### K3 v5.1 抽样规则 (2026-07-22 21:05 拍板, 写入 context.md §14.2 + gsc-feedback SSoT)
- 清单内任一 FAIL = 真异常升级 user, 排查 149 条规则覆盖度
- 清单外走 catch-all 跳 zh-hk/ 是设计行为, 不算异常
- 清单外 200/404 偏离 catch-all = 真异常升级 user
- 抽样前必查权威 CSV (149 条 Bulk Redirect List), 不存在不要列抽样

### 8 周关键观察期 (P0-2 DEPLOYED 第 1 周 → 第 8 周)
- 第 1 周 (7/22-7/28): 高频监控
- 第 2-3 周 (7/29-8/11): 标准监控
- 第 4 周 (8/12-8/18): **关键决策点: 索引转移率必须 ≥ 50%, 否则升级 user**
- 第 5-8 周 (8/19-9/16): 收尾监控

### 健康度报告
- 完整报告落盘: `F:\zprintpro-nextjs\logs\2026-07-22-cf-301-health-report.md` (10,610 bytes)
- 完整 monitor 日志: `F:\zprintpro-nextjs\logs\2026-07-22-cf-301-monitor.md`
- 完整 K3 10 样本日志: `F:\zprintpro-nextjs\logs\2026-07-22-cf-301-verify-k3-sample.md`

### 教训
- "user 随口举例" 抽样 → 抽样前必查权威源, 不在 CSV 里不列
- sitemap-0.xml 500 bug: Next.js 13+ 默认单 sitemap.xml, 监控 URL 必先 curl 验证
- cron SSoT 改 ≠ daemon 改, 必走 mavis cron update + mavis cron get 3 步曲
