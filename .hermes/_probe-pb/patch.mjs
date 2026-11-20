import fs from "node:fs";
let s = fs.readFileSync("build-selfpub.mjs","utf8");
const reps = [
  // description 162 -> 156
  [`'Self-publishing printing from 1 copy, no minimum order. Compare paperback, hardcover and saddle stitch, see the 100 to 10,000 copy price ladder, then WhatsApp us.'`,
   `'Self-publishing printing from 1 copy, no minimum order. Compare paperback and hardcover bindings, see the 100 to 10,000 copy price ladder, then WhatsApp us.'`],
  // block 4
  [`<p>If you know your trim size and page count, \${A(WA, 'send your specs to ZprintPro on WhatsApp')} and ask for a per-copy quote at 100 and 1,000 copies.</p>`,
   `<p>Know your page count? \${A(WA, 'Send your specs to ZprintPro on WhatsApp')} for a per-copy quote at 100 and 1,000 copies.</p>`],
  // block 6
  [`Before a crowdfunding launch you can order one copy, photograph it, then print the run once the campaign closes.`,
   `Before a crowdfunding launch, order one copy, photograph it, then print the run.`],
  // block 9
  [`Offset needs plates, so its make-ready cost only pays back over a longer run. The category page quotes digital at 2-3 days, offset at 5-7 days and hardcover at 7-10 days, plus DHL worldwide shipping in 2-4 days, free on US orders over $99.`,
   `Offset needs plates, so make-ready only pays back over a longer run. Lead times: digital 2-3 days, offset 5-7 days, hardcover 7-10 days. DHL worldwide shipping is 2-4 days, free on US orders over $99.`],
  // table1 best-for restored
  [`  + ROW('Perfect bound', 'Novels', '48-400')\n  + ROW('Hardcover', 'Keepsakes', 'Varies')\n  + ROW('Saddle stitch', 'Zines', '8-64')\n  + ROW('Wire-o and spiral', 'Workbooks', 'Varies')\n  + ROW('Catalog', 'Lookbooks', 'Varies')`,
   `  + ROW('Perfect bound', 'Novels and reports', '48-400')\n  + ROW('Hardcover', 'Keepsakes and yearbooks', 'Varies')\n  + ROW('Saddle stitch', 'Zines and programmes', '8-64')\n  + ROW('Wire-o and spiral', 'Workbooks and manuals', 'Varies')\n  + ROW('Catalog', 'Lookbooks and portfolios', 'Varies')`],
  // block 13
  [`Perfect bound and hardcover do not lie flat, so artwork crossing the spine loses a few millimetres into the gutter; saddle stitch and wire-o open flat. Many authors pair a paperback with a slim \${IL('/en/blog/zine-small-batch-booklet-printing-guide/', 'small-batch booklet')}.`,
   `Perfect bound and hardcover do not lie flat, so artwork crossing the spine loses a few millimetres into the gutter; saddle stitch and wire-o open flat, which suits a slim \${IL('/en/blog/zine-small-batch-booklet-printing-guide/', 'small-batch booklet')}.`],
  // block 17
  [`Unit price falls from US$2.08 at 100 copies to US$0.36 at 1,000, then flattens, and the page flags the 10,000-copy tier as best value; a 100-copy batch totals US$207.94. That points to a two-step release, digital for backers then offset once demand is proven, and \${A(WA, 'a quote at two run sizes')} shows whether the second step pays.`,
   `Unit price falls from US$2.08 at 100 copies to US$0.36 at 1,000, then flattens, and the page flags the 10,000-copy tier as best value. That points to a two-step release, digital for backers then offset once demand is proven, and \${A(WA, 'a quote at two run sizes')} shows the spread.`],
  // block 19
  [`saddle stitch runs on 128g-157g book paper; wire-o notebooks take 80g-100g book paper. Matte lamination tends to show handling marks and gloss tends to show scratches. Picture-led`,
   `saddle stitch runs on 128g-157g book paper. Matte lamination shows handling marks, gloss shows scratches. Picture-led`],
  // block 21
  [`<p>Those three factors are what an independent author is really buying, and each is checkable before ordering.</p>`,
   `<p>Each of those three factors is checkable before ordering.</p>`],
  // block 22
  [`The two figures describe different things, so ask which applies to your specification.`,
   `Ask which applies to your specification.`],
  // block 24
  [`The category page also notes a typesetting team working in InDesign to publishing industry standards.`,
   `The category page also notes an InDesign typesetting team.`],
  // block 26 FAQ1
  [`while the product pages for the offset-oriented titles carry a structured minimum of 100 pieces.</p>`,
   `while the product pages for the offset-oriented titles list 100 pieces.</p>`],
  // block 30
  [`\${A(WA, 'Send page count, trim size and binding to ZprintPro on WhatsApp')} for a quote at your run size.`,
   `\${A(WA, 'Send your trim size and page count to ZprintPro')} for a quote at your run size.`],
];
let applied = 0;
for (const [a,b] of reps) {
  if (!s.includes(a)) { console.log("MISS:", a.slice(0,70)); continue; }
  s = s.replace(a,b); applied++;
}
fs.writeFileSync("build-selfpub.mjs", s, "utf8");
console.log("applied", applied, "/", reps.length);
