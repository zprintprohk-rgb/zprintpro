import io, re

PAIRS = {
    r"src\app\[locale]\nengajo-2027\page.tsx": [
        ("早鳥優惠以「10 月底前落單」為目安（既有口徑，2026-11-01 再確認）。確定嘅早鳥折扣率同正式截單日一經拍板，即刻喺本頁更新 + WhatsApp 逐客通知。",
         "早鳥優惠以「10 月底前落單」為目安（已於 2026-11-01 覆核）。11 月後落單嘅折扣率同截單安排，以每次報價回覆為準，並喺本頁同 WhatsApp 更新。"),
        ("早鳥折扣率・正式截單日：拍板後即刻更新（現行目安：10 月底前落單，2026-11-01 再確認）",
         "早鳥折扣率・正式截單日：以每次報價回覆為準（10 月底前落單嘅早鳥目安已於 2026-11-01 覆核）"),
        ("以「10 月底前落單」為目安（既有口徑，2026-11-01 再確認）；正式折扣率同截單日拍板後會喺本頁即時更新。",
         "以「10 月底前落單」為目安（已於 2026-11-01 覆核）；11 月後嘅折扣率同截單安排以每次報價回覆為準。"),
        ("Working guidance: order by end of October (existing baseline, re-confirmed 2026-11-01). Early-bird terms confirmed soon.",
         "Working guidance (reviewed 2026-11-01): order by end of October. For November orders, the applicable rate and cut-off are confirmed at quote."),
        ("Discount rate & final deadline: to be published once approved (working guidance: order by end of October, re-confirmed 2026-11-01)",
         "Discount rate & deadline: confirmed at quote (October early-bird guideline reviewed 2026-11-01)"),
        ("Working guidance is end of October (baseline, re-confirmed 2026-11-01); the confirmed rate and deadline will be posted here once approved.",
         "Working guidance is end of October (reviewed 2026-11-01); for November orders the rate and deadline are confirmed at quote."),
        ("早割は「10月末までのご発注」を目安としています（既存口径、2026-11-01 に再確認）。確定した割引率と正式な締切日は、決まり次第こちらのページと WhatsApp でご案内します。",
         "早割は「10月末までのご発注」を目安としていました（2026-11-01 見直し済み）。11月以降の割引率と締切日は、お見積り時にご案内します。"),
        ("早割率・正式締切日：確定次第更新（現行目安：10月末までのご発注、2026-11-01 再確認）",
         "早割率・正式締切日：お見積り時にご案内（10月末までのご発注という目安は 2026-11-01 に見直し済み）"),
        ("「10月末までのご発注」を目安としています（既存口径、2026-11-01 再確認）。",
         "「10月末までのご発注」を目安としていました（2026-11-01 見直し済み）。11月以降の割引率・締切はお見積り時にご案内します。"),
    ],
    r"src\data\blog-data\ja.json": [
        ("年賀状印刷は 10 月末まで早割——クリスマスカードとまとめて発注で送料一本化。",
         "年賀状印刷の早割目安は 10 月末（2026-11-01 見直し済み）——クリスマスカードとまとめて発注で送料一本化。"),
        ("（早割期限 2026-10-31、年度末に再確認）です。",
         "（早割期限 2026-10-31、2026-11-01 見直し済み）です。"),
        ("年賀状の早割は 10 月末まで——クリスマスカードと同時の発注がお得です。",
         "年賀状の早割は 10 月末が目安です（2026-11-01 見直し済み）——クリスマスカードと同時の発注がお得です。"),
        ("早割は10月末までが目安。", "早割の目安は10月末（2026-11-01 見直し済み）。"),
        ("<strong>早割は10月末までが目安</strong>（2026-10-31時点の口径、2026-11-01に再確認）です。",
         "<strong>早割の目安は10月末</strong>（2026-10-31時点の口径、2026-11-01に見直し済み）です。"),
        ("早割の目安は<strong>10月末</strong>です（2026-10-31時点の口径、2026-11-01に再確認）。",
         "早割の目安は<strong>10月末</strong>でした（2026-10-31時点の口径、2026-11-01に見直し済み）。"),
        ("早割の目安は10月末で、11月以降は受注が集中して納期が伸びるため、余裕を持った発注をおすすめします。",
         "早割の目安は10月末でした（2026-11-01 見直し済み）。11月以降は受注が集中して納期が伸びるため、余裕を持った発注をおすすめします。"),
        ("A: 早割は10月末までが目安です（2026-10-31時点の口径、2026-11-01に再確認）。",
         "A: 早割の目安は10月末でした（2026-10-31時点の口径、2026-11-01に見直し済み）。"),
    ],
    r"src\data\blog-data\zh-hk.json": [
        ("（優惠口徑最後覆核日 2026-11-01），11 月後旺季擠擁、交期會拉長。",
         "（口徑已於 2026-11-01 覆核），11 月後旺季擠擁、交期會拉長。"),
        ("早鳥優惠以 10 月底前落單為目安，口徑最後覆核日係 2026-11-01。",
         "早鳥優惠以 10 月底前落單為目安（口徑已於 2026-11-01 覆核）。"),
        ("早鳥優惠口徑最後覆核日為 2026-11-01，落單前可先問清楚當期安排。",
         "早鳥優惠口徑已於 2026-11-01 覆核，落單前可先問清楚當期安排。"),
    ],
    r"src\data\blog-data\en.json": [
        ("that deadline is due for review on 2026-11-01.",
         "that deadline was reviewed on 2026-11-01."),
        ("(last verified 2026-11-01)", "(reviewed 2026-11-01)"),
    ],
    r"src\data\blog-posts.ts": [
        ("早割は10月末までが目安。", "早割の目安は10月末（2026-11-01 見直し済み）。"),
    ],
    r"src\data\category-seo-content.ts": [
        ("年賀状の早割は10月末までが目安で、11月以降は印刷が混み合い納期が伸びます。",
         "年賀状の早割の目安は10月末でした（2026-11-01 見直し済み）。11月以降は印刷が混み合い納期が伸びます。"),
        ("(早割期限 2026-10-31、年度末 2027-10 に再確認)。",
         "(早割期限 2026-10-31、2026-11-01 見直し済み)。"),
        ("2027年賀状は10月中のご注文で早割対象。",
         "2027年賀状の早割対象は10月中のご注文でした。"),
    ],
}

total = 0
for path, pairs in PAIRS.items():
    s = io.open(path, encoding="utf-8", newline="").read()
    file_total = 0
    for old, new in pairs:
        n = s.count(old)
        if n:
            s = s.replace(old, new)
            file_total += n
            print("  x%-2d %s" % (n, old[:70]))
        else:
            print("  !! MISS %s" % old[:70])
    io.open(path, "w", encoding="utf-8", newline="\n").write(s)
    total += file_total
    print("== %s replaced=%d" % (path, file_total))
print("TOTAL:", total)

print("\n=== leftover review markers (早割/早鳥/early-bird near 2026-11 or 10月末) ===")
for path in PAIRS:
    s = io.open(path, encoding="utf-8").read()
    for m in re.finditer(r'2026-11-01|再確認', s):
        ln = s[:m.start()].count("\n")+1
        print("  %s L%d: %r" % (path, ln, s[max(0,m.start()-80):m.start()+60]))
