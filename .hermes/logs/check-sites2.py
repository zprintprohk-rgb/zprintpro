from google.oauth2 import service_account
from googleapiclient import discovery
import httplib2, socks
from google_auth_httplib2 import AuthorizedHttp
import os, json

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

# try multiple URL variants
candidates = [
    'sc-domain:zprintpro.com',
    'https://zprintpro.com/',
    'http://zprintpro.com/',
    'https://www.zprintpro.com/',
    'https://www.zprintpro.com',
]
for url in candidates:
    # try sites().get()
    try:
        s = client.sites().get(siteUrl=url).execute()
        print(f'get({url}): {json.dumps(s, ensure_ascii=False)}')
    except Exception as e:
        print(f'get({url}): ERR {str(e)[:160]}')

# Now list sitemaps (also permission-tested)
print("\n--- sitemaps list ---")
for url in candidates[:2]:
    try:
        res = client.sitemaps().list(siteUrl=url).execute()
        print(f'sitemaps({url}): {len(res.get("sitemap", []))} sitemap(s)')
    except Exception as e:
        print(f'sitemaps({url}): ERR {str(e)[:200]}')
