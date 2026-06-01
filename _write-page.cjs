
const fs = require('fs');

const slug = process.argv[1];
const data = JSON.parse(process.argv[2]);

const faqItems = data.faqs.map((item, i) =>
  '          <div key={' + String(i) + '}>\n' +
  '            <h3 className="text-lg font-semibold">' + item[0] + '</h3>\n' +
  '            <p className="text-gray-600 mt-1">' + item[1] + '</p>\n' +
  '          </div>'
).join('\n');

const lines = [
  "import { Metadata } from 'next';",
  "",
  "export const metadata: Metadata = {",
  "  title: '" + data.title + "',",
  "  description: '" + data.desc + "',",
  "};",
  "",
  "export default function " + slug.replace(/-/g, '') + "Page() {",
  "  return (",
  '    <div className="container mx-auto px-4 py-8 max-w-7xl">',
  '      <h1 className="text-3xl font-bold mb-6">' + data.h1 + '</h1>',
  '      <div className="prose max-w-none">',
  '        <p>欢迎来到智印云 ZPrintPro，我们提供专业的' + data.h1 + '服务。作为香港本地印刷公司，我们以优质品质和快捷交期服务广大客户。</p>',
  "      </div>",
  "",
  '      <div className="mt-12 border-t pt-8">',
  '        <h2 className="text-2xl font-bold mb-4">常见问题</h2>',
  '        <div className="space-y-4">',
  faqItems,
  "        </div>",
  "      </div>",
  "",
  "      <script",
  '        type="application/ld+json"',
  "        dangerouslySetInnerHTML={{__html: JSON.stringify({",
  '          "@context": "https://schema.org",',
  '          "@type": "Service",',
  "          name: '" + data.title + "',",
  "          description: '" + data.desc + "',",
  "          provider: {",
  '            "@type": "LocalBusiness",',
  '            name: "智印云 ZPrintPro",',
  '            areaServed: "HK"',
  "          }",
  "        })}}",
  "      />",
  "    </div>",
  "  );",
  "}",
  ""
];

const dir = "F:\\zprintpro-nextjs\\app\\zh-hk\\services\\" + slug;
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(dir + "\\page.tsx", lines.join("\n"), "utf8");
console.log("OK");
