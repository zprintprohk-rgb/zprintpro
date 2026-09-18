import openpyxl, glob, os, sys, io
sys.stdout.reconfigure(encoding='utf-8')

D = r'F:\zprintpro-nextjs\GSC数据'
files = sorted(glob.glob(os.path.join(D, '*2026-09-18.xlsx')))
print('files:', len(files))
for f in files:
    wb = openpyxl.load_workbook(f, read_only=True, data_only=True)
    print('\n########## ' + os.path.basename(f))
    for ws in wb.worksheets:
        rows = ws.iter_rows(values_only=True)
        try:
            hdr = next(rows)
        except StopIteration:
            hdr = None
        n = 0
        for _ in rows:
            n += 1
        print('   sheet=%-22s rows=%-5d hdr=%s' % (ws.title, n, hdr))
    wb.close()
