# GSC URL Inspection API 接入 SOP (K3 7/23 00:30 拍板, 8/12 决策点准备)

> **触发**: K3 7/23 00:30 拍板 GSC URL Inspection API 现在接入 (user 选 1)
> **目的**: 8/12 决策点 (P0-2 DEPLOYED 第 4 周) 算精准索引转移率, 不用 GSC 总数据 + 抽样代偿
> **现状**: GSC Search Analytics API 已通 (commit 7924767, 852 行 / 90 天 / 22 点击 / 9,625 展示), URL Inspection API 还没接

---

## 1. GSC Web 端配置 (K3 操作, 1-2 min)

### 步骤 1: 打开 GSC URL Inspection API 文档
- 访问: https://developers.google.com/webmaster-tools/v1/urlInspection.index/inspect
- 确认 service account 已有 `Search Console` 权限 (Restricted 即可, 不需要 Full)

### 步骤 2: 验证 service account 在 GSC property 已有权限
- 打开: https://search.google.com/search-console
- 选 property: `sc-domain:zprintpro.com`
- Settings (左下角齿轮) → Users and permissions
- 找 service account email (e.g. `zprintpro-gsc@xxx.iam.gserviceaccount.com`)
- 验证 Permission: **Restricted** (能跑 URL Inspection API) 或 **Full** (能跑所有)

### 步骤 3: 如 service account 没在 GSC property, 添加
- Settings → Users and permissions → Add user
- 粘贴 service account email
- Permission: **Restricted** (推荐, URL Inspection API 够用)
- Add

---

## 2. Python 脚本 (Mavis 写, K3 拍板后跑)

### 2.1 新脚本: `scripts/url_inspection_check.py`

```python
#!/usr/bin/env python3
"""
GSC URL Inspection API 验证脚本
- 跑 URL Inspection API 验证 149+2 条老 URL 的索引状态
- 用于 P0-2 8/12 决策点算精准索引转移率
"""
import json
import sys
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# 凭证路径 (K3 7/22 commit 7924767 用的)
CREDS_PATH = '.hermes/credentials/gsc-service-account.json'
SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly']
SITE_URL = 'sc-domain:zprintpro.com'

# 149+2 条老 URL (从 149 条 Bulk Redirect CSV 读, + 2 条新规则)
# K3 7/22 21:00 149 条 + 7/23 加 2 条 = 151 条
def load_redirect_csv():
    """从 .hermes/cf-bulk-redirect-list.csv 读 151 条老 URL"""
    with open('.hermes/cf-bulk-redirect-list.csv', 'r') as f:
        return [line.strip() for line in f if line.strip()]

def inspect_url(service, url):
    """跑 URL Inspection API 验证单 URL 索引状态"""
    try:
        request = service.urlInspection().index().inspect(
            body={
                "inspectionUrl": url,
                "siteUrl": SITE_URL
            }
        )
        response = request.execute()
        result = response.get('inspectionResult', {})
        return {
            'url': url,
            'indexed': result.get('indexStatusResult', {}).get('verdict', 'UNKNOWN'),
            'last_crawl_time': result.get('indexStatusResult', {}).get('lastCrawlTime', 'N/A'),
            'coverage_state': result.get('indexStatusResult', {}).get('coverageState', 'N/A'),
        }
    except HttpError as e:
        return {'url': url, 'error': str(e)}

def main():
    creds = service_account.Credentials.from_service_account_file(
        CREDS_PATH, scopes=SCOPES
    )
    service = build('searchconsole', 'v1', credentials=creds)
    
    urls = load_redirect_csv()
    print(f"Total URLs: {len(urls)}")
    
    results = []
    for i, url in enumerate(urls, 1):
        print(f"[{i}/{len(urls)}] Inspecting: {url}")
        result = inspect_url(service, url)
        results.append(result)
    
    # 统计
    indexed_count = sum(1 for r in results if r.get('indexed') == 'PASS')
    not_indexed_count = sum(1 for r in results if r.get('indexed') != 'PASS')
    transfer_rate = (indexed_count / len(results) * 100) if results else 0
    
    summary = {
        'date': '2026-07-23',
        'total': len(urls),
        'indexed_count': indexed_count,
        'not_indexed_count': not_indexed_count,
        'transfer_rate': f"{transfer_rate:.1f}%",
        'results': results,
    }
    
    with open('.hermes/url-inspection-2026-07-23.json', 'w') as f:
        json.dump(summary, f, indent=2)
    
    print(f"\n=== 索引转移率: {transfer_rate:.1f}% ({indexed_count}/{len(urls)}) ===")
    print(f"8/12 决策点: ≥ 50% 健康, < 50% 升级 user")

if __name__ == '__main__':
    main()
```

### 2.2 跑法
```bash
cd F:\zprintpro-nextjs
# K3 改完 2 条 Bulk Redirect 规则, Mavis 跑:
python scripts/url_inspection_check.py --days 14
# 输出: .hermes/url-inspection-2026-07-23.json
# 索引转移率 ≥ 50% = 健康 ✅
```

### 2.3 依赖
- 已有: `google-api-python-client`, `google-auth` (commit 7924767 装的)
- 新增: 0 (URL Inspection API 跟 Search Analytics API 共享 service account 凭证)

---

## 3. 8/12 决策点算式 (K3 拍板后 Mavis 跑)

### 索引转移率 = (老 URL 在新站已索引数) / (老 URL 总数)

```
老 URL 总数: 151 条 (149 + 2)
老 URL 已索引数 (新站): GSC URL Inspection API 查
索引转移率 = indexed_count / 151

8/12 阈值: ≥ 50% = 健康 ✅, < 50% = 升级 user
```

### 7/23 baseline: 0% (P0-2 DEPLOYED 第 1 周, 新站还在索引老 URL 阶段)
- 7/29 cron 跑: 第 1 周 (7 天) 复查
- 8/5 cron 跑: 第 2 周 (14 天) 复查
- 8/12 cron 跑: **第 4 周决策点** (28 天) 索引转移率 ≥ 50%?

### 加速索引建议 (K3 8/12 前拍板)
- GSC URL Inspection API 跑 Request Indexing (新站 151 条对应新 URL)
- sitemap.xml 提交 + IndexNow 推送
- 内链从 14 类目页 + 7 篇 blog 指向 151 条新 URL

---

## 4. 时序 (K3 拍板后 Mavis 跑)

```
K3 7/23 00:30 拍板 GSC URL Inspection API 接入
  ↓
K3 7/23 0X:XX 在 GSC Web 验证 service account Restricted 权限 (2 min)
  ↓
K3 通知 Mavis 权限已 verify
  ↓
Mavis 写 url_inspection_check.py 脚本 (10 min)
  ↓
Mavis 跑: 151 条老 URL 索引状态 (10-20 min, 跟 quota limit)
  ↓
Mavis 写 .hermes/url-inspection-2026-07-23.json (instant)
  ↓
7/29 cron 跑: gsc-feedback-loop §3.2 段 5 项监控, 顺带跑 URL Inspection 复查 (跟 7/23 baseline 对比)
  ↓
8/12 cron 跑: 索引转移率 ≥ 50% 健康阈值判定
```

---

## 5. 失败 fallback (K3 7/22 21:05 拍板本地 proxy 已够, URL Inspection API 失败走 fallback)

- GSC URL Inspection API 失败 (3 次重试) → 切 fallback: 用 GSC Search Analytics 总数据 + 抽样 5/10 条新 URL 索引状态代偿
- fallback 写日报"§0 数据源状态"段标注 "URL Inspection API fallback"
- 跟 GSC API fallback 模式一致 (本地 proxy 127.0.0.1:7892 已通, URL Inspection API 应该不挂)

---

**K3 拍板后通知 Mavis**: 1 段简短话 "GSC service account 权限 verify OK" 或 "GSC service account 已加 Restricted 权限"
**Mavis 触发**: 写 url_inspection_check.py 脚本 + 跑 + 写 .hermes/url-inspection-2026-07-23.json
**不 commit**: scripts/url_inspection_check.py + .hermes/url-inspection-2026-07-23.json (等 7/29 cron 跑后 commit + push 1 次)
