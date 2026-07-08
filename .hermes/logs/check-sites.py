from google.oauth2 import service_account
from googleapiclient import discovery
import httplib2, socks
from google_auth_httplib2 import AuthorizedHttp
import os, sys

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

urls = [
    'sc-domain:zprintpro.com',
    'https://zprintpro.com/',
    'https://www.zprintpro.com/',
    'https://zprintpro.com/zh-hk/',
    'https://zprintpro.com/en/',
    'https://zprintpro.com/ja/',
]
for url in urls:
    try:
        s = client.sites().get(siteUrl=url).execute()
        perm = s.get('permissionLevel', '?')
        print(f'OK   {url}  permission={perm}')
    except Exception as e:
        msg = str(e)[:200]
        print(f'FAIL {url}  {msg}')
