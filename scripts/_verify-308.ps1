# Verify 308 redirect via Invoke-WebRequest (PowerShell 5.1 compatible)
$ProgressPreference = 'SilentlyContinue'
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12

# Disable cert validation for this script only
add-type @"
using System.Net;
using System.Security.Cryptography.X509Certificates;
public class TrustAllCertsPolicy : ICertificatePolicy {
  public bool CheckValidationResult(ServicePoint sp, X509Certificate cert, WebRequest req, int problem) { return true; }
}
"@
[System.Net.ServicePointManager]::CertificatePolicy = New-Object TrustAllCertsPolicy

$urls = @(
  'https://zprintpro.com/zh-hk/category/others/',
  'https://zprintpro.com/en/category/others/',
  'https://zprintpro.com/ja/category/others/',
  'https://zprintpro.com/zh-hk/category/others',
  'https://zprintpro.com/zh-hk/others/',
  'https://zprintpro.com/zh-hk/category/flyers/',
  'https://zprintpro.com/en/category/flyers/',
  'https://zprintpro.com/ja/category/flyers/'
)

Write-Host '=== 5 步真 verify · STEP 3: curl 308 + flyers 200 ==='
foreach ($url in $urls) {
  try {
    $r = Invoke-WebRequest -Uri $url -Method Head -UseBasicParsing -TimeoutSec 20 -MaximumRedirection 0 -ErrorAction Stop
    $loc = $r.Headers['Location']
    Write-Host ("{0,-58} : {1} {2}" -f $url, $r.StatusCode, $loc)
  } catch {
    $code = $null
    if ($_.Exception.Response) {
      $code = [int]$_.Exception.Response.StatusCode
      $loc = $_.Exception.Response.Headers['Location']
      Write-Host ("{0,-58} : {1} {2}" -f $url, $code, $loc)
    } else {
      Write-Host ("{0,-58} : ERROR {1}" -f $url, $_.Exception.Message.Substring(0, [Math]::Min(60, $_.Exception.Message.Length)))
    }
  }
}
