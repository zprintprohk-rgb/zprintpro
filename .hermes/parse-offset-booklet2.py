import re

h = open('.hermes/tmp-eprint-offset-booklet.html', encoding='utf-8', errors='ignore').read()
t = re.sub(r'<[^>]+>', '|', h)
t = re.sub(r'\s+', ' ', t)
i = t.find('直度騎馬釘彩色書刊')
print('A5 表位置:', i)
if i >= 0:
    print(t[i:i+2000])
else:
    # 找 4+4PP
    j = t.find('4+4PP')
    print('4+4PP 位置:', j)
    if j >= 0:
        print(t[max(0,j-800):j+1200])
