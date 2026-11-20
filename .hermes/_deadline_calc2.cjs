// .hermes/_deadline_calc2.cjs — UTC 对齐重算（避免时区偏移）
const D = (y, m, d) => new Date(Date.UTC(y, m - 1, d, 3)); // 03:00Z = 12:00 JST
const fmt = (d) => `${d.getUTCMonth() + 1}/${d.getUTCDate()}(${'日月火水木金土'[d.getUTCDay()]})`;
const addDays = (d, n) => new Date(d.getTime() + n * 864e5);
const isWknd = (d) => d.getUTCDay() === 0 || d.getUTCDay() === 6;
const addBiz = (d, n) => { let x = new Date(d); let k = 0; while (k < n) { x = new Date(x.getTime() + 864e5); if (!isWknd(x)) k++; } return x; };
const event = D(2026, 12, 29);
console.log('event', fmt(event));
for (const [name, intake, fast] of [['ゆとり', D(2026, 12, 7), false], ['標準', D(2026, 12, 14), false], ['特急', D(2026, 12, 23), true]]) {
  const shipMin = fast ? addDays(intake, 1) : addBiz(intake, 5);
  const shipMax = fast ? addDays(intake, 1) : addBiz(intake, 7);
  const arrMin = addDays(shipMin, 2);
  const arrMax = addDays(shipMax, 4);
  console.log(`${name}: 入稿 ${fmt(intake)} → 出荷 ${fmt(shipMin)}〜${fmt(shipMax)} → 到着 ${fmt(arrMin)}〜${fmt(arrMax)} | 最迟到着距开幕 ${Math.round((event - arrMax) / 864e5)} 日`);
}
