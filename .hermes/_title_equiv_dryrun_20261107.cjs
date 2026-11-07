const eq = require("F:/zprintpro-nextjs/scripts/guards/title-equiv.js");
const fn = eq.equiv;
const items = {
  "en-c16": "Custom Sticker Printing | 10 MOQ Waterproof Die-Cut | ZprintPro",
  "en-c17": "Sticker Printing | 10 MOQ Waterproof Transparent Die-Cut | ZprintPro",
  "en-c18": "Custom Sticker Printing from $0.05 | Waterproof | ZprintPro",
  "en-c19": "Custom Sticker Printing | 10 MOQ Waterproof | ZprintPro",
  "en-c20": "Custom Sticker Printing from $0.05 | Die-Cut | ZprintPro",
  "en-c21": "Sticker Printing from $0.05 | 10 MOQ | ZprintPro",
  "en-c22": "Custom Sticker & Label Printing | 10 MOQ | ZprintPro",
  "en-c23": "Custom Sticker Printing | 10 MOQ Die-Cut Waterproof | ZprintPro",
  "en-c24": "Custom Sticker Printing | 10 MOQ Waterproof Die-Cut | ZprintPro",
  "en-c25": "Custom Sticker Printing from $0.05 | 10 MOQ | ZprintPro",
};
for (const [k, v] of Object.entries(items)) {
  const n = fn(v);
  const band = n >= eq.TITLE_MIN && n <= eq.TITLE_MAX ? "OK" : (n > eq.TITLE_MAX ? "OVER" : "UNDER");
  console.log(k, "=>", n, band, "|", v);
}
