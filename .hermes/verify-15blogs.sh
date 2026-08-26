@echo off
setlocal
set SLUGS=baby-food-packaging-box-printing-guide real-estate-flyer-printing-guide medical-device-packaging-box-guide auto-parts-shopping-bag-printing-guide sports-merchandise-gift-box-printing-guide
set LOCALES=zh-hk en ja
set OUTFILE=F:\zprintpro-nextjs\.hermes\verify-15blogs-out.txt
echo === 5 blogs x 3 locales verify === > "%OUTFILE%"
for %%s in (%SLUGS%) do (
  for %%l in (%LOCALES%) do (
    set URL=https://zprintpro.com/%%l/blog/%%s/
    echo Checking %%l/blog/%%s/ >> "%OUTFILE%"
    curl.exe -sI -L !URL! --max-time 30 2>&1 | findstr /C:"HTTP/" >> "%OUTFILE%"
  )
)
echo === schema check (zh-hk/baby-food) === >> "%OUTFILE%"
curl.exe -s "https://zprintpro.com/zh-hk/blog/baby-food-packaging-box-printing-guide/" --max-time 30 2>&1 | findstr /C:"Article" /C:"BreadcrumbList" /C:"FAQPage" >> "%OUTFILE%"
type "%OUTFILE%"
