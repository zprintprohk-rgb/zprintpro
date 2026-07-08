from google.oauth2 import service_account
from googleapiclient import discovery
import httplib2, socks, os, time
from google_auth_httplib2 import AuthorizedHttp

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

urls_to_try = ['sc-domain:zprintpro.com', 'https://zprintpro.com/', 'https://zprintpro.com']

for attempt in range(3):
    print(f"--- attempt {attempt + 1} ---")
    for url in urls_to_try:
        try:
            r = client.sites().get(siteUrl=url).execute()
            print(f"  sites.get({url}): OK permission={r.get('permissionLevel')}")
        except Exception as e:
            print(f"  sites.get({url}): ERR {str(e)[:130]}")
    print()
    if attempt < 2:
        print(f"sleeping 30s...")
        time.sleep(30)
