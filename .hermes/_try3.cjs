const { equiv, band } = require('../scripts/guards/title-equiv.js');
for (const v of [
  'Matte Greeting Cards | 10 MOQ $0.14 | Xmas | ZprintPro',
  'Matte Greeting Cards | 10 MOQ $0.14 | Holiday | ZprintPro',
  'Matte Greeting Cards | 10 MOQ $0.14 | Eco | ZprintPro',
]) console.log(`${equiv(v)} ${band(v)}  ${v}`);
