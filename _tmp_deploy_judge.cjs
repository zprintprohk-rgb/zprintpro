// 部署判据: 6f23d599 删除的串是否仍在线
const https = require("https");
const UA = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0", Accept: "text/html" };
const get = (u) => new Promise((r) => https.get(u, { headers: UA, timeout: 25000 }, (s) => {
  let d = ""; s.on("data", (c) => (d += c)); s.on("end", () => r({ st: s.statusCode, h: d }));
}).on("error", () => r({ st: "ERR", h: "" })));

(async () => {
  const cases = [
    ["en PDP small-batch", "https://zprintpro.com/en/product/small-batch-stickers/", "Free digital proof within 1 hour before production"],
    ["zh PDP a2-posters", "https://zprintpro.com/zh-hk/product/a2-posters/", "提交檔案後 1 小時免費數碼打樣，確認後開印"],
    ["ja PDP small-batch", "https://zprintpro.com/ja/product/small-batch-stickers/", "データ提出後 1 時間で無料デジタル校正、確認後に本印刷"],
    ["zh 类目 stickers", "https://zprintpro.com/zh-hk/category/stickers/", "提交檔案後 1 小時免費數碼打樣，確認後開印"],
    ["zh PDP a2 长段", "https://zprintpro.com/zh-hk/product/a2-posters/", "平均 2.3 天出貨"],
  ];
  for (const [name, u, s] of cases) {
    const r = await get(u);
    const has = r.h.includes(s);
    console.log(`${has ? "残留(旧构建?)" : "已清(新构建)"}  ${name}  status=${r.st}  标记=${has}`);
  }
  // 反向确认: 新口径是否出现
  const r2 = await get("https://zprintpro.com/zh-hk/product/a2-posters/");
  console.log(`\n新口径「報價確認」在 zh PDP 出现: ${(r2.h.match(/報價確認/g) || []).length} 次`);
})();
