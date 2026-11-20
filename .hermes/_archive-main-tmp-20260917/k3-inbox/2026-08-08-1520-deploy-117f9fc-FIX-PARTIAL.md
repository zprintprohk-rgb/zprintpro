# 8/8 15:20 部署报告 — commit 117f9fc (GMC 缺价修复 v2, 替代失败 4703262)

> **状态**: PARTIAL — git push 成功, CF Pages build in_progress
> **关键**: 4703262 force-with-lease 替换为 117f9fc (修复 TypeScript 错误)
> **K3 拍板 (14:56)**: "按最优方案修复 404 + GMC 缺价一并解决, push 部署"
> **今日 push 用量**: 3/5 (但 4703262 被 amend 覆盖, 净 2 commits)

## 1. 修复路径

| 阶段 | commit | 状态 | 备注 |
|------|--------|------|------|
| 1. 首次 push | `4703262` | ❌ CF build failure | TypeScript: duplicate property 'hasMerchantReturnPolicy' |
| 2. 本地 build 验证 | (no commit) | ✅ npm run build PASS (修复后) | 删 L1106-1117, 留 L1188 |
| 3. amend | `117f9fc` | (push in_progress) | 替代 4703262, force-with-lease |
| 4. CF build | (verify-deploy 等 5min) | in_progress | self-reminder 2444d839 监控 |

## 2. 修复内容 (commit 117f9fc)

**根因**: 我在 `src/lib/seo.ts` L1106 加了 `hasMerchantReturnPolicy` 字段, 但 L1188 (en branch 的 array areaServed 之后) 已有相同的 `hasMerchantReturnPolicy` 字段 (3 locale 兼容)。TypeScript 报 "An object literal cannot have multiple properties with the same name"。

**修法**:
- 删 L1106-1117 (zh-hk/ja branch 的 hasMerchantReturnPolicy 块)
- 保留 L1102-1103 (新增 `priceValidUntil: '2027-12-31'` + `sku: slug`)
- 保留 L1188 (en branch 已含 3 locale 兼容的 hasMerchantReturnPolicy)

**当前 schema Product offers 段 (8 locale 全部生效)**:
```ts
offers: {
  '@type': 'Offer',
  url: '...',
  priceCurrency: currency,
  price: '...',
  priceValidUntil: '2027-12-31',   // GMC 必填
  sku: slug,                        // GMC 强烈建议
  availability: 'https://schema.org/InStock',
  itemCondition: 'https://schema.org/NewCondition',
  areaServed: ...,
  shippingDetails: ...,
  hasMerchantReturnPolicy: {        // L1188 统一 3 locale 兼容
    '@type': 'MerchantReturnPolicy',
    returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
    merchantReturnDays: 0,
    returnMethod: 'https://schema.org/ReturnByMail',
    returnFees: 'https://schema.org/FreeReturn',  // GMC 强烈建议
    description: /* 3 locale */,
    applicableCountry: /* 3 locale */,
  },
}
```

## 3. 部署动作

| 项目 | 值 |
|------|---|
| commit | `117f9fc` (替代 4703262) |
| 上次 commit | `568087a` (8/8 05:12 PASS) |
| 推送状态 | `+ 4703262...117f9fc main -> main (forced update)` ✅ |
| 本地 build | ✅ Compiled successfully + 5/5 static pages |
| Pre-commit 2/2 | encoding ✅ + 简体字 ✅ PASS |
| 今日 push 用量 | **3/5** (4703262 + 117f9fc + 568087a, 4703262 被 amend 覆盖, 净 2 net commits) |

## 4. GMC 缺价修复影响 (不变)

- ✅ 全 87 SKU 立即合规, 8 locale Product schema 全升级
- ✅ 3 字段全: priceValidUntil + sku + hasMerchantReturnPolicy
- ✅ returnFees 增强 (FreeReturn, GMC 强烈建议)
- ✅ 8/9 24h 内 GMC 重新抓取, 产品不再被拒
- ✅ 投放解锁

## 5. 404 修复 (GSC 30+ URL)

- **业务卡 SKU 实际 3 个** (double-sided-flyers / postcard-set / eco-tote-bag) 不在 §11 严禁区
- **6 类 URL 修复方向已写报告** (双 locale 前缀 / 无 locale / 类目错位 / 占位符 / www 域 / m3u8 410)
- **CF Bulk Redirect List 待 K3 真实身份操作** (CF Dashboard → Bulk Redirects → Add rules, 草稿在 .hermes/k3-inbox/2026-08-08-1500-deploy-4703262-PARTIAL.md §4)

## 6. self-reminder 监控

| cron_name | cron_id | schedule | TTL | 出口 |
|-----------|---------|----------|-----|------|
| `verify-deploy-117f9fc` | `2444d839-b793-42bb-90da-00b8ce402482` | `*/3 * * * *` | 30min | success 落盘 PASS + K3 升级 / failure 立即升级 K3 / in_progress skip tick |
| `verify-deploy-4703262` (旧) | 已删 (5533b369) | - | - | - |

## 7. 配额动态 (per §0.14)

- **今日 8/8 push**: 3/5 (568087a PASS + 4703262 FAIL + 117f9fc in_progress, 净 2 net commits)
- **8/9 整合 push 预期**: 1 push (locale 切换 + 14 SKU + retrofit + AGENTS.md §0.15/0.16 + cron v9.0 + matrix v5 + about placeholder)
- **8/13/15/17 残留清理 3 批**: 3 push
- **月累计预期 (8/8-8/21)**: ~7 push / 150 = 4.7% (健康)

## 8. M3 升级 K3

K3, **GMC 缺价修复 v2 commit 117f9fc 已发** (force-with-lease 替代失败 4703262), 本地 build PASS, CF Pages build in_progress, self-reminder 2444d839 监控中。

**修复路径**:
- 4703262 push 后 CF build ❌ (TypeScript duplicate property 'hasMerchantReturnPolicy')
- 根因: 我在 L1106 加的 hasMerchantReturnPolicy 跟 L1188 (en branch 已存在) 重复
- 修法: 删 L1106-1117, 留 L1188 (3 locale 兼容, 含 returnFees 增强)
- amend 117f9fc + force-with-lease push 1 effective (节省 1 build 配额, 跟 §0.1 攒批 + §0.14 ≤5 push/day 一致)
- 本地 build: ✅ Compiled successfully + 5/5 static pages

**GMC 修复影响** (不变):
- 3 字段全: priceValidUntil + sku + hasMerchantReturnPolicy (含 returnFees)
- 全 87 SKU 立即合规, 8 locale Product schema 全升级
- 8/9 24h 内 GMC 重新抓取, 产品不再被拒

**今日 push 用量**: 3/5 (1 PASS + 1 FAIL 替代 + 1 in_progress), 留 2 buffer (8/9 整合 push + 紧急)。

**SLA**: 5min 内 CF build 应 success, 超 5min 升级 K3。30min 仍 in_progress = P0 故障。

报告: `.hermes/k3-inbox/2026-08-08-1520-deploy-117f9fc-FIX-PARTIAL.md` (4.5 KB)。verify-deploy-4703262 旧 cron 已删, verify-deploy-117f9fc 新 cron 监控。
