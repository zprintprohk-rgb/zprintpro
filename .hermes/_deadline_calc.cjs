// .hermes/_deadline_calc.cjs — 以 12/29 开幕逆算（标准 5-7 营业日 + 国际 2-4 日）
const isWknd = (d) => d.getDay() === 0 || d.getDay() === 6;
const addBiz = (d, n) => { const x = new Date(d); let k = 0; while (k < n) { x.setDate(x.getDate() + 1); if (!isWknd(x)) k++; } return x; };
const fmt = (d) => `${d.getMonth() + 1}/${d.getDate()}(${'日月火水木金土'[d.getDay()]})`;
const event = new Date('2026-12-29T00:00:00+09:00');
for (const [name, intake] of [
  ['ゆとり', new Date('2026-12-08T00:00:00+09:00')],
  ['標準', new Date('2026-12-15T00:00:00+09:00')],
  ['特急', new Date('2026-12-24T00:00:00+09:00')],
]) {
  const fast = name === '特急';
  const shipMin = fast ? new Date(intake.getTime() + 864e5) : addBiz(intake, 5);
  const shipMax = fast ? new Date(intake.getTime() + 864e5) : addBiz(intake, 7);
  const arrMin = new Date(shipMin.getTime() + 2 * 864e5);
  const arrMax = new Date(shipMax.getTime() + 4 * 864e5);
  console.log(`${name}: 入稿 ${fmt(intake)} → 出荷 ${fmt(shipMin)}〜${fmt(shipMax)} → 到着 ${fmt(arrMin)}〜${fmt(arrMax)} | 开幕 ${fmt(event)} 前 ${Math.round((event - arrMax) / 864e5)} 日余裕(最迟)`);
}
