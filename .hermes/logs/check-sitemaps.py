from google.oauth2 import service_account
from googleapiclient import discovery
import httplib2, socks
from google_auth_httplib2 import AuthorizedHttp
import os

os.environ.setdefault('GOOGLE_API_PROXY', 'http://127.0.0.1:7892')
creds = service_account.Credentials.from_service_account_file(
    'C:/Users/Administrator/gsc-key.json',
    scopes=['https://www.googleapis.com/auth/webmasters.readonly'],
)
proxy = os.environ['GOOGLE_API_PROXY'].replace('http://', '')
host, port = proxy.split(':')
http = httplib2.Http(proxy_info=httplib2.ProxyInfo(socks.PROXY_TYPE_HTTP, host, int(port)))
authed = AuthorizedHttp(creds, http=http)
client = discovery.build('searchconsole', 'v1', http=authed, cache_discovery=False)

print('=== sitemaps/list (each candidate) ===')
for url in ['sc-domain:zprintpro.com', 'https://zprintpro.com/', 'https://zprintpro.com', 'https://www.zprintpro.com/', 'https://www.zprintpro.com']:
    try:
        r = client.sitemaps().list(siteUrl=url).execute()
        sitemaps = r.get('sitemap', [])
        print(f'{url}: OK ({len(sitemaps)} sitemap(s))')
        for sm in sitemaps[:3]:
            print(f'  - {sm.get("path")} | submitted={sm.get("lastSubmitted")} | pending={sm.get("isPending")} | errors={sm.get("errors")} | warnings={sm.get("warnings")}')
    except Exception as e:
        print(f'{url}: ERR {str(e)[:150]}')
