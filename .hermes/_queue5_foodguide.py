# -*- coding: utf-8 -*-
"""项5: 食品包裝完全指南 12 段骨架升级 (zh) + en/ja qa/裡印/CRED"""
import io, os, json, re, shutil, sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BAK = os.path.join(REPO, ".hermes", "_bak-foodguide-20261020")
os.makedirs(BAK, exist_ok=True)
Q = '"'  # 解析后内容用普通引号; 写回时由 json.dumps 转义

def A(href, text, cls=''):
    c = (' class=' + Q + cls + Q) if cls else ''
    return '<a href=' + Q + href + Q + c + '>' + text + '</a>'

def load(l):
    p = os.path.join(REPO, "src", "data", "blog-data", l + ".json")
    with io.open(p, "r", encoding="utf-8", newline="") as f:
        raw = f.read()
    return p, raw, json.loads(raw)

def replace_content_value(raw, slug, new_content):
    """只替换指定 slug 的 content 字符串值, 其余字节原封不动"""
    si = raw.find('"' + slug + '": {')
    if si < 0:
        si = raw.find('"' + slug + '":{')
    assert si > 0, 'slug not found: ' + slug
    ci = raw.find('"content"', si)
    assert ci > 0
    vi = raw.find(':', ci) + 1
    while raw[vi] in ' \t\r\n':
        vi += 1
    assert raw[vi] == '"', 'content value not a string'
    k = vi + 1
    while k < len(raw):
        ch = raw[k]
        if ch == '\\':
            k += 2
            continue
        if ch == '"':
            break
        k += 1
    new_val = json.dumps(new_content, ensure_ascii=False)
    out = raw[:vi] + new_val + raw[k + 1:]
    json.loads(out)
    return out

def save(p, raw, name):
    bp = os.path.join(BAK, name + ".before")
    if not os.path.exists(bp):
        shutil.copy2(p, bp)
    with io.open(p, "w", encoding="utf-8", newline="") as f:
        f.write(raw)

def h2_count(c):
    return len(re.findall(r"<h2", c))

# ================= zh-hk =================
p, raw, j = load("zh-hk")
c = j["food-packaging-printing-guide"]["content"]
n0, h0 = len(c), h2_count(c)

# 1) 断裂外链 + CRED
bad = '<a href="https://www. .com/company/zprintpro" target="_blank" rel="noopener"> </a>'
assert c.count(bad) == 1, "broken link match " + str(c.count(bad))
c = c.replace(bad, A('/zh-hk/about/', '關於智印港'))
if '服務 1,000+ 品牌客戶' in c:
    c = c.replace('服務 1,000+ 品牌客戶', '服務全球品牌客戶')

# 2) 定義段前置
H_DEF = '食品包裝印刷是什麼？30 秒速讀定義'
H_FLOW = '落單流程係點？檔案要咩規格？'
def h2_start(text):
    i = c.find(text)
    assert i > 0, 'h2 not found: ' + text
    return c.rfind('<h2', 0, i)
d0 = h2_start(H_DEF); d1 = h2_start(H_FLOW)
assert d0 < d1
def_block = c[d0:d1]
c = c[:d0] + c[d1:]
c = c.replace('<h2', def_block + '<h2', 1)

# 3) 三段补齐
SEC_BOX = (
    '<h2>食品包裝盒型點揀？8 檔標準尺寸同結構重點</h2>\n'
    '<p>盒型決定成本結構：標準盒型可直接套用共用刀模，免開模費同免排版費，交期亦最快。常見食品盒型包括：</p>\n'
    '<ul>'
    '<li><strong>天地蓋（上下蓋）</strong>：最常見禮盒結構，開合手感佳，適合月餅、曲奇、茶葉禮盒。</li>'
    '<li><strong>插口式彩盒</strong>：一體成型免黏合，量產效率高，適合餅乾、朱古力、糖果。</li>'
    '<li><strong>自鎖底（扣底）盒</strong>：底部自動扣合，承重好，適合較重的食品組合裝。</li>'
    '<li><strong>抽屜盒／書型盒</strong>：硬盒結構，適合高端禮盒同企業訂製。</li>'
    '<li><strong>窗貼盒</strong>：開窗＋PET 窗片，讓消費者直接見到產品，適合烘焙同手工食品。</li>'
    '</ul>\n'
    '<p>食品包裝訂製 100 個起印，8 檔標準尺寸可直接落單；特殊尺寸可按刀模線開模，開模前會先出白樣確認結構。想睇實際盒型對比，可參考'
    + A('/zh-hk/blog/kraft-paper-box-types-comparison-2026/', '牛皮紙盒 vs 坑盒 vs 彩盒 8 大盒型對比')
    + '，或直接查看' + A('/zh-hk/product/food-boxes/', '食品包裝盒') + '規格頁。</p>\n'
)
SEC_LIYIN = (
    '<h2>內側印刷（裡印）會唔會影響食品安全？</h2>\n'
    '<p>裡印係印在包裝內側的工藝，常用於開箱品牌體驗（內側標語、品牌色、序號）。關鍵係油墨同食品之間要有阻隔層：直接接觸食品的內側印刷，可安排食品級油墨並以 PE 淋膜保護印刷面；如果只做外印＋內層淋膜，同樣符合間接接觸要求。</p>\n'
    '<p>實務上落單時註明「內側需印刷」即可，兩種方案會在一次免費打稿中一併確認版面同阻隔結構；食品級油墨同淋膜規格可對照 FDA 21 CFR 176.170 同 GB 4806.8-2022 的要求核對。詳見'
    + A('/zh-hk/product/food-boxes/', '食品包裝盒') + '頁的內側印刷說明。</p>\n'
)
SEC_MISTAKE = (
    '<h2>5 個食品包裝印刷常見誤區</h2>\n'
    '<ul>'
    '<li><strong>誤區 1：有 FDA 認證就等於包裝安全</strong>——FDA 21 CFR 176.170 規管的是「紙同紙板與水性／油性食品接觸」的組分要求，唔係對某一批包裝發證；落單時要講清楚接觸的食品類型（乾性／油性／水性）。</li>'
    '<li><strong>誤區 2：設計稿用 RGB 都可以直接印</strong>——印刷用 CMYK，RGB 稿要轉色並校對專色，直接輸出容易偏色，尤其品牌色（紅、金）偏差最明顯。</li>'
    '<li><strong>誤區 3：數量越小越平</strong>——數量細時單價最高，因為開機、調墨、刀模分攤固定成本；同尺寸盒型用拼版可攤薄成本。</li>'
    '<li><strong>誤區 4：淋膜就一定防水防油</strong>——淋膜厚度同材質決定防護級別，盛載熱食、油脂或液體要指定 PE 或 PLA 內襯，唔可以當通用方案。</li>'
    '<li><strong>誤區 5：交期由落單日起計</strong>——標準 3-5 個工作天係由「檔案確認後」起計，稿件未定稿的時間唔計入生產期。</li>'
    '</ul>\n'
)

i_fda = h2_start('FDA／EU／GB 三地認證')
c = c[:i_fda] + SEC_BOX + c[i_fda:]
i_log = h2_start('跨境食品包裝物流同清關')
c = c[:i_log] + SEC_LIYIN + c[i_log:]
i_faq = h2_start('食品包裝印刷仲有咩常見問題')
c = c[:i_faq] + SEC_MISTAKE + c[i_faq:]

h1 = h2_count(c)
assert h1 == 12, "zh h2 count " + str(h1)
assert 'www. .com' not in c
assert c.count('裡印') >= 1, "裡印 count " + str(c.count('裡印'))
raw2 = replace_content_value(raw, "food-packaging-printing-guide", c)
save(p, raw2, "zh-hk.json")
print(f"[OK] zh-hk guide: {n0} -> {len(c)} chars, h2 {h0} -> {h1}")

# ================= en =================
p, raw, j = load("en")
c = j["food-packaging-printing-guide"]["content"]
n0, h0 = len(c), h2_count(c)
assert '12-Industry Track Record' in c
c = c.replace('12-Industry Track Record', 'Multi-Industry Track Record')
QA_EN = (
    '<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">Quick Answer (40-second read)</p>'
    '<p><strong>Food-safe packaging in one line:</strong> 350gsm food-grade white card or food-grade kraft with PE/PLA lining, compliant with FDA 21 CFR 176.170 and GB 4806.8-2022; 100 MOQ, 3-5 working days after artwork approval, free digital proof within 1 hour.</p></div>\n'
)
i = c.find('<div')
assert i > 0
c = c[:i] + QA_EN + c[i:]
SEC_EN = (
    '<h2>Inside Printing (Reverse Printing) and Food Safety</h2>\n'
    '<p>Inside printing puts brand colours, messages or serials on the inner face of a food box. The rule is a barrier between ink and food: for direct food contact, use food-grade ink with a PE lining over the printed surface; outer printing plus an inner PE lining also satisfies indirect-contact requirements. State "inside print required" on the order and both options are confirmed in the same free proof.</p>\n'
    '<p>See the ' + A('/en/product/food-boxes/', 'food packaging boxes') + ' page for the full inside-printing options.</p>\n'
)
i_log = c.find('<h2>4. Cross-Border Food Packaging Logistics')
assert i_log > 0
c = c[:i_log] + SEC_EN + c[i_log:]
raw2 = replace_content_value(raw, "food-packaging-printing-guide", c)
save(p, raw2, "en.json")
print(f"[OK] en guide: {n0} -> {len(c)} chars, h2 {h0} -> {h2_count(c)}")

# ================= ja =================
p, raw, j = load("ja")
c = j["food-packaging-printing-guide"]["content"]
n0, h0 = len(c), h2_count(c)
assert '12 業界 多年件超の発注実績' in c
c = c.replace('12 業界 多年件超の発注実績', '多業界での受注実績')
QA_JA = (
    '<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">クイック回答（40 秒で読めます）</p>'
    '<p><strong>食品包装の要点：</strong>食品グレードの白カード 350g またはクラフト紙＋PE/PLA 内層、FDA 21 CFR 176.170 と GB 4806.8-2022 に準拠。100 個から、入稿確認後 3-5 営業日、1 時間以内に無料デジタル校正。</p></div>\n'
)
i = c.find('<div')
assert i > 0
c = c[:i] + QA_JA + c[i:]
SEC_JA = (
    '<h2>内側印刷（裏印刷）と食品安全</h2>\n'
    '<p>内側印刷は、箱の内側にブランドカラー・メッセージ・シリアルを印刷する加工です。重要なのはインキと食品の間にバリアを設けること。食品に直接触れる面は食品グレードのインキ＋PE ラミネートで保護し、外側印刷＋内側 PE ラミネートでも間接接触の要件を満たします。ご注文時に「内側印刷あり」とご指定ください。無料校正で両案をまとめて確認できます。</p>\n'
    '<p>詳細は' + A('/ja/product/food-boxes/', '食品用パッケージ') + 'ページをご覧ください。</p>\n'
)
i_log = c.find('<h2>4. 越境食品包装物流と通関')
assert i_log > 0
c = c[:i_log] + SEC_JA + c[i_log:]
raw2 = replace_content_value(raw, "food-packaging-printing-guide", c)
save(p, raw2, "ja.json")
print(f"[OK] ja guide: {n0} -> {len(c)} chars, h2 {h0} -> {h2_count(c)}")
print("[PASS] 项 5 完成")
